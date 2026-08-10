import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

import {
  VideoView,
  useVideoPlayer,
} from "expo-video";

import ReelActions from "./ReelActions";
import ReelInfo from "./ReelInfo";

const { width, height } = Dimensions.get("window");

export default function ReelVideo({
  video,
}) {
  const player = useVideoPlayer(
    video,
    (player) => {
      player.loop = true;
      player.play();
    }
  );

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
        contentFit="cover"
      />

      <View style={styles.overlay} />

      <ReelActions />

      <ReelInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: "#000",
  },

  video: {
    width,
    height,
    position: "absolute",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
});