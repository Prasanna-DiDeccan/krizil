import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";

import * as ImagePicker from "expo-image-picker";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  router,
} from "expo-router";

export default function CreateStory() {
  const [
    cameraPermission,
    requestCameraPermission,
  ] = useCameraPermissions();

  const [
    showCamera,
    setShowCamera,
  ] = useState(false);

  const [
    cameraRef,
    setCameraRef,
  ] = useState(null);

  const [
    cameraType,
    setCameraType,
  ] = useState("back");

  // =====================================================
  // SELECTED MEDIA
  // =====================================================

  const [
    selectedAsset,
    setSelectedAsset,
  ] = useState(null);

  // =====================================================
  // REQUEST GALLERY PERMISSION
  // =====================================================

  useEffect(() => {
    requestGalleryPermission();
  }, []);

  const requestGalleryPermission =
    async () => {
      try {
        await ImagePicker
          .requestMediaLibraryPermissionsAsync();
      } catch (error) {
        console.log(
          "GALLERY PERMISSION ERROR =>",
          error
        );
      }
    };

  // =====================================================
  // OPEN GALLERY
  // =====================================================

  const openGallery = async () => {
    try {
      const permission =
        await ImagePicker
          .requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow gallery access."
        );

        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: [
            "images",
            "videos",
          ],

          allowsEditing: false,

          quality: 1,

          selectionLimit: 1,
        });

      if (
        result.canceled ||
        !result.assets?.length
      ) {
        return;
      }

      const asset =
        result.assets[0];

      console.log(
        "SELECTED STORY ASSET =>",
        asset
      );

      setSelectedAsset(asset);
    } catch (error) {
      console.log(
        "GALLERY ERROR =>",
        error
      );

      Alert.alert(
        "Error",
        "Unable to open gallery."
      );
    }
  };

  // =====================================================
  // OPEN CAMERA
  // =====================================================

  const openCamera = async () => {
    try {
      if (
        !cameraPermission?.granted
      ) {
        const result =
          await requestCameraPermission();

        if (!result.granted) {
          Alert.alert(
            "Permission Required",
            "Camera permission is required."
          );

          return;
        }
      }

      setShowCamera(true);
    } catch (error) {
      console.log(
        "CAMERA ERROR =>",
        error
      );
    }
  };

  // =====================================================
  // TAKE PHOTO
  // =====================================================

  const takePhoto = async () => {
    try {
      if (!cameraRef) {
        return;
      }

      const photo =
        await cameraRef.takePictureAsync({
          quality: 1,
        });

      if (!photo?.uri) {
        return;
      }

      const asset = {
        uri: photo.uri,
        type: "image",
        fileName:
          `story-${Date.now()}.jpg`,
        mimeType: "image/jpeg",
      };

      console.log(
        "CAMERA STORY ASSET =>",
        asset
      );

      setSelectedAsset(asset);

      setShowCamera(false);
    } catch (error) {
      console.log(
        "TAKE PHOTO ERROR =>",
        error
      );

      Alert.alert(
        "Error",
        "Unable to capture photo."
      );
    }
  };

  // =====================================================
  // GO TO EDITOR
  // =====================================================

  const goToEditor = () => {
    if (!selectedAsset?.uri) {
      return;
    }

    router.push({
      pathname:
        "/stories/editor",

      params: {
        uri: selectedAsset.uri,

        type:
          selectedAsset.type === "video"
            ? "video"
            : "image",

        fileName:
          selectedAsset.fileName ||
          `story-${Date.now()}`,

        mimeType:
          selectedAsset.mimeType ||
          (
            selectedAsset.type === "video"
              ? "video/mp4"
              : "image/jpeg"
          ),
      },
    });
  };

  // =====================================================
  // CAMERA SCREEN
  // =====================================================

  if (showCamera) {
    return (
      <View
        style={
          styles.cameraContainer
        }
      >
        <CameraView
          ref={(ref) =>
            setCameraRef(ref)
          }
          style={styles.camera}
          facing={cameraType}
        />

        {/* TOP */}

        <SafeAreaView
          edges={["top"]}
          style={
            styles.cameraSafeTop
          }
        >
          <View
            style={
              styles.cameraTop
            }
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                setShowCamera(false)
              }
              style={
                styles.topIconButton
              }
            >
              <Ionicons
                name="close"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                setCameraType(
                  (current) =>
                    current === "back"
                      ? "front"
                      : "back"
                )
              }
              style={
                styles.topIconButton
              }
            >
              <Ionicons
                name="camera-reverse"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* CAMERA BUTTON */}

        <View
          style={
            styles.cameraBottom
          }
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={
              styles.captureButton
            }
            onPress={takePhoto}
          >
            <View
              style={
                styles.captureInner
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // =====================================================
  // CREATE STORY SCREEN
  // =====================================================

  return (
    <View
      style={styles.container}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <SafeAreaView
        edges={["top"]}
        style={styles.safeHeader}
      >
        <View
          style={styles.header}
        >
          {/* CLOSE */}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              router.back()
            }
            style={
              styles.headerButton
            }
          >
            <Ionicons
              name="close"
              size={30}
              color="#fff"
            />
          </TouchableOpacity>

          {/* TITLE */}

          <Text
            style={styles.title}
          >
            Create story
          </Text>

          {/* NEXT */}

          {selectedAsset ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={goToEditor}
              style={
                styles.nextButton
              }
            >
              <Text
                style={
                  styles.nextText
                }
              >
                Next
              </Text>

              <Ionicons
                name="chevron-forward"
                size={18}
                color="#0095F6"
              />
            </TouchableOpacity>
          ) : (
            <View
              style={
                styles.nextPlaceholder
              }
            />
          )}
        </View>
      </SafeAreaView>

      {/* =================================================
          CONTENT
      ================================================= */}

      <View
        style={styles.content}
      >
        {/* CAMERA */}

        <TouchableOpacity
          activeOpacity={0.9}
          style={
            styles.cameraCard
          }
          onPress={openCamera}
        >
          <View
            style={
              styles.cameraIconCircle
            }
          >
            <Ionicons
              name="camera"
              size={32}
              color="#fff"
            />
          </View>

          <Text
            style={
              styles.cameraText
            }
          >
            Camera
          </Text>
        </TouchableOpacity>

        {/* GALLERY */}

        <TouchableOpacity
          activeOpacity={0.9}
          style={
            styles.galleryCard
          }
          onPress={openGallery}
        >
          {selectedAsset?.uri ? (
            <Image
              source={{
                uri:
                  selectedAsset.uri,
              }}
              style={
                styles.recentImage
              }
            />
          ) : (
            <View
              style={
                styles.galleryPlaceholder
              }
            >
              <View
                style={
                  styles.galleryIconCircle
                }
              >
                <Ionicons
                  name="images"
                  size={34}
                  color="#fff"
                />
              </View>

              <Text
                style={
                  styles.galleryText
                }
              >
                Gallery
              </Text>
            </View>
          )}

          <View
            style={
              styles.galleryOverlay
            }
          >
            <Ionicons
              name="images"
              size={24}
              color="#fff"
            />

            <Text
              style={
                styles.galleryOverlayText
              }
            >
              Choose from gallery
            </Text>
          </View>
        </TouchableOpacity>

        {/* SELECTED MEDIA MESSAGE */}

        {selectedAsset && (
          <View
            style={
              styles.selectedMessage
            }
          >
            <Ionicons
              name="checkmark-circle"
              size={20}
              color="#0095F6"
            />

            <Text
              style={
                styles.selectedText
              }
            >
              Media selected — tap Next
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
    },

    safeHeader: {
      backgroundColor: "#000",
    },

    header: {
      height: 56,

      flexDirection: "row",

      alignItems: "center",

      justifyContent:
        "space-between",

      paddingHorizontal: 14,
    },

    headerButton: {
      width: 45,
      height: 45,

      justifyContent:
        "center",

      alignItems: "center",
    },

    nextPlaceholder: {
      width: 75,
      height: 45,
    },

    nextButton: {
      height: 40,

      minWidth: 75,

      flexDirection: "row",

      justifyContent:
        "flex-end",

      alignItems: "center",
    },

    nextText: {
      color: "#0095F6",

      fontSize: 16,

      fontWeight: "700",

      marginRight: 2,
    },

    title: {
      color: "#fff",

      fontSize: 18,

      fontWeight: "700",
    },

    content: {
      flex: 1,

      paddingHorizontal: 16,
    },

    cameraCard: {
      height: 180,

      borderRadius: 16,

      backgroundColor:
        "#151515",

      justifyContent:
        "center",

      alignItems: "center",

      marginTop: 15,
    },

    cameraIconCircle: {
      width: 70,
      height: 70,

      borderRadius: 35,

      backgroundColor:
        "#262626",

      justifyContent:
        "center",

      alignItems: "center",
    },

    cameraText: {
      color: "#fff",

      fontSize: 16,

      fontWeight: "600",

      marginTop: 10,
    },

    galleryCard: {
      height: 260,

      borderRadius: 16,

      overflow: "hidden",

      marginTop: 15,

      backgroundColor:
        "#151515",
    },

    recentImage: {
      width: "100%",

      height: "100%",

      resizeMode: "cover",
    },

    galleryPlaceholder: {
      flex: 1,

      justifyContent:
        "center",

      alignItems: "center",
    },

    galleryIconCircle: {
      width: 70,
      height: 70,

      borderRadius: 35,

      backgroundColor:
        "#262626",

      justifyContent:
        "center",

      alignItems: "center",
    },

    galleryText: {
      color: "#fff",

      fontSize: 16,

      marginTop: 10,

      fontWeight: "600",
    },

    galleryOverlay: {
      position: "absolute",

      left: 0,
      right: 0,
      bottom: 0,

      height: 60,

      backgroundColor:
        "rgba(0,0,0,0.6)",

      flexDirection: "row",

      alignItems: "center",

      paddingHorizontal: 18,
    },

    galleryOverlayText: {
      color: "#fff",

      fontSize: 15,

      fontWeight: "600",

      marginLeft: 10,
    },

    selectedMessage: {
      flexDirection: "row",

      alignItems: "center",

      justifyContent:
        "center",

      marginTop: 18,
    },

    selectedText: {
      color: "#aaa",

      fontSize: 14,

      marginLeft: 6,
    },

    // =================================================
    // CAMERA
    // =================================================

    cameraContainer: {
      flex: 1,

      backgroundColor: "#000",
    },

    camera: {
      flex: 1,
    },

    cameraSafeTop: {
      position: "absolute",

      top: 0,
      left: 0,
      right: 0,
    },

    cameraTop: {
      height: 56,

      flexDirection: "row",

      alignItems: "center",

      justifyContent:
        "space-between",

      paddingHorizontal: 16,
    },

    topIconButton: {
      width: 44,
      height: 44,

      borderRadius: 22,

      backgroundColor:
        "rgba(0,0,0,0.35)",

      justifyContent:
        "center",

      alignItems: "center",
    },

    cameraBottom: {
      position: "absolute",

      bottom: 45,

      left: 0,
      right: 0,

      alignItems: "center",
    },

    captureButton: {
      width: 78,
      height: 78,

      borderRadius: 39,

      borderWidth: 5,

      borderColor: "#fff",

      justifyContent:
        "center",

      alignItems: "center",

      backgroundColor:
        "rgba(0,0,0,0.15)",
    },

    captureInner: {
      width: 64,
      height: 64,

      borderRadius: 32,

      backgroundColor: "#fff",
    },
  });