'use client'
//components
import { Button } from "@/components/ui/atoms";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/molecules";
import { FormInput, FormGroup } from "@/components/ui/organisms";
import { useRouter } from "next/navigation";

//validations
import { z } from "zod";

//icons
import { ArrowLeft } from "lucide-react"

const FormSchema = z.object({
    password: z.string().nonempty("Password is required")
        .min(10, "Please enter at least 10 characters")
        .max(25, "Please enter no more than 25 characters"),
    newPassword: z.string().nonempty("New Password is required")
        .min(10, "Please enter at least 10 characters")
        .max(25, "Please enter no more than 25 characters"),
    confirmNewPassword: z.string().nonempty("New Password Confirmed Confirm is required")
        .min(10, "Please enter at least 10 characters")
        .max(25, "Please enter no more than 25 characters"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"], // Points to the field with the error
    message: "New Passwords must match",
});;

const defaultValuesForChangePasswordForm = {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
};
export default function Page() {
    const router = useRouter()
    const onSubmit = (values: z.infer<typeof FormSchema>) => {
        console.log(values);
    };
    return (
        <div className=" container  md:p-6 p-3">
            <Card className="lg:w-1/3 md:w-1/2 w-full mx-auto">
                <CardHeader className=" flex flex-row gap-x-3 justify-start items-center md:p-6 p-3  ">
                    <Button variant="outline" size="icon" onClick={() => router.back()}><ArrowLeft /></Button>
                    <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormGroup
                        defaultValues={defaultValuesForChangePasswordForm}
                        onHandleSubmit={onSubmit}
                        className="space-y-5"
                        formSchema={FormSchema}
                    >
                        <FormInput
                            inputType="password"
                            name="password"
                            label="Password"
                            placeholder="Please enter password"
                            formSchema={FormSchema}
                        />
                        <FormInput
                            inputType="password"
                            name="newPassword"
                            label="New Password"
                            placeholder="Please enter new password"
                            formSchema={FormSchema}
                        />
                        <FormInput
                            inputType="password"
                            name="confirmNewPassword"
                            label="Confirm New Password"
                            placeholder="Please enter New Password Confirm"
                            formSchema={FormSchema}
                        />
                        <Button className="w-full" type="submit" variant="outline">Submit</Button>
                    </FormGroup>
                </CardContent>
            </Card>
        </div>
    );
}


