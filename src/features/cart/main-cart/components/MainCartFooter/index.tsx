"use client";

import { CardFooter } from "@/components/ui";
import { VoucherSection } from "./VoucherSection";
import { CheckoutButton } from "./CheckoutButton";

export default function MainCartFooter() {

    return (
        <CardFooter>
            <div className="flex items-center justify-between space-x-5 w-full border p-3">
                <VoucherSection />
                <CheckoutButton />
            </div>
        </CardFooter>
    );
}
