"use client"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "../../molecules";
import { Tally1 } from "lucide-react"

export default function Panel() {

    return (
        <div className="w-full border-b sticky top-0 z-50 bg-background">
            <div className="flex h-10 items-center justify-between md:px-6 px-3 container mx-auto">

                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">
                                Seller Centre
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Tally1 className="ml-0 -mr-2" />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">
                                Download
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>


            </div>
        </div>
    );
}
