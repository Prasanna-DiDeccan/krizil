// import React, {
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Pressable,
//   Dimensions,
//   ActivityIndicator,
//   Modal,
//   FlatList,
//   Animated,
//   PanResponder,
// } from "react-native";

// import {
//   SafeAreaView,
// } from "react-native-safe-area-context";

// import {
//   Ionicons,
// } from "@expo/vector-icons";

// import {
//   VideoView,
//   useVideoPlayer,
// } from "expo-video";

// import {
//   useLocalSearchParams,
//   useRouter,
// } from "expo-router";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import {
//   deleteStory,
//   getStoryViewers,
// } from "../../src/redux/storySlice";

// import {
//   getMediaUrl,
// } from "../../src/utils/media";

// const {
//   width: SCREEN_WIDTH,
//   height: SCREEN_HEIGHT,
// } = Dimensions.get("window");

// const IMAGE_DURATION = 5000;
// const LONG_PRESS_DELAY = 180;

// export default function MyStoryViewer() {
//   const params = useLocalSearchParams();
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const {
//     deleting,
//   } = useSelector(
//     (state) => state.stories || {}
//   );

//   const currentUser = useSelector(
//   (state) => state.auth?.user
// );
//   // =====================================================
//   // STORIES
//   // =====================================================

//   const stories = (() => {
//     try {
//       if (
//         Array.isArray(
//           params?.stories
//         )
//       ) {
//         return params.stories;
//       }

//       if (
//         typeof params?.stories ===
//         "string"
//       ) {
//         return JSON.parse(
//           params.stories
//         );
//       }

//       return [];
//     } catch (error) {
//       console.log(
//         "MY STORY PARAM ERROR =>",
//         error
//       );

//       return [];
//     }
//   })();

//   const initialIndex = Number(
//     params?.index || 0
//   );

//   const [currentIndex, setCurrentIndex] =
//     useState(
//       Math.max(
//         0,
//         Math.min(
//           initialIndex,
//           Math.max(
//             stories.length - 1,
//             0
//           )
//         )
//       )
//     );

//   const [progress, setProgress] =
//     useState(0);

//   const [paused, setPaused] =
//     useState(false);

//   const [loadingMedia, setLoadingMedia] =
//     useState(true);

//   // =====================================================
//   // VIEWERS MODAL
//   // =====================================================

//   const [showViewers, setShowViewers] =
//     useState(false);

//   const [viewers, setViewers] =
//     useState([]);

//   const [viewersLoading, setViewersLoading] =
//     useState(false);

//   const [viewersError, setViewersError] =
//     useState(null);

//   const viewerSheetY =
//     useRef(
//       new Animated.Value(
//         SCREEN_HEIGHT
//       )
//     ).current;

//   // =====================================================
//   // REFS
//   // =====================================================

//   const timerRef =
//     useRef(null);

//   const pressTimerRef =
//     useRef(null);

//   const advancingRef =
//     useRef(false);

//   const currentStory =
//     stories?.[currentIndex];

//     console.log("========== MY STORY ==========");
// console.log("CURRENT STORY =>", currentStory);
// console.log("STORY ID =>", currentStory?.id);
// console.log("CURRENT USER ID =>", currentUser?.id);
// console.log("==============================");

//   // =====================================================
//   // MEDIA
//   // =====================================================

//   const videoUrl =
//     currentStory?.media_url ||
//     currentStory?.file_url ||
//     currentStory?.media;

//   const player =
//     useVideoPlayer(
//       currentStory?.media_type ===
//         "video" &&
//         videoUrl
//         ? getMediaUrl(videoUrl)
//         : null,
//       (player) => {
//         player.loop = false;
//       }
//     );

//   // =====================================================
//   // CLEAR TIMER
//   // =====================================================

//   const clearTimer = () => {
//     if (timerRef.current) {
//       clearInterval(
//         timerRef.current
//       );

//       timerRef.current = null;
//     }
//   };

//   // =====================================================
//   // RESET STORY
//   // =====================================================

//   useEffect(() => {
//     clearTimer();

//     setProgress(0);
//     setPaused(false);
//     setLoadingMedia(true);

//     advancingRef.current = false;

//     if (
//       player &&
//       currentStory?.media_type ===
//         "video"
//     ) {
//       try {
//         player.currentTime = 0;
//         player.play();
//       } catch (error) {
//         console.log(
//           "MY VIDEO RESET ERROR =>",
//           error
//         );
//       }
//     }

//     return () => {
//       clearTimer();
//     };
//   }, [
//     currentIndex,
//     currentStory?.id,
//   ]);

//   // =====================================================
//   // IMAGE LOADED
//   // =====================================================

//   useEffect(() => {
//     if (
//       currentStory?.media_type ===
//       "image"
//     ) {
//       setLoadingMedia(false);
//     }
//   }, [
//     currentStory?.id,
//   ]);

//   // =====================================================
//   // NEXT
//   // =====================================================

//   const goNext = () => {
//     if (
//       advancingRef.current ||
//       showViewers
//     ) {
//       return;
//     }

//     advancingRef.current = true;

//     clearTimer();

//     if (
//       currentIndex <
//       stories.length - 1
//     ) {
//       setCurrentIndex(
//         (prev) =>
//           prev + 1
//       );
//     } else {
//       router.back();
//     }

//     setTimeout(() => {
//       advancingRef.current = false;
//     }, 100);
//   };

//   // =====================================================
//   // PREVIOUS
//   // =====================================================

//   const goPrevious = () => {
//     if (showViewers) {
//       return;
//     }

//     clearTimer();

//     if (
//       currentIndex > 0
//     ) {
//       setCurrentIndex(
//         (prev) =>
//           prev - 1
//       );
//     } else {
//       router.back();
//     }
//   };

//   // =====================================================
//   // IMAGE PROGRESS
//   // =====================================================

//   useEffect(() => {
//     if (
//       !currentStory ||
//       currentStory.media_type ===
//         "video" ||
//       paused ||
//       showViewers
//     ) {
//       return;
//     }

//     clearTimer();

//     const startedAt =
//       Date.now();

//     timerRef.current =
//       setInterval(() => {
//         const elapsed =
//           Date.now() -
//           startedAt;

//         const value =
//           Math.min(
//             elapsed /
//               IMAGE_DURATION,
//             1
//           );

//         setProgress(value);

//         if (
//           value >= 1
//         ) {
//           clearTimer();
//           goNext();
//         }
//       }, 50);

//     return () => {
//       clearTimer();
//     };
//   }, [
//     currentIndex,
//     paused,
//     showViewers,
//     currentStory?.media_type,
//   ]);

//   // =====================================================
//   // VIDEO PROGRESS
//   // =====================================================

//   useEffect(() => {
//     if (
//       !player ||
//       currentStory?.media_type !==
//         "video" ||
//       paused ||
//       showViewers
//     ) {
//       return;
//     }

//     clearTimer();

//     timerRef.current =
//       setInterval(() => {
//         try {
//           const duration =
//             player.duration || 0;

//           const currentTime =
//             player.currentTime || 0;

//           if (
//             duration <= 0
//           ) {
//             return;
//           }

//           const value =
//             Math.min(
//               currentTime /
//                 duration,
//               1
//             );

//           setProgress(value);

//           if (
//             value >= 0.99
//           ) {
//             clearTimer();
//             goNext();
//           }
//         } catch (error) {
//           console.log(
//             "MY VIDEO PROGRESS ERROR =>",
//             error
//           );
//         }
//       }, 50);

//     return () => {
//       clearTimer();
//     };
//   }, [
//     player,
//     currentIndex,
//     paused,
//     showViewers,
//     currentStory?.media_type,
//   ]);

//   // =====================================================
//   // PLAY / PAUSE VIDEO
//   // =====================================================

//   useEffect(() => {
//     if (
//       !player ||
//       currentStory?.media_type !==
//         "video"
//     ) {
//       return;
//     }

//     try {
//       if (
//         paused ||
//         showViewers
//       ) {
//         player.pause();
//       } else {
//         player.play();
//       }
//     } catch (error) {
//       console.log(
//         "MY VIDEO PLAY ERROR =>",
//         error
//       );
//     }
//   }, [
//     paused,
//     showViewers,
//     player,
//     currentStory?.media_type,
//   ]);

//   // =====================================================
//   // PRESS
//   // =====================================================

//   const handlePressIn = () => {
//     if (showViewers) {
//       return;
//     }

//     pressTimerRef.current =
//       setTimeout(() => {
//         setPaused(true);
//       }, LONG_PRESS_DELAY);
//   };

//   const handlePressOut = () => {
//     if (
//       pressTimerRef.current
//     ) {
//       clearTimeout(
//         pressTimerRef.current
//       );

//       pressTimerRef.current =
//         null;
//     }

//     if (!showViewers) {
//       setPaused(false);
//     }
//   };

//   // =====================================================
//   // TAP
//   // =====================================================

//   const handleTap = (
//     event
//   ) => {
//     if (showViewers) {
//       return;
//     }

//     const x =
//       event.nativeEvent
//         .locationX;

//     if (
//       x <
//       SCREEN_WIDTH / 2
//     ) {
//       goPrevious();
//     } else {
//       goNext();
//     }
//   };

//   // =====================================================
//   // OPEN VIEWERS
//   // =====================================================

//   const openViewers = async () => {
//     if (
//       !currentStory?.id
//     ) {
//       return;
//     }

//     clearTimer();

//     setPaused(true);
//     setShowViewers(true);
//     setViewersLoading(true);
//     setViewersError(null);

//     viewerSheetY.setValue(
//       SCREEN_HEIGHT
//     );

//     Animated.spring(
//       viewerSheetY,
//       {
//         toValue: 0,
//         useNativeDriver: true,
//         damping: 25,
//         stiffness: 220,
//         mass: 0.8,
//       }
//     ).start();

//     try {
//       const result =
//         await dispatch(
//           getStoryViewers(
//             currentStory.id
//           )
//         ).unwrap();

//       let list = [];

//       if (
//         Array.isArray(result)
//       ) {
//         list = result;
//       } else if (
//         Array.isArray(
//           result?.items
//         )
//       ) {
//         list = result.items;
//       } else if (
//         Array.isArray(
//           result?.viewers
//         )
//       ) {
//         list = result.viewers;
//       }

//       setViewers(list);
//     } catch (error) {
//       console.log(
//         "GET STORY VIEWERS ERROR =>",
//         error
//       );

//       setViewersError(
//         "Failed to load viewers"
//       );

//       setViewers([]);
//     } finally {
//       setViewersLoading(false);
//     }
//   };

//   // =====================================================
//   // CLOSE VIEWERS
//   // =====================================================

//   const closeViewers = () => {
//     Animated.timing(
//       viewerSheetY,
//       {
//         toValue:
//           SCREEN_HEIGHT,
//         duration: 220,
//         useNativeDriver: true,
//       }
//     ).start(() => {
//       setShowViewers(false);
//       setPaused(false);
//     });
//   };

//   // =====================================================
//   // SWIPE DOWN VIEWER SHEET
//   // =====================================================

//   const panResponder =
//     useRef(
//       PanResponder.create({
//         onStartShouldSetPanResponder:
//           () => true,

//         onMoveShouldSetPanResponder:
//           (_, gesture) =>
//             Math.abs(
//               gesture.dy
//             ) > 5,

//         onPanResponderMove:
//           (_, gesture) => {
//             if (
//               gesture.dy > 0
//             ) {
//               viewerSheetY.setValue(
//                 gesture.dy
//               );
//             }
//           },

//         onPanResponderRelease:
//           (_, gesture) => {
//             if (
//               gesture.dy > 120 ||
//               gesture.vy > 1.2
//             ) {
//               closeViewers();
//             } else {
//               Animated.spring(
//                 viewerSheetY,
//                 {
//                   toValue: 0,
//                   useNativeDriver: true,
//                   damping: 25,
//                   stiffness: 220,
//                 }
//               ).start();
//             }
//           },
//       })
//     ).current;

//   // =====================================================
//   // DELETE
//   // =====================================================

//   const handleDelete = async () => {
//     if (
//       !currentStory?.id ||
//       deleting
//     ) {
//       return;
//     }

//     try {
//       await dispatch(
//         deleteStory(
//           currentStory.id
//         )
//       ).unwrap();

//       if (
//         stories.length === 1
//       ) {
//         router.back();
//         return;
//       }

//       if (
//         currentIndex >=
//         stories.length - 1
//       ) {
//         setCurrentIndex(
//           (prev) =>
//             Math.max(
//               prev - 1,
//               0
//             )
//         );
//       }
//     } catch (error) {
//       console.log(
//         "DELETE STORY ERROR =>",
//         error
//       );
//     }
//   };

//   // =====================================================
//   // MEDIA
//   // =====================================================

//   const renderMedia = () => {
//     if (!currentStory) {
//       return null;
//     }

//     if (
//       currentStory.media_type ===
//       "video"
//     ) {
//       if (!videoUrl) {
//         return null;
//       }

//       return (
//         <VideoView
//           player={player}
//           style={styles.media}
//           contentFit="contain"
//           nativeControls={false}
//         />
//       );
//     }

//     const imageUrl =
//       currentStory?.media_url ||
//       currentStory?.file_url ||
//       currentStory?.media;

//     if (!imageUrl) {
//       return null;
//     }

//     return (
//       <Image
//         source={{
//           uri: getMediaUrl(
//             imageUrl
//           ),
//         }}
//         style={styles.media}
//         resizeMode="contain"
//         onLoadStart={() =>
//           setLoadingMedia(true)
//         }
//         onLoadEnd={() =>
//           setLoadingMedia(false)
//         }
//       />
//     );
//   };

//   // =====================================================
//   // VIEWER DATA HELPERS
//   // =====================================================

//   const getViewerUser = (
//     item
//   ) => {
//     return (
//       item?.user ||
//       item?.viewer ||
//       item ||
//       {}
//     );
//   };

//   const getViewerName = (
//     item
//   ) => {
//     const viewer =
//       getViewerUser(item);

//     return (
//       viewer?.username ||
//       item?.username ||
//       "User"
//     );
//   };

//   const getViewerAvatar = (
//     item
//   ) => {
//     const viewer =
//       getViewerUser(item);

//     const avatar =
//       viewer?.avatar_url ||
//       viewer?.avatar ||
//       item?.avatar_url;

//     return avatar
//       ? getMediaUrl(avatar)
//       : null;
//   };

//   const getViewedTime = (
//     item
//   ) => {
//     const value =
//       item?.viewed_at ||
//       item?.created_at ||
//       item?.viewedAt;

//     if (!value) {
//       return "";
//     }

//     try {
//       const date =
//         new Date(value);

//       if (
//         Number.isNaN(
//           date.getTime()
//         )
//       ) {
//         return "";
//       }

//       const diff =
//         Date.now() -
//         date.getTime();

//       const minutes =
//         Math.floor(
//           diff /
//             60000
//         );

//       if (
//         minutes < 1
//       ) {
//         return "now";
//       }

//       if (
//         minutes < 60
//       ) {
//         return `${minutes}m`;
//       }

//       const hours =
//         Math.floor(
//           minutes / 60
//         );

//       if (
//         hours < 24
//       ) {
//         return `${hours}h`;
//       }

//       const days =
//         Math.floor(
//           hours / 24
//         );

//       return `${days}d`;
//     } catch {
//       return "";
//     }
//   };

//   // =====================================================
//   // VIEWER ROW
//   // =====================================================

//   const renderViewer = ({
//     item,
//   }) => {
//     const name =
//       getViewerName(item);

//     const avatar =
//       getViewerAvatar(item);

//     const viewedTime =
//       getViewedTime(item);

//     return (
//       <View
//         style={
//           styles.viewerRow
//         }
//       >
//         {avatar ? (
//           <Image
//             source={{
//               uri: avatar,
//             }}
//             style={
//               styles.viewerAvatar
//             }
//           />
//         ) : (
//           <View
//             style={
//               styles.viewerAvatarPlaceholder
//             }
//           >
//             <Text
//               style={
//                 styles.viewerAvatarLetter
//               }
//             >
//               {name
//                 .charAt(0)
//                 .toUpperCase()}
//             </Text>
//           </View>
//         )}

//         <View
//           style={
//             styles.viewerInfo
//           }
//         >
//           <Text
//             numberOfLines={1}
//             style={
//               styles.viewerUsername
//             }
//           >
//             {name}
//           </Text>

//           {viewedTime ? (
//             <Text
//               style={
//                 styles.viewerTime
//               }
//             >
//               {viewedTime}
//             </Text>
//           ) : null}
//         </View>
//       </View>
//     );
//   };

//   // =====================================================
//   // EMPTY
//   // =====================================================

//   if (!currentStory) {
//     return (
//       <View
//         style={styles.empty}
//       >
//         <TouchableOpacity
//           onPress={() =>
//             router.back()
//           }
//         >
//           <Text
//             style={
//               styles.emptyText
//             }
//           >
//             Close
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const viewsCount =
//     Number(
//       currentStory?.views_count ||
//         0
//     );

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <View
//       style={styles.container}
//     >
//       {renderMedia()}

//       {loadingMedia && (
//         <View
//           style={
//             styles.loadingOverlay
//           }
//         >
//           <ActivityIndicator
//             size="large"
//             color="#fff"
//           />
//         </View>
//       )}

//       {/* =================================================
//           TOP
//       ================================================= */}

//       <SafeAreaView
//         style={
//           styles.topOverlay
//         }
//         edges={["top"]}
//       >
//         <View
//           style={
//             styles.progressContainer
//           }
//         >
//           {stories.map(
//             (
//               story,
//               index
//             ) => (
//               <View
//                 key={
//                   story?.id ??
//                   index
//                 }
//                 style={
//                   styles.progressBackground
//                 }
//               >
//                 <View
//                   style={[
//                     styles.progressFill,
//                     {
//                       width:
//                         index <
//                         currentIndex
//                           ? "100%"
//                           : index ===
//                             currentIndex
//                           ? `${progress * 100}%`
//                           : "0%",
//                     },
//                   ]}
//                 />
//               </View>
//             )
//           )}
//         </View>

//         {/* HEADER WITHOUT USERNAME */}

//         <View
//           style={
//             styles.header
//           }
//         >
//           <View
//             style={
//               styles.headerLeft
//             }
//           >
//             <Text
//               style={
//                 styles.yourStoryLabel
//               }
//             >
//               Your story
//             </Text>
//           </View>

//           <View
//             style={
//               styles.headerActions
//             }
//           >
//             <TouchableOpacity
//               onPress={
//                 handleDelete
//               }
//               disabled={
//                 deleting
//               }
//               style={
//                 styles.headerButton
//               }
//             >
//               {deleting ? (
//                 <ActivityIndicator
//                   size="small"
//                   color="#fff"
//                 />
//               ) : (
//                 <Ionicons
//                   name="trash-outline"
//                   size={23}
//                   color="#fff"
//                 />
//               )}
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={() =>
//                 router.back()
//               }
//               style={
//                 styles.headerButton
//               }
//             >
//               <Ionicons
//                 name="close"
//                 size={30}
//                 color="#fff"
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </SafeAreaView>

//       {/* =================================================
//           TAP AREA
//       ================================================= */}

//       <Pressable
//         style={
//           styles.tapArea
//         }
//         onPress={
//           handleTap
//         }
//         onPressIn={
//           handlePressIn
//         }
//         onPressOut={
//           handlePressOut
//         }
//       />

//       {/* =================================================
//           CAPTION
//       ================================================= */}

//       {currentStory.caption ? (
//         <View
//           pointerEvents="none"
//           style={
//             styles.captionContainer
//           }
//         >
//           <Text
//             style={
//               styles.caption
//             }
//           >
//             {currentStory.caption}
//           </Text>
//         </View>
//       ) : null}

//       {/* =================================================
//           BOTTOM - SEEN BY
//       ================================================= */}

//       <View
//         style={
//           styles.bottomContainer
//         }
//       >
//         <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={
//             openViewers
//           }
//           style={
//             styles.viewersButton
//           }
//         >
//           <Ionicons
//             name="eye-outline"
//             size={23}
//             color="#fff"
//           />

//           <Text
//             style={
//               styles.viewsText
//             }
//           >
//             Seen by{" "}
//             {viewsCount}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* =================================================
//           VIEWERS BOTTOM SHEET
//       ================================================= */}

//       <Modal
//         visible={
//           showViewers
//         }
//         transparent
//         animationType="none"
//         statusBarTranslucent
//         onRequestClose={
//           closeViewers
//         }
//       >
//         <View
//           style={
//             styles.modalRoot
//           }
//         >
//           {/* BACKDROP */}

//           <Pressable
//             style={
//               styles.modalBackdrop
//             }
//             onPress={
//               closeViewers
//             }
//           />

//           {/* SHEET */}

//           <Animated.View
//             {...panResponder.panHandlers}
//             style={[
//               styles.viewerSheet,
//               {
//                 transform: [
//                   {
//                     translateY:
//                       viewerSheetY,
//                   },
//                 ],
//               },
//             ]}
//           >
//             {/* DRAG HANDLE */}

//             <View
//               style={
//                 styles.dragHandle
//               }
//             />

//             {/* HEADER */}

//             <View
//               style={
//                 styles.sheetHeader
//               }
//             >
//               <Text
//                 style={
//                   styles.sheetTitle
//                 }
//               >
//                 Viewed by
//               </Text>

//               <TouchableOpacity
//                 onPress={
//                   closeViewers
//                 }
//                 style={
//                   styles.sheetClose
//                 }
//               >
//                 <Ionicons
//                   name="close"
//                   size={25}
//                   color="#fff"
//                 />
//               </TouchableOpacity>
//             </View>

//             {/* COUNT */}

//             <Text
//               style={
//                 styles.sheetCount
//               }
//             >
//               {viewers.length}{" "}
//               {viewers.length ===
//               1
//                 ? "viewer"
//                 : "viewers"}
//             </Text>

//             {/* LOADING */}

//             {viewersLoading ? (
//               <View
//                 style={
//                   styles.sheetLoading
//                 }
//               >
//                 <ActivityIndicator
//                   size="small"
//                   color="#fff"
//                 />

//                 <Text
//                   style={
//                     styles.loadingText
//                   }
//                 >
//                   Loading viewers...
//                 </Text>
//               </View>
//             ) : viewersError ? (
//               <View
//                 style={
//                   styles.sheetEmpty
//                 }
//               >
//                 <Ionicons
//                   name="alert-circle-outline"
//                   size={30}
//                   color="#777"
//                 />

//                 <Text
//                   style={
//                     styles.emptyViewerText
//                   }
//                 >
//                   {viewersError}
//                 </Text>
//               </View>
//             ) : viewers.length ===
//               0 ? (
//               <View
//                 style={
//                   styles.sheetEmpty
//                 }
//               >
//                 <Ionicons
//                   name="eye-off-outline"
//                   size={34}
//                   color="#777"
//                 />

//                 <Text
//                   style={
//                     styles.emptyViewerText
//                   }
//                 >
//                   No one has viewed
//                   this story yet
//                 </Text>
//               </View>
//             ) : (
//               <FlatList
//                 data={
//                   viewers
//                 }
//                 keyExtractor={(
//                   item,
//                   index
//                 ) =>
//                   String(
//                     item?.id ||
//                       item?.user_id ||
//                       item?.viewer_id ||
//                       index
//                   )
//                 }
//                 renderItem={
//                   renderViewer
//                 }
//                 showsVerticalScrollIndicator={
//                   false
//                 }
//                 contentContainerStyle={
//                   styles.viewerList
//                 }
//               />
//             )}
//           </Animated.View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// // ======================================================
// // STYLES
// // ======================================================

// const styles =
//   StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "#000",
//     },

//     empty: {
//       flex: 1,
//       backgroundColor: "#000",
//       alignItems: "center",
//       justifyContent: "center",
//     },

//     emptyText: {
//       color: "#fff",
//       fontSize: 16,
//     },

//     media: {
//       position: "absolute",
//       left: 0,
//       top: 0,
//       width: SCREEN_WIDTH,
//       height: SCREEN_HEIGHT,
//       backgroundColor: "#000",
//     },

//     loadingOverlay: {
//       position: "absolute",
//       left: 0,
//       right: 0,
//       top: 0,
//       bottom: 0,
//       alignItems: "center",
//       justifyContent: "center",
//       zIndex: 2,
//     },

//     topOverlay: {
//       position: "absolute",
//       left: 0,
//       right: 0,
//       top: 0,
//       zIndex: 10,
//     },

//     progressContainer: {
//       flexDirection: "row",
//       paddingHorizontal: 6,
//       gap: 3,
//     },

//     progressBackground: {
//       flex: 1,
//       height: 2,
//       borderRadius: 2,
//       backgroundColor:
//         "rgba(255,255,255,0.35)",
//       overflow: "hidden",
//     },

//     progressFill: {
//       height: "100%",
//       backgroundColor: "#fff",
//     },

//     header: {
//       height: 58,
//       paddingHorizontal: 12,
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//     },

//     headerLeft: {
//       flex: 1,
//       justifyContent: "center",
//     },

//     yourStoryLabel: {
//       color: "#fff",
//       fontSize: 15,
//       fontWeight: "600",
//     },

//     headerActions: {
//       flexDirection: "row",
//       alignItems: "center",
//     },

//     headerButton: {
//       width: 42,
//       height: 42,
//       alignItems: "center",
//       justifyContent: "center",
//     },

//     tapArea: {
//       position: "absolute",
//       left: 0,
//       right: 0,
//       top: 65,
//       bottom: 100,
//       zIndex: 5,
//     },

//     captionContainer: {
//       position: "absolute",
//       left: 16,
//       right: 16,
//       bottom: 125,
//       zIndex: 7,
//     },

//     caption: {
//       color: "#fff",
//       fontSize: 15,
//       lineHeight: 21,
//       textAlign: "center",
//     },

//     bottomContainer: {
//       position: "absolute",
//       left: 0,
//       right: 0,
//       bottom: 0,
//       paddingHorizontal: 18,
//       paddingBottom: 18,
//       zIndex: 20,
//     },

//     viewersButton: {
//       alignSelf: "flex-start",
//       flexDirection: "row",
//       alignItems: "center",
//       gap: 8,
//       paddingVertical: 8,
//     },

//     viewsText: {
//       color: "#fff",
//       fontSize: 14,
//       fontWeight: "600",
//     },

//     // ==================================================
//     // VIEWERS MODAL
//     // ==================================================

//     modalRoot: {
//       flex: 1,
//       justifyContent: "flex-end",
//     },

//     modalBackdrop: {
//       position: "absolute",
//       left: 0,
//       right: 0,
//       top: 0,
//       bottom: 0,
//       backgroundColor:
//         "rgba(0,0,0,0.45)",
//     },

//     viewerSheet: {
//       height: SCREEN_HEIGHT * 0.62,
//       backgroundColor: "#171717",
//       borderTopLeftRadius: 22,
//       borderTopRightRadius: 22,
//       overflow: "hidden",
//       paddingTop: 8,
//     },

//     dragHandle: {
//       alignSelf: "center",
//       width: 38,
//       height: 4,
//       borderRadius: 3,
//       backgroundColor: "#777",
//       marginBottom: 8,
//     },

//     sheetHeader: {
//       height: 52,
//       paddingHorizontal: 18,
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "center",
//       borderBottomWidth: 0.5,
//       borderBottomColor:
//         "rgba(255,255,255,0.12)",
//     },

//     sheetTitle: {
//       color: "#fff",
//       fontSize: 16,
//       fontWeight: "700",
//     },

//     sheetClose: {
//       position: "absolute",
//       right: 12,
//       width: 42,
//       height: 42,
//       alignItems: "center",
//       justifyContent: "center",
//     },

//     sheetCount: {
//       color: "#aaa",
//       fontSize: 13,
//       paddingHorizontal: 18,
//       paddingTop: 12,
//       paddingBottom: 6,
//     },

//     viewerList: {
//       paddingHorizontal: 18,
//       paddingBottom: 30,
//     },

//     viewerRow: {
//       height: 66,
//       flexDirection: "row",
//       alignItems: "center",
//     },

//     viewerAvatar: {
//       width: 46,
//       height: 46,
//       borderRadius: 23,
//       backgroundColor: "#292929",
//     },

//     viewerAvatarPlaceholder: {
//       width: 46,
//       height: 46,
//       borderRadius: 23,
//       backgroundColor: "#333",
//       alignItems: "center",
//       justifyContent: "center",
//     },

//     viewerAvatarLetter: {
//       color: "#fff",
//       fontSize: 17,
//       fontWeight: "600",
//     },

//     viewerInfo: {
//       flex: 1,
//       marginLeft: 12,
//     },

//     viewerUsername: {
//       color: "#fff",
//       fontSize: 14,
//       fontWeight: "600",
//     },

//     viewerTime: {
//       color: "#888",
//       fontSize: 12,
//       marginTop: 3,
//     },

//     sheetLoading: {
//       flex: 1,
//       alignItems: "center",
//       justifyContent: "center",
//       gap: 10,
//     },

//     loadingText: {
//       color: "#888",
//       fontSize: 13,
//     },

//     sheetEmpty: {
//       flex: 1,
//       alignItems: "center",
//       justifyContent: "center",
//       paddingHorizontal: 40,
//       gap: 10,
//     },

//     emptyViewerText: {
//       color: "#888",
//       fontSize: 14,
//       textAlign: "center",
//     },
//   });

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  ActivityIndicator,
  Modal,
  FlatList,
  Animated,
  PanResponder,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  VideoView,
  useVideoPlayer,
} from "expo-video";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  deleteStory,
  getStoryViewers,
} from "../../src/redux/storySlice";

