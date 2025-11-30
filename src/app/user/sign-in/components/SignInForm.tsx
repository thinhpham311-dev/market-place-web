'use client'

//ui
import { Button } from "@/components/ui/button"

//components
import { FormGroup, FormInput, FormCheckBox } from "@/components/shared"
import { isValidPhoneNumber } from "@/lib/handleError"
import { z } from "zod";

// Form schema for validation
const FormSchema = z.object({
    phone: z
        .string()
        .nonempty("Phone number is required")
        .refine(value => {
            if (value) {
                return isValidPhoneNumber(value, 'VN');
            }

            return true;
        }, "Invalid number"),
    password: z
        .string()
        .nonempty("Password is required")
        .min(10, "Please enter at least 10 characters")
        .max(25, "Please enter no more than 25 characters"),
    remember: z
        .boolean(),
});

const defaultValuesForSignInForm = {
    phone: "",
    password: "",
    remember: false,
};

export default function Page() {
    const onSubmit = (values: z.infer<typeof FormSchema>) => {
        console.log(values);
    };
    return (

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
                isRequired
                character="+84"
            />
            <FormInput
                inputType="password"
                name="password"
                label="Password"
                placeholder="Please enter your password"
                formSchema={FormSchema}
                isRequired
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

    );
}


