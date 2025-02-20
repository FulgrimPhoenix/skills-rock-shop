import { Card, CardContent, IconButton, styled } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const EditProductIcon = styled(EditIcon)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: "4px",
}));

export const EditProductButton = styled(IconButton)({
  position: "absolute",
  top: "0px",
  right: "0",
});

export const CardRoot = styled(Card)({
  height: "100%",
  margin: "0 auto",
  position: "relative",
});

export const CardContentContainer = styled(CardContent)({
  paddingBottom: "0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});
