export interface Task {
    id: number;
    description: string;
    done: boolean;
    userId: number;
}


export interface ModalFormProps{
    taskEdit : Task | null
    close : (value:boolean) => void
    resetTaskEdit: (value: null) => void
    addEditTask: (task: Task) => void
    isOpen: boolean
}

export interface taskCardProps {
    task: Task
    handleEdit: (id: number) => void 
    handleDelete: (id: number) => void
}



export interface User {
    id : number
    username : string
    password : string
}