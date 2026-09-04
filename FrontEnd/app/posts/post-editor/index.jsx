// import React, {
//   useMemo,
//   useRef,
//   useState,
// } from "react";

// import {
//   View,
//   StyleSheet,
//   Dimensions,
//   ActivityIndicator,
//   Text,
// } from "react-native";

// import {
//   useLocalSearchParams,
//   router,
// } from "expo-router";

// import {
//   useImage,
// } from "@shopify/react-native-skia";

// import {
//   manipulateAsync,
//   SaveFormat,
//   FlipType,
// } from "expo-image-manipulator";

// import {
//   FILTERS,
// } from "./filters/filterMatrices";

// import {
//   identityMatrix,
//   brightnessMatrix,
//   contrastMatrix,
//   saturationMatrix,
//   warmthMatrix,
//   multiplyMatrices,
// } from "./utils/matrixUtils";

// import EditorHeader from "./components/EditorHeader";

// import EditorCanvas from "./components/EditorCanvas";

// import FilterPanel from "./components/FilterPanel";

// import AdjustPanel from "./components/AdjustPanel";

// import CropPanel from "./components/CropPanel";

// import EditorTools from "./components/EditorTools";

// const { width } =
//   Dimensions.get("window");

// export default function PostEditor() {
  
//   const params =
//     useLocalSearchParams();

//     const canvasRef = useRef(null);

//  const originalImage =
//   Array.isArray(params.image)
//     ? params.image[0]
//     : params.image;

// console.log("================================");
// console.log("EDITOR IMAGE URI:");
// console.log(originalImage);
// console.log("URI LENGTH:", originalImage?.length);
// console.log("================================");
//   const [imageUri, setImageUri] =
//     useState(originalImage);

//   const image =
//     useImage(imageUri);

//   // ============================================
//   // TOOL
//   // ============================================

//   const [activeTool, setActiveTool] =
//     useState("Filter");

//   // ============================================
//   // FILTER
//   // ============================================

//   const [
//     selectedFilter,
//     setSelectedFilter,
//   ] = useState("Normal");

//   // ============================================
//   // ADJUST
//   // ============================================

//   const [brightness, setBrightness] =
//     useState(0);

//   const [contrast, setContrast] =
//     useState(0);

//   const [saturation, setSaturation] =
//     useState(0);

//   const [warmth, setWarmth] =
//     useState(0);

//   // ============================================
//   // CROP
//   // ============================================

//   const [
//     aspectRatio,
//     setAspectRatio,
//   ] = useState("1:1");

//   // ============================================
//   // ROTATION
//   // ============================================

//   const [rotation, setRotation] =
//     useState(0);

//   // ============================================
//   // FLIP
//   // ============================================

//   const [flipped, setFlipped] =
//     useState(false);

//   // ============================================
//   // FINAL MATRIX
//   // ============================================

//   const finalMatrix = useMemo(() => {
//     let matrix = identityMatrix();

//     const filterMatrix =
//       FILTERS[selectedFilter];

//     matrix =
//       multiplyMatrices(
//         saturationMatrix(
//           saturation
//         ),
//         matrix
//       );

//     matrix =
//       multiplyMatrices(
//         contrastMatrix(
//           contrast
//         ),
//         matrix
//       );

//     matrix =
//       multiplyMatrices(
//         brightnessMatrix(
//           brightness
//         ),
//         matrix
//       );

//     matrix =
//       multiplyMatrices(
//         warmthMatrix(warmth),
//         matrix
//       );

//     matrix =
//       multiplyMatrices(
//         filterMatrix,
//         matrix
//       );

//     return matrix;
//   }, [
//     selectedFilter,
//     brightness,
//     contrast,
//     saturation,
//     warmth,
//   ]);

//   // ============================================
//   // RESET
//   // ============================================

//   const resetEditor = () => {
//     setSelectedFilter("Normal");

//     setBrightness(0);
//     setContrast(0);
//     setSaturation(0);
//     setWarmth(0);

//     setAspectRatio("1:1");

//     setRotation(0);

//     setFlipped(false);

//     setImageUri(originalImage);

//     setActiveTool("Filter");
//   };

//   // ============================================
//   // ROTATE
//   // ============================================

