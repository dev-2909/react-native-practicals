import { createSlice } from "@reduxjs/toolkit";
import { fetchPhotos } from "./photosThunks";

const initialState = {
  all: [],
  disabled: {},
  loading: false,
  search: "",
};

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    togglePhoto: (state, action) => {
      const key = `${action.payload.albumId}-${action.payload.id}`;
      if (state.disabled[key]) {
        delete state.disabled[key];
      } else {
        state.disabled[key] = true;
      }
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.all = action.payload;
        state.loading = false;
      })
      .addCase(fetchPhotos.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { togglePhoto, setSearch } = photosSlice.actions;
export default photosSlice.reducer;
