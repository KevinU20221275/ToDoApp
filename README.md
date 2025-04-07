# To-Do App

## Overview
This is a simple yet powerful To-Do application built with **Next.js** and **TypeScript**. It features user authentication, CRUD operations for task management, and a responsive UI with **Tailwind CSS**. The app is deployed on **Vercel**, using **Neon** and **Turso** as database providers in a microservices architecture.

## Live Demo
[🔗 To-Do App Live](https://to-do-app-three-khaki.vercel.app/)

## What's New
- ✅ **Microservices architecture**:  
  - **Users** are stored in a **PostgreSQL** database hosted on **Neon**.  
  - **Tasks** are stored in a **SQLite** database hosted on **Turso**.  
  - Each service is organized inside the new `/services` directory.
- ✅ **Notification system**: Added `react-hot-toast` for better user feedback.
- ✅ **Refactored `useTask` Hook**: Now handles loading state, modal state, and task CRUD logic cleanly.

## Features
- ✅ **Next.js with TypeScript** for a robust development experience.
- ✅ **Custom Hooks** for handling tasks and modals.
- ✅ **NextAuth.js** for user authentication.
- ✅ **CRUD operations** (Create, Read, Update, Delete) for task management.
- ✅ **PostgreSQL** database hosted on Neon (users).
- ✅ **SQLite** database hosted on Turso (tasks).
- ✅ **Microservice databases**: Neon (users) & Turso (tasks).
- ✅ **Dark Mode / Light Mode** toggle.
- ✅ **Toast notifications** for better UX.
- ✅ **Deployed on Vercel** for seamless hosting.

## Technologies Used
- **Next.js** (App Router)
- **TypeScript**
- **PostgreSQL (Neon DB)**
- **SQLite (Turso)**
- **NextAuth.js**
- **Tailwind CSS**
- **React Hot Toast**

## Installation
To run this project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/KevinU20221275/ToDoApp.git
cd ToDoApp

# Install dependencies
npm install

# Create a .env.local file and add the required environment variables
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=your-neon-database-url
TURSO_DB_URL=your-turso-database-url
TURSO_AUTH_TOKEN=your-turso-auth-token

# Run the development server
npm run dev
```

### 🧩 API Architecture

The app follows a **microservice-style separation**:

- **User Service**  
  - Handles user registration and authentication using **NextAuth.js** and **PostgreSQL (Neon)**.
  - API route: `/api/auth/register`  
  - Managed via `services/users.ts`.

- **Task Service**  
  - Manages tasks with full **CRUD** functionality using **SQLite (Turso)**.
  - API route: `/api/auth/tasks`  
  - Managed via `services/tasks.ts`.

Each service is self-contained and communicates via RESTful endpoints. The API is consumed through custom hooks and service functions.

#### 📦 Routes Summary

| Method | Endpoint              | Description              |
|--------|------------------------|--------------------------|
| GET    | `/api/auth/tasks`     | Fetch all tasks          |
| POST   | `/api/auth/tasks`     | Create new task          |
| PUT    | `/api/auth/tasks`     | Update existing task     |
| DELETE | `/api/auth/tasks`     | Delete task by ID        |
| POST   | `/api/auth/register`  | Register a new user      |


## Services Layer
The app uses a service layer to abstract API calls for both users and tasks, making the logic reusable and easier to maintain.

# 📁 /services/users.ts
Handle user registration
```typescript
export async function registerUser(username: string, password: string) {
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })

    if (!res.ok) {
        throw new Error('Failed to register user')
    }

    return res.json()
}
```

# 📁 /services/tasks.ts
Handles task CRUD operations:
```typescript
import { Task } from "../lib/definitions";

export async function fetchTasks() {
    const res = await fetch('/api/auth/tasks')
    if (!res.ok) throw new Error('Failed to fetch tasks')
    return await res.json()
}

export async function addTask(taskForm: Task) {
    const res = await fetch('/api/auth/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskForm),
    })
    if (!res.ok) throw new Error('Failed to add task')
    return await res.json()
}

export async function updateTask(task: Task) {
    const res = await fetch('/api/auth/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    })
    if (!res.ok) throw new Error('Failed to save task')
    return await res.json()
}

export async function deleteTask(id: number) {
    const res = await fetch('/api/auth/tasks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
    })
    if (!res.ok) throw new Error('Failed to delete task')
    return await res.json()
}
```

## Custom Hook Example
The project uses a custom React Hook `useTask()` to handle API requests efficiently:

```typescript
import { useState, useEffect } from "react";
import { Task } from "../lib/definitions";
import { fetchTasks } from "../services/tasks";

export function useTask() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskEdit, setTaskEdit] = useState<Task | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchTasks()
            .then((data) => setTasks(data))
            .catch((error) => console.error('Error fetching tasks:', error))
            .finally(() => setLoading(false));
    }, []);

    // the rest of code...

    return {
        showModal,
        setShowModal,
        tasks,
        setTasks,
        taskEdit,
        setTaskEdit,
        loading,
    };
}
```

## Deployment
This project is deployed on **Vercel** and automatically updates with each push to the main branch. 
- **Neon** hosts the PostgreSQL database for users.
- **Turso** hosts the SQLite database for tasks.

## Contributing
Feel free to fork this project and submit pull requests with improvements!

## License
This project is open-source and available under the **MIT License**.
