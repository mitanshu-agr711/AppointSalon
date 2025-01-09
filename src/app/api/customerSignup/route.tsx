import { NextResponse } from 'next/server';
import { Sign } from '@/lib/registeration/signup';

export async function POST(req: Request) {
    try {

        const body = await req.json();
        const { firstName, secondName, email, password } = body;
        if (!firstName || !secondName || !email || !password) {
            return NextResponse.json({ error: 'incomplete details registeration' }, { status: 400 });
        }
        const existUser = await Sign.findOne({ email });
        if (existUser) {
            return NextResponse.json({ error: 'User already exist' }, { status: 400 });
        }
        const user = new Sign({ firstName, secondName, email, password });
        await user.save();

        return NextResponse.json({ message: 'User SignUp successfully',  user: { firstName, secondName, email }}, { status: 201 });
    } catch (error) {
        console.error('Error saving user:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
