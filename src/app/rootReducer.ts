import { combineReducers } from "@reduxjs/toolkit";
import { productsSlice } from "../features/products/productsSlice";
import { popupsSlice } from "src/features/popups/popupSlice";

const rootReducer = combineReducers({
  [productsSlice.name]: productsSlice.reducer,
  [popupsSlice.name]: popupsSlice.reducer,
});

export default rootReducer;
