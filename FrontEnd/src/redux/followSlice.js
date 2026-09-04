import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import api from "../utils/api";
import { API_ENDPOINTS } from "../config/apiEndpoints";

// ======================================================
// HELPERS
// ======================================================

const getErrorMessage = (
  error,
  fallback
) => {
  return (
    error?.response?.data?.detail ||
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
};

const getItems = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  return [];
};

// ======================================================
// FOLLOW USER
// POST /api/follow/{user_id}
// ======================================================

export const followUser =
  createAsyncThunk(
    "follow/followUser",

    async (
      userId,
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== FOLLOW USER =========="
        );

        console.log(
          "TARGET USER ID =>",
          userId
        );

        const response =
          await api.post(
            API_ENDPOINTS.follow.followUser(
              userId
            )
          );

        console.log(
          "FOLLOW RESPONSE =>",
          response.data
        );

        return {
          userId,
          ...(response.data || {}),
        };
      } catch (error) {
        console.log(
          "FOLLOW ERROR =>",
          error?.response?.data ||
            error?.message
        );

        return rejectWithValue(
          getErrorMessage(
            error,
            "Failed to follow user"
          )
        );
      }
    }
  );

// ======================================================
// UNFOLLOW USER
// DELETE /api/follow/{user_id}
// ======================================================

export const unfollowUser =
  createAsyncThunk(
    "follow/unfollowUser",

    async (
      userId,
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== UNFOLLOW USER =========="
        );

        console.log(
          "TARGET USER ID =>",
          userId
        );

        const response =
          await api.delete(
            API_ENDPOINTS.follow.unfollowUser(
              userId
            )
          );

        console.log(
          "UNFOLLOW RESPONSE =>",
          response.data
        );

        return {
          userId,
          ...(response.data || {}),
        };
      } catch (error) {
        console.log(
          "UNFOLLOW ERROR =>",
          error?.response?.data ||
            error?.message
        );

        return rejectWithValue(
          getErrorMessage(
            error,
            "Failed to unfollow user"
          )
        );
      }
    }
  );

// ======================================================
// GET FOLLOWERS
// GET /api/users/{user_id}/followers
// ======================================================

export const getFollowers =
  createAsyncThunk(
    "follow/getFollowers",

    async (
      {
        userId,
        limit = 20,
        offset = 0,
        append = false,
      },
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== GET FOLLOWERS =========="
        );

        console.log(
          "USER ID =>",
          userId
        );

        console.log(
          "LIMIT =>",
          limit
        );

        console.log(
          "OFFSET =>",
          offset
        );

        console.log(
          "APPEND =>",
          append
        );

        const response =
          await api.get(
            API_ENDPOINTS.follow.getFollowers(
              userId
            ),
            {
              params: {
                limit,
                offset,
              },
            }
          );

        console.log(
          "FOLLOWERS RESPONSE =>",
          response.data
        );

        return {
          ...(response.data || {}),
          userId,
          append,
        };
      } catch (error) {
        console.log(
          "GET FOLLOWERS ERROR =>",
          error?.response?.data ||
            error?.message
        );

        return rejectWithValue(
          getErrorMessage(
            error,
            "Failed to load followers"
          )
        );
      }
    }
  );

// ======================================================
// GET FOLLOWING
// GET /api/users/{user_id}/following
// ======================================================

export const getFollowing =
  createAsyncThunk(
    "follow/getFollowing",

    async (
      {
        userId,
        limit = 20,
        offset = 0,
        append = false,
      },
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== GET FOLLOWING =========="
        );

        console.log(
          "USER ID =>",
          userId
        );

        console.log(
          "LIMIT =>",
          limit
        );

        console.log(
          "OFFSET =>",
          offset
        );

        console.log(
          "APPEND =>",
          append
        );

        const response =
          await api.get(
            API_ENDPOINTS.follow.getFollowing(
              userId
            ),
            {
              params: {
                limit,
                offset,
              },
            }
          );

        console.log(
          "FOLLOWING RESPONSE =>",
          response.data
        );

        return {
          ...(response.data || {}),
          userId,
          append,
        };
      } catch (error) {
        console.log(
          "GET FOLLOWING ERROR =>",
          error?.response?.data ||
            error?.message
        );

        return rejectWithValue(
          getErrorMessage(
            error,
            "Failed to load following"
          )
        );
      }
    }
  );

// ======================================================
// GET SUGGESTED USERS
// GET /api/users/{user_id}/suggested
// ======================================================

