"use client"
import * as React from "react";
import Link from "next/link";

//components
import { Separator, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

//icons
import { List } from "lucide-react";

export default function SideBar() {
    return (
        <Card className="sticky top-[80px]">
            <CardHeader className="p-3">
                <CardTitle className="flex flex-row gap-x-4 items-center">
                    <span><List size={20} /></span>
                    <strong className="text-sm"> All list</strong>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-3">
                <CardTitle className="text-xl">
                    <strong className="text-sm"> Categories</strong>
                </CardTitle>
                <Link href="" className="cursor-pointer text-sm">
                    Any
                </Link>
            </CardContent>
        </Card>
    )
}
