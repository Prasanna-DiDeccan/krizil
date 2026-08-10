import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <View style={styles.container}>
      {/* Posts */}

      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === "posts" &&
            styles.activeTab,
        ]}
        onPress={() => setActiveTab("posts")}
      >
        <Ionicons
          name="grid-outline"
          size={24}
          color={
            activeTab === "posts"
              ? "#A855F7"
              : "#7E7E89"
          }
        />
      </TouchableOpacity>

      {/* Reels */}

      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === "reels" &&
            styles.activeTab,
        ]}
        onPress={() => setActiveTab("reels")}
      >
        <Ionicons
          name="play-circle-outline"
          size={25}
          color={
            activeTab === "reels"
              ? "#A855F7"
              : "#7E7E89"
          }
        />
      </TouchableOpacity>

      {/* Tagged */}

      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === "tagged" &&
            styles.activeTab,
        ]}
        onPress={() => setActiveTab("tagged")}
      >
        <Ionicons
          name="person-outline"
          size={24}
          color={
            activeTab === "tagged"
              ? "#A855F7"
              : "#7E7E89"
          }
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 18,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#24242D",
    backgroundColor: "#080913",
  },

  tab: {
    flex: 1,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },

  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#A855F7",
  },
});