import { NextResponse } from 'next/server';
import { Service } from '@/lib/service/service';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { agent, service, price } = body;

   
    if (!agent || !service || !price) {
      return NextResponse.json(
        { error: 'All fields (agent, service, price) are required.' },
        { status: 400 }
      );
    }

   
    const serviceEntry = new Service({ agent, service, price });
    await serviceEntry.save();

    return NextResponse.json(
      { message: 'Service saved successfully.', serviceEntry },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error saving service:', error);

    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Duplicate entry. The service is already registered.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
