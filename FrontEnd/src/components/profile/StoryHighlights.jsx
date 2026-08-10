import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function StoryHighlights() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.item}>
        <View style={styles.circle}>
          <Text style={styles.plus}>+</Text>
        </View>

        <Text style={styles.label}>
          New
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 15,
  },

  item: {
    alignItems: "center",
    marginRight: 15,
  },

  circle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },

  plus: {
    color: "#fff",
    fontSize: 32,
  },

  label: {
    color: "#fff",
    marginTop: 6,
  },
});