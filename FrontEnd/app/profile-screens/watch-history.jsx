// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   RefreshControl,
//   Alert,
// } from "react-native";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import {
//   useRouter,
// } from "expo-router";

// import {
//   Ionicons,
// } from "@expo/vector-icons";

// import {
//   getWatchHistory,
//   getWatchStats,
//   selectWatchHistory,
//   selectWatchStats,
// } from "../../src/redux/watchSlice";

// import api from "../../src/utils/api";

// import {
//   getMediaUrl,
// } from "../../src/utils/media";

// // ======================================================
// // HELPERS
// // ======================================================

// const formatDuration = (seconds) => {
//   const value = Number(seconds || 0);

//   if (value < 60) {
//     return `${Math.round(value)}s`;
//   }

//   const minutes =
//     Math.floor(value / 60);

//   const remainingSeconds =
//     Math.round(value % 60);

//   if (minutes < 60) {
//     if (remainingSeconds === 0) {
//       return `${minutes}m`;
//     }

//     return `${minutes}m ${remainingSeconds}s`;
//   }

//   const hours =
//     Math.floor(minutes / 60);

//   const remainingMinutes =
//     minutes % 60;

//   if (remainingMinutes === 0) {
//     return `${hours}h`;
//   }

//   return `${hours}h ${remainingMinutes}m`;
// };

// // ======================================================
// // DATE
// // ======================================================

// const formatWatchedDate = (
//   dateString
// ) => {
//   if (!dateString) {
//     return "";
//   }

//   const date =
//     new Date(dateString);

//   if (Number.isNaN(date.getTime())) {
//     return "";
//   }

//   const now =
//     new Date();

//   const diff =
//     now.getTime() -
//     date.getTime();

//   const seconds =
//     Math.floor(diff / 1000);

//   const minutes =
//     Math.floor(seconds / 60);

//   const hours =
//     Math.floor(minutes / 60);

//   const days =
//     Math.floor(hours / 24);

//   if (seconds < 60) {
//     return "Just now";
//   }

//   if (minutes < 60) {
//     return `${minutes}m ago`;
//   }

//   if (hours < 24) {
//     return `${hours}h ago`;
//   }

//   if (days === 1) {
//     return "Yesterday";
//   }

//   if (days < 7) {
//     return `${days}d ago`;
//   }

//   return date.toLocaleDateString(
//     "en-IN",
//     {
//       day: "numeric",
//       month: "short",
//       year:
//         date.getFullYear() !==
//         now.getFullYear()
//           ? "numeric"
//           : undefined,
//     }
//   );
// };

// // ======================================================
// // WATCH HISTORY SCREEN
// // ======================================================

// export default function WatchHistoryScreen() {
//   const router =
//     useRouter();

//   const dispatch =
//     useDispatch();

//   // ==================================================
//   // REDUX
//   // ==================================================

//   const history =
//     useSelector(
//       selectWatchHistory
//     );

//   const stats =
//     useSelector(
//       selectWatchStats
//     );

//   const historyLoading =
//     useSelector(
//       (state) =>
//         state.watch.historyLoading
//     );

//   const historyError =
//     useSelector(
//       (state) =>
//         state.watch.historyError
//     );

//   const historyTotal =
//     useSelector(
//       (state) =>
//         state.watch.historyTotal
//     );

//   // ==================================================
//   // LOCAL REEL DETAILS
//   // ==================================================

//   const [
//     reelDetails,
//     setReelDetails,
//   ] = useState({});

//   const [
//     detailsLoading,
//     setDetailsLoading,
//   ] = useState(false);

//   const [
//     refreshing,
//     setRefreshing,
//   ] = useState(false);

//   const [
//     loadingMore,
//     setLoadingMore,
//   ] = useState(false);

//   // ==================================================
//   // LOAD HISTORY
//   // ==================================================

//   const loadHistory =
//     useCallback(
//       async ({
//         refresh = false,
//       } = {}) => {
//         try {
//           if (refresh) {
//             setRefreshing(true);

//             await Promise.all([
//               dispatch(
//                 getWatchHistory({
//                   limit: 20,
//                   offset: 0,
//                 })
//               ).unwrap(),

//               dispatch(
//                 getWatchStats()
//               ).unwrap(),
//             ]);
//           } else {
//             await Promise.all([
//               dispatch(
//                 getWatchHistory({
//                   limit: 20,
//                   offset: 0,
//                 })
//               ).unwrap(),

//               dispatch(
//                 getWatchStats()
//               ).unwrap(),
//             ]);
//           }
//         } catch (error) {
//           console.log(
//             "WATCH HISTORY LOAD ERROR =>",
//             error
//           );
//         } finally {
//           setRefreshing(false);
//         }
//       },
//       [dispatch]
//     );

//   // ==================================================
//   // INITIAL LOAD
//   // ==================================================

//   useEffect(() => {
//     loadHistory();
//   }, [loadHistory]);

//   // ==================================================
//   // FETCH REEL DETAILS
//   //
//   // History API gives only reel_id.
//   // So fetch the actual reel.
//   // ==================================================

