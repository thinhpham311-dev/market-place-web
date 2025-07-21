import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Review } from '@/features/reviews/types';

interface ReviewsState {
    reviews: Review[];
}

const initialState: ReviewsState = {
    reviews: [],
};


export const productSlice = createSlice({
    name: 'submit',
    initialState,
    reducers: {
        addReview(state, action: PayloadAction<Omit<Review, 'user'>>) {
            const newReview = { ...action.payload, user: 'Anonymous' }; // Replace with actual user data
            state.reviews.unshift(newReview);
        },
    },
})

export const { addReview } = productSlice.actions
export default productSlice.reducer