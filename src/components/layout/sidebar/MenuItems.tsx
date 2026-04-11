import Link from "next/link";
import { MenuItem } from "@/interfaces/common/menu.interface";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface SidebarMenuItemProps {
  item: MenuItem;
  pathname: string;
}

function isMenuItemActive(item: MenuItem, pathname: string): boolean {
  if (item.type === "link") {
    return pathname === item.url;
  }

  return item.children?.some((child) => isMenuItemActive(child, pathname)) ?? false;
}

function MenuItems({ item, pathname }: SidebarMenuItemProps) {
  if (item.type === "group") {
    const isActiveGroup = isMenuItemActive(item, pathname);

    return (
      <SidebarMenuItem>
        <div
          className={`flex items-center space-x-2 rounded-md p-2 font-medium ${
            isActiveGroup ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
          }`}
        >
          {item.icon && <item.icon className="h-5 w-5" />}
          <span>{item.title}</span>
        </div>

        <ul className="ml-4 border-l pl-4">
          {item.children?.map((child) => (
            <MenuItems
              key={child.type === "link" ? child.url : `${child.title}-${child}`}
              item={child}
              pathname={pathname}
            />
          ))}
        </ul>
      </SidebarMenuItem>
    );
  }

  const isActive = isMenuItemActive(item, pathname);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link
          href={item.url}
          className="flex items-center space-x-2 rounded-md p-2"
          aria-current={isActive ? "page" : undefined}
        >
          {item.icon && <item.icon className="h-5 w-5" aria-hidden />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default MenuItems;
