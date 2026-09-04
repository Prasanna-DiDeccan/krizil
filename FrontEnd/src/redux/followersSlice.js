import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../utils/api";
import { API_ENDPOINTS } from "../config/apiEndpoints";

// ======================================================
// GET FOLLOWERS
// GET /api/users/{user_id}/followers
// ======================================================

export const getFollowers = createAsyncThunk(
  "followers/getFollowers",

  async (
    { userId, limit = 20, offset = 0 },
    { rejectWithValue }
  ) => {
    try {
      console.log("========== GET FOLLOWERS START ==========");
      console.log("USER ID =>", userId);
      console.log("LIMIT =>", limit);
      console.log("OFFSET =>", offset);

      const response = await api.get(
        API_ENDPOINTS.follow.getFollowers(userId),
        {
          params: {
            limit,
            offset,
          },
        }
      );

      console.log("FOLLOWERS RESPONSE =>", response.data);

      return response.data;
    } catch (error) {
      console.log(
        "GET FOLLOWERS ERROR =>",
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

const followersSlice = createSlice({
  name: "followers",

  initialState,

  reducers: {
    clearFollowers: (state) => {
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

      .addCase(getFollowers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ==================================================
      // SUCCESS
      // ==================================================

      .addCase(getFollowers.fulfilled, (state, action) => {
        state.loading = false;

        state.items = action.payload.items || [];
        state.total = action.payload.total || 0;
        state.limit = action.payload.limit || 20;
        state.offset = action.payload.offset || 0;
      })

      // ==================================================
      // ERROR
      // ==================================================

      .addCase(getFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ======================================================
// ACTIONS
// ======================================================

export const {
  clearFollowers,
} = followersSlice.actions;

// ======================================================
// SELECTORS
// ======================================================

export const selectFollowers = (state) =>
  state.followers.items;

export const selectFollowersTotal = (state) =>
  state.followers.total;

export const selectFollowersLoading = (state) =>
  state.followers.loading;

export const selectFollowersError = (state) =>
  state.followers.error;

export default followersSlice.reducer;