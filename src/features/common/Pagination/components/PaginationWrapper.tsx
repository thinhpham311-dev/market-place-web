"use client";

import React from "react";
import { Pagination, PaginationContent } from "@/components/ui";

export default function PaginationWrapper({
    children,
}: { children: React.ReactNode }) {

    return (
        <Pagination>
            <PaginationContent>{children}</PaginationContent>
        </Pagination>
    );
}
