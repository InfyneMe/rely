import { google } from 'googleapis';

const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI 
);
export async function POST(req) {
    const body = await req.json();
    const {code} = body;
    if (!code) return new Response(JSON.stringify({ error: 'code is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    const token = await oAuth2Client.getToken(code);
    console.log('token',token);
    return new Response(JSON.stringify({ code }), { status: 200 , headers: { 'Content-Type': 'application/json' } })
}
