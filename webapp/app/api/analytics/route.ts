import Redis from 'ioredis'
import { NextResponse } from 'next/server'

// User behavior events we track for learning
type EventType =
  | 'session_start'
  | 'session_end'
  | 'command_run'
  | 'command_error'
  | 'ai_question'
  | 'mission_start'
  | 'mission_complete'
  | 'mission_abandon'
  | 'objective_complete'
  | 'hint_requested'
  | 'struggle_detected'
  | 'mastery_achieved'
  | 'retry_after_error'
  | 'idle_timeout'
  | 'rage_quit'  // Multiple errors in succession
  | 'aha_moment' // Success after struggle

interface AnalyticsEvent {
  id: string
  username: string
  event: EventType
  timestamp: string
  data?: Record<string, unknown>
}

interface SessionSummary {
  username: string
  sessionStart: string
  sessionEnd?: string
  commandCount: number
  errorCount: number
  questionsAsked: number
  missionsAttempted: string[]
  missionsCompleted: string[]
  topCommands: Record<string, number>
  strugglePoints: string[]
  masteryGained: string[]
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
    const { action } = body

    const db = getRedis()

    if (action === 'track') {
      const { username, event, data } = body

      if (!username || !event) {
        return NextResponse.json({ error: 'Username and event required' }, { status: 400 })
      }

      const analyticsEvent: AnalyticsEvent = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        username,
        event,
        timestamp: new Date().toISOString(),
        data
      }

      // Store in time-series list (most recent first)
      await db.lpush('analytics:events', JSON.stringify(analyticsEvent))

      // Also store per-user for individual analysis
      await db.lpush(`analytics:user:${username.toLowerCase()}`, JSON.stringify(analyticsEvent))

      // Update daily aggregates (for quick stats)
      const today = new Date().toISOString().split('T')[0]
      await db.hincrby(`analytics:daily:${today}`, event, 1)
      await db.hincrby(`analytics:daily:${today}`, 'total_events', 1)

      // Track unique users today
      await db.sadd(`analytics:users:${today}`, username.toLowerCase())

      return NextResponse.json({ success: true, id: analyticsEvent.id })
    }

    if (action === 'session_summary') {
      // Get session summary for a user
      const { username } = body
      if (!username) {
        return NextResponse.json({ error: 'Username required' }, { status: 400 })
      }

      const userEvents = await db.lrange(`analytics:user:${username.toLowerCase()}`, 0, 500)
      const parsed = userEvents.map(e => JSON.parse(e) as AnalyticsEvent)

      // Build summary
      const summary: SessionSummary = {
        username,
        sessionStart: parsed[parsed.length - 1]?.timestamp || new Date().toISOString(),
        commandCount: parsed.filter(e => e.event === 'command_run').length,
        errorCount: parsed.filter(e => e.event === 'command_error').length,
        questionsAsked: parsed.filter(e => e.event === 'ai_question').length,
        missionsAttempted: [...new Set(parsed.filter(e => e.event === 'mission_start').map(e => e.data?.missionId as string))],
        missionsCompleted: [...new Set(parsed.filter(e => e.event === 'mission_complete').map(e => e.data?.missionId as string))],
        topCommands: {},
        strugglePoints: [...new Set(parsed.filter(e => e.event === 'struggle_detected').map(e => e.data?.topic as string))],
        masteryGained: [...new Set(parsed.filter(e => e.event === 'mastery_achieved').map(e => e.data?.topic as string))]
      }

      // Count top commands
      parsed.filter(e => e.event === 'command_run').forEach(e => {
        const cmd = e.data?.command as string
        if (cmd) {
          const baseCmd = cmd.split(' ')[0]
          summary.topCommands[baseCmd] = (summary.topCommands[baseCmd] || 0) + 1
        }
      })

      return NextResponse.json({ summary })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })

  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  // Get analytics overview for analysis
  try {
    const db = getRedis()
    const url = new URL(request.url)
    const days = parseInt(url.searchParams.get('days') || '7')

    // Get daily stats for the last N days
    const dailyStats: Record<string, Record<string, number>> = {}
    const uniqueUsersPerDay: Record<string, number> = {}

    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]

      const stats = await db.hgetall(`analytics:daily:${dateStr}`)
      if (Object.keys(stats).length > 0) {
        dailyStats[dateStr] = {}
        for (const [key, value] of Object.entries(stats)) {
          dailyStats[dateStr][key] = parseInt(value as string)
        }
      }

      const userCount = await db.scard(`analytics:users:${dateStr}`)
      uniqueUsersPerDay[dateStr] = userCount
    }

    // Get recent events (last 100)
    const recentEvents = await db.lrange('analytics:events', 0, 100)
    const parsed = recentEvents.map(e => JSON.parse(e))

    // Aggregate insights
    const insights = {
      totalEventsTracked: await db.llen('analytics:events'),
      dailyStats,
      uniqueUsersPerDay,
      recentEvents: parsed.slice(0, 20), // Just last 20 for overview

      // Patterns to learn from
      patterns: {
        commonErrors: countByField(parsed.filter(e => e.event === 'command_error'), 'data.command'),
        struggleTopics: countByField(parsed.filter(e => e.event === 'struggle_detected'), 'data.topic'),
        masteryTopics: countByField(parsed.filter(e => e.event === 'mastery_achieved'), 'data.topic'),
        missionCompletionRate: calculateCompletionRate(parsed),
        avgCommandsBeforeSuccess: calculateAvgRetries(parsed)
      }
    }

    return NextResponse.json(insights)

  } catch (error) {
    console.error('Analytics fetch error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

// Helper: count occurrences by nested field
function countByField(events: AnalyticsEvent[], fieldPath: string): Record<string, number> {
  const counts: Record<string, number> = {}
  events.forEach(e => {
    const value = getNestedValue(e, fieldPath)
    if (value) {
      counts[value] = (counts[value] || 0) + 1
    }
  })
  return counts
}

function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const parts = path.split('.')
  let current: unknown = obj
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part]
    } else {
      return undefined
    }
  }
  return typeof current === 'string' ? current : undefined
}

function calculateCompletionRate(events: AnalyticsEvent[]): number {
  const starts = events.filter(e => e.event === 'mission_start').length
  const completes = events.filter(e => e.event === 'mission_complete').length
  return starts > 0 ? Math.round((completes / starts) * 100) : 0
}

function calculateAvgRetries(events: AnalyticsEvent[]): number {
  const errorEvents = events.filter(e => e.event === 'command_error')
  const successEvents = events.filter(e => e.event === 'command_run')
  const total = errorEvents.length + successEvents.length
  return total > 0 ? Math.round((errorEvents.length / total) * 100) : 0
}
