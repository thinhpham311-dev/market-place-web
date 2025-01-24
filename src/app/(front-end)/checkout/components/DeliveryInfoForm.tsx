'use client'

//components
import { Button } from "@/components/ui/atoms"
import { CardContent, CardTitle } from "@/components/ui/molecules";
import { FormGroup, FormInput, FormInputTextarea } from "@/components/ui/organisms"

//validations
import { z } from "zod";
import { isValidPhoneNumber } from "@/lib/validate"


const emailValidator = z.string().email()

const FormSchema = z.object({
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
    addressline1: z
        .string()
        .nonempty("Address Line 1 is required")
        .min(10, "Please enter at least 10 characters")
        .max(250, "Please enter no more than 250 characters"),
    addressline2: z
        .string()
        .nonempty("Address Line 2 is required")
        .min(10, "Please enter at least 10 characters")
        .max(250, "Please enter no more than 250 characters"),
    addressline3: z
        .string()
        .nonempty("Address Line 3 is required")
        .min(10, "Please enter at least 10 characters")
        .max(250, "Please enter no more than 250 characters"),
    comment: z.string()
});

const defaultValuesForCheckOutForm = {
    email: "",
    phone: "",
    address: "",
    comment: ""
}

export default function DeliveryInfoForm() {

    const onSubmit = (values: z.infer<typeof FormSchema>) => {
        console.log(values);
    };

    return (
        <FormGroup
            formSchema={FormSchema}
            defaultValues={defaultValuesForCheckOutForm}
            onHandleSubmit={onSubmit}
            className="space-y-5">
            <CardContent className="px-0 space-y-3">
                <CardTitle className="text-md mb-5">Enter your name and address:</CardTitle>
                <FormInput label="Address Line 1" formSchema={FormSchema} name="addressline1" placeholder="Please enter your address line 1" isRequired />
                <FormInput label="Address Line 2" formSchema={FormSchema} name="addressline2" placeholder="Please enter your address line 2" isRequired />
                <FormInput label="Address Line 3" formSchema={FormSchema} name="addressline3" placeholder="Please enter your address line 3" isRequired />
                <FormInputTextarea label="Comment" formSchema={FormSchema} name="comment" placeholder="Please enter your comment" />
            </CardContent>
            <CardContent className="px-0 space-y-3">
                <CardTitle className="text-md mb-5">What's your contact information?</CardTitle>
                <FormInput label="Email" formSchema={FormSchema} inputType="email" name="email" placeholder="Please enter your email " isRequired />
                <FormInput label="Phone" character="+84" formSchema={FormSchema} name="phone" placeholder="Please enter your phone number" isRequired />
            </CardContent>
            <Button type="submit" className="w-full" variant="outline">Submit</Button>
        </FormGroup>
    );
}


