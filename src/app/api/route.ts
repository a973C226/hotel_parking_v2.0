import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    console.log(request.headers.get('authorization'));
    // console.log(request.json());
    return new NextResponse();
}