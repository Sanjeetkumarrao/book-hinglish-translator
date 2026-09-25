export class BaseAIAdapter {
  async translateChunk(textPrompt) {
    throw new Error("translateChunk method must be implemented");
  }
}