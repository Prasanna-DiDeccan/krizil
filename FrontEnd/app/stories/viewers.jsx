// import React, {
//   useEffect,
//   useState,
// } from "react";

// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
// } from "react-native";

// import {
//   Ionicons,
// } from "@expo/vector-icons";

// import {
//   useLocalSearchParams,
//   useRouter,
// } from "expo-router";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import {
//   getStoryViewers,
// } from "../../src/redux/storySlice";

// import {
//   getMediaUrl,
// } from "../../src/utils/media";

// export default function StoryViewers() {
//   const params =
//     useLocalSearchParams();

//   const router =
//     useRouter();

//   const dispatch =
//     useDispatch();

//   const {
//     viewers: reduxViewers = [],
//   } = useSelector(
//     (state) =>
//       state.stories || {}
//   );

//   const [viewers, setViewers] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState(null);

//   // =====================================================
//   // STORY ID
//   // =====================================================

//   const storyId =
//     params?.storyId;

//   // =====================================================
//   // LOAD VIEWERS
//   // =====================================================

//   useEffect(() => {
//     if (!storyId) {
//       setLoading(false);
//       return;
//     }

//     let mounted = true;

//     const loadViewers =
//       async () => {
//         try {
//           setLoading(true);
//           setError(null);

//           const result =
//             await dispatch(
//               getStoryViewers(
//                 storyId
//               )
//             ).unwrap();

//           if (!mounted) {
//             return;
//           }

//           let items = [];

//           if (
//             Array.isArray(
//               result
//             )
//           ) {
//             items = result;
//           } else if (
//             Array.isArray(
//               result?.items
//             )
//           ) {
//             items =
//               result.items;
//           } else if (
//             Array.isArray(
//               result?.viewers
//             )
//           ) {
//             items =
//               result.viewers;
//           }

//           setViewers(items);
//         } catch (err) {
//           console.log(
//             "LOAD STORY VIEWERS ERROR =>",
//             err
//           );

//           if (mounted) {
//             setError(
//               err
//             );
//           }
//         } finally {
//           if (mounted) {
//             setLoading(
//               false
//             );
//           }
//         }
//       };

//     loadViewers();

//     return () => {
//       mounted = false;
//     };
//   }, [
//     storyId,
//     dispatch,
//   ]);

//   // =====================================================
//   // FALLBACK REDUX VIEWERS
//   // =====================================================

//   useEffect(() => {
//     if (
//       viewers.length === 0 &&
//       Array.isArray(
//         reduxViewers
//       ) &&
//       reduxViewers.length > 0
//     ) {
//       setViewers(
//         reduxViewers
//       );
//     }
//   }, [
//     reduxViewers,
//     viewers.length,
//   ]);

//   // =====================================================
//   // VIEWER INFO
//   // =====================================================

//   const getViewerUser =
//     (item) => {
//       return (
//         item?.user ||
//         item?.viewer ||
//         item
//       );
//     };

//   const getViewerId =
//     (item) => {
//       const user =
//         getViewerUser(
//           item
//         );

//       return (
//         item?.viewer_id ??
//         item?.user_id ??
//         user?.id
//       );
//     };

//   const getUsername =
//     (item) => {
//       const user =
//         getViewerUser(
//           item
//         );

//       return (
//         user?.username ||
//         item?.username ||
//         user?.full_name ||
//         item?.full_name ||
//         "User"
//       );
//     };

//   const getAvatar =
//     (item) => {
//       const user =
//         getViewerUser(
//           item
//         );

//       const avatar =
//         user?.avatar_url ||
//         item?.avatar_url ||
//         item?.profile_image;

//       return avatar
//         ? getMediaUrl(
//             avatar
//           )
//         : null;
//     };

//   const getViewedTime =
//     (item) => {
//       return (
//         item?.viewed_at ||
//         item?.created_at ||
//         item?.viewed_time ||
//         null
//       );
//     };

//   // =====================================================
//   // FORMAT DATE
//   // =====================================================

//   const formatViewedTime =
//     (value) => {
//       if (!value) {
//         return "";
//       }

//       const date =
//         new Date(value);

//       if (
//         Number.isNaN(
//           date.getTime()
//         )
//       ) {
//         return "";
//       }

//       const now =
//         Date.now();

//       const diff =
//         Math.max(
//           0,
//           now -
//             date.getTime()
//         );

//       const seconds =
//         Math.floor(
//           diff / 1000
//         );

//       if (
//         seconds < 60
//       ) {
//         return "now";
//       }

//       const minutes =
//         Math.floor(
//           seconds / 60
//         );

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

//       if (
//         days < 7
//       ) {
//         return `${days}d`;
//       }

//       return date.toLocaleDateString();
//     };

//   // =====================================================
//   // RENDER VIEWER
//   // =====================================================

//   const renderViewer =
//     ({
//       item,
//       index,
//     }) => {
//       const username =
//         getUsername(
//           item
//         );

//       const avatar =
//         getAvatar(
//           item
//         );

//       const viewedAt =
//         formatViewedTime(
//           getViewedTime(
//             item
//           )
//         );

//       const id =
//         getViewerId(
//           item
//         );

//       return (
//         <View
//           style={
//             styles.viewerRow
//           }
//         >
//           {avatar ? (
//             <Image
//               source={{
//                 uri: avatar,
//               }}
//               style={
//                 styles.avatar
//               }
//             />
//           ) : (
//             <View
//               style={
//                 styles.avatarPlaceholder
//               }
//             >
//               <Text
//                 style={
//                   styles.avatarLetter
//                 }
//               >
//                 {username
//                   .charAt(0)
//                   .toUpperCase()}
//               </Text>
//             </View>
//           )}

