// import {
//   createAsyncThunk,
//   createSlice,
// } from "@reduxjs/toolkit";

// import api from "../utils/api";
// import { API_ENDPOINTS } from "../config/apiEndpoints";

// // ======================================================
// // CONSTANTS
// // ======================================================

// const EMPTY_ARRAY = [];
// const EMPTY_OBJECT = {};

// // ======================================================
// // HELPERS
// // ======================================================

// const getErrorMessage = (
//   error,
//   fallback = "Something went wrong"
// ) => {
//   return (
//     error?.response?.data?.detail ||
//     error?.response?.data?.message ||
//     error?.response?.data?.error ||
//     error?.message ||
//     fallback
//   );
// };

// const getItems = (data) => {
//   if (Array.isArray(data)) {
//     return data;
//   }

//   if (Array.isArray(data?.items)) {
//     return data.items;
//   }

//   return EMPTY_ARRAY;
// };

// const sameId = (a, b) => {
//   if (a === null || a === undefined) {
//     return false;
//   }

//   if (b === null || b === undefined) {
//     return false;
//   }

//   return String(a) === String(b);
// };

// // ======================================================
// // GET CONVERSATIONS
// // ======================================================

// export const getConversations = createAsyncThunk(
//   "chat/getConversations",
//   async (
//     {
//       limit = 30,
//       offset = 0,
//       append = false,
//     } = {},
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log(
//         "========== GET CONVERSATIONS =========="
//       );

//       console.log("LIMIT =>", limit);
//       console.log("OFFSET =>", offset);
//       console.log("APPEND =>", append);

//       const response = await api.get(
//         API_ENDPOINTS.chat.getConversations,
//         {
//           params: {
//             limit,
//             offset,
//           },
//         }
//       );

//       console.log(
//         "GET CONVERSATIONS RESPONSE =>",
//         response?.data
//       );

//       return {
//         data: response?.data,
//         append,
//       };
//     } catch (error) {
//       console.log(
//         "GET CONVERSATIONS ERROR =>",
//         error?.response?.data ||
//           error?.message
//       );

//       return rejectWithValue(
//         getErrorMessage(
//           error,
//           "Failed to load conversations"
//         )
//       );
//     }
//   }
// );

// // ======================================================
// // CREATE CONVERSATION
// // ======================================================

// export const createConversation =
//   createAsyncThunk(
//     "chat/createConversation",
//     async (
//       {
//         participant_ids,
//         title = null,
//       },
//       { rejectWithValue }
//     ) => {
//       try {
//         console.log(
//           "========== CREATE CONVERSATION =========="
//         );

//         console.log(
//           "PARTICIPANT IDS =>",
//           participant_ids
//         );

//         console.log("TITLE =>", title);

//         const response = await api.post(
//           API_ENDPOINTS.chat
//             .createConversation,
//           {
//             participant_ids,
//             title,
//           }
//         );

//         console.log(
//           "CREATE CONVERSATION RESPONSE =>",
//           response?.data
//         );

//         return response?.data;
//       } catch (error) {
//         console.log(
//           "CREATE CONVERSATION ERROR =>",
//           error?.response?.data ||
//             error?.message
//         );

//         return rejectWithValue(
//           getErrorMessage(
//             error,
//             "Failed to create conversation"
//           )
//         );
//       }
//     }
//   );

// // ======================================================
// // DELETE CONVERSATION
// // ======================================================

// export const deleteConversation =
//   createAsyncThunk(
//     "chat/deleteConversation",
//     async (
//       conversationId,
//       { rejectWithValue }
//     ) => {
//       try {
//         console.log(
//           "========== DELETE CONVERSATION =========="
//         );

//         console.log(
//           "CONVERSATION ID =>",
//           conversationId
//         );

//         const response =
//           await api.delete(
//             API_ENDPOINTS.chat
//               .deleteConversation(
//                 conversationId
//               )
//           );

//         console.log(
//           "DELETE CONVERSATION RESPONSE =>",
//           response?.data
//         );

//         return {
//           conversationId,
//           data: response?.data,
//         };
//       } catch (error) {
//         console.log(
//           "DELETE CONVERSATION ERROR =>",
//           error?.response?.data ||
//             error?.message
//         );

//         return rejectWithValue(
//           getErrorMessage(
//             error,
//             "Failed to delete conversation"
//           )
//         );
//       }
//     }
//   );

// // ======================================================
// // GET MESSAGES
// // ======================================================

// export const getMessages =
//   createAsyncThunk(
//     "chat/getMessages",
//     async (
//       {
//         conversationId,
//         limit = 30,
//         offset = 0,
//         append = false,
//       },
//       { rejectWithValue }
//     ) => {
//       try {
//         console.log(
//           "========== GET MESSAGES =========="
//         );

//         console.log(
//           "CONVERSATION ID =>",
//           conversationId
//         );

//         console.log("LIMIT =>", limit);
//         console.log("OFFSET =>", offset);
//         console.log("APPEND =>", append);

//         const response = await api.get(
//           API_ENDPOINTS.chat.getMessages(
//             conversationId
//           ),
//           {
//             params: {
//               limit,
//               offset,
//             },
//           }
//         );

//         console.log(
//           "GET MESSAGES RESPONSE =>",
//           response?.data
//         );

//         return {
//           conversationId,
//           data: response?.data,
//           append,
//         };
//       } catch (error) {
//         console.log(
//           "GET MESSAGES ERROR =>",
//           error?.response?.data ||
//             error?.message
//         );

//         return rejectWithValue({
//           conversationId,
//           message: getErrorMessage(
//             error,
//             "Failed to load messages"
//           ),
//         });
//       }
//     }
//   );

// // ======================================================
// // SEND MESSAGE
// // ======================================================

// export const sendMessage =
//   createAsyncThunk(
//     "chat/sendMessage",
//     async (
//       {
//         conversationId,
//         content,
//       },
//       { rejectWithValue }
//     ) => {
//       try {
//         console.log(
//           "========== SEND MESSAGE =========="
//         );

//         console.log(
//           "CONVERSATION ID =>",
//           conversationId
//         );

//         console.log(
//           "CONTENT =>",
//           content
//         );

//         const response =
//           await api.post(
//             API_ENDPOINTS.chat.sendMessage(
//               conversationId
//             ),
//             {
//               content,
//             }
//           );

//         console.log(
//           "SEND MESSAGE RESPONSE =>",
//           response?.data
//         );

//         return {
//           conversationId,
//           message: response?.data,
//         };
//       } catch (error) {
//         console.log(
//           "SEND MESSAGE ERROR =>",
//           error?.response?.data ||
//             error?.message
//         );

//         return rejectWithValue(
//           getErrorMessage(
//             error,
//             "Failed to send message"
//           )
//         );
//       }
//     }
//   );

// // ======================================================
// // MARK CONVERSATION READ
// // ======================================================

// export const markConversationRead =
//   createAsyncThunk(
//     "chat/markConversationRead",
//     async (
//       conversationId,
//       { rejectWithValue }
//     ) => {
//       try {
//         console.log(
//           "========== MARK CONVERSATION READ =========="
//         );

//         console.log(
//           "CONVERSATION ID =>",
//           conversationId
//         );

//         const response =
//           await api.post(
//             API_ENDPOINTS.chat.markRead(
//               conversationId
//             )
//           );

//         console.log(
//           "MARK READ RESPONSE =>",
//           response?.data
//         );

//         return {
//           conversationId,
//           data: response?.data,
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
//             "Failed to mark conversation as read"
//           )
//         );
//       }
//     }
//   );

// // ======================================================
// // GET ONLINE STATUS
// // ======================================================

// export const getOnlineStatus =
//   createAsyncThunk(
//     "chat/getOnlineStatus",
//     async (
//       userId,
//       { rejectWithValue }
//     ) => {
//       try {
//         console.log(
//           "========== GET ONLINE STATUS =========="
//         );

//         console.log(
//           "USER ID =>",
//           userId
//         );

//         const response =
//           await api.get(
//             API_ENDPOINTS.chat
//               .getOnlineStatus(userId)
//           );

//         console.log(
//           "ONLINE STATUS RESPONSE =>",
//           response?.data
//         );

//         return response?.data;
//       } catch (error) {
//         console.log(
//           "GET ONLINE STATUS ERROR =>",
//           error?.response?.data ||
//             error?.message
//         );

//         return rejectWithValue({
//           userId,
//           message: getErrorMessage(
//             error,
//             "Failed to get online status"
//           ),
//         });
//       }
//     }
//   );

// // ======================================================
// // INITIAL STATE
// // ======================================================

// const initialState = {
//   conversations: [],
//   conversationsTotal: 0,
//   conversationsLimit: 30,
//   conversationsOffset: 0,
//   conversationsHasMore: false,
//   conversationsLoading: false,
//   conversationsError: null,

//   currentConversation: null,

//   createConversationLoading: false,
//   createConversationError: null,

//   deleteConversationLoading: false,
//   deleteConversationError: null,

//   messagesByConversation: {},
//   messagesMetaByConversation: {},
//   messagesLoadingByConversation: {},
//   messagesErrorByConversation: {},

//   sendMessageLoading: false,
//   sendMessageError: null,

//   markReadLoading: false,
//   markReadError: null,
//   lastReadMessageIdByConversation: {},

//   onlineStatus: {},
//   onlineLoading: {},
//   onlineError: {},
// };

// // ======================================================
// // SLICE
// // ======================================================

// const chatSlice = createSlice({
//   name: "chat",

//   initialState,

//   reducers: {
//     // ==================================================
// // UPDATE READ / SEEN STATUS
// // ==================================================

// updateMessagesReadStatus: (
//   state,
//   action
// ) => {
//   const {
//     conversationId,
//     lastReadMessageId,
//     userId,
//   } = action.payload || {};

//   if (
//     conversationId ===
//       undefined ||
//     conversationId === null ||
//     lastReadMessageId ===
//       undefined ||
//     lastReadMessageId === null
//   ) {
//     return;
//   }

//   const key =
//     String(conversationId);

//   const messages =
//     state.messagesByConversation[
//       key
//     ];

//   if (!Array.isArray(messages)) {
//     return;
//   }

//   messages.forEach(
//     (message) => {
//       if (
//         Number(message?.id) <=
//         Number(
//           lastReadMessageId
//         ) &&
//         Number(
//           message?.sender_id
//         ) !== Number(userId)
//       ) {
//         message.status =
//           "read";
//       }
//     }
//   );
// },

// // ==================================================
// // MESSAGE DELETED
// // ==================================================

// markMessageDeleted: (
//   state,
//   action
// ) => {
//   const {
//     conversationId,
//     messageId,
//   } = action.payload || {};

//   if (
//     conversationId ===
//       undefined ||
//     conversationId === null ||
//     messageId ===
//       undefined ||
//     messageId === null
//   ) {
//     return;
//   }

//   const key =
//     String(conversationId);

//   const messages =
//     state.messagesByConversation[
//       key
//     ];

//   if (!Array.isArray(messages)) {
//     return;
//   }

//   const message =
//     messages.find(
//       (item) =>
//         sameId(
//           item?.id,
//           messageId
//         )
//     );

//   if (message) {
//     message.is_deleted =
//       true;

//     message.content = "";
//   }
// },

// // ==================================================
// // ADD REACTION
// // ==================================================

// addMessageReaction: (
//   state,
//   action
// ) => {
//   const {
//     conversationId,
//     messageId,
//     userId,
//     emoji,
//   } = action.payload || {};

//   if (
//     conversationId ===
//       undefined ||
//     conversationId === null ||
//     messageId ===
//       undefined ||
//     messageId === null ||
//     userId ===
//       undefined ||
//     userId === null ||
//     !emoji
//   ) {
//     return;
//   }

//   const key =
//     String(conversationId);

//   const messages =
//     state.messagesByConversation[
//       key
//     ];

//   if (!Array.isArray(messages)) {
//     return;
//   }

//   const message =
//     messages.find(
//       (item) =>
//         sameId(
//           item?.id,
//           messageId
//         )
//     );

//   if (!message) {
//     return;
//   }

//   if (
//     !Array.isArray(
//       message.reactions
//     )
//   ) {
//     message.reactions = [];
//   }

//   const existing =
//     message.reactions.find(
//       (reaction) =>
//         sameId(
//           reaction?.user_id,
//           userId
//         )
//     );

//   if (existing) {
//     existing.emoji =
//       emoji;
//   } else {
//     message.reactions.push({
//       user_id: userId,
//       emoji,
//     });
//   }
// },

// // ==================================================
// // REMOVE REACTION
// // ==================================================

// removeMessageReaction: (
//   state,
//   action
// ) => {
//   const {
//     conversationId,
//     messageId,
//     userId,
//   } = action.payload || {};

//   if (
//     conversationId ===
//       undefined ||
//     conversationId === null ||
//     messageId ===
//       undefined ||
//     messageId === null ||
//     userId ===
//       undefined ||
//     userId === null
//   ) {
//     return;
//   }

//   const key =
//     String(conversationId);

//   const messages =
//     state.messagesByConversation[
//       key
//     ];

//   if (!Array.isArray(messages)) {
//     return;
//   }

//   const message =
//     messages.find(
//       (item) =>
//         sameId(
//           item?.id,
//           messageId
//         )
//     );

//   if (!message) {
//     return;
//   }

//   if (
//     !Array.isArray(
//       message.reactions
//     )
//   ) {
//     return;
//   }

//   message.reactions =
//     message.reactions.filter(
//       (reaction) =>
//         !sameId(
//           reaction?.user_id,
//           userId
//         )
//     );
// },
//     // ==================================================
//     // SET CURRENT CONVERSATION
//     // ==================================================

//     setCurrentConversation: (
//       state,
//       action
//     ) => {
//       state.currentConversation =
//         action.payload || null;
//     },

//     // ==================================================
//     // CLEAR CURRENT CONVERSATION
//     // ==================================================

//     clearCurrentConversation: (
//       state
//     ) => {
//       state.currentConversation = null;
//     },

//     // ==================================================
//     // CLEAR MESSAGES
//     // ==================================================

//     clearMessages: (
//       state,
//       action
//     ) => {
//       const conversationId = String(
//         action.payload
//       );

//       delete state.messagesByConversation[
//         conversationId
//       ];

//       delete state.messagesMetaByConversation[
//         conversationId
//       ];

//       delete state.messagesLoadingByConversation[
//         conversationId
//       ];

//       delete state.messagesErrorByConversation[
//         conversationId
//       ];
//     },

//     // ==================================================
//     // CLEAR ALL CHAT STATE
//     // ==================================================

//     clearChatState: (
//       state
//     ) => {
//       state.conversations = [];

//       state.conversationsTotal = 0;
//       state.conversationsLimit = 30;
//       state.conversationsOffset = 0;
//       state.conversationsHasMore = false;

//       state.currentConversation = null;

//       state.messagesByConversation = {};
//       state.messagesMetaByConversation = {};
//       state.messagesLoadingByConversation = {};
//       state.messagesErrorByConversation = {};

//       state.onlineStatus = {};
//       state.onlineLoading = {};
//       state.onlineError = {};

//       state.lastReadMessageIdByConversation =
//         {};

//       state.conversationsError = null;
//       state.createConversationError = null;
//       state.deleteConversationError = null;
//       state.sendMessageError = null;
//       state.markReadError = null;
//     },

//     // ==================================================
//     // CLEAR ERRORS
//     // ==================================================

//     clearChatErrors: (
//       state
//     ) => {
//       state.conversationsError = null;
//       state.createConversationError = null;
//       state.deleteConversationError = null;
//       state.sendMessageError = null;
//       state.markReadError = null;

//       state.messagesErrorByConversation =
//         {};

//       state.onlineError = {};
//     },

//     // ==================================================
//     // UPSERT INCOMING WEBSOCKET MESSAGE
//     // ==================================================

//   upsertIncomingMessage: (state, action) => {
//   const {
//     conversationId,
//     message,
//   } = action.payload || {};

//   if (!message) return;

//   const finalConversationId =
//     conversationId ??
//     message.conversation_id;

//   if (!finalConversationId) return;

//   const conversationKey =
//     String(finalConversationId);

//   if (
//     !state.messagesByConversation[
//       conversationKey
//     ]
//   ) {
//     state.messagesByConversation[
//       conversationKey
//     ] = [];
//   }

//   const messages =
//     state.messagesByConversation[
//       conversationKey
//     ];

//   const existingIndex =
//     messages.findIndex(
//       (item) =>
//         String(item?.id) ===
//         String(message?.id)
//     );

//   if (existingIndex !== -1) {
//     messages[existingIndex] = message;
//   } else {
//     messages.push(message);
//   }

//   const conversationIndex =
//     state.conversations.findIndex(
//       (conversation) =>
//         String(conversation?.id) ===
//         String(finalConversationId)
//     );

//   if (conversationIndex !== -1) {
//     state.conversations[
//       conversationIndex
//     ].last_message = message;
//   }
// },

//     // ==================================================
//     // REMOVE MESSAGE LOCALLY
//     // ==================================================

//     removeMessageLocally: (
//       state,
//       action
//     ) => {
//       const {
//         conversationId,
//         messageId,
//       } =
//         action.payload || {};

//       if (
//         conversationId ===
//           undefined ||
//         conversationId === null
//       ) {
//         return;
//       }

//       const conversationKey =
//         String(conversationId);

//       const messages =
//         state.messagesByConversation[
//           conversationKey
//         ];

//       if (!Array.isArray(messages)) {
//         return;
//       }

//       state.messagesByConversation[
//         conversationKey
//       ] = messages.filter(
//         (message) =>
//           !sameId(
//             message?.id,
//             messageId
//           )
//       );
//     },
//   },

//   // ======================================================
//   // EXTRA REDUCERS
//   // ======================================================

//   extraReducers: (builder) => {
//     // ==================================================
//     // GET CONVERSATIONS
//     // ==================================================

//     builder
//       .addCase(
//         getConversations.pending,
//         (state) => {
//           state.conversationsLoading =
//             true;

//           state.conversationsError =
//             null;
//         }
//       )

//       .addCase(
//         getConversations.fulfilled,
//         (state, action) => {
//           state.conversationsLoading =
//             false;

//           const data =
//             action.payload?.data;

//           const append =
//             action.payload?.append;

//           const items =
//             getItems(data);

//           const total =
//             Number(data?.total) ||
//             items.length;

//           const limit =
//             Number(data?.limit) ||
//             30;

//           const offset =
//             Number(data?.offset) ||
//             0;

//           if (append) {
//             const existing =
//               state.conversations;

//             const existingIds =
//               new Set(
//                 existing.map(
//                   (item) =>
//                     String(item?.id)
//                 )
//               );

//             const newItems =
//               items.filter(
//                 (item) =>
//                   !existingIds.has(
//                     String(item?.id)
//                   )
//               );

//             state.conversations = [
//               ...existing,
//               ...newItems,
//             ];
//           } else {
//             state.conversations =
//               items;
//           }

//           state.conversationsTotal =
//             total;

//           state.conversationsLimit =
//             limit;

//           state.conversationsOffset =
//             offset;

//           state.conversationsHasMore =
//             state.conversations.length <
//             total;
//         }
//       )

//       .addCase(
//         getConversations.rejected,
//         (state, action) => {
//           state.conversationsLoading =
//             false;

//           state.conversationsError =
//             action.payload ||
//             "Failed to load conversations";
//         }
//       );

//     // ==================================================
//     // CREATE CONVERSATION
//     // ==================================================

//     builder
//       .addCase(
//         createConversation.pending,
//         (state) => {
//           state.createConversationLoading =
//             true;

//           state.createConversationError =
//             null;
//         }
//       )

//       .addCase(
//         createConversation.fulfilled,
//         (state, action) => {
//           state.createConversationLoading =
//             false;

//           const conversation =
//             action.payload;

//           if (!conversation?.id) {
//             return;
//           }

//           state.currentConversation =
//             conversation;

//           const existingIndex =
//             state.conversations.findIndex(
//               (item) =>
//                 sameId(
//                   item?.id,
//                   conversation?.id
//                 )
//             );

//           if (existingIndex !== -1) {
//             state.conversations[
//               existingIndex
//             ] = conversation;
//           } else {
//             state.conversations.unshift(
//               conversation
//             );
//           }
//         }
//       )

//       .addCase(
//         createConversation.rejected,
//         (state, action) => {
//           state.createConversationLoading =
//             false;

//           state.createConversationError =
//             action.payload ||
//             "Failed to create conversation";
//         }
//       );

//     // ==================================================
//     // DELETE CONVERSATION
//     // ==================================================

//     builder
//       .addCase(
//         deleteConversation.pending,
//         (state) => {
//           state.deleteConversationLoading =
//             true;

//           state.deleteConversationError =
//             null;
//         }
//       )

//       .addCase(
//         deleteConversation.fulfilled,
//         (state, action) => {
//           state.deleteConversationLoading =
//             false;

//           const conversationId =
//             action.payload
//               ?.conversationId;

//           if (
//             conversationId ===
//               undefined ||
//             conversationId === null
//           ) {
//             return;
//           }

//           state.conversations =
//             state.conversations.filter(
//               (conversation) =>
//                 !sameId(
//                   conversation?.id,
//                   conversationId
//                 )
//             );

//           const key =
//             String(conversationId);

//           delete state
//             .messagesByConversation[key];

//           delete state
//             .messagesMetaByConversation[key];

//           delete state
//             .messagesLoadingByConversation[key];

//           delete state
//             .messagesErrorByConversation[key];

//           delete state
//             .lastReadMessageIdByConversation[
//               key
//             ];

//           if (
//             sameId(
//               state.currentConversation?.id,
//               conversationId
//             )
//           ) {
//             state.currentConversation =
//               null;
//           }
//         }
//       )

//       .addCase(
//         deleteConversation.rejected,
//         (state, action) => {
//           state.deleteConversationLoading =
//             false;

//           state.deleteConversationError =
//             action.payload ||
//             "Failed to delete conversation";
//         }
//       );

//     // ==================================================
//     // GET MESSAGES
//     // ==================================================

//     builder
//       .addCase(
//         getMessages.pending,
//         (state, action) => {
//           const conversationId =
//             action.meta.arg
//               ?.conversationId;

//           if (
//             conversationId !==
//               undefined &&
//             conversationId !== null
//           ) {
//             const key =
//               String(conversationId);

//             state.messagesLoadingByConversation[
//               key
//             ] = true;

//             state.messagesErrorByConversation[
//               key
//             ] = null;
//           }
//         }
//       )

//       .addCase(
//         getMessages.fulfilled,
//         (state, action) => {
//           const {
//             conversationId,
//             data,
//             append,
//           } =
//             action.payload;

//           if (
//             conversationId ===
//               undefined ||
//             conversationId === null
//           ) {
//             return;
//           }

//           const key =
//             String(conversationId);

//           const items =
//             getItems(data);

//           const total =
//             Number(data?.total) ||
//             items.length;

//           const limit =
//             Number(data?.limit) ||
//             30;

//           const offset =
//             Number(data?.offset) ||
//             0;

//           const existing =
//             state.messagesByConversation[
//               key
//             ] || EMPTY_ARRAY;

//           if (append) {
//             const existingIds =
//               new Set(
//                 existing.map(
//                   (item) =>
//                     String(item?.id)
//                 )
//               );

//             const newItems =
//               items.filter(
//                 (item) =>
//                   !existingIds.has(
//                     String(item?.id)
//                   )
//               );

//             state.messagesByConversation[
//               key
//             ] = [
//               ...existing,
//               ...newItems,
//             ];
//           } else {
//             state.messagesByConversation[
//               key
//             ] = items;
//           }

//           state.messagesMetaByConversation[
//             key
//           ] = {
//             total,
//             limit,
//             offset,
//             hasMore:
//               state
//                 .messagesByConversation[
//                 key
//               ].length < total,
//           };

//           state.messagesLoadingByConversation[
//             key
//           ] = false;

//           state.messagesErrorByConversation[
//             key
//           ] = null;
//         }
//       )

//       .addCase(
//         getMessages.rejected,
//         (state, action) => {
//           const conversationId =
//             action.payload
//               ?.conversationId;

//           const message =
//             action.payload?.message ||
//             "Failed to load messages";

//           if (
//             conversationId !==
//               undefined &&
//             conversationId !== null
//           ) {
//             const key =
//               String(conversationId);

//             state.messagesLoadingByConversation[
//               key
//             ] = false;

//             state.messagesErrorByConversation[
//               key
//             ] = message;
//           }
//         }
//       );

//     // ==================================================
//     // SEND MESSAGE
//     // ==================================================

//     builder
//       .addCase(
//         sendMessage.pending,
//         (state) => {
//           state.sendMessageLoading =
//             true;

//           state.sendMessageError =
//             null;
//         }
//       )

//       .addCase(
//         sendMessage.fulfilled,
//         (state, action) => {
//           state.sendMessageLoading =
//             false;

//           const {
//             conversationId,
//             message,
//           } =
//             action.payload || {};

//           if (
//             conversationId ===
//               undefined ||
//             conversationId ===
//               null ||
//             !message
//           ) {
//             return;
//           }

//           const key =
//             String(conversationId);

//           if (
//             !state.messagesByConversation[
//               key
//             ]
//           ) {
//             state.messagesByConversation[
//               key
//             ] = [];
//           }

//           const messages =
//             state.messagesByConversation[
//               key
//             ];

//           const alreadyExists =
//             messages.some(
//               (item) =>
//                 sameId(
//                   item?.id,
//                   message?.id
//                 )
//             );

//           if (!alreadyExists) {
//             messages.push(message);
//           }

//           const conversationIndex =
//             state.conversations.findIndex(
//               (conversation) =>
//                 sameId(
//                   conversation?.id,
//                   conversationId
//                 )
//             );

//           if (
//             conversationIndex !== -1
//           ) {
//             state.conversations[
//               conversationIndex
//             ].last_message =
//               message;
//           }

//           if (
//             sameId(
//               state.currentConversation?.id,
//               conversationId
//             )
//           ) {
//             state.currentConversation.last_message =
//               message;
//           }
//         }
//       )

//       .addCase(
//         sendMessage.rejected,
//         (state, action) => {
//           state.sendMessageLoading =
//             false;

//           state.sendMessageError =
//             action.payload ||
//             "Failed to send message";
//         }
//       );

//     // ==================================================
//     // MARK READ
//     // ==================================================

//     builder
//       .addCase(
//         markConversationRead.pending,
//         (state) => {
//           state.markReadLoading =
//             true;

//           state.markReadError =
//             null;
//         }
//       )

//       .addCase(
//         markConversationRead.fulfilled,
//         (state, action) => {
//           state.markReadLoading =
//             false;

//           const {
//             conversationId,
//             data,
//           } =
//             action.payload || {};

//           if (
//             conversationId ===
//               undefined ||
//             conversationId ===
//               null
//           ) {
//             return;
//           }

//           const key =
//             String(conversationId);

//           state
//             .lastReadMessageIdByConversation[
//               key
//             ] =
//             data?.last_read_message_id ??
//             null;

//           const conversationIndex =
//             state.conversations.findIndex(
//               (conversation) =>
//                 sameId(
//                   conversation?.id,
//                   conversationId
//                 )
//             );

//           if (
//             conversationIndex !== -1
//           ) {
//             state.conversations[
//               conversationIndex
//             ].unread_count = 0;
//           }
//         }
//       )

//       .addCase(
//         markConversationRead.rejected,
//         (state, action) => {
//           state.markReadLoading =
//             false;

//           state.markReadError =
//             action.payload ||
//             "Failed to mark conversation as read";
//         }
//       );

//     // ==================================================
//     // ONLINE STATUS
//     // ==================================================

//     builder
//       .addCase(
//         getOnlineStatus.pending,
//         (state, action) => {
//           const userId =
//             action.meta.arg;

//           const key =
//             String(userId);

//           state.onlineLoading[key] =
//             true;

//           state.onlineError[key] =
//             null;
//         }
//       )

//       .addCase(
//         getOnlineStatus.fulfilled,
//         (state, action) => {
//           const data =
//             action.payload;

//           const userId =
//             data?.user_id;

//           if (
//             userId === undefined ||
//             userId === null
//           ) {
//             return;
//           }

//           const key =
//             String(userId);

//           state.onlineStatus[key] =
//             Boolean(
//               data?.is_online
//             );

//           state.onlineLoading[key] =
//             false;

//           state.onlineError[key] =
//             null;
//         }
//       )

//       .addCase(
//         getOnlineStatus.rejected,
//         (state, action) => {
//           const userId =
//             action.payload?.userId ??
//             action.meta.arg;

//           const key =
//             String(userId);

//           state.onlineLoading[key] =
//             false;

//           state.onlineError[key] =
//             action.payload?.message ||
//             "Failed to get online status";
//         }
//       );
//   },
// });

// // ======================================================
// // ACTIONS
// // ======================================================

// export const {
//   setCurrentConversation,
//   clearCurrentConversation,
//   clearMessages,
//   clearChatState,
//   clearChatErrors,
//   upsertIncomingMessage,
//   removeMessageLocally,
// } = chatSlice.actions;

// // ======================================================
// // SELECTORS
// // ======================================================

// export const selectConversations = (
//   state
// ) =>
//   state.chat?.conversations ??
//   EMPTY_ARRAY;

// export const selectConversationsLoading = (
//   state
// ) =>
//   Boolean(
//     state.chat?.conversationsLoading
//   );

// export const selectConversationsError = (
//   state
// ) =>
//   state.chat?.conversationsError ??
//   null;

// export const selectCurrentConversation = (
//   state
// ) =>
//   state.chat?.currentConversation ??
//   null;

// // ======================================================
// // MESSAGES
// // ======================================================

// export const selectMessagesByConversation = (
//   state,
//   conversationId
// ) =>
//   state.chat
//     ?.messagesByConversation?.[
//       String(conversationId)
//     ] ??
//   EMPTY_ARRAY;

// export const selectMessages = (
//   state,
//   conversationId
// ) =>
//   state.chat
//     ?.messagesByConversation?.[
//       String(conversationId)
//     ] ??
//   EMPTY_ARRAY;

// export const selectMessagesLoading = (
//   state,
//   conversationId
// ) =>
//   Boolean(
//     state.chat
//       ?.messagesLoadingByConversation?.[
//       String(conversationId)
//     ]
//   );

// export const selectMessagesError = (
//   state,
//   conversationId
// ) =>
//   state.chat
//     ?.messagesErrorByConversation?.[
//       String(conversationId)
//     ] ??
//   null;

// export const selectMessagesMeta = (
//   state,
//   conversationId
// ) =>
//   state.chat
//     ?.messagesMetaByConversation?.[
//       String(conversationId)
//     ] ?? {
//       total: 0,
//       limit: 30,
//       offset: 0,
//       hasMore: false,
//     };

// // ======================================================
// // SEND MESSAGE
// // ======================================================

// export const selectSendMessageLoading = (
//   state
// ) =>
//   Boolean(
//     state.chat?.sendMessageLoading
//   );

// export const selectSendMessageError = (
//   state
// ) =>
//   state.chat?.sendMessageError ??
//   null;

// // ======================================================
// // MARK READ
// // ======================================================

// export const selectMarkReadLoading = (
//   state
// ) =>
//   Boolean(
//     state.chat?.markReadLoading
//   );

// export const selectMarkReadError = (
//   state
// ) =>
//   state.chat?.markReadError ??
//   null;

// // ======================================================
// // UNREAD COUNT
// // ======================================================

// export const selectUnreadCount = (
//   state,
//   conversationId
// ) => {
//   const conversations =
//     state.chat?.conversations ??
//     EMPTY_ARRAY;

//   const conversation =
//     conversations.find(
//       (item) =>
//         sameId(
//           item?.id,
//           conversationId
//         )
//     );

//   return Number(
//     conversation?.unread_count || 0
//   );
// };

// // ======================================================
// // ONLINE STATUS
// // ======================================================

// export const selectOnlineStatus = (
//   state,
//   userId
// ) =>
//   Boolean(
//     state.chat?.onlineStatus?.[
//       String(userId)
//     ]
//   );

// export const selectOnlineLoading = (
//   state,
//   userId
// ) =>
//   Boolean(
//     state.chat?.onlineLoading?.[
//       String(userId)
//     ]
//   );

// export const selectOnlineError = (
//   state,
//   userId
// ) =>
//   state.chat?.onlineError?.[
//     String(userId)
//   ] ?? null;

// // ======================================================
// // DELETE
// // ======================================================

// export const selectDeleteConversationLoading =
//   (state) =>
//     Boolean(
//       state.chat
//         ?.deleteConversationLoading
//     );

// export const selectDeleteConversationError =
//   (state) =>
//     state.chat
//       ?.deleteConversationError ??
//     null;

// // ======================================================
// // EXPORT
// // ======================================================

// export default chatSlice.reducer;



import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import api from "../utils/api";
import { API_ENDPOINTS } from "../config/apiEndpoints";

// ======================================================
// CONSTANTS
// ======================================================

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

// ======================================================
// HELPERS
// ======================================================

const getErrorMessage = (
  error,
  fallback = "Something went wrong"
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

  return EMPTY_ARRAY;
};

const sameId = (a, b) => {
  if (a === null || a === undefined) {
    return false;
  }

  if (b === null || b === undefined) {
    return false;
  }

  return String(a) === String(b);
};

// ======================================================
// MERGE + DEDUPE MESSAGES
// ======================================================

const mergeMessages = (
  existing,
  incoming
) => {
  const map = new Map();

  [
    ...(existing || []),
    ...(incoming || []),
  ].forEach((message) => {
    if (
      message?.id !== undefined &&
      message?.id !== null
    ) {
      map.set(
        String(message.id),
        message
      );
    }
  });

  return Array.from(
    map.values()
  ).sort((a, b) => {
    const aTime = new Date(
      a?.created_at || 0
    ).getTime();

    const bTime = new Date(
      b?.created_at || 0
    ).getTime();

    if (aTime !== bTime) {
      return aTime - bTime;
    }

    return (
      Number(a?.id || 0) -
      Number(b?.id || 0)
    );
  });
};

// ======================================================
// GET CONVERSATIONS
// ======================================================

export const getConversations =
  createAsyncThunk(
    "chat/getConversations",
    async (
      {
        limit = 30,
        offset = 0,
        append = false,
      } = {},
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== GET CONVERSATIONS =========="
        );

        console.log("LIMIT =>", limit);
        console.log("OFFSET =>", offset);
        console.log("APPEND =>", append);

        const response =
          await api.get(
            API_ENDPOINTS.chat
              .getConversations,
            {
              params: {
                limit,
                offset,
              },
            }
          );

        console.log(
          "GET CONVERSATIONS RESPONSE =>",
          response?.data
        );

        return {
          data: response?.data,
          append,
        };
      } catch (error) {
        console.log(
          "GET CONVERSATIONS ERROR =>",
          error?.response?.data ||
            error?.message
        );

        return rejectWithValue(
          getErrorMessage(
            error,
            "Failed to load conversations"
          )
        );
      }
    }
  );

