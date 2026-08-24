import React, { useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  useVideoPlayer,
  VideoView,
} from "expo-video";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function ReelPreview() {
  const router = useRouter();

  const params = useLocalSearchParams();

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

  // ======================================================
  // VIDEO PLAYER
  // ======================================================

  const player = useVideoPlayer(
    uri,
    (player) => {
      player.loop = true;
      player.muted = false;
      player.play();
    }
  );

  // ======================================================
  // CLEANUP
  // ======================================================

  useEffect(() => {
    return () => {
      try {
        player?.pause();
      } catch (error) {
        console.log(
          "PLAYER CLEANUP ERROR",
          error
        );
      }
    };
  }, [player]);

  // ======================================================
  // NEXT
  // ======================================================

  const handleNext = () => {
    if (!uri) {
      return;
    }

    try {
      player?.pause();
    } catch (error) {}

    router.push({
      pathname: "/reels/caption",

      params: {
        uri,
        fileName,
        mimeType,
      },
    });
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "bottom"]}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#fff"
          />
        </Pressable>

        <Text style={styles.title}>
          New Reel
        </Text>

        <Pressable
          onPress={handleNext}
          hitSlop={10}
        >
          <Text style={styles.next}>
            Next
          </Text>
        </Pressable>
      </View>

      {/* VIDEO */}

      <View style={styles.videoContainer}>
        {uri && (
          <VideoView
            player={player}
            style={styles.video}
            contentFit="contain"
            nativeControls={false}
            fullscreenOptions={{
              enabled: false,
            }}
          />
        )}
      </View>

      {/* BOTTOM */}

      <View style={styles.bottom}>
        <Pressable
          style={styles.bottomButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="images-outline"
            size={22}
            color="#fff"
          />

          <Text style={styles.bottomText}>
            Change video
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
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

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  next: {
    color: "#0095f6",
    fontSize: 16,
    fontWeight: "700",
  },

  videoContainer: {
    flex: 1,

    width: "100%",

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#000",

    overflow: "hidden",
  },

  video: {
    width: "100%",
    height: "100%",
  },

  bottom: {
    height: 70,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#000",
  },

  bottomButton: {
    flexDirection: "row",
    alignItems: "center",

    gap: 8,
  },

  bottomText: {
    color: "#fff",
    fontSize: 14,
  },
});