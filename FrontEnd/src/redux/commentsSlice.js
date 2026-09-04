// import {
//   createSlice,
//   createAsyncThunk,
// } from "@reduxjs/toolkit";

// import api from "../utils/api";

// import {
//   API_ENDPOINTS,
// } from "../config/apiEndpoints";

// // ======================================================
// // GET POST COMMENTS
// // ======================================================

// export const getComments = createAsyncThunk(
//   "comments/getComments",

//   async (
//     {
//       postId,
//       limit = 20,
//       offset = 0,
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log("==========================================");
//       console.log("💬 GET POST COMMENTS");
//       console.log("POST ID =>", postId);
//       console.log("LIMIT =>", limit);
//       console.log("OFFSET =>", offset);

//       const url =
//         API_ENDPOINTS.comments.get(postId);

//       console.log("URL =>", url);
//       console.log("==========================================");

//       const response = await api.get(
//         url,
//         {
//           params: {
//             limit,
//             offset,
//           },
//         }
//       );

//       console.log(
//         "💬 GET POST COMMENTS RESPONSE =>",
//         response.data
//       );

//       return {
//         postId,
//         ...response.data,
//       };
//     } catch (error) {
//       console.log(
//         "❌ GET POST COMMENTS ERROR =>",
//         error.response?.data || error.message
//       );

//       return rejectWithValue(
//         error.response?.data ||
//           "Failed to fetch comments"
//       );
//     }
//   }
// );

// // ======================================================
// // GET REEL COMMENTS
// // ======================================================

// export const getReelComments = createAsyncThunk(
//   "comments/getReelComments",

//   async (
//     {
//       reelId,
//       limit = 20,
//       offset = 0,
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log("==========================================");
//       console.log("🎬 GET REEL COMMENTS");
//       console.log("REEL ID =>", reelId);
//       console.log("LIMIT =>", limit);
//       console.log("OFFSET =>", offset);

//       const url =
//         API_ENDPOINTS.comments.getReelComments(
//           reelId
//         );

//       console.log("URL =>", url);
//       console.log("==========================================");

//       const response = await api.get(
//         url,
//         {
//           params: {
//             limit,
//             offset,
//           },
//         }
//       );

//       console.log(
//         "🎬 GET REEL COMMENTS RESPONSE =>",
//         response.data
//       );

//       return {
//         reelId,
//         ...response.data,
//       };
//     } catch (error) {
//       console.log(
//         "❌ GET REEL COMMENTS ERROR =>",
//         error.response?.data || error.message
//       );

//       return rejectWithValue(
//         error.response?.data ||
//           "Failed to fetch reel comments"
//       );
//     }
//   }
// );

// // ======================================================
// // ADD POST COMMENT
// // ======================================================

// export const addComment = createAsyncThunk(
//   "comments/addComment",

//   async (
//     {
//       postId,
//       content,
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log("==========================================");
//       console.log("💬 ADD POST COMMENT");
//       console.log("POST ID =>", postId);
//       console.log("CONTENT =>", content);

//       const url =
//         API_ENDPOINTS.comments.add(postId);

//       console.log("URL =>", url);
//       console.log("==========================================");

//       const response = await api.post(
//         url,
//         {
//           content: content.trim(),
//         }
//       );

//       console.log(
//         "✅ ADD POST COMMENT RESPONSE =>",
//         response.data
//       );

//       return {
//         postId,
//         comment: response.data,
//       };
//     } catch (error) {
//       console.log(
//         "❌ ADD POST COMMENT ERROR =>",
//         error.response?.data || error.message
//       );

//       return rejectWithValue(
//         error.response?.data ||
//           "Failed to add comment"
//       );
//     }
//   }
// );

// // ======================================================
// // ADD REEL COMMENT
// // ======================================================

// export const addReelComment = createAsyncThunk(
//   "comments/addReelComment",

//   async (
//     {
//       reelId,
//       content,
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log("==========================================");
//       console.log("🎬 ADD REEL COMMENT");
//       console.log("REEL ID =>", reelId);
//       console.log("CONTENT =>", content);

//       const url =
//         API_ENDPOINTS.comments.addReelComment(
//           reelId
//         );

//       console.log("URL =>", url);
//       console.log("==========================================");

//       const response = await api.post(
//         url,
//         {
//           content: content.trim(),
//         }
//       );

//       console.log(
//         "✅ ADD REEL COMMENT RESPONSE =>",
//         response.data
//       );

//       return {
//         reelId,
//         comment: response.data,
//       };
//     } catch (error) {
//       console.log(
//         "❌ ADD REEL COMMENT ERROR =>",
//         error.response?.data || error.message
//       );

//       return rejectWithValue(
//         error.response?.data ||
//           "Failed to add reel comment"
//       );
//     }
//   }
// );

// // ======================================================
// // REPLY TO COMMENT
// // ======================================================

// export const replyToComment = createAsyncThunk(
//   "comments/replyToComment",

//   async (
//     {
//       commentId,
//       content,
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log("==========================================");
//       console.log("↩️ REPLY COMMENT");
//       console.log("COMMENT ID =>", commentId);
//       console.log("CONTENT =>", content);

//       const url =
//         API_ENDPOINTS.comments.reply(
//           commentId
//         );

//       console.log("URL =>", url);
//       console.log("==========================================");

//       const response = await api.post(
//         url,
//         {
//           content: content.trim(),
//         }
//       );

