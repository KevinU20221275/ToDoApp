'use client'

import {useForm} from 'react-hook-form'
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { Loading } from './ui/Loading'
import toast from 'react-hot-toast'

export default function Home() {
  const {register, handleSubmit, formState: {errors}} = useForm()
  const [resErrors, setResErrors] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    const res = await signIn('credentials',{
      username: data.username,
      password: data.password,
      redirect: false
    })

    if (res?.error){
      toast.error('Username or password incorrect')
      setResErrors('Username or password incorrect')
      setIsLoading(false)
    } else {
      toast.success('Login successfully, redirecting...')
      setIsLoading(false)
      router.push('/tasks')
      router.refresh()
    }
  })



  return (
    <main>
      <section className="bg-[#fcfcfc] max-w-2xl min-h-96 min-w-96 rounded-md p-4 text-black flex flex-col items-center gap-4">
        <form onSubmit={onSubmit} className='flex flex-col gap-4'>
          <fieldset>
            <label htmlFor="username">User Name:</label>

            <input type="text" id="username" {...(register('username',{
              required: "This field is required",
              minLength: {
                value: 6,
                message: "This field must be at least 6 characters"
              }
            }))} className='w-full bg-[#ddd] py-3 px-2 rounded-md outline-[#ccc]' placeholder='juanito20' />
            {
              errors.username && <p className="text-red-500">{errors.username.message?.toString()}</p>
            }
          </fieldset>
          <fieldset>
            <label htmlFor="">Password</label>
            <input type="password" id="password" {...(register('password',{
              required: "This field is required",
              minLength: {
                value: 6,
                message: "This field must be at least 6 characters"
              }
            }))} className='w-full bg-[#ddd] py-3 px-2 rounded-md outline-[#ccc]' placeholder='*******' />
            {
              errors.password && <p className="text-red-500">{errors.password.message?.toString()}</p>
            }
          </fieldset>
          {isLoading ? <Loading/> : <button className='bg-[#ccc] hover:bg-[#aaa] py-4 rounded-md mt-2'>Login</button>}
        </form>
        <p className='text-red-500'>{resErrors}</p>
        <Link href={'/register'} className='text-[#777] hover:underline'>You dont have acount?</Link>
      </section>
    </main>
  )
}
