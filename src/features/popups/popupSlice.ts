import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "src/types/product.type";

interface IinitialState {
  currentPopup: "Edit the product" | "Add new product" | "Cart" | null;
  isPopupOpen: {
    isProductPopupOpen: boolean;
    isCartPopupOpen: boolean;
  };
  focusedProduct: IProduct;
}

const initialState: IinitialState = {
  currentPopup: null,
  isPopupOpen: {
    isProductPopupOpen: false,
    isCartPopupOpen: false,
  },
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
      action: PayloadAction<{
        variant: keyof IinitialState["isPopupOpen"];
        title?: IinitialState["currentPopup"];
      }>
    ) => {
      state.isPopupOpen[action.payload.variant] =
        !state.isPopupOpen[action.payload.variant];
      if (action.payload.title) {
        state.currentPopup = action.payload.title;
      }
    },
    setFocusedProduct: (state, action: PayloadAction<IProduct>) => {
      state.focusedProduct = action.payload;
    },
  },
});

export const { togglePopup, setFocusedProduct } = popupsSlice.actions;
