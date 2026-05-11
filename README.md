# StockSense — AI-Powered Stock Tracker

Track real-time stock prices, manage a personal watchlist, and receive an AI-generated daily market news digest tailored to the symbols you care about.

## Live Demo
🔗 https://stocksense.vercel.app *(deploy yourself — see below)*

## Features

- 📊 **Real-time market dashboard** — Live charts, heatmaps, and top stories powered by TradingView widgets
- 🔖 **Personal watchlist** — Add and remove stocks; persisted to MongoDB
- 🔐 **Full authentication** — Sign up, sign in, and session management via Better Auth
- 🤖 **AI-personalized welcome email** — Gemini 2.5 Flash Lite generates a custom intro based on your investment profile when you sign up
- 📰 **Daily AI news digest** — Inngest cron job at 12:00 UTC daily fetches each user's watchlist news, summarises with Gemini, and emails it
- 🔎 **Stock search & detail pages** — Live quotes, financials, technical analysis, and company profiles

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript |
| Database | MongoDB Atlas + Mongoose |
| Auth | Better Auth (MongoDB adapter) |
| Background Jobs | Inngest (cron + event-driven) |
| AI | Google Gemini 2.5 Flash Lite |
| Stock Data | Finnhub REST API |
| Charts | TradingView Embedded Widgets |
| Email | Nodemailer (Gmail SMTP) |
| Hosting | Vercel |

## Run Locally

```bash
git clone https://github.com/Rahul200512/stocksense.git
cd stocksense
npm install
cp .env.example .env.local   # fill in the variables below
npm run dev
```

### Environment Variables

```
MONGODB_URI=               # MongoDB Atlas connection string (free M0 cluster)
BETTER_AUTH_SECRET=        # any random 32-char string
BETTER_AUTH_URL=           # http://localhost:3000 in dev, your Vercel URL in prod
FINNHUB_TOKEN=             # free key from finnhub.io
NODEMAILER_EMAIL=          # your Gmail address
NODEMAILER_PASSWORD=       # Gmail App Password (not your real password)
INNGEST_EVENT_KEY=         # from inngest.com (free tier)
INNGEST_SIGNING_KEY=       # from inngest.com
GEMINI_API_KEY=            # free key from aistudio.google.com
```

## What I Changed (Fork Notes)

Forked from [adrianhajdin/signalist_stock-tracker-app](https://github.com/adrianhajdin/signalist_stock-tracker-app) and improved:

1. **🐛 Fixed infinite redirect loop** in `middleware/index.ts` — unauthenticated users were being redirected to `/` (a protected route), causing a loop. Now redirects to `/sign-in`.
2. **🐛 Fixed watchlist not persisting to database** — Added `addToWatchlist`, `removeFromWatchlist`, and `isSymbolInWatchlist` server actions, wired the `WatchlistButton` to call them with optimistic UI updates, and made the stock detail page fetch real watchlist state from the DB.
3. **🐛 Fixed hardcoded sender email** in `lib/nodemailer/index.ts` — now uses the `NODEMAILER_EMAIL` environment variable.
4. **🎨 Rebranded** entire app, emails, metadata, and footer with attribution.

---

Built by [Rahul Reddy Avula](https://www.linkedin.com/in/rahul-reddy-avula)
