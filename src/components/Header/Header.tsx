import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { AddProductButton } from "./Header.styles";
import { useAppDispatch, useAppSelector } from "src/app/store";
import { togglePopup } from "src/features/popups/popupSlice";

export const Header = () => {
  const cart_list = useAppSelector((state) => state.cart_list);
  const dispatch = useAppDispatch();

  const openAddProductPopup = () => {
    dispatch(
      togglePopup({ variant: "isProductPopupOpen", title: "Add new product" })
    );
  };

  const openCartPopup = () => {
    dispatch(togglePopup({ variant: "isCartPopupOpen" }));
  };
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography component="h6" variant="h6" color="textPrimary">
          Miniatures Shop
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <AddProductButton size="small" onClick={openAddProductPopup}>
          Add product
        </AddProductButton>
        <IconButton onClick={openCartPopup}>
          <Badge badgeContent={cart_list.length} color="error">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
