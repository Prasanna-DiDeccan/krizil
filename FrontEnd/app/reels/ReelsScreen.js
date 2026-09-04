// // // import React, {
// // //   useCallback,
// // //   useEffect,
// // //   useRef,
// // //   useState,
// // // } from "react";

// // // import {
// // //   View,
// // //   Text,
// // //   FlatList,
// // //   StyleSheet,
// // //   ActivityIndicator,
// // //   RefreshControl,
// // //   Dimensions,
// // // } from "react-native";

// // // import {
// // //   useDispatch,
// // //   useSelector,
// // // } from "react-redux";

// // // import {
// // //   getReelsFeed,
// // //   startReelsRefresh,
// // // } from "../../src/redux/reelsSlice";

// // // import {
// // //   startWatch,
// // //   endWatch,
// // // } from "../../src/redux/watchSlice";

// // // import ReelItem from "../../src/components/reels/ReelItem";

// // // import { useIsFocused } from "@react-navigation/native";

// // // const { height: SCREEN_HEIGHT } =
// // //   Dimensions.get("window");

// // // // ======================================================
// // // // REELS SCREEN
// // // // ======================================================

// // // const ReelsScreen = () => {
// // //   const dispatch = useDispatch();

// // //   const isFocused = useIsFocused();

// // //   // ======================================================
// // //   // REDUX
// // //   // ======================================================

// // //   const {
// // //     reels,
// // //     loading,
// // //     loadingMore,
// // //     refreshing,
// // //     hasMore,
// // //     error,
// // //   } = useSelector(
// // //     (state) => state.reels
// // //   );

// // //   // ======================================================
// // //   // REEL HEIGHT
// // //   // ======================================================

// // //   const [reelHeight, setReelHeight] =
// // //     useState(SCREEN_HEIGHT);

// // //   // ======================================================
// // //   // ACTIVE REEL
// // //   // ======================================================

// // //   const [activeReelId, setActiveReelId] =
// // //     useState(null);

// // //   // ======================================================
// // //   // FLATLIST REF
// // //   // ======================================================

// // //   const flatListRef = useRef(null);

// // //   // ======================================================
// // //   // WATCH SESSION
// // //   // ======================================================

// // //   const watchSessionRef =
// // //     useRef(null);

// // //   const watchReelIdRef =
// // //     useRef(null);

// // //   // ======================================================
// // //   // WATCH REQUEST VERSION
// // //   //
// // //   // Every new active reel increments this.
// // //   //
// // //   // If an old API request returns later,
// // //   // we know it is no longer valid.
// // //   // ======================================================

// // //   const watchRequestRef =
// // //     useRef(0);

// // //   // ======================================================
// // //   // END REQUEST LOCK
// // //   // ======================================================

// // //   const endingSessionRef =
// // //     useRef(false);

// // //   // ======================================================
// // //   // ACTIVE REEL REF
// // //   //
// // //   // Avoid stale state inside async functions.
// // //   // ======================================================

// // //   const activeReelIdRef =
// // //     useRef(null);

// // //   useEffect(() => {
// // //     activeReelIdRef.current =
// // //       activeReelId;
// // //   }, [activeReelId]);

// // //   // ======================================================
// // //   // FOCUSED REF
// // //   // ======================================================

// // //   const focusedRef =
// // //     useRef(isFocused);

// // //   useEffect(() => {
// // //     focusedRef.current =
// // //       isFocused;
// // //   }, [isFocused]);

// // //   // ======================================================
// // //   // END CURRENT WATCH SESSION
// // //   // ======================================================

// // //   const finishCurrentWatch =
// // //     useCallback(async () => {
// // //       const sessionId =
// // //         watchSessionRef.current;

// // //       const reelId =
// // //         watchReelIdRef.current;

// // //       if (!sessionId) {
// // //         return;
// // //       }

// // //       if (endingSessionRef.current) {
// // //         return;
// // //       }

// // //       // Clear immediately.
// // //       //
// // //       // This prevents duplicate END requests.
// // //       watchSessionRef.current = null;
// // //       watchReelIdRef.current = null;

// // //       endingSessionRef.current = true;

// // //       console.log(
// // //         "===================================="
// // //       );

// // //       console.log(
// // //         "⏹️ FINISH CURRENT WATCH"
// // //       );

// // //       console.log(
// // //         "SESSION ID =>",
// // //         sessionId
// // //       );

// // //       console.log(
// // //         "REEL ID =>",
// // //         reelId
// // //       );

// // //       try {
// // //         const result =
// // //           await dispatch(
// // //             endWatch({
// // //               sessionId,
// // //             })
// // //           ).unwrap();

// // //         console.log(
// // //           "✅ WATCH END SUCCESS"
// // //         );

// // //         console.log(
// // //           "END RESPONSE =>",
// // //           result
// // //         );
// // //       } catch (error) {
// // //         const status =
// // //           error?.status ??
// // //           error?.response?.status;

// // //         const serverError =
// // //           error?.data ??
// // //           error?.response?.data;

// // //         console.log(
// // //           "❌ WATCH END ERROR"
// // //         );

// // //         console.log(
// // //           "MESSAGE =>",
// // //           error?.message
// // //         );

// // //         console.log(
// // //           "STATUS =>",
// // //           status
// // //         );

// // //         console.log(
// // //           "SERVER ERROR =>",
// // //           serverError
// // //         );

// // //         // 409 means backend already ended it.
// // //         //
// // //         // Since our local refs are already cleared,
// // //         // we don't retry.
// // //         if (status === 409) {
// // //           console.log(
// // //             "⚠️ SESSION ALREADY ENDED ON SERVER"
// // //           );
// // //         }
// // //       } finally {
// // //         endingSessionRef.current =
// // //           false;
// // //       }
// // //     }, [dispatch]);

// // //   // ======================================================
// // //   // START WATCH SESSION
// // //   // ======================================================

// // //   const startWatchForReel =
// // //     useCallback(
// // //       async (reelId) => {
// // //         if (!reelId) {
// // //           return;
// // //         }

// // //         if (!focusedRef.current) {
// // //           return;
// // //         }

// // //         const requestId =
// // //           ++watchRequestRef.current;

// // //         console.log(
// // //           "===================================="
// // //         );

// // //         console.log(
// // //           "▶️ BEGIN WATCH"
// // //         );

// // //         console.log(
// // //           "REEL ID =>",
// // //           reelId
// // //         );

// // //         try {
// // //           const result =
// // //             await dispatch(
// // //               startWatch({
// // //                 reelId,
// // //               })
// // //             ).unwrap();

// // //           const sessionId =
// // //             result?.session_id;

// // //           console.log(
// // //             "✅ WATCH START SUCCESS"
// // //           );

// // //           console.log(
// // //             "SESSION ID =>",
// // //             sessionId
// // //           );

// // //           console.log(
// // //             "REEL ID =>",
// // //             result?.reel_id
// // //           );

// // //           // ==================================================
// // //           // CHECK IF REQUEST IS STILL VALID
// // //           // ==================================================

// // //           const stillValid =
// // //             requestId ===
// // //               watchRequestRef.current &&
// // //             focusedRef.current &&
// // //             activeReelIdRef.current ===
// // //               reelId;

// // //           if (!stillValid) {
// // //             console.log(
// // //               "⚠️ OLD WATCH START RESPONSE"
// // //             );

// // //             console.log(
// // //               "ENDING UNUSED SESSION =>",
// // //               sessionId
// // //             );

// // //             if (sessionId) {
// // //               try {
// // //                 await dispatch(
// // //                   endWatch({
// // //                     sessionId,
// // //                   })
// // //                 ).unwrap();

// // //                 console.log(
// // //                   "✅ UNUSED SESSION CLOSED"
// // //                 );
// // //               } catch (error) {
// // //                 const status =
// // //                   error?.status ??
// // //                   error?.response?.status;

// // //                 console.log(
// // //                   "⚠️ UNUSED SESSION END FAILED"
// // //                 );

// // //                 console.log(
// // //                   "STATUS =>",
// // //                   status
// // //                 );

// // //                 // 409 is harmless here.
// // //                 if (status === 409) {
// // //                   console.log(
// // //                     "⚠️ UNUSED SESSION ALREADY ENDED"
// // //                   );
// // //                 }
// // //               }
// // //             }

// // //             return;
// // //           }

// // //           // ==================================================
// // //           // STORE CURRENT SESSION
// // //           // ==================================================

// // //           watchSessionRef.current =
// // //             sessionId;

// // //           watchReelIdRef.current =
// // //             reelId;

// // //           console.log(
// // //             "💾 WATCH SESSION STORED"
// // //           );

// // //           console.log(
// // //             "SESSION =>",
// // //             sessionId
// // //           );

// // //           console.log(
// // //             "REEL =>",
// // //             reelId
// // //           );
// // //         } catch (error) {
// // //           console.log(
// // //             "❌ START WATCH FAILED"
// // //           );

// // //           console.log(
// // //             "START ERROR =>",
// // //             error
// // //           );
// // //         }
// // //       },
// // //       [dispatch]
// // //     );

// // //   // ======================================================
// // //   // LOAD REELS
// // //   // ======================================================

// // //   useEffect(() => {
// // //     dispatch(
// // //       getReelsFeed({
// // //         limit: 10,
// // //         offset: 0,
// // //       })
// // //     );
// // //   }, [dispatch]);

