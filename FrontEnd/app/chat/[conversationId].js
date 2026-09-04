// // import React, {
// //   useCallback,
// //   useEffect,
// //   useMemo,
// //   useRef,
// //   useState,
// // } from "react";

// // import {
// //   View,
// //   Text,
// //   FlatList,
// //   StyleSheet,
// //   ActivityIndicator,
// // } from "react-native";

// // import {
// //   useDispatch,
// //   useSelector,
// // } from "react-redux";

// // import {
// //   useLocalSearchParams,
// //   useRouter,
// // } from "expo-router";

// // import {
// //   getAccessToken as getStoredAccessToken,
// // } from "../../src/utils/storage";

// // import {
// //   getMessages,
// //   sendMessage,
// //   markConversationRead,
// //   getOnlineStatus,
// //   setCurrentConversation,
// //   clearCurrentConversation,
// //   upsertIncomingMessage,

// //   selectConversations,
// //   selectMessagesByConversation,
// //   selectMessagesLoading,
// //   selectMessagesError,
// //   selectSendMessageLoading,
// //   selectCurrentConversation,
// //   selectOnlineStatus,
// // } from "../../src/redux/chatSlice";

// // import ScreenLayout from "../../src/components/ScreenLayout";

// // import ChatHeader from "../../src/components/chat/ChatHeader";
// // import ChatInput from "../../src/components/chat/ChatInput";
// // import ChatMessageBubble from "../../src/components/chat/ChatMessageBubble";

// // import { Colors } from "../../src/theme/colors";

// // // ======================================================
// // // WEBSOCKET BASE URL
// // // ======================================================

// // const CHAT_WS_BASE_URL =
// //   "ws://32.199.119.31:8000/api/chat/ws";

// // // ======================================================
// // // GET LOGGED-IN USER ID
// // // ======================================================

// // const getUserId = (state) => {
// //   return (
// //     state?.auth?.user?.id ??
// //     state?.auth?.user?.user_id ??
// //     state?.auth?.profile?.id ??
// //     state?.auth?.profile?.user_id ??
// //     state?.auth?.userData?.id ??
// //     state?.auth?.userData?.user_id ??
// //     null
// //   );
// // };

// // // ======================================================
// // // COMPONENT
// // // ======================================================

// // export default function ConversationScreen() {
// //   const router = useRouter();
// //   const dispatch = useDispatch();

// //   const params = useLocalSearchParams();

// //   const conversationId = Number(
// //     params?.conversationId
// //   );

// //   // ====================================================
// //   // AUTH
// //   // ====================================================

// //   const currentUserId = useSelector(getUserId);

// //   // ====================================================
// //   // CHAT STATE
// //   // ====================================================

// //   const conversations = useSelector(
// //     selectConversations
// //   );

// //   const currentConversation = useSelector(
// //     selectCurrentConversation
// //   );

// //   const messages = useSelector((state) =>
// //     selectMessagesByConversation(
// //       state,
// //       conversationId
// //     )
// //   );

// //   const messagesLoading = useSelector(
// //     (state) =>
// //       selectMessagesLoading(
// //         state,
// //         conversationId
// //       )
// //   );

// //   const messagesError = useSelector(
// //     (state) =>
// //       selectMessagesError(
// //         state,
// //         conversationId
// //       )
// //   );

// //   const sending = useSelector(
// //     selectSendMessageLoading
// //   );

// //   // ====================================================
// //   // LOCAL STATE
// //   // ====================================================

// //   const [refreshing, setRefreshing] =
// //     useState(false);

// //   // ====================================================
// //   // WEBSOCKET REF
// //   // ====================================================

// //   const wsRef = useRef(null);

// //   // ====================================================
// //   // FIND CONVERSATION
// //   // ====================================================

// //   const conversation = useMemo(() => {
// //     if (
// //       currentConversation?.id &&
// //       Number(currentConversation.id) ===
// //         Number(conversationId)
// //     ) {
// //       return currentConversation;
// //     }

// //     return (
// //       conversations?.find(
// //         (item) =>
// //           Number(item?.id) ===
// //           Number(conversationId)
// //       ) || null
// //     );
// //   }, [
// //     currentConversation,
// //     conversations,
// //     conversationId,
// //   ]);

// //   // ====================================================
// //   // FIND OTHER PARTICIPANT
// //   // ====================================================

// //   const participant = useMemo(() => {
// //     if (
// //       !Array.isArray(
// //         conversation?.participants
// //       )
// //     ) {
// //       return null;
// //     }

// //     return (
// //       conversation.participants.find(
// //         (user) =>
// //           Number(user?.id) !==
// //           Number(currentUserId)
// //       ) || null
// //     );
// //   }, [
// //     conversation,
// //     currentUserId,
// //   ]);

// //   // ====================================================
// //   // ONLINE STATUS
// //   // ====================================================

// //   const onlineStatus = useSelector(
// //     (state) =>
// //       participant?.id
// //         ? selectOnlineStatus(
// //             state,
// //             participant.id
// //           )
// //         : false
// //   );

// //   // ====================================================
// //   // DEBUG
// //   // ====================================================

// //   useEffect(() => {
// //     console.log(
// //       "================================"
// //     );

// //     console.log(
// //       "CHAT AUTH USER ID =>",
// //       currentUserId
// //     );

// //     console.log(
// //       "CHAT CONVERSATION ID =>",
// //       conversationId
// //     );

// //     console.log(
// //       "CHAT PARTICIPANT ID =>",
// //       participant?.id
// //     );

// //     console.log(
// //       "================================"
// //     );
// //   }, [
// //     currentUserId,
// //     conversationId,
// //     participant?.id,
// //   ]);

// //   // ====================================================
// //   // LOAD MESSAGES
// //   // ====================================================

// //   const loadMessages = useCallback(
// //     async () => {
// //       if (!conversationId) {
// //         console.log(
// //           "GET MESSAGES: INVALID CONVERSATION ID"
// //         );

// //         return;
// //       }

// //       try {
// //         console.log(
// //           "================================"
// //         );

// //         console.log(
// //           "GETTING MESSAGES"
// //         );

// //         console.log(
// //           "CONVERSATION ID =>",
// //           conversationId
// //         );

// //         console.log(
// //           "================================"
// //         );

// //         const response =
// //           await dispatch(
// //             getMessages({
// //               conversationId,
// //               limit: 30,
// //               offset: 0,
// //               append: false,
// //             })
// //           ).unwrap();

// //         console.log(
// //           "GET MESSAGES RESPONSE =>",
// //           response
// //         );
// //       } catch (error) {
// //         console.log(
// //           "GET MESSAGES ERROR =>",
// //           error
// //         );
// //       }
// //     },
// //     [
// //       dispatch,
// //       conversationId,
// //     ]
// //   );

// //   // ====================================================
// //   // SET CURRENT CONVERSATION
// //   // ====================================================

// //   useEffect(() => {
// //     if (!conversationId) {
// //       return;
// //     }

// //     dispatch(
// //       setCurrentConversation(
// //         conversation || null
// //       )
// //     );

// //     return () => {
// //       dispatch(
// //         clearCurrentConversation()
// //       );
// //     };
// //   }, [
// //     dispatch,
// //     conversationId,
// //     conversation,
// //   ]);

// //   // ====================================================
// //   // INITIAL LOAD
// //   // ====================================================

// //   useEffect(() => {
// //     loadMessages();
// //   }, [loadMessages]);

// //   // ====================================================
// //   // GET ONLINE STATUS
// //   // ====================================================

// //   useEffect(() => {
// //     if (!participant?.id) {
// //       return;
// //     }

// //     dispatch(
// //       getOnlineStatus(
// //         participant.id
// //       )
// //     );
// //   }, [
// //     dispatch,
// //     participant?.id,
// //   ]);

// //   // ====================================================
// //   // MARK AS READ
// //   // ====================================================

// //   const markAsRead = useCallback(() => {
// //     if (!conversationId) {
// //       return;
// //     }

// //     dispatch(
// //       markConversationRead(
// //         conversationId
// //       )
// //     )
// //       .unwrap()
// //       .then((response) => {
// //         console.log(
// //           "MARK READ RESPONSE =>",
// //           response
// //         );
// //       })
// //       .catch((error) => {
// //         console.log(
// //           "MARK READ ERROR =>",
// //           error
// //         );
// //       });
// //   }, [
// //     dispatch,
// //     conversationId,
// //   ]);

// //   // ====================================================
// //   // MARK READ ON OPEN
// //   // ====================================================

// //   useEffect(() => {
// //     markAsRead();
// //   }, [markAsRead]);

// //   // ====================================================
// //   // WEBSOCKET
// //   // ====================================================

// //   useEffect(() => {
// //     let ws = null;
// //     let cancelled = false;

// //     const connectWebSocket =
// //       async () => {
// //         try {
// //           if (!conversationId) {
// //             console.log(
// //               "CHAT WS: INVALID CONVERSATION ID"
// //             );

// //             return;
// //           }

// //           console.log(
// //             "================================"
// //           );

// //           console.log(
// //             "CHAT WEBSOCKET CONNECTING"
// //           );

// //           console.log(
// //             "CONVERSATION ID =>",
// //             conversationId
// //           );

// //           console.log(
// //             "================================"
// //           );

// //           // ==================================================
// //           // GET TOKEN FROM SAME STORAGE USED BY API
// //           // ==================================================

// //           const storedToken =
// //             await getStoredAccessToken();

// //           console.log(
// //             "CHAT ACCESS TOKEN EXISTS =>",
// //             Boolean(storedToken)
// //           );

// //           if (!storedToken) {
// //             console.log(
// //               "CHAT WEBSOCKET: ACCESS TOKEN NOT FOUND"
// //             );

// //             return;
// //           }

// //           if (cancelled) {
// //             return;
// //           }

// //           // ==================================================
// //           // WEBSOCKET URL
// //           // ==================================================

// //           const wsUrl =
// //             `${CHAT_WS_BASE_URL}?token=${encodeURIComponent(
// //               storedToken
// //             )}`;

// //           console.log(
// //             "CHAT WS URL =>",
// //             `${CHAT_WS_BASE_URL}?token=***`
// //           );

// //           // ==================================================
// //           // CREATE WEBSOCKET
// //           // ==================================================

// //           ws =
// //             new WebSocket(wsUrl);

// //           wsRef.current = ws;

// //           // ==================================================
// //           // OPEN
// //           // ==================================================

// //           ws.onopen = () => {
// //             console.log(
// //               "================================"
// //             );

// //             console.log(
// //               "CHAT WS OPEN ✅"
// //             );

// //             console.log(
// //               "CONVERSATION ID =>",
// //               conversationId
// //             );

// //             console.log(
// //               "================================"
// //             );
// //           };

// //           // ==================================================
// //           // MESSAGE
// //           // ==================================================

// //           ws.onmessage = (
// //             event
// //           ) => {
// //             try {
// //               console.log(
// //                 "================================"
// //               );

// //               console.log(
// //                 "CHAT WS MESSAGE RECEIVED"
// //               );

// //               console.log(
// //                 "RAW WS DATA =>",
// //                 event?.data
// //               );