//       console.log(
//         "✅ REPLY RESPONSE =>",
//         response.data
//       );

//       return {
//         parentCommentId: commentId,
//         reply: response.data,
//       };
//     } catch (error) {
//       console.log(
//         "❌ REPLY ERROR =>",
//         error.response?.data || error.message
//       );

//       return rejectWithValue(
//         error.response?.data ||
//           "Failed to reply"
//       );
//     }
//   }
// );

// // ======================================================
// // GET COMMENT REPLIES
// // ======================================================

// export const getCommentReplies = createAsyncThunk(
//   "comments/getCommentReplies",

//   async (
//     {
//       commentId,
//       limit = 20,
//       offset = 0,
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log("==========================================");
//       console.log("↩️ GET COMMENT REPLIES");
//       console.log("COMMENT ID =>", commentId);
//       console.log("LIMIT =>", limit);
//       console.log("OFFSET =>", offset);

//       const url =
//         API_ENDPOINTS.comments.getReplies(
//           commentId
//         );

//       console.log("URL =>", url);
//       console.log("==========================================");

//       const response = await api.get(
//         url,
//         {
//           params: {
//             limit,
//             offset,
//           },
//         }
//       );

//       console.log(
//         "↩️ GET REPLIES RESPONSE =>",
//         response.data
//       );

//       return {
//         commentId,
//         ...response.data,
//       };
//     } catch (error) {
//       console.log(
//         "❌ GET REPLIES ERROR =>",
//         error.response?.data || error.message
//       );

//       return rejectWithValue(
//         error.response?.data ||
//           "Failed to fetch replies"
//       );
//     }
//   }
// );

// // ======================================================
// // LIKE COMMENT
// // ======================================================

// export const likeComment = createAsyncThunk(
//   "comments/likeComment",

//   async (
//     commentId,
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log("==========================================");
//       console.log("❤️ LIKE COMMENT");
//       console.log("COMMENT ID =>", commentId);

//       const url =
//         API_ENDPOINTS.comments.like(
//           commentId
//         );

//       console.log("URL =>", url);
//       console.log("==========================================");

//       const response = await api.post(url);

//       console.log(
//         "✅ LIKE COMMENT RESPONSE =>",
//         response.data
//       );

//       return {
//         commentId,
//         data: response.data,
//       };
//     } catch (error) {
//       console.log(
//         "❌ LIKE COMMENT ERROR =>",
//         error.response?.data || error.message
//       );

//       return rejectWithValue(
//         error.response?.data ||
//           "Failed to like comment"
//       );
//     }
//   }
// );

// // ======================================================
// // DELETE COMMENT
// // ======================================================

// export const deleteComment = createAsyncThunk(
//   "comments/deleteComment",

//   async (
//     commentId,
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log("==========================================");
//       console.log("🗑️ DELETE COMMENT");
//       console.log("COMMENT ID =>", commentId);

//       const url =
//         API_ENDPOINTS.comments.delete(
//           commentId
//         );

//       console.log("DELETE URL =>", url);
//       console.log("==========================================");

//       const response = await api.delete(url);

//       console.log(
//         "✅ DELETE STATUS =>",
//         response.status
//       );

//       console.log(
//         "✅ DELETE RESPONSE =>",
//         response.data
//       );

//       return {
//         commentId,
//         data: response.data,
//       };
//     } catch (error) {
//       console.log("==========================================");
//       console.log("❌ DELETE COMMENT FAILED");
//       console.log(
//         "STATUS =>",
//         error.response?.status
//       );
//       console.log(
//         "DATA =>",
//         error.response?.data
//       );
//       console.log(
//         "MESSAGE =>",
//         error.message
//       );
//       console.log("==========================================");

//       return rejectWithValue({
//         status: error.response?.status,
//         message:
//           error.response?.data ||
//           error.message ||
//           "Failed to delete comment",
//       });
//     }
//   }
// );

// // ======================================================
// // INITIAL STATE
// // ======================================================

// const initialState = {
//   comments: [],

//   total: 0,

//   limit: 20,

//   offset: 0,

//   // post / reel
//   contentType: null,

//   currentPostId: null,

//   currentReelId: null,

//   // replies stored by parent comment id
//   replies: {},

//   loading: false,

//   loadingMore: false,

//   addingComment: false,

//   replying: false,

//   loadingReplies: false,

//   likingCommentId: null,

//   deletingCommentId: null,

//   deleting: false,

//   error: null,

//   hasMore: true,

//   repliesError: null,
// };

// // ======================================================
// // SLICE
// // ======================================================

// const commentsSlice = createSlice({
//   name: "comments",

//   initialState,

//   reducers: {
//     // ================================================
//     // CLEAR COMMENTS
//     // ================================================

//     clearComments: (state) => {
//       state.comments = [];

//       state.total = 0;

//       state.limit = 20;

//       state.offset = 0;

//       state.contentType = null;

//       state.currentPostId = null;

//       state.currentReelId = null;

//       state.replies = {};

//       state.loading = false;

//       state.loadingMore = false;

//       state.addingComment = false;

//       state.replying = false;

//       state.loadingReplies = false;

//       state.likingCommentId = null;

//       state.deletingCommentId = null;

//       state.deleting = false;

//       state.error = null;

//       state.repliesError = null;

//       state.hasMore = true;
//     },

//     // ================================================
//     // CLEAR ERROR
//     // ================================================

