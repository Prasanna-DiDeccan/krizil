import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  API_ENDPOINTS as apiList,
} from "../config/apiEndpoints";

import api from "../utils/api";

// ==========================================
// GET USER STATS
// ==========================================

export const getUserStats =
  createAsyncThunk(
    "stats/getUserStats",
    async (
      userId,
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== GET USER STATS =========="
        );

        console.log(
          "USER ID =>",
          userId
        );

        const response =
          await api.get(
            apiList.profile.getUserStats(
              userId
            )
          );

        console.log(
          "USER STATS RESPONSE =>",
          response.data
        );

        return response.data;
      } catch (error) {
        console.log(
          "GET USER STATS ERROR =>",
          error.response?.data ||
            error.message
        );

        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

// ==========================================
// SLICE
// ==========================================

const statsSlice =
  createSlice({
    name: "stats",

    initialState: {
      statsData: null,
      loading: false,
      error: null,
    },

    reducers: {},

    extraReducers:
      (builder) => {
        builder

          .addCase(
            getUserStats.pending,
            (state) => {
              state.loading = true;
              state.error = null;
            }
          )

          .addCase(
            getUserStats.fulfilled,
            (state, action) => {
              state.loading = false;
              state.error = null;

              // Always use backend response
              state.statsData =
                action.payload;
            }
          )

          .addCase(
            getUserStats.rejected,
            (state, action) => {
              state.loading = false;

              state.error =
                action.payload;
            }
          );
      },
  });

export default statsSlice.reducer;