// // import React, { useEffect, useState } from "react";

// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Image,
// //   FlatList,
// //   Dimensions,
// //   ActivityIndicator,
// //   Alert,
// // } from "react-native";

// // import { Ionicons } from "@expo/vector-icons";

// // import * as MediaLibrary from "expo-media-library";
// // import * as ImagePicker from "expo-image-picker";

// // import { router } from "expo-router";

// // import { useSafeAreaInsets } from "react-native-safe-area-context";

// // const { width } = Dimensions.get("window");

// // const IMAGE_SIZE = width / 4;

// // export default function CreatePost() {
// //   const insets = useSafeAreaInsets();

// //   const [photos, setPhotos] = useState([]);
// //   const [selectedPhoto, setSelectedPhoto] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     loadGallery();
// //   }, []);

// //   // ==========================================
// //   // LOAD GALLERY
// //   // ==========================================

// //   const loadGallery = async () => {
// //     try {
// //       console.log("========== GALLERY START ==========");

// //       const permission =
// //         await MediaLibrary.requestPermissionsAsync(
// //           false,
// //           ["photo"]
// //         );

// //       console.log(
// //         "MEDIA LIBRARY PERMISSION =>",
// //         permission
// //       );

// //       if (!permission.granted) {
// //         Alert.alert(
// //           "Permission Required",
// //           "Please allow photo access to select images."
// //         );

// //         setPhotos([]);
// //         setSelectedPhoto(null);

// //         return;
// //       }

// //       const media =
// //         await MediaLibrary.getAssetsAsync({
// //           mediaType: "photo",
// //           first: 100,
// //           sortBy: [
// //             MediaLibrary.SortBy.creationTime,
// //           ],
// //         });

// //       console.log(
// //         "TOTAL ASSETS =>",
// //         media.totalCount
// //       );

// //       console.log(
// //         "ASSETS LENGTH =>",
// //         media.assets.length
// //       );

// //       setPhotos(media.assets);

// //       // Select latest image
// //       if (media.assets.length > 0) {
// //         setSelectedPhoto(media.assets[0]);
// //       }

// //       console.log(
// //         "✅ GALLERY LOADED SUCCESSFULLY"
// //       );
// //     } catch (error) {
// //       console.log(
// //         "❌ GALLERY ERROR =>",
// //         error
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ==========================================
// //   // CAMERA
// //   // ==========================================

// //   const openCamera = async () => {
// //     try {
// //       console.log("Camera pressed");

// //       const permission =
// //         await ImagePicker.requestCameraPermissionsAsync();

// //       if (!permission.granted) {
// //         Alert.alert(
// //           "Camera Permission",
// //           "Please allow camera access."
// //         );

// //         return;
// //       }

// //       const result =
// //         await ImagePicker.launchCameraAsync({
// //           mediaTypes: ["images"],
// //           quality: 1,
// //         });

// //       if (
// //         !result.canceled &&
// //         result.assets?.length
// //       ) {
// //         const image = result.assets[0];

// //         setSelectedPhoto({
// //           id: `camera-${Date.now()}`,
// //           uri: image.uri,
// //           width: image.width,
// //           height: image.height,
// //           mediaType: "photo",
// //         });
// //       }
// //     } catch (error) {
// //       console.log(
// //         "CAMERA ERROR =>",
// //         error
// //       );
// //     }
// //   };

// //   // ==========================================
// //   // NEXT
// //   // ==========================================

// //   const goToEditor = () => {
// //     if (!selectedPhoto?.uri) {
// //       return;
// //     }

// //     router.push({
// //       pathname: "/posts/post-editor",
// //       params: {
// //         image: selectedPhoto.uri,
// //       },
// //     });
// //   };

// //   // ==========================================
// //   // GALLERY ITEM
// //   // ==========================================

// //   const renderItem = ({
// //     item,
// //     index,
// //   }) => {
// //     // Camera tile
// //     if (item.isCamera) {
// //       return (
// //         <TouchableOpacity
// //           style={styles.cameraTile}
// //           onPress={openCamera}
// //         >
// //           <Ionicons
// //             name="camera"
// //             size={36}
// //             color="#fff"
// //           />
// //         </TouchableOpacity>
// //       );
// //     }

// //     return (
// //       <TouchableOpacity
// //         activeOpacity={0.8}
// //         onPress={() =>
// //           setSelectedPhoto(item)
// //         }
// //       >
// //         <Image
// //           source={{
// //             uri: item.uri,
// //           }}
// //           style={styles.gridImage}
// //         />

// //         {selectedPhoto?.id === item.id && (
// //           <View
// //             style={styles.selectedCircle}
// //           >
// //             <Text
// //               style={styles.selectedText}
// //             >
// //               1
// //             </Text>
// //           </View>
// //         )}
// //       </TouchableOpacity>
// //     );
// //   };

// //   const galleryData = [
// //     {
// //       id: "camera",
// //       isCamera: true,
// //     },
// //     ...photos,
// //   ];

// //   // ==========================================
// //   // LOADING
// //   // ==========================================

