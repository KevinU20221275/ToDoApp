import { useEffect, useState } from "react";
import { Task } from "../lib/definitions";

export function useTaskForm(taskEdit : Task | null){
    const [task, setTask ] = useState<Task>({
        Id: 0,
        Description: '',
        Done: 0,
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
            Id: 0,
            Description: '',
            Done: 0,
            userId: 0,
        })
    }

    const sendTask = () => {
        const taskData = task
        if (!task.Description) {
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
            Id: Number(task?.Id),
            Description: value,
            Done: task.Done,
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
            Id: Number(task?.Id),
            Description: task?.Description,
            Done: value === 'false' ? 0 : 1,
            userId: Number(task?.userId),
        }
        
        if (taskToEdit){
            setTask(taskToEdit)
        }
    }

    return { resetTaskState, task, errors, sendTask, handleInput, handleSelect, setTask}
}