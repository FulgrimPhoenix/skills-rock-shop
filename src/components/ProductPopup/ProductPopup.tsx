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
import { useAppDispatch } from "src/app/store";
import * as Yup from "yup";

import { INPUTS_LIST } from "./ProductPopup.const";
import { addProduct, editProduct } from "src/features/products/productsSlice";
import { useFormik } from "formik";
import { IProduct } from "src/types/product.type";
import { MemoizedInput } from "src/ui/MemoizedInput/MemoizedInput";
import { useCallback } from "react";

interface IProductPopup {
  title: string;
  initialValues: IProduct;
  onClose: (result?: IProduct) => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Enter title"),
  description: Yup.string().min(6).max(32),
  price: Yup.number().min(0).required("Enter price"),
  remained: Yup.number().min(0).max(1000).required("Enter product quantity"),
  avatar: Yup.string().url("Paste url of product image"),
});

export const ProductPopup = ({
  title,
  initialValues,
  onClose,
}: IProductPopup) => {
  const dispatch = useAppDispatch();
  const currentTheme = useTheme();

  const formik = useFormik<IProduct>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      switch (title) {
        case "Add new product":
          dispatch(addProduct(values));
          formik.resetForm();
          onClose();
          break;
        case "Edit the product":
          dispatch(editProduct(values));
          onClose();
          formik.resetForm();
          break;
        default:
          break;
      }
    },
  });

  const handleClose = useCallback(() => {
    onClose();
    formik.resetForm();
  }, [onClose]);

  const addOrEditProduct = useCallback(() => {
    formik.handleSubmit();
  }, [formik.handleSubmit]);

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle variant="h4">{title}</DialogTitle>
      <DialogContent>
        <form style={{ marginBottom: "20px" }} onSubmit={addOrEditProduct}>
          {INPUTS_LIST.map((el) => (
            <MemoizedInput
              key={el.name}
              label={el.label}
              name={el.name}
              type={el.type}
              required={el.required}
              helperText={el.helperText}
              error={formik.errors[el.name]}
              value={formik.values[el.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched[el.name]}
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
          sx={{ color: currentTheme.palette.text.primary }}
          variant="contained"
          onClick={addOrEditProduct}
        >
          {title === "Add new product" ? "Add product" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