// ======================================================
// CREATE CONVERSATION
// ======================================================

export const createConversation =
  createAsyncThunk(
    "chat/createConversation",
    async (
      {
        participant_ids,
        title = null,
      },
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== CREATE CONVERSATION =========="
        );

        console.log(
          "PARTICIPANT IDS =>",
          participant_ids
        );

        console.log(
          "TITLE =>",
          title
        );

        const response =
          await api.post(
            API_ENDPOINTS.chat
              .createConversation,
            {
              participant_ids,
              title,
            }
          );

        console.log(
          "CREATE CONVERSATION RESPONSE =>",
          response?.data
        );

        return response?.data;
      } catch (error) {
        console.log(
          "CREATE CONVERSATION ERROR =>",
          error?.response?.data ||
            error?.message
        );

        return rejectWithValue(
          getErrorMessage(
            error,
            "Failed to create conversation"
          )
        );
      }
    }
  );

// ======================================================
// DELETE CONVERSATION
// ======================================================

export const deleteConversation =
  createAsyncThunk(
    "chat/deleteConversation",
    async (
      conversationId,
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== DELETE CONVERSATION =========="
        );

        console.log(
          "CONVERSATION ID =>",
          conversationId
        );

        const response =
          await api.delete(
            API_ENDPOINTS.chat
              .deleteConversation(
                conversationId
              )
          );

        console.log(
          "DELETE CONVERSATION RESPONSE =>",
          response?.data
        );

        return {
          conversationId,
          data: response?.data,
        };
      } catch (error) {
        console.log(
          "DELETE CONVERSATION ERROR =>",
          error?.response?.data ||
            error?.message
        );

        return rejectWithValue(
          getErrorMessage(
            error,
            "Failed to delete conversation"
          )
        );
      }
    }
  );

