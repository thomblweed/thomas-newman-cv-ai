import { resolveProviderName } from './providerName';

import type { ProviderName } from './providerName';
import type { chat } from '@tanstack/ai';
import type { AnthropicTextAdapter } from '@tanstack/ai-anthropic';
import type { GeminiTextAdapter } from '@tanstack/ai-gemini';
import type { OpenRouterTextAdapter } from '@tanstack/ai-openrouter';

import { isProduction } from '@/server/env/env.server';

const ANTHROPIC_MODEL = 'claude-haiku-4-5';
const GEMINI_MODEL = 'gemini-2.5-flash';
const OPENROUTER_MODEL = 'deepseek/deepseek-v3.2';
const MAX_TOKENS = 1024;

type ChatAdapter = Parameters<typeof chat>[0]['adapter'];
type ProviderOptions<TAdapter extends ChatAdapter> =
  TAdapter['~types']['providerOptions'];

type AnthropicAdapter = AnthropicTextAdapter<typeof ANTHROPIC_MODEL>;
type GeminiAdapter = GeminiTextAdapter<typeof GEMINI_MODEL>;
type OpenRouterAdapter = OpenRouterTextAdapter<typeof OPENROUTER_MODEL>;

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
      provider: 'openrouter';
      adapter: OpenRouterAdapter;
      modelOptions: ProviderOptions<OpenRouterAdapter>;
    };

interface ProviderDefinition {
  create: () => Promise<AdapterWithModelOptions>;
  apiKeyEnvVar: string;
}

// Adding a provider means one entry here plus its npm dependency.
const providers: Record<ProviderName, ProviderDefinition> = {
  anthropic: {
    apiKeyEnvVar: 'ANTHROPIC_API_KEY',
    create: async () => {
      const { anthropicText } = await import('@tanstack/ai-anthropic');

      return {
        provider: 'anthropic',
        adapter: anthropicText(ANTHROPIC_MODEL),
        modelOptions: { max_tokens: MAX_TOKENS }
      };
    }
  },
  gemini: {
    apiKeyEnvVar: 'GEMINI_API_KEY',
    create: async () => {
      const { geminiText } = await import('@tanstack/ai-gemini');

      return {
        provider: 'gemini',
        adapter: geminiText(GEMINI_MODEL),
        modelOptions: { maxOutputTokens: MAX_TOKENS }
      };
    }
  },
  openrouter: {
    apiKeyEnvVar: 'OPENROUTER_API_KEY',
    create: async () => {
      const { openRouterText } = await import('@tanstack/ai-openrouter');

      return {
        provider: 'openrouter',
        adapter: openRouterText(OPENROUTER_MODEL),
        modelOptions: { maxCompletionTokens: MAX_TOKENS }
      };
    }
  }
};

const DEV_PROVIDER: ProviderName = 'gemini';
const PRODUCTION_PROVIDER: ProviderName = 'anthropic';

const activeProviderName = (): ProviderName =>
  resolveProviderName(
    process.env.AI_PROVIDER,
    isProduction ? PRODUCTION_PROVIDER : DEV_PROVIDER
  );

export const getProviderApiKey = () => {
  const apiKeyName = providers[activeProviderName()].apiKeyEnvVar;

  return { apiKey: process.env[apiKeyName], apiKeyName };
};

let cachedAdapter: AdapterWithModelOptions | null = null;

const createAdapter = async (): Promise<AdapterWithModelOptions> =>
  providers[activeProviderName()].create();

export const getAdapter = async (): Promise<AdapterWithModelOptions> => {
  if (cachedAdapter) {
    return cachedAdapter;
  }

  const adapter = await createAdapter();
  cachedAdapter = adapter;
  return adapter;
};
