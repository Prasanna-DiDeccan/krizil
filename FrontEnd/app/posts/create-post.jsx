import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

import { router } from "expo-router";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const IMAGE_SIZE = width / 4;

export default function CreatePost() {
  const insets = useSafeAreaInsets();

  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGallery();
  }, []);

  // ==========================================
  // LOAD GALLERY
  // ==========================================

  const loadGallery = async () => {
    try {
      console.log("========== GALLERY START ==========");

      const permission =
        await MediaLibrary.requestPermissionsAsync(
          false,
          ["photo"]
        );

      console.log(
        "MEDIA LIBRARY PERMISSION =>",
        permission
      );

      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow photo access to select images."
        );

        setPhotos([]);
        setSelectedPhoto(null);

        return;
      }

      const media =
        await MediaLibrary.getAssetsAsync({
          mediaType: "photo",
          first: 100,
          sortBy: [
            MediaLibrary.SortBy.creationTime,
          ],
        });

      console.log(
        "TOTAL ASSETS =>",
        media.totalCount
      );

      console.log(
        "ASSETS LENGTH =>",
        media.assets.length
      );

      setPhotos(media.assets);

      // Select latest image
      if (media.assets.length > 0) {
        setSelectedPhoto(media.assets[0]);
      }

      console.log(
        "✅ GALLERY LOADED SUCCESSFULLY"
      );
    } catch (error) {
      console.log(
        "❌ GALLERY ERROR =>",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // CAMERA
  // ==========================================

  const openCamera = async () => {
    try {
      console.log("Camera pressed");

      const permission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Camera Permission",
          "Please allow camera access."
        );

        return;
      }

      const result =
        await ImagePicker.launchCameraAsync({
          mediaTypes: ["images"],
          quality: 1,
        });

      if (
        !result.canceled &&
        result.assets?.length
      ) {
        const image = result.assets[0];

        setSelectedPhoto({
          id: `camera-${Date.now()}`,
          uri: image.uri,
          width: image.width,
          height: image.height,
          mediaType: "photo",
        });
      }
    } catch (error) {
      console.log(
        "CAMERA ERROR =>",
        error
      );
    }
  };

  // ==========================================
  // NEXT
  // ==========================================

  const goToEditor = () => {
    if (!selectedPhoto?.uri) {
      return;
    }

    router.push({
      pathname: "/posts/post-editor",
      params: {
        image: selectedPhoto.uri,
      },
    });
  };

  // ==========================================
  // GALLERY ITEM
  // ==========================================

  const renderItem = ({
    item,
    index,
  }) => {
    // Camera tile
    if (item.isCamera) {
      return (
        <TouchableOpacity
          style={styles.cameraTile}
          onPress={openCamera}
        >
          <Ionicons
            name="camera"
            size={36}
            color="#fff"
          />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          setSelectedPhoto(item)
        }
      >
        <Image
          source={{
            uri: item.uri,
          }}
          style={styles.gridImage}
        />

        {selectedPhoto?.id === item.id && (
          <View
            style={styles.selectedCircle}
          >
            <Text
              style={styles.selectedText}
            >
              1
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const galleryData = [
    {
      id: "camera",
      isCamera: true,
    },
    ...photos,
  ];

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#fff"
        />
      </View>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <View style={styles.container}>
      
      {/* HEADER */}

      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top,
            height: 60 + insets.top,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.headerSide}
          onPress={() => router.back()}
        >
          <Ionicons
            name="close"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          New post
        </Text>

        <TouchableOpacity
          style={styles.headerSide}
          disabled={!selectedPhoto}
          onPress={goToEditor}
        >
          <Text
            style={[
              styles.next,
              !selectedPhoto &&
                styles.nextDisabled,
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>

      {/* PREVIEW */}

      <View
        style={styles.previewContainer}
      >
        {selectedPhoto ? (
          <Image
            source={{
              uri: selectedPhoto.uri,
            }}
            style={styles.preview}
            resizeMode="cover"
          />
        ) : (
          <View
            style={styles.emptyPreview}
          >
            <Ionicons
              name="images-outline"
              size={50}
              color="#555"
            />

            <Text style={styles.emptyText}>
              No photos found
            </Text>
          </View>
        )}
      </View>

      {/* RECENTS */}

      <View
        style={styles.galleryHeader}
      >
        <TouchableOpacity
          style={styles.recentsContainer}
        >
          <Text style={styles.recents}>
            Recents
          </Text>

          <Ionicons
            name="chevron-down"
            size={20}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selectBtn}
        >
          <Ionicons
            name="copy-outline"
            size={18}
            color="#fff"
          />

          <Text style={styles.selectText}>
            Select
          </Text>
        </TouchableOpacity>
      </View>

      {/* GALLERY */}

      <FlatList
        data={galleryData}
        keyExtractor={(item, index) =>
          item.id?.toString() ||
          index.toString()
        }
        renderItem={renderItem}
        numColumns={4}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      />

      {/* POST / STORY / REEL / LIVE */}

      <View
        style={[
          styles.bottomModes,
          {
            bottom: Math.max(
              insets.bottom,
              20
            ),
          },
        ]}
      >
        <Text style={styles.activeMode}>
          POST
        </Text>

        <Text style={styles.mode}>
          STORY
        </Text>

        <Text style={styles.mode}>
          REEL
        </Text>

        <Text style={styles.mode}>
          LIVE
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  loader: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    width: "100%",
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000",
  },

  headerSide: {
    width: 60,
    height: 50,
    justifyContent: "center",
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },

  next: {
    color: "#0095F6",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "right",
  },

  nextDisabled: {
    opacity: 0.4,
  },

  previewContainer: {
    width: "100%",
    height: width,
    backgroundColor: "#111",
  },

  preview: {
    width: "100%",
    height: "100%",
  },

  emptyPreview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: "#777",
    marginTop: 10,
    fontSize: 15,
  },

  galleryHeader: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  recentsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  recents: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    marginRight: 5,
  },

  selectBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 22,
  },

  selectText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 14,
  },

  cameraTile: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },

  gridImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    backgroundColor: "#111",
  },

  selectedCircle: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#0095F6",
    justifyContent: "center",
    alignItems: "center",
  },

  selectedText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },

  bottomModes: {
    position: "absolute",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },

  activeMode: {
    color: "#fff",
    fontWeight: "700",
    marginHorizontal: 12,
  },

  mode: {
    color: "#888",
    marginHorizontal: 12,
  },
});