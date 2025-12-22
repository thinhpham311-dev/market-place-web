import { MenuItem } from "@/interfaces/common/menu.interface";
import {
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

interface SidebarMenuItemProps {
    item: MenuItem;
    pathname: string;
}

function MenuItems({ item, pathname }: SidebarMenuItemProps) {
    if (item.type === "group") {
        return (
            <SidebarMenuItem>
                <div className="flex items-center space-x-2 p-2 font-medium">
                    {item.icon && <item.icon className="h-5 w-5" />}
                    <span>{item.title}</span>
                </div>

                <ul className="ml-4 border-l pl-4">
                    {item.children?.map((child) => (
                        <MenuItems
                            key={child.title}
                            item={child}
                            pathname={pathname}
                        />
                    ))}
                </ul>
            </SidebarMenuItem>
        );
    }

    // 👇 item is LinkMenuItem here (auto narrow)
    const isActive = pathname === item?.url;

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <a
                    href={item.url}
                    className={`flex items-center space-x-2 p-2 rounded-md ${isActive ? "bg-background" : "hover:bg-background"
                        }`}
                    aria-current={isActive ? "page" : undefined}
                >
                    {item.icon && <item.icon className="h-5 w-5" aria-hidden />}
                    <span>{item.title}</span>
                </a>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

export default MenuItems;