//   useEffect(() => {
//     if (
//       !history ||
//       history.length === 0
//     ) {
//       return;
//     }

//     let cancelled = false;

//     const loadReelDetails =
//       async () => {
//         setDetailsLoading(true);

//         try {
//           const missingReelIds =
//             history
//               .map(
//                 (item) =>
//                   item?.reel_id
//               )
//               .filter(Boolean)
//               .filter(
//                 (id) =>
//                   !reelDetails[id]
//               );

//           const uniqueIds =
//             [
//               ...new Set(
//                 missingReelIds
//               ),
//             ];

//           if (
//             uniqueIds.length === 0
//           ) {
//             return;
//           }

//           console.log(
//             "📦 LOADING HISTORY REELS =>",
//             uniqueIds
//           );

//           const results =
//             await Promise.allSettled(
//               uniqueIds.map(
//                 async (reelId) => {
//                   const response =
//                     await api.get(
//                       `/api/reels/${reelId}`
//                     );

//                   return {
//                     reelId,
//                     data:
//                       response.data,
//                   };
//                 }
//               )
//             );

//           if (cancelled) {
//             return;
//           }

//           const mapped = {};

//           results.forEach(
//             (result) => {
//               if (
//                 result.status ===
//                 "fulfilled"
//               ) {
//                 const {
//                   reelId,
//                   data,
//                 } =
//                   result.value;

//                 mapped[reelId] =
//                   data;
//               }
//             }
//           );

//           if (
//             Object.keys(mapped)
//               .length > 0
//           ) {
//             setReelDetails(
//               (previous) => ({
//                 ...previous,
//                 ...mapped,
//               })
//             );
//           }
//         } catch (error) {
//           console.log(
//             "❌ REEL DETAILS ERROR =>",
//             error
//           );
//         } finally {
//           if (!cancelled) {
//             setDetailsLoading(false);
//           }
//         }
//       };

//     loadReelDetails();

//     return () => {
//       cancelled = true;
//     };
//   }, [
//     history,
//     reelDetails,
//   ]);

//   // ==================================================
//   // LOAD MORE
//   // ==================================================

//   const handleLoadMore =
//     useCallback(
//       async () => {
//         if (historyLoading) {
//           return;
//         }

//         if (loadingMore) {
//           return;
//         }

//         if (
//           history.length >=
//           historyTotal
//         ) {
//           return;
//         }

//         const nextOffset =
//           history.length;

//         try {
//           setLoadingMore(true);

//           await dispatch(
//             getWatchHistory({
//               limit: 20,
//               offset: nextOffset,
//             })
//           ).unwrap();
//         } catch (error) {
//           console.log(
//             "LOAD MORE HISTORY ERROR =>",
//             error
//           );
//         } finally {
//           setLoadingMore(false);
//         }
//       },
//       [
//         dispatch,
//         historyLoading,
//         loadingMore,
//         history.length,
//         historyTotal,
//       ]
//     );

//   // ==================================================
//   // REFRESH
//   // ==================================================

//   const handleRefresh =
//     useCallback(() => {
//       loadHistory({
//         refresh: true,
//       });
//     }, [loadHistory]);

//   // ==================================================
//   // BACK
//   // ==================================================

//   const handleBack =
//     useCallback(() => {
//       if (
//         router.canGoBack()
//       ) {
//         router.back();
//       } else {
//         router.replace(
//           "/profile"
//         );
//       }
//     }, [router]);

//   // ==================================================
//   // OPEN REEL
//   // ==================================================

//   const handleOpenReel =
//     useCallback(
//       (item) => {
//         const reel =
//           reelDetails[
//             item?.reel_id
//           ];

//         console.log(
//           "OPEN HISTORY REEL =>",
//           item?.reel_id
//         );

//         console.log(
//           "REEL DATA =>",
//           reel
//         );

//         /*
//          * If you already have a reel viewer
//          * route, navigate there.
//          *
//          * Replace this route with your
//          * existing reel viewer route if needed.
//          */

//         router.push({
//           pathname:
//             "/reels",
//           params: {
//             reelId:
//               String(
//                 item.reel_id
//               ),
//           },
//         });
//       },
//       [
//         reelDetails,
//         router,
//       ]
//     );

//   // ==================================================
//   // MENU
//   // ==================================================

//   const handleMenu =
//     useCallback(
//       (item) => {
//         Alert.alert(
//           "Watch history",
//           "What do you want to do?",
//           [
//             {
//               text: "Cancel",
//               style: "cancel",
//             },

//             {
//               text:
//                 "Remove from history",
//               onPress: () => {
//                 /*
//                  * Backend currently doesn't
//                  * provide DELETE history API.
//                  *
//                  * Don't fake deletion here.
//                  */
//                 Alert.alert(
//                   "Not available",
//                   "Remove from watch history is not available from the current API."
//                 );
//               },
//             },
//           ]
//         );
//       },
//       []
//     );

