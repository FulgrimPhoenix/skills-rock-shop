import { IconButton, styled } from "@mui/material";
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