export const getSuggestedUsers =
  createAsyncThunk(
    "follow/getSuggestedUsers",

    async (
      {
        userId,
        limit = 10,
        offset = 0,
        append = false,
      },
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== GET SUGGESTED USERS =========="
        );

        console.log(
          "USER ID =>",
          userId
        );

        console.log(
          "LIMIT =>",
          limit
        );

        console.log(
          "OFFSET =>",
          offset
        );

        const response =
          await api.get(
            API_ENDPOINTS.follow.getSuggested(
              userId
            ),
            {
              params: {
                limit,
                offset,
              },
            }
          );

        console.log(
          "SUGGESTED USERS RESPONSE =>",
          response.data
        );

        return {
          ...(response.data || {}),
          userId,
          append,
        };
      } catch (error) {
        console.log(
          "GET SUGGESTED USERS ERROR =>",
          error?.response?.data ||
            error?.message
        );

        return rejectWithValue(
          getErrorMessage(
            error,
            "Failed to load suggested users"
          )
        );
      }
    }
  );

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  // Follow / unfollow
  loading: false,

  error: null,

  success: false,

  message: null,

  // Current user's following status
  // userId -> boolean
  following: {},

  // ====================================================
  // FOLLOWERS
  // ====================================================

  followersItems: [],

  followersTotal: 0,

  followersLimit: 20,

  followersOffset: 0,

  followersHasMore: false,

  followersLoading: false,

  followersError: null,

  // ====================================================
  // FOLLOWING
  // ====================================================

  followingItems: [],

  followingTotal: 0,

  followingLimit: 20,

  followingOffset: 0,

  followingHasMore: false,

  followingLoading: false,

  followingError: null,

  // ====================================================
  // SUGGESTIONS
  // ====================================================

  suggestedUsers: [],

  suggestedTotal: 0,

  suggestedLimit: 10,

  suggestedOffset: 0,

  suggestedHasMore: false,

  suggestedLoading: false,

  suggestedError: null,
};

// ======================================================
// SLICE
// ======================================================

