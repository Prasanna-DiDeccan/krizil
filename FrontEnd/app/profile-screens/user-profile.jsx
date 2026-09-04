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
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   FlatList,
//   RefreshControl,
//   Dimensions,
// } from "react-native";

// import {
//   useLocalSearchParams,
//   useRouter,
// } from "expo-router";

// import {
//   Ionicons,
// } from "@expo/vector-icons";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// // ============================================================
// // REDUX
// // ============================================================

// import {
//   getProfile,
//   selectProfile,
//   selectProfileLoading,
//   selectProfileError,
// } from "../../src/redux/profileSlice";

// import {
//   getUserPosts,
// } from "../../src/redux/postSlice";

// import {
//   getUserReels,
// } from "../../src/redux/reelsSlice";

// import {
//   followUser,
//   unfollowUser,
//   selectFollowLoading,
// } from "../../src/redux/followSlice";

// // ============================================================
// // SCREEN
// // ============================================================

// const { width } = Dimensions.get("window");

// const GRID_GAP = 2;
// const GRID_COLUMNS = 3;

// const ITEM_SIZE =
//   (width - GRID_GAP * (GRID_COLUMNS - 1)) /
//   GRID_COLUMNS;

// // ============================================================
// // USER PROFILE
// // ============================================================

// export default function UserProfile() {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   // ==========================================================
//   // GET USER ID FROM ROUTE
//   // ==========================================================

//   const params = useLocalSearchParams();

//   const rawUserId = params?.userId;

//   const userId = useMemo(() => {
//     if (Array.isArray(rawUserId)) {
//       return rawUserId[0];
//     }

//     return rawUserId;
//   }, [rawUserId]);

//   // ==========================================================
//   // PROFILE
//   // ==========================================================

//   const profile = useSelector(
//     (state) =>
//       selectProfile(
//         state,
//         userId
//       )
//   );

//   const profileLoading = useSelector(
//     selectProfileLoading
//   );

//   const profileError = useSelector(
//     selectProfileError
//   );

//   // ==========================================================
//   // FOLLOW LOADING
//   // ==========================================================

//   const followLoading = useSelector(
//     selectFollowLoading
//   );

//   // ==========================================================
//   // POSTS
//   // ==========================================================

//   const allUserPosts = useSelector(
//     (state) =>
//       state.posts?.userPosts ?? []
//   );

//   const postsLoading = useSelector(
//     (state) =>
//       state.posts?.postsLoading ?? false
//   );

//   const postsError = useSelector(
//     (state) =>
//       state.posts?.postsError ?? null
//   );

//   // ==========================================================
//   // REELS
//   // ==========================================================

//   const allUserReels = useSelector(
//     (state) =>
//       state.reels?.userReels ?? []
//   );

//   const reelsLoading = useSelector(
//     (state) =>
//       state.reels?.userReelsLoading ?? false
//   );

//   const reelsError = useSelector(
//     (state) =>
//       state.reels?.userReelsError ?? null
//   );

//   // ==========================================================
//   // LOCAL UI
//   // ==========================================================

//   const [
//     selectedTab,
//     setSelectedTab,
//   ] = useState("posts");

//   const [
//     refreshing,
//     setRefreshing,
//   ] = useState(false);

//   // ==========================================================
//   // IS FOLLOWING
//   //
//   // SOURCE OF TRUTH:
//   // GET /api/users/{user_id}
//   //
//   // profile:
//   // {
//   //   ...
//   //   is_following: true
//   // }
//   // ==========================================================

//   const isFollowing =
//     profile?.is_following === true;

//   // ==========================================================
//   // CURRENT PROFILE COUNTS
//   //
//   // IMPORTANT:
//   // These MUST come from GET /api/users/{user_id}
//   // and NOT statsSlice.
//   // ==========================================================

//   const postsCount =
//     Number(profile?.posts_count ?? 0);

//   const reelsCount =
//     Number(profile?.reels_count ?? 0);

//   const followersCount =
//     Number(profile?.followers_count ?? 0);

//   const followingCount =
//     Number(profile?.following_count ?? 0);

//   // ==========================================================
//   // FILTER POSTS BY CURRENT USER
//   //
//   // This prevents Srinivas's post from appearing
//   // on TestUser1's profile.
//   // ==========================================================

//   const userPosts = useMemo(() => {
//     if (!userId) {
//       return [];
//     }

//     return allUserPosts.filter(
//       (item) =>
//         String(item?.user_id) ===
//         String(userId)
//     );
//   }, [
//     allUserPosts,
//     userId,
//   ]);

//   // ==========================================================
//   // FILTER REELS BY CURRENT USER
//   // ==========================================================

//   const userReels = useMemo(() => {
//     if (!userId) {
//       return [];
//     }

//     return allUserReels.filter(
//       (item) =>
//         String(item?.user_id) ===
//         String(userId)
//     );
//   }, [
//     allUserReels,
//     userId,
//   ]);

//   // ==========================================================
//   // LOAD USER PROFILE
//   // ==========================================================

//   const loadUserProfile = useCallback(
//     async () => {
//       if (!userId) {
//         return;
//       }

//       console.log(
//         "===================================="
//       );

//       console.log(
//         "👤 USER PROFILE SCREEN"
//       );

//       console.log(
//         "USER ID =>",
//         userId
//       );

//       console.log(
//         "===================================="
//       );

//       try {
//         // ----------------------------------------------------
//         // GET PROFILE
//         // GET /api/users/{user_id}
//         //
//         // This response contains:
//         //
//         // posts_count
//         // reels_count
//         // followers_count
//         // following_count
//         // is_following
//         // ----------------------------------------------------

//         const profileResponse =
//           await dispatch(
//             getProfile(userId)
//           ).unwrap();

//         console.log(
//           "===================================="
//         );

//         console.log(
//           "👤 PROFILE RESPONSE"
//         );

//         console.log(
//           profileResponse
//         );

//         console.log(
//           "POSTS COUNT =>",
//           profileResponse?.posts_count
//         );

//         console.log(
//           "FOLLOWERS COUNT =>",
//           profileResponse?.followers_count
//         );

//         console.log(
//           "FOLLOWING COUNT =>",
//           profileResponse?.following_count
//         );

//         console.log(
//           "REELS COUNT =>",
//           profileResponse?.reels_count
//         );

//         console.log(
//           "IS FOLLOWING =>",
//           profileResponse?.is_following
//         );

//         console.log(
//           "===================================="
//         );

