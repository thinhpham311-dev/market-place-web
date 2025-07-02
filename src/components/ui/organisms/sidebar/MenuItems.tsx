import { IMenuItem } from "@/types/menu";

import {
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/provider";

interface ISidebarMenuItemProps {
    item: IMenuItem;
    isActive: boolean;
    pathname: string;
};

function MenuItems({ item, isActive, pathname }: ISidebarMenuItemProps) {
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
                        <MenuItems
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

export default MenuItems;