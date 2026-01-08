// Level definitions based on levels.md

export interface LevelInfo {
  level: number
  name: string
  emoji: string
  minXP: number
  maxXP: number
  skills: string[]
  commands: string[]
}

export const LEVELS: LevelInfo[] = [
  {
    level: 1,
    name: 'Cadet',
    emoji: '🚀',
    minXP: 0,
    maxXP: 100,
    skills: ['Navigation', 'File Viewing', 'File Creation', 'Redirection'],
    commands: ['cd', 'pwd', 'ls', 'cat', 'less', 'head', 'tail', 'touch', 'mkdir', 'echo', '>', '>>']
  },
  {
    level: 2,
    name: 'Ensign',
    emoji: '⭐',
    minXP: 100,
    maxXP: 250,
    skills: ['Moving & Copying', 'Destruction', 'Finding Things', 'Wildcards'],
    commands: ['mv', 'cp', 'rm', 'rmdir', 'find', 'locate', '*', '?', '[]']
  },
  {
    level: 3,
    name: 'Crewman',
    emoji: '🔧',
    minXP: 250,
    maxXP: 450,
    skills: ['Basic Pipes', 'Grep Basics', 'Counting', 'Sorting'],
    commands: ['|', 'grep', 'wc', 'sort', 'uniq']
  },
  {
    level: 4,
    name: 'Lieutenant',
    emoji: '🎖️',
    minXP: 450,
    maxXP: 700,
    skills: ['Advanced Pipes', 'Stream Control', 'Here Documents', 'Process Substitution'],
    commands: ['xargs', 'tee', '2>', '2>&1', '/dev/null', '<<EOF', '<()']
  },
  {
    level: 5,
    name: 'Lt. Commander',
    emoji: '🎯',
    minXP: 700,
    maxXP: 1000,
    skills: ['Regex Basics', 'Sed Basics', 'Awk Intro'],
    commands: ['grep -E', 'sed', 'awk']
  },
  {
    level: 6,
    name: 'Security Officer',
    emoji: '🛡️',
    minXP: 1000,
    maxXP: 1400,
    skills: ['Read Permissions', 'Change Permissions', 'Ownership', 'Sudo & Root'],
    commands: ['ls -l', 'chmod', 'chown', 'chgrp', 'sudo']
  },
  {
    level: 7,
    name: 'Ops Commander',
    emoji: '🔄',
    minXP: 1400,
    maxXP: 1700,
    skills: ['Process Management', 'Background Jobs'],
    commands: ['ps', 'top', 'kill', 'jobs', 'fg', 'bg', '&', 'nohup']
  },
  {
    level: 8,
    name: 'Comms Officer',
    emoji: '📡',
    minXP: 1700,
    maxXP: 2000,
    skills: ['Remote Connections', 'Data Transfer'],
    commands: ['curl', 'wget', 'ssh', 'scp', 'rsync', 'ping', 'netstat']
  },
  {
    level: 9,
    name: 'Chief Engineer',
    emoji: '⚙️',
    minXP: 2000,
    maxXP: 2500,
    skills: ['System Configuration', 'Automation'],
    commands: ['cron', 'env', 'export', '.bashrc', 'alias', 'source']
  },
  {
    level: 10,
    name: 'Captain',
    emoji: '👨‍✈️',
    minXP: 2500,
    maxXP: Infinity,
    skills: ['Scripting Basics', 'Functions', 'Script Safety', 'Real Projects'],
    commands: ['#!/bin/bash', 'if/else', 'for/while', 'functions', 'set -e']
  }
]

// XP rewards
export const XP_REWARDS = {
  NEW_COMMAND: 10,
  SKILL_QUIZ: 25,
  EXERCISE: 15,
  PERFECT_RECALL: 5,
  TRIAL_COMPLETE: 50,
  HELP_OTHERS: 30
}

export function getLevelForXP(xp: number): LevelInfo {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) {
      return LEVELS[i]
    }
  }
  return LEVELS[0]
}

export function getXPProgress(xp: number): { current: number; needed: number; percent: number } {
  const level = getLevelForXP(xp)
  const nextLevel = LEVELS.find(l => l.level === level.level + 1)

  if (!nextLevel) {
    return { current: xp - level.minXP, needed: 0, percent: 100 }
  }

  const current = xp - level.minXP
  const needed = nextLevel.minXP - level.minXP
  const percent = Math.min(100, Math.round((current / needed) * 100))

  return { current, needed, percent }
}

export function checkLevelUp(oldXP: number, newXP: number): LevelInfo | null {
  const oldLevel = getLevelForXP(oldXP)
  const newLevel = getLevelForXP(newXP)

  if (newLevel.level > oldLevel.level) {
    return newLevel
  }
  return null
}
