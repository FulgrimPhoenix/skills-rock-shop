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
import { INPUTS_LIST } from "./AddProductPopup.const";
import { addProduct } from "src/features/products/productsSlice";

export const AddProductPopup = () => {
  const initialValue = {
    title: "",
    avatar: "",
    description: "",
    price: 0,
    remained: 0,
  };
  const { values, onChange, setValues } = useForm<IProduct>(initialValue);
  const currentTheme = useTheme();
  const { isAddProductPopupOpen } = useAppSelector(
    (state) => state.popup_manager
  );
  const dispatch = useAppDispatch();

  function handleClose() {
    dispatch(togglePopup("isAddProductPopupOpen"));
    setValues(initialValue);
  }

  function addNewProduct() {
    dispatch(addProduct(values));
  }

  return (
    <Dialog open={isAddProductPopupOpen} onClose={handleClose}>
      <DialogTitle>Add new product</DialogTitle>
      <DialogContent>
        <form style={{ marginBottom: "20px" }} onSubmit={addNewProduct}>
          {INPUTS_LIST.map((el) => (
            <TextField
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
          onClick={addNewProduct}
        >
          Add product
        </Button>
      </DialogActions>
    </Dialog>
  );
};
