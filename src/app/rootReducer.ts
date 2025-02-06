import { combineReducers } from "@reduxjs/toolkit";
import { productsSlice } from "../features/products/productsSlice";
import { popupsSlice } from "src/features/popups/popupSlice";
import { cartSlice } from "src/features/cart/cartSlice";

const rootReducer = combineReducers({
  [productsSlice.name]: productsSlice.reducer,
  [popupsSlice.name]: popupsSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
});

export default rootReducer;
