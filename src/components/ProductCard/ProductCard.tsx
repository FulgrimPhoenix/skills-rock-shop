import {
  Box,
  Button,
  CardActions,
  CardMedia,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { IProduct } from "src/types/product.type";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppDispatch, useAppSelector } from "src/app/store";
import { deleteProduct } from "src/features/products/productsSlice";
import {
  addProductToCart,
  deleteProductFromCart,
} from "src/features/cart/cartSlice";
import { QuantitySelector } from "src/ui/QuantitySelector/QuantitySelector";
import {
  CardContentContainer,
  CardRoot,
  EditProductButton,
  EditProductIcon,
} from "./ProductCard.styles";
import { FC } from "react";
import { useModalContext } from "src/hooks/usePopup";
import { ProductPopup } from "../ProductPopup/ProductPopup";

export const ProductCard: FC<{ card: IProduct }> = ({ card }) => {
  const currentTheme = useTheme();
  const dispatch = useAppDispatch();
  const cart_list = useAppSelector((state) => state.cart_list);
  const quantity = cart_list.find(
    (el: IProduct) => el.id === card.id
  )?.quantity;
  const { open } = useModalContext();

  const deleteThisProduct = () => {
    dispatch(deleteProduct(card.id || ""));
  };

  const addProductSample = (product: IProduct & { quantity: number }) => {
    dispatch(addProductToCart(product));
  };

  const deleteProductSample = (id: string) => {
    dispatch(deleteProductFromCart(id));
  };

  const openEditPopup = () => {
    open<IProduct>(({ close }) => (
      <ProductPopup
        title="Edit the product"
        initialValues={card}
        onClose={close}
      />
    ));
  };

  const addCurrentProductToCart = () => {
    dispatch(addProductToCart(card));
  };

  return (
    <CardRoot key={card.id}>
      <CardMedia sx={{ height: 140 }} image={card.avatar} title={card.title} />
      <EditProductButton onClick={openEditPopup}>
        <EditProductIcon />
      </EditProductButton>
      <CardContentContainer>
        <Box>
          <Typography variant="h5" component="h6" overflow="clip" noWrap>
            {card.title}
          </Typography>
          <Typography variant="body2">{card.description}</Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ textAlign: "right", mt: "auto" }}>
            {card.price} ₽
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ textAlign: "right" }}
          >{`Remained: ${card.remained}`}</Typography>
        </Box>
      </CardContentContainer>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="secondary" onClick={deleteThisProduct}>
          <DeleteIcon />
        </IconButton>
        {quantity ? (
          <QuantitySelector
            product={{
              ...card,
              quantity,
            }}
            addProductSample={addProductSample}
            deleteProductSample={deleteProductSample}
          />
        ) : (
          <Button
            size="small"
            variant="contained"
            sx={{ color: currentTheme.palette.text.primary }}
            disabled={card.remained ? false : true}
            onClick={addCurrentProductToCart}
          >
            Add to cart
          </Button>
        )}
      </CardActions>
    </CardRoot>
  );
};
