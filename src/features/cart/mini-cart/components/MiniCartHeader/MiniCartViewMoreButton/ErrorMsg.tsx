import React from "react";
import { AlertTriangle } from "lucide-react";

interface ErrorMsgProps {
    message?: string;
    className?: string;
}

const ErrorMsg: React.FC<ErrorMsgProps> = ({
    message = "No data found.",
    className = "",
}) => {
    return (
        <div
            className={`w-full flex flex-col items-center justify-center  text-center text-muted-foreground aspect-square ${className}`}
        >
            <AlertTriangle className="w-10 h-10 mb-2 text-yellow-500" />
            <p className="text-sm font-medium">{message}</p>
        </div>
    );
};

export default ErrorMsg;
