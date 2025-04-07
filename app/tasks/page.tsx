'use client'

import { FormModal } from "../ui/tasks/ModalForm";
import { NavBar } from "../ui/Navbar";
import { useTask } from "../hooks/useTask";
import { TaskList } from "../ui/tasks/TaskList";


export default function TaskPage(){
    const {showModal, handleShowModal, tasks, taskEdit, handleSubmit, handleDelete, handleEdit, setTaskEdit, setShowModal, loading} = useTask()

    return (
        <>
            <NavBar></NavBar>
            <main className="min-h-96 bg-[#fcfcfc] max-w-xl min-w-96 p-2 rounded-md relative mx-auto mt-10 dark:bg-[#333] dark:text-[#ccc]">
                <h2 className="text-black text-2xl text-center dark:text-[#ccc] mb-4">TASKS</h2>
                <button className="bg-green-500 px-4 py-1 rounded-md absolute right-2 top-4 hover:bg-green-600 transition-all dark:bg-[#131] dark:hover:bg-[#121] text-2xl" onClick={handleShowModal} title="add new task">📋</button>
                <FormModal taskEdit={taskEdit} close={setShowModal} resetTaskEdit={setTaskEdit} addEditTask={handleSubmit} isOpen={showModal} ></FormModal>
                <TaskList tasks={tasks} loading={loading} handleEdit={handleEdit} handleDelete={handleDelete}  />
            </main>
        </>
    )
}

