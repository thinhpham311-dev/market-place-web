import { combineReducers } from '@reduxjs/toolkit'
import cache from './apiCacheSlice'

const reducer = combineReducers({
    cache
})

export default reducer