const followSlice = createSlice({
  name: "follow",

  initialState,

  reducers: {
    // ==================================================
    // CLEAR FOLLOW STATE
    // ==================================================

    clearFollowState: (state) => {
      state.loading = false;

      state.error = null;

      state.success = false;

      state.message = null;
    },

    // ==================================================
    // CLEAR FOLLOWERS
    // ==================================================

    clearFollowers: (state) => {
      state.followersItems = [];

      state.followersTotal = 0;

      state.followersOffset = 0;

      state.followersHasMore = false;

      state.followersError = null;
    },

    // ==================================================
    // CLEAR FOLLOWING
    // ==================================================

    clearFollowing: (state) => {
      state.followingItems = [];

      state.followingTotal = 0;

      state.followingOffset = 0;

      state.followingHasMore = false;

      state.followingError = null;
    },

    // ==================================================
    // CLEAR SUGGESTIONS
    // ==================================================

    clearSuggestedUsers: (state) => {
      state.suggestedUsers = [];

      state.suggestedTotal = 0;

      state.suggestedOffset = 0;

      state.suggestedHasMore = false;

      state.suggestedError = null;
    },
  },

  extraReducers: (builder) => {
    // ==================================================
    // FOLLOW
    // ==================================================

    builder
      .addCase(
        followUser.pending,
        (state) => {
          state.loading = true;

          state.error = null;

          state.success = false;

          state.message = null;
        }
      )

      .addCase(
        followUser.fulfilled,
        (state, action) => {
          state.loading = false;

          state.success = true;

          const {
            userId,
            following,
            message,
            request_pending,
          } =
            action.payload;

          const id =
            String(userId);

          // --------------------------------------------
          // IMPORTANT
          // Only backend value.
          // --------------------------------------------

          if (
            typeof following ===
            "boolean"
          ) {
            state.following[id] =
              following;
          }

          state.message =
            message || null;

          // --------------------------------------------
          // Update all lists
          // --------------------------------------------

          const updateUser = (
            user
          ) => {
            if (
              String(user?.id) !==
              id
            ) {
              return;
            }

            if (
              typeof following ===
              "boolean"
            ) {
              user.is_following =
                following;
            }

            if (
              typeof request_pending ===
              "boolean"
            ) {
              user.request_pending =
                request_pending;
            }
          };

          state.followersItems.forEach(
            updateUser
          );

          state.followingItems.forEach(
            updateUser
          );

          state.suggestedUsers.forEach(
            updateUser
          );
        }
      )

      .addCase(
        followUser.rejected,
        (state, action) => {
          state.loading = false;

          state.success = false;

          state.error =
            action.payload;

          state.message =
            action.payload || null;
        }
      );

    // ==================================================
    // UNFOLLOW
    // ==================================================

    builder
      .addCase(
        unfollowUser.pending,
        (state) => {
          state.loading = true;

          state.error = null;

          state.success = false;

          state.message = null;
        }
      )

      .addCase(
        unfollowUser.fulfilled,
        (state, action) => {
          state.loading = false;

          state.success = true;

          const {
            userId,
            following,
            message,
            request_pending,
          } =
            action.payload;

          const id =
            String(userId);

          if (
            typeof following ===
            "boolean"
          ) {
            state.following[id] =
              following;
          }

          state.message =
            message || null;

          const updateUser = (
            user
          ) => {
            if (
              String(user?.id) !==
              id
            ) {
              return;
            }

            if (
              typeof following ===
              "boolean"
            ) {
              user.is_following =
                following;
            }

            if (
              typeof request_pending ===
              "boolean"
            ) {
              user.request_pending =
                request_pending;
            }
          };

          state.followersItems.forEach(
            updateUser
          );

          state.followingItems.forEach(
            updateUser
          );

          state.suggestedUsers.forEach(
            updateUser
          );
        }
      )

      .addCase(
        unfollowUser.rejected,
        (state, action) => {
          state.loading = false;

          state.success = false;

          state.error =
            action.payload;

          state.message =
            action.payload || null;
        }
      );

    // ==================================================
    // FOLLOWERS
    // ==================================================

    builder
      .addCase(
        getFollowers.pending,
        (state, action) => {
          const append =
            action.meta.arg
              ?.append === true;

          state.followersError =
            null;

          if (!append) {
            state.followersLoading =
              true;
          }
        }
      )

      .addCase(
        getFollowers.fulfilled,
        (state, action) => {
          state.followersLoading =
            false;

          state.followersError =
            null;

          const data =
            action.payload || {};

          const items =
            getItems(data);

          const append =
            data.append === true;

          state.followersTotal =
            data.total ??
            state.followersTotal;

          state.followersLimit =
            data.limit ?? 20;

          state.followersOffset =
            data.offset ?? 0;

          if (append) {
            const existingIds =
              new Set(
                state.followersItems.map(
                  (item) =>
                    String(item?.id)
                )
              );

            items.forEach((item) => {
              const id =
                String(item?.id);

              if (
                !existingIds.has(id)
              ) {
                state.followersItems.push(
                  item
                );
              }
            });
          } else {
            state.followersItems =
              items;
          }

          // --------------------------------------------
          // Use backend is_following
          // --------------------------------------------

          items.forEach(
            (user) => {
              if (
                user?.id !==
                  undefined &&
                typeof user?.is_following ===
                  "boolean"
              ) {
                state.following[
                  String(user.id)
                ] =
                  user.is_following;
              }
            }
          );

          state.followersHasMore =
            state.followersItems.length <
            state.followersTotal;
        }
      )

      .addCase(
        getFollowers.rejected,
        (state, action) => {
          state.followersLoading =
            false;

          state.followersError =
            action.payload;
        }
      );

    // ==================================================
    // FOLLOWING
    // ==================================================

    builder
      .addCase(
        getFollowing.pending,
        (state, action) => {
          const append =
            action.meta.arg
              ?.append === true;

          state.followingError =
            null;

          if (!append) {
            state.followingLoading =
              true;
          }
        }
      )

      .addCase(
        getFollowing.fulfilled,
        (state, action) => {
          state.followingLoading =
            false;

          state.followingError =
            null;

          const data =
            action.payload || {};

          const items =
            getItems(data);

          const append =
            data.append === true;

          state.followingTotal =
            data.total ??
            state.followingTotal;

          state.followingLimit =
            data.limit ?? 20;

          state.followingOffset =
            data.offset ?? 0;

          if (append) {
            const existingIds =
              new Set(
                state.followingItems.map(
                  (item) =>
                    String(item?.id)
                )
              );

            items.forEach((item) => {
              const id =
                String(item?.id);

              if (
                !existingIds.has(id)
              ) {
                state.followingItems.push(
                  item
                );
              }
            });
          } else {
            state.followingItems =
              items;
          }

          // --------------------------------------------
          // NEVER force true.
          // Backend decides is_following.
          // --------------------------------------------

          items.forEach(
            (user) => {
              if (
                user?.id !==
                  undefined &&
                typeof user?.is_following ===
                  "boolean"
              ) {
                state.following[
                  String(user.id)
                ] =
                  user.is_following;
              }
            }
          );

          state.followingHasMore =
            state.followingItems.length <
            state.followingTotal;
        }
      )

      .addCase(
        getFollowing.rejected,
        (state, action) => {
          state.followingLoading =
            false;

          state.followingError =
            action.payload;
        }
      );

    // ==================================================
    // SUGGESTED USERS
    // ==================================================

    builder
      .addCase(
        getSuggestedUsers.pending,
        (state, action) => {
          const append =
            action.meta.arg
              ?.append === true;

          state.suggestedError =
            null;

          if (!append) {
            state.suggestedLoading =
              true;
          }
        }
      )

      .addCase(
        getSuggestedUsers.fulfilled,
        (state, action) => {
          state.suggestedLoading =
            false;

          state.suggestedError =
            null;

          const data =
            action.payload || {};

          const items =
            getItems(data);

          const append =
            data.append === true;

          state.suggestedTotal =
            data.total ??
            state.suggestedTotal;

          state.suggestedLimit =
            data.limit ?? 10;

          state.suggestedOffset =
            data.offset ?? 0;

          if (append) {
            const existingIds =
              new Set(
                state.suggestedUsers.map(
                  (item) =>
                    String(item?.id)
                )
              );

            items.forEach((item) => {
              const id =
                String(item?.id);

              if (
                !existingIds.has(id)
              ) {
                state.suggestedUsers.push(
                  item
                );
              }
            });
          } else {
            state.suggestedUsers =
              items;
          }

          items.forEach(
            (user) => {
              if (
                user?.id !==
                  undefined &&
                typeof user?.is_following ===
                  "boolean"
              ) {
                state.following[
                  String(user.id)
                ] =
                  user.is_following;
              }
            }
          );

          state.suggestedHasMore =
            state.suggestedUsers.length <
            state.suggestedTotal;
        }
      )

      .addCase(
        getSuggestedUsers.rejected,
        (state, action) => {
          state.suggestedLoading =
            false;

          state.suggestedError =
            action.payload;
        }
      );
  },
});

