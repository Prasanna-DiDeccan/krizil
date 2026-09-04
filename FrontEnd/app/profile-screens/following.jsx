// // import React, {
// //   useEffect,
// // } from "react";

// // import {
// //   View,
// //   Text,
// //   FlatList,
// //   StyleSheet,
// //   Image,
// //   TouchableOpacity,
// //   ActivityIndicator,
// // } from "react-native";

// // import {
// //   useLocalSearchParams,
// //   useRouter,
// // } from "expo-router";

// // import {
// //   useDispatch,
// //   useSelector,
// // } from "react-redux";

// // import {
// //   getFollowing,
// //   selectFollowing,
// //   selectFollowingLoading,
// //   selectFollowingError,
// // } from "../../src/redux/followingSlice";

// // import {
// //   getMediaUrl,
// // } from "../../src/utils/media";

// // import {
// //   Ionicons,
// // } from "@expo/vector-icons";


// // export default function FollowingScreen() {

// //   const dispatch = useDispatch();

// //   const router = useRouter();

// //   const {
// //     userId,
// //   } = useLocalSearchParams();


// //   // ======================================================
// //   // REDUX
// //   // ======================================================

// //   const following =
// //     useSelector(
// //       selectFollowing
// //     );

// //   const loading =
// //     useSelector(
// //       selectFollowingLoading
// //     );

// //   const error =
// //     useSelector(
// //       selectFollowingError
// //     );


// //   // ======================================================
// //   // GET FOLLOWING
// //   // ======================================================

// //   useEffect(() => {

// //     if (!userId) {
// //       return;
// //     }

// //     console.log(
// //       "========== FOLLOWING SCREEN =========="
// //     );

// //     console.log(
// //       "OWNER USER ID =>",
// //       userId
// //     );

// //     dispatch(
// //       getFollowing({
// //         userId: Number(userId),
// //         limit: 20,
// //         offset: 0,
// //       })
// //     );

// //   }, [
// //     userId,
// //     dispatch,
// //   ]);


// //   // ======================================================
// //   // USER ROW
// //   // ======================================================

// //   const renderFollowing = ({
// //     item,
// //   }) => {

// //     const avatarUrl =
// //       item?.avatar_url
// //         ? getMediaUrl(
// //             item.avatar_url
// //           )
// //         : null;


// //     return (

// //   <TouchableOpacity
// //   style={styles.userRow}
// //   activeOpacity={0.7}
// //   onPress={() => {
// //     router.push({
// //       pathname: "/profile-screens/user-profile",
// //       params: {
// //         userId: String(item.id),
// //       },
// //     });
// //   }}
// // >

// //         {/* AVATAR */}

// //         {
// //           avatarUrl ? (

// //             <Image
// //               source={{
// //                 uri: avatarUrl,
// //               }}
// //               style={
// //                 styles.avatar
// //               }
// //             />

// //           ) : (

// //             <View
// //               style={
// //                 styles.avatarPlaceholder
// //               }
// //             >

// //               <Ionicons
// //                 name="person"
// //                 size={26}
// //                 color="#777"
// //               />

// //             </View>

// //           )
// //         }


// //         {/* USER INFORMATION */}

// //         <View
// //           style={
// //             styles.userInfo
// //           }
// //         >

// //           <Text
// //             style={
// //               styles.username
// //             }
// //             numberOfLines={1}
// //           >
// //             {
// //               item?.username ||
// //               ""
// //             }
// //           </Text>


// //           {
// //             item?.full_name ? (

// //               <Text
// //                 style={
// //                   styles.fullName
// //                 }
// //                 numberOfLines={1}
// //               >
// //                 {
// //                   item.full_name
// //                 }
// //               </Text>

// //             ) : null
// //           }

// //         </View>

// //       </TouchableOpacity>

// //     );

// //   };


// //   // ======================================================
// //   // LOADING
// //   // ======================================================

// //   if (loading) {

// //     return (

// //       <View
// //         style={
// //           styles.center
// //         }
// //       >

// //         <ActivityIndicator
// //           size="large"
// //           color="#fff"
// //         />

// //       </View>

// //     );

// //   }


// //   // ======================================================
// //   // ERROR
// //   // ======================================================

// //   if (error) {

// //     return (

// //       <View
// //         style={
// //           styles.center
// //         }
// //       >

