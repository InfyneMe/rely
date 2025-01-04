import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const placeId = searchParams.get('place_id');
  const apiKey = process.env.GOOGLE_PLACE_API_KEY;

  if (!placeId) {
    return NextResponse.json({ error: 'place_id is required' }, { status: 400 });
  }

  try {
    // Use the Places Details API instead of Autocomplete
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    if (data.status === 'OK' && data.result.geometry) {
      return NextResponse.json({
        results: [{
          description: data.result.formatted_address,
          geometry: data.result.geometry,
        }]
      });
    } else {
      return NextResponse.json({ error: 'Location details not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
}
