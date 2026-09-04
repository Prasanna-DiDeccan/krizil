import React from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  LinearGradient,
} from "expo-linear-gradient";

import {
  getMediaUrl,
} from "../../utils/media";


const STORY_SIZE = 72;
const AVATAR_SIZE = 64;


export default function StoriesItem({
  user,
  stories = [],
  hasUnseen = false,
  isMine = false,
  hasStory = true,
  avatarUrl,
  onPress,
}) {
  const username =
    user?.username ||
    "User";

  const finalAvatar =
    avatarUrl ||
    (
      user?.avatar_url
        ? getMediaUrl(
            user.avatar_url
          )
        : null
    );

  // =====================================================
  // AVATAR
  // =====================================================

  const renderAvatar = () => {
    if (finalAvatar) {
      return (
        <Image
          source={{
            uri: finalAvatar,
          }}
          style={
            styles.avatar
          }
        />
      );
    }

    return (
      <View
        style={
          styles.avatarPlaceholder
        }
      >
        <Text
          style={
            styles.avatarLetter
          }
        >
          {username
            .charAt(0)
            .toUpperCase()}
        </Text>
      </View>
    );
  };

  // =====================================================
  // RING
  // =====================================================

  const renderRing = () => {
    /*
      My Story with no story:
      normal gray ring

      Story exists:
      Instagram gradient ring

      Seen:
      gray ring
    */

    if (
      isMine &&
      !hasStory
    ) {
      return (
        <View
          style={
            styles.seenRing
          }
        >
          {renderAvatar()}

          {renderPlus()}
        </View>
      );
    }

    if (
      hasUnseen ||
      hasStory
    ) {
      return (
        <LinearGradient
          colors={[
            "#feda75",
            "#fa7e1e",
            "#d62976",
            "#962fbf",
            "#4f5bd5",
          ]}
          start={{
            x: 0,
            y: 1,
          }}
          end={{
            x: 1,
            y: 0,
          }}
          style={
            styles.gradientRing
          }
        >
          {renderAvatar()}
        </LinearGradient>
      );
    }

    return (
      <View
        style={
          styles.seenRing
        }
      >
        {renderAvatar()}
      </View>
    );
  };

  // =====================================================
  // PLUS
  // =====================================================

  const renderPlus = () => {
    if (
      !isMine ||
      hasStory
    ) {
      return null;
    }

    return (
      <View
        style={
          styles.plusButton
        }
      >
        <Text
          style={
            styles.plusText
          }
        >
          +
        </Text>
      </View>
    );
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={
        styles.container
      }
    >
      {/* STORY CIRCLE */}

      <View
        style={
          styles.ringWrapper
        }
      >
        {renderRing()}
      </View>

      {/* USERNAME */}

      <Text
        numberOfLines={1}
        style={
          styles.username
        }
      >
        {isMine
          ? "Your story"
          : username}
      </Text>
    </TouchableOpacity>
  );
}


// =====================================================
// STYLES
// =====================================================

const styles =
  StyleSheet.create({

    container: {
      width: 78,
      alignItems: "center",
      justifyContent:
        "flex-start",
    },

    ringWrapper: {
      width: STORY_SIZE,
      height: STORY_SIZE,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    // =================================================
    // GRADIENT RING
    // =================================================

    gradientRing: {
      width: STORY_SIZE,
      height: STORY_SIZE,
      borderRadius:
        STORY_SIZE / 2,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    // =================================================
    // SEEN RING
    // =================================================

    seenRing: {
      width: STORY_SIZE,
      height: STORY_SIZE,
      borderRadius:
        STORY_SIZE / 2,
      borderWidth: 2,
      borderColor: "#555",
      justifyContent:
        "center",
      alignItems:
        "center",
      position: "relative",
    },

    // =================================================
    // AVATAR
    // =================================================

    avatar: {
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      borderRadius:
        AVATAR_SIZE / 2,
      backgroundColor:
        "#222",
    },

    avatarPlaceholder: {
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      borderRadius:
        AVATAR_SIZE / 2,
      backgroundColor:
        "#222",
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    avatarLetter: {
      color: "#aaa",
      fontSize: 22,
      fontWeight: "600",
    },

    // =================================================
    // PLUS
    // =================================================

    plusButton: {
      position: "absolute",
      right: -1,
      bottom: -1,

      width: 22,
      height: 22,

      borderRadius: 11,

      backgroundColor:
        "#0095F6",

      justifyContent:
        "center",

      alignItems:
        "center",

      borderWidth: 2,

      borderColor:
        "#000",
    },

    plusText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
      lineHeight: 18,
    },

    // =================================================
    // USERNAME
    // =================================================

    username: {
      width: 78,
      marginTop: 5,
      textAlign: "center",
      color: "#fff",
      fontSize: 12,
      fontWeight: "400",
    },
  });