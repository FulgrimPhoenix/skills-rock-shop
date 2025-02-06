import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/app/store";
import { togglePopup } from "src/features/popups/popupSlice";
import {
  CartList,
  CartListItem,
  QuantityChangeButton,
} from "./CartPopup.styles";
import {
  addProductToCart,
  deleteProductFromCart,
} from "src/features/cart/cartSlice";
import { IProduct } from "src/types/product.type";

export const CartPopup = () => {
  const { popup_manager, cart_list } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(togglePopup("isCartPopupOpen"));
  };

  const addProductSample = (product: IProduct & { quantity: number }) => {
    dispatch(addProductToCart(product));
  };

  const deleteProductSample = (id: string) => {
    dispatch(deleteProductFromCart(id));
  };

  return (
    <Dialog open={popup_manager.isCartPopupOpen} onClose={handleClose}>
      <DialogTitle variant="h4">Cart</DialogTitle>
      <DialogContent>
        {cart_list.length === 0 ? (
          <Typography component="h6" variant="h5" sx={{ textAlign: "center" }}>
            {"No products in cart  :("}
          </Typography>
        ) : (
          <CartList>
            {cart_list.map((product) => (
              <CartListItem>
                <Box display="flex" flexDirection="row">
                  <ListItemAvatar>
                    <Avatar src={product.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.title}
                    secondary={product.description}
                  />
                </Box>
                <ButtonGroup
                  variant="text"
                  size="small"
                  sx={{ margin: "0 15px" }}
                >
                  <QuantityChangeButton
                    size="small"
                    onClick={() => deleteProductSample(product.id || "")}
                  >
                    -
                  </QuantityChangeButton>
                  <Typography
                    variant="h6"
                    component="span"
                    sx={{ m: "0 18px" }}
                  >
                    {product.quantity}
                  </Typography>
                  <QuantityChangeButton
                    onClick={() => addProductSample(product)}
                  >
                    +
                  </QuantityChangeButton>
                </ButtonGroup>
                <Typography component="span" variant="h6">
                  {product.price}₽
                </Typography>
              </CartListItem>
            ))}
          </CartList>
        )}
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained">
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
};
