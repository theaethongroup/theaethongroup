import { NextRequest, NextResponse } from 'next/server';
import { getMrAethonReply } from '@/lib/mrAethon';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

export async function POST(request: NextRequest) {
  try {
    const { userMessage, userData } = await request.json();
    
    if (!userMessage) {
      return NextResponse.json({ message: 'No message provided' }, { status: 400 });
    }

    const response = await getMrAethonReply(userMessage, userData);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ 
      text: "I apologize, but I'm having trouble responding right now. Please try again later.",
      suggestions: []
    }, { status: 500 });
  }
}