import {
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
import { useAppSelector } from "src/app/store";
import { ProductCard } from "../ProductCard/ProductCard";
import { ProductGrid, ProductListRoot } from "./ProductList.styles";
import { ChangeEvent, SyntheticEvent, useEffect } from "react";
import { PRODUCT_ON_PAGE_NUMBER } from "./ProductList.const";
import { usePagination } from "src/hooks/usePagination";
import { useProductFilter } from "src/hooks/useProductFilter";

export const ProductList = () => {
  const currentTheme = useTheme();
  const productList = useAppSelector((state) => state.product_list);
  const maxPrice = productList.reduce(
    (acc, el) => (el.price >= acc ? el.price : acc),
    0
  );
  const { filteredProductList, searchParams, setSearchParams } =
    useProductFilter(productList);
  const {
    displayedProducts,
    productsOnPage,
    page,
    setPage,
    setFilteredProductList,
    setProductsOnPage,
  } = usePagination({
    page: 1,
    productsOnPage: PRODUCT_ON_PAGE_NUMBER[1],
    filteredProductList: filteredProductList,
  });
  // в силу того, что мы тут не используе event - я выключил проверку типа
  const handleChangePriceRange = (e: any, newPriceRange: number | number[]) => {
    if (Array.isArray(newPriceRange) && newPriceRange.length === 2) {
      setSearchParams({
        ...searchParams,
        priceRange: {
          min: newPriceRange[0],
          max: newPriceRange[1],
        },
      });
    } else if (typeof newPriceRange === "number") {
      setSearchParams({
        ...searchParams,
        priceRange: {
          min: newPriceRange,
          max: newPriceRange,
        },
      });
    }
  };

  function handleChangeIsAvailable(e: SyntheticEvent, checked: boolean) {
    const target = e.target as HTMLInputElement;

    setSearchParams({ ...searchParams, [target.name]: checked });
  }

  function handleChangeSearchParams(e: ChangeEvent<HTMLInputElement>) {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  }

  function handleChangeProductDisplayedOnPage(e: SelectChangeEvent) {
    setProductsOnPage(Number(e.target.value));
  }

  useEffect(() => {
    setFilteredProductList(filteredProductList);
  }, [productList, filteredProductList, setFilteredProductList]);

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
      <Grid2
        container
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          p: "0 24px",
        }}
      >
        <Grid2 size={{ xs: 12, sm: 4 }}>
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
          <FormGroup>
            <FormControlLabel
              name="isRemained"
              control={<Checkbox defaultChecked />}
              label="Is available"
              onChange={handleChangeIsAvailable}
            />
          </FormGroup>
        </Grid2>
        <Grid2 size={{ xs: 11, sm: 4 }}>
          <Slider
            getAriaLabel={() => "Temperature range"}
            min={0}
            max={maxPrice}
            value={[searchParams.priceRange.min, searchParams.priceRange.max]}
            onChange={(e, newPriceRange) =>
              handleChangePriceRange(e, newPriceRange)
            }
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
      </Grid2>

      <ProductGrid container spacing={3}>
        {displayedProducts.map((el) => (
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
        count={Math.ceil(productList.length / productsOnPage)}
        page={page}
        color="primary"
        onChange={(e, value) => setPage(value)}
        sx={{ m: "0 auto" }}
      />
    </ProductListRoot>
  );
};
