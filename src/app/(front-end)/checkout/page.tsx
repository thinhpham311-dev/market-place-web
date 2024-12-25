'use client'

//stores
import { useAppSelector } from "@/lib/hooks"

//components
import { Button, Separator } from "@/components/ui/atoms"
import { FormGroup, FormInput, FormInputTextarea, RowList } from "@/components/ui/organisms"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, ScrollArea } from '@/components/ui/molecules';

//validations
import { isValidPhoneNumber } from "@/lib/validation"

//icons
import { FilePenLine, CircleHelp, ArrowLeft } from "lucide-react"

import { z } from "zod";

//format
import { formatToCurrency } from "@/lib/formats"
import { useRouter } from "next/navigation";

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

export default function Page() {
    const router = useRouter()
    const {
        items,
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
                <CardHeader className="grid grid-rows-2 grid-flow-col auto-cols-max gap-x-4 items-center md:px-6 px-3">
                    <Button className="row-span-2" variant="outline" size="icon" onClick={() => router.back()}><ArrowLeft /></Button>
                    <CardTitle className="col-span-2">
                        Check Out
                    </CardTitle>
                    <CardDescription className="col-span-2 flex-wrap">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in purus fringilla,
                    </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="px-0">
                    <div className="md:px-6 px-3 w-full grid md:grid-cols-10 grid-cols-1 gap-8">
                        <div className="md:col-span-6 col-span-1 ">
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
                                        <FormInput label="Email" formSchema={FormSchema} inputType="email" name="email" placeholder="Please enter your email " isRequired />
                                        <FormInput label="Phone" character="+84" formSchema={FormSchema} name="phone" placeholder="Please enter your phone number" isRequired />
                                        <FormInput label="Address" formSchema={FormSchema} name="address" placeholder="Please enter your address" isRequired />
                                        <FormInputTextarea label="Comment" formSchema={FormSchema} name="comment" placeholder="Please enter your comment" />
                                        <Button type="submit" className="w-full" variant="outline">Submit</Button>
                                    </FormGroup>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="md:col-span-4 col-span-1 ">
                            <Card className=" border-none">
                                <CardHeader className="grid grid-rows-2 grid-flow-col px-0 justify-between items-start">
                                    <CardTitle className=" col-span-1 row-span-1">
                                        In Your Cart
                                    </CardTitle>
                                    <CardDescription className="col-span-1 row-span-1">
                                        Lorem ipsum dolor sit amet
                                    </CardDescription>

                                    <Button onClick={() => router.push("/cart")} variant="outline" size="icon" className="row-span-2"><FilePenLine /></Button>
                                </CardHeader>
                                <CardContent className="p-0 space-y-5">
                                    <CardDescription className="flex items-center justify-between">
                                        <div className="flex space-x-2 items-center">
                                            <strong>Sub Total</strong>
                                            <CircleHelp size={20} />
                                        </div>
                                        <span>
                                            {formatToCurrency(totalAmount)}
                                        </span>
                                    </CardDescription>
                                    <CardDescription className="flex items-center justify-between">
                                        <div className="flex space-x-2 items-center">
                                            <strong>Discount Total</strong>
                                            <CircleHelp size={20} />
                                        </div>
                                        <span>
                                            {formatToCurrency(totalAmountDiscount)}
                                        </span>
                                    </CardDescription>
                                    <CardDescription className="flex items-center justify-between">
                                        <div className="flex space-x-2 items-center">
                                            <strong>Estimated Shipping</strong>
                                        </div>
                                        <span>
                                            {formatToCurrency(estimatedShipping)}
                                        </span>
                                    </CardDescription>
                                    <CardDescription className="flex items-center justify-between">
                                        <div className="flex space-x-2 items-center">
                                            <strong>Estimated Tax</strong>
                                            <CircleHelp size={20} />
                                        </div>
                                        <span>
                                            {formatToCurrency(estimatedTax)}
                                        </span>
                                    </CardDescription>
                                    <Separator />
                                    <CardDescription className="flex items-center justify-between">
                                        <div className="flex space-x-2 items-center">
                                            <strong>Total</strong>
                                        </div>
                                        <strong>
                                            {formatToCurrency(total)}
                                        </strong>
                                    </CardDescription>
                                    <ScrollArea className="flex-1">
                                        <RowList data={items} />
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}


