import axios from 'axios';
import { BaseAIAdapter } from './baseAdapter';

export class OllamaAdapter extends BaseAIAdapter {
  constructor(baseUrl = 'http://localhost:11434', modelName = 'llama3') {
    super();
    this.baseUrl = baseUrl;
    this.modelName = modelName;
  }

  async translateChunk(textPrompt) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/generate`, {
        model: this.modelName,
        prompt: `You are a translator that translates English text into Hinglish (Hindi written in English/Latin letters).

STRICT RULES:
1. NEVER use Hindi/Devanagari script (like डेटा स्ट्रक्चर).
2. ONLY use English alphabets (a-z, A-Z).
3. Keep technical words in English (e.g. Data Structures, Algorithms, Computer Science).
4. Do NOT add any extra talk like "Here is the translation".

EXAMPLES:
Input: "Data Structures and Algorithms are foundational concepts in Computer Science."
Output: "Data Structures aur Algorithms Computer Science ke foundational concepts hain."

Input: "They enable developers to write efficient code."
Output: "Ye developers ko efficient code likhne me help karte hain."

Input:
${textPrompt}

Output:`,
        stream: false
      });

      return response.data.response;
    } catch (error) {
      console.error("Ollama Translation Error:", error?.message || error);
      throw new Error("Failed to process translation with local Ollama engine.");
    }
  }
}