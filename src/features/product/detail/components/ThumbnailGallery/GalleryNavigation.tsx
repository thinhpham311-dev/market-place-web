"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface GalleryNavigationProps {
    current: number;
    total: number;
    onNavigate: (index: number) => void;
}

export default function GalleryNavigation({
    current,
    total,
    onNavigate,
}: GalleryNavigationProps) {
    return (
        <>
            <Button
                onClick={() => onNavigate((current - 1 + total) % total)}
                className="p-2 absolute top-1/2 -translate-y-1/2 -left-3 z-1 rounded-full w-7 h-7"
                size="icon"
                variant="outline"
            >
                <ArrowLeft />
            </Button>
            <Button
                onClick={() => onNavigate((current + 1) % total)}
                className="p-2 absolute top-1/2 -translate-y-1/2 -right-3 z-1 rounded-full w-7 h-7"
                size="icon"
                variant="outline"
            >
                <ArrowRight />
            </Button>
        </>
    );
}
