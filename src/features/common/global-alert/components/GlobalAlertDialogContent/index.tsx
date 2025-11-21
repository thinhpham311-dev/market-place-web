"use client";

import React, { ReactNode, forwardRef } from "react";
import { AlertDialogContent } from "@/components/ui/alert-dialog";

interface Props {
    children: ReactNode;
}

// Forward ref để Radix UI không báo warning
const GlobalAlertDialogContent = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
    return (
        <AlertDialogContent
            ref={ref}
            className="animate-fade-in scale-95 motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out"
        >
            {children}
        </AlertDialogContent>
    );
});

GlobalAlertDialogContent.displayName = "GlobalAlertDialogContent";

export default GlobalAlertDialogContent;
