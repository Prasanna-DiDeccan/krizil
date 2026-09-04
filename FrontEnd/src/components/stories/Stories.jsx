// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   View,
//   FlatList,
//   Image,
//   ActivityIndicator,
//   Text,
//   TouchableOpacity,
// } from "react-native";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import { router } from "expo-router";

// import {
//   getStoryFeed,
//   getMyStories,
// } from "../../redux/storySlice";

// import {
//   getProfile,
// } from "../../redux/profileSlice";

// import {
//   getMediaUrl,
// } from "../../utils/media";

// import {
//   getUser,
// } from "../../utils/storage";

// export default function Stories() {
//   const dispatch = useDispatch();

//   const [
//     currentUser,
//     setCurrentUser,
//   ] = useState(null);

//   // ======================================================
//   // STORY STATE
//   // ======================================================

//   const {
//     feed = [],
//     myStories = [],
//     loading,
//     error,
//   } = useSelector(
//     (state) => state.stories
//   );

//   // ======================================================
//   // PROFILE STATE
//   // ======================================================

//   const {
//     profileData,
//   } = useSelector(
//     (state) => state.profile
//   );

//   // ======================================================
//   // LOAD USER + PROFILE + STORIES
//   // ======================================================

//   useEffect(() => {
//     const loadData =
//       async () => {
//         try {
//           const user =
//             await getUser();

//           console.log(
//             "STORIES STORAGE USER =>",
//             user
//           );

//           setCurrentUser(user);

//           if (user?.id) {
//             dispatch(
//               getProfile(user.id)
//             );
//           }

//           dispatch(
//             getStoryFeed()
//           );

//           dispatch(
//             getMyStories()
//           );
//         } catch (error) {
//           console.log(
//             "LOAD STORIES ERROR =>",
//             error
//           );
//         }
//       };

//     loadData();
//   }, [dispatch]);

//   // ======================================================
//   // CURRENT USER ID
//   // ======================================================

//   const currentUserId =
//     profileData?.id ||
//     currentUser?.id;

//   // ======================================================
//   // MY AVATAR
//   //
//   // PROFILE API FIRST
//   // ======================================================

//   const myAvatar =
//     profileData?.avatar_url
//       ? getMediaUrl(
//           profileData.avatar_url
//         )
//       : null;

//   // ======================================================
//   // OTHER USERS ONLY
//   // ======================================================

//   const filteredFeed =
//     useMemo(() => {
//       return feed.filter(
//         (item) =>
//           String(
//             item?.user?.id
//           ) !==
//           String(
//             currentUserId
//           )
//       );
//     }, [
//       feed,
//       currentUserId,
//     ]);

//   console.log(
//     "CURRENT USER ID =>",
//     currentUserId
//   );

//   console.log(
//     "PROFILE AVATAR =>",
//     profileData?.avatar_url
//   );

//   console.log(
//     "STORY MY AVATAR =>",
//     myAvatar
//   );

//   console.log(
//     "FILTERED STORY FEED =>",
//     filteredFeed
//   );

//   // ======================================================
//   // LOADING
//   // ======================================================

//   if (loading) {
//     return (
//       <View
//         style={{
//           height: 110,
//           justifyContent:
//             "center",
//           alignItems: "center",
//         }}
//       >
//         <ActivityIndicator
//           size="small"
//           color="#fff"
//         />
//       </View>
//     );
//   }

//   // ======================================================
//   // ERROR
//   // ======================================================

//   if (error) {
//     return (
//       <View
//         style={{
//           height: 110,
//           justifyContent:
//             "center",
//           alignItems: "center",
//         }}
//       >
//         <Text
//           style={{
//             color: "red",
//           }}
//         >
//           Failed to load stories
//         </Text>
//       </View>
//     );
//   }

//   // ======================================================
//   // UI
//   // ======================================================

