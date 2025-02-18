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
import { useAppSelector } from "src/app/store";
import { ProductPopup } from "../ProductPopup/ProductPopup";
import { useModalContext } from "src/hooks/usePopup";
import { CartPopup } from "../CartPopup/CartPopup";
import { getCartList } from "src/features/cart/cartSelector";
import { useCallback } from "react";

export const Header = () => {
  const cartList = useAppSelector(getCartList);
  const { open } = useModalContext();

  const openAddProductPopup = useCallback(() => {
    open(({ close }) => (
      <ProductPopup
        title="Add new product"
        initialValues={{
          title: "",
          avatar: "",
          description: "",
          price: "",
          remained: "",
        }}
        onClose={close}
      />
    ));
  }, [open]);

  const openCartPopup = useCallback(() => {
    open(({ close }) => <CartPopup onClose={close} />);
  }, [open]);

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
          <Badge badgeContent={cartList.length} color="error">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
