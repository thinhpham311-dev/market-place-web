import React from 'react';
import { DropdownMenu } from "@/components/ui";

const MiniCartDropdownContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <DropdownMenu>
            {children}
        </DropdownMenu>
    );
};

export default MiniCartDropdownContainer;
