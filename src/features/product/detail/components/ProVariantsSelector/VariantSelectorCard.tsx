"use client";

import * as React from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { VariantOption } from "./types";
import { useVariantsSelectorContext } from "./hooks";
import { IoIosCheckmark } from "react-icons/io";

interface VariantSelectorProps {
    label?: string;
    value: VariantOption[];
    className?: string;
    index: number;
}

export default function VariantSelectorCard({
    label,
    value,
    className,
    index,
}: VariantSelectorProps) {
    const { handleChooseOption } = useVariantsSelectorContext();

    const handleValueChange = (val?: string) => {
        const option = value.find((v) => v.value === val) || null;
        handleChooseOption(index, option);
    };

    return (
        <Card
            className={cn(
                "leading-none tracking-tight border-none shadow-none ",
                className
            )}
        >
            <div className="grid grid-cols-12 items-center">
                <CardHeader className="p-0 col-span-2">
                    {label && <CardTitle className="text-sm uppercase">{label}:</CardTitle>}
                </CardHeader>
                <CardContent className="p-0 col-span-10">
                    <ToggleGroup
                        type="single"
                        className="justify-start flex-wrap space-x-1"
                        onValueChange={handleValueChange}
                    >
                        {value.map((item) => (
                            <ToggleGroupItem
                                key={item.value}
                                value={item.value}
                                size="sm"
                                className="relative group p-0"
                                aria-label={item.label}
                            >
                                <div className="h-full w-full rounded-md px-3 grid place-content-center border-2 border-gray-300 group-data-[state=on]:border-blue-500">
                                    <span className="group-data-[state=on]:font-bold group-data-[state=on]:text-blue-500">{item.label}</span>
                                    <div className="w-3 h-3 bg-blue-500 hidden group-data-[state=on]:block absolute bottom-[2px] right-[2px] rounded-tl-3xl rounded-br-md">
                                        <IoIosCheckmark className="text-white" />
                                    </div>
                                </div>
                            </ToggleGroupItem>

                        ))}
                    </ToggleGroup>
                </CardContent>
            </div>
        </Card>
    );
}
