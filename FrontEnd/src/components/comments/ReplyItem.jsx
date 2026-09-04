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
// REPLY ITEM
// ======================================================

export default function ReplyItem({
  reply,

  onLike,

  liking = false,
}) {
  // ====================================================
  // REPLY ID
  // ====================================================

  const replyId =
    Number(
      reply?.id
    );

  // ====================================================
  // USERNAME
  // ====================================================

  const username =
    useMemo(() => {
      return (
        reply?.author?.username ||
        reply?.author?.full_name ||
        reply?.user?.username ||
        reply?.user?.full_name ||
        reply?.username ||
        "user"
      );
    }, [reply]);

  // ====================================================
  // AVATAR
  // ====================================================

  const avatar =
    useMemo(() => {
      return (
        reply?.author?.avatar_url ||
        reply?.author?.avatar ||
        reply?.user?.avatar_url ||
        reply?.user?.avatar ||
        reply?.author_avatar ||
        reply?.user_avatar ||
        null
      );
    }, [reply]);

  // ====================================================
  // CONTENT
  // ====================================================

  const content =
    useMemo(() => {
      return (
        reply?.content ||
        reply?.text ||
        ""
      );
    }, [reply]);

  // ====================================================
  // LIKE
  // ====================================================

  const isLiked =
    Boolean(
      reply?.is_liked
    );

  const likesCount =
    Number(
      reply?.likes_count ??
        reply?.like_count ??
        0
    );

  // ====================================================
  // TIME
  // ====================================================

  const timeText =
    useMemo(() => {
      return formatReplyTime(
        reply
      );
    }, [reply]);

  // ====================================================
  // HANDLE LIKE
  // ====================================================

  const handleLike =
    useCallback(() => {
      if (
        !Number.isInteger(
          replyId
        ) ||
        replyId <= 0 ||
        liking
      ) {
        return;
      }

      console.log(
        "❤️ REPLY LIKE =>",
        replyId
      );

      onLike?.(
        replyId
      );
    }, [
      replyId,
      liking,
      onLike,
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
            size={13}
            color="#777"
          />
        </View>
      )}

      {/* ==================================================
          CONTENT
      ================================================== */}

      <View
        style={
          styles.contentContainer
        }
      >
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

        {/* META */}

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
              {likesCount ===
              1
                ? "like"
                : "likes"}
            </Text>
          ) : null}
        </View>
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
          size={14}
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

function formatReplyTime(
  reply
) {
  const value =
    reply?.created_at ||
    reply?.createdAt ||
    reply?.timestamp;

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

  if (seconds < 60) {
    return "now";
  }

  const minutes =
    Math.floor(
      seconds / 60
    );

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours =
    Math.floor(
      minutes / 60
    );

  if (hours < 24) {
    return `${hours}h`;
  }

  const days =
    Math.floor(
      hours / 24
    );

  if (days < 7) {
    return `${days}d`;
  }

  const weeks =
    Math.floor(
      days / 7
    );

  if (weeks < 4) {
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

      marginBottom:
        12,

      paddingVertical: 2,
    },

    // ==================================================
    // AVATAR
    // ==================================================

    avatar: {
      width: 30,

      height: 30,

      borderRadius: 15,

      backgroundColor:
        "#222",

      marginRight: 9,
    },

    defaultAvatar: {
      width: 30,

      height: 30,

      borderRadius: 15,

      backgroundColor:
        "#222",

      alignItems:
        "center",

      justifyContent:
        "center",

      marginRight: 9,
    },

    // ==================================================
    // CONTENT
    // ==================================================

    contentContainer: {
      flex: 1,

      paddingRight: 5,
    },

    commentText: {
      color: "#eee",

      fontSize: 12,

      lineHeight: 18,
    },

    username: {
      color: "#fff",

      fontSize: 12,

      fontWeight:
        "700",
    },

    content: {
      color: "#ddd",

      fontSize: 12,
    },

    // ==================================================
    // META
    // ==================================================

    metaRow: {
      flexDirection:
        "row",

      alignItems:
        "center",

      gap: 12,

      marginTop: 4,
    },

    metaText: {
      color: "#666",

      fontSize: 10,
    },

    // ==================================================
    // LIKE
    // ==================================================

    likeButton: {
      width: 28,

      height: 28,

      alignItems:
        "center",

      justifyContent:
        "center",
    },
  });