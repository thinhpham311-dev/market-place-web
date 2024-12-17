'use client'
//components
import { Button } from "@/components/ui/atoms";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/molecules";
import { FormInput, FormGroup, FormSelect } from "@/components/ui/organisms";
import { z } from "zod";

const FormSchema = z.object({
    fullname: z.string().min(2, { message: "Username must be at least 2 characters." }),
    email: z.string().min(2, { message: "Username must be at least 2 characters." }),
    phone: z.string().min(2, { message: "Username must be at least 2 characters." }),
    gender: z.string(),
    address: z.string().min(2, { message: "Username must be at least 2 characters." }),
});

const defaultValuesForUpdateProfileForm = {
    fullname: "",
    email: "",
    phone: "",
    gender: "",
    address: ""
}
export default function Page() {
    const onSubmit = (values: z.infer<typeof FormSchema>) => {
        console.log(values);
    };
    return (
        <div className=" container  md:p-6 p-3">
            <Card className="lg:w-1/3 md:w-1/2 w-full mx-auto">
                <CardHeader>
                    <CardTitle>Update Profile User</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormGroup
                        defaultValues={defaultValuesForUpdateProfileForm}
                        onHandleSubmit={onSubmit}
                        className="space-y-5"
                        formSchema={FormSchema}
                    >
                        <FormInput name="fullname" label="FullName" placeholder="Please enter your fullname" formSchema={FormSchema} />
                        <FormInput name="email" label="Email" placeholder="Please enter your email" formSchema={FormSchema} />
                        <FormInput name="phone" label="Phone Number" placeholder="Please enter your phone number" formSchema={FormSchema} />
                        <FormSelect name="gender" options={[{ name: "male", value: "male" }, { name: "female", value: "female" }]} label="Choose gender" placeholder="Please your choose gender" formSchema={FormSchema} />
                        <FormInput name="address" label="Address" placeholder="Please enter your address" formSchema={FormSchema} />
                        <Button className="w-full" type="submit" variant="outline">Submit</Button>
                    </FormGroup>
                </CardContent>
            </Card>
        </div>
    );
}


