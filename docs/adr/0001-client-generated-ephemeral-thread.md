# Client-generated, ephemeral Thread identity

TanStack AI 1.x requires the chat client and the server to be told a `threadId`, and neither side generates one. We generate it once per page load in the browser and do not persist it, so a reload starts a new Thread.

Persistence was a genuine alternative — the id could have been kept in `sessionStorage` to survive a reload — but the app currently keeps no conversation state anywhere (the server is stateless; messages live only in React state), so a persisted id would name an empty Thread and imply a continuity the product does not offer. Conversation persistence is its own product decision for a later ticket.

## Considered Options

- **`sessionStorage`-persisted id.** Rejected for now: it would survive a reload while the transcript still did not, which is more confusing than an honest fresh start.
- **A single fixed id for the whole app.** Rejected: it conflates every visitor's runs under one identity, which corrupts any future per-Thread correlation or persistence.
