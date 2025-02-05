import { useState } from "react";
import { IProduct } from "src/types/product.type";

interface IinitialState {
  page: number;
  productsOnPage: number;
  filteredProductList: IProduct[];
}

export const usePagination = (initialState: IinitialState) => {
  const [productsOnPage, setProductsOnPage] = useState(
    initialState.productsOnPage
  );
  const [filteredProductList, setFilteredProductList] = useState(
    initialState.filteredProductList
  );
  const [page, setPage] = useState(initialState.page);

  const start = (page - 1) * productsOnPage;
  const displayedProducts = filteredProductList.slice(
    start,
    start + productsOnPage
  );

  return {
    displayedProducts,
    productsOnPage,
    page,
    setPage,
    setFilteredProductList,
    setProductsOnPage,
  };
};
