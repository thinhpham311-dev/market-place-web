'use client'
//components
import { Button } from "@/components/ui/atoms"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/molecules";
import { FormGroup, FormInput, FormCheckBox } from "@/components/ui/organisms"
import { isValidPhoneNumber } from "@/lib/validation"
import { useRouter } from "next/navigation";
import { z } from "zod";

//icons
import { ArrowLeft } from "lucide-react"

// Form schema for validation
const FormSchema = z.object({
    phone: z.string().nonempty("Phone number is required").refine(value => {
        if (value) {
            return isValidPhoneNumber(value, 'VN');
        }

        return true;
    }, "Invalid number"),
    password: z.string()
        .nonempty("Password is required")
        .min(10, "Please enter at least 10 characters")
        .max(25, "Please enter no more than 25 characters"),
    remember: z.boolean(),
});

const defaultValuesForSignInForm = {
    phone: "",
    password: "",
    remember: false,
};

export default function Page() {
    const router = useRouter()
    const onSubmit = (values: z.infer<typeof FormSchema>) => {
        console.log(values);
    };
    return (
        <div className=" container md:p-6 p-3 ">
            <Card className="lg:w-1/3 md:w-1/2 w-full mx-auto">
                <CardHeader className=" flex flex-row gap-x-3 justify-start items-center md:p-6 p-3  ">
                    <Button variant="outline" size="icon" onClick={() => router.back()}><ArrowLeft /></Button>
                    <CardTitle>Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormGroup
                        defaultValues={defaultValuesForSignInForm}
                        onHandleSubmit={onSubmit}
                        className="space-y-5"
                        formSchema={FormSchema}
                    >
                        <FormInput
                            name="phone"
                            label="Phone"
                            placeholder="Please enter your phone number"
                            formSchema={FormSchema}
                            character="+84"
                        />
                        <FormInput
                            inputType="password"
                            name="password"
                            label="Password"
                            placeholder="Please enter your password"
                            formSchema={FormSchema}
                        />
                        <FormCheckBox
                            name="remember"
                            label="Remember me"
                            formSchema={FormSchema}
                        />
                        <Button type="submit" className="w-full" variant="outline">
                            Submit
                        </Button>
                    </FormGroup>
                </CardContent>
            </Card>
        </div>
    );
}


