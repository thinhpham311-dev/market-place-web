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
      <BreadcrumbLink href={href} className="flex items-center gap-x-2.5 text-sm leading-none">
        <Icon size={15} className="shrink-0" />
        <span>{label}</span>
      </BreadcrumbLink>
    </BreadcrumbItem>
  );
}
