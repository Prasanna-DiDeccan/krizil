
// // import React, {
// //   useCallback,
// //   useEffect,
// //   useMemo,
// //   useState,
// // } from "react";

// // import {
// //   View,
// //   Text,
// //   FlatList,
// //   StyleSheet,
// //   Image,
// //   TouchableOpacity,
// //   ActivityIndicator,
// //   TextInput,
// //   Alert,
// // } from "react-native";

// // import {
// //   useLocalSearchParams,
// //   useRouter,
// //   useFocusEffect,
// // } from "expo-router";

// // import {
// //   useDispatch,
// //   useSelector,
// // } from "react-redux";

// // import {
// //   getFollowers,
// //   selectFollowers,
// //   selectFollowersLoading,
// //   selectFollowersError,
// // } from "../../src/redux/followersSlice";

// // import {
// //   getFollowing,
// //   selectFollowing,
// //   selectFollowingLoading,
// //   selectFollowingError,
// // } from "../../src/redux/followingSlice";

// // import {
// //   getProfile,
// // } from "../../src/redux/profileSlice";

// // import {
// //   getMediaUrl,
// // } from "../../src/utils/media";

// // import {
// //   Ionicons,
// // } from "@expo/vector-icons";


// // export default function FollowersScreen() {

// //   const dispatch = useDispatch();

// //   const router = useRouter();

// //   const {
// //     userId,
// //   } = useLocalSearchParams();


// //   // ======================================================
// //   // NORMALIZE USER ID
// //   // ======================================================

// //   const profileUserId =
// //     userId
// //       ? Number(userId)
// //       : null;


// //   // ======================================================
// //   // STATE
// //   // ======================================================

// //   const [
// //     activeTab,
// //     setActiveTab,
// //   ] = useState("followers");

// //   const [
// //     searchText,
// //     setSearchText,
// //   ] = useState("");

// //   const [
// //     sortAscending,
// //     setSortAscending,
// //   ] = useState(true);


// //   // ======================================================
// //   // FOLLOWERS REDUX
// //   // ======================================================

// //   const followers =
// //     useSelector(
// //       selectFollowers
// //     );

// //   const followersLoading =
// //     useSelector(
// //       selectFollowersLoading
// //     );

// //   const followersError =
// //     useSelector(
// //       selectFollowersError
// //     );


// //   // ======================================================
// //   // FOLLOWING REDUX
// //   // ======================================================

// //   const following =
// //     useSelector(
// //       selectFollowing
// //     );

// //   const followingLoading =
// //     useSelector(
// //       selectFollowingLoading
// //     );

// //   const followingError =
// //     useSelector(
// //       selectFollowingError
// //     );


// //   // ======================================================
// //   // PROFILE
// //   // ======================================================

// //   const profileData =
// //     useSelector(
// //       (state) =>
// //         userId
// //           ? state.profile?.profiles?.[userId]
// //           : null
// //     );


// //   // ======================================================
// //   // SUBSCRIPTIONS
// //   //
// //   // You haven't provided the subscriptions slice/API yet.
// //   // Keep this as an empty array for now.
// //   // ======================================================

// //   const subscriptions = [];


// //   // ======================================================
// //   // COUNTS
// //   // ======================================================

// //   const followersCount =
// //     profileData?.followers_count ??
// //     profileData?.followers ??
// //     followers?.length ??
// //     0;


// //   const followingCount =
// //     profileData?.following_count ??
// //     profileData?.following ??
// //     following?.length ??
// //     0;


// //   const subscriptionsCount =
// //     profileData?.subscriptions_count ??
// //     profileData?.subscriptions ??
// //     profileData?.subscribers_count ??
// //     0;


// //   // ======================================================
// //   // ACTIVE DATA
// //   // ======================================================

// //   const activeData =
// //     activeTab === "followers"
// //       ? followers
// //       : activeTab === "following"
// //         ? following
// //         : subscriptions;


// //   // ======================================================
// //   // ACTIVE LOADING
// //   // ======================================================

// //   const activeLoading =
// //     activeTab === "followers"
// //       ? followersLoading
// //       : activeTab === "following"
// //         ? followingLoading
// //         : false;


// //   // ======================================================
// //   // ACTIVE ERROR
// //   // ======================================================

// //   const activeError =
// //     activeTab === "followers"
// //       ? followersError
// //       : activeTab === "following"
// //         ? followingError
// //         : null;


// //   // ======================================================
// //   // LOAD FOLLOWERS
// //   // ======================================================

// //   const loadFollowers =
// //     useCallback(() => {

// //       if (!profileUserId) {
// //         return;
// //       }

// //       console.log(
// //         "======================================"
// //       );

// //       console.log(
// //         "LOADING FOLLOWERS"
// //       );

// //       console.log(
// //         "PROFILE USER ID =>",
// //         profileUserId
// //       );

// //       console.log(
// //         "======================================"
// //       );


// //       dispatch(
// //         getFollowers({
// //           userId: profileUserId,
// //           limit: 100,
// //           offset: 0,
// //         })
// //       );

// //     }, [
// //       dispatch,
// //       profileUserId,
// //     ]);


// //   // ======================================================
// //   // LOAD FOLLOWING
// //   // ======================================================

// //   const loadFollowing =
// //     useCallback(() => {

// //       if (!profileUserId) {
// //         return;
// //       }

// //       console.log(
// //         "======================================"
// //       );

// //       console.log(
// //         "LOADING FOLLOWING"
// //       );

// //       console.log(
// //         "PROFILE USER ID =>",
// //         profileUserId
// //       );

// //       console.log(
// //         "======================================"
// //       );


// //       dispatch(
// //         getFollowing({
// //           userId: profileUserId,
// //           limit: 100,
// //           offset: 0,
// //         })
// //       );

// //     }, [
// //       dispatch,
// //       profileUserId,
// //     ]);


// //   // ======================================================
// //   // LOAD ACTIVE TAB
// //   // ======================================================

// //   const loadActiveTab =
// //     useCallback(() => {

// //       if (!profileUserId) {
// //         return;
// //       }


// //       // -----------------------------------------------
// //       // FOLLOWERS
// //       // -----------------------------------------------

// //       if (
// //         activeTab === "followers"
// //       ) {

// //         loadFollowers();

// //       }


// //       // -----------------------------------------------
// //       // FOLLOWING
// //       // -----------------------------------------------

// //       if (
// //         activeTab === "following"
// //       ) {

// //         loadFollowing();

// //       }


// //       // -----------------------------------------------
// //       // SUBSCRIPTIONS
// //       // -----------------------------------------------

// //       if (
// //         activeTab === "subscriptions"
// //       ) {

// //         console.log(
// //           "SUBSCRIPTIONS TAB SELECTED"
// //         );

// //         // Add subscriptions API here
// //         // when subscriptionsSlice is available.

// //       }

// //     }, [
// //       activeTab,
// //       profileUserId,
// //       loadFollowers,
// //       loadFollowing,
// //     ]);


// //   // ======================================================
// //   // INITIAL PROFILE LOAD
// //   // ======================================================

// //   useEffect(() => {

// //     if (!profileUserId) {
// //       return;
// //     }

// //     dispatch(
// //       getProfile(
// //         profileUserId
// //       )
// //     );

// //   }, [
// //     dispatch,
// //     profileUserId,
// //   ]);


// //   // ======================================================
// //   // LOAD WHEN TAB CHANGES
// //   // ======================================================

// //   useEffect(() => {

// //     loadActiveTab();

// //     // Clear search whenever tab changes
// //     setSearchText("");

// //   }, [
// //     activeTab,
// //     loadActiveTab,
// //   ]);


// //   // ======================================================
// //   // REFRESH WHEN SCREEN FOCUSES
// //   // ======================================================

// //   useFocusEffect(
// //     useCallback(() => {

// //       if (!profileUserId) {
// //         return;
// //       }

// //       console.log(
// //         "CONNECTIONS SCREEN FOCUSED"
// //       );

// //       loadActiveTab();

// //       dispatch(
// //         getProfile(
// //           profileUserId
// //         )
// //       );

// //     }, [
// //       profileUserId,
// //       loadActiveTab,
// //       dispatch,
// //     ])
// //   );


// //   // ======================================================
// //   // SEARCH + SORT
// //   // ======================================================

// //   const filteredData =
// //     useMemo(() => {

// //       if (!Array.isArray(activeData)) {
// //         return [];
// //       }


// //       const search =
// //         searchText
// //           .trim()
// //           .toLowerCase();


// //       let result =
// //         activeData.filter(
// //           (item) => {

// //             if (!search) {
// //               return true;
// //             }


// //             const username =
// //               String(
// //                 item?.username || ""
// //               ).toLowerCase();


// //             const fullName =
// //               String(
// //                 item?.full_name || ""
// //               ).toLowerCase();


// //             return (
// //               username.includes(search) ||
// //               fullName.includes(search)
// //             );

// //           }
// //         );


// //       result =
// //         [...result].sort(
// //           (a, b) => {

// //             const usernameA =
// //               String(
// //                 a?.username || ""
// //               ).toLowerCase();


// //             const usernameB =
// //               String(
// //                 b?.username || ""
// //               ).toLowerCase();


// //             return sortAscending
// //               ? usernameA.localeCompare(
// //                   usernameB
// //                 )
// //               : usernameB.localeCompare(
// //                   usernameA
// //                 );

// //           }
// //         );


// //       return result;

// //     }, [
// //       activeData,
// //       searchText,
// //       sortAscending,
// //     ]);


// //   // ======================================================
// //   // OPEN USER PROFILE
// //   // ======================================================

// //   const openUserProfile =
// //     (selectedUserId) => {

// //       if (!selectedUserId) {
// //         return;
// //       }

// //       router.push({
// //         pathname:
// //           "/profile-screens/user-profile",

// //         params: {
// //           userId:
// //             String(selectedUserId),
// //         },
// //       });

// //     };


// //   // ======================================================
// //   // MESSAGE
// //   // ======================================================

// //   const handleMessage =
// //     (item) => {

