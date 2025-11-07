"use client";

import { DropdownMenuContent } from "@/components/ui";

export default function MiniCartDropdownContent({ children }: { children: React.ReactNode }) {
    return (
        <DropdownMenuContent align="end" className="w-[400px] p-3 space-y-3">
            {children}
        </DropdownMenuContent>
    );
}