// // //   // ======================================================
// // //   // SET FIRST REEL
// // //   // ======================================================

// // //   useEffect(() => {
// // //     if (
// // //       isFocused &&
// // //       reels.length > 0 &&
// // //       activeReelId === null
// // //     ) {
// // //       const firstReel =
// // //         reels[0];

// // //       console.log(
// // //         "▶️ SET FIRST ACTIVE REEL =>",
// // //         firstReel.id
// // //       );

// // //       setActiveReelId(
// // //         firstReel.id
// // //       );
// // //     }
// // //   }, [
// // //     reels,
// // //     isFocused,
// // //     activeReelId,
// // //   ]);

// // //   // ======================================================
// // //   // WATCH SESSION LIFECYCLE
// // //   //
// // //   // When reel changes:
// // //   //
// // //   // END old session
// // //   // ↓
// // //   // START new session
// // //   //
// // //   // When screen leaves:
// // //   //
// // //   // END current session
// // //   // ======================================================

// // //   useEffect(() => {
// // //     if (!isFocused) {
// // //       console.log(
// // //         "🛑 REELS SCREEN NOT FOCUSED"
// // //       );

// // //       // Invalidate pending start request.
// // //       watchRequestRef.current += 1;

// // //       finishCurrentWatch();

// // //       return;
// // //     }

// // //     if (!activeReelId) {
// // //       return;
// // //     }

// // //     let cancelled = false;

// // //     const switchWatch =
// // //       async () => {
// // //         console.log(
// // //           "🔄 SWITCHING WATCH SESSION"
// // //         );

// // //         // End old session first.
// // //         await finishCurrentWatch();

// // //         if (cancelled) {
// // //           return;
// // //         }

// // //         if (!focusedRef.current) {
// // //           return;
// // //         }

// // //         if (
// // //           activeReelIdRef.current !==
// // //           activeReelId
// // //         ) {
// // //           return;
// // //         }

// // //         await startWatchForReel(
// // //           activeReelId
// // //         );
// // //       };

// // //     switchWatch();

// // //     return () => {
// // //       cancelled = true;
// // //     };
// // //   }, [
// // //     activeReelId,
// // //     isFocused,
// // //     finishCurrentWatch,
// // //     startWatchForReel,
// // //   ]);

// // //   // ======================================================
// // //   // SCREEN FOCUS
// // //   // ======================================================

// // //   useEffect(() => {
// // //     console.log(
// // //       "📱 REELS SCREEN FOCUS =>",
// // //       isFocused
// // //     );

// // //     focusedRef.current =
// // //       isFocused;

// // //     if (!isFocused) {
// // //       console.log(
// // //         "🛑 LEFT REELS SCREEN"
// // //       );

// // //       // Invalidate pending START.
// // //       watchRequestRef.current += 1;

// // //       // End current watch.
// // //       finishCurrentWatch();

// // //       // Remove active reel.
// // //       setActiveReelId(null);
// // //     }
// // //   }, [
// // //     isFocused,
// // //     finishCurrentWatch,
// // //   ]);

// // //   // ======================================================
// // //   // CONTAINER LAYOUT
// // //   // ======================================================

// // //   const handleContainerLayout =
// // //     useCallback((event) => {
// // //       const height =
// // //         event.nativeEvent.layout.height;

// // //       if (height > 0) {
// // //         console.log(
// // //           "📱 REELS HEIGHT =>",
// // //           height
// // //         );

// // //         setReelHeight(height);
// // //       }
// // //     }, []);

// // //   // ======================================================
// // //   // VIEWABILITY
// // //   // ======================================================

// // //   const onViewableItemsChanged =
// // //     useRef(
// // //       ({ viewableItems }) => {
// // //         if (!focusedRef.current) {
// // //           return;
// // //         }

// // //         if (
// // //           !viewableItems ||
// // //           viewableItems.length === 0
// // //         ) {
// // //           return;
// // //         }

// // //         // Find the reel that is most visible.
// // //         const currentItem =
// // //           viewableItems.find(
// // //             (item) =>
// // //               item.isViewable
// // //           )?.item;

// // //         if (!currentItem) {
// // //           return;
// // //         }

// // //         const newId =
// // //           currentItem.id;

// // //         // Don't update state if same reel.
// // //         if (
// // //           activeReelIdRef.current ===
// // //           newId
// // //         ) {
// // //           return;
// // //         }

// // //         console.log(
// // //           "🎬 ACTIVE REEL =>",
// // //           newId
// // //         );

// // //         activeReelIdRef.current =
// // //           newId;

// // //         setActiveReelId(
// // //           newId
// // //         );
// // //       }
// // //     ).current;

// // //   // ======================================================
// // //   // VIEWABILITY CONFIG
// // //   // ======================================================

// // //   const viewabilityConfig =
// // //     useRef({
// // //       itemVisiblePercentThreshold: 80,
// // //       minimumViewTime: 80,
// // //     }).current;

// // //   // ======================================================
// // //   // LOAD MORE
// // //   // ======================================================

// // //   const handleLoadMore =
// // //     useCallback(() => {
// // //       if (!focusedRef.current) {
// // //         return;
// // //       }

// // //       if (loading) {
// // //         return;
// // //       }

// // //       if (loadingMore) {
// // //         return;
// // //       }

// // //       if (!hasMore) {
// // //         return;
// // //       }

// // //       console.log(
// // //         "🎬 LOAD MORE REELS"
// // //       );

// // //       dispatch(
// // //         getReelsFeed({
// // //           limit: 10,
// // //           offset: reels.length,
// // //         })
// // //       );
// // //     }, [
// // //       dispatch,
// // //       reels.length,
// // //       loading,
// // //       loadingMore,
// // //       hasMore,
// // //     ]);

// // //   // ======================================================
// // //   // REFRESH
// // //   // ======================================================

// // //   const handleRefresh =
// // //     useCallback(() => {
// // //       if (!focusedRef.current) {
// // //         return;
// // //       }

// // //       console.log(
// // //         "🔄 REFRESHING REELS"
// // //       );

// // //       // Invalidate old watch starts.
// // //       watchRequestRef.current += 1;

// // //       // End current session.
// // //       finishCurrentWatch();

// // //       // Reset active reel.
// // //       activeReelIdRef.current =
// // //         null;

// // //       setActiveReelId(null);

// // //       dispatch(
// // //         startReelsRefresh()
// // //       );

// // //       dispatch(
// // //         getReelsFeed({
// // //           limit: 10,
// // //           offset: 0,
// // //         })
// // //       );
// // //     }, [
// // //       dispatch,
// // //       finishCurrentWatch,
// // //     ]);

// // //   // ======================================================
// // //   // RENDER REEL
// // //   // ======================================================

// // //   const renderReel =
// // //     useCallback(
// // //       ({ item }) => {
// // //         return (
// // //           <ReelItem
// // //             reel={item}
// // //             isActive={
// // //               isFocused &&
// // //               item.id ===
// // //                 activeReelId
// // //             }
// // //             reelHeight={
// // //               reelHeight
// // //             }
// // //           />
// // //         );
// // //       },
// // //       [
// // //         isFocused,
// // //         activeReelId,
// // //         reelHeight,
// // //       ]
// // //     );

// // //   // ======================================================
// // //   // FOOTER
// // //   // ======================================================

// // //   const renderFooter =
// // //     useCallback(() => {
// // //       if (!loadingMore) {
// // //         return null;
// // //       }

// // //       return (
// // //         <View
// // //           style={[
// // //             styles.footer,
// // //             {
// // //               height:
// // //                 reelHeight,
// // //             },
// // //           ]}
// // //         >
// // //           <ActivityIndicator
// // //             size="small"
// // //             color="#fff"
// // //           />

// // //           <Text
// // //             style={
// // //               styles.loadingText
// // //             }
// // //           >
// // //             Loading more reels...
// // //           </Text>
// // //         </View>
// // //       );
// // //     }, [
// // //       loadingMore,
// // //       reelHeight,
// // //     ]);

// // //   // ======================================================
// // //   // INITIAL LOADING
// // //   // ======================================================

// // //   if (
// // //     loading &&
// // //     reels.length === 0
// // //   ) {
// // //     return (
// // //       <View
// // //         style={styles.center}
// // //       >
// // //         <ActivityIndicator
// // //           size="large"
// // //           color="#fff"
// // //         />

// // //         <Text
// // //           style={
// // //             styles.loadingText
// // //           }
// // //         >
// // //           Loading reels...
// // //         </Text>
// // //       </View>
// // //     );
// // //   }

// // //   // ======================================================
// // //   // ERROR
// // //   // ======================================================

// // //   if (
// // //     error &&
// // //     reels.length === 0
// // //   ) {
// // //     return (
// // //       <View
// // //         style={styles.center}
// // //       >
// // //         <Text
// // //           style={styles.error}
// // //         >
// // //           Failed to load reels
// // //         </Text>

// // //         <Text
// // //           style={
// // //             styles.errorDetails
// // //           }
// // //         >
// // //           {JSON.stringify(error)}
// // //         </Text>
// // //       </View>
// // //     );
// // //   }

// // //   // ======================================================
// // //   // EMPTY
// // //   // ======================================================

