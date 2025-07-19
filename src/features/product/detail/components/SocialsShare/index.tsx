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

export default function SocialsShare({ data }: ISocialsShareProps) {
    return (
        <Card layout="horizontal" className="border-none shadow-none items-center">
            <CardHeader className="p-3">
                <CardTitle className="flex items-center">
                    <span className="text-sm font-bold">Share:</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-x-2 p-3">
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
