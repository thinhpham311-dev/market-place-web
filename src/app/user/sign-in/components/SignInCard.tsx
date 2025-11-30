'use client'

//ui
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

//components
import SignInForm from "./SignInForm"

export default function SignInCard() {

    return (

        <Card className="lg:w-1/3 md:w-1/2 w-full mx-auto p-3 md:p-6">
            <CardHeader className=" flex flex-row gap-x-3 justify-start items-center md:px-12 px-0">
                <CardTitle>Sign In</CardTitle>
            </CardHeader>
            <CardContent className="md:px-12 px-0">
                <SignInForm />
            </CardContent>
        </Card>

    );
}


