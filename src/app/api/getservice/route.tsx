import { NextResponse } from 'next/server';
import { Service } from '../../../lib/service/service'; 

interface Request {
  url: string;
}

interface ServiceType {
  email: string;
  // Add other service properties here
}

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email'); 

    if (!email) {
      return NextResponse.json(
        { error: 'Email query parameter is required.' },
        { status: 400 }
      );
    }

    console.log('Fetching services for email:', email);
    const services: ServiceType[] = await Service.find({ email });
    console.log('Services:', services);
    if (!services || services.length === 0) {
      return NextResponse.json(
        { error: 'No services found for this email.' },
        { status: 404 }
      );
    }

    return NextResponse.json(services); 
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
