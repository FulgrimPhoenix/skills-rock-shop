import { Header } from "src/components/Header/Header";
import { StoreRoot } from "./Store.styles";
import { Paginator } from "src/components/Paginator/Paginator";

export const Store = () => {
  return (
    <StoreRoot>
      <Header />
      <Paginator />
    </StoreRoot>
  );
};
