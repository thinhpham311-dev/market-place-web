"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import SocialButton from "./SocialButton";

interface ISocialsShareProps {
    data: {
        label: string;
        link: string;
        icon: React.ReactElement;
    }[];
}

export default function ProSocialsShare({ data }: ISocialsShareProps) {
    return (
        <Card layout="horizontal" className="border-none shadow-none items-center space-x-3">
            <CardHeader className="p-0">
                <CardTitle className="flex items-center">
                    <span className="text-sm font-bold uppercase">Share:</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-x-1 p-0">
                {data.map((item) => (
                    <SocialButton
                        key={item.label}
                        label={item.label}
                        link={item.link}
                        icon={item.icon}
                    />
                ))}
            </CardContent>
        </Card>
    );
}
