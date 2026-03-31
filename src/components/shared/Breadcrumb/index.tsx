"use client";

import { Breadcrumb, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tally1 } from "lucide-react";
import BreadcrumbLinkItem from "./components/BreadcrumbLinkItem";
import { Warehouse, ArrowDownToLine } from "lucide-react";
import { useTranslation } from "@/lib/hooks";

export default function AdminBreadcrumb() {
  const { t } = useTranslation();
  const breadcrumbItems = [
    {
      label: t("admin_seller_centre"),
      href: "/admin",
      icon: Warehouse,
    },
    {
      label: t("admin_download"),
      href: "/admin/download",
      icon: ArrowDownToLine,
    },
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-2 sm:gap-3">
        {breadcrumbItems.map((item, index) => (
          <div key={item.href} className="flex items-center gap-2">
            <BreadcrumbLinkItem href={item.href} label={item.label} icon={item.icon} />
            {index < breadcrumbItems.length - 1 && (
              <BreadcrumbSeparator className="mx-0.5">
                <Tally1 className="text-muted-foreground" size={12} />
              </BreadcrumbSeparator>
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
