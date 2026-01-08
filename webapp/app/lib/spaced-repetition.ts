// Spaced Repetition System using SM-2 Algorithm
// Tracks command freshness and suggests refresh challenges

export interface CommandFreshness {
  command: string
  lastUsed: string           // ISO timestamp
  timesUsed: number
  successRate: number        // 0-1
  easeFactor: number         // SM-2: starts at 2.5
  interval: number           // Days until next review
  nextReviewDate: string     // ISO timestamp
  streak: number             // Consecutive successful uses
}

export interface RefreshChallenge {
  id: string
  command: string
  title: string
  prompt: string
  setupScript?: string
  verification: {
    type: 'output_contains' | 'command_contains'
    pattern: string
  }
  xpReward: number
}

// Default freshness for a new command
export function createFreshness(command: string): CommandFreshness {
  const now = new Date()
  const nextReview = new Date(now)
  nextReview.setDate(nextReview.getDate() + 1) // Review tomorrow

  return {
    command,
    lastUsed: now.toISOString(),
    timesUsed: 1,
    successRate: 1,
    easeFactor: 2.5,
    interval: 1,
    nextReviewDate: nextReview.toISOString(),
    streak: 1
  }
}

// SM-2 Algorithm: Calculate next review based on quality of recall
// quality: 0-5 scale (0=complete fail, 5=perfect)
export function calculateNextReview(
  freshness: CommandFreshness,
  quality: number
): CommandFreshness {
  let { easeFactor, interval, streak, timesUsed, successRate } = freshness

  if (quality >= 3) {
    // Successful recall
    if (streak === 0) {
      interval = 1
    } else if (streak === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * easeFactor)
    }
    streak++
    successRate = (successRate * timesUsed + 1) / (timesUsed + 1)
  } else {
    // Failed recall - reset interval
    interval = 1
    streak = 0
    successRate = (successRate * timesUsed) / (timesUsed + 1)
  }

  // Adjust ease factor (never below 1.3)
  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  )

  const nextReviewDate = new Date()
  nextReviewDate.setDate(nextReviewDate.getDate() + interval)

  return {
    ...freshness,
    easeFactor,
    interval,
    streak,
    nextReviewDate: nextReviewDate.toISOString(),
    lastUsed: new Date().toISOString(),
    timesUsed: timesUsed + 1,
    successRate
  }
}

// Update freshness when user runs a command
export function updateCommandUsage(
  freshness: Record<string, CommandFreshness>,
  command: string
): Record<string, CommandFreshness> {
  const baseCommand = command.split(' ')[0] // Extract base command

  if (freshness[baseCommand]) {
    // Existing command - good recall (quality 4)
    freshness[baseCommand] = calculateNextReview(freshness[baseCommand], 4)
  } else {
    // New command
    freshness[baseCommand] = createFreshness(baseCommand)
  }

  return { ...freshness }
}

// Get commands that need refreshing (past their review date)
export function getCommandsNeedingRefresh(
  freshness: Record<string, CommandFreshness>,
  limit: number = 3
): string[] {
  const now = new Date()

  return Object.values(freshness)
    .filter(f => new Date(f.nextReviewDate) <= now)
    .sort((a, b) => {
      // Priority: lowest streak first, then oldest review date
      if (a.streak !== b.streak) return a.streak - b.streak
      return new Date(a.nextReviewDate).getTime() - new Date(b.nextReviewDate).getTime()
    })
    .slice(0, limit)
    .map(f => f.command)
}

// Get overall freshness score (0-100)
export function getOverallFreshness(
  freshness: Record<string, CommandFreshness>
): number {
  const commands = Object.values(freshness)
  if (commands.length === 0) return 100

  const now = new Date()
  let score = 0

  for (const cmd of commands) {
    const reviewDate = new Date(cmd.nextReviewDate)
    if (reviewDate > now) {
      // Not yet due - full points
      score += 100
    } else {
      // Overdue - reduce points based on how overdue
      const daysOverdue = Math.floor((now.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24))
      score += Math.max(0, 100 - daysOverdue * 10)
    }
  }

  return Math.round(score / commands.length)
}

// Pre-defined refresh challenges for common commands
export const REFRESH_CHALLENGES: Record<string, RefreshChallenge[]> = {
  cd: [
    {
      id: 'cd_quick_1',
      command: 'cd',
      title: 'Quick Navigation',
      prompt: 'Navigate to your home directory, then to /tmp, then back home.',
      verification: { type: 'command_contains', pattern: 'cd' },
      xpReward: 10
    }
  ],
  ls: [
    {
      id: 'ls_quick_1',
      command: 'ls',
      title: 'List Master',
      prompt: 'List all files including hidden ones, with details (size, date).',
      verification: { type: 'command_contains', pattern: 'ls -' },
      xpReward: 10
    }
  ],
  cat: [
    {
      id: 'cat_quick_1',
      command: 'cat',
      title: 'File Reader',
      prompt: 'Display the contents of /etc/hostname',
      verification: { type: 'command_contains', pattern: 'cat' },
      xpReward: 10
    }
  ],
  grep: [
    {
      id: 'grep_quick_1',
      command: 'grep',
      title: 'Pattern Hunter',
      prompt: 'Find all lines containing "root" in /etc/passwd',
      verification: { type: 'command_contains', pattern: 'grep' },
      xpReward: 15
    }
  ],
  mv: [
    {
      id: 'mv_quick_1',
      command: 'mv',
      title: 'File Mover',
      prompt: 'Create a file called test.txt, then rename it to moved.txt',
      setupScript: 'touch ~/test.txt',
      verification: { type: 'command_contains', pattern: 'mv' },
      xpReward: 10
    }
  ],
  cp: [
    {
      id: 'cp_quick_1',
      command: 'cp',
      title: 'Copy Cat',
      prompt: 'Copy /etc/hostname to your home directory',
      verification: { type: 'command_contains', pattern: 'cp' },
      xpReward: 10
    }
  ],
  rm: [
    {
      id: 'rm_quick_1',
      command: 'rm',
      title: 'Careful Deleter',
      prompt: 'Delete the file ~/to_delete.txt (be careful!)',
      setupScript: 'touch ~/to_delete.txt',
      verification: { type: 'command_contains', pattern: 'rm' },
      xpReward: 10
    }
  ],
  mkdir: [
    {
      id: 'mkdir_quick_1',
      command: 'mkdir',
      title: 'Folder Creator',
      prompt: 'Create a nested directory structure: ~/projects/2024/january',
      verification: { type: 'command_contains', pattern: 'mkdir' },
      xpReward: 10
    }
  ]
}

// Get a refresh challenge for a specific command
export function getRefreshChallenge(command: string): RefreshChallenge | null {
  const challenges = REFRESH_CHALLENGES[command]
  if (!challenges || challenges.length === 0) return null

  // Return random challenge for variety
  return challenges[Math.floor(Math.random() * challenges.length)]
}
