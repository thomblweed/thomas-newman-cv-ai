# Remove local Ollama support; use Gemini as the dev provider

We removed the local Ollama development path entirely and made Gemini the sole
development provider (production stays Anthropic). Local models were the default
dev option but demanded a whole parallel setup — the `@tanstack/ai-ollama`
dependency, an `OLLAMA_HOST` env var, a `USE_GEMINI` flag, a `dev:gemini` task
and script, and a second README branch — for lower-quality, slower output.

The alternative was to keep Ollama behind a flag for offline work. We rejected
it: it kept a provider the project does not want and doubled the onboarding path.
The cost is that local development now needs a free Google AI Studio key and
network access; there is no offline dev mode.

Providers are now described by a registry in the chat server's AI module, so
adding a future provider (or a runtime selector) is a small, local change.
