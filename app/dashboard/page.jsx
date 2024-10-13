import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { AddNewInterview } from './_components/AddNewInterview'
import InterviewList from './_components/InterveiwList'

const Dashboard = () => {
  return (
    <div className='p-10 max-h-full max-w-full bg-gradient-to-r from-gray-900 via-gray-800 to-black'>
      <h2 className='text-gray-100 font-bold text-2xl'>Dashboard</h2>
      <h2 className='text-gray-200'>Create and Start your AI Mockup Interview</h2>
    
    <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
      <AddNewInterview />
    </div>

    {/* { previous question } */}

    <InterviewList></InterviewList>

    </div>
  )
}

export default Dashboard