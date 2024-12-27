'use client'
import { useRouter } from "next/navigation";

//components
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/molecules";
import { Button } from "@/components/ui/atoms";
import SignUpForm from "./SignUpForm";

//icons
import { ArrowLeft } from "lucide-react"

export default function SignUpCard() {
    const router = useRouter()

    return (

        <Card className="lg:w-1/3 md:w-1/2 w-full mx-auto">
            <CardHeader className=" flex flex-row gap-x-3 justify-start items-center md:p-6 p-3  ">
                <Button variant="outline" size="icon" onClick={() => router.back()}><ArrowLeft /></Button>
                <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
                <SignUpForm />
            </CardContent>
        </Card>

    );
}