// //   if (loading) {
// //     return (
// //       <View style={styles.loader}>
// //         <ActivityIndicator
// //           size="large"
// //           color="#fff"
// //         />
// //       </View>
// //     );
// //   }

// //   // ==========================================
// //   // UI
// //   // ==========================================

// //   return (
// //     <View style={styles.container}>
      
// //       {/* HEADER */}

// //       <View
// //         style={[
// //           styles.header,
// //           {
// //             paddingTop: insets.top,
// //             height: 60 + insets.top,
// //           },
// //         ]}
// //       >
// //         <TouchableOpacity
// //           style={styles.headerSide}
// //           onPress={() => router.back()}
// //         >
// //           <Ionicons
// //             name="close"
// //             size={30}
// //             color="#fff"
// //           />
// //         </TouchableOpacity>

// //         <Text style={styles.title}>
// //           New post
// //         </Text>

// //         <TouchableOpacity
// //           style={styles.headerSide}
// //           disabled={!selectedPhoto}
// //           onPress={goToEditor}
// //         >
// //           <Text
// //             style={[
// //               styles.next,
// //               !selectedPhoto &&
// //                 styles.nextDisabled,
// //             ]}
// //           >
// //             Next
// //           </Text>
// //         </TouchableOpacity>
// //       </View>

// //       {/* PREVIEW */}

// //       <View
// //         style={styles.previewContainer}
// //       >
// //         {selectedPhoto ? (
// //           <Image
// //             source={{
// //               uri: selectedPhoto.uri,
// //             }}
// //             style={styles.preview}
// //             resizeMode="cover"
// //           />
// //         ) : (
// //           <View
// //             style={styles.emptyPreview}
// //           >
// //             <Ionicons
// //               name="images-outline"
// //               size={50}
// //               color="#555"
// //             />

// //             <Text style={styles.emptyText}>
// //               No photos found
// //             </Text>
// //           </View>
// //         )}
// //       </View>

// //       {/* RECENTS */}

// //       <View
// //         style={styles.galleryHeader}
// //       >
// //         <TouchableOpacity
// //           style={styles.recentsContainer}
// //         >
// //           <Text style={styles.recents}>
// //             Recents
// //           </Text>

// //           <Ionicons
// //             name="chevron-down"
// //             size={20}
// //             color="#fff"
// //           />
// //         </TouchableOpacity>

// //         <TouchableOpacity
// //           style={styles.selectBtn}
// //         >
// //           <Ionicons
// //             name="copy-outline"
// //             size={18}
// //             color="#fff"
// //           />

// //           <Text style={styles.selectText}>
// //             Select
// //           </Text>
// //         </TouchableOpacity>
// //       </View>

// //       {/* GALLERY */}

// //       <FlatList
// //         data={galleryData}
// //         keyExtractor={(item, index) =>
// //           item.id?.toString() ||
// //           index.toString()
// //         }
// //         renderItem={renderItem}
// //         numColumns={4}
// //         showsVerticalScrollIndicator={false}
// //         contentContainerStyle={{
// //           paddingBottom: 120,
// //         }}
// //       />

// //       {/* POST / STORY / REEL / LIVE */}

// //       <View
// //         style={[
// //           styles.bottomModes,
// //           {
// //             bottom: Math.max(
// //               insets.bottom,
// //               20
// //             ),
// //           },
// //         ]}
// //       >
// //         <Text style={styles.activeMode}>
// //           POST
// //         </Text>

// //         <Text style={styles.mode}>
// //           STORY
// //         </Text>

// //         <Text style={styles.mode}>
// //           REEL
// //         </Text>

// //         <Text style={styles.mode}>
// //           LIVE
// //         </Text>
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#000",
// //   },

// //   loader: {
// //     flex: 1,
// //     backgroundColor: "#000",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },

// //   header: {
// //     width: "100%",
// //     paddingHorizontal: 8,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     backgroundColor: "#000",
// //   },

// //   headerSide: {
// //     width: 60,
// //     height: 50,
// //     justifyContent: "center",
// //   },

// //   title: {
// //     color: "#fff",
// //     fontSize: 20,
// //     fontWeight: "600",
// //   },

// //   next: {
// //     color: "#0095F6",
// //     fontSize: 16,
// //     fontWeight: "600",
// //     textAlign: "right",
// //   },

// //   nextDisabled: {
// //     opacity: 0.4,
// //   },

// //   previewContainer: {
// //     width: "100%",
// //     height: width,
// //     backgroundColor: "#111",
// //   },

// //   preview: {
// //     width: "100%",
// //     height: "100%",
// //   },

// //   emptyPreview: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },

// //   emptyText: {
// //     color: "#777",
// //     marginTop: 10,
// //     fontSize: 15,
// //   },

// //   galleryHeader: {
// //     height: 60,
// //     paddingHorizontal: 16,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //   },

// //   recentsContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },

// //   recents: {
// //     color: "#fff",
// //     fontSize: 24,
// //     fontWeight: "600",
// //     marginRight: 5,
// //   },

// //   selectBtn: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     backgroundColor: "#222",
// //     paddingHorizontal: 14,
// //     paddingVertical: 8,
// //     borderRadius: 22,
// //   },

