'use client';

//ui
import { Card } from '@/components/ui';

// Components
import ProductReview from './ProductReview'


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



export default function ProductDetail() {


    return (
        <Card className=" border-none shadow-none md:px-6 px-3 space-y-5 my-6">

            <ProductReview initialReviews={initialReviews} />
        </Card>
    );
}
