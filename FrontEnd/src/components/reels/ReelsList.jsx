import React from "react";
import {
  FlatList,
  Dimensions,
} from "react-native";

import ReelVideo from "./ReelVideo";

const { height } = Dimensions.get("window");

const REELS = [
  {
    id: "1",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-girl-walking-near-the-ocean-1238-large.mp4",
  },
  {
    id: "2",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-young-woman-taking-a-selfie-3980-large.mp4",
  },
  {
    id: "3",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-man-running-on-the-beach-4079-large.mp4",
  },
];

export default function ReelsList() {
  return (
    <FlatList
      data={REELS}
      pagingEnabled
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReelVideo
          video={item.video}
        />
      )}
      showsVerticalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={height}
    />
  );
}