//   // ==================================================
//   // STATS
//   // ==================================================

//   const totalWatchText =
//     useMemo(() => {
//       return formatDuration(
//         stats?.total
//           ?.watch_seconds
//       );
//     }, [stats]);

//   // ==================================================
//   // RENDER ITEM
//   // ==================================================

//   const renderItem =
//     useCallback(
//       ({ item }) => {
//         const reel =
//           reelDetails[
//             item?.reel_id
//           ];

//         const thumbnailUrl =
//           getMediaUrl(
//             reel?.thumbnail_url ||
//               reel?.thumbnail ||
//               reel?.video_thumbnail
//           );

//         const username =
//           reel?.username ||
//           reel?.user?.username ||
//           reel?.author?.username ||
//           reel?.owner?.username ||
//           `User ${reel?.user_id || ""}`;

//         return (
//           <TouchableOpacity
//             activeOpacity={0.85}
//             style={styles.historyItem}
//             onPress={() =>
//               handleOpenReel(
//                 item
//               )
//             }
//           >
//             {/* =================================
//                 THUMBNAIL
//             ================================= */}

//             <View
//               style={
//                 styles.thumbnailContainer
//               }
//             >
//               {thumbnailUrl ? (
//                 <Image
//                   source={{
//                     uri: thumbnailUrl,
//                   }}
//                   style={
//                     styles.thumbnail
//                   }
//                   resizeMode="cover"
//                 />
//               ) : (
//                 <View
//                   style={
//                     styles.thumbnailPlaceholder
//                   }
//                 >
//                   <Ionicons
//                     name="play"
//                     size={28}
//                     color="#fff"
//                   />
//                 </View>
//               )}

//               {/* REEL ICON */}

//               <View
//                 style={
//                   styles.reelIcon
//                 }
//               >
//                 <Ionicons
//                   name="play"
//                   size={12}
//                   color="#fff"
//                 />
//               </View>
//             </View>

//             {/* =================================
//                 INFO
//             ================================= */}

//             <View
//               style={styles.info}
//             >
//               <Text
//                 style={styles.username}
//                 numberOfLines={1}
//               >
//                 {username}
//               </Text>

//               <Text
//                 style={styles.caption}
//                 numberOfLines={2}
//               >
//                 {reel?.caption ||
//                   "Reel"}
//               </Text>

//               <View
//                 style={
//                   styles.metaRow
//                 }
//               >
//                 <Text
//                   style={
//                     styles.metaText
//                   }
//                 >
//                   {formatWatchedDate(
//                     item?.ended_at ||
//                       item?.started_at
//                   )}
//                 </Text>

//                 <View
//                   style={
//                     styles.dot
//                   }
//                 />

//                 <Ionicons
//                   name="time-outline"
//                   size={13}
//                   color="#8e8e93"
//                 />

//                 <Text
//                   style={
//                     styles.metaText
//                   }
//                 >
//                   {formatDuration(
//                     item?.watch_seconds
//                   )}
//                 </Text>
//               </View>
//             </View>

//             {/* =================================
//                 MENU
//             ================================= */}

//             <TouchableOpacity
//               style={
//                 styles.menuButton
//               }
//               hitSlop={{
//                 top: 10,
//                 bottom: 10,
//                 left: 10,
//                 right: 10,
//               }}
//               onPress={() =>
//                 handleMenu(
//                   item
//                 )
//               }
//             >
//               <Ionicons
//                 name="ellipsis-horizontal"
//                 size={22}
//                 color="#fff"
//               />
//             </TouchableOpacity>
//           </TouchableOpacity>
//         );
//       },
//       [
//         reelDetails,
//         handleOpenReel,
//         handleMenu,
//       ]
//     );

//   // ==================================================
//   // FOOTER
//   // ==================================================

//   const renderFooter =
//     useCallback(() => {
//       if (
//         !loadingMore
//       ) {
//         return null;
//       }

//       return (
//         <View
//           style={
//             styles.footer
//           }
//         >
//           <ActivityIndicator
//             size="small"
//             color="#fff"
//           />
//         </View>
//       );
//     }, [loadingMore]);

//   // ==================================================
//   // EMPTY
//   // ==================================================

//   const renderEmpty =
//     useCallback(() => {
//       if (
//         historyLoading
//       ) {
//         return (
//           <View
//             style={
//               styles.emptyContainer
//             }
//           >
//             <ActivityIndicator
//               size="large"
//               color="#fff"
//             />

//             <Text
//               style={
//                 styles.emptyText
//               }
//             >
//               Loading watch history...
//             </Text>
//           </View>
//         );
//       }

//       if (
//         historyError
//       ) {
//         return (
//           <View
//             style={
//               styles.emptyContainer
//             }
//           >
//             <Ionicons
//               name="alert-circle-outline"
//               size={48}
//               color="#fff"
//             />

//             <Text
//               style={
//                 styles.emptyTitle
//               }
//             >
//               Couldn't load history
//             </Text>

