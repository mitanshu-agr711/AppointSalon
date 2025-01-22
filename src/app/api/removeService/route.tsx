import { NextResponse } from 'next/server';
// import connectToDatabase from "../../../lib/connect"; 
import { Service } from '@/lib/service/service'; 

export async function POST(req: Request) {
  try {
    const body = await req.json(); 
    const { index } = body; 

    if (typeof index !== 'number') {
      return NextResponse.json(
        { error: 'Index must be a number' },
        { status: 400 }
      );
    }

  
    // await connectToDatabase();

   
    const services = await Service.find({}); 

    if (index < 0 || index >= services.length) {
      return NextResponse.json(
        { error: 'Invalid index: out of bounds' },
        { status: 400 }
      );
    }

 
    const serviceToDelete = services[index];

  
    await Service.findByIdAndDelete(serviceToDelete._id);

    return NextResponse.json(
      { message: 'Service deleted successfully', deletedService: serviceToDelete },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
