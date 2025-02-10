import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/app/store";
import { togglePopup } from "src/features/popups/popupSlice";
import { useForm } from "src/hooks/useForm";
import { IProduct } from "src/types/product.type";
import { editProduct } from "src/features/products/productsSlice";
import { INPUTS_LIST } from "../AddProductPopup/AddProductPopup.const";
import { useEffect } from "react";

export const EditProductPopup = () => {
  const { focusedProduct } = useAppSelector((state) => state.popup_manager);
  const { values, onChange, setValues } = useForm<IProduct>({
    id: "",
    title: "",
    avatar: "",
    description: "",
    price: 0,
    remained: 0,
  });
  const currentTheme = useTheme();
  const { isEditProductPopupOpen } = useAppSelector(
    (state) => state.popup_manager
  );
  const dispatch = useAppDispatch();

  function handleClose() {
    dispatch(togglePopup("isEditProductPopupOpen"));
  }

  function saveProductChanges() {
    dispatch(editProduct(values));
    dispatch(togglePopup("isEditProductPopupOpen"));
  }

  useEffect(() => {
    setValues(focusedProduct);
  }, [focusedProduct, setValues]);

  return (
    <Dialog open={isEditProductPopupOpen} onClose={handleClose}>
      <DialogTitle variant="h4">Edit the product</DialogTitle>
      <DialogContent>
        <form style={{ marginBottom: "20px" }}>
          {INPUTS_LIST.map((el) => (
            <TextField
              key={el.name}
              label={el.label}
              name={el.name}
              type={el.type}
              required={el.required}
              fullWidth
              margin="normal"
              variant="standard"
              value={values[el.name as keyof IProduct]}
              onChange={onChange}
            />
          ))}
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{ color: currentTheme.palette.text.primary }}
          variant="text"
        >
          Close
        </Button>
        <Button
          type="submit"
          sx={{ color: currentTheme.palette.text.primary }}
          variant="contained"
          onClick={saveProductChanges}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
