'use client';

import { Card, CardContent } from '@/components/ui';

export default function InfiniteScrollWrapper({ children }: { children?: React.ReactNode }) {

    return (
        <Card>
            <CardContent className='p-3'>
                {children}
            </CardContent>
        </Card>
    );
}
