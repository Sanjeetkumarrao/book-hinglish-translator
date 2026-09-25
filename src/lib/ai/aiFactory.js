import { OllamaAdapter } from './ollamaAdapter';

export class AIFactory {
  static getProvider() {
    const provider = process.env.AI_PROVIDER || 'ollama';

    switch (provider.toLowerCase()) {
      case 'ollama':
        return new OllamaAdapter(
          process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
          process.env.OLLAMA_MODEL || 'llama3'
        );

      // Future Cloud Integrations (Groq, Gemini, etc.):
      // case 'groq':
      //   return new GroqAdapter(process.env.GROQ_API_KEY);

      default:
        throw new Error(`Unsupported AI Provider: ${provider}`);
    }
  }
}