// ======================================================
// GET MESSAGES
// ======================================================

export const getMessages =
  createAsyncThunk(
    "chat/getMessages",
    async (
      {
        conversationId,
        limit = 30,
        offset = 0,
        append = false,
      },
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== GET MESSAGES =========="
        );

        console.log(
          "CONVERSATION ID =>",
          conversationId
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
            API_ENDPOINTS.chat
              .getMessages(
                conversationId
              ),
            {
              params: {
                limit,
                offset,
              },
            }
          );

        console.log(
          "GET MESSAGES RESPONSE =>",
          response?.data
        );

        return {
          conversationId,
          data: response?.data,
          append,
        };
      } catch (error) {
        console.log(
          "GET MESSAGES ERROR =>",
          error?.response?.data ||
            error?.message
        );

        return rejectWithValue({
          conversationId,
          message: getErrorMessage(
            error,
            "Failed to load messages"
          ),
        });
      }
    }
  );

// ======================================================
// SEND MESSAGE
// ======================================================

export const sendMessage =
  createAsyncThunk(
    "chat/sendMessage",
    async (
      {
        conversationId,
        content,
      },
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== SEND MESSAGE =========="
        );

        console.log(
          "CONVERSATION ID =>",
          conversationId
        );

        console.log(
          "CONTENT =>",
          content
        );

        const response =
          await api.post(
            API_ENDPOINTS.chat
              .sendMessage(
                conversationId
              ),
            {
              content,
            }
          );

        console.log(
          "SEND MESSAGE RESPONSE =>",
          response?.data
        );

        return {
          conversationId,
          message: response?.data,
        };
      } catch (error) {
        console.log(
          "SEND MESSAGE ERROR =>",
          error?.response?.data ||
            error?.message
        );

        return rejectWithValue(
          getErrorMessage(
            error,
            "Failed to send message"
          )
        );
      }
    }
  );

  export const editMessage = createAsyncThunk(
  "chat/editMessage",
  async (
    { messageId, content },
    { rejectWithValue }
  ) => {
    try {
      console.log(
        "EDIT MESSAGE ID =>",
        messageId
      );

      console.log(
        "EDIT MESSAGE CONTENT =>",
        content
      );

      const response = await api.put(
        API_ENDPOINTS.chat.editMessage(
          messageId
        ),
        {
          content,
        }
      );

      console.log(
        "EDIT MESSAGE RESPONSE =>",
        response?.data
      );

      return response?.data;
    } catch (error) {
      console.log(
        "EDIT MESSAGE ERROR =>",
        error?.response?.data ||
          error?.message
      );

      return rejectWithValue(
        getErrorMessage(
          error,
          "Failed to edit message"
        )
      );
    }
  }
);

  export const deleteMessage = createAsyncThunk(
  "chat/deleteMessage",
  async (
    { conversationId, messageId },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.delete(
        API_ENDPOINTS.chat.deleteMessage(messageId)
      );

      return {
        conversationId,
        messageId,
        data: response?.data,
      };
    } catch (error) {
      return rejectWithValue({
        conversationId,
        messageId,
        message: getErrorMessage(
          error,
          "Failed to delete message"
        ),
      });
    }
  }
);

