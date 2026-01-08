# Deploying Bash Quest as a Web App

## Architecture Options

### Option 1: Vercel + Groq API (Recommended - FREE)
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Next.js App   │────▶│  Vercel Edge    │────▶│    Groq API     │
│   (Frontend)    │     │  Functions      │     │ (Llama 3.1 70B) │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │   Database      │
                        │ (Vercel KV/     │
                        │  Supabase/      │
                        │  Planetscale)   │
                        └─────────────────┘
```

**Pros**:
- Groq free tier: 30 req/min, 6000 req/day - plenty for personal use
- Llama 3.1 70B is very capable, follows system prompts well
- Blazing fast (Groq's custom LPU chips)
- Vercel has great DX, easy deploys
- Can use Vercel KV (Redis) for game state

**Cons**:
- Llama slightly less capable than Claude for nuanced instruction-following
- May need to simplify GAME_PROMPT.md for reliability

**Estimated Cost**:
- Vercel: Free tier
- Groq: FREE (within limits)
- Total: $0/month for personal/family use

---

### Option 2: Cloudflare Pages + Workers AI
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Static Site   │────▶│   Cloudflare    │────▶│  Workers AI     │
│   (React/Vue)   │     │   Workers       │     │  (Llama/Mistral)│
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │   Cloudflare    │
                        │   D1 / KV       │
                        └─────────────────┘
```

**Pros**:
- Workers AI has free tier
- All Cloudflare = simpler billing
- Edge-first, very fast

**Cons**:
- Workers AI models (Llama, Mistral) less capable than Claude
- May need more prompt engineering to get same quality
- Game experience could suffer

---

### Option 3: Cloudflare + Claude API (Hybrid)
Same as Option 2, but call Claude API instead of Workers AI.

**Pros**: Best of both worlds (Cloudflare infra + Claude quality)
**Cons**: Two vendors to manage

---

### Option 4: Self-Hosted (Docker + Any LLM)
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Web App       │────▶│   Your Server   │────▶│  Claude API     │
│                 │     │   (Docker)      │     │  OR Ollama      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

Could run locally with Ollama + Llama 3 for completely free/offline play.
Good for: giving to your son without ongoing costs.

---

## Recommended Stack

For your use case (learning game, give to son, potentially share):

### MVP Stack (FREE):
```
Frontend: Next.js 14 (App Router)
Backend:  Next.js API Routes / Server Actions
LLM:      Llama 3.1 70B via Groq API (FREE)
Database: Vercel KV (Redis) for game state
Auth:     None initially, or simple password
Deploy:   Vercel (free tier)
Backup:   Google Gemini Flash API (also free, 1M tokens/day)
```

### Free LLM Options Ranked:
| Provider | Model | Free Limits | Speed | Quality |
|----------|-------|-------------|-------|---------|
| Groq | Llama 3.1 70B | 30 rpm, 6k/day | ⚡⚡⚡⚡⚡ | ⭐⭐⭐⭐ |
| Google | Gemini 1.5 Flash | 15 rpm, 1M tok/day | ⚡⚡⚡⚡ | ⭐⭐⭐⭐ |
| Cloudflare | Llama 3.1 8B | 10k neurons/day | ⚡⚡⚡ | ⭐⭐⭐ |
| HuggingFace | Various | Rate limited | ⚡⚡ | ⭐⭐⭐ |
| Ollama | Any (local) | Unlimited | ⚡⚡⚡ | ⭐⭐⭐⭐ |

### Game State Storage:
```typescript
// Player state in Redis/KV
{
  odID: "lukas-abc123",
  name: "Lukas",
  level: 1,
  xp: 50,
  skillsUnlocked: ["navigation", "file_viewing"],
  spacedRepetition: [...],
  memories: [...],  // For relationship building
  lastSession: "2026-01-08",
  streak: 1
}
```

### System Prompt Strategy:
The GAME_PROMPT.md becomes the system prompt.
Player data gets injected into the user message context.

---

## Quick Start Plan

### Phase 1: Terminal Prototype (Now)
- [x] Game design (files we just created)
- [x] Leveling system
- [ ] Test with CLI Claude for a week
- [ ] Refine prompts based on experience

### Phase 2: Web MVP
- [ ] Create Next.js project
- [ ] Build chat UI (simple)
- [ ] Integrate Claude Haiku
- [ ] Store game state in KV
- [ ] Deploy to Vercel

### Phase 3: Polish
- [ ] Add terminal emulator UI (xterm.js?)
- [ ] Add sound effects / animations
- [ ] Progress visualization
- [ ] Shareable achievements

### Phase 4: Son-Ready
- [ ] Kid-friendly mode toggle
- [ ] Offline mode (Ollama?)
- [ ] Parental progress dashboard

---

## API Cost Estimate

### With Groq (Recommended): FREE
- 30 requests/minute, 6000 requests/day
- A session = ~20 exchanges = well under limits
- Multiple sessions per day = still fine
- **Total monthly cost: $0**

### With Google Gemini (Backup): FREE
- 1 million tokens/day free
- Session = ~40k tokens = 25 sessions/day free
- **Total monthly cost: $0**

### If you outgrow free tiers (unlikely):
- Groq paid: ~$0.59/1M tokens (still cheap)
- Can add Gemini as fallback when Groq limit hit

---

## Alternative: Fully Free Option

Use **Ollama** locally with **Llama 3 8B** or **Mistral 7B**:
- Runs on your Mac
- Free forever
- No API keys needed
- Can still deploy web UI that calls localhost

Trade-off: Less intelligent, may need simpler prompts.
But for a structured game with clear rules? Might work fine.

---

## Next Step?

1. **Keep testing with CLI Claude** - Refine the game first
2. **When ready**: I can scaffold the Next.js project
3. **We can add features incrementally**

Want me to set up a basic project structure now, or keep refining the game design first?
