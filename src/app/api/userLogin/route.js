import { google } from 'googleapis';
export async function POST(req) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    let body;
    try {
        body = await req.json(); // Ensure the request body is parsed as JSON
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return new Response('Invalid JSON', { status: 400 });
    }

    const { code } = body;

    if (!code) {
        return new Response('Missing code', { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );

    try {
        const { tokens } = await oauth2Client.getToken(code);
        console.log('tokens:', tokens);
        return new Response(JSON.stringify({ tokens }), { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' } 
        });
    } catch (error) {
        console.error('Error exchanging code for tokens:', error);
        return new Response(JSON.stringify({ error: error.message }), { 
            status: 500, 
            headers: { 'Content-Type': 'application/json' } 
        });
    }
}
