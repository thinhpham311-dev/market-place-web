"use client";
import { CardHeader } from "@/components/ui/card";
import MainCartTitle from "./MainCartTitle";

export default function MainCartHeader() {
  return (
    <CardHeader className="flex flex-row justify-between items-center  space-y-0 col-span-12 h-12 py-0 ">
      <MainCartTitle />
    </CardHeader>
  );
}
