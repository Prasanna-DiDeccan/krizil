// import {
//   createAsyncThunk,
//   createSlice,
// } from "@reduxjs/toolkit";

// import api from "../utils/api";
// import { API_ENDPOINTS } from "../config/apiEndpoints";

// // ======================================================
// // HELPERS
// // ======================================================

// const getErrorMessage = (error, fallback) => {
//   return (
//     error?.response?.data?.detail ||
//     error?.response?.data?.message ||
//     error?.response?.data?.error ||
//     error?.message ||
//     fallback
//   );
// };

// const getNotificationItems = (data) => {
//   if (Array.isArray(data)) {
//     return data;
//   }

//   if (Array.isArray(data?.items)) {
//     return data.items;
//   }

//   if (Array.isArray(data?.notifications)) {
//     return data.notifications;
//   }

//   if (Array.isArray(data?.requests)) {
//     return data.requests;
//   }

//   return [];
// };

// // ======================================================
// // GET NOTIFICATIONS
// // GET /api/notifications
// // ======================================================

// export const getNotifications = createAsyncThunk(
//   "notifications/getNotifications",

//   async (
//     {
//       limit = 20,
//       offset = 0,
//       append = false,
//     } = {},
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log(
//         "========== GET NOTIFICATIONS =========="
//       );

//       console.log("LIMIT =>", limit);
//       console.log("OFFSET =>", offset);
//       console.log("APPEND =>", append);

//       const response = await api.get(
//         API_ENDPOINTS.notifications.get,
//         {
//           params: {
//             limit,
//             offset,
//           },
//         }
//       );

//       console.log(
//         "NOTIFICATIONS RESPONSE =>",
//         response.data
//       );

//       return {
//         ...(response.data || {}),
//         append,
//       };
//     } catch (error) {
//       console.log(
//         "GET NOTIFICATIONS ERROR =>",
//         error?.response?.data ||
//           error?.message
//       );

//       return rejectWithValue(
//         getErrorMessage(
//           error,
//           "Failed to load notifications"
//         )
//       );
//     }
//   }
// );

// // ======================================================
// // MARK NOTIFICATION READ
// // PUT /api/notifications/{notification_id}/read
// // ======================================================

// export const markNotificationRead =
//   createAsyncThunk(
//     "notifications/markNotificationRead",

//     async (
//       notificationId,
//       { rejectWithValue }
//     ) => {
//       try {
//         console.log(
//           "========== MARK NOTIFICATION READ =========="
//         );

//         console.log(
//           "NOTIFICATION ID =>",
//           notificationId
//         );

//         const response = await api.put(
//           API_ENDPOINTS.notifications.markRead(
//             notificationId
//           )
//         );

//         console.log(
//           "MARK READ RESPONSE =>",
//           response.data
//         );

//         return {
//           notificationId,
//           data: response.data || {},
//         };
//       } catch (error) {
//         console.log(
//           "MARK READ ERROR =>",
//           error?.response?.data ||
//             error?.message
//         );

//         return rejectWithValue(
//           getErrorMessage(
//             error,
//             "Failed to mark notification as read"
//           )
//         );
//       }
//     }
//   );

// // ======================================================
// // DELETE NOTIFICATION
// // DELETE /api/notifications/{notification_id}
// // ======================================================

// export const deleteNotification =
//   createAsyncThunk(
//     "notifications/deleteNotification",

//     async (
//       notificationId,
//       { rejectWithValue }
//     ) => {
//       try {
//         console.log(
//           "========== DELETE NOTIFICATION =========="
//         );

//         console.log(
//           "NOTIFICATION ID =>",
//           notificationId
//         );

//         const response = await api.delete(
//           API_ENDPOINTS.notifications.delete(
//             notificationId
//           )
//         );

//         console.log(
//           "DELETE NOTIFICATION RESPONSE =>",
//           response.data
//         );

//         return {
//           notificationId,
//           data: response.data || {},
//         };
//       } catch (error) {
//         console.log(
//           "DELETE NOTIFICATION ERROR =>",
//           error?.response?.data ||
//             error?.message
//         );

//         return rejectWithValue(
//           getErrorMessage(
//             error,
//             "Failed to delete notification"
//           )
//         );
//       }
//     }
//   );

// // ======================================================
// // GET FOLLOW REQUESTS
// // GET /api/follow-requests
// // ======================================================

// export const getFollowRequests =
//   createAsyncThunk(
//     "notifications/getFollowRequests",

//     async (_, { rejectWithValue }) => {
//       try {
//         console.log(
//           "========== GET FOLLOW REQUESTS =========="
//         );

//         const response = await api.get(
//           API_ENDPOINTS.follow.getFollowRequests
//         );

//         console.log(
//           "FOLLOW REQUESTS RESPONSE =>",
//           response.data
//         );

//         return response.data;
//       } catch (error) {
//         console.log(
//           "GET FOLLOW REQUESTS ERROR =>",
//           error?.response?.data ||
//             error?.message
//         );

//         return rejectWithValue(
//           getErrorMessage(
//             error,
//             "Failed to load follow requests"
//           )
//         );
//       }
//     }
//   );

// // ======================================================
// // ACCEPT FOLLOW REQUEST
// // POST /api/follow-requests/{request_id}/accept
// // ======================================================

// export const acceptFollowRequest =
//   createAsyncThunk(
//     "notifications/acceptFollowRequest",

//     async (
//       requestId,
//       { rejectWithValue }
//     ) => {
//       try {
//         console.log(
//           "========== ACCEPT FOLLOW REQUEST =========="
//         );

//         console.log(
//           "REQUEST ID =>",
//           requestId
//         );

//         const response = await api.post(
//           API_ENDPOINTS.follow.acceptFollowRequest(
//             requestId
//           )
//         );

//         console.log(
//           "ACCEPT RESPONSE =>",
//           response.data
//         );

//         return {
//           requestId,
//           data: response.data || {},
//         };
//       } catch (error) {
//         console.log(
//           "ACCEPT FOLLOW REQUEST ERROR =>",
//           error?.response?.data ||
//             error?.message
//         );

//         return rejectWithValue(
//           getErrorMessage(
//             error,
//             "Failed to accept follow request"
//           )
//         );
//       }
//     }
//   );

// // ======================================================
// // REJECT FOLLOW REQUEST
// // POST /api/follow-requests/{request_id}/reject
// // ======================================================

// export const rejectFollowRequest =
//   createAsyncThunk(
//     "notifications/rejectFollowRequest",

//     async (
//       requestId,
//       { rejectWithValue }
//     ) => {
//       try {
//         console.log(
//           "========== REJECT FOLLOW REQUEST =========="
//         );

//         console.log(
//           "REQUEST ID =>",
//           requestId
//         );

//         const response = await api.post(
//           API_ENDPOINTS.follow.rejectFollowRequest(
//             requestId
//           )
//         );

//         console.log(
//           "REJECT RESPONSE =>",
//           response.data
//         );

//         return {
//           requestId,
//           data: response.data || {},
//         };
//       } catch (error) {
//         console.log(
//           "REJECT FOLLOW REQUEST ERROR =>",
//           error?.response?.data ||
//             error?.message
//         );

//         return rejectWithValue(
//           getErrorMessage(
//             error,
//             "Failed to reject follow request"
//           )
//         );
//       }
//     }
//   );

// // ======================================================
// // REGISTER DEVICE TOKEN
// // ======================================================

// export const registerDeviceToken =
//   createAsyncThunk(
//     "notifications/registerDeviceToken",

//     async (
//       {
//         token,
//         platform,
//       },
//       { rejectWithValue }
//     ) => {
//       try {
//         const response = await api.post(
//           API_ENDPOINTS.notifications
//             .registerDeviceToken,
//           {
//             token,
//             platform,
//           }
//         );

//         console.log(
//           "DEVICE TOKEN RESPONSE =>",
//           response.data
//         );

//         return response.data;
//       } catch (error) {
//         console.log(
//           "DEVICE TOKEN ERROR =>",
//           error?.response?.data ||
//             error?.message
//         );

//         return rejectWithValue(
//           getErrorMessage(
//             error,
//             "Failed to register device token"
//           )
//         );
//       }
//     }
//   );

// // ======================================================
// // INITIAL STATE
// // ======================================================

// const initialState = {
//   notifications: [],

//   total: 0,

//   unreadCount: 0,

//   limit: 20,

//   offset: 0,

//   hasMore: false,

//   loading: false,

//   refreshing: false,

//   loadingMore: false,

//   markingRead: false,

//   deletingNotificationId: null,

//   registeringDeviceToken: false,

//   error: null,

//   markReadError: null,

//   deleteNotificationError: null,

//   deviceTokenError: null,

//   // ====================================================
//   // FOLLOW REQUESTS
//   // ====================================================

//   followRequests: [],

//   followRequestsLoading: false,

//   followRequestsError: null,

//   acceptingRequestId: null,

//   rejectingRequestId: null,
// };

// // ======================================================
// // SLICE
// // ======================================================

// const notificationSlice = createSlice({
//   name: "notification",

//   initialState,

//   reducers: {
//     // ==================================================
//     // CLEAR ERRORS
//     // ==================================================

//     clearNotificationError: (state) => {
//       state.error = null;
//     },

//     clearMarkReadError: (state) => {
//       state.markReadError = null;
//     },

//     clearDeleteNotificationError: (state) => {
//       state.deleteNotificationError = null;
//     },

//     clearDeviceTokenError: (state) => {
//       state.deviceTokenError = null;
//     },

//     clearFollowRequestError: (state) => {
//       state.followRequestsError = null;
//     },

//     // ==================================================
//     // RESET
//     // ==================================================

//     resetNotifications: (state) => {
//       Object.assign(
//         state,
//         initialState
//       );
//     },

//     // ==================================================
//     // MARK READ LOCALLY
//     // ==================================================

//     markNotificationReadLocally: (
//       state,
//       action
//     ) => {
//       const notificationId =
//         action.payload;

//       const notification =
//         state.notifications.find(
//           (item) =>
//             String(item?.id) ===
//             String(notificationId)
//         );

//       if (
//         notification &&
//         notification.is_read === false
//       ) {
//         if (
//           state.unreadCount > 0
//         ) {
//           state.unreadCount -= 1;
//         }

//         notification.is_read = true;
//       }
//     },

//     // ==================================================
//     // REMOVE NOTIFICATION LOCALLY
//     // ==================================================

//     removeNotificationLocally: (
//       state,
//       action
//     ) => {
//       const notificationId =
//         action.payload;

//       const notification =
//         state.notifications.find(
//           (item) =>
//             String(item?.id) ===
//             String(notificationId)
//         );

//       if (!notification) {
//         return;
//       }

//       if (
//         notification.is_read === false &&
//         state.unreadCount > 0
//       ) {
//         state.unreadCount -= 1;
//       }

//       state.notifications =
//         state.notifications.filter(
//           (item) =>
//             String(item?.id) !==
//             String(notificationId)
//         );

//       if (state.total > 0) {
//         state.total -= 1;
//       }
//     },
//   },

//   extraReducers: (builder) => {
//     // ==================================================
//     // GET NOTIFICATIONS
//     // ==================================================

//     builder
//       .addCase(
//         getNotifications.pending,
//         (state, action) => {
//           const append =
//             action.meta.arg?.append === true;

//           state.error = null;

//           if (append) {
//             state.loadingMore = true;
//           } else {
//             state.loading = true;
//           }
//         }
//       )

//       .addCase(
//         getNotifications.fulfilled,
//         (state, action) => {
//           const data =
//             action.payload || {};

//           const items =
//             getNotificationItems(data);

//           const append =
//             data.append === true;

//           state.total =
//             data.total ??
//             state.total;

//           state.limit =
//             data.limit ?? 20;

//           state.offset =
//             data.offset ?? 0;

//           if (append) {
//             const existingIds =
//               new Set(
//                 state.notifications.map(
//                   (item) =>
//                     String(item?.id)
//                 )
//               );

//             items.forEach((item) => {
//               const id =
//                 String(item?.id);

//               if (
//                 !existingIds.has(id)
//               ) {
//                 state.notifications.push(
//                   item
//                 );
//               }
//             });
//           } else {
//             state.notifications =
//               items;
//           }

//           if (
//             data.unread_count !==
//             undefined
//           ) {
//             state.unreadCount =
//               data.unread_count;
//           }

//           state.hasMore =
//             state.notifications.length <
//             state.total;

//           state.loading = false;

//           state.refreshing = false;

//           state.loadingMore = false;

//           state.error = null;
//         }
//       )

//       .addCase(
//         getNotifications.rejected,
//         (state, action) => {
//           state.loading = false;

//           state.refreshing = false;

//           state.loadingMore = false;

//           state.error =
//             action.payload ||
//             "Failed to load notifications";
//         }
//       );

//     // ==================================================
//     // MARK READ
//     // ==================================================

//     builder
//       .addCase(
//         markNotificationRead.pending,
//         (state) => {
//           state.markingRead = true;

//           state.markReadError = null;
//         }
//       )

//       .addCase(
//         markNotificationRead.fulfilled,
//         (state, action) => {
//           state.markingRead = false;

//           state.markReadError = null;

//           const notificationId =
//             action.payload
//               ?.notificationId;

//           const notification =
//             state.notifications.find(
//               (item) =>
//                 String(item?.id) ===
//                 String(notificationId)
//             );

//           if (
//             notification &&
//             notification.is_read === false
//           ) {
//             if (
//               state.unreadCount > 0
//             ) {
//               state.unreadCount -= 1;
//             }

//             notification.is_read = true;
//           }
//         }
//       )

//       .addCase(
//         markNotificationRead.rejected,
//         (state, action) => {
//           state.markingRead = false;

//           state.markReadError =
//             action.payload ||
//             "Failed to mark notification as read";
//         }
//       );

//     // ==================================================
//     // DELETE NOTIFICATION
//     // ==================================================

//     builder
//       .addCase(
//         deleteNotification.pending,
//         (state, action) => {
//           state.deletingNotificationId =
//             action.meta.arg;

//           state.deleteNotificationError =
//             null;
//         }
//       )

//       .addCase(
//         deleteNotification.fulfilled,
//         (state, action) => {
//           const notificationId =
//             action.payload
//               ?.notificationId;

//           const notification =
//             state.notifications.find(
//               (item) =>
//                 String(item?.id) ===
//                 String(notificationId)
//             );

//           if (
//             notification &&
//             notification.is_read === false &&
//             state.unreadCount > 0
//           ) {
//             state.unreadCount -= 1;
//           }

//           state.notifications =
//             state.notifications.filter(
//               (item) =>
//                 String(item?.id) !==
//                 String(notificationId)
//             );

//           if (
//             notification &&
//             state.total > 0
//           ) {
//             state.total -= 1;
//           }

//           state.deletingNotificationId =
//             null;

//           state.deleteNotificationError =
//             null;
//         }
//       )

//       .addCase(
//         deleteNotification.rejected,
//         (state, action) => {
//           state.deletingNotificationId =
//             null;

//           state.deleteNotificationError =
//             action.payload ||
//             "Failed to delete notification";
//         }
//       );

//     // ==================================================
//     // GET FOLLOW REQUESTS
//     // ==================================================

//     builder
//       .addCase(
//         getFollowRequests.pending,
//         (state) => {
//           state.followRequestsLoading =
//             true;

//           state.followRequestsError =
//             null;
//         }
//       )

//       .addCase(
//         getFollowRequests.fulfilled,
//         (state, action) => {
//           state.followRequests =
//             getNotificationItems(
//               action.payload
//             );

//           state.followRequestsLoading =
//             false;

//           state.followRequestsError =
//             null;
//         }
//       )

//       .addCase(
//         getFollowRequests.rejected,
//         (state, action) => {
//           state.followRequestsLoading =
//             false;

//           state.followRequestsError =
//             action.payload ||
//             "Failed to load follow requests";
//         }
//       );

//     // ==================================================
//     // ACCEPT FOLLOW REQUEST
//     // ==================================================

//     builder
//       .addCase(
//         acceptFollowRequest.pending,
//         (state, action) => {
//           state.acceptingRequestId =
//             action.meta.arg;
//         }
//       )

//       .addCase(
//         acceptFollowRequest.fulfilled,
//         (state, action) => {
//           const requestId =
//             action.payload
//               ?.requestId;

//           const responseData =
//             action.payload
//               ?.data || {};

//           console.log(
//             "========== ACCEPT REDUCER =========="
//           );

//           console.log(
//             "REQUEST ID =>",
//             requestId
//           );

//           console.log(
//             "BACKEND DATA =>",
//             responseData
//           );

//           // --------------------------------------------
//           // REMOVE FROM PENDING REQUESTS
//           // --------------------------------------------

//           state.followRequests =
//             state.followRequests.filter(
//               (request) =>
//                 String(request?.id) !==
//                 String(requestId)
//             );

//           // --------------------------------------------
//           // FIND ORIGINAL NOTIFICATION
//           // target_id = follow request id
//           // --------------------------------------------

//           const notification =
//             state.notifications.find(
//               (item) =>
//                 String(item?.target_id) ===
//                   String(requestId) &&
//                 (
//                   item?.type ===
//                     "follow_request" ||
//                   item?.type ===
//                     "follow-request" ||
//                   item?.type ===
//                     "follow_request_received"
//                 )
//             );

//           if (notification) {
//             const wasUnread =
//               notification.is_read === false;

//             if (
//               wasUnread &&
//               state.unreadCount > 0
//             ) {
//               state.unreadCount -= 1;
//             }

//             notification.is_read = true;

//             // ------------------------------------------
//             // IMPORTANT
//             //
//             // "following" returned by ACCEPT means
//             // requester is now following the current user.
//             //
//             // It does NOT mean current user follows
//             // requester.
//             // ------------------------------------------

//             if (
//               typeof responseData.following ===
//               "boolean"
//             ) {
//               notification.following =
//                 responseData.following;
//             }

//             if (
//               typeof responseData.request_pending ===
//               "boolean"
//             ) {
//               notification.request_pending =
//                 responseData.request_pending;
//             }

//             // ------------------------------------------
//             // This tracks CURRENT USER -> REQUESTER.
//             //
//             // After accepting, current user has NOT
//             // followed them back yet.
//             // ------------------------------------------

//             notification.current_user_following =
//               false;

//             notification.type =
//               "follow";

//             notification.target_type =
//               "user";

//             // ------------------------------------------
//             // USE requester FROM BACKEND
//             // ------------------------------------------

//             if (
//               notification.requester
//                 ?.username
//             ) {
//               notification.message =
//                 `${notification.requester.username} started following you`;
//             }
//           }

//           state.acceptingRequestId =
//             null;
//         }
//       )

//       .addCase(
//         acceptFollowRequest.rejected,
//         (state) => {
//           state.acceptingRequestId =
//             null;
//         }
//       );

//     // ==================================================
//     // REJECT FOLLOW REQUEST
//     // ==================================================

//     builder
//       .addCase(
//         rejectFollowRequest.pending,
//         (state, action) => {
//           state.rejectingRequestId =
//             action.meta.arg;
//         }
//       )

//       .addCase(
// rejectFollowRequest.fulfilled,
// (state, action) => {
// const requestId =
// action.payload?.requestId;


// // ==========================================
// // REMOVE FROM PENDING REQUESTS
// // ==========================================

// state.followRequests =
//   state.followRequests.filter(
//     (request) =>
//       String(request?.id) !==
//       String(requestId)
//   );

// // ==========================================
// // IMPORTANT
// //
// // DO NOT CHANGE THE NOTIFICATION.
// //
// // The screen will now call:
// //
// // DELETE /api/notifications/{id}
// //
// // through deleteNotification().
// // ==========================================

// state.rejectingRequestId = null;


// }
// )

// .addCase(
// rejectFollowRequest.rejected,
// (state) => {
// state.rejectingRequestId = null;
// }
// );


//       // .addCase(
//       //   rejectFollowRequest.fulfilled,
//       //   (state, action) => {
//       //     const requestId =
//       //       action.payload
//       //         ?.requestId;

//       //     state.followRequests =
//       //       state.followRequests.filter(
//       //         (request) =>
//       //           String(request?.id) !==
//       //           String(requestId)
//       //       );

//       //     const notification =
//       //       state.notifications.find(
//       //         (item) =>
//       //           String(item?.target_id) ===
//       //             String(requestId) &&
//       //           (
//       //             item?.type ===
//       //               "follow_request" ||
//       //             item?.type ===
//       //               "follow-request" ||
//       //             item?.type ===
//       //               "follow_request_received"
//       //           )
//       //       );

//       //     if (notification) {
//       //       const wasUnread =
//       //         notification.is_read === false;

//       //       if (
//       //         wasUnread &&
//       //         state.unreadCount > 0
//       //       ) {
//       //         state.unreadCount -= 1;
//       //       }

//       //       notification.is_read = true;

//       //       notification.type =
//       //         "follow_request_rejected";

//       //       notification.target_type =
//       //         "follow_request";

//       //       notification.following =
//       //         false;

//       //       notification.request_pending =
//       //         false;

//       //       notification.current_user_following =
//       //         false;

//       //       if (
//       //         notification.requester
//       //           ?.username
//       //       ) {
//       //         notification.message =
//       //           `You declined ${notification.requester.username}'s follow request`;
//       //       }
//       //     }

//       //     state.rejectingRequestId =
//       //       null;
//       //   }
//       // )

//       // .addCase(
//       //   rejectFollowRequest.rejected,
//       //   (state) => {
//       //     state.rejectingRequestId =
//       //       null;
//       //   }
//       // );

//     // ==================================================
//     // DEVICE TOKEN
//     // ==================================================

//     builder
//       .addCase(
//         registerDeviceToken.pending,
//         (state) => {
//           state.registeringDeviceToken =
//             true;

//           state.deviceTokenError =
//             null;
//         }
//       )

//       .addCase(
//         registerDeviceToken.fulfilled,
//         (state) => {
//           state.registeringDeviceToken =
//             false;

//           state.deviceTokenError =
//             null;
//         }
//       )

//       .addCase(
//         registerDeviceToken.rejected,
//         (state, action) => {
//           state.registeringDeviceToken =
//             false;

//           state.deviceTokenError =
//             action.payload ||
//             "Failed to register device token";
//         }
//       );
//   },
// });

// // ======================================================
// // ACTIONS
// // ======================================================

// export const {
//   clearNotificationError,
//   clearMarkReadError,
//   clearDeleteNotificationError,
//   clearDeviceTokenError,
//   clearFollowRequestError,
//   resetNotifications,
//   markNotificationReadLocally,
//   removeNotificationLocally,
// } = notificationSlice.actions;

// // ======================================================
// // SELECTORS
// // ======================================================

// export const selectNotifications = (
//   state
// ) =>
//   state.notification?.notifications || [];

// export const selectNotificationTotal = (
//   state
// ) =>
//   state.notification?.total || 0;

// export const selectUnreadNotificationCount = (
//   state
// ) =>
//   state.notification?.unreadCount || 0;

// export const selectNotificationLoading = (
//   state
// ) =>
//   state.notification?.loading || false;

// export const selectNotificationRefreshing = (
//   state
// ) =>
//   state.notification?.refreshing || false;

// export const selectNotificationLoadingMore = (
//   state
// ) =>
//   state.notification?.loadingMore || false;

// export const selectNotificationHasMore = (
//   state
// ) =>
//   state.notification?.hasMore || false;

// export const selectNotificationError = (
//   state
// ) =>
//   state.notification?.error || null;

// export const selectMarkingNotificationRead = (
//   state
// ) =>
//   state.notification?.markingRead || false;

// export const selectMarkNotificationReadError = (
//   state
// ) =>
//   state.notification?.markReadError || null;

// export const selectDeletingNotificationId = (
//   state
// ) =>
//   state.notification
//     ?.deletingNotificationId || null;

// export const selectDeleteNotificationError = (
//   state
// ) =>
//   state.notification
//     ?.deleteNotificationError || null;

// export const selectRegisteringDeviceToken = (
//   state
// ) =>
//   state.notification
//     ?.registeringDeviceToken || false;

// export const selectDeviceTokenError = (
//   state
// ) =>
//   state.notification
//     ?.deviceTokenError || null;

// // ======================================================
// // FOLLOW REQUEST SELECTORS
// // ======================================================

// export const selectFollowRequests = (
//   state
// ) =>
//   state.notification?.followRequests || [];

// export const selectFollowRequestsLoading = (
//   state
// ) =>
//   state.notification
//     ?.followRequestsLoading || false;

// export const selectFollowRequestsError = (
//   state
// ) =>
//   state.notification
//     ?.followRequestsError || null;

// export const selectAcceptingRequestId = (
//   state
// ) =>
//   state.notification
//     ?.acceptingRequestId || null;

// export const selectRejectingRequestId = (
//   state
// ) =>
//   state.notification
//     ?.rejectingRequestId || null;

// // ======================================================
// // REDUCER
// // ======================================================

// export default notificationSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../utils/api";
import { API_ENDPOINTS } from "../config/apiEndpoints";

// ======================================================
// HELPERS
// ======================================================

const getErrorMessage = (error, fallback) => {
  return (
    error?.response?.data?.detail ||
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
};

const getNotificationItems = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  if (Array.isArray(data?.notifications)) {
    return data.notifications;
  }

  if (Array.isArray(data?.requests)) {
    return data.requests;
  }

  return [];
};

// ======================================================
// GET NOTIFICATIONS
// ======================================================

export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",

  async (
    {
      limit = 20,
      offset = 0,
      append = false,
    } = {},
    { rejectWithValue }
  ) => {
    try {
      console.log(
        "========== GET NOTIFICATIONS =========="
      );

      console.log("LIMIT =>", limit);
      console.log("OFFSET =>", offset);
      console.log("APPEND =>", append);

      const response = await api.get(
        API_ENDPOINTS.notifications.get,
        {
          params: {
            limit,
            offset,
          },
        }
      );

      console.log(
        "NOTIFICATIONS RESPONSE =>",
        response.data
      );

      return {
        ...(response.data || {}),
        append,
      };
    } catch (error) {
      console.log(
        "GET NOTIFICATIONS ERROR =>",
        error?.response?.data || error?.message
      );

      return rejectWithValue(
        getErrorMessage(
          error,
          "Failed to load notifications"
        )
      );
    }
  }
);