// //   selectText: {
// //     color: "#fff",
// //     marginLeft: 6,
// //     fontSize: 14,
// //   },

// //   cameraTile: {
// //     width: IMAGE_SIZE,
// //     height: IMAGE_SIZE,
// //     backgroundColor: "#111",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },

// //   gridImage: {
// //     width: IMAGE_SIZE,
// //     height: IMAGE_SIZE,
// //     backgroundColor: "#111",
// //   },

// //   selectedCircle: {
// //     position: "absolute",
// //     top: 6,
// //     right: 6,
// //     width: 24,
// //     height: 24,
// //     borderRadius: 12,
// //     backgroundColor: "#0095F6",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },

// //   selectedText: {
// //     color: "#fff",
// //     fontWeight: "700",
// //     fontSize: 13,
// //   },

// //   bottomModes: {
// //     position: "absolute",
// //     alignSelf: "center",
// //     flexDirection: "row",
// //     alignItems: "center",
// //     backgroundColor: "#111",
// //     borderRadius: 40,
// //     paddingHorizontal: 20,
// //     paddingVertical: 14,
// //   },

// //   activeMode: {
// //     color: "#fff",
// //     fontWeight: "700",
// //     marginHorizontal: 12,
// //   },

// //   mode: {
// //     color: "#888",
// //     marginHorizontal: 12,
// //   },
// // });

// import React, { useEffect, useState } from "react";

// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   Dimensions,
//   ActivityIndicator,
//   Alert,
//   Platform,
// } from "react-native";

// import { Ionicons } from "@expo/vector-icons";

// import * as MediaLibrary from "expo-media-library";
// import * as ImagePicker from "expo-image-picker";

// import { router } from "expo-router";

// import { useSafeAreaInsets } from "react-native-safe-area-context";

// const { width } = Dimensions.get("window");

// const NUM_COLUMNS = 4;
// const IMAGE_SIZE = width / NUM_COLUMNS;

// export default function CreatePost() {
//   const insets = useSafeAreaInsets();

//   const [photos, setPhotos] = useState([]);
//   const [selectedPhoto, setSelectedPhoto] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [cameraLoading, setCameraLoading] = useState(false);

//   useEffect(() => {
//     loadGallery();
//   }, []);

//   // ============================================================
//   // LOAD GALLERY
//   // ============================================================

//   const loadGallery = async () => {
//     try {
//       console.log("========== GALLERY START ==========");

//       const permission =
//         await MediaLibrary.requestPermissionsAsync();

//       console.log(
//         "MEDIA LIBRARY PERMISSION =>",
//         permission
//       );

//       if (!permission.granted) {
//         Alert.alert(
//           "Permission Required",
//           "Please allow photo access to select images.",
//           [
//             {
//               text: "Cancel",
//               style: "cancel",
//             },
//             {
//               text: "Settings",
//               onPress: () => {
//                 // You can add Linking.openSettings()
//                 // here if required.
//               },
//             },
//           ]
//         );

//         setPhotos([]);
//         setSelectedPhoto(null);

//         return;
//       }

//       const media =
//         await MediaLibrary.getAssetsAsync({
//           mediaType: "photo",
//           first: 100,
//           sortBy: [
//             MediaLibrary.SortBy.creationTime,
//           ],
//         });

//       console.log(
//         "TOTAL ASSETS =>",
//         media.totalCount
//       );

//       console.log(
//         "ASSETS LENGTH =>",
//         media.assets.length
//       );

//       setPhotos(media.assets);

//       // Select latest photo
//       if (media.assets.length > 0) {
//         setSelectedPhoto(media.assets[0]);
//       }

//       console.log(
//         "✅ GALLERY LOADED SUCCESSFULLY"
//       );
//     } catch (error) {
//       console.log(
//         "❌ GALLERY ERROR =>",
//         error
//       );

//       Alert.alert(
//         "Gallery Error",
//         "Unable to load your photos."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================================
//   // CAMERA
//   // ============================================================

//   const openCamera = async () => {
//     try {
//       if (cameraLoading) {
//         return;
//       }

//       setCameraLoading(true);

//       console.log("========== CAMERA START ==========");

//       const permission =
//         await ImagePicker.requestCameraPermissionsAsync();

//       console.log(
//         "CAMERA PERMISSION =>",
//         permission
//       );

//       if (!permission.granted) {
//         Alert.alert(
//           "Camera Permission",
//           "Please allow camera access to take a photo."
//         );

//         return;
//       }

//       const result =
//         await ImagePicker.launchCameraAsync({
//           mediaTypes:
//             ImagePicker.MediaTypeOptions.Images,
//           quality: 1,
//           allowsEditing: false,
//         });

//       console.log(
//         "CAMERA RESULT =>",
//         result
//       );

//       if (
//         result.canceled ||
//         !result.assets ||
//         result.assets.length === 0
//       ) {
//         return;
//       }

//       const image = result.assets[0];

//       const cameraPhoto = {
//         id: `camera-${Date.now()}`,
//         uri: image.uri,
//         width: image.width,
//         height: image.height,
//         mediaType: "photo",
//         isCameraPhoto: true,
//       };

