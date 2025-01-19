import { NextResponse } from 'next/server';
import { Service } from '@/lib/service/service';
import jwt from 'jsonwebtoken'; // Assuming you're using JWT for token management

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { agent, service, price } = body;

    // Validate the request body
    if (!agent || !service || !price) {
      return NextResponse.json(
        { error: 'All fields (agent, service, price) are required.' },
        { status: 400 }
      );
    }

    // Extract the token from the Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized. Token is missing.' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1]; // Get the token part after "Bearer"

    // Verify and decode the token to extract the email
    let decodedToken: any;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET!); // Use your JWT secret
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired token.' },
        { status: 401 }
      );
    }

    const email = decodedToken.email; // Assuming the token includes the `email` field
    if (!email) {
      return NextResponse.json(
        { error: 'Email not found in the token.' },
        { status: 400 }
      );
    }

    // Save the service entry with the email
    const serviceEntry = new Service({ agent, service, price, email });
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
