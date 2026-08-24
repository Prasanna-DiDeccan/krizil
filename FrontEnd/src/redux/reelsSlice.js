// import {
//   createSlice,
//   createAsyncThunk,
// } from "@reduxjs/toolkit";

// import api from "../utils/api";
// import { API_ENDPOINTS } from "../config/apiEndpoints";

// // ======================================================
// // GET REELS FEED
// // ======================================================

// export const getReelsFeed = createAsyncThunk(
//   "reels/getReelsFeed",

//   async (
//     {
//       limit = 10,
//       offset = 0,
//     } = {},
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log("====================================");
//       console.log("🎬 GET REELS FEED");
//       console.log("LIMIT =>", limit);
//       console.log("OFFSET =>", offset);

//       const response = await api.get(
//         API_ENDPOINTS.reels.getFeed,
//         {
//           params: {
//             limit,
//             offset,
//           },
//         }
//       );

//       console.log(
//         "🎬 REELS RESPONSE =>",
//         response.data
//       );

//       return response.data;

//     } catch (error) {
//       console.log(
//         "❌ GET REELS ERROR =>",
//         error?.response?.data ||
//           error?.message
//       );

//       return rejectWithValue(
//         error?.response?.data ||
//           "Failed to fetch reels"
//       );
//     }
//   }
// );

// export const createReel = createAsyncThunk(
//   "reels/createReel",

//   async (
//     {
//       video,
//       caption = "",
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log("====================================");
//       console.log("🚀 CREATE REEL");
//       console.log("VIDEO =>", video);
//       console.log("CAPTION =>", caption);

//       if (!video?.uri) {
//         return rejectWithValue(
//           "Video file is missing"
//         );
//       }

//       // ==================================================
//       // CREATE FORM DATA
//       // ==================================================

//       const formData = new FormData();

//       const fileName =
//         video.fileName ||
//         `reel_${Date.now()}.mp4`;

//       const mimeType =
//         video.mimeType ||
//         "video/mp4";

//       console.log(
//         "📁 FILE NAME =>",
//         fileName
//       );

//       console.log(
//         "📁 MIME TYPE =>",
//         mimeType
//       );

//       console.log(
//         "📁 URI =>",
//         video.uri
//       );

//       formData.append(
//         "file",
//         {
//           uri: video.uri,
//           name: fileName,
//           type: mimeType,
//         }
//       );

//       const cleanCaption =
//         typeof caption === "string"
//           ? caption.trim()
//           : "";

//       formData.append(
//         "caption",
//         cleanCaption
//       );

//       console.log(
//         "📦 FORMDATA CREATED"
//       );

//       console.log(
//         "📤 STARTING REEL UPLOAD..."
//       );

//       // ==================================================
//       // UPLOAD
//       // ==================================================

//       const response =
//         await api.post(
//           "/api/reels",
//           formData,
//           {
//             timeout: 120000,

//             headers: {
//               Accept: "application/json",

//               // IMPORTANT:
//               // DO NOT manually set
//               // Content-Type here.
//               //
//               // Axios must generate:
//               // multipart/form-data;
//               // boundary=....
//             },

//             transformRequest: [
//               (data) => data,
//             ],
//           }
//         );

//       // ==================================================
//       // SUCCESS
//       // ==================================================

//       console.log(
//         "===================================="
//       );

//       console.log(
//         "✅ CREATE REEL SUCCESS"
//       );

//       console.log(
//         "STATUS =>",
//         response.status
//       );

//       console.log(
//         "CREATED REEL =>",
//         response.data
//       );

//       return response.data;

//     } catch (error) {
//       console.log(
//         "===================================="
//       );

//       console.log(
//         "❌ CREATE REEL ERROR"
//       );

//       console.log(
//         "ERROR NAME =>",
//         error?.name
//       );

//       console.log(
//         "ERROR CODE =>",
//         error?.code
//       );

//       console.log(
//         "STATUS =>",
//         error?.response?.status
//       );

//       console.log(
//         "DATA =>",
//         error?.response?.data
//       );

//       console.log(
//         "MESSAGE =>",
//         error?.message
//       );

//       console.log(
//         "REQUEST =>",
//         error?.request
//       );

//       return rejectWithValue(
//         error?.response?.data ||
//           error?.message ||
//           "Failed to create reel"
//       );
//     }
//   }
// );

// // ======================================================
// // DELETE REEL
// // ======================================================

// export const deleteReel =
//   createAsyncThunk(
//     "reels/deleteReel",

//     async (
//       reelId,
//       { rejectWithValue }
//     ) => {
//       try {
//         await api.delete(
//           `/api/reels/${reelId}`
//         );

//         return reelId;

//       } catch (error) {
//         console.log(
//           "❌ DELETE REEL ERROR =>",
//           error?.response?.data ||
//             error?.message
//         );

//         return rejectWithValue(
//           error?.response?.data ||
//             "Failed to delete reel"
//         );
//       }
//     }
//   );

// // ======================================================
// // LIKE REEL
// // ======================================================

// export const likeReel =
//   createAsyncThunk(
//     "reels/likeReel",

//     async (
//       reelId,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response =
//           await api.post(
//             API_ENDPOINTS.likes.create,
//             {
//               target_type: "post",
//               target_id: reelId,
//             }
//           );

//         return {
//           reelId,
//           data: response.data,
//         };

//       } catch (error) {
//         return rejectWithValue(
//           error?.response?.data ||
//             "Failed to like reel"
//         );
//       }
//     }
//   );

// // ======================================================
// // UNLIKE REEL
// // ======================================================

// export const unlikeReel =
//   createAsyncThunk(
//     "reels/unlikeReel",

//     async (
//       {
//         reelId,
//         likeId = null,
//       },
//       { rejectWithValue }
//     ) => {
//       try {
//         if (!likeId) {
//           return rejectWithValue(
//             "Like ID not found"
//           );
//         }