// // //   if (
// // //     !loading &&
// // //     reels.length === 0
// // //   ) {
// // //     return (
// // //       <View
// // //         style={styles.center}
// // //       >
// // //         <Text
// // //           style={styles.empty}
// // //         >
// // //           No reels available
// // //         </Text>
// // //       </View>
// // //     );
// // //   }

// // //   // ======================================================
// // //   // MAIN
// // //   // ======================================================

// // //   return (
// // //     <View
// // //       style={styles.container}
// // //       onLayout={
// // //         handleContainerLayout
// // //       }
// // //     >
// // //       {reelHeight > 0 && (
// // //         <FlatList
// // //           ref={flatListRef}

// // //           data={reels}

// // //           keyExtractor={(item) =>
// // //             String(item.id)
// // //           }

// // //           renderItem={
// // //             renderReel
// // //           }

// // //           // ==================================================
// // //           // IMPORTANT
// // //           // ==================================================

// // //           pagingEnabled={true}

// // //           showsVerticalScrollIndicator={
// // //             false
// // //           }

// // //           // Smooth iOS / Android scrolling
// // //           decelerationRate="fast"

// // //           // Prevent multiple reels
// // //           // from being skipped too easily.
// // //           disableIntervalMomentum={
// // //             true
// // //           }

// // //           // No bounce like normal feed.
// // //           bounces={false}

// // //           overScrollMode="never"

// // //           // ==================================================
// // //           // VIEWABILITY
// // //           // ==================================================

// // //           onViewableItemsChanged={
// // //             onViewableItemsChanged
// // //           }

// // //           viewabilityConfig={
// // //             viewabilityConfig
// // //           }

// // //           // ==================================================
// // //           // PERFORMANCE
// // //           // ==================================================

// // //           removeClippedSubviews={
// // //             false
// // //           }

// // //           windowSize={3}

// // //           initialNumToRender={2}

// // //           maxToRenderPerBatch={2}

// // //           updateCellsBatchingPeriod={
// // //             50
// // //           }

// // //           // ==================================================
// // //           // LOAD MORE
// // //           // ==================================================

// // //           onEndReached={
// // //             handleLoadMore
// // //           }

// // //           onEndReachedThreshold={
// // //             0.7
// // //           }

// // //           ListFooterComponent={
// // //             renderFooter
// // //           }

// // //           // ==================================================
// // //           // REFRESH
// // //           // ==================================================

// // //           refreshControl={
// // //             <RefreshControl
// // //               refreshing={
// // //                 refreshing
// // //               }
// // //               onRefresh={
// // //                 handleRefresh
// // //               }
// // //               tintColor="#fff"
// // //               colors={["#fff"]}
// // //             />
// // //           }

// // //           // ==================================================
// // //           // FIXED HEIGHT
// // //           // ==================================================

// // //           getItemLayout={(
// // //             data,
// // //             index
// // //           ) => ({
// // //             length:
// // //               reelHeight,
// // //             offset:
// // //               reelHeight *
// // //               index,
// // //             index,
// // //           })}

// // //           // ==================================================
// // //           // EXTRA DATA
// // //           // ==================================================

// // //           extraData={{
// // //             activeReelId,
// // //             isFocused,
// // //           }}

// // //           // ==================================================
// // //           // CONTENT
// // //           // ==================================================

// // //           contentContainerStyle={{
// // //             paddingBottom: 0,
// // //           }}

// // //           // ==================================================
// // //           // KEY SCROLL SETTINGS
// // //           // ==================================================

// // //           scrollEventThrottle={16}

// // //           directionalLockEnabled={
// // //             true
// // //           }

// // //           alwaysBounceVertical={
// // //             false
// // //           }
// // //         />
// // //       )}
// // //     </View>
// // //   );
// // // };

// // // export default ReelsScreen;

// // // // ======================================================
// // // // STYLES
// // // // ======================================================

// // // const styles =
// // //   StyleSheet.create({
// // //     container: {
// // //       flex: 1,
// // //       backgroundColor: "#000",
// // //     },

// // //     center: {
// // //       flex: 1,
// // //       backgroundColor: "#000",
// // //       justifyContent: "center",
// // //       alignItems: "center",
// // //       paddingHorizontal: 20,
// // //     },

// // //     loadingText: {
// // //       color: "#fff",
// // //       marginTop: 10,
// // //       fontSize: 14,
// // //     },

// // //     error: {
// // //       color: "#ff4444",
// // //       fontSize: 18,
// // //       fontWeight: "600",
// // //       marginBottom: 10,
// // //       textAlign: "center",
// // //     },

// // //     errorDetails: {
// // //       color: "#fff",
// // //       textAlign: "center",
// // //       fontSize: 12,
// // //     },

// // //     empty: {
// // //       color: "#fff",
// // //       fontSize: 18,
// // //       fontWeight: "600",
// // //     },

// // //     footer: {
// // //       backgroundColor: "#000",
// // //       justifyContent: "center",
// // //       alignItems: "center",
// // //     },
// // //   });

// // import React, {
// //   useCallback,
// //   useEffect,
// //   useRef,
// //   useState,
// // } from "react";

// // import {
// //   View,
// //   Text,
// //   FlatList,
// //   StyleSheet,
// //   ActivityIndicator,
// //   RefreshControl,
// //   Dimensions,
// // } from "react-native";

// // import {
// //   useDispatch,
// //   useSelector,
// // } from "react-redux";

// // import {
// //   getReelsFeed,
// //   startReelsRefresh,
// // } from "../../src/redux/reelsSlice";

// // import {
// //   startWatch,
// //   endWatch,
// // } from "../../src/redux/watchSlice";

// // import ReelItem from "../../src/components/reels/ReelItem";

// // import {
// //   useIsFocused,
// // } from "@react-navigation/native";

// // const {
// //   height: SCREEN_HEIGHT,
// // } = Dimensions.get("window");

// // // ======================================================
// // // REELS SCREEN
// // // ======================================================

// // const ReelsScreen = () => {
// //   const dispatch =
// //     useDispatch();

// //   const isFocused =
// //     useIsFocused();

// //   // ======================================================
// //   // REDUX
// //   // ======================================================

// //   const {
// //     reels,
// //     loading,
// //     loadingMore,
// //     refreshing,
// //     hasMore,
// //     error,
// //   } = useSelector(
// //     (state) =>
// //       state.reels
// //   );

// //   // ======================================================
// //   // HEIGHT
// //   // ======================================================

// //   const [
// //     reelHeight,
// //     setReelHeight,
// //   ] = useState(
// //     SCREEN_HEIGHT
// //   );

// //   // ======================================================
// //   // ACTIVE REEL
// //   // ======================================================

// //   const [
// //     activeReelId,
// //     setActiveReelId,
// //   ] = useState(null);

// //   const activeReelIdRef =
// //     useRef(null);

// //   useEffect(() => {
// //     activeReelIdRef.current =
// //       activeReelId;
// //   }, [activeReelId]);

// //   // ======================================================
// //   // FOCUS REF
// //   // ======================================================

// //   const focusedRef =
// //     useRef(isFocused);

// //   useEffect(() => {
// //     focusedRef.current =
// //       isFocused;
// //   }, [isFocused]);

// //   // ======================================================
// //   // FLATLIST
// //   // ======================================================

// //   const flatListRef =
// //     useRef(null);

// //   // ======================================================
// //   // WATCH SESSION
// //   // ======================================================

// //   const sessionRef =
// //     useRef(null);

// //   const sessionReelRef =
// //     useRef(null);

// //   // ======================================================
// //   // REQUEST VERSION
// //   // ======================================================

// //   const watchGenerationRef =
// //     useRef(0);

// //   // ======================================================
// //   // END LOCK
// //   // ======================================================

// //   const endingRef =
// //     useRef(false);

// //   // ======================================================
// //   // END CURRENT SESSION
// //   // ======================================================

// //   const finishCurrentWatch =
// //     useCallback(
// //       async () => {
// //         const sessionId =
// //           sessionRef.current;

// //         const reelId =
// //           sessionReelRef.current;

// //         if (!sessionId) {
// //           return;
// //         }

// //         if (endingRef.current) {
// //           return;
// //         }

// //         // Clear immediately.
// //         sessionRef.current =
// //           null;

// //         sessionReelRef.current =
// //           null;

// //         endingRef.current =
// //           true;

// //         console.log(
// //           "===================================="
// //         );

// //         console.log(
// //           "⏹️ END CURRENT WATCH"
// //         );

// //         console.log(
// //           "SESSION =>",
// //           sessionId
// //         );

// //         console.log(
// //           "REEL =>",
// //           reelId
// //         );

// //         try {
// //           const result =
// //             await dispatch(
// //               endWatch({
// //                 sessionId,
// //               })
// //             ).unwrap();

// //           console.log(
// //             "✅ WATCH SESSION ENDED"
// //           );

// //           console.log(
// //             "WATCH SECONDS =>",
// //             result?.watch_seconds
// //           );

// //           console.log(
// //             "COUNTED =>",
// //             result?.counted
// //           );
// //         } catch (error) {
// //           console.log(
// //             "❌ WATCH END ERROR =>",
// //             error
// //           );

// //           const status =
// //             error?.status ??
// //             error?.response?.status;

// //           if (status === 409) {
// //             console.log(
// //               "⚠️ SESSION ALREADY ENDED"
// //             );
// //           }
// //         } finally {
// //           endingRef.current =
// //             false;
// //         }
// //       },
// //       [dispatch]
// //     );

