import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid2,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/app/store";
import { ProductCard } from "../ProductCard/ProductCard";
import { FilterGrid, ProductGrid, ProductListRoot } from "./ProductList.styles";
import { ChangeEvent, SyntheticEvent } from "react";
import { PRODUCT_ON_PAGE_NUMBER } from "./ProductList.const";
// import { useProductFilter } from "src/hooks/useProductFilter";

import { getProductListState } from "src/features/products/productsSelectors";
import { setPage, setProductOnPage } from "src/features/products/productsSlice";
import { IProduct } from "src/types/product.type";

export const ProductList = () => {
  const currentTheme = useTheme();
  const { paginationParams, productList, filteredProductList, searchParams } =
    useAppSelector(getProductListState);
  const dispatch = useAppDispatch();
  const maxPrice = 10000;

  // в силу того, что мы тут не используе event - я выключил проверку типа
  const handleChangePriceRange = (e: any, newPriceRange: number | number[]) => {
    // if (Array.isArray(newPriceRange) && newPriceRange.length === 2) {
    //   setSearchParams({
    //     ...searchParams,
    //     priceRange: {
    //       min: newPriceRange[0],
    //       max: newPriceRange[1],
    //     },
    //   });
    // } else if (typeof newPriceRange === "number") {
    //   setSearchParams({
    //     ...searchParams,
    //     priceRange: {
    //       min: newPriceRange,
    //       max: newPriceRange,
    //     },
    //   });
    // }
  };

  const handleChangeIsAvailable = (e: SyntheticEvent, checked: boolean) => {
    // const target = e.target as HTMLInputElement;
    // setSearchParams({ ...searchParams, [target.name]: checked });
  };

  const handleChangeSearchParams = (e: ChangeEvent<HTMLInputElement>) => {
    // setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleChangeProductDisplayedOnPage = (e: SelectChangeEvent) => {
    dispatch(setProductOnPage(Number(e.target.value)));
  };

  const resetAllFilters = () => {
    // setSearchParams({
    //   title: "",
    //   priceRange: { min: 0, max: maxPrice },
    //   isRemained: true,
    // });
  };

  const setCurrentPage = (e: ChangeEvent<unknown>, pageNumber: number) => {
    dispatch(setPage(pageNumber));
  };

  return (
    <ProductListRoot>
      <TextField
        name="title"
        id="search-request"
        label="Search..."
        variant="standard"
        value={searchParams.title}
        onChange={handleChangeSearchParams}
        sx={{
          m: "0 0 20px",
        }}
      />
      <FilterGrid container>
        <Grid2
          size={{ xs: 12, sm: 4 }}
          sx={{ display: "flex", flexDirection: "column" }}
        >
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
              value={`${paginationParams.productsOnPage}`}
              label="Display"
              onChange={handleChangeProductDisplayedOnPage}
            >
              {PRODUCT_ON_PAGE_NUMBER.map((el) => (
                <MenuItem key={el} value={el}>{`by ${el}`}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormGroup>
            <FormControlLabel
              name="isRemained"
              control={
                <Checkbox checked={searchParams.isRemained ? true : false} />
              }
              label="Is available"
              onChange={handleChangeIsAvailable}
            />
          </FormGroup>
          <Button
            variant="outlined"
            sx={{ maxWidth: 140 }}
            onClick={resetAllFilters}
          >
            Reset filters
          </Button>
        </Grid2>
        <Grid2 size={{ xs: 11, sm: 4 }}>
          <Slider
            getAriaLabel={() => "Price range"}
            min={0}
            max={maxPrice}
            value={[searchParams.priceRange.min, searchParams.priceRange.max]}
            onChange={handleChangePriceRange}
            valueLabelDisplay="auto"
            getAriaValueText={(value: number) => `${value} rubs`}
            marks={[
              {
                value: 0,
                label: `${0}₽`,
              },
              {
                value: maxPrice,
                label: `${maxPrice}₽`,
              },
            ]}
          />
          <Grid2 container sx={{ justifyContent: "space-between" }}>
            <Grid2 size={{ xs: 4 }}>
              <TextField
                name="minPrice"
                id="minPrice"
                label="Min"
                variant="standard"
                value={searchParams.priceRange.min}
                onChange={(e) =>
                  handleChangePriceRange(e, [
                    Number(e.target.value),
                    searchParams.priceRange.max,
                  ])
                }
              />
            </Grid2>
            <Grid2 size={{ xs: 4 }}>
              <TextField
                name="maxPrice"
                id="maxPrice"
                label="Max"
                variant="standard"
                value={searchParams.priceRange.max}
                onChange={(e) =>
                  handleChangePriceRange(e, [
                    searchParams.priceRange.min,
                    Number(e.target.value),
                  ])
                }
              />
            </Grid2>
          </Grid2>
        </Grid2>
      </FilterGrid>

      <ProductGrid container spacing={3}>
        {filteredProductList.map((el: IProduct) => (
          <Grid2
            key={el.id}
            size={{ xs: 12, sm: 4, md: 2.4 }}
            sx={{ display: "flex" }}
          >
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
        count={Math.ceil(productList.length / paginationParams.productsOnPage)}
        page={paginationParams.page}
        color="primary"
        onChange={setCurrentPage}
        sx={{ m: "0 auto" }}
      />
    </ProductListRoot>
  );
};
