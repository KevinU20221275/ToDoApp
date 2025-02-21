import { useEffect, useState } from "react";
import { Task } from "../lib/definitions";

export function useTaskForm(taskEdit : Task | null){
    const [task, setTask ] = useState<Task>({
        id: 0,
        description: '',
        done: false,
        userId: 0,
    })

    const [errors, setErrors] = useState({
        description: '',
    })

    useEffect(() => {
        if (taskEdit){
            setTask(taskEdit)
        } 
    }, [taskEdit])

    const resetTaskState = () => {
        setTask({
            id: 0,
            description: '',
            done: false,
            userId: 0,
        })
    }

    const sendTask = () => {
        const taskData = task
        if (!task.description) {
            setErrors({...errors, description: 'Description is required'})
            return
        }
        setErrors({ description: ''})
        resetTaskState()
        return taskData
    }
    
    const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const target = event.target as HTMLInputElement
        const value = target.value.toString()
    
        const taskToEdit : Task = {
            id: Number(task?.id),
            description: value,
            done: task.done,
            userId: Number(task?.userId),
        }
            
        if (taskToEdit){
            setTask(taskToEdit)
        }
    }

    const handleSelect = (event: React.FormEvent<HTMLSelectElement>) => {
        const target = event.target as HTMLInputElement
        const value = target.value
          
        const taskToEdit : Task = {
            id: Number(task?.id),
            description: task?.description,
            done: value === 'false' ? false : true,
            userId: Number(task?.userId),
        }
        
        if (taskToEdit){
            setTask(taskToEdit)
        }
    }

    return { resetTaskState, task, errors, sendTask, handleInput, handleSelect, setTask}
}