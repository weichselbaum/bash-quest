'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { getLevelForXP, getXPProgress, checkLevelUp, LevelInfo } from './lib/levels'
import { Mission, getMissionById } from './lib/missions'
import MissionHUD from './components/MissionHUD'
import MissionSelect from './components/MissionSelect'
import MissionBriefing from './components/MissionBriefing'
import MissionComplete from './components/MissionComplete'
import type { V86TerminalRef } from './components/V86Terminal'

const V86Terminal = dynamic(() => import('./components/V86Terminal'), { ssr: false })

interface Message {
  role: 'user' | 'assistant'
  content: string
  type?: 'mission-story'  // Special styling for mission briefings
}

interface UserData {
  username: string
  level: number
  xp: number
}

interface MissionSummary {
  id: string
  title: string
  subtitle: string
  emoji: string
  level: number
  xpTotal: number
  objectiveCount: number
  locked: boolean
  completed: boolean
  inProgress: boolean
}

// Feature flag: set to true to show XP bar and level badge
const SHOW_LEVELING_UI = false

const ASCII_LOGO = `  ____            _        ___                  _
 | __ )  __ _ ___| |__    / _ \\ _   _  ___  ___| |_
 |  _ \\ / _\` / __| '_ \\  | | | | | | |/ _ \\/ __| __|
 | |_) | (_| \\__ \\ | | | | |_| | |_| |  __/\\__ \\ |_
 |____/ \\__,_|___/_| |_|  \\__\\_\\\\__,_|\\___||___/\\__|`

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/'
}

const getCookie = (name: string): string | null => {
  const value = document.cookie.split('; ').find(row => row.startsWith(name + '='))
  return value ? decodeURIComponent(value.split('=')[1]) : null
}

const deleteCookie = (name: string) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
}