//         // ----------------------------------------------------
//         // USER POSTS
//         // ----------------------------------------------------

//         await dispatch(
//           getUserPosts(userId)
//         ).unwrap();

//         // ----------------------------------------------------
//         // USER REELS
//         // ----------------------------------------------------

//         await dispatch(
//           getUserReels({
//             userId,
//             limit: 20,
//             offset: 0,
//           })
//         ).unwrap();

//       } catch (error) {
//         console.log(
//           "USER PROFILE LOAD ERROR =>",
//           error
//         );
//       }
//     },
//     [
//       dispatch,
//       userId,
//     ]
//   );

//   // ==========================================================
//   // INITIAL LOAD
//   // ==========================================================

//   useEffect(() => {
//     loadUserProfile();
//   }, [
//     loadUserProfile,
//   ]);

//   // ==========================================================
//   // REFRESH
//   // ==========================================================

//   const handleRefresh = useCallback(
//     async () => {
//       setRefreshing(true);

//       try {
//         await loadUserProfile();
//       } finally {
//         setRefreshing(false);
//       }
//     },
//     [
//       loadUserProfile,
//     ]
//   );

//   // ==========================================================
//   // FOLLOW / UNFOLLOW
//   // ==========================================================

//   const handleFollowPress = useCallback(
//     async () => {
//       if (
//         !userId ||
//         followLoading
//       ) {
//         return;
//       }

//       try {
//         console.log(
//           "===================================="
//         );

//         console.log(
//           isFollowing
//             ? "🔴 UNFOLLOW USER"
//             : "🟢 FOLLOW USER"
//         );

//         console.log(
//           "TARGET USER ID =>",
//           userId
//         );

//         console.log(
//           "CURRENT is_following =>",
//           isFollowing
//         );

//         console.log(
//           "===================================="
//         );

//         if (isFollowing) {
//           await dispatch(
//             unfollowUser(userId)
//           ).unwrap();
//         } else {
//           await dispatch(
//             followUser(userId)
//           ).unwrap();
//         }

//         // ----------------------------------------------------
//         // GET PROFILE AGAIN
//         //
//         // API is the source of truth for is_following.
//         // ----------------------------------------------------

//         const updatedProfile =
//           await dispatch(
//             getProfile(userId)
//           ).unwrap();

//         console.log(
//           "===================================="
//         );

//         console.log(
//           "🔄 UPDATED PROFILE AFTER FOLLOW ACTION"
//         );

//         console.log(
//           "IS FOLLOWING =>",
//           updatedProfile?.is_following
//         );

//         console.log(
//           "FOLLOWERS =>",
//           updatedProfile?.followers_count
//         );

//         console.log(
//           "===================================="
//         );

//       } catch (error) {
//         console.log(
//           "FOLLOW / UNFOLLOW ERROR =>",
//           error
//         );
//       }
//     },
//     [
//       dispatch,
//       userId,
//       isFollowing,
//       followLoading,
//     ]
//   );

//   // ==========================================================
//   // INVALID USER ID
//   // ==========================================================

//   if (!userId) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.errorText}>
//           User ID is missing
//         </Text>
//       </View>
//     );
//   }

//   // ==========================================================
//   // INITIAL LOADING
//   // ==========================================================

//   if (
//     profileLoading &&
//     !profile
//   ) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator
//           size="large"
//         />
//       </View>
//     );
//   }

//   // ==========================================================
//   // PROFILE ERROR
//   // ==========================================================

//   if (
//     !profile &&
//     profileError
//   ) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.errorText}>
//           Failed to load profile
//         </Text>

//         <TouchableOpacity
//           style={styles.retryButton}
//           onPress={loadUserProfile}
//         >
//           <Text style={styles.retryText}>
//             Retry
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   // ==========================================================
//   // PROFILE DATA
//   // ==========================================================

//   const avatar =
//     profile?.avatar_url;

//   const username =
//     profile?.username ?? "";

//   const fullName =
//     profile?.full_name ?? "";

//   const bio =
//     profile?.bio ?? "";

//   const isPrivate =
//     profile?.is_private === true;

//   // ==========================================================
//   // CURRENT TAB DATA
//   // ==========================================================

//   const currentData =
//     selectedTab === "posts"
//       ? userPosts
//       : userReels;

//   const currentLoading =
//     selectedTab === "posts"
//       ? postsLoading
//       : reelsLoading;

//   // ==========================================================
//   // RENDER GRID ITEM
//   // ==========================================================

//   const renderGridItem = ({
//     item,
//   }) => {
//     const imageUri =
//       selectedTab === "posts"
//         ? (
//             item?.image_url ??
//             item?.media_url ??
//             item?.thumbnail_url ??
//             item?.file_url
//           )
//         : (
//             item?.thumbnail_url ??
//             item?.cover_url ??
//             item?.image_url
//           );

//     return (
//       <TouchableOpacity
//         activeOpacity={0.9}
//         style={styles.gridItem}
//         onPress={() => {
//           console.log(
//             "SELECTED ITEM =>",
//             item
//           );
//         }}
//       >
//         {imageUri ? (
//           <Image
//             source={{
//               uri: imageUri,
//             }}
//             style={styles.gridImage}
//           />
//         ) : (
//           <View
//             style={styles.emptyMedia}
//           >
//             <Ionicons
//               name={
//                 selectedTab === "reels"
//                   ? "videocam-outline"
//                   : "image-outline"
//               }
//               size={28}
//               color="#777"
//             />
//           </View>
//         )}

//         {selectedTab === "reels" && (
//           <View
//             style={styles.reelIcon}
//           >
//             <Ionicons
//               name="play"
//               size={15}
//               color="#fff"
//             />
//           </View>
//         )}
//       </TouchableOpacity>
//     );
//   };

//   // ==========================================================
//   // EMPTY TAB
//   // ==========================================================

//   const renderEmpty = () => {
//     if (currentLoading) {
//       return (
//         <View
//           style={styles.emptyContainer}
//         >
//           <ActivityIndicator />
//         </View>
//       );
//     }

//     if (
//       selectedTab === "posts" &&
//       postsError
//     ) {
//       return (
//         <View
//           style={styles.emptyContainer}
//         >
//           <Ionicons
//             name="alert-circle-outline"
//             size={42}
//             color="#777"
//           />

//           <Text
//             style={styles.emptyText}
//           >
//             Failed to load posts
//           </Text>
//         </View>
//       );
//     }

