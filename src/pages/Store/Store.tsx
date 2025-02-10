import { Header } from "src/components/Header/Header";
import { StoreRoot } from "./Store.styles";
import { ProductList } from "src/components/ProductList/ProductList";
import { AddProductPopup } from "src/components/AddProductPopup/AddProductPopup";
import { CartPopup } from "src/components/CartPopup/CartPopup";
import { EditProductPopup } from "src/components/EditProductPopup/EditProductPopup";

export const Store = () => {
  return (
    <StoreRoot>
      <Header />
      <ProductList />
      <AddProductPopup />
      <CartPopup />
      <EditProductPopup />
    </StoreRoot>
  );
};