//     clearCommentsError: (state) => {
//       state.error = null;
//     },

//     // ================================================
//     // CLEAR REPLIES
//     // ================================================

//     clearReplies: (
//       state,
//       action
//     ) => {
//       const commentId =
//         action.payload;

//       delete state.replies[
//         commentId
//       ];
//     },
//   },

//   extraReducers: (builder) => {
//     builder

//       // ==================================================
//       // GET POST COMMENTS
//       // ==================================================

//       .addCase(
//         getComments.pending,
//         (
//           state,
//           action
//         ) => {
//           const {
//             postId,
//             offset = 0,
//           } =
//             action.meta.arg || {};

//           if (offset === 0) {
//             state.loading = true;

//             state.comments = [];

//             state.replies = {};
//           } else {
//             state.loadingMore = true;
//           }

//           state.contentType = "post";

//           state.currentPostId =
//             postId;

//           state.currentReelId = null;

//           state.error = null;
//         }
//       )

//       .addCase(
//         getComments.fulfilled,
//         (
//           state,
//           action
//         ) => {
//           const {
//             postId,
//             total = 0,
//             limit = 20,
//             offset = 0,
//             items = [],
//           } =
//             action.payload;

//           state.contentType = "post";

//           state.currentPostId =
//             postId;

//           state.currentReelId = null;

//           state.total = total;

//           state.limit = limit;

//           state.offset = offset;

//           if (offset === 0) {
//             state.comments = items;
//           } else {
//             state.comments = [
//               ...state.comments,
//               ...items,
//             ];
//           }

//           state.hasMore =
//             state.comments.length <
//               total &&
//             items.length > 0;

//           state.loading = false;

//           state.loadingMore = false;

//           state.error = null;
//         }
//       )

//       .addCase(
//         getComments.rejected,
//         (
//           state,
//           action
//         ) => {
//           state.loading = false;

//           state.loadingMore = false;

//           state.error =
//             action.payload ||
//             "Failed to fetch comments";
//         }
//       )

//       // ==================================================
//       // GET REEL COMMENTS
//       // ==================================================

//       .addCase(
//         getReelComments.pending,
//         (
//           state,
//           action
//         ) => {
//           const {
//             reelId,
//             offset = 0,
//           } =
//             action.meta.arg || {};

//           if (offset === 0) {
//             state.loading = true;

//             state.comments = [];

//             state.replies = {};
//           } else {
//             state.loadingMore = true;
//           }

//           state.contentType = "reel";

//           state.currentReelId =
//             reelId;

//           state.currentPostId = null;

//           state.error = null;
//         }
//       )

//       .addCase(
//         getReelComments.fulfilled,
//         (
//           state,
//           action
//         ) => {
//           const {
//             reelId,
//             total = 0,
//             limit = 20,
//             offset = 0,
//             items = [],
//           } =
//             action.payload;

//           state.contentType = "reel";

//           state.currentReelId =
//             reelId;

//           state.currentPostId = null;

//           state.total = total;

//           state.limit = limit;

//           state.offset = offset;

//           if (offset === 0) {
//             state.comments = items;
//           } else {
//             state.comments = [
//               ...state.comments,
//               ...items,
//             ];
//           }

//           state.hasMore =
//             state.comments.length <
//               total &&
//             items.length > 0;

//           state.loading = false;

//           state.loadingMore = false;

//           state.error = null;
//         }
//       )

//       .addCase(
//         getReelComments.rejected,
//         (
//           state,
//           action
//         ) => {
//           state.loading = false;

//           state.loadingMore = false;

//           state.error =
//             action.payload ||
//             "Failed to fetch reel comments";
//         }
//       )

//       // ==================================================
//       // ADD POST COMMENT
//       // ==================================================

//       .addCase(
//         addComment.pending,
//         (state) => {
//           state.addingComment = true;

//           state.error = null;
//         }
//       )

//       .addCase(
//         addComment.fulfilled,
//         (
//           state,
//           action
//         ) => {
//           const {
//             comment,
//           } =
//             action.payload;

//           if (
//             comment &&
//             state.contentType === "post"
//           ) {
//             state.comments = [
//               comment,
//               ...state.comments,
//             ];

//             state.total += 1;
//           }

//           state.addingComment = false;

//           state.error = null;
//         }
//       )

//       .addCase(
//         addComment.rejected,
//         (
//           state,
//           action
//         ) => {
//           state.addingComment = false;

//           state.error =
//             action.payload ||
//             "Failed to add comment";
//         }
//       )

//       // ==================================================
//       // ADD REEL COMMENT
//       // ==================================================

//       .addCase(
//         addReelComment.pending,
//         (state) => {
//           state.addingComment = true;

//           state.error = null;
//         }
//       )

//       .addCase(
//         addReelComment.fulfilled,
//         (
//           state,
//           action
//         ) => {
//           const {
//             comment,
//           } =
//             action.payload;

//           if (
//             comment &&
//             state.contentType === "reel"
//           ) {
//             state.comments = [
//               comment,
//               ...state.comments,
//             ];

//             state.total += 1;
//           }

//           state.addingComment = false;

//           state.error = null;
//         }
//       )

//       .addCase(
//         addReelComment.rejected,
//         (
//           state,
//           action
//         ) => {
//           state.addingComment = false;

//           state.error =
//             action.payload ||
//             "Failed to add reel comment";
//         }
//       )

//       // ==================================================
//       // REPLY TO COMMENT
//       // ==================================================

