import { useEffect, useState } from "react";
import { useAppSelector } from "src/app/store";
import { IProduct } from "src/types/product.type";

interface IsearchParams {
  title: string;
  priceRange: { min: number; max: number };
  isRemained: boolean;
}

export const useProductFilter = (initialState: IProduct[]) => {
  const generalListOfProducts = useAppSelector((state) => state.product_list);

  const [filteredProductList, setFilteredProductList] = useState(initialState);
  const [searchParams, setSearchParams] = useState<IsearchParams>({
    title: "",
    priceRange: { min: 0, max: 10000 },
    isRemained: true,
  });

  useEffect(() => {
    const delayId = setTimeout(() => {
      if (searchParams) {
        setFilteredProductList(
          generalListOfProducts.filter(
            (el) =>
              el.title.match(searchParams.title) &&
              el.price <= searchParams.priceRange.max &&
              el.price >= searchParams.priceRange.min &&
              (el.remained || !searchParams.isRemained)
          )
        );
      }
    }, 50);

    return () => clearTimeout(delayId);
  }, [searchParams, generalListOfProducts]);

  return { filteredProductList, searchParams, setSearchParams };
};