// //       console.log(
// //         "MESSAGE USER =>",
// //         item
// //       );

// //       Alert.alert(
// //         "Message",
// //         `Open chat with ${
// //           item?.username || "user"
// //         }`
// //       );

// //     };


// //   // ======================================================
// //   // MORE MENU
// //   // ======================================================

// //   const handleMore =
// //     (item) => {

// //       Alert.alert(
// //         item?.username || "User",
// //         "Choose an action",
// //         [
// //           {
// //             text: "Cancel",
// //             style: "cancel",
// //           },
// //           {
// //             text: "View profile",
// //             onPress: () =>
// //               openUserProfile(
// //                 item?.id
// //               ),
// //           },
// //         ]
// //       );

// //     };


// //   // ======================================================
// //   // RENDER USER
// //   // ======================================================

// //   const renderUser =
// //     ({
// //       item,
// //     }) => {

// //       const avatarUrl =
// //         item?.avatar_url
// //           ? getMediaUrl(
// //               item.avatar_url
// //             )
// //           : null;


// //       return (

// //         <View
// //           style={
// //             styles.userRow
// //           }
// //         >

// //           {/* ============================================ */}
// //           {/* AVATAR */}
// //           {/* ============================================ */}

// //           <TouchableOpacity
// //             activeOpacity={0.8}
// //             onPress={() =>
// //               openUserProfile(
// //                 item?.id
// //               )
// //             }
// //           >

// //             {avatarUrl ? (

// //               <Image
// //                 source={{
// //                   uri: avatarUrl,
// //                 }}
// //                 style={
// //                   styles.avatar
// //                 }
// //               />

// //             ) : (

// //               <View
// //                 style={
// //                   styles.avatarPlaceholder
// //                 }
// //               >

// //                 <Ionicons
// //                   name="person"
// //                   size={28}
// //                   color="#777"
// //                 />

// //               </View>

// //             )}

// //           </TouchableOpacity>


// //           {/* ============================================ */}
// //           {/* USER INFO */}
// //           {/* ============================================ */}

// //           <TouchableOpacity
// //             style={
// //               styles.userInfo
// //             }
// //             activeOpacity={0.7}
// //             onPress={() =>
// //               openUserProfile(
// //                 item?.id
// //               )
// //             }
// //           >

// //             <Text
// //               style={
// //                 styles.username
// //               }
// //               numberOfLines={1}
// //             >
// //               {item?.username || ""}
// //             </Text>


// //             <Text
// //               style={
// //                 styles.fullName
// //               }
// //               numberOfLines={1}
// //             >
// //               {item?.full_name || ""}
// //             </Text>


// //             {item?.new_posts_count > 0 && (

// //               <View
// //                 style={
// //                   styles.newPostRow
// //                 }
// //               >

// //                 <Text
// //                   style={
// //                     styles.newPostText
// //                   }
// //                 >
// //                   {item.new_posts_count}{" "}
// //                   new{" "}
// //                   {item.new_posts_count === 1
// //                     ? "post"
// //                     : "posts"}
// //                 </Text>


// //                 <View
// //                   style={
// //                     styles.blueDot
// //                   }
// //                 />

// //               </View>

// //             )}

// //           </TouchableOpacity>


// //           {/* ============================================ */}
// //           {/* MESSAGE */}
// //           {/* ============================================ */}

// //           <TouchableOpacity
// //             style={
// //               styles.messageButton
// //             }
// //             activeOpacity={0.8}
// //             onPress={() =>
// //               handleMessage(item)
// //             }
// //           >

// //             <Text
// //               style={
// //                 styles.messageText
// //               }
// //             >
// //               Message
// //             </Text>

// //           </TouchableOpacity>


// //           {/* ============================================ */}
// //           {/* MORE */}
// //           {/* ============================================ */}

// //           <TouchableOpacity
// //             style={
// //               styles.moreButton
// //             }
// //             hitSlop={10}
// //             activeOpacity={0.7}
// //             onPress={() =>
// //               handleMore(item)
// //             }
// //           >

// //             <Ionicons
// //               name="ellipsis-vertical"
// //               size={23}
// //               color="#fff"
// //             />

// //           </TouchableOpacity>

// //         </View>

// //       );

// //     };


// //   // ======================================================
// //   // HEADER
// //   // ======================================================

// //   const ListHeader =
// //     () => {

// //       return (

// //         <View>

// //           {/* ============================================ */}
// //           {/* TOP HEADER */}
// //           {/* ============================================ */}

// //           <View
// //             style={
// //               styles.topHeader
// //             }
// //           >

// //             <TouchableOpacity
// //               style={
// //                 styles.backButton
// //               }
// //               onPress={() =>
// //                 router.back()
// //               }
// //               hitSlop={10}
// //             >

// //               <Ionicons
// //                 name="arrow-back"
// //                 size={32}
// //                 color="#fff"
// //               />

// //             </TouchableOpacity>


// //             <Text
// //               style={
// //                 styles.headerUsername
// //               }
// //               numberOfLines={1}
// //             >
// //               {profileData?.username || ""}
// //             </Text>


// //             <TouchableOpacity
// //               style={
// //                 styles.addPersonButton
// //               }
// //               hitSlop={10}
// //               activeOpacity={0.7}
// //             >

// //               <Ionicons
// //                 name="person-add-outline"
// //                 size={27}
// //                 color="#fff"
// //               />

// //             </TouchableOpacity>

// //           </View>


// //           {/* ============================================ */}
// //           {/* COUNTS / TABS */}
// //           {/* ============================================ */}

// //           <View
// //             style={
// //               styles.countsContainer
// //             }
// //           >

// //             {/* ========================================== */}
// //             {/* FOLLOWERS */}
// //             {/* ========================================== */}

// //             <TouchableOpacity
// //               style={
// //                 styles.countItem
// //               }
// //               activeOpacity={0.7}
// //               onPress={() => {

// //                 setActiveTab(
// //                   "followers"
// //                 );

// //               }}
// //             >

// //               <Text
// //                 style={[
// //                   styles.countText,
// //                   activeTab ===
// //                     "followers" &&
// //                     styles.activeCountText,
// //                 ]}
// //               >
// //                 {followersCount}
// //               </Text>

// //               <Text
// //                 style={[
// //                   styles.countLabel,
// //                   activeTab ===
// //                     "followers" &&
// //                     styles.activeCountLabel,
// //                 ]}
// //               >
// //                 Followers
// //               </Text>

// //             </TouchableOpacity>


// //             {/* ========================================== */}
// //             {/* FOLLOWING */}
// //             {/* ========================================== */}

// //             <TouchableOpacity
// //               style={
// //                 styles.countItem
// //               }
// //               activeOpacity={0.7}
// //               onPress={() => {

// //                 setActiveTab(
// //                   "following"
// //                 );

// //               }}
// //             >

// //               <Text
// //                 style={[
// //                   styles.countText,
// //                   activeTab ===
// //                     "following" &&
// //                     styles.activeCountText,
// //                 ]}
// //               >
// //                 {followingCount}
// //               </Text>

// //               <Text
// //                 style={[
// //                   styles.countLabel,
// //                   activeTab ===
// //                     "following" &&
// //                     styles.activeCountLabel,
// //                 ]}
// //               >
// //                 Following
// //               </Text>

// //             </TouchableOpacity>


// //             {/* ========================================== */}
// //             {/* SUBSCRIPTIONS */}
// //             {/* ========================================== */}

// //             <TouchableOpacity
// //               style={
// //                 styles.countItem
// //               }
// //               activeOpacity={0.7}
// //               onPress={() => {

// //                 setActiveTab(
// //                   "subscriptions"
// //                 );

// //               }}
// //             >

// //               <Text
// //                 style={[
// //                   styles.countText,
// //                   activeTab ===
// //                     "subscriptions" &&
// //                     styles.activeCountText,
// //                 ]}
// //               >
// //                 {subscriptionsCount}
// //               </Text>

// //               <Text
// //                 style={[
// //                   styles.countLabel,
// //                   activeTab ===
// //                     "subscriptions" &&
// //                     styles.activeCountLabel,
// //                 ]}
// //               >
// //                 Subscriptions
// //               </Text>

// //             </TouchableOpacity>

// //           </View>


// //           {/* ============================================ */}
// //           {/* TAB LINE */}
// //           {/* ============================================ */}

// //           <View
// //             style={
// //               styles.tabLineContainer
// //             }
// //           >

// //             <View
// //               style={[
// //                 styles.activeTabLine,

// //                 activeTab ===
// //                   "followers" && {
// //                   left: "0%",
// //                 },

// //                 activeTab ===
// //                   "following" && {
// //                   left: "33.33%",
// //                 },

// //                 activeTab ===
// //                   "subscriptions" && {
// //                   left: "66.66%",
// //                 },

// //               ]}
// //             />

// //           </View>


// //           {/* ============================================ */}
// //           {/* SEARCH */}
// //           {/* ============================================ */}

// //           <View
// //             style={
// //               styles.searchContainer
// //             }
// //           >

// //             <Ionicons
// //               name="search"
// //               size={25}
// //               color="#A7A7A7"
// //             />


// //             <TextInput
// //               value={searchText}
// //               onChangeText={
// //                 setSearchText
// //               }
// //               placeholder="Search"
// //               placeholderTextColor="#A7A7A7"
// //               style={
// //                 styles.searchInput
// //               }
// //               autoCapitalize="none"
// //               autoCorrect={false}
// //               returnKeyType="search"
// //             />


// //             {searchText.length > 0 && (

// //               <TouchableOpacity
// //                 onPress={() =>
// //                   setSearchText("")
// //                 }
// //                 hitSlop={10}
// //               >

// //                 <Ionicons
// //                   name="close-circle"
// //                   size={21}
// //                   color="#777"
// //                 />

// //               </TouchableOpacity>

// //             )}

// //           </View>


// //           {/* ============================================ */}
// //           {/* SORT */}
// //           {/* ============================================ */}

// //           <View
// //             style={
// //               styles.sortRow
// //             }
// //           >

