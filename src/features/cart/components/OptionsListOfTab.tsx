"use client";

import * as React from "react";

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui";
import { Label } from "@/components/ui";
import { cn } from "@/lib/utils";
import { IOption } from "@/interfaces/product";

interface IOptionsListOfTabProps {
    label?: string;
    data: Array<IOption>;
    defaultValue?: IOption | null;
    className?: string;
    onChange?: (value: IOption | null) => void;
}

const OptionsListOfTab = React.forwardRef<HTMLDivElement, IOptionsListOfTabProps>(
    ({ label, data, defaultValue = null, className, onChange }, ref) => {
        const [selectedValue, setSelectedValue] = React.useState<IOption | null>(defaultValue);

        React.useEffect(() => {
            if (defaultValue) {
                setSelectedValue(defaultValue);
            }
        }, [defaultValue]);

        const handleToggleItem = (item: IOption) => {
            const newValue = selectedValue?.value === item.value ? null : item;
            setSelectedValue(newValue);
            onChange?.(newValue);
        };


        return (
            <div
                ref={ref}
                className={cn("font-semibold leading-none tracking-tight", className)}
            >
                <Label className="block font-bold mb-3" htmlFor="terms">
                    {label}:
                </Label>
                <ToggleGroup type="single" className="justify-start flex-wrap">
                    {data.map((item: IOption) => {
                        return (
                            <ToggleGroupItem
                                variant="outline"
                                key={item.label}
                                value={item.value?.toString()}
                                onClick={() => handleToggleItem(item)}
                                className={cn("capitalize", {
                                    "bg-sidebar-border": selectedValue?.value === item.value
                                })}
                                size="sm"
                                aria-selected={selectedValue?.value === item.value}
                                role="option"
                            >
                                {item.label}
                            </ToggleGroupItem>
                        )
                    })}
                </ToggleGroup>
            </div>
        );
    }
);

export default OptionsListOfTab;