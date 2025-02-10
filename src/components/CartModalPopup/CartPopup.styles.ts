import { Box, Dialog, List, styled } from "@mui/material";

export const CartList = styled(List)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.background.paper,
}));

export const TotalPriceContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  padding: "8px 16px",
});

export const RootCartPopup = styled(Dialog)({
  "& .MuiDialog-paper": { width: "100%", maxWidth: "800px" },
});
