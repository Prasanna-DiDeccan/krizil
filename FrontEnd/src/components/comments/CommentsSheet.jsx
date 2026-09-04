// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   ActivityIndicator,
//   FlatList,
//   KeyboardAvoidingView,
//   Modal,
//   Platform,
//   Pressable,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import {
//   Ionicons,
// } from "@expo/vector-icons";

// import {
//   getComments,
//   getReelComments,
//   addComment,
//   addReelComment,
//   replyToComment,
//   getCommentReplies,
//   likeComment,
// } from "../../redux/commentsSlice";

// import CommentItem from "./CommentItem";
// import ReplyItem from "./ReplyItem";
// import CommentInput from "./CommentInput";

// // ======================================================
// // COMMENTS SHEET
// // ======================================================

// export default function CommentsSheet({
//   visible = false,

//   // Post
//   postId = null,

//   // Reel
//   reelId = null,

//   onClose,
// }) {
//   const dispatch = useDispatch();

//   // ====================================================
//   // LOCAL STATE
//   // ====================================================

//   const [replyTo, setReplyTo] = useState(null);

//   const [expandedReplies, setExpandedReplies] =
//     useState({});

//   // ====================================================
//   // REDUX
//   // ====================================================

//   const {
//     comments,
//     total,
//     loading,
//     loadingMore,
//     addingComment,
//     replying,
//     loadingReplies,
//     likingCommentId,
//     error,
//     hasMore,
//     replies,
//   } = useSelector(
//     (state) => state.comments
//   );

//   // ====================================================
//   // CONTENT TYPE
//   // ====================================================

//   const contentType = useMemo(() => {
//     if (reelId) {
//       return "reel";
//     }

//     if (postId) {
//       return "post";
//     }

//     return null;
//   }, [postId, reelId]);

//   const contentId =
//     contentType === "reel"
//       ? reelId
//       : postId;

//   // ====================================================
//   // LOAD COMMENTS
//   // ====================================================

//   const loadComments = useCallback(
//     ({ offset = 0 } = {}) => {
//       if (!contentId) {
//         return;
//       }

//       if (contentType === "reel") {
//         dispatch(
//           getReelComments({
//             reelId: contentId,
//             limit: 20,
//             offset,
//           })
//         );

//         return;
//       }

//       dispatch(
//         getComments({
//           postId: contentId,
//           limit: 20,
//           offset,
//         })
//       );
//     },
//     [
//       dispatch,
//       contentId,
//       contentType,
//     ]
//   );

//   // ====================================================
//   // OPEN
//   // ====================================================

//   useEffect(() => {
//     if (!visible || !contentId) {
//       return;
//     }

//     setReplyTo(null);
//     setExpandedReplies({});

//     loadComments({
//       offset: 0,
//     });
//   }, [
//     visible,
//     contentId,
//     contentType,
//     loadComments,
//   ]);

//   // ====================================================
//   // LOAD MORE
//   // ====================================================

//   const handleLoadMore = useCallback(() => {
//     if (
//       loading ||
//       loadingMore ||
//       !hasMore
//     ) {
//       return;
//     }

//     loadComments({
//       offset: comments.length,
//     });
//   }, [
//     loading,
//     loadingMore,
//     hasMore,
//     loadComments,
//     comments.length,
//   ]);

//   // ====================================================
//   // REFRESH
//   // ====================================================

//   const handleRefresh = useCallback(() => {
//     loadComments({
//       offset: 0,
//     });
//   }, [loadComments]);

//   // ====================================================
//   // ADD COMMENT / REPLY
//   // ====================================================

//   const handleAddComment = useCallback(
//     async (text) => {
//       if (
//         !text?.trim() ||
//         !contentId
//       ) {
//         return;
//       }

//       try {
//         // ================================================
//         // REPLY
//         // ================================================

//         if (replyTo) {
//           await dispatch(
//             replyToComment({
//               commentId: replyTo.id,
//               content: text.trim(),
//             })
//           ).unwrap();

//           setReplyTo(null);

//           setExpandedReplies(
//             (previous) => ({
//               ...previous,
//               [replyTo.id]: true,
//             })
//           );

//           // Refresh replies so the new reply appears.
//           await dispatch(
//             getCommentReplies({
//               commentId: replyTo.id,
//               limit: 20,
//               offset: 0,
//             })
//           );

//           return;
//         }

//         // ================================================
//         // REEL COMMENT
//         // ================================================

//         if (contentType === "reel") {
//           await dispatch(
//             addReelComment({
//               reelId: contentId,
//               content: text.trim(),
//             })
//           ).unwrap();

//           return;
//         }

//         // ================================================
//         // POST COMMENT
//         // ================================================

//         await dispatch(
//           addComment({
//             postId: contentId,
//             content: text.trim(),
//           })
//         ).unwrap();
//       } catch (error) {
//         console.log(
//           "❌ COMMENT SUBMIT ERROR =>",
//           error
//         );
//       }
//     },
//     [
//       dispatch,
//       contentId,
//       contentType,
//       replyTo,
//     ]
//   );

//   // ====================================================
//   // LIKE COMMENT
//   // ====================================================

//   const handleLike = useCallback(
//     (commentId) => {
//       if (!commentId) {
//         return;
//       }

