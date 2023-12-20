import User from "@/models/User"
import connect from "@/utils/db"
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server"

export const POST = async (request: any) => {
    const {name, email , password}= await request.json();

    await connect();

    const existingUser = await User.findOne({email});

    if (existingUser){
        return new NextResponse("Email is already in use", {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    console.log("Name inside route at 18", name);
    const newUser = new User ({
        name,
        email,
        password: hashedPassword
    })


    try {
        await newUser.save();
        return new NextResponse("User is Registered", { status: 200 } );

    } catch (err: any) {
        return new NextResponse(err, {
            status: 500,
        });
    }
};







