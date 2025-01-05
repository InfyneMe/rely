import connectDB from "@/lib/connectDB";
import AlertModel from "@/models/alertsModels";
import UserModel from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

await connectDB()

export async function GET(request: NextRequest){
    try {
        const token = request.cookies.get('id_token')?.value;
        if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await UserModel.findOne({ id_token: token });
        if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const alerts = await AlertModel.find({ a_u_id: user._id })
        .sort({ createdAt: -1 })
        .limit(20);

        return NextResponse.json(alerts, { status: 200 });
        
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}