//       if (
//         likingCommentId === commentId
//       ) {
//         return;
//       }

//       dispatch(
//         likeComment(commentId)
//       );
//     },
//     [
//       dispatch,
//       likingCommentId,
//     ]
//   );

//   // ====================================================
//   // REPLY
//   // ====================================================

//   const handleReply = useCallback(
//     (comment) => {
//       setReplyTo(comment);
//     },
//     []
//   );

//   // ====================================================
//   // CANCEL REPLY
//   // ====================================================

//   const handleCancelReply =
//     useCallback(() => {
//       setReplyTo(null);
//     }, []);

//   // ====================================================
//   // VIEW REPLIES
//   // ====================================================

//   const handleViewReplies =
//     useCallback(
//       async (commentId) => {
//         if (!commentId) {
//           return;
//         }

//         const isExpanded =
//           !!expandedReplies[commentId];

//         // Collapse
//         if (isExpanded) {
//           setExpandedReplies(
//             (previous) => ({
//               ...previous,
//               [commentId]: false,
//             })
//           );

//           return;
//         }

//         // Expand
//         setExpandedReplies(
//           (previous) => ({
//             ...previous,
//             [commentId]: true,
//           })
//         );

//         // Already loaded
//         if (
//           Array.isArray(
//             replies?.[commentId]
//           )
//         ) {
//           return;
//         }

//         try {
//           await dispatch(
//             getCommentReplies({
//               commentId,
//               limit: 20,
//               offset: 0,
//             })
//           ).unwrap();
//         } catch (error) {
//           console.log(
//             "❌ LOAD REPLIES ERROR =>",
//             error
//           );
//         }
//       },
//       [
//         dispatch,
//         expandedReplies,
//         replies,
//       ]
//     );

//   // ====================================================
//   // CLOSE
//   // ====================================================

//   const handleClose = useCallback(() => {
//     setReplyTo(null);
//     setExpandedReplies({});

//     onClose?.();
//   }, [onClose]);

//   // ====================================================
//   // RENDER COMMENT
//   // ====================================================

//   const renderComment =
//     useCallback(
//       ({ item }) => {
//         const commentId =
//           item?.id;

//         const commentReplies =
//           replies?.[commentId] || [];

//         const isExpanded =
//           !!expandedReplies[
//             commentId
//           ];

//         return (
//           <View>
//             <CommentItem
//               comment={item}
//               liking={
//                 likingCommentId ===
//                 commentId
//               }
//               onLike={handleLike}
//               onReply={handleReply}
//               onViewReplies={
//                 handleViewReplies
//               }
//               loadingReplies={
//                 loadingReplies &&
//                 isExpanded &&
//                 commentReplies.length === 0
//               }
//             />

//             {/* ==========================================
//                 REPLIES
//             ========================================== */}

//             {isExpanded &&
//             commentReplies.length > 0 ? (
//               <View
//                 style={
//                   styles.repliesContainer
//                 }
//               >
//                 {commentReplies.map(
//                   (reply) => (
//                     <ReplyItem
//                       key={String(
//                         reply.id
//                       )}
//                       reply={reply}
//                       liking={
//                         likingCommentId ===
//                         reply?.id
//                       }
//                       onLike={
//                         handleLike
//                       }
//                     />
//                   )
//                 )}
//               </View>
//             ) : null}

//             {/* ==========================================
//                 REPLY LOADING
//             ========================================== */}

//             {isExpanded &&
//             loadingReplies &&
//             commentReplies.length ===
//               0 ? (
//               <View
//                 style={
//                   styles.replyLoading
//                 }
//               >
//                 <ActivityIndicator
//                   size="small"
//                   color="#999"
//                 />
//               </View>
//             ) : null}
//           </View>
//         );
//       },
//       [
//         replies,
//         expandedReplies,
//         likingCommentId,
//         loadingReplies,
//         handleLike,
//         handleReply,
//         handleViewReplies,
//       ]
//     );

//   // ====================================================
//   // FOOTER
//   // ====================================================

//   const renderFooter =
//     useCallback(() => {
//       if (!loadingMore) {
//         return null;
//       }

//       return (
//         <View
//           style={
//             styles.loadingMore
//           }
//         >
//           <ActivityIndicator
//             size="small"
//             color="#777"
//           />
//         </View>
//       );
//     }, [loadingMore]);

//   // ====================================================
//   // EMPTY
//   // ====================================================

//   const renderEmpty =
//     useCallback(() => {
//       if (loading) {
//         return (
//           <View
//             style={
//               styles.emptyContainer
//             }
//           >
//             <ActivityIndicator
//               size="large"
//               color="#777"
//             />
//           </View>
//         );
//       }

//       return (
//         <View
//           style={
//             styles.emptyContainer
//           }
//         >
//           <View
//             style={
//               styles.emptyIcon
//             }
//           >
//             <Ionicons
//               name="chatbubble-outline"
//               size={32}
//               color="#777"
//             />
//           </View>

//           <Text
//             style={
//               styles.emptyTitle
//             }
//           >
//             No comments yet
//           </Text>

//           <Text
//             style={
//               styles.emptyText
//             }
//           >
//             Start the conversation.
//           </Text>
//         </View>
//       );
//     }, [loading]);