//         const response =
//           await api.delete(
//             `${API_ENDPOINTS.likes.delete}/${likeId}`
//           );

//         return {
//           reelId,
//           likeId,
//           data: response.data,
//         };

//       } catch (error) {
//         return rejectWithValue(
//           error?.response?.data ||
//             "Failed to unlike reel"
//         );
//       }
//     }
//   );

// // ======================================================
// // SAVE REEL
// // ======================================================

// export const saveReel =
//   createAsyncThunk(
//     "reels/saveReel",

//     async (
//       reelId,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response =
//           await api.post(
//             API_ENDPOINTS.reelSave.save(
//               reelId
//             )
//           );

//         return {
//           reelId,
//           data: response.data,
//         };

//       } catch (error) {
//         return rejectWithValue(
//           error?.response?.data ||
//             "Failed to save reel"
//         );
//       }
//     }
//   );

// // ======================================================
// // UNSAVE REEL
// // ======================================================

// export const unsaveReel =
//   createAsyncThunk(
//     "reels/unsaveReel",

//     async (
//       reelId,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response =
//           await api.delete(
//             API_ENDPOINTS.reelSave.unsave(
//               reelId
//             )
//           );

//         return {
//           reelId,
//           data: response.data,
//         };

//       } catch (error) {
//         return rejectWithValue(
//           error?.response?.data ||
//             "Failed to unsave reel"
//         );
//       }
//     }
//   );

// // ======================================================
// // INITIAL STATE
// // ======================================================

// const initialState = {
//   // FEED
//   reels: [],
//   total: 0,
//   limit: 10,
//   offset: 0,
//   hasMore: true,

//   // SINGLE
//   currentReel: null,

//   // CREATE
//   creatingReel: false,
//   createdReel: null,
//   createReelError: null,

//   // DELETE
//   deletingReelIds: [],

//   // LOADING
//   loading: false,
//   loadingMore: false,
//   refreshing: false,

//   // ERROR
//   error: null,

//   // SAVE
//   savingReelIds: [],
//   unsavingReelIds: [],
// };

// // ======================================================
// // SLICE
// // ======================================================

// const reelsSlice =
//   createSlice({
//     name: "reels",

//     initialState,

//     reducers: {

//       clearReels: (state) => {
//         state.reels = [];
//         state.total = 0;
//         state.limit = 10;
//         state.offset = 0;
//         state.hasMore = true;
//         state.loading = false;
//         state.loadingMore = false;
//         state.refreshing = false;
//         state.error = null;
//       },

//       startReelsRefresh: (
//         state
//       ) => {
//         state.refreshing = true;
//         state.error = null;
//       },

//       clearCreatedReel: (
//         state
//       ) => {
//         state.createdReel = null;
//         state.createReelError = null;
//       },

//       clearCurrentReel: (
//         state
//       ) => {
//         state.currentReel = null;
//       },
//     },

//     extraReducers: (
//       builder
//     ) => {

//       // ==================================================
//       // GET FEED
//       // ==================================================

//       builder
//         .addCase(
//           getReelsFeed.pending,
//           (
//             state,
//             action
//           ) => {
//             const requestedOffset =
//               action.meta.arg?.offset ??
//               0;

//             if (
//               requestedOffset === 0
//             ) {
//               state.loading = true;
//             } else {
//               state.loadingMore = true;
//             }

//             state.error = null;
//           }
//         )

//         .addCase(
//           getReelsFeed.fulfilled,
//           (
//             state,
//             action
//           ) => {
//             const response =
//               action.payload;

//             const {
//               total = 0,
//               limit = 10,
//               offset = 0,
//               items = [],
//             } = response;

//             state.total = total;
//             state.limit = limit;
//             state.offset = offset;

//             if (
//               offset === 0
//             ) {
//               state.reels = items;
//             } else {
//               state.reels = [
//                 ...state.reels,
//                 ...items,
//               ];
//             }

//             state.hasMore =
//               state.reels.length <
//                 total &&
//               items.length > 0;

//             state.loading = false;
//             state.loadingMore = false;
//             state.refreshing = false;
//             state.error = null;
//           }
//         )

//         .addCase(
//           getReelsFeed.rejected,
//           (
//             state,
//             action
//           ) => {
//             state.loading = false;
//             state.loadingMore = false;
//             state.refreshing = false;

//             state.error =
//               action.payload ||
//               "Failed to fetch reels";
//           }
//         );

//       // ==================================================
//       // CREATE REEL - PENDING
//       // ==================================================

//       builder.addCase(
//         createReel.pending,
//         (state) => {
//           state.creatingReel = true;
//           state.createdReel = null;
//           state.createReelError = null;
//         }
//       );

//       // ==================================================
//       // CREATE REEL - SUCCESS
//       // ==================================================

//       builder.addCase(
//         createReel.fulfilled,
//         (
//           state,
//           action
//         ) => {
//           const newReel =
//             action.payload;

//           state.creatingReel = false;

//           state.createdReel =
//             newReel;

//           state.createReelError =
//             null;

//           // Add new reel to top
//           // of existing feed.

//           if (newReel?.id) {
//             const alreadyExists =
//               state.reels.some(
//                 (item) =>
//                   item.id ===
//                   newReel.id
//               );

//             if (!alreadyExists) {
//               state.reels = [
//                 newReel,
//                 ...state.reels,
//               ];

//               state.total += 1;
//             }
//           }
//         }
//       );

//       // ==================================================
//       // CREATE REEL - ERROR
//       // ==================================================

//       builder.addCase(
//         createReel.rejected,
//         (
//           state,
//           action
//         ) => {
//           state.creatingReel = false;

