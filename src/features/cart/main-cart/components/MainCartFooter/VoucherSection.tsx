"use client";

import { CardTitle, Button } from "@/components/ui";
import { Tickets, ChevronRight } from "lucide-react";

export function VoucherSection() {
    return (
        <CardTitle className="text-md flex items-center gap-2">
            <Tickets />
            <span>Voucher Code:</span>
            <Button variant="link">
                <span>View More</span>
                <ChevronRight />
            </Button>
        </CardTitle>
    );
}