// //             <Text
// //               style={
// //                 styles.sortText
// //               }
// //             >
// //               {sortAscending
// //                 ? "Sorted by Default"
// //                 : "Sorted Z-A"}
// //             </Text>


// //             <TouchableOpacity
// //               style={
// //                 styles.sortButton
// //               }
// //               hitSlop={10}
// //               activeOpacity={0.7}
// //               onPress={() =>
// //                 setSortAscending(
// //                   (previous) =>
// //                     !previous
// //                 )
// //               }
// //             >

// //               <Ionicons
// //                 name={
// //                   sortAscending
// //                     ? "swap-vertical-outline"
// //                     : "swap-vertical"
// //                 }
// //                 size={34}
// //                 color="#fff"
// //               />

// //             </TouchableOpacity>

// //           </View>

// //         </View>

// //       );

// //     };


// //   // ======================================================
// //   // LOADING
// //   // ======================================================

// //   if (
// //     activeLoading &&
// //     (!activeData ||
// //       activeData.length === 0)
// //   ) {

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

// //   if (
// //     activeError &&
// //     (!activeData ||
// //       activeData.length === 0)
// //   ) {

// //     return (

// //       <View
// //         style={
// //           styles.center
// //         }
// //       >

// //         <Ionicons
// //           name="alert-circle-outline"
// //           size={45}
// //           color="#777"
// //         />


// //         <Text
// //           style={
// //             styles.errorText
// //           }
// //         >
// //           {typeof activeError === "string"
// //             ? activeError
// //             : activeError?.message ||
// //               activeError?.detail ||
// //               `Unable to load ${activeTab}`}
// //         </Text>


// //         <TouchableOpacity
// //           style={
// //             styles.retryButton
// //           }
// //           onPress={
// //             loadActiveTab
// //           }
// //         >

// //           <Text
// //             style={
// //               styles.retryText
// //             }
// //           >
// //             Try Again
// //           </Text>

// //         </TouchableOpacity>

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

// //       <FlatList

// //         data={
// //           filteredData
// //         }


// //         keyExtractor={(
// //           item,
// //           index
// //         ) =>
// //           item?.id
// //             ? String(item.id)
// //             : String(index)
// //         }


// //         renderItem={
// //           renderUser
// //         }


// //         ListHeaderComponent={
// //           ListHeader
// //         }


// //         showsVerticalScrollIndicator={
// //           false
// //         }


// //         keyboardShouldPersistTaps="handled"


// //         contentContainerStyle={
// //           filteredData.length === 0
// //             ? styles.emptyList
// //             : styles.listContent
// //         }


// //         ListEmptyComponent={

// //           <View
// //             style={
// //               styles.emptyContainer
// //             }
// //           >

// //             <Ionicons
// //               name={
// //                 searchText
// //                   ? "search-outline"
// //                   : "people-outline"
// //               }
// //               size={48}
// //               color="#666"
// //             />


// //             <Text
// //               style={
// //                 styles.emptyTitle
// //               }
// //             >

// //               {searchText
// //                 ? "No results found"
// //                 : activeTab ===
// //                     "followers"
// //                   ? "No followers yet"
// //                   : activeTab ===
// //                       "following"
// //                     ? "Not following anyone"
// //                     : "No subscriptions yet"}

// //             </Text>


// //             {searchText && (

// //               <Text
// //                 style={
// //                   styles.emptySubText
// //                 }
// //               >
// //                 Try searching with
// //                 another username
// //               </Text>

// //             )}

// //           </View>

// //         }


// //         refreshing={
// //           activeLoading &&
// //           activeData?.length > 0
// //         }


// //         onRefresh={
// //           loadActiveTab
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

// //     // ==================================================
// //     // CONTAINER
// //     // ==================================================

// //     container: {
// //       flex: 1,
// //       backgroundColor: "#0B0E12",
// //     },

// //     listContent: {
// //       paddingBottom: 30,
// //     },

// //     emptyList: {
// //       flexGrow: 1,
// //       paddingBottom: 30,
// //     },


// //     // ==================================================
// //     // TOP HEADER
// //     // ==================================================

// //     topHeader: {
// //       height: 92,
// //       paddingTop: 42,
// //       paddingHorizontal: 20,

// //       flexDirection: "row",

// //       alignItems: "center",

// //       justifyContent:
// //         "space-between",
// //     },

// //     backButton: {
// //       width: 45,

// //       alignItems:
// //         "flex-start",

// //       justifyContent:
// //         "center",
// //     },

// //     headerUsername: {
// //       flex: 1,

// //       color: "#fff",

// //       fontSize: 23,

// //       fontWeight: "700",

// //       textAlign: "center",

// //       marginHorizontal: 10,
// //     },

// //     addPersonButton: {
// //       width: 45,

// //       alignItems:
// //         "flex-end",

// //       justifyContent:
// //         "center",
// //     },


// //     // ==================================================
// //     // COUNTS / TABS
// //     // ==================================================

// //     countsContainer: {
// //       height: 68,

// //       flexDirection: "row",

// //       alignItems: "center",

// //       justifyContent:
// //         "space-around",

// //       paddingHorizontal: 15,
// //     },

// //     countItem: {
// //       flex: 1,

// //       alignItems: "center",

// //       justifyContent:
// //         "center",
// //     },

// //     countText: {
// //       color: "#F2F2F2",

// //       fontSize: 17,

// //       fontWeight: "700",
// //     },

// //     countLabel: {
// //       color: "#D4D4D4",

// //       fontSize: 14,

// //       marginTop: 4,
// //     },

// //     activeCountText: {
// //       color: "#FFFFFF",
// //     },

// //     activeCountLabel: {
// //       color: "#FFFFFF",

// //       fontWeight: "600",
// //     },


// //     // ==================================================
// //     // TAB LINE
// //     // ==================================================

// //     tabLineContainer: {
// //       height: 2,

// //       backgroundColor:
// //         "#292D32",

// //       position: "relative",

// //       marginTop: 5,

// //       width: "100%",
// //     },

// //     activeTabLine: {
// //       position: "absolute",

// //       width: "33.33%",

// //       height: 3,

// //       backgroundColor: "#FFFFFF",

// //       top: -1,

// //       /*
// //         left changes dynamically:
// //         Followers      = 0%
// //         Following      = 33.33%
// //         Subscriptions  = 66.66%
// //       */
// //     },


// //     // ==================================================
// //     // SEARCH
// //     // ==================================================

// //     searchContainer: {
// //       height: 58,

// //       marginHorizontal: 29,

// //       marginTop: 20,

// //       borderRadius: 18,

// //       backgroundColor:
// //         "#24282E",

// //       flexDirection: "row",

// //       alignItems: "center",

// //       paddingHorizontal: 17,
// //     },

// //     searchInput: {
// //       flex: 1,

// //       color: "#fff",

// //       fontSize: 18,

// //       marginLeft: 14,

// //       paddingVertical: 0,
// //     },


// //     // ==================================================
// //     // SORT
// //     // ==================================================

// //     sortRow: {
// //       height: 92,

// //       paddingHorizontal: 29,

// //       flexDirection: "row",

// //       alignItems: "center",

// //       justifyContent:
// //         "space-between",
// //     },

// //     sortText: {
// //       color: "#F0F0F0",

// //       fontSize: 17,

// //       fontWeight: "500",
// //     },

// //     sortButton: {
// //       width: 45,

// //       height: 50,

// //       alignItems: "center",

// //       justifyContent: "center",
// //     },


// //     // ==================================================
// //     // USER ROW
// //     // ==================================================

// //     userRow: {
// //       minHeight: 92,

// //       paddingHorizontal: 38,

// //       flexDirection: "row",

// //       alignItems: "center",
// //     },


// //     // ==================================================
// //     // AVATAR
// //     // ==================================================

// //     avatar: {
// //       width: 70,

// //       height: 70,

// //       borderRadius: 35,

// //       backgroundColor:
// //         "#24282E",
// //     },

// //     avatarPlaceholder: {
// //       width: 70,

// //       height: 70,

// //       borderRadius: 35,

// //       backgroundColor:
// //         "#24282E",

// //       alignItems: "center",

// //       justifyContent:
// //         "center",
// //     },


// //     // ==================================================
// //     // USER INFO
// //     // ==================================================

// //     userInfo: {
// //       flex: 1,

// //       minWidth: 0,

// //       marginLeft: 15,

// //       marginRight: 10,
// //     },

// //     username: {
// //       color: "#fff",

// //       fontSize: 16,

// //       fontWeight: "700",
// //     },

// //     fullName: {
// //       color: "#A6A6A6",

// //       fontSize: 15,

// //       marginTop: 4,
// //     },

// //     newPostRow: {
// //       flexDirection: "row",

// //       alignItems: "center",

// //       marginTop: 2,
// //     },

// //     newPostText: {
// //       color: "#999",

// //       fontSize: 14,
// //     },

// //     blueDot: {
// //       width: 8,

// //       height: 8,

// //       borderRadius: 4,

// //       backgroundColor:
// //         "#6878FF",

// //       marginLeft: 5,
// //     },


// //     // ==================================================
// //     // MESSAGE
// //     // ==================================================

// //     messageButton: {
// //       width: 112,

// //       height: 58,

// //       borderRadius: 14,

// //       backgroundColor:
// //         "#2B3036",

// //       alignItems: "center",

// //       justifyContent: "center",
// //     },

// //     messageText: {
// //       color: "#F5F5F5",

// //       fontSize: 16,

// //       fontWeight: "700",
// //     },


// //     // ==================================================
// //     // MORE
// //     // ==================================================

// //     moreButton: {
// //       width: 30,

// //       height: 58,

// //       marginLeft: 9,

// //       alignItems: "center",

// //       justifyContent: "center",
// //     },


// //     // ==================================================
// //     // EMPTY
// //     // ==================================================

// //     emptyContainer: {
// //       flex: 1,

// //       alignItems: "center",

// //       justifyContent: "center",

// //       paddingHorizontal: 30,