// //         <Text
// //           style={
// //             styles.errorText
// //           }
// //         >
// //           {
// //             error?.message ||
// //             "Unable to load following"
// //           }
// //         </Text>

// //       </View>

// //     );

// //   }


// //   // ======================================================
// //   // SCREEN
// //   // ======================================================

// //   return (

// //     <View
// //       style={
// //         styles.container
// //       }
// //     >

// //       {/* HEADER */}

// //       <View
// //         style={
// //           styles.header
// //         }
// //       >

// //         <TouchableOpacity
// //           onPress={() =>
// //             router.back()
// //           }
// //           hitSlop={10}
// //         >

// //           <Ionicons
// //             name="arrow-back"
// //             size={26}
// //             color="#fff"
// //           />

// //         </TouchableOpacity>


// //         <Text
// //           style={
// //             styles.headerTitle
// //           }
// //         >
// //           Following
// //         </Text>


// //         <View
// //           style={
// //             styles.headerRight
// //           }
// //         />

// //       </View>


// //       {/* FOLLOWING LIST */}

// //       <FlatList
// //         data={following}
// //         keyExtractor={(item) =>
// //           String(item.id)
// //         }
// //         renderItem={
// //           renderFollowing
// //         }
// //         showsVerticalScrollIndicator={
// //           false
// //         }

// //         ListEmptyComponent={

// //           <View
// //             style={
// //               styles.emptyContainer
// //             }
// //           >

// //             <Text
// //               style={
// //                 styles.emptyText
// //               }
// //             >
// //               Not following anyone
// //             </Text>

// //           </View>

// //         }
// //       />

// //     </View>

// //   );

// // }


// // // ======================================================
// // // STYLES
// // // ======================================================

// // const styles =
// //   StyleSheet.create({

// //     container: {
// //       flex: 1,
// //       backgroundColor: "#000",
// //     },


// //     // ==================================================
// //     // HEADER
// //     // ==================================================

// //     header: {
// //       height: 100,
// //       paddingTop: 50,
// //       paddingHorizontal: 15,
// //       flexDirection: "row",
// //       alignItems: "center",
// //       justifyContent: "space-between",
// //       borderBottomWidth: 1,
// //       borderBottomColor: "#222",
// //     },


// //     headerTitle: {
// //       color: "#fff",
// //       fontSize: 20,
// //       fontWeight: "700",
// //     },


// //     headerRight: {
// //       width: 26,
// //     },


// //     // ==================================================
// //     // USER ROW
// //     // ==================================================

// //     userRow: {
// //       flexDirection: "row",
// //       alignItems: "center",
// //       paddingHorizontal: 15,
// //       paddingVertical: 12,
// //     },


// //     avatar: {
// //       width: 52,
// //       height: 52,
// //       borderRadius: 26,
// //       backgroundColor: "#222",
// //     },


// //     avatarPlaceholder: {
// //       width: 52,
// //       height: 52,
// //       borderRadius: 26,
// //       backgroundColor: "#222",
// //       alignItems: "center",
// //       justifyContent: "center",
// //     },


// //     userInfo: {
// //       flex: 1,
// //       marginLeft: 14,
// //     },


// //     username: {
// //       color: "#fff",
// //       fontSize: 16,
// //       fontWeight: "600",
// //     },


// //     fullName: {
// //       color: "#999",
// //       fontSize: 14,
// //       marginTop: 3,
// //     },


// //     // ==================================================
// //     // EMPTY
// //     // ==================================================

// //     emptyContainer: {
// //       flex: 1,
// //       alignItems: "center",
// //       justifyContent: "center",
// //       paddingTop: 100,
// //     },


// //     emptyText: {
// //       color: "#888",
// //       fontSize: 16,
// //     },


// //     // ==================================================
// //     // LOADING
// //     // ==================================================

// //     center: {
// //       flex: 1,
// //       backgroundColor: "#000",
// //       alignItems: "center",
// //       justifyContent: "center",
// //     },


// //     errorText: {
// //       color: "#ff5555",
// //       fontSize: 15,
// //       textAlign: "center",
// //       paddingHorizontal: 20,
// //     },

// //   });

// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   TextInput,
//   Alert,
// } from "react-native";

// import {
//   useLocalSearchParams,
//   useRouter,
//   useFocusEffect,
// } from "expo-router";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import {
//   getFollowing,
//   selectFollowing,
//   selectFollowingLoading,
//   selectFollowingError,
// } from "../../src/redux/followingSlice";

