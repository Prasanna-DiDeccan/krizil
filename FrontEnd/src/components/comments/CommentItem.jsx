import React, {
  useCallback,
  useMemo,
} from "react";

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  BASE_URL,
} from "../../utils/api";

// ======================================================
// COMMENT ITEM
// ======================================================

export default function CommentItem({
  comment,

  currentUserId,

  onLike,

  onReply,

  onDelete,

  onViewReplies,

  liking = false,

  deleting = false,

  loadingReplies = false,
}) {
  // ====================================================
  // COMMENT ID
  // ====================================================

  const commentId = Number(
    comment?.id
  );

  // ====================================================
  // COMMENT AUTHOR
  // Backend now returns:
  //
  // "author": {
  //   "id": 16,
  //   "username": "srinivas_b",
  //   ...
  // }
  // ====================================================

  const author =
    comment?.author ||
    comment?.user ||
    null;

  // ====================================================
  // COMMENT USER ID
  // ====================================================

  const commentUserId =
    Number(
      comment?.author?.id ??
      comment?.user?.id ??
      comment?.user_id
    );

  // ====================================================
  // CURRENT USER ID
  // ====================================================

  const normalizedCurrentUserId =
    Number(
      currentUserId
    );

  // ====================================================
  // OWNER
  // ====================================================

  const isOwner =
    Number.isInteger(
      normalizedCurrentUserId
    ) &&
    normalizedCurrentUserId > 0 &&
    Number.isInteger(
      commentUserId
    ) &&
    commentUserId > 0 &&
    normalizedCurrentUserId ===
      commentUserId;

  // ====================================================
  // DEBUG OWNER
  // ====================================================

  console.log(
    "================================"
  );

  console.log(
    "💬 COMMENT ITEM"
  );

  console.log(
    "COMMENT ID =>",
    commentId
  );

  console.log(
    "COMMENT AUTHOR =>",
    comment?.author
  );

  console.log(
    "COMMENT USER =>",
    comment?.user
  );

  console.log(
    "COMMENT user_id =>",
    comment?.user_id
  );

  console.log(
    "COMMENT AUTHOR ID =>",
    comment?.author?.id
  );

  console.log(
    "RESOLVED COMMENT USER ID =>",
    commentUserId
  );

  console.log(
    "CURRENT USER ID =>",
    normalizedCurrentUserId
  );

  console.log(
    "IS OWNER =>",
    isOwner
  );

  console.log(
    "================================"
  );

  // ====================================================
  // USERNAME
  // ====================================================

  const username =
    useMemo(() => {
      return (
        comment?.author?.username ||
        comment?.author?.full_name ||
        comment?.user?.username ||
        comment?.user?.full_name ||
        comment?.username ||
        "user"
      );
    }, [
      comment,
    ]);

  // ====================================================
  // AVATAR
  // ====================================================

  const avatar =
    useMemo(() => {
      return (
        comment?.author?.avatar_url ||
        comment?.author?.avatar ||
        comment?.user?.avatar_url ||
        comment?.user?.avatar ||
        comment?.author_avatar ||
        comment?.user_avatar ||
        null
      );
    }, [
      comment,
    ]);

  // ====================================================
  // CONTENT
  // ====================================================

  const content =
    useMemo(() => {
      return (
        comment?.content ||
        comment?.text ||
        ""
      );
    }, [
      comment,
    ]);

  // ====================================================
  // LIKE
  // ====================================================

  const isLiked =
    Boolean(
      comment?.is_liked
    );

  const likesCount =
    Number(
      comment?.likes_count ??
      comment?.like_count ??
      0
    );

  // ====================================================
  // REPLIES
  // ====================================================

  const repliesCount =
    Number(
      comment?.replies_count ??
      comment?.reply_count ??
      0
    );

  // ====================================================
  // TIME
  // ====================================================

  const timeText =
    useMemo(() => {
      return formatCommentTime(
        comment
      );
    }, [
      comment,
    ]);

  // ====================================================
  // LIKE
  // ====================================================

  const handleLike =
    useCallback(() => {
      if (
        !commentId ||
        !Number.isInteger(
          commentId
        ) ||
        liking
      ) {
        return;
      }

      console.log(
        "❤️ COMMENT LIKE CLICK =>",
        commentId
      );

      onLike?.(
        commentId
      );
    }, [
      commentId,
      liking,
      onLike,
    ]);

  // ====================================================
  // REPLY
  // ====================================================

  const handleReply =
    useCallback(() => {
      if (
        !commentId ||
        !Number.isInteger(
          commentId
        )
      ) {
        return;
      }

      console.log(
        "↩️ REPLY CLICK =>",
        commentId
      );

      onReply?.(
        comment
      );
    }, [
      commentId,
      comment,
      onReply,
    ]);

  // ====================================================
  // DELETE
  // ====================================================

  const handleDelete =
    useCallback(() => {
      if (
        !commentId ||
        !Number.isInteger(
          commentId
        )
      ) {
        console.log(
          "❌ INVALID COMMENT ID =>",
          commentId
        );

        return;
      }

      if (!isOwner) {
        console.log(
          "❌ DELETE BLOCKED - NOT OWNER"
        );

        console.log(
          "COMMENT AUTHOR ID =>",
          commentUserId
        );

        console.log(
          "CURRENT USER ID =>",
          normalizedCurrentUserId
        );

        return;
      }

      if (deleting) {
        return;
      }

      console.log(
        "================================"
      );

      console.log(
        "🗑️ COMMENT DELETE CLICK"
      );

      console.log(
        "COMMENT ID =>",
        commentId
      );

      console.log(
        "COMMENT AUTHOR ID =>",
        commentUserId
      );

      console.log(
        "CURRENT USER ID =>",
        normalizedCurrentUserId
      );

      console.log(
        "IS OWNER =>",
        isOwner
      );

      console.log(
        "================================"
      );

      onDelete?.(
        commentId
      );
    }, [
      commentId,
      commentUserId,
      normalizedCurrentUserId,
      isOwner,
      deleting,
      onDelete,
    ]);

  // ====================================================
  // VIEW REPLIES
  // ====================================================

  const handleViewReplies =
    useCallback(() => {
      if (
        !commentId ||
        loadingReplies
      ) {
        return;
      }

      console.log(
        "================================"
      );

      console.log(
        "👆 VIEW REPLIES CLICK"
      );

      console.log(
        "COMMENT ID =>",
        commentId
      );

      console.log(
        "================================"
      );

      onViewReplies?.(
        commentId
      );
    }, [
      commentId,
      loadingReplies,
      onViewReplies,
    ]);

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <View
      style={
        styles.container
      }
    >
      {/* ==================================================
          AVATAR
      ================================================== */}

      {avatar ? (
        <Image
          source={{
            uri: getImageUrl(
              avatar
            ),
          }}
          style={
            styles.avatar
          }
        />
      ) : (
        <View
          style={
            styles.defaultAvatar
          }
        >
          <Ionicons
            name="person"
            size={15}
            color="#777"
          />
        </View>
      )}

      {/* ==================================================
          MAIN
      ================================================== */}

      <View
        style={
          styles.main
        }
      >
        {/* COMMENT */}

        <Text
          style={
            styles.commentText
          }
        >
          <Text
            style={
              styles.username
            }
          >
            {username}
          </Text>

          {"  "}

          <Text
            style={
              styles.content
            }
          >
            {content}
          </Text>
        </Text>

        {/* ==================================================
            META
        ================================================== */}

        <View
          style={
            styles.metaRow
          }
        >
          {timeText ? (
            <Text
              style={
                styles.metaText
              }
            >
              {timeText}
            </Text>
          ) : null}

          {likesCount > 0 ? (
            <Text
              style={
                styles.metaText
              }
            >
              {likesCount}{" "}
              {likesCount === 1
                ? "like"
                : "likes"}
            </Text>
          ) : null}

          {/* REPLY */}

          <TouchableOpacity
            activeOpacity={
              0.7
            }
            onPress={
              handleReply
            }
          >
            <Text
              style={
                styles.metaTextBold
              }
            >
              Reply
            </Text>
          </TouchableOpacity>

          {/* ==================================================
              DELETE
          ================================================== */}

          {isOwner ? (
            <TouchableOpacity
              activeOpacity={
                0.7
              }
              disabled={
                deleting
              }
              onPress={
                handleDelete
              }
            >
              <Text
                style={[
                  styles.metaText,
                  styles.deleteText,
                ]}
              >
                {deleting
                  ? "Deleting..."
                  : "Delete"}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* ==================================================
            VIEW REPLIES
        ================================================== */}

        {repliesCount > 0 ? (
          <TouchableOpacity
            activeOpacity={
              0.7
            }
            disabled={
              loadingReplies
            }
            onPress={
              handleViewReplies
            }
            style={
              styles.repliesButton
            }
          >
            <View
              style={
                styles.replyLine
              }
            />

            <Text
              style={
                styles.repliesText
              }
            >
              {loadingReplies
                ? "Loading replies..."
                : `View ${repliesCount} ${
                    repliesCount === 1
                      ? "reply"
                      : "replies"
                  }`}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* ==================================================
          LIKE
      ================================================== */}

      <TouchableOpacity
        activeOpacity={
          0.7
        }
        disabled={
          liking
        }
        onPress={
          handleLike
        }
        style={
          styles.likeButton
        }
      >
        <Ionicons
          name={
            isLiked
              ? "heart"
              : "heart-outline"
          }
          size={15}
          color={
            isLiked
              ? "#ED4956"
              : "#777"
          }
        />
      </TouchableOpacity>
    </View>
  );
}

// ======================================================
// IMAGE URL
// ======================================================

function getImageUrl(
  image
) {
  if (!image) {
    return null;
  }

  if (
    image.startsWith(
      "http://"
    ) ||
    image.startsWith(
      "https://"
    )
  ) {
    return image;
  }

  if (
    image.startsWith("/")
  ) {
    return `${BASE_URL}${image}`;
  }

  return `${BASE_URL}/${image}`;
}

// ======================================================
// TIME
// ======================================================

function formatCommentTime(
  comment
) {
  const value =
    comment?.created_at ||
    comment?.createdAt ||
    comment?.timestamp;

  if (!value) {
    return "";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  const now =
    new Date();

  const seconds =
    Math.floor(
      (now - date) / 1000
    );

  if (
    seconds < 60
  ) {
    return "now";
  }

  const minutes =
    Math.floor(
      seconds / 60
    );

  if (
    minutes < 60
  ) {
    return `${minutes}m`;
  }

  const hours =
    Math.floor(
      minutes / 60
    );

  if (
    hours < 24
  ) {
    return `${hours}h`;
  }

  const days =
    Math.floor(
      hours / 24
    );

  if (
    days < 7
  ) {
    return `${days}d`;
  }

  const weeks =
    Math.floor(
      days / 7
    );

  if (
    weeks < 4
  ) {
    return `${weeks}w`;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
    }
  );
}

// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({
    container: {
      flexDirection:
        "row",

      alignItems:
        "flex-start",

      paddingHorizontal:
        15,

      marginBottom:
        15,
    },

    avatar: {
      width: 37,

      height: 37,

      borderRadius: 18.5,

      backgroundColor:
        "#222",

      marginRight: 10,
    },

    defaultAvatar: {
      width: 37,

      height: 37,

      borderRadius: 18.5,

      backgroundColor:
        "#222",

      alignItems:
        "center",

      justifyContent:
        "center",

      marginRight: 10,
    },

    main: {
      flex: 1,

      paddingRight: 5,
    },

    commentText: {
      color: "#fff",

      fontSize: 13,

      lineHeight: 19,
    },

    username: {
      color: "#fff",

      fontSize: 13,

      fontWeight:
        "700",
    },

    content: {
      color: "#eee",

      fontSize: 13,
    },

    metaRow: {
      flexDirection:
        "row",

      alignItems:
        "center",

      gap: 13,

      marginTop: 5,
    },

    metaText: {
      color: "#777",

      fontSize: 10,
    },

    metaTextBold: {
      color: "#999",

      fontSize: 10,

      fontWeight:
        "700",
    },

    deleteText: {
      color:
        "#ED4956",

      fontWeight:
        "700",
    },

    repliesButton: {
      flexDirection:
        "row",

      alignItems:
        "center",

      marginTop: 9,

      paddingVertical: 2,
    },

    replyLine: {
      width: 25,

      height: 1,

      backgroundColor:
        "#444",

      marginRight: 8,
    },

    repliesText: {
      color: "#999",

      fontSize: 11,

      fontWeight:
        "600",
    },

    likeButton: {
      width: 30,

      height: 30,

      alignItems:
        "center",

      justifyContent:
        "center",
    },
  });