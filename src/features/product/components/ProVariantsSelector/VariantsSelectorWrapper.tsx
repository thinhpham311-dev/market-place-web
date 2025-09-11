"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui"


const VariantsSelectorWrapper = ({ children }: { children: React.ReactNode }) => {

    return (
        <Card className="w-full border-none shadow-none">
            <CardContent className="p-3">
                {children}
            </CardContent>
        </Card>
    );
}

VariantsSelectorWrapper.displayName = "VariantsSelectorWrapper";
export default React.memo(VariantsSelectorWrapper);
