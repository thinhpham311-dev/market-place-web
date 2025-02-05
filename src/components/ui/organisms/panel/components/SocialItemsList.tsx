"use client"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/molecules";
import { Tally1, ArrowDownToLine, Warehouse } from "lucide-react"

export default function SocialItemsList() {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/admin" className="flex items-center gap-x-2">
                        <Warehouse size={15} /> Seller Centre
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <Tally1 className="ml-0 -mr-2" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbLink href="#" className="flex items-center gap-x-2">
                        <ArrowDownToLine size={15} /> Download
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

    );
}
