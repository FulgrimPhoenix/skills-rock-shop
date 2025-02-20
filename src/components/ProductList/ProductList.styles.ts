import { Grid2, styled } from "@mui/material";

export const ProductListRoot = styled("main")({
  display: "flex",
  flexDirection: "column",
  maxWidth: "1050px",
  margin: "20px auto",
  padding: "24px",
});

export const ProductGrid = styled(Grid2)(({ theme }) => ({
  minWidth: "100%",
  margin: "10px auto",
  justifyContent: "center",
  [theme.breakpoints.up("sm")]: {
    justifyContent: "flex-start",
    padding: "24px 0 ",
  },
}));

export const FilterGrid = styled(Grid2)({
  alignItems: "center",
  justifyContent: "space-between",
  p: "0 24px",
});
