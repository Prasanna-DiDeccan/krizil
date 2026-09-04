import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import api from "../utils/api";

import {
  API_ENDPOINTS,
} from "../config/apiEndpoints";

// ======================================================
// LIKE TARGET
// ======================================================

export const likeTarget = createAsyncThunk(
  "likes/likeTarget",

  async (
    {
      targetType,
      targetId,
    },
    { rejectWithValue }
  ) => {
    try {
      console.log(
        "❤️ LIKE API =>",
        {
          targetType,
          targetId,
        }
      );

      const response = await api.post(
        API_ENDPOINTS.likes.create,
        {
          target_type: targetType,
          target_id: targetId,
        }
      );

      console.log(
        "❤️ LIKE RESPONSE =>",
        response.data
      );

      return {
        ...response.data,
        targetType,
        targetId,
      };
    } catch (error) {
      console.log(
        "❌ LIKE API ERROR =>",
        error?.response?.data ||
          error?.message
      );

      return rejectWithValue(
        error?.response?.data ||
          error?.message ||
          "Failed to like"
      );
    }
  }
);

// ======================================================
// UNLIKE BY TARGET
// ======================================================

export const unlikeTarget = createAsyncThunk(
  "likes/unlikeTarget",

  async (
    {
      targetType,
      targetId,
    },
    { rejectWithValue }
  ) => {
    try {
      console.log(
        "💔 UNLIKE API =>",
        {
          targetType,
          targetId,
        }
      );

      const response = await api.delete(
        API_ENDPOINTS.likes.unlikeByTarget,
        {
          params: {
            target_type: targetType,
            target_id: targetId,
          },
        }
      );

      console.log(
        "💔 UNLIKE RESPONSE =>",
        response.data
      );

      return {
        ...response.data,
        targetType,
        targetId,
      };
    } catch (error) {
      console.log(
        "❌ UNLIKE API ERROR =>",
        error?.response?.data ||
          error?.message
      );

      return rejectWithValue(
        error?.response?.data ||
          error?.message ||
          "Failed to unlike"
      );
    }
  }
);

// ======================================================
// UNLIKE BY LIKE ID
// ======================================================

export const unlikeById = createAsyncThunk(
  "likes/unlikeById",

  async (
    likeId,
    { rejectWithValue }
  ) => {
    try {
      console.log(
        "💔 UNLIKE BY ID API =>",
        likeId
      );

      const response = await api.delete(
        API_ENDPOINTS.likes.unlikeById(
          likeId
        )
      );

      console.log(
        "💔 UNLIKE BY ID RESPONSE =>",
        response.data
      );

      return {
        ...response.data,
        likeId,
      };
    } catch (error) {
      console.log(
        "❌ UNLIKE BY ID ERROR =>",
        error?.response?.data ||
          error?.message
      );

      return rejectWithValue(
        error?.response?.data ||
          error?.message ||
          "Failed to unlike"
      );
    }
  }
);

// ======================================================
// GET POST LIKES
// ======================================================

export const getPostLikes = createAsyncThunk(
  "likes/getPostLikes",

  async (
    {
      postId,
      limit = 20,
      offset = 0,
    },
    { rejectWithValue }
  ) => {
    try {
      console.log(
        "❤️ GET POST LIKES =>",
        {
          postId,
          limit,
          offset,
        }
      );

      const response = await api.get(
        API_ENDPOINTS.likes.getPostLikes(
          postId
        ),
        {
          params: {
            limit,
            offset,
          },
        }
      );

      console.log(
        "❤️ POST LIKES RESPONSE =>",
        response.data
      );

      return {
        ...response.data,
        postId,
        limit,
        offset,
      };
    } catch (error) {
      console.log(
        "❌ GET POST LIKES ERROR =>",
        error?.response?.data ||
          error?.message
      );

      return rejectWithValue(
        error?.response?.data ||
          error?.message ||
          "Failed to get post likes"
      );
    }
  }
);

// ======================================================
// GET REEL LIKES
// ======================================================

export const getReelLikes = createAsyncThunk(
  "likes/getReelLikes",

  async (
    {
      reelId,
      limit = 20,
      offset = 0,
    },
    { rejectWithValue }
  ) => {
    try {
      console.log(
        "❤️ GET REEL LIKES =>",
        {
          reelId,
          limit,
          offset,
        }
      );

      const response = await api.get(
        API_ENDPOINTS.likes.getReelLikes(
          reelId
        ),
        {
          params: {
            limit,
            offset,
          },
        }
      );

      console.log(
        "❤️ REEL LIKES RESPONSE =>",
        response.data
      );

      return {
        ...response.data,
        reelId,
        limit,
        offset,
      };
    } catch (error) {
      console.log(
        "❌ GET REEL LIKES ERROR =>",
        error?.response?.data ||
          error?.message
      );

      return rejectWithValue(
        error?.response?.data ||
          error?.message ||
          "Failed to get reel likes"
      );
    }
  }
);

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  likes: {},

  postLikes: {},

  reelLikes: {},

  loading: false,

  error: null,
};

// ======================================================
// SLICE
// ======================================================

