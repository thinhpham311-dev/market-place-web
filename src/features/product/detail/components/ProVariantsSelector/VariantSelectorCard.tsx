"use client";

import * as React from "react";
import Image from "next/image";
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
    const { handleChooseOption, validationErrors, resetValidationErrors } = useVariantsSelectorContext();
    const cardRef = React.useRef<HTMLDivElement>(null);
    const handleValueChange = (val?: string) => {
        const idx = value.findIndex((v) => v.value === val);
        const option = idx !== -1 ? idx : null;
        handleChooseOption(index, option);
    };

    React.useEffect(() => {
        if (!validationErrors || Object.keys(validationErrors).length === 0) {
            return; // không cần listener
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                resetValidationErrors();
            }
        };

        window.addEventListener("mousedown", handleClickOutside);
        return () => window.removeEventListener("mousedown", handleClickOutside);
    }, [validationErrors, resetValidationErrors]);

    return (
        <Card
            ref={cardRef}
            className={cn(
                "leading-none tracking-tight border-none shadow-none ",
                className
            )}
        >
            <div className="grid grid-cols-12 gap-x-5 items-center">
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
                                className={cn("relative group p-0")}
                                aria-label={item.label}
                            >
                                <div
                                    className={cn(
                                        "h-full w-full rounded-md px-3 flex items-center space-x-2 border-2 border-gray-300 transition-colors duration-200",
                                        validationErrors?.[index] && "border-red-400 bg-red-50",
                                        "hover:border-blue-400 hover:bg-blue-50",
                                        "group-data-[state=on]:border-blue-500 group-data-[state=on]:bg-blue-50"
                                    )}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.label}
                                        width={20}
                                        height={20}
                                    />
                                    <span className=" group-data-[state=on]:text-blue-500 group-hover:text-blue-500">
                                        {item.label}
                                    </span>
                                    <div className="w-3 h-3 bg-blue-500 hidden group-data-[state=on]:block absolute bottom-[2px] right-[2px] rounded-tl-3xl rounded-br-md">
                                        <IoIosCheckmark className="text-white" />
                                    </div>
                                </div>
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>

                    {validationErrors?.[index] && (
                        <p className="text-red-500 text-xs mt-2">
                            {validationErrors[index]}
                        </p>
                    )}
                </CardContent>
            </div>
        </Card>
    );
}