// //   // ======================================================
// //   // START WATCH
// //   // ======================================================

// //   const startWatchForReel =
// //     useCallback(
// //       async (reelId) => {
// //         if (!reelId) {
// //           return;
// //         }

// //         if (!focusedRef.current) {
// //           return;
// //         }

// //         const generation =
// //           ++watchGenerationRef.current;

// //         console.log(
// //           "===================================="
// //         );

// //         console.log(
// //           "▶️ START WATCH FOR REEL"
// //         );

// //         console.log(
// //           "REEL =>",
// //           reelId
// //         );

// //         console.log(
// //           "GENERATION =>",
// //           generation
// //         );

// //         try {
// //           const result =
// //             await dispatch(
// //               startWatch({
// //                 reelId,
// //               })
// //             ).unwrap();

// //           const sessionId =
// //             result?.session_id;

// //           console.log(
// //             "✅ START RESPONSE"
// //           );

// //           console.log(
// //             "SESSION =>",
// //             sessionId
// //           );

// //           // ============================================
// //           // OLD RESPONSE CHECK
// //           // ============================================

// //           const valid =
// //             generation ===
// //               watchGenerationRef.current &&
// //             focusedRef.current &&
// //             activeReelIdRef.current ===
// //               reelId;

// //           if (!valid) {
// //             console.log(
// //               "⚠️ OLD START RESPONSE"
// //             );

// //             if (sessionId) {
// //               try {
// //                 await dispatch(
// //                   endWatch({
// //                     sessionId,
// //                   })
// //                 ).unwrap();

// //                 console.log(
// //                   "✅ OLD SESSION CLOSED"
// //                 );
// //               } catch (error) {
// //                 console.log(
// //                   "⚠️ OLD SESSION CLOSE ERROR =>",
// //                   error
// //                 );
// //               }
// //             }

// //             return;
// //           }

// //           // ============================================
// //           // STORE
// //           // ============================================

// //           sessionRef.current =
// //             sessionId;

// //           sessionReelRef.current =
// //             reelId;

// //           console.log(
// //             "💾 CURRENT SESSION STORED"
// //           );

// //           console.log(
// //             "SESSION =>",
// //             sessionId
// //           );

// //           console.log(
// //             "REEL =>",
// //             reelId
// //           );
// //         } catch (error) {
// //           console.log(
// //             "❌ START WATCH FAILED =>",
// //             error
// //           );
// //         }
// //       },
// //       [dispatch]
// //     );

// //   // ======================================================
// //   // LOAD FEED
// //   // ======================================================

// //   useEffect(() => {
// //     dispatch(
// //       getReelsFeed({
// //         limit: 10,
// //         offset: 0,
// //       })
// //     );
// //   }, [dispatch]);

// //   // ======================================================
// //   // FIRST REEL
// //   // ======================================================

// //   useEffect(() => {
// //     if (
// //       !isFocused ||
// //       reels.length === 0
// //     ) {
// //       return;
// //     }

// //     if (
// //       activeReelIdRef.current !==
// //       null
// //     ) {
// //       return;
// //     }

// //     const first =
// //       reels[0];

// //     if (!first?.id) {
// //       return;
// //     }

// //     console.log(
// //       "▶️ FIRST ACTIVE REEL =>",
// //       first.id
// //     );

// //     activeReelIdRef.current =
// //       first.id;

// //     setActiveReelId(
// //       first.id
// //     );
// //   }, [
// //     reels,
// //     isFocused,
// //   ]);

// //   // ======================================================
// //   // WATCH LIFECYCLE
// //   // ======================================================

// //   useEffect(() => {
// //     if (!isFocused) {
// //       return;
// //     }

// //     if (!activeReelId) {
// //       return;
// //     }

// //     let cancelled =
// //       false;

// //     const run =
// //       async () => {
// //         // End previous session.
// //         await finishCurrentWatch();

// //         if (cancelled) {
// //           return;
// //         }

// //         if (
// //           !focusedRef.current
// //         ) {
// //           return;
// //         }

// //         if (
// //           activeReelIdRef.current !==
// //           activeReelId
// //         ) {
// //           return;
// //         }

// //         await startWatchForReel(
// //           activeReelId
// //         );
// //       };

// //     run();

// //     return () => {
// //       cancelled = true;
// //     };
// //   }, [
// //     activeReelId,
// //     isFocused,
// //     finishCurrentWatch,
// //     startWatchForReel,
// //   ]);

// //   // ======================================================
// //   // SCREEN LEAVE
// //   // ======================================================

// //   useEffect(() => {
// //     if (isFocused) {
// //       return;
// //     }

// //     console.log(
// //       "🛑 LEFT REELS SCREEN"
// //     );

// //     watchGenerationRef.current +=
// //       1;

// //     finishCurrentWatch();

// //     activeReelIdRef.current =
// //       null;

// //     setActiveReelId(null);
// //   }, [
// //     isFocused,
// //     finishCurrentWatch,
// //   ]);

// //   // ======================================================
// //   // HEIGHT
// //   // ======================================================

// //   const handleLayout =
// //     useCallback(
// //       (event) => {
// //         const height =
// //           event?.nativeEvent
// //             ?.layout?.height;

// //         if (
// //           height &&
// //           height > 0
// //         ) {
// //           setReelHeight(
// //             height
// //           );
// //         }
// //       },
// //       []
// //     );

// //   // ======================================================
// //   // VIEWABILITY
// //   // ======================================================

// //   const onViewableItemsChanged =
// //     useRef(
// //       ({
// //         viewableItems,
// //       }) => {
// //         if (
// //           !focusedRef.current
// //         ) {
// //           return;
// //         }

// //         if (
// //           !viewableItems ||
// //           viewableItems.length === 0
// //         ) {
// //           return;
// //         }

// //         const visible =
// //           viewableItems.find(
// //             (entry) =>
// //               entry?.isViewable
// //           );

// //         const reel =
// //           visible?.item;

// //         if (!reel?.id) {
// //           return;
// //         }

// //         const newId =
// //           reel.id;

// //         if (
// //           activeReelIdRef.current ===
// //           newId
// //         ) {
// //           return;
// //         }

// //         console.log(
// //           "🎬 ACTIVE REEL CHANGED =>",
// //           newId
// //         );

// //         activeReelIdRef.current =
// //           newId;

// //         setActiveReelId(
// //           newId
// //         );
// //       }
// //     ).current;

// //   // ======================================================
// //   // VIEWABILITY CONFIG
// //   // ======================================================

// //   const viewabilityConfig =
// //     useRef({
// //       itemVisiblePercentThreshold: 85,
// //       minimumViewTime: 250,
// //     }).current;

// //   // ======================================================
// //   // LOAD MORE
// //   // ======================================================

// //   const handleLoadMore =
// //     useCallback(() => {
// //       if (
// //         !focusedRef.current
// //       ) {
// //         return;
// //       }

// //       if (
// //         loading ||
// //         loadingMore ||
// //         !hasMore
// //       ) {
// //         return;
// //       }

// //       dispatch(
// //         getReelsFeed({
// //           limit: 10,
// //           offset:
// //             reels.length,
// //         })
// //       );
// //     }, [
// //       dispatch,
// //       reels.length,
// //       loading,
// //       loadingMore,
// //       hasMore,
// //     ]);

// //   // ======================================================
// //   // REFRESH
// //   // ======================================================

// //   const handleRefresh =
// //     useCallback(() => {
// //       if (
// //         !focusedRef.current
// //       ) {
// //         return;
// //       }

// //       console.log(
// //         "🔄 REFRESH REELS"
// //       );

// //       watchGenerationRef.current +=
// //         1;

// //       finishCurrentWatch();

// //       activeReelIdRef.current =
// //         null;

// //       setActiveReelId(null);

// //       dispatch(
// //         startReelsRefresh()
// //       );

// //       dispatch(
// //         getReelsFeed({
// //           limit: 10,
// //           offset: 0,
// //         })
// //       );
// //     }, [
// //       dispatch,
// //       finishCurrentWatch,
// //     ]);

// //   // ======================================================
// //   // RENDER REEL
// //   // ======================================================

// //   const renderReel =
// //     useCallback(
// //       ({ item }) => (
// //         <ReelItem
// //           reel={item}
// //           isActive={
// //             isFocused &&
// //             item?.id ===
// //               activeReelId
// //           }
// //           reelHeight={
// //             reelHeight
// //           }
// //         />
// //       ),
// //       [
// //         isFocused,
// //         activeReelId,
// //         reelHeight,
// //       ]
// //     );

// //   // ======================================================
// //   // FOOTER
// //   // ======================================================

// //   const renderFooter =
// //     useCallback(() => {
// //       if (
// //         !loadingMore
// //       ) {
// //         return null;
// //       }

// //       return (
// //         <View
// //           style={[
// //             styles.footer,
// //             {
// //               height:
// //                 reelHeight,
// //             },
// //           ]}
// //         >
// //           <ActivityIndicator
// //             size="small"
// //             color="#fff"
// //           />

// //           <Text
// //             style={
// //               styles.loadingText
// //             }
// //           >
// //             Loading more reels...
// //           </Text>
// //         </View>
// //       );
// //     }, [
// //       loadingMore,
// //       reelHeight,
// //     ]);

