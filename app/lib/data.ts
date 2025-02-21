'use server'
import { getServerSession } from "next-auth";
import { sql } from "@vercel/postgres";
import { authConfig } from "./authConfig";
import { User } from "./definitions";

export async function userSession(){
  const session = await getServerSession(authConfig);
  if (!session?.user?.name) return null;

  const data = await sql<User>`SELECT * FROM users WHERE username = ${session.user.name} LIMIT 1`

  if (!data) return null

  const user : User = data.rows[0]

  return user;
}