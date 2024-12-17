'use client'

//components
import { FormGroup, FormInput, FormSelect } from "@/components/ui/organisms"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/molecules";
import { Button } from "@/components/ui/atoms";

import { z } from "zod";
// Form schema for validation
const FormSchema = z.object({
    fullname: z.string().min(2, { message: "Username must be at least 2 characters." }),
    email: z.string().min(2, { message: "Username must be at least 2 characters." }),
    phone: z.string().min(2, { message: "Username must be at least 2 characters." }),
    password: z.string().min(10, "Please enter min 10 character ").max(25, "Pleasw enter max 25 character"),
    repassword: z.string().min(10, "Please enter min 10 character ").max(25, "Pleasw enter max 25 character"),
    gender: z.string(),
    address: z.string().min(2, { message: "Username must be at least 2 characters." }),
});

const defaultValuesForSignUpForm = {
    fullname: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    password: "",
    repassword: "",
}
export default function Page() {
    function onSubmit(values: z.infer<typeof FormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <div className=" container  md:p-6 p-3">
            <Card className="lg:w-1/3 md:w-1/2 w-full mx-auto">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormGroup defaultValues={defaultValuesForSignUpForm} onHandleSubmit={onSubmit} className="space-y-5" formSchema={FormSchema}>
                        <FormInput name="fullname" label="FullName" placeholder="Please enter your fullname" formSchema={FormSchema} />
                        <FormInput name="email" label="Email" placeholder="Please enter your email" formSchema={FormSchema} />
                        <FormInput name="phone" label="Phone Number" placeholder="Please enter your phone number" formSchema={FormSchema} />
                        <FormInput name="password" label="Password" inputType="password" placeholder="Please enter your password" formSchema={FormSchema} />
                        <FormInput name="repassword" label="Re Password" inputType="password" placeholder="Please enter your repassword" formSchema={FormSchema} />
                        <FormSelect name="gender" options={[{ name: "male", value: "male" }, { name: "female", value: "female" }]} label="Choose gender" placeholder="Please choose your gender" formSchema={FormSchema} />
                        <FormInput name="address" label="Address" placeholder="Please enter your address" formSchema={FormSchema} />
                        <Button type="submit" className="w-full" variant="outline">Submit</Button>
                    </FormGroup>
                </CardContent>
            </Card>
        </div>
    );
}