//             <Text
//               style={
//                 styles.emptyText
//               }
//             >
//               Pull down to try again.
//             </Text>
//           </View>
//         );
//       }

//       return (
//         <View
//           style={
//             styles.emptyContainer
//           }
//         >
//           <View
//             style={
//               styles.emptyIconCircle
//             }
//           >
//             <Ionicons
//               name="play-outline"
//               size={42}
//               color="#fff"
//             />
//           </View>

//           <Text
//             style={
//               styles.emptyTitle
//             }
//           >
//             No watch history yet
//           </Text>

//           <Text
//             style={
//               styles.emptyText
//             }
//           >
//             Reels you watch will
//             appear here.
//           </Text>
//         </View>
//       );
//     }, [
//       historyLoading,
//       historyError,
//     ]);

//   // ==================================================
//   // SCREEN
//   // ==================================================

//   return (
//     <View
//       style={styles.container}
//     >
//       {/* ==========================================
//           HEADER
//       ========================================== */}

//       <View
//         style={styles.header}
//       >
//         <TouchableOpacity
//           onPress={
//             handleBack
//           }
//           style={
//             styles.backButton
//           }
//           hitSlop={{
//             top: 10,
//             bottom: 10,
//             left: 10,
//             right: 10,
//           }}
//         >
//           <Ionicons
//             name="arrow-back"
//             size={27}
//             color="#fff"
//           />
//         </TouchableOpacity>

//         <Text
//           style={
//             styles.headerTitle
//           }
//         >
//           Watch history
//         </Text>

//         <View
//           style={
//             styles.headerSpacer
//           }
//         />
//       </View>

//       {/* ==========================================
//           SUMMARY
//       ========================================== */}

//       {history.length > 0 && (
//         <View
//           style={
//             styles.summary
//           }
//         >
//           <View
//             style={
//               styles.summaryItem
//             }
//           >
//             <Text
//               style={
//                 styles.summaryValue
//               }
//             >
//               {historyTotal}
//             </Text>

//             <Text
//               style={
//                 styles.summaryLabel
//               }
//             >
//               Reels watched
//             </Text>
//           </View>

//           <View
//             style={
//               styles.summaryDivider
//             }
//           />

//           <View
//             style={
//               styles.summaryItem
//             }
//           >
//             <Text
//               style={
//                 styles.summaryValue
//               }
//             >
//               {totalWatchText}
//             </Text>

//             <Text
//               style={
//                 styles.summaryLabel
//               }
//             >
//               Watch time
//             </Text>
//           </View>
//         </View>
//       )}

//       {/* ==========================================
//           LIST
//       ========================================== */}

//       <FlatList
//         data={history}
//         keyExtractor={(item) =>
//           String(
//             item?.session_id
//           )
//         }
//         renderItem={
//           renderItem
//         }
//         ListEmptyComponent={
//           renderEmpty
//         }
//         ListFooterComponent={
//           renderFooter
//         }
//         showsVerticalScrollIndicator={
//           false
//         }
//         contentContainerStyle={
//           history.length === 0
//             ? styles.emptyList
//             : styles.listContent
//         }
//         refreshControl={
//           <RefreshControl
//             refreshing={
//               refreshing
//             }
//             onRefresh={
//               handleRefresh
//             }
//             tintColor="#fff"
//             colors={["#fff"]}
//           />
//         }
//         onEndReached={
//           handleLoadMore
//         }
//         onEndReachedThreshold={
//           0.6
//         }
//       />
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

//     // ================================================
//     // HEADER
//     // ================================================

//     header: {
//       height: 100,
//       paddingTop: 45,
//       paddingHorizontal: 15,

//       flexDirection: "row",
//       alignItems: "center",

//       borderBottomWidth: 0.5,
//       borderBottomColor: "#252525",
//     },

//     backButton: {
//       width: 45,
//       alignItems: "flex-start",
//       justifyContent: "center",
//     },

//     headerTitle: {
//       flex: 1,

//       color: "#fff",
//       fontSize: 20,
//       fontWeight: "700",

//       textAlign: "center",
//     },

//     headerSpacer: {
//       width: 45,
//     },

//     // ================================================
//     // SUMMARY
//     // ================================================

//     summary: {
//       flexDirection: "row",
//       alignItems: "center",

//       paddingVertical: 18,
//       paddingHorizontal: 25,

//       borderBottomWidth: 0.5,
//       borderBottomColor: "#252525",
//     },

//     summaryItem: {
//       flex: 1,
//       alignItems: "center",
//     },

//     summaryValue: {
//       color: "#fff",
//       fontSize: 18,
//       fontWeight: "700",
//     },

//     summaryLabel: {
//       color: "#8e8e93",
//       fontSize: 12,
//       marginTop: 4,
//     },

//     summaryDivider: {
//       width: 1,
//       height: 32,
//       backgroundColor: "#303030",
//     },

//     // ================================================
//     // LIST
//     // ================================================

//     listContent: {
//       paddingTop: 4,
//       paddingBottom: 30,
//     },

//     historyItem: {
//       minHeight: 108,

