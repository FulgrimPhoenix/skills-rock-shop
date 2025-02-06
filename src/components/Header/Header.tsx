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
import { useAppDispatch } from "src/app/store";
import { togglePopup } from "src/features/popups/popupSlice";

export const Header = () => {
  const dispatch = useAppDispatch();

  const openAddProductPopup = () => {
    dispatch(togglePopup("isAddProductPopupOpen"));
  };

  const openCartPopup = () => {
    dispatch(togglePopup("isCartPopupOpen"));
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
          <Badge badgeContent={4} color="error">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
