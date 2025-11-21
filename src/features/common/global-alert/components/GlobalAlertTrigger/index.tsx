"use client";

import React, { ReactNode, forwardRef } from "react";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Props {
    children: ReactNode;
}

// Forward ref để Radix UI không báo warning
const GlobalAlertTrigger = forwardRef<HTMLButtonElement, Props>(({ children }, ref) => {
    return <AlertDialogTrigger asChild ref={ref}>{children}</AlertDialogTrigger>;
});

GlobalAlertTrigger.displayName = "GlobalAlertTrigger";

export default GlobalAlertTrigger;
