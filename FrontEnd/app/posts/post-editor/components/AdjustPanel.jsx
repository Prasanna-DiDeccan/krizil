import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Slider from "@react-native-community/slider";

export default function AdjustPanel({
  brightness,
  setBrightness,

  contrast,
  setContrast,

  saturation,
  setSaturation,

  warmth,
  setWarmth,
}) {
  const renderSlider = (
    label,
    value,
    setValue
  ) => {
    return (
      <View style={styles.row}>

        <View style={styles.labelRow}>

          <Text style={styles.label}>
            {label}
          </Text>

          <Text style={styles.value}>
            {Math.round(value * 100)}
          </Text>

        </View>

        <Slider
          style={styles.slider}
          minimumValue={-1}
          maximumValue={1}
          step={0.01}
          value={value}
          onValueChange={setValue}
          minimumTrackTintColor="#8B5CF6"
          maximumTrackTintColor="#383844"
          thumbTintColor="#fff"
        />

      </View>
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Adjust
      </Text>

      {renderSlider(
        "Brightness",
        brightness,
        setBrightness
      )}

      {renderSlider(
        "Contrast",
        contrast,
        setContrast
      )}

      {renderSlider(
        "Saturation",
        saturation,
        setSaturation
      )}

      {renderSlider(
        "Warmth",
        warmth,
        setWarmth
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  title: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
  },

  row: {
    marginBottom: 8,
  },

  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    color: "#fff",
    fontSize: 14,
  },

  value: {
    color: "#888",
    fontSize: 12,
  },

  slider: {
    width: "100%",
    height: 38,
  },
});