# thomas-newman-cv-ai

`pnpm` + Turborepo monorepo. The only app is `apps/client` (TanStack Start + React 19); feature code lives under `apps/client/src/features/<feature>/`.

## Conventions

Read the matching file in `docs/standards/` before changing code in its area:

- `project-context.md` — layout, commands, env vars.
- `coding-style.md` — naming and when to comment.
- `react-components.md` — component structure, composition, context, memoisation (`**/*.tsx`).
- `tailwind-styling.md` — `cn()` / `cva()` class conventions (`**/*.tsx`).
- `git-commits.md` — commit and push rules.

Reviewer and documentation briefs live in `docs/agents/`. Project skills (`add-ai-tool`, `generate-vitest-tests`, `prune-local-branches`) live in `.agents/skills/`.
