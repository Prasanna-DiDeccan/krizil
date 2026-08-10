import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../utils/api";

import { API_ENDPOINTS } from "../config/apiEndpoints";

export const createPost =
  createAsyncThunk(
    "posts/createPost",
    async (formData, { rejectWithValue }) => {
      try {
        const response = await api.post(
          API_ENDPOINTS.posts.createPost,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
console.log("POST SLICE LOADED");
        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

  const postSlice = createSlice({
  name: "posts",

  initialState: {
    createPostData: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        createPost.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        createPost.fulfilled,
        (state, action) => {
          state.loading = false;
          state.createPostData =
            action.payload;
        }
      )

      .addCase(
        createPost.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default postSlice.reducer;