// //   // ======================================================
// //   // LOADING
// //   // ======================================================

// //   if (
// //     loading &&
// //     reels.length === 0
// //   ) {
// //     return (
// //       <View
// //         style={styles.center}
// //       >
// //         <ActivityIndicator
// //           size="large"
// //           color="#fff"
// //         />

// //         <Text
// //           style={
// //             styles.loadingText
// //           }
// //         >
// //           Loading reels...
// //         </Text>
// //       </View>
// //     );
// //   }

// //   // ======================================================
// //   // ERROR
// //   // ======================================================

// //   if (
// //     error &&
// //     reels.length === 0
// //   ) {
// //     return (
// //       <View
// //         style={styles.center}
// //       >
// //         <Text
// //           style={styles.error}
// //         >
// //           Failed to load reels
// //         </Text>

// //         <Text
// //           style={
// //             styles.errorDetails
// //           }
// //         >
// //           {JSON.stringify(
// //             error
// //           )}
// //         </Text>
// //       </View>
// //     );
// //   }

// //   // ======================================================
// //   // EMPTY
// //   // ======================================================

// //   if (
// //     !loading &&
// //     reels.length === 0
// //   ) {
// //     return (
// //       <View
// //         style={styles.center}
// //       >
// //         <Text
// //           style={styles.empty}
// //         >
// //           No reels available
// //         </Text>
// //       </View>
// //     );
// //   }

// //   // ======================================================
// //   // MAIN
// //   // ======================================================

// //   return (
// //     <View
// //       style={styles.container}
// //       onLayout={
// //         handleLayout
// //       }
// //     >
// //       {reelHeight > 0 && (
// //         <FlatList
// //           ref={flatListRef}
// //           data={reels}
// //           keyExtractor={(item) =>
// //             String(item.id)
// //           }
// //           renderItem={
// //             renderReel
// //           }

// //           pagingEnabled

// //           showsVerticalScrollIndicator={
// //             false
// //           }

// //           decelerationRate="fast"

// //           disableIntervalMomentum={
// //             true
// //           }

// //           bounces={false}

// //           overScrollMode="never"

// //           onViewableItemsChanged={
// //             onViewableItemsChanged
// //           }

// //           viewabilityConfig={
// //             viewabilityConfig
// //           }

// //           removeClippedSubviews={
// //             false
// //           }

// //           windowSize={3}

// //           initialNumToRender={2}

// //           maxToRenderPerBatch={2}

// //           updateCellsBatchingPeriod={
// //             50
// //           }

// //           onEndReached={
// //             handleLoadMore
// //           }

// //           onEndReachedThreshold={
// //             0.7
// //           }

// //           ListFooterComponent={
// //             renderFooter
// //           }

// //           refreshControl={
// //             <RefreshControl
// //               refreshing={
// //                 refreshing
// //               }
// //               onRefresh={
// //                 handleRefresh
// //               }
// //               tintColor="#fff"
// //               colors={["#fff"]}
// //             />
// //           }

// //           getItemLayout={(
// //             data,
// //             index
// //           ) => ({
// //             length:
// //               reelHeight,

// //             offset:
// //               reelHeight *
// //               index,

// //             index,
// //           })}

// //           extraData={{
// //             activeReelId,
// //             isFocused,
// //           }}

// //           contentContainerStyle={{
// //             paddingBottom: 0,
// //           }}

// //           scrollEventThrottle={16}

// //           directionalLockEnabled={
// //             true
// //           }

// //           alwaysBounceVertical={
// //             false
// //           }
// //         />
// //       )}
// //     </View>
// //   );
// // };

// // export default ReelsScreen;

// // // ======================================================
// // // STYLES
// // // ======================================================

// // const styles =
// //   StyleSheet.create({
// //     container: {
// //       flex: 1,
// //       backgroundColor: "#000",
// //     },

// //     center: {
// //       flex: 1,
// //       backgroundColor: "#000",
// //       justifyContent: "center",
// //       alignItems: "center",
// //       paddingHorizontal: 20,
// //     },

// //     loadingText: {
// //       color: "#fff",
// //       marginTop: 10,
// //       fontSize: 14,
// //     },

// //     error: {
// //       color: "#ff4444",
// //       fontSize: 18,
// //       fontWeight: "600",
// //       marginBottom: 10,
// //       textAlign: "center",
// //     },

// //     errorDetails: {
// //       color: "#fff",
// //       textAlign: "center",
// //       fontSize: 12,
// //     },

// //     empty: {
// //       color: "#fff",
// //       fontSize: 18,
// //       fontWeight: "600",
// //     },

// //     footer: {
// //       backgroundColor: "#000",
// //       justifyContent: "center",
// //       alignItems: "center",
// //     },
// //   });


// import React, {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
//   RefreshControl,
//   useWindowDimensions,
// } from "react-native";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import {
//   getReelsFeed,
//   startReelsRefresh,
// } from "../../src/redux/reelsSlice";

// import {
//   startWatch,
//   endWatch,
// } from "../../src/redux/watchSlice";

// import ReelItem from "../../src/components/reels/ReelItem";

// import ScreenLayout from "../../src/components/ScreenLayout";

// import {
//   useIsFocused,
// } from "@react-navigation/native";

// import {
//   useBottomTabBarHeight,
// } from "@react-navigation/bottom-tabs";


// // ======================================================
// // REELS SCREEN
// // ======================================================

// const ReelsScreen = () => {
//   const dispatch = useDispatch();

//   const isFocused = useIsFocused();

//   const { height: windowHeight } =
//     useWindowDimensions();

//   // ======================================================
//   // TAB BAR
//   // ======================================================

//   const tabBarHeight =
//     useBottomTabBarHeight();

//   // ======================================================
//   // REDUX
//   // ======================================================

//   const {
//     reels,
//     loading,
//     loadingMore,
//     refreshing,
//     hasMore,
//     error,
//   } = useSelector(
//     (state) => state.reels
//   );

//   // ======================================================
//   // EXACT AVAILABLE REEL HEIGHT
//   //
//   // ScreenLayout occupies the screen.
//   // Bottom tab bar is part of navigation,
//   // so the reel viewport ends above it.
//   // ======================================================

//   const reelHeight = Math.max(
//     1,
//     windowHeight - tabBarHeight
//   );

//   // ======================================================
//   // ACTIVE REEL
//   // ======================================================

//   const [
//     activeReelId,
//     setActiveReelId,
//   ] = useState(null);

//   const activeReelIdRef =
//     useRef(null);

//   useEffect(() => {
//     activeReelIdRef.current =
//       activeReelId;
//   }, [
//     activeReelId,
//   ]);

//   // ======================================================
//   // FOCUS REF
//   // ======================================================

//   const focusedRef =
//     useRef(isFocused);

//   useEffect(() => {
//     focusedRef.current =
//       isFocused;
//   }, [
//     isFocused,
//   ]);

//   // ======================================================
//   // FLATLIST REF
//   // ======================================================

//   const flatListRef =
//     useRef(null);

//   // ======================================================
//   // WATCH SESSION
//   // ======================================================

//   const sessionRef =
//     useRef(null);

//   const sessionReelRef =
//     useRef(null);

//   // ======================================================
//   // WATCH GENERATION
//   // ======================================================

//   const watchGenerationRef =
//     useRef(0);

//   // ======================================================
//   // END LOCK
//   // ======================================================

//   const endingRef =
//     useRef(false);

//   // ======================================================
//   // END CURRENT WATCH
//   // ======================================================

//   const finishCurrentWatch =
//     useCallback(
//       async () => {
//         const sessionId =
//           sessionRef.current;

//         const reelId =
//           sessionReelRef.current;

//         if (!sessionId) {
//           return;
//         }

//         if (endingRef.current) {
//           return;
//         }

//         sessionRef.current = null;
//         sessionReelRef.current = null;

//         endingRef.current = true;

//         console.log(
//           "===================================="
//         );

//         console.log(
//           "⏹️ END CURRENT WATCH"
//         );

//         console.log(
//           "SESSION =>",
//           sessionId
//         );

//         console.log(
//           "REEL =>",
//           reelId
//         );

//         try {
//           const result =
//             await dispatch(
//               endWatch({
//                 sessionId,
//               })
//             ).unwrap();

//           console.log(
//             "✅ WATCH SESSION ENDED"
//           );

//           console.log(
//             "WATCH SECONDS =>",
//             result?.watch_seconds
//           );

//           console.log(
//             "COUNTED =>",
//             result?.counted
//           );
//         } catch (error) {
//           console.log(
//             "❌ WATCH END ERROR =>",
//             error
//           );

//           const status =
//             error?.status ??
//             error?.response?.status;

//           if (status === 409) {
//             console.log(
//               "⚠️ SESSION ALREADY ENDED"
//             );
//           }
//         } finally {
//           endingRef.current = false;
//         }
//       },
//       [dispatch]
//     );

//   // ======================================================
//   // START WATCH
//   // ======================================================

//   const startWatchForReel =
//     useCallback(
//       async (reelId) => {
//         if (!reelId) {
//           return;
//         }

//         if (!focusedRef.current) {
//           return;
//         }

//         const generation =
//           ++watchGenerationRef.current;

//         console.log(
//           "===================================="
//         );

//         console.log(
//           "▶️ START WATCH FOR REEL"
//         );

