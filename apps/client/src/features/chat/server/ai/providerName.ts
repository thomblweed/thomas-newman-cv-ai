export const PROVIDER_NAMES = ['anthropic', 'gemini', 'openrouter'] as const;

export type ProviderName = (typeof PROVIDER_NAMES)[number];

const isProviderName = (value: string): value is ProviderName =>
  PROVIDER_NAMES.some((name) => name === value);

export const resolveProviderName = (
  override: string | undefined,
  fallback: ProviderName
): ProviderName => {
  if (!override) {
    return fallback;
  }

  if (!isProviderName(override)) {
    throw new Error(
      `AI_PROVIDER "${override}" is not a known provider. Expected one of: ${PROVIDER_NAMES.join(', ')}`
    );
  }

  return override;
};
