"use client"
import React from 'react'
import { useEffect,useState } from 'react';
import QuestionSection from './_components/QuestionSection';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Button } from '@/components/ui/button';
import RecordAnswerSection from './_components/RecordAnswerSection';
import Link from 'next/link';

const StartInterview = ({params}) => {
  const [interviewData, setinterviewData] = useState()
  const [MockIntQuestion, setMockIntQuestion] = useState()
  const [activestateques, setactivestateques] = useState(0)

  useEffect(() => {
    GetInterviewDetails();
  }, [])

  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId))
       console.log("result",result)
      const jsonMockResp= JSON.parse(result[0].jsonMockResp)
console.log("resp",jsonMockResp)
setMockIntQuestion(jsonMockResp)
    setinterviewData(result[0]);
  }
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <QuestionSection 
        MockIntQuestion={MockIntQuestion}
        activestateques={activestateques}
        />
        <RecordAnswerSection
             MockIntQuestion={MockIntQuestion}
             activestateques={activestateques}
             interviewData={interviewData}
            />
      </div>

      <div className='flex justify-end gap-6'>
          {activestateques>0&&  
          <Button onClick={()=>setactivestateques(activestateques-1)}>Previous Question</Button>}
          {activestateques!=MockIntQuestion?.length-1&& 
           <Button onClick={()=>setactivestateques(activestateques+1)}>Next Question</Button>}
          {activestateques==MockIntQuestion?.length-1&&  
          <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
          <Button >End Interview</Button>
          </Link>}


        </div>

    </div>
  )
} 

export default StartInterview