//       .addCase(
//         replyToComment.pending,
//         (state) => {
//           state.replying = true;

//           state.error = null;
//         }
//       )

//       .addCase(
//         replyToComment.fulfilled,
//         (
//           state,
//           action
//         ) => {
//           const {
//             parentCommentId,
//             reply,
//           } =
//             action.payload;

//           if (!state.replies[parentCommentId]) {
//             state.replies[parentCommentId] =
//               [];
//           }

//           if (reply) {
//             state.replies[
//               parentCommentId
//             ].unshift(reply);
//           }

//           const parent =
//             state.comments.find(
//               (comment) =>
//                 String(
//                   comment.id
//                 ) ===
//                 String(
//                   parentCommentId
//                 )
//             );

//           if (parent) {
//             parent.replies_count =
//               Number(
//                 parent.replies_count || 0
//               ) + 1;
//           }

//           state.replying = false;

//           state.error = null;
//         }
//       )

//       .addCase(
//         replyToComment.rejected,
//         (
//           state,
//           action
//         ) => {
//           state.replying = false;

//           state.error =
//             action.payload ||
//             "Failed to reply";
//         }
//       )

//       // ==================================================
//       // GET COMMENT REPLIES
//       // ==================================================

//       .addCase(
//         getCommentReplies.pending,
//         (state) => {
//           state.loadingReplies = true;

//           state.repliesError = null;
//         }
//       )

//       .addCase(
//         getCommentReplies.fulfilled,
//         (
//           state,
//           action
//         ) => {
//           const {
//             commentId,
//             items = [],
//           } =
//             action.payload;

//           state.replies[
//             commentId
//           ] = items;

//           state.loadingReplies = false;

//           state.repliesError = null;
//         }
//       )

//       .addCase(
//         getCommentReplies.rejected,
//         (
//           state,
//           action
//         ) => {
//           state.loadingReplies = false;

//           state.repliesError =
//             action.payload ||
//             "Failed to fetch replies";
//         }
//       )

//       // ==================================================
//       // LIKE COMMENT
//       // ==================================================

//       .addCase(
//         likeComment.pending,
//         (
//           state,
//           action
//         ) => {
//           state.likingCommentId =
//             action.meta.arg;

//           state.error = null;
//         }
//       )

//       .addCase(
//         likeComment.fulfilled,
//         (
//           state,
//           action
//         ) => {
//           const {
//             commentId,
//             data,
//           } =
//             action.payload;

//           const comment =
//             state.comments.find(
//               (item) =>
//                 String(
//                   item.id
//                 ) ===
//                 String(commentId)
//             );

//           if (comment) {
//             if (
//               typeof data?.is_liked ===
//               "boolean"
//             ) {
//               comment.is_liked =
//                 data.is_liked;
//             } else {
//               comment.is_liked =
//                 !comment.is_liked;
//             }

//             if (
//               typeof data?.likes_count ===
//               "number"
//             ) {
//               comment.likes_count =
//                 data.likes_count;
//             } else {
//               if (
//                 comment.is_liked
//               ) {
//                 comment.likes_count =
//                   Number(
//                     comment.likes_count ||
//                       0
//                   ) + 1;
//               } else {
//                 comment.likes_count =
//                   Math.max(
//                     0,
//                     Number(
//                       comment.likes_count ||
//                         0
//                     ) - 1
//                   );
//               }
//             }
//           }

//           state.likingCommentId =
//             null;

//           state.error = null;
//         }
//       )

//       .addCase(
//         likeComment.rejected,
//         (
//           state,
//           action
//         ) => {
//           state.likingCommentId =
//             null;

//           state.error =
//             action.payload ||
//             "Failed to like comment";
//         }
//       )

//       // ==================================================
//       // DELETE COMMENT
//       // ==================================================

//       .addCase(
//         deleteComment.pending,
//         (
//           state,
//           action
//         ) => {
//           state.deletingCommentId =
//             action.meta.arg;

//           state.deleting = true;

//           state.error = null;
//         }
//       )

//       .addCase(
//         deleteComment.fulfilled,
//         (
//           state,
//           action
//         ) => {
//           const commentId =
//             action.payload.commentId;

//           state.comments =
//             state.comments.filter(
//               (comment) =>
//                 String(
//                   comment.id
//                 ) !==
//                 String(commentId)
//             );

//           state.total =
//             Math.max(
//               0,
//               state.total - 1
//             );

//           delete state.replies[
//             commentId
//           ];

//           state.deletingCommentId =
//             null;

//           state.deleting = false;

//           state.error = null;
//         }
//       )

//       .addCase(
//         deleteComment.rejected,
//         (
//           state,
//           action
//         ) => {
//           state.deletingCommentId =
//             null;

//           state.deleting = false;

//           state.error =
//             action.payload ||
//             "Failed to delete comment";
//         }
//       );
//   },
// });

// // ======================================================
// // ACTIONS
// // ======================================================

// export const {
//   clearComments,
//   clearCommentsError,
//   clearReplies,
// } = commentsSlice.actions;

// // ======================================================
// // REDUCER
// // ======================================================

// export default commentsSlice.reducer;


import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../utils/api";

import {
  API_ENDPOINTS,
} from "../config/apiEndpoints";

// ======================================================
// GET POST COMMENTS
// ======================================================

