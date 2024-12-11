import { NextResponse } from 'next/server';
import { User } from '../../../lib/models/user';

export async function GET() {
    const data= await User.find();
    return NextResponse.json(data);
   
}
