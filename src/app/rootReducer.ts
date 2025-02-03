import { combineReducers } from "@reduxjs/toolkit";
import { productsSlice } from "../features/products/productsSlice";

const rootReducer = combineReducers({
  [productsSlice.name]: productsSlice.reducer,
});

export default rootReducer;
