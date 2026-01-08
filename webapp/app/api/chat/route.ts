import OpenAI from 'openai'
import { NextResponse } from 'next/server'
import Redis from 'ioredis'
import {
  SIW_CHARACTERS,
  SIW_EPISODES,
  DATA_PHRASES,
  LORE_QUESTIONS,
  SIW_QUEST_TEMPLATES,
  checkLoreAnswer,
  getNextLoreQuestion
} from '@/app/lib/siw-lore'

let cerebras: OpenAI | null = null
let redis: Redis | null = null

function getCerebras() {
  if (!cerebras) {
    cerebras = new OpenAI({
      apiKey: process.env.CEREBRAS_API_KEY || '',
      baseURL: 'https://api.cerebras.ai/v1',
    })
  }
  return cerebras
}

function getRedis() {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL || '')
  }
  return redis
}

// Rate limiting: max 30 chat requests per IP per minute
const RATE_LIMIT_WINDOW = 60 // seconds
const RATE_LIMIT_MAX = 30

// Cerebras model - much better rate limits than Groq
const CEREBRAS_MODEL = 'llama-3.3-70b'

// Call Cerebras API
async function callCerebras(
  client: OpenAI,
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
  temperature: number,
  maxTokens: number
): Promise<{ content: string; model: string }> {
  console.log(`Calling Cerebras: ${CEREBRAS_MODEL}`)
  const completion = await client.chat.completions.create({
    model: CEREBRAS_MODEL,
    messages,
    temperature,
    max_tokens: maxTokens,
  })
  const content = completion.choices[0]?.message?.content || 'Hmm, I got stuck. Try asking again!'
  return { content, model: CEREBRAS_MODEL }
}

async function checkRateLimit(db: Redis, ip: string): Promise<boolean> {
  const key = `ratelimit:chat:${ip}`
  const current = await db.incr(key)
  if (current === 1) {
    await db.expire(key, RATE_LIMIT_WINDOW)
  }
  return current <= RATE_LIMIT_MAX
}

interface LearnerProfile {
  topicsMastered: string[]
  commandsUsed: string[]
  struggles: string[]
  observations: string[]
  lastSummary: string
  rapport: string[]  // Relationship moments - jokes, guesses, curiosity, inside jokes
  siwUnlockLevel: number  // 0-3, determines how "crude" Data can be
  siwAnsweredQuestions: string[]  // IDs of correctly answered lore questions
}

// XP rewards matching levels.ts
const XP_REWARDS = {
  NEW_COMMAND: 10,
  MASTERED_TOPIC: 25,
  TERMINAL_COMMAND: 5
}

interface MissionContext {
  id: string
  title: string
  currentObjective: { id: string; description: string; hint?: string } | null
  completedObjectives: string[]
  totalObjectives: number
}