// //       paddingTop: 50,
// //     },

// //     emptyTitle: {
// //       color: "#fff",

// //       fontSize: 18,

// //       fontWeight: "600",

// //       marginTop: 14,

// //       textAlign: "center",
// //     },

// //     emptySubText: {
// //       color: "#777",

// //       fontSize: 14,

// //       marginTop: 7,

// //       textAlign: "center",
// //     },


// //     // ==================================================
// //     // LOADING / ERROR
// //     // ==================================================

// //     center: {
// //       flex: 1,

// //       backgroundColor:
// //         "#0B0E12",

// //       alignItems: "center",

// //       justifyContent: "center",

// //       paddingHorizontal: 30,
// //     },

// //     errorText: {
// //       color: "#aaa",

// //       fontSize: 15,

// //       textAlign: "center",

// //       marginTop: 15,
// //     },

// //     retryButton: {
// //       marginTop: 20,

// //       paddingHorizontal: 25,

// //       paddingVertical: 11,

// //       borderRadius: 10,

// //       backgroundColor:
// //         "#2B3036",
// //     },

// //     retryText: {
// //       color: "#fff",

// //       fontSize: 15,

// //       fontWeight: "600",
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
//   getFollowers,
//   getFollowing,
//   unfollowUser,

//   selectFollowers,
//   selectFollowersLoading,
//   selectFollowersError,

//   selectFollowing,
//   selectFollowingLoading,
//   selectFollowingError,
// } from "../../src/redux/followSlice";

// import {
//   getProfile,
// } from "../../src/redux/profileSlice";

// import {
//   getMediaUrl,
// } from "../../src/utils/media";

// import {
//   Ionicons,
// } from "@expo/vector-icons";


// export default function FollowersScreen() {

//   const dispatch = useDispatch();

//   const router = useRouter();

//   const {
//     userId,
//   } = useLocalSearchParams();


//   // ======================================================
//   // NORMALIZE USER ID
//   // ======================================================

//   const profileUserId =
//     userId
//       ? Number(userId)
//       : null;


//   // ======================================================
//   // STATE
//   // ======================================================

//   const [
//     activeTab,
//     setActiveTab,
//   ] = useState("followers");

//   const [
//     searchText,
//     setSearchText,
//   ] = useState("");

//   const [
//     sortAscending,
//     setSortAscending,
//   ] = useState(true);


//   // ======================================================
//   // FOLLOWERS REDUX
//   // ======================================================

//   const followers =
//     useSelector(
//       selectFollowers
//     );

//   const followersLoading =
//     useSelector(
//       selectFollowersLoading
//     );

//   const followersError =
//     useSelector(
//       selectFollowersError
//     );


//   // ======================================================
//   // FOLLOWING REDUX
//   // ======================================================

//   const following =
//     useSelector(
//       selectFollowing
//     );

//   const followingLoading =
//     useSelector(
//       selectFollowingLoading
//     );

//   const followingError =
//     useSelector(
//       selectFollowingError
//     );


//   // ======================================================
//   // PROFILE
//   // ======================================================

//   const profileData =
//     useSelector(
//       (state) =>
//         userId
//           ? state.profile?.profiles?.[userId]
//           : null
//     );


//   // ======================================================
//   // SUBSCRIPTIONS
//   // ======================================================

//   const subscriptions = [];


//   // ======================================================
//   // COUNTS
//   // ======================================================

//   const followersCount =
//     profileData?.followers_count ??
//     profileData?.followers ??
//     followers?.length ??
//     0;


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
//   // ACTIVE DATA
//   // ======================================================

//   const activeData =
//     activeTab === "followers"
//       ? followers
//       : activeTab === "following"
//         ? following
//         : subscriptions;


//   // ======================================================
//   // ACTIVE LOADING
//   // ======================================================

//   const activeLoading =
//     activeTab === "followers"
//       ? followersLoading
//       : activeTab === "following"
//         ? followingLoading
//         : false;


//   // ======================================================
//   // ACTIVE ERROR
//   // ======================================================

//   const activeError =
//     activeTab === "followers"
//       ? followersError
//       : activeTab === "following"
//         ? followingError
//         : null;


//   // ======================================================
//   // LOAD FOLLOWERS
//   // ======================================================

//   const loadFollowers =
//     useCallback(() => {

//       if (!profileUserId) {
//         return;
//       }

//       console.log(
//         "======================================"
//       );

//       console.log(
//         "LOADING FOLLOWERS"
//       );

//       console.log(
//         "PROFILE USER ID =>",
//         profileUserId
//       );

//       console.log(
//         "======================================"
//       );


//       dispatch(
//         getFollowers({
//           userId: profileUserId,
//           limit: 100,
//           offset: 0,
//         })
//       );

//     }, [
//       dispatch,
//       profileUserId,
//     ]);


//   // ======================================================
//   // LOAD FOLLOWING
//   // ======================================================

//   const loadFollowing =
//     useCallback(() => {

//       if (!profileUserId) {
//         return;
//       }

//       console.log(
//         "======================================"
//       );

//       console.log(
//         "LOADING FOLLOWING"
//       );

//       console.log(
//         "PROFILE USER ID =>",
//         profileUserId
//       );

//       console.log(
//         "======================================"
//       );


//       dispatch(
//         getFollowing({
//           userId: profileUserId,
//           limit: 100,
//           offset: 0,
//         })
//       );

//     }, [
//       dispatch,
//       profileUserId,
//     ]);


//   // ======================================================
//   // LOAD ACTIVE TAB
//   // ======================================================

//   const loadActiveTab =
//     useCallback(() => {

//       if (!profileUserId) {
//         return;
//       }


//       // ==================================================
//       // FOLLOWERS
//       // ==================================================

//       if (
//         activeTab === "followers"
//       ) {

//         loadFollowers();

//       }


//       // ==================================================
//       // FOLLOWING
//       // ==================================================

//       else if (
//         activeTab === "following"
//       ) {

//         loadFollowing();

//       }


//       // ==================================================
//       // SUBSCRIPTIONS
//       // ==================================================

//       else if (
//         activeTab === "subscriptions"
//       ) {

//         console.log(
//           "SUBSCRIPTIONS TAB SELECTED"
//         );

//       }

//     }, [
//       activeTab,
//       profileUserId,
//       loadFollowers,
//       loadFollowing,
//     ]);


//   // ======================================================
//   // INITIAL PROFILE LOAD
//   // ======================================================

//   useEffect(() => {

//     if (!profileUserId) {
//       return;
//     }

//     dispatch(
//       getProfile(
//         profileUserId
//       )
//     );

//   }, [
//     dispatch,
//     profileUserId,
//   ]);


//   // ======================================================
//   // LOAD WHEN TAB CHANGES
//   // ======================================================

//   useEffect(() => {

//     loadActiveTab();

//     setSearchText("");

//   }, [
//     activeTab,
//     loadActiveTab,
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
//         "CONNECTIONS SCREEN FOCUSED"
//       );


//       loadActiveTab();


//       dispatch(
//         getProfile(
//           profileUserId
//         )
//       );

//     }, [
//       profileUserId,
//       loadActiveTab,
//       dispatch,
//     ])
//   );


//   // ======================================================
//   // SEARCH + SORT
//   // ======================================================

//   const filteredData =
//     useMemo(() => {

//       if (!Array.isArray(activeData)) {
//         return [];
//       }


//       const search =
//         searchText
//           .trim()
//           .toLowerCase();


//       let result =
//         activeData.filter(
//           (item) => {

//             if (!search) {
//               return true;
//             }


//             const username =
//               String(
//                 item?.username || ""
//               ).toLowerCase();


//             const fullName =
//               String(
//                 item?.full_name || ""
//               ).toLowerCase();


//             return (
//               username.includes(search) ||
//               fullName.includes(search)
//             );

//           }
//         );


//       result =
//         [...result].sort(
//           (a, b) => {

//             const usernameA =
//               String(
//                 a?.username || ""
//               ).toLowerCase();


//             const usernameB =
//               String(
//                 b?.username || ""
//               ).toLowerCase();


//             return sortAscending
//               ? usernameA.localeCompare(
//                   usernameB
//                 )
//               : usernameB.localeCompare(
//                   usernameA
//                 );

//           }
//         );


//       return result;

//     }, [
//       activeData,
//       searchText,
//       sortAscending,
//     ]);


//   // ======================================================
//   // OPEN USER PROFILE
//   // ======================================================

//   const openUserProfile =
//     (selectedUserId) => {

//       if (!selectedUserId) {
//         return;
//       }


//       router.push({
//         pathname:
//           "/profile-screens/user-profile",

//         params: {
//           userId:
//             String(selectedUserId),
//         },
//       });

//     };


//   // ======================================================
//   // MESSAGE
//   // ======================================================

//   const handleMessage =
//     (item) => {

//       console.log(
//         "MESSAGE USER =>",
//         item
//       );


//       Alert.alert(
//         "Message",

//         `Open chat with ${
//           item?.username || "user"
//         }`
//       );

//     };


//   // ======================================================
//   // UNFOLLOW
//   // ======================================================

//   const handleUnfollow =
//     async (item) => {

//       if (!item?.id) {
//         return;
//       }


//       try {

//         console.log(
//           "======================================"
//         );

//         console.log(
//           "UNFOLLOW USER"
//         );

//         console.log(
//           "TARGET USER ID =>",
//           item.id
//         );

//         console.log(
//           "======================================"
//         );


//         // ==================================================
//         // DELETE /api/follow/{user_id}
//         // ==================================================

//         await dispatch(
//           unfollowUser(
//             Number(item.id)
//           )
//         ).unwrap();


//         console.log(
//           "UNFOLLOW SUCCESS =>",
//           item.id
//         );


//         // ==================================================
//         // RELOAD FOLLOWING LIST
//         // ==================================================

//         await dispatch(
//           getFollowing({
//             userId:
//               profileUserId,

//             limit: 100,

//             offset: 0,
//           })
//         );


//         // ==================================================
//         // REFRESH PROFILE COUNTS
//         // ==================================================

