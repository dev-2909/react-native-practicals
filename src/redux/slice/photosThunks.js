import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchPhotos = createAsyncThunk(
  "photos/fetchPhotos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/photos");
      return response.data.slice(0, 200);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