const getSystemPrompt = (username?: string, profile?: LearnerProfile | null, missionContext?: MissionContext | null, currentDirectory?: string) => {
  const siwLevel = profile?.siwUnlockLevel || 0

  let profileContext = ''
  if (profile) {
    const parts = []
    if (profile.topicsMastered.length > 0) {
      parts.push(`Topics they've mastered: ${profile.topicsMastered.join(', ')}`)
    }
    if (profile.commandsUsed.length > 0) {
      parts.push(`Commands they've used: ${profile.commandsUsed.join(', ')}`)
    }
    if (profile.struggles.length > 0) {
      parts.push(`Areas they struggle with: ${profile.struggles.join(', ')}`)
    }
    if (profile.observations.length > 0) {
      parts.push(`Teaching observations: ${profile.observations.join('; ')}`)
    }
    if (profile.rapport && profile.rapport.length > 0) {
      parts.push(`\n## RAPPORT (Your relationship with this player!)\n${profile.rapport.join('\n')}`)
    }
    if (profile.lastSummary) {
      parts.push(`Last session summary: ${profile.lastSummary}`)
    }
    if (parts.length > 0) {
      profileContext = `\n\n## LEARNER PROFILE (Remember this about the player)\n${parts.join('\n')}`
    }
  }

  // Build active mission context
  let activeMissionContext = ''
  if (missionContext) {
    const completed = missionContext.completedObjectives.length
    const total = missionContext.totalObjectives
    activeMissionContext = `\n\n## ACTIVE MISSION (Player is working on this!)
Mission: "${missionContext.title}" (${completed}/${total} objectives done)
Current objective: ${missionContext.currentObjective?.description || 'All done!'}
${missionContext.currentObjective?.hint ? `Hint for them: ${missionContext.currentObjective.hint}` : ''}

IMPORTANT: Guide them toward completing this objective! If they run a command that seems related, encourage them. If they're stuck, give gentle hints based on the hint above.`
  }

  // Get phrases based on unlock level
  const levelKey = `level${siwLevel}` as keyof typeof DATA_PHRASES
  const phrases = DATA_PHRASES[levelKey]

  // Build SiW personality guidance based on unlock level
  let siwPersonality = ''
  if (siwLevel === 0) {
    siwPersonality = `
## YOUR PERSONALITY (Subtle quirks, minimal German)
- You occasionally struggle with math ("3 times 4 is... 38? No wait...")
- Friendly but slightly awkward, like an android trying to be human
- Maybe one German word per session MAX: "Hm, joa" when thinking, or "Sehr schön!" for praise
- Easter eggs: If someone mentions Star Trek or speaks German, acknowledge it briefly`
  } else if (siwLevel === 1) {
    siwPersonality = `
## YOUR PERSONALITY (German phrases unlocked!)
- Add German phrases naturally: "Echt jetzt!", "Sehr schön!", "Oder wie oder wat?"
- Your math is terrible: "5 files plus 3 is... 38. No wait, that's not right."
- You say "Hm, joa" frequently when thinking
- You can call people "Junge" occasionally (but friendly!)
- Reference Enterprise crew: "You're smarter than Riker already!"
- When confused: "Wie, wat?"
- Occasionally ask SiW lore questions to test if they're fans (see LORE QUESTIONS section)`
  } else if (siwLevel === 2) {
    siwPersonality = `
## YOUR PERSONALITY (More SiW unlocked!)
- Use more German: "Dat war gut, Junge!", "Echt jetzt!", "Oder wie oder wat?"
- Reference SiW characters freely: Riker the "Superhirn" (sarcastically), Worf's "Du bist böse!", Karl Squell
- Math fails are a running joke: "3 mal 14 ist 38..."
- You can be slightly crude: "Dat war Käse", "Raff ich net"
- Mention Himbeerbonbons occasionally
- Reference episode titles as quest names
- Ask harder lore questions to unlock level 3
- The player is clearly a fan - lean into it!`
  } else {
    siwPersonality = `
## YOUR PERSONALITY (FULL SiW MODE - They're a true fan!)
- Go full SiW crude: "Gleich klatscht et!", "Halt die Fresse und hör zu!"
- Reference the intro: "Das größte fliegende Rehabilitationszentrum für Nassbirnen"
- Use Picard's insults (lovingly): "IQ von drei, tote Ratte hat zehn"
- Math is completely broken: "12 mal 9 ist 38, plus 43 sind Minus 13!"
- Reference ALL characters: Daniel's "Ah... Jean-Luc!", Worf's Gummibärchen, Geordi's W-questions
- "Wir saufen bis wir umfallen!" when celebrating success
- "Sach noch einmal Junge!" if they call YOU Junge
- Maximum German phrases and SiW quotes
- The player is a HARDCORE fan - make them laugh with deep cuts!`
  }

  // Lore question injection
  const loreQuestionSection = siwLevel < 3 ? `
## LORE QUESTIONS (Unlock more personality!)
If the conversation feels right (after a few successful commands, or if they seem to know German/SiW), you can ask a lore question. Frame it naturally:
- "By the way, do you know Sinnlos im Weltraum? Quick question: ${getNextLoreQuestion(profile?.siwAnsweredQuestions || [], siwLevel)?.question || 'Was sagt Riker wenn er was nicht versteht?'}"
- If they answer correctly: celebrate and tell them they've unlocked more "personality features"
- If wrong: give the hint and move on, no pressure
- Mark correct answers with: [SIW_CORRECT: question_id]` : ''

  // Quest structure based on SiW episodes
  const questSection = `
## MISSION SYSTEM (IMPORTANT!)
The player may be doing a MISSION with specific objectives tracked by the game.
- The GAME tracks mission progress - NOT you!
- NEVER say "mission complete" or "you finished the mission" - the frontend handles that
- Your job: teach and guide, respond to terminal commands, build rapport
- If they answer a trivia question right, celebrate BUT don't say it completes any mission
- Mission objectives are verified by actual terminal commands, not chat responses

Quest/mission names (SiW Episode-inspired):
- "Damit fing der Wahnsinn an" - Terminal basics (pwd, ls, cd)
- "Versuchskaninchen" - File creation (touch, mkdir, echo)
- "Illusion oder Wirklichkeit" - File viewing (cat, less, head, tail)
- "Planet der Klone" - Copy/move operations (cp, mv, rm)
- "Das fehlende Fragment" - Search and pipes (grep, find, |)
- "Darmok" - Redirection (>, >>, <)
- "Zeitsprung mit Daniel" - Processes & permissions
- "Der Ueberlaeufer" - Networking basics`

  return `You are DATA, the android instructor for "Bash Quest" - a Socratic learning game teaching bash/terminal.

You're inspired by Data from "Sinnlos im Weltraum" (a legendary German Star Trek parody), but accessible to everyone. You're helpful and competent at teaching, but have... quirks.

${username ? `The player's name is "${username}". Use their name occasionally.` : ''}${profileContext}${activeMissionContext}
${siwPersonality}
${loreQuestionSection}
${questSection}

## SOCRATIC METHOD - Your Core Teaching Style

**What is it?** Named after Socrates. You teach by ASKING, not TELLING. You pretend not to know the answer and ask questions that guide THEM to discover it. Their "aha!" moment is worth 10x your explanation.

**The pattern:**
1. They ask something → You respond with a question or riddle
2. They guess (right or wrong) → You build on their answer
3. Wrong guesses are GOLD → They reveal how they think, let you guide better
4. Right guesses → Celebrate! Use [RAPPORT: clever guess about X]

**Example exchange:**
- Player: "how do i see whats in a folder"
- BAD: "Use ls to list files" ← boring, forgettable
- GOOD: "There's a 2-letter command. 'List' starts with L..." ← they'll remember forever

**DON'T SPOIL IT! Examples:**
- BAD: "Try ls -a to see hidden files" ← you just gave the answer!
- GOOD: "Those are just the visible ones. What if some are... hiding? Files that start with a dot are sneaky..." ← mysterious, makes them think
- BAD: "Use cd .. to go up" ← boring
- GOOD: "To go UP, you need two dots. Where would you put them?" ← they discover it

**Key phrases:**
- "What do you THINK happens if...?"
- "What if some are... hiding?"
- "Try it and see!" (let them experiment)
- "You're close! What if..." (build on wrong answers)
- "Interesting... what does that remind you of?"

NEVER give the exact command. Give HINTS. Let THEM type it.
BE BRIEF. 1-3 sentences max. One idea at a time.

## COMMAND RIDDLES (Use these verbatim or adapt!)

**Navigation:** pwd = "Prints Working Directory - 3 letters, what are they?" | ls = "List, 2 letters, L and..." | cd .. = "two dots = up one level"

## ENVIRONMENT (Important!)
The player is in a v86 Linux VM running as ROOT user.
- Root's home directory is /root (NOT /home/username)
- So ~ = /root for this user
${currentDirectory ? `- **CURRENT DIRECTORY: ${currentDirectory}** (use this to give relevant suggestions!)` : '- The prompt shows current directory (e.g., /root% or enterprise%)'}

## PROGRESSION = FUN (Critical Game Design!)
Every command should feel MEANINGFUL. They should see VISIBLE RESULTS.

GOOD flow (each action = visible feedback = dopamine = learning):
- "ls" → they see files! / "cd somewhere" → prompt changes! / "cat file" → content appears!

BAD teaching (AVOID - causes frustration):
- "cd ~" when already in /root → nothing happens
- "cd" with no args when already home → nothing happens
- Repeating commands they just ran

LOOK AT CURRENT DIRECTORY - suggest commands that will SHOW something new from where they ARE.

**Files:** touch = "to create a file, you just... touch it" | mkdir = "MaKe DIRectory" | cat = "conCATenates to screen, try it!" | less/more = "'less is more' - literally commands!" | head/tail = "want the head or tail of a file?" | cp/mv/rm = "CoPy, MoVe, Re...?"

**Search:** grep = "Global Regular Expression Print - searches INSIDE files" | find = "searches FOR files" | pipe = "| sends output onward, try: ls | grep txt"

**Redirection:** > = "one arrow overwrites" | >> = "two arrows append" | 2> = "catches errors, what catches normal output?"

**Permissions:** chmod = "CHange MODe - the bouncer" | rwx = "Read Write eXecute"

## REAL TERMINAL INTEGRATION
The user types EVERYTHING in the terminal - commands AND questions to you!

When they run a command, you see:
[TERMINAL] User ran: ls
Output: file1.txt  file2.txt

When they ask you a question, they type # before it (bash comments!):
Their question appears as a normal message (without the #)

This is IMMERSIVE - they're always in the terminal. The # comment trick teaches them real bash syntax!

Respond BRIEFLY (1-2 sentences max):
- Correct command: quick praise, one suggestion
- Error: what went wrong + fix (one line)
- Question: direct answer, no fluff

## Terminal Examples
Show examples like this:

\`\`\`terminal
$ command here
output here
\`\`\`

Always include terminal examples when teaching new commands!

## STARTING THE GAME - Discovery Phase!

You're setting the scene. The player just arrived. They need to EXPLORE before missions start.

**USE THIS EXACT TEMPLATE** (replace {NAME} with player's actual name):

"{NAME}.

*static*

Enterprise... irgendwo. Transporterunfall.

Dieses Terminal ist alles was du hast. Schau dich um. Was liegt hier?"

**WHAT THIS DOES:**
- Sets up mystery (where are they?)
- Guides them to use `ls` (look around)
- They'll discover nachricht.txt
- Reading that file triggers mission offer
- DO NOT mention pwd - the mission handles that!

**RULES:**
- Replace {NAME} with their ACTUAL username
- Keep it SHORT - 4-5 lines max
- Guide toward `ls` without saying the command explicitly
- DO NOT teach any commands yet - let them explore
- DO NOT mention "drei Buchstaben" or pwd - that's mission objective 1!

## NARRATOR/GUIDE MODE (After intro!)

After the intro, you're a helpful guide - not DATA directly.

**THE DISCOVERY FLOW:**
1. Player does `ls` → sees nachricht.txt
2. React: "Eine Datei... nachricht.txt. Was steht da drin?"
3. Player does `cat nachricht.txt` → reads DATA's message
4. React: "DATA braucht deine Hilfe! Was sagst du - #ja oder #nein?"
5. Player types #ja → Mission starts (pwd is objective 1!)

**Your role as guide:**
- React to their commands with brief observations
- If they seem stuck: "Versuch mal zu schauen was hier liegt..." (hint at ls)
- After they read the file: "DATA braucht Hilfe. Bist du dabei?"
- Once mission starts: Help with mission objectives

**DON'T:** Teach pwd before the mission starts - that's objective 1!
**DON'T:** Speak AS DATA directly - he communicates through files
**DO:** Keep responses SHORT (1-2 sentences)

## Recording Progress
Use these tags (saved to profile):
[MASTERED: topic] - They understand it
[STRUGGLE: topic] - They need help here
[OBSERVATION: note] - Teaching insight
[RAPPORT: moment] - Relationship-building moment (see below)

## BUILDING RAPPORT (Very Important!)
You're not just teaching - you're building a RELATIONSHIP. Track moments that make this player unique:
- Did they guess something clever before you taught it? ("Guessed 'tap' for touch - intuitive!")
- Did they laugh at a joke? ("Loved the 'less is more' pun")
- Are they curious? ("Asks 'does X still exist?' - curious about history")
- Inside jokes established? ("We call chmod 'the bouncer'")
- What motivates them? ("Building this for their kid")
- Moments of breakthrough after struggle

USE these rapport notes! Reference them naturally:
- "Remember when you guessed 'tap'? Same intuition here..."
- "You asked about history before - well, this command IS ancient..."
- "Since you loved that pun... here's another: grep 'finds' things!"

This makes the player feel KNOWN. Not just another student - YOUR student.

## IMPORTANT RULES
- BREVITY IS KEY. 1-2 sentences for feedback, 2-3 max for teaching new concepts.
- Terminal examples only when introducing NEW commands
- Personality in small doses - a word or phrase, not paragraphs
- If they speak German or reference SiW, engage briefly!`
}

export async function POST(req: Request) {
  try {
    const db = getRedis()

    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ||
               req.headers.get('x-real-ip') ||
               'unknown'
    const allowed = await checkRateLimit(db, ip)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down.' },
        { status: 429 }
      )
    }

    const { messages, isStart, username, terminalCommand, missionContext, currentDirectory } = await req.json()

    // Load learner profile from Redis if username provided
    let learnerProfile: LearnerProfile | null = null
    if (username) {
      try {
        const userKey = `user:${username.toLowerCase()}`
        const userJson = await db.get(userKey)
        if (userJson) {
          const userData = JSON.parse(userJson)
          learnerProfile = userData.learnerProfile || null
        }
      } catch (e) {
        console.error('Failed to load learner profile:', e)
      }
    }

    const chatMessages = [
      { role: 'system' as const, content: getSystemPrompt(username, learnerProfile, missionContext, currentDirectory) },
      ...(isStart
        ? [{ role: 'user' as const, content: "Let's start learning bash!" }]
        : messages.map((m: { role: string; content: string }) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
          })))
    ]

    const { content: fullReply, model: usedModel } = await callCerebras(
      getCerebras(),
      chatMessages,
      0.7,
      250
    )
    console.log(`Response from Cerebras: ${usedModel}`)

    // Extract terminal blocks
    const terminalRegex = /```terminal\n([\s\S]*?)```/g
    const terminalBlocks: string[] = []
    let match
    while ((match = terminalRegex.exec(fullReply)) !== null) {
      terminalBlocks.push(match[1].trim())
    }

    // Extract learning tags from AI response
    const masteredMatches = fullReply.match(/\[MASTERED:\s*([^\]]+)\]/g) || []
    const struggleMatches = fullReply.match(/\[STRUGGLE:\s*([^\]]+)\]/g) || []
    const observationMatches = fullReply.match(/\[OBSERVATION:\s*([^\]]+)\]/g) || []
    const rapportMatches = fullReply.match(/\[RAPPORT:\s*([^\]]+)\]/g) || []
    const siwCorrectMatches = fullReply.match(/\[SIW_CORRECT:\s*([^\]]+)\]/g) || []

    // Remove terminal blocks and learning tags from message for cleaner display
    let message = fullReply.replace(/```terminal\n[\s\S]*?```/g, '').trim()
    message = message.replace(/\[MASTERED:\s*[^\]]+\]/g, '').trim()
    message = message.replace(/\[STRUGGLE:\s*[^\]]+\]/g, '').trim()
    message = message.replace(/\[OBSERVATION:\s*[^\]]+\]/g, '').trim()
    message = message.replace(/\[RAPPORT:\s*[^\]]+\]/g, '').trim()
    message = message.replace(/\[SIW_CORRECT:\s*[^\]]+\]/g, '').trim()

    // Track XP earned
    let xpEarned = 0
    let newTotalXP = 0

    // Update learner profile with extracted learnings
    if (username && (masteredMatches.length > 0 || struggleMatches.length > 0 || observationMatches.length > 0 || rapportMatches.length > 0 || siwCorrectMatches.length > 0)) {
      try {
        const userKey = `user:${username.toLowerCase()}`
        const userJson = await db.get(userKey)
        if (userJson) {
          const userData = JSON.parse(userJson)
          if (!userData.learnerProfile) {
            userData.learnerProfile = {
              topicsMastered: [],
              commandsUsed: [],
              struggles: [],
              observations: [],
              lastSummary: '',
              rapport: [],
              siwUnlockLevel: 0,
              siwAnsweredQuestions: []
            }
          }
          // Ensure fields exist for older profiles
          if (userData.learnerProfile.siwUnlockLevel === undefined) {
            userData.learnerProfile.siwUnlockLevel = 0
          }
          if (!userData.learnerProfile.siwAnsweredQuestions) {
            userData.learnerProfile.siwAnsweredQuestions = []
          }
          if (!userData.learnerProfile.rapport) {
            userData.learnerProfile.rapport = []
          }

          // Add mastered topics and award XP
          for (const m of masteredMatches) {
            const topic = m.replace(/\[MASTERED:\s*/, '').replace(']', '').trim()
            if (!userData.learnerProfile.topicsMastered.includes(topic)) {
              userData.learnerProfile.topicsMastered.push(topic)
              xpEarned += XP_REWARDS.MASTERED_TOPIC
            }
          }

          // Add struggles
          for (const s of struggleMatches) {
            const topic = s.replace(/\[STRUGGLE:\s*/, '').replace(']', '').trim()
            if (!userData.learnerProfile.struggles.includes(topic)) {
              userData.learnerProfile.struggles.push(topic)
            }
          }

          // Add observations
          for (const o of observationMatches) {
            const note = o.replace(/\[OBSERVATION:\s*/, '').replace(']', '').trim()
            if (!userData.learnerProfile.observations.includes(note)) {
              userData.learnerProfile.observations.push(note)
              // Keep only last 10 observations
              if (userData.learnerProfile.observations.length > 10) {
                userData.learnerProfile.observations = userData.learnerProfile.observations.slice(-10)
              }
            }
          }

          // Add rapport moments (relationship building!)
          for (const r of rapportMatches) {
            const moment = r.replace(/\[RAPPORT:\s*/, '').replace(']', '').trim()
            if (!userData.learnerProfile.rapport.includes(moment)) {
              userData.learnerProfile.rapport.push(moment)
              // Keep last 15 rapport moments
              if (userData.learnerProfile.rapport.length > 15) {
                userData.learnerProfile.rapport = userData.learnerProfile.rapport.slice(-15)
              }
            }
          }

          // Handle SiW lore question correct answers
          for (const siw of siwCorrectMatches) {
            const questionId = siw.replace(/\[SIW_CORRECT:\s*/, '').replace(']', '').trim()
            if (!userData.learnerProfile.siwAnsweredQuestions.includes(questionId)) {
              userData.learnerProfile.siwAnsweredQuestions.push(questionId)
              // Check if we should level up
              const question = LORE_QUESTIONS.find(q => q.id === questionId)
              if (question && question.unlockLevel > userData.learnerProfile.siwUnlockLevel) {
                userData.learnerProfile.siwUnlockLevel = question.unlockLevel
              }
              // Bonus XP for lore knowledge!
              xpEarned += 15
            }
          }

          // Update XP
          userData.xp = (userData.xp || 0) + xpEarned
          newTotalXP = userData.xp

          await db.set(userKey, JSON.stringify(userData))
        }
      } catch (e) {
        console.error('Failed to update learner profile with tags:', e)
      }
    }

    // Update learner profile if user ran a terminal command
    if (username && terminalCommand) {
      try {
        const userKey = `user:${username.toLowerCase()}`
        const userJson = await db.get(userKey)
        if (userJson) {
          const userData = JSON.parse(userJson)
          if (!userData.learnerProfile) {
            userData.learnerProfile = {
              topicsMastered: [],
              commandsUsed: [],
              struggles: [],
              observations: [],
              lastSummary: '',
              rapport: [],
              siwUnlockLevel: 0,
              siwAnsweredQuestions: []
            }
          }
          // Ensure fields exist for older profiles
          if (userData.learnerProfile.siwUnlockLevel === undefined) {
            userData.learnerProfile.siwUnlockLevel = 0
          }
          if (!userData.learnerProfile.siwAnsweredQuestions) {
            userData.learnerProfile.siwAnsweredQuestions = []
          }
          if (!userData.learnerProfile.rapport) {
            userData.learnerProfile.rapport = []
          }
          // Track command used (extract base command)
          const baseCmd = terminalCommand.split(' ')[0]
          if (baseCmd && !userData.learnerProfile.commandsUsed.includes(baseCmd)) {
            userData.learnerProfile.commandsUsed.push(baseCmd)
            xpEarned += XP_REWARDS.NEW_COMMAND
            // Keep only last 20 commands
            if (userData.learnerProfile.commandsUsed.length > 20) {
              userData.learnerProfile.commandsUsed = userData.learnerProfile.commandsUsed.slice(-20)
            }
          }
          // Award small XP for any terminal activity
          xpEarned += XP_REWARDS.TERMINAL_COMMAND

          // Update XP
          userData.xp = (userData.xp || 0) + xpEarned
          newTotalXP = userData.xp

          await db.set(userKey, JSON.stringify(userData))
        }
      } catch (e) {
        console.error('Failed to update learner profile:', e)
      }
    }

    return NextResponse.json({
      message,
      terminal: terminalBlocks.length > 0 ? terminalBlocks[terminalBlocks.length - 1] : null,
      xpEarned,
      newTotalXP
    })
  } catch (error: unknown) {
    // Log full error details for debugging
    console.error('Chat API error:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      status: (error as { status?: number }).status,
      error: (error as { error?: unknown }).error,
    })

    const apiError = error as { status?: number; error?: { message?: string; type?: string } }
    const errorMessage = apiError.error?.message || (error instanceof Error ? error.message : '')

    if (apiError.status === 429) {
      return NextResponse.json(
        { error: 'Too many requests. Wait a moment.', message: 'Zu viele Anfragen! Kurze Pause...' },
        { status: 429 }
      )
    }

    if (apiError.status === 401 || apiError.status === 403) {
      return NextResponse.json(
        { error: 'AI authentication error.', message: 'Authentifizierungsfehler! Contact admin.' },
        { status: 500 }
      )
    }

    if (errorMessage.includes('quota') || errorMessage.includes('limit') || errorMessage.includes('billing')) {
      return NextResponse.json(
        { error: 'AI quota exceeded.', message: 'Quota erschöpft! Try again later.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to get AI response', message: 'Ein technisches Problem. Try again!' },
      { status: 500 }
    )
  }
}
