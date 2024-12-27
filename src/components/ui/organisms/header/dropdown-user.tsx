"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/atoms";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuGroup,
} from "@/components/ui/molecules";

// Icons
import { User, LogOut, LogIn } from "lucide-react";

const menuItems = [
    { label: "Profile", icon: <User />, path: "/auth/customer/1" },
    { label: "Change Password", icon: <User />, path: "/auth/customer/change-password" },
    { label: "Sign In", icon: <LogIn />, path: "/auth/customer/sign-in" },
    { label: "Sign Up", icon: <LogIn />, path: "/auth/customer/sign-up" },
    { label: "Sign Out", icon: <LogOut />, path: "/auth/customer/sign-in" },
];

export default function DropdownUser() {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <DropdownMenu>

            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <User />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    {menuItems.map(({ label, icon, path }) => (
                        <DropdownMenuItem key={label} onClick={() => handleNavigation(path)}>
                            {icon}
                            <span>{label}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
