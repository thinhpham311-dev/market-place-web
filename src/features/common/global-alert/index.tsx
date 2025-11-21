"use client";

import React, { ReactNode } from "react";
import GlobalAlertWrapper from "./components/GlobalAlertWrapper";
import GlobalAlertTrigger from "./components/GlobalAlertTrigger";
import GlobalAlertDialogContent from "./components/GlobalAlertDialogContent";
import GlobalAlertDialogHeader from "./components/GlobalAlertDialogHeader";
import GlobalAlertDialogFooter from "./components/GlobalAlertDialogFooter";

interface Props {
    trigger: ReactNode;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
}

const GlobalAlertDialog = ({
    trigger,
    title,
    description,
    confirmText,
    cancelText,
    onConfirm
}: Props) => {
    return (
        <GlobalAlertWrapper>
            <GlobalAlertTrigger>{trigger}</GlobalAlertTrigger>
            <GlobalAlertDialogContent>
                <GlobalAlertDialogHeader title={title} description={description} />
                <GlobalAlertDialogFooter
                    onConfirm={onConfirm}
                    confirmText={confirmText}
                    cancelText={cancelText}
                />
            </GlobalAlertDialogContent>
        </GlobalAlertWrapper>
    );
};

export default GlobalAlertDialog;
