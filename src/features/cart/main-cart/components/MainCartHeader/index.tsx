"use client";
import { CardHeader } from "@/components/ui";
import MainCartTitle from "./MainCartTitle";

export default function MainCartHeader() {

    return (
        <CardHeader className="flex flex-row justify-between items-center  space-y-0">
            <MainCartTitle />
        </CardHeader>
    );
}
