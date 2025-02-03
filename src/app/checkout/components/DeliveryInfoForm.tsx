'use client'

//components
import { Button } from "@/components/ui/atoms"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/molecules";
import { FormGroup, FormInput, FormInputTextarea } from "@/components/ui/organisms"

//validations
import { z } from "zod";
import { isValidPhoneNumber } from "@/lib/validate"


const emailValidator = z.string().email()

const FormSchema = z.object({
    fullname: z
        .string()
        .min(10, "Please enter at least 10 characters")
        .max(250, "Please enter no more than 250 characters")
        .nonempty("Email is required"),
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
    namecard: z
        .string()
        .min(10, "Please enter at least 10 characters")
        .max(250, "Please enter no more than 250 characters"),
    promocode: z
        .string()
        .nonempty("Promo code is required")
        .min(10, "Please enter at least 10 characters")
        .max(25, "Please enter no more than 25 characters"),
    comment: z.string()
});

const defaultValuesForCheckOutForm = {
    fullname: "",
    email: "",
    phone: "",
    addressline1: "",
    addressline2: "",
    addressline3: "",
    namecard: "",
    promocode: "",
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
            <Card className="border-none shadow-none">
                <CardHeader className="px-0">
                    <CardTitle>
                        Delivery
                    </CardTitle>
                    <CardDescription>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in purus fringilla,
                    </CardDescription>
                </CardHeader>
                <CardContent className=" space-y-3 mb-5 px-0">
                    <CardTitle className="text-md mb-5">Enter your name and address:</CardTitle>
                    <FormInput label="Full Name" formSchema={FormSchema} name="fullname" placeholder="Please enter your full name" isRequired />
                    <FormInput label="Address Line 1" formSchema={FormSchema} name="addressline1" placeholder="Please enter your address line 1" isRequired />
                    <FormInput label="Address Line 2" formSchema={FormSchema} name="addressline2" placeholder="Please enter your address line 2" isRequired />
                    <FormInput label="Address Line 3" formSchema={FormSchema} name="addressline3" placeholder="Please enter your address line 3" isRequired />
                </CardContent>
                <CardContent className=" space-y-3 mb-5 px-0">
                    <CardTitle className="text-md mb-5">What's your contact information?</CardTitle>
                    <FormInput label="Email" formSchema={FormSchema} inputType="email" name="email" placeholder="Please enter your email " isRequired />
                    <FormInput label="Phone" character="+84" formSchema={FormSchema} name="phone" placeholder="Please enter your phone number" isRequired />
                    <FormInputTextarea label="Comment" formSchema={FormSchema} name="comment" placeholder="Please enter your comment" />
                </CardContent>

                <CardHeader className="px-0">
                    <CardTitle>
                        Payment
                    </CardTitle>
                    <CardDescription>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in purus fringilla,
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 mb-5 px-0">
                    <CardTitle className="text-md mb-5">Have a promo code?</CardTitle>
                    <FormInput label="Promo Code" formSchema={FormSchema} inputType="text" name="promocode" placeholder="Please enter your promo code " isRequired />
                </CardContent>
                <CardContent className="space-y-3 mb-5 px-0">
                    <CardTitle className="text-md mb-5">How would you like to pay?</CardTitle>
                    <FormInput label="Name on card" formSchema={FormSchema} inputType="text" name="namecard" placeholder="Please enter your name card " isRequired />
                    <FormInput label="Card number" character="+84" formSchema={FormSchema} name="phone" placeholder="Please enter your card number" isRequired />
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 px-0">
                    <CardDescription>By clicking Place Order, you agree to the ESW Terms and Conditions.</CardDescription>
                    <Button type="submit" className="w-full" variant="default">Place Order</Button>
                </CardFooter>
            </Card>
        </FormGroup>
    );
}