//   // ====================================================
//   // HEADER
//   // ====================================================

//   const renderHeader =
//     useCallback(() => {
//       const commentTotal =
//         Number(
//           total || comments.length
//         );

//       return (
//         <View
//           style={styles.header}
//         >
//           <View
//             style={
//               styles.headerHandle
//             }
//           />

//           <View
//             style={
//               styles.headerRow
//             }
//           >
//             <View
//               style={
//                 styles.headerSide
//               }
//             />

//             <Text
//               style={
//                 styles.headerTitle
//               }
//             >
//               Comments
//             </Text>

//             <TouchableOpacity
//               activeOpacity={0.7}
//               onPress={
//                 handleClose
//               }
//               style={
//                 styles.closeButton
//               }
//             >
//               <Ionicons
//                 name="close"
//                 size={25}
//                 color="#111"
//               />
//             </TouchableOpacity>
//           </View>

//           <View
//             style={
//               styles.commentCountRow
//             }
//           >
//             <Text
//               style={
//                 styles.commentCount
//               }
//             >
//               {commentTotal}{" "}
//               {commentTotal === 1
//                 ? "comment"
//                 : "comments"}
//             </Text>
//           </View>
//         </View>
//       );
//     }, [
//       total,
//       comments.length,
//       handleClose,
//     ]);

//   // ====================================================
//   // NO ID
//   // ====================================================

//   if (!contentId) {
//     return null;
//   }

//   // ====================================================
//   // MODAL
//   // ====================================================

//   return (
//     <Modal
//       visible={visible}
//       transparent
//       animationType="slide"
//       onRequestClose={
//         handleClose
//       }
//     >
//       <KeyboardAvoidingView
//         style={styles.modal}
//         behavior={
//           Platform.OS === "ios"
//             ? "padding"
//             : undefined
//         }
//       >
//         {/* BACKDROP */}

//         <Pressable
//           style={styles.backdrop}
//           onPress={handleClose}
//         />

//         {/* SHEET */}

//         <View
//           style={styles.sheet}
//         >
//           {renderHeader()}

//           {/* ERROR */}

//           {error ? (
//             <View
//               style={
//                 styles.errorContainer
//               }
//             >
//               <Text
//                 style={
//                   styles.errorText
//                 }
//               >
//                 Failed to load comments
//               </Text>

//               <TouchableOpacity
//                 activeOpacity={0.7}
//                 onPress={
//                   handleRefresh
//                 }
//               >
//                 <Text
//                   style={
//                     styles.retryText
//                   }
//                 >
//                   Try again
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           ) : null}

//           {/* COMMENTS */}

//           <FlatList
//             data={comments}
//             keyExtractor={(item) =>
//               String(item.id)
//             }
//             renderItem={
//               renderComment
//             }
//             ListEmptyComponent={
//               renderEmpty
//             }
//             ListFooterComponent={
//               renderFooter
//             }
//             onEndReached={
//               handleLoadMore
//             }
//             onEndReachedThreshold={0.5}
//             showsVerticalScrollIndicator={
//               false
//             }
//             keyboardShouldPersistTaps="handled"
//             keyboardDismissMode="on-drag"
//             contentContainerStyle={
//               comments.length === 0
//                 ? styles.emptyList
//                 : styles.listContent
//             }
//           />

//           {/* INPUT */}

//           <CommentInput
//             onSubmit={
//               handleAddComment
//             }
//             loading={
//               addingComment ||
//               replying
//             }
//             replyTo={replyTo}
//             onCancelReply={
//               handleCancelReply
//             }
//           />
//         </View>
//       </KeyboardAvoidingView>
//     </Modal>
//   );
// }

// // ======================================================
// // STYLES
// // ======================================================

// const styles = StyleSheet.create({
//   // ====================================================
//   // MODAL
//   // ====================================================

//   modal: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },

//   backdrop: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor:
//       "rgba(0,0,0,0.45)",
//   },

//   // ====================================================
//   // SHEET
//   // ====================================================

//   sheet: {
//     height: "82%",
//     backgroundColor: "#fff",

//     borderTopLeftRadius: 18,
//     borderTopRightRadius: 18,

//     overflow: "hidden",
//   },

//   // ====================================================
//   // HEADER
//   // ====================================================

//   header: {
//     backgroundColor: "#fff",

//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },

//   headerHandle: {
//     width: 38,
//     height: 4,

//     borderRadius: 2,

//     backgroundColor: "#d0d0d0",

//     alignSelf: "center",

//     marginTop: 8,
//     marginBottom: 5,
//   },

//   headerRow: {
//     height: 48,

//     flexDirection: "row",
//     alignItems: "center",

//     justifyContent:
//       "space-between",

//     paddingHorizontal: 14,
//   },

//   headerSide: {
//     width: 30,
//   },

//   headerTitle: {
//     fontSize: 15,
//     color: "#111",
//     fontWeight: "700",
//   },

//   closeButton: {
//     width: 34,
//     height: 34,

//     alignItems: "center",
//     justifyContent: "center",
//   },

//   commentCountRow: {
//     paddingHorizontal: 16,
//     paddingBottom: 8,
//   },

//   commentCount: {
//     fontSize: 11,
//     color: "#999",
//   },

//   // ====================================================
//   // LIST
//   // ====================================================

