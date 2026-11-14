import type { chat } from '@tanstack/ai';
import type { AnthropicTextAdapter } from '@tanstack/ai-anthropic';
import type { GeminiTextAdapter } from '@tanstack/ai-gemini';
import type { OllamaTextAdapter } from '@tanstack/ai-ollama';

import { isProduction } from '@/server/env/env.server';

const OLLAMA_MODEL = 'mistral-nemo:12b';
const ANTHROPIC_MODEL = 'claude-haiku-4-5';
const GEMINI_MODEL = 'gemini-2.5-flash';
const MAX_TOKENS = 1024;

type ChatAdapter = Parameters<typeof chat>[0]['adapter'];
type ProviderOptions<TAdapter extends ChatAdapter> =
  TAdapter['~types']['providerOptions'];

type AnthropicAdapter = AnthropicTextAdapter<typeof ANTHROPIC_MODEL>;
type GeminiAdapter = GeminiTextAdapter<typeof GEMINI_MODEL>;
type OllamaAdapter = OllamaTextAdapter<typeof OLLAMA_MODEL>;

export type AdapterWithModelOptions =
  | {
      provider: 'anthropic';
      adapter: AnthropicAdapter;
      modelOptions: ProviderOptions<AnthropicAdapter>;
    }
  | {
      provider: 'gemini';
      adapter: GeminiAdapter;
      modelOptions: ProviderOptions<GeminiAdapter>;
    }
  | {
      provider: 'ollama';
      adapter: OllamaAdapter;
      modelOptions: ProviderOptions<OllamaAdapter>;
    };

let cachedAdapter: AdapterWithModelOptions | null = null;

const createAdapter = async (): Promise<AdapterWithModelOptions> => {
  if (isProduction) {
    const { anthropicText } = await import('@tanstack/ai-anthropic');

    return {
      provider: 'anthropic',
      adapter: anthropicText(ANTHROPIC_MODEL),
      modelOptions: { max_tokens: MAX_TOKENS }
    };
  }

  const useGemini = process.env.USE_GEMINI === 'true';

  if (useGemini) {
    const { geminiText } = await import('@tanstack/ai-gemini');

    return {
      provider: 'gemini',
      adapter: geminiText(GEMINI_MODEL),
      modelOptions: { maxOutputTokens: MAX_TOKENS }
    };
  }

  const { ollamaText } = await import('@tanstack/ai-ollama');

  return {
    provider: 'ollama',
    adapter: ollamaText(OLLAMA_MODEL),
    modelOptions: { options: { num_predict: MAX_TOKENS } }
  };
};

export const getAdapter = async (): Promise<AdapterWithModelOptions> => {
  if (cachedAdapter) {
    return cachedAdapter;
  }

  const adapter = await createAdapter();
  cachedAdapter = adapter;
  return adapter;
};
