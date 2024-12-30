'use client'
//components
import { Button } from "@/components/ui/atoms";
import { FormInput, FormGroup } from "@/components/ui/organisms";

//validations
import { z } from "zod";

//icons
import { Save } from "lucide-react";


const FormSchema = z.object({
    password: z
        .string()
        .nonempty("Password is required")
        .min(10, "Please enter at least 10 characters")
        .max(25, "Please enter no more than 25 characters"),
    newPassword: z
        .string()
        .nonempty("New password is required")
        .min(10, "Please enter at least 10 characters")
        .max(25, "Please enter no more than 25 characters"),
    confirmNewPassword: z
        .string()
        .nonempty("New password confirmed is required")
        .min(10, "Please enter at least 10 characters")
        .max(25, "Please enter no more than 25 characters"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"], // Points to the field with the error
    message: "New password must match",
});;

const defaultValuesForChangePasswordForm = {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
};
export default function ChangePasswordForm() {

    const onSubmit = (values: z.infer<typeof FormSchema>) => {
        console.log(values);
    };
    return (

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
                placeholder="Please enter password"
                formSchema={FormSchema}
                isRequired
            />
            <FormInput
                inputType="password"
                name="newPassword"
                label="New Password"
                placeholder="Please enter new password"
                formSchema={FormSchema}
                isRequired
            />
            <FormInput
                inputType="password"
                name="confirmNewPassword"
                label="Confirm New Password"
                placeholder="Please enter new password confirm"
                formSchema={FormSchema}
                isRequired
            />
            <div className="col-span-2">
                <Button type="submit" variant="outline" className="w-full"><span><Save /></span>Save</Button>
            </div>
        </FormGroup>

    );
}