// ======================================================
// MARK CONVERSATION READ
// ======================================================

export const markConversationRead =
  createAsyncThunk(
    "chat/markConversationRead",
    async (
      conversationId,
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== MARK CONVERSATION READ =========="
        );

        console.log(
          "CONVERSATION ID =>",
          conversationId
        );

        const response =
          await api.post(
            API_ENDPOINTS.chat
              .markRead(
                conversationId
              )
          );

        console.log(
          "MARK READ RESPONSE =>",
          response?.data
        );

        return {
          conversationId,
          data: response?.data,
        };
      } catch (error) {
        console.log(
          "MARK READ ERROR =>",
          error?.response?.data ||
            error?.message
        );

        return rejectWithValue(
          getErrorMessage(
            error,
            "Failed to mark conversation as read"
          )
        );
      }
    }
  );

// ======================================================
// GET ONLINE STATUS
// ======================================================

export const getOnlineStatus =
  createAsyncThunk(
    "chat/getOnlineStatus",
    async (
      userId,
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== GET ONLINE STATUS =========="
        );

        console.log(
          "USER ID =>",
          userId
        );

        const response =
          await api.get(
            API_ENDPOINTS.chat
              .getOnlineStatus(
                userId
              )
          );

        console.log(
          "ONLINE STATUS RESPONSE =>",
          response?.data
        );

        return response?.data;
      } catch (error) {
        console.log(
          "GET ONLINE STATUS ERROR =>",
          error?.response?.data ||
            error?.message
        );

        return rejectWithValue({
          userId,
          message: getErrorMessage(
            error,
            "Failed to get online status"
          ),
        });
      }
    }
  );

  // ======================================================
