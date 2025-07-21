import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ReviewsState {
    rating: number;
}

const initialState: ReviewsState = {
    rating: 0
};


export const stateSlice = createSlice({
    name: 'rating',
    initialState,
    reducers: {
        setRating(state, action: PayloadAction<number>) {
            state.rating = action.payload;
        },
        resetRating(state) {
            state.rating = initialState.rating
        }
    },
})

export const { setRating, resetRating } = stateSlice.actions
export default stateSlice.reducer