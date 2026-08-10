import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const stories = [
  {
    id: 1,
    name: "Your Story",
    image: require("../../assets/images/avatar1.png"),
    isMine: true,
  },
  {
    id: 2,
    name: "Ananya",
    image: require("../../assets/images/avatar1.png"),
  },
  {
    id: 3,
    name: "Rohit",
    image: require("../../assets/images/avatar1.png"),
  },
  {
    id: 4,
    name: "Megha",
    image: require("../../assets/images/avatar1.png"),
  },
  {
    id: 5,
    name: "Arjun",
    image: require("../../assets/images/avatar1.png"),
  },
  {
    id: 6,
    name: "Priya",
    image: require("../../assets/images/avatar1.png"),
  },
];

export default function Stories() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {stories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.storyItem}
          >
            <LinearGradient
              colors={["#FF4FD8", "#A73BFF", "#5C6CFF"]}
              style={styles.gradientRing}
            >
              <View style={styles.imageWrapper}>
                <Image
                  source={item.image}
                  style={styles.image}
                />
              </View>

              {item.isMine && (
                <View style={styles.plusIcon}>
                  <Ionicons
                    name="add"
                    color="#fff"
                    size={12}
                  />
                </View>
              )}
            </LinearGradient>

            <Text
              numberOfLines={1}
              style={styles.name}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#222",
  },

  storyItem: {
    width: 82,
    alignItems: "center",
  },

  gradientRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },

  imageWrapper: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: "#080913",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  plusIcon: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#8B3DFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#080913",
  },

  name: {
    color: "#fff",
    marginTop: 8,
    fontSize: 12,
    width: 70,
    textAlign: "center",
  },
});