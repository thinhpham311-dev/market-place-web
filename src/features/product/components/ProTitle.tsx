"use client";
import { Card, CardContent, CardTitle } from "@/components/ui";
import { cn } from "@/lib/utils"

interface IProTitleProps {
    className?: string;
    title?: string;
}

export default function ProTitle({
    className,
    title
}: IProTitleProps) {
    return (
        <Card className={cn("border-none shadow-none", className)}>
            <CardContent className="p-3">
                <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            </CardContent>
        </Card>
    );
}
