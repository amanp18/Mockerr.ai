"use client"

import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'

import React, { useEffect, useState } from 'react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


const feedback = ({params}) => {

  const dummyData = [
  {
    "id": 2,
    "mockId": "fcc79fc2-6499-4210-b091-d53d80c1dd01",
    "question": "What are the key differences between React and Ang…ar, and when would you choose one over the other?",
    "correctAns": "React and Angular are both popular front-end frame…, and the team's familiarity with each framework.",
    "userAns": "i know everything",
    "feedback": "excellent",
    "rating": "5",
    "userEmail": "fakeop390@gmail.com",
    "createdAt": "05-10-2024"
  },
  {
    "id": 3,
    "mockId": "fcc79fc2-6499-4210-b091-d53d80c1dd01",
    "question": "Describe your experience with building RESTful APIs using Node.js and Express.js",
    "correctAns": "I have experience with creating RESTful APIs using…ience with testing and documenting API endpoints",
    "userAns": "i know everything",
    "feedback": "excellent",
    "rating": "6",
    "userEmail": "fakeop390@gmail.com",
    "createdAt": "05-10-2024"
  },
  {
    "id": 4,
    "mockId": "fcc79fc2-6499-4210-b091-d53d80c1dd01",
    "question": "How would you handle authentication and authorization in a MERN stack application?",
    "correctAns": "In a MERN stack application, authentication and au…ing or denying access based on their permissions",
    "userAns": "i know everything",
    "feedback": "good",
    "rating": "7",
    "userEmail": "fakeop390@gmail.com",
    "createdAt": "05-10-2024"
  },
  {
    "id": 5,
    "mockId": "fcc79fc2-6499-4210-b091-d53d80c1dd01",
    "question": "Explain your understanding of state management in … you would implement it in a complex application.",
    "correctAns": "State management in React involves handling data t…d ensure data consistency across the application",
    "userAns": "i know everything",
    "feedback": "good",
    "rating": "8",
    "userEmail": "fakeop390@gmail.com",
    "createdAt": "05-10-2024"
  },
  {
    "id": 6,
    "mockId": "fcc79fc2-6499-4210-b091-d53d80c1dd01",
    "question": "Walk me through the process of deploying a MERN stack application to production.",
    "correctAns": "Deploying a MERN stack application involves severa…Monitor the application's performance and health.",
    "userAns": "i know everything",
    "feedback": "good",
    "rating": "10",
    "userEmail": "fakeop390@gmail.com",
    "createdAt": "05-10-2024"
  }
];
  const [FeedbackList, setFeedbackList] = useState([]);
  const [overallrating, setoverallrating] = useState(0);
  const router = useRouter();

  let some_extra = {};

  useEffect(()=>{
    GetFeedback();
    
  },
  []

  );

  const GetFeedback=async()=>{
    const result = await db.select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockIdRef,params.interviewId))
    .orderBy(UserAnswer.id);

    setFeedbackList(result);
    overallRating(result);
  }

  const overallRating =(feedbacklist)=>{
    let rating = 0;
    feedbacklist.forEach(element => {
      rating = rating + (+element.rating)
    });

    setoverallrating(rating/5);
  }

  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-green-500'>Congratulations!!</h2>
      <h2 className='text-2xl font-bold text-white'>Here is your interview feedback</h2>
      
      {
        FeedbackList?.length == 0?
        <h2 className='font-bold text-xl text-white-500'>No Record found</h2>:
       <>
      
      <h2 className='text-red-500 text-lg my-3'> Your overall interveiw rating: {overallrating}/10 </h2>

      <h2 className='text-sm text-white'>Find below interview correct answer and your feedbak watever</h2> 

      {FeedbackList&&FeedbackList.map((item, index)=>(
        <Collapsible key={index} className='mt-7'>
          <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7'>
          {item.question} <ChevronsUpDown className='h-5 w-5'></ChevronsUpDown>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className='flex flex-col gap-2'>

              <h2 className='text-red-500 p-2 border rounded-lg'>
                <strong>Rating: </strong> {item.rating}
              </h2>

              <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'>
                <strong>Your Anser</strong>{item.userAns}
              </h2>
              <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'>
                <strong>Correct Answer</strong>{item.correctAns}
              </h2>
              <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'>
                <strong>Feedback</strong>{item.feedback}
              </h2>
            </div>
          </CollapsibleContent>
        </Collapsible>

      ))}
    </> 
    }

      
      
      <Button onClick={()=>router.replace('/dashboard')} >Go Home</Button>
  

    </div>
  )
}

export default feedback