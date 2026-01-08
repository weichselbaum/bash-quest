import Redis from 'ioredis'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

interface CommandFreshness {
  command: string
  lastUsed: string
  timesUsed: number
  successRate: number
  easeFactor: number
  interval: number
  nextReviewDate: string
  streak: number
}

interface MissionProgress {
  missionId: string
  startedAt: string
  completedAt?: string
  objectivesCompleted: string[]
  currentObjectiveIndex: number
}

interface LearnerProfile {
  topicsMastered: string[]
  commandsUsed: string[]
  struggles: string[]
  observations: string[]
  lastSummary: string
  // Rapport - relationship building moments
  rapport?: string[]  // Jokes they liked, things they guessed, curiosity moments, inside jokes
  // Mission & spaced repetition fields
  commandFreshness?: Record<string, CommandFreshness>
  missionProgress?: Record<string, MissionProgress>
  completedMissions?: string[]
  activeMission?: string | null
}

interface UserData {
  username: string
  passwordHash: string
  level: number
  xp: number
  messages: { role: string; content: string }[]
  learnerProfile: LearnerProfile
  createdAt: string
  lastSession: string
}

let redis: Redis | null = null

function getRedis() {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL || '')
  }
  return redis
}

// Old hash for migration detection only
function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash.toString(36)
}

// Check if hash is bcrypt format (starts with $2)
function isBcryptHash(hash: string): boolean {
  return hash.startsWith('$2')
}

// Rate limiting: max 10 attempts per IP per minute
const RATE_LIMIT_WINDOW = 60 // seconds
const RATE_LIMIT_MAX = 10

async function checkRateLimit(db: Redis, ip: string): Promise<boolean> {
  const key = `ratelimit:auth:${ip}`
  const current = await db.incr(key)
  if (current === 1) {
    await db.expire(key, RATE_LIMIT_WINDOW)
  }
  return current <= RATE_LIMIT_MAX
}

// Input validation
function validateUsername(username: string): { valid: boolean; error?: string } {
  if (!username || typeof username !== 'string') {
    return { valid: false, error: 'Username required' }
  }
  if (username.length < 2 || username.length > 30) {
    return { valid: false, error: 'Username must be 2-30 characters' }
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return { valid: false, error: 'Username can only contain letters, numbers, _ and -' }
  }
  return { valid: true }
}

function validatePassword(password: string): { valid: boolean; error?: string } {
  if (!password || typeof password !== 'string') {
    return { valid: false, error: 'Password required' }
  }
  if (password.length < 4 || password.length > 100) {
    return { valid: false, error: 'Password must be 4-100 characters' }
  }
  return { valid: true }
}

