import { Header } from "src/components/Header/Header";
import { StoreRoot } from "./Store.styles";
import { ProductList } from "src/components/ProductList/ProductList";
import { CartPopup } from "src/components/CartPopup/CartPopup";
import { ProductPopup } from "src/components/ProductPopup/ProductPopup";

export const Store = () => {
  return (
    <StoreRoot>
      <Header />
      <ProductList />
      <ProductPopup />
      <CartPopup />
    </StoreRoot>
  );
};
