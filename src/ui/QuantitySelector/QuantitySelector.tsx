import { ButtonGroup, Typography } from "@mui/material";
import { IProduct } from "src/types/product.type";
import { FC } from "react";
import { QuantityChangeButton } from "./QuantitySelector.styles";

interface IQuantitySelector {
  product: IProduct & { quantity: number };
  deleteProductSample: (arg: string) => void;
  addProductSample: (arg: IProduct & { quantity: number }) => void;
}

export const QuantitySelector: FC<IQuantitySelector> = ({
  product,
  deleteProductSample,
  addProductSample,
}) => {
  return (
    <ButtonGroup
      variant="text"
      size="small"
      sx={{ margin: "0 15px", height: 25 }}
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
        sx={{ m: "0 14px", fontSize: "16px" }}
      >
        {product.quantity}
      </Typography>
      <QuantityChangeButton onClick={() => addProductSample(product)}>
        +
      </QuantityChangeButton>
    </ButtonGroup>
  );
};
