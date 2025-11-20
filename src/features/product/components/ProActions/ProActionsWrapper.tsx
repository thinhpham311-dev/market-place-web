"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui";

interface ProActionsWrapperProps {
    children: React.ReactNode;
}

const ProActionsWrapper = ({ children }: ProActionsWrapperProps) => {
    return (
        <Card className="border-none shadow-none lg:static md:fixed sm:fixed fixed bottom-0 left-0 z-50 w-full">
            <CardContent className="container mx-auto p-3 flex gap-3">
                {children}
            </CardContent>
        </Card>
    );
};

export default ProActionsWrapper;
