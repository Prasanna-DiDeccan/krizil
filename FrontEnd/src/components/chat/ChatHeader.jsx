import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ChatHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>

      <TouchableOpacity activeOpacity={0.7}>
        <Ionicons
          name="search-outline"
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 55,
    paddingHorizontal: 20,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
  },
});