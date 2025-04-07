'use client'

import { TaskCard } from "./TaskCard";
import { TaskCardSkeletonList } from "../skeletons/TaskCardSkeleton";
import { TaskListProps } from "@/app/lib/definitions";


export function TaskList({tasks, handleEdit, handleDelete, loading} : TaskListProps) {
    return (
        <>
            {
                loading 
                ? <TaskCardSkeletonList/>
                : 
                <section className="flex flex-col gap-2 py-2">
                    {tasks.length > 0 ? tasks.map((task) => {
                        return (
                            <TaskCard key={task.Id} task={task} handleEdit={handleEdit} handleDelete={handleDelete}></TaskCard>
                        ); 
                    }) : <p className="text-black dark:text-zinc-400">You don&apos;t have tasks</p>}
                </section>
            }
        </>
    )
}