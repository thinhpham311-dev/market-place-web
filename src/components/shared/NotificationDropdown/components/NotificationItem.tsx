import { ReactNode } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface Props {
  icon: ReactNode;
  title: string;
}

export default function NotificationItem({ icon, title }: Props) {
  return (
    <DropdownMenuItem className="flex items-start gap-2">
      {icon}
      <span className="text-sm">{title}</span>
    </DropdownMenuItem>
  );
}