// ======================================================
// ACTIONS
// ======================================================

export const {
  clearFollowState,
  clearFollowers,
  clearFollowing,
  clearSuggestedUsers,
} =
  followSlice.actions;

// ======================================================
// SELECTORS
// ======================================================

export const selectSuggestedUsers = (
  state
) =>
  state.follow?.suggestedUsers || [];

export const selectSuggestedTotal = (
  state
) =>
  state.follow?.suggestedTotal || 0;

export const selectSuggestedLoading = (
  state
) =>
  state.follow?.suggestedLoading || false;

export const selectSuggestedError = (
  state
) =>
  state.follow?.suggestedError || null;

export const selectFollowLoading = (
  state
) =>
  state.follow?.loading || false;

export const selectFollowError = (
  state
) =>
  state.follow?.error || null;

export const selectFollowSuccess = (
  state
) =>
  state.follow?.success || false;

export const selectFollowMessage = (
  state
) =>
  state.follow?.message || null;

// ======================================================
// FOLLOWING STATUS
// ======================================================

export const selectFollowingStatus = (
  state,
  userId
) => {
  if (
    userId === undefined ||
    userId === null
  ) {
    return undefined;
  }

  return (
    state.follow?.following?.[
      String(userId)
    ]
  );
};

// ======================================================
// FOLLOWERS
// ======================================================

export const selectFollowers = (
  state
) =>
  state.follow?.followersItems || [];

export const selectFollowersTotal = (
  state
) =>
  state.follow?.followersTotal || 0;

export const selectFollowersLoading = (
  state
) =>
  state.follow?.followersLoading || false;

export const selectFollowersError = (
  state
) =>
  state.follow?.followersError || null;

export const selectFollowersHasMore = (
  state
) =>
  state.follow?.followersHasMore || false;

// ======================================================
// FOLLOWING
// ======================================================

export const selectFollowing = (
  state
) =>
  state.follow?.followingItems || [];

export const selectFollowingTotal = (
  state
) =>
  state.follow?.followingTotal || 0;

export const selectFollowingLoading = (
  state
) =>
  state.follow?.followingLoading || false;

export const selectFollowingError = (
  state
) =>
  state.follow?.followingError || null;

export const selectFollowingHasMore = (
  state
) =>
  state.follow?.followingHasMore || false;

// ======================================================
// REDUCER
// ======================================================

export default followSlice.reducer;