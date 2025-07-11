"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

//icons
import { FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa"
import { SiZalo } from "react-icons/si";


const socialsListData = [
    {
        label: "facebook",
        icon: <FaFacebook />,
        link: "https://www.facebook.com/"
    },
    {
        label: "zalo",
        icon: <SiZalo />,
        link: "https://www.facebook.com/"
    },
    {
        label: "tiktok",
        icon: <FaTiktok />,
        link: "https://www.facebook.com/"
    },
    {
        label: "instargram",
        icon: <FaInstagram />,
        link: "https://www.facebook.com/"
    },
]

export default function ShareSocialsList() {
    const router = useRouter()
    return (
        <Card className="flex flex-row items-center  gap-4 border-none shadow-none">
            <CardHeader className="p-0">
                <CardTitle className="flex items-center"><span className="text-xs font-bold">Share:</span></CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-x-2">
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

