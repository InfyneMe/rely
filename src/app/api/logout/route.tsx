// app/api/logout/route.js
import { NextResponse } from 'next/server'

export async function POST() {
    const response = NextResponse.json({
        message: 'Logout success',
        success: true
    })
    
    response.cookies.set('id_token', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/', // Important: must match the path used when setting
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    })

    return response // Return the response object we modified
}