import { db } from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const data = await request.json();

        const userFound = await db.user.findUnique({
            where: {
                username: data.username
            }
        })
    
        if (userFound) {
            return NextResponse.json({error: "User already exists"},{status:400})
        }
    
        data.password = await bcrypt.hash(data.password, 10);
        const newUser = await db.user.create({
            data: data
        }) 

        if (newUser){
            return NextResponse.json({message: "User created successfully"},{status:201});
        }
    
    } catch (error) {
        return NextResponse.json({error: "An error occurred"},{status:500})
    }
}