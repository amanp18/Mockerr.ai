"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
  const path=usePathname();
  const {user,isSignedIn,isLoaded} = useUser()

  return (
    <div className=' flex p-4 items-center drop-shadow-lg justify-between border-black bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white shadow-lg'>
    <a href="/"><h1 className=" hover:text-orange-600 text-2xl font-bold">Mockify.ai</h1></a>
    <ul className='hidden md:flex gap-8'>
        <li className={` hover:text-orange-600 hover:font-bold transition-all cursor-pointer ${path=='/dashboard'&& 'text-primary font-bold'}`}>Dashboard</li>
        <li className={` hover:text-orange-600 hover:font-bold transition-all cursor-pointer ${path=='/dashboard/questions'&& 'text-primary font-bold'}`}>Questions</li>
        <li className={` hover:text-orange-600 hover:font-bold transition-all cursor-pointer ${path=='/dashboard/upgrade'&& 'text-primary font-bold'}`}>Upgrade</li>
        <li className={` hover:text-orange-600   hover:font-bold transition-all cursor-pointer ${path=='/dashboard/how'&& 'text-primary font-bold'}`}>How it works?</li>
    </ul>
    {isSignedIn? <UserButton className='mr-14' /> :
       <a href='/sign-in'><Button className=' px-6 py-3 text-lg rounded-lg bg-primary hover:text-orange-600 ho'>Login</Button></a>
    } 
    
    </div>
  )
}

export default Header