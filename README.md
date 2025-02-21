# To-Do App

## Overview
This is a simple yet powerful To-Do application built with **Next.js** and **TypeScript**. It features user authentication, CRUD operations for task management, and a responsive UI with **Tailwind CSS**. The app is deployed on **Vercel** and uses **Neon** as the database provider.

## Live Demo
[🔗 To-Do App Live](https://to-do-app-three-khaki.vercel.app/)

## Features
- ✅ **Next.js with TypeScript** for a robust development experience.
- ✅ **Custom Hooks** for form handling and API requests.
- ✅ **NextAuth.js** for user authentication.
- ✅ **CRUD operations** (Create, Read, Update, Delete) for task management.
- ✅ **PostgreSQL database** hosted on **Neon**.
- ✅ **Dark Mode / Light Mode** toggle.
- ✅ **Deployed on Vercel** for seamless hosting.

## Technologies Used
- **Next.js** (App Router)
- **TypeScript**
- **PostgreSQL (Neon DB)**
- **NextAuth.js**
- **Tailwind CSS**

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

# Run the development server
npm run dev
```

## API Endpoints
The project includes custom API routes to handle tasks:

- `GET /api/auth/tasks` → Fetch all tasks.
- `POST /api/auth/tasks` → Create a new task.
- `PUT /api/auth/tasks` → Update an existing task.
- `DELETE /api/auth/tasks` → Delete a task.

## Custom Hook Example
The project uses a custom React Hook `useTask()` to handle API requests efficiently:

```typescript
import { useEffect, useState } from "react";
import { Task } from "../lib/definitions";

export function useTask() {
    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        const getTasks = async () => {
            const res = await fetch('/api/auth/tasks');
            const tasks = await res.json();
            setTasks(tasks);
        };
        getTasks();
    }, []);

    return { tasks };
}
```

## Deployment
This project is deployed on **Vercel** and automatically updates with each push to the main branch. The database is hosted on **Neon**, ensuring high availability.

## Contributing
Feel free to fork this project and submit pull requests with improvements!

## License
This project is open-source and available under the **MIT License**.

