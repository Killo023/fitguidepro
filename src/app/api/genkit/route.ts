import { NextRequest, NextResponse } from 'next/server';
import { suggestDailyMealPlanFlow } from '@/ai/flows/suggest-meal-replacements';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Call the flow with the parsed body
    const result = await suggestDailyMealPlanFlow(body);
    
    // Return the result
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in /api/genkit:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Internal server error',
        details: error.toString()
      },
      { status: error.status || 500 }
    );
  }
}
