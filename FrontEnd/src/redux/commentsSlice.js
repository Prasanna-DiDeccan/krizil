import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../utils/api";

import {
  API_ENDPOINTS,
} from "../config/apiEndpoints";

// ======================================================
// GET COMMENTS
// ======================================================

export const getComments =
  createAsyncThunk(
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
        console.log(
          "=========================================="
        );

        console.log(
          "💬 GET COMMENTS"
        );

        console.log(
          "POST ID =>",
          postId
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
          "URL =>",
          API_ENDPOINTS.comments.get(
            postId
          )
        );

        console.log(
          "=========================================="
        );

        const response =
          await api.get(
            API_ENDPOINTS.comments.get(
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
          "💬 GET COMMENTS RESPONSE =>",
          response.data
        );

        return {
          postId,
          ...response.data,
        };
      } catch (error) {
        console.log(
          "❌ GET COMMENTS ERROR =>",
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
// ADD COMMENT
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
        console.log(
          "=========================================="
        );

        console.log(
          "💬 ADD COMMENT"
        );

        console.log(
          "POST ID =>",
          postId
        );

        console.log(
          "CONTENT =>",
          content
        );

        console.log(
          "URL =>",
          API_ENDPOINTS.comments.add(
            postId
          )
        );

        console.log(
          "=========================================="
        );

        const response =
          await api.post(
            API_ENDPOINTS.comments.add(
              postId
            ),
            {
              content:
                content.trim(),
            }
          );

        console.log(
          "✅ ADD COMMENT RESPONSE =>",
          response.data
        );

        return response.data;
      } catch (error) {
        console.log(
          "❌ ADD COMMENT ERROR =>",
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
        console.log(
          "=========================================="
        );

        console.log(
          "↩️ REPLY COMMENT"
        );

        console.log(
          "COMMENT ID =>",
          commentId
        );

        console.log(
          "CONTENT =>",
          content
        );

        console.log(
          "URL =>",
          API_ENDPOINTS.comments.reply(
            commentId
          )
        );

        console.log(
          "=========================================="
        );

        const response =
          await api.post(
            API_ENDPOINTS.comments.reply(
              commentId
            ),
            {
              content:
                content.trim(),
            }
          );

        console.log(
          "✅ REPLY RESPONSE =>",
          response.data
        );

        return response.data;
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
        console.log(
          "=========================================="
        );

        console.log(
          "❤️ LIKE COMMENT"
        );

        console.log(
          "COMMENT ID =>",
          commentId
        );

        console.log(
          "URL =>",
          API_ENDPOINTS.comments.like(
            commentId
          )
        );

        console.log(
          "=========================================="
        );

        const response =
          await api.post(
            API_ENDPOINTS.comments.like(
              commentId
            )
          );

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
        console.log(
          "=========================================="
        );

        console.log(
          "🗑️ DELETE COMMENT"
        );

        console.log(
          "COMMENT ID =>",
          commentId
        );

        console.log(
          "DELETE URL =>",
          API_ENDPOINTS.comments.delete(
            commentId
          )
        );

        console.log(
          "=========================================="
        );

        const response =
          await api.delete(
            API_ENDPOINTS.comments.delete(
              commentId
            )
          );

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

  currentPostId: null,

  loading: false,

  loadingMore: false,

  addingComment: false,

  replying: false,

  likingCommentId: null,

  deletingCommentId: null,

  deleting: false,

  error: null,

  hasMore: true,
};

// ======================================================
// SLICE
// ======================================================

const commentsSlice =
  createSlice({
    name: "comments",

    initialState,

    reducers: {
      // ================================================
      // CLEAR COMMENTS
      // ================================================

      clearComments: (state) => {
        state.comments = [];

        state.total = 0;

        state.limit = 20;

        state.offset = 0;

        state.currentPostId = null;

        state.loading = false;

        state.loadingMore = false;

        state.addingComment = false;

        state.replying = false;

        state.likingCommentId = null;

        state.deletingCommentId = null;

        state.deleting = false;

        state.error = null;

        state.hasMore = true;
      },

      // ================================================
      // CLEAR ERROR
      // ================================================

      clearCommentsError: (
        state
      ) => {
        state.error = null;
      },
    },

    extraReducers: (builder) => {
      builder

        // ============================================
        // GET COMMENTS - PENDING
        // ============================================

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
            } else {
              state.loadingMore = true;
            }

            state.currentPostId =
              postId;

            state.error = null;
          }
        )

        // ============================================
        // GET COMMENTS - SUCCESS
        // ============================================

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

            state.currentPostId =
              postId;

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

        // ============================================
        // GET COMMENTS - ERROR
        // ============================================

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

        // ============================================
        // ADD COMMENT - PENDING
        // ============================================

        .addCase(
          addComment.pending,
          (state) => {
            state.addingComment = true;

            state.error = null;
          }
        )

        // ============================================
        // ADD COMMENT - SUCCESS
        // ============================================

        .addCase(
          addComment.fulfilled,
          (
            state,
            action
          ) => {
            const newComment =
              action.payload;

            if (newComment) {
              state.comments = [
                newComment,
                ...state.comments,
              ];

              state.total += 1;
            }

            state.addingComment =
              false;

            state.error = null;
          }
        )

        // ============================================
        // ADD COMMENT - ERROR
        // ============================================

        .addCase(
          addComment.rejected,
          (
            state,
            action
          ) => {
            state.addingComment =
              false;

            state.error =
              action.payload ||
              "Failed to add comment";
          }
        )

        // ============================================
        // REPLY - PENDING
        // ============================================

        .addCase(
          replyToComment.pending,
          (state) => {
            state.replying = true;

            state.error = null;
          }
        )

        // ============================================
        // REPLY - SUCCESS
        // ============================================

        .addCase(
          replyToComment.fulfilled,
          (
            state,
            action
          ) => {
            const reply =
              action.payload;

            const parentId =
              reply?.parent_id ??
              reply?.parent_comment_id ??
              reply?.comment_id;

            const parent =
              state.comments.find(
                (comment) =>
                  String(
                    comment.id
                  ) ===
                  String(parentId)
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

        // ============================================
        // REPLY - ERROR
        // ============================================

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

        // ============================================
        // LIKE COMMENT - PENDING
        // ============================================

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

        // ============================================
        // LIKE COMMENT - SUCCESS
        // ============================================

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

            state.likingCommentId =
              null;

            state.error = null;
          }
        )

        // ============================================
        // LIKE COMMENT - ERROR
        // ============================================

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

        // ============================================
        // DELETE COMMENT - PENDING
        // ============================================

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

        // ============================================
        // DELETE COMMENT - SUCCESS
        // ============================================

        .addCase(
          deleteComment.fulfilled,
          (
            state,
            action
          ) => {
            const commentId =
              action.payload.commentId;

            state.comments =
              state.comments.filter(
                (comment) =>
                  String(
                    comment.id
                  ) !==
                  String(commentId)
              );

            state.total = Math.max(
              0,
              state.total - 1
            );

            state.deletingCommentId =
              null;

            state.deleting = false;

            state.error = null;
          }
        )

        // ============================================
        // DELETE COMMENT - ERROR
        // ============================================

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
} =
  commentsSlice.actions;

// ======================================================
// REDUCER
// ======================================================

export default commentsSlice.reducer;