// //               const data =
// //                 JSON.parse(
// //                   event.data
// //                 );

// //               console.log(
// //                 "WS EVENT TYPE =>",
// //                 data?.type
// //               );

// //               console.log(
// //                 "WS CONVERSATION ID =>",
// //                 data?.conversation_id
// //               );

// //               console.log(
// //                 "WS MESSAGE =>",
// //                 data?.message
// //               );

// //               // ==============================================
// //               // ONLY MESSAGE EVENTS
// //               // ==============================================

// //               if (
// //                 data?.type !==
// //                   "message" ||
// //                 !data?.message
// //               ) {
// //                 return;
// //               }

// //               // ==============================================
// //               // GET CONVERSATION ID
// //               // ==============================================

// //               const incomingConversationId =
// //                 data?.conversation_id ??
// //                 data?.message
// //                   ?.conversation_id;

// //               if (
// //                 incomingConversationId ===
// //                   undefined ||
// //                 incomingConversationId ===
// //                   null
// //               ) {
// //                 console.log(
// //                   "CHAT WS: NO CONVERSATION ID"
// //                 );

// //                 return;
// //               }

// //               // ==============================================
// //               // DEBUG MESSAGE
// //               // ==============================================

// //               console.log(
// //                 "WS MESSAGE ID =>",
// //                 data?.message?.id
// //               );

// //               console.log(
// //                 "WS MESSAGE CONTENT =>",
// //                 data?.message?.content
// //               );

// //               console.log(
// //                 "WS MESSAGE SENDER =>",
// //                 data?.message?.sender_id
// //               );

// //               console.log(
// //                 "WS MESSAGE CONVERSATION =>",
// //                 incomingConversationId
// //               );

// //               // ==============================================
// //               // ADD MESSAGE TO REDUX
// //               // ==============================================

// //               dispatch(
// //                 upsertIncomingMessage({
// //                   conversationId:
// //                     incomingConversationId,
// //                   message:
// //                     data.message,
// //                 })
// //               );

// //               console.log(
// //                 "WS MESSAGE ADDED TO REDUX ✅"
// //               );

// //               // ==============================================
// //               // CURRENT OPEN CHAT
// //               // ==============================================

// //               if (
// //                 String(
// //                   incomingConversationId
// //                 ) ===
// //                 String(
// //                   conversationId
// //                 )
// //               ) {
// //                 dispatch(
// //                   markConversationRead(
// //                     Number(
// //                       incomingConversationId
// //                     )
// //                   )
// //                 );
// //               }
// //             } catch (error) {
// //               console.log(
// //                 "CHAT WS MESSAGE PARSE ERROR =>",
// //                 error
// //               );
// //             }
// //           };

// //           // ==================================================
// //           // ERROR
// //           // ==================================================

// //           ws.onerror = (
// //             error
// //           ) => {
// //             console.log(
// //               "================================"
// //             );

// //             console.log(
// //               "CHAT WS ERROR ❌"
// //             );

// //             console.log(
// //               "WS ERROR =>",
// //               error
// //             );

// //             console.log(
// //               "================================"
// //             );
// //           };

// //           // ==================================================
// //           // CLOSE
// //           // ==================================================

// //           ws.onclose = (
// //             event
// //           ) => {
// //             console.log(
// //               "================================"
// //             );

// //             console.log(
// //               "CHAT WS CLOSED"
// //             );

// //             console.log(
// //               "WS CLOSE CODE =>",
// //               event?.code
// //             );

// //             console.log(
// //               "WS CLOSE REASON =>",
// //               event?.reason
// //             );

// //             console.log(
// //               "================================"
// //             );

// //             if (
// //               wsRef.current ===
// //               ws
// //             ) {
// //               wsRef.current =
// //                 null;
// //             }
// //           };
// //         } catch (error) {
// //           console.log(
// //             "CHAT WS CONNECTION ERROR =>",
// //             error
// //           );
// //         }
// //       };

// //     connectWebSocket();

// //     // ==================================================
// //     // CLEANUP
// //     // ==================================================

// //     return () => {
// //       cancelled = true;

// //       if (ws) {
// //         console.log(
// //           "CHAT WS CLEANUP - CLOSING CONNECTION"
// //         );

// //         ws.close();
// //         ws = null;
// //       }

// //       wsRef.current =
// //         null;
// //     };
// //   }, [
// //     conversationId,
// //     dispatch,
// //   ]);

// //   // ====================================================
// //   // REFRESH
// //   // ====================================================

// //   const handleRefresh =
// //     useCallback(
// //       async () => {
// //         setRefreshing(true);

// //         try {
// //           await loadMessages();

// //           if (participant?.id) {
// //             await dispatch(
// //               getOnlineStatus(
// //                 participant.id
// //               )
// //             );
// //           }

// //           markAsRead();
// //         } catch (error) {
// //           console.log(
// //             "REFRESH CHAT ERROR =>",
// //             error
// //           );
// //         } finally {
// //           setRefreshing(false);
// //         }
// //       },
// //       [
// //         loadMessages,
// //         participant?.id,
// //         dispatch,
// //         markAsRead,
// //       ]
// //     );

// //   // ====================================================
// //   // SEND MESSAGE
// //   // ====================================================

// //   const handleSend =
// //     useCallback(
// //       async (text) => {
// //         const content =
// //           typeof text ===
// //           "string"
// //             ? text.trim()
// //             : "";

// //         if (!content) {
// //           return;
// //         }

// //         if (!conversationId) {
// //           return;
// //         }

// //         try {
// //           console.log(
// //             "================================"
// //           );

// //           console.log(
// //             "SENDING MESSAGE"
// //           );

// //           console.log(
// //             "CURRENT USER ID =>",
// //             currentUserId
// //           );

// //           console.log(
// //             "CONVERSATION ID =>",
// //             conversationId
// //           );

// //           console.log(
// //             "CONTENT =>",
// //             content
// //           );

// //           console.log(
// //             "================================"
// //           );

// //           const response =
// //             await dispatch(
// //               sendMessage({
// //                 conversationId,
// //                 content,
// //               })
// //             ).unwrap();

// //           console.log(
// //             "SEND MESSAGE RESPONSE =>",
// //             response
// //           );
// //         } catch (error) {
// //           console.log(
// //             "SEND MESSAGE ERROR =>",
// //             error
// //           );
// //         }
// //       },
// //       [
// //         dispatch,
// //         conversationId,
// //         currentUserId,
// //       ]
// //     );

// //   // ====================================================
// //   // BACK
// //   // ====================================================

// //   const handleBack =
// //     useCallback(() => {
// //       router.back();
// //     }, [router]);

// //   // ====================================================
// //   // PROFILE
// //   // ====================================================

// //   const handleProfilePress =
// //     useCallback(() => {
// //       if (!participant?.id) {
// //         return;
// //       }

// //       router.push({
// //         pathname:
// //           "/profile/[userId]",
// //         params: {
// //           userId: String(
// //             participant.id
// //           ),
// //         },
// //       });
// //     }, [
// //       router,
// //       participant?.id,
// //     ]);

// //   // ====================================================
// //   // HEADER
// //   // ====================================================

// //   const header = useMemo(() => {
// //     return (
// //       <ChatHeader
// //         conversation={
// //           conversation
// //         }
// //         participant={
// //           participant
// //         }
// //         isOnline={
// //           onlineStatus
// //         }
// //         onBack={
// //           handleBack
// //         }
// //         onProfilePress={
// //           handleProfilePress
// //         }
// //       />
// //     );
// //   }, [
// //     conversation,
// //     participant,
// //     onlineStatus,
// //     handleBack,
// //     handleProfilePress,
// //   ]);

// //   // ====================================================
// //   // FOOTER
// //   // ====================================================

// //   const footer = useMemo(() => {
// //     return (
// //       <ChatInput
// //         onSend={
// //           handleSend
// //         }
// //         sending={
// //           sending
// //         }
// //       />
// //     );
// //   }, [
// //     handleSend,
// //     sending,
// //   ]);

// //   // ====================================================
// //   // RENDER MESSAGE
// //   // ====================================================

// //   const renderMessage =
// //     useCallback(
// //       ({ item }) => {
// //         const senderId =
// //           item?.sender_id;

// //         const userId =
// //           currentUserId;

// //         const isMine =
// //           senderId != null &&
// //           userId != null &&
// //           Number(senderId) ===
// //             Number(userId);

// //         console.log(
// //           "MESSAGE ID =>",
// //           item?.id
// //         );

// //         console.log(
// //           "MESSAGE =>",
// //           item?.content
// //         );

// //         console.log(
// //           "SENDER ID =>",
// //           senderId
// //         );

// //         console.log(
// //           "CURRENT USER ID =>",
// //           userId
// //         );

// //         console.log(
// //           "IS MINE =>",
// //           isMine
// //         );

// //         return (
// //           <ChatMessageBubble
// //             message={item}
// //             isMine={
// //               isMine
// //             }
// //           />
// //         );
// //       },
// //       [currentUserId]
// //     );

// //   // ====================================================
// //   // KEY
// //   // ====================================================

// //   const keyExtractor =
// //     useCallback(
// //       (item, index) =>
// //         String(
// //           item?.id ??
// //             `${item?.sender_id}-${item?.created_at}-${index}`
// //         ),
// //       []
// //     );

// //   // ====================================================
// //   // LOADING
// //   // ====================================================

// //   if (
// //     messagesLoading &&
// //     (!messages ||
// //       messages.length === 0)
// //   ) {
// //     return (
// //       <ScreenLayout
// //         backgroundColor={
// //           Colors.bgDefault ||
// //           "#000"
// //         }
// //         header={header}
// //         footer={footer}
// //         scroll={false}
// //         keyboardAvoid={
// //           false
// //         }
// //         edges={[
// //           "top",
// //           "bottom",
// //         ]}
// //       >
// //         <View
// //           style={
// //             styles.loadingContainer
// //           }
// //         >
// //           <ActivityIndicator
// //             size="small"
// //             color="#fff"
// //           />
// //         </View>
// //       </ScreenLayout>
// //     );
// //   }

// //   // ====================================================
// //   // ERROR
// //   // ====================================================

// //   if (
// //     messagesError &&
// //     (!messages ||
// //       messages.length === 0)
// //   ) {
// //     return (
// //       <ScreenLayout
// //         backgroundColor={
// //           Colors.bgDefault ||
// //           "#000"
// //         }
// //         header={header}
// //         footer={footer}
// //         scroll={false}
// //         keyboardAvoid={
// //           false
// //         }
// //         edges={[
// //           "top",
// //           "bottom",
// //         ]}
// //       >
// //         <View
// //           style={
// //             styles.errorContainer
// //           }
// //         >
// //           <Text
// //             style={
// //               styles.errorText
// //             }
// //           >
// //             Unable to load messages
// //           </Text>

// //           <Text
// //             style={
// //               styles.retryText
// //             }
// //             onPress={
// //               loadMessages
// //             }
// //           >
// //             Tap to retry
// //           </Text>
// //         </View>
// //       </ScreenLayout>
// //     );
// //   }

// //   // ====================================================
// //   // MAIN UI
// //   // ====================================================

