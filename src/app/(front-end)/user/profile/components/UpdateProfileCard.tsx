'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/molecules";
import UpdateProfileForm from "./UpdateProfileForm"


export default function UpdateProfileCard() {

    return (

        <Card className="w-full mx-auto p-3 md:p-6">
            <CardHeader className=" flex flex-row gap-x-3 justify-start items-center md:px-12 px-0  ">

                <CardTitle>Update Profile User</CardTitle>
            </CardHeader>
            <CardContent className="md:px-12 px-0">
                <UpdateProfileForm />
            </CardContent>
        </Card>

    );
}


