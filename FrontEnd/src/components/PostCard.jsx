import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function PostCard({ item }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <View style={styles.card}>
      {/* Header */}

      <View style={styles.header}>
        <View style={styles.userRow}>
          <Image source={item.profile} style={styles.avatar} />

          <View>
            <Text style={styles.name}>{item.name}</Text>

            <Text style={styles.location}>
              {item.location}
            </Text>
          </View>
        </View>

        <TouchableOpacity>
          <Feather
            name="more-horizontal"
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Post Image */}

      <View>
        <Image
          source={item.image}
          style={styles.postImage}
        />

        <View style={styles.counter}>
          <Text style={styles.counterText}>
            {item.totalImages}
          </Text>
        </View>
      </View>

      {/* Bottom Icons */}

      <View style={styles.actionRow}>
        <View style={styles.leftIcons}>
          <TouchableOpacity
            onPress={() => setLiked(!liked)}
          >
            <Ionicons
              name={
                liked ? "heart" : "heart-outline"
              }
              size={26}
              color={
                liked ? "#ff3b5c" : "#fff"
              }
            />
          </TouchableOpacity>

          <Text style={styles.count}>
            {item.likes}
          </Text>

          <TouchableOpacity>
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.count}>
            {item.comments}
          </Text>

          <TouchableOpacity>
            <MaterialCommunityIcons
              name="send-outline"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.count}>
            {item.shares}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setSaved(!saved)}
        >
          <Ionicons
            name={
              saved
                ? "bookmark"
                : "bookmark-outline"
            }
            size={25}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Caption */}

      <View style={styles.captionContainer}>
        <Text style={styles.caption}>
          <Text style={styles.bold}>
            {item.name}
          </Text>{" "}
          {item.caption}
        </Text>

        <Text style={styles.hashTags}>
          {item.hashtags}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#080913",
    marginBottom: 18,
    borderBottomWidth: 0.6,
    borderBottomColor: "#23242F",
    paddingBottom: 15,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 12,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
  },

  name: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },

  location: {
    color: "#9B9BA6",
    marginTop: 2,
    fontSize: 12,
  },

  postImage: {
    width: "100%",
    height: 430,
    resizeMode: "cover",
  },

  counter: {
    position: "absolute",
    right: 15,
    top: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  counterText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 14,
  },

  leftIcons: {
    flexDirection: "row",
    alignItems: "center",
  },

  count: {
    color: "#fff",
    marginHorizontal: 7,
    fontSize: 15,
  },

  captionContainer: {
    paddingHorizontal: 14,
    marginTop: 12,
  },

  caption: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 22,
  },

  bold: {
    fontWeight: "700",
  },

  hashTags: {
    color: "#7D5CFF",
    marginTop: 6,
    fontSize: 14,
  },
});