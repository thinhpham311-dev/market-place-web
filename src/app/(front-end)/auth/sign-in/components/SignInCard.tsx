'use client'
//components
import { Button } from "@/components/ui/atoms"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/molecules";
import SignInForm from "./SignInForm"
import { useRouter } from "next/navigation";

//icons
import { ArrowLeft } from "lucide-react"

export default function Page() {
    const router = useRouter()

    return (
        <div className=" container md:p-6 p-3 ">
            <Card className="lg:w-1/3 md:w-1/2 w-full mx-auto">
                <CardHeader className=" flex flex-row gap-x-3 justify-start items-center md:p-6 p-3  ">
                    <Button variant="outline" size="icon" onClick={() => router.back()}><ArrowLeft /></Button>
                    <CardTitle>Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                    <SignInForm />
                </CardContent>
            </Card>
        </div>
    );
}


