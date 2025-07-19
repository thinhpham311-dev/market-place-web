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
        <Card layout="horizontal" className="items-center">
            <CardHeader className="p-3">
                <CardTitle className="flex items-center"><span className="text-xs font-bold">Share:</span></CardTitle>
            </CardHeader>
            <CardContent className=" space-x-2 p-3">
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