//   return (
//     <View
//       style={{
//         height: 110,
//       }}
//     >
//       <FlatList
//         horizontal
//         showsHorizontalScrollIndicator={
//           false
//         }
//         data={filteredFeed}
//         keyExtractor={(
//           item,
//           index
//         ) =>
//           item?.user?.id
//             ? `story-${item.user.id}`
//             : `story-${index}`
//         }
//         contentContainerStyle={{
//           paddingHorizontal: 2,
//         }}
//         renderItem={({
//           item,
//         }) => {
//           const avatarUrl =
//             item?.user?.avatar_url
//               ? getMediaUrl(
//                   item.user
//                     .avatar_url
//                 )
//               : null;

//           return (
//             <TouchableOpacity
//               activeOpacity={0.8}
//               onPress={() => {
//                 if (
//                   item?.user?.id
//                 ) {
//                   router.push({
//                     pathname:
//                       "/stories/viewer",

//                     params: {
//                       userId:
//                         String(
//                           item.user.id
//                         ),
//                     },
//                   });
//                 }
//               }}
//               style={{
//                 alignItems:
//                   "center",
//                 marginHorizontal: 6,
//               }}
//             >
//               <View
//                 style={{
//                   width: 74,
//                   height: 74,
//                   borderRadius: 37,
//                   borderWidth: 3,
//                   borderColor:
//                     item?.has_unseen
//                       ? "#ff2d55"
//                       : "#666",
//                   justifyContent:
//                     "center",
//                   alignItems:
//                     "center",
//                 }}
//               >
//                 {avatarUrl ? (
//                   <Image
//                     source={{
//                       uri: avatarUrl,
//                     }}
//                     style={{
//                       width: 66,
//                       height: 66,
//                       borderRadius: 33,
//                     }}
//                   />
//                 ) : (
//                   <View
//                     style={{
//                       width: 66,
//                       height: 66,
//                       borderRadius: 33,
//                       backgroundColor:
//                         "#222",
//                       justifyContent:
//                         "center",
//                       alignItems:
//                         "center",
//                     }}
//                   >
//                     <Text
//                       style={{
//                         color:
//                           "#aaa",
//                         fontSize: 24,
//                         fontWeight:
//                           "600",
//                       }}
//                     >
//                       {(
//                         item?.user
//                           ?.username ||
//                         "U"
//                       )
//                         .charAt(0)
//                         .toUpperCase()}
//                     </Text>
//                   </View>
//                 )}
//               </View>

//               <Text
//                 numberOfLines={1}
//                 style={{
//                   width: 75,
//                   textAlign:
//                     "center",
//                   color: "#fff",
//                   fontSize: 12,
//                   marginTop: 4,
//                 }}
//               >
//                 {item?.user
//                   ?.username ||
//                   ""}
//               </Text>
//             </TouchableOpacity>
//           );
//         }}
//         ListHeaderComponent={
//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={() => {
//               if (
//                 myStories.length >
//                 0
//               ) {
//                 router.push(
//                   "/stories/mine"
//                 );
//               } else {
//                 router.push(
//                   "/stories/create"
//                 );
//               }
//             }}
//             style={{
//               alignItems:
//                 "center",
//               marginHorizontal: 6,
//             }}
//           >
//             <View
//               style={{
//                 width: 74,
//                 height: 74,
//                 borderRadius: 37,
//                 borderWidth: 3,
//                 borderColor:
//                   myStories.length >
//                   0
//                     ? "#ff2d55"
//                     : "#666",
//                 justifyContent:
//                   "center",
//                 alignItems:
//                   "center",
//               }}
//             >
//               {myAvatar ? (
//                 <Image
//                   source={{
//                     uri: myAvatar,
//                   }}
//                   style={{
//                     width: 66,
//                     height: 66,
//                     borderRadius: 33,
//                   }}
//                 />
//               ) : (
//                 <View
//                   style={{
//                     width: 66,
//                     height: 66,
//                     borderRadius: 33,
//                     backgroundColor:
//                       "#222",
//                     justifyContent:
//                       "center",
//                     alignItems:
//                       "center",
//                   }}
//                 >
//                   <Text
//                     style={{
//                       color:
//                         "#aaa",
//                       fontSize: 26,
//                       fontWeight:
//                         "600",
//                     }}
//                   >
//                     {(
//                       profileData?.username ||
//                       currentUser?.username ||
//                       "U"
//                     )
//                       .charAt(0)
//                       .toUpperCase()}
//                   </Text>
//                 </View>
//               )}

