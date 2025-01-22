import { NextResponse } from 'next/server';
import { Service } from '../../../lib/service/service';

export async function GET() {
    console.log("hello")

    const data= await Service.find();
    // console.log(data);
    return NextResponse.json(data);
}
