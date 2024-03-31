import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const {email, password} = reqBody;
        console.log(reqBody);

        // check if the user exists
        const user = await User.findOne({ email });
        if(!user) {
            return NextResponse.json({
                error: 'User does not exists'
            }, { status: 400 });
        }

        // check if passwords are correct
        const validPassword = await bcryptjs.compare(password, user.password);
        console.log(validPassword);

        if(!validPassword) {
            return NextResponse.json({
                error: "Invalid password",
            }, { status: 400 });
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        // set cookie and include token in the cookie
        const response = NextResponse.json({
            message: "login successful",
            success: true
        });

        response.cookies.set('token', token, {
            httpOnly: true
        });

        return response;
    } catch(err: any) {
        return NextResponse.json({
            err: err.message,
        }, { status: 500 })
    }
}