//         console.log(
//           "REEL =>",
//           reelId
//         );

//         console.log(
//           "GENERATION =>",
//           generation
//         );

//         try {
//           const result =
//             await dispatch(
//               startWatch({
//                 reelId,
//               })
//             ).unwrap();

//           const sessionId =
//             result?.session_id;

//           console.log(
//             "✅ START RESPONSE"
//           );

//           console.log(
//             "SESSION =>",
//             sessionId
//           );

//           const valid =
//             generation ===
//               watchGenerationRef.current &&
//             focusedRef.current &&
//             activeReelIdRef.current ===
//               reelId;

//           if (!valid) {
//             console.log(
//               "⚠️ OLD START RESPONSE"
//             );

//             if (sessionId) {
//               try {
//                 await dispatch(
//                   endWatch({
//                     sessionId,
//                   })
//                 ).unwrap();

//                 console.log(
//                   "✅ OLD SESSION CLOSED"
//                 );
//               } catch (error) {
//                 console.log(
//                   "⚠️ OLD SESSION CLOSE ERROR =>",
//                   error
//                 );
//               }
//             }

//             return;
//           }

//           sessionRef.current =
//             sessionId;

//           sessionReelRef.current =
//             reelId;

//           console.log(
//             "💾 CURRENT SESSION STORED"
//           );

//           console.log(
//             "SESSION =>",
//             sessionId
//           );

//           console.log(
//             "REEL =>",
//             reelId
//           );
//         } catch (error) {
//           console.log(
//             "❌ START WATCH FAILED =>",
//             error
//           );
//         }
//       },
//       [dispatch]
//     );

//   // ======================================================
//   // LOAD FEED
//   // ======================================================

//   useEffect(() => {
//     dispatch(
//       getReelsFeed({
//         limit: 10,
//         offset: 0,
//       })
//     );
//   }, [dispatch]);

//   // ======================================================
//   // FIRST REEL
//   // ======================================================

//   useEffect(() => {
//     if (
//       !isFocused ||
//       reels.length === 0
//     ) {
//       return;
//     }

//     if (
//       activeReelIdRef.current !==
//       null
//     ) {
//       return;
//     }

//     const first =
//       reels[0];

//     if (!first?.id) {
//       return;
//     }

//     console.log(
//       "▶️ FIRST ACTIVE REEL =>",
//       first.id
//     );

//     activeReelIdRef.current =
//       first.id;

//     setActiveReelId(
//       first.id
//     );
//   }, [
//     reels,
//     isFocused,
//   ]);

//   // ======================================================
//   // WATCH LIFECYCLE
//   // ======================================================

//   useEffect(() => {
//     if (!isFocused) {
//       return;
//     }

//     if (!activeReelId) {
//       return;
//     }

//     let cancelled = false;

//     const run =
//       async () => {
//         await finishCurrentWatch();

//         if (cancelled) {
//           return;
//         }

//         if (!focusedRef.current) {
//           return;
//         }

//         if (
//           activeReelIdRef.current !==
//           activeReelId
//         ) {
//           return;
//         }

//         await startWatchForReel(
//           activeReelId
//         );
//       };

//     run();

//     return () => {
//       cancelled = true;
//     };
//   }, [
//     activeReelId,
//     isFocused,
//     finishCurrentWatch,
//     startWatchForReel,
//   ]);

//   // ======================================================
//   // SCREEN LEAVE
//   // ======================================================

//   useEffect(() => {
//     if (isFocused) {
//       return;
//     }

//     console.log(
//       "🛑 LEFT REELS SCREEN"
//     );

//     watchGenerationRef.current += 1;

//     finishCurrentWatch();

//     activeReelIdRef.current =
//       null;

//     setActiveReelId(null);
//   }, [
//     isFocused,
//     finishCurrentWatch,
//   ]);

//   // ======================================================
//   // VIEWABILITY
//   // ======================================================

//   const onViewableItemsChanged =
//     useRef(
//       ({
//         viewableItems,
//       }) => {
//         if (
//           !focusedRef.current
//         ) {
//           return;
//         }

//         if (
//           !viewableItems ||
//           viewableItems.length === 0
//         ) {
//           return;
//         }

//         const visible =
//           viewableItems.find(
//             (entry) =>
//               entry?.isViewable
//           );

//         const reel =
//           visible?.item;

//         if (!reel?.id) {
//           return;
//         }

//         const newId =
//           reel.id;

//         if (
//           activeReelIdRef.current ===
//           newId
//         ) {
//           return;
//         }

//         console.log(
//           "🎬 ACTIVE REEL CHANGED =>",
//           newId
//         );

//         activeReelIdRef.current =
//           newId;

//         setActiveReelId(
//           newId
//         );
//       }
//     ).current;

//   // ======================================================
//   // VIEWABILITY CONFIG
//   // ======================================================

//   const viewabilityConfig =
//     useRef({
//       itemVisiblePercentThreshold: 90,
//       minimumViewTime: 150,
//     }).current;

//   // ======================================================
//   // LOAD MORE
//   // ======================================================

//   const handleLoadMore =
//     useCallback(() => {
//       if (
//         !focusedRef.current
//       ) {
//         return;
//       }

//       if (
//         loading ||
//         loadingMore ||
//         !hasMore
//       ) {
//         return;
//       }

//       dispatch(
//         getReelsFeed({
//           limit: 10,
//           offset: reels.length,
//         })
//       );
//     }, [
//       dispatch,
//       reels.length,
//       loading,
//       loadingMore,
//       hasMore,
//     ]);

//   // ======================================================
//   // REFRESH
//   // ======================================================

//   const handleRefresh =
//     useCallback(() => {
//       if (
//         !focusedRef.current
//       ) {
//         return;
//       }

//       console.log(
//         "🔄 REFRESH REELS"
//       );

//       watchGenerationRef.current += 1;

//       finishCurrentWatch();

//       activeReelIdRef.current =
//         null;

//       setActiveReelId(null);

//       dispatch(
//         startReelsRefresh()
//       );

//       dispatch(
//         getReelsFeed({
//           limit: 10,
//           offset: 0,
//         })
//       );
//     }, [
//       dispatch,
//       finishCurrentWatch,
//     ]);

//   // ======================================================
//   // RENDER REEL
//   // ======================================================

//   const renderReel =
//     useCallback(
//       ({ item }) => (
//         <ReelItem
//           reel={item}
//           isActive={
//             isFocused &&
//             item?.id ===
//               activeReelId
//           }
//           reelHeight={
//             reelHeight
//           }
//         />
//       ),
//       [
//         isFocused,
//         activeReelId,
//         reelHeight,
//       ]
//     );

//   // ======================================================
//   // FOOTER
//   // ======================================================

//   const renderFooter =
//     useCallback(() => {
//       if (!loadingMore) {
//         return null;
//       }

//       return (
//         <View
//           style={[
//             styles.footer,
//             {
//               height:
//                 reelHeight,
//             },
//           ]}
//         >
//           <ActivityIndicator
//             size="small"
//             color="#fff"
//           />

//           <Text
//             style={
//               styles.loadingText
//             }
//           >
//             Loading more reels...
//           </Text>
//         </View>
//       );
//     }, [
//       loadingMore,
//       reelHeight,
//     ]);

//   // ======================================================
//   // LOADING
//   // ======================================================

//   if (
//     loading &&
//     reels.length === 0
//   ) {
//     return (
//       <ScreenLayout
//         scroll={false}
//         keyboardAvoid={false}
//         edges={[]}
//         backgroundColor="#000"
//       >
//         <View
//           style={styles.center}
//         >
//           <ActivityIndicator
//             size="large"
//             color="#fff"
//           />

//           <Text
//             style={
//               styles.loadingText
//             }
//           >
//             Loading reels...
//           </Text>
//         </View>
//       </ScreenLayout>
//     );
//   }

//   // ======================================================
//   // ERROR
//   // ======================================================

//   if (
//     error &&
//     reels.length === 0
//   ) {
//     return (
//       <ScreenLayout
//         scroll={false}
//         keyboardAvoid={false}
//         edges={[]}
//         backgroundColor="#000"
//       >
//         <View
//           style={styles.center}
//         >
//           <Text
//             style={styles.error}
//           >
//             Failed to load reels
//           </Text>

//           <Text
//             style={
//               styles.errorDetails
//             }
//           >
//             {JSON.stringify(error)}
//           </Text>
//         </View>
//       </ScreenLayout>
//     );
//   }

//   // ======================================================
//   // EMPTY
//   // ======================================================

//   if (
//     !loading &&
//     reels.length === 0
//   ) {
//     return (
//       <ScreenLayout
//         scroll={false}
//         keyboardAvoid={false}
//         edges={[]}
//         backgroundColor="#000"
//       >
//         <View
//           style={styles.center}
//         >
//           <Text
//             style={styles.empty}
//           >
//             No reels available
//           </Text>
//         </View>
//       </ScreenLayout>
//     );
//   }

//   // ======================================================
//   // MAIN
//   // ======================================================

//   return (
//     <ScreenLayout
//       scroll={false}
//       keyboardAvoid={false}
//       edges={[]}
//       backgroundColor="#000"
//     >
//       <View
//         style={[
//           styles.container,
//           {
//             height:
//               reelHeight,
//           },
//         ]}
//       >
//         <FlatList
//           ref={flatListRef}
//           data={reels}
//           keyExtractor={(item) =>
//             String(item.id)
//           }
//           renderItem={
//             renderReel
//           }

