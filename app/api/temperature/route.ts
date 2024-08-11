import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface WeatherData{
    temperature: number | null,
    humidity: number | null
}

let weatherData: WeatherData = {temperature: null, humidity: null};
export const GET = async () => {
    return new NextResponse(JSON.stringify(weatherData),{status: 200});
}

export const POST = async (request: NextRequest) => { 
    try {
        const {temperature, humidity} = await request.json();
        
        if(typeof temperature === 'number' && typeof humidity === "number") {
            weatherData = {temperature, humidity}
            return new NextResponse(JSON.stringify(weatherData),{status: 200})
        } else {
            return new NextResponse("Invalid temperature data",{status: 400})
        }
    } catch (error: any) {
        return new NextResponse("Failed to parse request data" + error.message,{status: 500})
    }
}

