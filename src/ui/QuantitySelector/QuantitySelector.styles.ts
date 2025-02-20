import { Button, styled } from "@mui/material";

export const QuantityChangeButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
}));
