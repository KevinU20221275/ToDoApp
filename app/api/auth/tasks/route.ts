import { userSession } from "@/app/lib/data";
import {sql} from "@vercel/postgres"
import { NextResponse } from "next/server";
import { Task } from "@/app/lib/definitions";

export async function GET(){
    const user = await userSession()

    if (!user) return NextResponse.json({message: "Unauthenticated"}, {status: 401})

    try {
        const tasks = await sql<Task[]>`SELECT * FROM tasks WHERE userId = ${user.id}`

        return NextResponse.json(tasks.rows, {status: 200})
    } catch (error) {
        return NextResponse.json({message: `Task not found ${error}`}, {status: 404})
    }
}

export async function POST(req: Request){
    const user = await userSession()

    if (!user) return NextResponse.json({message: "Unauthenticated"}, {status: 401})

    const data = await req.json();

    if (!data.description || data.done === '') return NextResponse.json({ message: "Data not found" }, {status: 404});

    try {
        const newTask = await sql<Task>`INSERT INTO tasks (description, done, userId) 
            VALUES (${data.description}, ${data.done}, ${user.id}) RETURNING *`

        if (newTask){
            const responseData = {
                id: newTask.rows[0].id,
                description: newTask.rows[0].description,
                done: newTask.rows[0].done,
                userId: newTask.rows[0].userId,
            }
            return NextResponse.json(responseData, {status : 201})
        } else {
            return NextResponse.json({message: 'Task not added'}, {status : 400})
        }

    } catch (error) {
        return NextResponse.json({message: error}, {status: 500})
    }
}

export async function DELETE(req: Request){
    const user = await userSession()
  
    if (!user) return NextResponse.json({message: "Unauthenticated"}, {status: 401})
    const data = await req.json();

    if (!data) return NextResponse.json({ message: "Data not found" }, {status: 404});

    try {
        await sql`DELETE FROM tasks WHERE id=${Number(data.id)}`

        return NextResponse.json({message: 'Task deleted'}, {status : 200})
    } catch (error) {
        return NextResponse.json({message: error}, {status: 500})
    }
}

export async function PUT(req: Request) {
    const data = await req.json()
    console.log(data)

    try {
        await sql`UPDATE tasks 
            SET description=${data.description}, done=${data.done} 
            WHERE id=${data.id}`

        return NextResponse.json({message: 'Task updated successfully'}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "Task updated failed", error}, {status: 400})
    }
}