import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ReelInfo() {
  return (
    <View style={styles.container}>
      {/* Username + Verified + Follow */}

      <View style={styles.userRow}>
        <Text style={styles.username}>
          Megha Official
        </Text>

        <MaterialIcons
          name="verified"
          size={16}
          color="#2F80ED"
          style={{ marginLeft: 5 }}
        />

        <TouchableOpacity style={styles.followBtn}>
          <Text style={styles.followText}>
            Follow
          </Text>
        </TouchableOpacity>
      </View>

      {/* Caption */}

      <Text style={styles.caption}>
        In the middle of nature, I found peace 🌿
      </Text>

      {/* Hashtags */}

      <Text style={styles.hashtags}>
        #nature #travel #krizil
      </Text>

      {/* Music */}

      <View style={styles.musicRow}>
        <MaterialIcons
          name="music-note"
          size={16}
          color="#fff"
        />

        <Text style={styles.musicText}>
          Original Audio • Megha Official
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 18,
    right: 90,
    bottom: 35,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  username: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  followBtn: {
    marginLeft: 14,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },

  followText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  caption: {
    color: "#fff",
    fontSize: 15,
    marginTop: 12,
    lineHeight: 22,
  },

  hashtags: {
    color: "#A855F7",
    marginTop: 8,
    fontSize: 15,
    fontWeight: "600",
  },

  musicRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  musicText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 14,
  },
});