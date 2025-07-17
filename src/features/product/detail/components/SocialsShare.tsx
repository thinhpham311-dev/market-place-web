"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";



interface ISocialsShareProps {
    data: {
        label: string;
        link: string;
        icon: React.ReactElement
    }[]
}

export default function SocialsShare({ data }: ISocialsShareProps) {
    const router = useRouter()
    return (
        <Card className="flex flex-row items-center  gap-4 border-none shadow-none">
            <CardHeader className="p-0">
                <CardTitle className="flex items-center"><span className="text-xs font-bold">Share:</span></CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-x-2">
                {
                    data.map(_ => {
                        return (
                            <Button key={_.label.split(" ").join("-")} variant="outline" size="icon" onClick={() => router.push(_.link)}>
                                {_.icon}
                            </Button>
                        )
                    })
                }
            </CardContent>
        </Card>
    );
}

