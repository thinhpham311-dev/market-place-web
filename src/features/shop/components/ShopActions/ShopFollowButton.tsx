"use client";

import React from "react";
import { Button } from "@/components/ui";
import { UserCheck, UserPlus } from "lucide-react";

interface ShopFollowButtonProps {
    isFollowing: boolean;
    onToggleFollow: () => void;
}

const ShopFollowButton: React.FC<ShopFollowButtonProps> = ({ isFollowing, onToggleFollow }) => {
    return (
        <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={onToggleFollow}
        >
            {isFollowing ? (
                <>
                    <UserCheck className="w-4 h-4 mr-1" />
                    <span>Following</span>
                </>
            ) : (
                <>
                    <UserPlus className="w-4 h-4 mr-1" />
                    <span>Follow</span>
                </>
            )}
        </Button>
    );
};

export default ShopFollowButton;
