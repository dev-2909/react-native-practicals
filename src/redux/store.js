import { configureStore } from "@reduxjs/toolkit";
import photosReducer from "../redux/slice/photosSlice";

export const store = configureStore({
  reducer: {
    photos: photosReducer,
  },
});
