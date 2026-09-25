import pdfParse from 'pdf-parse-fork';

export async function parseAndChunkPDF(pdfBuffer, maxChunkWords = 300) {
  try {
    const data = await pdfParse(pdfBuffer);
    const rawText = data.text;

    if (!rawText || rawText.trim().length === 0) {
      throw new Error("PDF file se text extract nahi ho paya ya PDF empty/scanned image hai.");
    }

    // Clean whitespace and line breaks
    const cleanText = rawText.replace(/\r\n/g, '\n').replace(/\n+/g, '\n');
    
    // Split text into paragraphs
    const paragraphs = cleanText.split('\n');
    const chunks = [];
    let currentChunk = [];
    let currentWordCount = 0;

    for (const paragraph of paragraphs) {
      const words = paragraph.trim().split(/\s+/).filter(Boolean);
      if (words.length === 0) continue;

      if (currentWordCount + words.length > maxChunkWords) {
        chunks.push(currentChunk.join(' '));
        currentChunk = [paragraph.trim()];
        currentWordCount = words.length;
      } else {
        currentChunk.push(paragraph.trim());
        currentWordCount += words.length;
      }
    }

    if (currentChunk.length > 0) {
      chunks.push(currentChunk.join(' '));
    }

    return {
      totalPages: data.numpages,
      totalChunks: chunks.length,
      chunks,
    };
  } catch (error) {
    console.error('PDF Parsing Error:', error);
    throw new Error(error.message || 'Failed to parse and chunk PDF file.');
  }
}