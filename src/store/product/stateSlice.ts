import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    avatar: '',
    userName: '',
    email: '',
    authority: []
}

export const productSlice = createSlice({
    name: 'product/state',
    initialState,
    reducers: {

    },
})

export const { } = productSlice.actions
export default productSlice.reducer