// ======================================================
// MARK NOTIFICATION READ
// ======================================================

export const markNotificationRead =
  createAsyncThunk(
    "notifications/markNotificationRead",

    async (
      notificationId,
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== MARK NOTIFICATION READ =========="
        );

        console.log(
          "NOTIFICATION ID =>",
          notificationId
        );

        const response = await api.put(
          API_ENDPOINTS.notifications.markRead(
            notificationId
          )
        );

        console.log(
          "MARK READ RESPONSE =>",
          response.data
        );

        return {
          notificationId,
          data: response.data || {},
        };
      } catch (error) {
        console.log(
          "MARK READ ERROR =>",
          error?.response?.data || error?.message
        );

        return rejectWithValue(
          getErrorMessage(
            error,
            "Failed to mark notification as read"
          )
        );
      }
    }
  );

// ======================================================
// DELETE NOTIFICATION
// ======================================================

export const deleteNotification =
  createAsyncThunk(
    "notifications/deleteNotification",

    async (
      notificationId,
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== DELETE NOTIFICATION =========="
        );

        console.log(
          "NOTIFICATION ID =>",
          notificationId
        );

        const response = await api.delete(
          API_ENDPOINTS.notifications.delete(
            notificationId
          )
        );

        console.log(
          "DELETE NOTIFICATION RESPONSE =>",
          response.data
        );

        return {
          notificationId,
          data: response.data || {},
        };
      } catch (error) {
        console.log(
          "DELETE NOTIFICATION ERROR =>",
          error?.response?.data || error?.message
        );

        return rejectWithValue(
          getErrorMessage(
            error,
            "Failed to delete notification"
          )
        );
      }
    }
  );

