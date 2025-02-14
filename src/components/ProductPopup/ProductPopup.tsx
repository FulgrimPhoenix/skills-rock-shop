import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/app/store";
import * as Yup from "yup";
import { togglePopup } from "src/features/popups/popupSlice";
import { INPUTS_LIST } from "./ProductPopup.const";
import { addProduct, editProduct } from "src/features/products/productsSlice";
import { useFormik } from "formik";
import { IProduct } from "src/types/product.type";
import { useEffect } from "react";
import {
  getCurrentPopupTitle,
  getFocusedProduct,
  getPopupState,
} from "src/features/popups/selector";

const validationSchema = Yup.object({
  title: Yup.string().required("Enter title"),
  description: Yup.string().min(6).max(32),
  price: Yup.number().min(0).required("Enter price"),
  remained: Yup.number().min(0).max(1000).required("Enter product quantity"),
  avatar: Yup.string().url("Paste url of product image"),
});

export const ProductPopup = () => {
  const currentPopup = useAppSelector(getCurrentPopupTitle);
  const { isProductPopupOpen } = useAppSelector(getPopupState);
  const focusedProduct = useAppSelector(getFocusedProduct);
  const dispatch = useAppDispatch();
  const currentTheme = useTheme();

  const formik = useFormik<IProduct>({
    initialValues: {
      title: "",
      avatar: "",
      description: "",
      price: "",
      remained: "",
    },
    validationSchema,
    onSubmit: (values) => {
      switch (currentPopup) {
        case "Add new product":
          dispatch(togglePopup({ variant: "isProductPopupOpen" }));
          dispatch(addProduct(values));
          formik.resetForm();
          break;
        case "Edit the product":
          dispatch(togglePopup({ variant: "isProductPopupOpen" }));
          dispatch(editProduct(values));
          formik.resetForm();
          break;
        default:
          break;
      }
    },
  });

  const handleClose = () => {
    dispatch(togglePopup({ variant: "isProductPopupOpen" }));
    formik.resetForm();
  };

  const addOrEditProduct = () => {
    formik.handleSubmit();
  };

  useEffect(() => {
    if (currentPopup === "Edit the product") {
      formik.setValues(focusedProduct);
    }
  }, [focusedProduct, currentPopup, formik]);

  return (
    <Dialog open={isProductPopupOpen} onClose={handleClose}>
      <DialogTitle variant="h4">{currentPopup}</DialogTitle>
      <DialogContent>
        <form style={{ marginBottom: "20px" }} onSubmit={addOrEditProduct}>
          {INPUTS_LIST.map((el) => (
            <Box key={el.name} minWidth={500}>
              <TextField
                label={el.label}
                name={el.name}
                type={el.type}
                required={el.required}
                helperText={
                  formik.touched[el.name] && Boolean(formik.errors[el.name])
                    ? ""
                    : el.helperText
                }
                error={
                  formik.touched[el.name] && Boolean(formik.errors[el.name])
                }
                fullWidth
                margin="normal"
                variant="standard"
                value={formik.values[el.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched[el.name] && Boolean(formik.errors[el.name]) ? (
                <Typography component="span" variant="body2" color="error">
                  {formik.errors[el.name]}
                </Typography>
              ) : null}
            </Box>
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
          sx={{ color: currentTheme.palette.text.primary }}
          variant="contained"
          onClick={addOrEditProduct}
        >
          {currentPopup === "Add new product" ? "Add product" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
