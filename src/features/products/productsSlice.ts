import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PRODUCTS_LIST } from "src/components/ProductList/ProductList.const";
import { IProduct } from "src/types/product.type";

interface IProductList {
  paginationParams: {
    page: number;
    productsOnPage: number;
  };
  searchParams: {
    title: string;
    isRemained: boolean;
    priceRange: { min: number; max: number };
  };
  productList: IProduct[];
  filteredProductList: IProduct[];
}

const initialState: IProductList = {
  paginationParams: {
    page: 1,
    productsOnPage: 10,
  },
  searchParams: {
    title: "",
    isRemained: true,
    priceRange: {
      min: 0,
      max: PRODUCTS_LIST.reduce(
        (acc: number, el: IProduct) =>
          Number(el.price) > acc ? (acc = Number(el.price)) : acc,
        0
      ),
    },
  },
  productList: PRODUCTS_LIST,
  filteredProductList: PRODUCTS_LIST.filter((el) => Boolean(el.remained)),
};

export const productsSlice = createSlice({
  name: "product_list",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      const newProduct = { ...action.payload, id: `${Date.now()}` };
      state.productList.push(newProduct);
      state.filteredProductList.push(newProduct);
    },
    editProduct: (state, action: PayloadAction<IProduct>) => {
      let targetProductIndex = state.productList.findIndex(
        (el) => el.id === action.payload.id
      );
      if (targetProductIndex !== -1) {
        state.productList[targetProductIndex] = action.payload;
        state.filteredProductList[targetProductIndex] =
          state.productList[targetProductIndex];
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.productList = state.productList.filter(
        (el) => el.id !== action.payload
      );
      state.filteredProductList = state.filteredProductList.filter(
        (el) => el.id !== action.payload
      );
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.paginationParams.page = action.payload;
      const rangeStart =
        (state.paginationParams.page - 1) *
        state.paginationParams.productsOnPage;

      state.filteredProductList = state.productList.slice(
        rangeStart,
        rangeStart + state.paginationParams.productsOnPage
      );
    },
    setProductOnPage: (
      state,
      action: PayloadAction<number | Partial<IProductList["searchParams"]>>
    ) => {
      if (typeof action.payload === "number") {
        state.paginationParams.productsOnPage = action.payload;
      } else if (
        typeof action.payload === "object" &&
        action.payload !== null
      ) {
        state.searchParams = { ...state.searchParams, ...action.payload };
      }

      const rangeStart =
        (state.paginationParams.page - 1) *
        state.paginationParams.productsOnPage;

      const { title, priceRange, isRemained } = state.searchParams;

      state.filteredProductList = state.productList.filter(
        (el) =>
          el.title.match(title) &&
          Number(el.price) <= priceRange.max &&
          Number(el.price) >= priceRange.min &&
          (isRemained ? Boolean(el.remained) : true)
      );

      state.filteredProductList = state.filteredProductList.slice(
        rangeStart,
        rangeStart + state.paginationParams.productsOnPage
      );
    },
  },
});

export const {
  addProduct,
  editProduct,
  deleteProduct,
  setPage,
  setProductOnPage,
} = productsSlice.actions;