//           // ==============================================
//           // INSTAGRAM STYLE PAGING
//           // ==============================================

//           pagingEnabled
//           snapToAlignment="start"
//           decelerationRate="fast"
//           disableIntervalMomentum

//           directionalLockEnabled

//           showsVerticalScrollIndicator={
//             false
//           }

//           bounces={false}
//           alwaysBounceVertical={false}
//           overScrollMode="never"

//           // ==============================================
//           // PERFORMANCE
//           // ==============================================

//           initialNumToRender={2}
//           maxToRenderPerBatch={2}
//           windowSize={3}
//           updateCellsBatchingPeriod={50}

//           removeClippedSubviews={false}

//           // ==============================================
//           // EXACT REEL HEIGHT
//           // ==============================================

//           getItemLayout={(
//             data,
//             index
//           ) => ({
//             length:
//               reelHeight,

//             offset:
//               reelHeight *
//               index,

//             index,
//           })}

//           // ==============================================
//           // ACTIVE REEL
//           // ==============================================

//           onViewableItemsChanged={
//             onViewableItemsChanged
//           }

//           viewabilityConfig={
//             viewabilityConfig
//           }

//           // ==============================================
//           // PAGINATION
//           // ==============================================

//           onEndReached={
//             handleLoadMore
//           }

//           onEndReachedThreshold={0.7}

//           ListFooterComponent={
//             renderFooter
//           }

//           // ==============================================
//           // REFRESH
//           // ==============================================

//           refreshControl={
//             <RefreshControl
//               refreshing={
//                 refreshing
//               }
//               onRefresh={
//                 handleRefresh
//               }
//               tintColor="#fff"
//               colors={[
//                 "#fff",
//               ]}
//             />
//           }

//           // ==============================================
//           // ACTIVE STATE
//           // ==============================================

//           extraData={{
//             activeReelId,
//             isFocused,
//           }}

//           contentContainerStyle={
//             styles.listContent
//           }
//         />
//       </View>
//     </ScreenLayout>
//   );
// };

// export default ReelsScreen;


// // ======================================================
// // STYLES
// // ======================================================

// const styles =
//   StyleSheet.create({
//     container: {
//       width: "100%",
//       backgroundColor: "#000",
//       overflow: "hidden",
//     },

//     listContent: {
//       padding: 0,
//       margin: 0,
//     },

//     center: {
//       flex: 1,
//       backgroundColor: "#000",
//       justifyContent: "center",
//       alignItems: "center",
//       paddingHorizontal: 20,
//     },

//     loadingText: {
//       color: "#fff",
//       marginTop: 10,
//       fontSize: 14,
//     },

//     error: {
//       color: "#ff4444",
//       fontSize: 18,
//       fontWeight: "600",
//       marginBottom: 10,
//       textAlign: "center",
//     },

//     errorDetails: {
//       color: "#fff",
//       textAlign: "center",
//       fontSize: 12,
//     },

//     empty: {
//       color: "#fff",
//       fontSize: 18,
//       fontWeight: "600",
//     },

//     footer: {
//       width: "100%",
//       backgroundColor: "#000",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//   });
  
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getReelsFeed,
  startReelsRefresh,
} from "../../src/redux/reelsSlice";

import {
  startWatch,
  endWatch,
} from "../../src/redux/watchSlice";

import ReelItem from "../../src/components/reels/ReelItem";

import ScreenLayout from "../../src/components/ScreenLayout";

import {
  useIsFocused,
} from "@react-navigation/native";


// ======================================================
// REELS SCREEN
// ======================================================

