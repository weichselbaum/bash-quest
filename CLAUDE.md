# CLAUDE.md - Read This First

## CONTINUE FROM HERE

**v0.9.8 - Discovery Flow Complete!**

**NEW UX:** DATA communicates through FILES, not chat!
1. Epic intro plays (unchanged)
2. Terminal boots → creates `nachricht.txt` with DATA's transmission
3. Player does `ls` → sees the file
4. Player `cat nachricht.txt` → reads DATA's message, triggers mission offer
5. AI is now narrator mode (guides to discoveries, doesn't speak AS DATA)

**Flow:** Intro → pwd → ls → cat nachricht.txt → mission offer → accept → mission starts

**Files changed:**
- `terminal.html`: setup-discovery handler creates files
- `V86Terminal.tsx`: setupDiscovery() + onReady callback
- `page.tsx`: Creates nachricht.txt on boot, detects cat to offer mission
- `api/chat/route.ts`: Narrator mode after intro

**Also shipped:** Chat history capped to 50 messages (Redis fix)

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

## Current State (v0.9.8)

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

**Hidden for now:**
- XP bar and leveling UI (SHOW_LEVELING_UI = false)

## Key Files

| File | Purpose |
|------|---------|
| `webapp/public/v86/terminal.html` | v86 terminal - emulator, screen capture, command detection |
| `webapp/app/components/V86Terminal.tsx` | React wrapper - iframe + postMessage |
| `webapp/app/api/chat/route.ts` | AI chat with learner profiles |
| `webapp/app/api/missions/route.ts` | Mission start/verify/complete |
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
