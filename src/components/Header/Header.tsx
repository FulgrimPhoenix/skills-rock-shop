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

  function openAddProductPopupOpen() {
    dispatch(togglePopup("isAddProductPopupOpen"));
  }
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography component="h6" variant="h6" color="textPrimary">
          Miniatures Shop
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <AddProductButton size="small" onClick={openAddProductPopupOpen}>
          Add product
        </AddProductButton>
        <IconButton>
          <Badge badgeContent={4} color="error">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
