import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Review {
    rating: number;
    comment: string;
    user: string;
}

interface ReviewsState {
    reviews: Review[];
}

const initialState: ReviewsState = {
    reviews: [],
};


export const productSlice = createSlice({
    name: 'review/state',
    initialState,
    reducers: {
        setInitialReviews(state, action: PayloadAction<Review[]>) {
            state.reviews = action.payload;
        },
        addReview(state, action: PayloadAction<Omit<Review, 'user'>>) {
            const newReview = { ...action.payload, user: 'Anonymous' }; // Replace with actual user data
            state.reviews.unshift(newReview);
        },
    },
})

export const { setInitialReviews, addReview } = productSlice.actions
export default productSlice.reducer