// REACT TO MESSAGE
// ======================================================

export const reactToMessage =
  createAsyncThunk(
    "chat/reactToMessage",
    async (
      {
        conversationId,
        messageId,
        emoji,
      },
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== REACT TO MESSAGE =========="
        );

        console.log("CONVERSATION ID =>", conversationId);
        console.log("MESSAGE ID =>", messageId);
        console.log("EMOJI =>", emoji);

        const response = await api.post(
          API_ENDPOINTS.chat.reactToMessage(
            messageId
          ),
          {
            emoji,
          }
        );

        console.log(
          "REACT MESSAGE RESPONSE =>",
          response?.data
        );

        return {
          conversationId,
          message: response?.data,
        };
      } catch (error) {
        console.log(
          "REACT MESSAGE ERROR =>",
          error?.response?.data ||
            error?.message
        );

        return rejectWithValue(
          getErrorMessage(
            error,
            "Failed to react to message"
          )
        );
      }
    }
  );


// ======================================================
// REMOVE MESSAGE REACTION
// ======================================================

export const removeMessageReactionApi =
  createAsyncThunk(
    "chat/removeMessageReactionApi",
    async (
      {
        conversationId,
        messageId,
      },
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "========== REMOVE MESSAGE REACTION =========="
        );

        console.log("CONVERSATION ID =>", conversationId);
        console.log("MESSAGE ID =>", messageId);

        const response = await api.delete(
          API_ENDPOINTS.chat.reactToMessage(
            messageId
          )
        );

        console.log(
          "REMOVE REACTION RESPONSE =>",
          response?.data
        );

        return {
          conversationId,
          message: response?.data,
        };
      } catch (error) {
        console.log(
          "REMOVE REACTION ERROR =>",
          error?.response?.data ||
            error?.message
        );

        return rejectWithValue(
          getErrorMessage(
            error,
            "Failed to remove message reaction"
          )
        );
      }
    }
  );

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  conversations: [],

  conversationsTotal: 0,
  conversationsLimit: 30,
  conversationsOffset: 0,
  conversationsHasMore: false,

  conversationsLoading: false,
  conversationsError: null,

  currentConversation: null,

  createConversationLoading: false,
  createConversationError: null,

  deleteConversationLoading: false,
  deleteConversationError: null,

  messagesByConversation: {},
  messagesMetaByConversation: {},
  messagesLoadingByConversation: {},
  messagesErrorByConversation: {},

  sendMessageLoading: false,
  sendMessageError: null,

  markReadLoading: false,
  markReadError: null,

  lastReadMessageIdByConversation: {},

  onlineStatus: {},
  onlineLoading: {},
  onlineError: {},
};