import {
  getMediaUrl,
} from "../../src/utils/media";

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get("window");

const IMAGE_DURATION = 5000;
const LONG_PRESS_DELAY = 180;

export default function MyStoryViewer() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { deleting } = useSelector(
    (state) => state.stories || {}
  );

  const currentUser = useSelector(
    (state) => state.auth?.user
  );

  // =====================================================
  // STORIES
  // =====================================================

  const stories = (() => {
    try {
      if (Array.isArray(params?.stories)) {
        return params.stories;
      }

      if (typeof params?.stories === "string") {
        return JSON.parse(params.stories);
      }

      return [];
    } catch (error) {
      console.log(
        "MY STORY PARAM ERROR =>",
        error
      );

      return [];
    }
  })();

  const initialIndex = Number(
    params?.index || 0
  );

  const [currentIndex, setCurrentIndex] =
    useState(
      Math.max(
        0,
        Math.min(
          initialIndex,
          Math.max(
            stories.length - 1,
            0
          )
        )
      )
    );

  const [progress, setProgress] =
    useState(0);

  const [paused, setPaused] =
    useState(false);

  const [loadingMedia, setLoadingMedia] =
    useState(true);

  // =====================================================
  // VIEWERS
  // =====================================================

  const [showViewers, setShowViewers] =
    useState(false);

  const [viewers, setViewers] =
    useState([]);

  const [viewersLoading, setViewersLoading] =
    useState(false);

  const [viewersError, setViewersError] =
    useState(null);

  const viewerSheetY =
    useRef(
      new Animated.Value(
        SCREEN_HEIGHT
      )
    ).current;

  // =====================================================
  // REFS
  // =====================================================

  const timerRef =
    useRef(null);

  const pressTimerRef =
    useRef(null);

  const advancingRef =
    useRef(false);

  const currentStory =
    stories?.[currentIndex];

  // =====================================================
  // MEDIA
  // =====================================================

  const videoUrl =
    currentStory?.media_url ||
    currentStory?.file_url ||
    currentStory?.media;

  const player =
    useVideoPlayer(
      currentStory?.media_type === "video" &&
        videoUrl
        ? getMediaUrl(videoUrl)
        : null,
      (player) => {
        player.loop = false;
      }
    );

  // =====================================================
  // CLEAR TIMER
  // =====================================================

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // =====================================================
  // RESET STORY
  // =====================================================

  useEffect(() => {
    clearTimer();

    setProgress(0);
    setPaused(false);
    setLoadingMedia(true);

    advancingRef.current = false;

    if (
      player &&
      currentStory?.media_type === "video"
    ) {
      try {
        player.currentTime = 0;
        player.play();
      } catch (error) {
        console.log(
          "MY VIDEO RESET ERROR =>",
          error
        );
      }
    }

    return () => {
      clearTimer();
    };
  }, [
    currentIndex,
    currentStory?.id,
  ]);

  // =====================================================
  // IMAGE LOADED
  // =====================================================

  useEffect(() => {
    if (
      currentStory?.media_type === "image"
    ) {
      setLoadingMedia(false);
    }
  }, [
    currentStory?.id,
  ]);

  // =====================================================
  // NEXT
  // =====================================================

  const goNext = () => {
    if (
      advancingRef.current ||
      showViewers
    ) {
      return;
    }

    advancingRef.current = true;

    clearTimer();

    if (
      currentIndex <
      stories.length - 1
    ) {
      setCurrentIndex(
        (prev) => prev + 1
      );
    } else {
      router.back();
    }

    setTimeout(() => {
      advancingRef.current = false;
    }, 100);
  };

  // =====================================================
  // PREVIOUS
  // =====================================================

  const goPrevious = () => {
    if (showViewers) {
      return;
    }

    clearTimer();

    if (currentIndex > 0) {
      setCurrentIndex(
        (prev) => prev - 1
      );
    } else {
      router.back();
    }
  };

  // =====================================================
  // IMAGE PROGRESS
  // =====================================================

  useEffect(() => {
    if (
      !currentStory ||
      currentStory.media_type === "video" ||
      paused ||
      showViewers
    ) {
      return;
    }

    clearTimer();

    const startedAt = Date.now();

    timerRef.current =
      setInterval(() => {
        const elapsed =
          Date.now() - startedAt;

        const value =
          Math.min(
            elapsed /
              IMAGE_DURATION,
            1
          );

        setProgress(value);

        if (value >= 1) {
          clearTimer();
          goNext();
        }
      }, 50);

    return () => {
      clearTimer();
    };
  }, [
    currentIndex,
    paused,
    showViewers,
    currentStory?.media_type,
  ]);

  // =====================================================
  // VIDEO PROGRESS
  // =====================================================

  useEffect(() => {
    if (
      !player ||
      currentStory?.media_type !== "video" ||
      paused ||
      showViewers
    ) {
      return;
    }

    clearTimer();

    timerRef.current =
      setInterval(() => {
        try {
          const duration =
            player.duration || 0;

          const currentTime =
            player.currentTime || 0;

          if (duration <= 0) {
            return;
          }

          const value =
            Math.min(
              currentTime /
                duration,
              1
            );

          setProgress(value);

          if (value >= 0.99) {
            clearTimer();
            goNext();
          }
        } catch (error) {
          console.log(
            "MY VIDEO PROGRESS ERROR =>",
            error
          );
        }
      }, 50);

    return () => {
      clearTimer();
    };
  }, [
    player,
    currentIndex,
    paused,
    showViewers,
    currentStory?.media_type,
  ]);

  // =====================================================
  // PLAY / PAUSE VIDEO
  // =====================================================

  useEffect(() => {
    if (
      !player ||
      currentStory?.media_type !== "video"
    ) {
      return;
    }

    try {
      if (
        paused ||
        showViewers
      ) {
        player.pause();
      } else {
        player.play();
      }
    } catch (error) {
      console.log(
        "MY VIDEO PLAY ERROR =>",
        error
      );
    }
  }, [
    paused,
    showViewers,
    player,
    currentStory?.media_type,
  ]);

  // =====================================================
  // PRESS
  // =====================================================

  const handlePressIn = () => {
    if (showViewers) {
      return;
    }

    pressTimerRef.current =
      setTimeout(() => {
        setPaused(true);
      }, LONG_PRESS_DELAY);
  };

  const handlePressOut = () => {
    if (pressTimerRef.current) {
      clearTimeout(
        pressTimerRef.current
      );

      pressTimerRef.current = null;
    }

    if (!showViewers) {
      setPaused(false);
    }
  };

  // =====================================================
  // TAP
  // =====================================================

  const handleTap = (event) => {
    if (showViewers) {
      return;
    }

    const x =
      event.nativeEvent.locationX;

    if (
      x <
      SCREEN_WIDTH / 2
    ) {
      goPrevious();
    } else {
      goNext();
    }
  };

  // =====================================================
  // OPEN VIEWERS
  // =====================================================

  const openViewers = async () => {
    if (!currentStory?.id) {
      return;
    }

    clearTimer();

    setPaused(true);
    setShowViewers(true);
    setViewersLoading(true);
    setViewersError(null);

    viewerSheetY.setValue(
      SCREEN_HEIGHT
    );

    Animated.spring(
      viewerSheetY,
      {
        toValue: 0,
        useNativeDriver: true,
        damping: 25,
        stiffness: 220,
        mass: 0.8,
      }
    ).start();

    try {
      const result =
        await dispatch(
          getStoryViewers(
            currentStory.id
          )
        ).unwrap();

      /*
       * Backend response:
       *
       * {
       *   "views_count": 1,
       *   "items": [
       *     {
       *       "id": 22,
       *       "user_id": 22,
       *       "username": "srinivas",
       *       "full_name": "srinivas b",
       *       "avatar_url": null,
       *       "viewed_at": "2026-09-03T11:11:34"
       *     }
       *   ]
       * }
       */

      if (
        Array.isArray(
          result?.items
        )
      ) {
        setViewers(
          result.items
        );
      } else {
        setViewers([]);
      }
    } catch (error) {
      console.log(
        "GET STORY VIEWERS ERROR =>",
        error
      );

      setViewersError(
        "Failed to load viewers"
      );

      setViewers([]);
    } finally {
      setViewersLoading(false);
    }
  };

  // =====================================================
  // CLOSE VIEWERS
  // =====================================================

  const closeViewers = () => {
    Animated.timing(
      viewerSheetY,
      {
        toValue:
          SCREEN_HEIGHT,
        duration: 220,
        useNativeDriver: true,
      }
    ).start(() => {
      setShowViewers(false);
      setPaused(false);
    });
  };

  // =====================================================
  // SWIPE DOWN
  // =====================================================

  const panResponder =
    useRef(
      PanResponder.create({
        onStartShouldSetPanResponder:
          () => true,

        onMoveShouldSetPanResponder:
          (_, gesture) =>
            Math.abs(
              gesture.dy
            ) > 5,

        onPanResponderMove:
          (_, gesture) => {
            if (
              gesture.dy > 0
            ) {
              viewerSheetY.setValue(
                gesture.dy
              );
            }
          },

        onPanResponderRelease:
          (_, gesture) => {
            if (
              gesture.dy > 120 ||
              gesture.vy > 1.2
            ) {
              closeViewers();
            } else {
              Animated.spring(
                viewerSheetY,
                {
                  toValue: 0,
                  useNativeDriver: true,
                  damping: 25,
                  stiffness: 220,
                }
              ).start();
            }
          },
      })
    ).current;

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async () => {
    if (
      !currentStory?.id ||
      deleting
    ) {
      return;
    }

    try {
      await dispatch(
        deleteStory(
          currentStory.id
        )
      ).unwrap();

      if (
        stories.length === 1
      ) {
        router.back();
        return;
      }

      if (
        currentIndex >=
        stories.length - 1
      ) {
        setCurrentIndex(
          (prev) =>
            Math.max(
              prev - 1,
              0
            )
        );
      }
    } catch (error) {
      console.log(
        "DELETE STORY ERROR =>",
        error
      );
    }
  };

  // =====================================================
  // MEDIA
  // =====================================================

  const renderMedia = () => {
    if (!currentStory) {
      return null;
    }

    if (
      currentStory.media_type === "video"
    ) {
      if (!videoUrl) {
        return null;
      }

      return (
        <VideoView
          player={player}
          style={styles.media}
          contentFit="contain"
          nativeControls={false}
        />
      );
    }

    const imageUrl =
      currentStory?.media_url ||
      currentStory?.file_url ||
      currentStory?.media;

    if (!imageUrl) {
      return null;
    }

    return (
      <Image
        source={{
          uri: getMediaUrl(
            imageUrl
          ),
        }}
        style={styles.media}
        resizeMode="contain"
        onLoadStart={() =>
          setLoadingMedia(true)
        }
        onLoadEnd={() =>
          setLoadingMedia(false)
        }
      />
    );
  };

  // =====================================================
  // VIEWER TIME
  // =====================================================

