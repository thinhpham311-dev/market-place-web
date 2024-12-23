'use client'
import { useRouter } from "next/navigation";

//components
import { FormGroup, FormInput, FormSelect } from "@/components/ui/organisms"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/molecules";
import { Button } from "@/components/ui/atoms";

//validations
import { isValidPhoneNumber } from "@/lib/validation"
import { z } from "zod";

//icons
import { ArrowLeft } from "lucide-react"

const emailValidator = z.string().email()

// Form schema for validation
const FormSchema = z.object({
    fullname: z.string().nonempty("Fullname is required").min(2, { message: "Username must be at least 2 characters." }),
    email: z
        .string()
        .nonempty("Email is required")
        .refine(v => (v ? emailValidator.safeParse(v).success : true), "Invalid email"),
    phone: z.string().nonempty("Phone number is required").refine(value => {
        if (value) {
            return isValidPhoneNumber(value, 'VN');
        }
        return true;
    }, "Invalid number"),
    password: z.string().nonempty("Password is required")
        .min(10, "Please enter at least 10 characters")
        .max(25, "Please enter no more than 25 characters"),
    confirmPassword: z.string().nonempty("Password Confirm is required")
        .min(10, "Please enter at least 10 characters")
        .max(25, "Please enter no more than 25 characters"),
    gender: z.string().nonempty("Gender is required"),
    address: z.string().nonempty("Email is required").min(2, { message: "Username must be at least 2 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // Points to the field with the error
    message: "Passwords must match",
});

const defaultValuesForSignUpForm = {
    fullname: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    password: "",
    confimPassword: "",
}
export default function Page() {
    const router = useRouter()
    function onSubmit(values: z.infer<typeof FormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <div className=" container  md:p-6 p-3 flex justify-start"  >
            <Card className="lg:w-1/3 md:w-1/2 w-full mx-auto">
                <CardHeader className=" flex flex-row gap-x-3 justify-start items-center md:p-6 p-3  ">
                    <Button variant="outline" size="icon" onClick={() => router.back()}><ArrowLeft /></Button>
                    <CardTitle>Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormGroup defaultValues={defaultValuesForSignUpForm} onHandleSubmit={onSubmit} className="space-y-5" formSchema={FormSchema}>
                        <FormInput name="fullname" label="FullName" placeholder="Please enter your fullname" formSchema={FormSchema} />
                        <FormInput name="email" label="Email" placeholder="Please enter your email" formSchema={FormSchema} />
                        <FormInput name="phone" character="+84" label="Phone Number" placeholder="Please enter your phone number" formSchema={FormSchema} />
                        <FormInput name="password" label="Password" inputType="password" placeholder="Please enter your password" formSchema={FormSchema} />
                        <FormInput name="confirmPassword" label="Confirm Password" inputType="password" placeholder="Please enter your password confirm" formSchema={FormSchema} />
                        <FormSelect name="gender" options={[{ name: "male", value: "male" }, { name: "female", value: "female" }]} label="Choose gender" placeholder="Please choose your gender" formSchema={FormSchema} />
                        <FormInput name="address" label="Address" placeholder="Please enter your address" formSchema={FormSchema} />
                        <Button type="submit" className="w-full" variant="outline">Submit</Button>
                    </FormGroup>
                </CardContent>
            </Card>
        </div>
    );
}


