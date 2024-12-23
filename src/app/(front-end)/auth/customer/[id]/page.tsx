'use client'
//components
import { Button } from "@/components/ui/atoms";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/molecules";
import { FormInput, FormGroup, FormSelect } from "@/components/ui/organisms";

//validations
import { z } from "zod";
import { isValidPhoneNumber } from "@/lib/validation"
import { useRouter } from "next/navigation";

//icons
import { ArrowLeft } from "lucide-react"



const emailValidator = z.string().email()


const FormSchema = z.object({
    fullname: z
        .string()
        .nonempty("Fullname is required")
        .min(10, "Please enter at least 10 characters")
        .max(250, "Please enter no more than 250 characters"),
    email: z
        .string()
        .nonempty("Email is required")
        .refine(v => (v ? emailValidator.safeParse(v).success : true), "Invalid email"),
    phone: z
        .string()
        .nonempty("Phone number is required")
        .min(10, "Please enter at least 10 characters")
        .max(25, "Please enter no more than 25 characters")
        .refine(value => {
            if (value) {
                return isValidPhoneNumber(value, 'VN');
            }
            return true;
        }, "Invalid number"),
    gender: z
        .string()
        .nonempty("Gender is required"),
    address: z
        .string()
        .nonempty("Address is required")
        .min(10, "Please enter at least 10 characters")
        .max(250, "Please enter no more than 250 characters")
});

const defaultValuesForUpdateProfileForm = {
    fullname: "",
    email: "",
    phone: "",
    gender: "",
    address: ""
}
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
                    <CardTitle>Update Profile User</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormGroup
                        defaultValues={defaultValuesForUpdateProfileForm}
                        onHandleSubmit={onSubmit}
                        className="space-y-5"
                        formSchema={FormSchema}
                    >
                        <FormInput name="fullname" label="FullName" placeholder="Please enter your fullname" formSchema={FormSchema} isRequired />
                        <FormInput name="email" label="Email" placeholder="Please enter your email" formSchema={FormSchema} isRequired />
                        <FormInput name="phone" character="+84" label="Phone Number" placeholder="Please enter your phone number" formSchema={FormSchema} isRequired />
                        <FormSelect name="gender" options={[{ name: "male", value: "male" }, { name: "female", value: "female" }]} label="Choose gender" placeholder="Please your choose gender" formSchema={FormSchema} isRequired />
                        <FormInput name="address" label="Address" placeholder="Please enter your address" formSchema={FormSchema} isRequired />
                        <Button className="w-full" type="submit" variant="outline">Submit</Button>
                    </FormGroup>
                </CardContent>
            </Card>
        </div>
    );
}


