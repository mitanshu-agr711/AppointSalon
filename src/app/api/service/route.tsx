import { NextResponse } from 'next/server';
import { Service } from '@/lib/service/service';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { agent, service, price, email } = body;


    if (!agent || !service || !price || !email) {
      return NextResponse.json(
        { error: 'All fields (agent, service, price, email) are required.' },
        { status: 400 }
      );
    }

    const serviceEntry = new Service({ agent, service, price, email });
    await serviceEntry.save();

    return NextResponse.json(
      { message: 'Service saved successfully.', serviceEntry },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error saving service:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
