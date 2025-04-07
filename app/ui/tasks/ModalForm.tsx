'use client'

import { ModalFormProps } from "@/app/lib/definitions"
import { useTaskForm } from "@/app/hooks/useTaskform"
import { useEffect, useRef } from "react"


export function FormModal({taskEdit, close, resetTaskEdit, addEditTask, isOpen}: ModalFormProps){
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const {task, resetTaskState, handleInput, handleSelect, errors, sendTask} = useTaskForm(taskEdit)

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [isOpen])

    const handleCloseModal = () => {
        resetTaskState()
        resetTaskEdit(null)
        close(false)
    }

    const handleSubmit = () => {
        const taskData = sendTask()
        if (!taskData) return
        handleCloseModal()
        addEditTask(taskData)
    }

    return (
        <dialog ref={dialogRef} className="bg-[#fcfcfc] text-black dark:bg-[#2c2c2c] h-80 w-96 rounded-md p-4 dark:text-white">
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
                }} className="flex flex-col gap-2">
                <fieldset>
                    <label htmlFor="description" className="block my-2">Description</label>
                    <textarea onChange={(e) => handleInput(e)}  id="description" name="description" className="bg-[#eee] transition-all dark:bg-[#777] outline-[#444] w-full p-2 resize-none rounded-md" value={task?.Description} required />
                    {errors.description && <p className="text-red-500">{errors.description}</p>}
                </fieldset>
                <fieldset>
                    <label htmlFor="done">Select Status</label>
                    <select onChange={handleSelect} name="done" id="done" value={task.Done ? 'true' : 'false'} 
                        className="bg-[#eee] transition-all dark:bg-[#777] w-full p-2 rounded-md" required>
                        <option value="false">Not Done</option>
                        <option value="true">Done</option>
                    </select>
                </fieldset>
                <button type="submit" className={`${taskEdit ? 'bg-[#bbb] hover:bg-[#aaa]' : 'bg-green-400 hover:bg-green-500 dark:bg-[#131] dark:text-[#ccc] dark:hover:bg-[#121]'} transition-all py-2 rounded-md mt-3 text-black`}>{taskEdit ? 'Edit Task': 'Add Task'}</button>
            </form>
            <button onClick={handleCloseModal} className="absolute top-1 right-3">❌</button>
        </dialog>
    )
}