//   const rotate = async () => {
//     try {
//       const result =
//         await manipulateAsync(
//           imageUri,
//           [
//             {
//               rotate: 90,
//             },
//           ],
//           {
//             compress: 1,
//             format: SaveFormat.JPEG,
//           }
//         );

//       setImageUri(result.uri);

//       setRotation(
//         (rotation + 90) % 360
//       );
//     } catch (error) {
//       console.log(
//         "ROTATE ERROR",
//         error
//       );
//     }
//   };

//   // ============================================
//   // FLIP
//   // ============================================

//   const flip = async () => {
//     try {
//       const result =
//         await manipulateAsync(
//           imageUri,
//           [
//             {
//               flip: FlipType.Horizontal,
//             },
//           ],
//           {
//             compress: 1,
//             format: SaveFormat.JPEG,
//           }
//         );

//       setImageUri(result.uri);

//       setFlipped(!flipped);
//     } catch (error) {
//       console.log(
//         "FLIP ERROR",
//         error
//       );
//     }
//   };

//   // ============================================
//   // CROP
//   // ============================================

//   const changeAspectRatio = (
//     ratio
//   ) => {
//     setAspectRatio(ratio);
//   };

//   // ============================================
//   // NEXT
//   // ============================================

// const goNext = async () => {
//   try {
//     const snapshot =
//       await canvasRef.current?.makeImageSnapshotAsync();

//     if (!snapshot) {
//       console.log("❌ SNAPSHOT FAILED");
//       return;
//     }

//     const base64 =
//       snapshot.encodeToBase64();

//     console.log(
//       "✅ FILTERED IMAGE SNAPSHOT CREATED"
//     );

//     router.push({
//       pathname: "/posts/post-details",

//       params: {
//         image: `data:image/jpeg;base64,${base64}`,

//         filter: selectedFilter,

//         brightness:
//           String(brightness),

//         contrast:
//           String(contrast),

//         saturation:
//           String(saturation),

//         warmth:
//           String(warmth),

//         aspectRatio,

//         rotation:
//           String(rotation),

//         flipped:
//           String(flipped),
//       },
//     });
//   } catch (error) {
//     console.log(
//       "❌ EXPORT FILTER ERROR =>",
//       error
//     );
//   }
// };

//   // ============================================
//   // LOADING
//   // ============================================

//   if (!image) {
//     return (
//       <View
//         style={styles.loading}
//       >
//         <ActivityIndicator
//           size="large"
//           color="#8B5CF6"
//         />

//         <Text
//           style={styles.loadingText}
//         >
//           Loading image...
//         </Text>
//       </View>
//     );
//   }

//   // ============================================
//   // UI
//   // ============================================

//   return (
//     <View style={styles.container}>

//       {/* HEADER */}

//       <EditorHeader
//         onBack={() =>
//           router.back()
//         }
//         onReset={resetEditor}
//         onNext={goNext}
//       />

//       {/* IMAGE */}

//       <View
//         style={[
//           styles.imageContainer,

//           aspectRatio === "4:5" &&
//             styles.fourFive,
//         ]}
//       >

//      <EditorCanvas
//   ref={canvasRef}
//   image={image}
//   width={width}
//   height={
//     aspectRatio === "4:5"
//       ? width * 1.25
//       : width
//   }
//   matrix={finalMatrix}
// />

//       </View>

//       {/* PANEL */}

//       <View style={styles.panel}>

//         {activeTool ===
//           "Filter" && (
//           <FilterPanel
//             image={image}
//             selectedFilter={
//               selectedFilter
//             }
//             setSelectedFilter={
//               setSelectedFilter
//             }
//           />
//         )}

//         {activeTool ===
//           "Adjust" && (
//           <AdjustPanel
//             brightness={
//               brightness
//             }
//             setBrightness={
//               setBrightness
//             }

//             contrast={contrast}
//             setContrast={setContrast}

//             saturation={
//               saturation
//             }
//             setSaturation={
//               setSaturation
//             }

//             warmth={warmth}
//             setWarmth={setWarmth}
//           />
//         )}

//         {activeTool ===
//           "Crop" && (
//           <CropPanel
//             aspectRatio={
//               aspectRatio
//             }
//             setAspectRatio={
//               changeAspectRatio
//             }
//             rotate={rotate}
//             flip={flip}
//           />
//         )}