// //   return (
// //     <ScreenLayout
// //       backgroundColor={
// //         Colors.bgDefault ||
// //         "#000"
// //       }
// //       header={header}
// //       footer={footer}
// //       scroll={false}
// //       keyboardAvoid={
// //         false
// //       }
// //       edges={[
// //         "top",
// //         "bottom",
// //       ]}
// //     >
// //       <FlatList
// //         data={
// //           messages || []
// //         }
// //         keyExtractor={
// //           keyExtractor
// //         }
// //         renderItem={
// //           renderMessage
// //         }
// //         style={
// //           styles.list
// //         }
// //         contentContainerStyle={
// //           styles.listContent
// //         }
// //         showsVerticalScrollIndicator={
// //           false
// //         }
// //         inverted={false}
// //         keyboardShouldPersistTaps="handled"
// //         refreshing={
// //           refreshing
// //         }
// //         onRefresh={
// //           handleRefresh
// //         }
// //         removeClippedSubviews={
// //           false
// //         }
// //       />
// //     </ScreenLayout>
// //   );
// // }

// // // ======================================================
// // // STYLES
// // // ======================================================

// // const styles =
// //   StyleSheet.create({
// //     list: {
// //       flex: 1,
// //       width: "100%",
// //     },

// //     listContent: {
// //       paddingTop: 8,
// //       paddingBottom: 10,
// //       flexGrow: 1,
// //     },

// //     loadingContainer: {
// //       flex: 1,
// //       alignItems:
// //         "center",
// //       justifyContent:
// //         "center",
// //     },

// //     errorContainer: {
// //       flex: 1,
// //       alignItems:
// //         "center",
// //       justifyContent:
// //         "center",
// //       paddingHorizontal: 30,
// //     },

// //     errorText: {
// //       color: "#fff",
// //       fontSize: 15,
// //       textAlign:
// //         "center",
// //       marginBottom: 10,
// //     },

// //     retryText: {
// //       color: "#3797F0",
// //       fontSize: 14,
// //       fontWeight:
// //         "600",
// //     },
// //   });

// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";

// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
//   Modal,
//   Pressable,
// } from "react-native";

// import {
//   Ionicons,
// } from "@expo/vector-icons";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import {
//   useLocalSearchParams,
//   useRouter,
// } from "expo-router";

// import {
//   getAccessToken as getStoredAccessToken,
// } from "../../src/utils/storage";

// import {
//   getMessages,
//   sendMessage,
//   markConversationRead,
//   getOnlineStatus,
//   setCurrentConversation,
//   clearCurrentConversation,
//   upsertIncomingMessage,
//   updateMessagesReadStatus,
//   markMessageDeleted,
//   addMessageReaction,
//   removeMessageReaction,
//   deleteMessage,
//   editMessage,
//   reactToMessage,
//   removeMessageReactionApi,

//   selectConversations,
//   selectMessagesByConversation,
//   selectMessagesLoading,
//   selectMessagesError,
//   selectSendMessageLoading,
//   selectCurrentConversation,
//   selectOnlineStatus,
// } from "../../src/redux/chatSlice";

// import ScreenLayout from "../../src/components/ScreenLayout";

// import ChatHeader from "../../src/components/chat/ChatHeader";
// import ChatInput from "../../src/components/chat/ChatInput";
// import ChatMessageBubble from "../../src/components/chat/ChatMessageBubble";

// import { Colors } from "../../src/theme/colors";

// // ======================================================
// // WEBSOCKET
// // ======================================================

// const CHAT_WS_BASE_URL =
//   "ws://32.199.119.31:8000/api/chat/ws";

// // ======================================================
// // GET LOGGED-IN USER ID
// // ======================================================

// const getUserId = (state) => {
//   return (
//     state?.auth?.user?.id ??
//     state?.auth?.user?.user_id ??
//     state?.auth?.profile?.id ??
//     state?.auth?.profile?.user_id ??
//     state?.auth?.userData?.id ??
//     state?.auth?.userData?.user_id ??
//     null
//   );
// };

// // ======================================================
// // COMPONENT
// // ======================================================

// export default function ConversationScreen() {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const params = useLocalSearchParams();

//   const conversationId = Number(
//     params?.conversationId
//   );

//   // ====================================================
//   // AUTH
//   // ====================================================

//   const currentUserId = useSelector(getUserId);

//   // ====================================================
//   // CHAT STATE
//   // ====================================================

//   const conversations = useSelector(
//     selectConversations
//   );

//   const currentConversation = useSelector(
//     selectCurrentConversation
//   );

//   const messages = useSelector((state) =>
//     selectMessagesByConversation(
//       state,
//       conversationId
//     )
//   );

//   const messagesLoading = useSelector(
//     (state) =>
//       selectMessagesLoading(
//         state,
//         conversationId
//       )
//   );

//   const messagesError = useSelector(
//     (state) =>
//       selectMessagesError(
//         state,
//         conversationId
//       )
//   );

//   const sending = useSelector(
//     selectSendMessageLoading
//   );

//   // ====================================================
//   // LOCAL STATE
//   // ====================================================

//   const [refreshing, setRefreshing] =
//     useState(false);

//   const [typingUserId, setTypingUserId] =
//     useState(null);

//   const [realtimeOnline, setRealtimeOnline] =
//     useState(false);

//     const [editingMessage, setEditingMessage] =
//   useState(null);

//   const [messageOptionsVisible, setMessageOptionsVisible] =
//   useState(false);

// const [selectedMessage, setSelectedMessage] =
//   useState(null);

//    const [
//     deleteConfirmVisible,
//     setDeleteConfirmVisible,
//   ] = useState(false);

//   // ====================================================
//   // REFS
//   // ====================================================

//   const wsRef = useRef(null);

//   const typingTimeoutRef =
//     useRef(null);

//   // ====================================================
//   // FIND CONVERSATION
//   // ====================================================

//   const conversation = useMemo(() => {
//     if (
//       currentConversation?.id &&
//       Number(currentConversation.id) ===
//         Number(conversationId)
//     ) {
//       return currentConversation;
//     }

//     return (
//       conversations?.find(
//         (item) =>
//           Number(item?.id) ===
//           Number(conversationId)
//       ) || null
//     );
//   }, [
//     currentConversation,
//     conversations,
//     conversationId,
//   ]);

//   // ====================================================
//   // FIND OTHER PARTICIPANT
//   // ====================================================

//   const participant = useMemo(() => {
//     if (
//       !Array.isArray(
//         conversation?.participants
//       )
//     ) {
//       return null;
//     }

//     return (
//       conversation.participants.find(
//         (user) =>
//           Number(user?.id) !==
//           Number(currentUserId)
//       ) || null
//     );
//   }, [
//     conversation,
//     currentUserId,
//   ]);

//   // ====================================================
//   // ONLINE STATUS
//   // ====================================================

//   const onlineStatus = useSelector(
//     (state) =>
//       participant?.id
//         ? selectOnlineStatus(
//             state,
//             participant.id
//           )
//         : false
//   );

//   // ====================================================
//   // DEBUG
//   // ====================================================

//   useEffect(() => {
//     console.log(
//       "================================"
//     );

//     console.log(
//       "CHAT AUTH USER ID =>",
//       currentUserId
//     );

//     console.log(
//       "CHAT CONVERSATION ID =>",
//       conversationId
//     );

//     console.log(
//       "CHAT PARTICIPANT ID =>",
//       participant?.id
//     );

//     console.log(
//       "================================"
//     );
//   }, [
//     currentUserId,
//     conversationId,
//     participant?.id,
//   ]);

//   // ====================================================
//   // LOAD MESSAGES
//   // ====================================================

//   const loadMessages = useCallback(
//     async () => {
//       if (!conversationId) {
//         console.log(
//           "GET MESSAGES: INVALID CONVERSATION ID"
//         );

//         return;
//       }

//       try {
//         console.log(
//           "================================"
//         );

//         console.log(
//           "GETTING MESSAGES"
//         );

//         console.log(
//           "CONVERSATION ID =>",
//           conversationId
//         );

//         console.log(
//           "================================"
//         );

//         const response =
//           await dispatch(
//             getMessages({
//               conversationId,
//               limit: 30,
//               offset: 0,
//               append: false,
//             })
//           ).unwrap();

//         console.log(
//           "GET MESSAGES RESPONSE =>",
//           response
//         );
//       } catch (error) {
//         console.log(
//           "GET MESSAGES ERROR =>",
//           error
//         );
//       }
//     },
//     [
//       dispatch,
//       conversationId,
//     ]
//   );

//   // ====================================================
//   // SET CURRENT CONVERSATION
//   // ====================================================

//   useEffect(() => {
//     if (!conversationId) {
//       return;
//     }

//     dispatch(
//       setCurrentConversation(
//         conversation || null
//       )
//     );

//     return () => {
//       dispatch(
//         clearCurrentConversation()
//       );
//     };
//   }, [
//     dispatch,
//     conversationId,
//     conversation,
//   ]);

//   // ====================================================
//   // INITIAL LOAD
//   // ====================================================

//   useEffect(() => {
//     loadMessages();
//   }, [loadMessages]);

//   // ====================================================
//   // GET INITIAL ONLINE STATUS
//   // ====================================================

//   useEffect(() => {
//     if (!participant?.id) {
//       return;
//     }

//     dispatch(
//       getOnlineStatus(
//         participant.id
//       )
//     );
//   }, [
//     dispatch,
//     participant?.id,
//   ]);

//   // ====================================================
//   // MARK AS READ
//   // ====================================================

//   const markAsRead = useCallback(() => {
//     if (!conversationId) {
//       return;
//     }

//     dispatch(
//       markConversationRead(
//         conversationId
//       )
//     )
//       .unwrap()
//       .then((response) => {
//         console.log(
//           "MARK READ RESPONSE =>",
//           response
//         );
//       })
//       .catch((error) => {
//         console.log(
//           "MARK READ ERROR =>",
//           error
//         );
//       });
//   }, [
//     dispatch,
//     conversationId,
//   ]);

//   // ====================================================
//   // MARK READ ON OPEN
//   // ====================================================

//   useEffect(() => {
//     markAsRead();
//   }, [markAsRead]);

//   // ====================================================
//   // SEND TYPING EVENT
//   // ====================================================

//   const handleTyping = useCallback(() => {
//     const ws = wsRef.current;

//     if (
//       !ws ||
//       ws.readyState !== WebSocket.OPEN
//     ) {
//       return;
//     }

//     try {
//       ws.send(
//         JSON.stringify({
//           type: "typing",
//           conversation_id:
//             Number(conversationId),
//         })
//       );

//       console.log(
//         "CHAT TYPING EVENT SENT"
//       );
//     } catch (error) {
//       console.log(
//         "CHAT TYPING ERROR =>",
//         error
//       );
//     }
//   }, [conversationId]);

//   // ====================================================
//   // WEBSOCKET
//   // ====================================================

//   useEffect(() => {
//     let ws = null;
//     let cancelled = false;

//     const connectWebSocket =
//       async () => {
//         try {
//           if (!conversationId) {
//             console.log(
//               "CHAT WS: INVALID CONVERSATION ID"
//             );

