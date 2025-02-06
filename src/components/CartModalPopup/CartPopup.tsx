import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/app/store";
import { togglePopup } from "src/features/popups/popupSlice";

export const CartPopup = () => {
  const { isCartPopupOpen } = useAppSelector((state) => state.popup_manager);
  const dispatch = useAppDispatch();

  function handleClose() {
    dispatch(togglePopup("isCartPopupOpen"));
  }
  return (
    <Dialog open={isCartPopupOpen} onClose={handleClose}>
      <DialogTitle>Add new product</DialogTitle>
      <DialogContent>
        <ul style={{ marginBottom: "20px" }}></ul>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained">
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
};
