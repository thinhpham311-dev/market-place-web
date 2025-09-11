'use client';

import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { forwardRef } from 'react';
import { type ButtonProps } from '@/components/ui/button';

const NotificationButton = forwardRef<HTMLButtonElement, ButtonProps & { count: number }>(
    ({ count, ...props }, ref) => {
        return (
            <Button ref={ref} variant="ghost" size="icon" className="relative focus-within:outline-none" {...props}>
                <Bell className="h-5 w-5" />
                {count > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                        {count}
                    </span>
                )}
            </Button>
        );
    }
);

NotificationButton.displayName = 'NotificationButton';
export default NotificationButton;
