import { TAppState } from "src/app/store";

export const getPopupState = (state: TAppState) => {
  return state.popup_manager.isPopupOpen;
};

export const getCurrentPopupTitle = (state: TAppState) => {
  return state.popup_manager.currentPopup;
};

export const getFocusedProduct = (state: TAppState) => {
  return state.popup_manager.focusedProduct;
};
