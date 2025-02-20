import { Box, ListItem, styled } from "@mui/material";

export const CartListItemRoot = styled(ListItem)({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "16px",
  padding: "8px",
});

export const ProductPriceBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    alignItems: "center",
  },
}));