// ======================================================
// GET FOLLOW REQUESTS
// ======================================================

export const getFollowRequests =
  createAsyncThunk(
    "notifications/getFollowRequests",

    async (_, { rejectWithValue }) => {
      try {
        console.log(
          "========== GET FOLLOW REQUESTS =========="
        );

        const response = await api.get(
          API_ENDPOINTS.follow.getFollowRequests
        );

        console.log(
          "FOLLOW REQUESTS RESPONSE =>",
          response.data
        );

        return response.data;
      } catch (error) {
        console.log(
          "GET FOLLOW REQUESTS ERROR =>",
          error?.response?.data || error?.message
        );

        return rejectWithValue(
          getErrorMessage(
            error,
            "Failed to load follow requests"
          )
        );
      }
    }
  );

// ======================================================
// ACCEPT FOLLOW REQUEST
// ======================================================

export const acceptFollowRequest =
  createAsyncThunk(
    "notifications/acceptFollowRequest",

    async (
      requestId,
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== ACCEPT FOLLOW REQUEST =========="
        );

        console.log(
          "REQUEST ID =>",
          requestId
        );

        const response = await api.post(
          API_ENDPOINTS.follow.acceptFollowRequest(
            requestId
          )
        );

        console.log(
          "ACCEPT RESPONSE =>",
          response.data
        );

        return {
          requestId,
          data: response.data || {},
        };
      } catch (error) {
        console.log(
          "ACCEPT FOLLOW REQUEST ERROR =>",
          error?.response?.data || error?.message
        );

        return rejectWithValue(
          getErrorMessage(
            error,
            "Failed to accept follow request"
          )
        );
      }
    }
  );

