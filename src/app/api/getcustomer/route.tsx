import { NextResponse } from 'next/server';
import { Sign } from '../../../lib/registeration/signup';

export async function GET(req) {
    try {
        
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email'); 

        if (!email) {
            return NextResponse.json(
                { error: 'Email query parameter is required.' },
                { status: 400 }
            );
        }

      
        const user = await Sign.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found with the provided email.' },
                { status: 404 }
            );
        }

        
        return NextResponse.json({
            firstName: user.firstName,
            lastName: user.lastName,
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json(
            { error: 'Internal server error.' },
            { status: 500 }
        );
    }
}
