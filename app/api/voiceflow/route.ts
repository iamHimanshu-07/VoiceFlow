import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Voiceflow POST received:', body);
    // TODO: process voiceflow request, e.g., forward to speech recognition service
    return NextResponse.json({ status: 'ok', received: body }, { status: 200 });
  } catch (error) {
    console.error('Voiceflow API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Optional: handle GET for verification
export async function GET(request: Request) {
  return NextResponse.json({ status: 'Voiceflow endpoint is alive' }, { status: 200 });
}