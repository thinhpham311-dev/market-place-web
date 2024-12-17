'use client'
//components
import { Button } from "@/components/ui/atoms";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/molecules";
import { FormInput, FormGroup } from "@/components/ui/organisms";
import { z } from "zod";

const FormSchema = z.object({
    password: z.string().min(10, "Please enter min 10 character "),
    newpassword: z.string().min(10, "Please enter min 10 character ").max(25, "Pleasw enter max 25 character"),
    repassword: z.string().min(10, "Please enter min 10 character "),
});

const defaultValuesForChangePasswordForm = {
    password: "",
    newpassword: "",
    repassword: "",
};
export default function Page() {
    const onSubmit = (values: z.infer<typeof FormSchema>) => {
        console.log(values);
    };
    return (
        <div className=" container  md:p-6 p-3">
            <Card className="lg:w-1/3 md:w-1/2 w-full mx-auto">
                <CardHeader>
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
                            placeholder="Please enter your password"
                            formSchema={FormSchema}
                        />
                        <FormInput
                            inputType="password"
                            name="newpassword"
                            label="New Password"
                            placeholder="Please enter your new password"
                            formSchema={FormSchema}
                        />
                        <FormInput
                            inputType="password"
                            name="repassword"
                            label="Pre Password"
                            placeholder="Please enter your pre password"
                            formSchema={FormSchema}
                        />
                        <Button className="w-full" type="submit" variant="outline">Submit</Button>
                    </FormGroup>
                </CardContent>
            </Card>
        </div>
    );
}


