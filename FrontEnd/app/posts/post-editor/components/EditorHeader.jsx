import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EditorHeader({
  onBack,
  onReset,
  onNext,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: insets.top,
          height: insets.top + 56,
        },
      ]}
    >
      {/* LEFT */}

      <TouchableOpacity
        style={styles.sideButton}
        onPress={onBack}
        activeOpacity={0.7}
      >
        <Ionicons
          name="chevron-back"
          size={28}
          color="#fff"
        />
      </TouchableOpacity>

      {/* CENTER */}

      <View style={styles.center}>
        <Text style={styles.title}>
          Edit
        </Text>
      </View>

      {/* RIGHT */}

      <View style={styles.right}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={onReset}
          activeOpacity={0.7}
        >
          <Text style={styles.reset}>
            Reset
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={onNext}
          activeOpacity={0.7}
        >
          <Text style={styles.next}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",

    paddingHorizontal: 12,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#000",

    borderBottomWidth: 0.5,
    borderBottomColor: "#222",
  },

  /*
   * LEFT
   */

  sideButton: {
    width: 70,
    height: 56,

    justifyContent: "center",
    alignItems: "flex-start",
  },

  /*
   * CENTER
   *
   * Absolute positioning keeps "Edit"
   * exactly in the center of the screen,
   * regardless of Reset / Next width.
   */

  center: {
    position: "absolute",

    left: 0,
    right: 0,

    height: 56,

    justifyContent: "center",
    alignItems: "center",

    pointerEvents: "none",
  },

  title: {
    color: "#fff",

    fontSize: 18,
    fontWeight: "600",
  },

  /*
   * RIGHT
   */

  right: {
    marginLeft: "auto",

    height: 56,

    flexDirection: "row",
    alignItems: "center",

    gap: 18,
  },

  resetButton: {
    height: 56,

    justifyContent: "center",
  },

  nextButton: {
    height: 56,

    justifyContent: "center",
  },

  reset: {
    color: "#999",

    fontSize: 14,
    fontWeight: "500",
  },

  next: {
    color: "#0095F6",

    fontSize: 16,
    fontWeight: "600",
  },
});