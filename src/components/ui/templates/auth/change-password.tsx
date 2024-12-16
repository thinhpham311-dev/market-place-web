"use client"

//components
import { Button } from "@/components/ui/atoms";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/molecules";
import { FormInput, FormGroup } from "@/components/ui/organisms";
import { z } from "zod";

const FormSchema = z.object({
    password: z.string().min(10, "Please enter min 10 character "),
    prepassword: z.string().min(10, "Please enter min 10 character "),
});

const defaultValuesForChangePasswordForm = {
    password: "",
    prepassword: "",
};

export default function ChangePassForm() {
    const onSubmit = (values: z.infer<typeof FormSchema>) => {
        console.log(values);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
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
                        formSchema={FormSchema}
                    />
                    <FormInput
                        inputType="password"
                        name="prepassword"
                        label="Pre Password"
                        formSchema={FormSchema}
                    />
                </FormGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button className="w-full" variant="outline">Submit</Button>
            </CardFooter>
        </Card>
    );
}