//               {/* PLUS */}

//               {myStories.length ===
//                 0 && (
//                 <View
//                   style={{
//                     position:
//                       "absolute",
//                     right: 0,
//                     bottom: 0,
//                     width: 22,
//                     height: 22,
//                     borderRadius: 11,
//                     backgroundColor:
//                       "#0095F6",
//                     justifyContent:
//                       "center",
//                     alignItems:
//                       "center",
//                     borderWidth: 2,
//                     borderColor:
//                       "#000",
//                   }}
//                 >
//                   <Text
//                     style={{
//                       color:
//                         "#fff",
//                       fontSize: 16,
//                       fontWeight:
//                         "bold",
//                       lineHeight: 18,
//                     }}
//                   >
//                     +
//                   </Text>
//                 </View>
//               )}
//             </View>

//             <Text
//               numberOfLines={1}
//               style={{
//                 width: 75,
//                 textAlign:
//                   "center",
//                 color: "#fff",
//                 fontSize: 12,
//                 marginTop: 4,
//               }}
//             >
//               Your Story
//             </Text>
//           </TouchableOpacity>
//         }
//       />
//     </View>
//   );
// }

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  router,
} from "expo-router";

import {
  LinearGradient,
} from "expo-linear-gradient";

import {
  getStoryFeed,
  getMyStories,
} from "../../redux/storySlice";

import {
  getProfile,
} from "../../redux/profileSlice";

import {
  getMediaUrl,
} from "../../utils/media";

import {
  getUser,
} from "../../utils/storage";


const STORY_SIZE = 72;
const AVATAR_SIZE = 64;


export default function Stories() {
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] =
    useState(null);

  // =====================================================
  // STORY STATE
  // =====================================================

  const {
    feed = [],
    myStories = [],
    loading,
    error,
  } = useSelector(
    (state) => state.stories
  );

  // =====================================================
  // PROFILE
  // =====================================================

  // const {
  //   profileData,
  // } = useSelector(
  //   (state) => state.profile
  // );

  const profileData = useSelector(
  (state) => {
    const userId = currentUser?.id;

    if (!userId) {
      return null;
    }

    return (
      state.profile.profiles[userId] ||
      null
    );
  }
);


  // =====================================================
  // LOAD STORIES
  // =====================================================

  useEffect(() => {
    loadStories();
  }, [dispatch]);

  const loadStories = async () => {
    try {
      const user =
        await getUser();

      setCurrentUser(user);

      if (user?.id) {
        dispatch(
          getProfile(user.id)
        );
      }

      dispatch(
        getStoryFeed()
      );

      dispatch(
        getMyStories()
      );

    } catch (error) {
      console.log(
        "LOAD STORIES ERROR =>",
        error
      );
    }
  };

  // =====================================================
  // CURRENT USER
  // =====================================================

  const currentUserId =
    profileData?.id ||
    currentUser?.id;

  // =====================================================
  // MY AVATAR
  // =====================================================

  // const myAvatar =
  //   profileData?.avatar_url
  //     ? getMediaUrl(
  //         profileData.avatar_url
  //       )
  //     : null;
const myAvatar = profileData?.avatar_url
  ? getMediaUrl(profileData.avatar_url)
  : null;

  console.log("========== STORIES PROFILE ==========");
console.log("currentUser =>", currentUser);
console.log("profileData =>", profileData);
console.log("profileData.avatar_url =>", profileData?.avatar_url);
console.log("myAvatar =>", myAvatar);
console.log("====================================");
  // =====================================================
  // FILTER CURRENT USER
  // =====================================================
