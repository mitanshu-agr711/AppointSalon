import { NextResponse,NextRequest } from 'next/server';

import { Sign } from '@/lib/registeration/signup';
import bcrypt from 'bcrypt';
import { generateToken } from '../auth/generateToken';

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();
        const {  email, password } = body;
        console.log("body", body);
        if ( !email || !password) {
            return NextResponse.json({ error: 'user not found' }, { status: 404 });
        }
       const user = await Sign.findOne({ email });
       if (!user) {
        return NextResponse.json(
            { error: 'Invalid email or password.' },
            { status: 401 }
        );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("isPasswordValid", isPasswordValid);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password not correct.' },
                { status: 401 }
            );
        }
        const token= generateToken(user);
        console.log("token", token);

        return NextResponse.json({ message: 'User login successfully', user , token,}, { status: 201 });

    } catch (error) {
        console.error('Error saving user:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
    }
}
