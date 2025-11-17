"use client";

import { CardTitle, Button } from "@/components/ui";
import { Tickets, ChevronRight } from "lucide-react";

export function VoucherSection() {
    return (
        <CardTitle className="flex items-center justify-between text-md w-full border p-3">
            <strong className="inline-flex items-center gap-2">
                <Tickets />
                Voucher Code:
            </strong>
            <Button variant="ghost" size="sm">
                View More
                <ChevronRight />
            </Button>
        </CardTitle>
    );
}
