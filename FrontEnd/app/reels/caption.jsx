import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  createReel,
} from "../../src/redux/reelsSlice";

export default function ReelCaption() {
  const router = useRouter();

  const dispatch = useDispatch();

  const params = useLocalSearchParams();

  const [caption, setCaption] =
    useState("");

  // ======================================================
  // REDUX STATE
  // ======================================================

  const creatingReel =
    useSelector(
      (state) =>
        state.reels.creatingReel
    );

  const createReelError =
    useSelector(
      (state) =>
        state.reels.createReelError
    );

  // ======================================================
  // SHARE
  // ======================================================

  const handleShare = async () => {
  const uri =
    typeof params.uri === "string"
      ? params.uri
      : params.uri?.[0];

  const fileName =
    typeof params.fileName === "string"
      ? params.fileName
      : `reel_${Date.now()}.mp4`;

  const mimeType =
    typeof params.mimeType === "string"
      ? params.mimeType
      : "video/mp4";

  if (!uri) {
    Alert.alert(
      "Error",
      "Video is missing."
    );

    return;
  }

  try {
    console.log("====================================");
    console.log("🚀 SHARING REEL");
    console.log("VIDEO URI =>", uri);
    console.log("FILE NAME =>", fileName);
    console.log("MIME TYPE =>", mimeType);
    console.log("CAPTION =>", caption);

    const result = await dispatch(
      createReel({
        video: {
          uri,
          fileName,
          mimeType,
        },
        caption,
      })
    );

    if (createReel.fulfilled.match(result)) {
      console.log(
        "🎉 REEL CREATED SUCCESSFULLY",
        result.payload
      );

      Alert.alert(
        "Success",
        "Your reel has been posted!",
        [
          {
            text: "OK",
            onPress: () => {
              router.replace(
                "/(tabs)/reels"
              );
            },
          },
        ]
      );

      return;
    }

    console.log(
      "❌ CREATE REEL FAILED",
      result.payload
    );

    const errorMessage =
      typeof result.payload === "string"
        ? result.payload
        : result.payload?.detail
        ? JSON.stringify(
            result.payload.detail
          )
        : createReelError ||
          "Unable to upload reel.";

    Alert.alert(
      "Upload Failed",
      errorMessage
    );

  } catch (error) {
    console.log(
      "❌ SHARE REEL ERROR =>",
      error
    );

    Alert.alert(
      "Error",
      error?.message ||
        "Something went wrong while uploading."
    );
  }
};

  // ======================================================
  // UI
  // ======================================================

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "bottom"]}
    >
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        {/* HEADER */}

        <View style={styles.header}>
          <Pressable
            onPress={() =>
              router.back()
            }
            disabled={creatingReel}
            hitSlop={10}
          >
            <Text style={styles.cancel}>
              Cancel
            </Text>
          </Pressable>

          <Text style={styles.title}>
            New Reel
          </Text>

          <Pressable
            onPress={handleShare}
            disabled={creatingReel}
            hitSlop={10}
          >
            <Text
              style={[
                styles.share,
                creatingReel &&
                  styles.disabled,
              ]}
            >
              {creatingReel
                ? "Sharing..."
                : "Share"}
            </Text>
          </Pressable>
        </View>

        {/* CONTENT */}

        <View style={styles.content}>
          {/* VIDEO PREVIEW */}

          <View
            style={
              styles.previewContainer
            }
          >
            <Text
              style={
                styles.previewText
              }
            >
              Video selected
            </Text>

            <Text
              style={
                styles.previewFile
              }
              numberOfLines={2}
            >
              {params.fileName ||
                "Selected video"}
            </Text>
          </View>

          {/* CAPTION */}

          <TextInput
            value={caption}
            onChangeText={setCaption}
            placeholder="Write a caption..."
            placeholderTextColor="#777"
            multiline
            maxLength={2200}
            editable={!creatingReel}
            style={styles.input}
          />

          <Text style={styles.counter}>
            {caption.length}/2200
          </Text>
        </View>

        {/* OPTIONS */}

        <View style={styles.options}>
          <Pressable
            style={styles.option}
            disabled={creatingReel}
          >
            <Text
              style={styles.optionText}
            >
              Add location
            </Text>

            <Text style={styles.arrow}>
              ›
            </Text>
          </Pressable>

          <Pressable
            style={styles.option}
            disabled={creatingReel}
          >
            <Text
              style={styles.optionText}
            >
              Tag people
            </Text>

            <Text style={styles.arrow}>
              ›
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  keyboardContainer: {
    flex: 1,
  },

  header: {
    height: 60,

    paddingHorizontal: 16,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },

  cancel: {
    color: "#fff",
    fontSize: 15,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  share: {
    color: "#0095f6",
    fontSize: 16,
    fontWeight: "700",
  },

  disabled: {
    opacity: 0.5,
  },

  content: {
    padding: 16,
  },

  previewContainer: {
    width: 110,
    height: 150,

    borderRadius: 8,

    backgroundColor: "#181818",

    justifyContent: "center",
    alignItems: "center",

    padding: 10,

    marginBottom: 20,
  },

  previewText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },

  previewFile: {
    color: "#888",
    fontSize: 10,

    marginTop: 8,

    textAlign: "center",
  },

  input: {
    minHeight: 100,

    color: "#fff",

    fontSize: 16,

    textAlignVertical: "top",

    borderBottomWidth: 1,
    borderBottomColor: "#333",

    paddingVertical: 10,
  },

  counter: {
    color: "#777",

    fontSize: 12,

    textAlign: "right",

    marginTop: 5,
  },

  options: {
    marginTop: 10,

    borderTopWidth: 1,
    borderTopColor: "#222",
  },

  option: {
    height: 55,

    paddingHorizontal: 16,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },

  optionText: {
    color: "#fff",
    fontSize: 15,
  },

  arrow: {
    color: "#aaa",
    fontSize: 25,
  },
});