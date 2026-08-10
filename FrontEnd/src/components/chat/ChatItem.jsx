import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function ChatItem({ item, onPress }) {
  return (
    // <View style={styles.container}>
    <TouchableOpacity
    style={styles.container}
    activeOpacity={0.8}
    onPress={onPress}
>
      {/* Avatar */}
      <Image
        source={{ uri: item.image }}
        style={styles.avatar}
      />

      {/* Center */}
      <View style={styles.center}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{item.name}</Text>

          {item.verified && (
            <Ionicons
              name="checkmark-circle"
              size={16}
              color="#2997FF"
              style={{ marginLeft: 5 }}
            />
          )}
        </View>

        <Text
          style={[
            styles.message,
            item.typing && styles.typing,
          ]}
          numberOfLines={1}
        >
          {item.message}
        </Text>
      </View>

      {/* Right */}
      <View style={styles.right}>
        <Text style={styles.time}>{item.time}</Text>

        {item.unread > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {item.unread}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    marginRight: 15,
  },

  center: {
    flex: 1,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  message: {
    marginTop: 5,
    color: "#9C9CA5",
    fontSize: 14,
  },

  typing: {
    color: "#A855F7",
  },

  right: {
    alignItems: "flex-end",
    justifyContent: "center",
  },

  time: {
    color: "#8D8D98",
    fontSize: 12,
  },

  badge: {
    marginTop: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 11,
  },
});