// ======================================================
// REJECT FOLLOW REQUEST
// ======================================================

export const rejectFollowRequest =
  createAsyncThunk(
    "notifications/rejectFollowRequest",

    async (
      requestId,
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== REJECT FOLLOW REQUEST =========="
        );

        console.log(
          "REQUEST ID =>",
          requestId
        );

        const response = await api.post(
          API_ENDPOINTS.follow.rejectFollowRequest(
            requestId
          )
        );

        console.log(
          "REJECT RESPONSE =>",
          response.data
        );

        return {
          requestId,
          data: response.data || {},
        };
      } catch (error) {
        console.log(
          "REJECT FOLLOW REQUEST ERROR =>",
          error?.response?.data || error?.message
        );

        return rejectWithValue(
          getErrorMessage(
            error,
            "Failed to reject follow request"
          )
        );
      }
    }
  );

// ======================================================
// REGISTER DEVICE TOKEN
// ======================================================

export const registerDeviceToken =
  createAsyncThunk(
    "notifications/registerDeviceToken",

    async (
      {
        token,
        platform,
      },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.post(
          API_ENDPOINTS.notifications
            .registerDeviceToken,
          {
            token,
            platform,
          }
        );

        console.log(
          "DEVICE TOKEN RESPONSE =>",
          response.data
        );

        return response.data;
      } catch (error) {
        console.log(
          "DEVICE TOKEN ERROR =>",
          error?.response?.data || error?.message
        );

        return rejectWithValue(
          getErrorMessage(
            error,
            "Failed to register device token"
          )
        );
      }
    }
  );

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  notifications: [],

  total: 0,

  unreadCount: 0,

  limit: 20,

  offset: 0,

  hasMore: false,

  loading: false,

  refreshing: false,

  loadingMore: false,

  markingRead: false,

  deletingNotificationId: null,

  registeringDeviceToken: false,

  error: null,

  markReadError: null,

  deleteNotificationError: null,

  deviceTokenError: null,

  followRequests: [],

  followRequestsLoading: false,

  followRequestsError: null,

  acceptingRequestId: null,

  rejectingRequestId: null,
};

