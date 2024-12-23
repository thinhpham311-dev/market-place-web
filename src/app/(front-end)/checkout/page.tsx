'use client'

//stores
import { useAppSelector } from "@/lib/hooks"

//components
import { Button, Separator } from "@/components/ui/atoms"
import { FormGroup, FormInput, FormInputTextarea } from "@/components/ui/organisms"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/molecules';

//validations
import { isValidPhoneNumber } from "@/lib/validation"

//icons
import { FilePenLine, CircleHelp } from "lucide-react"

import { z } from "zod";

const emailValidator = z.string().email()

const FormSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required")
        .refine(v => (v ? emailValidator.safeParse(v).success : true), "Invalid email"),
    phone: z.string().nonempty("Phone number is required").refine(value => {
        if (value) {
            return isValidPhoneNumber(value, 'VN');
        }

        return true;
    }, "Invalid number"),
    comment: z.string()
});

const defaultValuesForCheckOutForm = {
    email: "",
    phone: "",
    comment: ""
}

export default function Page() {
    const {
        totalAmount,
        totalAmountDiscount,
        estimatedShipping,
        estimatedTax,
        total
    } = useAppSelector((state) => state.cart.state)
    const onSubmit = (values: z.infer<typeof FormSchema>) => {
        console.log(values);
    };

    return (
        <div className="space-y-10 container  md:p-6 p-3">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Check Out
                    </CardTitle>
                    <CardDescription>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in purus fringilla,
                    </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="px-0">
                    <div className="md:px-6 px-3 w-full grid md:grid-cols-10 grid-cols-1 gap-8">
                        <div className="md:col-span-6 col-span-1 md:block  hidden">
                            <Card className=" border-none">
                                <CardHeader className="px-0">
                                    <CardTitle>
                                        Delivery Options
                                    </CardTitle>
                                    <CardDescription>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in purus fringilla,
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <FormGroup
                                        formSchema={FormSchema}
                                        defaultValues={defaultValuesForCheckOutForm}
                                        onHandleSubmit={onSubmit}
                                        className="space-y-5">
                                        <FormInput label="Email" formSchema={FormSchema} inputType="email" name="email" placeholder="Please enter your email " />
                                        <FormInput label="Phone" formSchema={FormSchema} name="phone" placeholder="Please enter your phone number" />
                                        <FormInputTextarea label="Comment" formSchema={FormSchema} name="comment" placeholder="Please enter your comment" />
                                        <Button type="submit" className="w-full" variant="outline">Submit</Button>
                                    </FormGroup>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="md:col-span-4 col-span-1 md:block  hidden">
                            <Card className=" border-none">
                                <CardHeader className="grid grid-rows-2 grid-flow-col px-0 justify-between items-start">
                                    <CardTitle className=" col-span-1 row-span-1">
                                        In Your Cart
                                    </CardTitle>
                                    <CardDescription className="col-span-1 row-span-1">
                                        Lorem ipsum dolor sit amet
                                    </CardDescription>

                                    <Button variant="outline" size="icon" className="row-span-2"><FilePenLine /></Button>
                                </CardHeader>
                                <CardContent className="p-0 space-y-5">
                                    <CardDescription className="flex items-center justify-between">
                                        <div className="flex space-x-2 items-center">
                                            <strong>Sub Total</strong>
                                            <CircleHelp size={20} />
                                        </div>
                                        <span>
                                            ${totalAmount}
                                        </span>
                                    </CardDescription>
                                    <CardDescription className="flex items-center justify-between">
                                        <div className="flex space-x-2 items-center">
                                            <strong>Discount Total</strong>
                                            <CircleHelp size={20} />
                                        </div>
                                        <span>
                                            ${totalAmountDiscount}
                                        </span>
                                    </CardDescription>
                                    <CardDescription className="flex items-center justify-between">
                                        <div className="flex space-x-2 items-center">
                                            <strong>Estimated Shipping</strong>
                                        </div>
                                        <span>
                                            ${estimatedShipping}
                                        </span>
                                    </CardDescription>
                                    <CardDescription className="flex items-center justify-between">
                                        <div className="flex space-x-2 items-center">
                                            <strong>Estimated Tax</strong>
                                            <CircleHelp size={20} />
                                        </div>
                                        <span>
                                            ${estimatedTax}
                                        </span>
                                    </CardDescription>
                                    <Separator />
                                    <CardDescription className="flex items-center justify-between">
                                        <div className="flex space-x-2 items-center">
                                            <strong>Total</strong>
                                        </div>
                                        <strong>
                                            ${total}
                                        </strong>
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}


