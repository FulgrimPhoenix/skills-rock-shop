import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IinitialState {
  isAddProductPopupOpen: boolean;
  isEditProductPopupOpen: boolean;
}

const initialState: IinitialState = {
  isAddProductPopupOpen: false,
  isEditProductPopupOpen: false,
};

export const popupsSlice = createSlice({
  name: "popup_manager",
  initialState,
  reducers: {
    togglePopup: (state, action: PayloadAction<keyof IinitialState>) => {
      state[action.payload] = !state[action.payload];
    },
  },
});

export const { togglePopup } = popupsSlice.actions;
