import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface TemperatureData{
    temperature: number | null
}

let temperatureData: TemperatureData = {temperature: null};
export const GET = async () => {
    return new NextResponse(JSON.stringify(temperatureData),{status: 200});
}

export const POST = async (request: NextRequest) => { 
    try {
        const {temperature} = await request.json();
        
        if(typeof temperature === 'number'){
            temperatureData.temperature = temperature;
            return new NextResponse(JSON.stringify(temperatureData),{status: 200})
        } else {
            return new NextResponse("Invalid temperature data",{status: 400})
        }
    } catch (error: any) {
        return new NextResponse("Failed to parse request data" + error.message,{status: 500})
    }
}

