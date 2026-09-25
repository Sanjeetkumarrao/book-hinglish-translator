import { NextResponse } from 'next/server';
import { parseAndChunkPDF } from '@/lib/pdf/chunker';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No PDF file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const parsedData = await parseAndChunkPDF(buffer);

    return NextResponse.json({
      success: true,
      totalPages: parsedData.totalPages,
      totalChunks: parsedData.totalChunks,
      chunks: parsedData.chunks,
    });
  } catch (error) {
    console.error('API Parse Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process PDF' },
      { status: 500 }
    );
  }
}