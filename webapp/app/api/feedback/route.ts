import Redis from 'ioredis'
import { NextResponse } from 'next/server'

interface Feedback {
  id: string
  username: string
  text: string
  rating?: 1 | 2 | 3 | 4 | 5
  timestamp: string
  currentMission?: string | null
  userLevel?: number
  sessionContext?: string
}

let redis: Redis | null = null

function getRedis() {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL || '')
  }
  return redis
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, username, text, rating, currentMission, userLevel, sessionContext } = body

    const db = getRedis()

    if (action === 'submit') {
      if (!username || !text) {
        return NextResponse.json({ error: 'Username and text required' }, { status: 400 })
      }

      const feedback: Feedback = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        username,
        text,
        rating,
        timestamp: new Date().toISOString(),
        currentMission,
        userLevel,
        sessionContext
      }

      // Store in Redis list for easy retrieval
      await db.lpush('feedback:all', JSON.stringify(feedback))

      // Also store per-user for reference
      await db.lpush(`feedback:user:${username.toLowerCase()}`, JSON.stringify(feedback))

      return NextResponse.json({ success: true, id: feedback.id })
    }

    if (action === 'list') {
      // Admin endpoint - list all feedback (could add auth later)
      const allFeedback = await db.lrange('feedback:all', 0, 100)
      const parsed = allFeedback.map(f => JSON.parse(f))
      return NextResponse.json({ feedback: parsed })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })

  } catch (error) {
    console.error('Feedback error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function GET() {
  // Simple GET to retrieve all feedback (for analysis)
  try {
    const db = getRedis()
    const allFeedback = await db.lrange('feedback:all', 0, 500)
    const parsed = allFeedback.map(f => JSON.parse(f))

    return NextResponse.json({
      count: parsed.length,
      feedback: parsed
    })
  } catch (error) {
    console.error('Feedback fetch error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
