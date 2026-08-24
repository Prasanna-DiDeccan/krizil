import React from "react";

import {
  SafeAreaView,
  StyleSheet,
} from "react-native";

import ReelsScreen from "../reels/ReelsScreen";

export default function Reels() {
  return (
    <SafeAreaView style={styles.container}>
      <ReelsScreen />
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: "#000",
    },

  });