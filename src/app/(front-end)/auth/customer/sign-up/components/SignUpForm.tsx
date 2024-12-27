'use client'

//components
import { FormGroup, FormInput, FormSelect } from "@/components/ui/organisms"
import { Button } from "@/components/ui/atoms";

//validations
import { z } from "zod";
import { isValidPhoneNumber } from "@/lib/validation"

const emailValidator = z.string().email()

// Form schema for validation
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
    password: z
        .string()
        .nonempty("Password is required")
        .min(10, "Please enter at least 10 characters")
        .max(25, "Please enter no more than 25 characters"),
    confirmPassword: z
        .string()
        .nonempty("Password Confirm is required")
        .min(10, "Please enter at least 10 characters")
        .max(25, "Please enter no more than 25 characters"),
    gender: z
        .string()
        .nonempty("Gender is required"),
    address: z
        .string()
        .nonempty("Address is required")
        .min(10, "Please enter at least 10 characters")
        .max(250, "Please enter no more than 250 characters")
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // Points to the field with the error
    message: "Passwords must match",
});

const defaultValuesForSignUpForm = {
    fullname: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    password: "",
    confimPassword: "",
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
                name="fullname"
                label="FullName"
                placeholder="Please enter your fullname"
                formSchema={FormSchema} isRequired />
            <FormInput
                name="email"
                label="Email"
                placeholder="Please enter your email"
                formSchema={FormSchema} isRequired />
            <FormInput
                name="phone" character="+84"
                label="Phone Number"
                placeholder="Please enter your phone number"
                formSchema={FormSchema} isRequired />
            <FormInput
                name="password"
                label="Password" inputType="password"
                placeholder="Please enter your password"
                formSchema={FormSchema} isRequired />
            <FormInput
                name="confirmPassword"
                label="Confirm Password"
                inputType="password"
                placeholder="Please enter your password confirm"
                formSchema={FormSchema} isRequired />
            <FormSelect
                name="gender" options={[{ name: "male", value: "male" }, { name: "female", value: "female" }]}
                label="Choose gender"
                placeholder="Please choose your gender"
                formSchema={FormSchema} isRequired />
            <FormInput
                name="address"
                label="Address"
                placeholder="Please enter your address"
                formSchema={FormSchema} isRequired />
            <Button type="submit" className="w-full" variant="outline">Submit</Button>
        </FormGroup>

    );
}


