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
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/interfaces/common/menu.interface";


const items: MenuItem[] = [
    {
        type: "link",
        title: "Shop Live",
        icon: CgMediaLive,
        url: "/"
    },
    {
        type: "link",
        title: "Flash Sale",
        icon: IoIosFlash,
        url: "/"
    },
    {
        type: "group",
        title: "Categories",
        icon: ShoppingBasket,
        children: [
            { type: "link", title: "Product Type 1", url: "/category-1" },
            { type: "link", title: "Product Type 2", url: "/category-2" },
        ],
    },
    {
        type: "group",
        title: "Stores Saved",
        icon: Store,
        children: [
            { type: "link", title: "Shop 1", url: "/shop/shop-1" },
            { type: "link", title: "Shop 2", url: "/shop/shop-2" },
        ],
    },
];

const profileMenuItems: MenuItem[] = [
    {
        type: "group",
        title: "My Account",
        icon: User,
        children: [
            { type: "link", title: "Profile Info", url: "/user/account/profile" },
            { type: "link", title: "Change Password", url: "/user/account/change-password" },
            { type: "link", title: "Privacy Settings", url: "/user/account/privacy-settings" },
        ],
    },
    {
        type: "group",
        title: "My Purchase",
        icon: ShoppingBag,
        children: [{ type: "link", title: "Orders", url: "/user/purchase/orders" }],
    },
    {
        type: "group",
        title: "Notifications",
        icon: Bell,
        children: [
            { type: "link", title: "Order Update", url: "/user/notifications/order-update" },
            { type: "link", title: "Promotions", url: "/user/notifications/promotions" },
            { type: "link", title: "Wallet Update", url: "/user/notifications/wallet-update" },
            { type: "link", title: "Market Place Update", url: "/user/notifications/marketplace-update" },
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
