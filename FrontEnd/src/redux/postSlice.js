// import {
//   createSlice,
//   createAsyncThunk,
// } from "@reduxjs/toolkit";

// import api from "../utils/api";
// import { API_ENDPOINTS } from "../config/apiEndpoints";
// import { getUserStats } from "./statsSlice";

// // ==========================================
// // CREATE POST
// // ==========================================

// export const createPost = createAsyncThunk(
//   "posts/createPost",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await api.post(
//         API_ENDPOINTS.posts.createPost,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("POST CREATED =>", response.data);

//       return response.data;
//     } catch (error) {
//       console.log(
//         "CREATE POST ERROR =>",
//         error.response?.data || error.message
//       );

//       return rejectWithValue(
//         error.response?.data || error.message
//       );
//     }
//   }
// );

// // ==========================================
// // GET USER POSTS
// // ==========================================

// export const getUserPosts = createAsyncThunk(
//   "profile/getUserPosts",
//   async (userId, { rejectWithValue }) => {
//     try {
//       console.log(
//         "========== GET USER POSTS =========="
//       );

//       console.log("USER ID =>", userId);

//       const response = await api.get(
//         API_ENDPOINTS.profile.getUserPosts(userId),
//         {
//           params: {
//             limit: 100,
//             offset: 0,
//           },
//         }
//       );

//       console.log(
//         "GET USER POSTS RESPONSE =>",
//         response.data
//       );

//       return response.data;
//     } catch (error) {
//       console.log(
//         "GET USER POSTS ERROR =>",
//         error.response?.data || error.message
//       );

//       return rejectWithValue(
//         error.response?.data || error.message
//       );
//     }
//   }
// );

// // ==========================================
// // GET HOME FEED
// // ==========================================

