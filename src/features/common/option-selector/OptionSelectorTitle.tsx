"use client";
import * as React from "react";

import {
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useOptionSelectorContext } from "@/features/common/option-selector/hooks";


const OptionSelectorTitle = () => {
    const { title } = useOptionSelectorContext();

    if (!title) return null;


    return (
        <CardHeader className="p-3">
            <CardTitle className="text-sm uppercase">
                {title}
            </CardTitle>
        </CardHeader>
    );
}

export default OptionSelectorTitle