const ReelsScreen = () => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  // ======================================================
  // EXACT REEL HEIGHT
  // ======================================================
  // FIX: previously computed as
  //   useWindowDimensions().height - useBottomTabBarHeight()
  // React Navigation already sizes this screen to exclude the
  // tab bar (when the tab bar isn't position:absolute), so
  // subtracting tabBarHeight again subtracted it TWICE —
  // leaving a black gap the size of the tab bar at the bottom.
  // Measuring the wrapper View directly with onLayout gives the
  // true available height regardless of tab bar mode/platform.

  const [reelHeight, setReelHeight] = useState(0);

  const reelHeightRef = useRef(0);

  const handleWrapperLayout = useCallback((event) => {
    // LOCK: once we have a real measurement, never change it again.
    // Android can fire onLayout more than once as the screen settles
    // (video/image layers mounting), each time with a slightly
    // different height. Reacting to a later "correction" meant reels
    // rendered before it settled got a different container height
    // than reels rendered after — so the same fixed `bottom` offset
    // for the username/caption ended up at different pixel positions
    // on different reels. Freezing the value after the first valid
    // read guarantees every reel gets the exact same height, so the
    // overlay content lands in the exact same place every time.
    if (reelHeightRef.current > 0) {
      return;
    }

    const { height } = event.nativeEvent.layout;

    if (height > 0) {
      reelHeightRef.current = height;
      setReelHeight(height);
    }
  }, []);

  // ======================================================
  // REDUX
  // ======================================================

  const {
    reels,
    loading,
    loadingMore,
    refreshing,
    hasMore,
    error,
  } = useSelector(
    (state) => state.reels
  );

  // ======================================================
  // ACTIVE REEL
  // ======================================================

  const [
    activeReelId,
    setActiveReelId,
  ] = useState(null);

  const activeReelIdRef =
    useRef(null);

  useEffect(() => {
    activeReelIdRef.current =
      activeReelId;
  }, [activeReelId]);

  // ======================================================
  // FOCUS REF
  // ======================================================

  const focusedRef =
    useRef(isFocused);

  useEffect(() => {
    focusedRef.current =
      isFocused;
  }, [isFocused]);

  // ======================================================
  // FLATLIST REF
  // ======================================================

  const flatListRef =
    useRef(null);

  // ======================================================
  // WATCH SESSION
  // ======================================================

  const sessionRef =
    useRef(null);

  const sessionReelRef =
    useRef(null);

  // ======================================================
  // WATCH GENERATION
  // ======================================================

  const watchGenerationRef =
    useRef(0);

  // ======================================================
  // END LOCK
  // ======================================================

  const endingRef =
    useRef(false);

  // ======================================================
  // END CURRENT WATCH
  // ======================================================

  const finishCurrentWatch =
    useCallback(
      async () => {
        const sessionId =
          sessionRef.current;

        const reelId =
          sessionReelRef.current;

        if (!sessionId) {
          return;
        }

        if (endingRef.current) {
          return;
        }

        sessionRef.current = null;
        sessionReelRef.current = null;

        endingRef.current = true;

        console.log(
          "===================================="
        );

        console.log(
          "⏹️ END CURRENT WATCH"
        );

        console.log(
          "SESSION =>",
          sessionId
        );

        console.log(
          "REEL =>",
          reelId
        );

        try {
          const result =
            await dispatch(
              endWatch({
                sessionId,
              })
            ).unwrap();

          console.log(
            "✅ WATCH SESSION ENDED"
          );

          console.log(
            "WATCH SECONDS =>",
            result?.watch_seconds
          );

          console.log(
            "COUNTED =>",
            result?.counted
          );
        } catch (error) {
          console.log(
            "❌ WATCH END ERROR =>",
            error
          );

          const status =
            error?.status ??
            error?.response?.status;

          if (status === 409) {
            console.log(
              "⚠️ SESSION ALREADY ENDED"
            );
          }
        } finally {
          endingRef.current = false;
        }
      },
      [dispatch]
    );

  // ======================================================
  // START WATCH
  // ======================================================

  const startWatchForReel =
    useCallback(
      async (reelId) => {
        if (!reelId) {
          return;
        }

        if (!focusedRef.current) {
          return;
        }

        const generation =
          ++watchGenerationRef.current;

        console.log(
          "===================================="
        );

        console.log(
          "▶️ START WATCH FOR REEL"
        );

        console.log(
          "REEL =>",
          reelId
        );

        console.log(
          "GENERATION =>",
          generation
        );

        try {
          const result =
            await dispatch(
              startWatch({
                reelId,
              })
            ).unwrap();

          const sessionId =
            result?.session_id;

          console.log(
            "✅ START RESPONSE"
          );

          console.log(
            "SESSION =>",
            sessionId
          );

          const valid =
            generation ===
              watchGenerationRef.current &&
            focusedRef.current &&
            activeReelIdRef.current ===
              reelId;

          if (!valid) {
            console.log(
              "⚠️ OLD START RESPONSE"
            );

            if (sessionId) {
              try {
                await dispatch(
                  endWatch({
                    sessionId,
                  })
                ).unwrap();

                console.log(
                  "✅ OLD SESSION CLOSED"
                );
              } catch (error) {
                console.log(
                  "⚠️ OLD SESSION CLOSE ERROR =>",
                  error
                );
              }
            }

            return;
          }

          sessionRef.current =
            sessionId;

          sessionReelRef.current =
            reelId;

          console.log(
            "💾 CURRENT SESSION STORED"
          );

          console.log(
            "SESSION =>",
            sessionId
          );

          console.log(
            "REEL =>",
            reelId
          );
        } catch (error) {
          console.log(
            "❌ START WATCH FAILED =>",
            error
          );
        }
      },
      [dispatch]
    );

  // ======================================================
  // LOAD FEED
  // ======================================================

  useEffect(() => {
    dispatch(
      getReelsFeed({
        limit: 10,
        offset: 0,
      })
    );
  }, [dispatch]);

  // ======================================================
  // FIRST REEL
  // ======================================================

  useEffect(() => {
    if (
      !isFocused ||
      reels.length === 0
    ) {
      return;
    }

    if (
      activeReelIdRef.current !==
      null
    ) {
      return;
    }

    const first =
      reels[0];

    if (!first?.id) {
      return;
    }

    console.log(
      "▶️ FIRST ACTIVE REEL =>",
      first.id
    );

    activeReelIdRef.current =
      first.id;

    setActiveReelId(
      first.id
    );
  }, [
    reels,
    isFocused,
  ]);

  // ======================================================
  // WATCH LIFECYCLE
  // ======================================================

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    if (!activeReelId) {
      return;
    }

    let cancelled = false;

    const run =
      async () => {
        await finishCurrentWatch();

        if (cancelled) {
          return;
        }

        if (!focusedRef.current) {
          return;
        }

        if (
          activeReelIdRef.current !==
          activeReelId
        ) {
          return;
        }

        await startWatchForReel(
          activeReelId
        );
      };

    run();

    return () => {
      cancelled = true;
    };
  }, [
    activeReelId,
    isFocused,
    finishCurrentWatch,
    startWatchForReel,
  ]);

  // ======================================================
  // SCREEN LEAVE
  // ======================================================

  useEffect(() => {
    if (isFocused) {
      return;
    }

    console.log(
      "🛑 LEFT REELS SCREEN"
    );

    watchGenerationRef.current += 1;

    finishCurrentWatch();

    activeReelIdRef.current =
      null;

    setActiveReelId(null);
  }, [
    isFocused,
    finishCurrentWatch,
  ]);

  // ======================================================
  // VIEWABILITY
  // ======================================================

  const onViewableItemsChanged =
    useRef(
      ({
        viewableItems,
      }) => {
        if (
          !focusedRef.current
        ) {
          return;
        }

        if (
          !viewableItems ||
          viewableItems.length === 0
        ) {
          return;
        }

        const visible =
          viewableItems.find(
            (entry) =>
              entry?.isViewable
          );

        const reel =
          visible?.item;

        if (!reel?.id) {
          return;
        }

        const newId =
          reel.id;

        if (
          activeReelIdRef.current ===
          newId
        ) {
          return;
        }

        console.log(
          "🎬 ACTIVE REEL CHANGED =>",
          newId
        );

        activeReelIdRef.current =
          newId;

        setActiveReelId(
          newId
        );
      }
    ).current;

  // ======================================================
  // VIEWABILITY CONFIG
  // ======================================================

  const viewabilityConfig =
    useRef({
      itemVisiblePercentThreshold: 90,
      minimumViewTime: 150,
    }).current;

  // ======================================================
  // LOAD MORE
  // ======================================================

  const handleLoadMore =
    useCallback(() => {
      if (
        !focusedRef.current
      ) {
        return;
      }

      if (
        loading ||
        loadingMore ||
        !hasMore
      ) {
        return;
      }

      dispatch(
        getReelsFeed({
          limit: 10,
          offset: reels.length,
        })
      );
    }, [
      dispatch,
      reels.length,
      loading,
      loadingMore,
      hasMore,
    ]);

  // ======================================================
  // REFRESH
  // ======================================================

  const handleRefresh =
    useCallback(() => {
      if (
        !focusedRef.current
      ) {
        return;
      }

      console.log(
        "🔄 REFRESH REELS"
      );

      watchGenerationRef.current += 1;

      finishCurrentWatch();

      activeReelIdRef.current =
        null;

      setActiveReelId(null);

      dispatch(
        startReelsRefresh()
      );

      dispatch(
        getReelsFeed({
          limit: 10,
          offset: 0,
        })
      );
    }, [
      dispatch,
      finishCurrentWatch,
    ]);

  // ======================================================
  // RENDER REEL
  // ======================================================

  const renderReel =
    useCallback(
      ({ item }) => (
        <ReelItem
          reel={item}
          isActive={
            isFocused &&
            item?.id ===
              activeReelId
          }
          reelHeight={
            reelHeight
          }
        />
      ),
      [
        isFocused,
        activeReelId,
        reelHeight,
      ]
    );

  // ======================================================
  // FOOTER
  // ======================================================

  const renderFooter =
    useCallback(() => {
      if (!loadingMore) {
        return null;
      }

      return (
        <View
          style={[
            styles.footer,
            {
              height:
                reelHeight,
            },
          ]}
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
            Loading more reels...
          </Text>
        </View>
      );
    }, [
      loadingMore,
      reelHeight,
    ]);

  // ======================================================
  // LOADING
  // ======================================================

  if (
    loading &&
    reels.length === 0
  ) {
    return (
      <ScreenLayout
        scroll={false}
        keyboardAvoid={false}
        edges={[]}
        backgroundColor="#000"
      >
        <View
          style={styles.center}
        >
          <ActivityIndicator
            size="large"
            color="#fff"
          />

          <Text
            style={
              styles.loadingText
            }
          >
            Loading reels...
          </Text>
        </View>
      </ScreenLayout>
    );
  }

  // ======================================================
  // ERROR
  // ======================================================

  if (
    error &&
    reels.length === 0
  ) {
    return (
      <ScreenLayout
        scroll={false}
        keyboardAvoid={false}
        edges={[]}
        backgroundColor="#000"
      >
        <View
          style={styles.center}
        >
          <Text
            style={styles.error}
          >
            Failed to load reels
          </Text>

          <Text
            style={
              styles.errorDetails
            }
          >
            {JSON.stringify(error)}
          </Text>
        </View>
      </ScreenLayout>
    );
  }

  // ======================================================
  // EMPTY
  // ======================================================

  if (
    !loading &&
    reels.length === 0
  ) {
    return (
      <ScreenLayout
        scroll={false}
        keyboardAvoid={false}
        edges={[]}
        backgroundColor="#000"
      >
        <View
          style={styles.center}
        >
          <Text
            style={styles.empty}
          >
            No reels available
          </Text>
        </View>
      </ScreenLayout>
    );
  }

  // ======================================================
  // MAIN
  // ======================================================

  return (
    <ScreenLayout
      scroll={false}
      keyboardAvoid={false}
      edges={[]}
      backgroundColor="#000"
    >
      <View
        style={styles.listWrapper}
        onLayout={handleWrapperLayout}
      >
        {reelHeight > 0 ? (
          <FlatList
            ref={flatListRef}
            data={reels}
            keyExtractor={(item) =>
              String(item.id)
            }
            renderItem={
              renderReel
            }

            // ==================================================
            // INSTAGRAM STYLE PAGING
            // ==================================================

            pagingEnabled
            snapToAlignment="start"
            decelerationRate="fast"
            disableIntervalMomentum

            directionalLockEnabled

            showsVerticalScrollIndicator={
              false
            }

            bounces={false}
            alwaysBounceVertical={false}
            overScrollMode="never"

            // ==================================================
            // PERFORMANCE
            // ==================================================

            initialNumToRender={2}
            maxToRenderPerBatch={2}
            windowSize={3}
            updateCellsBatchingPeriod={50}

            removeClippedSubviews={false}

            // ==================================================
            // EXACT ONE REEL = ONE PAGE
            // ==================================================

            getItemLayout={(
              data,
              index
            ) => ({
              length:
                reelHeight,

              offset:
                reelHeight *
                index,

              index,
            })}

            // ==================================================
            // ACTIVE REEL
            // ==================================================

            onViewableItemsChanged={
              onViewableItemsChanged
            }

            viewabilityConfig={
              viewabilityConfig
            }

            // ==================================================
            // PAGINATION
            // ==================================================

            onEndReached={
              handleLoadMore
            }

            onEndReachedThreshold={0.7}

            ListFooterComponent={
              renderFooter
            }

            // ==================================================
            // REFRESH
            // ==================================================

            refreshControl={
              <RefreshControl
                refreshing={
                  refreshing
                }
                onRefresh={
                  handleRefresh
                }
                tintColor="#fff"
                colors={[
                  "#fff",
                ]}
              />
            }

            // ==================================================
            // ACTIVE STATE
            // ==================================================

            extraData={{
              activeReelId,
              isFocused,
            }}

            contentContainerStyle={
              styles.listContent
            }
          />
        ) : null}
      </View>
    </ScreenLayout>
  );
};

export default ReelsScreen;


// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({
    listWrapper: {
      flex: 1,
      width: "100%",
      backgroundColor: "#000",
      overflow: "hidden",
    },

    listContent: {
      padding: 0,
      margin: 0,
    },

    center: {
      flex: 1,
      backgroundColor: "#000",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },

    loadingText: {
      color: "#fff",
      marginTop: 10,
      fontSize: 14,
    },

    error: {
      color: "#ff4444",
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 10,
      textAlign: "center",
    },

    errorDetails: {
      color: "#fff",
      textAlign: "center",
      fontSize: 12,
    },

    empty: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600",
    },

    footer: {
      width: "100%",
      backgroundColor: "#000",
      justifyContent: "center",
      alignItems: "center",
    },
  });