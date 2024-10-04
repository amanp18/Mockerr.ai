'use client'
import { db } from '@/utils/db'
import { Button } from '@/components/ui/button'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import Webcam from 'react-webcam'
import React, { useEffect, useState } from 'react'

const Interview = ({ params }) => {
  const [interviewData, setinterviewData] = useState()
  const [webCamEnabled,setWebCamEnabled]=useState();
  useEffect(() => {
    console.log(params.interviewId)
    GetInterviewDetails();
  }, [])

  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId))
    setinterviewData(result[0]);
  }
  return (
    <div className='my-10 bg-gradient-to-r from-gray-900 via-gray-800 to-black'>
      <h2 className='font-bold text-2xl text-gray-300'>Let's Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='flex flex-col my-5 gap-5 '>
          <div className='flex flex-col p-5 rounded-lg border gap-5'>
            <h2 className='text-lg text-gray-300'><strong>Job Role/Job Position:</strong>{interviewData?.jobPosition} </h2>
            <h2 className='text-lg text-gray-300'><strong>Job Description/Tech Stack:</strong>{interviewData?.jobDesc} </h2>
            <h2 className='text-lg text-gray-300'><strong>Years of Experience:</strong>{interviewData?.jobExpe} </h2>
          </div>
          <div className='p-3 border rounded-lg border-yellow-300 bg-yellow-100'>
            <h2 className='flex gap-2 items-center text-yellow-500'> <Lightbulb /><strong>Information</strong></h2>
            <h2 className='mt-3 text-yellow-500'>Enable Video Web Cam and Microphone to Start your AI Generated Mock interview,It has 5 question which you can answer and at the last you will get the reports on the basis of your answer.NOTE: We never record your video, Web cam access you can dasable at any time if you want.</h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? <Webcam
            onUserMedia={() => setWebCamEnabled(true)}
            onUserMediaError={() => setWebCamEnabled(false)}
            mirrored={true}
            style={{
              height: 400,
              width: 300
            }}
          />
            :
            <>
              <WebcamIcon className='h-72 w-full my-4 p-20 bg-secondary rounded-lg border' />
              <Button variant="ghost" className="w-full" onClick={() => setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
            </>
          }
        </div>


      </div >
      <div className='flex justify-end items-end'>
        <Link href={'/dashboard/interview/' + params.interviewId + '/start'}>
          <Button >Start Interview</Button>
        </Link>
      </div>


    </div >
  )
}

export default Interview