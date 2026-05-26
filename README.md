# chomp 🍽️

A restaurant picker randomiser. Add your favourite spots, hit **Chomp**, and let the app decide where you're eating tonight.

## Tech stack

- **Next.js 15** (App Router) + TypeScript
- **Auth.js v5** — Google OAuth
- **Prisma** + **Neon** (serverless PostgreSQL)
- **Tailwind CSS**
- Deployed on **Vercel**

## Local setup

### 1. Clone & install

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable | Where to get it |
|---|---|
| `DATABASE_URL` | Neon console → Connection Details |
| `AUTH_SECRET` | Run `npx auth secret` |
| `GOOGLE_CLIENT_ID` | Google Cloud Console → APIs & Services → Credentials |
| `GOOGLE_CLIENT_SECRET` | Same as above |
| `AUTH_URL` | `http://localhost:3000` (local) |

### 3. Google OAuth setup

1. Google Cloud Console → Create or select a project
2. **APIs & Services** → **OAuth consent screen** → External → fill in app name & email
3. **Credentials** → **Create credentials** → **OAuth 2.0 Client ID** → Web application
4. Add authorised redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-app.vercel.app/api/auth/callback/google` (after deploy)

### 4. Set up the database

```bash
npx prisma db push
```

### 5. Run locally

```bash
npm run dev
```

Open http://localhost:3000.

## Deploying to Vercel

1. Push to GitHub
2. Import repo in Vercel dashboard
3. Add the **Neon integration** (Vercel Marketplace) — auto-configures `DATABASE_URL`
4. Add `AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `AUTH_URL` in project settings
5. Add your Vercel URL to Google OAuth redirect URIs
6. Redeploy
