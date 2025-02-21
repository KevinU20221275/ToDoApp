'use client'
import { FormModal } from "../ui/tasks/modalForm";
import { TaskCard } from "../ui/tasks/taskCard";
import { NavBar } from "../ui/navbar";
import { useTask } from "../hooks/useTask";


export default function TaskPage(){
    const {showModal, handleShowModal, tasks, taskEdit, handleSubmit, handleDelete, handleEdit, setTaskEdit, setShowModal} = useTask()

    return (
        <>
            <NavBar></NavBar>
            <main className="min-h-96 bg-[#fcfcfc] max-w-xl min-w-96 p-2 rounded-md relative mx-auto mt-10 dark:bg-[#333] dark:text-[#ccc]">
                <h2 className="text-black text-2xl text-center dark:text-[#ccc] mb-4">TASKS</h2>
                <button className="bg-green-300 px-4 py-1 rounded-md absolute right-2 top-4 hover:bg-green-500 transition-all dark:bg-[#131] dark:hover:bg-[#121] text-2xl" onClick={handleShowModal} title="add new task">📋</button>
                <FormModal taskEdit={taskEdit} close={setShowModal} resetTaskEdit={setTaskEdit} addEditTask={handleSubmit} isOpen={showModal} ></FormModal>
                <section className="flex flex-col gap-2 py-2">
                    {tasks.length > 0 ? tasks.map((task) => {
                        return (
                                <TaskCard key={task.id} task={task} handleEdit={handleEdit} handleDelete={handleDelete}></TaskCard>
                            ); 
                    }) : <p className="text-black">No tasks found</p>}
                </section>
            </main>
        </>
    )
}

