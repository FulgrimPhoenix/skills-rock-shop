import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "src/types/product.type";

const initialState: IProduct[] = [
  {
    id: "1",
    title: "Fire warriors",
    avatar:
      "https://avatars.mds.yandex.net/get-marketpic/1578323/market_q9QLG7LmszbpccsfhuKvKQ/orig",
    description: "Base Tau Empire infantry",
    price: 2000,
    remained: 5,
  },
  {
    id: "2",
    title: "Fire warriors",
    avatar:
      "https://i.pinimg.com/originals/7f/7f/ae/7f7fae1b6bb95e6f183d55e6ced7bd4b.jpg",
    description: "Base Tau Empire infantry",
    price: 2000,
    remained: 5,
  },
  {
    id: "3",
    title: "Fire warriors",
    avatar:
      "https://avatars.mds.yandex.net/get-marketpic/1578323/market_q9QLG7LmszbpccsfhuKvKQ/orig",
    description: "Base Tau Empire infantry",
    price: 2000,
    remained: 5,
  },
  {
    id: "4",
    title: "Fire warriors",
    avatar:
      "https://avatars.mds.yandex.net/get-marketpic/1578323/market_q9QLG7LmszbpccsfhuKvKQ/orig",
    description: "Base Tau Empire infantry",
    price: 2000,
    remained: 5,
  },
  {
    id: "5",
    title: "Fire warriors",
    avatar:
      "https://avatars.mds.yandex.net/get-marketpic/1578323/market_q9QLG7LmszbpccsfhuKvKQ/orig",
    description: "Base Tau Empire infantry",
    price: 2000,
    remained: 5,
  },
  {
    id: "6",
    title: "Fire warriors",
    avatar:
      "https://i.pinimg.com/originals/7f/7f/ae/7f7fae1b6bb95e6f183d55e6ced7bd4b.jpg",
    description: "Base Tau Empire infantry",
    price: 2000,
    remained: 5,
  },
  {
    id: "7",
    title: "Fire warriors",
    avatar:
      "https://avatars.mds.yandex.net/get-marketpic/1578323/market_q9QLG7LmszbpccsfhuKvKQ/orig",
    description: "Base Tau Empire infantry",
    price: 2000,
    remained: 5,
  },
  {
    id: "8",
    title: "Fire warriors",
    avatar:
      "https://avatars.mds.yandex.net/get-marketpic/1578323/market_q9QLG7LmszbpccsfhuKvKQ/orig",
    description: "Base Tau Empire infantry",
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