//       flexDirection: "row",
//       alignItems: "center",

//       paddingHorizontal: 15,
//       paddingVertical: 10,

//       borderBottomWidth: 0.5,
//       borderBottomColor: "#181818",
//     },

//     // ================================================
//     // THUMBNAIL
//     // ================================================

//     thumbnailContainer: {
//       width: 72,
//       height: 92,

//       borderRadius: 7,

//       overflow: "hidden",

//       backgroundColor: "#181818",

//       position: "relative",
//     },

//     thumbnail: {
//       width: "100%",
//       height: "100%",
//     },

//     thumbnailPlaceholder: {
//       flex: 1,

//       justifyContent: "center",
//       alignItems: "center",

//       backgroundColor: "#222",
//     },

//     reelIcon: {
//       position: "absolute",

//       right: 5,
//       bottom: 5,

//       width: 23,
//       height: 23,

//       borderRadius: 12,

//       backgroundColor:
//         "rgba(0,0,0,0.65)",

//       justifyContent: "center",
//       alignItems: "center",
//     },

//     // ================================================
//     // INFO
//     // ================================================

//     info: {
//       flex: 1,

//       marginLeft: 13,

//       paddingRight: 8,
//     },

//     username: {
//       color: "#fff",
//       fontSize: 15,
//       fontWeight: "700",
//       marginBottom: 5,
//     },

//     caption: {
//       color: "#d0d0d0",
//       fontSize: 13,
//       lineHeight: 18,

//       marginBottom: 8,
//     },

//     metaRow: {
//       flexDirection: "row",
//       alignItems: "center",
//     },

//     metaText: {
//       color: "#8e8e93",
//       fontSize: 11,
//     },

//     dot: {
//       width: 3,
//       height: 3,

//       borderRadius: 2,

//       backgroundColor: "#777",

//       marginHorizontal: 7,
//     },

//     // ================================================
//     // MENU
//     // ================================================

//     menuButton: {
//       width: 30,
//       height: 40,

//       alignItems: "center",
//       justifyContent: "center",
//     },

//     // ================================================
//     // EMPTY
//     // ================================================

//     emptyList: {
//       flexGrow: 1,
//     },

//     emptyContainer: {
//       flex: 1,

//       justifyContent: "center",
//       alignItems: "center",

//       paddingHorizontal: 30,
//     },

//     emptyIconCircle: {
//       width: 88,
//       height: 88,

//       borderRadius: 44,

//       borderWidth: 2,
//       borderColor: "#fff",

//       justifyContent: "center",
//       alignItems: "center",

//       marginBottom: 20,
//     },

//     emptyTitle: {
//       color: "#fff",

//       fontSize: 20,
//       fontWeight: "700",

//       marginBottom: 8,

//       textAlign: "center",
//     },

//     emptyText: {
//       color: "#8e8e93",

//       fontSize: 14,

//       textAlign: "center",

//       lineHeight: 20,
//     },

//     // ================================================
//     // FOOTER
//     // ================================================

//     footer: {
//       height: 55,

//       justifyContent: "center",
//       alignItems: "center",
//     },
//   });

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useRouter,
} from "expo-router";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  getWatchHistory,
  getWatchStats,
  selectWatchHistory,
  selectWatchStats,
} from "../../src/redux/watchSlice";

import api from "../../src/utils/api";

import {
  getMediaUrl,
} from "../../src/utils/media";

// ======================================================
// DATE PARSER
//
// Backend returns UTC timestamps WITHOUT "Z":
//
// 2026-08-27T07:55:20
//
// JS otherwise interprets this as local time.
//
// We explicitly treat timezone-less backend
// timestamps as UTC.
// ======================================================

const parseApiDate = (
  dateString
) => {
  if (!dateString) {
    return null;
  }

  if (
    typeof dateString !== "string"
  ) {
    return null;
  }

  let normalized =
    dateString.trim();

  // If timestamp has no timezone,
  // backend timestamp is assumed UTC.
  const hasTimezone =
    normalized.endsWith("Z") ||
    /[+-]\d{2}:?\d{2}$/.test(
      normalized
    );

  if (!hasTimezone) {
    normalized =
      `${normalized}Z`;
  }

  const date =
    new Date(normalized);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return null;
  }

  return date;
};

// ======================================================
// DURATION
//
// API values are SECONDS.
// ======================================================

const formatDuration = (
  seconds
) => {
  const value =
    Math.max(
      0,
      Number(seconds) || 0
    );

  if (value < 60) {
    return `${Math.round(value)}s`;
  }

  const totalMinutes =
    Math.floor(value / 60);

  const remainingSeconds =
    Math.round(value % 60);

  if (totalMinutes < 60) {
    if (
      remainingSeconds === 0
    ) {
      return `${totalMinutes}m`;
    }

    return `${totalMinutes}m ${remainingSeconds}s`;
  }

  const hours =
    Math.floor(
      totalMinutes / 60
    );

  const remainingMinutes =
    totalMinutes % 60;

  if (
    remainingMinutes === 0
  ) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
};

