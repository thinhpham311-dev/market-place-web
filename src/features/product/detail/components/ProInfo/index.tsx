"use client";

import * as React from "react";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui";
import ProductPrice from "./ProductPrice"
import { Product } from "./types";


interface ISocialsShareProps {
    data: Product
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
                            <ProductPrice
                                price={product_price}
                            />
                        </li>
                    </ul>
                </CardDescription>
            </CardContent>
        </Card>
    );
}