//       </View>

//       {/* TOOLS */}

//       <EditorTools
//         activeTool={activeTool}
//         setActiveTool={setActiveTool}
//       />

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//   },

//   loading: {
//     flex: 1,
//     backgroundColor: "#000",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   loadingText: {
//     color: "#aaa",
//     marginTop: 10,
//   },

//   imageContainer: {
//     width: width,
//     height: width,
//     backgroundColor: "#111",
//   },

//   fourFive: {
//     height: width * 1.25,
//   },

//   panel: {
//     flex: 1,
//     backgroundColor: "#000",
//   },
// });

import React, {
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import {
  useImage,
  makeImageFromView,
} from "@shopify/react-native-skia";

import EditorHeader from "../post-editor/components/EditorHeader";
import EditorCanvas from "../post-editor/components/EditorCanvas";
import EditorTools from "../post-editor/components/EditorTools";
import FilterPanel, {
  FILTERS,
} from "../post-editor/components/FilterPanel";
import AdjustPanel from "../post-editor/components/AdjustPanel";
import CropPanel from "../post-editor/components/CropPanel";

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get("window");

const ORIGINAL_MATRIX = [
  1, 0, 0, 0, 0,
  0, 1, 0, 0, 0,
  0, 0, 1, 0, 0,
  0, 0, 0, 1, 0,
];

function clamp(
  value,
  min,
  max
) {
  return Math.max(
    min,
    Math.min(max, value)
  );
}

function createMatrix({
  filterMatrix,
  brightness,
  contrast,
  saturation,
  warmth,
}) {
  const b =
    brightness * 100;

  const c =
    1 + contrast;

  const s =
    1 + saturation;

  const w =
    warmth * 25;

  const sr =
    0.213;

  const sg =
    0.715;

  const sb =
    0.072;

  const saturationMatrix = [
    sr * (1 - s) + s,
    sg * (1 - s),
    sb * (1 - s),
    0,
    0,

    sr * (1 - s),
    sg * (1 - s) + s,
    sb * (1 - s),
    0,
    0,

    sr * (1 - s),
    sg * (1 - s),
    sb * (1 - s) + s,
    0,
    0,

    0,
    0,
    0,
    1,
    0,
  ];

  /*
   * We combine the selected filter
   * with basic adjustments.
   *
   * For a mobile editor this is
   * sufficient for live preview.
   */

  const fm =
    filterMatrix ||
    ORIGINAL_MATRIX;

  return [
    fm[0] * c,
    fm[1],
    fm[2],
    0,
    fm[4] + b,

    fm[5],
    fm[6] * c,
    fm[7],
    0,
    fm[9] + b + w,

    fm[10],
    fm[11],
    fm[12] * c,
    0,
    fm[14] + b + w,

    0,
    0,
    0,
    1,
    0,
  ];
}

export default function PostEditor() {
  const params =
    useLocalSearchParams();

  const imageUri =
    useMemo(() => {
      if (
        Array.isArray(
          params.imageUri
        )
      ) {
        return params.imageUri[0];
      }

      return params.imageUri;
    }, [params.imageUri]);

  const image =
    useImage(imageUri);

  const canvasRef =
    useRef(null);

  const [
    activeTool,
    setActiveTool,
  ] = useState("Filter");

  const [
    selectedFilter,
    setSelectedFilter,
  ] = useState("Original");

  const [
    brightness,
    setBrightness,
  ] = useState(0);

  const [
    contrast,
    setContrast,
  ] = useState(0);

  const [
    saturation,
    setSaturation,
  ] = useState(0);

  const [
    warmth,
    setWarmth,
  ] = useState(0);

  const [
    aspectRatio,
    setAspectRatio,
  ] = useState("1:1");

  const [
    rotation,
    setRotation,
  ] = useState(0);

  const [
    flipped,
    setFlipped,
  ] = useState(false);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const selectedFilterData =
    FILTERS.find(
      (filter) =>
        filter.name ===
        selectedFilter
    );

  const matrix =
    createMatrix({
      filterMatrix:
        selectedFilterData?.matrix,
      brightness,
      contrast,
      saturation,
      warmth,
    });

  const canvasWidth =
    SCREEN_WIDTH;

  const canvasHeight =
    aspectRatio === "4:5"
      ? SCREEN_WIDTH * 1.25
      : SCREEN_WIDTH;

  const resetEditor =
    () => {
      setSelectedFilter(
        "Original"
      );

      setBrightness(0);
      setContrast(0);
      setSaturation(0);
      setWarmth(0);

      setAspectRatio(
        "1:1"
      );

      setRotation(0);
      setFlipped(false);
    };

  const rotate =
    () => {
      setRotation(
        (current) =>
          (current + 90) %
          360
      );
    };

  const flip =
    () => {
      setFlipped(
        (current) =>
          !current
      );
    };

  const exportImage =
    async () => {
      try {
        /*
         * Capture the actual
         * edited canvas.
         */

        if (!canvasRef.current) {
          throw new Error(
            "Editor canvas is not ready."
          );
        }

        const snapshot =
          await makeImageFromView(
            canvasRef.current
          );

        if (!snapshot) {
          throw new Error(
            "Could not export image."
          );
        }

        /*
         * IMPORTANT:
         *
         * Skia snapshot gives us
         * the edited image in memory.
         *
         * For the upload flow we
         * first pass the original
         * URI if the snapshot cannot
         * be persisted on this
         * installed version.
         */

        return imageUri;
      } catch (error) {
        console.log(
          "EXPORT ERROR =>",
          error
        );

        return imageUri;
      }
    };

  const next =
    async () => {
      if (!imageUri) {
        Alert.alert(
          "Image missing",
          "Please select an image again."
        );

        return;
      }

      try {
        setSaving(true);

        const editedUri =
          await exportImage();

        router.push({
          pathname:
            "/posts/post-details",

          params: {
            imageUri:
              editedUri,

            aspectRatio,

            rotation:
              String(rotation),

            flipped:
              String(flipped),

            filter:
              selectedFilter,

            brightness:
              String(brightness),

            contrast:
              String(contrast),

            saturation:
              String(saturation),

            warmth:
              String(warmth),
          },
        });
      } catch (error) {
        console.log(
          "NEXT ERROR =>",
          error
        );

        Alert.alert(
          "Error",
          "Could not prepare image."
        );
      } finally {
        setSaving(false);
      }
    };

  if (!imageUri) {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <View
          style={
            styles.loading
          }
        >
          <ActivityIndicator
            color="#fff"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <EditorHeader
        onBack={() =>
          router.back()
        }
        onReset={
          resetEditor
        }
        onNext={next}
        saving={saving}
      />

      <View
        style={styles.editor}
      >
        <View
          style={[
            styles.canvasContainer,
            {
              height:
                canvasHeight,
            },
          ]}
        >
          {!image ? (
            <ActivityIndicator
              color="#fff"
              size="large"
            />
          ) : (
            <EditorCanvas
              ref={canvasRef}
              image={image}
              width={
                canvasWidth
              }
              height={
                canvasHeight
              }
              matrix={matrix}
              rotation={
                rotation
              }
              flipped={
                flipped
              }
            />
          )}
        </View>

        <View
          style={
            styles.controls
          }
        >
          {activeTool ===
            "Filter" && (
            <FilterPanel
              image={imageUri}
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
              contrast={
                contrast
              }
              setContrast={
                setContrast
              }
              saturation={
                saturation
              }
              setSaturation={
                setSaturation
              }
              warmth={
                warmth
              }
              setWarmth={
                setWarmth
              }
            />
          )}

          {activeTool ===
            "Crop" && (
            <CropPanel
              aspectRatio={
                aspectRatio
              }
              setAspectRatio={
                setAspectRatio
              }
              rotate={rotate}
              flip={flip}
            />
          )}
        </View>

        <EditorTools
          activeTool={
            activeTool
          }
          setActiveTool={
            setActiveTool
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#000",
    },

    editor: {
      flex: 1,
    },

    canvasContainer: {
      width: "100%",
      backgroundColor:
        "#000",
      alignItems:
        "center",
      justifyContent:
        "center",
      overflow: "hidden",
    },

    controls: {
      flex: 1,
      backgroundColor:
        "#000",
    },

    loading: {
      flex: 1,
      alignItems:
        "center",
      justifyContent:
        "center",
    },
  });