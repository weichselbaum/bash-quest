# CLAUDE.md - Read This First

## CONTINUE FROM HERE

**v0.9.10 - Redesigned First Message!**

**NEW:** Better onboarding flow - discovery before missions

**The Problem:**
- Old intro said "Find where you are (pwd)"
- Mission objective 1 also said "Find where you are (pwd)"
- Redundant and hand-holdy!

**The Fix - New Discovery Flow:**
1. Intro sets scene: "Enterprise... Transporterunfall. Was liegt hier?"
2. Player does `ls` → finds nachricht.txt
3. Player does `cat nachricht.txt` → reads DATA's message
4. DATA offers mission via #ja/#nein
5. Mission starts → THEN pwd is objective 1

**Files changed:**
- `route.ts`: New intro template (lines 311-337), updated narrator guidance (339-358)
- `page.tsx`: Shorter nachricht.txt content (lines 661-686)

**Key principle:** Intro guides to EXPLORE (ls, cat). Mission teaches NAVIGATE (pwd, cd).

**Live at:** https://bash-quest.vercel.app
**GitHub:** https://github.com/weichselbaum/bash-quest

---

## RULES - DO NOT SKIP

1. **ALWAYS update CLAUDE.md** after ANY change - version + "CONTINUE FROM HERE" section
2. **ALWAYS update CHANGELOG** in `webapp/app/page.tsx` after any feature/change
3. **Deploy:** `git add . && git commit -m "msg" && git push` → Vercel auto-deploys

---

## Project: Bash Quest

A Socratic bash learning game with real Linux terminal in browser.

## Owner

Lukas - building this for his son. Values kaizen, direct communication. Don't waste time - just do the thing.

## Tech Stack

- Next.js 16 + React 19
- Cerebras API (Llama 3.3 70B) - fast inference
- Vercel hosting (auto-deploy from GitHub)
- Redis (Upstash) for user data
- v86 emulator for Linux terminal (iframe isolated)

## Current State (v0.9.10)

**Working:**
- User auth with Redis storage
- Chat with AI teacher (Cerebras/Llama 3.3)
- AI learner profiles (tracks commands, mastery, struggles, rapport)
- Side-by-side layout (terminal left, chat right)
- v86 terminal boots Linux successfully
- Direct typing in terminal - commands run directly
- # prefix for AI questions (bash comment syntax)
- Mission system with SiW-themed stories
- RPG-style mission offers in dialogue ("ja"/"nein")
- Mission HUD shows current objective
- TAB completion works for mission verification
- AI gets current directory for smarter suggestions
- **Feedback system** - users can submit feedback via modal
- **Analytics tracking** - behavior tracked for learning insights

**Hidden for now:**
- XP bar and leveling UI (SHOW_LEVELING_UI = false)

## Key Files

| File | Purpose |
|------|---------|
| `webapp/public/v86/terminal.html` | v86 terminal - emulator, screen capture, command detection |
| `webapp/app/components/V86Terminal.tsx` | React wrapper - iframe + postMessage |
| `webapp/app/api/chat/route.ts` | AI chat with learner profiles |
| `webapp/app/api/missions/route.ts` | Mission start/verify/complete |
| `webapp/app/api/feedback/route.ts` | User feedback storage + retrieval |
| `webapp/app/api/analytics/route.ts` | Behavior tracking + insights |
| `webapp/app/lib/missions.ts` | Mission definitions (SiW themed) |
| `webapp/app/page.tsx` | Main game UI + CHANGELOG |
| `webapp/app/globals.css` | Styling |

## Environment Variables (Vercel)

- `CEREBRAS_API_KEY` - Cerebras API key
- `REDIS_URL` - Upstash Redis connection string

## Deploy

Just push to GitHub:
```bash
git add . && git commit -m "your message" && git push
```
Vercel auto-deploys to https://bash-quest.vercel.app

## Multi-Terminal Workflow

When working with multiple Claude instances:
1. `git pull` before starting work (sync latest)
2. Work on different files if possible
3. `git push` when done
4. Git handles conflicts

## Roadmap

### Keyboard Shortcuts Mission (Future)
- TAB, Ctrl+C, Ctrl+L, Ctrl+A/E, Ctrl+U/W, Ctrl+R, Up/Down

## Notes

- Building for his son (snace)
- SiW = "Sinnlos im Weltraum" (German Star Trek parody)
- DATA character inspired by SiW Data
