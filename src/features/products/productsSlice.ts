import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "src/types/product.type";

const initialState: IProduct[] = [
  {
    id: "1",
    title: "Fire warriors",
    description: "base Tau Empire infantry",
    price: 2000,
    remained: 5,
  },
];

export const productsSlice = createSlice({
  name: "product_list",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      const newProduct = { ...action.payload, id: `${Date.now()}` };
      state.push(newProduct);
    },
    editProduct: (state, action: PayloadAction<IProduct>) => {
      let targetProductIndex = state.findIndex(
        (el) => el.id === action.payload.id
      );
      if (targetProductIndex !== -1) {
        state[targetProductIndex] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      return state.filter((el) => el.id !== action.payload);
    },
  },
});

export const { addProduct, editProduct, deleteProduct } = productsSlice.actions;