// ======================================================
// WATCHED DATE
// ======================================================

const formatWatchedDate = (
  dateString
) => {
  const date =
    parseApiDate(dateString);

  if (!date) {
    return "";
  }

  const now =
    new Date();

  const diff =
    Math.max(
      0,
      now.getTime() -
        date.getTime()
    );

  const seconds =
    Math.floor(
      diff / 1000
    );

  const minutes =
    Math.floor(
      seconds / 60
    );

  const hours =
    Math.floor(
      minutes / 60
    );

  const days =
    Math.floor(
      hours / 24
    );

  if (seconds < 60) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  if (days === 1) {
    return "Yesterday";
  }

  if (days < 7) {
    return `${days}d ago`;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year:
        date.getFullYear() !==
        now.getFullYear()
          ? "numeric"
          : undefined,
    }
  );
};

// ======================================================
// SCREEN
// ======================================================

export default function WatchHistoryScreen() {
  const router =
    useRouter();

  const dispatch =
    useDispatch();

  const history =
    useSelector(
      selectWatchHistory
    );

  const stats =
    useSelector(
      selectWatchStats
    );

  const historyLoading =
    useSelector(
      (state) =>
        state.watch.historyLoading
    );

  const historyError =
    useSelector(
      (state) =>
        state.watch.historyError
    );

  const historyTotal =
    useSelector(
      (state) =>
        state.watch.historyTotal
    );

  const [
    reelDetails,
    setReelDetails,
  ] = useState({});

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [
    loadingMore,
    setLoadingMore,
  ] = useState(false);

  // ======================================================
  // LOAD HISTORY
  // ======================================================

  const loadHistory =
    useCallback(
      async () => {
        try {
          await Promise.all([
            dispatch(
              getWatchHistory({
                limit: 20,
                offset: 0,
              })
            ).unwrap(),

            dispatch(
              getWatchStats()
            ).unwrap(),
          ]);
        } catch (error) {
          console.log(
            "❌ WATCH HISTORY LOAD ERROR =>",
            error
          );
        }
      },
      [dispatch]
    );

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // ======================================================
  // LOAD REEL DETAILS
  // ======================================================

  useEffect(() => {
    if (
      !history ||
      history.length === 0
    ) {
      return;
    }

    let cancelled = false;

    const loadDetails =
      async () => {
        const ids =
          [
            ...new Set(
              history
                .map(
                  (item) =>
                    Number(
                      item?.reel_id
                    )
                )
                .filter(
                  (id) =>
                    Number.isInteger(
                      id
                    ) &&
                    id > 0
                )
            ),
          ];

        const missingIds =
          ids.filter(
            (id) =>
              !reelDetails[id]
          );

        if (
          missingIds.length === 0
        ) {
          return;
        }

        try {
          console.log(
            "📦 HISTORY REELS =>",
            missingIds
          );

          const results =
            await Promise.allSettled(
              missingIds.map(
                async (reelId) => {
                  const response =
                    await api.get(
                      `/api/reels/${reelId}`
                    );

                  return {
                    reelId,
                    data:
                      response.data,
                  };
                }
              )
            );

          if (cancelled) {
            return;
          }

          const mapped = {};

          results.forEach(
            (result) => {
              if (
                result.status ===
                "fulfilled"
              ) {
                mapped[
                  result.value.reelId
                ] =
                  result.value.data;
              }
            }
          );

          if (
            Object.keys(mapped)
              .length
          ) {
            setReelDetails(
              (previous) => ({
                ...previous,
                ...mapped,
              })
            );
          }
        } catch (error) {
          console.log(
            "❌ REEL DETAILS ERROR =>",
            error
          );
        }
      };

    loadDetails();

    return () => {
      cancelled = true;
    };
  }, [
    history,
    reelDetails,
  ]);

  // ======================================================
  // REFRESH
  // ======================================================

  const handleRefresh =
    useCallback(
      async () => {
        setRefreshing(true);

        try {
          await loadHistory();
        } finally {
          setRefreshing(false);
        }
      },
      [loadHistory]
    );

  // ======================================================
  // LOAD MORE
  // ======================================================

  const handleLoadMore =
    useCallback(
      async () => {
        if (
          historyLoading ||
          loadingMore
        ) {
          return;
        }

        if (
          history.length >=
          historyTotal
        ) {
          return;
        }

        try {
          setLoadingMore(true);

          await dispatch(
            getWatchHistory({
              limit: 20,
              offset:
                history.length,
            })
          ).unwrap();
        } catch (error) {
          console.log(
            "❌ LOAD MORE ERROR =>",
            error
          );
        } finally {
          setLoadingMore(false);
        }
      },
      [
        dispatch,
        historyLoading,
        loadingMore,
        history.length,
        historyTotal,
      ]
    );

  // ======================================================
  // BACK
  // ======================================================

  const handleBack =
    useCallback(() => {
      if (
        router.canGoBack()
      ) {
        router.back();
      } else {
        router.replace(
          "/profile"
        );
      }
    }, [router]);

  // ======================================================
  // OPEN REEL
  // ======================================================

  const handleOpenReel =
    useCallback(
      (item) => {
        if (!item?.reel_id) {
          return;
        }

        router.push({
          pathname: "/reels",
          params: {
            reelId:
              String(
                item.reel_id
              ),
          },
        });
      },
      [router]
    );

  // ======================================================
  // MENU
  // ======================================================

  const handleMenu =
    useCallback(
      () => {
        Alert.alert(
          "Watch history",
          "Remove from watch history is not available from the current API."
        );
      },
      []
    );

  // ======================================================
  // TOTAL WATCH TIME
  // ======================================================

  const totalWatchText =
    useMemo(() => {
      const seconds =
        Number(
          stats?.total
            ?.watch_seconds ?? 0
        );

      console.log(
        "🕒 TOTAL WATCH SECONDS =>",
        seconds
      );

      return formatDuration(
        seconds
      );
    }, [
      stats?.total
        ?.watch_seconds,
    ]);

  // ======================================================
  // RENDER
  // ======================================================

  const renderItem =
    useCallback(
      ({ item }) => {
        const reel =
          reelDetails[
            item?.reel_id
          ];

        const thumbnailUrl =
          getMediaUrl(
            reel?.thumbnail_url ||
              reel?.thumbnail ||
              reel?.video_thumbnail
          );

        const username =
          reel?.username ||
          reel?.user?.username ||
          reel?.author?.username ||
          reel?.owner?.username ||
          `User ${reel?.user_id || ""}`;

        const watchSeconds =
          Number(
            item?.watch_seconds || 0
          );

        return (
          <TouchableOpacity
            activeOpacity={0.85}
            style={
              styles.historyItem
            }
            onPress={() =>
              handleOpenReel(
                item
              )
            }
          >
            <View
              style={
                styles.thumbnailContainer
              }
            >
              {thumbnailUrl ? (
                <Image
                  source={{
                    uri: thumbnailUrl,
                  }}
                  style={
                    styles.thumbnail
                  }
                  resizeMode="cover"
                />
              ) : (
                <View
                  style={
                    styles.thumbnailPlaceholder
                  }
                >
                  <Ionicons
                    name="play"
                    size={28}
                    color="#fff"
                  />
                </View>
              )}

              <View
                style={
                  styles.reelIcon
                }
              >
                <Ionicons
                  name="play"
                  size={12}
                  color="#fff"
                />
              </View>
            </View>

            <View
              style={styles.info}
            >
              <Text
                style={
                  styles.username
                }
                numberOfLines={1}
              >
                {username}
              </Text>

              <Text
                style={
                  styles.caption
                }
                numberOfLines={2}
              >
                {reel?.caption ||
                  "Reel"}
              </Text>

              <View
                style={
                  styles.metaRow
                }
              >
                <Text
                  style={
                    styles.metaText
                  }
                >
                  {formatWatchedDate(
                    item?.ended_at ||
                      item?.started_at
                  )}
                </Text>

                <View
                  style={styles.dot}
                />

                <Ionicons
                  name="time-outline"
                  size={13}
                  color="#8e8e93"
                />

                <Text
                  style={
                    styles.metaText
                  }
                >
                  {formatDuration(
                    watchSeconds
                  )}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={
                styles.menuButton
              }
              hitSlop={{
                top: 12,
                bottom: 12,
                left: 12,
                right: 12,
              }}
              onPress={() =>
                handleMenu(item)
              }
            >
              <Ionicons
                name="ellipsis-horizontal"
                size={22}
                color="#fff"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      },
      [
        reelDetails,
        handleOpenReel,
        handleMenu,
      ]
    );

  // ======================================================
  // EMPTY
  // ======================================================

  const renderEmpty =
    useCallback(() => {
      if (
        historyLoading
      ) {
        return (
          <View
            style={
              styles.emptyContainer
            }
          >
            <ActivityIndicator
              size="large"
              color="#fff"
            />

            <Text
              style={
                styles.emptyText
              }
            >
              Loading watch history...
            </Text>
          </View>
        );
      }

      if (
        historyError
      ) {
        return (
          <View
            style={
              styles.emptyContainer
            }
          >
            <Ionicons
              name="alert-circle-outline"
              size={48}
              color="#fff"
            />

            <Text
              style={
                styles.emptyTitle
              }
            >
              Couldn't load history
            </Text>

            <Text
              style={
                styles.emptyText
              }
            >
              Pull down to try again.
            </Text>
          </View>
        );
      }

      return (
        <View
          style={
            styles.emptyContainer
          }
        >
          <View
            style={
              styles.emptyIconCircle
            }
          >
            <Ionicons
              name="play-outline"
              size={42}
              color="#fff"
            />
          </View>

          <Text
            style={
              styles.emptyTitle
            }
          >
            No watch history yet
          </Text>

          <Text
            style={
              styles.emptyText
            }
          >
            Reels you watch will
            appear here.
          </Text>
        </View>
      );
    }, [
      historyLoading,
      historyError,
    ]);

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
          style={
            styles.footer
          }
        >
          <ActivityIndicator
            size="small"
            color="#fff"
          />
        </View>
      );
    }, [loadingMore]);

  // ======================================================
  // SCREEN
  // ======================================================

  return (
    <View
      style={styles.container}
    >
      <View
        style={styles.header}
      >
        <TouchableOpacity
          onPress={
            handleBack
          }
          style={
            styles.backButton
          }
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          }}
        >
          <Ionicons
            name="arrow-back"
            size={27}
            color="#fff"
          />
        </TouchableOpacity>

        <Text
          style={
            styles.headerTitle
          }
        >
          Watch history
        </Text>

        <View
          style={
            styles.headerSpacer
          }
        />
      </View>

      {history.length > 0 && (
        <View
          style={
            styles.summary
          }
        >
          <View
            style={
              styles.summaryItem
            }
          >
            <Text
              style={
                styles.summaryValue
              }
            >
              {historyTotal}
            </Text>

            <Text
              style={
                styles.summaryLabel
              }
            >
              Reels watched
            </Text>
          </View>

          <View
            style={
              styles.summaryDivider
            }
          />

          <View
            style={
              styles.summaryItem
            }
          >
            <Text
              style={
                styles.summaryValue
              }
            >
              {totalWatchText}
            </Text>

            <Text
              style={
                styles.summaryLabel
              }
            >
              Watch time
            </Text>
          </View>
        </View>
      )}

      <FlatList
        data={history}
        keyExtractor={(item) =>
          String(
            item?.session_id
          )
        }
        renderItem={
          renderItem
        }
        ListEmptyComponent={
          renderEmpty
        }
        ListFooterComponent={
          renderFooter
        }
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          history.length === 0
            ? styles.emptyList
            : styles.listContent
        }
        refreshControl={
          <RefreshControl
            refreshing={
              refreshing
            }
            onRefresh={
              handleRefresh
            }
            tintColor="#fff"
            colors={["#fff"]}
          />
        }
        onEndReached={
          handleLoadMore
        }
        onEndReachedThreshold={
          0.6
        }
      />
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

    header: {
      height: 100,
      paddingTop: 45,
      paddingHorizontal: 15,
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 0.5,
      borderBottomColor: "#252525",
    },

    backButton: {
      width: 45,
      alignItems: "flex-start",
      justifyContent: "center",
    },

    headerTitle: {
      flex: 1,
      color: "#fff",
      fontSize: 20,
      fontWeight: "700",
      textAlign: "center",
    },

    headerSpacer: {
      width: 45,
    },

    summary: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 18,
      paddingHorizontal: 25,
      borderBottomWidth: 0.5,
      borderBottomColor: "#252525",
    },

    summaryItem: {
      flex: 1,
      alignItems: "center",
    },

    summaryValue: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "700",
    },

    summaryLabel: {
      color: "#8e8e93",
      fontSize: 12,
      marginTop: 4,
    },

    summaryDivider: {
      width: 1,
      height: 32,
      backgroundColor: "#303030",
    },

    listContent: {
      paddingTop: 4,
      paddingBottom: 30,
    },

    historyItem: {
      minHeight: 108,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: "#181818",
    },

    thumbnailContainer: {
      width: 72,
      height: 92,
      borderRadius: 7,
      overflow: "hidden",
      backgroundColor: "#181818",
      position: "relative",
    },

    thumbnail: {
      width: "100%",
      height: "100%",
    },

    thumbnailPlaceholder: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#222",
    },

    reelIcon: {
      position: "absolute",
      right: 5,
      bottom: 5,
      width: 23,
      height: 23,
      borderRadius: 12,
      backgroundColor:
        "rgba(0,0,0,0.65)",
      justifyContent: "center",
      alignItems: "center",
    },

    info: {
      flex: 1,
      marginLeft: 13,
      paddingRight: 8,
    },

    username: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "700",
      marginBottom: 5,
    },

    caption: {
      color: "#d0d0d0",
      fontSize: 13,
      lineHeight: 18,
      marginBottom: 8,
    },

    metaRow: {
      flexDirection: "row",
      alignItems: "center",
    },

    metaText: {
      color: "#8e8e93",
      fontSize: 11,
    },

    dot: {
      width: 3,
      height: 3,
      borderRadius: 2,
      backgroundColor: "#777",
      marginHorizontal: 7,
    },

    menuButton: {
      width: 30,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },

    emptyList: {
      flexGrow: 1,
    },

    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 30,
    },

    emptyIconCircle: {
      width: 88,
      height: 88,
      borderRadius: 44,
      borderWidth: 2,
      borderColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },

    emptyTitle: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 8,
      textAlign: "center",
    },

    emptyText: {
      color: "#8e8e93",
      fontSize: 14,
      textAlign: "center",
      lineHeight: 20,
    },

    footer: {
      height: 55,
      justifyContent: "center",
      alignItems: "center",
    },
  });