//       setSelectedPhoto(cameraPhoto);

//       console.log(
//         "✅ CAMERA PHOTO SELECTED =>",
//         cameraPhoto.uri
//       );
//     } catch (error) {
//       console.log(
//         "❌ CAMERA ERROR =>",
//         error
//       );

//       Alert.alert(
//         "Camera Error",
//         "Unable to open camera."
//       );
//     } finally {
//       setCameraLoading(false);
//     }
//   };

//   // ============================================================
//   // SELECT PHOTO
//   // ============================================================

//   const selectPhoto = (photo) => {
//     if (!photo?.uri) {
//       return;
//     }

//     console.log(
//       "SELECTED PHOTO =>",
//       photo.uri
//     );

//     setSelectedPhoto(photo);
//   };

//   // ============================================================
//   // NEXT
//   // ============================================================

//   const goToEditor = () => {
//     if (!selectedPhoto?.uri) {
//       Alert.alert(
//         "Select a photo",
//         "Please select a photo first."
//       );

//       return;
//     }

//     console.log(
//       "========== OPEN POST EDITOR =========="
//     );

//     console.log(
//       "EDITOR IMAGE =>",
//       selectedPhoto.uri
//     );

//     router.push({
//       pathname: "/posts/post-editor",
//       params: {
//         image: selectedPhoto.uri,
//       },
//     });
//   };

//   // ============================================================
//   // GALLERY ITEM
//   // ============================================================

//   const renderItem = ({
//     item,
//     index,
//   }) => {
//     // ----------------------------------------------------------
//     // CAMERA TILE
//     // ----------------------------------------------------------

//     if (item.isCamera) {
//       return (
//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={styles.cameraTile}
//           onPress={openCamera}
//         >
//           {cameraLoading ? (
//             <ActivityIndicator
//               size="small"
//               color="#fff"
//             />
//           ) : (
//             <>
//               <Ionicons
//                 name="camera-outline"
//                 size={30}
//                 color="#fff"
//               />

//               <Text
//                 style={styles.cameraText}
//               >
//                 Camera
//               </Text>
//             </>
//           )}
//         </TouchableOpacity>
//       );
//     }

//     // ----------------------------------------------------------
//     // GALLERY PHOTO
//     // ----------------------------------------------------------

//     const isSelected =
//       selectedPhoto?.id === item.id;

//     return (
//       <TouchableOpacity
//         activeOpacity={0.85}
//         onPress={() =>
//           selectPhoto(item)
//         }
//         style={styles.gridItem}
//       >
//         <Image
//           source={{
//             uri: item.uri,
//           }}
//           style={styles.gridImage}
//         />

//         {/* Selected overlay */}

//         {isSelected && (
//           <>
//             <View
//               style={styles.selectedOverlay}
//             />

//             <View
//               style={styles.selectedCircle}
//             >
//               <Ionicons
//                 name="checkmark"
//                 size={15}
//                 color="#fff"
//               />
//             </View>
//           </>
//         )}
//       </TouchableOpacity>
//     );
//   };

//   // ============================================================
//   // GALLERY DATA
//   // ============================================================

//   const galleryData = [
//     {
//       id: "camera",
//       isCamera: true,
//     },
//     ...photos,
//   ];

//   // ============================================================
//   // LOADING
//   // ============================================================

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator
//           size="large"
//           color="#fff"
//         />

//         <Text style={styles.loadingText}>
//           Loading photos...
//         </Text>
//       </View>
//     );
//   }

//   // ============================================================
//   // UI
//   // ============================================================

//   return (
//     <View style={styles.container}>
//       {/* ======================================================
//           HEADER
//       ====================================================== */}

//       <View
//         style={[
//           styles.header,
//           {
//             paddingTop: insets.top,
//             height: 60 + insets.top,
//           },
//         ]}
//       >
//         {/* CLOSE */}

//         <TouchableOpacity
//           style={styles.headerSide}
//           onPress={() =>
//             router.back()
//           }
//         >
//           <Ionicons
//             name="close"
//             size={30}
//             color="#fff"
//           />
//         </TouchableOpacity>

//         {/* TITLE */}

//         <Text style={styles.title}>
//           New post
//         </Text>

//         {/* NEXT */}

//         <TouchableOpacity
//           style={styles.headerSide}
//           disabled={!selectedPhoto}
//           onPress={goToEditor}
//         >
//           <Text
//             style={[
//               styles.next,
//               !selectedPhoto &&
//                 styles.nextDisabled,
//             ]}
//           >
//             Next
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* ======================================================
//           SELECTED PHOTO PREVIEW
//       ====================================================== */}

//       <View
//         style={styles.previewContainer}
//       >
//         {selectedPhoto?.uri ? (
//           <Image
//             source={{
//               uri: selectedPhoto.uri,
//             }}
//             style={styles.preview}
//             resizeMode="cover"
//           />
//         ) : (
//           <View
//             style={styles.emptyPreview}
//           >
//             <Ionicons
//               name="images-outline"
//               size={50}
//               color="#555"
//             />

//             <Text
//               style={styles.emptyText}
//             >
//               Select a photo
//             </Text>
//           </View>
//         )}
//       </View>

