import { NextResponse } from 'next/server';
import { Login } from '@/lib/registeration/login';

export async function POST(req: Request) {
    try {

        const body = await req.json();
        const {  email, password } = body;
        if ( !email || !password) {
            return NextResponse.json({ error: 'incomplete registeration' }, { status: 400 });
        }
        const user = new Login({  email, password });
        await user.save();

        return NextResponse.json({ message: 'User login successfully', user }, { status: 201 });
    } catch (error) {
        console.error('Error saving user:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