export const getComments = createAsyncThunk(
  "comments/getComments",

  async (
    {
      postId,
      limit = 20,
      offset = 0,
    },
    { rejectWithValue }
  ) => {
    try {
      console.log("==========================================");
      console.log("💬 GET POST COMMENTS");
      console.log("POST ID =>", postId);
      console.log("LIMIT =>", limit);
      console.log("OFFSET =>", offset);

      const url =
        API_ENDPOINTS.comments.get(postId);

      console.log("URL =>", url);
      console.log("==========================================");

      const response = await api.get(url, {
        params: {
          limit,
          offset,
        },
      });

      console.log(
        "💬 GET POST COMMENTS RESPONSE =>",
        response.data
      );

      return {
        postId,
        ...response.data,
      };
    } catch (error) {
      console.log(
        "❌ GET POST COMMENTS ERROR =>",
        error.response?.data ||
          error.message
      );

      return rejectWithValue(
        error.response?.data ||
          "Failed to fetch comments"
      );
    }
  }
);

// ======================================================
// GET REEL COMMENTS
// ======================================================

export const getReelComments =
  createAsyncThunk(
    "comments/getReelComments",

    async (
      {
        reelId,
        limit = 20,
        offset = 0,
      },
      { rejectWithValue }
    ) => {
      try {
        console.log("==========================================");
        console.log("🎬 GET REEL COMMENTS");
        console.log("REEL ID =>", reelId);
        console.log("LIMIT =>", limit);
        console.log("OFFSET =>", offset);

        const url =
          API_ENDPOINTS.comments.getReelComments(
            reelId
          );

        console.log("URL =>", url);
        console.log("==========================================");

        const response = await api.get(
          url,
          {
            params: {
              limit,
              offset,
            },
          }
        );

        console.log(
          "🎬 GET REEL COMMENTS RESPONSE =>",
          response.data
        );

        return {
          reelId,
          ...response.data,
        };
      } catch (error) {
        console.log(
          "❌ GET REEL COMMENTS ERROR =>",
          error.response?.data ||
            error.message
        );

        return rejectWithValue(
          error.response?.data ||
            "Failed to fetch reel comments"
        );
      }
    }
  );

// ======================================================
// ADD POST COMMENT
// ======================================================

export const addComment =
  createAsyncThunk(
    "comments/addComment",

    async (
      {
        postId,
        content,
      },
      { rejectWithValue }
    ) => {
      try {
        console.log("==========================================");
        console.log("💬 ADD POST COMMENT");
        console.log("POST ID =>", postId);
        console.log("CONTENT =>", content);

        const url =
          API_ENDPOINTS.comments.add(
            postId
          );

        console.log("URL =>", url);
        console.log("==========================================");

        const response = await api.post(
          url,
          {
            content: content.trim(),
          }
        );

        console.log(
          "✅ ADD POST COMMENT RESPONSE =>",
          response.data
        );

        return {
          postId,
          comment: response.data,
        };
      } catch (error) {
        console.log(
          "❌ ADD POST COMMENT ERROR =>",
          error.response?.data ||
            error.message
        );

        return rejectWithValue(
          error.response?.data ||
            "Failed to add comment"
        );
      }
    }
  );

// ======================================================
// ADD REEL COMMENT
// ======================================================

export const addReelComment =
  createAsyncThunk(
    "comments/addReelComment",

    async (
      {
        reelId,
        content,
      },
      { rejectWithValue }
    ) => {
      try {
        console.log("==========================================");
        console.log("🎬 ADD REEL COMMENT");
        console.log("REEL ID =>", reelId);
        console.log("CONTENT =>", content);

        const url =
          API_ENDPOINTS.comments.addReelComment(
            reelId
          );

        console.log("URL =>", url);
        console.log("==========================================");

        const response = await api.post(
          url,
          {
            content: content.trim(),
          }
        );

        console.log(
          "✅ ADD REEL COMMENT RESPONSE =>",
          response.data
        );

        return {
          reelId,
          comment: response.data,
        };
      } catch (error) {
        console.log(
          "❌ ADD REEL COMMENT ERROR =>",
          error.response?.data ||
            error.message
        );

        return rejectWithValue(
          error.response?.data ||
            "Failed to add reel comment"
        );
      }
    }
  );

// ======================================================
// REPLY TO COMMENT
// ======================================================

export const replyToComment =
  createAsyncThunk(
    "comments/replyToComment",

    async (
      {
        commentId,
        content,
      },
      { rejectWithValue }
    ) => {
      try {
        console.log("==========================================");
        console.log("↩️ REPLY COMMENT");
        console.log("COMMENT ID =>", commentId);
        console.log("CONTENT =>", content);

        const url =
          API_ENDPOINTS.comments.reply(
            commentId
          );

        console.log("URL =>", url);
        console.log("==========================================");

        const response = await api.post(
          url,
          {
            content: content.trim(),
          }
        );

        console.log(
          "✅ REPLY RESPONSE =>",
          response.data
        );

        return {
          parentCommentId: commentId,
          reply: response.data,
        };
      } catch (error) {
        console.log(
          "❌ REPLY ERROR =>",
          error.response?.data ||
            error.message
        );

        return rejectWithValue(
          error.response?.data ||
            "Failed to reply"
        );
      }
    }
  );

// ======================================================
// GET COMMENT REPLIES
// ======================================================

