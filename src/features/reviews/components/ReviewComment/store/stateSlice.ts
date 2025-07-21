import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface ReviewsState {
    text: string
}

const initialState: ReviewsState = {
    text: ""
};


export const stateSlice = createSlice({
    name: 'comment/state',
    initialState,
    reducers: {
        setComment(state, action: PayloadAction<string>) {
            state.text = action.payload;
        },
        resetComment(state) {
            state.text = initialState.text
        }
    },
})

export const { setComment, resetComment } = stateSlice.actions
export default stateSlice.reducer