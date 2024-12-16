"use client"

import * as React from "react"

import { Button } from "@/components/ui/atoms"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    TooltipWrapper,
    DropdownMenuGroup
} from "@/components/ui/molecules"

//icons
import { User, LogOut, LogIn } from "lucide-react"
import { useRouter } from "next/navigation"

export const DropdownUser = () => {
    const router = useRouter()
    return (
        <DropdownMenu>
            <TooltipWrapper content="User Name">
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <User />
                    </Button>
                </DropdownMenuTrigger>
            </TooltipWrapper>
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                        <User />
                        <span>Profile</span>

                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/auth/sign-in")}>
                        <LogIn />
                        <span>Sign In</span>

                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/auth/sign-up")}>
                        <LogIn />
                        <span>Sign Up</span>

                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/auth/sign-in")}>
                        <LogOut />
                        <span>Sign Out</span>

                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

