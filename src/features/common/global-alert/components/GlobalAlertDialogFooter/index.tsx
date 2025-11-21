import React from "react";
import { AlertDialogFooter as RadixFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

interface IGlobalDialogFooterProps {
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
}

const GlobalDialogFooter = ({ onConfirm, confirmText = "Xác nhận", cancelText = "Hủy" }: IGlobalDialogFooterProps) => {
    return (
        <RadixFooter>
            <AlertDialogCancel>{cancelText}</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
        </RadixFooter>
    );
};

export default GlobalDialogFooter