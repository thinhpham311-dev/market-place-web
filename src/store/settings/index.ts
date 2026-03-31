import { combineReducers } from "@reduxjs/toolkit";

import language from "./languageSlice";

const reducer = combineReducers({
  language,
});

export default reducer;
