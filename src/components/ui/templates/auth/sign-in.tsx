"use client"

import { Button } from "@/components/ui/atoms";
import { FormCheckBox, FormGroup, FormInput } from "@/components/ui/organisms";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/molecules";
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

export default function SignInForm() {
    const onSubmit = (values: z.infer<typeof FormSchema>) => {
        console.log(values);
    };

    return (
        <Card>
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
                        formSchema={FormSchema}
                    />
                    <FormInput
                        inputType="password"
                        name="password"
                        label="Password"
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
    );
}