//             return;
//           }

//           console.log(
//             "================================"
//           );

//           console.log(
//             "CHAT WEBSOCKET CONNECTING"
//           );

//           console.log(
//             "CONVERSATION ID =>",
//             conversationId
//           );

//           console.log(
//             "================================"
//           );

//           // ==========================================
//           // TOKEN
//           // ==========================================

//           const storedToken =
//             await getStoredAccessToken();

//           console.log(
//             "CHAT ACCESS TOKEN EXISTS =>",
//             Boolean(storedToken)
//           );

//           if (!storedToken) {
//             console.log(
//               "CHAT WEBSOCKET: ACCESS TOKEN NOT FOUND"
//             );

//             return;
//           }

//           if (cancelled) {
//             return;
//           }

//           // ==========================================
//           // URL
//           // ==========================================

//           const wsUrl =
//             `${CHAT_WS_BASE_URL}?token=${encodeURIComponent(
//               storedToken
//             )}`;

//           console.log(
//             "CHAT WS URL =>",
//             `${CHAT_WS_BASE_URL}?token=***`
//           );

//           // ==========================================
//           // CONNECT
//           // ==========================================

//           ws =
//             new WebSocket(wsUrl);

//           wsRef.current = ws;

//           // ==========================================
//           // OPEN
//           // ==========================================

//           ws.onopen = () => {
//             console.log(
//               "================================"
//             );

//             console.log(
//               "CHAT WS OPEN ✅"
//             );

//             console.log(
//               "CONVERSATION ID =>",
//               conversationId
//             );

//             console.log(
//               "================================"
//             );

//             // Ping backend
//             try {
//               ws.send(
//                 JSON.stringify({
//                   type: "ping",
//                 })
//               );

//               console.log(
//                 "CHAT WS PING SENT"
//               );
//             } catch (error) {
//               console.log(
//                 "CHAT WS PING ERROR =>",
//                 error
//               );
//             }
//           };

//           // ==========================================
//           // ALL WEBSOCKET EVENTS
//           // ==========================================

//           ws.onmessage = (
//             event
//           ) => {
//             try {
//               const data =
//                 JSON.parse(
//                   event?.data
//                 );

//               console.log(
//                 "================================"
//               );

//               console.log(
//                 "CHAT WS EVENT =>",
//                 data
//               );

//               console.log(
//                 "WS EVENT TYPE =>",
//                 data?.type
//               );

//               console.log(
//                 "================================"
//               );

//               // ======================================
//               // PONG
//               // ======================================

//               if (
//                 data?.type === "pong"
//               ) {
//                 console.log(
//                   "CHAT WS PONG ✅"
//                 );

//                 return;
//               }

//               // ======================================
//               // ERROR
//               // ======================================

//               if (
//                 data?.type === "error"
//               ) {
//                 console.log(
//                   "CHAT WS BACKEND ERROR =>",
//                   data?.detail
//                 );

//                 return;
//               }

//               // ======================================
//               // TYPING
//               // ======================================

//               if (
//                 data?.type === "typing"
//               ) {
//                 if (
//                   String(
//                     data?.conversation_id
//                   ) !==
//                   String(
//                     conversationId
//                   )
//                 ) {
//                   return;
//                 }

//                 if (
//                   Number(
//                     data?.user_id
//                   ) ===
//                   Number(
//                     currentUserId
//                   )
//                 ) {
//                   return;
//                 }

//                 setTypingUserId(
//                   data?.user_id
//                 );

//                 if (
//                   typingTimeoutRef.current
//                 ) {
//                   clearTimeout(
//                     typingTimeoutRef.current
//                   );
//                 }

//                 typingTimeoutRef.current =
//                   setTimeout(() => {
//                     setTypingUserId(
//                       null
//                     );
//                   }, 2500);

//                 return;
//               }

//               // ======================================
//               // PRESENCE
//               // ======================================

//               if (
//                 data?.type ===
//                 "presence"
//               ) {
//                 if (
//                   Number(
//                     data?.user_id
//                   ) ===
//                   Number(
//                     participant?.id
//                   )
//                 ) {
//                   setRealtimeOnline(
//                     data?.status ===
//                       "online"
//                   );
//                 }

//                 return;
//               }

//               // ======================================
//               // MESSAGE
//               // ======================================

//               if (
//                 data?.type ===
//                   "message" &&
//                 data?.message
//               ) {
//                 const incomingConversationId =
//                   data?.conversation_id ??
//                   data?.message
//                     ?.conversation_id;

//                 if (
//                   incomingConversationId ===
//                     undefined ||
//                   incomingConversationId ===
//                     null
//                 ) {
//                   return;
//                 }

//                 dispatch(
//                   upsertIncomingMessage({
//                     conversationId:
//                       incomingConversationId,
//                     message:
//                       data.message,
//                   })
//                 );

//                 console.log(
//                   "WS MESSAGE ADDED TO REDUX ✅"
//                 );

//                 // Only mark incoming messages
//                 // from the other user as read.
//                 if (
//                   Number(
//                     data.message
//                       ?.sender_id
//                   ) !==
//                   Number(
//                     currentUserId
//                   ) &&
//                   String(
//                     incomingConversationId
//                   ) ===
//                     String(
//                       conversationId
//                     )
//                 ) {
//                   dispatch(
//                     markConversationRead(
//                       Number(
//                         incomingConversationId
//                       )
//                     )
//                   );
//                 }

//                 return;
//               }

//               // ======================================
//               // READ / SEEN
//               // ======================================

//               if (
//                 data?.type === "read"
//               ) {
//                 if (
//                   String(
//                     data?.conversation_id
//                   ) !==
//                   String(
//                     conversationId
//                   )
//                 ) {
//                   return;
//                 }

//                 dispatch(
//                   updateMessagesReadStatus({
//                     conversationId:
//                       data.conversation_id,

//                     lastReadMessageId:
//                       data.last_read_message_id,

//                     userId:
//                       data.user_id,
//                   })
//                 );

//                 console.log(
//                   "MESSAGE READ STATUS UPDATED ✅"
//                 );

//                 return;
//               }

//               // ======================================
//               // MESSAGE EDITED
//               // ======================================

//               if (
//                 data?.type ===
//                   "message_edited" &&
//                 data?.message
//               ) {
//                 dispatch(
//                   upsertIncomingMessage({
//                     conversationId:
//                       data.conversation_id,

//                     message:
//                       data.message,
//                   })
//                 );

//                 console.log(
//                   "MESSAGE EDITED EVENT RECEIVED ✅"
//                 );

//                 return;
//               }

//               // ======================================
//               // MESSAGE DELETED
//               // ======================================

//               if (
//                 data?.type ===
//                 "message_deleted"
//               ) {
//                 dispatch(
//                   markMessageDeleted({
//                     conversationId:
//                       data.conversation_id,

//                     messageId:
//                       data.message_id,
//                   })
//                 );

//                 console.log(
//                   "MESSAGE DELETED EVENT RECEIVED ✅"
//                 );

//                 return;
//               }

//               // ======================================
//               // REACTION ADDED
//               // ======================================

//               if (
//                 data?.type ===
//                 "message_reaction"
//               ) {
//                 dispatch(
//                   addMessageReaction({
//                     conversationId:
//                       data.conversation_id,

//                     messageId:
//                       data.message_id,

//                     userId:
//                       data.user_id,

//                     emoji:
//                       data.emoji,
//                   })
//                 );

//                 console.log(
//                   "MESSAGE REACTION RECEIVED ✅"
//                 );

//                 return;
//               }

//               // ======================================
//               // REACTION REMOVED
//               // ======================================

//               if (
//                 data?.type ===
//                 "message_reaction_removed"
//               ) {
//                 dispatch(
//                   removeMessageReaction({
//                     conversationId:
//                       data.conversation_id,

//                     messageId:
//                       data.message_id,

//                     userId:
//                       data.user_id,
//                   })
//                 );

//                 console.log(
//                   "MESSAGE REACTION REMOVED ✅"
//                 );

//                 return;
//               }
//             } catch (error) {
//               console.log(
//                 "CHAT WS MESSAGE PARSE ERROR =>",
//                 error
//               );
//             }
//           };

//           // ==========================================
//           // ERROR
//           // ==========================================

//           ws.onerror = (
//             error
//           ) => {
//             console.log(
//               "================================"
//             );

//             console.log(
//               "CHAT WS ERROR ❌"
//             );

//             console.log(
//               "WS ERROR =>",
//               error
//             );

//             console.log(
//               "================================"
//             );
//           };

//           // ==========================================
//           // CLOSE
//           // ==========================================

//           ws.onclose = (
//             event
//           ) => {
//             console.log(
//               "================================"
//             );

//             console.log(
//               "CHAT WS CLOSED"
//             );

//             console.log(
//               "WS CLOSE CODE =>",
//               event?.code
//             );

//             console.log(
//               "WS CLOSE REASON =>",
//               event?.reason
//             );

//             console.log(
//               "================================"
//             );

//             if (
//               wsRef.current ===
//               ws
//             ) {
//               wsRef.current =
//                 null;
//             }
//           };
//         } catch (error) {
//           console.log(
//             "CHAT WS CONNECTION ERROR =>",
//             error
//           );
//         }
//       };

//     connectWebSocket();

//     // ================================================
//     // CLEANUP
//     // ================================================

//     return () => {
//       cancelled = true;

//       if (
//         typingTimeoutRef.current
//       ) {
//         clearTimeout(
//           typingTimeoutRef.current
//         );

//         typingTimeoutRef.current =
//           null;
//       }

//       setTypingUserId(null);

//       setRealtimeOnline(false);

//       if (ws) {
//         console.log(
//           "CHAT WS CLEANUP - CLOSING CONNECTION"
//         );

//         ws.close();
//         ws = null;
//       }

//       wsRef.current =
//         null;
//     };
//   }, [
//     conversationId,
//     currentUserId,
//     participant?.id,
//     dispatch,
//   ]);

//   // ====================================================
//   // REFRESH
//   // ====================================================

//   const handleRefresh =
//     useCallback(
//       async () => {
//         setRefreshing(true);

//         try {
//           await loadMessages();

//           if (participant?.id) {
//             await dispatch(
//               getOnlineStatus(
//                 participant.id
//               )
//             );
//           }

//           markAsRead();
//         } catch (error) {
//           console.log(
//             "REFRESH CHAT ERROR =>",
//             error
//           );
//         } finally {
//           setRefreshing(false);
//         }
//       },
//       [
//         loadMessages,
//         participant?.id,
//         dispatch,
//         markAsRead,
//       ]
//     );

//   // ====================================================
//   // SEND MESSAGE
//   // ====================================================

//   const handleSend =
//     useCallback(
//       async (text) => {
//         const content =
//           typeof text === "string"
//             ? text.trim()
//             : "";

//         if (!content) {
//           return;
//         }

//         if (!conversationId) {
//           return;
//         }

//         try {
//           console.log(
//             "================================"
//           );

//           console.log(
//             "SENDING MESSAGE"
//           );

//           console.log(
//             "CURRENT USER ID =>",
//             currentUserId
//           );

