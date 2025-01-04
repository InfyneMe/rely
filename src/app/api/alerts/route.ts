import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModels";
// import AlertModel from "@/models/alertsModels"; // will use later
import EventTicket from "@/utils/GoogleWallet";
import { NextRequest, NextResponse } from "next/server";

await connectDB();

export async function POST(req:NextRequest){
    const body = await req.json();
    const {vehicleNumber, reminderType, reminderDateTime, location} = body;
    if(!vehicleNumber || !reminderType || !reminderDateTime || !location){
        return NextResponse.json({message: 'Request has some missing fields'}, {status: 400});
    }
    const token = req.cookies.get('id_token')?.value;
    if(!token) return NextResponse.json({error: 'Unauthorized.Please Logout and Login again'}, {status: 401});
    const user = await getUserByToken(token);
    if(!user) return NextResponse.json({error: 'User Not found.Please contact support'}, {status: 401});

    const eventTicket = new EventTicket();
    const createPass= await eventTicket.createClass(vehicleNumber, reminderType, reminderDateTime, location, user);
    console.log('ticket',createPass);

    return NextResponse.json({message: createPass}, {status: 200});
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


// {
//     vehicleNumber: 'AS112ER',
//     reminderType: 'Pollution Check',
//     reminderDateTime: '2025-01-15T02:38',
//     location: {
//       address: 'WJ8C+JQM, Central Silk Board Colony, Stage 2, BTM Layout, Bengaluru, Karnataka 560068, India',
//       lat: 12.9165847,
//       lng: 77.6219296,
//       name: 'Silk Board Bus Stand'
//     }
//   }