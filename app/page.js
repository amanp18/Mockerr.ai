import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ButtonIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function Home() {
  return (
  <div>
     <h1>kjedcen</h1>
    <a href="/dashboard"> 
    <Button>click me</Button>
    </a>
     <UserButton />
  </div>
  ); 
}
