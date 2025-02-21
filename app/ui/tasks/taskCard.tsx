import { Task } from "@/app/lib/definitions";
import { useState } from "react";

interface taskCardProps {
    task: Task
    handleEdit: (id: number) => void 
    handleDelete: (id: number) => void
}

export function TaskCard({task, handleEdit, handleDelete} : taskCardProps){
    const [fade, setFade] = useState<string>('fade-in')
    const removeTaskCard = () => {
        handleDelete(task.id)
        setFade('fade-out')
    }

    return (
        <div className={`${fade} transition-all ${task.done ? 'bg-green-400 dark:bg-[#121]' : 'bg-[#eee] dark:bg-[#444]'} w-full min-h-8 flex justify-between gap-2 items-center rounded-md p-2`}>
            <div>
                <p>{task.description}</p>
            </div>

            <div className="flex gap-2">
                <button onClick={() => handleEdit(task.id)} className="px-4 py-2 bg-[#ccc]  hover:bg-[#aaa] transition-all dark:bg-[#222] dark:hover:bg-[#111] rounded-md" title="edit task">✏️</button>
                
                <button onClick={removeTaskCard} className="px-4 py-2 bg-red-400 hover:bg-red-500 transition-all dark:bg-[#211] dark:hover:bg-[#411] rounded-md" title="delete task">🗑️</button>
            </div>
        </div>
    );
}