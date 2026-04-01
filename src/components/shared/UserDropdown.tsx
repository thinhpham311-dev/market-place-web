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
import { useTranslation } from "@/lib/hooks";
// Icons
import { User, LogOut, LogIn } from "lucide-react";

export default function UserDropdown() {
  const { t } = useTranslation();
  const router = useRouter();
  const menuItems = [
    { label: t("header_my_account"), icon: <User />, path: "/user/account/profile" },
    { label: t("sign_in"), icon: <LogIn />, path: "/user/sign-in" },
    { label: t("sign_up"), icon: <LogIn />, path: "/user/sign-up" },
    { label: t("header_sign_out"), icon: <LogOut />, path: "/user/sign-in" },
  ];

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
