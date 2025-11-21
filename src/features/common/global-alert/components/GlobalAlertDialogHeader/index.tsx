"use client";

import React from "react";
import { AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";

interface Props {
    title: string;
    description?: string;
}

const GlobalAlertDialogHeader = ({ title, description }: Props) => {
    return (
        <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
    );
};

export default GlobalAlertDialogHeader;
