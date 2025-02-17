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
    priceRange: { min: 0, max: 1000 },
  },
  productList: PRODUCTS_LIST,
  filteredProductList: PRODUCTS_LIST,
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
      state.filteredProductList = state.productList;
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
    setProductOnPage: (state, action: PayloadAction<number>) => {
      state.paginationParams.productsOnPage = action.payload;
      const rangeStart =
        (state.paginationParams.page - 1) *
        state.paginationParams.productsOnPage;

      state.filteredProductList = state.productList.slice(
        rangeStart,
        rangeStart + state.paginationParams.productsOnPage
      );
    },
    filterProducts: (
      state,
      action: PayloadAction<IProductList["searchParams"]>
    ) => {
      const searchParams = state.searchParams;
      state.searchParams = { ...searchParams, ...action.payload };

      state.filteredProductList = state.productList.filter(
        (el) =>
          el.title.match(searchParams.title) &&
          Number(el.price) <= searchParams.priceRange.max &&
          Number(el.price) >= searchParams.priceRange.min &&
          (el.remained || !searchParams.isRemained)
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
