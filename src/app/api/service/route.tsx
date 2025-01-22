import { NextResponse } from 'next/server';
import { Service } from '@/lib/service/service';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { agent, service, price, email,index } = body;
     
   console.log("body", body);
    if (!agent || !service || !price || !email ||index === undefined) {
      return NextResponse.json(
        { error: 'All fields (agent, service, price, email) are required.' },
        { status: 400 }
      );
    }

    index += 1;

    const serviceEntry = new Service({ agent, service, price, email,index });
    console.log("serviceEntry", serviceEntry);
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
