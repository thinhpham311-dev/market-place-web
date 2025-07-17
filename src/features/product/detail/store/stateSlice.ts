import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Review } from "@/features/product/detail/types"

interface ProductState {
    current: number;
    reviews: Review[];
}


const initialState: ProductState = {
    current: 0,
    reviews: [],

};

const stateSlice = createSlice({
    name: "product/state",
    initialState,
    reducers: {
        setCurrent: (state, action: PayloadAction<number>) => {
            state.current = action.payload;
        },
        setInitialReviews(state, action: PayloadAction<Review[]>) {
            state.reviews = action.payload;
        },
        addReview(state, action: PayloadAction<Omit<Review, 'user'>>) {
            const newReview = { ...action.payload, user: 'Anonymous' }; // Replace with actual user data
            state.reviews.unshift(newReview);
        },
    },
});

export const { setCurrent, setInitialReviews, addReview } = stateSlice.actions;
export default stateSlice.reducer;