//           state.createReelError =
//             action.payload ||
//             "Failed to create reel";
//         }
//       );

//       // ==================================================
//       // DELETE
//       // ==================================================

//       builder.addCase(
//         deleteReel.pending,
//         (
//           state,
//           action
//         ) => {
//           const reelId =
//             action.meta.arg;

//           if (
//             !state.deletingReelIds.includes(
//               reelId
//             )
//           ) {
//             state.deletingReelIds.push(
//               reelId
//             );
//           }
//         }
//       );

//       builder.addCase(
//         deleteReel.fulfilled,
//         (
//           state,
//           action
//         ) => {
//           const reelId =
//             action.payload;

//           state.deletingReelIds =
//             state.deletingReelIds.filter(
//               (id) =>
//                 id !== reelId
//             );

//           state.reels =
//             state.reels.filter(
//               (reel) =>
//                 reel.id !== reelId
//             );

//           state.total =
//             Math.max(
//               0,
//               state.total - 1
//             );

//           if (
//             state.currentReel?.id ===
//             reelId
//           ) {
//             state.currentReel = null;
//           }
//         }
//       );

//       builder.addCase(
//         deleteReel.rejected,
//         (
//           state,
//           action
//         ) => {
//           const reelId =
//             action.meta.arg;

//           state.deletingReelIds =
//             state.deletingReelIds.filter(
//               (id) =>
//                 id !== reelId
//             );

//           state.error =
//             action.payload ||
//             "Failed to delete reel";
//         }
//       );

//       // ==================================================
//       // LIKE
//       // ==================================================

//       builder.addCase(
//         likeReel.fulfilled,
//         (
//           state,
//           action
//         ) => {
//           const {
//             reelId,
//             data,
//           } = action.payload;

//           const reel =
//             state.reels.find(
//               (item) =>
//                 item.id ===
//                 reelId
//             );

//           if (!reel) {
//             return;
//           }

//           reel.is_liked = true;

//           reel.likes_count =
//             data?.likes_count ??
//             (reel.likes_count || 0) +
//               1;

//           if (
//             data?.like?.id
//           ) {
//             reel.like_id =
//               data.like.id;
//           }
//         }
//       );

//       builder.addCase(
//         likeReel.rejected,
//         (
//           state,
//           action
//         ) => {
//           state.error =
//             action.payload ||
//             "Failed to like reel";
//         }
//       );

//       // ==================================================
//       // UNLIKE
//       // ==================================================

//       builder.addCase(
//         unlikeReel.fulfilled,
//         (
//           state,
//           action
//         ) => {
//           const {
//             reelId,
//           } = action.payload;

//           const reel =
//             state.reels.find(
//               (item) =>
//                 item.id ===
//                 reelId
//             );

//           if (!reel) {
//             return;
//           }

//           reel.is_liked = false;

//           reel.likes_count =
//             Math.max(
//               0,
//               (reel.likes_count ||
//                 0) - 1
//             );

//           reel.like_id = null;
//         }
//       );

//       builder.addCase(
//         unlikeReel.rejected,
//         (
//           state,
//           action
//         ) => {
//           state.error =
//             action.payload ||
//             "Failed to unlike reel";
//         }
//       );

//       // ==================================================
//       // SAVE
//       // ==================================================

//       builder.addCase(
//         saveReel.pending,
//         (
//           state,
//           action
//         ) => {
//           const reelId =
//             action.meta.arg;

//           if (
//             !state.savingReelIds.includes(
//               reelId
//             )
//           ) {
//             state.savingReelIds.push(
//               reelId
//             );
//           }
//         }
//       );

//       builder.addCase(
//         saveReel.fulfilled,
//         (
//           state,
//           action
//         ) => {
//           const {
//             reelId,
//           } = action.payload;

//           state.savingReelIds =
//             state.savingReelIds.filter(
//               (id) =>
//                 id !== reelId
//             );

//           const reel =
//             state.reels.find(
//               (item) =>
//                 item.id ===
//                 reelId
//             );

//           if (reel) {
//             reel.is_saved = true;
//           }
//         }
//       );

//       builder.addCase(
//         saveReel.rejected,
//         (
//           state,
//           action
//         ) => {
//           const reelId =
//             action.meta.arg;

//           state.savingReelIds =
//             state.savingReelIds.filter(
//               (id) =>
//                 id !== reelId
//             );

//           state.error =
//             action.payload ||
//             "Failed to save reel";
//         }
//       );

//       // ==================================================
//       // UNSAVE
//       // ==================================================

//       builder.addCase(
//         unsaveReel.pending,
//         (
//           state,
//           action
//         ) => {
//           const reelId =
//             action.meta.arg;

//           if (
//             !state.unsavingReelIds.includes(
//               reelId
//             )
//           ) {
//             state.unsavingReelIds.push(
//               reelId
//             );
//           }
//         }
//       );

//       builder.addCase(
//         unsaveReel.fulfilled,
//         (
//           state,
//           action
//         ) => {
//           const {
//             reelId,
//           } = action.payload;

//           state.unsavingReelIds =
//             state.unsavingReelIds.filter(
//               (id) =>
//                 id !== reelId
//             );

//           const reel =
//             state.reels.find(
//               (item) =>
//                 item.id ===
//                 reelId
//             );

//           if (reel) {
//             reel.is_saved = false;
//           }
//         }
//       );

//       builder.addCase(
//         unsaveReel.rejected,
//         (
//           state,
//           action
//         ) => {
//           const reelId =
//             action.meta.arg;

//           state.unsavingReelIds =
//             state.unsavingReelIds.filter(
//               (id) =>
//                 id !== reelId
//             );

//           state.error =
//             action.payload ||
//             "Failed to unsave reel";
//         }
//       );
//     },
//   });

// // ======================================================
// // ACTIONS
// // ======================================================

