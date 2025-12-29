"use client";
import React from "react";
import { Button } from "@/components/ui/button";

interface GalleryNavButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

export default function GalleryNavButton({ onClick, className, children }: GalleryNavButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`p-2 absolute top-1/2 -translate-y-1/2 z-1 rounded-full w-7 h-7 ${className}`}
      size="icon"
      variant="outline"
    >
      {children}
    </Button>
  );
}
