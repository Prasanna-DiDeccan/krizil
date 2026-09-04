import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../utils/api";
import { API_ENDPOINTS } from "../config/apiEndpoints";

// ======================================================
// GET FOLLOWING
// GET /api/users/{user_id}/following
// ======================================================

export const getFollowing = createAsyncThunk(
  "following/getFollowing",

  async (
    { userId, limit = 20, offset = 0 },
    { rejectWithValue }
  ) => {
    try {
      console.log("========== GET FOLLOWING START ==========");
      console.log("USER ID =>", userId);
      console.log("LIMIT =>", limit);
      console.log("OFFSET =>", offset);

      const response = await api.get(
        API_ENDPOINTS.follow.getFollowing(userId),
        {
          params: {
            limit,
            offset,
          },
        }
      );

      console.log("FOLLOWING RESPONSE =>", response.data);

      return response.data;
    } catch (error) {
      console.log(
        "GET FOLLOWING ERROR =>",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data || {
          message: error.message,
        }
      );
    }
  }
);

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  items: [],
  total: 0,
  limit: 20,
  offset: 0,

  loading: false,
  error: null,
};

// ======================================================
// SLICE
// ======================================================

const followingSlice = createSlice({
  name: "following",

  initialState,

  reducers: {
    clearFollowing: (state) => {
      state.items = [];
      state.total = 0;
      state.offset = 0;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==================================================
      // PENDING
      // ==================================================

      .addCase(getFollowing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ==================================================
      // SUCCESS
      // ==================================================

      .addCase(getFollowing.fulfilled, (state, action) => {
        state.loading = false;

        state.items = action.payload.items || [];
        state.total = action.payload.total || 0;
        state.limit = action.payload.limit || 20;
        state.offset = action.payload.offset || 0;
      })

      // ==================================================
      // ERROR
      // ==================================================

      .addCase(getFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ======================================================
// ACTIONS
// ======================================================

export const {
  clearFollowing,
} = followingSlice.actions;

// ======================================================
// SELECTORS
// ======================================================

export const selectFollowing = (state) =>
  state.following.items;

export const selectFollowingTotal = (state) =>
  state.following.total;

export const selectFollowingLoading = (state) =>
  state.following.loading;

export const selectFollowingError = (state) =>
  state.following.error;

export default followingSlice.reducer;