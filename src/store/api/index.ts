import { combineReducers } from "@reduxjs/toolkit";
import cache from "./cacheSlice";

const reducer = combineReducers({
  cache,
});

export default reducer;