//       {/* ======================================================
//           GALLERY HEADER
//       ====================================================== */}

//       <View
//         style={styles.galleryHeader}
//       >
//         <TouchableOpacity
//           style={
//             styles.recentsContainer
//           }
//           activeOpacity={0.7}
//         >
//           <Text style={styles.recents}>
//             Recents
//           </Text>

//           <Ionicons
//             name="chevron-down"
//             size={19}
//             color="#fff"
//           />
//         </TouchableOpacity>

//         <View
//           style={styles.galleryActions}
//         >
//           {/* Camera */}

//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={openCamera}
//           >
//             <Ionicons
//               name="camera-outline"
//               size={19}
//               color="#fff"
//             />
//           </TouchableOpacity>

//           {/* Select */}

//           <TouchableOpacity
//             style={styles.selectBtn}
//             onPress={() => {
//               Alert.alert(
//                 "Multiple selection",
//                 "Multiple photo posts are not enabled yet."
//               );
//             }}
//           >
//             <Ionicons
//               name="copy-outline"
//               size={17}
//               color="#fff"
//             />

//             <Text
//               style={styles.selectText}
//             >
//               Select
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* ======================================================
//           GALLERY
//       ====================================================== */}

//       {galleryData.length > 0 ? (
//         <FlatList
//           data={galleryData}
//           keyExtractor={(
//             item,
//             index
//           ) =>
//             item.id?.toString() ||
//             index.toString()
//           }
//           renderItem={renderItem}
//           numColumns={NUM_COLUMNS}
//           showsVerticalScrollIndicator={
//             false
//           }
//           removeClippedSubviews={
//             Platform.OS === "android"
//           }
//           initialNumToRender={24}
//           maxToRenderPerBatch={24}
//           windowSize={7}
//           contentContainerStyle={[
//             styles.galleryContent,
//             {
//               paddingBottom:
//                 100 +
//                 insets.bottom,
//             },
//           ]}
//         />
//       ) : (
//         <View
//           style={styles.noPhotos}
//         >
//           <Ionicons
//             name="images-outline"
//             size={45}
//             color="#555"
//           />

//           <Text
//             style={styles.noPhotosText}
//           >
//             No photos found
//           </Text>

//           <TouchableOpacity
//             style={styles.cameraButton}
//             onPress={openCamera}
//           >
//             <Ionicons
//               name="camera-outline"
//               size={20}
//               color="#fff"
//             />

//             <Text
//               style={styles.cameraButtonText}
//             >
//               Take a photo
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* ======================================================
//           POST / STORY / REEL / LIVE
//       ====================================================== */}

//       <View
//         style={[
//           styles.bottomModes,
//           {
//             bottom:
//               Math.max(
//                 insets.bottom,
//                 10
//               ),
//           },
//         ]}
//       >
//         <TouchableOpacity>
//           <Text
//             style={styles.activeMode}
//           >
//             POST
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity>
//           <Text style={styles.mode}>
//             STORY
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//   onPress={() => {
//     router.push(
//       "/reels/create"
//     );
//   }}
// >
//   <Text style={styles.mode}>
//     REEL
//   </Text>
// </TouchableOpacity>

//         <TouchableOpacity>
//           <Text style={styles.mode}>
//             LIVE
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// // ============================================================
// // STYLES
// // ============================================================

// const styles = StyleSheet.create({
//   // ==========================================================
//   // CONTAINER
//   // ==========================================================

//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//   },

//   // ==========================================================
//   // LOADER
//   // ==========================================================

//   loader: {
//     flex: 1,
//     backgroundColor: "#000",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   loadingText: {
//     color: "#888",
//     fontSize: 14,
//     marginTop: 12,
//   },

//   // ==========================================================
//   // HEADER
//   // ==========================================================

//   header: {
//     width: "100%",
//     paddingHorizontal: 8,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#000",
//     borderBottomWidth: 1,
//     borderBottomColor: "#151515",
//   },

//   headerSide: {
//     width: 65,
//     height: 50,
//     justifyContent: "center",
//   },

//   title: {
//     color: "#fff",
//     fontSize: 19,
//     fontWeight: "600",
//   },

//   next: {
//     color: "#0095F6",
//     fontSize: 16,
//     fontWeight: "600",
//     textAlign: "right",
//   },

//   nextDisabled: {
//     opacity: 0.35,
//   },

//   // ==========================================================
//   // PREVIEW
//   // ==========================================================

//   previewContainer: {
//     width: "100%",
//     height: width,
//     backgroundColor: "#111",
//   },

//   preview: {
//     width: "100%",
//     height: "100%",
//   },

//   emptyPreview: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   emptyText: {
//     color: "#777",
//     marginTop: 10,
//     fontSize: 15,
//   },

//   // ==========================================================
//   // GALLERY HEADER
//   // ==========================================================

//   galleryHeader: {
//     height: 58,
//     paddingHorizontal: 15,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#000",
//   },

//   recentsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   recents: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "600",
//     marginRight: 4,
//   },

//   galleryActions: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },

//   actionButton: {
//     width: 38,
//     height: 38,
//     borderRadius: 19,
//     backgroundColor: "#222",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   selectBtn: {
//     height: 38,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#222",
//     paddingHorizontal: 13,
//     borderRadius: 20,
//   },

//   selectText: {
//     color: "#fff",
//     marginLeft: 6,
//     fontSize: 13,
//     fontWeight: "500",
//   },

//   // ==========================================================
//   // GALLERY
//   // ==========================================================

//   galleryContent: {
//     backgroundColor: "#000",
//   },

//   gridItem: {
//     width: IMAGE_SIZE,
//     height: IMAGE_SIZE,
//     backgroundColor: "#111",
//     position: "relative",
//   },

//   gridImage: {
//     width: IMAGE_SIZE,
//     height: IMAGE_SIZE,
//     backgroundColor: "#111",
//   },

//   selectedOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.18)",
//   },

//   selectedCircle: {
//     position: "absolute",
//     top: 7,
//     right: 7,
//     width: 25,
//     height: 25,
//     borderRadius: 13,
//     backgroundColor: "#0095F6",
//     borderWidth: 2,
//     borderColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   // ==========================================================
//   // CAMERA TILE
//   // ==========================================================

//   cameraTile: {
//     width: IMAGE_SIZE,
//     height: IMAGE_SIZE,
//     backgroundColor: "#151515",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   cameraText: {
//     color: "#fff",
//     fontSize: 11,
//     marginTop: 6,
//   },

//   // ==========================================================
//   // NO PHOTOS
//   // ==========================================================

//   noPhotos: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingBottom: 100,
//   },

//   noPhotosText: {
//     color: "#777",
//     fontSize: 15,
//     marginTop: 10,
//   },

//   cameraButton: {
//     marginTop: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#0095F6",
//     paddingHorizontal: 18,
//     paddingVertical: 11,
//     borderRadius: 22,
//   },

//   cameraButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//     marginLeft: 7,
//   },

//   // ==========================================================
//   // BOTTOM MODES
//   // ==========================================================

//   bottomModes: {
//     position: "absolute",
//     alignSelf: "center",
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(20,20,20,0.96)",
//     borderRadius: 30,
//     paddingHorizontal: 12,
//     paddingVertical: 11,

//     borderWidth: 1,
//     borderColor: "#292929",

//     elevation: 8,

//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.4,
//     shadowRadius: 8,
//   },

//   activeMode: {
//     color: "#fff",
//     fontWeight: "800",
//     fontSize: 11,
//     marginHorizontal: 10,
//   },

//   mode: {
//     color: "#777",
//     fontWeight: "600",
//     fontSize: 11,
//     marginHorizontal: 10,
//   },
// });

import React, {
  useEffect,
  useState,
} from "react";

import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import {
  router,
} from "expo-router";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const { width } =
  Dimensions.get("window");

const COLUMN_COUNT = 4;

const ITEM_SIZE =
  width / COLUMN_COUNT;