// import {
//   getProfile,
// } from "../../src/redux/profileSlice";

// import {
//   getMediaUrl,
// } from "../../src/utils/media";

// import {
//   Ionicons,
// } from "@expo/vector-icons";


// export default function FollowingScreen() {

//   const dispatch = useDispatch();

//   const router = useRouter();

//   const {
//     userId,
//   } = useLocalSearchParams();


//   // ======================================================
//   // STATE
//   // ======================================================

//   const [
//     searchText,
//     setSearchText,
//   ] = useState("");

//   const [
//     sortAscending,
//     setSortAscending,
//   ] = useState(true);


//   // ======================================================
//   // REDUX - FOLLOWING
//   // ======================================================

//   const following = useSelector(
//     selectFollowing
//   );

//   const loading = useSelector(
//     selectFollowingLoading
//   );

//   const error = useSelector(
//     selectFollowingError
//   );


//   // ======================================================
//   // PROFILE
//   // ======================================================

//   const profileData = useSelector(
//     (state) =>
//       userId
//         ? state.profile?.profiles?.[userId]
//         : null
//   );


//   // ======================================================
//   // NORMALIZE USER ID
//   // ======================================================

//   const profileUserId = userId
//     ? Number(userId)
//     : null;


//   // ======================================================
//   // FETCH FOLLOWING
//   // ======================================================

//   const loadFollowing = useCallback(() => {

//     if (!profileUserId) {
//       return;
//     }

//     console.log(
//       "======================================"
//     );

//     console.log(
//       "FOLLOWING SCREEN"
//     );

//     console.log(
//       "PROFILE USER ID =>",
//       profileUserId
//     );

//     console.log(
//       "======================================"
//     );


//     dispatch(
//       getFollowing({
//         userId: profileUserId,
//         limit: 100,
//         offset: 0,
//       })
//     );

//     dispatch(
//       getProfile(profileUserId)
//     );

//   }, [
//     dispatch,
//     profileUserId,
//   ]);


//   // ======================================================
//   // INITIAL LOAD
//   // ======================================================

//   useEffect(() => {

//     loadFollowing();

//   }, [
//     loadFollowing,
//   ]);


//   // ======================================================
//   // REFRESH WHEN SCREEN FOCUSES
//   // ======================================================

//   useFocusEffect(
//     useCallback(() => {

//       if (!profileUserId) {
//         return;
//       }

//       console.log(
//         "FOLLOWING SCREEN FOCUSED"
//       );

//       loadFollowing();

//     }, [
//       loadFollowing,
//       profileUserId,
//     ])
//   );


//   // ======================================================
//   // SEARCH + SORT
//   // ======================================================

//   const filteredFollowing = useMemo(() => {

//     if (!Array.isArray(following)) {
//       return [];
//     }

//     const search = searchText
//       .trim()
//       .toLowerCase();


//     let result = following.filter(
//       (item) => {

//         if (!search) {
//           return true;
//         }

//         const username =
//           item?.username
//             ?.toLowerCase() || "";

//         const fullName =
//           item?.full_name
//             ?.toLowerCase() || "";

//         return (
//           username.includes(search) ||
//           fullName.includes(search)
//         );
//       }
//     );


//     result = [...result].sort(
//       (a, b) => {

//         const usernameA =
//           a?.username
//             ?.toLowerCase() || "";

//         const usernameB =
//           b?.username
//             ?.toLowerCase() || "";

//         return sortAscending
//           ? usernameA.localeCompare(
//               usernameB
//             )
//           : usernameB.localeCompare(
//               usernameA
//             );
//       }
//     );


//     return result;

//   }, [
//     following,
//     searchText,
//     sortAscending,
//   ]);


//   // ======================================================
//   // COUNTS
//   // ======================================================

//   const followersCount =
//     profileData?.followers_count ??
//     profileData?.followers ??
//     null;


//   const followingCount =
//     profileData?.following_count ??
//     profileData?.following ??
//     following?.length ??
//     0;


//   const subscriptionsCount =
//     profileData?.subscriptions_count ??
//     profileData?.subscriptions ??
//     profileData?.subscribers_count ??
//     0;


//   // ======================================================
//   // OPEN USER PROFILE
//   // ======================================================

//   const openUserProfile = (
//     selectedUserId
//   ) => {

//     if (!selectedUserId) {
//       return;
//     }

//     router.push({
//       pathname:
//         "/profile-screens/user-profile",

