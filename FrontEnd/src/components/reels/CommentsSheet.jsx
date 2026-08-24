import React, {
  useEffect,
  useState,
} from "react";

import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getComments,
  clearComments,
  addComment,
  deleteComment,
  replyToComment,
  likeComment,
} from "../../redux/commentsSlice";

import Ionicons from "@expo/vector-icons/Ionicons";

import {
  getAccessToken,
} from "../../utils/storage";

// ======================================================
// DECODE JWT USER ID
// ======================================================

const getUserIdFromToken = (token) => {
  try {
    if (!token) {
      return null;
    }

    const parts = token.split(".");

    if (parts.length !== 3) {
      console.log("❌ INVALID JWT TOKEN");
      return null;
    }

    const base64Url = parts[1];

    const base64 = base64Url
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const padded =
      base64 +
      "=".repeat(
        (4 - (base64.length % 4)) % 4
      );

    const decoded = atob(padded);

    const jsonPayload = decodeURIComponent(
      decoded
        .split("")
        .map(
          (char) =>
            "%" +
            (
              "00" +
              char.charCodeAt(0).toString(16)
            ).slice(-2)
        )
        .join("")
    );

    const payload = JSON.parse(jsonPayload);

    console.log("JWT PAYLOAD =>", payload);

    return payload?.sub
      ? String(payload.sub)
      : null;
  } catch (error) {
    console.log(
      "❌ JWT DECODE ERROR =>",
      error
    );

    return null;
  }
};

// ======================================================
// TIME FORMATTER
// ======================================================

const formatCommentTime = (createdAt) => {
  if (!createdAt) {
    return "";
  }

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();

  const diff = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );

  if (diff < 60) {
    return "Just now";
  }

  const minutes = Math.floor(diff / 60);

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d`;
  }

  const weeks = Math.floor(days / 7);

  if (weeks < 4) {
    return `${weeks}w`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months}mo`;
  }

  const years = Math.floor(days / 365);

  return `${years}y`;
};

// ======================================================
// COMMENTS SHEET
// ======================================================