// export const {
//   clearReels,
//   startReelsRefresh,
//   clearCreatedReel,
//   clearCurrentReel,
// } =
//   reelsSlice.actions;

// // ======================================================
// // SELECTORS
// // ======================================================

// export const selectIsSavingReel = (
//   state,
//   reelId
// ) =>
//   state.reels.savingReelIds.includes(
//     reelId
//   );

// export const selectIsUnsavingReel = (
//   state,
//   reelId
// ) =>
//   state.reels.unsavingReelIds.includes(
//     reelId
//   );

// export const selectIsDeletingReel = (
//   state,
//   reelId
// ) =>
//   state.reels.deletingReelIds.includes(
//     reelId
//   );

// export const selectIsCreatingReel = (
//   state
// ) =>
//   state.reels.creatingReel;

// // ======================================================
// // REDUCER
// // ======================================================

// export default reelsSlice.reducer;

import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../utils/api";
import { API_ENDPOINTS } from "../config/apiEndpoints";

// ======================================================
// GET GLOBAL REELS FEED
// GET /api/reels/feed
// ======================================================

export const getReelsFeed = createAsyncThunk(
  "reels/getReelsFeed",

  async (
    {
      limit = 10,
      offset = 0,
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.reels.getFeed,
        {
          params: {
            limit,
            offset,
          },
        }
      );

      console.log(
        "🎬 GLOBAL REELS =>",
        response.data
      );

      return response.data;
    } catch (error) {
      console.log(
        "❌ GLOBAL REELS ERROR =>",
        error?.response?.data ||
          error?.message
      );

      return rejectWithValue(
        error?.response?.data ||
          "Failed to fetch reels"
      );
    }
  }
);

// ======================================================
// GET HOME REELS FEED
// GET /api/reels/home
// ======================================================

export const getHomeReelsFeed =
  createAsyncThunk(
    "reels/getHomeReelsFeed",

    async (
      {
        limit = 10,
        offset = 0,
      } = {},
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "===================================="
        );

        console.log(
          "🏠 GET HOME REELS"
        );

        console.log(
          "LIMIT =>",
          limit
        );

        console.log(
          "OFFSET =>",
          offset
        );

        const response = await api.get(
          API_ENDPOINTS.reels.getHomeFeed,
          {
            params: {
              limit,
              offset,
            },
          }
        );

        console.log(
          "🏠 HOME REELS RESPONSE =>",
          response.data
        );

        return response.data;
      } catch (error) {
        console.log(
          "❌ HOME REELS ERROR =>",
          error?.response?.data ||
            error?.message
        );

        return rejectWithValue(
          error?.response?.data ||
            "Failed to fetch home reels"
        );
      }
    }
  );

// ======================================================
// GET USER REELS
// GET /api/users/{userId}/reels
// ======================================================

