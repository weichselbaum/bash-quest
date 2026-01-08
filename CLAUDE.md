# CLAUDE.md - Read This First

## CONTINUE FROM HERE

**v0.9.7 - Better Pacing**

- Mission offer waits for 3 commands (not 1) - let player explore first
- If player says "nein", DATA asks again later (doesn't give up forever)
- AI focuses on PROGRESSION: every command should show visible results
- No more pointless "cd ~" when already home

**Live at:** https://bash-quest.vercel.app

---

## RULES - DO NOT SKIP

1. **ALWAYS update CLAUDE.md** after ANY change - version + "CONTINUE FROM HERE" section
2. **ALWAYS update CHANGELOG** in `webapp/app/page.tsx` after any feature/change
3. Use `npx vercel --prod` for deploys, then `npx vercel alias` for bash-quest.vercel.app

---

## Project: Bash Quest

A Socratic bash learning game with real Linux terminal in browser.

## Owner

Lukas - building this for his son. Values kaizen, direct communication. Don't waste time - just do the thing.

## Tech Stack

- Next.js 16 + React 19
- Groq API (Llama 3.3 70B) - FREE tier
- Vercel hosting
- Redis (Upstash) for user data
- v86 emulator for Linux terminal (iframe isolated)

## Current State (v0.9.7)

**Working:**
- User auth with Redis storage
- Chat with AI teacher (Groq/Llama 3.3 with fallback)
- AI learner profiles (tracks commands, mastery, struggles, rapport)
- Side-by-side layout (terminal left, chat right)
- v86 terminal boots Linux successfully
- Direct typing in terminal - commands run directly
- # prefix for AI questions (bash comment syntax)
- XP bar and leveling system
- Mission system with SiW-themed stories
- Mission HUD shows current objective
- TAB completion works for mission verification
- Key repeat rate throttled

## Key Files

| File | Purpose |
|------|---------|
| `webapp/public/v86/terminal.html` | Standalone v86 terminal - handles all emulator logic, screen capture, command detection |
| `webapp/app/components/V86Terminal.tsx` | React wrapper - embeds terminal.html via iframe, postMessage communication |
| `webapp/app/api/chat/route.ts` | AI chat with learner profile integration |
| `webapp/app/api/auth/route.ts` | Redis auth with learner profile |
| `webapp/app/page.tsx` | Main game UI |
| `webapp/app/globals.css` | Styling |
| `webapp/app/lib/levels.ts` | XP/leveling system |

## How Terminal Output Capture Works

1. User types command directly in terminal
2. `terminal.html` tracks keystrokes for detecting Enter
3. After 1.5s delay, extracts actual command FROM SCREEN (supports TAB completion!)
4. Grabs screen text via `get_text_screen()`, finds prompt line with command
5. Sends command + output to parent via postMessage
6. React component forwards to AI chat + mission verification

## Environment Variables (Vercel)

- `GROQ_API_KEY` - Groq API key
- `REDIS_URL` - Upstash Redis connection string

## Deploy

**Local deploys:** `npx vercel --prod` (CLI required for uploading local files)
**Then alias with MCP:** `mcp__vercel__vercel_assign_alias`

**Use MCP for everything else:**
- `mcp__vercel__vercel_list_deployments` - check status
- `mcp__vercel__vercel_assign_alias` - set bash-quest.vercel.app
- `mcp__vercel__vercel_list_env_vars` - manage env vars
- `mcp__vercel__vercel_get_deployment_logs` - debugging

## Roadmap

### Keyboard Shortcuts Mission (Future)
Teach terminal power-user shortcuts:
- **TAB** - Autocomplete (already hinted in mission 1)
- **Ctrl+C** - Cancel/kill current command
- **Ctrl+L** - Clear screen (like `clear`)
- **Ctrl+A** - Jump to beginning of line
- **Ctrl+E** - Jump to end of line
- **Ctrl+U** - Clear line before cursor
- **Ctrl+W** - Delete word before cursor
- **Ctrl+R** - Reverse search history
- **Up/Down** - Navigate command history

Could be a "Terminal Power User" or "Keyboard Ninja" mission.

## Notes

- Building for his son (snace)
- Rapport tracking now handled IN THE GAME (v0.9.0)
