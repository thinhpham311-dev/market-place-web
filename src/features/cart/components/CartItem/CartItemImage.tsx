import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui';
import { cn } from '@/lib/utils';

interface CartItemImageProps {
    _w: number;
    _h: number;
    src: string;
    alt: string;
    className?: string;
    imgClassName?: string;
}

const CartItemImage: React.FC<CartItemImageProps> = ({ src, alt, imgClassName, className, _w, _h }) => {
    return (
        <Card className={cn(className, "border-none shadow-none bg-transparent")}>
            <CardContent className='p-0'>
                <Image
                    src={"https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png"}
                    alt={alt}
                    className={cn(imgClassName, 'aspect-square')}
                    priority
                    width={_w}
                    height={_h}
                />
            </CardContent>
        </Card>
    );
};

export default CartItemImage;