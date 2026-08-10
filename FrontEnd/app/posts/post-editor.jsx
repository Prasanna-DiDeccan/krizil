import React, {
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import {
  manipulateAsync,
  SaveFormat,
  FlipType,
} from "expo-image-manipulator";

const { width } =
  Dimensions.get("window");

export default function PostEditor() {
  const params =
    useLocalSearchParams();

  const [image, setImage] =
    useState(params.image);

  const [activeTool, setActiveTool] =
    useState("Filter");

  const [filter, setFilter] =
    useState("Normal");

  // ==========================================
  // ROTATE
  // ==========================================

  const rotateImage = async () => {
    try {
      const result =
        await manipulateAsync(
          image,
          [
            {
              rotate: 90,
            },
          ],
          {
            compress: 1,
            format: SaveFormat.JPEG,
          }
        );

      setImage(result.uri);
    } catch (error) {
      console.log(
        "ROTATE ERROR",
        error
      );
    }
  };

  // ==========================================
  // FLIP
  // ==========================================

  const flipImage = async () => {
    try {
      const result =
        await manipulateAsync(
          image,
          [
            {
              flip: FlipType.Horizontal,
            },
          ],
          {
            compress: 1,
            format: SaveFormat.JPEG,
          }
        );

      setImage(result.uri);
    } catch (error) {
      console.log(
        "FLIP ERROR",
        error
      );
    }
  };

  // ==========================================
  // CROP SQUARE
  // ==========================================

  const cropSquare = async () => {
    try {
      // Image dimensions are not available
      // directly here, so use a square crop
      // based on screen size.

      const result =
        await manipulateAsync(
          image,
          [
            {
              crop: {
                originX: 0,
                originY: 0,
                width: 500,
                height: 500,
              },
            },
          ],
          {
            compress: 1,
            format: SaveFormat.JPEG,
          }
        );

      setImage(result.uri);
    } catch (error) {
      console.log(
        "CROP ERROR",
        error
      );
    }
  };

  // ==========================================
  // NEXT
  // ==========================================

  const goNext = () => {
    router.push({
      pathname:
        "/posts/post-details",
      params: {
        image,
      },
    });
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Ionicons
            name="chevron-back"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          Edit
        </Text>

        <TouchableOpacity
          onPress={goNext}
        >
          <Text style={styles.next}>
            Next
          </Text>
        </TouchableOpacity>
      </View>

      {/* IMAGE */}

      <View
        style={styles.imageContainer}
      >
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* FILTERS */}

      {activeTool === "Filter" && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
          style={styles.filters}
        >
          {[
            "Normal",
            "Clarendon",
            "Gingham",
            "Moon",
            "Lark",
          ].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.filterItem}
              onPress={() =>
                setFilter(item)
              }
            >
              <Image
                source={{
                  uri: image,
                }}
                style={[
                  styles.filterImage,
                  filter === item &&
                    styles.filterSelected,
                ]}
              />

              <Text
                style={[
                  styles.filterName,
                  filter === item &&
                    styles.filterActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* TOOLS */}

      <View style={styles.tools}>

        <TouchableOpacity
          style={styles.tool}
          onPress={() =>
            setActiveTool("Filter")
          }
        >
          <Ionicons
            name="color-filter-outline"
            size={25}
            color="#fff"
          />

          <Text style={styles.toolText}>
            Filter
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tool}
          onPress={() =>
            setActiveTool("Adjust")
          }
        >
          <Ionicons
            name="options-outline"
            size={25}
            color="#fff"
          />

          <Text style={styles.toolText}>
            Adjust
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tool}
          onPress={() =>
            setActiveTool("Crop")
          }
        >
          <Ionicons
            name="crop-outline"
            size={25}
            color="#fff"
          />

          <Text style={styles.toolText}>
            Crop
          </Text>
        </TouchableOpacity>

      </View>

      {/* CROP CONTROLS */}

      {activeTool === "Crop" && (
        <View style={styles.cropTools}>

          <TouchableOpacity
            style={styles.roundButton}
            onPress={rotateImage}
          >
            <Ionicons
              name="refresh-outline"
              size={25}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.roundButton}
            onPress={flipImage}
          >
            <Ionicons
              name="swap-horizontal-outline"
              size={25}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.roundButton}
            onPress={cropSquare}
          >
            <Ionicons
              name="square-outline"
              size={25}
              color="#fff"
            />
          </TouchableOpacity>

        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  next: {
    color: "#0095F6",
    fontSize: 16,
    fontWeight: "600",
  },

  imageContainer: {
    width: "100%",
    height: width,
    backgroundColor: "#111",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  filters: {
    maxHeight: 130,
    paddingHorizontal: 12,
    marginTop: 15,
  },

  filterItem: {
    width: 90,
    marginRight: 12,
    alignItems: "center",
  },

  filterImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },

  filterSelected: {
    borderWidth: 3,
    borderColor: "#0095F6",
  },

  filterName: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 5,
  },

  filterActive: {
    color: "#fff",
    fontWeight: "600",
  },

  tools: {
    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#000",
  },

  tool: {
    alignItems: "center",
    justifyContent: "center",
  },

  toolText: {
    color: "#fff",
    marginTop: 5,
    fontSize: 12,
  },

  cropTools: {
    position: "absolute",
    bottom: 105,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 25,
  },

  roundButton: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
});