import { NextResponse } from 'next/server';
import { AIFactory } from '@/lib/ai/aiFactory';

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text content is required' }, { status: 400 });
    }

    const aiProvider = AIFactory.getProvider();
    const translatedText = await aiProvider.translateChunk(text);

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}