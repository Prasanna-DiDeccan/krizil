import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const followUser = createAsyncThunk(
  "follow/followUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/api/follow/${userId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "follow/unfollowUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/api/follow/${userId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const followSlice = createSlice({
  name: "follow",

  initialState: {
    followData: null,
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(followUser.fulfilled, (state, action) => {
        state.followData = action.payload;
      })

      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.followData = action.payload;
      });
  },
});

export default followSlice.reducer;