import { Header } from "src/components/Header/Header";
import { StoreRoot } from "./Store.styles";
import { ProductList } from "src/components/ProductList/ProductList";

export const Store = () => {
  return (
    <StoreRoot>
      <Header />
      <ProductList />
      {/* <ProductPopup /> */}
      {/* <CartPopup /> */}
    </StoreRoot>
  );
};
