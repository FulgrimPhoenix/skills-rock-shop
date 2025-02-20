import { styled } from "@mui/material";

export const StoreRoot = styled("div")(({ theme }) => ({
  boxSizing: "border-box",
  backgroundColor: theme.palette.background.default,
}));
