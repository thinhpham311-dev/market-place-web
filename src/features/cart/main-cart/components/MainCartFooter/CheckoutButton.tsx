"use client";

import { Button } from "@/components/ui";
import { CreditCard } from "lucide-react";

export function CheckoutButton() {

    return (
        <Button size="sm">
            <CreditCard />
            <span>
                Check Out
            </span>
        </Button>
    );
}
