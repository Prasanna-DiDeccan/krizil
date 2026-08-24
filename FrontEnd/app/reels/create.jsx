import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import * as ImagePicker from "expo-image-picker";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useRouter } from "expo-router";

export default function CreateReel() {
  const router = useRouter();

  const [selecting, setSelecting] = useState(false);

  // ======================================================
  // PICK VIDEO
  // ======================================================

  const pickVideo = async () => {
    try {
      setSelecting(true);

      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow gallery access to select a video."
        );

        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["videos"],
          allowsEditing: false,
          quality: 1,
          videoMaxDuration: 90,
        });

      if (result.canceled) {
        return;
      }

      const asset = result.assets?.[0];

      if (!asset) {
        return;
      }

      console.log(
        "🎬 SELECTED VIDEO =>",
        asset
      );

      // ==================================================
      // CHECK DURATION
      // ==================================================

      if (
        asset.duration &&
        asset.duration > 90000
      ) {
        Alert.alert(
          "Video Too Long",
          "Reels can be maximum 90 seconds."
        );

        return;
      }

      // ==================================================
      // NEXT SCREEN
      // ==================================================

      router.push({
        pathname: "/reels/preview",

        params: {
          uri: asset.uri,

          fileName:
            asset.fileName ||
            `reel_${Date.now()}.mp4`,

          mimeType:
            asset.mimeType ||
            "video/mp4",

          duration: String(
            asset.duration || 0
          ),
        },
      });
    } catch (error) {
      console.log(
        "❌ VIDEO PICK ERROR =>",
        error
      );

      Alert.alert(
        "Error",
        "Unable to select video."
      );
    } finally {
      setSelecting(false);
    }
  };

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
            name="close"
            size={30}
            color="#fff"
          />
        </Pressable>

        <Text style={styles.title}>
          Create Reel
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      {/* CONTENT */}

      <View style={styles.center}>
        <View style={styles.iconCircle}>
          <Ionicons
            name="videocam-outline"
            size={48}
            color="#fff"
          />
        </View>

        <Text style={styles.heading}>
          Create a Reel
        </Text>

        <Text style={styles.subtitle}>
          Upload a video from your gallery
        </Text>

        <Pressable
          style={[
            styles.selectButton,
            selecting && styles.disabled,
          ]}
          onPress={pickVideo}
          disabled={selecting}
        >
          <Ionicons
            name="add"
            size={22}
            color="#fff"
          />

          <Text style={styles.selectText}>
            {selecting
              ? "Opening Gallery..."
              : "Select Video"}
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

  headerSpacer: {
    width: 30,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  center: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 30,
  },

  iconCircle: {
    width: 100,
    height: 100,

    borderRadius: 50,

    backgroundColor: "#222",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 25,
  },

  heading: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  subtitle: {
    color: "#aaa",
    fontSize: 14,

    marginTop: 8,
    marginBottom: 30,
  },

  selectButton: {
    height: 48,
    minWidth: 190,

    borderRadius: 8,

    backgroundColor: "#0095f6",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    gap: 8,
  },

  disabled: {
    opacity: 0.5,
  },

  selectText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});