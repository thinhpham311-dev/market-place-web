"use client";

import * as React from "react";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui";
import { IProduct } from "../../types";


interface ISocialsShareProps {
    data: IProduct
}

export default function ProInfo({ data: { product_name, product_price } }: ISocialsShareProps) {
    return (
        <Card className="border-none shadow-none space-y-5">
            <CardHeader className="p-0">
                <CardTitle className="flex items-center">{product_name}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <CardDescription>
                    <ul className="list-none">
                        <li>
                            <span>${product_price}</span>
                        </li>
                    </ul>
                </CardDescription>
            </CardContent>
        </Card>
    );
}

