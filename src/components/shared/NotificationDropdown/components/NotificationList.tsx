import NotificationItem from "./NotificationItem";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PackageCheck, MessageSquareText, AlertCircle } from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: <PackageCheck className="w-4 h-4 text-green-500" />,
    title: "Đơn hàng #1234 đã được giao",
  },
  {
    id: 2,
    icon: <MessageSquareText className="w-4 h-4 text-blue-500" />,
    title: "Bạn có tin nhắn mới",
  },
  {
    id: 3,
    icon: <AlertCircle className="w-4 h-4 text-yellow-500" />,
    title: "Cập nhật chính sách mới",
  },
];

export default function NotificationList() {
  if (notifications.length === 0) {
    return (
      <DropdownMenuItem disabled className="text-muted-foreground">
        Không có thông báo nào
      </DropdownMenuItem>
    );
  }

  return (
    <>
      {notifications.map((item) => (
        <NotificationItem key={item.id} icon={item.icon} title={item.title} />
      ))}
    </>
  );
}
