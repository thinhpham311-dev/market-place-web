"use client"

//components
import { FormGroup, FormInput, FormSelect } from "@/components/ui/organisms"
import { Card, CardHeader, CardContent, CardTitle } from "../../molecules";
import { Button } from "@/components/ui/atoms";

import { z } from "zod";
// Form schema for validation
const FormSchema = z.object({
    fullname: z.string().min(2, { message: "Username must be at least 2 characters." }),
    email: z.string().min(2, { message: "Username must be at least 2 characters." }),
    phone: z.string().min(2, { message: "Username must be at least 2 characters." }),
    gender: z.string(),
    address: z.string().min(2, { message: "Username must be at least 2 characters." }),
});

const defaultValuesForSignUpForm = {
    fullname: "",
    email: "",
    phone: "",
    gender: "",
    address: ""
}

export default function SignUpForm() {
    function onSubmit(values: z.infer<typeof FormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <Card >
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
                <FormGroup defaultValues={defaultValuesForSignUpForm} onHandleSubmit={onSubmit} className="space-y-5" formSchema={FormSchema}>
                    <FormInput name="fullname" label="FullName" placeholder="Please enter fullname" formSchema={FormSchema} />
                    <FormInput name="email" label="Email" placeholder="Please enter email" formSchema={FormSchema} />
                    <FormInput name="phone" label="Phone Number" placeholder="Please enter phone number" formSchema={FormSchema} />
                    <FormSelect name="gender" options={[{ name: "male", value: "male" }, { name: "female", value: "female" }]} label="Choose gender" placeholder="Please choose gender" formSchema={FormSchema} />
                    <FormInput name="address" label="Address" placeholder="Please enter address" formSchema={FormSchema} />
                    <Button type="submit" className="w-full" variant="outline">Submit</Button>
                </FormGroup>
            </CardContent>
        </Card>

    );
}