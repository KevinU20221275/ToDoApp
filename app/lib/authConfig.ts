import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { sql } from "@vercel/postgres";
import { User } from "./definitions";

export const authConfig = {
    providers: [
        Credentials({
            name: "Credentials", 
            credentials: {
                username: {label:"username", type: "text", placeholder: "jsmith"},
                password: {label:"password", type: "password", placeholder: "password123"}
            },
            async authorize(credentials){
                if(!credentials?.username ||!credentials?.password){
                    throw new Error('Username and password are required')
                }

                const data = await sql<User>`SELECT * FROM Users WHERE username = ${credentials.username} LIMIT 1`

                if (data.rows.length <= 0) return null;
                const user : User = data.rows[0]

                const valid = await bcrypt.compare(credentials?.password, user.password)

                if (!valid) return null;

                return {
                    id: user.id.toString(),
                    name: user.username
                }
            },
        })
    ],
    pages : {
        signIn: '/'
    }
}