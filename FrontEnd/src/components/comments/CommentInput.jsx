import React, {
  useCallback,
  useRef,
  useState,
} from "react";

import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
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
// COMMENT INPUT
// ======================================================

export default function CommentInput({
  onSubmit,

  loading = false,

  placeholder =
    "Add a comment...",

  avatar = null,

  replyTo = null,

  onCancelReply,
}) {
  const [
    text,
    setText,
  ] = useState("");

  const inputRef =
    useRef(null);

  // ====================================================
  // AVATAR
  // ====================================================

  const avatarUrl =
    avatar
      ? getImageUrl(
          avatar
        )
      : null;

  // ====================================================
  // SUBMIT
  // ====================================================

  const handleSubmit =
    useCallback(() => {
      const trimmed =
        text.trim();

      if (
        !trimmed ||
        loading
      ) {
        return;
      }

      console.log(
        "================================"
      );

      console.log(
        replyTo
          ? "↩️ SUBMIT REPLY"
          : "💬 SUBMIT COMMENT"
      );

      console.log(
        "TEXT =>",
        trimmed
      );

      console.log(
        "================================"
      );

      onSubmit?.(
        trimmed
      );

      setText("");
    }, [
      text,
      loading,
      onSubmit,
      replyTo,
    ]);

  // ====================================================
  // CANCEL REPLY
  // ====================================================

  const handleCancelReply =
    useCallback(() => {
      setText("");

      onCancelReply?.();
    }, [
      onCancelReply,
    ]);

  // ====================================================
  // TEXT CHANGE
  // ====================================================

  const handleChangeText =
    useCallback(
      (value) => {
        setText(value);
      },
      []
    );

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
      keyboardVerticalOffset={
        Platform.OS === "ios"
          ? 8
          : 0
      }
    >
      <View
        style={
          styles.wrapper
        }
      >
        {/* ==================================================
            REPLY BAR
        ================================================== */}

        {replyTo ? (
          <View
            style={
              styles.replyBar
            }
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={
                  styles.replyText
                }
              >
                Replying to{" "}
                <Text
                  style={
                    styles.replyUsername
                  }
                >
                  {replyTo
                    ?.author
                    ?.username ||
                    replyTo
                      ?.author
                      ?.full_name ||
                    replyTo
                      ?.user
                      ?.username ||
                    replyTo
                      ?.username ||
                    "user"}
                </Text>
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={
                0.7
              }
              onPress={
                handleCancelReply
              }
              style={
                styles.cancelReplyButton
              }
            >
              <Ionicons
                name="close"
                size={18}
                color="#777"
              />
            </TouchableOpacity>
          </View>
        ) : null}

        {/* ==================================================
            INPUT
        ================================================== */}

        <View
          style={
            styles.container
          }
        >
          {/* AVATAR */}

          {avatarUrl ? (
            <Image
              source={{
                uri: avatarUrl,
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
                size={16}
                color="#777"
              />
            </View>
          )}

          {/* INPUT */}

          <TextInput
            ref={inputRef}
            value={text}
            onChangeText={
              handleChangeText
            }
            placeholder={
              replyTo
                ? "Write a reply..."
                : placeholder
            }
            placeholderTextColor="#777"
            multiline
            maxLength={500}
            editable={
              !loading
            }
            style={
              styles.input
            }
            textAlignVertical="center"
          />

          {/* SEND */}

          <TouchableOpacity
            activeOpacity={
              0.7
            }
            disabled={
              !text.trim() ||
              loading
            }
            onPress={
              handleSubmit
            }
            style={[
              styles.sendButton,
              {
                opacity:
                  !text.trim() ||
                  loading
                    ? 0.35
                    : 1,
              },
            ]}
          >
            {loading ? (
              <ActivityIndicator
                size="small"
                color="#0095F6"
              />
            ) : (
              <Ionicons
                name="send"
                size={20}
                color="#0095F6"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
// STYLES
// ======================================================

const styles =
  StyleSheet.create({
    wrapper: {
      backgroundColor:
        "#0B0B0B",

      borderTopWidth:
        StyleSheet.hairlineWidth,

      borderTopColor:
        "#292929",
    },

    // ==================================================
    // REPLY BAR
    // ==================================================

    replyBar: {
      minHeight: 38,

      paddingHorizontal: 14,

      flexDirection:
        "row",

      alignItems:
        "center",

      justifyContent:
        "space-between",

      backgroundColor:
        "#151515",

      borderBottomWidth:
        StyleSheet.hairlineWidth,

      borderBottomColor:
        "#292929",
    },

    replyText: {
      color: "#777",

      fontSize: 11,
    },

    replyUsername: {
      color: "#fff",

      fontWeight:
        "700",
    },

    cancelReplyButton: {
      width: 30,

      height: 30,

      alignItems:
        "center",

      justifyContent:
        "center",
    },

    // ==================================================
    // INPUT
    // ==================================================

    container: {
      minHeight: 61,

      flexDirection:
        "row",

      alignItems:
        "center",

      paddingHorizontal:
        12,

      paddingVertical: 9,

      backgroundColor:
        "#0B0B0B",
    },

    // ==================================================
    // AVATAR
    // ==================================================

    avatar: {
      width: 35,

      height: 35,

      borderRadius: 17.5,

      backgroundColor:
        "#222",

      marginRight: 9,
    },

    defaultAvatar: {
      width: 35,

      height: 35,

      borderRadius: 17.5,

      backgroundColor:
        "#222",

      alignItems:
        "center",

      justifyContent:
        "center",

      marginRight: 9,
    },

    // ==================================================
    // TEXT INPUT
    // ==================================================

    input: {
      flex: 1,

      minHeight: 40,

      maxHeight: 85,

      paddingHorizontal:
        14,

      paddingVertical: 9,

      borderRadius: 21,

      backgroundColor:
        "#1D1D1D",

      color: "#fff",

      fontSize: 13,
    },

    // ==================================================
    // SEND
    // ==================================================

    sendButton: {
      width: 39,

      height: 39,

      marginLeft: 4,

      alignItems:
        "center",

      justifyContent:
        "center",
    },
  });