// ======================================================
// SLICE
// ======================================================

const chatSlice = createSlice({
  name: "chat",

  initialState,

  reducers: {
    // ==================================================
    // SET CURRENT CONVERSATION
    // ==================================================

    setCurrentConversation: (
      state,
      action
    ) => {
      state.currentConversation =
        action.payload || null;
    },

    // ==================================================
    // CLEAR CURRENT CONVERSATION
    // ==================================================

    clearCurrentConversation: (
      state
    ) => {
      state.currentConversation =
        null;
    },

    // ==================================================
    // CLEAR MESSAGES
    // ==================================================

    clearMessages: (
      state,
      action
    ) => {
      const conversationId =
        String(action.payload);

      delete state
        .messagesByConversation[
          conversationId
        ];

      delete state
        .messagesMetaByConversation[
          conversationId
        ];

      delete state
        .messagesLoadingByConversation[
          conversationId
        ];

      delete state
        .messagesErrorByConversation[
          conversationId
        ];
    },

    // ==================================================
    // CLEAR ALL CHAT STATE
    // ==================================================

    clearChatState: (
      state
    ) => {
      state.conversations = [];

      state.conversationsTotal = 0;
      state.conversationsLimit = 30;
      state.conversationsOffset = 0;
      state.conversationsHasMore = false;

      state.currentConversation =
        null;

      state.messagesByConversation = {};
      state.messagesMetaByConversation = {};
      state.messagesLoadingByConversation = {};
      state.messagesErrorByConversation = {};

      state.onlineStatus = {};
      state.onlineLoading = {};
      state.onlineError = {};

      state.lastReadMessageIdByConversation =
        {};

      state.conversationsError = null;
      state.createConversationError = null;
      state.deleteConversationError = null;
      state.sendMessageError = null;
      state.markReadError = null;
    },

    // ==================================================
    // CLEAR ERRORS
    // ==================================================

    clearChatErrors: (
      state
    ) => {
      state.conversationsError = null;
      state.createConversationError = null;
      state.deleteConversationError = null;
      state.sendMessageError = null;
      state.markReadError = null;

      state.messagesErrorByConversation =
        {};

      state.onlineError = {};
    },

    // ==================================================
    // UPSERT INCOMING WEBSOCKET MESSAGE
    // ==================================================

    upsertIncomingMessage: (
      state,
      action
    ) => {
      const {
        conversationId,
        message,
      } = action.payload || {};

      if (!message) {
        return;
      }

      const finalConversationId =
        conversationId ??
        message.conversation_id;

      if (
        finalConversationId ===
          undefined ||
        finalConversationId === null
      ) {
        return;
      }

      const conversationKey =
        String(
          finalConversationId
        );

      if (
        !state.messagesByConversation[
          conversationKey
        ]
      ) {
        state.messagesByConversation[
          conversationKey
        ] = [];
      }

      const messages =
        state.messagesByConversation[
          conversationKey
        ];

      const existingIndex =
        messages.findIndex(
          (item) =>
            sameId(
              item?.id,
              message?.id
            )
        );

      if (
        existingIndex !== -1
      ) {
        messages[
          existingIndex
        ] = message;
      } else {
        messages.push(
          message
        );
      }

      // Keep messages oldest -> newest
      state.messagesByConversation[
        conversationKey
      ] = mergeMessages(
        [],
        messages
      );

      // Update conversation preview
      const conversationIndex =
        state.conversations.findIndex(
          (conversation) =>
            sameId(
              conversation?.id,
              finalConversationId
            )
        );

      if (
        conversationIndex !== -1
      ) {
        state.conversations[
          conversationIndex
        ].last_message =
          message;
      }

      // Update current conversation
      if (
        sameId(
          state.currentConversation
            ?.id,
          finalConversationId
        )
      ) {
        state.currentConversation.last_message =
          message;
      }
    },

    // ==================================================
    // UPDATE MESSAGE READ STATUS
    // ==================================================

    updateMessagesReadStatus: (
      state,
      action
    ) => {
      const {
        conversationId,
        lastReadMessageId,
        userId,
      } = action.payload || {};

      if (
        conversationId ===
          undefined ||
        conversationId === null ||
        lastReadMessageId ===
          undefined ||
        lastReadMessageId ===
          null ||
        userId ===
          undefined ||
        userId === null
      ) {
        return;
      }

      const key =
        String(conversationId);

      const messages =
        state.messagesByConversation[
          key
        ];

      if (!Array.isArray(messages)) {
        return;
      }

      const lastReadIndex =
        messages.findIndex(
          (message) =>
            sameId(
              message?.id,
              lastReadMessageId
            )
        );

      if (
        lastReadIndex === -1
      ) {
        return;
      }

      messages.forEach(
        (message, index) => {
          if (
            index <=
              lastReadIndex &&
            Number(
              message?.sender_id
            ) === Number(userId)
          ) {
            message.status =
              "read";
          }
        }
      );
    },

    // ==================================================
    // MESSAGE DELETED
    // ==================================================

    markMessageDeleted: (
      state,
      action
    ) => {
      const {
        conversationId,
        messageId,
      } = action.payload || {};

      if (
        conversationId ===
          undefined ||
        conversationId === null ||
        messageId ===
          undefined ||
        messageId === null
      ) {
        return;
      }

      const key =
        String(conversationId);

      const messages =
        state.messagesByConversation[
          key
        ];

      if (!Array.isArray(messages)) {
        return;
      }

      const message =
        messages.find(
          (item) =>
            sameId(
              item?.id,
              messageId
            )
        );

      if (message) {
        message.is_deleted = true;
        message.content = "";
      }
    },

    // ==================================================
    // ADD REACTION
    // ==================================================

    addMessageReaction: (
      state,
      action
    ) => {
      const {
        conversationId,
        messageId,
        userId,
        emoji,
      } = action.payload || {};

      if (
        conversationId ===
          undefined ||
        conversationId === null ||
        messageId ===
          undefined ||
        messageId === null ||
        userId ===
          undefined ||
        userId === null ||
        !emoji
      ) {
        return;
      }

      const key =
        String(conversationId);

      const messages =
        state.messagesByConversation[
          key
        ];

      if (!Array.isArray(messages)) {
        return;
      }

      const message =
        messages.find(
          (item) =>
            sameId(
              item?.id,
              messageId
            )
        );

      if (!message) {
        return;
      }

      if (
        !Array.isArray(
          message.reactions
        )
      ) {
        message.reactions = [];
      }

      const existing =
        message.reactions.find(
          (reaction) =>
            sameId(
              reaction?.user_id,
              userId
            )
        );

      if (existing) {
        existing.emoji =
          emoji;
      } else {
        message.reactions.push({
          user_id: userId,
          emoji,
        });
      }
    },

    // ==================================================
    // REMOVE REACTION
    // ==================================================

    removeMessageReaction: (
      state,
      action
    ) => {
      const {
        conversationId,
        messageId,
        userId,
      } = action.payload || {};

      if (
        conversationId ===
          undefined ||
        conversationId === null ||
        messageId ===
          undefined ||
        messageId === null ||
        userId ===
          undefined ||
        userId === null
      ) {
        return;
      }

      const key =
        String(conversationId);

      const messages =
        state.messagesByConversation[
          key
        ];

      if (!Array.isArray(messages)) {
        return;
      }

      const message =
        messages.find(
          (item) =>
            sameId(
              item?.id,
              messageId
            )
        );

      if (!message) {
        return;
      }

      if (
        !Array.isArray(
          message.reactions
        )
      ) {
        return;
      }

      message.reactions =
        message.reactions.filter(
          (reaction) =>
            !sameId(
              reaction?.user_id,
              userId
            )
        );
    },

    // ==================================================
    // REMOVE MESSAGE LOCALLY
    // ==================================================

    removeMessageLocally: (
      state,
      action
    ) => {
      const {
        conversationId,
        messageId,
      } =
        action.payload || {};

      if (
        conversationId ===
          undefined ||
        conversationId === null ||
        messageId ===
          undefined ||
        messageId === null
      ) {
        return;
      }

      const key =
        String(conversationId);

      const messages =
        state.messagesByConversation[
          key
        ];

      if (!Array.isArray(messages)) {
        return;
      }

      state.messagesByConversation[
        key
      ] = messages.filter(
        (message) =>
          !sameId(
            message?.id,
            messageId
          )
      );
    },
  },

  // ======================================================
  // EXTRA REDUCERS
  // ======================================================

  extraReducers: (builder) => {
    // ==================================================
    // GET CONVERSATIONS
    // ==================================================

    builder
      .addCase(
        getConversations.pending,
        (state) => {
          state.conversationsLoading =
            true;

          state.conversationsError =
            null;
        }
      )

      .addCase(
        getConversations.fulfilled,
        (
          state,
          action
        ) => {
          state.conversationsLoading =
            false;

          const data =
            action.payload?.data;

          const append =
            action.payload?.append;

          const items =
            getItems(data);

          const total =
            Number(data?.total) ||
            items.length;

          const limit =
            Number(data?.limit) ||
            30;

          const offset =
            Number(data?.offset) ||
            0;

          if (append) {
            const existing =
              state.conversations;

            const map =
              new Map();

            [
              ...existing,
              ...items,
            ].forEach(
              (item) => {
                if (
                  item?.id !==
                    undefined &&
                  item?.id !== null
                ) {
                  map.set(
                    String(item.id),
                    item
                  );
                }
              }
            );

            state.conversations =
              Array.from(
                map.values()
              );
          } else {
            state.conversations =
              items;
          }

          state.conversationsTotal =
            total;

          state.conversationsLimit =
            limit;

          state.conversationsOffset =
            offset;

          state.conversationsHasMore =
            state.conversations.length <
            total;
        }
      )

      .addCase(
        getConversations.rejected,
        (
          state,
          action
        ) => {
          state.conversationsLoading =
            false;

          state.conversationsError =
            action.payload ||
            "Failed to load conversations";
        }
      );

    // ==================================================
    // CREATE CONVERSATION
    // ==================================================

    builder
      .addCase(
        createConversation.pending,
        (state) => {
          state.createConversationLoading =
            true;

          state.createConversationError =
            null;
        }
      )

      .addCase(
        createConversation.fulfilled,
        (
          state,
          action
        ) => {
          state.createConversationLoading =
            false;

          const conversation =
            action.payload;

          if (!conversation?.id) {
            return;
          }

          state.currentConversation =
            conversation;

          const existingIndex =
            state.conversations.findIndex(
              (item) =>
                sameId(
                  item?.id,
                  conversation?.id
                )
            );

          if (
            existingIndex !== -1
          ) {
            state.conversations[
              existingIndex
            ] =
              conversation;
          } else {
            state.conversations.unshift(
              conversation
            );
          }
        }
      )

      .addCase(
        createConversation.rejected,
        (
          state,
          action
        ) => {
          state.createConversationLoading =
            false;

          state.createConversationError =
            action.payload ||
            "Failed to create conversation";
        }
      );

    // ==================================================
    // DELETE CONVERSATION
    // ==================================================

    builder
      .addCase(
        deleteConversation.pending,
        (state) => {
          state.deleteConversationLoading =
            true;

          state.deleteConversationError =
            null;
        }
      )

      .addCase(
        deleteConversation.fulfilled,
        (
          state,
          action
        ) => {
          state.deleteConversationLoading =
            false;

          const conversationId =
            action.payload
              ?.conversationId;

          if (
            conversationId ===
              undefined ||
            conversationId === null
          ) {
            return;
          }

          state.conversations =
            state.conversations.filter(
              (conversation) =>
                !sameId(
                  conversation?.id,
                  conversationId
                )
            );

          const key =
            String(
              conversationId
            );

          delete state
            .messagesByConversation[
              key
            ];

          delete state
            .messagesMetaByConversation[
              key
            ];

          delete state
            .messagesLoadingByConversation[
              key
            ];

          delete state
            .messagesErrorByConversation[
              key
            ];

          delete state
            .lastReadMessageIdByConversation[
              key
            ];

          if (
            sameId(
              state.currentConversation
                ?.id,
              conversationId
            )
          ) {
            state.currentConversation =
              null;
          }
        }
      )

      .addCase(
        deleteConversation.rejected,
        (
          state,
          action
        ) => {
          state.deleteConversationLoading =
            false;

          state.deleteConversationError =
            action.payload ||
            "Failed to delete conversation";
        }
      );

    // ==================================================
    // GET MESSAGES
    // ==================================================

    builder
      .addCase(
        getMessages.pending,
        (
          state,
          action
        ) => {
          const conversationId =
            action.meta.arg
              ?.conversationId;

          if (
            conversationId !==
              undefined &&
            conversationId !==
              null
          ) {
            const key =
              String(
                conversationId
              );

            state.messagesLoadingByConversation[
              key
            ] = true;

            state.messagesErrorByConversation[
              key
            ] = null;
          }
        }
      )

      .addCase(
        getMessages.fulfilled,
        (
          state,
          action
        ) => {
          const {
            conversationId,
            data,
          } =
            action.payload;

          if (
            conversationId ===
              undefined ||
            conversationId === null
          ) {
            return;
          }

          const key =
            String(
              conversationId
            );

          const items =
            getItems(data);

          const total =
            Number(data?.total) ||
            items.length;

          const limit =
            Number(data?.limit) ||
            30;

          const offset =
            Number(data?.offset) ||
            0;

          const existing =
            state.messagesByConversation[
              key
            ] || EMPTY_ARRAY;

          // IMPORTANT:
          // Always merge instead of replacing.
          // This prevents a REST response from
          // deleting a WebSocket message that
          // arrived while the request was running.

          state.messagesByConversation[
            key
          ] = mergeMessages(
            existing,
            items
          );

          state.messagesMetaByConversation[
            key
          ] = {
            total,
            limit,
            offset,
            hasMore:
              state
                .messagesByConversation[
                key
              ].length < total,
          };

          state.messagesLoadingByConversation[
            key
          ] = false;

          state.messagesErrorByConversation[
            key
          ] = null;
        }
      )

      .addCase(
        getMessages.rejected,
        (
          state,
          action
        ) => {
          const conversationId =
            action.payload
              ?.conversationId;

          const message =
            action.payload
              ?.message ||
            "Failed to load messages";

          if (
            conversationId !==
              undefined &&
            conversationId !==
              null
          ) {
            const key =
              String(
                conversationId
              );

            state.messagesLoadingByConversation[
              key
            ] = false;

            state.messagesErrorByConversation[
              key
            ] = message;
          }
        }
      );

    // ==================================================
    // SEND MESSAGE
    // ==================================================

    builder
      .addCase(
        sendMessage.pending,
        (state) => {
          state.sendMessageLoading =
            true;

          state.sendMessageError =
            null;
        }
      )

      .addCase(
        sendMessage.fulfilled,
        (
          state,
          action
        ) => {
          state.sendMessageLoading =
            false;

          const {
            conversationId,
            message,
          } =
            action.payload || {};

          if (
            conversationId ===
              undefined ||
            conversationId ===
              null ||
            !message
          ) {
            return;
          }

          const key =
            String(
              conversationId
            );

          if (
            !state.messagesByConversation[
              key
            ]
          ) {
            state.messagesByConversation[
              key
            ] = [];
          }

          const messages =
            state.messagesByConversation[
              key
            ];

          const existingIndex =
            messages.findIndex(
              (item) =>
                sameId(
                  item?.id,
                  message?.id
                )
            );

          if (
            existingIndex !== -1
          ) {
            messages[
              existingIndex
            ] = message;
          } else {
            messages.push(
              message
            );
          }

          state.messagesByConversation[
            key
          ] = mergeMessages(
            [],
            messages
          );

          const conversationIndex =
            state.conversations.findIndex(
              (conversation) =>
                sameId(
                  conversation?.id,
                  conversationId
                )
            );

          if (
            conversationIndex !==
            -1
          ) {
            state.conversations[
              conversationIndex
            ].last_message =
              message;
          }

          if (
            sameId(
              state.currentConversation
                ?.id,
              conversationId
            )
          ) {
            state.currentConversation.last_message =
              message;
          }
        }
      )

      .addCase(
        sendMessage.rejected,
        (
          state,
          action
        ) => {
          state.sendMessageLoading =
            false;

          state.sendMessageError =
            action.payload ||
            "Failed to send message";
        }
      );

      // ==================================================
// EDIT MESSAGE
// ==================================================

builder
  .addCase(
    editMessage.fulfilled,
    (state, action) => {
      const updatedMessage =
        action.payload;

      if (!updatedMessage) {
        return;
      }

      const conversationId =
        updatedMessage.conversation_id;

      const messageId =
        updatedMessage.id;

      if (
        conversationId === undefined ||
        conversationId === null ||
        messageId === undefined ||
        messageId === null
      ) {
        return;
      }

      const key =
        String(conversationId);

      const messages =
        state.messagesByConversation[key];

      if (!Array.isArray(messages)) {
        return;
      }

      const index =
        messages.findIndex(
          (message) =>
            sameId(
              message?.id,
              messageId
            )
        );

      if (index === -1) {
        return;
      }

      // Replace old message with edited message
      messages[index] = updatedMessage;

      // Keep conversation preview updated
      const conversationIndex =
        state.conversations.findIndex(
          (conversation) =>
            sameId(
              conversation?.id,
              conversationId
            )
        );

      if (
        conversationIndex !== -1
      ) {
        const conversation =
          state.conversations[
            conversationIndex
          ];

        if (
          sameId(
            conversation?.last_message?.id,
            messageId
          )
        ) {
          conversation.last_message =
            updatedMessage;
        }
      }

      // Keep current conversation preview updated
      if (
        sameId(
          state.currentConversation?.id,
          conversationId
        ) &&
        sameId(
          state.currentConversation
            ?.last_message?.id,
          messageId
        )
      ) {
        state.currentConversation.last_message =
          updatedMessage;
      }
    }
  )

  .addCase(
    editMessage.rejected,
    (state, action) => {
      console.log(
        "EDIT MESSAGE REDUX ERROR =>",
        action.payload
      );
    }
  )
      
    // ==================================================
    // MARK READ
    // ==================================================

    builder
      .addCase(
        markConversationRead.pending,
        (state) => {
          state.markReadLoading =
            true;

          state.markReadError =
            null;
        }
      )

      .addCase(
        markConversationRead.fulfilled,
        (
          state,
          action
        ) => {
          state.markReadLoading =
            false;

          const {
            conversationId,
            data,
          } =
            action.payload || {};

          if (
            conversationId ===
              undefined ||
            conversationId ===
              null
          ) {
            return;
          }

          const key =
            String(
              conversationId
            );

          state
            .lastReadMessageIdByConversation[
              key
            ] =
            data?.last_read_message_id ??
            null;

          const conversationIndex =
            state.conversations.findIndex(
              (conversation) =>
                sameId(
                  conversation?.id,
                  conversationId
                )
            );

          if (
            conversationIndex !==
            -1
          ) {
            state.conversations[
              conversationIndex
            ].unread_count = 0;
          }
        }
      )

      .addCase(
        markConversationRead.rejected,
        (
          state,
          action
        ) => {
          state.markReadLoading =
            false;

          state.markReadError =
            action.payload ||
            "Failed to mark conversation as read";
        }
      );

    // ==================================================
    // ONLINE STATUS
    // ==================================================

    builder
      .addCase(
        getOnlineStatus.pending,
        (
          state,
          action
        ) => {
          const userId =
            action.meta.arg;

          const key =
            String(userId);

          state.onlineLoading[
            key
          ] = true;

          state.onlineError[
            key
          ] = null;
        }
      )

      .addCase(
        getOnlineStatus.fulfilled,
        (
          state,
          action
        ) => {
          const data =
            action.payload;

          const userId =
            data?.user_id;

          if (
            userId ===
              undefined ||
            userId === null
          ) {
            return;
          }

          const key =
            String(userId);

          state.onlineStatus[
            key
          ] = Boolean(
            data?.is_online
          );

          state.onlineLoading[
            key
          ] = false;

          state.onlineError[
            key
          ] = null;
        }
      )

      .addCase(
        getOnlineStatus.rejected,
        (
          state,
          action
        ) => {
          const userId =
            action.payload
              ?.userId ??
            action.meta.arg;

          const key =
            String(userId);

          state.onlineLoading[
            key
          ] = false;

          state.onlineError[
            key
          ] =
            action.payload
              ?.message ||
            "Failed to get online status";
        }
      )

    .addCase(deleteMessage.fulfilled, (state, action) => {
  const { conversationId, messageId } =
    action.payload || {};

  if (
    conversationId === undefined ||
    conversationId === null ||
    messageId === undefined ||
    messageId === null
  ) {
    return;
  }

  const key = String(conversationId);
  const messages =
    state.messagesByConversation[key];

  if (!Array.isArray(messages)) {
    return;
  }

  const message = messages.find(
    (item) => sameId(item?.id, messageId)
  );

  if (message) {
    message.is_deleted = true;
    message.content = "";
  }
})

// ==================================================
// REACT TO MESSAGE
// ==================================================

builder.addCase(
  reactToMessage.fulfilled,
  (state, action) => {
    const {
      conversationId,
      message,
    } = action.payload || {};

    if (
      conversationId === undefined ||
      conversationId === null ||
      !message
    ) {
      return;
    }

    const key = String(conversationId);

    const messages =
      state.messagesByConversation[key];

    if (!Array.isArray(messages)) {
      return;
    }

    const index =
      messages.findIndex(
        (item) =>
          sameId(
            item?.id,
            message?.id
          )
      );

    if (index === -1) {
      return;
    }

    // API returns the complete updated message
    messages[index] = message;
  }
);


// ==================================================
// REMOVE MESSAGE REACTION
// ==================================================

builder.addCase(
  removeMessageReactionApi.fulfilled,
  (state, action) => {
    const {
      conversationId,
      message,
    } = action.payload || {};

    if (
      conversationId === undefined ||
      conversationId === null ||
      !message
    ) {
      return;
    }

    const key = String(conversationId);

    const messages =
      state.messagesByConversation[key];

    if (!Array.isArray(messages)) {
      return;
    }

    const index =
      messages.findIndex(
        (item) =>
          sameId(
            item?.id,
            message?.id
          )
      );

    if (index === -1) {
      return;
    }

    // API returns the complete updated message
    messages[index] = message;
  }
);

  },
});

