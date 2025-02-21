import Credentials from "next-auth/providers/credentials";
import { db } from "@/app/lib/prisma";
import bcrypt from 'bcrypt'

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

                const user = await db.user.findUnique({
                    where: {
                        username: credentials.username
                    }
                })

                if (!user) return null;

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