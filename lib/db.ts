import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI

const connect = async () => {
    const connectionState = mongoose.connection.readyState
    

    if (connectionState === 1) {
        console.log("Already connected");
        return
    }

    if (connectionState === 2) { 
        console.log("Connecting...");
        return
    }

    try {
        await mongoose.connect(MONGODB_URI!, {
            dbName: "restapi",
            bufferCommands: true
        })
        console.log("Connected");
    } catch (error :any) {
        console.log("Error connecting to MOngodb: ", error);
        throw new Error("Error connecting to MOngodb: ", error);
    }
}

export default connect;