//       params: {
//         userId:
//           String(selectedUserId),
//       },
//     });

//   };


//   // ======================================================
//   // MESSAGE
//   // ======================================================

//   const handleMessage = (
//     item
//   ) => {

//     console.log(
//       "MESSAGE USER =>",
//       item
//     );

//     Alert.alert(
//       "Message",
//       `Open chat with ${
//         item?.username || "user"
//       }`
//     );

//   };


//   // ======================================================
//   // MORE MENU
//   // ======================================================

//   const handleMore = (
//     item
//   ) => {

//     Alert.alert(
//       item?.username || "User",
//       "Choose an action",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "View profile",
//           onPress: () =>
//             openUserProfile(
//               item?.id
//             ),
//         },
//       ]
//     );

//   };


//   // ======================================================
//   // RENDER USER
//   // ======================================================

//   const renderFollowing = ({
//     item,
//   }) => {

//     const avatarUrl =
//       item?.avatar_url
//         ? getMediaUrl(
//             item.avatar_url
//           )
//         : null;


//     return (

//       <View
//         style={styles.userRow}
//       >

//         {/* ============================================ */}
//         {/* AVATAR */}
//         {/* ============================================ */}

//         <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={() =>
//             openUserProfile(
//               item?.id
//             )
//           }
//         >

//           {avatarUrl ? (

//             <Image
//               source={{
//                 uri: avatarUrl,
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

//               <Ionicons
//                 name="person"
//                 size={28}
//                 color="#777"
//               />

//             </View>

//           )}

//         </TouchableOpacity>


//         {/* ============================================ */}
//         {/* USER INFORMATION */}
//         {/* ============================================ */}

//         <TouchableOpacity
//           style={
//             styles.userInfo
//           }
//           activeOpacity={0.7}
//           onPress={() =>
//             openUserProfile(
//               item?.id
//             )
//           }
//         >

//           <Text
//             style={
//               styles.username
//             }
//             numberOfLines={1}
//           >
//             {item?.username || ""}
//           </Text>


//           <Text
//             style={
//               styles.fullName
//             }
//             numberOfLines={1}
//           >
//             {item?.full_name ||
//               ""}
//           </Text>


//           {/* Optional new posts data */}
//           {item?.new_posts_count >
//             0 && (

//             <View
//               style={
//                 styles.newPostRow
//               }
//             >

//               <Text
//                 style={
//                   styles.newPostText
//                 }
//               >
//                 {item.new_posts_count}{" "}
//                 new{" "}
//                 {item.new_posts_count ===
//                 1
//                   ? "post"
//                   : "posts"}
//               </Text>

//               <View
//                 style={
//                   styles.blueDot
//                 }
//               />

//             </View>

//           )}

//         </TouchableOpacity>


//         {/* ============================================ */}
//         {/* MESSAGE BUTTON */}
//         {/* ============================================ */}

//         <TouchableOpacity
//           style={
//             styles.messageButton
//           }
//           activeOpacity={0.8}
//           onPress={() =>
//             handleMessage(item)
//           }
//         >

//           <Text
//             style={
//               styles.messageText
//             }
//           >
//             Message
//           </Text>

//         </TouchableOpacity>


//         {/* ============================================ */}
//         {/* MORE */}
//         {/* ============================================ */}

//         <TouchableOpacity
//           style={
//             styles.moreButton
//           }
//           hitSlop={10}
//           activeOpacity={0.7}
//           onPress={() =>
//             handleMore(item)
//           }
//         >

//           <Ionicons
//             name="ellipsis-vertical"
//             size={23}
//             color="#fff"
//           />

//         </TouchableOpacity>

//       </View>

//     );

//   };


//   // ======================================================
//   // HEADER
//   // ======================================================

//   const ListHeader = () => {

//     return (

//       <View>

//         {/* ============================================ */}
//         {/* TOP HEADER */}
//         {/* ============================================ */}

//         <View
//           style={
//             styles.topHeader
//           }
//         >

//           {/* BACK */}

//           <TouchableOpacity
//             style={
//               styles.backButton
//             }
//             onPress={() =>
//               router.back()
//             }
//             hitSlop={10}
//           >

//             <Ionicons
//               name="arrow-back"
//               size={32}
//               color="#fff"
//             />

//           </TouchableOpacity>


//           {/* USERNAME */}

