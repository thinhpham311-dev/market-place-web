'use client'
import { usePathname } from "next/navigation";
import { ShoppingBasket, Store, User, Receipt } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/provider";

// Định nghĩa kiểu cho mục menu
interface MenuItem {
    title: string;
    url?: string;
    icon?: React.ComponentType<{ className?: string }>;
    children?: MenuItem[]; // Hỗ trợ danh mục con
}

// Menu items mặc định
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

// Menu items cho profile user
const profileMenuItems: MenuItem[] = [
    {
        title: "Profile Info",
        url: "/profile/info",
        icon: User,
    },
    {
        title: "Order History",
        url: "/profile/orders",
        icon: Receipt,
    }
];

type SidebarMenuItemProps = {
    item: MenuItem;
    isActive: boolean;
};

function SidebarMenuItemComponent({ item, isActive }: SidebarMenuItemProps) {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <a
                    href={item.url || "#"}
                    className={`flex items-center space-x-2 p-2 rounded-md ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
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
                            isActive={window.location.pathname === child.url}
                        />
                    ))}
                </ul>
            )}
        </SidebarMenuItem>
    );
}

export default function SidebarNavigation() {
    const pathname = usePathname()


    const menuToRender = pathname === "/auth" ? profileMenuItems : items;

    return (
        <Sidebar aria-label="Main Navigation">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu aria-labelledby="application-group">
                            {menuToRender.map((item) => (
                                <SidebarMenuItemComponent
                                    key={item.title}
                                    item={item}
                                    isActive={pathname === item.url}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}