# NimitAI Sales Signal Analyzer

A modern AI-powered sales call analyzer built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and Gemini API.

## Features

- Paste meeting transcripts in a large editor
- Sample transcript and clear controls
- Analyze transcripts through a secure backend API route
- Detect sales signals: buying interest, objection, confusion
- Display structured results in beautiful cards
- Show analytics summary counts
- Responsive premium SaaS-style UI

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Add environment variables

Create a `.env` file from `.env.example` and set your Gemini API key:

```bash
cp .env.example .env
```

Then update `.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## API Route

The application uses `POST /api/analyse` to send transcripts securely to the Gemini API. The backend ensures the model returns strict JSON and handles parsing errors gracefully.

## Project Structure

- `app/` - Next.js App Router pages and layout
- `components/` - UI components for the analyzer, signal cards, and analytics
- `app/api/analyse/route.ts` - secure backend route for Gemini integration
- `types/` - TypeScript models for structured responses
- `lib/` - shared helper utilities and sample transcript data

## Environment Variables

- `GEMINI_API_KEY` - required to authenticate with Gemini / OpenAI API

## Build for Production

```bash
npm run build
npm run start
```

## Notes

- Ensure your Gemini API key is kept secret and never committed to source control.
- The app is designed for desktop, tablet, and mobile layouts with a modern SaaS aesthetic.
