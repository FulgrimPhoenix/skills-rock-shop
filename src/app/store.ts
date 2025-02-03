import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: rootReducer,
});

type TAppState = ReturnType<typeof store.getState>;
type TAppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<TAppState>();
export const useAppDispatch = useDispatch.withTypes<TAppDispatch>();
