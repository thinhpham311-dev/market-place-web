'use client'
//components
import { Button } from "@/components/ui/atoms"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/molecules";
import { FormGroup, FormInput, FormCheckBox } from "@/components/ui/organisms"

import { z } from "zod";

// Form schema for validation
const FormSchema = z.object({
    username: z.string(),
    password: z.string(),
    remember: z.boolean(),
});

const defaultValuesForSignInForm = {
    username: "",
    password: "",
    remember: false,
};

export default function Page() {
    const onSubmit = (values: z.infer<typeof FormSchema>) => {
        console.log(values);
    };
    return (
        <div className=" container  md:p-6 p-3">
            <Card className="lg:w-1/3 md:w-1/2 w-full mx-auto">
                <CardHeader>
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
                            name="username"
                            label="Username"
                            placeholder="Please enter your username"
                            formSchema={FormSchema}
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


