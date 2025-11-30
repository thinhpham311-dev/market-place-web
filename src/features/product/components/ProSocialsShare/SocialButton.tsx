"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ISocialButtonProps {
    label: string;
    link: string;
    icon: React.ReactElement;
}

export default function SocialButton({ label, link, icon }: ISocialButtonProps) {
    const router = useRouter();

    return (
        <Button
            key={label.split(" ").join("-")}
            variant="outline"
            size="icon"
            onClick={() => router.push(link)}
        >
            {icon}
        </Button>
    );
}
