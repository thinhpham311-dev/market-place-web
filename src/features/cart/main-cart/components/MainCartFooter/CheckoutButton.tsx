"use client";

import { Button } from "@/components/ui";
import { CreditCard } from "lucide-react";

export function CheckoutButton() {

    return (
        <Button size="sm">
            <CreditCard />
            <span>
                <strong>Check Out</strong>
            </span>
        </Button>
    );
}
