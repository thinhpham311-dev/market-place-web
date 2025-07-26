'use client'
import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBasket, Store, User, ArrowLeft, ShoppingBag, Bell } from "lucide-react";
import { IoIosFlash } from "react-icons/io";
import { MdLogout } from "react-icons/md";

import { CgMediaLive } from "react-icons/cg";
import MenuItems from "./MenuItems";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarGroupLabel,
    SidebarFooter,
    SidebarHeader
} from "@/components/ui";
import { Button } from "@/components/ui";

interface MenuItem {
    title: string;
    url?: string;
    icon?: React.ComponentType<{ className?: string }>;
    children?: MenuItem[];
}

const items: MenuItem[] = [
    {
        title: "Shop Live",
        icon: CgMediaLive
    },
    {
        title: "Flash Sale",
        icon: IoIosFlash
    },
    {
        title: "Categories",
        icon: ShoppingBasket,
        children: [
            { title: "Product Type 1", url: "/category-1" },
            { title: "Product Type 2", url: "/category-2" },
        ],
    },
    {
        title: "Stores Saved",
        icon: Store,
        children: [
            { title: "Shop 1", url: "/shop/shop-1" },
            { title: "Shop 2", url: "/shop/shop-2" },
        ],
    },
];

const profileMenuItems: MenuItem[] = [
    {
        title: "My Account",
        icon: User,
        children: [
            { title: "Profile Info", url: "/user/account/profile" },
            { title: "Change Password", url: "/user/account/change-password" },
            { title: "Privacy Settings", url: "/user/account/privacy-settings" },
        ],
    },
    {
        title: "My Purchase",
        icon: ShoppingBag,
        children: [{ title: "Orders", url: "/user/purchase/orders" }],
    },
    {
        title: "Notifications",
        icon: Bell,
        children: [
            { title: "Order Update", url: "/user/notifications/order-update" },
            { title: "Promotions", url: "/user/notifications/promotions" },
            { title: "Wallet Update", url: "/user/notifications/wallet-update" },
            { title: "Market Place Update", url: "/user/notifications/marketplace-update" },
        ],
    },
];



export default function SidebarNavigation() {
    const pathname = usePathname() ?? "/";;
    const router = useRouter();
    const conditionMenu = useMemo(() => pathname.split("/")[1] === "user", [pathname]);
    const menuToRender = conditionMenu ? profileMenuItems : items;

    return (
        <Sidebar aria-label="Main Navigation">
            <SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupLabel className="font-bold text-xl px-0">
                        <Button
                            type="button"
                            className="w-full"
                            variant="outline"
                            onClick={() => router.push("/")}
                        >
                            <span>
                                <ArrowLeft />
                            </span>
                            Back to Home
                        </Button>
                    </SidebarGroupLabel>
                </SidebarGroup>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="space-y-3">
                    <SidebarGroupContent className="flex flex-col h-full">
                        <SidebarMenu className="flex-1" aria-labelledby="application-group">
                            {menuToRender.map((item) => (
                                <MenuItems
                                    key={item.title}
                                    item={item}
                                    isActive={pathname === item.url}
                                    pathname={pathname}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                {
                    conditionMenu && <SidebarMenuButton className="space-x-1 text-white hover:text-white bg-red-500 hover:bg-red-700">
                        <MdLogout className="h-5 w-5" aria-hidden="true" />
                        <span>Log Out</span>
                    </SidebarMenuButton>
                }
            </SidebarFooter>
        </Sidebar>
    );
}
