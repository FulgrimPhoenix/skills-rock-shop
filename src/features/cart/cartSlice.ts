import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "src/types/product.type";

interface IinitialState extends IProduct {
  quantity: number;
}

const initialState: IinitialState[] = [];

export const cartSlice = createSlice({
  name: "cart_list",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<IProduct>) => {
      let targetProductIndex = state.findIndex(
        (el) => el.id === action.payload.id
      );
      if (targetProductIndex !== -1) {
        const newProductInCart = { ...action.payload, quantity: 0 };
        state.push(newProductInCart);
      } else {
        state[targetProductIndex].quantity += 1;
      }
    },

    deleteProductFromCart: (state, action: PayloadAction<string>) => {
      let targetProductIndex = state.findIndex(
        (el) => el.id === action.payload
      );
      state[targetProductIndex].quantity -= 1;
      if (state[targetProductIndex].quantity - 1 === 0) {
        return state.filter((el) => el.id !== action.payload);
      } else {
        state[targetProductIndex].quantity -= 1;
      }
    },
  },
});

export const { addProductToCart, deleteProductFromCart } = cartSlice.actions;
