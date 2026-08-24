import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  StatusBar,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import * as ImageManipulator from "expo-image-manipulator";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import { useDispatch } from "react-redux";

import {
  uploadAvatar,
  getProfile,
} from "../../src/redux/profileSlice";

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get("window");

const HEADER_HEIGHT = 56;
const BOTTOM_HEIGHT = 80;

const CROP_SIZE = SCREEN_WIDTH;

const AnimatedImage =
  Animated.createAnimatedComponent(
    Image
  );

export default function AvatarCrop() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    imageUri,
    userId,
  } = useLocalSearchParams();

  const [imageWidth, setImageWidth] =
    useState(0);

  const [imageHeight, setImageHeight] =
    useState(0);

  const [imageLoaded, setImageLoaded] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [baseWidth, setBaseWidth] =
    useState(CROP_SIZE);

  const [baseHeight, setBaseHeight] =
    useState(CROP_SIZE);

  // =====================================================
  // GESTURE VALUES
  // =====================================================

  const scale =
    useSharedValue(1);

  const savedScale =
    useSharedValue(1);

  const translateX =
    useSharedValue(0);

  const translateY =
    useSharedValue(0);

  const savedTranslateX =
    useSharedValue(0);

  const savedTranslateY =
    useSharedValue(0);

  // =====================================================
  // IMAGE SIZE
  // =====================================================

  useEffect(() => {
    if (!imageUri) {
      return;
    }

    Image.getSize(
      imageUri,
      (width, height) => {
        setImageWidth(width);
        setImageHeight(height);

        const imageRatio =
          width / height;

        if (imageRatio > 1) {
          setBaseHeight(
            CROP_SIZE
          );

          setBaseWidth(
            CROP_SIZE * imageRatio
          );
        } else {
          setBaseWidth(
            CROP_SIZE
          );

          setBaseHeight(
            CROP_SIZE / imageRatio
          );
        }

        setImageLoaded(true);
      },
      (error) => {
        console.log(
          "IMAGE SIZE ERROR =>",
          error
        );
      }
    );
  }, [imageUri]);

  // =====================================================
  // PINCH
  // =====================================================

  const pinchGesture =
    Gesture.Pinch()
      .onUpdate((event) => {
        let newScale =
          savedScale.value *
          event.scale;

        if (newScale < 1) {
          newScale = 1;
        }

        if (newScale > 5) {
          newScale = 5;
        }

        scale.value = newScale;
      })
      .onEnd(() => {
        savedScale.value =
          scale.value;
      });

  // =====================================================
  // PAN
  // =====================================================

  const panGesture =
    Gesture.Pan()
      .onUpdate((event) => {
        const scaledWidth =
          baseWidth *
          scale.value;

        const scaledHeight =
          baseHeight *
          scale.value;

        const maxX =
          Math.max(
            0,
            (scaledWidth -
              CROP_SIZE) /
              2
          );

        const maxY =
          Math.max(
            0,
            (scaledHeight -
              CROP_SIZE) /
              2
          );

        let x =
          savedTranslateX.value +
          event.translationX;

        let y =
          savedTranslateY.value +
          event.translationY;

        if (x > maxX) {
          x = maxX;
        }

        if (x < -maxX) {
          x = -maxX;
        }

        if (y > maxY) {
          y = maxY;
        }

        if (y < -maxY) {
          y = -maxY;
        }

        translateX.value = x;
        translateY.value = y;
      })
      .onEnd(() => {
        savedTranslateX.value =
          translateX.value;

        savedTranslateY.value =
          translateY.value;
      });

  // =====================================================
  // COMBINED GESTURE
  // =====================================================

  const gesture =
    Gesture.Simultaneous(
      panGesture,
      pinchGesture
    );

  // =====================================================
  // IMAGE STYLE
  // =====================================================

  const animatedImageStyle =
    useAnimatedStyle(() => {
      return {
        width: baseWidth,
        height: baseHeight,

        transform: [
          {
            translateX:
              translateX.value,
          },
          {
            translateY:
              translateY.value,
          },
          {
            scale: scale.value,
          },
        ],
      };
    });

  // =====================================================
  // CROP + UPLOAD
  // =====================================================

  const performCrop = async (
    currentScale,
    currentX,
    currentY
  ) => {
    try {
      if (
        !imageWidth ||
        !imageHeight ||
        !baseWidth ||
        !baseHeight
      ) {
        return;
      }

      const displayedWidth =
        baseWidth *
        currentScale;

      const displayedHeight =
        baseHeight *
        currentScale;

      const editorHeight =
        SCREEN_HEIGHT -
        HEADER_HEIGHT -
        BOTTOM_HEIGHT;

      const editorTop =
        HEADER_HEIGHT;

      // Image position
      const imageLeft =
        (SCREEN_WIDTH -
          displayedWidth) /
          2 +
        currentX;

      const imageTop =
        editorTop +
        (editorHeight -
          displayedHeight) /
          2 +
        currentY;

      // Crop box position
      const cropLeft =
        (SCREEN_WIDTH -
          CROP_SIZE) /
        2;

      const cropTop =
        editorTop +
        (editorHeight -
          CROP_SIZE) /
        2;

      // Difference
      const cropX =
        cropLeft -
        imageLeft;

      const cropY =
        cropTop -
        imageTop;

      // Screen → original image ratio
      const ratioX =
        imageWidth /
        displayedWidth;

      const ratioY =
        imageHeight /
        displayedHeight;

      let originX =
        cropX *
        ratioX;

      let originY =
        cropY *
        ratioY;

      let cropWidth =
        CROP_SIZE *
        ratioX;

      let cropHeight =
        CROP_SIZE *
        ratioY;

      // Clamp values
      originX =
        Math.max(
          0,
          Math.min(
            originX,
            imageWidth - 1
          )
        );

      originY =
        Math.max(
          0,
          Math.min(
            originY,
            imageHeight - 1
          )
        );

      cropWidth =
        Math.min(
          cropWidth,
          imageWidth -
            originX
        );

      cropHeight =
        Math.min(
          cropHeight,
          imageHeight -
            originY
        );

      // =================================================
      // ACTUAL CROP
      // =================================================

      const cropped =
        await ImageManipulator.manipulateAsync(
          imageUri,
          [
            {
              crop: {
                originX:
                  Math.round(
                    originX
                  ),

                originY:
                  Math.round(
                    originY
                  ),

                width:
                  Math.round(
                    cropWidth
                  ),

                height:
                  Math.round(
                    cropHeight
                  ),
              },
            },
          ],
          {
            compress: 0.9,

            format:
              ImageManipulator
                .SaveFormat
                .JPEG,
          }
        );

      console.log(
        "CROPPED IMAGE =>",
        cropped.uri
      );

      // =================================================
      // FORM DATA
      // =================================================

      const formData =
        new FormData();

      formData.append(
        "file",
        {
          uri: cropped.uri,
          name: "avatar.jpg",
          type: "image/jpeg",
        }
      );

      // =================================================
      // UPLOAD
      // =================================================

      await dispatch(
        uploadAvatar({
          userId: Number(userId),
          formData,
        })
      ).unwrap();

      console.log(
        "AVATAR UPLOAD SUCCESS"
      );

      // =================================================
      // REFRESH PROFILE
      // =================================================

      await dispatch(
        getProfile(
          Number(userId)
        )
      ).unwrap();

      console.log(
        "PROFILE REFRESH SUCCESS"
      );

      // =================================================
      // RETURN TO PREVIOUS SCREEN
      // =================================================

      router.back();

    } catch (error) {
      console.log(
        "AVATAR CROP ERROR =>",
        error
      );
    } finally {
      setUploading(false);
    }
  };

  // =====================================================
  // DONE
  // =====================================================

  const handleDone = () => {
    if (
      uploading ||
      !imageLoaded
    ) {
      return;
    }

    setUploading(true);

    performCrop(
      scale.value,
      translateX.value,
      translateY.value
    );
  };

  // =====================================================
  // NO IMAGE
  // =====================================================

  if (!imageUri) {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <Text style={styles.errorText}>
          Image not found
        </Text>

        <TouchableOpacity
          onPress={() =>
            router.back()
          }
        >
          <Text style={styles.done}>
            Go Back
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom"]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000"
      />

      <View style={styles.container}>

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <View style={styles.header}>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() =>
              router.back()
            }
            disabled={uploading}
          >
            <Text style={styles.cancel}>
              Cancel
            </Text>
          </TouchableOpacity>

          <Text style={styles.title}>
            Crop
          </Text>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleDone}
            disabled={
              uploading ||
              !imageLoaded
            }
          >
            {uploading ? (
              <ActivityIndicator
                size="small"
                color="#0095F6"
              />
            ) : (
              <Text
                style={[
                  styles.done,
                  !imageLoaded &&
                    styles.disabledDone,
                ]}
              >
                Done
              </Text>
            )}
          </TouchableOpacity>

        </View>

        {/* ================================================= */}
        {/* EDITOR */}
        {/* ================================================= */}

        <View style={styles.editor}>

          <GestureDetector
            gesture={gesture}
          >
            <AnimatedImage
              source={{
                uri: imageUri,
              }}
              resizeMode="cover"
              onLoad={() =>
                setImageLoaded(true)
              }
              style={[
                styles.image,
                animatedImageStyle,
              ]}
            />
          </GestureDetector>

          {/* ================================================= */}
          {/* OVERLAY */}
          {/* ================================================= */}

          <View
            pointerEvents="none"
            style={styles.overlay}
          >

            <View
              style={styles.overlayTop}
            />

            <View
              style={styles.overlayMiddle}
            >

              <View
                style={
                  styles.overlaySide
                }
              />

              {/* CROP BOX */}

              <View
                style={styles.cropBox}
              >

                <View
                  style={[
                    styles.gridVertical,
                    {
                      left:
                        CROP_SIZE / 3,
                    },
                  ]}
                />

                <View
                  style={[
                    styles.gridVertical,
                    {
                      left:
                        (CROP_SIZE * 2) /
                        3,
                    },
                  ]}
                />

                <View
                  style={[
                    styles.gridHorizontal,
                    {
                      top:
                        CROP_SIZE / 3,
                    },
                  ]}
                />

                <View
                  style={[
                    styles.gridHorizontal,
                    {
                      top:
                        (CROP_SIZE * 2) /
                        3,
                    },
                  ]}
                />

                {/* CORNERS */}

                <View
                  style={[
                    styles.corner,
                    styles.topLeft,
                  ]}
                />

                <View
                  style={[
                    styles.corner,
                    styles.topRight,
                  ]}
                />

                <View
                  style={[
                    styles.corner,
                    styles.bottomLeft,
                  ]}
                />

                <View
                  style={[
                    styles.corner,
                    styles.bottomRight,
                  ]}
                />

              </View>

              <View
                style={
                  styles.overlaySide
                }
              />

            </View>

            <View
              style={styles.overlayBottom}
            />

          </View>
        </View>

        {/* ================================================= */}
        {/* BOTTOM */}
        {/* ================================================= */}

        <View style={styles.bottomBar}>

          <View
            style={styles.bottomOption}
          >
            <Text
              style={styles.bottomIcon}
            >
              ↻
            </Text>

            <Text
              style={styles.bottomText}
            >
              Rotate
            </Text>
          </View>

          <Text
            style={styles.instruction}
          >
            Pinch to zoom • Drag to move
          </Text>

        </View>

      </View>
    </SafeAreaView>
  );
}

