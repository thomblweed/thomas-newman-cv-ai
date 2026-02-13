export const isProduction = process.env.NODE_ENV === 'production';

export const getApiKey = () => {
  const useGemini = !isProduction && process.env.USE_GEMINI === 'true';
  const apiKey = isProduction
    ? process.env.ANTHROPIC_API_KEY
    : useGemini
      ? process.env.GEMINI_API_KEY
      : process.env.OLLAMA_HOST;

  const apiKeyName = isProduction
    ? 'ANTHROPIC_API_KEY'
    : useGemini
      ? 'GEMINI_API_KEY'
      : 'OLLAMA_HOST';

  return { apiKey, apiKeyName };
};
