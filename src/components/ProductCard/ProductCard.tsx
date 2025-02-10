import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
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
import { EditProductButton, EditProductIcon } from "./ProductCard.styles";
import { setFocusedProduct, togglePopup } from "src/features/popups/popupSlice";
import { FC } from "react";

export const ProductCard: FC<IProduct> = ({
  id,
  title,
  avatar,
  description,
  price,
  remained,
}) => {
  const currentTheme = useTheme();
  const dispatch = useAppDispatch();
  const cart_list = useAppSelector((state) => state.cart_list);
  const quantity = cart_list.find((el) => el.id === id)?.quantity;

  const deleteThisProduct = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const addProductSample = (product: IProduct & { quantity: number }) => {
    dispatch(addProductToCart(product));
  };

  const deleteProductSample = (id: string) => {
    dispatch(deleteProductFromCart(id));
  };

  const openEditPopup = () => {
    console.log("lol");
    dispatch(
      setFocusedProduct({
        id,
        title,
        avatar,
        description,
        price,
        remained,
      })
    );
    dispatch(togglePopup("isEditProductPopupOpen"));
  };

  const addCurrentProductToCart = () => {
    dispatch(
      addProductToCart({
        id,
        title,
        avatar,
        description,
        price,
        remained,
      })
    );
  };

  return (
    <Card key={id} sx={{ height: "100%", m: "0 auto", position: "relative" }}>
      <CardMedia sx={{ height: 140 }} image={avatar} title={title} />
      <EditProductButton onClick={openEditPopup}>
        <EditProductIcon />
      </EditProductButton>
      <CardContent
        sx={{
          pb: "0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h5" component="h6" overflow="clip" noWrap>
            {title}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ textAlign: "right", mt: "auto" }}>
            {price} ₽
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ textAlign: "right" }}
          >{`Remained: ${remained}`}</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          color="secondary"
          onClick={() => deleteThisProduct(id || "")}
        >
          <DeleteIcon />
        </IconButton>
        {quantity ? (
          <QuantitySelector
            product={{
              id,
              title,
              avatar,
              description,
              price,
              remained,
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
            disabled={remained ? false : true}
            onClick={addCurrentProductToCart}
          >
            Add to cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
