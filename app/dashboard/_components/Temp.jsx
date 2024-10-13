import React from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const TempComp = ({interveiw})=>{
    const router = useRouter();
    const onStart =()=>{
        router.push('/dashboard/interview/' + interveiw?.mockId + "/start");
    }

    const onFeedback=()=>{
        router.push("/dashboard/interview/"+ interveiw?.mockId + "/feedback")
    }

    return(
        <div className="border shadow-sm rounded-lg p-3">
            <h2 className="font-bold text-white">{interveiw?.jobPosition}</h2>
            <h2 className="text-sm  text-gray-600">{interveiw?.jobExpe} years of experience </h2>
            <h2 className="text-xs  text-gray-400">created at {interveiw.createdAt} </h2>

            <div className="flex justify-betwwen mt-2">
                <Button size="sm" variant="outline" className="w-full" onClick={onFeedback}>Feedback</Button>
                
                <Button size="sm" className="w-full" onClick={onStart}>Start</Button>
            </div>
        </div>
    )
}

export default TempComp;