//         await dispatch(
//           getProfile(
//             profileUserId
//           )
//         );


//       } catch (error) {

//         console.log(
//           "======================================"
//         );

//         console.log(
//           "UNFOLLOW ERROR"
//         );

//         console.log(
//           error
//         );

//         console.log(
//           "======================================"
//         );


//         const errorMessage =
//           typeof error === "string"
//             ? error
//             : error?.message ||
//               error?.detail ||
//               "Unable to unfollow this user.";


//         Alert.alert(
//           "Unfollow Failed",
//           errorMessage
//         );

//       }

//     };


//   // ======================================================
//   // MORE MENU
//   // ======================================================

//   const handleMore =
//     (item) => {

//       if (!item?.id) {
//         return;
//       }


//       // ==================================================
//       // FOLLOWERS TAB
//       //
//       // YOU CANNOT UNFOLLOW FROM HERE.
//       // ==================================================

//       if (
//         activeTab === "followers"
//       ) {

//         Alert.alert(
//           item?.username || "User",

//           "Choose an action",

//           [
//             {
//               text: "Cancel",

//               style: "cancel",
//             },

//             {
//               text: "View profile",

//               onPress: () =>
//                 openUserProfile(
//                   item.id
//                 ),
//             },

//           ]
//         );

//         return;
//       }


//       // ==================================================
//       // FOLLOWING TAB
//       //
//       // YOU CAN UNFOLLOW.
//       // ==================================================

//       if (
//         activeTab === "following"
//       ) {

//         Alert.alert(
//           item?.username || "User",

//           "Choose an action",

//           [
//             {
//               text: "Cancel",

//               style: "cancel",
//             },

//             {
//               text: "Unfollow",

//               style: "destructive",

//               onPress: () =>
//                 handleUnfollow(
//                   item
//                 ),
//             },

//             {
//               text: "View profile",

//               onPress: () =>
//                 openUserProfile(
//                   item.id
//                 ),
//             },

//           ]
//         );

//         return;
//       }


//       // ==================================================
//       // SUBSCRIPTIONS
//       // ==================================================

//       if (
//         activeTab === "subscriptions"
//       ) {

//         Alert.alert(
//           item?.username || "User",

//           "Choose an action",

//           [
//             {
//               text: "Cancel",

//               style: "cancel",
//             },

//             {
//               text: "View profile",

//               onPress: () =>
//                 openUserProfile(
//                   item.id
//                 ),
//             },

//           ]
//         );

//       }

//     };


//   // ======================================================
//   // RENDER USER
//   // ======================================================

//   const renderUser =
//     ({
//       item,
//     }) => {

//       const avatarUrl =
//         item?.avatar_url
//           ? getMediaUrl(
//               item.avatar_url
//             )
//           : null;


//       return (

//         <View
//           style={
//             styles.userRow
//           }
//         >

//           {/* ============================================ */}
//           {/* AVATAR */}
//           {/* ============================================ */}

//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={() =>
//               openUserProfile(
//                 item?.id
//               )
//             }
//           >

//             {avatarUrl ? (

//               <Image
//                 source={{
//                   uri: avatarUrl,
//                 }}
//                 style={
//                   styles.avatar
//                 }
//               />

//             ) : (

//               <View
//                 style={
//                   styles.avatarPlaceholder
//                 }
//               >

//                 <Ionicons
//                   name="person"
//                   size={28}
//                   color="#777"
//                 />

//               </View>

//             )}

//           </TouchableOpacity>


//           {/* ============================================ */}
//           {/* USER INFO */}
//           {/* ============================================ */}

//           <TouchableOpacity
//             style={
//               styles.userInfo
//             }
//             activeOpacity={0.7}
//             onPress={() =>
//               openUserProfile(
//                 item?.id
//               )
//             }
//           >

//             <Text
//               style={
//                 styles.username
//               }
//               numberOfLines={1}
//             >
//               {item?.username || ""}
//             </Text>


//             <Text
//               style={
//                 styles.fullName
//               }
//               numberOfLines={1}
//             >
//               {item?.full_name || ""}
//             </Text>


//             {item?.new_posts_count > 0 && (

//               <View
//                 style={
//                   styles.newPostRow
//                 }
//               >

//                 <Text
//                   style={
//                     styles.newPostText
//                   }
//                 >
//                   {item.new_posts_count}{" "}
//                   new{" "}
//                   {item.new_posts_count === 1
//                     ? "post"
//                     : "posts"}
//                 </Text>


//                 <View
//                   style={
//                     styles.blueDot
//                   }
//                 />

//               </View>

//             )}

//           </TouchableOpacity>


//           {/* ============================================ */}
//           {/* MESSAGE */}
//           {/* ============================================ */}

//           <TouchableOpacity
//             style={
//               styles.messageButton
//             }
//             activeOpacity={0.8}
//             onPress={() =>
//               handleMessage(item)
//             }
//           >

//             <Text
//               style={
//                 styles.messageText
//               }
//             >
//               Message
//             </Text>

//           </TouchableOpacity>


//           {/* ============================================ */}
//           {/* MORE */}
//           {/* ============================================ */}

//           <TouchableOpacity
//             style={
//               styles.moreButton
//             }
//             hitSlop={10}
//             activeOpacity={0.7}
//             onPress={() =>
//               handleMore(item)
//             }
//           >

//             <Ionicons
//               name="ellipsis-vertical"
//               size={23}
//               color="#fff"
//             />

//           </TouchableOpacity>

//         </View>

//       );

//     };


//   // ======================================================
//   // HEADER
//   // ======================================================

//   const ListHeader =
//     () => {

//       return (

//         <View>

//           {/* ============================================ */}
//           {/* TOP HEADER */}
//           {/* ============================================ */}

//           <View
//             style={
//               styles.topHeader
//             }
//           >

//             <TouchableOpacity
//               style={
//                 styles.backButton
//               }
//               onPress={() =>
//                 router.back()
//               }
//               hitSlop={10}
//             >

//               <Ionicons
//                 name="arrow-back"
//                 size={32}
//                 color="#fff"
//               />

//             </TouchableOpacity>


//             <Text
//               style={
//                 styles.headerUsername
//               }
//               numberOfLines={1}
//             >
//               {profileData?.username || ""}
//             </Text>


//             <TouchableOpacity
//               style={
//                 styles.addPersonButton
//               }
//               hitSlop={10}
//               activeOpacity={0.7}
//             >

//               <Ionicons
//                 name="person-add-outline"
//                 size={27}
//                 color="#fff"
//               />

//             </TouchableOpacity>

//           </View>


//           {/* ============================================ */}
//           {/* COUNTS / TABS */}
//           {/* ============================================ */}

//           <View
//             style={
//               styles.countsContainer
//             }
//           >

//             {/* ========================================== */}
//             {/* FOLLOWERS */}
//             {/* ========================================== */}

//             <TouchableOpacity
//               style={
//                 styles.countItem
//               }
//               activeOpacity={0.7}
//               onPress={() => {

//                 setActiveTab(
//                   "followers"
//                 );

//               }}
//             >

//               <Text
//                 style={[
//                   styles.countText,

//                   activeTab ===
//                     "followers" &&
//                     styles.activeCountText,
//                 ]}
//               >
//                 {followersCount}
//               </Text>


//               <Text
//                 style={[
//                   styles.countLabel,

//                   activeTab ===
//                     "followers" &&
//                     styles.activeCountLabel,
//                 ]}
//               >
//                 Followers
//               </Text>

//             </TouchableOpacity>


//             {/* ========================================== */}
//             {/* FOLLOWING */}
//             {/* ========================================== */}

//             <TouchableOpacity
//               style={
//                 styles.countItem
//               }
//               activeOpacity={0.7}
//               onPress={() => {

//                 setActiveTab(
//                   "following"
//                 );

//               }}
//             >

//               <Text
//                 style={[
//                   styles.countText,

//                   activeTab ===
//                     "following" &&
//                     styles.activeCountText,
//                 ]}
//               >
//                 {followingCount}
//               </Text>


//               <Text
//                 style={[
//                   styles.countLabel,

//                   activeTab ===
//                     "following" &&
//                     styles.activeCountLabel,
//                 ]}
//               >
//                 Following
//               </Text>

//             </TouchableOpacity>


//             {/* ========================================== */}
//             {/* SUBSCRIPTIONS */}
//             {/* ========================================== */}

//             <TouchableOpacity
//               style={
//                 styles.countItem
//               }
//               activeOpacity={0.7}
//               onPress={() => {

//                 setActiveTab(
//                   "subscriptions"
//                 );

//               }}
//             >

//               <Text
//                 style={[
//                   styles.countText,

//                   activeTab ===
//                     "subscriptions" &&
//                     styles.activeCountText,
//                 ]}
//               >
//                 {subscriptionsCount}
//               </Text>


//               <Text
//                 style={[
//                   styles.countLabel,

//                   activeTab ===
//                     "subscriptions" &&
//                     styles.activeCountLabel,
//                 ]}
//               >
//                 Subscriptions
//               </Text>

//             </TouchableOpacity>

//           </View>


//           {/* ============================================ */}
//           {/* TAB LINE */}
//           {/* ============================================ */}

//           <View
//             style={
//               styles.tabLineContainer
//             }
//           >

//             <View
//               style={[
//                 styles.activeTabLine,

//                 activeTab ===
//                   "followers" && {
//                   left: "0%",
//                 },

//                 activeTab ===
//                   "following" && {
//                   left: "33.33%",
//                 },

//                 activeTab ===
//                   "subscriptions" && {
//                   left: "66.66%",
//                 },

//               ]}
//             />

//           </View>


//           {/* ============================================ */}
//           {/* SEARCH */}
//           {/* ============================================ */}

//           <View
//             style={
//               styles.searchContainer
//             }
//           >

//             <Ionicons
//               name="search"
//               size={25}
//               color="#A7A7A7"
//             />


//             <TextInput
//               value={
//                 searchText
//               }

//               onChangeText={
//                 setSearchText
//               }