export async function POST(req: Request) {
  try {
    const { action, username, password, level, xp, messages, learnerProfile } = await req.json()

    // Validate username
    const usernameCheck = validateUsername(username)
    if (!usernameCheck.valid) {
      return NextResponse.json({ error: usernameCheck.error }, { status: 400 })
    }

    const db = getRedis()

    // Rate limiting for auth actions
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ||
               req.headers.get('x-real-ip') ||
               'unknown'
    if (action === 'login' || action === 'setPassword') {
      const allowed = await checkRateLimit(db, ip)
      if (!allowed) {
        return NextResponse.json({ error: 'Too many attempts. Try again in a minute.' }, { status: 429 })
      }
    }

    const userKey = `user:${username.toLowerCase()}`

    if (action === 'login') {
      // Validate password
      const passwordCheck = validatePassword(password)
      if (!passwordCheck.valid) {
        return NextResponse.json({ error: passwordCheck.error }, { status: 400 })
      }

      const existingUserJson = await db.get(userKey)
      const existingUser: UserData | null = existingUserJson ? JSON.parse(existingUserJson) : null

      if (existingUser) {
        // Check password - handle both old and new hash formats
        let passwordValid = false
        let needsMigration = false

        if (isBcryptHash(existingUser.passwordHash)) {
          // New bcrypt hash
          passwordValid = await bcrypt.compare(password, existingUser.passwordHash)
        } else {
          // Old simple hash - check and mark for migration
          passwordValid = existingUser.passwordHash === simpleHash(password)
          needsMigration = passwordValid
        }

        if (!passwordValid) {
          return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
        }

        // Migrate to bcrypt if using old hash
        if (needsMigration) {
          existingUser.passwordHash = await bcrypt.hash(password, 10)
        }

        // Update last session
        existingUser.lastSession = new Date().toISOString()
        await db.set(userKey, JSON.stringify(existingUser))
        return NextResponse.json({
          user: {
            username: existingUser.username,
            level: existingUser.level,
            xp: existingUser.xp,
            messages: existingUser.messages || [],
            learnerProfile: existingUser.learnerProfile || null
          }
        })
      } else {
        // New user - create account with bcrypt
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser: UserData = {
          username,
          passwordHash,
          level: 1,
          xp: 0,
          messages: [],
          learnerProfile: {
            topicsMastered: [],
            commandsUsed: [],
            struggles: [],
            observations: [],
            lastSummary: ''
          },
          createdAt: new Date().toISOString(),
          lastSession: new Date().toISOString()
        }
        await db.set(userKey, JSON.stringify(newUser))
        return NextResponse.json({
          user: {
            username: newUser.username,
            level: newUser.level,
            xp: newUser.xp,
            messages: [],
            learnerProfile: newUser.learnerProfile
          },
          isNew: true
        })
      }
    }

    if (action === 'load') {
      // Load user data without password (for session restore)
      const existingUserJson = await db.get(userKey)
      if (!existingUserJson) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
      const existingUser: UserData = JSON.parse(existingUserJson)
      return NextResponse.json({
        user: {
          username: existingUser.username,
          level: existingUser.level,
          xp: existingUser.xp,
          messages: existingUser.messages || [],
          learnerProfile: existingUser.learnerProfile || null
        }
      })
    }

    if (action === 'save') {
      const existingUserJson = await db.get(userKey)
      if (!existingUserJson) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
      const existingUser: UserData = JSON.parse(existingUserJson)
      existingUser.level = level ?? existingUser.level
      existingUser.xp = xp ?? existingUser.xp
      existingUser.messages = (messages ?? existingUser.messages).slice(-50) // Cap at 50 messages
      if (learnerProfile) {
        existingUser.learnerProfile = learnerProfile
      }
      existingUser.lastSession = new Date().toISOString()
      await db.set(userKey, JSON.stringify(existingUser))
      return NextResponse.json({ success: true })
    }

    if (action === 'setPassword') {
      // Validate password
      const passwordCheck = validatePassword(password)
      if (!passwordCheck.valid) {
        return NextResponse.json({ error: passwordCheck.error }, { status: 400 })
      }
      const existingUserJson = await db.get(userKey)
      if (!existingUserJson) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
      const existingUser: UserData = JSON.parse(existingUserJson)
      existingUser.passwordHash = await bcrypt.hash(password, 10)
      await db.set(userKey, JSON.stringify(existingUser))
      return NextResponse.json({ success: true })
    }

    if (action === 'reset') {
      // Reset all progress but keep account
      const existingUserJson = await db.get(userKey)
      if (!existingUserJson) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
      const existingUser: UserData = JSON.parse(existingUserJson)

      // Reset everything except username and password
      existingUser.level = 1
      existingUser.xp = 0
      existingUser.messages = []
      existingUser.learnerProfile = {
        topicsMastered: [],
        commandsUsed: [],
        struggles: [],
        observations: [],
        lastSummary: '',
        rapport: [],
        commandFreshness: {},
        missionProgress: {},
        completedMissions: [],
        activeMission: null
      }
      existingUser.lastSession = new Date().toISOString()

      await db.set(userKey, JSON.stringify(existingUser))
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
