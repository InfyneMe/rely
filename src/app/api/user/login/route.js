import { google } from 'googleapis';
import { jwtDecode } from "jwt-decode";
import UserModel from '@/models/userModels';
import connectDB from '@/lib/connectDB';

const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI 
);
export async function POST(req) {
    const body = await req.json();
    const {code} = body;
    if (!code) return new Response(JSON.stringify({ error: 'code is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    const {tokens} = await oAuth2Client.getToken(code);
    const {id_token, access_token, refresh_token } = tokens;
    const userInfo = jwtDecode(id_token)
    await connectDB()
    const user = new UserModel({
        name: userInfo.given_name + userInfo.family_name,
        email: userInfo.email,
        access_token,
        refresh_token,
        email_verified: userInfo.email_verified,
        picture: userInfo.picture,
        id_token
    })
    await user.save();
    return new Response(JSON.stringify({ id_token }), { status: 200 , headers: { 'Content-Type': 'application/json' } })
}
