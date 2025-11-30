import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";


const MiniCartCheckoutButton = () => {

    const handleCheckout = () => {
        console.log("Checkout clicked!");
    };

    return (
        <Button
            className="flex items-center gap-1"
            variant="default"
            size="sm"
            onClick={handleCheckout}
        >
            <CreditCard className="w-4 h-4" />
            <span>Check Out</span>
        </Button>
    );
};

export default MiniCartCheckoutButton;