//     if (
//       selectedTab === "reels" &&
//       reelsError
//     ) {
//       return (
//         <View
//           style={styles.emptyContainer}
//         >
//           <Ionicons
//             name="alert-circle-outline"
//             size={42}
//             color="#777"
//           />

//           <Text
//             style={styles.emptyText}
//           >
//             Failed to load reels
//           </Text>
//         </View>
//       );
//     }

//     return (
//       <View
//         style={styles.emptyContainer}
//       >
//         <View
//           style={styles.emptyIconCircle}
//         >
//           <Ionicons
//             name={
//               selectedTab === "posts"
//                 ? "camera-outline"
//                 : "videocam-outline"
//             }
//             size={38}
//             color="#222"
//           />
//         </View>

//         <Text
//           style={styles.emptyTitle}
//         >
//           {selectedTab === "posts"
//             ? "No Posts Yet"
//             : "No Reels Yet"}
//         </Text>

//         <Text
//           style={styles.emptyText}
//         >
//           {selectedTab === "posts"
//             ? "When this user shares photos or videos, they'll appear here."
//             : "When this user shares reels, they'll appear here."}
//         </Text>
//       </View>
//     );
//   };

//   // ==========================================================
//   // SCREEN
//   // ==========================================================

//   return (
//     <View
//       style={styles.container}
//     >

//       {/* ====================================================
//           HEADER
//       ==================================================== */}

//       <View
//         style={styles.header}
//       >
//         <TouchableOpacity
//           onPress={() =>
//             router.back()
//           }
//           style={styles.headerButton}
//           activeOpacity={0.7}
//         >
//           <Ionicons
//             name="arrow-back"
//             size={25}
//             color="#111"
//           />
//         </TouchableOpacity>

//         <Text
//           style={styles.headerUsername}
//           numberOfLines={1}
//         >
//           {username}
//         </Text>

//         <TouchableOpacity
//           style={styles.headerButton}
//           activeOpacity={0.7}
//         >
//           <Ionicons
//             name="ellipsis-horizontal"
//             size={24}
//             color="#111"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* ====================================================
//           PROFILE + CONTENT
//       ==================================================== */}

//       <FlatList
//         data={currentData}

//         keyExtractor={(
//           item,
//           index
//         ) =>
//           String(
//             item?.id ?? index
//           )
//         }

//         numColumns={3}

//         renderItem={
//           renderGridItem
//         }

//         ListHeaderComponent={
//           <View>

//             {/* ================================================
//                 PROFILE SECTION
//             ================================================= */}

//             <View
//               style={
//                 styles.profileSection
//               }
//             >

//               {/* ==============================================
//                   TOP PROFILE ROW
//               =============================================== */}

//               <View
//                 style={
//                   styles.topProfileRow
//                 }
//               >

//                 {/* AVATAR */}

//                 <View
//                   style={
//                     styles.avatarContainer
//                   }
//                 >
//                   {avatar ? (
//                     <Image
//                       source={{
//                         uri: avatar,
//                       }}
//                       style={
//                         styles.avatar
//                       }
//                     />
//                   ) : (
//                     <View
//                       style={
//                         styles.avatarPlaceholder
//                       }
//                     >
//                       <Ionicons
//                         name="person"
//                         size={42}
//                         color="#777"
//                       />
//                     </View>
//                   )}
//                 </View>

//                 {/* STATS */}

//                 <View
//                   style={
//                     styles.statsRow
//                   }
//                 >

//                   {/* POSTS */}

//                   <View
//                     style={
//                       styles.statItem
//                     }
//                   >
//                     <Text
//                       style={
//                         styles.statNumber
//                       }
//                     >
//                       {postsCount}
//                     </Text>

//                     <Text
//                       style={
//                         styles.statLabel
//                       }
//                     >
//                       Posts
//                     </Text>
//                   </View>

//                   {/* FOLLOWERS */}

//                   <View
//                     style={
//                       styles.statItem
//                     }
//                   >
//                     <Text
//                       style={
//                         styles.statNumber
//                       }
//                     >
//                       {followersCount}
//                     </Text>

//                     <Text
//                       style={
//                         styles.statLabel
//                       }
//                     >
//                       Followers
//                     </Text>
//                   </View>

//                   {/* FOLLOWING */}

//                   <View
//                     style={
//                       styles.statItem
//                     }
//                   >
//                     <Text
//                       style={
//                         styles.statNumber
//                       }
//                     >
//                       {followingCount}
//                     </Text>

//                     <Text
//                       style={
//                         styles.statLabel
//                       }
//                     >
//                       Following
//                     </Text>
//                   </View>

//                 </View>

//               </View>

//               {/* ==============================================
//                   FULL NAME
//               =============================================== */}

//               {!!fullName && (
//                 <Text
//                   style={
//                     styles.fullName
//                   }
//                 >
//                   {fullName}
//                 </Text>
//               )}

//               {/* ==============================================
//                   USERNAME
//               =============================================== */}

//               <Text
//                 style={
//                   styles.username
//                 }
//               >
//                 @{username}
//               </Text>

//               {/* ==============================================
//                   BIO
//               =============================================== */}

//               {!!bio && (
//                 <Text
//                   style={styles.bio}
//                 >
//                   {bio}
//                 </Text>
//               )}

//               {/* ==============================================
//                   PRIVATE ACCOUNT
//               =============================================== */}

//               {isPrivate && (
//                 <View
//                   style={
//                     styles.privateRow
//                   }
//                 >
//                   <Ionicons
//                     name="lock-closed-outline"
//                     size={14}
//                     color="#555"
//                   />

//                   <Text
//                     style={
//                       styles.privateText
//                     }
//                   >
//                     Private account
//                   </Text>
//                 </View>
//               )}

//               {/* ==============================================
//                   FOLLOW / UNFOLLOW
//               =============================================== */}

//               <TouchableOpacity
//                 style={[
//                   styles.followButton,
//                   isFollowing &&
//                     styles.unfollowButton,
//                 ]}
//                 onPress={
//                   handleFollowPress
//                 }
//                 disabled={
//                   followLoading
//                 }
//                 activeOpacity={0.8}
//               >

//                 {followLoading ? (
//                   <ActivityIndicator
//                     size="small"
//                     color={
//                       isFollowing
//                         ? "#111"
//                         : "#fff"
//                     }
//                   />
//                 ) : (
//                   <Text
//                     style={[
//                       styles.followButtonText,
//                       isFollowing &&
//                         styles.unfollowButtonText,
//                     ]}
//                   >
//                     {isFollowing
//                       ? "Unfollow"
//                       : "Follow"}
//                   </Text>
//                 )}

