import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const DATA = [
  {
    id: "1",
    name: "Ananya ✨",
    action: "liked your photo.",
    time: "2m",
    avatar: "https://i.pravatar.cc/150?img=5",
    post: "https://picsum.photos/100?1",
    type: "like",
  },
  {
    id: "2",
    name: "Rohit Kumar",
    action: "started following you.",
    time: "5m",
    avatar: "https://i.pravatar.cc/150?img=12",
    type: "follow",
  },
  {
    id: "3",
    name: "Megha Official",
    action: "commented: Beautiful shot! ❤️",
    time: "10m",
    avatar: "https://i.pravatar.cc/150?img=32",
    post: "https://picsum.photos/100?2",
    type: "comment",
  },
  {
    id: "4",
    name: "Arjun",
    action: "shared your post.",
    time: "20m",
    avatar: "https://i.pravatar.cc/150?img=18",
    post: "https://picsum.photos/100?3",
    type: "share",
  },
  {
    id: "5",
    name: "Kavya",
    action: "liked your reel.",
    time: "30m",
    avatar: "https://i.pravatar.cc/150?img=20",
    post: "https://picsum.photos/100?4",
    type: "like",
  },
  {
    id: "6",
    name: "Siva",
    action: "mentioned you in a comment.",
    time: "1h",
    avatar: "https://i.pravatar.cc/150?img=30",
    post: "https://picsum.photos/100?5",
    type: "mention",
  },
];

export default function Notifications() {
  const router = useRouter();

  const [tab, setTab] = useState("all");

const renderItem = ({ item }) => (
  <TouchableOpacity style={styles.item}>
    {/* Avatar */}
    <Image
      source={{ uri: item.avatar }}
      style={styles.avatar}
    />

    {/* Text */}
    <View style={styles.content}>
      <Text style={styles.text} numberOfLines={2}>
        <Text style={styles.name}>{item.name}</Text>{" "}
        {item.action}
        <Text style={styles.time}> {item.time}</Text>
      </Text>
    </View>

    {/* Right Side */}
    <View style={styles.rightContainer}>
      {item.type === "follow" ? (
        <TouchableOpacity style={styles.followBtn}>
          <Text style={styles.followText}>
            Follow Back
          </Text>
        </TouchableOpacity>
      ) : (
        <Image
          source={{ uri: item.post }}
          style={styles.post}
        />
      )}
    </View>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          Notifications
        </Text>

        <Ionicons
          name="settings-outline"
          size={24}
          color="#fff"
        />
      </View>

      {/* Tabs */}

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            tab === "all" && styles.activeTab,
          ]}
          onPress={() => setTab("all")}
        >
          <Text
            style={[
              styles.tabText,
              tab === "all" && styles.activeText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            tab === "mentions" &&
              styles.activeTab,
          ]}
          onPress={() => setTab("mentions")}
        >
          <Text
            style={[
              styles.tabText,
              tab === "mentions" &&
                styles.activeText,
            ]}
          >
            Mentions
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080913",
    paddingTop: 55,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    marginBottom: 25,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },

  tabs: {
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: "#171821",
    borderRadius: 14,
    padding: 4,
    marginBottom: 25,
  },

  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 12,
  },

  activeTab: {
    backgroundColor: "#8B5CF6",
  },

  tabText: {
    color: "#888",
    fontWeight: "600",
  },

  activeText: {
    color: "#fff",
  },

item: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 20,
  paddingVertical: 12,
},

avatar: {
  width: 52,
  height: 52,
  borderRadius: 26,
  marginRight: 14,
},

content: {
  flex: 1,
  paddingRight: 12,
},

text: {
  color: "#fff",
  fontSize: 15,
  lineHeight: 22,
  flexWrap: "wrap",
},

name: {
  fontWeight: "700",
},

time: {
  color: "#888",
  fontSize: 13,
},

rightContainer: {
  width: 95,
  alignItems: "flex-end",
  justifyContent: "center",
},

post: {
  width: 54,
  height: 54,
  borderRadius: 8,
},

followBtn: {
  backgroundColor: "#8B5CF6",
  paddingHorizontal: 9,
  height: 36,
  borderRadius: 9,
  justifyContent: "center",
  alignItems: "center",
},

followText: {
  color: "#fff",
  fontSize: 13,
  fontWeight: "700",
},
});