export const getCommentReplies =
  createAsyncThunk(
    "comments/getCommentReplies",

    async (
      {
        commentId,
        limit = 20,
        offset = 0,
      },
      { rejectWithValue }
    ) => {
      try {
        console.log("==========================================");
        console.log("↩️ GET COMMENT REPLIES");
        console.log("COMMENT ID =>", commentId);
        console.log("LIMIT =>", limit);
        console.log("OFFSET =>", offset);

        const url =
          API_ENDPOINTS.comments.getReplies(
            commentId
          );

        console.log("URL =>", url);
        console.log("==========================================");

        const response = await api.get(
          url,
          {
            params: {
              limit,
              offset,
            },
          }
        );

        console.log(
          "↩️ GET REPLIES RESPONSE =>",
          response.data
        );

        return {
          commentId,
          ...response.data,
        };
      } catch (error) {
        console.log(
          "❌ GET REPLIES ERROR =>",
          error.response?.data ||
            error.message
        );

        return rejectWithValue(
          error.response?.data ||
            "Failed to fetch replies"
        );
      }
    }
  );

// ======================================================
// LIKE COMMENT
// ======================================================

export const likeComment =
  createAsyncThunk(
    "comments/likeComment",

    async (
      commentId,
      { rejectWithValue }
    ) => {
      try {
        console.log("==========================================");
        console.log("❤️ LIKE COMMENT");
        console.log("COMMENT ID =>", commentId);

        const url =
          API_ENDPOINTS.comments.like(
            commentId
          );

        console.log("URL =>", url);
        console.log("==========================================");

        const response =
          await api.post(url);

        console.log(
          "✅ LIKE COMMENT RESPONSE =>",
          response.data
        );

        return {
          commentId,
          data: response.data,
        };
      } catch (error) {
        console.log(
          "❌ LIKE COMMENT ERROR =>",
          error.response?.data ||
            error.message
        );

        return rejectWithValue(
          error.response?.data ||
            "Failed to like comment"
        );
      }
    }
  );

// ======================================================
// DELETE COMMENT
// ======================================================

export const deleteComment =
  createAsyncThunk(
    "comments/deleteComment",

    async (
      commentId,
      { rejectWithValue }
    ) => {
      try {
        console.log("==========================================");
        console.log("🗑️ DELETE COMMENT");
        console.log("COMMENT ID =>", commentId);

        const url =
          API_ENDPOINTS.comments.delete(
            commentId
          );

        console.log(
          "DELETE URL =>",
          url
        );

        console.log(
          "=========================================="
        );

        const response =
          await api.delete(url);

        console.log(
          "✅ DELETE STATUS =>",
          response.status
        );

        console.log(
          "✅ DELETE RESPONSE =>",
          response.data
        );

        return {
          commentId,
          data: response.data,
        };
      } catch (error) {
        console.log(
          "=========================================="
        );

        console.log(
          "❌ DELETE COMMENT FAILED"
        );

        console.log(
          "STATUS =>",
          error.response?.status
        );

        console.log(
          "DATA =>",
          error.response?.data
        );

        console.log(
          "MESSAGE =>",
          error.message
        );

        console.log(
          "=========================================="
        );

        return rejectWithValue({
          status:
            error.response?.status,

          message:
            error.response?.data ||
            error.message ||
            "Failed to delete comment",
        });
      }
    }
  );

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  comments: [],

  total: 0,

  limit: 20,

  offset: 0,

  contentType: null,

  currentPostId: null,

  currentReelId: null,

  replies: {},

  loading: false,

  loadingMore: false,

  addingComment: false,

  replying: false,

  loadingReplies: false,

  likingCommentId: null,

  deletingCommentId: null,

  deleting: false,

  error: null,

  hasMore: true,

  repliesError: null,
};

// ======================================================
// SLICE
// ======================================================

