import { combineReducers } from '@reduxjs/toolkit'
import cart from './cartSlice'

const reducer = combineReducers({
    cart
})

export default reducer