import Redis from 'ioredis'
import { NextResponse } from 'next/server'
import { MISSIONS, getMissionById, calculateMissionXP } from '../../lib/missions'

let redis: Redis | null = null

function getRedis() {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL || '')
  }
  return redis
}

// GET: List all missions with user's progress
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const username = searchParams.get('username')

    if (!username) {
      return NextResponse.json({ error: 'Username required' }, { status: 400 })
    }

    const db = getRedis()
    const userKey = `user:${username.toLowerCase()}`
    const userJson = await db.get(userKey)

    if (!userJson) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userData = JSON.parse(userJson)
    const userLevel = userData.level || 1
    const completedMissions = userData.learnerProfile?.completedMissions || []
    const missionProgress = userData.learnerProfile?.missionProgress || {}
    const activeMission = userData.learnerProfile?.activeMission || null

    // Build mission list with status
    const missions = MISSIONS.map(mission => ({
      id: mission.id,
      title: mission.title,
      subtitle: mission.subtitle,
      emoji: mission.emoji,
      level: mission.level,
      xpTotal: calculateMissionXP(mission),
      objectiveCount: mission.objectives.length,
      // Status
      locked: mission.level > userLevel,
      completed: completedMissions.includes(mission.id),
      inProgress: missionProgress[mission.id] && !completedMissions.includes(mission.id),
      isActive: activeMission === mission.id,
      progress: missionProgress[mission.id] || null
    }))

    return NextResponse.json({
      missions,
      activeMission,
      userLevel
    })
  } catch (error) {
    console.error('Missions GET error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// POST: Start mission, verify objective, complete mission
export async function POST(req: Request) {
  try {
    const { action, username, missionId, objectiveId, command, output } = await req.json()

    if (!username) {
      return NextResponse.json({ error: 'Username required' }, { status: 400 })
    }

    const db = getRedis()
    const userKey = `user:${username.toLowerCase()}`
    const userJson = await db.get(userKey)

    if (!userJson) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userData = JSON.parse(userJson)

    // Initialize learnerProfile fields if missing
    if (!userData.learnerProfile) {
      userData.learnerProfile = {
        topicsMastered: [],
        commandsUsed: [],
        struggles: [],
        observations: [],
        lastSummary: ''
      }
    }
    if (!userData.learnerProfile.missionProgress) {
      userData.learnerProfile.missionProgress = {}
    }
    if (!userData.learnerProfile.completedMissions) {
      userData.learnerProfile.completedMissions = []
    }

    // ==================
    // START MISSION
    // ==================
    if (action === 'start') {
      const mission = getMissionById(missionId)
      if (!mission) {
        return NextResponse.json({ error: 'Mission not found' }, { status: 404 })
      }

      // Check level requirement
      if (mission.level > (userData.level || 1)) {
        return NextResponse.json({ error: 'Level too low for this mission' }, { status: 403 })
      }

      // Check if already completed
      if (userData.learnerProfile.completedMissions.includes(missionId)) {
        return NextResponse.json({ error: 'Mission already completed' }, { status: 400 })
      }

      // Create or reset progress
      userData.learnerProfile.missionProgress[missionId] = {
        missionId,
        startedAt: new Date().toISOString(),
        objectivesCompleted: [],
        currentObjectiveIndex: 0
      }
      userData.learnerProfile.activeMission = missionId

      await db.set(userKey, JSON.stringify(userData))

      return NextResponse.json({
        success: true,
        mission: {
          id: mission.id,
          title: mission.title,
          briefing: mission.briefing,
          setupScript: mission.setupScript,
          objectives: mission.objectives,
          xpTotal: calculateMissionXP(mission)
        }
      })
    }

    // ==================
    // VERIFY OBJECTIVE
    // ==================
    if (action === 'verify') {
      const mission = getMissionById(missionId)
      if (!mission) {
        return NextResponse.json({ error: 'Mission not found' }, { status: 404 })
      }

      const progress = userData.learnerProfile.missionProgress[missionId]
      if (!progress) {
        return NextResponse.json({ error: 'Mission not started' }, { status: 400 })
      }

      // Find the objective
      const objective = mission.objectives.find(o => o.id === objectiveId)
      if (!objective) {
        return NextResponse.json({ error: 'Objective not found' }, { status: 404 })
      }

      // Check if already completed
      if (progress.objectivesCompleted.includes(objectiveId)) {
        return NextResponse.json({
          success: false,
          alreadyCompleted: true,
          message: 'Objective already completed'
        })
      }

      // Verify based on type
      let verified = false
      const { type, pattern } = objective.verification

      console.log(`Verifying objective ${objectiveId}: type=${type}, pattern=${pattern}`)
      console.log(`Command received: "${command}"`)
      console.log(`Output received: "${output?.slice(0, 100)}..."`)

      if (type === 'output_contains') {
        verified = output && output.toLowerCase().includes(pattern.toLowerCase())
      } else if (type === 'command_contains') {
        verified = command && command.toLowerCase().includes(pattern.toLowerCase())
      } else if (type === 'command_starts') {
        verified = command && command.toLowerCase().trim().startsWith(pattern.toLowerCase())
      }

      console.log(`Verification result: ${verified}`)

      if (verified) {
        // Mark objective complete
        progress.objectivesCompleted.push(objectiveId)
        progress.currentObjectiveIndex = Math.min(
          progress.currentObjectiveIndex + 1,
          mission.objectives.length - 1
        )

        // Award XP
        userData.xp = (userData.xp || 0) + objective.xpReward

        // Check if mission complete
        const allComplete = mission.objectives.every(o =>
          progress.objectivesCompleted.includes(o.id)
        )

        if (allComplete) {
          progress.completedAt = new Date().toISOString()
          userData.learnerProfile.completedMissions.push(missionId)
          userData.learnerProfile.activeMission = null

          // Award bonus XP
          userData.xp += mission.xpBonus

          await db.set(userKey, JSON.stringify(userData))

          return NextResponse.json({
            success: true,
            objectiveComplete: true,
            missionComplete: true,
            xpEarned: objective.xpReward + mission.xpBonus,
            newTotalXP: userData.xp,
            successMessage: mission.successMessage
          })
        }

        await db.set(userKey, JSON.stringify(userData))

        // Get next objective
        const nextObjective = mission.objectives[progress.currentObjectiveIndex]

        return NextResponse.json({
          success: true,
          objectiveComplete: true,
          missionComplete: false,
          xpEarned: objective.xpReward,
          newTotalXP: userData.xp,
          nextObjective: nextObjective ? {
            id: nextObjective.id,
            description: nextObjective.description,
            hint: nextObjective.hint
          } : null,
          progress: {
            completed: progress.objectivesCompleted.length,
            total: mission.objectives.length
          }
        })
      }

      // Not verified - provide hint
      return NextResponse.json({
        success: false,
        objectiveComplete: false,
        hint: objective.hint,
        message: 'Objective not complete. Try again!'
      })
    }

    // ==================
    // ABANDON MISSION
    // ==================
    if (action === 'abandon') {
      userData.learnerProfile.activeMission = null
      // Keep progress in case they want to resume
      await db.set(userKey, JSON.stringify(userData))

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Missions POST error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
