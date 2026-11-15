import { resolveProviderName } from './providerName';

describe('When AI_PROVIDER names a known provider', () => {
  it('should use that provider instead of the fallback', () => {
    expect(resolveProviderName('openrouter', 'gemini')).toBe('openrouter');
    expect(resolveProviderName('anthropic', 'gemini')).toBe('anthropic');
  });
});

describe('When AI_PROVIDER names an unknown provider', () => {
  it('should throw an error listing the known providers', () => {
    expect(() => resolveProviderName('gpt-5', 'gemini')).toThrow(
      /AI_PROVIDER "gpt-5" is not a known provider/
    );
  });
});

describe('When AI_PROVIDER is not set', () => {
  it('should use the fallback', () => {
    expect(resolveProviderName(undefined, 'gemini')).toBe('gemini');
    expect(resolveProviderName('', 'anthropic')).toBe('anthropic');
  });
});
