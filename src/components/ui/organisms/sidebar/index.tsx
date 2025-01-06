'use client'
import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBasket, Store, User, ArrowLeft, ShoppingBag, Bell } from "lucide-react";
import { MdLogout } from "react-icons/md";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroupLabel,
    SidebarFooter,
    SidebarHeader
} from "@/components/provider";
import { Button } from "../../atoms";

interface MenuItem {
    title: string;
    url?: string;
    icon?: React.ComponentType<{ className?: string }>;
    children?: MenuItem[];
}

const items: MenuItem[] = [
    {
        title: "Products",
        icon: ShoppingBasket,
        children: [
            { title: "Category 1", url: "/category-1" },
            { title: "Category 2", url: "/category-2" },
        ],
    },
    {
        title: "Stores",
        icon: Store,
        children: [
            { title: "Category 1", url: "/category-1" },
            { title: "Category 2", url: "/category-2" },
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
            { title: "Order History", url: "/user/account/orders" },
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

type SidebarMenuItemProps = {
    item: MenuItem;
    isActive: boolean;
    pathname: string;
};

function SidebarMenuItemComponent({ item, isActive, pathname }: SidebarMenuItemProps) {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <a
                    href={item.url || "#"}
                    className={`flex items-center space-x-2 p-2 rounded-md ${isActive ? "bg-background" : "hover:bg-background"
                        }`}
                    aria-current={isActive ? "page" : undefined}
                >
                    {item.icon && <item.icon className="h-5 w-5" aria-hidden="true" />}
                    <span>{item.title}</span>
                </a>
            </SidebarMenuButton>
            {item.children && (
                <ul className="ml-4 border-l border-gray-300 pl-4">
                    {item.children.map((child) => (
                        <SidebarMenuItemComponent
                            key={child.title}
                            item={child}
                            isActive={pathname === child.url}
                            pathname={pathname}
                        />
                    ))}
                </ul>
            )}
        </SidebarMenuItem>
    );
}

export default function SidebarNavigation() {
    const pathname = usePathname();
    const router = useRouter();
    const conditionMenu = useMemo(() => pathname.split("/")[1] === "user", [pathname]);
    const menuToRender = conditionMenu ? profileMenuItems : items;

    return (
        <Sidebar aria-label="Main Navigation">
            <SidebarHeader>
                {conditionMenu && (
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
                )}
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="space-y-3">
                    <SidebarGroupContent className="flex flex-col h-full">
                        <SidebarMenu className="flex-1" aria-labelledby="application-group">
                            {menuToRender.map((item) => (
                                <SidebarMenuItemComponent
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
                <SidebarMenuButton className="space-x-2 bg-red-500 hover:bg-red-700">
                    <MdLogout className="h-5 w-5" aria-hidden="true" />
                    <span>Log Out</span>
                </SidebarMenuButton>
            </SidebarFooter>
        </Sidebar>
    );
}