// ======================================================
// SLICE
// ======================================================

const notificationSlice = createSlice({
  name: "notification",

  initialState,

  reducers: {
    // ==================================================
    // ADD WEBSOCKET NOTIFICATION
    // ==================================================

    addNotificationFromWebSocket: (
      state,
      action
    ) => {
      const notification =
        action.payload;

      if (!notification?.id) {
        return;
      }

      const notificationId =
        String(notification.id);

      const existingIndex =
        state.notifications.findIndex(
          (item) =>
            String(item?.id) ===
            notificationId
        );

      // --------------------------------------------
      // DUPLICATE
      // --------------------------------------------

      if (existingIndex !== -1) {
        state.notifications[
          existingIndex
        ] = {
          ...state.notifications[
            existingIndex
          ],
          ...notification,
        };

        return;
      }

      // --------------------------------------------
      // NEW NOTIFICATION
      // --------------------------------------------

      state.notifications.unshift(
        notification
      );

      state.total += 1;

      if (
        notification.is_read === false
      ) {
        state.unreadCount += 1;
      }

      state.hasMore =
        state.notifications.length <
        state.total;
    },

    // ==================================================
    // CLEAR ERRORS
    // ==================================================

    clearNotificationError: (state) => {
      state.error = null;
    },

    clearMarkReadError: (state) => {
      state.markReadError = null;
    },

    clearDeleteNotificationError: (
      state
    ) => {
      state.deleteNotificationError =
        null;
    },

    clearDeviceTokenError: (state) => {
      state.deviceTokenError = null;
    },

    clearFollowRequestError: (
      state
    ) => {
      state.followRequestsError = null;
    },

    // ==================================================
    // RESET
    // ==================================================

    resetNotifications: (state) => {
      Object.assign(
        state,
        initialState
      );
    },

    // ==================================================
    // MARK READ LOCALLY
    // ==================================================

    markNotificationReadLocally: (
      state,
      action
    ) => {
      const notificationId =
        action.payload;

      const notification =
        state.notifications.find(
          (item) =>
            String(item?.id) ===
            String(notificationId)
        );

      if (
        notification &&
        notification.is_read === false
      ) {
        notification.is_read = true;

        if (state.unreadCount > 0) {
          state.unreadCount -= 1;
        }
      }
    },

    // ==================================================
    // REMOVE NOTIFICATION LOCALLY
    // ==================================================

    removeNotificationLocally: (
      state,
      action
    ) => {
      const notificationId =
        action.payload;

      const notification =
        state.notifications.find(
          (item) =>
            String(item?.id) ===
            String(notificationId)
        );

      if (!notification) {
        return;
      }

      if (
        notification.is_read === false &&
        state.unreadCount > 0
      ) {
        state.unreadCount -= 1;
      }

      state.notifications =
        state.notifications.filter(
          (item) =>
            String(item?.id) !==
            String(notificationId)
        );

      if (state.total > 0) {
        state.total -= 1;
      }

      state.hasMore =
        state.notifications.length <
        state.total;
    },
  },

  // ====================================================
  // EXTRA REDUCERS
  // ====================================================

  extraReducers: (builder) => {
    // ==================================================
    // GET NOTIFICATIONS
    // ==================================================

    builder
      .addCase(
        getNotifications.pending,
        (state, action) => {
          const append =
            action.meta.arg?.append === true;

          state.error = null;

          if (append) {
            state.loadingMore = true;
          } else {
            state.loading = true;
          }
        }
      )

      .addCase(
        getNotifications.fulfilled,
        (state, action) => {
          const data =
            action.payload || {};

          const items =
            getNotificationItems(data);

          const append =
            data.append === true;

          if (
            data.total !== undefined
          ) {
            state.total = Number(
              data.total
            ) || 0;
          }

          if (
            data.limit !== undefined
          ) {
            state.limit = data.limit;
          }

          if (
            data.offset !== undefined
          ) {
            state.offset = data.offset;
          }

          // ------------------------------------------
          // APPEND
          // ------------------------------------------

          if (append) {
            const existingIds =
              new Set(
                state.notifications.map(
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
                state.notifications.push(
                  item
                );
              }
            });
          }

          // ------------------------------------------
          // REFRESH
          // ------------------------------------------

          else {
            state.notifications =
              items;
          }

          // ------------------------------------------
          // UNREAD COUNT
          // ------------------------------------------

          if (
            data.unread_count !==
              undefined &&
            data.unread_count !== null
          ) {
            state.unreadCount =
              Number(
                data.unread_count
              ) || 0;
          } else {
            state.unreadCount =
              state.notifications.filter(
                (item) =>
                  item?.is_read === false
              ).length;
          }

          // ------------------------------------------
          // HAS MORE
          // ------------------------------------------

          if (
            data.has_more !== undefined
          ) {
            state.hasMore =
              Boolean(data.has_more);
          } else {
            state.hasMore =
              state.notifications.length <
              state.total;
          }

          state.loading = false;
          state.refreshing = false;
          state.loadingMore = false;
          state.error = null;
        }
      )

      .addCase(
        getNotifications.rejected,
        (state, action) => {
          state.loading = false;
          state.refreshing = false;
          state.loadingMore = false;

          state.error =
            action.payload ||
            "Failed to load notifications";
        }
      );

    // ==================================================
    // MARK READ
    // ==================================================

    builder
      .addCase(
        markNotificationRead.pending,
        (state) => {
          state.markingRead = true;
          state.markReadError = null;
        }
      )

      .addCase(
        markNotificationRead.fulfilled,
        (state, action) => {
          state.markingRead = false;
          state.markReadError = null;

          const notificationId =
            action.payload
              ?.notificationId;

          const notification =
            state.notifications.find(
              (item) =>
                String(item?.id) ===
                String(notificationId)
            );

          if (
            notification &&
            notification.is_read === false
          ) {
            notification.is_read = true;

            if (
              state.unreadCount > 0
            ) {
              state.unreadCount -= 1;
            }
          }
        }
      )

      .addCase(
        markNotificationRead.rejected,
        (state, action) => {
          state.markingRead = false;

          state.markReadError =
            action.payload ||
            "Failed to mark notification as read";
        }
      );

    // ==================================================
    // DELETE
    // ==================================================

    builder
      .addCase(
        deleteNotification.pending,
        (state, action) => {
          state.deletingNotificationId =
            action.meta.arg;

          state.deleteNotificationError =
            null;
        }
      )

      .addCase(
        deleteNotification.fulfilled,
        (state, action) => {
          const notificationId =
            action.payload
              ?.notificationId;

          const notification =
            state.notifications.find(
              (item) =>
                String(item?.id) ===
                String(notificationId)
            );

          if (!notification) {
            state.deletingNotificationId =
              null;

            return;
          }

          if (
            notification.is_read === false &&
            state.unreadCount > 0
          ) {
            state.unreadCount -= 1;
          }

          state.notifications =
            state.notifications.filter(
              (item) =>
                String(item?.id) !==
                String(notificationId)
            );

          if (state.total > 0) {
            state.total -= 1;
          }

          state.hasMore =
            state.notifications.length <
            state.total;

          state.deletingNotificationId =
            null;

          state.deleteNotificationError =
            null;
        }
      )

      .addCase(
        deleteNotification.rejected,
        (state, action) => {
          state.deletingNotificationId =
            null;

          state.deleteNotificationError =
            action.payload ||
            "Failed to delete notification";
        }
      );

    // ==================================================
    // GET FOLLOW REQUESTS
    // ==================================================

    builder
      .addCase(
        getFollowRequests.pending,
        (state) => {
          state.followRequestsLoading =
            true;

          state.followRequestsError =
            null;
        }
      )

      .addCase(
        getFollowRequests.fulfilled,
        (state, action) => {
          state.followRequests =
            getNotificationItems(
              action.payload
            );

          state.followRequestsLoading =
            false;

          state.followRequestsError =
            null;
        }
      )

      .addCase(
        getFollowRequests.rejected,
        (state, action) => {
          state.followRequestsLoading =
            false;

          state.followRequestsError =
            action.payload ||
            "Failed to load follow requests";
        }
      );

    // ==================================================
    // ACCEPT
    // ==================================================

    builder
      .addCase(
        acceptFollowRequest.pending,
        (state, action) => {
          state.acceptingRequestId =
            action.meta.arg;
        }
      )

      .addCase(
        acceptFollowRequest.fulfilled,
        (state, action) => {
          const requestId =
            action.payload
              ?.requestId;

          const responseData =
            action.payload
              ?.data || {};

          console.log(
            "========== ACCEPT REDUCER =========="
          );

          console.log(
            "REQUEST ID =>",
            requestId
          );

          console.log(
            "BACKEND DATA =>",
            responseData
          );

          state.followRequests =
            state.followRequests.filter(
              (request) =>
                String(request?.id) !==
                String(requestId)
            );

          const notification =
            state.notifications.find(
              (item) =>
                String(item?.target_id) ===
                  String(requestId) &&
                (
                  item?.type ===
                    "follow_request" ||
                  item?.type ===
                    "follow-request" ||
                  item?.type ===
                    "follow_request_received"
                )
            );

          if (notification) {
            if (
              notification.is_read === false
            ) {
              notification.is_read = true;

              if (
                state.unreadCount > 0
              ) {
                state.unreadCount -= 1;
              }
            }

            if (
              typeof responseData.following ===
              "boolean"
            ) {
              notification.following =
                responseData.following;
            }

            if (
              typeof responseData.request_pending ===
              "boolean"
            ) {
              notification.request_pending =
                responseData.request_pending;
            }

            notification.current_user_following =
              false;

            notification.type =
              "follow";

            notification.target_type =
              "user";

            if (
              notification.requester
                ?.username
            ) {
              notification.message =
                `${notification.requester.username} started following you`;
            }
          }

          state.acceptingRequestId =
            null;
        }
      )

      .addCase(
        acceptFollowRequest.rejected,
        (state) => {
          state.acceptingRequestId =
            null;
        }
      );

    // ==================================================
    // REJECT
    // ==================================================

    builder
      .addCase(
        rejectFollowRequest.pending,
        (state, action) => {
          state.rejectingRequestId =
            action.meta.arg;
        }
      )

      .addCase(
        rejectFollowRequest.fulfilled,
        (state, action) => {
          const requestId =
            action.payload
              ?.requestId;

          state.followRequests =
            state.followRequests.filter(
              (request) =>
                String(request?.id) !==
                String(requestId)
            );

          state.rejectingRequestId =
            null;
        }
      )

      .addCase(
        rejectFollowRequest.rejected,
        (state) => {
          state.rejectingRequestId =
            null;
        }
      );

    // ==================================================
    // DEVICE TOKEN
    // ==================================================

    builder
      .addCase(
        registerDeviceToken.pending,
        (state) => {
          state.registeringDeviceToken =
            true;

          state.deviceTokenError = null;
        }
      )

      .addCase(
        registerDeviceToken.fulfilled,
        (state) => {
          state.registeringDeviceToken =
            false;

          state.deviceTokenError = null;
        }
      )

      .addCase(
        registerDeviceToken.rejected,
        (state, action) => {
          state.registeringDeviceToken =
            false;

          state.deviceTokenError =
            action.payload ||
            "Failed to register device token";
        }
      );
  },
});