// ======================================================
// ACTIONS
// ======================================================

export const {
  setCurrentConversation,
  clearCurrentConversation,

  clearMessages,
  clearChatState,
  clearChatErrors,

  upsertIncomingMessage,
  removeMessageLocally,

  updateMessagesReadStatus,

  markMessageDeleted,

  addMessageReaction,
  removeMessageReaction,
} = chatSlice.actions;

// ======================================================
// SELECTORS
// ======================================================

// ======================================================
// CONVERSATIONS
// ======================================================

export const selectConversations = (
  state
) =>
  state.chat?.conversations ??
  EMPTY_ARRAY;

export const selectConversationsLoading = (
  state
) =>
  Boolean(
    state.chat
      ?.conversationsLoading
  );

export const selectConversationsError = (
  state
) =>
  state.chat?.conversationsError ??
  null;

export const selectCurrentConversation = (
  state
) =>
  state.chat
    ?.currentConversation ??
  null;

// ======================================================
// MESSAGES
// ======================================================

export const selectMessagesByConversation = (
  state,
  conversationId
) =>
  state.chat
    ?.messagesByConversation?.[
      String(conversationId)
    ] ??
  EMPTY_ARRAY;

export const selectMessages = (
  state,
  conversationId
) =>
  state.chat
    ?.messagesByConversation?.[
      String(conversationId)
    ] ??
  EMPTY_ARRAY;