export const getUserReels =
  createAsyncThunk(
    "reels/getUserReels",

    async (
      {
        userId,
        limit = 20,
        offset = 0,
      },
      { rejectWithValue }
    ) => {
      try {
        if (!userId) {
          return rejectWithValue(
            "User ID is required"
          );
        }

        console.log(
          "===================================="
        );

        console.log(
          "👤 GET USER REELS"
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
            API_ENDPOINTS.profile.getUserReels(
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
          "👤 USER REELS RESPONSE =>",
          response.data
        );

        return {
          ...response.data,
          userId,
        };
      } catch (error) {
        console.log(
          "❌ USER REELS ERROR =>",
          error?.response?.data ||
            error?.message
        );

        return rejectWithValue(
          error?.response?.data ||
            "Failed to fetch user reels"
        );
      }
    }
  );

export const createReel = createAsyncThunk(
  "reels/createReel",

  async (
    {
      video,
      thumbnail,
      caption = "",
    },
    { rejectWithValue }
  ) => {
    try {
      console.log("====================================");
      console.log("🚀 CREATE REEL STARTED");

      if (!video?.uri) {
        return rejectWithValue(
          "Video file is missing"
        );
      }

      const formData = new FormData();

      // ================================================
      // VIDEO
      // ================================================

      const videoName =
        video.fileName ||
        `reel_${Date.now()}.mp4`;

      const videoType =
        video.mimeType ||
        "video/mp4";

      formData.append("file", {
        uri: video.uri,
        name: videoName,
        type: videoType,
      });

      // ================================================
      // CAPTION
      // ================================================

      formData.append(
        "caption",
        typeof caption === "string"
          ? caption.trim()
          : ""
      );

      // ================================================
      // THUMBNAIL
      // ================================================

      if (thumbnail?.uri) {
        const thumbnailName =
          thumbnail.fileName ||
          `thumbnail_${Date.now()}.jpg`;

        const thumbnailType =
          thumbnail.mimeType ||
          "image/jpeg";

        formData.append("thumbnail", {
          uri: thumbnail.uri,
          name: thumbnailName,
          type: thumbnailType,
        });

        console.log(
          "🖼️ THUMBNAIL =>",
          thumbnail.uri
        );
      } else {
        console.log(
          "⚠️ NO THUMBNAIL PROVIDED"
        );
      }

      console.log(
        "🎬 VIDEO =>",
        video.uri
      );

      console.log(
        "📦 VIDEO NAME =>",
        videoName
      );

      console.log(
        "📦 VIDEO TYPE =>",
        videoType
      );

      console.log(
        "📤 UPLOADING REEL..."
      );

      console.log("========== UPLOAD DEBUG ==========");
console.log("URI =>", video.uri);
console.log("NAME =>", videoName);
console.log("TYPE =>", videoType);
console.log("CAPTION =>", caption);
console.log("TIMEOUT =>", 600000);
console.log("==================================");

      const response = await api.post(
        API_ENDPOINTS.reels.createReel,
        formData,
        {
          timeout: 600000,

          headers: {
            Accept: "application/json",
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(
        "===================================="
      );

      console.log(
        "✅ REEL UPLOAD SUCCESS"
      );

      console.log(
        "STATUS =>",
        response.status
      );

      console.log(
        "RESPONSE =>",
        response.data
      );

      console.log(
        "VIDEO URL =>",
        response.data?.video_url
      );

      console.log(
        "THUMBNAIL URL =>",
        response.data?.thumbnail_url
      );

      return response.data;

    } catch (error) {
      console.log(
        "===================================="
      );

      console.log(
        "❌ CREATE REEL ERROR"
      );

      console.log(
        "MESSAGE =>",
        error?.message
      );

      console.log(
        "STATUS =>",
        error?.response?.status
      );

      console.log(
        "SERVER ERROR =>",
        error?.response?.data
      );

      return rejectWithValue(
        error?.response?.data ||
        error?.message ||
        "Failed to create reel"
      );
    }
  }
);

// ======================================================
// DELETE REEL
// ======================================================

// ======================================================
// DELETE REEL
// ======================================================

export const deleteReel = createAsyncThunk(
  "reels/deleteReel",

  async (
    reelId,
    { rejectWithValue }
  ) => {
    try {
      console.log(
        "===================================="
      );

      console.log(
        "🗑️ DELETE REEL STARTED"
      );

      console.log(
        "RAW REEL ID =>",
        reelId
      );

      const numericReelId =
        Number(reelId);

      if (
        !Number.isInteger(numericReelId)
      ) {
        console.log(
          "❌ INVALID REEL ID =>",
          reelId
        );

        return rejectWithValue({
          message:
            "Invalid reel ID",
        });
      }

      const endpoint =
        API_ENDPOINTS.reels.deleteReel(
          numericReelId
        );

      console.log(
        "NUMERIC REEL ID =>",
        numericReelId
      );

      console.log(
        "DELETE ENDPOINT =>",
        endpoint
      );

      const response =
        await api.delete(
          endpoint
        );

      console.log(
        "✅ DELETE REEL SUCCESS"
      );

      console.log(
        "STATUS =>",
        response.status
      );

      console.log(
        "RESPONSE =>",
        response.data
      );

      return {
        reelId:
          numericReelId,

        data:
          response.data,
      };

    } catch (error) {

      console.log(
        "===================================="
      );

      console.log(
        "❌ DELETE REEL ERROR"
      );

      console.log(
        "MESSAGE =>",
        error?.message
      );

      console.log(
        "STATUS =>",
        error?.response?.status
      );

      console.log(
        "SERVER RESPONSE =>",
        error?.response?.data
      );

      console.log(
        "CONFIG URL =>",
        error?.config?.url
      );

      console.log(
        "CONFIG METHOD =>",
        error?.config?.method
      );

      console.log(
        "===================================="
      );

      return rejectWithValue(
        error?.response?.data ||
        {
          message:
            error?.message ||
            "Failed to delete reel",
        }
      );
    }
  }
);

// ======================================================
// LIKE REEL
// ======================================================

export const likeReel =
  createAsyncThunk(
    "reels/likeReel",

    async (
      reelId,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await api.post(
            API_ENDPOINTS.likes.create,
            {
              target_type: "reel",
              target_id: reelId,
            }
          );

        return {
          reelId,
          data: response.data,
        };
      } catch (error) {
        console.log(
          "❌ LIKE REEL ERROR =>",
          error?.response?.data
        );

        return rejectWithValue(
          error?.response?.data ||
            "Failed to like reel"
        );
      }
    }
  );

// ======================================================
// UNLIKE REEL
// ======================================================

export const unlikeReel =
  createAsyncThunk(
    "reels/unlikeReel",

    async (
      {
        reelId,
        likeId,
      },
      { rejectWithValue }
    ) => {
      try {
        if (!likeId) {
          return rejectWithValue(
            "Like ID not found"
          );
        }

        const response =
          await api.delete(
            `${API_ENDPOINTS.likes.delete}/${likeId}`
          );

        return {
          reelId,
          likeId,
          data: response.data,
        };
      } catch (error) {
        return rejectWithValue(
          error?.response?.data ||
            "Failed to unlike reel"
        );
      }
    }
  );

// ======================================================
// SAVE REEL
// ======================================================

export const saveReel =
  createAsyncThunk(
    "reels/saveReel",

    async (
      reelId,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await api.post(
            API_ENDPOINTS.reelSave.save(
              reelId
            )
          );

        return {
          reelId,
          data: response.data,
        };
      } catch (error) {
        return rejectWithValue(
          error?.response?.data ||
            "Failed to save reel"
        );
      }
    }
  );

// ======================================================
// UNSAVE REEL
// ======================================================

export const unsaveReel =
  createAsyncThunk(
    "reels/unsaveReel",

    async (
      reelId,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await api.delete(
            API_ENDPOINTS.reelSave.unsave(
              reelId
            )
          );

        return {
          reelId,
          data: response.data,
        };
      } catch (error) {
        return rejectWithValue(
          error?.response?.data ||
            "Failed to unsave reel"
        );
      }
    }
  );

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  // ====================================================
  // GLOBAL REELS
  // ====================================================

  reels: [],
  total: 0,
  limit: 10,
  offset: 0,
  hasMore: true,

  loading: false,
  loadingMore: false,
  refreshing: false,

  error: null,

  // ====================================================
  // HOME REELS
  // ====================================================

  homeReels: [],
  homeReelsTotal: 0,
  homeReelsLimit: 10,
  homeReelsOffset: 0,
  homeReelsHasMore: true,

  homeReelsLoading: false,
  homeReelsLoadingMore: false,
  homeReelsRefreshing: false,

  homeReelsError: null,

  // ====================================================
  // USER REELS
  // ====================================================

  userReels: [],
  userReelsTotal: 0,
  userReelsLimit: 20,
  userReelsOffset: 0,
  userReelsHasMore: true,

  userReelsLoading: false,
  userReelsLoadingMore: false,
  userReelsRefreshing: false,

  userReelsError: null,
  userReelsUserId: null,

  // ====================================================
  // SINGLE
  // ====================================================

  currentReel: null,

  // ====================================================
  // CREATE
  // ====================================================

  creatingReel: false,
  createdReel: null,
  createReelError: null,

  // ====================================================
  // DELETE
  // ====================================================

  deletingReelIds: [],

  // ====================================================
  // SAVE
  // ====================================================

  savingReelIds: [],
  unsavingReelIds: [],
};

