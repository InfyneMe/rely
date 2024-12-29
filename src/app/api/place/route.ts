import {NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const input = searchParams.get('input')
  const apiKey = process.env.GOOGLE_PLACE_API_KEY;
  if (!input) {
    return NextResponse.json(
      { error: 'Input parameter is required' },
      { status: 400 }
    );
  }
  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input
      )}&key=${apiKey}`;
    
      const response = await fetch(url);
      const data = await response.json()
      return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
