"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/molecules";
import { Button } from "@/components/ui/atoms";

//icons
import { FaFacebook } from "react-icons/fa"

const socialsListData = [
    {
        label: "facebook",
        icon: <FaFacebook />,
        link: "https://www.facebook.com/"
    },
]

export default function ShareSocialsList() {
    const router = useRouter()
    return (
        <Card className="flex flex-row items-center gap-2 border-none shadow-none">
            <CardHeader className="p-0">
                <CardTitle className="flex items-center"><span className="text-xs font-bold">Share:</span></CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {
                    socialsListData.map(item => {
                        return (
                            <Button key={item.label.split(" ").join("-")} variant="outline" size="icon" onClick={() => router.push(item.link)}>
                                {item.icon}
                            </Button>
                        )
                    })
                }
            </CardContent>
        </Card>
    );
}

