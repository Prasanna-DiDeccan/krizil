import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS as apiList } from "../config/apiEndpoints";
import api from "../utils/api";

// ==========================================
// FOLLOW USER
// ==========================================

export const followUser = createAsyncThunk(
  "follow/followUser",
  async (userId, { rejectWithValue }) => {
    try {
      console.log("FOLLOW USER ID =>", userId);

      const response = await api.post(
        apiList.follow.followUser(userId)
      );

      console.log("FOLLOW RESPONSE =>", response.data);

      return {
        userId,
        ...response.data,
      };
    } catch (error) {
      console.log(
        "FOLLOW ERROR =>",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// ==========================================
// UNFOLLOW USER
// ==========================================

export const unfollowUser = createAsyncThunk(
  "follow/unfollowUser",
  async (userId, { rejectWithValue }) => {
    try {
      console.log("UNFOLLOW USER ID =>", userId);

      const response = await api.delete(
        apiList.follow.unfollowUser(userId)
      );

      console.log(
        "UNFOLLOW RESPONSE =>",
        response.data
      );

      return {
        userId,
        ...response.data,
      };
    } catch (error) {
      console.log(
        "UNFOLLOW ERROR =>",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// ==========================================
// SLICE
// ==========================================

const followSlice = createSlice({
  name: "follow",

  initialState: {
    following: {},
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ======================================
      // FOLLOW
      // ======================================

      .addCase(followUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(followUser.fulfilled, (state, action) => {
        state.loading = false;

        const userId = action.payload.userId;

        state.following[userId] = true;
      })

      .addCase(followUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================
      // UNFOLLOW
      // ======================================

      .addCase(unfollowUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.loading = false;

        const userId = action.payload.userId;

        state.following[userId] = false;
      })

      .addCase(unfollowUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default followSlice.reducer;