// =======================================================
// STYLES
// =======================================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },

  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    height: HEADER_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#1c1c1c",
    zIndex: 20,
  },

  headerButton: {
    minWidth: 70,
    height: HEADER_HEIGHT,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  title: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },

  cancel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
  },

  done: {
    color: "#0095F6",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "right",
  },

  disabledDone: {
    opacity: 0.4,
  },

  editor: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    position: "absolute",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  overlayTop: {
    height: "50%",
    backgroundColor:
      "rgba(0,0,0,0.55)",
  },

  overlayMiddle: {
    height: CROP_SIZE,
    flexDirection: "row",
    position: "absolute",
    top: "50%",
    marginTop:
      -(CROP_SIZE / 2),
    left: 0,
    right: 0,
  },

  overlaySide: {
    flex: 1,
    backgroundColor:
      "rgba(0,0,0,0.55)",
  },

  overlayBottom: {
    flex: 1,
    backgroundColor:
      "rgba(0,0,0,0.55)",
  },

  cropBox: {
    width: CROP_SIZE,
    height: CROP_SIZE,
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.8)",
    position: "relative",
  },

  gridVertical: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor:
      "rgba(255,255,255,0.35)",
  },

  gridHorizontal: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor:
      "rgba(255,255,255,0.35)",
  },

  corner: {
    position: "absolute",
    width: 24,
    height: 24,
    borderColor: "#fff",
  },

  topLeft: {
    top: -1,
    left: -1,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },

  topRight: {
    top: -1,
    right: -1,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },

  bottomLeft: {
    bottom: -1,
    left: -1,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },

  bottomRight: {
    bottom: -1,
    right: -1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },

  bottomBar: {
    height: BOTTOM_HEIGHT,
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
  },

  bottomOption: {
    alignItems: "center",
    width: 60,
  },

  bottomIcon: {
    color: "#fff",
    fontSize: 24,
  },

  bottomText: {
    color: "#fff",
    fontSize: 11,
    marginTop: 2,
  },

  instruction: {
    color: "#888",
    fontSize: 12,
  },

  errorText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },
});