const CommentsSheet = ({
  visible,
  postId,
  onClose,
}) => {
  const dispatch = useDispatch();

  // ====================================================
  // REDUX
  // ====================================================

  const {
    comments = [],
    total = 0,
    loading = false,
    error = null,
    deletingCommentId = null,
    deleting = false,
    replying = false,
    addingComment = false,
    likingCommentId = null,
  } = useSelector(
    (state) => state.comments
  );

  // ====================================================
  // CURRENT USER ID
  // ====================================================

  const [
    currentUserId,
    setCurrentUserId,
  ] = useState(null);

  // ====================================================
  // REPLY STATE
  // ====================================================

  const [
    replyingTo,
    setReplyingTo,
  ] = useState(null);

  const [
    replyText,
    setReplyText,
  ] = useState("");

  // ====================================================
  // EXPANDED REPLIES
  // ====================================================

  const [
    expandedReplies,
    setExpandedReplies,
  ] = useState({});

  // ====================================================
  // LOAD CURRENT USER
  // ====================================================

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const token = await getAccessToken();

        console.log(
          "=========================================="
        );

        console.log(
          "🔐 GET ACCESS TOKEN"
        );

        console.log(
          "TOKEN EXISTS =>",
          !!token
        );

        const userId =
          getUserIdFromToken(token);

        console.log(
          "CURRENT USER ID =>",
          userId
        );

        console.log(
          "=========================================="
        );

        setCurrentUserId(userId);
      } catch (error) {
        console.log(
          "❌ CURRENT USER ERROR =>",
          error
        );

        setCurrentUserId(null);
      }
    };

    loadCurrentUser();
  }, []);

  // ====================================================
  // GET COMMENTS
  // ====================================================

  useEffect(() => {
    if (
      visible &&
      postId
    ) {
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
        "CURRENT USER ID =>",
        currentUserId
      );

      console.log(
        "=========================================="
      );

      dispatch(
        getComments({
          postId,
          limit: 20,
          offset: 0,
        })
      );
    }
  }, [
    visible,
    postId,
    dispatch,
  ]);

  // ====================================================
  // REFRESH COMMENTS
  // ====================================================

  const refreshComments = () => {
    if (!postId) {
      return;
    }

    dispatch(
      getComments({
        postId,
        limit: 20,
        offset: 0,
      })
    );
  };

  // ====================================================
  // CLOSE
  // ====================================================

  const handleClose = () => {
    dispatch(clearComments());

    setReplyingTo(null);
    setReplyText("");
    setExpandedReplies({});

    onClose();
  };

  // ====================================================
  // VIEW REPLIES
  // ====================================================

  const handleViewReplies = (comment) => {
    if (!comment?.id) {
      return;
    }

    console.log(
      "=========================================="
    );

    console.log(
      "💬 VIEW REPLIES"
    );

    console.log(
      "COMMENT ID =>",
      comment.id
    );

    console.log(
      "REPLIES COUNT =>",
      comment.replies_count
    );

    console.log(
      "=========================================="
    );

    setExpandedReplies(
      (previous) => ({
        ...previous,
        [comment.id]:
          !previous[comment.id],
      })
    );
  };

  // ====================================================
  // REPLY TO COMMENT
  // ====================================================

  const handleReply = (comment) => {
    if (!comment?.id) {
      return;
    }

    setReplyingTo(comment);
    setReplyText("");

    console.log(
      "↩️ REPLY TO COMMENT =>",
      comment.id
    );
  };

  // ====================================================
  // CANCEL REPLY
  // ====================================================

  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyText("");
  };

  // ====================================================
  // SEND COMMENT / REPLY
  // ====================================================

  const handleSend = async () => {
    const content = replyText.trim();

    if (!content) {
      return;
    }

    // ==================================================
    // REPLY
    // ==================================================

    if (replyingTo) {
      try {
        console.log(
          "=========================================="
        );

        console.log(
          "📤 SEND REPLY"
        );

        console.log(
          "COMMENT ID =>",
          replyingTo.id
        );

        console.log(
          "CONTENT =>",
          content
        );

        console.log(
          "=========================================="
        );

        await dispatch(
          replyToComment({
            commentId: replyingTo.id,
            content,
          })
        ).unwrap();

        console.log(
          "✅ REPLY SENT"
        );

        setReplyText("");
        setReplyingTo(null);

        refreshComments();
      } catch (error) {
        console.log(
          "❌ REPLY FAILED =>",
          error
        );

        Alert.alert(
          "Reply failed",
          "Unable to send reply."
        );
      }

      return;
    }

    // ==================================================
    // NORMAL COMMENT
    // ==================================================

    if (!postId) {
      return;
    }

    try {
      console.log(
        "=========================================="
      );

      console.log(
        "📤 ADD COMMENT"
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
        "=========================================="
      );

      await dispatch(
        addComment({
          postId,
          content,
        })
      ).unwrap();

      console.log(
        "✅ COMMENT ADDED"
      );

      setReplyText("");

      refreshComments();
    } catch (error) {
      console.log(
        "❌ ADD COMMENT FAILED =>",
        error
      );

      Alert.alert(
        "Comment failed",
        "Unable to add comment."
      );
    }
  };

  // ====================================================
  // DELETE COMMENT
  // ====================================================

  const handleDeleteComment = (comment) => {
    if (!comment?.id) {
      return;
    }

    Alert.alert(
      "Delete comment",
      "Are you sure you want to delete this comment?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },

        {
          text: "Delete",
          style: "destructive",

          onPress: async () => {
            try {
              console.log(
                "======================================"
              );

              console.log(
                "🗑️ DELETE COMMENT"
              );

              console.log(
                "COMMENT ID =>",
                comment.id
              );

              console.log(
                "======================================"
              );

              await dispatch(
                deleteComment(comment.id)
              ).unwrap();

              console.log(
                "✅ COMMENT DELETED"
              );

              // No need to refresh because
              // Redux already removes it.

            } catch (error) {
              console.log(
                "❌ DELETE FAILED =>",
                error
              );

              Alert.alert(
                "Delete failed",
                "Unable to delete this comment. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  // ====================================================
  // LIKE COMMENT
  // ====================================================

  const handleLikeComment = async (comment) => {
    if (!comment?.id) {
      return;
    }

    if (
      likingCommentId === comment.id
    ) {
      return;
    }

    try {
      console.log(
        "======================================"
      );

      console.log(
        "❤️ LIKE COMMENT"
      );

      console.log(
        "COMMENT ID =>",
        comment.id
      );

      console.log(
        "======================================"
      );

      await dispatch(
        likeComment(comment.id)
      ).unwrap();

    } catch (error) {
      console.log(
        "❌ LIKE COMMENT FAILED =>",
        error
      );
    }
  };

  // ====================================================
  // RENDER COMMENT
  // ====================================================

  const renderComment = ({
    item,
  }) => {
    const hasReplies =
      Number(
        item?.replies_count || 0
      ) > 0;

    const repliesExpanded =
      !!expandedReplies[item?.id];

    const isMyComment =
      String(item?.user_id) ===
      String(currentUserId);

    const isLiking =
      likingCommentId ===
      item?.id;

    console.log(
      "COMMENT =>",
      item?.id,
      "COMMENT USER =>",
      item?.user_id,
      "CURRENT USER =>",
      currentUserId,
      "MY COMMENT =>",
      isMyComment
    );

    return (
      <View style={styles.comment}>
        {/* ============================================
            AVATAR
        ============================================ */}

        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={20}
            color="#fff"
          />
        </View>

        {/* ============================================
            CONTENT
        ============================================ */}

        <View style={styles.commentContent}>
          {/* USERNAME */}

          <Text style={styles.username}>
            User {item?.user_id}
          </Text>

          {/* COMMENT */}

          <Text style={styles.commentText}>
            {item?.content ||
              item?.text ||
              item?.comment ||
              ""}
          </Text>

          {/* META */}

          <View style={styles.commentMeta}>
            <Text style={styles.time}>
              {formatCommentTime(
                item?.created_at
              )}
            </Text>

            {/* REPLY */}

            <Pressable
              onPress={() =>
                handleReply(item)
              }
              style={styles.replyButton}
            >
              <Text style={styles.reply}>
                Reply
              </Text>
            </Pressable>

            {/* DELETE */}

            {isMyComment && (
              <Pressable
                style={styles.deleteButton}
                onPress={() =>
                  handleDeleteComment(item)
                }
                disabled={
                  deleting &&
                  deletingCommentId ===
                    item?.id
                }
              >
                {deleting &&
                deletingCommentId ===
                  item?.id ? (
                  <ActivityIndicator
                    size="small"
                    color="#ff3040"
                  />
                ) : (
                  <Text style={styles.deleteText}>
                    Delete
                  </Text>
                )}
              </Pressable>
            )}
          </View>

          {/* VIEW REPLIES */}

          {hasReplies && (
            <Pressable
              style={styles.viewReplies}
              onPress={() =>
                handleViewReplies(item)
              }
            >
              <View
                style={styles.replyLine}
              />

              <Text
                style={
                  styles.viewRepliesText
                }
              >
                {repliesExpanded
                  ? "Hide replies"
                  : `View ${
                      item.replies_count
                    } ${
                      item.replies_count ===
                      1
                        ? "reply"
                        : "replies"
                    }`}
              </Text>
            </Pressable>
          )}

          {/* REPLIES */}

          {repliesExpanded && (
            <View
              style={
                styles.repliesContainer
              }
            >
              <Text
                style={
                  styles.repliesMessage
                }
              >
                Replies GET API is not
                connected yet.
              </Text>

              <Text
                style={
                  styles.repliesSubMessage
                }
              >
                The reply POST API is working.
                Add the backend GET replies
                endpoint to display them here.
              </Text>
            </View>
          )}
        </View>

        {/* ============================================
            LIKE
        ============================================ */}

        <Pressable
          style={styles.commentLike}
          onPress={() =>
            handleLikeComment(item)
          }
          disabled={isLiking}
        >
          {isLiking ? (
            <ActivityIndicator
              size="small"
              color="#ff3040"
            />
          ) : (
            <Ionicons
              name={
                item?.is_liked
                  ? "heart"
                  : "heart-outline"
              }
              size={18}
              color={
                item?.is_liked
                  ? "#ff3040"
                  : "#fff"
              }
            />
          )}

          <Text style={styles.likeCount}>
            {item?.likes_count || 0}
          </Text>
        </Pressable>
      </View>
    );
  };

  // ====================================================
  // EMPTY
  // ====================================================

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator
            size="large"
            color="#fff"
          />

          <Text style={styles.emptyText}>
            Loading comments...
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={40}
            color="#fff"
          />

          <Text style={styles.emptyTitle}>
            Failed to load comments
          </Text>

          <Text style={styles.errorText}>
            {typeof error === "string"
              ? error
              : JSON.stringify(error)}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="chatbubble-outline"
          size={45}
          color="#fff"
        />

        <Text style={styles.emptyTitle}>
          No comments yet
        </Text>

        <Text style={styles.emptyText}>
          Be the first to comment
        </Text>
      </View>
    );
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        {/* OUTSIDE */}

        <Pressable
          style={styles.overlayPress}
          onPress={handleClose}
        />

        {/* SHEET */}

        <View style={styles.sheet}>
          {/* HEADER */}

          <View style={styles.header}>
            <View
              style={styles.headerHandle}
            />

            <View style={styles.headerRow}>
              <View
                style={
                  styles.titleContainer
                }
              >
                <Text
                  style={styles.headerTitle}
                >
                  Comments
                </Text>

                <Text style={styles.total}>
                  {total || 0}
                </Text>
              </View>

              <Pressable
                onPress={handleClose}
              >
                <Ionicons
                  name="close"
                  size={28}
                  color="#fff"
                />
              </Pressable>
            </View>
          </View>

          {/* COMMENTS */}

          <FlatList
            data={comments}
            keyExtractor={(item, index) =>
              String(
                item?.id ?? index
              )
            }
            renderItem={renderComment}
            showsVerticalScrollIndicator={
              false
            }
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={
              comments.length === 0
                ? styles.emptyList
                : styles.list
            }
            ListEmptyComponent={
              renderEmpty
            }
          />

          {/* REPLYING BAR */}

          {replyingTo && (
            <View
              style={styles.replyingBar}
            >
              <View
                style={styles.replyingInfo}
              >
                <Ionicons
                  name="return-down-forward"
                  size={15}
                  color="#aaa"
                />

                <Text
                  style={
                    styles.replyingText
                  }
                >
                  Replying to User{" "}
                  {replyingTo.user_id}
                </Text>
              </View>

              <Pressable
                onPress={
                  handleCancelReply
                }
              >
                <Ionicons
                  name="close"
                  size={18}
                  color="#aaa"
                />
              </Pressable>
            </View>
          )}

          {/* INPUT */}

          <View
            style={styles.inputContainer}
          >
            <View
              style={styles.inputAvatar}
            >
              <Ionicons
                name="person"
                size={18}
                color="#fff"
              />
            </View>

            <TextInput
              value={replyText}
              onChangeText={setReplyText}
              placeholder={
                replyingTo
                  ? "Write a reply..."
                  : "Add a comment..."
              }
              placeholderTextColor="#888"
              style={styles.input}
              multiline
              maxLength={500}
            />

            <Pressable
              onPress={handleSend}
              disabled={
                !replyText.trim() ||
                replying ||
                addingComment
              }
              style={styles.sendButton}
            >
              {replying ||
              addingComment ? (
                <ActivityIndicator
                  size="small"
                  color="#0095f6"
                />
              ) : (
                <Ionicons
                  name="send"
                  size={23}
                  color={
                    replyText.trim()
                      ? "#0095f6"
                      : "#555"
                  }
                />
              )}
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CommentsSheet;

// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor:
        "rgba(0,0,0,0.45)",
      justifyContent: "flex-end",
    },

    overlayPress: {
      flex: 1,
    },

    sheet: {
      height: "72%",
      backgroundColor: "#111",
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
      overflow: "hidden",
    },

    header: {
      paddingTop: 8,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#292929",
    },

    headerHandle: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: "#666",
      alignSelf: "center",
      marginBottom: 12,
    },

    headerRow: {
      height: 48,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    headerTitle: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "700",
    },

    total: {
      color: "#888",
      fontSize: 14,
      marginLeft: 7,
    },

    list: {
      paddingVertical: 10,
    },

    emptyList: {
      flexGrow: 1,
    },

    comment: {
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingVertical: 12,
    },

    avatar: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: "#333",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },

    commentContent: {
      flex: 1,
      paddingRight: 10,
    },

    username: {
      color: "#fff",
      fontSize: 13,
      fontWeight: "700",
      marginBottom: 3,
    },

    commentText: {
      color: "#fff",
      fontSize: 14,
      lineHeight: 19,
    },

    commentMeta: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 6,
      flexWrap: "wrap",
    },

    time: {
      color: "#777",
      fontSize: 11,
      marginRight: 15,
    },

    replyButton: {
      marginRight: 15,
    },

    reply: {
      color: "#aaa",
      fontSize: 11,
      fontWeight: "600",
    },

    deleteButton: {
      paddingVertical: 3,
      paddingHorizontal: 5,
      minWidth: 50,
      alignItems: "center",
      justifyContent: "center",
    },

    deleteText: {
      color: "#ff3040",
      fontSize: 11,
      fontWeight: "600",
    },

    viewReplies: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 9,
    },

    replyLine: {
      width: 25,
      height: 1,
      backgroundColor: "#555",
      marginRight: 8,
    },

    viewRepliesText: {
      color: "#aaa",
      fontSize: 12,
      fontWeight: "600",
    },

    repliesContainer: {
      marginTop: 10,
      marginLeft: 10,
      paddingLeft: 15,
      borderLeftWidth: 1,
      borderLeftColor: "#333",
    },

    repliesMessage: {
      color: "#777",
      fontSize: 12,
      lineHeight: 18,
    },

    repliesSubMessage: {
      color: "#555",
      fontSize: 11,
      lineHeight: 17,
      marginTop: 4,
    },

    commentLike: {
      width: 30,
      alignItems: "center",
      justifyContent: "center",
    },

    likeCount: {
      color: "#aaa",
      fontSize: 10,
      marginTop: 2,
    },

    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 30,
    },

    emptyTitle: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "700",
      marginTop: 12,
    },

    emptyText: {
      color: "#aaa",
      fontSize: 13,
      marginTop: 7,
      textAlign: "center",
    },

    errorText: {
      color: "#ff5555",
      fontSize: 11,
      marginTop: 10,
      textAlign: "center",
    },

    replyingBar: {
      minHeight: 38,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 15,
      backgroundColor: "#1b1b1b",
      borderTopWidth: 1,
      borderTopColor: "#292929",
    },

    replyingInfo: {
      flexDirection: "row",
      alignItems: "center",
    },

    replyingText: {
      color: "#aaa",
      fontSize: 12,
      marginLeft: 6,
    },

    inputContainer: {
      minHeight: 62,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      borderTopWidth: 1,
      borderTopColor: "#292929",
      backgroundColor: "#111",
    },

    inputAvatar: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: "#333",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },

    input: {
      flex: 1,
      minHeight: 42,
      maxHeight: 90,
      borderRadius: 21,
      backgroundColor: "#242424",
      paddingHorizontal: 16,
      paddingVertical: 10,
      color: "#fff",
      fontSize: 13,
      marginRight: 8,
    },

    sendButton: {
      width: 35,
      height: 35,
      alignItems: "center",
      justifyContent: "center",
    },
  });