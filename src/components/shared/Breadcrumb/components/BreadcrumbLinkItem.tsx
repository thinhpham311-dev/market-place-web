import { BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { LucideIcon } from "lucide-react";

interface Props {
  href: string;
  label: string;
  icon: LucideIcon;
}

export default function BreadcrumbLinkItem({ href, label, icon: Icon }: Props) {
  return (
    <BreadcrumbItem>
      <BreadcrumbLink href={href} className="flex items-center gap-x-2 text-sm">
        <Icon size={15} /> {label}
      </BreadcrumbLink>
    </BreadcrumbItem>
  );
}
