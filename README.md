# Thomas Newman CV AI

## Pre-requisites

- [pnpm](https://pnpm.io/)
- [Node.js](https://nodejs.org/) (see `package.json` engines for pinned version)

## Setup

Install dependencies:

```bash
pnpm install
```

## Development

Scripts run via `pnpm turbo <task>` (Turborepo is a local dev dependency).

### Option A — Ollama (local model)

> **Note:** Local models are fine for basic dev testing but expect slower responses and lower quality output. Performance depends on your machine's CPU/GPU, and smaller local models are less capable than cloud alternatives — responses may be less accurate or coherent. For more realistic testing of AI output quality, use Option B instead.

1. Install [Ollama](https://ollama.com) and start it (macOS/Windows: app runs automatically; Linux: `ollama serve`)
2. Pull the model: `ollama pull mistral-nemo:12b`
3. Create `apps/client/.env`:
   ```
   OLLAMA_HOST=http://localhost:11434
   ```
4. Start the dev server: `pnpm turbo dev`

### Option B — Gemini (free tier)

1. Get a free API key at [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create `apps/client/.env`:
   ```
   GEMINI_API_KEY=your-key-here
   ```
3. Start the dev server: `pnpm turbo dev:gemini`

### Other scripts

- `pnpm turbo build` — build all apps
- `pnpm turbo serve` — preview built app (depends on build)
- `pnpm turbo lint` — ESLint (auto-fix)
- `pnpm turbo typecheck` — TypeScript typecheck
- `pnpm turbo format` — Prettier (repo-wide)
- `pnpm turbo clean` — remove build artifacts and node_modules
- `pnpm format` — Prettier (repo-wide, root)
- `pnpm clean` — remove node_modules
- `pnpm check` — interactive dependency updates

## Production

Requires `ANTHROPIC_API_KEY` in the environment. Get a key at [Anthropic Console](https://console.anthropic.com).
