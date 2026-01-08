# Bash Quest: Product Roadmap & Feature Backlog

```
  ____                 _
 |  _ \ ___   __ _  __| |_ __ ___   __ _ _ __
 | |_) / _ \ / _` |/ _` | '_ ` _ \ / _` | '_ \
 |  _ < (_) | (_| | (_| | | | | | | (_| | |_) |
 |_| \_\___/ \__,_|\__,_|_| |_| |_|\__,_| .__/
                                        |_|
```

## Vision

A Socratic bash learning game that:
- Teaches through guided discovery, not lectures
- Builds real skills through a simulated terminal environment
- Creates an emotional connection with the player
- Uses spaced repetition for long-term retention
- Can be shared with others (especially Lukas's son)

---

## Current Status: Phase 0 - Design

We're testing the game design through CLI conversations with Claude.
No code yet - validating the concept first.

---

## Feature Backlog

### 🎮 Core Game Mechanics

| ID | Feature | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| G1 | Socratic dialogue engine | P0 | ✅ Done | GAME_PROMPT.md defines this |
| G2 | Spaced repetition system | P0 | ✅ Done | spaced_repetition.md |
| G3 | Exercise/challenge system | P0 | ✅ Done | exercises.md |
| G4 | Leveling & XP system | P0 | ✅ Done | levels.md |
| G5 | Skill tree with unlocks | P1 | ✅ Done | In levels.md |
| G6 | Achievement badges | P1 | ✅ Done | In levels.md |
| G7 | Level-up trials (boss fights) | P1 | ✅ Done | Defined per level |

### 🖥️ Terminal Emulation

| ID | Feature | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| T1 | In-browser terminal emulator | P0 | 🔲 Todo | xterm.js or similar |
| T2 | Virtual filesystem | P0 | 🔲 Todo | Sandboxed file system for safety |
| T3 | Command validation | P0 | 🔲 Todo | Check if typed command matches expected |
| T4 | Safe command subset (L1-3) | P1 | 🔲 Todo | Only allow safe commands early on |
| T5 | "Dangerous mode" unlock (L6+) | P2 | 🔲 Todo | `rm`, `sudo` after Permission Paladin |
| T6 | Fake network environment | P2 | 🔲 Todo | For Network Ninja level (ssh simulation) |
| T7 | Fake process environment | P2 | 🔲 Todo | For Process Pro level (ps, kill sims) |
| T8 | Multiple "servers" simulation | P3 | 🔲 Todo | ssh between fake machines |

### 🧠 Learning Features

| ID | Feature | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| L1 | Adaptive difficulty | P1 | 🔲 Todo | Slow down if struggling |
| L2 | Hint system (costs XP?) | P1 | 🔲 Todo | Optional hints in exercises |
| L3 | "Why" explanations on demand | P1 | 🔲 Todo | Deep-dive on any command |
| L4 | Interactive man pages | P2 | 🔲 Todo | Simplified, searchable man |
| L5 | Command autocomplete teaching | P2 | 🔲 Todo | Teach tab completion |
| L6 | History navigation teaching | P2 | 🔲 Todo | Up arrow, Ctrl+R |

### 🎭 Relationship & Engagement

| ID | Feature | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| R1 | Player profile & memory | P0 | ✅ Done | learner-profile.md |
| R2 | Callback jokes system | P1 | ✅ Done | Tracked in profile |
| R3 | Streak tracking | P1 | ✅ Done | In profile |
| R4 | Celebration animations | P2 | 🔲 Todo | ASCII art level-ups |
| R5 | Sound effects | P3 | 🔲 Todo | Optional, toggleable |
| R6 | Character customization | P3 | 🔲 Todo | Avatar, title, etc. |

### 👨‍👦 Multi-Player / Family

| ID | Feature | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| F1 | Multiple player profiles | P1 | 🔲 Todo | Dad and son can both play |
| F2 | Kid-friendly mode | P2 | 🔲 Todo | Simpler language, more encouragement |
| F3 | Parent dashboard | P2 | 🔲 Todo | See kid's progress |
| F4 | Shared achievements | P3 | 🔲 Todo | "Your dad beat this too!" |

### 🌐 Web App Infrastructure

| ID | Feature | Priority | Status | Notes |
|----|---------|----------|--------|-------|
| W1 | Next.js scaffold | P0 | 🔲 Todo | Basic project setup |
| W2 | Chat UI component | P0 | 🔲 Todo | Message back-and-forth |
| W3 | Claude API integration | P0 | 🔲 Todo | Haiku for cost efficiency |
| W4 | Game state persistence | P0 | 🔲 Todo | Vercel KV or Supabase |
| W5 | Terminal UI component | P1 | 🔲 Todo | xterm.js integration |
| W6 | Mobile responsive | P1 | 🔲 Todo | Phone-friendly |
| W7 | PWA / offline support | P2 | 🔲 Todo | Cache game state |
| W8 | Ollama local mode | P2 | 🔲 Todo | Free, offline option |

---

## Milestones

### M1: CLI Prototype (Current)
- [x] Core game design files
- [x] Test gameplay via Claude CLI
- [ ] Refine prompts based on 5+ sessions
- [ ] Document what works / doesn't

### M2: Web MVP
- [ ] Deploy basic chat app to Vercel
- [ ] Connect to Claude Haiku
- [ ] Persist game state across sessions
- [ ] Test with real user (Lukas)

### M3: Terminal Integration
- [ ] Add terminal emulator component
- [ ] Build virtual filesystem
- [ ] Validate commands in sandbox
- [ ] Hybrid mode: chat + terminal

### M4: Son-Ready Release
- [ ] Kid-friendly adjustments
- [ ] Multiple profiles
- [ ] Polish and test
- [ ] Gift it! 🎁

---

## Ideas Parking Lot

Things to consider later:
- Multiplayer races (who can solve faster?)
- Daily challenges
- Community exercise submissions
- Bash Quest certification/badge for LinkedIn lol
- Integration with real GitHub (learn git)
- Docker playground for advanced levels
- AI-generated personalized exercises based on weak areas

---

## Discussion Log

### 2026-01-08: Initial Design Session (Lukas + Claude Opus 4.5)

**What happened:**
1. Started as simple bash teaching session
2. Lukas requested Socratic method
3. Taught: prompt anatomy, ls, cd, mkdir, touch, cat, less, head, tail, redirection
4. Lukas expanded scope: "remember what I learn", "spaced repetition", "leveling system"
5. Built full game design with 10-level skill tree
6. Lukas asked about deployment → decided on Vercel + Groq (free)
7. Built complete Next.js web app with login system
8. Configured Vercel MCP for deployment
9. Ready to deploy but need to restart Claude for MCP access

**Key decisions:**
- Groq over Claude API (free tier)
- Browser-first for non-dev friend beta tester
- localStorage for MVP (no database yet)
- Deferred terminal emulator and SSH access

**Key insight:** Terminal emulation is critical for real learning - high priority for v2

**Next steps:**
1. Restart Claude Code (MCP reload)
2. Deploy webapp to Vercel
3. Get Groq API key
4. Share with friend for testing

---

## How to Add Features

When you think of a new feature:
1. Add it to the appropriate table above
2. Assign priority: P0 (must have), P1 (should have), P2 (nice to have), P3 (future)
3. Note any dependencies
4. Update this in session wrap-up
