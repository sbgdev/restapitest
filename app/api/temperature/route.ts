import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface SensorData {
    temperature: number | null;
    humidity: number | null;
    rain: number | null;
    soilMoisture: number | null;
    gas: number | null;
    motionDetected: number | null;
    touch: number | null;
  }

  let sensorData: SensorData = {
    temperature: null,
    humidity: null,
    rain: null,
    soilMoisture: null,
    gas: null,
    motionDetected: null,
    touch: null,
  };
export const GET = async () => {
    return new NextResponse(JSON.stringify(sensorData),{status: 200});
}

export const POST = async (request: NextRequest) => { 
    try {
        const data = await request.json();
        sensorData = { ...data };


        return new NextResponse(JSON.stringify(sensorData),{status: 200})
    } catch (error: any) {
        return new NextResponse("Failed to parse request data" + error.message,{status: 500})
    }
}

