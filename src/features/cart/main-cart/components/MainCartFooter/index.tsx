"use client";

import { CardFooter } from "@/components/ui";
import { VoucherSection } from "./VoucherSection";
import { CheckoutButton } from "./CheckoutButton";

export default function MainCartFooter() {

    return (
        <CardFooter className="flex-col space-y-2">
            <VoucherSection />
            <div className="flex items-center justify-end space-x-5 border p-3  w-full">
                <CheckoutButton />
            </div>
        </CardFooter>
    );
}