//           <Text
//             style={
//               styles.headerUsername
//             }
//             numberOfLines={1}
//           >
//             {profileData?.username ||
//               ""}
//           </Text>


//           {/* ADD PERSON */}

//           <TouchableOpacity
//             style={
//               styles.addPersonButton
//             }
//             hitSlop={10}
//             activeOpacity={0.7}
//           >

//             <Ionicons
//               name="person-add-outline"
//               size={27}
//               color="#fff"
//             />

//           </TouchableOpacity>

//         </View>


//         {/* ============================================ */}
//         {/* COUNTS */}
//         {/* ============================================ */}

//         <View
//           style={
//             styles.countsContainer
//           }
//         >

//           {/* FOLLOWERS */}

//           <TouchableOpacity
//             style={
//               styles.countItem
//             }
//             activeOpacity={0.7}
//             onPress={() => {

//               router.push({
//                 pathname:
//                   "/profile-screens/followers",

//                 params: {
//                   userId:
//                     String(profileUserId),
//                 },
//               });

//             }}
//           >

//             <Text
//               style={
//                 styles.countText
//               }
//             >
//               {followersCount ??
//                 "—"}
//             </Text>

//             <Text
//               style={
//                 styles.countLabel
//               }
//             >
//               Followers
//             </Text>

//           </TouchableOpacity>


//           {/* FOLLOWING */}

//           <TouchableOpacity
//             style={
//               styles.countItem
//             }
//             activeOpacity={0.7}
//           >

//             <Text
//               style={
//                 styles.countText
//               }
//             >
//               {followingCount}
//             </Text>

//             <Text
//               style={
//                 styles.countLabel
//               }
//             >
//               Following
//             </Text>

//           </TouchableOpacity>


//           {/* SUBSCRIPTIONS */}

//           <TouchableOpacity
//             style={
//               styles.countItem
//             }
//             activeOpacity={0.7}
//           >

//             <Text
//               style={
//                 styles.countText
//               }
//             >
//               {subscriptionsCount}
//             </Text>

//             <Text
//               style={
//                 styles.countLabel
//               }
//             >
//               Subscriptions
//             </Text>

//           </TouchableOpacity>

//         </View>


//         {/* ============================================ */}
//         {/* ACTIVE TAB LINE */}
//         {/* ============================================ */}

//         <View
//           style={
//             styles.tabLineContainer
//           }
//         >

//           <View
//             style={
//               styles.activeTabLine
//             }
//           />

//         </View>


//         {/* ============================================ */}
//         {/* SEARCH */}
//         {/* ============================================ */}

//         <View
//           style={
//             styles.searchContainer
//           }
//         >

//           <Ionicons
//             name="search"
//             size={25}
//             color="#A7A7A7"
//           />

//           <TextInput
//             value={searchText}
//             onChangeText={
//               setSearchText
//             }
//             placeholder="Search"
//             placeholderTextColor="#A7A7A7"
//             style={
//               styles.searchInput
//             }
//             autoCapitalize="none"
//             autoCorrect={false}
//             returnKeyType="search"
//           />

//           {searchText.length > 0 && (

//             <TouchableOpacity
//               onPress={() =>
//                 setSearchText("")
//               }
//               hitSlop={10}
//             >

//               <Ionicons
//                 name="close-circle"
//                 size={21}
//                 color="#777"
//               />

//             </TouchableOpacity>

//           )}

//         </View>


//         {/* ============================================ */}
//         {/* SORT */}
//         {/* ============================================ */}

//         <View
//           style={
//             styles.sortRow
//           }
//         >

//           <Text
//             style={
//               styles.sortText
//             }
//           >
//             {sortAscending
//               ? "Sorted by Default"
//               : "Sorted Z-A"}
//           </Text>


//           <TouchableOpacity
//             style={
//               styles.sortButton
//             }
//             hitSlop={10}
//             activeOpacity={0.7}
//             onPress={() =>
//               setSortAscending(
//                 (previous) =>
//                   !previous
//               )
//             }
//           >

//             <Ionicons
//               name={
//                 sortAscending
//                   ? "swap-vertical-outline"
//                   : "swap-vertical"
//               }
//               size={34}
//               color="#fff"
//             />

//           </TouchableOpacity>

//         </View>

//       </View>

//     );

//   };


//   // ======================================================
//   // LOADING
//   // ======================================================

//   if (
//     loading &&
//     (!following ||
//       following.length === 0)
//   ) {

//     return (