//           console.log(
//             "CONVERSATION ID =>",
//             conversationId
//           );

//           console.log(
//             "CONTENT =>",
//             content
//           );

//           console.log(
//             "================================"
//           );

//           const response =
//             await dispatch(
//               sendMessage({
//                 conversationId,
//                 content,
//               })
//             ).unwrap();

//           console.log(
//             "SEND MESSAGE RESPONSE =>",
//             response
//           );
//         } catch (error) {
//           console.log(
//             "SEND MESSAGE ERROR =>",
//             error
//           );
//         }
//       },
//       [
//         dispatch,
//         conversationId,
//         currentUserId,
//       ]
//     );

//     const handleEditMessage =
//   useCallback(
//     async (text) => {
//       if (
//         !editingMessage?.id ||
//         !text?.trim()
//       ) {
//         return;
//       }

//       try {
//         await dispatch(
//           editMessage({
//             messageId:
//               editingMessage.id,
//             content: text.trim(),
//           })
//         ).unwrap();

//         setEditingMessage(null);

//         console.log(
//           "MESSAGE EDITED SUCCESSFULLY ✅"
//         );
//       } catch (error) {
//         console.log(
//           "EDIT MESSAGE ERROR =>",
//           error
//         );
//       }
//     },
//     [
//       dispatch,
//       editingMessage,
//     ]
//   );

//   // ====================================================
//   // BACK
//   // ====================================================

//   const handleBack =
//     useCallback(() => {
//       router.back();
//     }, [router]);

//   // ====================================================
//   // PROFILE
//   // ====================================================

//   const handleProfilePress =
//     useCallback(() => {
//       if (!participant?.id) {
//         return;
//       }

//       router.push({
//         pathname:
//           "/profile/[userId]",

//         params: {
//           userId: String(
//             participant.id
//           ),
//         },
//       });
//     }, [
//       router,
//       participant?.id,
//     ]);

//   // ====================================================
//   // TYPING LABEL
//   // ====================================================

//   const typingLabel = useMemo(() => {
//     if (!typingUserId) {
//       return "";
//     }

//     return (
//       participant?.username ||
//       participant?.name ||
//       "User"
//     );
//   }, [
//     typingUserId,
//     participant,
//   ]);

//   // ====================================================
//   // HEADER
//   // ====================================================

//   const header = useMemo(() => {
//     return (
//       <ChatHeader
//         conversation={
//           conversation
//         }
//         participant={
//           participant
//         }
//         isOnline={
//           realtimeOnline ||
//           onlineStatus
//         }
//         onBack={
//           handleBack
//         }
//         onProfilePress={
//           handleProfilePress
//         }
//       />
//     );
//   }, [
//     conversation,
//     participant,
//     realtimeOnline,
//     onlineStatus,
//     handleBack,
//     handleProfilePress,
//   ]);

//   // ====================================================
//   // FOOTER
//   // ====================================================

//   const footer = useMemo(() => {
//     return (
//       <ChatInput
//   onSend={
//     editingMessage
//       ? handleEditMessage
//       : handleSend
//   }
//   onTyping={handleTyping}
//   sending={sending}
//   editingMessage={editingMessage}
//   onCancelEdit={() => {
//     setEditingMessage(null);
//   }}
// />
//     );
//   }, [
//     handleSend,
//     handleEditMessage,
//     handleTyping,
//     sending,
//     editMessage,
//   ]);

// //   const handleDeleteMessage = useCallback(
// //   (message) => {
// //     if (!message?.id || !conversationId) {
// //       return;
// //     }

// //     Alert.alert(
// //       "Delete message",
// //       "Are you sure you want to delete this message?",
// //       [
// //         {
// //           text: "Cancel",
// //           style: "cancel",
// //         },
// //         {
// //           text: "Delete",
// //           style: "destructive",
// //           onPress: () => {
// //             dispatch(
// //               deleteMessage({
// //                 conversationId,
// //                 messageId: message.id,
// //               })
// //             );
// //           },
// //         },
// //       ]
// //     );
// //   },
// //   [dispatch, conversationId]
// // );

//   // ====================================================
//   // RENDER MESSAGE
//   // ====================================================

//   const handleMessageLongPress = useCallback(
//   (message) => {
//     if (!message?.id || !conversationId) {
//       return;
//     }

//     setSelectedMessage(message);
//   setMessageOptionsVisible(true);
//   },
//   [dispatch, conversationId]
// );

// // ====================================================
// // REACT TO MESSAGE
// // ====================================================

// const handleReactToMessage = useCallback(
//   async (message, emoji) => {
//     if (
//       !message?.id ||
//       !conversationId ||
//       !emoji
//     ) {
//       return;
//     }

//     try {
//       console.log(
//         "========== REACT TO MESSAGE =========="
//       );

//       console.log(
//         "MESSAGE ID =>",
//         message.id
//       );

//       console.log(
//         "EMOJI =>",
//         emoji
//       );

//       await dispatch(
//         reactToMessage({
//           conversationId,
//           messageId: message.id,
//           emoji,
//         })
//       ).unwrap();

//       console.log(
//         "MESSAGE REACTION SUCCESSFUL ✅"
//       );
//     } catch (error) {
//       console.log(
//         "MESSAGE REACTION ERROR =>",
//         error
//       );
//     }
//   },
//   [
//     dispatch,
//     conversationId,
//   ]
// );

// // ====================================================
// // REMOVE MESSAGE REACTION
// // ====================================================

// const handleRemoveMessageReaction =
//   useCallback(
//     async (message) => {
//       if (
//         !message?.id ||
//         !conversationId
//       ) {
//         return;
//       }

//       try {
//         console.log(
//           "========== REMOVE MESSAGE REACTION =========="
//         );

//         console.log(
//           "MESSAGE ID =>",
//           message.id
//         );

//         await dispatch(
//           removeMessageReactionApi({
//             conversationId,
//             messageId: message.id,
//           })
//         ).unwrap();

//         console.log(
//           "MESSAGE REACTION REMOVED SUCCESSFULLY ✅"
//         );
//       } catch (error) {
//         console.log(
//           "REMOVE MESSAGE REACTION ERROR =>",
//           error
//         );
//       }
//     },
//     [
//       dispatch,
//       conversationId,
//     ]
//   );

//   const renderMessage =
//     useCallback(
//       ({ item }) => {
//         const senderId =
//           item?.sender_id;

//         const userId =
//           currentUserId;

//         const isMine =
//           senderId != null &&
//           userId != null &&
//           Number(senderId) ===
//             Number(userId);

//         return (
//           <ChatMessageBubble
//             message={item}
//             isMine={
//               isMine
//             }
//             onLongPress={handleMessageLongPress}
//             onReact={handleReactToMessage}
//             onRemoveReaction={
//               handleRemoveMessageReaction
//             }
//           />
//         );
//       },
//       [currentUserId, handleMessageLongPress, handleReactToMessage, handleRemoveMessageReaction]
//     );

//   // ====================================================
//   // KEY
//   // ====================================================

//   const keyExtractor =
//     useCallback(
//       (item, index) =>
//         String(
//           item?.id ??
//             `${item?.sender_id}-${item?.created_at}-${index}`
//         ),
//       []
//     );

//   // ====================================================
//   // LOADING
//   // ====================================================

//   if (
//     messagesLoading &&
//     (!messages ||
//       messages.length === 0)
//   ) {
//     return (
//       <ScreenLayout
//         backgroundColor={
//           Colors.bgDefault ||
//           "#000"
//         }
//         header={header}
//         footer={footer}
//         scroll={false}
//         keyboardAvoid={false}
//         edges={[
//           "top",
//           "bottom",
//         ]}
//       >
//         <View
//           style={
//             styles.loadingContainer
//           }
//         >
//           <ActivityIndicator
//             size="small"
//             color="#fff"
//           />
//         </View>
//       </ScreenLayout>
//     );
//   }

//   // ====================================================
//   // ERROR
//   // ====================================================

//   if (
//     messagesError &&
//     (!messages ||
//       messages.length === 0)
//   ) {
//     return (
//       <ScreenLayout
//         backgroundColor={
//           Colors.bgDefault ||
//           "#000"
//         }
//         header={header}
//         footer={footer}
//         scroll={false}
//         keyboardAvoid={false}
//         edges={[
//           "top",
//           "bottom",
//         ]}
//       >
//         <View
//           style={
//             styles.errorContainer
//           }
//         >
//           <Text
//             style={
//               styles.errorText
//             }
//           >
//             Unable to load messages
//           </Text>

//           <Text
//             style={
//               styles.retryText
//             }
//             onPress={
//               loadMessages
//             }
//           >
//             Tap to retry
//           </Text>
//         </View>
//       </ScreenLayout>
//     );
//   }

//   // ====================================================
//   // MAIN UI
//   // ====================================================

//   return (
//     <ScreenLayout
//       backgroundColor={
//         Colors.bgDefault ||
//         "#000"
//       }
//       header={header}
//       footer={footer}
//       scroll={false}
//       keyboardAvoid={false}
//       edges={[
//         "top",
//         "bottom",
//       ]}
//     >
//       <View style={styles.chatBody}>
//         <FlatList
//           data={
//             messages || []
//           }
//           keyExtractor={
//             keyExtractor
//           }
//           renderItem={
//             renderMessage
//           }
//           style={
//             styles.list
//           }
//           contentContainerStyle={
//             styles.listContent
//           }
//           showsVerticalScrollIndicator={
//             false
//           }
//           inverted={false}
//           keyboardShouldPersistTaps="handled"
//           refreshing={
//             refreshing
//           }
//           onRefresh={
//             handleRefresh
//           }
//           removeClippedSubviews={
//             false
//           }
//         />

//         {typingUserId ? (
//           <View
//             style={
//               styles.typingContainer
//             }
//           >
//             <Text
//               style={
//                 styles.typingText
//               }
//             >
//               {typingLabel} is typing...
//             </Text>
//           </View>
//         ) : null}
//       </View>
//     </ScreenLayout>
//   );
// }

// // ======================================================
// // STYLES
// // ======================================================

// const styles =
//   StyleSheet.create({
//     chatBody: {
//       flex: 1,
//       width: "100%",
//     },

//     list: {
//       flex: 1,
//       width: "100%",
//     },

//     listContent: {
//       paddingTop: 8,
//       paddingBottom: 10,
//       flexGrow: 1,
//     },

//     typingContainer: {
//       paddingHorizontal: 16,
//       paddingVertical: 6,
//       backgroundColor: "#000",
//     },

//     typingText: {
//       color: "#8e8e8e",
//       fontSize: 12,
//       fontStyle: "italic",
//     },

//     loadingContainer: {
//       flex: 1,
//       alignItems: "center",
//       justifyContent: "center",
//     },

//     errorContainer: {
//       flex: 1,
//       alignItems: "center",
//       justifyContent: "center",
//       paddingHorizontal: 30,
//     },

//     errorText: {
//       color: "#fff",
//       fontSize: 15,
//       textAlign: "center",
//       marginBottom: 10,
//     },

//     retryText: {
//       color: "#3797F0",
//       fontSize: 14,
//       fontWeight: "600",
//     },
//   });

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  getAccessToken as getStoredAccessToken,
} from "../../src/utils/storage";

