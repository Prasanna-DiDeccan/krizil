import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { API_ENDPOINTS as apiList } from "../config/apiEndpoints";

export const getFollowing = createAsyncThunk(
  "following/getFollowing",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        apiList.profile.getFollowing(userId)
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const followingSlice = createSlice({
  name: "following",

  initialState: {
    followingData: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getFollowing.pending, (state) => {
        state.loading = true;
      })

      .addCase(getFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.followingData = action.payload;
      })

      .addCase(getFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default followingSlice.reducer;