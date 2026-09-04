import React from "react";

import {
  View,
  StyleSheet,
} from "react-native";

export default function StoriesProgressBar({
  stories = [],
  currentIndex = 0,
  progress = 0,
}) {
  if (!Array.isArray(stories) || stories.length === 0) {
    return null;
  }

  return (
    <View
      style={styles.container}
    >
      {stories.map(
        (story, index) => {
          let fillWidth = "0%";

          if (
            index < currentIndex
          ) {
            fillWidth = "100%";
          } else if (
            index === currentIndex
          ) {
            fillWidth = `${Math.min(
              Math.max(progress, 0),
              1
            ) * 100}%`;
          }

          return (
            <View
              key={
                story?.id ??
                `story-progress-${index}`
              }
              style={styles.track}
            >
              <View
                style={[
                  styles.fill,
                  {
                    width:
                      fillWidth,
                  },
                ]}
              />
            </View>
          );
        }
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      paddingHorizontal: 8,
      paddingTop: 4,
      gap: 4,
    },

    track: {
      flex: 1,
      height: 3,
      borderRadius: 3,
      overflow: "hidden",
      backgroundColor:
        "rgba(255,255,255,0.35)",
    },

    fill: {
      height: "100%",
      borderRadius: 3,
      backgroundColor: "#fff",
    },
  });