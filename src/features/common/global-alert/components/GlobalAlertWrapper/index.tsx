"use client";

import { ReactNode } from "react";
import {
    AlertDialog,

} from "@/components/ui/alert-dialog";

interface GlobalAlertWrapperProps {
    children: ReactNode
}

const GlobalAlertWrapper = ({
    children
}: GlobalAlertWrapperProps) => {
    return (
        <AlertDialog >
            {children}
        </AlertDialog>
    );
};

export default GlobalAlertWrapper;
