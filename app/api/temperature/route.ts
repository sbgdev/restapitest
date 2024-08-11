import { NextResponse } from "next/server";

export const GET = async (request:Request) => {
    try {
        const data = await request.json();
        return new NextResponse(JSON.stringify(data),{status: 200})
    } catch (error: any) {
        return new NextResponse("Error in fetching users" + error.message, {
            status: 500
        } )
    }
}

export const POST = async (request:Request) => { 
    try {
        const body = await request.json()
        return new NextResponse(JSON.stringify(body),{status: 200})
    } catch (error:any) {
        return new NextResponse("Error in creating user"+ error.message,{status:500})
    }
}