import { NextResponse } from 'next/server';
import {User} from '../../../lib/models/user'

export async function POST(req: Request) {
    try {
        // console.log(req)
        const body = await req.json();

        const {service, price} = body;

       
        if (!service || !price) {
            return NextResponse.json({ error: 'Service and price are required' }, { status: 400 });
        }

        
        const user = new User({ service, price });
        await user.save();

        return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
    } catch (error) {
        console.error('Error saving user:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
