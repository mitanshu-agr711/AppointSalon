import { NextResponse } from 'next/server';
import {Service} from '@/lib/service/service';

export async function POST(req: Request) {
    try {

        const body = await req.json();
        const { agent,service,price } = body;
        if (!agent|| !service || !price) {
            return NextResponse.json({ error: 'error to store info' }, { status: 400 });
        }
        const user = new Service({ agent,service,price });
        await user.save();

        return NextResponse.json({ message: 'User SignUp successfully',  user: { agent,service,price }}, { status: 201 });
    } catch (error) {
        console.error('Error saving user:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
