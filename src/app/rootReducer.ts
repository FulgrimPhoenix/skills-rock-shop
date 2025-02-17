import { combineReducers } from "@reduxjs/toolkit";
import { productsSlice } from "../features/products/productsSlice";
import { cartSlice } from "src/features/cart/cartSlice";

const rootReducer = combineReducers({
  [productsSlice.name]: productsSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
});

export default rootReducer;
