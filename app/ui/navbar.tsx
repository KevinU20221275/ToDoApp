'use client'
import { signOut } from "next-auth/react"
import { useEffect, useState } from "react"

export function NavBar(){
    const [darkMode, setDarkMode] = useState(window.localStorage.getItem('darkMode') || false)
    
    useEffect(() => {
        const body = document.querySelector('body')
        if (window.localStorage.getItem('darkMode') === 'true'){
            body?.classList.add('dark')
        }
        else {
            body?.classList.remove('dark')
        }
    }, [])

    const toggleTheme = () => {
        const body = document.querySelector('body')
        body?.classList.toggle('dark')
        window.localStorage.setItem('darkMode', body?.classList.contains('dark')? 'true' : 'false')
        setDarkMode(!darkMode)
    }
    
    return (
        <header className="w-full fixed top-0 bg-white dark:bg-[#333] transition-all dark:text-[#ccc]">
            <nav className="max-w-3xl mx-auto p-3 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Task Manager</h1>
                <ul className="flex justify-center items-center gap-2">
                    <li>
                        <div onClick={toggleTheme} className={`w-12 h-6 rounded-2xl bg-[#eee] transition-all dark:bg-[#444] flex items-center p-1 cursor-pointer`} title="change theme"><span className="w-4 h-4 bg-white dark:bg-[#333] block rounded-full transition-all duration-500 dark:ml-6"></span></div>
                    </li>
                    <li>
                        <button className="bg-[#eee] transition-all dark:bg-[#222] hover:dark:bg-[#111] px-3 py-1 rounded-md" onClick={() => signOut()} title="sign out">Sign Out</button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}