import {
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import { useAppSelector } from "src/app/store";
import { ProductCard } from "../ProductCard/ProductCard";
import { PaginatorRoot, ProductGrid } from "./Paginator.styles";
import { useState } from "react";
import { PRODUCT_ON_PAGE_NUMBER } from "./Paginator.const";

export const Paginator = () => {
  const currentTheme = useTheme();
  const productList = useAppSelector((state) => state.product_list);
  const [page, setPage] = useState(1);
  const [productsOnPage, setProductsOnPage] = useState(10);
  const start = (page - 1) * productsOnPage;
  const displayedProducts = productList.slice(start, start + productsOnPage);

  function handleChangeProductDisplayedOnPage(e: SelectChangeEvent) {
    setProductsOnPage(Number(e.target.value));
  }

  return (
    <PaginatorRoot>
      <FormControl sx={{ maxWidth: 100 }} size="small">
        <InputLabel
          id="demo-select-small-label"
          sx={{ backgroundColor: currentTheme.palette.background.default }}
        >
          {`Display:`}
        </InputLabel>
        <Select
          labelId="demo-simple-select-disabled-label"
          id="demo-select-small"
          value={`${productsOnPage}`}
          label="Display"
          onChange={handleChangeProductDisplayedOnPage}
        >
          {PRODUCT_ON_PAGE_NUMBER.map((el) => (
            <MenuItem value={el}>{`by ${el}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <ProductGrid container spacing={3}>
        {displayedProducts.map((el) => (
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
      </ProductGrid>
      <Pagination
        count={Math.ceil(productList.length / productsOnPage)}
        page={page}
        color="primary"
        onChange={(e, value) => setPage(value)}
        sx={{ m: "0 auto" }}
      />
    </PaginatorRoot>
  );
};