export default function CreatePost() {
  const insets =
    useSafeAreaInsets();

  const [
    permission,
    setPermission,
  ] = useState(false);

  const [
    assets,
    setAssets,
  ] = useState([]);

  const [
    selected,
    setSelected,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  // =====================================================
  // REQUEST PERMISSION
  // =====================================================

  const requestPermission =
    async () => {
      try {
        const result =
          await ImagePicker
            .requestMediaLibraryPermissionsAsync();

        if (!result.granted) {
          Alert.alert(
            "Photo Access Required",
            "Please allow photo access to create a post."
          );

          setPermission(false);
          setLoading(false);

          return;
        }

        setPermission(true);

        await loadGallery();
      } catch (error) {
        console.log(
          "PERMISSION ERROR =>",
          error
        );

        setLoading(false);
      }
    };

  // =====================================================
  // LOAD GALLERY
  // =====================================================

  const loadGallery =
    async () => {
      try {
        setLoading(true);

        const result =
          await ImagePicker
            .getMediaLibraryPermissionsAsync();

        if (!result.granted) {
          setLoading(false);
          return;
        }

        /*
         * Do NOT automatically open the picker here.
         * We only load the screen.
         */

        setLoading(false);
      } catch (error) {
        console.log(
          "GALLERY ERROR =>",
          error
        );

        setLoading(false);
      }
    };

  // =====================================================
  // INITIAL PERMISSION
  // =====================================================

  useEffect(() => {
    requestPermission();
  }, []);

  // =====================================================
  // OPEN GALLERY
  // =====================================================

  const openGallery =
    async () => {
      try {
        const result =
          await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsMultipleSelection: true,
            selectionLimit: 100,
            quality: 1,
          });

        if (
          result.canceled ||
          !result.assets?.length
        ) {
          return;
        }

        setAssets(
          result.assets
        );

        setSelected(
          result.assets[0]
        );
      } catch (error) {
        console.log(
          "OPEN GALLERY ERROR =>",
          error
        );
      }
    };

  // =====================================================
  // SELECT IMAGE
  // =====================================================

  const selectImage =
    (asset) => {
      setSelected(asset);
    };

  // =====================================================
  // NEXT
  // =====================================================

  const goNext =
    () => {
      if (!selected?.uri) {
        Alert.alert(
          "Select a photo",
          "Please select a photo first."
        );

        return;
      }

      router.push({
        pathname:
          "/posts/post-editor",

        params: {
          imageUri:
            selected.uri,

          mediaType:
            selected.type ||
            "image",
        },
      });
    };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <View
        style={styles.loading}
      >
        <ActivityIndicator
          size="large"
          color="#fff"
        />
      </View>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <View
      style={styles.container}
    >

      {/* =================================================
          SAFE AREA
      ================================================= */}

      <View
        style={[
          styles.safeAreaTop,
          {
            height:
              insets.top,
          },
        ]}
      />

      {/* =================================================
          HEADER
      ================================================= */}

      <View
        style={styles.header}
      >

        {/* LEFT */}

        <Pressable
          onPress={() =>
            router.back()
          }
          hitSlop={12}
          style={styles.headerButton}
        >
          <Ionicons
            name="close"
            size={28}
            color="#fff"
          />
        </Pressable>

        {/* CENTER */}

        <View
          style={styles.headerCenter}
          pointerEvents="none"
        >
          <Text
            style={
              styles.headerTitle
            }
          >
            New post
          </Text>
        </View>

        {/* RIGHT */}

        <Pressable
          onPress={goNext}
          disabled={!selected}
          hitSlop={10}
          style={styles.nextButton}
        >
          <Text
            style={[
              styles.next,
              !selected &&
                styles.disabledNext,
            ]}
          >
            Next
          </Text>
        </Pressable>

      </View>

      {/* =================================================
          SELECTED IMAGE
      ================================================= */}

      <View
        style={
          styles.selectedContainer
        }
      >
        {selected ? (
          <Image
            source={{
              uri: selected.uri,
            }}
            style={
              styles.selectedImage
            }
            resizeMode="contain"
          />
        ) : (
          <View
            style={
              styles.emptySelected
            }
          >
            <Ionicons
              name="images-outline"
              size={60}
              color="#555"
            />

            <Text
              style={
                styles.emptyText
              }
            >
              Select a photo
            </Text>
          </View>
        )}
      </View>

      {/* =================================================
          GALLERY HEADER
      ================================================= */}

      <View
        style={
          styles.galleryHeader
        }
      >
        <Text
          style={
            styles.galleryTitle
          }
        >
          Recent
        </Text>

        <Pressable
          onPress={openGallery}
          style={
            styles.selectButton
          }
        >
          <Ionicons
            name="images-outline"
            size={18}
            color="#fff"
          />

          <Text
            style={
              styles.selectText
            }
          >
            Select
          </Text>
        </Pressable>
      </View>

      {/* =================================================
          THUMBNAILS
      ================================================= */}

      {assets.length > 0 ? (
        <FlatList
          data={assets}
          keyExtractor={(
            item,
            index
          ) =>
            `${item.assetId || item.uri}-${index}`
          }
          numColumns={
            COLUMN_COUNT
          }
          showsVerticalScrollIndicator={
            false
          }
          renderItem={({
            item,
          }) => {
            const active =
              selected?.uri ===
              item.uri;

            return (
              <Pressable
                onPress={() =>
                  selectImage(item)
                }
                style={
                  styles.thumbnailWrapper
                }
              >
                <Image
                  source={{
                    uri: item.uri,
                  }}
                  style={
                    styles.thumbnail
                  }
                />

                {active && (
                  <View
                    style={
                      styles.selectedOverlay
                    }
                  >
                    <View
                      style={
                        styles.checkCircle
                      }
                    >
                      <Ionicons
                        name="checkmark"
                        size={15}
                        color="#fff"
                      />
                    </View>
                  </View>
                )}
              </Pressable>
            );
          }}
        />
      ) : (
        <View
          style={
            styles.emptyGallery
          }
        >
          <Ionicons
            name="images-outline"
            size={45}
            color="#555"
          />

          <Text
            style={
              styles.emptyGalleryText
            }
          >
            Your photos will appear here
          </Text>

          <Pressable
            style={
              styles.openGallery
            }
            onPress={openGallery}
          >
            <Text
              style={
                styles.openGalleryText
              }
            >
              Open Gallery
            </Text>
          </Pressable>
        </View> 
      )}
            {/* =================================================
          POST / STORY / REEL / LIVE
      ================================================= */}

      <View
        style={[
          styles.bottomModes,
          {
            bottom: Math.max(insets.bottom, 10),
          },
        ]}
      >
        {/* POST */}
        <Pressable
          onPress={() => {
            // Already on Create Post
          }}
          style={styles.modeButton}
          hitSlop={8}
        >
          <Text style={styles.activeMode}>
            POST
          </Text>
        </Pressable>

        {/* STORY */}
        <Pressable
          onPress={() => {
            router.push("/stories/create");
          }}
          style={styles.modeButton}
          hitSlop={8}
        >
          <Text style={styles.mode}>
            STORY
          </Text>
        </Pressable>

        {/* REEL */}
        <Pressable
          onPress={() => {
            router.push("/reels/create");
          }}
          style={styles.modeButton}
          hitSlop={8}
        >
          <Text style={styles.mode}>
            REEL
          </Text>
        </Pressable>

        {/* LIVE */}
        <Pressable
          onPress={() => {
            router.push("/live/create");
          }}
          style={styles.modeButton}
          hitSlop={8}
        >
          <Text style={styles.mode}>
            LIVE
          </Text>
        </Pressable>
      </View>
    </View>
    
  );
}

// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({

    // ==================================================
    // MAIN
    // ==================================================

    container: {
      flex: 1,
      backgroundColor: "#000",
    },

    loading: {
      flex: 1,
      backgroundColor: "#000",
      alignItems: "center",
      justifyContent: "center",
    },

    // ==================================================
    // SAFE AREA
    // ==================================================

    safeAreaTop: {
      width: "100%",
      backgroundColor: "#000",
    },

    // ==================================================
    // HEADER
    // ==================================================

    header: {
      height: 56,

      width: "100%",

      paddingHorizontal: 14,

      flexDirection: "row",
      alignItems: "center",

      position: "relative",

      backgroundColor: "#000",

      borderBottomWidth:
        StyleSheet.hairlineWidth,

      borderBottomColor: "#222",
    },

    // ==================================================
    // LEFT BUTTON
    // ==================================================

    headerButton: {
      width: 50,
      height: 56,

      justifyContent: "center",
      alignItems: "flex-start",

      zIndex: 2,
    },

    // ==================================================
    // CENTER TITLE
    // ==================================================

    headerCenter: {
      position: "absolute",

      left: 0,
      right: 0,

      top: 0,
      bottom: 0,

      justifyContent: "center",
      alignItems: "center",

      zIndex: 1,
    },

    headerTitle: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "600",
    },

    // ==================================================
    // NEXT
    // ==================================================

    nextButton: {
      height: 56,

      minWidth: 50,

      marginLeft: "auto",

      justifyContent: "center",
      alignItems: "flex-end",

      zIndex: 2,
    },

    next: {
      color: "#3797F0",
      fontSize: 16,
      fontWeight: "600",
    },

    disabledNext: {
      color: "#555",
    },

    // ==================================================
    // SELECTED IMAGE
    // ==================================================

    selectedContainer: {
      width: "100%",
      aspectRatio: 1,

      backgroundColor: "#111",
    },

    selectedImage: {
      width: "100%",
      height: "100%",
    },

    emptySelected: {
      flex: 1,

      alignItems: "center",
      justifyContent: "center",
    },

    emptyText: {
      color: "#777",
      marginTop: 10,
    },

    // ==================================================
    // GALLERY HEADER
    // ==================================================

    galleryHeader: {
      height: 55,

      paddingHorizontal: 16,

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    galleryTitle: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600",
    },

    selectButton: {
      flexDirection: "row",
      alignItems: "center",

      gap: 6,

      backgroundColor: "#222",

      paddingHorizontal: 13,
      paddingVertical: 8,

      borderRadius: 18,
    },

    selectText: {
      color: "#fff",
      fontSize: 13,
      fontWeight: "600",
    },

    // ==================================================
    // THUMBNAILS
    // ==================================================

    thumbnailWrapper: {
      width: ITEM_SIZE,
      height: ITEM_SIZE,

      padding: 1,
    },

    thumbnail: {
      width: "100%",
      height: "100%",
    },

    selectedOverlay: {
      position: "absolute",

      top: 6,
      right: 6,

      width: 25,
      height: 25,

      borderRadius: 13,

      backgroundColor:
        "rgba(0,0,0,0.55)",

      alignItems: "center",
      justifyContent: "center",
    },

    checkCircle: {
      width: 20,
      height: 20,

      borderRadius: 10,

      backgroundColor: "#3797F0",

      alignItems: "center",
      justifyContent: "center",
    },

    // ==================================================
    // EMPTY GALLERY
    // ==================================================

    emptyGallery: {
      flex: 1,

      alignItems: "center",
      justifyContent: "center",
    },

    emptyGalleryText: {
      color: "#777",
      marginTop: 10,
    },

    openGallery: {
      marginTop: 20,

      backgroundColor: "#3797F0",

      paddingHorizontal: 25,
      paddingVertical: 11,

      borderRadius: 8,
    },

    openGalleryText: {
      color: "#fff",
      fontWeight: "600",
    },
      // ==================================================
  // POST / STORY / REEL / LIVE
  // ==================================================

  bottomModes: {
    position: "absolute",

    alignSelf: "center",

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "rgba(20,20,20,0.96)",

    borderRadius: 30,

    paddingHorizontal: 12,

    paddingVertical: 11,

    borderWidth: 1,

    borderColor: "#292929",

    elevation: 8,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.4,

    shadowRadius: 8,
  },

  modeButton: {
    minWidth: 58,

    alignItems: "center",

    justifyContent: "center",

    paddingVertical: 4,
  },

  activeMode: {
    color: "#fff",

    fontWeight: "800",

    fontSize: 11,
  },

  mode: {
    color: "#777",

    fontWeight: "600",

    fontSize: 11,
  },
  });