// export const getHomeFeed = createAsyncThunk(
//   "posts/getHomeFeed",
//   async (
//     { limit = 20, offset = 0 } = {},
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log(
//         "========== GET HOME FEED =========="
//       );

//       const response = await api.get(
//         API_ENDPOINTS.posts.getFeed,
//         {
//           params: {
//             limit,
//             offset,
//           },
//         }
//       );

//       console.log(
//         "HOME FEED RESPONSE =>",
//         response.data
//       );

//       return response.data;
//     } catch (error) {
//       console.log(
//         "HOME FEED ERROR =>",
//         error.response?.data || error.message
//       );

//       return rejectWithValue(
//         error.response?.data || error.message
//       );
//     }
//   }
// );

// // ==========================================
// // GET EXPLORE FEED
// // ==========================================

// export const getExploreFeed = createAsyncThunk(
//   "posts/getExploreFeed",
//   async (
//     { limit = 20, offset = 0 } = {},
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log(
//         "========== GET EXPLORE FEED =========="
//       );

//       const response = await api.get(
//         API_ENDPOINTS.posts.getExplore,
//         {
//           params: {
//             limit,
//             offset,
//           },
//         }
//       );

//       console.log(
//         "EXPLORE FEED RESPONSE =>",
//         response.data
//       );

//       return response.data;
//     } catch (error) {
//       console.log(
//         "EXPLORE FEED ERROR =>",
//         error.response?.data || error.message
//       );

//       return rejectWithValue(
//         error.response?.data || error.message
//       );
//     }
//   }
// );

// // ==========================================
// // UPDATE POST
// // ==========================================

// export const updatePost = createAsyncThunk(
//   "posts/updatePost",
//   async (
//     { postId, caption },
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log(
//         "========== UPDATE POST =========="
//       );

//       console.log("POST ID =>", postId);
//       console.log("CAPTION =>", caption);

//       const response = await api.put(
//         API_ENDPOINTS.posts.updatePost(postId),
//         {
//           caption,
//         }
//       );

//       console.log(
//         "UPDATE POST RESPONSE =>",
//         response.data
//       );

//       return response.data;
//     } catch (error) {
//       console.log(
//         "UPDATE POST ERROR =>",
//         error.response?.data ||
//           error.message
//       );

//       return rejectWithValue(
//         error.response?.data ||
//           error.message
//       );
//     }
//   }
// );

// // ==========================================
// // DELETE POST
// // ==========================================

// export const deletePost = createAsyncThunk(
//   "posts/deletePost",
//   async (
//     { postId, userId },
//     { dispatch, rejectWithValue }
//   ) => {
//     try {
//       console.log(
//         "========== DELETE POST =========="
//       );

//       console.log("RAW POST ID =>", postId);
//       console.log("USER ID =>", userId);

//       // Make sure backend receives an integer
//       const numericPostId = Number(postId);

//       if (!Number.isInteger(numericPostId)) {
//         console.log(
//           "INVALID POST ID =>",
//           postId
//         );

//         return rejectWithValue({
//           message: "Invalid post ID",
//         });
//       }

//       console.log(
//         "NUMERIC POST ID =>",
//         numericPostId
//       );

//       // DELETE /api/posts/{post_id}
//       const response = await api.delete(
//         API_ENDPOINTS.posts.deletePost(
//           numericPostId
//         )
//       );

//       console.log(
//         "DELETE POST RESPONSE =>",
//         response.data
//       );

//       // ==========================================
//       // REFRESH USER STATS IMMEDIATELY
//       // ==========================================

//       if (userId) {
//         console.log(
//           "REFRESHING USER STATS =>",
//           userId
//         );

//         await dispatch(
//           getUserStats(userId)
//         ).unwrap();

//         console.log(
//           "USER STATS REFRESHED"
//         );
//       }

//       return {
//         postId: numericPostId,
//         data: response.data,
//       };

//     } catch (error) {
//       console.log(
//         "DELETE POST ERROR =>",
//         error.response?.data ||
//           error.message
//       );

//       return rejectWithValue(
//         error.response?.data ||
//           error.message
//       );
//     }
//   }
// );

// // ==========================================
// // SAVE POST
// // ==========================================

// export const savePost = createAsyncThunk(
//   "posts/savePost",
//   async (
//     postId,
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log(
//         "========== SAVE POST =========="
//       );

//       console.log("POST ID =>", postId);

//       const response = await api.post(
//         API_ENDPOINTS.posts.savePost(postId)
//       );

//       console.log(
//         "SAVE POST RESPONSE =>",
//         response.data
//       );

//       return {
//         postId,
//         data: response.data,
//       };
//     } catch (error) {
//       console.log(
//         "SAVE POST ERROR =>",
//         error.response?.data ||
//           error.message
//       );

//       return rejectWithValue(
//         error.response?.data ||
//           error.message
//       );
//     }
//   }
// );

// // ==========================================
// // UNSAVE POST
// // ==========================================

// export const unsavePost = createAsyncThunk(
//   "posts/unsavePost",
//   async (
//     postId,
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log(
//         "========== UNSAVE POST =========="
//       );

//       console.log("POST ID =>", postId);

//       const response = await api.delete(
//         API_ENDPOINTS.posts.unsavePost(postId)
//       );

//       console.log(
//         "UNSAVE POST RESPONSE =>",
//         response.data
//       );

//       return {
//         postId,
//         data: response.data,
//       };
//     } catch (error) {
//       console.log(
//         "UNSAVE POST ERROR =>",
//         error.response?.data ||
//           error.message
//       );

//       return rejectWithValue(
//         error.response?.data ||
//           error.message
//       );
//     }
//   }
// );

// // ==========================================
// // SLICE
// // ==========================================

// const postSlice = createSlice({
//   name: "posts",

//   initialState: {
//     createPostData: null,

//     userPosts: [],
//     totalPosts: 0,

//     homeFeed: [],
//     homeFeedTotal: 0,

//     exploreFeed: [],
//     exploreFeedTotal: 0,

//     loading: false,

//     postsLoading: false,
//     homeFeedLoading: false,
//     exploreFeedLoading: false,

//     error: null,
//     postsError: null,

//     homeFeedError: null,
//     exploreFeedError: null,
//   },

//   reducers: {},

//   extraReducers: (builder) => {
//     builder

//       // ==========================================
//       // CREATE POST
//       // ==========================================

//       .addCase(
//         createPost.pending,
//         (state) => {
//           state.loading = true;
//           state.error = null;
//         }
//       )

//       .addCase(
//         createPost.fulfilled,
//         (state, action) => {
//           state.loading = false;

//           state.createPostData =
//             action.payload;

//           const newPost =
//             action.payload;

//           if (
//             newPost &&
//             newPost.id
//           ) {
//             const alreadyExists =
//               state.userPosts.some(
//                 (post) =>
//                   String(post.id) ===
//                   String(newPost.id)
//               );

//             if (!alreadyExists) {
//               state.userPosts.unshift(
//                 newPost
//               );
//             }
//           }

//           state.totalPosts =
//             state.userPosts.length;
//         }
//       )

//       .addCase(
//         createPost.rejected,
//         (state, action) => {
//           state.loading = false;

//           state.error =
//             action.payload;
//         }
//       )

//       // ==========================================
//       // GET USER POSTS
//       // ==========================================

//       .addCase(
//         getUserPosts.pending,
//         (state) => {
//           state.postsLoading = true;
//           state.postsError = null;
//         }
//       )

//       .addCase(
//         getUserPosts.fulfilled,
//         (state, action) => {
//           state.postsLoading = false;

//           const items =
//             action.payload?.items || [];

//           const uniquePosts =
//             Array.from(
//               new Map(
//                 items.map((post) => [
//                   post.id,
//                   post,
//                 ])
//               ).values()
//             );

//           state.userPosts =
//             uniquePosts;

//           state.totalPosts =
//             action.payload?.total ||
//             uniquePosts.length;
//         }
//       )

//       .addCase(
//         getUserPosts.rejected,
//         (state, action) => {
//           state.postsLoading = false;

//           state.postsError =
//             action.payload;

//           state.userPosts = [];
//         }
//       )

//       // ==========================================
//       // HOME FEED
//       // ==========================================

//       .addCase(
//         getHomeFeed.pending,
//         (state) => {
//           state.homeFeedLoading = true;
//           state.homeFeedError = null;
//         }
//       )

//       .addCase(
//         getHomeFeed.fulfilled,
//         (state, action) => {
//           state.homeFeedLoading = false;

//           state.homeFeed =
//             action.payload?.items || [];

//           state.homeFeedTotal =
//             action.payload?.total ||
//             state.homeFeed.length;
//         }
//       )

//       .addCase(
//         getHomeFeed.rejected,
//         (state, action) => {
//           state.homeFeedLoading = false;

//           state.homeFeedError =
//             action.payload;

//           state.homeFeed = [];
//         }
//       )

//       // ==========================================
//       // EXPLORE FEED
//       // ==========================================

//       .addCase(
//         getExploreFeed.pending,
//         (state) => {
//           state.exploreFeedLoading = true;
//           state.exploreFeedError = null;
//         }
//       )

//       .addCase(
//         getExploreFeed.fulfilled,
//         (state, action) => {
//           state.exploreFeedLoading = false;

//           state.exploreFeed =
//             action.payload?.items || [];

//           state.exploreFeedTotal =
//             action.payload?.total ||
//             state.exploreFeed.length;
//         }
//       )

//       .addCase(
//         getExploreFeed.rejected,
//         (state, action) => {
//           state.exploreFeedLoading = false;

//           state.exploreFeedError =
//             action.payload;

//           state.exploreFeed = [];
//         }
//       )

//       // ==========================================
//       // UPDATE POST
//       // ==========================================

//       .addCase(
//         updatePost.pending,
//         (state) => {
//           state.loading = true;
//           state.error = null;
//         }
//       )

//       .addCase(
//         updatePost.fulfilled,
//         (state, action) => {
//           state.loading = false;

//           const updatedPost =
//             action.payload;

//           const index =
//             state.userPosts.findIndex(
//               (post) =>
//                 String(post.id) ===
//                 String(updatedPost.id)
//             );

//           if (index !== -1) {
//             state.userPosts[index] =
//               updatedPost;
//           }
//         }
//       )

//       .addCase(
//         updatePost.rejected,
//         (state, action) => {
//           state.loading = false;

//           state.error =
//             action.payload;
//         }
//       )

//       // ==========================================
//       // DELETE POST
//       // ==========================================

//       .addCase(
//         deletePost.pending,
//         (state) => {
//           state.loading = true;
//           state.error = null;
//         }
//       )

//    .addCase(
//   deletePost.fulfilled,
//   (state, action) => {
//     state.loading = false;

//     const deletedPostId =
//       action.payload.postId;

//     state.userPosts =
//       state.userPosts.filter(
//         (post) =>
//           String(post.id) !==
//           String(deletedPostId)
//       );

//     state.totalPosts =
//       state.userPosts.length;
//   }
// )

//       .addCase(
//         deletePost.rejected,
//         (state, action) => {
//           state.loading = false;

//           state.error =
//             action.payload;
//         }
//       )

//       // ==========================================
//       // SAVE POST
//       // ==========================================

//       .addCase(
//         savePost.pending,
//         (state) => {
//           state.error = null;
//         }
//       )

//       .addCase(
//         savePost.fulfilled,
//         (state, action) => {
//           const postId =
//             action.payload.postId;

//           const post =
//             state.userPosts.find(
//               (item) =>
//                 String(item.id) ===
//                 String(postId)
//             );

//           if (post) {
//             post.is_saved = true;
//           }
//         }
//       )

//       .addCase(
//         savePost.rejected,
//         (state, action) => {
//           state.error =
//             action.payload;
//         }
//       )

//       // ==========================================
//       // UNSAVE POST
//       // ==========================================

//       .addCase(
//         unsavePost.pending,
//         (state) => {
//           state.error = null;
//         }
//       )

//       .addCase(
//         unsavePost.fulfilled,
//         (state, action) => {
//           const postId =
//             action.payload.postId;

//           const post =
//             state.userPosts.find(
//               (item) =>
//                 String(item.id) ===
//                 String(postId)
//             );

//           if (post) {
//             post.is_saved = false;
//           }
//         }
//       )

//       .addCase(
//         unsavePost.rejected,
//         (state, action) => {
//           state.error =
//             action.payload;
//         }
//       );
//   },
// });

// export default postSlice.reducer;


import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../utils/api";
import { API_ENDPOINTS } from "../config/apiEndpoints";
import { getUserStats } from "./statsSlice";

// ======================================================
// CREATE POST
// ======================================================

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.posts.createPost,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
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

// ======================================================
// GET USER POSTS
// ======================================================

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (
    userId,
    { rejectWithValue }
  ) => {
    try {
      console.log(
        "========== GET USER POSTS =========="
      );

      console.log(
        "USER ID =>",
        userId
      );

      const response = await api.get(
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

      console.log(
        "GET USER POSTS RESPONSE =>",
        response.data
      );

      return response.data;
    } catch (error) {
      console.log(
        "GET USER POSTS ERROR =>",
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

// ======================================================
// GET HOME FEED
// ======================================================

export const getHomeFeed = createAsyncThunk(
  "posts/getHomeFeed",
  async (
    {
      limit = 20,
      offset = 0,
    } = {},
    { rejectWithValue }
  ) => {
    try {
      console.log(
        "========== GET HOME FEED =========="
      );

      const response = await api.get(
        API_ENDPOINTS.posts.getFeed,
        {
          params: {
            limit,
            offset,
          },
        }
      );

      console.log(
        "HOME FEED RESPONSE =>",
        response.data
      );

      return response.data;
    } catch (error) {
      console.log(
        "HOME FEED ERROR =>",
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

// ======================================================
// GET EXPLORE FEED
// ======================================================

export const getExploreFeed = createAsyncThunk(
  "posts/getExploreFeed",
  async (
    {
      limit = 20,
      offset = 0,
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.posts.getExplore,
        {
          params: {
            limit,
            offset,
          },
        }
      );

      console.log(
        "EXPLORE FEED RESPONSE =>",
        response.data
      );

      return response.data;
    } catch (error) {
      console.log(
        "EXPLORE FEED ERROR =>",
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

// ======================================================
// UPDATE POST
// ======================================================

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (
    {
      postId,
      caption,
    },
    { rejectWithValue }
  ) => {
    try {
      console.log(
        "========== UPDATE POST =========="
      );

      const response = await api.put(
        API_ENDPOINTS.posts.updatePost(
          postId
        ),
        {
          caption,
        }
      );

      return response.data;
    } catch (error) {
      console.log(
        "UPDATE POST ERROR =>",
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

// ======================================================
// DELETE POST
// ======================================================

export const deletePost = createAsyncThunk(
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
      console.log(
        "========== DELETE POST =========="
      );

      console.log(
        "RAW POST ID =>",
        postId
      );

      console.log(
        "USER ID =>",
        userId
      );

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

      console.log(
        "NUMERIC POST ID =>",
        numericPostId
      );

      // ================================================
      // DELETE API
      // ================================================

      const response =
        await api.delete(
          API_ENDPOINTS.posts.deletePost(
            numericPostId
          )
        );

      console.log(
        "DELETE POST RESPONSE =>",
        response.data
      );

      // ================================================
      // REFRESH USER STATS
      // ================================================

      if (userId) {
        try {
          await dispatch(
            getUserStats(userId)
          ).unwrap();

          console.log(
            "USER STATS REFRESHED"
          );
        } catch (statsError) {
          console.log(
            "STATS REFRESH ERROR =>",
            statsError
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
      console.log(
        "DELETE POST ERROR =>",
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

// ======================================================
// SAVE POST
// ======================================================

export const savePost = createAsyncThunk(
  "posts/savePost",

  async (
    postId,
    { rejectWithValue }
  ) => {
    try {
      console.log(
        "========== SAVE POST =========="
      );

      console.log(
        "POST ID =>",
        postId
      );

      const response =
        await api.post(
          API_ENDPOINTS.posts.savePost(
            postId
          )
        );

      console.log(
        "SAVE POST RESPONSE =>",
        response.data
      );

      return {
        postId,
        data:
          response.data,
      };
    } catch (error) {
      console.log(
        "SAVE POST ERROR =>",
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

// ======================================================
// UNSAVE POST
// ======================================================

export const unsavePost =
  createAsyncThunk(
    "posts/unsavePost",

    async (
      postId,
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== UNSAVE POST =========="
        );

        console.log(
          "POST ID =>",
          postId
        );

        const response =
          await api.delete(
            API_ENDPOINTS.posts.unsavePost(
              postId
            )
          );

        console.log(
          "UNSAVE POST RESPONSE =>",
          response.data
        );

        return {
          postId,
          data:
            response.data,
        };
      } catch (error) {
        console.log(
          "UNSAVE POST ERROR =>",
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

// ======================================================
// SLICE
// ======================================================

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

    extraReducers: (
      builder
    ) => {
      builder

        // ==================================================
        // CREATE POST
        // ==================================================

        .addCase(
          createPost.pending,
          (state) => {
            state.loading =
              true;

            state.error =
              null;
          }
        )

        .addCase(
          createPost.fulfilled,
          (
            state,
            action
          ) => {
            state.loading =
              false;

            state.createPostData =
              action.payload;

            const newPost =
              action.payload;

            if (
              newPost?.id
            ) {
              const exists =
                state.userPosts.some(
                  (post) =>
                    String(
                      post.id
                    ) ===
                    String(
                      newPost.id
                    )
                );

              if (!exists) {
                state.userPosts.unshift(
                  newPost
                );
              }
            }

            state.totalPosts =
              state.userPosts.length;
          }
        )

        .addCase(
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
        )

        // ==================================================
        // GET USER POSTS
        // ==================================================

        .addCase(
          getUserPosts.pending,
          (state) => {
            state.postsLoading =
              true;

            state.postsError =
              null;
          }
        )

        .addCase(
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

            const uniquePosts =
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

            state.userPosts =
              uniquePosts;

            state.totalPosts =
              action.payload
                ?.total ||
              uniquePosts.length;
          }
        )

        .addCase(
          getUserPosts.rejected,
          (
            state,
            action
          ) => {
            state.postsLoading =
              false;

            state.postsError =
              action.payload;

            state.userPosts =
              [];
          }
        )

        // ==================================================
        // HOME FEED
        // ==================================================

        .addCase(
          getHomeFeed.pending,
          (state) => {
            state.homeFeedLoading =
              true;

            state.homeFeedError =
              null;
          }
        )

        .addCase(
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
              action.payload
                ?.total ||
              state.homeFeed.length;
          }
        )

        .addCase(
          getHomeFeed.rejected,
          (
            state,
            action
          ) => {
            state.homeFeedLoading =
              false;

            state.homeFeedError =
              action.payload;

            state.homeFeed =
              [];
          }
        )

        // ==================================================
        // EXPLORE FEED
        // ==================================================

        .addCase(
          getExploreFeed.pending,
          (state) => {
            state.exploreFeedLoading =
              true;

            state.exploreFeedError =
              null;
          }
        )

        .addCase(
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
              action.payload
                ?.total ||
              state.exploreFeed.length;
          }
        )

        .addCase(
          getExploreFeed.rejected,
          (
            state,
            action
          ) => {
            state.exploreFeedLoading =
              false;

            state.exploreFeedError =
              action.payload;

            state.exploreFeed =
              [];
          }
        )

        // ==================================================
        // UPDATE POST
        // ==================================================

        .addCase(
          updatePost.fulfilled,
          (
            state,
            action
          ) => {
            const updatedPost =
              action.payload;

            // USER POSTS
            const userIndex =
              state.userPosts.findIndex(
                (post) =>
                  String(
                    post.id
                  ) ===
                  String(
                    updatedPost.id
                  )
              );

            if (
              userIndex !== -1
            ) {
              state.userPosts[
                userIndex
              ] =
                updatedPost;
            }

            // HOME FEED
            const homeIndex =
              state.homeFeed.findIndex(
                (post) =>
                  String(
                    post.id
                  ) ===
                  String(
                    updatedPost.id
                  )
              );

            if (
              homeIndex !== -1
            ) {
              state.homeFeed[
                homeIndex
              ] =
                updatedPost;
            }

            // EXPLORE
            const exploreIndex =
              state.exploreFeed.findIndex(
                (post) =>
                  String(
                    post.id
                  ) ===
                  String(
                    updatedPost.id
                  )
              );

            if (
              exploreIndex !== -1
            ) {
              state.exploreFeed[
                exploreIndex
              ] =
                updatedPost;
            }
          }
        )

        // ==================================================
        // DELETE POST
        // ==================================================

        .addCase(
          deletePost.pending,
          (state) => {
            state.loading =
              true;

            state.error =
              null;
          }
        )

        .addCase(deletePost.fulfilled, (state, action) => {
  const deletedPostId =
    action.payload?.id ??
    action.meta.arg?.postId;

  state.homeFeed =
    state.homeFeed.filter(
      (post) =>
        String(post.id) !==
        String(deletedPostId)
    );
})
        .addCase(
          deletePost.rejected,
          (
            state,
            action
          ) => {
            state.loading =
              false;

            state.error =
              action.payload;
          }
        )

        

        // ==================================================
        // SAVE POST
        // ==================================================

        .addCase(
          savePost.fulfilled,
          (
            state,
            action
          ) => {
            const postId =
              action.payload
                .postId;

            // USER POSTS
            const userPost =
              state.userPosts.find(
                (post) =>
                  String(
                    post.id
                  ) ===
                  String(postId)
              );

            if (userPost) {
              userPost.is_saved =
                true;
            }

            // HOME FEED
            const homePost =
              state.homeFeed.find(
                (post) =>
                  String(
                    post.id
                  ) ===
                  String(postId)
              );

            if (homePost) {
              homePost.is_saved =
                true;
            }

            // EXPLORE
            const explorePost =
              state.exploreFeed.find(
                (post) =>
                  String(
                    post.id
                  ) ===
                  String(postId)
              );

            if (explorePost) {
              explorePost.is_saved =
                true;
            }

            console.log(
              "POST SAVED LOCALLY =>",
              postId
            );
          }
        )

        .addCase(
          savePost.rejected,
          (
            state,
            action
          ) => {
            state.error =
              action.payload;
          }
        )

        // ==================================================
        // UNSAVE POST
        // ==================================================

        .addCase(
          unsavePost.fulfilled,
          (
            state,
            action
          ) => {
            const postId =
              action.payload
                .postId;

            // USER POSTS
            const userPost =
              state.userPosts.find(
                (post) =>
                  String(
                    post.id
                  ) ===
                  String(postId)
              );

            if (userPost) {
              userPost.is_saved =
                false;
            }

            // HOME FEED
            const homePost =
              state.homeFeed.find(
                (post) =>
                  String(
                    post.id
                  ) ===
                  String(postId)
              );

            if (homePost) {
              homePost.is_saved =
                false;
            }

            // EXPLORE
            const explorePost =
              state.exploreFeed.find(
                (post) =>
                  String(
                    post.id
                  ) ===
                  String(postId)
              );

            if (explorePost) {
              explorePost.is_saved =
                false;
            }

            console.log(
              "POST UNSAVED LOCALLY =>",
              postId
            );
          }
        )

        .addCase(
          unsavePost.rejected,
          (
            state,
            action
          ) => {
            state.error =
              action.payload;
          }
        );
    },
  });

export default postSlice.reducer;