//           <View
//             style={
//               styles.viewerInfo
//             }
//           >
//             <Text
//               style={
//                 styles.username
//               }
//               numberOfLines={1}
//             >
//               {username}
//             </Text>

//             {viewedAt ? (
//               <Text
//                 style={
//                   styles.viewedTime
//                 }
//               >
//                 Viewed{" "}
//                 {viewedAt}
//               </Text>
//             ) : null}
//           </View>
//         </View>
//       );
//     };

//   // =====================================================
//   // EMPTY
//   // =====================================================

//   const renderEmpty =
//     () => {
//       if (loading) {
//         return (
//           <View
//             style={
//               styles.center
//             }
//           >
//             <ActivityIndicator
//               size="small"
//               color="#fff"
//             />

//             <Text
//               style={
//                 styles.loadingText
//               }
//             >
//               Loading viewers...
//             </Text>
//           </View>
//         );
//       }

//       if (error) {
//         return (
//           <View
//             style={
//               styles.center
//             }
//           >
//             <Ionicons
//               name="alert-circle-outline"
//               size={35}
//               color="#777"
//             />

//             <Text
//               style={
//                 styles.emptyText
//               }
//             >
//               Unable to load viewers
//             </Text>
//           </View>
//         );
//       }

//       return (
//         <View
//           style={
//             styles.center
//           }
//         >
//           <Ionicons
//             name="eye-outline"
//             size={42}
//             color="#777"
//           />

//           <Text
//             style={
//               styles.emptyText
//             }
//           >
//             No one has viewed
//             this story yet
//           </Text>
//         </View>
//       );
//     };

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <View
//       style={styles.container}
//     >
//       {/* =============================================== */}
//       {/* HEADER */}
//       {/* =============================================== */}

//       <View
//         style={
//           styles.header
//         }
//       >
//         <TouchableOpacity
//           onPress={() =>
//             router.back()
//           }
//           style={
//             styles.backButton
//           }
//         >
//           <Ionicons
//             name="chevron-back"
//             size={28}
//             color="#fff"
//           />
//         </TouchableOpacity>

//         <View
//           style={
//             styles.headerTitleContainer
//           }
//         >
//           <Text
//             style={
//               styles.headerTitle
//             }
//           >
//             Viewers
//           </Text>

//           {!loading && (
//             <Text
//               style={
//                 styles.headerCount
//               }
//             >
//               {viewers.length}
//             </Text>
//           )}
//         </View>

//         <View
//           style={
//             styles.headerSpacer
//           }
//         />
//       </View>

//       {/* =============================================== */}
//       {/* LIST */}
//       {/* =============================================== */}

//       <FlatList
//         data={
//           viewers
//         }
//         keyExtractor={(
//           item,
//           index
//         ) =>
//           String(
//             getViewerId(
//               item
//             ) ??
//               index
//           )
//         }
//         renderItem={
//           renderViewer
//         }
//         ListEmptyComponent={
//           renderEmpty
//         }
//         showsVerticalScrollIndicator={
//           false
//         }
//         contentContainerStyle={
//           viewers.length ===
//           0
//             ? styles.emptyList
//             : styles.list
//         }
//       />
//     </View>
//   );
// }

// const styles =
//   StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor:
//         "#000",
//     },

//     header: {
//       height: 60,
//       borderBottomWidth: 1,
//       borderBottomColor:
//         "#222",
//       flexDirection:
//         "row",
//       alignItems:
//         "center",
//       justifyContent:
//         "space-between",
//       paddingHorizontal: 8,
//     },

//     backButton: {
//       width: 44,
//       height: 44,
//       alignItems:
//         "center",
//       justifyContent:
//         "center",
//     },

//     headerTitleContainer: {
//       flexDirection:
//         "row",
//       alignItems:
//         "center",
//       gap: 7,
//     },

//     headerTitle: {
//       color: "#fff",
//       fontSize: 17,
//       fontWeight: "700",
//     },

//     headerCount: {
//       color: "#999",
//       fontSize: 14,
//       fontWeight: "500",
//     },

//     headerSpacer: {
//       width: 44,
//     },

//     list: {
//       paddingVertical: 8,
//     },

//     emptyList: {
//       flexGrow: 1,
//     },

//     viewerRow: {
//       minHeight: 68,
//       paddingHorizontal: 16,
//       flexDirection:
//         "row",
//       alignItems:
//         "center",
//     },

//     avatar: {
//       width: 48,
//       height: 48,
//       borderRadius: 24,
//       backgroundColor:
//         "#222",
//     },

//     avatarPlaceholder: {
//       width: 48,
//       height: 48,
//       borderRadius: 24,
//       backgroundColor:
//         "#222",
//       alignItems:
//         "center",
//       justifyContent:
//         "center",
//     },

//     avatarLetter: {
//       color: "#aaa",
//       fontSize: 18,
//       fontWeight: "600",
//     },

//     viewerInfo: {
//       flex: 1,
//       marginLeft: 12,
//     },

//     username: {
//       color: "#fff",
//       fontSize: 14,
//       fontWeight: "600",
//     },

//     viewedTime: {
//       color: "#888",
//       fontSize: 12,
//       marginTop: 3,
//     },

//     center: {
//       flex: 1,
//       alignItems:
//         "center",
//       justifyContent:
//         "center",
//       paddingHorizontal: 30,
//     },

//     loadingText: {
//       color: "#888",
//       fontSize: 13,
//       marginTop: 10,
//     },

//     emptyText: {
//       color: "#888",
//       fontSize: 14,
//       marginTop: 12,
//       textAlign: "center",
//     },
//   });