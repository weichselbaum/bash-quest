# Bash Quest

A Socratic learning game for bash/terminal commands.

## Quick Deploy to Vercel

### 1. Get a Groq API Key (FREE)
1. Go to [console.groq.com](https://console.groq.com/)
2. Sign up (free)
3. Create an API key
4. Copy it

### 2. Deploy to Vercel

Option A: **One-click deploy** (if you push to GitHub first):
1. Push this `webapp` folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com)
3. Import the repo
4. Add environment variable: `GROQ_API_KEY` = your key
5. Deploy!

Option B: **Vercel CLI**:
```bash
npm i -g vercel
cd webapp
vercel

# When prompted, add your GROQ_API_KEY in the Vercel dashboard:
# Settings > Environment Variables
```

### 3. Play!
- Visit your deployed URL
- Create a username/password
- Start learning bash!

## Local Development

```bash
# Copy env file
cp .env.example .env.local

# Add your Groq API key to .env.local
# GROQ_API_KEY=gsk_your_key_here

# Install & run
npm install
npm run dev
```

## Features

- Socratic teaching method
- User accounts with cookie persistence
- Progress saved in localStorage
- Text commands: `/reset`, `/logout`
- Dark terminal aesthetic

## Stack

- Next.js 16
- Groq API (Llama 3.1 70B)
- No database (localStorage for MVP)
