'use client'

//components
import { FormGroup, FormInput } from "@/components/ui/organisms"
import { Button } from "@/components/ui/atoms";

//validations
import { z } from "zod";
import { isValidPhoneNumber } from "@/lib/validate"


// Form schema for validation
const FormSchema = z.object({
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

})

const defaultValuesForSignUpForm = {
    phone: "",
}
export default function SignUpForm() {
    function onSubmit(values: z.infer<typeof FormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (

        <FormGroup
            defaultValues={defaultValuesForSignUpForm}
            onHandleSubmit={onSubmit}
            className="space-y-5"
            formSchema={FormSchema}>


            <FormInput
                name="phone" character="+84"
                label="Phone Number"
                placeholder="Please enter your phone number, example +84 9043823932"
                formSchema={FormSchema} isRequired />



            <Button type="submit" className="w-full" variant="outline">Submit</Button>

        </FormGroup>

    );
}