import {
  getMessages,
  sendMessage,
  markConversationRead,
  getOnlineStatus,
  setCurrentConversation,
  clearCurrentConversation,
  upsertIncomingMessage,
  updateMessagesReadStatus,
  markMessageDeleted,
  addMessageReaction,
  removeMessageReaction,
  deleteMessage,
  editMessage,
  reactToMessage,
  removeMessageReactionApi,

  selectConversations,
  selectMessagesByConversation,
  selectMessagesLoading,
  selectMessagesError,
  selectSendMessageLoading,
  selectCurrentConversation,
  selectOnlineStatus,
} from "../../src/redux/chatSlice";

import ScreenLayout from "../../src/components/ScreenLayout";

import ChatHeader from "../../src/components/chat/ChatHeader";
import ChatInput from "../../src/components/chat/ChatInput";
import ChatMessageBubble from "../../src/components/chat/ChatMessageBubble";

import { Colors } from "../../src/theme/colors";

// ======================================================
// WEBSOCKET
// ======================================================

const CHAT_WS_BASE_URL =
  "ws://32.199.119.31:8000/api/chat/ws";

// ======================================================
// GET LOGGED-IN USER ID
// ======================================================

const getUserId = (state) => {
  return (
    state?.auth?.user?.id ??
    state?.auth?.user?.user_id ??
    state?.auth?.profile?.id ??
    state?.auth?.profile?.user_id ??
    state?.auth?.userData?.id ??
    state?.auth?.userData?.user_id ??
    null
  );
};

// ======================================================
// COMPONENT
// ======================================================