const getViewedTime = (item) => {
  const value = item?.viewed_at;

  if (!value) {
    return "";
  }

  try {
    // Backend sends: 2026-09-03T11:11:34
    // Treat it as local time.
    const [datePart, timePart] = value.split("T");

    if (!datePart || !timePart) {
      return "";
    }

    const [year, month, day] =
      datePart.split("-").map(Number);

    const [hour, minute, second] =
      timePart.split(":").map(Number);

    const viewedDate = new Date(
      year,
      month - 1,
      day,
      hour,
      minute,
      second || 0
    );

    const diffMs =
      Date.now() - viewedDate.getTime();

    if (diffMs < 0) {
      return "now";
    }

    const minutes = Math.floor(
      diffMs / 60000
    );

    if (minutes < 1) {
      return "now";
    }

    if (minutes < 60) {
      return `${minutes}m`;
    }

    const hours = Math.floor(
      minutes / 60
    );

    if (hours < 24) {
      return `${hours}h`;
    }

    const days = Math.floor(
      hours / 24
    );

    return `${days}d`;
  } catch (error) {
    console.log(
      "VIEWED TIME ERROR =>",
      error
    );

    return "";
  }
};

  // =====================================================
  // VIEWER ROW
  // =====================================================

  const renderViewer = ({
    item,
  }) => {
    const username =
      item?.username ||
      "User";

    const fullName =
      item?.full_name ||
      "";

    const avatar =
      item?.avatar_url
        ? getMediaUrl(
            item.avatar_url
          )
        : null;

    const viewedTime =
      getViewedTime(item);

    return (
      <View
        style={
          styles.viewerRow
        }
      >
        {avatar ? (
          <Image
            source={{
              uri: avatar,
            }}
            style={
              styles.viewerAvatar
            }
          />
        ) : (
          <View
            style={
              styles.viewerAvatarPlaceholder
            }
          >
            <Text
              style={
                styles.viewerAvatarLetter
              }
            >
              {username
                .charAt(0)
                .toUpperCase()}
            </Text>
          </View>
        )}

        <View
          style={
            styles.viewerInfo
          }
        >
          <Text
            numberOfLines={1}
            style={
              styles.viewerUsername
            }
          >
            {username}
          </Text>

          <Text
            numberOfLines={1}
            style={
              styles.viewerFullName
            }
          >
            {fullName}

            {fullName &&
            viewedTime
              ? " • "
              : ""}

            {viewedTime}
          </Text>
        </View>
      </View>
    );
  };

  // =====================================================
  // EMPTY
  // =====================================================

  if (!currentStory) {
    return (
      <View
        style={styles.empty}
      >
        <TouchableOpacity
          onPress={() =>
            router.back()
          }
        >
          <Text
            style={
              styles.emptyText
            }
          >
            Close
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const viewsCount =
    Number(
      currentStory?.views_count ||
        0
    );

  // =====================================================
  // UI
  // =====================================================

  return (
    <View
      style={styles.container}
    >
      {renderMedia()}

      {loadingMedia && (
        <View
          style={
            styles.loadingOverlay
          }
        >
          <ActivityIndicator
            size="large"
            color="#fff"
          />
        </View>
      )}

      {/* TOP */}

      <SafeAreaView
        style={
          styles.topOverlay
        }
        edges={["top"]}
      >
        <View
          style={
            styles.progressContainer
          }
        >
          {stories.map(
            (
              story,
              index
            ) => (
              <View
                key={
                  story?.id ??
                  index
                }
                style={
                  styles.progressBackground
                }
              >
                <View
                  style={[
                    styles.progressFill,
                    {
                      width:
                        index <
                        currentIndex
                          ? "100%"
                          : index ===
                            currentIndex
                          ? `${
                              progress *
                              100
                            }%`
                          : "0%",
                    },
                  ]}
                />
              </View>
            )
          )}
        </View>

        {/* HEADER */}

        <View
          style={
            styles.header
          }
        >
          <View
            style={
              styles.headerLeft
            }
          >
            <Text
              style={
                styles.yourStoryLabel
              }
            >
              Your story
            </Text>
          </View>

          <View
            style={
              styles.headerActions
            }
          >
            <TouchableOpacity
              onPress={
                handleDelete
              }
              disabled={
                deleting
              }
              style={
                styles.headerButton
              }
            >
              {deleting ? (
                <ActivityIndicator
                  size="small"
                  color="#fff"
                />
              ) : (
                <Ionicons
                  name="trash-outline"
                  size={23}
                  color="#fff"
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
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
          </View>
        </View>
      </SafeAreaView>

      {/* TAP AREA */}

      <Pressable
        style={
          styles.tapArea
        }
        onPress={
          handleTap
        }
        onPressIn={
          handlePressIn
        }
        onPressOut={
          handlePressOut
        }
      />

      {/* CAPTION */}

      {currentStory.caption ? (
        <View
          pointerEvents="none"
          style={
            styles.captionContainer
          }
        >
          <Text
            style={
              styles.caption
            }
          >
            {currentStory.caption}
          </Text>
        </View>
      ) : null}

      {/* SEEN BY */}

      <View
        style={
          styles.bottomContainer
        }
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={
            openViewers
          }
          style={
            styles.viewersButton
          }
        >
          <Ionicons
            name="eye-outline"
            size={23}
            color="#fff"
          />

          <Text
            style={
              styles.viewsText
            }
          >
            Seen by{" "}
            {viewsCount}
          </Text>
        </TouchableOpacity>
      </View>

      {/* VIEWERS BOTTOM SHEET */}

      <Modal
        visible={
          showViewers
        }
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={
          closeViewers
        }
      >
        <View
          style={
            styles.modalRoot
          }
        >
          {/* BACKDROP */}

          <Pressable
            style={
              styles.modalBackdrop
            }
            onPress={
              closeViewers
            }
          />

          {/* SHEET */}

          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.viewerSheet,
              {
                transform: [
                  {
                    translateY:
                      viewerSheetY,
                  },
                ],
              },
            ]}
          >
            {/* HANDLE */}

            <View
              style={
                styles.dragHandle
              }
            />

            {/* HEADER */}

            <View
              style={
                styles.sheetHeader
              }
            >
              <Text
                style={
                  styles.sheetTitle
                }
              >
                Viewed by
              </Text>

              <TouchableOpacity
                onPress={
                  closeViewers
                }
                style={
                  styles.sheetClose
                }
              >
                <Ionicons
                  name="close"
                  size={25}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            {/* COUNT */}

            <Text
              style={
                styles.sheetCount
              }
            >
              {viewers.length}{" "}
              {viewers.length === 1
                ? "viewer"
                : "viewers"}
            </Text>

            {/* LOADING */}

            {viewersLoading ? (
              <View
                style={
                  styles.sheetLoading
                }
              >
                <ActivityIndicator
                  size="small"
                  color="#fff"
                />

                <Text
                  style={
                    styles.loadingText
                  }
                >
                  Loading viewers...
                </Text>
              </View>
            ) : viewersError ? (
              <View
                style={
                  styles.sheetEmpty
                }
              >
                <Ionicons
                  name="alert-circle-outline"
                  size={30}
                  color="#777"
                />

                <Text
                  style={
                    styles.emptyViewerText
                  }
                >
                  {viewersError}
                </Text>
              </View>
            ) : viewers.length === 0 ? (
              <View
                style={
                  styles.sheetEmpty
                }
              >
                <Ionicons
                  name="eye-off-outline"
                  size={34}
                  color="#777"
                />

                <Text
                  style={
                    styles.emptyViewerText
                  }
                >
                  No one has viewed
                  this story yet
                </Text>
              </View>
            ) : (
              <FlatList
                data={viewers}
                keyExtractor={(
                  item,
                  index
                ) =>
                  String(
                    item?.id ??
                      item?.user_id ??
                      index
                  )
                }
                renderItem={
                  renderViewer
                }
                showsVerticalScrollIndicator={
                  false
                }
                contentContainerStyle={
                  styles.viewerList
                }
              />
            )}
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
    },

    empty: {
      flex: 1,
      backgroundColor: "#000",
      alignItems: "center",
      justifyContent: "center",
    },

    emptyText: {
      color: "#fff",
      fontSize: 16,
    },

    media: {
      position: "absolute",
      left: 0,
      top: 0,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      backgroundColor: "#000",
    },

    loadingOverlay: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
    },

    topOverlay: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      zIndex: 10,
    },

    progressContainer: {
      flexDirection: "row",
      paddingHorizontal: 6,
      gap: 3,
    },

    progressBackground: {
      flex: 1,
      height: 2,
      borderRadius: 2,
      backgroundColor:
        "rgba(255,255,255,0.35)",
      overflow: "hidden",
    },

    progressFill: {
      height: "100%",
      backgroundColor: "#fff",
    },

    header: {
      height: 58,
      paddingHorizontal: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    headerLeft: {
      flex: 1,
      justifyContent: "center",
    },

    yourStoryLabel: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "600",
    },

    headerActions: {
      flexDirection: "row",
      alignItems: "center",
    },

    headerButton: {
      width: 42,
      height: 42,
      alignItems: "center",
      justifyContent: "center",
    },

    tapArea: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 65,
      bottom: 100,
      zIndex: 5,
    },

    captionContainer: {
      position: "absolute",
      left: 16,
      right: 16,
      bottom: 125,
      zIndex: 7,
    },

    caption: {
      color: "#fff",
      fontSize: 15,
      lineHeight: 21,
      textAlign: "center",
    },

    bottomContainer: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 18,
      paddingBottom: 18,
      zIndex: 20,
    },

    viewersButton: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingVertical: 8,
    },

    viewsText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
    },

    // ==================================================
    // VIEWERS MODAL
    // ==================================================

    modalRoot: {
      flex: 1,
      justifyContent: "flex-end",
    },

    modalBackdrop: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor:
        "rgba(0,0,0,0.45)",
    },

    viewerSheet: {
      height:
        SCREEN_HEIGHT * 0.62,
      backgroundColor: "#171717",
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      overflow: "hidden",
      paddingTop: 8,
    },

    dragHandle: {
      alignSelf: "center",
      width: 38,
      height: 4,
      borderRadius: 3,
      backgroundColor: "#777",
      marginBottom: 8,
    },

    sheetHeader: {
      height: 52,
      paddingHorizontal: 18,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 0.5,
      borderBottomColor:
        "rgba(255,255,255,0.12)",
    },

    sheetTitle: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
    },

    sheetClose: {
      position: "absolute",
      right: 12,
      width: 42,
      height: 42,
      alignItems: "center",
      justifyContent: "center",
    },

    sheetCount: {
      color: "#aaa",
      fontSize: 13,
      paddingHorizontal: 18,
      paddingTop: 12,
      paddingBottom: 6,
    },

    viewerList: {
      paddingHorizontal: 18,
      paddingBottom: 30,
    },

    viewerRow: {
      height: 66,
      flexDirection: "row",
      alignItems: "center",
    },

    viewerAvatar: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: "#292929",
    },

    viewerAvatarPlaceholder: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: "#333",
      alignItems: "center",
      justifyContent: "center",
    },

    viewerAvatarLetter: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "600",
    },

    viewerInfo: {
      flex: 1,
      marginLeft: 12,
    },

    viewerUsername: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
    },

    viewerFullName: {
      color: "#888",
      fontSize: 12,
      marginTop: 3,
    },

    sheetLoading: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },

    loadingText: {
      color: "#888",
      fontSize: 13,
    },

    sheetEmpty: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 40,
      gap: 10,
    },

    emptyViewerText: {
      color: "#888",
      fontSize: 14,
      textAlign: "center",
    },
  });