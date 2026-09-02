"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/utils/styles";
import { Option } from "@/features/common/option-selector/types";
import { IoIosCheckmark } from "react-icons/io";

interface IOptionSelectorProps {
  label?: string;
  value: Option[];
  className?: string;
  index: number;
  selectedIndex: number | null;
  validationError?: string;
  onChoose: (index: number, option: number | null) => void;
}

function OptionSelectorCard({
  label,
  value,
  className,
  index,
  selectedIndex,
  validationError,
  onChoose,
}: IOptionSelectorProps) {
  const safeValues = Array.isArray(value) ? value : [];

  const handleOptionClick = (itemIdx: number) => {
    if (selectedIndex === itemIdx) {
      // Click 1 lần vào item đang chọn -> bỏ chọn (uncheck) ngay lập tức
      onChoose(index, null);
    } else {
      // Click 1 lần vào item chưa chọn -> chọn (check) ngay lập tức
      onChoose(index, itemIdx);
    }
  };

  return (
    <Card
      layout="horizontal"
      className={cn("leading-none tracking-tight border-none shadow-none items-center", className)}
    >
      <CardHeader className="p-0 min-w-[120px] max-w-[150px] flex-shrink-0 flex">
        {label && (
          <CardTitle className="text-sm uppercase font-semibold text-muted-foreground">
            <span className="text-start">{label}:</span>
          </CardTitle>
        )}
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <div
          role="group"
          aria-label={label}
          className="flex items-center justify-start flex-wrap gap-2"
        >
          {safeValues.map((item, itemIdx) => {
            const isSelected = selectedIndex === itemIdx;
            const itemKey = item.value ?? item.label ?? String(itemIdx);

            return (
              <button
                key={itemKey}
                type="button"
                role="checkbox"
                aria-checked={isSelected}
                aria-label={item.label || itemKey}
                onClick={() => handleOptionClick(itemIdx)}
                className={cn(
                  "relative rounded-md px-5 py-2 min-h-[38px] flex items-center justify-center space-x-2 border-2 transition-all duration-200 outline-none text-left cursor-pointer select-none overflow-hidden",
                  isSelected
                    ? "border-primary bg-primary/5 text-primary font-semibold shadow-xs pr-5.5"
                    : "border-border bg-background text-foreground hover:border-primary/60 hover:bg-accent",
                  validationError && !isSelected && "border-red-400 bg-red-50 dark:bg-red-950/30",
                )}
              >
                {item.image && typeof item.image === "string" && item.image.trim() !== "" ? (
                  <Image
                    src={item.image}
                    alt={item.label || "variant"}
                    width={20}
                    height={20}
                    className="rounded object-cover"
                  />
                ) : null}
                <span className={cn("text-sm font-medium", isSelected ? "text-primary font-semibold" : "")}>
                  {item.label || itemKey}
                </span>
                {isSelected && (
                  <div className="w-3.5 h-3.5 bg-primary absolute bottom-0 right-0 rounded-tl-sm flex items-center justify-center">
                    <IoIosCheckmark className="text-primary-foreground text-[13px] translate-x-[0.5px] translate-y-[0.5px]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* error message: displayed under option buttons */}
        {validationError && (
          <p className="text-red-500 text-xs mt-1.5 font-medium" role="alert" id={`option-${index}-error`}>
            {validationError}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default React.memo(OptionSelectorCard);
