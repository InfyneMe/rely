import { google } from 'googleapis';
import { jwtDecode } from "jwt-decode";
import UserModel from '@/models/userModels';
import connectDB from '@/lib/connectDB';
import { NextRequest, NextResponse } from 'next/server';

interface DecodedToken {
    given_name: string;
    family_name: string;
    email: string;
    email_verified: boolean;
    picture: string;
}

const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI 
);
export async function POST(request: NextRequest) {
    try {

        const body = await request.json();
        const {code} = body;
        if (!code) return NextResponse.json({error: 'Code not found from body.Plaese contact support'}, {status: 400})

        const {tokens} = await oAuth2Client.getToken(code);
        const {id_token, access_token, refresh_token } = tokens;

        const userInfo = jwtDecode<DecodedToken>(id_token!)
        await connectDB()
        await UserModel.findOneAndUpdate(
            {email: userInfo.email},
            {
                name: `${userInfo.given_name} ${userInfo.family_name}`,
                email: userInfo.email,
                access_token,
                refresh_token,
                email_verified: userInfo.email_verified,
                picture: userInfo.picture,
                id_token
            },
            {new: true, upsert: true}
        )
        const response = NextResponse.json(
            {
                message: "Login Success",
                status: true
            }
        )
        const maxAge = 60 * 24 * 60 * 60; // 60 days in seconds
        response.cookies.set('id_token', id_token || '', {
            httpOnly: true,
            maxAge: maxAge,
        });
        return response;
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}
