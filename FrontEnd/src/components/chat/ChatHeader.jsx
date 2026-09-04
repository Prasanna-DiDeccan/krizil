
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../theme/colors";

export default function ChatHeader({
  conversation,
  participant,
  isOnline = false,
  onBack,
  onProfilePress,
}) {
  const username =
    participant?.username ||
    participant?.full_name ||
    "User";

  const fullName =
    participant?.full_name ||
    participant?.username ||
    "User";

  const avatar =
    participant?.avatar_url ||
    participant?.avatar ||
    null;

  return (
    <View style={styles.container}>
      {/* BACK */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        activeOpacity={0.7}
      >
        <Ionicons
          name="chevron-back"
          size={30}
          color="#fff"
        />
      </TouchableOpacity>

      {/* PROFILE */}
      <TouchableOpacity
        style={styles.profileButton}
        onPress={onProfilePress}
        activeOpacity={0.8}
      >
        <View style={styles.avatarWrapper}>
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons
                name="person"
                size={22}
                color="#aaa"
              />
            </View>
          )}

          {isOnline ? (
            <View style={styles.onlineDot} />
          ) : null}
        </View>

        <View style={styles.nameContainer}>
          <Text
            style={styles.username}
            numberOfLines={1}
          >
            {username}
          </Text>

          <Text
            style={styles.status}
            numberOfLines={1}
          >
            {isOnline ? "Active now" : fullName}
          </Text>
        </View>
      </TouchableOpacity>

      {/* RIGHT ACTIONS */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <Ionicons
            name="call-outline"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <Ionicons
            name="videocam-outline"
            size={27}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <Ionicons
            name="information-circle-outline"
            size={27}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bgDefault || "#000",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#262626",
    paddingHorizontal: 8,
  },

  backButton: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  profileButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },

  avatarWrapper: {
    position: "relative",
    marginRight: 10,
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#1c1c1c",
  },

  avatarPlaceholder: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#1c1c1c",
    alignItems: "center",
    justifyContent: "center",
  },

  onlineDot: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#00c853",
    borderWidth: 2,
    borderColor: "#000",
  },

  nameContainer: {
    flex: 1,
    minWidth: 0,
  },

  username: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  status: {
    color: "#8e8e8e",
    fontSize: 12,
    marginTop: 2,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
  },

  actionButton: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
