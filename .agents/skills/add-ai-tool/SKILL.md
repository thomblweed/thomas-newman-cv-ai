---
name: add-ai-tool
description: Creates a new TanStack AI tool following the project's 3-file split pattern (definition/server/client). Use when adding a new AI tool, creating a new tool for the chat agent, or when the user mentions adding a capability that the AI can call.
---

# Add AI Tool

Each tool lives in `apps/client/src/features/chat/ai/tools/<tool-name>/` and consists of exactly three files.

## File structure

```
ai/tools/<tool-name>/
├── definition.ts   # Shared schema — imported by both server and client
├── server.ts       # Server handler — imports server-only data loaders
└── client.ts       # Client registration — one line
```

## 1. `definition.ts`

```ts
import { toolDefinition } from '@tanstack/ai';
import z from 'zod';

// Export inputSchema separately only when the tool accepts arguments,
// so server.ts can import it for safe parsing.
export const fooToolInputSchema = z.object({
  bar: z.string().describe('Description of bar')
});

export const fooToolDefinition = toolDefinition({
  name: 'get_foo',                  // snake_case verb_noun
  description: 'What the AI gets and when to call it',
  inputSchema: fooToolInputSchema,  // z.object({}) if no inputs
  outputSchema: z.object({
    field: z.string()
  }),
  needsApproval: false
});
```

- Export `inputSchema` as a named constant **only when** the tool has inputs — `server.ts` needs it for `.parse(args)`.
- For no-input tools, inline `z.object({})` directly and skip the named export.

## 2. `server.ts`

```ts
import '@tanstack/react-start/server-only';  // must be first line

import { getFoo } from '../../../server/cv/foo.server';
import { fooToolDefinition, fooToolInputSchema } from './definition';

export const fooToolServer = fooToolDefinition.server(
  async (args: unknown) => {
    const input = fooToolInputSchema.parse(args);
    return await getFoo(input);
  }
);
```

For **no-input** tools (like `profile`), skip the parse step:

```ts
export const fooToolServer = fooToolDefinition.server(
  async () => await getFoo()
);
```

The data loader (`getFoo`) lives in `features/chat/server/cv/foo.server.ts` and reads from `data/cv/` using `readMarkdownFile`.

## 3. `client.ts`

```ts
import { fooToolDefinition } from './definition';

export const fooToolClient = fooToolDefinition.client();
```

Always one line. No logic here.

## 4. Register in the chat route

Add the server tool to `apps/client/src/routes/api/chat.ts`:

```ts
import { fooToolServer } from '@/features/chat/ai/tools/foo/server';

// Inside chat():
tools: [profileToolServer, rolesToolServer, fooToolServer],
```

## Naming conventions

| Export | Pattern | Example |
|---|---|---|
| Input schema | `<name>ToolInputSchema` | `rolesToolInputSchema` |
| Definition | `<name>ToolDefinition` | `rolesToolDefinition` |
| Server handler | `<name>ToolServer` | `rolesToolServer` |
| Client handler | `<name>ToolClient` | `rolesToolClient` |
| Tool `name` field | `get_<noun>` | `get_roles` |

## Checklist

- [ ] `definition.ts` created with Zod input/output schemas
- [ ] `server.ts` starts with `import '@tanstack/react-start/server-only'`
- [ ] `server.ts` parses args via `inputSchema.parse(args)` (if tool has inputs)
- [ ] `client.ts` created (one line)
- [ ] Data loader created in `features/chat/server/cv/` if needed
- [ ] Server tool imported and added to `tools: []` in `api/chat.ts`
