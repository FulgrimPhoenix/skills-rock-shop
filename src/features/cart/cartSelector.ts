import { TAppState } from "src/app/store";
import { IProduct } from "src/types/product.type";

export const getCartList = (state: TAppState) => {
  return state.cart_list;
};

export const getTotalPriceOfCart = (state: TAppState) => {
  return state.cart_list.reduce(
    (acc: number, el: IProduct & { quantity: number }): number =>
      acc + Number(el.price) * el.quantity,
    0
  );
};