//   listContent: {
//     paddingTop: 14,
//     paddingBottom: 10,
//   },

//   emptyList: {
//     flexGrow: 1,
//   },

//   // ====================================================
//   // EMPTY
//   // ====================================================

//   emptyContainer: {
//     flex: 1,

//     alignItems: "center",
//     justifyContent: "center",

//     paddingHorizontal: 30,
//   },

//   emptyIcon: {
//     width: 64,
//     height: 64,

//     borderRadius: 32,

//     borderWidth: 2,
//     borderColor: "#777",

//     alignItems: "center",
//     justifyContent: "center",

//     marginBottom: 12,
//   },

//   emptyTitle: {
//     color: "#111",

//     fontSize: 17,
//     fontWeight: "700",

//     marginBottom: 5,
//   },

//   emptyText: {
//     color: "#999",
//     fontSize: 13,
//   },

//   // ====================================================
//   // REPLIES
//   // ====================================================

//   repliesContainer: {
//     marginTop: -2,
//     marginLeft: 38,
//   },

//   replyLoading: {
//     marginLeft: 80,

//     paddingVertical: 10,

//     alignItems: "flex-start",
//   },

//   // ====================================================
//   // LOAD MORE
//   // ====================================================

//   loadingMore: {
//     height: 45,

//     alignItems: "center",
//     justifyContent: "center",
//   },

//   // ====================================================
//   // ERROR
//   // ====================================================

//   errorContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,

//     backgroundColor: "#fff5f5",

//     flexDirection: "row",

//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   errorText: {
//     color: "#ed4956",
//     fontSize: 12,
//   },

//   retryText: {
//     color: "#0095f6",
//     fontSize: 12,
//     fontWeight: "700",
//   },
// });

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  getComments,
  getReelComments,
  addComment,
  addReelComment,
  replyToComment,
  getCommentReplies,
  likeComment,
  deleteComment,
} from "../../redux/commentsSlice";

import {
  getAccessToken,
} from "../../utils/storage";

import CommentItem from "./CommentItem";
import ReplyItem from "./ReplyItem";
import CommentInput from "./CommentInput";

// ======================================================
// COMMENTS SHEET
// ======================================================