//       <View
//         style={styles.center}
//       >

//         <ActivityIndicator
//           size="large"
//           color="#fff"
//         />

//       </View>

//     );

//   }


//   // ======================================================
//   // ERROR
//   // ======================================================

//   if (
//     error &&
//     (!following ||
//       following.length === 0)
//   ) {

//     return (

//       <View
//         style={styles.center}
//       >

//         <Ionicons
//           name="alert-circle-outline"
//           size={45}
//           color="#777"
//         />

//         <Text
//           style={
//             styles.errorText
//           }
//         >
//           {error?.message ||
//             error?.detail ||
//             "Unable to load following"}
//         </Text>

//         <TouchableOpacity
//           style={
//             styles.retryButton
//           }
//           onPress={
//             loadFollowing
//           }
//         >

//           <Text
//             style={
//               styles.retryText
//             }
//           >
//             Try Again
//           </Text>

//         </TouchableOpacity>

//       </View>

//     );

//   }


//   // ======================================================
//   // SCREEN
//   // ======================================================

//   return (

//     <View
//       style={
//         styles.container
//       }
//     >

//       <FlatList

//         data={
//           filteredFollowing
//         }

//         keyExtractor={(
//           item,
//           index
//         ) =>
//           item?.id
//             ? String(item.id)
//             : String(index)
//         }

//         renderItem={
//           renderFollowing
//         }

//         ListHeaderComponent={
//           ListHeader
//         }

//         showsVerticalScrollIndicator={
//           false
//         }

//         keyboardShouldPersistTaps="handled"

//         contentContainerStyle={
//           filteredFollowing.length ===
//           0
//             ? styles.emptyList
//             : styles.listContent
//         }

//         ListEmptyComponent={

//           <View
//             style={
//               styles.emptyContainer
//             }
//           >

//             <Ionicons
//               name={
//                 searchText
//                   ? "search-outline"
//                   : "people-outline"
//               }
//               size={48}
//               color="#666"
//             />

//             <Text
//               style={
//                 styles.emptyTitle
//               }
//             >
//               {searchText
//                 ? "No results found"
//                 : "Not following anyone"}
//             </Text>

//             {searchText && (

//               <Text
//                 style={
//                   styles.emptySubText
//                 }
//               >
//                 Try searching with
//                 another username
//               </Text>

//             )}

//           </View>

//         }

//         refreshing={
//           loading &&
//           following?.length > 0
//         }

//         onRefresh={
//           loadFollowing
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

//     // ==================================================
//     // CONTAINER
//     // ==================================================

//     container: {
//       flex: 1,
//       backgroundColor: "#0B0E12",
//     },

//     listContent: {
//       paddingBottom: 30,
//     },

//     emptyList: {
//       flexGrow: 1,
//       paddingBottom: 30,
//     },


//     // ==================================================
//     // TOP HEADER
//     // ==================================================

//     topHeader: {
//       height: 92,
//       paddingTop: 42,
//       paddingHorizontal: 20,
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//     },

//     backButton: {
//       width: 45,
//       alignItems: "flex-start",
//       justifyContent: "center",
//     },

//     headerUsername: {
//       flex: 1,
//       color: "#fff",
//       fontSize: 23,
//       fontWeight: "700",
//       textAlign: "center",
//       marginHorizontal: 10,
//     },

//     addPersonButton: {
//       width: 45,
//       alignItems: "flex-end",
//       justifyContent: "center",
//     },


//     // ==================================================
//     // COUNTS
//     // ==================================================

//     countsContainer: {
//       height: 68,
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-around",
//       paddingHorizontal: 15,
//     },

//     countItem: {
//       flex: 1,
//       alignItems: "center",
//       justifyContent: "center",
//     },

//     countText: {
//       color: "#F2F2F2",
//       fontSize: 17,
//       fontWeight: "700",
//     },

//     countLabel: {
//       color: "#D4D4D4",
//       fontSize: 14,
//       marginTop: 4,
//     },


//     // ==================================================
//     // TAB LINE
//     // ==================================================

//     tabLineContainer: {
//       height: 2,
//       backgroundColor: "#292D32",
//       position: "relative",
//       marginTop: 5,
//     },

//     activeTabLine: {
//       position: "absolute",
//       left: "33.33%",
//       width: "33.33%",
//       height: 3,
//       backgroundColor: "#fff",
//       top: -1,
//     },


//     // ==================================================
//     // SEARCH
//     // ==================================================