//               </TouchableOpacity>

//             </View>

//             {/* ================================================
//                 TABS
//             ================================================= */}

//             <View
//               style={styles.tabs}
//             >

//               {/* POSTS TAB */}

//               <TouchableOpacity
//                 style={[
//                   styles.tab,
//                   selectedTab ===
//                     "posts" &&
//                     styles.activeTab,
//                 ]}
//                 onPress={() =>
//                   setSelectedTab(
//                     "posts"
//                   )
//                 }
//                 activeOpacity={0.7}
//               >
//                 <Ionicons
//                   name="grid-outline"
//                   size={23}
//                   color={
//                     selectedTab ===
//                     "posts"
//                       ? "#111"
//                       : "#999"
//                   }
//                 />
//               </TouchableOpacity>

//               {/* REELS TAB */}

//               <TouchableOpacity
//                 style={[
//                   styles.tab,
//                   selectedTab ===
//                     "reels" &&
//                     styles.activeTab,
//                 ]}
//                 onPress={() =>
//                   setSelectedTab(
//                     "reels"
//                   )
//                 }
//                 activeOpacity={0.7}
//               >
//                 <Ionicons
//                   name="play-circle-outline"
//                   size={25}
//                   color={
//                     selectedTab ===
//                     "reels"
//                       ? "#111"
//                       : "#999"
//                   }
//                 />
//               </TouchableOpacity>

//             </View>

//           </View>
//         }

//         ListEmptyComponent={
//           renderEmpty
//         }

//         refreshControl={
//           <RefreshControl
//             refreshing={
//               refreshing
//             }
//             onRefresh={
//               handleRefresh
//             }
//           />
//         }

//         contentContainerStyle={
//           currentData.length === 0
//             ? styles.emptyList
//             : undefined
//         }

//         showsVerticalScrollIndicator={
//           false
//         }
//       />

//     </View>
//   );
// }

// // ============================================================
// // STYLES
// // ============================================================

// const styles =
//   StyleSheet.create({

//     // ========================================================
//     // CONTAINER
//     // ========================================================

//     container: {
//       flex: 1,
//       backgroundColor: "#fff",
//       paddingTop: 40,
//     },

//     center: {
//       flex: 1,
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: "#fff",
//     },

//     errorText: {
//       fontSize: 15,
//       color: "#555",
//       marginBottom: 15,
//     },

//     retryButton: {
//       paddingHorizontal: 25,
//       paddingVertical: 10,
//       borderRadius: 8,
//       backgroundColor: "#111",
//     },

//     retryText: {
//       color: "#fff",
//       fontWeight: "600",
//     },

//     // ========================================================
//     // HEADER
//     // ========================================================

//     header: {
//       height: 55,
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//       paddingHorizontal: 12,
//       borderBottomWidth: 0.5,
//       borderBottomColor: "#ddd",
//       backgroundColor: "#fff",
//     },

//     headerButton: {
//       width: 40,
//       height: 40,
//       alignItems: "center",
//       justifyContent: "center",
//     },

//     headerUsername: {
//       flex: 1,
//       textAlign: "center",
//       fontSize: 17,
//       fontWeight: "700",
//       color: "#111",
//     },

//     // ========================================================
//     // PROFILE
//     // ========================================================

//     profileSection: {
//       paddingHorizontal: 16,
//       paddingTop: 20,
//       paddingBottom: 14,
//       backgroundColor: "#fff",
//     },

//     topProfileRow: {
//       flexDirection: "row",
//       alignItems: "center",
//     },

//     avatarContainer: {
//       marginRight: 24,
//     },

//     avatar: {
//       width: 88,
//       height: 88,
//       borderRadius: 44,
//       backgroundColor: "#eee",
//     },

//     avatarPlaceholder: {
//       width: 88,
//       height: 88,
//       borderRadius: 44,
//       backgroundColor: "#eee",
//       alignItems: "center",
//       justifyContent: "center",
//     },

//     statsRow: {
//       flex: 1,
//       flexDirection: "row",
//       justifyContent: "space-around",
//       alignItems: "center",
//     },

//     statItem: {
//       alignItems: "center",
//       minWidth: 60,
//     },

//     statNumber: {
//       fontSize: 18,
//       fontWeight: "700",
//       color: "#111",
//     },

//     statLabel: {
//       marginTop: 4,
//       fontSize: 13,
//       color: "#555",
//     },

//     fullName: {
//       marginTop: 14,
//       fontSize: 15,
//       fontWeight: "700",
//       color: "#111",
//     },

//     username: {
//       marginTop: 3,
//       fontSize: 14,
//       color: "#555",
//     },

//     bio: {
//       marginTop: 8,
//       fontSize: 14,
//       lineHeight: 20,
//       color: "#333",
//     },

//     privateRow: {
//       flexDirection: "row",
//       alignItems: "center",
//       marginTop: 8,
//     },

//     privateText: {
//       marginLeft: 5,
//       fontSize: 13,
//       color: "#666",
//     },

//     // ========================================================
//     // FOLLOW / UNFOLLOW
//     // ========================================================

//     followButton: {
//       marginTop: 15,
//       height: 40,
//       borderRadius: 8,
//       backgroundColor: "#111",
//       alignItems: "center",
//       justifyContent: "center",
//     },

//     followButtonText: {
//       color: "#fff",
//       fontSize: 14,
//       fontWeight: "700",
//     },

//     unfollowButton: {
//       backgroundColor: "#fff",
//       borderWidth: 1,
//       borderColor: "#111",
//     },

//     unfollowButtonText: {
//       color: "#111",
//     },

//     // ========================================================
//     // TABS
//     // ========================================================

//     tabs: {
//       height: 48,
//       flexDirection: "row",
//       borderTopWidth: 0.5,
//       borderBottomWidth: 0.5,
//       borderColor: "#ddd",
//       backgroundColor: "#fff",
//     },

//     tab: {
//       flex: 1,
//       alignItems: "center",
//       justifyContent: "center",
//     },

//     activeTab: {
//       borderBottomWidth: 2,
//       borderBottomColor: "#111",
//     },

//     // ========================================================
//     // GRID
//     // ========================================================

//     gridItem: {
//       width: ITEM_SIZE,
//       height: ITEM_SIZE,
//       marginRight: GRID_GAP,
//       marginBottom: GRID_GAP,
//       position: "relative",
//       backgroundColor: "#eee",
//     },

