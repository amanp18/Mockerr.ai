import React from 'react'
import { Lightbulb, Volume2 } from 'lucide-react'
import { Toaster, toast } from 'sonner';

const QuestionSection = ({MockIntQuestion,activestateques}) => {

  const textToSpeach=(text)=>{
    if('speechSynthesis' in window){
        const speech=new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech)
    }
    else{
        toast(<Volume2/>&&'Sorry, Your browser does not support text to speech')
    }
}

  return MockIntQuestion&&(
    <div className='p-5 border rounded-lg my-10'>
       <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {MockIntQuestion&&MockIntQuestion.map((question,index)=>(
                <h2 className={`p-2 border text-white rounded-full
                text-xs md:text-sm text-center cursor-pointer
                ${activestateques==index&&'bg-primary'}`} key={index}>Question #{index+1}</h2>
            ))}
        </div>
       <h2 className='my-5 text-md md:text-lg text-white'>{MockIntQuestion[activestateques]?.question}</h2>
       <Volume2 className='cursor-pointer text-white' onClick={()=>textToSpeach(MockIntQuestion[activestateques]?.question)} />

       <div className='border rounded-lg p-5 bg-blue-100 mt-20 '>
            <h2 className='flex gap-2 items-center text-primary'> 
                <Lightbulb/>
                <strong>Note:</strong>
            </h2>
            <h2 className='text-sm text-primary my-2'>Click on Record Answer when you want to answer the question.At the end of the interview we will give you the feedback along with correct answer for each of question and your answer to compare it.</h2>
        </div>
    </div>
  )
}

export default QuestionSection