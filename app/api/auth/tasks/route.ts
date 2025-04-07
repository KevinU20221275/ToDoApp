import { userSession } from "@/app/lib/data";
import { NextResponse } from "next/server";
import { tursoTasksDB } from "@/app/lib/tursoConnect";



export async function GET(){
    const user = await userSession()
    if (!user) return NextResponse.json({message: "Unauthenticated"}, {status: 401})

    try {
        const tasks = await tursoTasksDB.execute({
            sql: "SELECT * FROM tasks WHERE userId = ?",
            args: [user.id],
        });

        return NextResponse.json(tasks.rows, {status: 200})
    } catch (error) {
        return NextResponse.json({message: `Task not found ${error}`}, {status: 404})
    }
}

export async function POST(req: Request){
    const user = await userSession()

    if (!user) return NextResponse.json({message: "Unauthenticated"}, {status: 401})

    const data = await req.json();

    if (!data.Description || data.Done === '') return NextResponse.json({ message: "Data not found" }, {status: 404});

    try {
        const insertResult = await tursoTasksDB.execute({
            sql: "INSERT INTO tasks (description, done, userId) VALUES (?, ?, ?)",
            args: [data.Description, data.Done, user.id],
        })

        const insertedId = insertResult.lastInsertRowid
        
        if (!insertedId) return NextResponse.json({message: 'Task not added'}, {status : 400})

        const newTask = await tursoTasksDB.execute({
            sql: "SELECT * FROM tasks WHERE id = ?",
            args: [insertedId],
        })

        if (newTask){
            const responseData = {
                Id: newTask.rows[0].Id,
                Description: newTask.rows[0].Description,
                Done: newTask.rows[0].Done,
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

        await tursoTasksDB.execute({
            sql: "DELETE FROM tasks WHERE id = ?",
            args: [data.id],
        })

        return NextResponse.json({message: 'Task deleted'}, {status : 200})
    } catch (error) {
        return NextResponse.json({message: error}, {status: 500})
    }
}

export async function PUT(req: Request) {
    const user = await userSession()

    if (!user) return NextResponse.json({message: "Unauthenticated"}, {status: 401})

    const data = await req.json()

    console.log(data)

    try {
        tursoTasksDB.execute({
            sql: "UPDATE tasks SET description = ?, done = ? WHERE id = ?",
            args: [data.Description, data.Done, data.Id],
        })

        return NextResponse.json({message: 'Task updated successfully'}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "Task updated failed", error}, {status: 400})
    }
}