import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui';
import { cn } from '@/lib/utils';

interface CartItemImageProps {
    src: string;
    alt: string;
    className?: string;
}

const CartItemImage: React.FC<CartItemImageProps> = ({ src, alt, className }) => {
    return (
        <Card className={cn(className, "border-none shadow-none")}>
            <CardContent className='p-0'>
                <Image
                    src={src}
                    alt={alt}
                    layout="responsive"
                    className='aspect-square'
                    width={500}
                    height={500}
                />
            </CardContent>
        </Card>
    );
};

export default CartItemImage;