export default function Home() {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [showChangelog, setShowChangelog] = useState(false)
  const [levelUpNotification, setLevelUpNotification] = useState<LevelInfo | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mission state
  const [showMissionSelect, setShowMissionSelect] = useState(false)
  const [missions, setMissions] = useState<MissionSummary[]>([])
  const [activeMission, setActiveMission] = useState<Mission | null>(null)
  const [missionObjectivesCompleted, setMissionObjectivesCompleted] = useState<string[]>([])
  const [currentObjectiveIndex, setCurrentObjectiveIndex] = useState(0)
  const [showMissionBriefing, setShowMissionBriefing] = useState<Mission | null>(null)
  const [missionComplete, setMissionComplete] = useState<{
    emoji: string
    title: string
    successMessage: string
    xpEarned: number
  } | null>(null)
  const [missionSetupPending, setMissionSetupPending] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [pendingMissionOffer, setPendingMissionOffer] = useState<string | null>(null) // RPG-style: mission ID offered by DATA
  const [commandsSinceOffer, setCommandsSinceOffer] = useState(0) // Track commands to know when to offer mission
  const [discoveryFileReady, setDiscoveryFileReady] = useState(false) // Track if discovery file exists
  const [terminalBooted, setTerminalBooted] = useState(false) // Track terminal boot state
  const terminalRef = useRef<V86TerminalRef>(null)

  const CHANGELOG = `# Bash Quest Changelog

## v0.9.8 - Storage Fix
- Capped chat history to last 50 messages (was unbounded → Redis bloat)
- Learner profile still persists all important data

## v0.9.7 - Better Pacing
- Mission offer now waits for 3 commands (not 1) - explore first!
- If you say "nein", DATA asks again later (doesn't give up)
- AI now focuses on PROGRESSION: every command should show visible results
- No more "cd ~" when already home - only meaningful commands

## v0.9.6 - Organic Mission Flow
- DATA offers missions AFTER your first command (explore first!)
- "Uebrigens... ich habe eine Mission fuer dich"
- Type "#ja" to accept, "#nein" to keep exploring
- AI now knows user runs as root (~ = /root, not /home)

## v0.9.5 - Story Checkpoints
- Mission complete messages now tease the NEXT mission!
- Each mission flows into the next with story elements
- Epic finale message when you complete all missions
- Leveling/XP bar hidden for now (focus on missions!)

## v0.9.4 - RPG Mission Flow
- DATA now offers missions in dialogue - like a real RPG!
- Type "#ja" to accept, "#nein" to explore freely
- No more modal popups - pure text-driven experience

## v0.9.3 - Terminal Fixes
- TAB completion now works for mission verification!
- Fixed key repeat rate (was insanely fast)

## v0.9.2 - Mission Overhaul
- AI now knows your current mission objective - guides you properly!
- Mission 1: Daniel hat den Maschinenraum versteckt (*schnips*)
- Teaches hidden files (ls -a) with story reason
- TAB autocomplete hint included
- Briefings are pure story, objectives show in HUD
- Compact mission HUD - just current objective

## v0.9.1 - Stronger Socratic Method
- AI won't spoon-feed answers anymore
- Poses riddles and puzzles before explaining
- "What do YOU think 'cat' does?" instead of just telling you
- Etymology hints - command names have stories!
- Makes you THINK like an explorer, not memorize like a student

## v0.9.0 - Rapport Building!
- AI now builds RELATIONSHIP with player, not just teaches
- Tracks jokes you laughed at, clever guesses, curiosity moments
- References past interactions naturally ("Remember when you guessed tap?")
- Inside jokes become part of your journey
- You're not just another student - you're DATA's student

## v0.8.0 - SiW Missions!
- All missions themed after "Sinnlos im Weltraum" episodes
- "Damit fing der Wahnsinn an" - Pizzamann auf der Kommandozeile!
- "Versuchskaninchen" - Riesen-Himbeerklümpschen
- "Planet der Klone" - Dat sind Zwillinge!
- "Darmok" - Nooinzischtaaauusend!
- "Zeitsprung mit Daniel" - *schnips*
- Full SiW lore and quotes integrated

## v0.7.0 - All-In Terminal
- Type everything in terminal - commands run directly
- Use # for questions to AI (bash comment syntax!)
- Model fallback: auto-switches to smaller model on rate limits
- Better error messages when AI is unavailable

## v0.6.0 - Missions
- 5 story-driven missions combining learned skills
- Real files created in VM for each mission
- Objective tracking with XP rewards
- Mission HUD shows progress during gameplay
- Missions unlock as you level up

## v0.5.0 - AI Memory
- AI remembers your learning progress across sessions
- Tracks commands you've used
- Records topics mastered and struggles
- Teaching observations saved for personalization

## v0.4.0 - AI-Integrated Terminal
- Real Linux VM runs in browser (v86 emulator)
- AI sees what you type in terminal
- Auto-feedback after each command
- Side-by-side layout (terminal left, chat right)

## v0.3.0 - Real Linux Terminal
- Added real Linux terminal (v86 emulator)
- Fixed game state persistence on return visits

## v0.2.0 - Server-Side Storage
- User accounts stored on server (Redis)
- Passwords properly validated
- Chat history persists across sessions

## v0.1.0 - Initial Release
- Socratic bash learning game
- AI teacher using Llama 3.3 70B via Groq
- User authentication
`

  useEffect(() => {
    const savedUser = getCookie('bashquest_user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        loadUserData(userData.username)
      } catch (e) {
        console.error('Failed to parse user data')
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }, [])

  const loadUserData = async (username: string) => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'load', username })
      })
      if (res.ok) {
        const data = await res.json()
        if (data.user?.messages?.length > 0) {
          setMessages(data.user.messages)
        }
      }
    } catch (e) {
      console.error('Failed to load user data')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (user && messages.length > 0) {
      fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          username: user.username,
          messages,
          level: user.level,
          xp: user.xp
        })
      }).catch(console.error)
    }
  }, [messages, user])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    if (!loginUsername.trim()) {
      setLoginError('Please enter a username')
      return
    }
    if (!loginPassword.trim()) {
      setLoginError('Please enter a password')
      return
    }

    setLoginLoading(true)

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          username: loginUsername.trim(),
          password: loginPassword
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setLoginError(data.error || 'Login failed')
        setLoginLoading(false)
        return
      }

      const userData: UserData = {
        username: data.user.username,
        level: data.user.level || 1,
        xp: data.user.xp || 0
      }

      setCookie('bashquest_user', JSON.stringify(userData), 30)
      setUser(userData)

      if (data.user.messages?.length > 0) {
        setMessages(data.user.messages)
      } else {
        startGame(userData.username)
      }
    } catch (error) {
      console.error('Login error:', error)
      setLoginError('Connection error. Try again.')
    }

    setLoginLoading(false)
  }

  const handleLogout = () => {
    deleteCookie('bashquest_user')
    setUser(null)
    setMessages([])
    setLoginUsername('')
    setLoginPassword('')
  }

  const handleFullReset = async () => {
    if (!user) return
    setShowResetConfirm(false)

    // Reset server-side data (XP, learner profile, messages)
    try {
      await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reset',
          username: user.username
        })
      })
    } catch (e) {
      console.error('Failed to reset server data:', e)
    }

    // Reset local state
    setMessages([])
    setActiveMission(null)
    setMissionObjectivesCompleted([])
    setCurrentObjectiveIndex(0)
    const resetUser = { ...user, xp: 0, level: 1 }
    setUser(resetUser)
    setCookie('bashquest_user', JSON.stringify(resetUser), 30)

    // Start fresh
    startGame(user.username)
  }

  const startGame = async (username: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [],
          isStart: true,
          username
        }),
      })
      const data = await res.json()
      if (data.message) {
        setMessages([{ role: 'assistant', content: data.message }])

        // Mission offer now happens after first command (more organic)
      } else if (data.error) {
        setMessages([{ role: 'assistant', content: `⚠️ ${data.error}\n\nThe AI is having trouble. Type commands in terminal to explore, or try again in a moment!` }])
      }
    } catch (error) {
      console.error('Error starting game:', error)
      setMessages([{ role: 'assistant', content: '⚠️ Connection error. The AI is unreachable. Try refreshing!' }])
    }
    setLoading(false)
  }

  const handleXPUpdate = useCallback((xpEarned: number, newTotalXP: number) => {
    if (!user || xpEarned <= 0) return

    const oldXP = user.xp
    setUser({ ...user, xp: newTotalXP })
    setCookie('bashquest_user', JSON.stringify({ ...user, xp: newTotalXP }), 30)

    // Level up popup disabled - missions are reward enough for now
    // const levelUp = checkLevelUp(oldXP, newTotalXP)
    // if (levelUp) { setLevelUpNotification(levelUp) }
  }, [user])

  // ==================
  // MISSION FUNCTIONS
  // ==================

  const loadMissions = useCallback(async () => {
    if (!user) return
    try {
      const res = await fetch(`/api/missions?username=${encodeURIComponent(user.username)}`)
      const data = await res.json()
      if (data.missions) {
        setMissions(data.missions)
      }
    } catch (error) {
      console.error('Failed to load missions:', error)
    }
  }, [user])

  const startMission = async (missionId: string) => {
    if (!user) return

    try {
      const res = await fetch('/api/missions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'start',
          username: user.username,
          missionId
        })
      })
      const data = await res.json()

      if (data.success && data.mission) {
        const mission = getMissionById(missionId)
        if (mission) {
          setActiveMission(mission)
          setMissionObjectivesCompleted([])
          setCurrentObjectiveIndex(0)
          setShowMissionBriefing(null)
          setShowMissionSelect(false)

          // Add mission briefing to chat as story intro (no markdown - chat is plain text)
          const storyIntro = `${mission.emoji} ${mission.title.toUpperCase()}\n\n${mission.briefing}`
          setMessages(prev => [...prev, { role: 'assistant', content: storyIntro, type: 'mission-story' }])

          // Send setup script to terminal
          setMissionSetupPending(true)
          if (terminalRef.current) {
            terminalRef.current.setupMission(mission.id, mission.setupScript)
          }
        }
      }
    } catch (error) {
      console.error('Failed to start mission:', error)
    }
  }

  // RPG-style: Offer next available mission in dialogue (after enough exploration)
  const COMMANDS_BEFORE_OFFER = 3 // Wait for player to explore a bit first

  const offerNextMission = useCallback(async () => {
    // Don't offer if: no user, already in mission, already offering, or not enough commands yet
    if (!user || activeMission || pendingMissionOffer || commandsSinceOffer < COMMANDS_BEFORE_OFFER) return

    try {
      const missionsRes = await fetch(`/api/missions?username=${encodeURIComponent(user.username)}`)
      const missionsData = await missionsRes.json()
      if (missionsData.missions) {
        const availableMission = missionsData.missions.find(
          (m: MissionSummary) => !m.locked && !m.completed
        )
        if (availableMission && !missionsData.activeMission) {
          const mission = getMissionById(availableMission.id)
          if (mission) {
            // Reset counter - will be re-incremented if they decline
            setCommandsSinceOffer(0)
            // Delay to feel natural after AI response
            setTimeout(() => {
              const offerMessage = `${mission.emoji} Uebrigens... ich habe eine Mission fuer dich, Kadett.\n\n"${mission.title}"\n${mission.subtitle}\n\nWillst du sie annehmen? (#ja / #nein)`
              setMessages(prev => [...prev, { role: 'assistant', content: offerMessage }])
              setPendingMissionOffer(mission.id)
            }, 2500)
          }
        }
      }
    } catch (e) {
      console.error('Failed to offer mission:', e)
    }
  }, [user, activeMission, pendingMissionOffer, commandsSinceOffer])

  const verifyObjective = async (command: string, output: string) => {
    if (!user || !activeMission) return

    const currentObjective = activeMission.objectives[currentObjectiveIndex]
    if (!currentObjective || missionObjectivesCompleted.includes(currentObjective.id)) return

    try {
      const res = await fetch('/api/missions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify',
          username: user.username,
          missionId: activeMission.id,
          objectiveId: currentObjective.id,
          command,
          output
        })
      })
      const data = await res.json()

      if (data.objectiveComplete) {
        setMissionObjectivesCompleted(prev => [...prev, currentObjective.id])

        if (data.missionComplete) {
          // Mission complete!
          setMissionComplete({
            emoji: activeMission.emoji,
            title: activeMission.title,
            successMessage: data.successMessage || activeMission.successMessage,
            xpEarned: data.xpEarned
          })
          setActiveMission(null)
          handleXPUpdate(data.xpEarned, data.newTotalXP)
          loadMissions() // Refresh mission list
        } else {
          // Advance to next objective
          setCurrentObjectiveIndex(prev => prev + 1)
          handleXPUpdate(data.xpEarned, data.newTotalXP)
        }
      }
    } catch (error) {
      console.error('Failed to verify objective:', error)
    }
  }

  const abandonMission = async () => {
    if (!user || !activeMission) return

    try {
      await fetch('/api/missions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'abandon',
          username: user.username,
          missionId: activeMission.id
        })
      })
      setActiveMission(null)
      setMissionObjectivesCompleted([])
      setCurrentObjectiveIndex(0)
    } catch (error) {
      console.error('Failed to abandon mission:', error)
    }
  }

  const handleMissionReady = useCallback(() => {
    setMissionSetupPending(false)
  }, [])

  // Discovery file content - DATA's first message as a file
  const DISCOVERY_FILE_CONTENT = `===============================================
TRANSMISSION VON: DATA
AN: Neuer Kadett
===============================================

Kadett,

Wenn du das liest, hast du bereits gelernt
wie man Dateien oeffnet. Gut.

Die Enterprise braucht dich. Der Captain
bruellt nach schwarzem Kaffee, aber der
Maschinenraum ist VERSCHWUNDEN.

Daniel hat wieder *schnips* gemacht.

Deine erste Mission wartet. Finde heraus
wo du bist. Orientiere dich. Dann melde
dich bei mir.

Drei Buchstaben. Was sind sie?

- DATA

PS: Antworte mit #ja wenn du bereit bist.
    Oder erkunde erstmal frei mit #nein.
===============================================`

  // Create discovery file when terminal boots
  const handleTerminalBoot = useCallback(() => {
    setTerminalBooted(true)
    // Wait a moment for terminal to be fully ready, then create discovery file
    setTimeout(() => {
      if (terminalRef.current && !activeMission) {
        terminalRef.current.setupDiscovery('nachricht.txt', DISCOVERY_FILE_CONTENT)
      }
    }, 3000) // Wait 3s after boot for shell to be ready
  }, [activeMission])

  const handleDiscoveryReady = useCallback((filename: string) => {
    console.log('Discovery file created:', filename)
    setDiscoveryFileReady(true)
  }, [])

  // Load missions when user logs in
  useEffect(() => {
    if (user) {
      loadMissions()
    }
  }, [user, loadMissions])

  // Offer mission when command count reaches threshold
  useEffect(() => {
    if (commandsSinceOffer >= COMMANDS_BEFORE_OFFER) {
      offerNextMission()
    }
  }, [commandsSinceOffer, offerNextMission])

  const handleTerminalCommand = useCallback(async (command: string, output: string) => {
    if (!user || loading) return

    // If mission is active, verify objective
    if (activeMission && !missionSetupPending) {
      verifyObjective(command, output)
    }

    // Extract current directory from output (prompt shows path like "/root%" or "enterprise%")
    const extractCurrentDir = (out: string): string => {
      const lines = out.split('\n')
      for (let i = lines.length - 1; i >= 0; i--) {
        const match = lines[i].match(/^([~\/][^\s%]*|[a-zA-Z][^\s%]*)%/)
        if (match) return match[1]
      }
      return '/root' // default
    }
    const currentDirectory = extractCurrentDir(output)

    // Auto-send terminal activity to AI for feedback
    const terminalContext = `[TERMINAL] User ran: ${command}\nOutput: ${output.slice(0, 500)}`
    const newMessages: Message[] = [...messages, { role: 'user', content: terminalContext }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          username: user.username,
          terminalCommand: command,
          terminalOutput: output,
          currentDirectory, // Pass current dir so AI knows context
          // Pass mission context so AI knows what player is working on
          missionContext: activeMission ? {
            id: activeMission.id,
            title: activeMission.title,
            currentObjective: activeMission.objectives[currentObjectiveIndex],
            completedObjectives: missionObjectivesCompleted,
            totalObjectives: activeMission.objectives.length
          } : null
        }),
      })
      const data = await res.json()
      if (data.message) {
        setMessages([...newMessages, { role: 'assistant', content: data.message }])
        // Handle XP update
        if (data.xpEarned && data.newTotalXP) {
          handleXPUpdate(data.xpEarned, data.newTotalXP)
        }
        // Track commands for mission offer timing (only if not in mission)
        if (!activeMission) {
          setCommandsSinceOffer(prev => prev + 1)
        }
        // Mission offer is handled by useEffect watching commandsSinceOffer
      } else if (data.error) {
        // Show error message from API
        setMessages([...newMessages, { role: 'assistant', content: `⚠️ ${data.error}` }])
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages([...newMessages, { role: 'assistant', content: '⚠️ Connection lost. Try again!' }])
    }
    setLoading(false)
  }, [user, messages, loading, handleXPUpdate, activeMission, missionSetupPending, verifyObjective])

  // Handle # comments from terminal as questions to AI
  const handleUserQuestion = useCallback(async (question: string) => {
    if (!user || loading) return

    // Handle special commands
    if (question.toLowerCase() === 'reset' || question.toLowerCase() === '/reset') {
      setShowResetConfirm(true)
      return
    }
    if (question.toLowerCase() === 'logout' || question.toLowerCase() === '/logout') {
      handleLogout()
      return
    }

    // RPG-style: Check if user is accepting/declining a mission offer
    if (pendingMissionOffer) {
      const answer = question.toLowerCase().trim()
      const acceptWords = ['ja', 'yes', 'ok', 'okay', 'annehmen', 'accept', 'klar', 'sicher', 'mach ich', 'los', 'jep', 'jap', 'jo', 'yeah', 'yep', 'y']
      const declineWords = ['nein', 'no', 'nope', 'nee', 'ne', 'spaeter', 'later', 'n']

      if (acceptWords.some(w => answer === w || answer.startsWith(w + ' '))) {
        // Accept mission!
        setMessages(prev => [...prev, { role: 'user', content: question }])
        startMission(pendingMissionOffer)
        setPendingMissionOffer(null)
        return
      }

      if (declineWords.some(w => answer === w || answer.startsWith(w + ' '))) {
        // Decline - can explore freely, we'll ask again later
        setMessages(prev => [
          ...prev,
          { role: 'user', content: question },
          { role: 'assistant', content: 'Kein Problem! Erkunde erstmal frei. Ich frag spaeter nochmal.' }
        ])
        setPendingMissionOffer(null)
        // Counter is already at 0 (reset when we offered), so it will count up again
        return
      }
    }

    const newMessages: Message[] = [...messages, { role: 'user', content: question }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          username: user.username,
          // Pass mission context so AI knows what player is working on
          missionContext: activeMission ? {
            id: activeMission.id,
            title: activeMission.title,
            currentObjective: activeMission.objectives[currentObjectiveIndex],
            completedObjectives: missionObjectivesCompleted,
            totalObjectives: activeMission.objectives.length
          } : null
        }),
      })
      const data = await res.json()
      if (data.message) {
        setMessages([...newMessages, { role: 'assistant', content: data.message }])
        if (data.xpEarned && data.newTotalXP) {
          handleXPUpdate(data.xpEarned, data.newTotalXP)
        }
      } else if (data.error) {
        // Show error message from API
        setMessages([...newMessages, { role: 'assistant', content: `⚠️ ${data.error}` }])
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages([...newMessages, { role: 'assistant', content: '⚠️ Connection lost. Try again!' }])
    }
    setLoading(false)
  }, [user, messages, loading, handleXPUpdate, handleLogout, pendingMissionOffer, startMission])

  if (isLoading) {
    return (
      <div className="login-container">
        <div className="login-box">
          <pre>{ASCII_LOGO}</pre>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="login-container">
        <div className="login-box">
          <pre>{ASCII_LOGO}</pre>
          <p>Enter your credentials to begin your quest</p>

          <form onSubmit={handleLogin}>
            <div className="terminal-input">
              <label>username:</label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="adventurer"
                autoFocus
                disabled={loginLoading}
              />
            </div>
            <div className="terminal-input">
              <label>password:</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="********"
                disabled={loginLoading}
              />
            </div>
            {loginError && <p style={{ color: '#f85149', marginBottom: '10px' }}>{loginError}</p>}
            <button type="submit" className="login-submit" disabled={loginLoading}>
              {loginLoading ? 'Connecting...' : 'Start Quest'}
            </button>
          </form>
          <p style={{ marginTop: '20px', fontSize: '0.8rem' }}>
            New here? Just pick a username and password!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="game-container">
      {/* Terminal Display */}
      <div className="terminal-panel">
        <div className="terminal-header">
          <span className="terminal-dot red"></span>
          <span className="terminal-dot yellow"></span>
          <span className="terminal-dot green"></span>
          <span className="terminal-title">{user.username}@bashquest ~ Real Linux</span>
        </div>
        <div className="terminal-body terminal-body-v86">
          <V86Terminal
            ref={terminalRef}
            onCommand={handleTerminalCommand}
            onQuestion={handleUserQuestion}
            onMissionReady={handleMissionReady}
          />
        </div>
      </div>

      {/* Chat Panel */}
      <div className="chat-panel">
        <header className="header">
          <div className="user-info">
            <div className="user-level-row">
              <span>@{user.username}</span>
              {SHOW_LEVELING_UI && (
                <span className="level-badge">
                  {getLevelForXP(user.xp).emoji} Lv.{getLevelForXP(user.xp).level} {getLevelForXP(user.xp).name}
                </span>
              )}
            </div>
            {SHOW_LEVELING_UI && (
              <div className="xp-bar-container">
                <div className="xp-bar" style={{ width: `${getXPProgress(user.xp).percent}%` }}></div>
                <span className="xp-text">
                  {getXPProgress(user.xp).needed > 0
                    ? `${getXPProgress(user.xp).current}/${getXPProgress(user.xp).needed} XP`
                    : `${user.xp} XP (MAX)`}
                </span>
              </div>
            )}
            <div className="header-buttons">
              <button className="mission-btn" onClick={() => setShowMissionSelect(true)}>Missions</button>
              <button className="changelog-btn" onClick={() => setShowChangelog(true)}>changelog</button>
              <button className="logout-btn" onClick={handleLogout}>logout</button>
            </div>
          </div>
        </header>

        {showChangelog && (
          <div className="modal-overlay" onClick={() => setShowChangelog(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowChangelog(false)}>×</button>
              <pre className="changelog-content">{CHANGELOG}</pre>
            </div>
          </div>
        )}

        {levelUpNotification && (
          <div className="modal-overlay" onClick={() => setLevelUpNotification(null)}>
            <div className="modal level-up-modal" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setLevelUpNotification(null)}>×</button>
              <div className="level-up-content">
                <h2>LEVEL UP!</h2>
                <div className="level-up-emoji">{levelUpNotification.emoji}</div>
                <h3>Level {levelUpNotification.level}: {levelUpNotification.name}</h3>
                <p>New skills unlocked:</p>
                <ul>
                  {levelUpNotification.skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
                <button className="level-up-dismiss" onClick={() => setLevelUpNotification(null)}>
                  Continue Quest
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <div className="modal-overlay" onClick={() => setShowResetConfirm(false)}>
            <div className="modal reset-modal" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowResetConfirm(false)}>×</button>
              <div className="reset-content">
                <div className="reset-icon">⚠️</div>
                <h2>Reset All Progress?</h2>
                <p>This will permanently delete:</p>
                <ul>
                  <li>All your XP and level progress</li>
                  <li>Your learning history</li>
                  <li>Chat history with the AI</li>
                  <li>Mission progress</li>
                </ul>
                <p className="reset-warning">This cannot be undone!</p>
                <div className="reset-buttons">
                  <button className="reset-cancel" onClick={() => setShowResetConfirm(false)}>
                    Keep My Progress
                  </button>
                  <button className="reset-confirm" onClick={handleFullReset}>
                    Yes, Reset Everything
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mission Modals */}
        {showMissionSelect && (
          <MissionSelect
            missions={missions}
            userLevel={getLevelForXP(user.xp).level}
            onSelect={(missionId) => {
              const mission = getMissionById(missionId)
              if (mission) {
                setShowMissionBriefing(mission)
                setShowMissionSelect(false)
              }
            }}
            onClose={() => setShowMissionSelect(false)}
          />
        )}

        {showMissionBriefing && (
          <MissionBriefing
            mission={showMissionBriefing}
            onStart={() => startMission(showMissionBriefing.id)}
            onCancel={() => setShowMissionBriefing(null)}
          />
        )}

        {missionComplete && (
          <MissionComplete
            emoji={missionComplete.emoji}
            title={missionComplete.title}
            successMessage={missionComplete.successMessage}
            xpEarned={missionComplete.xpEarned}
            onClose={() => setMissionComplete(null)}
          />
        )}

        {/* Mission HUD - shows during active mission */}
        {activeMission && (
          <MissionHUD
            mission={activeMission}
            currentObjectiveIndex={currentObjectiveIndex}
            objectivesCompleted={missionObjectivesCompleted}
            onAbandon={abandonMission}
          />
        )}

        <div className="messages">
          {messages.map((msg, i) => {
            // Hide terminal context messages from display
            if (msg.role === 'user' && msg.content.startsWith('[TERMINAL]')) {
              return null
            }
            return (
              <div key={i} className={`message ${msg.role}${msg.type === 'mission-story' ? ' mission-story' : ''}`}>
                {msg.content}
              </div>
            )
          })}
          {loading && <div className="message assistant loading">Thinking...</div>}
          <div ref={messagesEndRef} />
        </div>

      </div>
    </div>
  )
}
