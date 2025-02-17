import { TAppState } from "src/app/store";

export const getProductListState = (state: TAppState) => {
  return state.product_list;
};
