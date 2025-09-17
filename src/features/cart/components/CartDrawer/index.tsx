"use client";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    ScrollArea,
} from "@/components/ui";

function CartDrawerRoot({ children }: { children: React.ReactNode }) {
    return <Sheet>{children}</Sheet>;
}

// Trigger
function CartDrawerTrigger({ children }: { children: React.ReactNode }) {
    return <SheetTrigger asChild>{children}</SheetTrigger>;
}

// Content wrapper
function CartDrawerContent({ children, side }: {
    children: React.ReactNode, side?: "left" | "right" | "top" | "bottom";
}) {
    return (
        <SheetContent side={side} className="px-3 py-0">
            <div className="flex flex-col h-full">{children}</div>
        </SheetContent>
    );
}

// Header (có thể override)
function CartDrawerHeader({ title, description }: { title: string; description: string }) {
    return (
        <SheetHeader className="py-3 space-y-0">
            <SheetTitle className="uppercase">{title}</SheetTitle>
            <SheetDescription>
                {description}
            </SheetDescription>
        </SheetHeader>
    );
}

// Body scroll area
function CartDrawerBody({ children }: { children: React.ReactNode }) {
    return <ScrollArea className="flex-1 p-0">{children}</ScrollArea>;
}

// Footer (có thể override)
function CartDrawerFooter({ children }: { children: React.ReactNode }) {
    return (
        <SheetFooter className="py-3">
            {children}
        </SheetFooter>
    );
}

export const CartDrawer = Object.assign(CartDrawerRoot, {
    Trigger: CartDrawerTrigger,
    Content: CartDrawerContent,
    Header: CartDrawerHeader,
    Body: CartDrawerBody,
    Footer: CartDrawerFooter
});
