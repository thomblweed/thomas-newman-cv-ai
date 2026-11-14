# Project context

- Monorepo managed with `pnpm` + Turborepo (`turbo.json`).
- Node version is pinned via `package.json` engines.
- Apps live under `apps/`; the only app is `apps/client` (TanStack Start + React 19).
- Feature code lives under `apps/client/src/features/<feature>/`.

## Common commands

- `pnpm turbo dev`: run the client (Vite)
- `pnpm turbo typecheck`: TypeScript typecheck
- `pnpm turbo lint`: ESLint (auto-fix)
- `pnpm turbo serve`: preview the built app (depends on build)
- `pnpm turbo format`: Prettier (repo-wide)

## Environment variables

See `turbo.json` for declared env vars (API keys, feature flags, etc.).