export default function CommentsSheet({
  visible = false,

  postId = null,

  reelId = null,

  onClose,
}) {
  const dispatch =
    useDispatch();

  // ====================================================
  // LOCAL STATE
  // ====================================================

  const [
    replyTo,
    setReplyTo,
  ] = useState(null);

  const [
    expandedReplies,
    setExpandedReplies,
  ] = useState({});

  const [
    deletingCommentId,
    setDeletingCommentId,
  ] = useState(null);

  const [
    tokenUserId,
    setTokenUserId,
  ] = useState(null);

  // ====================================================
  // CURRENT USER FROM REDUX
  // ====================================================

  const currentUser =
    useSelector(
      (state) =>
        state.auth?.user ||
        state.auth?.currentUser ||
        state.auth?.profile ||
        null
    );

  // ====================================================
  // GET USER ID FROM JWT
  // ====================================================

  useEffect(() => {
    let mounted = true;

    const loadTokenUserId =
      async () => {
        try {
          const token =
            await getAccessToken();

          console.log(
            "🔐 ACCESS TOKEN EXISTS =>",
            !!token
          );

          if (!token) {
            return;
          }

          const parts =
            token.split(".");

          if (
            parts.length !== 3
          ) {
            console.log(
              "❌ INVALID JWT"
            );

            return;
          }

          let base64 =
            parts[1]
              .replace(
                /-/g,
                "+"
              )
              .replace(
                /_/g,
                "/"
              );

          while (
            base64.length %
              4 !==
            0
          ) {
            base64 += "=";
          }

          const payload =
            JSON.parse(
              atob(base64)
            );

          console.log(
            "🔐 JWT PAYLOAD =>",
            payload
          );

          const id =
            Number(
              payload?.sub
            );

          if (
            mounted &&
            Number.isInteger(
              id
            ) &&
            id > 0
          ) {
            setTokenUserId(
              id
            );

            console.log(
              "🔐 TOKEN USER ID =>",
              id
            );
          }
        } catch (error) {
          console.log(
            "❌ TOKEN USER ID ERROR =>",
            error
          );
        }
      };

    loadTokenUserId();

    return () => {
      mounted = false;
    };
  }, []);

  // ====================================================
  // CURRENT USER ID
  // ====================================================

  const currentUserId =
    Number(currentUser?.id) ||
    Number(tokenUserId) ||
    null;

  // ====================================================
  // CURRENT USER DEBUG
  // ====================================================

  console.log(
    "================================"
  );

  console.log(
    "👤 COMMENTS CURRENT USER"
  );

  console.log(
    "CURRENT USER =>",
    currentUser
  );

  console.log(
    "TOKEN USER ID =>",
    tokenUserId
  );

  console.log(
    "CURRENT USER ID =>",
    currentUserId
  );

  console.log(
    "================================"
  );

  // ====================================================
  // REDUX
  // ====================================================

  const {
    comments = [],
    total = 0,
    loading = false,
    loadingMore = false,
    addingComment = false,
    replying = false,
    loadingReplies = false,
    likingCommentId = null,
    error = null,
    hasMore = false,
    replies = {},
  } =
    useSelector(
      (state) =>
        state.comments
    );

  // ====================================================
  // CONTENT TYPE
  // ====================================================

  const contentType =
    useMemo(() => {
      if (reelId) {
        return "reel";
      }

      if (postId) {
        return "post";
      }

      return null;
    }, [
      postId,
      reelId,
    ]);

  // ====================================================
  // CONTENT ID
  // ====================================================

  const contentId =
    contentType === "reel"
      ? reelId
      : postId;

  // ====================================================
  // NORMALIZE ID
  // ====================================================

  const normalizeId =
    useCallback(
      (value) => {
        let id =
          value;

        if (
          typeof value ===
            "object" &&
          value !== null
        ) {
          id =
            value.commentId ??
            value.comment_id ??
            value.id;
        }

        const numberId =
          Number(id);

        if (
          !Number.isInteger(
            numberId
          ) ||
          numberId <= 0
        ) {
          console.log(
            "❌ INVALID COMMENT ID =>",
            value
          );

          return null;
        }

        return numberId;
      },
      []
    );

  // ====================================================
  // LOAD COMMENTS
  // ====================================================

  const loadComments =
    useCallback(
      ({
        offset = 0,
      } = {}) => {
        const id =
          Number(
            contentId
          );

        if (
          !Number.isInteger(
            id
          ) ||
          id <= 0
        ) {
          console.log(
            "❌ INVALID CONTENT ID =>",
            contentId
          );

          return;
        }

        console.log(
          "================================"
        );

        console.log(
          "💬 LOAD COMMENTS"
        );

        console.log(
          "TYPE =>",
          contentType
        );

        console.log(
          "ID =>",
          id
        );

        console.log(
          "OFFSET =>",
          offset
        );

        console.log(
          "================================"
        );

        if (
          contentType ===
          "reel"
        ) {
          dispatch(
            getReelComments({
              reelId:
                id,
              limit: 20,
              offset,
            })
          );

          return;
        }

        dispatch(
          getComments({
            postId:
              id,
            limit: 20,
            offset,
          })
        );
      },
      [
        dispatch,
        contentId,
        contentType,
      ]
    );

  // ====================================================
  // OPEN
  // ====================================================

  useEffect(() => {
    if (
      !visible ||
      !contentId
    ) {
      return;
    }

    console.log(
      "================================"
    );

    console.log(
      "💬 OPEN COMMENTS"
    );

    console.log(
      "CONTENT TYPE =>",
      contentType
    );

    console.log(
      "CONTENT ID =>",
      contentId
    );

    console.log(
      "CURRENT USER ID =>",
      currentUserId
    );

    console.log(
      "================================"
    );

    setReplyTo(
      null
    );

    setExpandedReplies(
      {}
    );

    loadComments({
      offset: 0,
    });
  }, [
    visible,
    contentId,
    contentType,
    currentUserId,
    loadComments,
  ]);

  // ====================================================
  // LOAD MORE
  // ====================================================

  const handleLoadMore =
    useCallback(
      () => {
        if (
          loading ||
          loadingMore ||
          !hasMore
        ) {
          return;
        }

        loadComments({
          offset:
            comments.length,
        });
      },
      [
        loading,
        loadingMore,
        hasMore,
        comments.length,
        loadComments,
      ]
    );

  // ====================================================
  // REFRESH
  // ====================================================

  const handleRefresh =
    useCallback(
      () => {
        loadComments({
          offset: 0,
        });
      },
      [
        loadComments,
      ]
    );

  // ====================================================
  // ADD COMMENT / REPLY
  // ====================================================

  const handleAddComment =
    useCallback(
      async (text) => {
        const trimmed =
          text?.trim();

        if (
          !trimmed ||
          !contentId
        ) {
          return;
        }

        try {
          // ==================================================
          // REPLY
          // ==================================================

          if (
            replyTo
          ) {
            const parentId =
              normalizeId(
                replyTo
              );

            if (
              !parentId
            ) {
              return;
            }

            console.log(
              "================================"
            );

            console.log(
              "↩️ ADD REPLY"
            );

            console.log(
              "PARENT COMMENT ID =>",
              parentId
            );

            console.log(
              "CONTENT =>",
              trimmed
            );

            console.log(
              "================================"
            );

            await dispatch(
              replyToComment({
                commentId:
                  parentId,
                content:
                  trimmed,
              })
            ).unwrap();

            setExpandedReplies(
              (
                previous
              ) => ({
                ...previous,
                [parentId]:
                  true,
              })
            );

            setReplyTo(
              null
            );

            await dispatch(
              getCommentReplies({
                commentId:
                  parentId,
                limit: 20,
                offset: 0,
              })
            ).unwrap();

            return;
          }

          // ==================================================
          // REEL COMMENT
          // ==================================================

          if (
            contentType ===
            "reel"
          ) {
            await dispatch(
              addReelComment({
                reelId:
                  Number(
                    contentId
                  ),
                content:
                  trimmed,
              })
            ).unwrap();

            loadComments({
              offset: 0,
            });

            return;
          }

          // ==================================================
          // POST COMMENT
          // ==================================================

          await dispatch(
            addComment({
              postId:
                Number(
                  contentId
                ),
              content:
                trimmed,
            })
          ).unwrap();

          loadComments({
            offset: 0,
          });
        } catch (
          error
        ) {
          console.log(
            "❌ COMMENT / REPLY ERROR =>",
            error
          );
        }
      },
      [
        dispatch,
        contentId,
        contentType,
        replyTo,
        normalizeId,
        loadComments,
      ]
    );

  // ====================================================
  // LIKE COMMENT / REPLY
  // ====================================================

  const handleLike =
    useCallback(
      async (value) => {
        const commentId =
          normalizeId(
            value
          );

        if (
          !commentId
        ) {
          return;
        }

        if (
          Number(
            likingCommentId
          ) ===
          commentId
        ) {
          return;
        }

        console.log(
          "================================"
        );

        console.log(
          "❤️ LIKE COMMENT"
        );

        console.log(
          "COMMENT ID =>",
          commentId
        );

        console.log(
          "================================"
        );

        try {
          await dispatch(
            likeComment(
              commentId
            )
          ).unwrap();
        } catch (
          error
        ) {
          console.log(
            "❌ LIKE COMMENT ERROR =>",
            error
          );
        }
      },
      [
        dispatch,
        likingCommentId,
        normalizeId,
      ]
    );

  // ====================================================
  // REPLY
  // ====================================================

  const handleReply =
    useCallback(
      (comment) => {
        const commentId =
          normalizeId(
            comment
          );

        if (
          !commentId
        ) {
          return;
        }

        console.log(
          "↩️ REPLY TO COMMENT =>",
          commentId
        );

        setReplyTo({
          ...comment,
          id: commentId,
        });
      },
      [
        normalizeId,
      ]
    );

  // ====================================================
  // CANCEL REPLY
  // ====================================================

  const handleCancelReply =
    useCallback(
      () => {
        setReplyTo(
          null
        );
      },
      []
    );

  // ====================================================
  // VIEW REPLIES
  // ====================================================

  const handleViewReplies =
    useCallback(
      async (value) => {
        const commentId =
          normalizeId(
            value
          );

        if (
          !commentId
        ) {
          return;
        }

        const isExpanded =
          !!expandedReplies[
            commentId
          ];

        console.log(
          "================================"
        );

        console.log(
          "💬 VIEW REPLIES"
        );

        console.log(
          "COMMENT ID =>",
          commentId
        );

        console.log(
          "EXPANDED =>",
          isExpanded
        );

        console.log(
          "================================"
        );

        if (
          isExpanded
        ) {
          setExpandedReplies(
            (
              previous
            ) => ({
              ...previous,
              [commentId]:
                false,
            })
          );

          return;
        }

        setExpandedReplies(
          (
            previous
          ) => ({
            ...previous,
            [commentId]:
              true,
          })
        );

        try {
          const result =
            await dispatch(
              getCommentReplies({
                commentId,
                limit: 20,
                offset: 0,
              })
            ).unwrap();

          console.log(
            "✅ REPLIES RESULT =>",
            result
          );
        } catch (
          error
        ) {
          console.log(
            "❌ GET REPLIES ERROR =>",
            error
          );

          setExpandedReplies(
            (
              previous
            ) => ({
              ...previous,
              [commentId]:
                false,
            })
          );
        }
      },
      [
        dispatch,
        expandedReplies,
        normalizeId,
      ]
    );

  // ====================================================
  // DELETE COMMENT
  // ====================================================

  const handleDelete =
    useCallback(
      async (value) => {
        const commentId =
          normalizeId(
            value
          );

        if (
          !commentId
        ) {
          return;
        }

        if (
          deletingCommentId ===
          commentId
        ) {
          return;
        }

        try {
          setDeletingCommentId(
            commentId
          );

          console.log(
            "================================"
          );

          console.log(
            "🗑️ DELETE COMMENT"
          );

          console.log(
            "COMMENT ID =>",
            commentId
          );

          console.log(
            "CURRENT USER ID =>",
            currentUserId
          );

          console.log(
            "================================"
          );

          await dispatch(
            deleteComment(
              commentId
            )
          ).unwrap();

          console.log(
            "✅ COMMENT DELETED =>",
            commentId
          );

          // ==================================================
          // CLEAR REPLY TARGET
          // ==================================================

          if (
            replyTo &&
            normalizeId(
              replyTo
            ) ===
              commentId
          ) {
            setReplyTo(
              null
            );
          }

          // ==================================================
          // REMOVE EXPANDED STATE
          // ==================================================

          setExpandedReplies(
            (
              previous
            ) => {
              const next = {
                ...previous,
              };

              delete next[
                commentId
              ];

              return next;
            }
          );

          // ==================================================
          // RELOAD COMMENTS
          // ==================================================

          loadComments({
            offset: 0,
          });
        } catch (
          error
        ) {
          console.log(
            "================================"
          );

          console.log(
            "❌ DELETE COMMENT ERROR"
          );

          console.log(
            "ERROR =>",
            error
          );

          console.log(
            "================================"
          );
        } finally {
          setDeletingCommentId(
            null
          );
        }
      },
      [
        dispatch,
        normalizeId,
        deletingCommentId,
        currentUserId,
        replyTo,
        loadComments,
      ]
    );

  // ====================================================
  // RENDER COMMENT
  // ====================================================

  const renderComment =
    useCallback(
      ({
        item,
      }) => {
        const commentId =
          normalizeId(
            item?.id
          );

        if (
          !commentId
        ) {
          return null;
        }

        const commentReplies =
          Array.isArray(
            replies?.[
              commentId
            ]
          )
            ? replies[
                commentId
              ]
            : [];

        const isExpanded =
          !!expandedReplies[
            commentId
          ];

        const isLoadingReplies =
          loadingReplies &&
          isExpanded &&
          commentReplies.length ===
            0;

        return (
          <View
            style={
              styles.commentWrapper
            }
          >
            {/* ==================================================
                MAIN COMMENT
            ================================================== */}

            <CommentItem
              comment={
                item
              }
              currentUserId={
                currentUserId
              }
              liking={
                Number(
                  likingCommentId
                ) ===
                commentId
              }
              deleting={
                deletingCommentId ===
                commentId
              }
              onLike={
                handleLike
              }
              onReply={
                handleReply
              }
              onDelete={
                handleDelete
              }
              onViewReplies={
                handleViewReplies
              }
              loadingReplies={
                isLoadingReplies
              }
            />

            {/* ==================================================
                REPLIES
            ================================================== */}

            {isExpanded ? (
              <View
                style={
                  styles.repliesContainer
                }
              >
                {isLoadingReplies ? (
                  <View
                    style={
                      styles.replyLoading
                    }
                  >
                    <ActivityIndicator
                      size="small"
                      color="#888"
                    />

                    <Text
                      style={
                        styles.loadingText
                      }
                    >
                      Loading replies...
                    </Text>
                  </View>
                ) : null}

                {!loadingReplies &&
                commentReplies.length ===
                  0 ? (
                  <Text
                    style={
                      styles.noRepliesText
                    }
                  >
                    No replies yet
                  </Text>
                ) : null}

                {commentReplies.map(
                  (
                    reply
                  ) => {
                    const replyId =
                      normalizeId(
                        reply?.id
                      );

                    if (
                      !replyId
                    ) {
                      return null;
                    }

                    return (
                      <ReplyItem
                        key={String(
                          replyId
                        )}
                        reply={
                          reply
                        }
                        currentUserId={
                          currentUserId
                        }
                        liking={
                          Number(
                            likingCommentId
                          ) ===
                          replyId
                        }
                        deleting={
                          deletingCommentId ===
                          replyId
                        }
                        onLike={
                          handleLike
                        }
                        onDelete={
                          handleDelete
                        }
                      />
                    );
                  }
                )}
              </View>
            ) : null}
          </View>
        );
      },
      [
        replies,
        expandedReplies,
        likingCommentId,
        deletingCommentId,
        loadingReplies,
        currentUserId,
        normalizeId,
        handleLike,
        handleReply,
        handleDelete,
        handleViewReplies,
      ]
    );

  // ====================================================
  // FOOTER
  // ====================================================

  const renderFooter =
    useCallback(
      () => {
        if (
          !loadingMore
        ) {
          return null;
        }

        return (
          <View
            style={
              styles.loadingMore
            }
          >
            <ActivityIndicator
              size="small"
              color="#777"
            />
          </View>
        );
      },
      [
        loadingMore,
      ]
    );

  // ====================================================
  // EMPTY
  // ====================================================

  const renderEmpty =
    useCallback(
      () => {
        if (
          loading
        ) {
          return (
            <View
              style={
                styles.emptyContainer
              }
            >
              <ActivityIndicator
                size="large"
                color="#777"
              />
            </View>
          );
        }

        return (
          <View
            style={
              styles.emptyContainer
            }
          >
            <View
              style={
                styles.emptyIcon
              }
            >
              <Ionicons
                name="chatbubble-outline"
                size={30}
                color="#fff"
              />
            </View>

            <Text
              style={
                styles.emptyTitle
              }
            >
              No comments yet
            </Text>

            <Text
              style={
                styles.emptyText
              }
            >
              Start the conversation.
            </Text>
          </View>
        );
      },
      [
        loading,
      ]
    );

  // ====================================================
  // CLOSE
  // ====================================================

  const handleClose =
    useCallback(
      () => {
        setReplyTo(
          null
        );

        setExpandedReplies(
          {}
        );

        onClose?.();
      },
      [
        onClose,
      ]
    );

  // ====================================================
  // NO CONTENT ID
  // ====================================================

  if (
    !contentId
  ) {
    return null;
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <Modal
      visible={
        visible
      }
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={
        handleClose
      }
    >
      <KeyboardAvoidingView
        style={
          styles.modal
        }
        behavior={
          Platform.OS ===
          "ios"
            ? "padding"
            : undefined
        }
      >
        {/* ==================================================
            BACKDROP
        ================================================== */}

        <Pressable
          style={
            styles.backdrop
          }
          onPress={
            handleClose
          }
        />

        {/* ==================================================
            SHEET
        ================================================== */}

        <View
          style={
            styles.sheet
          }
        >
          {/* HANDLE */}

          <View
            style={
              styles.headerHandle
            }
          />

          {/* HEADER */}

          <View
            style={
              styles.headerRow
            }
          >
            <View
              style={
                styles.headerSide
              }
            />

            <View
              style={
                styles.headerCenter
              }
            >
              <Text
                style={
                  styles.headerTitle
                }
              >
                Comments
              </Text>

              <Text
                style={
                  styles.commentCount
                }
              >
                {Number(
                  total ||
                    comments.length
                )}{" "}
                {Number(
                  total ||
                    comments.length
                ) ===
                1
                  ? "comment"
                  : "comments"}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={
                0.7
              }
              onPress={
                handleClose
              }
              style={
                styles.closeButton
              }
            >
              <Ionicons
                name="close"
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          <View
            style={
              styles.divider
            }
          />

          {/* ==================================================
              ERROR
          ================================================== */}

          {error ? (
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
                Failed to load comments
              </Text>

              <TouchableOpacity
                onPress={
                  handleRefresh
                }
              >
                <Text
                  style={
                    styles.retryText
                  }
                >
                  Try again
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {/* ==================================================
              COMMENTS
          ================================================== */}

          <FlatList
            data={
              comments
            }
            keyExtractor={(
              item
            ) =>
              String(
                item?.id
              )
            }
            renderItem={
              renderComment
            }
            ListEmptyComponent={
              renderEmpty
            }
            ListFooterComponent={
              renderFooter
            }
            onEndReached={
              handleLoadMore
            }
            onEndReachedThreshold={
              0.5
            }
            showsVerticalScrollIndicator={
              false
            }
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            contentContainerStyle={
              comments.length ===
              0
                ? styles.emptyList
                : styles.listContent
            }
          />

          {/* ==================================================
              COMMENT INPUT
          ================================================== */}

          <CommentInput
            onSubmit={
              handleAddComment
            }
            loading={
              addingComment ||
              replying
            }
            replyTo={
              replyTo
            }
            onCancelReply={
              handleCancelReply
            }
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({
    modal: {
      flex: 1,

      justifyContent:
        "flex-end",
    },

    backdrop: {
      ...StyleSheet.absoluteFillObject,

      backgroundColor:
        "rgba(0,0,0,0.62)",
    },

    sheet: {
      height: "78%",

      backgroundColor:
        "#0B0B0B",

      borderTopLeftRadius:
        20,

      borderTopRightRadius:
        20,

      overflow: "hidden",

      borderWidth: 1,

      borderBottomWidth:
        0,

      borderColor:
        "#252525",
    },

    headerHandle: {
      width: 38,

      height: 4,

      borderRadius: 4,

      backgroundColor:
        "#555",

      alignSelf:
        "center",

      marginTop: 9,

      marginBottom: 5,
    },

    headerRow: {
      height: 52,

      flexDirection:
        "row",

      alignItems:
        "center",

      justifyContent:
        "space-between",

      paddingHorizontal:
        14,
    },

    headerSide: {
      width: 34,
    },

    headerCenter: {
      alignItems:
        "center",

      justifyContent:
        "center",
    },

    headerTitle: {
      color: "#fff",

      fontSize: 16,

      fontWeight:
        "700",
    },

    commentCount: {
      color: "#777",

      fontSize: 10,

      marginTop: 2,
    },

    closeButton: {
      width: 34,

      height: 34,

      alignItems:
        "center",

      justifyContent:
        "center",
    },

    divider: {
      height:
        StyleSheet.hairlineWidth,

      backgroundColor:
        "#292929",
    },

    listContent: {
      paddingTop: 12,

      paddingBottom: 10,
    },

    emptyList: {
      flexGrow: 1,
    },

    commentWrapper: {
      width: "100%",
    },

    repliesContainer: {
      marginLeft: 58,

      marginRight: 16,

      marginTop: -4,

      marginBottom: 7,

      paddingLeft: 12,

      borderLeftWidth: 1,

      borderLeftColor:
        "#303030",
    },

    replyLoading: {
      flexDirection:
        "row",

      alignItems:
        "center",

      paddingVertical: 8,

      gap: 8,
    },

    loadingText: {
      color: "#777",

      fontSize: 11,
    },

    noRepliesText: {
      color: "#666",

      fontSize: 11,

      paddingVertical: 8,
    },

    loadingMore: {
      height: 45,

      alignItems:
        "center",

      justifyContent:
        "center",
    },

    emptyContainer: {
      flex: 1,

      alignItems:
        "center",

      justifyContent:
        "center",

      paddingHorizontal: 30,
    },

    emptyIcon: {
      width: 66,

      height: 66,

      borderRadius: 33,

      borderWidth: 2,

      borderColor:
        "#777",

      alignItems:
        "center",

      justifyContent:
        "center",

      marginBottom: 13,
    },

    emptyTitle: {
      color: "#fff",

      fontSize: 17,

      fontWeight:
        "700",
    },

    emptyText: {
      color: "#777",

      fontSize: 12,

      marginTop: 5,
    },

    errorContainer: {
      paddingHorizontal:
        15,

      paddingVertical: 9,

      backgroundColor:
        "#211214",

      flexDirection:
        "row",

      alignItems:
        "center",

      justifyContent:
        "space-between",
    },

    errorText: {
      color:
        "#ED4956",

      fontSize: 12,
    },

    retryText: {
      color:
        "#0095F6",

      fontSize: 12,

      fontWeight:
        "700",
    },
  });