import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "src/types/product.type";

interface IinitialState {
  isAddProductPopupOpen: boolean;
  isEditProductPopupOpen: boolean;
  isCartPopupOpen: boolean;
  focusedProduct: IProduct;
}

const initialState: IinitialState = {
  isAddProductPopupOpen: false,
  isEditProductPopupOpen: false,
  isCartPopupOpen: false,
  focusedProduct: {
    id: "",
    title: "",
    avatar: "",
    description: "",
    price: 0,
    remained: 0,
  },
};

export const popupsSlice = createSlice({
  name: "popup_manager",
  initialState,
  reducers: {
    togglePopup: (
      state,
      action: PayloadAction<keyof Omit<IinitialState, "focusedProduct">>
    ) => {
      state[action.payload] = !state[action.payload];
    },
    setFocusedProduct: (state, action: PayloadAction<IProduct>) => {
      state.focusedProduct = action.payload;
    },
  },
});

export const { togglePopup, setFocusedProduct } = popupsSlice.actions;