const filteredFeed = useMemo(() => {
  if (!Array.isArray(feed)) {
    return [];
  }

  return feed.filter((item) => {
    const userId = item?.user?.id;

    // Don't show logged-in user's stories here
    if (
      currentUserId &&
      String(userId) === String(currentUserId)
    ) {
      return false;
    }

    // Only show users who actually have stories
    return (
      Array.isArray(item?.stories) &&
      item.stories.length > 0
    );
  });
}, [feed, currentUserId]);
  // =====================================================
  // OPEN STORY VIEWER
  // =====================================================

const openStories = (stories, index = 0) => {
  if (!Array.isArray(stories) || stories.length === 0) {
    console.log("❌ NO STORIES");
    return;
  }

  console.log("OPENING STORIES =>", stories);
  console.log(
    "STORY IDS =>",
    stories.map((story) => story?.id)
  );

  router.push({
    pathname: "/stories/viewer",
    params: {
      stories: JSON.stringify(stories),
      index: String(index),
    },
  });
};
  // =====================================================
  // MY STORY
  // =====================================================

  // const handleMyStoryPress =
  //   () => {
  //     if (
  //       myStories.length > 0
  //     ) {
  //       openStories(
  //         myStories
  //       );
  //     } else {
  //       router.push(
  //         "/stories/create"
  //       );
  //     }
  //   };

  const handleMyStoryPress = () => {
  if (myStories.length > 0) {
    router.push({
      pathname: "/stories/my-viewer",
      params: {
        stories: JSON.stringify(myStories),
        index: "0",
      },
    });
  } else {
    router.push("/stories/create");
  }
};

  // =====================================================
  // OTHER STORY
  // =====================================================

const renderStoryItem = ({ item }) => {
  const user = item?.user || {};

  const stories = Array.isArray(item?.stories)
    ? item.stories
    : [];

  const username =
    user?.username || "User";

  const avatarUrl = user?.avatar_url
    ? getMediaUrl(user.avatar_url)
    : null;

  console.log("STORY TRAY ITEM =>", item);
  console.log("USERNAME =>", username);
  console.log(
    "STORY IDS =>",
    stories.map((story) => story?.id)
  );
  console.log("AVATAR URL =>", avatarUrl);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => {
        console.log(
          "OPENING USER STORY =>",
          username,
          stories
        );

        openStories(stories, 0);
      }}
      style={styles.storyItem}
    >
      <View style={styles.ringWrapper}>
        {item?.has_unseen ? (
          <LinearGradient
            colors={[
              "#feda75",
              "#fa7e1e",
              "#d62976",
              "#962fbf",
              "#4f5bd5",
            ]}
            start={{
              x: 0,
              y: 1,
            }}
            end={{
              x: 1,
              y: 0,
            }}
            style={styles.gradientRing}
          >
            {renderAvatar(
              avatarUrl,
              username
            )}
          </LinearGradient>
        ) : (
          <View style={styles.seenRing}>
            {renderAvatar(
              avatarUrl,
              username
            )}
          </View>
        )}
      </View>

      <Text
        numberOfLines={1}
        style={styles.username}
      >
        {username}
      </Text>
    </TouchableOpacity>
  );
};
  // =====================================================
  // AVATAR
  // =====================================================

  const renderAvatar = (
    avatarUrl,
    username
  ) => {
    return (
      <View
        style={
          styles.avatarContainer
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
            resizeMode="cover"
          />
        ) : (
          <View
            style={
              styles.avatarPlaceholder
            }
          >
            <Text
              style={
                styles.avatarLetter
              }
            >
              {(
                username ||
                "U"
              )
                .charAt(0)
                .toUpperCase()}
            </Text>
          </View>
        )}
      </View>
    );
  };

  // =====================================================
  // MY STORY
  // =====================================================

  const renderMyStory =
    () => {
      const username =
        profileData?.username ||
        currentUser?.username ||
        "You";

      const hasStory =
        myStories.length > 0;

      return (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={
            handleMyStoryPress
          }
          style={
            styles.storyItem
          }
        >
          <View
            style={
              styles.ringWrapper
            }
          >
            {hasStory ? (
              <LinearGradient
                colors={[
                  "#feda75",
                  "#fa7e1e",
                  "#d62976",
                  "#962fbf",
                  "#4f5bd5",
                ]}
                start={{
                  x: 0,
                  y: 1,
                }}
                end={{
                  x: 1,
                  y: 0,
                }}
                style={
                  styles.gradientRing
                }
              >
                {renderAvatar(
                  myAvatar,
                  username
                )}
              </LinearGradient>
            ) : (
              <View
                style={
                  styles.seenRing
                }
              >
                {renderAvatar(
                  myAvatar,
                  username
                )}
              </View>
            )}

            {/* PLUS */}

            {!hasStory && (
              <View
                style={
                  styles.plusButton
                }
              >
                <Text
                  style={
                    styles.plusText
                  }
                >
                  +
                </Text>
              </View>
            )}
          </View>

          <Text
            numberOfLines={1}
            style={
              styles.username
            }
          >
            Your story
          </Text>
        </TouchableOpacity>
      );
    };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <View
        style={
          styles.loadingContainer
        }
      >
        <ActivityIndicator
          size="small"
          color="#fff"
        />
      </View>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <View
        style={
          styles.errorContainer
        }
      >
        <Text
          style={
            styles.errorText
          }
        >
          Failed to load stories
        </Text>
      </View>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <View
      style={
        styles.container
      }
    >
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
        data={
          filteredFeed
        }
        keyExtractor={(
          item,
          index
        ) =>
          item?.user?.id
            ? `story-${item.user.id}`
            : `story-${index}`
        }
        ListHeaderComponent={
          renderMyStory
        }
        renderItem={
          renderStoryItem
        }
        contentContainerStyle={
          styles.listContent
        }
        ItemSeparatorComponent={() => (
          <View
            style={
              styles.separator
            }
          />
        )}
      />
    </View>
  );
}


