import { Grid2 } from "@mui/material";
import { useAppSelector } from "src/app/store";
import { ProductCard } from "../ProductCard/ProductCard";
import { PaginatorRoot } from "./Paginator.styles";

export const Paginator = () => {
  const productList = useAppSelector((state) => state.product_list);
  return (
    <PaginatorRoot container spacing={3}>
      {productList.map((el) => (
        <Grid2>
          <ProductCard
            id={el.id}
            title={el.title}
            avatar={el.avatar}
            description={el.description}
            price={el.price}
            remained={el.remained}
          />
        </Grid2>
      ))}
    </PaginatorRoot>
  );
};
