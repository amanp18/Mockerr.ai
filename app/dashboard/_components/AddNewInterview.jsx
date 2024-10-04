'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAiModel'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'
import { useRouter } from 'next/navigation'

export const AddNewInterview = () => {

  const [JobRole, setJobRole] = useState()
  const [techstack, settechstack] = useState()
  const [experience, setexperience] = useState()
  const [loading, setloading] = useState(false)
  const [isactive, setisactive] = useState(false)
  const [JsonResponse, setJsonResponse] = useState([])
  const {user} = useUser()
const router = useRouter()

  const onSubmit = async (e) => {
    e.preventDefault()
    setloading(true)
    // setisactive(false)
    console.log(JobRole, techstack, experience)
    const InputForm = `Job position:${JobRole},Job Description:${techstack},Year of Experience:${experience},Depends on Job position, job description & year of experience give us 5 interview question along with answer in JSON format, Give us question and answer field on JSON. Prototype will be Array not an Object.`

    const result = await chatSession.sendMessage(InputForm);
    const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')
    // console.log(JSON.parse(MockJsonResp));
    setJsonResponse(MockJsonResp)

    if (MockJsonResp) {
      const resp = await db.insert(MockInterview).values(
        {
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: JobRole,
          jobDesc: techstack,
          jobExpe: experience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-yyyy')
        }
      ).returning({ mockId: MockInterview.mockId });
      console.log('id', resp)
      if (resp)
       {
         setisactive(false); 
        router.push('/dashboard/interview/'+resp[0]?.mockId)}
    }
    else {
      console.log('ERR')
    }
  }

  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary hover:scale-105  hover:shadow-md cursor-pointer transition-all' onClick={() => { setisactive(true) }}>
        <h2 className='font-bold text-lg text-center'>+ Add New</h2>
      </div>

      <Dialog open={isactive} className='bg-gray-400'>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle className='text-2xl text-gray-300'>Tell us more about Job you are interviewing</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2 className='text-gray-300'>Add Details about job position, Your skill and relevent experience.</h2>
                  <div className='mt-7 my-3 text-gray-300'>
                    <label>Job Role/Job Description</label>
                    <Input placeholder='Ex: Full stack developer' type='' required
                      onChange={(event) => { setJobRole(event.target.value) }} />
                  </div>

                  <div className='mt-2 my-3 text-gray-300'>
                    <label>Technologies(In Short)</label>
                    <Textarea placeholder='Ex: React, Angular, Node, Sql' required
                      onChange={(event) => { settechstack(event.target.value) }} />
                  </div>

                  <div className='mt-2 my-3 text-gray-300'>Year of experience
                    <Input placeholder='Ex: 1,3' type='number' max='50' required
                      onChange={(event) => { setexperience(event.target.value) }} />
                  </div>

                  <div className='flex gap-5 justify-between'> 
                  <Button type='button' variant='ghost' className='bg-secondary hover:bg-red-600' onClick={() => { setisactive(false) }}>Cancel</Button>
                  <Button type='submit' className=' hover:bg-green-800'>
                    {loading ? <>
                      <LoaderCircle className='animate-spin' />Generating from AI..
                    </> : 'Start Interview'}
                  </Button>
                  </div>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}