const likeSlice = createSlice({
  name: "likes",

  initialState,

  reducers: {
    clearLikesError: (state) => {
      state.error = null;
    },

    clearLikes: (state) => {
      state.likes = {};

      state.postLikes = {};

      state.reelLikes = {};

      state.loading = false;

      state.error = null;
    },
  },

  extraReducers: (builder) => {

    // ==================================================
    // LIKE
    // ==================================================

    builder
      .addCase(
        likeTarget.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        likeTarget.fulfilled,
        (state, action) => {
          state.loading = false;

          const {
            targetType,
            targetId,
            like,
            likes_count,
          } = action.payload;

          const key =
            `${targetType}_${targetId}`;

          const previous =
            state.likes[key];

          state.likes[key] = {
            isLiked: true,

            likeId:
              like?.id ??
              previous?.likeId ??
              null,

            count:
              likes_count ??
              previous?.count ??
              0,
          };

          console.log(
            "❤️ REDUX LIKE UPDATED =>",
            key,
            state.likes[key]
          );
        }
      )

      .addCase(
        likeTarget.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      );

    // ==================================================
    // UNLIKE
    // ==================================================

    builder
      .addCase(
        unlikeTarget.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        unlikeTarget.fulfilled,
        (state, action) => {
          state.loading = false;

          const {
            targetType,
            targetId,
            likes_count,
          } = action.payload;

          const key =
            `${targetType}_${targetId}`;

          const previous =
            state.likes[key];

          if (previous) {
            state.likes[key] = {
              ...previous,

              isLiked: false,

              likeId: null,

              count:
                likes_count ??
                Math.max(
                  0,
                  (previous.count || 0) - 1
                ),
            };
          } else {
            state.likes[key] = {
              isLiked: false,

              likeId: null,

              count:
                likes_count ?? 0,
            };
          }

          console.log(
            "💔 REDUX UNLIKE UPDATED =>",
            key,
            state.likes[key]
          );
        }
      )

      .addCase(
        unlikeTarget.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      );

    // ==================================================
    // UNLIKE BY ID
    // ==================================================

    builder
      .addCase(
        unlikeById.fulfilled,
        (state, action) => {
          const {
            likeId,
          } = action.payload;

          Object.keys(
            state.likes
          ).forEach((key) => {
            if (
              state.likes[key]
                ?.likeId === likeId
            ) {
              state.likes[key]
                .isLiked = false;

              state.likes[key]
                .likeId = null;

              state.likes[key]
                .count = Math.max(
                  0,
                  (
                    state.likes[key]
                      .count || 0
                  ) - 1
                );
            }
          });
        }
      );

    // ==================================================
    // GET POST LIKES
    // ==================================================

    builder
      .addCase(
        getPostLikes.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getPostLikes.fulfilled,
        (state, action) => {
          state.loading = false;

          const {
            postId,
            items = [],
            total = 0,
            limit = 20,
            offset = 0,
          } = action.payload;

          const key = String(postId);

          const previous =
            state.postLikes[key];

          const previousItems =
            previous?.items || [];

          const finalItems =
            offset > 0
              ? [
                  ...previousItems,
                  ...items,
                ]
              : items;

          state.postLikes[key] = {
            items: finalItems,

            total,

            limit,

            offset,
          };

          console.log(
            "❤️ POST LIKES REDUX =>",
            key,
            finalItems.length,
            "/",
            total
          );
        }
      )

      .addCase(
        getPostLikes.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      );

    // ==================================================
    // GET REEL LIKES
    // ==================================================

    builder
      .addCase(
        getReelLikes.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getReelLikes.fulfilled,
        (state, action) => {
          state.loading = false;

          const {
            reelId,
            items = [],
            total = 0,
            limit = 20,
            offset = 0,
          } = action.payload;

          const key = String(reelId);

          const previous =
            state.reelLikes[key];

          const previousItems =
            previous?.items || [];

          const finalItems =
            offset > 0
              ? [
                  ...previousItems,
                  ...items,
                ]
              : items;

          state.reelLikes[key] = {
            items: finalItems,

            total,

            limit,

            offset,
          };

          console.log(
            "❤️ REEL LIKES REDUX =>",
            key,
            finalItems.length,
            "/",
            total
          );
        }
      )

      .addCase(
        getReelLikes.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      );
  },
});

// ======================================================
// ACTIONS
// ======================================================

export const {
  clearLikesError,
  clearLikes,
} = likeSlice.actions;

// ======================================================
// SELECT LIKE STATE
// ======================================================

export const selectLikeState = (
  state,
  targetType,
  targetId
) => {
  if (
    targetId === null ||
    targetId === undefined
  ) {
    return null;
  }

  return (
    state.like?.likes?.[
      `${targetType}_${targetId}`
    ] || null
  );
};

// ======================================================
// SELECT REEL LIKES
// ======================================================

export const selectReelLikes = (
  state,
  reelId
) => {
  if (
    reelId === null ||
    reelId === undefined
  ) {
    return null;
  }

  return (
    state.like?.reelLikes?.[
      String(reelId)
    ] || null
  );
};

// ======================================================
// SELECT POST LIKES
// ======================================================

export const selectPostLikes = (
  state,
  postId
) => {
  if (
    postId === null ||
    postId === undefined
  ) {
    return null;
  }

  return (
    state.like?.postLikes?.[
      String(postId)
    ] || null
  );
};

// ======================================================
// EXPORT REDUCER
// ======================================================

export default likeSlice.reducer;