import { Task } from "../lib/definitions";


export async function fetchTasks(){
    const res = await fetch('/api/auth/tasks')

    if (!res.ok) {
        throw new Error('Failed to fetch tasks')
    }
    const tasks = await res.json()

    return tasks
}

export async function addTask(taskForm: Task) {
    const res = await fetch('/api/auth/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskForm),
    })

    if (!res.ok) {
        throw new Error('Failed to add task')
    }

    const data = await res.json()

    return data
}

export async function updateTask(task: Task) {

    const res = await fetch('/api/auth/tasks', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })

    if (!res.ok) {
        throw new Error('Failed to save task')
    }

    const data = await res.json()

    return data
}

export async function deleteTask(id: number) {
    const res = await fetch('/api/auth/tasks', {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id}),
    })

    if (!res.ok) {
        throw new Error('Failed to delete task')
    }

    const data = await res.json()

    return data
}