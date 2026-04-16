"use client";
import * as React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SpecificationItemProps {
  label: string;
  value: string | React.ReactNode;
  hasSeparator?: boolean;
}

export default function SpecificationItem({
  label,
  value,
  hasSeparator = true,
}: SpecificationItemProps) {
  return (
    <>
      <Card className="border-none shadow-none rounded-none grid grid-cols-6 ">
        <CardHeader className="p-3 col-span-2">
          <CardTitle className="text-md ">{label}</CardTitle>
        </CardHeader>
        <CardContent className="p-3 col-span-4">{value}</CardContent>
      </Card>
      {hasSeparator && <Separator />}
    </>
  );
}
