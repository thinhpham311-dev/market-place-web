"use client"
import * as React from "react";
import Link from "next/link";

//components
import { Separator } from "@/components/ui/atoms";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/molecules";

//icons
import { List } from "lucide-react";

export default function Sidebar() {
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
                <CardTitle>
                    <strong className="text-sm"> Categories</strong>
                </CardTitle>
                <Link href="" className="cursor-pointer text-sm">
                    Any
                </Link>
            </CardContent>
            <CardContent className="p-3">
                <CardTitle>
                    <strong className="text-sm"> Price</strong>
                </CardTitle>
                <Link href="" className="cursor-pointer text-sm">
                    Any
                </Link>
            </CardContent>
            <CardContent className="p-3">
                <CardTitle>
                    <strong className="text-sm"> Customer Review</strong>
                </CardTitle>
                <Link href="" className="cursor-pointer text-sm">
                    Any
                </Link>
            </CardContent>
        </Card>
    )
}