//               placeholder="Search"

//               placeholderTextColor="#A7A7A7"

//               style={
//                 styles.searchInput
//               }

//               autoCapitalize="none"

//               autoCorrect={false}

//               returnKeyType="search"
//             />


//             {searchText.length > 0 && (

//               <TouchableOpacity
//                 onPress={() =>
//                   setSearchText("")
//                 }
//                 hitSlop={10}
//               >

//                 <Ionicons
//                   name="close-circle"
//                   size={21}
//                   color="#777"
//                 />

//               </TouchableOpacity>

//             )}

//           </View>


//           {/* ============================================ */}
//           {/* SORT */}
//           {/* ============================================ */}

//           <View
//             style={
//               styles.sortRow
//             }
//           >

//             <Text
//               style={
//                 styles.sortText
//               }
//             >
//               {sortAscending
//                 ? "Sorted by Default"
//                 : "Sorted Z-A"}
//             </Text>


//             <TouchableOpacity
//               style={
//                 styles.sortButton
//               }
//               hitSlop={10}
//               activeOpacity={0.7}
//               onPress={() =>
//                 setSortAscending(
//                   (previous) =>
//                     !previous
//                 )
//               }
//             >

//               <Ionicons
//                 name={
//                   sortAscending
//                     ? "swap-vertical-outline"
//                     : "swap-vertical"
//                 }
//                 size={34}
//                 color="#fff"
//               />

//             </TouchableOpacity>

//           </View>

//         </View>

//       );

//     };


//   // ======================================================
//   // LOADING
//   // ======================================================

//   if (
//     activeLoading &&
//     (!activeData ||
//       activeData.length === 0)
//   ) {

//     return (

//       <View
//         style={
//           styles.center
//         }
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
//     activeError &&
//     (!activeData ||
//       activeData.length === 0)
//   ) {

//     return (

//       <View
//         style={
//           styles.center
//         }
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
//           {typeof activeError === "string"
//             ? activeError
//             : activeError?.message ||
//               activeError?.detail ||
//               `Unable to load ${activeTab}`}
//         </Text>


//         <TouchableOpacity
//           style={
//             styles.retryButton
//           }
//           onPress={
//             loadActiveTab
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
//           filteredData
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
//           renderUser
//         }


//         ListHeaderComponent={
//           ListHeader
//         }


//         showsVerticalScrollIndicator={
//           false
//         }


//         keyboardShouldPersistTaps="handled"


//         contentContainerStyle={
//           filteredData.length === 0
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
//                 : activeTab ===
//                     "followers"
//                   ? "No followers yet"
//                   : activeTab ===
//                       "following"
//                     ? "Not following anyone"
//                     : "No subscriptions yet"}

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
//           activeLoading &&
//           activeData?.length > 0
//         }


//         onRefresh={
//           loadActiveTab
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

//       justifyContent:
//         "space-between",
//     },

//     backButton: {
//       width: 45,

//       alignItems:
//         "flex-start",

//       justifyContent:
//         "center",
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

//       alignItems:
//         "flex-end",

//       justifyContent:
//         "center",
//     },


//     // ==================================================
//     // COUNTS / TABS
//     // ==================================================

//     countsContainer: {
//       height: 68,

//       flexDirection: "row",

//       alignItems: "center",

//       justifyContent:
//         "space-around",

//       paddingHorizontal: 15,
//     },

//     countItem: {
//       flex: 1,

//       alignItems: "center",

//       justifyContent:
//         "center",
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

//     activeCountText: {
//       color: "#FFFFFF",
//     },

//     activeCountLabel: {
//       color: "#FFFFFF",

//       fontWeight: "600",
//     },


//     // ==================================================
//     // TAB LINE
//     // ==================================================

//     tabLineContainer: {
//       height: 2,

//       backgroundColor:
//         "#292D32",

//       position: "relative",

//       marginTop: 5,

//       width: "100%",
//     },

//     activeTabLine: {
//       position: "absolute",

//       width: "33.33%",

//       height: 3,

//       backgroundColor: "#FFFFFF",

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

//       backgroundColor:
//         "#24282E",

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

//       justifyContent:
//         "space-between",
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

//       backgroundColor:
//         "#24282E",
//     },

//     avatarPlaceholder: {
//       width: 70,

//       height: 70,

//       borderRadius: 35,

//       backgroundColor:
//         "#24282E",

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

//       backgroundColor:
//         "#6878FF",

//       marginLeft: 5,
//     },


//     // ==================================================
//     // MESSAGE
//     // ==================================================

//     messageButton: {
//       width: 112,

//       height: 58,

//       borderRadius: 14,

//       backgroundColor:
//         "#2B3036",

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

//       textAlign: "center",
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

//       backgroundColor:
//         "#0B0E12",

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

//       backgroundColor:
//         "#2B3036",
//     },

//     retryText: {
//       color: "#fff",

//       fontSize: 15,

//       fontWeight: "600",
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
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
  useFocusEffect,
} from "expo-router";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getFollowers,
  getFollowing,
  unfollowUser,

  selectFollowers,
  selectFollowersLoading,
  selectFollowersError,

  selectFollowing,
  selectFollowingLoading,
  selectFollowingError,
} from "../../src/redux/followSlice";

import {
  getProfile,
} from "../../src/redux/profileSlice";

import { createConversation } from "../../src/redux/chatSlice";

import {
  getMediaUrl,
} from "../../src/utils/media";

import {
  Ionicons,
} from "@expo/vector-icons";

import ScreenLayout from "../../src/components/ScreenLayout";


