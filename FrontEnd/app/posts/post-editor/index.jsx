import React, {
  useMemo,
  useRef,
  useState,
} from "react";

import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import {
  useImage,
} from "@shopify/react-native-skia";

import {
  manipulateAsync,
  SaveFormat,
  FlipType,
} from "expo-image-manipulator";

import {
  FILTERS,
} from "./filters/filterMatrices";

import {
  identityMatrix,
  brightnessMatrix,
  contrastMatrix,
  saturationMatrix,
  warmthMatrix,
  multiplyMatrices,
} from "./utils/matrixUtils";

import EditorHeader from "./components/EditorHeader";

import EditorCanvas from "./components/EditorCanvas";

import FilterPanel from "./components/FilterPanel";

import AdjustPanel from "./components/AdjustPanel";

import CropPanel from "./components/CropPanel";

import EditorTools from "./components/EditorTools";

const { width } =
  Dimensions.get("window");

export default function PostEditor() {
  
  const params =
    useLocalSearchParams();

    const canvasRef = useRef(null);

  const originalImage =
    Array.isArray(params.image)
      ? params.image[0]
      : params.image;

  const [imageUri, setImageUri] =
    useState(originalImage);

  const image =
    useImage(imageUri);

  // ============================================
  // TOOL
  // ============================================

  const [activeTool, setActiveTool] =
    useState("Filter");

  // ============================================
  // FILTER
  // ============================================

  const [
    selectedFilter,
    setSelectedFilter,
  ] = useState("Normal");

  // ============================================
  // ADJUST
  // ============================================

  const [brightness, setBrightness] =
    useState(0);

  const [contrast, setContrast] =
    useState(0);

  const [saturation, setSaturation] =
    useState(0);

  const [warmth, setWarmth] =
    useState(0);

  // ============================================
  // CROP
  // ============================================

  const [
    aspectRatio,
    setAspectRatio,
  ] = useState("1:1");

  // ============================================
  // ROTATION
  // ============================================

  const [rotation, setRotation] =
    useState(0);

  // ============================================
  // FLIP
  // ============================================

  const [flipped, setFlipped] =
    useState(false);

  // ============================================
  // FINAL MATRIX
  // ============================================

  const finalMatrix = useMemo(() => {
    let matrix = identityMatrix();

    const filterMatrix =
      FILTERS[selectedFilter];

    matrix =
      multiplyMatrices(
        saturationMatrix(
          saturation
        ),
        matrix
      );

    matrix =
      multiplyMatrices(
        contrastMatrix(
          contrast
        ),
        matrix
      );

    matrix =
      multiplyMatrices(
        brightnessMatrix(
          brightness
        ),
        matrix
      );

    matrix =
      multiplyMatrices(
        warmthMatrix(warmth),
        matrix
      );

    matrix =
      multiplyMatrices(
        filterMatrix,
        matrix
      );

    return matrix;
  }, [
    selectedFilter,
    brightness,
    contrast,
    saturation,
    warmth,
  ]);

  // ============================================
  // RESET
  // ============================================

  const resetEditor = () => {
    setSelectedFilter("Normal");

    setBrightness(0);
    setContrast(0);
    setSaturation(0);
    setWarmth(0);

    setAspectRatio("1:1");

    setRotation(0);

    setFlipped(false);

    setImageUri(originalImage);

    setActiveTool("Filter");
  };

  // ============================================
  // ROTATE
  // ============================================

  const rotate = async () => {
    try {
      const result =
        await manipulateAsync(
          imageUri,
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

      setImageUri(result.uri);

      setRotation(
        (rotation + 90) % 360
      );
    } catch (error) {
      console.log(
        "ROTATE ERROR",
        error
      );
    }
  };

  // ============================================
  // FLIP
  // ============================================

  const flip = async () => {
    try {
      const result =
        await manipulateAsync(
          imageUri,
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

      setImageUri(result.uri);

      setFlipped(!flipped);
    } catch (error) {
      console.log(
        "FLIP ERROR",
        error
      );
    }
  };

  // ============================================
  // CROP
  // ============================================

  const changeAspectRatio = (
    ratio
  ) => {
    setAspectRatio(ratio);
  };

  // ============================================
  // NEXT
  // ============================================

const goNext = async () => {
  try {
    const snapshot =
      await canvasRef.current?.makeImageSnapshotAsync();

    if (!snapshot) {
      console.log("❌ SNAPSHOT FAILED");
      return;
    }

    const base64 =
      snapshot.encodeToBase64();

    console.log(
      "✅ FILTERED IMAGE SNAPSHOT CREATED"
    );

    router.push({
      pathname: "/posts/post-details",

      params: {
        image: `data:image/jpeg;base64,${base64}`,

        filter: selectedFilter,

        brightness:
          String(brightness),

        contrast:
          String(contrast),

        saturation:
          String(saturation),

        warmth:
          String(warmth),

        aspectRatio,

        rotation:
          String(rotation),

        flipped:
          String(flipped),
      },
    });
  } catch (error) {
    console.log(
      "❌ EXPORT FILTER ERROR =>",
      error
    );
  }
};

  // ============================================
  // LOADING
  // ============================================

  if (!image) {
    return (
      <View
        style={styles.loading}
      >
        <ActivityIndicator
          size="large"
          color="#8B5CF6"
        />

        <Text
          style={styles.loadingText}
        >
          Loading image...
        </Text>
      </View>
    );
  }

  // ============================================
  // UI
  // ============================================

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <EditorHeader
        onBack={() =>
          router.back()
        }
        onReset={resetEditor}
        onNext={goNext}
      />

      {/* IMAGE */}

      <View
        style={[
          styles.imageContainer,

          aspectRatio === "4:5" &&
            styles.fourFive,
        ]}
      >

     <EditorCanvas
  ref={canvasRef}
  image={image}
  width={width}
  height={
    aspectRatio === "4:5"
      ? width * 1.25
      : width
  }
  matrix={finalMatrix}
/>

      </View>

      {/* PANEL */}

      <View style={styles.panel}>

        {activeTool ===
          "Filter" && (
          <FilterPanel
            image={image}
            selectedFilter={
              selectedFilter
            }
            setSelectedFilter={
              setSelectedFilter
            }
          />
        )}

        {activeTool ===
          "Adjust" && (
          <AdjustPanel
            brightness={
              brightness
            }
            setBrightness={
              setBrightness
            }

            contrast={contrast}
            setContrast={setContrast}

            saturation={
              saturation
            }
            setSaturation={
              setSaturation
            }

            warmth={warmth}
            setWarmth={setWarmth}
          />
        )}

        {activeTool ===
          "Crop" && (
          <CropPanel
            aspectRatio={
              aspectRatio
            }
            setAspectRatio={
              changeAspectRatio
            }
            rotate={rotate}
            flip={flip}
          />
        )}

      </View>

      {/* TOOLS */}

      <EditorTools
        activeTool={activeTool}
        setActiveTool={setActiveTool}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  loading: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#aaa",
    marginTop: 10,
  },

  imageContainer: {
    width: width,
    height: width,
    backgroundColor: "#111",
  },

  fourFive: {
    height: width * 1.25,
  },

  panel: {
    flex: 1,
    backgroundColor: "#000",
  },
});