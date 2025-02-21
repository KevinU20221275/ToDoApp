'use client'
import {useForm} from 'react-hook-form'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {

    if(data.password !== data.confirmPassword){
      return alert("Passwords do not match")
    }
     const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password
      })
    })
    
    if(res.ok){
      router.push('/')
    }
  })
  return (
    <>
      <main>
        <section className="bg-[#fcfcfc] max-w-2xl min-h-96 min-w-96 rounded-md p-4 text-black flex flex-col items-center gap-4">
          <form onSubmit={onSubmit} className='flex flex-col gap-4'>
            <h2 className='text-2xl text-center'>Register</h2>
            <fieldset>
              <label htmlFor="username">User Name</label>
              <input type="text" id="username" {...(register('username', {
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
              <input type="password" id="password" {...(register('password', {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "This field must be at least 6 characters"
                }
              }))} className='w-full bg-[#ddd] py-3 px-2 rounded-md outline-[#ccc]' placeholder='******' />
            </fieldset>
            <fieldset>
              <label htmlFor="">Confirm Password</label>
              <input type="password" id="confirmPassword" {...(register('confirmPassword', {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "This field must be at least 6 characters"
                }
              }))} className='w-full bg-[#ddd] py-3 px-2 rounded-md outline-[#ccc]' placeholder='******' />
            </fieldset>
            <button className='bg-[#ccc] hover:bg-[#aaa] py-4 rounded-md mt-2'>Login</button>
          </form>
          <Link href={'/'} className='text-[#777] hover:underline'>You alredy have acount</Link>
        </section>
      </main>
    </>
  );
}