"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import NotificationButton from "./components/NotificationButton";
import NotificationList from "./components/NotificationList";

export default function NotificationDropdown() {
  const notificationCount = 3; // Có thể đến từ props hoặc Redux sau này

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <NotificationButton count={notificationCount} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <NotificationList />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
