import React from 'react'
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from 'react-router';

function NotFound() {
    const navigate = useNavigate()
    const navegacao = () => {
        navigate('/privateRoute/home')
    }
  return (
    <section className='h-screen bg-black text-white flex flex-col items-center justify-center gap-3'>

        <h1 className='uppercase text-4xl'>page is <span className='text-red-400'>not</span> Found</h1>
        <h2 className='font-mono text-3xl'><span className='uppercase'>error:</span> 4<span className='text-red-400'>0</span>4</h2>

        <div className='flex gap-2 items-center justify-center hover:underline hover:underline-offset-8 cursor-pointer' onClick={navegacao}>
            <GoArrowLeft className='text-3xl'/> <h2 className='text-3xl'>Voltar</h2>
        </div>
    </section>
  )
}

export default NotFound
