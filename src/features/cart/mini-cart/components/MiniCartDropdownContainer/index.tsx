import React from "react";
import { DropdownMenu } from "@/components/ui";

interface IMiniCartDropdownContainerProps {
    children: React.ReactNode;
}

const MiniCartDropdownContainer = React.forwardRef<HTMLDivElement, IMiniCartDropdownContainerProps>(
    ({ children }, ref) => {
        return (
            <div ref={ref}>
                <DropdownMenu>
                    {children}
                </DropdownMenu>
            </div>
        );
    }
);

MiniCartDropdownContainer.displayName = "MiniCartDropdownContainer";

export default MiniCartDropdownContainer;
