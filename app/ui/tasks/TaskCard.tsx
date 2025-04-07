'use client'

import { useState } from "react";
import { taskCardProps } from "@/app/lib/definitions";

export function TaskCard({task, handleEdit, handleDelete} : taskCardProps){
    const [fade, setFade] = useState<string>('fade-in')
    const removeTaskCard = () => {
        handleDelete(task.Id)
        setFade('fade-out')
    }

    return (
        <div className={`${fade} transition-all ${task.Done ? 'bg-green-500 dark:bg-[#121]' : 'bg-[#ddd] dark:bg-[#444]'} w-full min-h-8 flex justify-between gap-2 items-center rounded-md p-2`}>
            <div>
                <p>{task.Description}</p>
            </div>

            <div className="flex gap-2">
                <button onClick={() => handleEdit(task.Id)} className="px-4 py-2 bg-[#bbb]  hover:bg-[#aaa] transition-all dark:bg-[#222] dark:hover:bg-[#111] rounded-md" title="edit task">✏️</button>
                
                <button onClick={removeTaskCard} className="px-4 py-2 bg-red-500 hover:bg-red-600 transition-all dark:bg-[#211] dark:hover:bg-[#411] rounded-md" title="delete task">🗑️</button>
            </div>
        </div>
    );
}