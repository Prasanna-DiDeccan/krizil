import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ChatSearchBar() {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={18}
        color="#7D7D88"
      />

      <TextInput
        placeholder="Search"
        placeholderTextColor="#7D7D88"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    marginHorizontal: 20,
    marginBottom: 22,
    backgroundColor: "#171821",
    borderRadius: 14,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#fff",
    fontSize: 15,
  },
});