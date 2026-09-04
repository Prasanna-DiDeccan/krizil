import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

const FILTERS = [
  {
    name: "Original",
    matrix: [
      1, 0, 0, 0, 0,
      0, 1, 0, 0, 0,
      0, 0, 1, 0, 0,
      0, 0, 0, 1, 0,
    ],
  },

  {
    name: "Clarendon",
    matrix: [
      1.1, 0, 0, 0, 0,
      0, 1.1, 0, 0, 0,
      0, 0, 1.15, 0, 0,
      0, 0, 0, 1, 0,
    ],
  },

  {
    name: "Lark",
    matrix: [
      1.05, 0, 0, 0, 5,
      0, 1.08, 0, 0, 5,
      0, 0, 1.12, 0, 5,
      0, 0, 0, 1, 0,
    ],
  },

  {
    name: "Juno",
    matrix: [
      1.12, 0, 0, 0, 0,
      0, 1.03, 0, 0, 0,
      0, 0, 0.95, 0, 0,
      0, 0, 0, 1, 0,
    ],
  },

  {
    name: "Valencia",
    matrix: [
      1.08, 0, 0, 0, 4,
      0, 1.02, 0, 0, 2,
      0, 0, 0.92, 0, 0,
      0, 0, 0, 1, 0,
    ],
  },

  {
    name: "Gingham",
    matrix: [
      0.95, 0, 0, 0, 5,
      0, 0.95, 0, 0, 5,
      0, 0, 0.95, 0, 5,
      0, 0, 0, 1, 0,
    ],
  },
];

export default function FilterPanel({
  image,
  selectedFilter,
  setSelectedFilter,
}) {
  const current =
    FILTERS.find(
      (filter) =>
        filter.name ===
        selectedFilter
    ) ||
    FILTERS[0];

  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.title}
      >
        Filters
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.scroll
        }
      >
        {FILTERS.map(
          (filter) => {
            const active =
              selectedFilter ===
              filter.name;

            return (
              <TouchableOpacity
                key={
                  filter.name
                }
                style={
                  styles.item
                }
                onPress={() =>
                  setSelectedFilter(
                    filter.name
                  )
                }
              >
                <View
                  style={[
                    styles.preview,
                    active &&
                      styles.active,
                  ]}
                >
                  {image && (
                    <Image
                      source={{
                        uri: image,
                      }}
                      style={
                        styles.image
                      }
                    />
                  )}
                </View>

                <Text
                  style={[
                    styles.name,
                    active &&
                      styles.activeText,
                  ]}
                >
                  {
                    filter.name
                  }
                </Text>
              </TouchableOpacity>
            );
          }
        )}
      </ScrollView>
    </View>
  );
}

export {
  FILTERS,
};

const styles =
  StyleSheet.create({
    container: {
      backgroundColor:
        "#000",
      paddingTop: 10,
      paddingBottom: 12,
    },

    title: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "600",
      paddingHorizontal: 16,
      marginBottom: 12,
    },

    scroll: {
      paddingHorizontal: 16,
      gap: 12,
    },

    item: {
      width: 70,
      alignItems:
        "center",
    },

    preview: {
      width: 64,
      height: 64,
      borderRadius: 8,
      overflow: "hidden",
      borderWidth: 2,
      borderColor:
        "transparent",
    },

    active: {
      borderColor:
        "#fff",
    },

    image: {
      width: "100%",
      height: "100%",
    },

    name: {
      color: "#888",
      fontSize: 11,
      marginTop: 5,
    },

    activeText: {
      color: "#fff",
      fontWeight: "600",
    },
  });