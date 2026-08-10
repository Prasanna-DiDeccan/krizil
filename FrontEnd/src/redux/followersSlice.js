import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import { API_ENDPOINTS as apiList } from "../config/apiEndpoints";

export const getFollowers = createAsyncThunk(
  "followers/getFollowers",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        apiList.profile.getFollowers(userId)
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const followersSlice = createSlice({
  name: "followers",

  initialState: {
    followersData: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getFollowers.pending, (state) => {
        state.loading = true;
      })

      .addCase(getFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.followersData = action.payload;
      })

      .addCase(getFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default followersSlice.reducer;