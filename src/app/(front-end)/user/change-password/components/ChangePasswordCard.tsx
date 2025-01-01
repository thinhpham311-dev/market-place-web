'use client'
//components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/molecules";

//icons
import ChangePasswordForm from "./ChangePasswordForm";


export default function ChangePasswordCard() {

    return (

        <Card className="lg:w-1/3 md:w-1/2 w-full mx-auto">
            <CardHeader className=" flex flex-row gap-x-3 justify-start items-center md:px-12 px-0">
                <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="md:px-12 px-0">
                <ChangePasswordForm />
            </CardContent>
        </Card>

    );
}