const commentsSlice = createSlice({
  name: "comments",

  initialState,

  reducers: {
    // ==================================================
    // CLEAR COMMENTS
    // ==================================================

    clearComments: (state) => {
      state.comments = [];

      state.total = 0;

      state.limit = 20;

      state.offset = 0;

      state.contentType = null;

      state.currentPostId = null;

      state.currentReelId = null;

      state.replies = {};

      state.loading = false;

      state.loadingMore = false;

      state.addingComment = false;

      state.replying = false;

      state.loadingReplies = false;

      state.likingCommentId = null;

      state.deletingCommentId = null;

      state.deleting = false;

      state.error = null;

      state.repliesError = null;

      state.hasMore = true;
    },

    // ==================================================
    // CLEAR ERROR
    // ==================================================

    clearCommentsError: (state) => {
      state.error = null;
    },

    // ==================================================
    // CLEAR REPLIES
    // ==================================================

    clearReplies: (
      state,
      action
    ) => {
      const commentId =
        action.payload;

      delete state.replies[
        commentId
      ];
    },
  },

  extraReducers: (builder) => {
    builder

      // ==================================================
      // GET POST COMMENTS
      // ==================================================

      .addCase(
        getComments.pending,
        (
          state,
          action
        ) => {
          const {
            postId,
            offset = 0,
          } =
            action.meta.arg || {};

          if (offset === 0) {
            state.loading = true;

            state.comments = [];

            state.replies = {};
          } else {
            state.loadingMore = true;
          }

          state.contentType =
            "post";

          state.currentPostId =
            postId;

          state.currentReelId =
            null;

          state.error = null;
        }
      )

      .addCase(
        getComments.fulfilled,
        (
          state,
          action
        ) => {
          const {
            postId,
            total = 0,
            limit = 20,
            offset = 0,
            items = [],
          } =
            action.payload;

          state.contentType =
            "post";

          state.currentPostId =
            postId;

          state.currentReelId =
            null;

          state.total = total;

          state.limit = limit;

          state.offset = offset;

          if (offset === 0) {
            state.comments = items;
          } else {
            state.comments = [
              ...state.comments,
              ...items,
            ];
          }

          state.hasMore =
            state.comments.length <
              total &&
            items.length > 0;

          state.loading = false;

          state.loadingMore = false;

          state.error = null;
        }
      )

      .addCase(
        getComments.rejected,
        (
          state,
          action
        ) => {
          state.loading = false;

          state.loadingMore = false;

          state.error =
            action.payload ||
            "Failed to fetch comments";
        }
      )

      // ==================================================
      // GET REEL COMMENTS
      // ==================================================

      .addCase(
        getReelComments.pending,
        (
          state,
          action
        ) => {
          const {
            reelId,
            offset = 0,
          } =
            action.meta.arg || {};

          if (offset === 0) {
            state.loading = true;

            state.comments = [];

            state.replies = {};
          } else {
            state.loadingMore = true;
          }

          state.contentType =
            "reel";

          state.currentReelId =
            reelId;

          state.currentPostId =
            null;

          state.error = null;
        }
      )

      .addCase(
        getReelComments.fulfilled,
        (
          state,
          action
        ) => {
          const {
            reelId,
            total = 0,
            limit = 20,
            offset = 0,
            items = [],
          } =
            action.payload;

          state.contentType =
            "reel";

          state.currentReelId =
            reelId;

          state.currentPostId =
            null;

          state.total = total;

          state.limit = limit;

          state.offset = offset;

          if (offset === 0) {
            state.comments = items;
          } else {
            state.comments = [
              ...state.comments,
              ...items,
            ];
          }

          state.hasMore =
            state.comments.length <
              total &&
            items.length > 0;

          state.loading = false;

          state.loadingMore = false;

          state.error = null;
        }
      )

      .addCase(
        getReelComments.rejected,
        (
          state,
          action
        ) => {
          state.loading = false;

          state.loadingMore = false;

          state.error =
            action.payload ||
            "Failed to fetch reel comments";
        }
      )

      // ==================================================
      // ADD POST COMMENT
      // ==================================================

      .addCase(
        addComment.pending,
        (state) => {
          state.addingComment = true;

          state.error = null;
        }
      )

      .addCase(
        addComment.fulfilled,
        (
          state,
          action
        ) => {
          const {
            comment,
          } =
            action.payload;

          if (
            comment &&
            state.contentType ===
              "post"
          ) {
            state.comments = [
              comment,
              ...state.comments,
            ];

            state.total += 1;
          }

          state.addingComment = false;

          state.error = null;
        }
      )

      .addCase(
        addComment.rejected,
        (
          state,
          action
        ) => {
          state.addingComment = false;

          state.error =
            action.payload ||
            "Failed to add comment";
        }
      )

      // ==================================================
      // ADD REEL COMMENT
      // ==================================================

      .addCase(
        addReelComment.pending,
        (state) => {
          state.addingComment = true;

          state.error = null;
        }
      )

      .addCase(
        addReelComment.fulfilled,
        (
          state,
          action
        ) => {
          const {
            comment,
          } =
            action.payload;

          if (
            comment &&
            state.contentType ===
              "reel"
          ) {
            state.comments = [
              comment,
              ...state.comments,
            ];

            state.total += 1;
          }

          state.addingComment = false;

          state.error = null;
        }
      )

      .addCase(
        addReelComment.rejected,
        (
          state,
          action
        ) => {
          state.addingComment = false;

          state.error =
            action.payload ||
            "Failed to add reel comment";
        }
      )

      // ==================================================
      // REPLY TO COMMENT
      // ==================================================

      .addCase(
        replyToComment.pending,
        (state) => {
          state.replying = true;

          state.error = null;
        }
      )

      .addCase(
        replyToComment.fulfilled,
        (
          state,
          action
        ) => {
          const {
            parentCommentId,
            reply,
          } =
            action.payload;

          if (
            !state.replies[
              parentCommentId
            ]
          ) {
            state.replies[
              parentCommentId
            ] = [];
          }

          if (reply) {
            state.replies[
              parentCommentId
            ].unshift(reply);
          }

          const parent =
            state.comments.find(
              (comment) =>
                String(
                  comment.id
                ) ===
                String(
                  parentCommentId
                )
            );

          if (parent) {
            parent.replies_count =
              Number(
                parent.replies_count ||
                  0
              ) + 1;
          }

          state.replying = false;

          state.error = null;
        }
      )

      .addCase(
        replyToComment.rejected,
        (
          state,
          action
        ) => {
          state.replying = false;

          state.error =
            action.payload ||
            "Failed to reply";
        }
      )

      // ==================================================
      // GET COMMENT REPLIES
      // ==================================================

      .addCase(
        getCommentReplies.pending,
        (state) => {
          state.loadingReplies = true;

          state.repliesError = null;
        }
      )

      .addCase(
        getCommentReplies.fulfilled,
        (
          state,
          action
        ) => {
          const {
            commentId,
            items = [],
          } =
            action.payload;

          state.replies[
            commentId
          ] = items;

          state.loadingReplies = false;

          state.repliesError = null;
        }
      )

      .addCase(
        getCommentReplies.rejected,
        (
          state,
          action
        ) => {
          state.loadingReplies = false;

          state.repliesError =
            action.payload ||
            "Failed to fetch replies";
        }
      )

      // ==================================================
      // LIKE COMMENT
      // ==================================================

      .addCase(
        likeComment.pending,
        (
          state,
          action
        ) => {
          state.likingCommentId =
            action.meta.arg;

          state.error = null;
        }
      )

      .addCase(
        likeComment.fulfilled,
        (
          state,
          action
        ) => {
          const {
            commentId,
            data,
          } =
            action.payload;

          // ----------------------------------------------
          // Search main comments
          // ----------------------------------------------

          const comment =
            state.comments.find(
              (item) =>
                String(
                  item.id
                ) ===
                String(commentId)
            );

          if (comment) {
            if (
              typeof data?.is_liked ===
              "boolean"
            ) {
              comment.is_liked =
                data.is_liked;
            } else {
              comment.is_liked =
                !comment.is_liked;
            }

            if (
              typeof data?.likes_count ===
              "number"
            ) {
              comment.likes_count =
                data.likes_count;
            } else {
              if (
                comment.is_liked
              ) {
                comment.likes_count =
                  Number(
                    comment.likes_count ||
                      0
                  ) + 1;
              } else {
                comment.likes_count =
                  Math.max(
                    0,
                    Number(
                      comment.likes_count ||
                        0
                    ) - 1
                  );
              }
            }
          }

          // ----------------------------------------------
          // Search replies
          // ----------------------------------------------

          Object.keys(
            state.replies
          ).forEach(
            (parentId) => {
              const replyList =
                state.replies[
                  parentId
                ];

              if (
                !Array.isArray(
                  replyList
                )
              ) {
                return;
              }

              const reply =
                replyList.find(
                  (item) =>
                    String(
                      item.id
                    ) ===
                    String(
                      commentId
                    )
                );

              if (!reply) {
                return;
              }

              if (
                typeof data?.is_liked ===
                "boolean"
              ) {
                reply.is_liked =
                  data.is_liked;
              } else {
                reply.is_liked =
                  !reply.is_liked;
              }

              if (
                typeof data?.likes_count ===
                "number"
              ) {
                reply.likes_count =
                  data.likes_count;
              } else {
                if (
                  reply.is_liked
                ) {
                  reply.likes_count =
                    Number(
                      reply.likes_count ||
                        0
                    ) + 1;
                } else {
                  reply.likes_count =
                    Math.max(
                      0,
                      Number(
                        reply.likes_count ||
                          0
                      ) - 1
                    );
                }
              }
            }
          );

          state.likingCommentId =
            null;

          state.error = null;
        }
      )

      .addCase(
        likeComment.rejected,
        (
          state,
          action
        ) => {
          state.likingCommentId =
            null;

          state.error =
            action.payload ||
            "Failed to like comment";
        }
      )

      // ==================================================
      // DELETE COMMENT
      // ==================================================

      .addCase(
        deleteComment.pending,
        (
          state,
          action
        ) => {
          state.deletingCommentId =
            action.meta.arg;

          state.deleting = true;

          state.error = null;
        }
      )

      .addCase(
        deleteComment.fulfilled,
        (
          state,
          action
        ) => {
          const commentId =
            String(
              action.payload
                .commentId
            );

          // ==================================================
          // REMOVE FROM MAIN COMMENTS
          // ==================================================

          const mainIndex =
            state.comments.findIndex(
              (comment) =>
                String(
                  comment.id
                ) === commentId
            );

          if (
            mainIndex !== -1
          ) {
            state.comments.splice(
              mainIndex,
              1
            );

            state.total =
              Math.max(
                0,
                state.total - 1
              );
          }

          // ==================================================
          // REMOVE FROM REPLIES
          // ==================================================

          Object.keys(
            state.replies
          ).forEach(
            (parentId) => {
              const replyList =
                state.replies[
                  parentId
                ];

              if (
                !Array.isArray(
                  replyList
                )
              ) {
                return;
              }

              const replyIndex =
                replyList.findIndex(
                  (reply) =>
                    String(
                      reply.id
                    ) ===
                    commentId
                );

              if (
                replyIndex !== -1
              ) {
                replyList.splice(
                  replyIndex,
                  1
                );

                // Decrease parent's reply count
                const parent =
                  state.comments.find(
                    (comment) =>
                      String(
                        comment.id
                      ) ===
                      String(
                        parentId
                      )
                  );

                if (parent) {
                  parent.replies_count =
                    Math.max(
                      0,
                      Number(
                        parent.replies_count ||
                          0
                      ) - 1
                    );
                }
              }
            }
          );

          // ==================================================
          // REMOVE REPLY CACHE
          // ==================================================

          delete state.replies[
            commentId
          ];

          state.deletingCommentId =
            null;

          state.deleting = false;

          state.error = null;
        }
      )

      .addCase(
        deleteComment.rejected,
        (
          state,
          action
        ) => {
          state.deletingCommentId =
            null;

          state.deleting = false;

          state.error =
            action.payload ||
            "Failed to delete comment";
        }
      );
  },
});

// ======================================================
// ACTIONS
// ======================================================

export const {
  clearComments,
  clearCommentsError,
  clearReplies,
} =
  commentsSlice.actions;

// ======================================================
// REDUCER
// ======================================================

export default commentsSlice.reducer;