// =====================================================
// STYLES
// =====================================================

const styles =
  StyleSheet.create({

    container: {
      height: 108,
      backgroundColor: "#000",
    },

    loadingContainer: {
      height: 108,
      justifyContent:
        "center",
      alignItems:
        "center",
      backgroundColor:
        "#000",
    },

    errorContainer: {
      height: 108,
      justifyContent:
        "center",
      alignItems:
        "center",
      backgroundColor:
        "#000",
    },

    errorText: {
      color: "#aaa",
      fontSize: 12,
    },

    listContent: {
      paddingHorizontal: 8,
      alignItems:
        "flex-start",
    },

    storyItem: {
      width: 78,
      alignItems:
        "center",
    },

    separator: {
      width: 2,
    },

    ringWrapper: {
      width: STORY_SIZE,
      height: STORY_SIZE,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    gradientRing: {
      width: STORY_SIZE,
      height: STORY_SIZE,
      borderRadius:
        STORY_SIZE / 2,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    seenRing: {
      width: STORY_SIZE,
      height: STORY_SIZE,
      borderRadius:
        STORY_SIZE / 2,
      borderWidth: 2,
      borderColor: "#555",
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    avatarContainer: {
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      borderRadius:
        AVATAR_SIZE / 2,
      backgroundColor:
        "#000",
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    avatar: {
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      borderRadius:
        AVATAR_SIZE / 2,
    },

    avatarPlaceholder: {
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      borderRadius:
        AVATAR_SIZE / 2,
      backgroundColor:
        "#222",
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    avatarLetter: {
      color: "#aaa",
      fontSize: 22,
      fontWeight: "600",
    },

    plusButton: {
      position: "absolute",
      right: -1,
      bottom: -1,
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor:
        "#0095F6",
      justifyContent:
        "center",
      alignItems:
        "center",
      borderWidth: 2,
      borderColor: "#000",
    },

    plusText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
      lineHeight: 18,
    },

    username: {
      width: 78,
      marginTop: 5,
      textAlign: "center",
      color: "#fff",
      fontSize: 12,
    },
  });