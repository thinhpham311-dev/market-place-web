'use client';

import { useMemo } from 'react';

// Routers
import { useParams } from 'next/navigation';

// Components
import { Card } from '@/components/ui/molecules';
import { GalleryWithThumbnails } from '@/components/ui/organisms';
import ProductDetailInfo from './ProductDetailInfo';
import ProductDetailDescription from './ProductDetailDescription';
import ProductReview from './ProductReview'

// Data
import { images, productData } from '@/constants/data';

// Types
import { IProduct } from '@/types/product';

const initialReviews = [
    {
        rating: 5,
        comment: 'Excellent product! Highly recommend it.',
        user: 'John Doe',
    },
    {
        rating: 4,
        comment: 'Good quality but a bit expensive.',
        user: 'Jane Smith',
    },
];

export default function ProductDetailModule() {
    const { id } = useParams();

    const { product } = useMemo(() => {
        const product = productData?.find((item: IProduct) => item?.id === id);
        return { product };
    }, [id]);

    const handleReviewSubmission = (review: { rating: number; comment: string }) => {
        console.log('New review submitted:', review);
        // Logic to save the review, e.g., an API call
    };

    if (!product) return <div>Product not found</div>

    return (
        <Card layout="horizontal" className="grid lg:grid-cols-3 md:grid-cols-4 grid-cols-1 gap-5 md:px-6 px-3 space-y-5 my-6 border-none">
            <div className="p-0 space-y-4 lg:col-span-1 md:col-span-2 col-span-1">
                <GalleryWithThumbnails data={images} />
            </div>
            <ProductDetailInfo product={product} />
            <ProductDetailDescription />
            <ProductReview initialReviews={initialReviews} onSubmitReview={handleReviewSubmission} />
        </Card>
    );
}
