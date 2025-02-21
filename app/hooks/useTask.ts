import { useEffect, useState } from "react"
import { Task } from "../lib/definitions"

export function useTask(){
    const [showModal, setShowModal] = useState<boolean>(false)
    const [tasks, setTasks] = useState<Task[]>([])
    const [taskEdit, setTaskEdit] = useState<Task | null>(null)
    
    useEffect(() => {
        const getTask = async () =>{
            const res = await fetch('/api/auth/tasks')
            const tasks = await res.json()
    
            setTasks(tasks)
        }
    
        getTask()
    }, [])

    const handleShowModal = () => {
        setShowModal(true)
    }
    
    const handleSubmit = async (taskForm: Task) => {
        const method = taskForm.id != 0 ? 'PUT' : 'POST'
        const taskData = taskForm
    
        const res = await fetch('/api/auth/tasks', {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        })
        
        if (!res.ok) return
    
        setTaskEdit(null)
    
        const data = await res.json()
    
        if (method === 'PUT'){
            const updatedTasks= tasks.map(task => task.id === taskForm.id ? taskForm : task)
            setTasks(updatedTasks)
        }
        else {
            const updatedTasks = [...tasks, data]
            setTasks(updatedTasks)
        }
    }
    
    const handleEdit = (id: number) => {
        const task = tasks.find(task => task.id === id)
        if (task) {
            setTaskEdit(task)
            setShowModal(true)
        }
    }
    
    const handleDelete = async (id: number) => {
        fetch('/api/auth/tasks', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id}),
        })
    
        setTimeout(() => {
            const updatedTasks = tasks.filter(task => task.id!== id)
            setTasks(updatedTasks)
        }, 1000)
    }

    return {tasks, handleDelete, handleEdit, handleSubmit, handleShowModal, showModal, taskEdit, setTaskEdit, setShowModal}
}