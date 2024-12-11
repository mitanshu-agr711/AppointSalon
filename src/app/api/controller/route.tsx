import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ message: 'This is a GET request' });
}
