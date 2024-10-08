import connect from "@/lib/db"
import User from "@/lib/modals/user";
import { NextResponse } from "next/server"
// import { Types } from "mongoose";

//To check the user id is correct or not
const ObjectId = require("mongoose").Types.ObjectId

export const GET =async () => {
    try {
        await connect();
        const users = await User.find()
        return new NextResponse(JSON.stringify(users),{status: 200})
    } catch (error: any) {
        return new NextResponse("Error in fetching users" + error.message, {
            status: 500
        } )
    }
}

export const POST = async (request:Request) => { 
    try {
        const body = await request.json()
        await connect();
        const newUser = new User(body)
        await newUser.save();

        return new NextResponse(JSON.stringify({message: "User is Created", user: newUser}), {
            status: 201
        })
    } catch (error:any) {
        return new NextResponse("Error in creating user"+ error.message,{status:500})
    }
}


export const PATCH = async (request: Request) => { 
    try {
        const body = await request.json()
        const { userId, newUsername } = body;
        await connect();

        if (!userId || !newUsername) {
            return new NextResponse(JSON.stringify({ message: "Id or new username not found" }), {
                status: 400
            })
        }
        
        if (!ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid user id" }), {
                status: 400
            })
        }

        const updatedUser = await User.findByIdAndUpdate(
            { _id: new ObjectId(userId) },
            { username: newUsername },
            { new: true }
        )

        if (!updatedUser) {
            return new NextResponse(JSON.stringify({ message: "User not found in database" }), {
                status: 404
            })
        }

        return new NextResponse(JSON.stringify({ message: "Username is updated" }), { status: 200 })
    } catch (error: any) {
        return new NextResponse( "Error" + error.message, {status: 500 })
    }
}


export const DELETE = async (request: Request) => { 
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return new NextResponse(JSON.stringify({ message: "User id not found" }), {
                status: 400
            })
        }

        if (!ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid user id" }), {
                status: 400
            })
        }

        await connect();
        const deletedUser= await User.findByIdAndDelete(new ObjectId(userId));

        if (!deletedUser) {
            return new NextResponse(JSON.stringify({ message: "User not found in database" }), {
                status: 404
            })
        }

        return new NextResponse(JSON.stringify({ message: "User is deleted" }), {
            status: 201
        })
    } catch (error:any) {
        return new NextResponse("Error: " + error.message, { status: 500 })
    }
}
