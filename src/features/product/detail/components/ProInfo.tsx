"use client";

import * as React from "react";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui";
import { IProduct } from "../../types";


interface ISocialsShareProps {
    data: IProduct
}

export default function ProInfo({ data: { product_name, product_price } }: ISocialsShareProps) {
    return (
        <Card className="border-none shadow-none">
            <CardHeader className="p-3">
                <CardTitle className="flex items-center">{product_name}</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
                <CardDescription>
                    <ul className="list-none">
                        <li>
                            <Card className="border-none shadown-none rounded-none bg-sidebar-primary-foreground" layout="horizontal">
                                <CardContent className="p-3">
                                    <h3 className="text-2xl">${product_price}</h3>
                                </CardContent>
                            </Card>
                        </li>
                    </ul>
                </CardDescription>
            </CardContent>
        </Card>
    );
}

