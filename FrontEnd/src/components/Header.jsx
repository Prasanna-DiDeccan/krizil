import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Header() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Left */}
      <TouchableOpacity style={styles.homeContainer}>
        <Text style={styles.homeText}>Home</Text>

        <Ionicons
          name="chevron-down"
          size={18}
          color="#fff"
          style={{ marginTop: 2 }}
        />
      </TouchableOpacity>

      {/* Right */}
      <View style={styles.rightContainer}>
        {/* Search */}

        <TouchableOpacity style={styles.iconButton}>
          <Feather
            name="search"
            size={22}
            color="#fff"
          />
        </TouchableOpacity>

        {/* Messenger */}

        {/* <TouchableOpacity style={styles.iconButton}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={22}
            color="#fff"
          />

          

          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity> */}
    <TouchableOpacity
  style={styles.iconButton}
  onPress={() => router.push("/notifications")}
>
  <Ionicons
    name="chatbubble-ellipses-outline"
    size={22}
    color="#fff"
  />

  <View style={styles.badge}>
    <Text style={styles.badgeText}>2</Text>
  </View>
</TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 18,
    paddingBottom: 12,
    backgroundColor: "#080913",
  },

  homeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  homeText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginRight: 5,
  },

  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconButton: {
    marginLeft: 18,
  },

  badge: {
    position: "absolute",

    right: -3,
    top: -4,

    width: 18,
    height: 18,

    borderRadius: 9,

    backgroundColor: "#A93EFF",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#080913",
  },

  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 10,
  },
});