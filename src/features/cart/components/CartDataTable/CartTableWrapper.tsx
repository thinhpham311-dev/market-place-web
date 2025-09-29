import React from 'react';
import { Card, CardContent, Table } from "@/components/ui"



const CartTableWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <Card className='w-full space-y-4 border-none shadow-none'>
            <CardContent className="bg-white rounded-lg border overflow-hidden p-0">
                <Table className='relative'>
                    {children}
                </Table>
            </CardContent>
        </Card>

    );
};

export default CartTableWrapper;
