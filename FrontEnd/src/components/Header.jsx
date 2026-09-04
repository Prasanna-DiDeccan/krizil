import React, { useCallback } from "react";
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
// import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useFocusEffect } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications, selectUnreadNotificationCount } from "../redux/notificationSlice";

export default function Header({ title = "Home" }) {
  // const insets = useSafeAreaInsets();
  const router = useRouter();
  const dispatch = useDispatch();
const unreadCount = useSelector(
  selectUnreadNotificationCount
);


useFocusEffect( useCallback(() => { let active = true; const refreshNotifications = async () => { try { console.log( "========== HEADER REFRESH NOTIFICATIONS ==========" ); const result = await dispatch( getNotifications({ limit: 20, offset: 0, append: false, }) ).unwrap(); if (active) { console.log( "HEADER NOTIFICATION REFRESH RESULT =>", result ); } } catch (error) { if (active) { console.log( "HEADER NOTIFICATION REFRESH ERROR =>", error ); } } }; refreshNotifications(); return () => { active = false; }; }, [dispatch]) );
const openNotifications = useCallback(() => { router.push("/notifications"); }, [router]);
  return (
    <View
      style={styles.container}
    >
      {/* LEFT */}
      <View style={styles.homeContainer}>
        <Text style={styles.homeText}>
          {title}
        </Text>

        {/* Dropdown only for Home */}
        {title === "Home" && (
          <Ionicons
            name="chevron-down"
            size={18}
            color="#fff"
            style={{ marginTop: 2 }}
          />
        )}
      </View>

      {/* RIGHT */}
      <View style={styles.rightContainer}>

        {/* SEARCH */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push("/explore")}
        >
          <Feather
            name="search"
            size={23}
            color="#fff"
          />
        </TouchableOpacity>

       {/* NOTIFICATIONS / CHAT */}
<TouchableOpacity
  style={styles.iconButton}
  activeOpacity={0.7}
  onPress={() => router.push("/notifications")}
>
  <Ionicons
    name="chatbubble-ellipses-outline"
    size={23}
    color="#fff"
  />

  {unreadCount > 0 && (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>
        {unreadCount > 99 ? "99+" : unreadCount}
      </Text>
    </View>
  )}
</TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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