//     searchContainer: {
//       height: 58,
//       marginHorizontal: 29,
//       marginTop: 20,
//       borderRadius: 18,
//       backgroundColor: "#24282E",
//       flexDirection: "row",
//       alignItems: "center",
//       paddingHorizontal: 17,
//     },

//     searchInput: {
//       flex: 1,
//       color: "#fff",
//       fontSize: 18,
//       marginLeft: 14,
//       paddingVertical: 0,
//     },


//     // ==================================================
//     // SORT
//     // ==================================================

//     sortRow: {
//       height: 92,
//       paddingHorizontal: 29,
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//     },

//     sortText: {
//       color: "#F0F0F0",
//       fontSize: 17,
//       fontWeight: "500",
//     },

//     sortButton: {
//       width: 45,
//       height: 50,
//       alignItems: "center",
//       justifyContent: "center",
//     },


//     // ==================================================
//     // USER ROW
//     // ==================================================

//     userRow: {
//       minHeight: 92,
//       paddingHorizontal: 38,
//       flexDirection: "row",
//       alignItems: "center",
//     },


//     // ==================================================
//     // AVATAR
//     // ==================================================

//     avatar: {
//       width: 70,
//       height: 70,
//       borderRadius: 35,
//       backgroundColor: "#24282E",
//     },

//     avatarPlaceholder: {
//       width: 70,
//       height: 70,
//       borderRadius: 35,
//       backgroundColor: "#24282E",
//       alignItems: "center",
//       justifyContent: "center",
//     },


//     // ==================================================
//     // USER INFO
//     // ==================================================

//     userInfo: {
//       flex: 1,
//       minWidth: 0,
//       marginLeft: 15,
//       marginRight: 10,
//     },

//     username: {
//       color: "#fff",
//       fontSize: 16,
//       fontWeight: "700",
//     },

//     fullName: {
//       color: "#A6A6A6",
//       fontSize: 15,
//       marginTop: 4,
//     },

//     newPostRow: {
//       flexDirection: "row",
//       alignItems: "center",
//       marginTop: 2,
//     },

//     newPostText: {
//       color: "#999",
//       fontSize: 14,
//     },

//     blueDot: {
//       width: 8,
//       height: 8,
//       borderRadius: 4,
//       backgroundColor: "#6878FF",
//       marginLeft: 5,
//     },


//     // ==================================================
//     // MESSAGE
//     // ==================================================

//     messageButton: {
//       width: 112,
//       height: 58,
//       borderRadius: 14,
//       backgroundColor: "#2B3036",
//       alignItems: "center",
//       justifyContent: "center",
//     },

//     messageText: {
//       color: "#F5F5F5",
//       fontSize: 16,
//       fontWeight: "700",
//     },


//     // ==================================================
//     // MORE
//     // ==================================================

//     moreButton: {
//       width: 30,
//       height: 58,
//       marginLeft: 9,
//       alignItems: "center",
//       justifyContent: "center",
//     },


//     // ==================================================
//     // EMPTY
//     // ==================================================

//     emptyContainer: {
//       flex: 1,
//       alignItems: "center",
//       justifyContent: "center",
//       paddingHorizontal: 30,
//       paddingTop: 50,
//     },

//     emptyTitle: {
//       color: "#fff",
//       fontSize: 18,
//       fontWeight: "600",
//       marginTop: 14,
//     },

//     emptySubText: {
//       color: "#777",
//       fontSize: 14,
//       marginTop: 7,
//       textAlign: "center",
//     },


//     // ==================================================
//     // LOADING / ERROR
//     // ==================================================

//     center: {
//       flex: 1,
//       backgroundColor: "#0B0E12",
//       alignItems: "center",
//       justifyContent: "center",
//       paddingHorizontal: 30,
//     },

//     errorText: {
//       color: "#aaa",
//       fontSize: 15,
//       textAlign: "center",
//       marginTop: 15,
//     },

//     retryButton: {
//       marginTop: 20,
//       paddingHorizontal: 25,
//       paddingVertical: 11,
//       borderRadius: 10,
//       backgroundColor: "#2B3036",
//     },

//     retryText: {
//       color: "#fff",
//       fontSize: 15,
//       fontWeight: "600",
//     },

//   });

import { Redirect } from "expo-router";

export default function FollowingRoute() {
  return <Redirect href="/profile-screens/followers?initialTab=following" />;
}