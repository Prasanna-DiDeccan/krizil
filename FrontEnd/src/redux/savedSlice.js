// import {
//   createSlice,
//   createAsyncThunk,
// } from "@reduxjs/toolkit";

// import api from "../utils/api";
// import { API_ENDPOINTS } from "../config/apiEndpoints";

// // ======================================================
// // GET SAVED POSTS
// // GET /api/users/{user_id}/saved
// // ======================================================

// export const getSavedPosts = createAsyncThunk(
//   "saved/getSavedPosts",

//   async (
//     {
//       userId,
//       limit = 100,
//       offset = 0,
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log(
//         "=========================================="
//       );

//       console.log("GET SAVED POSTS");
//       console.log("USER ID =>", userId);

//       const endpoint =
//         API_ENDPOINTS.profile.getSavedPosts(
//           userId
//         );

//       console.log(
//         "SAVED POSTS ENDPOINT =>",
//         endpoint
//       );

//       const response = await api.get(
//         endpoint,
//         {
//           params: {
//             limit,
//             offset,
//           },
//         }
//       );

//       console.log(
//         "SAVED POSTS RESPONSE =>",
//         response.data
//       );

//       console.log(
//         "=========================================="
//       );

//       return response.data;
//     } catch (error) {
//       console.log(
//         "GET SAVED POSTS ERROR =>",
//         error.response?.data ||
//           error.message
//       );

//       return rejectWithValue(
//         error.response?.data ||
//           error.message ||
//           "Unable to load saved posts"
//       );
//     }
//   }
// );

// // ======================================================
// // GET SAVED REELS
// // GET /api/users/{user_id}/saved/reels
// // ======================================================

// export const getSavedReels = createAsyncThunk(
//   "saved/getSavedReels",

//   async (
//     {
//       userId,
//       limit = 100,
//       offset = 0,
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log(
//         "=========================================="
//       );

//       console.log("GET SAVED REELS");
//       console.log("USER ID =>", userId);

//       const endpoint =
//         API_ENDPOINTS.profile.getSavedReels(
//           userId
//         );

//       console.log(
//         "SAVED REELS ENDPOINT =>",
//         endpoint
//       );

//       const response = await api.get(
//         endpoint,
//         {
//           params: {
//             limit,
//             offset,
//           },
//         }
//       );

//       console.log(
//         "SAVED REELS RESPONSE =>",
//         response.data
//       );

//       console.log(
//         "SAVED REELS TOTAL =>",
//         response.data?.total
//       );

//       console.log(
//         "SAVED REELS ITEMS =>",
//         response.data?.items
//       );

//       console.log(
//         "=========================================="
//       );

//       return response.data;
//     } catch (error) {
//       console.log(
//         "GET SAVED REELS ERROR =>",
//         error.response?.data ||
//           error.message
//       );

//       return rejectWithValue(
//         error.response?.data ||
//           error.message ||
//           "Unable to load saved reels"
//       );
//     }
//   }
// );

// // ======================================================
// // INITIAL STATE
// // ======================================================

// const initialState = {
//   // ====================================================
//   // POSTS
//   // ====================================================

//   savedPosts: [],
//   totalSaved: 0,

//   limit: 20,
//   offset: 0,

//   // ====================================================
//   // REELS
//   // ====================================================

//   savedReels: [],
//   totalSavedReels: 0,

//   reelsLimit: 20,
//   reelsOffset: 0,

//   // ====================================================
//   // LOADING
//   // ====================================================

//   loading: false,
//   loadingSavedReels: false,

//   // ====================================================
//   // ERRORS
//   // ====================================================

//   error: null,
//   savedReelsError: null,
// };

// // ======================================================
// // SLICE
// // ======================================================

// const savedSlice = createSlice({
//   name: "saved",

//   initialState,

//   reducers: {
//     // ==================================================
//     // CLEAR POSTS
//     // ==================================================

//     clearSavedPosts: (state) => {
//       state.savedPosts = [];
//       state.totalSaved = 0;
//       state.error = null;
//     },

//     // ==================================================
//     // CLEAR REELS
//     // ==================================================

//     clearSavedReels: (state) => {
//       state.savedReels = [];
//       state.totalSavedReels = 0;
//       state.savedReelsError = null;
//     },

//     // ==================================================
//     // CLEAR EVERYTHING
//     // ==================================================

//     clearSaved: (state) => {
//       state.savedPosts = [];
//       state.totalSaved = 0;

//       state.savedReels = [];
//       state.totalSavedReels = 0;

//       state.limit = 20;
//       state.offset = 0;

//       state.reelsLimit = 20;
//       state.reelsOffset = 0;

//       state.loading = false;
//       state.loadingSavedReels = false;

//       state.error = null;
//       state.savedReelsError = null;
//     },

//     // ==================================================
//     // REMOVE SAVED REEL LOCALLY
//     // ==================================================

//     removeSavedReel: (
//       state,
//       action
//     ) => {
//       const reelId =
//         Number(action.payload);

//       state.savedReels =
//         state.savedReels.filter(
//           (reel) =>
//             Number(
//               reel.id
//             ) !== reelId
//         );

//       state.totalSavedReels =
//         Math.max(
//           0,
//           state.totalSavedReels - 1
//         );
//     },

//     // ==================================================
//     // REMOVE SAVED POST LOCALLY
//     // ==================================================

//     removeSavedPost: (
//       state,
//       action
//     ) => {
//       const postId =
//         action.payload;

//       state.savedPosts =
//         state.savedPosts.filter(
//           (post) =>
//             post.id !== postId
//         );

//       state.totalSaved =
//         Math.max(
//           0,
//           state.totalSaved - 1
//         );
//     },

//     // ==================================================
//     // UPDATE SAVED REEL
//     // ==================================================

//     updateSavedReel: (
//       state,
//       action
//     ) => {
//       const updatedReel =
//         action.payload;

//       const index =
//         state.savedReels.findIndex(
//           (reel) =>
//             Number(reel.id) ===
//             Number(
//               updatedReel.id
//             )
//         );

//       if (index !== -1) {
//         state.savedReels[index] =
//           {
//             ...state.savedReels[
//               index
//             ],
//             ...updatedReel,
//           };
//       }
//     },
//   },

//   // ====================================================
//   // EXTRA REDUCERS
//   // ====================================================

//   extraReducers: (
//     builder
//   ) => {
//     // ==================================================
//     // SAVED POSTS
//     // ==================================================

//     builder

//       // ------------------------------------------------
//       // PENDING
//       // ------------------------------------------------

//       .addCase(
//         getSavedPosts.pending,
//         (state) => {
//           state.loading = true;
//           state.error = null;
//         }
//       )

//       // ------------------------------------------------
//       // SUCCESS
//       // ------------------------------------------------

//       .addCase(
//         getSavedPosts.fulfilled,
//         (
//           state,
//           action
//         ) => {
//           state.loading = false;
//           state.error = null;

//           const items =
//             Array.isArray(
//               action.payload?.items
//             )
//               ? action.payload.items
//               : [];

//           // Remove duplicates
//           const uniquePosts =
//             Array.from(
//               new Map(
//                 items.map(
//                   (post) => [
//                     post.id,
//                     post,
//                   ]
//                 )
//               ).values()
//             );

//           state.savedPosts =
//             uniquePosts;

//           state.totalSaved =
//             action.payload?.total ??
//             uniquePosts.length;

//           state.limit =
//             action.payload?.limit ??
//             20;

//           state.offset =
//             action.payload?.offset ??
//             0;
//         }
//       )

//       // ------------------------------------------------
//       // ERROR
//       // ------------------------------------------------

//       .addCase(
//         getSavedPosts.rejected,
//         (
//           state,
//           action
//         ) => {
//           state.loading = false;

//           state.error =
//             action.payload;

//           state.savedPosts = [];
//           state.totalSaved = 0;
//         }
//       );

//     // ==================================================
//     // SAVED REELS
//     // ==================================================

//     builder

//       // ------------------------------------------------
//       // PENDING
//       // ------------------------------------------------

//       .addCase(
//         getSavedReels.pending,
//         (state) => {
//           state.loadingSavedReels =
//             true;

//           state.savedReelsError =
//             null;
//         }
//       )

//       // ------------------------------------------------
//       // SUCCESS
//       // ------------------------------------------------

//       .addCase(
//         getSavedReels.fulfilled,
//         (
//           state,
//           action
//         ) => {
//           state.loadingSavedReels =
//             false;

//           state.savedReelsError =
//             null;

//           const items =
//             Array.isArray(
//               action.payload?.items
//             )
//               ? action.payload.items
//               : [];

//           // ==================================================
//           // IMPORTANT
//           //
//           // Keep the ORIGINAL API reel object.
//           // Do NOT replace video_url with thumbnail_url.
//           // ==================================================

//           const normalizedReels =
//             items
//               .filter(
//                 (reel) =>
//                   reel &&
//                   reel.id != null &&
//                   reel.video_url
//               )
//               .map(
//                 (reel) => ({
//                   ...reel,

//                   // Keep original numeric ID
//                   id: Number(
//                     reel.id
//                   ),

//                   // Make sure saved state remains true
//                   is_saved: true,

//                   // Keep actual video URL
//                   video_url:
//                     reel.video_url,

//                   // Keep thumbnail separately
//                   thumbnail_url:
//                     reel.thumbnail_url ??
//                     null,
//                 })
//               );

//           // ==================================================
//           // REMOVE DUPLICATES
//           // ==================================================

//           const uniqueReels =
//             Array.from(
//               new Map(
//                 normalizedReels.map(
//                   (reel) => [
//                     Number(
//                       reel.id
//                     ),
//                     reel,
//                   ]
//                 )
//               ).values()
//             );

//           // ==================================================
//           // SAVE
//           // ==================================================

//           state.savedReels =
//             uniqueReels;

//           state.totalSavedReels =
//             action.payload?.total ??
//             uniqueReels.length;

//           state.reelsLimit =
//             action.payload?.limit ??
//             20;

//           state.reelsOffset =
//             action.payload?.offset ??
//             0;

//           console.log(
//             "=========================================="
//           );

//           console.log(
//             "REDUX SAVED REELS =>",
//             uniqueReels
//           );

//           console.log(
//             "SAVED REEL IDS =>",
//             uniqueReels.map(
//               (reel) =>
//                 reel.id
//             )
//           );

//           console.log(
//             "SAVED REEL VIDEOS =>",
//             uniqueReels.map(
//               (reel) =>
//                 reel.video_url
//             )
//           );

//           console.log(
//             "=========================================="
//           );
//         }
//       )

//       // ------------------------------------------------
//       // ERROR
//       // ------------------------------------------------

//       .addCase(
//         getSavedReels.rejected,
//         (
//           state,
//           action
//         ) => {
//           state.loadingSavedReels =
//             false;

//           state.savedReelsError =
//             action.payload;

//           state.savedReels = [];
//           state.totalSavedReels = 0;
//         }
//       );
//   },
// });

// // ======================================================
// // ACTIONS
// // ======================================================

// export const {
//   clearSavedPosts,
//   clearSavedReels,
//   clearSaved,
//   removeSavedReel,
//   removeSavedPost,
//   updateSavedReel,
// } = savedSlice.actions;

// // ======================================================
// // SELECTORS
// // ======================================================

// export const selectSavedPosts = (
//   state
// ) =>
//   state.saved?.savedPosts ||
//   [];

// export const selectSavedReels = (
//   state
// ) =>
//   state.saved?.savedReels ||
//   [];

// export const selectTotalSaved = (
//   state
// ) =>
//   state.saved?.totalSaved ||
//   0;

// export const selectTotalSavedReels = (
//   state
// ) =>
//   state.saved
//     ?.totalSavedReels || 0;

// export const selectSavedLoading = (
//   state
// ) =>
//   state.saved?.loading ||
//   false;

// export const selectSavedReelsLoading = (
//   state
// ) =>
//   state.saved
//     ?.loadingSavedReels ||
//   false;

// export const selectSavedError = (
//   state
// ) =>
//   state.saved?.error ||
//   null;

// export const selectSavedReelsError = (
//   state
// ) =>
//   state.saved
//     ?.savedReelsError ||
//   null;

// // ======================================================
// // DEFAULT EXPORT
// // ======================================================

// export default savedSlice.reducer;

import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../utils/api";
import { API_ENDPOINTS } from "../config/apiEndpoints";

// ======================================================
// GET SAVED ITEMS
//
// GET /api/saved
// ======================================================

export const getSavedItems = createAsyncThunk(
  "saved/getSavedItems",
  async (
    {
      limit = 20,
      offset = 0,
    } = {},
    { rejectWithValue }
  ) => {
    try {
      console.log(
        "=========================================="
      );

      console.log("GET SAVED ITEMS");
      console.log(
        "ENDPOINT =>",
        API_ENDPOINTS.saved.get
      );
      console.log("LIMIT =>", limit);
      console.log("OFFSET =>", offset);

      const response = await api.get(
        API_ENDPOINTS.saved.get,
        {
          params: {
            limit,
            offset,
          },
        }
      );

      console.log(
        "GET SAVED RESPONSE =>",
        response.data
      );

      console.log(
        "=========================================="
      );

      return response.data;
    } catch (error) {
      console.log(
        "GET SAVED ERROR =>",
        error.response?.data ||
          error.message
      );

      return rejectWithValue(
        error.response?.data ||
          error.message ||
          "Unable to load saved items"
      );
    }
  }
);

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  // All saved items from backend
  savedItems: [],

  // Saved posts only
  savedPosts: [],

  // Saved reels only
  savedReels: [],

  // Backend total
  totalSaved: 0,

  // Pagination
  limit: 20,
  offset: 0,

  // Loading
  loading: false,

  // Error
  error: null,
};

// ======================================================
// SLICE
// ======================================================

const savedSlice = createSlice({
  name: "saved",

  initialState,

  reducers: {
    // ==================================================
    // CLEAR SAVED
    // ==================================================

    clearSaved: (state) => {
      state.savedItems = [];
      state.savedPosts = [];
      state.savedReels = [];

      state.totalSaved = 0;

      state.limit = 20;
      state.offset = 0;

      state.loading = false;
      state.error = null;
    },

    // ==================================================
    // REMOVE POST LOCALLY
    // ==================================================

    removeSavedPost: (
      state,
      action
    ) => {
      const postId =
        Number(action.payload);

      state.savedPosts =
        state.savedPosts.filter(
          (post) =>
            Number(post?.id) !==
            postId
        );

      state.savedItems =
        state.savedItems.filter(
          (item) =>
            !(
              item?.type === "post" &&
              Number(item?.post?.id) ===
                postId
            )
        );

      state.totalSaved =
        Math.max(
          0,
          state.totalSaved - 1
        );
    },

    // ==================================================
    // REMOVE REEL LOCALLY
    // ==================================================

    removeSavedReel: (
      state,
      action
    ) => {
      const reelId =
        Number(action.payload);

      state.savedReels =
        state.savedReels.filter(
          (reel) =>
            Number(reel?.id) !==
            reelId
        );

      state.savedItems =
        state.savedItems.filter(
          (item) =>
            !(
              item?.type === "reel" &&
              Number(item?.reel?.id) ===
                reelId
            )
        );

      state.totalSaved =
        Math.max(
          0,
          state.totalSaved - 1
        );
    },
  },

  // ======================================================
  // EXTRA REDUCERS
  // ======================================================

  extraReducers: (builder) => {
    // ==================================================
    // GET SAVED ITEMS
    // ==================================================

    builder

      // ------------------------------------------------
      // PENDING
      // ------------------------------------------------

      .addCase(
        getSavedItems.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      // ------------------------------------------------
      // SUCCESS
      // ------------------------------------------------

      .addCase(
        getSavedItems.fulfilled,
        (
          state,
          action
        ) => {
          state.loading = false;
          state.error = null;

          const items =
            Array.isArray(
              action.payload?.items
            )
              ? action.payload.items
              : [];

          // --------------------------------------------
          // Keep original backend saved items
          // --------------------------------------------

          state.savedItems = items;

          // --------------------------------------------
          // Extract POSTS
          // --------------------------------------------

          const posts = items
            .filter(
              (item) =>
                item?.type === "post" &&
                item?.post
            )
            .map(
              (item) => ({
                ...item.post,

                // Backend returned this inside saved list,
                // so this item is definitely saved.
                is_saved: true,

                saved_at:
                  item.saved_at ?? null,
              })
            );

          // --------------------------------------------
          // Remove duplicate posts
          // --------------------------------------------

          state.savedPosts =
            Array.from(
              new Map(
                posts.map(
                  (post) => [
                    Number(post.id),
                    post,
                  ]
                )
              ).values()
            );

          // --------------------------------------------
          // Extract REELS
          // --------------------------------------------

          const reels = items
            .filter(
              (item) =>
                item?.type === "reel" &&
                item?.reel
            )
            .map(
              (item) => ({
                ...item.reel,

                // Backend returned this inside saved list,
                // so this reel is definitely saved.
                is_saved: true,

                saved_at:
                  item.saved_at ?? null,
              })
            );

          // --------------------------------------------
          // Remove duplicate reels
          // --------------------------------------------

          state.savedReels =
            Array.from(
              new Map(
                reels.map(
                  (reel) => [
                    Number(reel.id),
                    reel,
                  ]
                )
              ).values()
            );

          // --------------------------------------------
          // Pagination
          // --------------------------------------------

          state.totalSaved =
            action.payload?.total ??
            items.length;

          state.limit =
            action.payload?.limit ??
            20;

          state.offset =
            action.payload?.offset ??
            0;

          console.log(
            "=========================================="
          );

          console.log(
            "SAVED ITEMS =>",
            state.savedItems
          );

          console.log(
            "SAVED POSTS =>",
            state.savedPosts
          );

          console.log(
            "SAVED REELS =>",
            state.savedReels
          );

          console.log(
            "TOTAL SAVED =>",
            state.totalSaved
          );

          console.log(
            "=========================================="
          );
        }
      )

      // ------------------------------------------------
      // ERROR
      // ------------------------------------------------

      .addCase(
        getSavedItems.rejected,
        (
          state,
          action
        ) => {
          state.loading = false;

          state.error =
            action.payload;

          state.savedItems = [];
          state.savedPosts = [];
          state.savedReels = [];
          state.totalSaved = 0;
        }
      );
  },
});

// ======================================================
// ACTIONS
// ======================================================

export const {
  clearSaved,
  removeSavedPost,
  removeSavedReel,
} = savedSlice.actions;

// ======================================================
// SELECTORS
// ======================================================

export const selectSavedItems = (
  state
) =>
  state.saved?.savedItems ||
  [];

export const selectSavedPosts = (
  state
) =>
  state.saved?.savedPosts ||
  [];

export const selectSavedReels = (
  state
) =>
  state.saved?.savedReels ||
  [];

export const selectTotalSaved = (
  state
) =>
  state.saved?.totalSaved ||
  0;

export const selectSavedLoading = (
  state
) =>
  state.saved?.loading ||
  false;

export const selectSavedError = (
  state
) =>
  state.saved?.error ||
  null;

// ======================================================
// DEFAULT EXPORT
// ======================================================

export default savedSlice.reducer;