//     gridImage: {
//       width: "100%",
//       height: "100%",
//       backgroundColor: "#eee",
//     },

//     emptyMedia: {
//       flex: 1,
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: "#eee",
//     },

//     reelIcon: {
//       position: "absolute",
//       right: 7,
//       top: 7,
//     },

//     // ========================================================
//     // EMPTY
//     // ========================================================

//     emptyContainer: {
//       minHeight: 280,
//       alignItems: "center",
//       justifyContent: "center",
//       paddingHorizontal: 35,
//     },

//     emptyIconCircle: {
//       width: 75,
//       height: 75,
//       borderRadius: 38,
//       borderWidth: 2,
//       borderColor: "#222",
//       alignItems: "center",
//       justifyContent: "center",
//       marginBottom: 14,
//     },

//     emptyTitle: {
//       fontSize: 17,
//       fontWeight: "700",
//       color: "#111",
//       marginBottom: 6,
//     },

//     emptyText: {
//       fontSize: 13,
//       color: "#777",
//       textAlign: "center",
//       lineHeight: 19,
//     },

//     emptyList: {
//       flexGrow: 1,
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
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Dimensions,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useDispatch,
  useSelector,
} from "react-redux";

// ============================================================
// REDUX
// ============================================================

import {
  getProfile,
  selectProfile,
  selectProfileLoading,
  selectProfileError,
} from "../../src/redux/profileSlice";

import {
  getUserPosts,
} from "../../src/redux/postSlice";

import {
  getUserReels,
} from "../../src/redux/reelsSlice";

import { createConversation } from "../../src/redux/chatSlice"

import {
  followUser,
  unfollowUser,
  selectFollowLoading,
} from "../../src/redux/followSlice";

// ============================================================
// SCREEN
// ============================================================

const { width } = Dimensions.get("window");

const GRID_GAP = 2;
const GRID_COLUMNS = 3;

const ITEM_SIZE =
  (width - GRID_GAP * (GRID_COLUMNS - 1)) /
  GRID_COLUMNS;

// ============================================================
// USER PROFILE
// ============================================================