export default function FollowersScreen() {

  const dispatch = useDispatch();
  const router = useRouter();

  const params = useLocalSearchParams();

  const {
    userId,
    initialTab,
  } = params;


  // ======================================================
  // USER ID
  // ======================================================

  const profileUserId =
    userId
      ? Number(userId)
      : null;


  // ======================================================
  // ACTIVE TAB
  //
  // initialTab can be:
  //
  // followers
  // following
  //
  // ======================================================

  const [activeTab, setActiveTab] = useState(
    initialTab === "following"
      ? "following"
      : "followers"
  );


  const [searchText, setSearchText] =
    useState("");


  const [sortAscending, setSortAscending] =
    useState(true);


  // ======================================================
  // IMPORTANT
  //
  // If this same screen is reused with a different
  // initialTab parameter, update activeTab.
  // ======================================================

  useEffect(() => {

    if (initialTab === "following") {

      setActiveTab("following");

    } else {

      setActiveTab("followers");

    }

  }, [initialTab]);


  // ======================================================
  // FOLLOWERS
  // ======================================================

  const followers =
    useSelector(selectFollowers);

  const followersLoading =
    useSelector(selectFollowersLoading);

  const followersError =
    useSelector(selectFollowersError);


  // ======================================================
  // FOLLOWING
  // ======================================================

  const following =
    useSelector(selectFollowing);

  const followingLoading =
    useSelector(selectFollowingLoading);

  const followingError =
    useSelector(selectFollowingError);


  // ======================================================
  // PROFILE
  // ======================================================

  const profileData =
    useSelector(
      (state) =>
        profileUserId
          ? state.profile?.profiles?.[profileUserId]
          : null
    );


  // ======================================================
  // COUNTS
  // ======================================================

  const followersCount =
    profileData?.followers_count ??
    profileData?.followers ??
    followers?.length ??
    0;


  const followingCount =
    profileData?.following_count ??
    profileData?.following ??
    following?.length ??
    0;


  // ======================================================
  // ACTIVE DATA
  // ======================================================

  const activeData =
    activeTab === "followers"
      ? followers
      : following;


  // ======================================================
  // ACTIVE LOADING
  // ======================================================

  const activeLoading =
    activeTab === "followers"
      ? followersLoading
      : followingLoading;


  // ======================================================
  // ACTIVE ERROR
  // ======================================================

  const activeError =
    activeTab === "followers"
      ? followersError
      : followingError;


  // ======================================================
  // LOAD FOLLOWERS
  // ======================================================

  const loadFollowers =
    useCallback(() => {

      if (!profileUserId) {
        return;
      }

      console.log(
        "======================================"
      );

      console.log(
        "LOADING FOLLOWERS"
      );

      console.log(
        "PROFILE USER ID =>",
        profileUserId
      );

      console.log(
        "======================================"
      );


      dispatch(
        getFollowers({
          userId: profileUserId,
          limit: 100,
          offset: 0,
        })
      );

    }, [
      dispatch,
      profileUserId,
    ]);


  // ======================================================
  // LOAD FOLLOWING
  // ======================================================

  const loadFollowing =
    useCallback(() => {

      if (!profileUserId) {
        return;
      }

      console.log(
        "======================================"
      );

      console.log(
        "LOADING FOLLOWING"
      );

      console.log(
        "PROFILE USER ID =>",
        profileUserId
      );

      console.log(
        "======================================"
      );


      dispatch(
        getFollowing({
          userId: profileUserId,
          limit: 100,
          offset: 0,
        })
      );

    }, [
      dispatch,
      profileUserId,
    ]);


  // ======================================================
  // LOAD CURRENT TAB
  // ======================================================

  const loadActiveTab =
    useCallback(() => {

      if (!profileUserId) {
        return;
      }


      if (activeTab === "followers") {

        loadFollowers();

      } else {

        loadFollowing();

      }

    }, [
      profileUserId,
      activeTab,
      loadFollowers,
      loadFollowing,
    ]);


  // ======================================================
  // INITIAL PROFILE
  // ======================================================

  useEffect(() => {

    if (!profileUserId) {
      return;
    }

    dispatch(
      getProfile(profileUserId)
    );

  }, [
    dispatch,
    profileUserId,
  ]);


  // ======================================================
  // LOAD WHEN TAB CHANGES
  // ======================================================

  useEffect(() => {

    loadActiveTab();

    setSearchText("");

  }, [
    activeTab,
    loadActiveTab,
  ]);


  // ======================================================
  // REFRESH ON FOCUS
  // ======================================================

  useFocusEffect(
    useCallback(() => {

      if (!profileUserId) {
        return;
      }

      console.log(
        "======================================"
      );

      console.log(
        "CONNECTIONS SCREEN FOCUSED"
      );

      console.log(
        "ACTIVE TAB =>",
        activeTab
      );

      console.log(
        "PROFILE USER ID =>",
        profileUserId
      );

      console.log(
        "======================================"
      );


      loadActiveTab();


      dispatch(
        getProfile(profileUserId)
      );

    }, [
      profileUserId,
      activeTab,
      loadActiveTab,
      dispatch,
    ])
  );


  // ======================================================
  // TAB NAVIGATION
  // ======================================================

  const changeTab =
    (tab) => {

      console.log(
        "CHANGING TAB =>",
        tab
      );


      setActiveTab(tab);

      setSearchText("");


      // --------------------------------------------------
      // IMPORTANT
      //
      // We do NOT navigate to another route here.
      //
      // Both Followers and Following are shown inside
      // THIS SAME SCREEN.
      // --------------------------------------------------

    };


  // ======================================================
  // SEARCH + SORT
  // ======================================================

  const filteredData =
    useMemo(() => {

      if (!Array.isArray(activeData)) {
        return [];
      }


      const search =
        searchText
          .trim()
          .toLowerCase();


      let result =
        activeData.filter(
          (item) => {

            if (!search) {
              return true;
            }


            const username =
              String(
                item?.username || ""
              ).toLowerCase();


            const fullName =
              String(
                item?.full_name || ""
              ).toLowerCase();


            return (
              username.includes(search) ||
              fullName.includes(search)
            );

          }
        );


      result =
        [...result].sort(
          (a, b) => {

            const usernameA =
              String(
                a?.username || ""
              ).toLowerCase();


            const usernameB =
              String(
                b?.username || ""
              ).toLowerCase();


            return sortAscending
              ? usernameA.localeCompare(
                  usernameB
                )
              : usernameB.localeCompare(
                  usernameA
                );

          }
        );


      return result;

    }, [
      activeData,
      searchText,
      sortAscending,
    ]);


  // ======================================================
  // OPEN USER PROFILE
  // ======================================================

  const openUserProfile =
    (selectedUserId) => {

      if (!selectedUserId) {
        return;
      }


      router.push({
        pathname:
          "/profile-screens/user-profile",

        params: {
          userId:
            String(selectedUserId),
        },

      });

    };


  // ======================================================
  // MESSAGE
  // ======================================================

const handleMessage = async (item) => {

  if (!item?.id) {
    console.log("❌ TARGET USER ID NOT FOUND");
    return;
  }

  try {

    console.log("====================================");
    console.log("💬 MESSAGE BUTTON PRESSED");
    console.log("TARGET USER ID =>", item.id);
    console.log("TARGET USERNAME =>", item.username);
    console.log("====================================");

    const conversation =
      await dispatch(
        createConversation({
          participant_ids: [
            Number(item.id),
          ],
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

      pathname:
        "/chat/[conversationId]",

      params: {

        conversationId:
          String(conversation.id),

      },

    });

  } catch (error) {

    console.log(
      "❌ CREATE CONVERSATION ERROR =>",
      error
    );

  }

};

  // ======================================================
  // UNFOLLOW
  // ======================================================

  const handleUnfollow =
    async (item) => {

      if (!item?.id) {
        return;
      }


      try {

        console.log(
          "UNFOLLOW USER =>",
          item.id
        );


        await dispatch(
          unfollowUser(
            Number(item.id)
          )
        ).unwrap();


        // Reload following list

        await dispatch(
          getFollowing({
            userId:
              profileUserId,

            limit: 100,

            offset: 0,
          })
        );


        // Refresh profile counts

        await dispatch(
          getProfile(
            profileUserId
          )
        );


      } catch (error) {

        console.log(
          "UNFOLLOW ERROR =>",
          error
        );


        const errorMessage =
          typeof error === "string"
            ? error
            : error?.message ||
              error?.detail ||
              "Unable to unfollow this user.";


        Alert.alert(
          "Unfollow Failed",
          errorMessage
        );

      }

    };


  // ======================================================
  // MORE MENU
  // ======================================================

  const handleMore =
    (item) => {

      if (!item?.id) {
        return;
      }


      // --------------------------------------------------
      // FOLLOWERS
      // --------------------------------------------------

      if (
        activeTab === "followers"
      ) {

        Alert.alert(
          item?.username || "User",

          "Choose an action",

          [

            {
              text: "Cancel",
              style: "cancel",
            },

            {
              text: "View profile",

              onPress: () =>
                openUserProfile(
                  item.id
                ),
            },

          ]

        );

        return;
      }


      // --------------------------------------------------
      // FOLLOWING
      // --------------------------------------------------

      Alert.alert(
        item?.username || "User",

        "Choose an action",

        [

          {
            text: "Cancel",
            style: "cancel",
          },

          {
            text: "Unfollow",

            style: "destructive",

            onPress: () =>
              handleUnfollow(
                item
              ),
          },

          {
            text: "View profile",

            onPress: () =>
              openUserProfile(
                item.id
              ),
          },

        ]

      );

    };


  // ======================================================
  // RENDER USER
  // ======================================================

  const renderUser =
    ({
      item,
    }) => {

      const avatarUrl =
        item?.avatar_url
          ? getMediaUrl(
              item.avatar_url
            )
          : null;


      return (

        <View
          style={
            styles.userRow
          }
        >

          {/* AVATAR */}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              openUserProfile(
                item?.id
              )
            }
          >

            {avatarUrl ? (

              <Image
                source={{
                  uri: avatarUrl,
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
                  size={28}
                  color="#777"
                />

              </View>

            )}

          </TouchableOpacity>


          {/* USER INFO */}

          <TouchableOpacity
            style={
              styles.userInfo
            }
            activeOpacity={0.7}
            onPress={() =>
              openUserProfile(
                item?.id
              )
            }
          >

            <Text
              style={
                styles.username
              }
              numberOfLines={1}
            >
              {item?.username || ""}
            </Text>


            <Text
              style={
                styles.fullName
              }
              numberOfLines={1}
            >
              {item?.full_name || ""}
            </Text>


            {item?.new_posts_count > 0 && (

              <View
                style={
                  styles.newPostRow
                }
              >

                <Text
                  style={
                    styles.newPostText
                  }
                >
                  {item.new_posts_count}{" "}
                  new{" "}
                  {
                    item.new_posts_count === 1
                      ? "post"
                      : "posts"
                  }
                </Text>


                <View
                  style={
                    styles.blueDot
                  }
                />

              </View>

            )}

          </TouchableOpacity>


          {/* MESSAGE */}

          <TouchableOpacity
            style={
              styles.messageButton
            }
            activeOpacity={0.8}
            onPress={() =>
              handleMessage(item)
            }
          >

            <Text
              style={
                styles.messageText
              }
            >
              Message
            </Text>

          </TouchableOpacity>


          {/* MORE */}

          <TouchableOpacity
            style={
              styles.moreButton
            }
            hitSlop={10}
            activeOpacity={0.7}
            onPress={() =>
              handleMore(item)
            }
          >

            <Ionicons
              name="ellipsis-vertical"
              size={23}
              color="#fff"
            />

          </TouchableOpacity>

        </View>

      );

    };


  // ======================================================
  // HEADER
  // ======================================================

  const ListHeader =
    () => {

      return (

        <View>

          {/* ================================================= */}
          {/* TOP HEADER */}
          {/* ================================================= */}

          <View
            style={
              styles.topHeader
            }
          >

            <TouchableOpacity
              style={
                styles.backButton
              }
              onPress={() =>
                router.back()
              }
              hitSlop={10}
            >

              <Ionicons
                name="arrow-back"
                size={30}
                color="#fff"
              />

            </TouchableOpacity>


            <Text
              style={
                styles.headerUsername
              }
              numberOfLines={1}
            >
              {profileData?.username || ""}
            </Text>


            <TouchableOpacity
              style={
                styles.addPersonButton
              }
              hitSlop={10}
              activeOpacity={0.7}
            >

              <Ionicons
                name="person-add-outline"
                size={27}
                color="#fff"
              />

            </TouchableOpacity>

          </View>


          {/* ================================================= */}
          {/* TABS */}
          {/* ================================================= */}

          <View
            style={
              styles.tabsContainer
            }
          >

            {/* FOLLOWERS */}

            <TouchableOpacity
              style={
                styles.tabItem
              }
              activeOpacity={0.7}
              onPress={() =>
                changeTab(
                  "followers"
                )
              }
            >

              <Text
                style={[
                  styles.countText,

                  activeTab ===
                    "followers" &&
                    styles.activeCountText,
                ]}
              >
                {followersCount}
              </Text>


              <Text
                style={[
                  styles.countLabel,

                  activeTab ===
                    "followers" &&
                    styles.activeCountLabel,
                ]}
              >
                Followers
              </Text>

            </TouchableOpacity>


            {/* FOLLOWING */}

            <TouchableOpacity
              style={
                styles.tabItem
              }
              activeOpacity={0.7}
              onPress={() =>
                changeTab(
                  "following"
                )
              }
            >

              <Text
                style={[
                  styles.countText,

                  activeTab ===
                    "following" &&
                    styles.activeCountText,
                ]}
              >
                {followingCount}
              </Text>


              <Text
                style={[
                  styles.countLabel,

                  activeTab ===
                    "following" &&
                    styles.activeCountLabel,
                ]}
              >
                Following
              </Text>

            </TouchableOpacity>

          </View>


          {/* ================================================= */}
          {/* ACTIVE TAB LINE */}
          {/* ================================================= */}

          <View
            style={
              styles.tabLineContainer
            }
          >

            <View
              style={[
                styles.activeTabLine,

                activeTab ===
                  "followers"
                  ? styles.followersLine
                  : styles.followingLine,

              ]}
            />

          </View>


          {/* ================================================= */}
          {/* SEARCH */}
          {/* ================================================= */}

          <View
            style={
              styles.searchContainer
            }
          >

            <Ionicons
              name="search"
              size={24}
              color="#A7A7A7"
            />


            <TextInput
              value={
                searchText
              }

              onChangeText={
                setSearchText
              }

              placeholder="Search"

              placeholderTextColor="#A7A7A7"

              style={
                styles.searchInput
              }

              autoCapitalize="none"

              autoCorrect={false}

              returnKeyType="search"
            />


            {searchText.length > 0 && (

              <TouchableOpacity
                onPress={() =>
                  setSearchText("")
                }
                hitSlop={10}
              >

                <Ionicons
                  name="close-circle"
                  size={21}
                  color="#777"
                />

              </TouchableOpacity>

            )}

          </View>


          {/* ================================================= */}
          {/* SORT */}
          {/* ================================================= */}

          <View
            style={
              styles.sortRow
            }
          >

            <Text
              style={
                styles.sortText
              }
            >
              {sortAscending
                ? "Sorted by Default"
                : "Sorted Z-A"}
            </Text>


            <TouchableOpacity
              style={
                styles.sortButton
              }
              hitSlop={10}
              activeOpacity={0.7}
              onPress={() =>
                setSortAscending(
                  (previous) =>
                    !previous
                )
              }
            >

              <Ionicons
                name="swap-vertical"
                size={32}
                color="#fff"
              />

            </TouchableOpacity>

          </View>

        </View>

      );

    };


  // ======================================================
  // LOADING
  // ======================================================

  if (
    activeLoading &&
    (!activeData ||
      activeData.length === 0)
  ) {

    return (
      <ScreenLayout backgroundColor="#0B0E12" keyboardAvoiding={true}>

      <View
        style={
          styles.center
        }
      >

        <ActivityIndicator
          size="large"
          color="#fff"
        />

      </View>
</ScreenLayout>
    );

  }


  // ======================================================
  // ERROR
  // ======================================================

  if (
    activeError &&
    (!activeData ||
      activeData.length === 0)
  ) {

    return (
<ScreenLayout
      backgroundColor="#0B0E12"
      keyboardAvoid={true}
    >
      <View
        style={
          styles.center
        }
      >

        <Ionicons
          name="alert-circle-outline"
          size={45}
          color="#777"
        />


        <Text
          style={
            styles.errorText
          }
        >
          {typeof activeError === "string"
            ? activeError
            : activeError?.message ||
              activeError?.detail ||
              `Unable to load ${activeTab}`}
        </Text>


        <TouchableOpacity
          style={
            styles.retryButton
          }
          onPress={
            loadActiveTab
          }
        >

          <Text
            style={
              styles.retryText
            }
          >
            Try Again
          </Text>

        </TouchableOpacity>

      </View>
</ScreenLayout>
    );

  }


  // ======================================================
  // SCREEN
  // ======================================================

  return (
     <ScreenLayout
    backgroundColor="#0B0E12"
    keyboardAvoid={true}
  >

    {/* <View
      style={
        styles.container
      }
    > */}

      <FlatList

        data={
          filteredData
        }

        keyExtractor={(
          item,
          index
        ) =>
          item?.id
            ? String(item.id)
            : String(index)
        }

        renderItem={
          renderUser
        }

        ListHeaderComponent={
          ListHeader
        }

        showsVerticalScrollIndicator={
          false
        }

        keyboardShouldPersistTaps="handled"

        contentContainerStyle={
          filteredData.length === 0
            ? styles.emptyList
            : styles.listContent
        }

        ListEmptyComponent={

          <View
            style={
              styles.emptyContainer
            }
          >

            <Ionicons
              name={
                searchText
                  ? "search-outline"
                  : "people-outline"
              }
              size={48}
              color="#666"
            />


            <Text
              style={
                styles.emptyTitle
              }
            >

              {searchText
                ? "No results found"
                : activeTab ===
                    "followers"
                  ? "No followers yet"
                  : "Not following anyone"}

            </Text>


            {searchText && (

              <Text
                style={
                  styles.emptySubText
                }
              >
                Try searching with
                another username
              </Text>

            )}

          </View>

        }

        refreshing={
          activeLoading &&
          activeData?.length > 0
        }

        onRefresh={
          loadActiveTab
        }

      />

    </ScreenLayout>

  );

}


// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({

    // container: {
    //   flex: 1,
    //   backgroundColor: "#0B0E12",
    // },

    listContent: {
      paddingBottom: 100,
    },

    emptyList: {
      flexGrow: 1,
      paddingBottom: 100,
    },


    // ==================================================
    // HEADER
    // ==================================================

    topHeader: {
      height: 60,
      // paddingTop: 42,
      paddingHorizontal: 20,

      flexDirection: "row",

      alignItems: "center",

      justifyContent:
        "space-between",
    },

    backButton: {
      width: 45,

      alignItems:
        "flex-start",

      justifyContent:
        "center",
    },

    headerUsername: {
      flex: 1,

      color: "#fff",

      fontSize: 23,

      fontWeight: "700",

      textAlign: "center",

      marginHorizontal: 10,
    },

    addPersonButton: {
      width: 45,

      alignItems:
        "flex-end",

      justifyContent:
        "center",
    },


    // ==================================================
    // TABS
    // ==================================================

    tabsContainer: {
      height: 68,

      flexDirection: "row",

      alignItems: "center",

      paddingHorizontal: 15,
    },

    tabItem: {
      flex: 1,

      alignItems: "center",

      justifyContent: "center",
    },

    countText: {
      color: "#A6A6A6",

      fontSize: 17,

      fontWeight: "700",
    },

    countLabel: {
      color: "#A6A6A6",

      fontSize: 14,

      marginTop: 4,
    },

    activeCountText: {
      color: "#FFFFFF",
    },

    activeCountLabel: {
      color: "#FFFFFF",

      fontWeight: "700",
    },


    // ==================================================
    // ACTIVE LINE
    // ==================================================

    tabLineContainer: {
      height: 2,

      width: "100%",

      backgroundColor: "#292D32",

      position: "relative",
    },

    activeTabLine: {
      position: "absolute",

      top: -1,

      height: 3,

      width: "50%",

      backgroundColor: "#FFFFFF",
    },

    followersLine: {
      left: "0%",
    },

    followingLine: {
      left: "50%",
    },


    // ==================================================
    // SEARCH
    // ==================================================

    searchContainer: {
      height: 58,

      marginHorizontal: 19,

      marginTop: 20,

      borderRadius: 18,

      backgroundColor: "#24282E",

      flexDirection: "row",

      alignItems: "center",

      paddingHorizontal: 17,
    },

    searchInput: {
      flex: 1,

      color: "#fff",

      fontSize: 18,

      marginLeft: 14,

      paddingVertical: 0,
    },


    // ==================================================
    // SORT
    // ==================================================

    sortRow: {
      height: 92,

      paddingHorizontal: 19,

      flexDirection: "row",

      alignItems: "center",

      justifyContent:
        "space-between",
    },

    sortText: {
      color: "#F0F0F0",

      fontSize: 17,

      fontWeight: "500",
    },

    sortButton: {
      width: 45,

      height: 50,

      alignItems: "center",

      justifyContent: "center",
    },


    // ==================================================
    // USER
    // ==================================================

    userRow: {
      minHeight: 92,

      paddingHorizontal: 18,

      flexDirection: "row",

      alignItems: "center",
    },


    avatar: {
      width: 70,

      height: 70,

      borderRadius: 35,

      backgroundColor: "#24282E",
    },

    avatarPlaceholder: {
      width: 70,

      height: 70,

      borderRadius: 35,

      backgroundColor: "#24282E",

      alignItems: "center",

      justifyContent: "center",
    },


    userInfo: {
      flex: 1,

      minWidth: 0,

      marginLeft: 15,

      marginRight: 10,
    },

    username: {
      color: "#fff",

      fontSize: 16,

      fontWeight: "700",
    },

    fullName: {
      color: "#A6A6A6",

      fontSize: 15,

      marginTop: 4,
    },

    newPostRow: {
      flexDirection: "row",

      alignItems: "center",

      marginTop: 2,
    },

    newPostText: {
      color: "#999",

      fontSize: 14,
    },

    blueDot: {
      width: 8,

      height: 8,

      borderRadius: 4,

      backgroundColor: "#6878FF",

      marginLeft: 5,
    },


    // ==================================================
    // MESSAGE
    // ==================================================

    messageButton: {
      width: 112,

      height: 58,

      borderRadius: 14,

      backgroundColor: "#2B3036",

      alignItems: "center",

      justifyContent: "center",
    },

    messageText: {
      color: "#F5F5F5",

      fontSize: 16,

      fontWeight: "700",
    },


    // ==================================================
    // MORE
    // ==================================================

    moreButton: {
      width: 30,

      height: 58,

      marginLeft: 9,

      alignItems: "center",

      justifyContent: "center",
    },


    // ==================================================
    // EMPTY
    // ==================================================

    emptyContainer: {
      flex: 1,

      alignItems: "center",

      justifyContent: "center",

      paddingHorizontal: 30,

      paddingTop: 50,
    },

    emptyTitle: {
      color: "#fff",

      fontSize: 18,

      fontWeight: "600",

      marginTop: 14,

      textAlign: "center",
    },

    emptySubText: {
      color: "#777",

      fontSize: 14,

      marginTop: 7,

      textAlign: "center",
    },


    // ==================================================
    // LOADING / ERROR
    // ==================================================

    center: {
      flex: 1,

      backgroundColor: "#0B0E12",

      alignItems: "center",

      justifyContent: "center",

      paddingHorizontal: 30,
    },

    errorText: {
      color: "#aaa",

      fontSize: 15,

      textAlign: "center",

      marginTop: 15,

      textAlign: "center",
    },

    retryButton: {
      marginTop: 20,

      paddingHorizontal: 25,

      paddingVertical: 11,

      borderRadius: 10,

      backgroundColor: "#2B3036",
    },

    retryText: {
      color: "#fff",

      fontSize: 15,

      fontWeight: "600",
    },

  });
