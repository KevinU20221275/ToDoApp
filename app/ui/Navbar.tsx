'use client'

import { signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export function NavBar(){
    const [darkMode, setDarkMode] = useState<boolean>(false)
    
    useEffect(() => {
        const savedDarkMode = window.localStorage.getItem('darkMode')
        if (savedDarkMode === 'true'){
            toast('Hello Darkness!',
                {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
            setDarkMode(true)
            document.querySelector('body')?.classList.add('dark')
        } else {
            setDarkMode(false)
            document.querySelector('body')?.classList.remove('dark')
        }
    }, [])

    const toggleTheme = () => {
        const body = document.querySelector('body')
        body?.classList.toggle('dark')
        const newDarkMode = body?.classList.contains('dark') ? 'true' : 'false';
        if (newDarkMode === 'true'){
            toast('Hello Darkness!',
                {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
        window.localStorage.setItem('darkMode', newDarkMode)
        setDarkMode(!darkMode)
    }
    
    return (
        <header className="w-full fixed top-0 bg-white dark:bg-[#333] transition-all dark:text-[#ccc]">
            <nav className="max-w-3xl mx-auto p-3 flex justify-between items-center">
                <h1 className="text-2xl font-bold">To Do App</h1>
                <ul className="flex justify-center items-center gap-2">
                    <li>
                        <div onClick={toggleTheme} className={`w-12 h-6 rounded-2xl bg-[#eee] transition-all dark:bg-[#444] flex items-center p-1 cursor-pointer`} title="change theme"><span className="w-4 h-4 bg-white dark:bg-[#333] block rounded-full transition-all duration-500 dark:ml-6"></span></div>
                    </li>
                    <li>
                        <button className="bg-[#eee] transition-all dark:bg-[#222] hover:dark:bg-[#111] px-3 py-1 rounded-md" onClick={() => {
                            toast.promise(
                                signOut({callbackUrl: '/'}),
                                {
                                    loading: 'Signing out...',
                                    success: <b>Closed session!</b>,
                                    error: <b>The session could not be closed.</b>,
                                }
                            );    
                        }} title="sign out">Sign Out</button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}