import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ReelActions() {
  return (
    <View style={styles.container}>
      {/* Profile */}
      <View style={styles.profileWrapper}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/300?img=32",
          }}
          style={styles.avatar}
        />

        <View style={styles.plus}>
          <Ionicons
            name="add"
            size={14}
            color="#fff"
          />
        </View>
      </View>

      {/* Like */}

      <TouchableOpacity style={styles.action}>
        <Ionicons
          name="heart-outline"
          size={34}
          color="#fff"
        />

        <Text style={styles.count}>24.5K</Text>
      </TouchableOpacity>

      {/* Comment */}

      <TouchableOpacity style={styles.action}>
        <Ionicons
          name="chatbubble-outline"
          size={32}
          color="#fff"
        />

        <Text style={styles.count}>356</Text>
      </TouchableOpacity>

      {/* Share */}

      <TouchableOpacity style={styles.action}>
        <Ionicons
          name="paper-plane"
          size={30}
          color="#fff"
        />

        <Text style={styles.count}>125</Text>
      </TouchableOpacity>

      {/* Music */}

      <TouchableOpacity style={styles.music}>
        <Ionicons
          name="musical-notes"
          size={18}
          color="#FF9F1C"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 14,
    bottom: 90,
    alignItems: "center",
  },

  profileWrapper: {
    marginBottom: 24,
    alignItems: "center",
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#A855F7",
  },

  plus: {
    position: "absolute",
    bottom: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FF2E63",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },

  action: {
    alignItems: "center",
    marginBottom: 22,
  },

  count: {
    color: "#fff",
    marginTop: 6,
    fontSize: 13,
    fontWeight: "600",
  },

  music: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
});