export default function ConversationScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const params = useLocalSearchParams();

  const conversationId = Number(
    params?.conversationId
  );

  // ====================================================
  // AUTH
  // ====================================================

  const currentUserId = useSelector(getUserId);

  // ====================================================
  // CHAT STATE
  // ====================================================

  const conversations = useSelector(
    selectConversations
  );

  const currentConversation = useSelector(
    selectCurrentConversation
  );

  const messages = useSelector((state) =>
    selectMessagesByConversation(
      state,
      conversationId
    )
  );

  const messagesLoading = useSelector(
    (state) =>
      selectMessagesLoading(
        state,
        conversationId
      )
  );

  const messagesError = useSelector(
    (state) =>
      selectMessagesError(
        state,
        conversationId
      )
  );

  const sending = useSelector(
    selectSendMessageLoading
  );

  // ====================================================
  // LOCAL STATE
  // ====================================================

  const [refreshing, setRefreshing] =
    useState(false);

  const [typingUserId, setTypingUserId] =
    useState(null);

  const [realtimeOnline, setRealtimeOnline] =
    useState(false);

  const [editingMessage, setEditingMessage] =
    useState(null);

  // Message options modal
  const [
    messageOptionsVisible,
    setMessageOptionsVisible,
  ] = useState(false);

  // Selected message
  const [
    selectedMessage,
    setSelectedMessage,
  ] = useState(null);

  // Delete confirmation modal
  const [
    deleteConfirmVisible,
    setDeleteConfirmVisible,
  ] = useState(false);

  // ====================================================
  // REFS
  // ====================================================

  const wsRef = useRef(null);

  const typingTimeoutRef =
    useRef(null);

  // ====================================================
  // FIND CONVERSATION
  // ====================================================

  const conversation = useMemo(() => {
    if (
      currentConversation?.id &&
      Number(currentConversation.id) ===
        Number(conversationId)
    ) {
      return currentConversation;
    }

    return (
      conversations?.find(
        (item) =>
          Number(item?.id) ===
          Number(conversationId)
      ) || null
    );
  }, [
    currentConversation,
    conversations,
    conversationId,
  ]);

  // ====================================================
  // FIND OTHER PARTICIPANT
  // ====================================================

  const participant = useMemo(() => {
    if (
      !Array.isArray(
        conversation?.participants
      )
    ) {
      return null;
    }

    return (
      conversation.participants.find(
        (user) =>
          Number(user?.id) !==
          Number(currentUserId)
      ) || null
    );
  }, [
    conversation,
    currentUserId,
  ]);

  // ====================================================
  // ONLINE STATUS
  // ====================================================

  const onlineStatus = useSelector(
    (state) =>
      participant?.id
        ? selectOnlineStatus(
            state,
            participant.id
          )
        : false
  );

  // ====================================================
  // DEBUG
  // ====================================================

  useEffect(() => {
    console.log(
      "================================"
    );

    console.log(
      "CHAT AUTH USER ID =>",
      currentUserId
    );

    console.log(
      "CHAT CONVERSATION ID =>",
      conversationId
    );

    console.log(
      "CHAT PARTICIPANT ID =>",
      participant?.id
    );

    console.log(
      "================================"
    );
  }, [
    currentUserId,
    conversationId,
    participant?.id,
  ]);

  // ====================================================
  // LOAD MESSAGES
  // ====================================================

  const loadMessages = useCallback(
    async () => {
      if (!conversationId) {
        console.log(
          "GET MESSAGES: INVALID CONVERSATION ID"
        );

        return;
      }

      try {
        console.log(
          "================================"
        );

        console.log(
          "GETTING MESSAGES"
        );

        console.log(
          "CONVERSATION ID =>",
          conversationId
        );

        console.log(
          "================================"
        );

        const response =
          await dispatch(
            getMessages({
              conversationId,
              limit: 30,
              offset: 0,
              append: false,
            })
          ).unwrap();

        console.log(
          "GET MESSAGES RESPONSE =>",
          response
        );
      } catch (error) {
        console.log(
          "GET MESSAGES ERROR =>",
          error
        );
      }
    },
    [
      dispatch,
      conversationId,
    ]
  );

  // ====================================================
  // SET CURRENT CONVERSATION
  // ====================================================

  useEffect(() => {
    if (!conversationId) {
      return;
    }

    dispatch(
      setCurrentConversation(
        conversation || null
      )
    );

    return () => {
      dispatch(
        clearCurrentConversation()
      );
    };
  }, [
    dispatch,
    conversationId,
    conversation,
  ]);

  // ====================================================
  // INITIAL LOAD
  // ====================================================

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // ====================================================
  // GET INITIAL ONLINE STATUS
  // ====================================================

  useEffect(() => {
    if (!participant?.id) {
      return;
    }

    dispatch(
      getOnlineStatus(
        participant.id
      )
    );
  }, [
    dispatch,
    participant?.id,
  ]);

  // ====================================================
  // MARK AS READ
  // ====================================================

  const markAsRead = useCallback(() => {
    if (!conversationId) {
      return;
    }

    dispatch(
      markConversationRead(
        conversationId
      )
    )
      .unwrap()
      .then((response) => {
        console.log(
          "MARK READ RESPONSE =>",
          response
        );
      })
      .catch((error) => {
        console.log(
          "MARK READ ERROR =>",
          error
        );
      });
  }, [
    dispatch,
    conversationId,
  ]);

  // ====================================================
  // MARK READ ON OPEN
  // ====================================================

  useEffect(() => {
    markAsRead();
  }, [markAsRead]);

  // ====================================================
  // SEND TYPING EVENT
  // ====================================================

  const handleTyping = useCallback(() => {
    const ws = wsRef.current;

    if (
      !ws ||
      ws.readyState !== WebSocket.OPEN
    ) {
      return;
    }

    try {
      ws.send(
        JSON.stringify({
          type: "typing",
          conversation_id:
            Number(conversationId),
        })
      );

      console.log(
        "CHAT TYPING EVENT SENT"
      );
    } catch (error) {
      console.log(
        "CHAT TYPING ERROR =>",
        error
      );
    }
  }, [conversationId]);

  // ====================================================
  // WEBSOCKET
  // ====================================================

  useEffect(() => {
    let ws = null;
    let cancelled = false;

    const connectWebSocket =
      async () => {
        try {
          if (!conversationId) {
            console.log(
              "CHAT WS: INVALID CONVERSATION ID"
            );

            return;
          }

          console.log(
            "================================"
          );

          console.log(
            "CHAT WEBSOCKET CONNECTING"
          );

          console.log(
            "CONVERSATION ID =>",
            conversationId
          );

          console.log(
            "================================"
          );

          // ========================================
          // TOKEN
          // ========================================

          const storedToken =
            await getStoredAccessToken();

          console.log(
            "CHAT ACCESS TOKEN EXISTS =>",
            Boolean(storedToken)
          );

          if (!storedToken) {
            console.log(
              "CHAT WEBSOCKET: ACCESS TOKEN NOT FOUND"
            );

            return;
          }

          if (cancelled) {
            return;
          }

          // ========================================
          // URL
          // ========================================

          const wsUrl =
            `${CHAT_WS_BASE_URL}?token=${encodeURIComponent(
              storedToken
            )}`;

          console.log(
            "CHAT WS URL =>",
            `${CHAT_WS_BASE_URL}?token=***`
          );

          // ========================================
          // CONNECT
          // ========================================

          ws =
            new WebSocket(wsUrl);

          wsRef.current = ws;

          // ========================================
          // OPEN
          // ========================================

          ws.onopen = () => {
            console.log(
              "================================"
            );

            console.log(
              "CHAT WS OPEN ✅"
            );

            console.log(
              "CONVERSATION ID =>",
              conversationId
            );

            console.log(
              "================================"
            );

            try {
              ws.send(
                JSON.stringify({
                  type: "ping",
                })
              );

              console.log(
                "CHAT WS PING SENT"
              );
            } catch (error) {
              console.log(
                "CHAT WS PING ERROR =>",
                error
              );
            }
          };

          // ========================================
          // ALL WEBSOCKET EVENTS
          // ========================================

          ws.onmessage = (
            event
          ) => {
            try {
              const data =
                JSON.parse(
                  event?.data
                );

              console.log(
                "================================"
              );

              console.log(
                "CHAT WS EVENT =>",
                data
              );

              console.log(
                "WS EVENT TYPE =>",
                data?.type
              );

              console.log(
                "================================"
              );

              // ====================================
              // PONG
              // ====================================

              if (
                data?.type === "pong"
              ) {
                console.log(
                  "CHAT WS PONG ✅"
                );

                return;
              }

              // ====================================
              // ERROR
              // ====================================

              if (
                data?.type === "error"
              ) {
                console.log(
                  "CHAT WS BACKEND ERROR =>",
                  data?.detail
                );

                return;
              }

              // ====================================
              // TYPING
              // ====================================

              if (
                data?.type === "typing"
              ) {
                if (
                  String(
                    data?.conversation_id
                  ) !==
                  String(
                    conversationId
                  )
                ) {
                  return;
                }

                if (
                  Number(
                    data?.user_id
                  ) ===
                  Number(
                    currentUserId
                  )
                ) {
                  return;
                }

                setTypingUserId(
                  data?.user_id
                );

                if (
                  typingTimeoutRef.current
                ) {
                  clearTimeout(
                    typingTimeoutRef.current
                  );
                }

                typingTimeoutRef.current =
                  setTimeout(() => {
                    setTypingUserId(
                      null
                    );
                  }, 2500);

                return;
              }

              // ====================================
              // PRESENCE
              // ====================================

              if (
                data?.type ===
                "presence"
              ) {
                if (
                  Number(
                    data?.user_id
                  ) ===
                  Number(
                    participant?.id
                  )
                ) {
                  setRealtimeOnline(
                    data?.status ===
                      "online"
                  );
                }

                return;
              }

              // ====================================
              // MESSAGE
              // ====================================

              if (
                data?.type ===
                  "message" &&
                data?.message
              ) {
                const incomingConversationId =
                  data?.conversation_id ??
                  data?.message
                    ?.conversation_id;

                if (
                  incomingConversationId ===
                    undefined ||
                  incomingConversationId ===
                    null
                ) {
                  return;
                }

                dispatch(
                  upsertIncomingMessage({
                    conversationId:
                      incomingConversationId,
                    message:
                      data.message,
                  })
                );

                console.log(
                  "WS MESSAGE ADDED TO REDUX ✅"
                );

                if (
                  Number(
                    data.message
                      ?.sender_id
                  ) !==
                    Number(
                      currentUserId
                    ) &&
                  String(
                    incomingConversationId
                  ) ===
                    String(
                      conversationId
                    )
                ) {
                  dispatch(
                    markConversationRead(
                      Number(
                        incomingConversationId
                      )
                    )
                  );
                }

                return;
              }

              // ====================================
              // READ / SEEN
              // ====================================

              if (
                data?.type === "read"
              ) {
                if (
                  String(
                    data?.conversation_id
                  ) !==
                  String(
                    conversationId
                  )
                ) {
                  return;
                }

                dispatch(
                  updateMessagesReadStatus({
                    conversationId:
                      data.conversation_id,

                    lastReadMessageId:
                      data.last_read_message_id,

                    userId:
                      data.user_id,
                  })
                );

                console.log(
                  "MESSAGE READ STATUS UPDATED ✅"
                );

                return;
              }

              // ====================================
              // MESSAGE EDITED
              // ====================================

              if (
                data?.type ===
                  "message_edited" &&
                data?.message
              ) {
                dispatch(
                  upsertIncomingMessage({
                    conversationId:
                      data.conversation_id,

                    message:
                      data.message,
                  })
                );

                console.log(
                  "MESSAGE EDITED EVENT RECEIVED ✅"
                );

                return;
              }

              // ====================================
              // MESSAGE DELETED
              // ====================================

              if (
                data?.type ===
                "message_deleted"
              ) {
                dispatch(
                  markMessageDeleted({
                    conversationId:
                      data.conversation_id,

                    messageId:
                      data.message_id,
                  })
                );

                console.log(
                  "MESSAGE DELETED EVENT RECEIVED ✅"
                );

                return;
              }

              // ====================================
              // REACTION ADDED
              // ====================================

              if (
                data?.type ===
                "message_reaction"
              ) {
                dispatch(
                  addMessageReaction({
                    conversationId:
                      data.conversation_id,

                    messageId:
                      data.message_id,

                    userId:
                      data.user_id,

                    emoji:
                      data.emoji,
                  })
                );

                console.log(
                  "MESSAGE REACTION RECEIVED ✅"
                );

                return;
              }

              // ====================================
              // REACTION REMOVED
              // ====================================

              if (
                data?.type ===
                "message_reaction_removed"
              ) {
                dispatch(
                  removeMessageReaction({
                    conversationId:
                      data.conversation_id,

                    messageId:
                      data.message_id,

                    userId:
                      data.user_id,
                  })
                );

                console.log(
                  "MESSAGE REACTION REMOVED ✅"
                );

                return;
              }
            } catch (error) {
              console.log(
                "CHAT WS MESSAGE PARSE ERROR =>",
                error
              );
            }
          };

          // ========================================
          // ERROR
          // ========================================

          ws.onerror = (
            error
          ) => {
            console.log(
              "================================"
            );

            console.log(
              "CHAT WS ERROR ❌"
            );

            console.log(
              "WS ERROR =>",
              error
            );

            console.log(
              "================================"
            );
          };

          // ========================================
          // CLOSE
          // ========================================

          ws.onclose = (
            event
          ) => {
            console.log(
              "================================"
            );

            console.log(
              "CHAT WS CLOSED"
            );

            console.log(
              "WS CLOSE CODE =>",
              event?.code
            );

            console.log(
              "WS CLOSE REASON =>",
              event?.reason
            );

            console.log(
              "================================"
            );

            if (
              wsRef.current ===
              ws
            ) {
              wsRef.current =
                null;
            }
          };
        } catch (error) {
          console.log(
            "CHAT WS CONNECTION ERROR =>",
            error
          );
        }
      };

    connectWebSocket();

    // ================================================
    // CLEANUP
    // ================================================

    return () => {
      cancelled = true;

      if (
        typingTimeoutRef.current
      ) {
        clearTimeout(
          typingTimeoutRef.current
        );

        typingTimeoutRef.current =
          null;
      }

      setTypingUserId(null);
      setRealtimeOnline(false);

      if (ws) {
        console.log(
          "CHAT WS CLEANUP - CLOSING CONNECTION"
        );

        ws.close();
        ws = null;
      }

      wsRef.current = null;
    };
  }, [
    conversationId,
    currentUserId,
    participant?.id,
    dispatch,
  ]);

  // ====================================================
  // REFRESH
  // ====================================================

  const handleRefresh =
    useCallback(
      async () => {
        setRefreshing(true);

        try {
          await loadMessages();

          if (participant?.id) {
            await dispatch(
              getOnlineStatus(
                participant.id
              )
            );
          }

          markAsRead();
        } catch (error) {
          console.log(
            "REFRESH CHAT ERROR =>",
            error
          );
        } finally {
          setRefreshing(false);
        }
      },
      [
        loadMessages,
        participant?.id,
        dispatch,
        markAsRead,
      ]
    );

  // ====================================================
  // SEND MESSAGE
  // ====================================================

  const handleSend =
    useCallback(
      async (text) => {
        const content =
          typeof text === "string"
            ? text.trim()
            : "";

        if (!content) {
          return;
        }

        if (!conversationId) {
          return;
        }

        try {
          console.log(
            "================================"
          );

          console.log(
            "SENDING MESSAGE"
          );

          console.log(
            "CURRENT USER ID =>",
            currentUserId
          );

          console.log(
            "CONVERSATION ID =>",
            conversationId
          );

          console.log(
            "CONTENT =>",
            content
          );

          console.log(
            "================================"
          );

          const response =
            await dispatch(
              sendMessage({
                conversationId,
                content,
              })
            ).unwrap();

          console.log(
            "SEND MESSAGE RESPONSE =>",
            response
          );
        } catch (error) {
          console.log(
            "SEND MESSAGE ERROR =>",
            error
          );
        }
      },
      [
        dispatch,
        conversationId,
        currentUserId,
      ]
    );

  // ====================================================
  // EDIT MESSAGE
  // ====================================================

  const handleEditMessage =
    useCallback(
      async (text) => {
        if (
          !editingMessage?.id ||
          !text?.trim()
        ) {
          return;
        }

        try {
          await dispatch(
            editMessage({
              messageId:
                editingMessage.id,
              content:
                text.trim(),
            })
          ).unwrap();

          setEditingMessage(null);

          console.log(
            "MESSAGE EDITED SUCCESSFULLY ✅"
          );
        } catch (error) {
          console.log(
            "EDIT MESSAGE ERROR =>",
            error
          );
        }
      },
      [
        dispatch,
        editingMessage,
      ]
    );

  // ====================================================
  // BACK
  // ====================================================

  const handleBack =
    useCallback(() => {
      router.back();
    }, [router]);

  // ====================================================
  // PROFILE
  // ====================================================

  const handleProfilePress =
    useCallback(() => {
      if (!participant?.id) {
        return;
      }

      router.push({
        pathname:
          "/profile/[userId]",

        params: {
          userId: String(
            participant.id
          ),
        },
      });
    }, [
      router,
      participant?.id,
    ]);

  // ====================================================
  // MESSAGE LONG PRESS
  // ====================================================

  const handleMessageLongPress =
    useCallback(
      (message) => {
        if (
          !message?.id ||
          !conversationId
        ) {
          return;
        }

        setSelectedMessage(
          message
        );

        setMessageOptionsVisible(
          true
        );
      },
      [conversationId]
    );

  // ====================================================
  // EDIT SELECTED MESSAGE
  // ====================================================

  const handleEditSelectedMessage =
    useCallback(() => {
      if (!selectedMessage) {
        return;
      }

      setMessageOptionsVisible(
        false
      );

      setEditingMessage(
        selectedMessage
      );

      setSelectedMessage(null);
    }, [selectedMessage]);

  // ====================================================
  // OPEN DELETE CONFIRMATION
  // ====================================================

  const handleDeletePress =
    useCallback(() => {
      if (!selectedMessage) {
        return;
      }

      setMessageOptionsVisible(
        false
      );

      setDeleteConfirmVisible(
        true
      );
    }, [selectedMessage]);

  // ====================================================
  // CONFIRM DELETE
  // ====================================================

  const handleConfirmDelete =
    useCallback(async () => {
      if (
        !selectedMessage?.id ||
        !conversationId
      ) {
        return;
      }

      const messageId =
        selectedMessage.id;

      try {
        await dispatch(
          deleteMessage({
            conversationId,
            messageId,
          })
        ).unwrap();

        console.log(
          "MESSAGE DELETED SUCCESSFULLY ✅"
        );

        setDeleteConfirmVisible(
          false
        );

        setSelectedMessage(null);
      } catch (error) {
        console.log(
          "DELETE MESSAGE ERROR =>",
          error
        );
      }
    }, [
      dispatch,
      conversationId,
      selectedMessage,
    ]);

  // ====================================================
  // CANCEL MESSAGE OPTIONS
  // ====================================================

  const closeMessageOptions =
    useCallback(() => {
      setMessageOptionsVisible(
        false
      );

      setSelectedMessage(null);
    }, []);

  // ====================================================
  // CANCEL DELETE
  // ====================================================

  const closeDeleteConfirm =
    useCallback(() => {
      setDeleteConfirmVisible(
        false
      );

      setSelectedMessage(null);
    }, []);

  // ====================================================
  // REACT TO MESSAGE
  // ====================================================

  const handleReactToMessage =
    useCallback(
      async (message, emoji) => {
        if (
          !message?.id ||
          !conversationId ||
          !emoji
        ) {
          return;
        }

        try {
          console.log(
            "========== REACT TO MESSAGE =========="
          );

          console.log(
            "MESSAGE ID =>",
            message.id
          );

          console.log(
            "EMOJI =>",
            emoji
          );

          await dispatch(
            reactToMessage({
              conversationId,
              messageId:
                message.id,
              emoji,
            })
          ).unwrap();

          console.log(
            "MESSAGE REACTION SUCCESSFUL ✅"
          );
        } catch (error) {
          console.log(
            "MESSAGE REACTION ERROR =>",
            error
          );
        }
      },
      [
        dispatch,
        conversationId,
      ]
    );

  // ====================================================
  // REMOVE MESSAGE REACTION
  // ====================================================

  const handleRemoveMessageReaction =
    useCallback(
      async (message) => {
        if (
          !message?.id ||
          !conversationId
        ) {
          return;
        }

        try {
          console.log(
            "========== REMOVE MESSAGE REACTION =========="
          );

          console.log(
            "MESSAGE ID =>",
            message.id
          );

          await dispatch(
            removeMessageReactionApi({
              conversationId,
              messageId:
                message.id,
            })
          ).unwrap();

          console.log(
            "MESSAGE REACTION REMOVED SUCCESSFULLY ✅"
          );
        } catch (error) {
          console.log(
            "REMOVE MESSAGE REACTION ERROR =>",
            error
          );
        }
      },
      [
        dispatch,
        conversationId,
      ]
    );

  // ====================================================
  // RENDER MESSAGE
  // ====================================================

  const renderMessage =
    useCallback(
      ({ item }) => {
        const senderId =
          item?.sender_id;

        const userId =
          currentUserId;

        const isMine =
          senderId != null &&
          userId != null &&
          Number(senderId) ===
            Number(userId);

        return (
          <ChatMessageBubble
            message={item}
            isMine={isMine}
            onLongPress={
              handleMessageLongPress
            }
            onReact={
              handleReactToMessage
            }
            onRemoveReaction={
              handleRemoveMessageReaction
            }
          />
        );
      },
      [
        currentUserId,
        handleMessageLongPress,
        handleReactToMessage,
        handleRemoveMessageReaction,
      ]
    );

  // ====================================================
  // KEY
  // ====================================================

  const keyExtractor =
    useCallback(
      (item, index) =>
        String(
          item?.id ??
            `${item?.sender_id}-${item?.created_at}-${index}`
        ),
      []
    );

  // ====================================================
  // HEADER
  // ====================================================

  const header = useMemo(() => {
    return (
      <ChatHeader
        conversation={
          conversation
        }
        participant={
          participant
        }
        isOnline={
          realtimeOnline ||
          onlineStatus
        }
        onBack={
          handleBack
        }
        onProfilePress={
          handleProfilePress
        }
      />
    );
  }, [
    conversation,
    participant,
    realtimeOnline,
    onlineStatus,
    handleBack,
    handleProfilePress,
  ]);

  // ====================================================
  // FOOTER
  // ====================================================

  const footer = useMemo(() => {
    return (
      <ChatInput
        onSend={
          editingMessage
            ? handleEditMessage
            : handleSend
        }
        onTyping={
          handleTyping
        }
        sending={sending}
        editingMessage={
          editingMessage
        }
        onCancelEdit={() => {
          setEditingMessage(null);
        }}
      />
    );
  }, [
    editingMessage,
    handleSend,
    handleEditMessage,
    handleTyping,
    sending,
  ]);

  // ====================================================
  // LOADING
  // ====================================================

  if (
    messagesLoading &&
    (!messages ||
      messages.length === 0)
  ) {
    return (
      <ScreenLayout
        backgroundColor={
          Colors.bgDefault ||
          "#000"
        }
        header={header}
        footer={footer}
        scroll={false}
        keyboardAvoid={false}
        edges={[
          "top",
          "bottom",
        ]}
      >
        <View
          style={
            styles.loadingContainer
          }
        >
          <ActivityIndicator
            size="small"
            color="#fff"
          />
        </View>
      </ScreenLayout>
    );
  }

  // ====================================================
  // ERROR
  // ====================================================

  if (
    messagesError &&
    (!messages ||
      messages.length === 0)
  ) {
    return (
      <ScreenLayout
        backgroundColor={
          Colors.bgDefault ||
          "#000"
        }
        header={header}
        footer={footer}
        scroll={false}
        keyboardAvoid={false}
        edges={[
          "top",
          "bottom",
        ]}
      >
        <View
          style={
            styles.errorContainer
          }
        >
          <Text
            style={
              styles.errorText
            }
          >
            Unable to load messages
          </Text>

          <Pressable
            onPress={loadMessages}
          >
            <Text
              style={
                styles.retryText
              }
            >
              Tap to retry
            </Text>
          </Pressable>
        </View>
      </ScreenLayout>
    );
  }

  // ====================================================
  // MAIN UI
  // ====================================================

  return (
    <>
      <ScreenLayout
        backgroundColor={
          Colors.bgDefault ||
          "#000"
        }
        header={header}
        footer={footer}
        scroll={false}
        keyboardAvoid={false}
        edges={[
          "top",
          "bottom",
        ]}
      >
        <View
          style={styles.chatBody}
        >
          <FlatList
            data={
              messages || []
            }
            keyExtractor={
              keyExtractor
            }
            renderItem={
              renderMessage
            }
            style={
              styles.list
            }
            contentContainerStyle={
              styles.listContent
            }
            showsVerticalScrollIndicator={
              false
            }
            inverted={false}
            keyboardShouldPersistTaps="handled"
            refreshing={
              refreshing
            }
            onRefresh={
              handleRefresh
            }
            removeClippedSubviews={
              false
            }
          />

          {typingUserId ? (
            <View
              style={
                styles.typingContainer
              }
            >
              <Text
                style={
                  styles.typingText
                }
              >
                {typingLabel} is
                typing...
              </Text>
            </View>
          ) : null}
        </View>
      </ScreenLayout>

      {/* ==================================================
          MESSAGE OPTIONS MODAL
          ================================================== */}

      <Modal
        visible={
          messageOptionsVisible
        }
        transparent
        animationType="fade"
        onRequestClose={
          closeMessageOptions
        }
      >
        <Pressable
          style={
            styles.modalOverlay
          }
          onPress={
            closeMessageOptions
          }
        >
          <Pressable
            style={
              styles.optionsModal
            }
            onPress={(event) =>
              event.stopPropagation()
            }
          >
            <Text
              style={
                styles.optionsTitle
              }
            >
              Message options
            </Text>

            {/* EDIT */}

            <Pressable
              style={
                styles.optionButton
              }
              onPress={
                handleEditSelectedMessage
              }
            >
              <View
                style={
                  styles.optionIcon
                }
              >
                <Ionicons
                  name="create-outline"
                  size={22}
                  color="#fff"
                />
              </View>

              <Text
                style={
                  styles.optionText
                }
              >
                Edit
              </Text>
            </Pressable>

            {/* DELETE */}

            <Pressable
              style={
                styles.optionButton
              }
              onPress={
                handleDeletePress
              }
            >
              <View
                style={
                  styles.optionIcon
                }
              >
                <Ionicons
                  name="trash-outline"
                  size={22}
                  color="#ff453a"
                />
              </View>

              <Text
                style={[
                  styles.optionText,
                  styles.deleteText,
                ]}
              >
                Delete
              </Text>
            </Pressable>

            {/* CANCEL */}

            <Pressable
              style={
                styles.cancelButton
              }
              onPress={
                closeMessageOptions
              }
            >
              <Text
                style={
                  styles.cancelText
                }
              >
                Cancel
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ==================================================
          DELETE CONFIRMATION MODAL
          ================================================== */}

      <Modal
        visible={
          deleteConfirmVisible
        }
        transparent
        animationType="fade"
        onRequestClose={
          closeDeleteConfirm
        }
      >
        <Pressable
          style={
            styles.modalOverlay
          }
          onPress={
            closeDeleteConfirm
          }
        >
          <Pressable
            style={
              styles.deleteModal
            }
            onPress={(event) =>
              event.stopPropagation()
            }
          >
            <View
              style={
                styles.deleteIconContainer
              }
            >
              <Ionicons
                name="trash-outline"
                size={30}
                color="#ff453a"
              />
            </View>

            <Text
              style={
                styles.deleteTitle
              }
            >
              Delete message?
            </Text>

            <Text
              style={
                styles.deleteDescription
              }
            >
              Are you sure you want to
              delete this message?
            </Text>

            <View
              style={
                styles.deleteActions
              }
            >
              <Pressable
                style={
                  styles.deleteCancelButton
                }
                onPress={
                  closeDeleteConfirm
                }
              >
                <Text
                  style={
                    styles.deleteCancelText
                  }
                >
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                style={
                  styles.confirmDeleteButton
                }
                onPress={
                  handleConfirmDelete
                }
              >
                <Text
                  style={
                    styles.confirmDeleteText
                  }
                >
                  Delete
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({
    chatBody: {
      flex: 1,
      width: "100%",
    },

    list: {
      flex: 1,
      width: "100%",
    },

    listContent: {
      paddingTop: 8,
      paddingBottom: 10,
      flexGrow: 1,
    },

    typingContainer: {
      paddingHorizontal: 16,
      paddingVertical: 6,
      backgroundColor: "#000",
    },

    typingText: {
      color: "#8e8e8e",
      fontSize: 12,
      fontStyle: "italic",
    },

    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    errorContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 30,
    },

    errorText: {
      color: "#fff",
      fontSize: 15,
      textAlign: "center",
      marginBottom: 10,
    },

    retryText: {
      color: "#3797F0",
      fontSize: 14,
      fontWeight: "600",
    },

    // ==================================================
    // COMMON MODAL
    // ==================================================

    modalOverlay: {
      flex: 1,
      backgroundColor:
        "rgba(0, 0, 0, 0.68)",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },

    // ==================================================
    // MESSAGE OPTIONS
    // ==================================================

    optionsModal: {
      width: "86%",
      maxWidth: 380,
      backgroundColor: "#1c1c1c",
      borderRadius: 18,
      overflow: "hidden",
    },

    optionsTitle: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "600",
      textAlign: "center",
      paddingVertical: 18,
      borderBottomWidth: 1,
      borderBottomColor: "#333",
    },

    optionButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 17,
      borderBottomWidth: 1,
      borderBottomColor: "#292929",
    },

    optionIcon: {
      width: 32,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },

    optionText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "500",
    },

    deleteText: {
      color: "#ff453a",
    },

    cancelButton: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 17,
    },

    cancelText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "500",
    },

    // ==================================================
    // DELETE CONFIRMATION
    // ==================================================

    deleteModal: {
      width: "86%",
      maxWidth: 380,
      backgroundColor: "#1c1c1c",
      borderRadius: 20,
      paddingHorizontal: 22,
      paddingVertical: 24,
      alignItems: "center",
    },

    deleteIconContainer: {
      width: 58,
      height: 58,
      borderRadius: 29,
      backgroundColor: "#2a1818",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
    },

    deleteTitle: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 8,
      textAlign: "center",
    },

    deleteDescription: {
      color: "#999",
      fontSize: 14,
      lineHeight: 20,
      textAlign: "center",
      marginBottom: 22,
    },

    deleteActions: {
      width: "100%",
      flexDirection: "row",
      gap: 10,
    },

    deleteCancelButton: {
      flex: 1,
      height: 44,
      borderRadius: 12,
      backgroundColor: "#292929",
      alignItems: "center",
      justifyContent: "center",
    },

    deleteCancelText: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "500",
    },

    confirmDeleteButton: {
      flex: 1,
      height: 44,
      borderRadius: 12,
      backgroundColor: "#ff453a",
      alignItems: "center",
      justifyContent: "center",
    },

    confirmDeleteText: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "600",
    },
  });