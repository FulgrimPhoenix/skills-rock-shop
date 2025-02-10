import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { CartListItemRoot, ProductPriceBox } from "./CartListItem.styles";
import { IProduct } from "src/types/product.type";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

interface ICartListItem
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  product: IProduct & { quantity: number };
  quantitySelector: React.ReactNode;
}

export const CartListItem = ({ product, quantitySelector }: ICartListItem) => {
  return (
    <CartListItemRoot key={product.id}>
      <Box display="flex" flexDirection="row">
        <ListItemAvatar sx={{ display: "flex" }}>
          <Avatar alt={product.title} src={product.avatar} sx={{ m: "auto" }} />
        </ListItemAvatar>
        <ListItemText primary={product.title} secondary={product.description} />
      </Box>
      <ProductPriceBox>
        {quantitySelector}
        <Typography component="span" variant="h6" sx={{ m: "auto 16px" }}>
          {product.price}₽
        </Typography>
      </ProductPriceBox>
    </CartListItemRoot>
  );
};
