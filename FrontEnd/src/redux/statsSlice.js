import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS as apiList } from "../config/apiEndpoints";
import api from "../utils/api";

// Get User Stats
export const getUserStats = createAsyncThunk(
  "stats/getUserStats",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        apiList.profile.getUserStats(userId)
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const statsSlice = createSlice({
  name: "stats",

  initialState: {
    statsData: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getUserStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getUserStats.fulfilled,
        (state, action) => {
          state.loading = false;
          state.statsData = action.payload;
        }
      )

      .addCase(
        getUserStats.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default statsSlice.reducer;