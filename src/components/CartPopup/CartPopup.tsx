import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/app/store";
import {
  CartList,
  RootCartPopup,
  TotalPriceContainer,
} from "./CartPopup.styles";
import {
  addProductToCart,
  deleteAllProductsFromCart,
  deleteProductFromCart,
} from "src/features/cart/cartSlice";
import { IProduct } from "src/types/product.type";
import { CartListItem } from "src/ui/CartListItem/CartListItem";
import { FC, useCallback } from "react";
import { QuantitySelector } from "src/ui/QuantitySelector/QuantitySelector";
import {
  getCartList,
  getTotalPriceOfCart,
} from "src/features/cart/cartSelector";

interface ICartPopup {
  onClose: (result?: IProduct) => void;
}

export const CartPopup: FC<ICartPopup> = ({ onClose }) => {
  const cards = useAppSelector(getCartList);
  const dispatch = useAppDispatch();
  const currentTheme = useTheme();
  const totalPrice = useAppSelector(getTotalPriceOfCart);

  const handleClose = () => {
    onClose();
  };

  const addProductSample = (product: IProduct & { quantity: number }) => {
    dispatch(addProductToCart(product));
  };

  const handleClearCart = () => {
    dispatch(deleteAllProductsFromCart());
  };

  const deleteProductSample = (id: string) => {
    dispatch(deleteProductFromCart(id));
  };

  return (
    <RootCartPopup open onClose={handleClose}>
      <DialogTitle variant="h4">Cart</DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        {cards.length === 0 ? (
          <Typography
            component="h6"
            variant="h5"
            sx={{ textAlign: "center", m: "0 auto 24px" }}
          >
            {"No products in cart  :("}
          </Typography>
        ) : (
          <>
            <CartList>
              {cards.map((product: IProduct & { quantity: number }) => (
                <CartListItem
                  key={product.id}
                  product={product}
                  quantitySelector={
                    <QuantitySelector
                      product={product}
                      addProductSample={addProductSample}
                      deleteProductSample={deleteProductSample}
                    />
                  }
                />
              ))}
            </CartList>
            <TotalPriceContainer>
              <Typography component="span" variant="h5">
                Total
              </Typography>
              <Typography component="span" variant="h4">
                {totalPrice} ₽
              </Typography>
            </TotalPriceContainer>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        {cards.length !== 0 && (
          <Button type="reset" variant="outlined" onClick={handleClearCart}>
            Clear cart
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{ color: currentTheme.palette.text.primary }}
        >
          Pay
        </Button>
      </DialogActions>
    </RootCartPopup>
  );
};
