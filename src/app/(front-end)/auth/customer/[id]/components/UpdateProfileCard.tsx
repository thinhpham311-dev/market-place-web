'use client'
import { useRouter } from "next/navigation";

//components
import { Button } from "@/components/ui/atoms";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/molecules";
import UpdateProfileForm from "./UpdateProfileForm"

//icons
import { ArrowLeft } from "lucide-react"

export default function UpdateProfileCard() {
    const router = useRouter()

    return (
        <div className=" container  md:p-6 p-3">
            <Card className="lg:w-1/3 md:w-1/2 w-full mx-auto">
                <CardHeader className=" flex flex-row gap-x-3 justify-start items-center md:p-6 p-3  ">
                    <Button variant="outline" size="icon" onClick={() => router.back()}><ArrowLeft /></Button>
                    <CardTitle>Update Profile User</CardTitle>
                </CardHeader>
                <CardContent>
                    <UpdateProfileForm />
                </CardContent>
            </Card>
        </div>
    );
}


