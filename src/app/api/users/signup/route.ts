import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendMail } from "@/helpers/mailer";


connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const {username, email, password} = reqBody;
        console.log(reqBody);

        // check if the user exists
        const user = await User.findOne({ email });
        if(user) {
            return NextResponse.json({
                error: 'User already exists',
            }, { status: 400 });
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        // send verification email
        await sendMail({ email, emailType: 'VERIFY', userId: savedUser._id })

        return NextResponse.json({
            message: "user created successfully",
            success: true,
            savedUser
        })
    } catch(err: any) {
        return NextResponse.json({
            err: err.message
        }, { status: 500 })
    }
}