export default function UserProfile() {
  const router = useRouter();
  const dispatch = useDispatch();

  // ==========================================================
  // GET USER ID FROM ROUTE
  // ==========================================================

  const params = useLocalSearchParams();

  const rawUserId = params?.userId;

  const userId = useMemo(() => {
    if (Array.isArray(rawUserId)) {
      return rawUserId[0];
    }

    return rawUserId;
  }, [rawUserId]);

  // ==========================================================
  // PROFILE
  // ==========================================================

  const profile = useSelector(
    (state) =>
      selectProfile(
        state,
        userId
      )
  );

  const profileLoading = useSelector(
    selectProfileLoading
  );

  const profileError = useSelector(
    selectProfileError
  );

  // ==========================================================
  // FOLLOW LOADING
  // ==========================================================

  const followLoading = useSelector(
    selectFollowLoading
  );

  // ==========================================================
  // POSTS
  // ==========================================================

  const allUserPosts = useSelector(
    (state) =>
      state.posts?.userPosts ?? []
  );

  const postsLoading = useSelector(
    (state) =>
      state.posts?.postsLoading ?? false
  );

  const postsError = useSelector(
    (state) =>
      state.posts?.postsError ?? null
  );

  // ==========================================================
  // REELS
  // ==========================================================

  const allUserReels = useSelector(
    (state) =>
      state.reels?.userReels ?? []
  );

  const reelsLoading = useSelector(
    (state) =>
      state.reels?.userReelsLoading ?? false
  );

  const reelsError = useSelector(
    (state) =>
      state.reels?.userReelsError ?? null
  );

  // ==========================================================
  // LOCAL UI
  // ==========================================================

  const [
    selectedTab,
    setSelectedTab,
  ] = useState("posts");

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  // ==========================================================
  // IS FOLLOWING
  //
  // SOURCE OF TRUTH:
  // GET /api/users/{user_id}
  //
  // profile:
  // {
  //   ...
  //   is_following: true
  // }
  // ==========================================================

  const isFollowing =
    profile?.is_following === true;

  // ==========================================================
  // CURRENT PROFILE COUNTS
  //
  // IMPORTANT:
  // These MUST come from GET /api/users/{user_id}
  // and NOT statsSlice.
  // ==========================================================

  const postsCount =
    Number(profile?.posts_count ?? 0);

  const reelsCount =
    Number(profile?.reels_count ?? 0);

  const followersCount =
    Number(profile?.followers_count ?? 0);

  const followingCount =
    Number(profile?.following_count ?? 0);

  // ==========================================================
  // FILTER POSTS BY CURRENT USER
  //
  // This prevents Srinivas's post from appearing
  // on TestUser1's profile.
  // ==========================================================

  const userPosts = useMemo(() => {
    if (!userId) {
      return [];
    }

    return allUserPosts.filter(
      (item) =>
        String(item?.user_id) ===
        String(userId)
    );
  }, [
    allUserPosts,
    userId,
  ]);

  // ==========================================================
  // FILTER REELS BY CURRENT USER
  // ==========================================================

  const userReels = useMemo(() => {
    if (!userId) {
      return [];
    }

    return allUserReels.filter(
      (item) =>
        String(item?.user_id) ===
        String(userId)
    );
  }, [
    allUserReels,
    userId,
  ]);

  // ==========================================================
  // LOAD USER PROFILE
  // ==========================================================

  const loadUserProfile = useCallback(
    async () => {
      if (!userId) {
        return;
      }

      console.log(
        "===================================="
      );

      console.log(
        "👤 USER PROFILE SCREEN"
      );

      console.log(
        "USER ID =>",
        userId
      );

      console.log(
        "===================================="
      );

      try {
        // ----------------------------------------------------
        // GET PROFILE
        // GET /api/users/{user_id}
        //
        // This response contains:
        //
        // posts_count
        // reels_count
        // followers_count
        // following_count
        // is_following
        // ----------------------------------------------------

        const profileResponse =
          await dispatch(
            getProfile(userId)
          ).unwrap();

        console.log(
          "===================================="
        );

        console.log(
          "👤 PROFILE RESPONSE"
        );

        console.log(
          profileResponse
        );

        console.log(
          "POSTS COUNT =>",
          profileResponse?.posts_count
        );

        console.log(
          "FOLLOWERS COUNT =>",
          profileResponse?.followers_count
        );

        console.log(
          "FOLLOWING COUNT =>",
          profileResponse?.following_count
        );

        console.log(
          "REELS COUNT =>",
          profileResponse?.reels_count
        );

        console.log(
          "IS FOLLOWING =>",
          profileResponse?.is_following
        );

        console.log(
          "===================================="
        );

        // ----------------------------------------------------
        // USER POSTS
        // ----------------------------------------------------

        await dispatch(
          getUserPosts(userId)
        ).unwrap();

        // ----------------------------------------------------
        // USER REELS
        // ----------------------------------------------------

        await dispatch(
          getUserReels({
            userId,
            limit: 20,
            offset: 0,
          })
        ).unwrap();

      } catch (error) {
        console.log(
          "USER PROFILE LOAD ERROR =>",
          error
        );
      }
    },
    [
      dispatch,
      userId,
    ]
  );

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    loadUserProfile();
  }, [
    loadUserProfile,
  ]);

  // ==========================================================
  // REFRESH
  // ==========================================================

  const handleRefresh = useCallback(
    async () => {
      setRefreshing(true);

      try {
        await loadUserProfile();
      } finally {
        setRefreshing(false);
      }
    },
    [
      loadUserProfile,
    ]
  );

  // ==========================================================
  // FOLLOW / UNFOLLOW
  // ==========================================================

  const handleFollowPress = useCallback(
    async () => {
      if (
        !userId ||
        followLoading
      ) {
        return;
      }

      try {
        console.log(
          "===================================="
        );

        console.log(
          isFollowing
            ? "🔴 UNFOLLOW USER"
            : "🟢 FOLLOW USER"
        );

        console.log(
          "TARGET USER ID =>",
          userId
        );

        console.log(
          "CURRENT is_following =>",
          isFollowing
        );

        console.log(
          "===================================="
        );

        if (isFollowing) {
          await dispatch(
            unfollowUser(userId)
          ).unwrap();
        } else {
          await dispatch(
            followUser(userId)
          ).unwrap();
        }

        // ----------------------------------------------------
        // GET PROFILE AGAIN
        //
        // API is the source of truth for is_following.
        // ----------------------------------------------------

        const updatedProfile =
          await dispatch(
            getProfile(userId)
          ).unwrap();

        console.log(
          "===================================="
        );

        console.log(
          "🔄 UPDATED PROFILE AFTER FOLLOW ACTION"
        );

        console.log(
          "IS FOLLOWING =>",
          updatedProfile?.is_following
        );

        console.log(
          "FOLLOWERS =>",
          updatedProfile?.followers_count
        );

        console.log(
          "===================================="
        );

      } catch (error) {
        console.log(
          "FOLLOW / UNFOLLOW ERROR =>",
          error
        );
      }
    },
    [
      dispatch,
      userId,
      isFollowing,
      followLoading,
    ]
  );

  // ==========================================================
  // INVALID USER ID
  // ==========================================================

  if (!userId) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          User ID is missing
        </Text>
      </View>
    );
  }

  // ==========================================================
  // INITIAL LOADING
  // ==========================================================

  if (
    profileLoading &&
    !profile
  ) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#fff"
        />
      </View>
    );
  }

  // ==========================================================
  // PROFILE ERROR
  // ==========================================================

  if (
    !profile &&
    profileError
  ) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Failed to load profile
        </Text>

        <TouchableOpacity
          style={styles.retryButton}
          onPress={loadUserProfile}
        >
          <Text style={styles.retryText}>
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ==========================================================
  // PROFILE DATA
  // ==========================================================

  const avatar =
    profile?.avatar_url;

  const username =
    profile?.username ?? "";

  const fullName =
    profile?.full_name ?? "";

  const bio =
    profile?.bio ?? "";

  const isPrivate =
    profile?.is_private === true;

  // ==========================================================
  // CURRENT TAB DATA
  // ==========================================================

  const currentData =
    selectedTab === "posts"
      ? userPosts
      : userReels;

  const currentLoading =
    selectedTab === "posts"
      ? postsLoading
      : reelsLoading;

  // ==========================================================
  // RENDER GRID ITEM
  // ==========================================================

  const renderGridItem = ({
    item,
  }) => {
    const imageUri =
      selectedTab === "posts"
        ? (
            item?.image_url ??
            item?.media_url ??
            item?.thumbnail_url ??
            item?.file_url
          )
        : (
            item?.thumbnail_url ??
            item?.cover_url ??
            item?.image_url
          );

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.gridItem}
        onPress={() => {
          console.log(
            "SELECTED ITEM =>",
            item
          );
        }}
      >
        {imageUri ? (
          <Image
            source={{
              uri: imageUri,
            }}
            style={styles.gridImage}
          />
        ) : (
          <View
            style={styles.emptyMedia}
          >
            <Ionicons
              name={
                selectedTab === "reels"
                  ? "videocam-outline"
                  : "image-outline"
              }
              size={28}
              color="#555"
            />
          </View>
        )}

        {selectedTab === "reels" && (
          <View
            style={styles.reelIcon}
          >
            <Ionicons
              name="play"
              size={15}
              color="#fff"
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // ==========================================================
  // EMPTY TAB
  // ==========================================================

  const renderEmpty = () => {
    if (currentLoading) {
      return (
        <View
          style={styles.emptyContainer}
        >
          <ActivityIndicator color="#fff" />
        </View>
      );
    }

    if (
      selectedTab === "posts" &&
      postsError
    ) {
      return (
        <View
          style={styles.emptyContainer}
        >
          <Ionicons
            name="alert-circle-outline"
            size={42}
            color="#555"
          />

          <Text
            style={styles.emptyText}
          >
            Failed to load posts
          </Text>
        </View>
      );
    }

    if (
      selectedTab === "reels" &&
      reelsError
    ) {
      return (
        <View
          style={styles.emptyContainer}
        >
          <Ionicons
            name="alert-circle-outline"
            size={42}
            color="#555"
          />

          <Text
            style={styles.emptyText}
          >
            Failed to load reels
          </Text>
        </View>
      );
    }

    return (
      <View
        style={styles.emptyContainer}
      >
        <View
          style={styles.emptyIconCircle}
        >
          <Ionicons
            name={
              selectedTab === "posts"
                ? "camera-outline"
                : "videocam-outline"
            }
            size={38}
            color="#666"
          />
        </View>

        <Text
          style={styles.emptyTitle}
        >
          {selectedTab === "posts"
            ? "No Posts Yet"
            : "No Reels Yet"}
        </Text>

        <Text
          style={styles.emptyText}
        >
          {selectedTab === "posts"
            ? "When this user shares photos or videos, they'll appear here."
            : "When this user shares reels, they'll appear here."}
        </Text>
      </View>
    );
  };

  // ==========================================================
  // SCREEN
  // ==========================================================

  return (
    <View
      style={styles.container}
    >

      {/* ====================================================
          HEADER
      ==================================================== */}

      <View
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() =>
            router.back()
          }
          style={styles.headerButton}
          activeOpacity={0.7}
        >
          <Ionicons
            name="arrow-back"
            size={25}
            color="#fff"
          />
        </TouchableOpacity>

        <Text
          style={styles.headerUsername}
          numberOfLines={1}
        >
          {username}
        </Text>

        <TouchableOpacity
          style={styles.headerButton}
          activeOpacity={0.7}
        >
          <Ionicons
            name="ellipsis-vertical"
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* ====================================================
          PROFILE + CONTENT
      ==================================================== */}

      <FlatList
        data={currentData}

        keyExtractor={(
          item,
          index
        ) =>
          String(
            item?.id ?? index
          )
        }

        numColumns={3}

        renderItem={
          renderGridItem
        }

        ListHeaderComponent={
          <View>

            {/* ================================================
                PROFILE SECTION
            ================================================= */}

            <View
              style={
                styles.profileSection
              }
            >

              {/* ==============================================
                  TOP PROFILE ROW
              =============================================== */}

              <View
                style={
                  styles.topProfileRow
                }
              >

                {/* AVATAR */}

                <View
                  style={
                    styles.avatarContainer
                  }
                >
                  {avatar ? (
                    <Image
                      source={{
                        uri: avatar,
                      }}
                      style={
                        styles.avatar
                      }
                    />
                  ) : (
                    <View
                      style={
                        styles.avatarPlaceholder
                      }
                    >
                      <Ionicons
                        name="person"
                        size={38}
                        color="#777"
                      />
                    </View>
                  )}
                </View>

                {/* STATS */}

                <View
                  style={
                    styles.statsRow
                  }
                >

                  {/* POSTS */}

                  <View
                    style={
                      styles.statItem
                    }
                  >
                    <Text
                      style={
                        styles.statNumber
                      }
                    >
                      {postsCount}
                    </Text>

                    <Text
                      style={
                        styles.statLabel
                      }
                    >
                      posts
                    </Text>
                  </View>

                  {/* FOLLOWERS */}

                  <View
                    style={
                      styles.statItem
                    }
                  >
                    <Text
                      style={
                        styles.statNumber
                      }
                    >
                      {followersCount}
                    </Text>

                    <Text
                      style={
                        styles.statLabel
                      }
                    >
                      followers
                    </Text>
                  </View>

                  {/* FOLLOWING */}

                  <View
                    style={
                      styles.statItem
                    }
                  >
                    <Text
                      style={
                        styles.statNumber
                      }
                    >
                      {followingCount}
                    </Text>

                    <Text
                      style={
                        styles.statLabel
                      }
                    >
                      following
                    </Text>
                  </View>

                </View>

              </View>

              {/* ==============================================
                  FULL NAME
              =============================================== */}

              {!!fullName && (
                <Text
                  style={
                    styles.fullName
                  }
                >
                  {fullName}
                </Text>
              )}

              {/* ==============================================
                  USERNAME
              =============================================== */}

              <Text
                style={
                  styles.username
                }
              >
                @{username}
              </Text>

              {/* ==============================================
                  BIO
              =============================================== */}

              {!!bio && (
                <Text
                  style={styles.bio}
                >
                  {bio}
                </Text>
              )}

              {/* ==============================================
                  PRIVATE ACCOUNT
              =============================================== */}

              {isPrivate && (
                <View
                  style={
                    styles.privateRow
                  }
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={14}
                    color="#999"
                  />

                  <Text
                    style={
                      styles.privateText
                    }
                  >
                    Private account
                  </Text>
                </View>
              )}

              {/* ==============================================
                  FOLLOW / UNFOLLOW ROW

                  Same handleFollowPress / isFollowing / followLoading
                  as before — only the layout changed to a 3-part row
                  (Following▾ / Message / +person) when following,
                  matching the reference screenshot. The extra
                  Message / +person buttons are visual only (no
                  behavior was defined for them before, so none is
                  added now) — the actual follow toggle is still the
                  single onPress={handleFollowPress} call it always was.
              =============================================== */}

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={[
                    styles.primaryActionBtn,
                    isFollowing &&
                      styles.followingBtn,
                  ]}
                  onPress={
                    handleFollowPress
                  }
                  disabled={
                    followLoading
                  }
                  activeOpacity={0.8}
                >
                  {followLoading ? (
                    <ActivityIndicator
                      size="small"
                      color="#fff"
                    />
                  ) : isFollowing ? (
                    <View style={styles.followingBtnContent}>
                      <Text style={styles.actionBtnText}>
                        Following
                      </Text>
                      <Ionicons
                        name="chevron-down"
                        size={14}
                        color="#fff"
                        style={{ marginLeft: 4 }}
                      />
                    </View>
                  ) : (
                    <Text
                      style={[
                        styles.actionBtnText,
                        styles.followBtnText,
                      ]}
                    >
                      Follow
                    </Text>
                  )}
                </TouchableOpacity>

                {/* <TouchableOpacity
                  style={styles.secondaryActionBtn}
                  activeOpacity={0.8}
                >
                  <Text style={styles.actionBtnText}>
                    Message
                  </Text>
                </TouchableOpacity> */}
                <TouchableOpacity
  style={styles.secondaryActionBtn}
  activeOpacity={0.8}
  onPress={async () => {
    if (!userId) {
      console.log("❌ USER ID NOT FOUND");
      return;
    }

    try {
      console.log("====================================");
      console.log("💬 MESSAGE BUTTON PRESSED");
      console.log("TARGET USER ID =>", userId);
      console.log("TARGET USERNAME =>", username);
      console.log("====================================");

      const conversation =
        await dispatch(
          createConversation({
            participant_ids: [Number(userId)],
          })
        ).unwrap();

      console.log(
        "✅ CONVERSATION CREATED/FOUND =>",
        conversation
      );

      if (!conversation?.id) {
        console.log(
          "❌ CONVERSATION ID NOT FOUND",
          conversation
        );
        return;
      }

      router.push({
        pathname: "/chat/[conversationId]",
        params: {
          conversationId: String(
            conversation.id
          ),
        },
      });
    } catch (error) {
      console.log(
        "❌ CREATE CONVERSATION ERROR =>",
        error
      );
    }
  }}
>
  <Text style={styles.actionBtnText}>
    Message
  </Text>
</TouchableOpacity>

                {isFollowing && (
                  <TouchableOpacity
                    style={styles.iconActionBtn}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name="person-add-outline"
                      size={18}
                      color="#fff"
                    />
                  </TouchableOpacity>
                )}
              </View>

            </View>

            {/* ================================================
                TABS
            ================================================= */}

            <View
              style={styles.tabs}
            >

              {/* POSTS TAB */}

              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedTab ===
                    "posts" &&
                    styles.activeTab,
                ]}
                onPress={() =>
                  setSelectedTab(
                    "posts"
                  )
                }
                activeOpacity={0.7}
              >
                <Ionicons
                  name="grid-outline"
                  size={23}
                  color={
                    selectedTab ===
                    "posts"
                      ? "#fff"
                      : "#666"
                  }
                />
              </TouchableOpacity>

              {/* REELS TAB */}

              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedTab ===
                    "reels" &&
                    styles.activeTab,
                ]}
                onPress={() =>
                  setSelectedTab(
                    "reels"
                  )
                }
                activeOpacity={0.7}
              >
                <Ionicons
                  name="play-circle-outline"
                  size={25}
                  color={
                    selectedTab ===
                    "reels"
                      ? "#fff"
                      : "#666"
                  }
                />
              </TouchableOpacity>

            </View>

          </View>
        }

        ListEmptyComponent={
          renderEmpty
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
          />
        }

        contentContainerStyle={
          currentData.length === 0
            ? styles.emptyList
            : undefined
        }

        showsVerticalScrollIndicator={
          false
        }
      />

    </View>
  );
}

