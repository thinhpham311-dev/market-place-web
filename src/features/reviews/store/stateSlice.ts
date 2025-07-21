import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialReviews } from "../data"
import { Review } from '../types';

interface ReviewsState {
    reviewsList: Review[];
}

const initialState: ReviewsState = {
    reviewsList: initialReviews,
};


export const stateSlice = createSlice({
    name: 'review/state',
    initialState,
    reducers: {
        setInitialReviews(state, action: PayloadAction<Review[]>) {
            state.reviewsList = [...state.reviewsList, ...action.payload]
        }
    },
})

export const { setInitialReviews } = stateSlice.actions
export default stateSlice.reducer