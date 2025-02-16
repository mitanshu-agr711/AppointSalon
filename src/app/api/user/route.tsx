import { NextResponse } from 'next/server';
import {User} from '../../../lib/models/user'

export async function POST(req: Request) {
    try {
        
        const body = await req.json();
        const {service, price, select} = body;
        if (!service || !price) {
            return NextResponse.json({ error: 'Service and price are required' }, { status: 400 });
        }
        const user = new User({ service, price ,select});
        await user.save();

        return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
    } catch (error) {
        console.error('Error saving user:', error);
        const errorMessage = (error as Error).message;
        return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
    }
}