// ============================================================
// STYLES — dark Instagram theme, matching the reference screenshot
// ============================================================

const styles =
  StyleSheet.create({

    // ========================================================
    // CONTAINER
    // ========================================================

    container: {
      flex: 1,
      backgroundColor: "#000",
      paddingTop: 40,
    },

    center: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#000",
    },

    errorText: {
      fontSize: 15,
      color: "#aaa",
      marginBottom: 15,
    },

    retryButton: {
      paddingHorizontal: 25,
      paddingVertical: 10,
      borderRadius: 8,
      backgroundColor: "#fff",
    },

    retryText: {
      color: "#000",
      fontWeight: "600",
    },

    // ========================================================
    // HEADER
    // ========================================================

    header: {
      height: 55,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 12,
      backgroundColor: "#000",
    },

    headerButton: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },

    headerUsername: {
      flex: 1,
      textAlign: "center",
      fontSize: 17,
      fontWeight: "700",
      color: "#fff",
    },

    // ========================================================
    // PROFILE
    // ========================================================

    profileSection: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 16,
      backgroundColor: "#000",
    },

    topProfileRow: {
      flexDirection: "row",
      alignItems: "center",
    },

    avatarContainer: {
      marginRight: 20,
    },

    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "#222",
    },

    avatarPlaceholder: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "#222",
      alignItems: "center",
      justifyContent: "center",
    },

    statsRow: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },

    statItem: {
      alignItems: "center",
      minWidth: 60,
    },

    statNumber: {
      fontSize: 18,
      fontWeight: "700",
      color: "#fff",
    },

    statLabel: {
      marginTop: 3,
      fontSize: 13,
      color: "#aaa",
    },

    fullName: {
      marginTop: 12,
      fontSize: 15,
      fontWeight: "700",
      color: "#fff",
    },

    username: {
      marginTop: 2,
      fontSize: 13,
      color: "#999",
    },

    bio: {
      marginTop: 8,
      fontSize: 14,
      lineHeight: 20,
      color: "#eee",
    },

    privateRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
    },

    privateText: {
      marginLeft: 5,
      fontSize: 13,
      color: "#999",
    },

    // ========================================================
    // FOLLOW / MESSAGE / +PERSON ROW
    // ========================================================

    actionRow: {
      flexDirection: "row",
      gap: 8,
      marginTop: 14,
    },

    primaryActionBtn: {
      flex: 1,
      height: 34,
      borderRadius: 8,
      backgroundColor: "#3B82F6",
      alignItems: "center",
      justifyContent: "center",
    },

    followingBtn: {
      backgroundColor: "#262626",
    },

    followingBtnContent: {
      flexDirection: "row",
      alignItems: "center",
    },

    secondaryActionBtn: {
      flex: 1,
      height: 34,
      borderRadius: 8,
      backgroundColor: "#262626",
      alignItems: "center",
      justifyContent: "center",
    },

    iconActionBtn: {
      width: 34,
      height: 34,
      borderRadius: 8,
      backgroundColor: "#262626",
      alignItems: "center",
      justifyContent: "center",
    },

    actionBtnText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
    },

    followBtnText: {
      fontWeight: "700",
    },

    // ========================================================
    // TABS
    // ========================================================

    tabs: {
      height: 48,
      flexDirection: "row",
      borderTopWidth: 0.5,
      borderColor: "#222",
      backgroundColor: "#000",
    },

    tab: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: "#fff",
    },

    // ========================================================
    // GRID
    // ========================================================

    gridItem: {
      width: ITEM_SIZE,
      height: ITEM_SIZE,
      marginRight: GRID_GAP,
      marginBottom: GRID_GAP,
      position: "relative",
      backgroundColor: "#151515",
    },

    gridImage: {
      width: "100%",
      height: "100%",
      backgroundColor: "#151515",
    },

    emptyMedia: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#151515",
    },

    reelIcon: {
      position: "absolute",
      right: 7,
      top: 7,
    },

    // ========================================================
    // EMPTY
    // ========================================================

    emptyContainer: {
      minHeight: 280,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 35,
      backgroundColor: "#000",
    },

    emptyIconCircle: {
      width: 75,
      height: 75,
      borderRadius: 38,
      borderWidth: 2,
      borderColor: "#333",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
    },

    emptyTitle: {
      fontSize: 17,
      fontWeight: "700",
      color: "#fff",
      marginBottom: 6,
    },

    emptyText: {
      fontSize: 13,
      color: "#888",
      textAlign: "center",
      lineHeight: 19,
    },

    emptyList: {
      flexGrow: 1,
      backgroundColor: "#000",
    },

  });