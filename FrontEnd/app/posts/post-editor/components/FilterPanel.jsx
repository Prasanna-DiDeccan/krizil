import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  Canvas,
  Image as SkiaImage,
  ColorMatrix,
  CubicSampling,
} from "@shopify/react-native-skia";

import { FILTERS } from "../filters/filterMatrices";

export default function FilterPanel({
  image,
  selectedFilter,
  setSelectedFilter,
}) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Filters
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >

        {Object.keys(FILTERS).map(
          (filterName) => (
            <TouchableOpacity
              key={filterName}
              style={styles.item}
              onPress={() =>
                setSelectedFilter(
                  filterName
                )
              }
            >

              <View
                style={[
                  styles.preview,
                  selectedFilter ===
                    filterName &&
                    styles.selected,
                ]}
              >

                <Canvas
                  style={styles.canvas}
                >

                  <SkiaImage
                    image={image}
                    x={0}
                    y={0}
                    width={78}
                    height={78}
                    fit="cover"
                    sampling={CubicSampling}
                  >
                    <ColorMatrix
                      matrix={
                        FILTERS[
                          filterName
                        ]
                      }
                    />
                  </SkiaImage>

                </Canvas>

              </View>

              <Text
                style={[
                  styles.name,
                  selectedFilter ===
                    filterName &&
                    styles.activeName,
                ]}
              >
                {filterName}
              </Text>

            </TouchableOpacity>
          )
        )}

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingTop: 10,
  },

  title: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  scroll: {
    paddingHorizontal: 15,
  },

  item: {
    width: 88,
    alignItems: "center",
    marginRight: 12,
  },

  preview: {
    width: 82,
    height: 82,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },

  selected: {
    borderColor: "#8B5CF6",
  },

  canvas: {
    width: 78,
    height: 78,
  },

  name: {
    color: "#888",
    fontSize: 12,
    marginTop: 5,
  },

  activeName: {
    color: "#fff",
    fontWeight: "600",
  },
});