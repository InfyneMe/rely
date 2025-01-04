import connectDB from "../../../lib/connectDB";
import UserModel from '@/models/userModels';
import EventTicket from '../../../utils/GoogleWallet';
import { NextRequest, NextResponse } from 'next/server';

await connectDB();
export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('id_token')?.value;
        if(!token) return NextResponse.json({error: 'Unauthorized.Please Logout and Login again'}, {status: 401});

        const getUser = await getUserByToken(token);
        if(!getUser) return NextResponse.json({error: 'Unauthorized.Please Logout and Login again'}, {status: 401});

        const body = await request.json();
        const { vehicleNumber, selectedOption, reminderDate,location,locationLatLng } = body;
        console.log(vehicleNumber, selectedOption, reminderDate,location,locationLatLng)
        
        // const eventTicket = new EventTicket();
        // const cretePass = await eventTicket.createClass( vehicleNumber, selectedOption, reminderDate,location,locationLatLng, getUser );
        // if(request.length == 0) return{ status: 400, body: {error: 'Request body is required'}};
        // const passDate = request.body;
        // const eventTicket = new EventTicket();
        // const cretePass = await eventTicket.createClass(passDate);
        // return new Response(JSON.stringify({ cretePass }), { status: 200 , headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        
    }
}

const getUserByToken = async (token: string) => {
    try {
        
        const user = await UserModel.findOne({ id_token: token });
        return user;
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        
    }
};