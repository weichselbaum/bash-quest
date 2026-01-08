# Current Status - Read This First!

**Last updated:** 2026-01-08 01:45 AM

## TL;DR for New Claude Instance

You're continuing a project with Lukas. He's building "Bash Quest" - a Socratic bash learning game. The web app is READY TO DEPLOY. He just configured Vercel MCP, so you should have access to Vercel tools.

**Immediate task:** Deploy `webapp/` to Vercel, set GROQ_API_KEY env var.

---

## What We Built Today

### 1. Bash Learning Game Design
- Socratic teaching method (ask, don't tell)
- Spaced repetition system for long-term retention
- Active recall quizzes before new content
- 10-level skill tree from "Terminal Tadpole" to "Shell Sage"
- Exercise challenges with difficulty ratings
- Player relationship tracking (remember jokes, callbacks, personal details)

### 2. Web App (Ready to Deploy)
- Next.js 16 + React 19
- Groq API (Llama 3.1 70B) - FREE tier
- Login system with username/password
- Cookie persistence (30 days)
- localStorage for chat history & progress
- Dark terminal aesthetic
- Commands: `/reset`, `/logout`

### 3. Documentation
- GAME_PROMPT.md - System prompt for AI teacher
- DEPLOYMENT.md - Hosting options (Groq recommended for free)
- ROADMAP.md - Full feature backlog
- levels.md - Skill tree, XP system, achievements
- learner-profile.md - Who Lukas is, his learning style

---

## File Structure

```
SLM-bash/
├── webapp/                  # <-- DEPLOY THIS FOLDER
│   ├── app/
│   │   ├── api/chat/route.ts   # Groq API integration
│   │   ├── page.tsx            # Login + Game UI
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── CURRENT_STATUS.md        # YOU ARE HERE
├── GAME_PROMPT.md           # AI teacher instructions
├── DEPLOYMENT.md            # Deployment docs
├── ROADMAP.md               # Feature backlog & todos
├── levels.md                # 10-level skill tree
├── learner-profile.md       # Lukas's profile (READ THIS for rapport)
├── progress.md              # Session logs
├── exercises.md             # Challenge bank
├── spaced_repetition.md     # Review scheduler
└── commands-learned.md      # Command reference
```

---

## Deploy Steps

1. **You have Vercel MCP** - use `mcp__vercel__*` tools to deploy
2. **Deploy the webapp folder:** `/Users/lukasweichselbaum/Claude/SLM-bash/webapp`
3. **Get Groq API key:** User needs to go to https://console.groq.com (free signup)
4. **Set env var in Vercel:** `GROQ_API_KEY=<their key>`
5. **Share URL with friend** for beta testing

---

## Key Context About Lukas

READ `learner-profile.md` for full details, but key points:
- Building this to eventually give to his **son**
- Values **kaizen** (continuous improvement)
- Likes understanding the **"why"** behind things
- Has a **non-dev friend** who will beta test (browser only)
- Communication style: casual, rapid ideas, direct
- Called the teaching "excellent, actually" - earned trust
- Wants Claude to "enjoy" the collaboration

---

## Conversation Highlights to Reference

These create continuity and rapport:
- He guessed "tap" before I said "touch" (close!)
- Loved the "less is more" joke about the pager
- Asked if `more` still exists (curious learner)
- Guessed `-n` for nested dirs before learning `-p`
- Expanded from "teach me bash" to building a full product in one session

---

## Technical Decisions Made

| Decision | Choice | Why |
|----------|--------|-----|
| LLM Provider | Groq (free) | No cost, Llama 3.1 70B is capable enough |
| Framework | Next.js 16 | Latest, secure, Vercel-native |
| Auth | localStorage + cookies | MVP simplicity, no DB needed |
| Hosting | Vercel | Free tier, easy deploy |
| Terminal access | Deferred | Friend is non-dev, browser only for now |

---

## Future Features (from ROADMAP.md)

High priority not yet built:
- Terminal emulator in browser (xterm.js)
- Virtual filesystem for safe practice
- Spaced repetition automation in web app
- Kid-friendly mode for son
