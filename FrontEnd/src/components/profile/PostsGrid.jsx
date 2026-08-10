import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

// 3 images per row
const IMAGE_SIZE = width / 3;

const POSTS = [
  { id: "1", image: "https://picsum.photos/500?random=1" },
  { id: "2", image: "https://picsum.photos/500?random=2" },
  { id: "3", image: "https://picsum.photos/500?random=3" },
  { id: "4", image: "https://picsum.photos/500?random=4" },
  { id: "5", image: "https://picsum.photos/500?random=5" },
  { id: "6", image: "https://picsum.photos/500?random=6" },
  { id: "7", image: "https://picsum.photos/500?random=7" },
  { id: "8", image: "https://picsum.photos/500?random=8" },
  { id: "9", image: "https://picsum.photos/500?random=9" },
  { id: "10", image: "https://picsum.photos/500?random=10" },
  { id: "11", image: "https://picsum.photos/500?random=11" },
  { id: "12", image: "https://picsum.photos/500?random=12" },
];

export default function PostsGrid() {
  return (
    <View style={styles.container}>
      {POSTS.map((item) => (
        <Image
          key={item.id}
          source={{ uri: item.image }}
          style={styles.image}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#080913",
    marginTop: 2,
  },

 image: {
  width: IMAGE_SIZE,
  height: IMAGE_SIZE,
  borderWidth: 0.5,
  borderColor: "#080913",
},
});