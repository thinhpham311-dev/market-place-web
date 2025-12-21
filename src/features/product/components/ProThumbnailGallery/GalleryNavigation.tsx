"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/utils/styles";

interface GalleryNavigationProps {
    current: number;
    total: number;
    onNavigate: (index: number) => void;
    className?: string;
}

export default function GalleryNavigation({
    current,
    total,
    onNavigate,
    className,
}: GalleryNavigationProps) {
    const handlePrev = () => onNavigate((current - 1 + total) % total);
    const handleNext = () => onNavigate((current + 1) % total);

    const baseBtnClass =
        "p-2 absolute top-1/2 -translate-y-1/2 rounded-full w-7 h-7";

    return (
        <>
            <Button
                onClick={handlePrev}
                className={cn(baseBtnClass, "-left-3", className)}
                size="icon"
                variant="outline"
            >
                <ArrowLeft className="w-4 h-4" />
            </Button>

            <Button
                onClick={handleNext}
                className={cn(baseBtnClass, "-right-3", className)}
                size="icon"
                variant="outline"
            >
                <ArrowRight className="w-4 h-4" />
            </Button>
        </>
    );
}
