import { Button, styled } from "@mui/material";

export const AddProductButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  color: theme.palette.primary.contrastText,
  marginRight: "20px",
}));
