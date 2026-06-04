"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
  const selectedValue = typeof selectedIndex === "number" ? value[selectedIndex]?.value : undefined;

  const handleValueChange = React.useCallback(
    (val?: string) => {
      const idx = value.findIndex((v) => v.value === val);
      const option = idx !== -1 ? idx : null;
      onChoose(index, option);
    },
    [index, onChoose, value],
  );

  return (
    <Card
      layout="horizontal"
      className={cn("leading-none tracking-tight border-none shadow-none items-center", className)}
    >
      <CardHeader className="p-0 min-w-[120px] max-w-[150px] flex-shrink-0 flex ">
        {label && (
          <CardTitle className="text-sm uppercase ">
            <span className="text-start">{label}:</span>
          </CardTitle>
        )}
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <ToggleGroup
          type="single"
          className="justify-start flex-wrap space-x-1"
          onValueChange={handleValueChange}
          value={selectedValue}
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
                  validationError && "border-red-400 bg-red-50",
                  "hover:border-blue-400 hover:bg-blue-50",
                  "group-data-[state=on]:border-blue-500 group-data-[state=on]:bg-transparent",
                )}
              >
                <Image src={item.image} alt={item.label} width={20} height={20} />
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

        {/* error message: đặt ngay sau ToggleGroup để luôn hiển thị dưới nó */}
        {validationError && (
          <p className="text-red-500 text-xs mt-2" role="alert" id={`option-${index}-error`}>
            {validationError}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default React.memo(OptionSelectorCard);