// ======================================================
// HELPERS
// ======================================================

const updateReelInList = (
  list,
  reelId,
  updater
) => {
  if (!Array.isArray(list)) {
    return;
  }

  const index = list.findIndex(
    (item) =>
      item?.id === reelId
  );

  if (index === -1) {
    return;
  }

  updater(list[index]);
};

const updateAllReelLists = (
  state,
  reelId,
  updater
) => {
  updateReelInList(
    state.reels,
    reelId,
    updater
  );

  updateReelInList(
    state.homeReels,
    reelId,
    updater
  );

  updateReelInList(
    state.userReels,
    reelId,
    updater
  );
};

// ======================================================
// SLICE
// ======================================================

const reelsSlice =
  createSlice({
    name: "reels",

    initialState,

    reducers: {
      // ================================================
      // CLEAR GLOBAL REELS
      // ================================================

      clearReels: (state) => {
        state.reels = [];
        state.total = 0;
        state.offset = 0;
        state.hasMore = true;

        state.loading = false;
        state.loadingMore = false;
        state.refreshing = false;

        state.error = null;
      },

      // ================================================
      // CLEAR HOME REELS
      // ================================================

      clearHomeReels: (state) => {
        state.homeReels = [];
        state.homeReelsTotal = 0;
        state.homeReelsOffset = 0;
        state.homeReelsHasMore = true;

        state.homeReelsLoading =
          false;

        state.homeReelsLoadingMore =
          false;

        state.homeReelsRefreshing =
          false;

        state.homeReelsError = null;
      },

      // ================================================
      // CLEAR USER REELS
      // ================================================

      clearUserReels: (state) => {
        state.userReels = [];
        state.userReelsTotal = 0;
        state.userReelsOffset = 0;
        state.userReelsHasMore = true;

        state.userReelsLoading =
          false;

        state.userReelsLoadingMore =
          false;

        state.userReelsRefreshing =
          false;

        state.userReelsError = null;
        state.userReelsUserId = null;
      },

      // ================================================
      // HOME REFRESH
      // ================================================

      startHomeReelsRefresh: (
        state
      ) => {
        state.homeReelsRefreshing =
          true;

        state.homeReelsError = null;
      },

      // ================================================
      // GLOBAL REFRESH
      // ================================================

      startReelsRefresh: (
        state
      ) => {
        state.refreshing = true;
        state.error = null;
      },

      // ================================================
      // USER REFRESH
      // ================================================

      startUserReelsRefresh: (
        state
      ) => {
        state.userReelsRefreshing =
          true;

        state.userReelsError = null;
      },

      // ================================================
      // CREATED REEL
      // ================================================

      clearCreatedReel: (
        state
      ) => {
        state.createdReel = null;
        state.createReelError = null;
      },

      // ================================================
      // CURRENT REEL
      // ================================================

      clearCurrentReel: (
        state
      ) => {
        state.currentReel = null;
      },
    },

    extraReducers: (
      builder
    ) => {
      // =================================================
      // GLOBAL REELS
      // =================================================

      builder
        .addCase(
          getReelsFeed.pending,
          (
            state,
            action
          ) => {
            const offset =
              action.meta.arg
                ?.offset ?? 0;

            if (offset === 0) {
              state.loading = true;
            } else {
              state.loadingMore = true;
            }

            state.error = null;
          }
        )

        .addCase(
          getReelsFeed.fulfilled,
          (
            state,
            action
          ) => {
            const data =
              action.payload || {};

            const total =
              data.total ?? 0;

            const limit =
              data.limit ?? 10;

            const offset =
              data.offset ?? 0;

            const items =
              Array.isArray(
                data.items
              )
                ? data.items
                : [];

            state.total = total;
            state.limit = limit;
            state.offset = offset;

            if (offset === 0) {
              state.reels = items;
            } else {
              const existingIds =
                new Set(
                  state.reels.map(
                    (item) =>
                      item?.id
                  )
                );

              const newItems =
                items.filter(
                  (item) =>
                    !existingIds.has(
                      item?.id
                    )
                );

              state.reels = [
                ...state.reels,
                ...newItems,
              ];
            }

            state.hasMore =
              state.reels.length <
                total &&
              items.length > 0;

            state.loading = false;
            state.loadingMore =
              false;

            state.refreshing = false;
            state.error = null;
          }
        )

        .addCase(
          getReelsFeed.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;
            state.loadingMore =
              false;

            state.refreshing = false;

            state.error =
              action.payload ||
              "Failed to fetch reels";
          }
        );

      // =================================================
      // HOME REELS
      // =================================================

      builder
        .addCase(
          getHomeReelsFeed.pending,
          (
            state,
            action
          ) => {
            const offset =
              action.meta.arg
                ?.offset ?? 0;

            if (offset === 0) {
              state.homeReelsLoading =
                true;
            } else {
              state.homeReelsLoadingMore =
                true;
            }

            state.homeReelsError = null;
          }
        )

        .addCase(
          getHomeReelsFeed.fulfilled,
          (
            state,
            action
          ) => {
            const data =
              action.payload || {};

            const total =
              data.total ?? 0;

            const limit =
              data.limit ?? 10;

            const offset =
              data.offset ?? 0;

            const items =
              Array.isArray(
                data.items
              )
                ? data.items
                : [];

            state.homeReelsTotal =
              total;

            state.homeReelsLimit =
              limit;

            state.homeReelsOffset =
              offset;

            if (offset === 0) {
              state.homeReels = items;
            } else {
              const existingIds =
                new Set(
                  state.homeReels.map(
                    (item) =>
                      item?.id
                  )
                );

              const newItems =
                items.filter(
                  (item) =>
                    !existingIds.has(
                      item?.id
                    )
                );

              state.homeReels = [
                ...state.homeReels,
                ...newItems,
              ];
            }

            state.homeReelsHasMore =
              state.homeReels.length <
                total &&
              items.length > 0;

            state.homeReelsLoading =
              false;

            state.homeReelsLoadingMore =
              false;

            state.homeReelsRefreshing =
              false;

            state.homeReelsError = null;
          }
        )

        .addCase(
          getHomeReelsFeed.rejected,
          (
            state,
            action
          ) => {
            state.homeReelsLoading =
              false;

            state.homeReelsLoadingMore =
              false;

            state.homeReelsRefreshing =
              false;

            state.homeReelsError =
              action.payload ||
              "Failed to fetch home reels";
          }
        );

      // =================================================
      // USER REELS
      // =================================================

      builder
        .addCase(
          getUserReels.pending,
          (
            state,
            action
          ) => {
            const offset =
              action.meta.arg
                ?.offset ?? 0;

            const userId =
              action.meta.arg
                ?.userId ?? null;

            state.userReelsUserId =
              userId;

            if (offset === 0) {
              state.userReelsLoading =
                true;
            } else {
              state.userReelsLoadingMore =
                true;
            }

            state.userReelsError =
              null;
          }
        )

        .addCase(
          getUserReels.fulfilled,
          (
            state,
            action
          ) => {
            const data =
              action.payload || {};

            const total =
              data.total ?? 0;

            const limit =
              data.limit ?? 20;

            const offset =
              data.offset ?? 0;

            const items =
              Array.isArray(
                data.items
              )
                ? data.items
                : [];

            state.userReelsTotal =
              total;

            state.userReelsLimit =
              limit;

            state.userReelsOffset =
              offset;

            if (offset === 0) {
              state.userReels = items;
            } else {
              const existingIds =
                new Set(
                  state.userReels.map(
                    (item) =>
                      item?.id
                  )
                );

              const newItems =
                items.filter(
                  (item) =>
                    !existingIds.has(
                      item?.id
                    )
                );

              state.userReels = [
                ...state.userReels,
                ...newItems,
              ];
            }

            state.userReelsHasMore =
              state.userReels.length <
                total &&
              items.length > 0;

            state.userReelsLoading =
              false;

            state.userReelsLoadingMore =
              false;

            state.userReelsRefreshing =
              false;

            state.userReelsError =
              null;
          }
        )

        .addCase(
          getUserReels.rejected,
          (
            state,
            action
          ) => {
            state.userReelsLoading =
              false;

            state.userReelsLoadingMore =
              false;

            state.userReelsRefreshing =
              false;

            state.userReelsError =
              action.payload ||
              "Failed to fetch user reels";
          }
        );

      // =================================================
      // CREATE REEL
      // =================================================

      builder
        .addCase(
          createReel.pending,
          (state) => {
            state.creatingReel =
              true;

            state.createdReel =
              null;

            state.createReelError =
              null;
          }
        )

        .addCase(
          createReel.fulfilled,
          (
            state,
            action
          ) => {
            const newReel =
              action.payload;

            state.creatingReel =
              false;

            state.createdReel =
              newReel;

            state.createReelError =
              null;

            if (!newReel?.id) {
              return;
            }

            const existsInGlobal =
              state.reels.some(
                (item) =>
                  item?.id ===
                  newReel.id
              );

            if (!existsInGlobal) {
              state.reels = [
                newReel,
                ...state.reels,
              ];

              state.total += 1;
            }

            const existsInHome =
              state.homeReels.some(
                (item) =>
                  item?.id ===
                  newReel.id
              );

            if (!existsInHome) {
              state.homeReels = [
                newReel,
                ...state.homeReels,
              ];

              state.homeReelsTotal +=
                1;
            }

            const existsInUser =
              state.userReels.some(
                (item) =>
                  item?.id ===
                  newReel.id
              );

            if (!existsInUser) {
              state.userReels = [
                newReel,
                ...state.userReels,
              ];

              state.userReelsTotal +=
                1;
            }
          }
        )

        .addCase(
          createReel.rejected,
          (
            state,
            action
          ) => {
            state.creatingReel =
              false;

            state.createReelError =
              action.payload ||
              "Failed to create reel";
          }
        );

      // =================================================
      // DELETE REEL
      // =================================================

      builder
        .addCase(
          deleteReel.pending,
          (
            state,
            action
          ) => {
            const reelId =
              action.meta.arg;

            if (
              !state.deletingReelIds.includes(
                reelId
              )
            ) {
              state.deletingReelIds.push(
                reelId
              );
            }
          }
        )

        .addCase(
          deleteReel.fulfilled,
          (
            state,
            action
          ) => {
            const reelId =
              action.payload;

            state.deletingReelIds =
              state.deletingReelIds.filter(
                (id) =>
                  id !== reelId
              );

            const wasGlobal =
              state.reels.some(
                (item) =>
                  item?.id === reelId
              );

            const wasHome =
              state.homeReels.some(
                (item) =>
                  item?.id === reelId
              );

            const wasUser =
              state.userReels.some(
                (item) =>
                  item?.id === reelId
              );

            state.reels =
              state.reels.filter(
                (item) =>
                  item?.id !== reelId
              );

            state.homeReels =
              state.homeReels.filter(
                (item) =>
                  item?.id !== reelId
              );

            state.userReels =
              state.userReels.filter(
                (item) =>
                  item?.id !== reelId
              );

            if (wasGlobal) {
              state.total =
                Math.max(
                  0,
                  state.total - 1
                );
            }

            if (wasHome) {
              state.homeReelsTotal =
                Math.max(
                  0,
                  state.homeReelsTotal -
                    1
                );
            }

            if (wasUser) {
              state.userReelsTotal =
                Math.max(
                  0,
                  state.userReelsTotal -
                    1
                );
            }
          }
        )

        .addCase(
          deleteReel.rejected,
          (
            state,
            action
          ) => {
            const reelId =
              action.meta.arg;

            state.deletingReelIds =
              state.deletingReelIds.filter(
                (id) =>
                  id !== reelId
              );

            state.error =
              action.payload ||
              "Failed to delete reel";
          }
        );

      // =================================================
      // LIKE
      // =================================================

      builder
        .addCase(
          likeReel.fulfilled,
          (
            state,
            action
          ) => {
            const {
              reelId,
              data,
            } = action.payload;

            updateAllReelLists(
              state,
              reelId,
              (reel) => {
                reel.is_liked = true;

                reel.likes_count =
                  data?.likes_count ??
                  (reel.likes_count ||
                    0) + 1;

                const likeId =
                  data?.like?.id ??
                  data?.id ??
                  null;

                if (likeId) {
                  reel.like_id =
                    likeId;
                }
              }
            );
          }
        )

        .addCase(
          likeReel.rejected,
          (
            state,
            action
          ) => {
            state.error =
              action.payload ||
              "Failed to like reel";
          }
        );

      // =================================================
      // UNLIKE
      // =================================================

      builder
        .addCase(
          unlikeReel.fulfilled,
          (
            state,
            action
          ) => {
            const {
              reelId,
            } = action.payload;

            updateAllReelLists(
              state,
              reelId,
              (reel) => {
                reel.is_liked = false;

                reel.likes_count =
                  Math.max(
                    0,
                    (reel.likes_count ||
                      0) - 1
                  );

                reel.like_id = null;
              }
            );
          }
        )

        .addCase(
          unlikeReel.rejected,
          (
            state,
            action
          ) => {
            state.error =
              action.payload ||
              "Failed to unlike reel";
          }
        );

      // =================================================
      // SAVE
      // =================================================

      builder
        .addCase(
          saveReel.pending,
          (
            state,
            action
          ) => {
            const reelId =
              action.meta.arg;

            if (
              !state.savingReelIds.includes(
                reelId
              )
            ) {
              state.savingReelIds.push(
                reelId
              );
            }
          }
        )

        .addCase(
          saveReel.fulfilled,
          (
            state,
            action
          ) => {
            const {
              reelId,
            } = action.payload;

            state.savingReelIds =
              state.savingReelIds.filter(
                (id) =>
                  id !== reelId
              );

            updateAllReelLists(
              state,
              reelId,
              (reel) => {
                reel.is_saved = true;
              }
            );
          }
        )

        .addCase(
          saveReel.rejected,
          (
            state,
            action
          ) => {
            const reelId =
              action.meta.arg;

            state.savingReelIds =
              state.savingReelIds.filter(
                (id) =>
                  id !== reelId
              );

            state.error =
              action.payload ||
              "Failed to save reel";
          }
        );

      // =================================================
      // UNSAVE
      // =================================================

      builder
        .addCase(
          unsaveReel.pending,
          (
            state,
            action
          ) => {
            const reelId =
              action.meta.arg;

            if (
              !state.unsavingReelIds.includes(
                reelId
              )
            ) {
              state.unsavingReelIds.push(
                reelId
              );
            }
          }
        )

        .addCase(
          unsaveReel.fulfilled,
          (
            state,
            action
          ) => {
            const {
              reelId,
            } = action.payload;

            state.unsavingReelIds =
              state.unsavingReelIds.filter(
                (id) =>
                  id !== reelId
              );

            updateAllReelLists(
              state,
              reelId,
              (reel) => {
                reel.is_saved = false;
              }
            );
          }
        )

        .addCase(
          unsaveReel.rejected,
          (
            state,
            action
          ) => {
            const reelId =
              action.meta.arg;

            state.unsavingReelIds =
              state.unsavingReelIds.filter(
                (id) =>
                  id !== reelId
              );

            state.error =
              action.payload ||
              "Failed to unsave reel";
          }
        );
    },
  });

// ======================================================
// ACTIONS
// ======================================================

export const {
  clearReels,
  clearHomeReels,
  clearUserReels,
  startReelsRefresh,
  startHomeReelsRefresh,
  startUserReelsRefresh,
  clearCreatedReel,
  clearCurrentReel,
} = reelsSlice.actions;

// ======================================================
// SELECTORS
// ======================================================

export const selectIsSavingReel = (
  state,
  reelId
) =>
  state.reels?.savingReelIds?.includes(
    reelId
  ) ?? false;

export const selectIsUnsavingReel = (
  state,
  reelId
) =>
  state.reels?.unsavingReelIds?.includes(
    reelId
  ) ?? false;

export const selectIsDeletingReel = (
  state,
  reelId
) =>
  state.reels?.deletingReelIds?.includes(
    reelId
  ) ?? false;

export const selectIsCreatingReel = (
  state
) =>
  state.reels?.creatingReel ?? false;

// ======================================================
// DEFAULT EXPORT
// ======================================================

export default reelsSlice.reducer;