// ======================================================
// ACTIONS
// ======================================================

export const {
  addNotificationFromWebSocket,

  clearNotificationError,
  clearMarkReadError,
  clearDeleteNotificationError,
  clearDeviceTokenError,
  clearFollowRequestError,

  resetNotifications,

  markNotificationReadLocally,

  removeNotificationLocally,
} = notificationSlice.actions;

// ======================================================
// SELECTORS
// ======================================================

export const selectNotifications = (
  state
) =>
  state.notification?.notifications || [];

export const selectNotificationTotal = (
  state
) =>
  state.notification?.total || 0;

export const selectUnreadNotificationCount = (
  state
) =>
  state.notification?.unreadCount || 0;

export const selectNotificationLoading = (
  state
) =>
  state.notification?.loading || false;

export const selectNotificationRefreshing = (
  state
) =>
  state.notification?.refreshing || false;

export const selectNotificationLoadingMore = (
  state
) =>
  state.notification?.loadingMore || false;

export const selectNotificationHasMore = (
  state
) =>
  state.notification?.hasMore || false;

export const selectNotificationError = (
  state
) =>
  state.notification?.error || null;

export const selectMarkingNotificationRead = (
  state
) =>
  state.notification?.markingRead || false;

export const selectMarkNotificationReadError = (
  state
) =>
  state.notification?.markReadError || null;

export const selectDeletingNotificationId = (
  state
) =>
  state.notification
    ?.deletingNotificationId || null;

export const selectDeleteNotificationError = (
  state
) =>
  state.notification
    ?.deleteNotificationError || null;

export const selectRegisteringDeviceToken = (
  state
) =>
  state.notification
    ?.registeringDeviceToken || false;

export const selectDeviceTokenError = (
  state
) =>
  state.notification
    ?.deviceTokenError || null;

// ======================================================
// FOLLOW REQUEST SELECTORS
// ======================================================

export const selectFollowRequests = (
  state
) =>
  state.notification?.followRequests || [];

export const selectFollowRequestsLoading = (
  state
) =>
  state.notification
    ?.followRequestsLoading || false;

export const selectFollowRequestsError = (
  state
) =>
  state.notification
    ?.followRequestsError || null;

export const selectAcceptingRequestId = (
  state
) =>
  state.notification
    ?.acceptingRequestId || null;

export const selectRejectingRequestId = (
  state
) =>
  state.notification
    ?.rejectingRequestId || null;

// ======================================================
// REDUCER
// ======================================================

export default notificationSlice.reducer;