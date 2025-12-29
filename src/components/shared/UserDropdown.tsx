"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
// Icons
import { User, LogOut, LogIn } from "lucide-react";

const menuItems = [
  { label: "My Account", icon: <User />, path: "/user/account/profile" },
  { label: "My Purchase", icon: <User />, path: "/user/purchase/orders" },
  { label: "Sign In", icon: <LogIn />, path: "/user/sign-in" },
  { label: "Sign Up", icon: <LogIn />, path: "/user/sign-up" },
  { label: "Sign Out", icon: <LogOut />, path: "/user/sign-in" },
];

export default function UserDropdown() {
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
}
