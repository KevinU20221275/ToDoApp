import { useEffect, useState } from "react"
import { Task } from "../lib/definitions"
import { addTask, deleteTask, fetchTasks, updateTask } from "../services/tasks"
import toast from "react-hot-toast"

export function useTask(){
    const [showModal, setShowModal] = useState<boolean>(false)
    const [tasks, setTasks] = useState<Task[]>([])
    const [taskEdit, setTaskEdit] = useState<Task | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    
    useEffect(() => {
        fetchTasks()
            .then((data) => setTasks(data))
            .catch((error) => console.error('Error fetching tasks:', error))
            .finally(() => setLoading(false))
    }, [])

    const handleShowModal = () => {
        setShowModal(true)
    }
    
    const handleSubmit = async (taskForm: Task) => {

        setTaskEdit(null)
    
        if (taskForm.Id !== 0){
            await updateTask(taskForm)
            
            toast.success('Task updated Successfully!')

            const updatedTasks= tasks.map(task => task.Id === taskForm.Id ? taskForm : task)
            setTasks(updatedTasks)
        }
        else {
            const data = await addTask(taskForm)
            
            toast.success('Task added Successfully!')

            const updatedTasks = [...tasks, data]
            setTasks(updatedTasks)
        }
    }
    
    const handleEdit = (id: number) => {
        const task = tasks.find(task => task.Id === id)
        
        if (task) {
            setTaskEdit(task)
            setShowModal(true)
        }
    }
    
    const handleDelete = async (id: number) => {
        await deleteTask(id)
        
        toast.success('Task deleted Successfully!')
    
        setTimeout(() => {
            const updatedTasks = tasks.filter(task => task.Id!== id)
            setTasks(updatedTasks)
        }, 1000)
    }

    return {tasks, handleDelete, handleEdit, handleSubmit, handleShowModal, showModal, taskEdit, setTaskEdit, setShowModal, loading}
}