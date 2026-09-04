import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function EditorHeader({
  onBack,
  onReset,
  onNext,
  saving,
}) {
  const insets =
    useSafeAreaInsets();

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      {/* ==========================================
          ACTUAL HEADER ROW
      =========================================== */}

      <View
        style={styles.headerRow}
      >
        {/* BACK */}

        <TouchableOpacity
          style={styles.sideButton}
          onPress={onBack}
          disabled={saving}
          activeOpacity={0.7}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>

        {/* CENTER TITLE */}

        <View
          style={styles.center}
          pointerEvents="none"
        >
          <Text
            style={styles.title}
          >
            Edit
          </Text>
        </View>

        {/* RIGHT */}

        <View
          style={styles.right}
        >
          <TouchableOpacity
            style={styles.resetButton}
            onPress={onReset}
            disabled={saving}
            activeOpacity={0.7}
          >
            <Text
              style={styles.reset}
            >
              Reset
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={onNext}
            disabled={saving}
            activeOpacity={0.7}
          >
            <Text
              style={styles.next}
            >
              {saving
                ? "..."
                : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    // ==========================================
    // SAFE AREA CONTAINER
    // ==========================================

    header: {
      width: "100%",
      backgroundColor: "#000",
      borderBottomWidth: 0.5,
      borderBottomColor: "#222",
    },

    // ==========================================
    // FIXED 56px HEADER
    // ==========================================

    headerRow: {
      width: "100%",
      height: 56,

      paddingHorizontal: 12,

      flexDirection: "row",
      alignItems: "center",

      position: "relative",
    },

    // ==========================================
    // BACK BUTTON
    // ==========================================

    sideButton: {
      width: 50,
      height: 56,

      justifyContent: "center",
      alignItems: "flex-start",
    },

    // ==========================================
    // CENTER
    // ==========================================

    center: {
      position: "absolute",

      left: 0,
      right: 0,

      top: 0,
      bottom: 0,

      justifyContent: "center",
      alignItems: "center",
    },

    title: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600",
    },

    // ==========================================
    // RIGHT BUTTONS
    // ==========================================

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
      alignItems: "center",
    },

    nextButton: {
      height: 56,

      justifyContent: "center",
      alignItems: "center",
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