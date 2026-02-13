import type { chat } from '@tanstack/ai';

import { isProduction } from '@/server/env/env.server';

const OLLAMA_MODEL = 'mistral-nemo:12b';
const ANTHROPIC_MODEL = 'claude-haiku-4-5';
const GEMINI_MODEL = 'gemini-2.5-flash';

let cachedAdapter: Parameters<typeof chat>[0]['adapter'] | null = null;

export const getAdapter = async () => {
  if (cachedAdapter) {
    return cachedAdapter;
  }

  if (isProduction) {
    cachedAdapter = (await import('@tanstack/ai-anthropic')).anthropicText(
      ANTHROPIC_MODEL
    );

    return cachedAdapter;
  }

  const useGemini = process.env.USE_GEMINI === 'true';

  cachedAdapter = useGemini
    ? (await import('@tanstack/ai-gemini')).geminiText(GEMINI_MODEL)
    : (await import('@tanstack/ai-ollama')).ollamaText(OLLAMA_MODEL);

  return cachedAdapter;
};