export const selectMessagesLoading = (
  state,
  conversationId
) =>
  Boolean(
    state.chat
      ?.messagesLoadingByConversation?.[
      String(conversationId)
    ]
  );

export const selectMessagesError = (
  state,
  conversationId
) =>
  state.chat
    ?.messagesErrorByConversation?.[
      String(conversationId)
    ] ??
  null;

export const selectMessagesMeta = (
  state,
  conversationId
) =>
  state.chat
    ?.messagesMetaByConversation?.[
      String(conversationId)
    ] ?? {
      total: 0,
      limit: 30,
      offset: 0,
      hasMore: false,
    };

// ======================================================
// SEND MESSAGE
// ======================================================

export const selectSendMessageLoading = (
  state
) =>
  Boolean(
    state.chat
      ?.sendMessageLoading
  );

export const selectSendMessageError = (
  state
) =>
  state.chat?.sendMessageError ??
  null;

// ======================================================
// MARK READ
// ======================================================

export const selectMarkReadLoading = (
  state
) =>
  Boolean(
    state.chat
      ?.markReadLoading
  );

export const selectMarkReadError = (
  state
) =>
  state.chat?.markReadError ??
  null;

// ======================================================
// LAST READ MESSAGE
// ======================================================

export const selectLastReadMessageId = (
  state,
  conversationId
) =>
  state.chat
    ?.lastReadMessageIdByConversation?.[
      String(conversationId)
    ] ?? null;

// ======================================================
// UNREAD COUNT
// ======================================================

export const selectUnreadCount = (
  state,
  conversationId
) => {
  const conversations =
    state.chat?.conversations ??
    EMPTY_ARRAY;

  const conversation =
    conversations.find(
      (item) =>
        sameId(
          item?.id,
          conversationId
        )
    );

  return Number(
    conversation?.unread_count ||
      0
  );
};

// ======================================================
// ONLINE STATUS
// ======================================================

export const selectOnlineStatus = (
  state,
  userId
) =>
  Boolean(
    state.chat
      ?.onlineStatus?.[
      String(userId)
    ]
  );

export const selectOnlineLoading = (
  state,
  userId
) =>
  Boolean(
    state.chat
      ?.onlineLoading?.[
      String(userId)
    ]
  );

export const selectOnlineError = (
  state,
  userId
) =>
  state.chat
    ?.onlineError?.[
      String(userId)
    ] ?? null;

// ======================================================
// DELETE CONVERSATION
// ======================================================

export const selectDeleteConversationLoading =
  (state) =>
    Boolean(
      state.chat
        ?.deleteConversationLoading
    );

export const selectDeleteConversationError =
  (state) =>
    state.chat
      ?.deleteConversationError ??
    null;

// ======================================================
// EXPORT REDUCER
// ======================================================

export default chatSlice.reducer;