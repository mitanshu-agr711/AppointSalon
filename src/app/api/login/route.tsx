import { NextResponse } from 'next/server';

import { Login } from '@/lib/registeration/login';
import bcrypt from 'bcrypt';
import { generateToken } from '../auth/generateToken';

export async function POST(req: Request) {
    try {

        const body = await req.json();
        const {  email, password } = body;
        if ( !email || !password) {
            return NextResponse.json({ error: 'user not found' }, { status: 404 });
        }
       const user = await Login.findOne({ email });
       if (!user) {
        return NextResponse.json(
            { error: 'Invalid email or password.' },
            { status: 401 }
        );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password not correct.' },
                { status: 401 }
            );
        }
        const token= generateToken(user);
        localStorage.setItem('token', token);

        return NextResponse.json({ message: 'User login successfully', user }, { status: 201 });

    } catch (error) {
        console.error('Error saving user:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
