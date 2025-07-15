"use client";

import * as React from "react";

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui";
import { Label } from "@/components/ui";
import { cn } from "@/lib/utils";

type Option = {
    label: string;
    value: string | Array<Option>
}

interface IOptionsListOfTabProps {
    label?: string;
    data: Array<Option>;
    defaultValue?: Option | null;
    className?: string;
    onChange?: (value: Option | null) => void;
}

export const OptionsListOfTab = React.forwardRef<HTMLDivElement, IOptionsListOfTabProps>(
    ({ label, data, defaultValue = null, className, onChange }, ref) => {
        const [selectedValue, setSelectedValue] = React.useState<Option | null>(defaultValue);

        React.useEffect(() => {
            if (defaultValue) {
                setSelectedValue(defaultValue);
            }
        }, [defaultValue]);

        const handleToggleItem = (item: Option) => {
            // Cập nhật lại giá trị nếu người dùng chọn lại một mục đã được chọn trước đó
            const newValue = selectedValue?.value === item.value ? null : item; // Đảm bảo luôn cập nhật lại giá trị
            setSelectedValue(newValue); // Cập nhật lại selectedValue
            onChange?.(newValue); // Gửi giá trị mới lên hàm onChange nếu có
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
                    {data.map((item: Option) => {
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

OptionsListOfTab.displayName = "OptionsListOfTab";
