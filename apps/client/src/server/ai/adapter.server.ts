import { isProduction } from '../env/env.server';
import type { chat } from '@tanstack/ai';

const OLLAMA_MODAL = 'mistral-nemo:12b';
const ANTHROPIC_MODEL = 'claude-haiku-4-5';

let cachedAdapter: Parameters<typeof chat>[0]['adapter'] | null = null;

export const getAdapter = async () => {
  if (cachedAdapter) {
    return cachedAdapter;
  }

  cachedAdapter = isProduction
    ? (await import('@tanstack/ai-anthropic')).anthropicText(ANTHROPIC_MODEL)
    : (await import('@tanstack/ai-ollama')).ollamaText(OLLAMA_MODAL);

  return cachedAdapter;
};
