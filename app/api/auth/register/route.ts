import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { User } from "@/app/lib/definitions";

export async function POST(request:NextRequest){
    try {
        const data = await request.json();

        const userFound = await sql<User>`SELECT * FROM users WHERE username = ${data.username} LIMIT 1`;

        if (userFound.rows.length > 0) {
            return NextResponse.json({error: "User already exists"},{status:400})
        }
    
        data.password = await bcrypt.hash(data.password, 10);
        const newUser = await sql<User>`INSERT INTO users (username, password) VALUES (${data.username}, ${data.password})`

        if (newUser){
            return NextResponse.json({message: "User created successfully"},{status:201});
        }
    
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "An error occurred"},{status:500})
    }
}