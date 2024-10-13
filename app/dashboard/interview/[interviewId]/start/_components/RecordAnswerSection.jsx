'use client'
import React, { useEffect,useState } from 'react'
import Image from 'next/image'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { Toaster, toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAiModel'
import moment from 'moment'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { Mic,StopCircle } from 'lucide-react'


const RecordAnswerSection = ({MockIntQuestion,activestateques,interviewData}) => {
  const [userAnswer,setUserAnswer]=useState('');
    const {user}=useUser()
    const [loading,setLoading]=useState(false);

    const {
      error,
      interimResult,
      isRecording,
      results,
      startSpeechToText,
      stopSpeechToText,
      setResults
 
    } = useSpeechToText({
      continuous:false,
      useLegacyResults: false
    });

    useEffect(()=>{
      results?.map((result)=>(setUserAnswer(prevAns=>prevAns+result?.transcript)
      ))
    },[results])

    useEffect(()=>{
      if(!isRecording&&userAnswer?.length>10)
      {
        UpdateUserAnswer();
      } 
    },[userAnswer])

    const StartStopRecording=async()=>{
      console.log("ja")
      if(isRecording)
      {
        stopSpeechToText()
       
      }
      else{
        startSpeechToText();
        
      }
    }

    const UpdateUserAnswer=async()=>{

      console.log(userAnswer)
      setLoading(true)
      const feedbackPrompt="Question:"+MockIntQuestion[activestateques]?.question+
      ", User Answer:"+userAnswer+",Depends on question and user answer for give interview question "+
      " please give us rating for answer and feedback as area of improvmenet if any "+
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

      const result=await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');
      const JsonFeedbackResp=JSON.parse(mockJsonResp);
      const resp=await db.insert(UserAnswer)
      .values({
        mockIdRef:interviewData?.mockId,
        question:MockIntQuestion[activestateques]?.question,
        correctAns:MockIntQuestion[activestateques]?.answer,
        userAns:userAnswer,
        feedback:JsonFeedbackResp?.feedback,
        rating:JsonFeedbackResp?.rating,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-yyyy')
      })

if(resp){
  toast('User Answer recorded successfully')
  setUserAnswer('')
  setResults([])
}
setResults([])
setLoading(false);
    }

  return (
    <div>
           <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
            <Image src={'/webcam.png'} width={200} height={200} 
            className='absolute'/>
            <Webcam
            mirrored={true}
            style={{
                height:300,
                width:'100%',
                zIndex:10,
            }}
            />
        </div>
        <Button 
        disabled={loading}
        variant="outline" className="my-10 text-white"
        onClick={StartStopRecording}
        >
            {isRecording?
            <h2 className='text-white bg-red-600 border rounded-sm animate-pulse flex gap-2 items-center'>
                <StopCircle/>Stop Recording
            </h2>
            :
            
            <h2 className='text-white bg-primary border h-4 rounded-sm flex gap-2 items-center'>
              <Mic/>  Record Answer</h2> }
              </Button> 
    </div>
  )
}

export default RecordAnswerSection