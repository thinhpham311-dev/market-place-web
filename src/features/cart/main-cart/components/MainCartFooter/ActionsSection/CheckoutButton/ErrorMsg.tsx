import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";


const ErrorMsg = () => {
    return (
        <Button
            variant="outline"
            size="icon"
            className="relative text-red-600"
            disabled
            title="Không thể tải giỏ hàng"
        >
            <AlertCircle />
        </Button>
    );
};

export default ErrorMsg;
