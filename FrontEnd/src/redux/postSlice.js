import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../utils/api";

import {
  API_ENDPOINTS,
} from "../config/apiEndpoints";

import {
  getUserStats,
} from "./statsSlice";

/* ============================================================
   CREATE POST
============================================================ */

export const createPost =
  createAsyncThunk(
    "posts/createPost",
    async (
      formData,
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== CREATE POST =========="
        );

        const response =
          await api.post(
            API_ENDPOINTS.posts.createPost,
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },

              timeout: 180000,
            }
          );

        console.log(
          "POST CREATED =>",
          response.data
        );

        return response.data;

      } catch (error) {

        console.log(
          "CREATE POST ERROR =>",
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

/* ============================================================
   GET USER POSTS
============================================================ */

export const getUserPosts =
  createAsyncThunk(
    "posts/getUserPosts",
    async (
      userId,
      { rejectWithValue }
    ) => {
      try {

        const response =
          await api.get(
            API_ENDPOINTS.profile.getUserPosts(
              userId
            ),
            {
              params: {
                limit: 100,
                offset: 0,
              },
            }
          );

        return response.data;

      } catch (error) {

        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

/* ============================================================
   HOME FEED
============================================================ */

export const getHomeFeed =
  createAsyncThunk(
    "posts/getHomeFeed",
    async (
      {
        limit = 20,
        offset = 0,
      } = {},
      { rejectWithValue }
    ) => {
      try {

        const response =
          await api.get(
            API_ENDPOINTS.posts.getFeed,
            {
              params: {
                limit,
                offset,
              },
            }
          );

        return response.data;

      } catch (error) {

        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

/* ============================================================
   EXPLORE
============================================================ */

export const getExploreFeed =
  createAsyncThunk(
    "posts/getExploreFeed",
    async (
      {
        limit = 20,
        offset = 0,
      } = {},
      { rejectWithValue }
    ) => {
      try {

        const response =
          await api.get(
            API_ENDPOINTS.posts.getExplore,
            {
              params: {
                limit,
                offset,
              },
            }
          );

        return response.data;

      } catch (error) {

        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

/* ============================================================
   UPDATE
============================================================ */

export const updatePost =
  createAsyncThunk(
    "posts/updatePost",
    async (
      {
        postId,
        caption,
      },
      { rejectWithValue }
    ) => {
      try {

        const response =
          await api.put(
            API_ENDPOINTS.posts.updatePost(
              postId
            ),
            {
              caption,
            }
          );

        return response.data;

      } catch (error) {

        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

/* ============================================================
   DELETE
============================================================ */

export const deletePost =
  createAsyncThunk(
    "posts/deletePost",
    async (
      {
        postId,
        userId,
      },
      {
        dispatch,
        rejectWithValue,
      }
    ) => {
      try {

        const numericPostId =
          Number(postId);

        if (
          !Number.isInteger(
            numericPostId
          )
        ) {
          return rejectWithValue({
            message:
              "Invalid post ID",
          });
        }

        const response =
          await api.delete(
            API_ENDPOINTS.posts.deletePost(
              numericPostId
            )
          );

        if (userId) {
          try {
            await dispatch(
              getUserStats(
                userId
              )
            ).unwrap();
          } catch (e) {
            console.log(
              "STATS ERROR =>",
              e
            );
          }
        }

        return {
          postId:
            numericPostId,

          data:
            response.data,
        };

      } catch (error) {

        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

/* ============================================================
   SAVE
============================================================ */

export const savePost =
  createAsyncThunk(
    "posts/savePost",
    async (
      postId,
      { rejectWithValue }
    ) => {
      try {

        const response =
          await api.post(
            API_ENDPOINTS.posts.savePost(
              postId
            )
          );

        return {
          postId,
          data:
            response.data,
        };

      } catch (error) {

        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

/* ============================================================
   UNSAVE
============================================================ */

export const unsavePost =
  createAsyncThunk(
    "posts/unsavePost",
    async (
      postId,
      { rejectWithValue }
    ) => {
      try {

        const response =
          await api.delete(
            API_ENDPOINTS.posts.unsavePost(
              postId
            )
          );

        return {
          postId,
          data:
            response.data,
        };

      } catch (error) {

        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

/* ============================================================
   SLICE
============================================================ */

const postSlice =
  createSlice({
    name: "posts",

    initialState: {
      createPostData: null,

      userPosts: [],
      totalPosts: 0,

      homeFeed: [],
      homeFeedTotal: 0,

      exploreFeed: [],
      exploreFeedTotal: 0,

      loading: false,

      postsLoading: false,
      homeFeedLoading: false,
      exploreFeedLoading: false,

      error: null,
      postsError: null,

      homeFeedError: null,
      exploreFeedError: null,
    },

    reducers: {},

    extraReducers:
      (builder) => {

        /* CREATE */

        builder.addCase(
          createPost.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          }
        );

        builder.addCase(
          createPost.fulfilled,
          (
            state,
            action
          ) => {

            state.loading =
              false;

            state.createPostData =
              action.payload;

            const post =
              action.payload;

            if (!post?.id) {
              return;
            }

            const exists =
              state.userPosts.some(
                (item) =>
                  String(
                    item.id
                  ) ===
                  String(
                    post.id
                  )
              );

            if (!exists) {
              state.userPosts.unshift(
                post
              );
            }

            state.totalPosts =
              state.userPosts.length;

            /*
             * Add newly created post
             * to home feed.
             */
            const homeExists =
              state.homeFeed.some(
                (item) =>
                  String(
                    item.id
                  ) ===
                  String(
                    post.id
                  )
              );

            if (!homeExists) {
              state.homeFeed.unshift(
                post
              );
            }

            /*
             * Add to explore too.
             */
            const exploreExists =
              state.exploreFeed.some(
                (item) =>
                  String(
                    item.id
                  ) ===
                  String(
                    post.id
                  )
              );

            if (!exploreExists) {
              state.exploreFeed.unshift(
                post
              );
            }
          }
        );

        builder.addCase(
          createPost.rejected,
          (
            state,
            action
          ) => {

            state.loading =
              false;

            state.error =
              action.payload;
          }
        );

        /* USER POSTS */

        builder.addCase(
          getUserPosts.pending,
          (state) => {
            state.postsLoading =
              true;

            state.postsError =
              null;
          }
        );

        builder.addCase(
          getUserPosts.fulfilled,
          (
            state,
            action
          ) => {

            state.postsLoading =
              false;

            const items =
              action.payload
                ?.items || [];

            state.userPosts =
              Array.from(
                new Map(
                  items.map(
                    (post) => [
                      post.id,
                      post,
                    ]
                  )
                ).values()
              );

            state.totalPosts =
              action.payload?.total ||
              state.userPosts.length;
          }
        );

        builder.addCase(
          getUserPosts.rejected,
          (
            state,
            action
          ) => {

            state.postsLoading =
              false;

            state.postsError =
              action.payload;

            state.userPosts = [];
          }
        );

        /* HOME */

        builder.addCase(
          getHomeFeed.pending,
          (state) => {

            state.homeFeedLoading =
              true;

            state.homeFeedError =
              null;
          }
        );

        builder.addCase(
          getHomeFeed.fulfilled,
          (
            state,
            action
          ) => {

            state.homeFeedLoading =
              false;

            state.homeFeed =
              action.payload
                ?.items || [];

            state.homeFeedTotal =
              action.payload?.total ||
              state.homeFeed.length;
          }
        );

        builder.addCase(
          getHomeFeed.rejected,
          (
            state,
            action
          ) => {

            state.homeFeedLoading =
              false;

            state.homeFeedError =
              action.payload;

            state.homeFeed = [];
          }
        );

        /* EXPLORE */

        builder.addCase(
          getExploreFeed.pending,
          (state) => {

            state.exploreFeedLoading =
              true;

            state.exploreFeedError =
              null;
          }
        );

        builder.addCase(
          getExploreFeed.fulfilled,
          (
            state,
            action
          ) => {

            state.exploreFeedLoading =
              false;

            state.exploreFeed =
              action.payload
                ?.items || [];

            state.exploreFeedTotal =
              action.payload?.total ||
              state.exploreFeed.length;
          }
        );

        builder.addCase(
          getExploreFeed.rejected,
          (
            state,
            action
          ) => {

            state.exploreFeedLoading =
              false;

            state.exploreFeedError =
              action.payload;

            state.exploreFeed = [];
          }
        );

        /* UPDATE */

        builder.addCase(
          updatePost.fulfilled,
          (
            state,
            action
          ) => {

            const updated =
              action.payload;

            const updateArray =
              (array) => {

                const index =
                  array.findIndex(
                    (item) =>
                      String(
                        item.id
                      ) ===
                      String(
                        updated.id
                      )
                  );

                if (
                  index !== -1
                ) {
                  array[index] =
                    updated;
                }
              };

            updateArray(
              state.userPosts
            );

            updateArray(
              state.homeFeed
            );

            updateArray(
              state.exploreFeed
            );
          }
        );

        /* DELETE */

        builder.addCase(
          deletePost.fulfilled,
          (
            state,
            action
          ) => {

            const deletedId =
              action.payload
                ?.postId;

            state.userPosts =
              state.userPosts.filter(
                (post) =>
                  String(
                    post.id
                  ) !==
                  String(
                    deletedId
                  )
              );

            state.homeFeed =
              state.homeFeed.filter(
                (post) =>
                  String(
                    post.id
                  ) !==
                  String(
                    deletedId
                  )
              );

            state.exploreFeed =
              state.exploreFeed.filter(
                (post) =>
                  String(
                    post.id
                  ) !==
                  String(
                    deletedId
                  )
              );

            state.totalPosts =
              state.userPosts.length;
          }
        );

        /* SAVE */

        builder.addCase(
          savePost.fulfilled,
          (
            state,
            action
          ) => {

            const id =
              action.payload
                .postId;

            const markSaved =
              (array) => {

                const post =
                  array.find(
                    (item) =>
                      String(
                        item.id
                      ) ===
                      String(id)
                  );

                if (post) {
                  post.is_saved =
                    true;
                }
              };

            markSaved(
              state.userPosts
            );

            markSaved(
              state.homeFeed
            );

            markSaved(
              state.exploreFeed
            );
          }
        );

        /* UNSAVE */

        builder.addCase(
          unsavePost.fulfilled,
          (
            state,
            action
          ) => {

            const id =
              action.payload
                .postId;

            const markUnsaved =
              (array) => {

                const post =
                  array.find(
                    (item) =>
                      String(
                        item.id
                      ) ===
                      String(id)
                  );

                if (post) {
                  post.is_saved =
                    false;
                }
              };

            markUnsaved(
              state.userPosts
            );

            markUnsaved(
              state.homeFeed
            );

            markUnsaved(
              state.exploreFeed
            );
          }
        );
      },
  });

export default postSlice.reducer;