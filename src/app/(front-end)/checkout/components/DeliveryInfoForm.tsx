'use client'

//components
import { Button } from "@/components/ui/atoms"
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
    address: z
        .string()
        .nonempty("Address is required")
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
            <FormInput label="Email" formSchema={FormSchema} inputType="email" name="email" placeholder="Please enter your email " isRequired />
            <FormInput label="Phone" character="+84" formSchema={FormSchema} name="phone" placeholder="Please enter your phone number" isRequired />
            <FormInput label="Address" formSchema={FormSchema} name="address" placeholder="Please enter your address" isRequired />
            <FormInputTextarea label="Comment" formSchema={FormSchema} name="comment" placeholder="Please enter your comment" />
            <Button type="submit" className="w-full" variant="outline">Submit</Button>
        </FormGroup>
    );
}


