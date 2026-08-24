import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function CropPanel({
  aspectRatio,
  setAspectRatio,
  rotate,
  flip,
}) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Crop
      </Text>

      <View style={styles.row}>

        <TouchableOpacity
          style={[
            styles.option,
            aspectRatio === "1:1" &&
              styles.active,
          ]}
          onPress={() =>
            setAspectRatio("1:1")
          }
        >
          <Ionicons
            name="square-outline"
            size={25}
            color="#fff"
          />

          <Text style={styles.text}>
            Square
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            aspectRatio === "4:5" &&
              styles.active,
          ]}
          onPress={() =>
            setAspectRatio("4:5")
          }
        >
          <Ionicons
            name="crop-outline"
            size={25}
            color="#fff"
          />

          <Text style={styles.text}>
            4:5
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={rotate}
        >
          <Ionicons
            name="refresh-outline"
            size={25}
            color="#fff"
          />

          <Text style={styles.text}>
            Rotate
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={flip}
        >
          <Ionicons
            name="swap-horizontal-outline"
            size={25}
            color="#fff"
          />

          <Text style={styles.text}>
            Flip
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingTop: 10,
    paddingHorizontal: 15,
  },

  title: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  option: {
    width: 75,
    height: 65,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  active: {
    backgroundColor: "#8B5CF6",
  },

  text: {
    color: "#fff",
    fontSize: 11,
    marginTop: 4,
  },
});