import { Grid2, styled } from "@mui/material";

export const ProductListRoot = styled("main")({
  display: "flex",
  flexDirection: "column",
  maxWidth: "1050px",
  margin: "20px auto",
  padding: "24px",
});

export const ProductGrid = styled(Grid2)({
  minWidth: "100%",
  margin: "10px auto",
  justifyContent: "center",
  "@media (min-width:600px)": {
    justifyContent: "flex-start",
    padding: "24px 0 ",
  },
});
