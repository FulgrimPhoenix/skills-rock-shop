import { TAppState } from "src/app/store";
import { IProduct } from "src/types/product.type";

export const getProductListState = (state: TAppState) => {
  return state.product_list;
};

export const getFilteredProductListState = (state: TAppState) => {
  return state.product_list.filteredProductList;
};

export const getMaxPrice = (state: TAppState) => {
  return state.product_list.productList.reduce(
    (acc: number, el: IProduct) =>
      Number(el.price) > acc ? (acc = Number(el.price)) : acc,
    0
  );
};
