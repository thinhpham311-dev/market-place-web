'use client'
//components
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/molecules";
import SignUpForm from "./SignUpForm";

export default function SignUpCard() {

    return (

        <Card className="lg:w-1/3 md:w-1/2 w-full mx-auto">
            <CardHeader className=" flex flex-row gap-x-3 justify-start items-center  md:px-12 px-0 ">

                <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent className="md:px-12 px-0">
                <SignUpForm />
            </CardContent>
        </Card>

    );
}


