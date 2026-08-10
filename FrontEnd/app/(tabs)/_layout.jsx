import { Tabs, router } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {/* Home */}

      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.item}>
              <Ionicons
                name={
                  focused
                    ? "home"
                    : "home-outline"
                }
                size={24}
                color={
                  focused
                    ? "#8B5CF6"
                    : "#fff"
                }
              />

              <Text
                style={[
                  styles.label,
                  focused &&
                    styles.activeLabel,
                ]}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />

      {/* Reels */}

      <Tabs.Screen
        name="reels"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.item}>
              <MaterialCommunityIcons
                name="movie-open-outline"
                size={24}
                color={
                  focused
                    ? "#8B5CF6"
                    : "#fff"
                }
              />

              <Text
                style={[
                  styles.label,
                  focused &&
                    styles.activeLabel,
                ]}
              >
                Reels
              </Text>
            </View>
          ),
        }}
      />

      {/* Create */}

      <Tabs.Screen
        name="create"
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.centerButton}
              onPress={() =>
                router.push(
                  "/posts/create-post"
                )
              }
            >
              <LinearGradient
                colors={[
                  "#B53CFF",
                  "#5A64FF",
                ]}
                style={styles.gradient}
              >
                <Ionicons
                  name="add"
                  size={28}
                  color="#fff"
                />
              </LinearGradient>
            </TouchableOpacity>
          ),
        }}
      />

      {/* Chat */}

      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.item}>
              <Ionicons
                name={
                  focused
                    ? "chatbubble"
                    : "chatbubble-outline"
                }
                size={24}
                color={
                  focused
                    ? "#8B5CF6"
                    : "#fff"
                }
              />

              <Text
                style={[
                  styles.label,
                  focused &&
                    styles.activeLabel,
                ]}
              >
                Chat
              </Text>
            </View>
          ),
        }}
      />

      {/* Profile */}

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.item}>
              <Ionicons
                name={
                  focused
                    ? "person"
                    : "person-outline"
                }
                size={24}
                color={
                  focused
                    ? "#8B5CF6"
                    : "#fff"
                }
              />

              <Text
                style={[
                  styles.label,
                  focused &&
                    styles.activeLabel,
                ]}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />

      {/* Hidden Screen */}

      <Tabs.Screen
        name="notifications"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,

    height: 75,

    backgroundColor: "#0E0F17",

    borderTopWidth: 0,

    // borderTopLeftRadius: 22,
    // borderTopRightRadius: 22,
    paddingTop: 10,
    paddingBottom: 10,
    elevation: 20,
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },

  label: {
    color: "#fff",
    fontSize: 10,
    marginTop: 2,
  },

  activeLabel: {
    color: "#8B5CF6",
  },

  centerButton: {
    justifyContent: "center",
    alignItems: "center",
    top: -10,
  },

  gradient: {
    width: 58,
    height: 58,

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",
  },
});