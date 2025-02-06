import { Button, List, ListItem, styled } from "@mui/material";

export const CartList = styled(List)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.background.paper,
}));

export const CartListItem = styled(ListItem)({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "16px",
});

export const QuantityChangeButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
}));
