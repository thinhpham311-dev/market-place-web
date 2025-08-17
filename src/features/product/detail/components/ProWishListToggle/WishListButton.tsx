"use client";

import * as React from "react";
import { Button } from "@/components/ui";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";



export default function WishListButon() {
    const [like, setLike] = React.useState(false)

    return (
        <Button variant="outline" size="icon" onClick={() => setLike(!like)}>
            {like ? <FcLike /> : <FcLikePlaceholder />}
        </Button>
    );
}
