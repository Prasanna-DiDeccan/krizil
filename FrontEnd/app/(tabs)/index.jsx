// import React, {
//   useCallback,
//   useMemo,
//   useState,
// } from "react";

// import {
//   View,
//   FlatList,
//   ActivityIndicator,
//   Text,
//   StyleSheet,
//   Modal,
//   Pressable,
//   TouchableOpacity,
//   Alert,
// } from "react-native";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import {
//   useFocusEffect,
// } from "@react-navigation/native";

// import {
//   useRouter,
// } from "expo-router";

// import { Ionicons } from "@expo/vector-icons";

// import Header from "../../src/components/Header";
// import Stories from "../../src/components/stories/Stories";
// import PostCard from "../../src/components/PostCard";

// import HomeReel from "../../src/components/reels/HReel/HomeReel";

// import {
//   getHomeFeed,
//   deletePost,
//   savePost,
//   unsavePost,
// } from "../../src/redux/postSlice";

// import {
//   getHomeReelsFeed,
// } from "../../src/redux/reelsSlice";

// import {
//   getUser,
// } from "../../src/utils/storage";

// // ======================================================
// // HOME
// // ======================================================

// export default function Home() {
//   const dispatch =
//     useDispatch();

//   const router =
//     useRouter();

//   // ====================================================
//   // PROFILE
//   // ====================================================

//   const profile =
//     useSelector((state) => {
//       return (
//         state.profile?.profile ||
//         state.profile?.user ||
//         state.auth?.profile ||
//         state.auth?.user ||
//         state.user?.profile ||
//         state.user?.user ||
//         null
//       );
//     });

//   // ====================================================
//   // CURRENT USER
//   // ====================================================

//   const currentUserId =
//     profile?.id ??
//     profile?.user_id ??
//     profile?.user?.id ??
//     null;

//   const currentUsername =
//     profile?.username ??
//     profile?.user?.username ??
//     null;

//   // ====================================================
//   // POST STATE
//   // ====================================================

//   const {
//     homeFeed = [],
//     homeFeedLoading,
//     homeFeedError,
//   } = useSelector(
//     (state) =>
//       state.posts || {}
//   );

//   // ====================================================
//   // REEL STATE
//   // ====================================================

//   const {
//     homeReels = [],
//     homeReelsLoading,
//   } = useSelector(
//     (state) =>
//       state.reels || {}
//   );

//   // ====================================================
//   // MENU STATE
//   // ====================================================

//   const [
//     menuVisible,
//     setMenuVisible,
//   ] = useState(false);

//   const [
//     selectedPost,
//     setSelectedPost,
//   ] = useState(null);

//   // ====================================================
//   // LOAD HOME DATA
//   // ====================================================

//   const loadHomeData =
//     useCallback(() => {
//       console.log(
//         "🔥 HOME SCREEN LOAD"
//       );

//       dispatch(
//         getHomeFeed({
//           limit: 20,
//           offset: 0,
//         })
//       );

//       dispatch(
//         getHomeReelsFeed({
//           limit: 10,
//           offset: 0,
//         })
//       );
//     }, [dispatch]);

//   // ====================================================
//   // FOCUS
//   // ====================================================

//   useFocusEffect(
//     useCallback(() => {
//       loadHomeData();
//     }, [loadHomeData])
//   );

//   // ====================================================
//   // OPEN POST MENU
//   // ====================================================

//   const handlePostMenu =
//     useCallback(
//       (post) => {
//         console.log(
//           "========== HOME POST MENU =========="
//         );

//         console.log(
//           "POST ID =>",
//           post?.id
//         );

//         console.log(
//           "POST AUTHOR =>",
//           post?.author
//         );

//         setSelectedPost(
//           post
//         );

//         setMenuVisible(
//           true
//         );
//       },
//       []
//     );

//   // ====================================================
//   // CLOSE MENU
//   // ====================================================

//   const closeMenu =
//     useCallback(() => {
//       setMenuVisible(
//         false
//       );

//       setSelectedPost(
//         null
//       );
//     }, []);

//   // ====================================================
//   // CHECK POST OWNERSHIP
//   // ====================================================

//   const isMyPost =
//     useMemo(() => {
//       if (
//         !selectedPost ||
//         !currentUserId
//       ) {
//         return false;
//       }

//       const authorId =
//         selectedPost
//           ?.author?.id ??
//         selectedPost
//           ?.author?.user_id ??
//         selectedPost?.user_id ??
//         selectedPost
//           ?.owner_id;

//       return (
//         String(authorId) ===
//         String(currentUserId)
//       );
//     }, [
//       selectedPost,
//       currentUserId,
//     ]);

//   // ====================================================
//   // SAVE / UNSAVE
//   // ====================================================

//   const handleSaveToggle =
//     useCallback(
//       async () => {
//         if (
//           !selectedPost?.id
//         ) {
//           return;
//         }

//         const postId =
//           selectedPost.id;

//         const currentlySaved =
//           !!selectedPost.is_saved;

//         try {
//           console.log(
//             "========== SAVE TOGGLE =========="
//           );

//           console.log(
//             "POST ID =>",
//             postId
//           );

//           console.log(
//             "CURRENT SAVED =>",
//             currentlySaved
//           );

//           if (
//             currentlySaved
//           ) {
//             await dispatch(
//               unsavePost(
//                 postId
//               )
//             ).unwrap();
//           } else {
//             await dispatch(
//               savePost(
//                 postId
//               )
//             ).unwrap();
//           }

//           console.log(
//             currentlySaved
//               ? "POST UNSAVED SUCCESSFULLY"
//               : "POST SAVED SUCCESSFULLY"
//           );

//           closeMenu();
//         } catch (error) {
//           console.log(
//             "SAVE / UNSAVE ERROR =>",
//             error
//           );

//           Alert.alert(
//             "Error",
//             currentlySaved
//               ? "Unable to unsave the post."
//               : "Unable to save the post."
//           );
//         }
//       },
//       [
//         selectedPost,
//         dispatch,
//         closeMenu,
//       ]
//     );

//   // ====================================================
//   // DELETE POST
//   // ====================================================

//   const handleDelete =
//     useCallback(() => {
//       if (
//         !selectedPost?.id
//       ) {
//         return;
//       }

//       const postId =
//         selectedPost.id;

//       console.log(
//         "DELETE REQUESTED =>",
//         postId
//       );

//       closeMenu();

//       Alert.alert(
//         "Delete post?",
//         "Are you sure you want to delete this post?",
//         [
//           {
//             text: "Cancel",
//             style: "cancel",
//           },

//           {
//             text: "Delete",
//             style: "destructive",

//             onPress:
//               async () => {
//                 try {
//                   console.log(
//                     "========== DELETE HOME POST =========="
//                   );

//                   console.log(
//                     "POST ID =>",
//                     postId
//                   );

//                   console.log(
//                     "CURRENT USER ID =>",
//                     currentUserId
//                   );

//                   if (
//                     !currentUserId
//                   ) {
//                     Alert.alert(
//                       "Error",
//                       "Unable to identify the current user."
//                     );

//                     return;
//                   }

//                   const numericPostId =
//                     Number(
//                       postId
//                     );

//                   if (
//                     !Number.isInteger(
//                       numericPostId
//                     )
//                   ) {
//                     Alert.alert(
//                       "Error",
//                       "Invalid post ID."
//                     );

//                     return;
//                   }

//                   await dispatch(
//                     deletePost({
//                       postId:
//                         numericPostId,

//                       userId:
//                         currentUserId,
//                     })
//                   ).unwrap();

//                   console.log(
//                     "✅ HOME POST DELETED SUCCESSFULLY"
//                   );

//                 } catch (error) {
//                   console.log(
//                     "❌ DELETE HOME POST ERROR =>",
//                     error
//                   );

//                   Alert.alert(
//                     "Error",
//                     "Unable to delete the post."
//                   );
//                 }
//               },
//           },
//         ]
//       );
//     }, [
//       selectedPost,
//       currentUserId,
//       dispatch,
//       closeMenu,
//     ]);

//   // ====================================================
//   // DIRECT SAVE FROM BOOKMARK
//   // ====================================================

//   const handleDirectSave =
//     useCallback(
//       async (
//         post,
//         newSaved
//       ) => {
//         if (!post?.id) {
//           return;
//         }

//         try {
//           if (
//             newSaved
//           ) {
//             await dispatch(
//               savePost(
//                 post.id
//               )
//             ).unwrap();
//           } else {
//             await dispatch(
//               unsavePost(
//                 post.id
//               )
//             ).unwrap();
//           }
//         } catch (error) {
//           console.log(
//             "DIRECT SAVE ERROR =>",
//             error
//           );
//         }
//       },
//       [dispatch]
//     );

//   // ====================================================
//   // OPEN REEL VIEWER
//   // ====================================================

//   const handleReelPress =
//     useCallback(
//       (reel) => {
//         if (!reel?.id) {
//           return;
//         }

//         router.push({
//           pathname:
//             "/profile-screens/reels-viewer",

//           params: {
//             source: "home",
//             reelId:
//               String(
//                 reel.id
//               ),
//           },
//         });
//       },
//       [router]
//     );

//   // ====================================================
//   // REEL COMMENT
//   // ====================================================

//   const handleReelComment =
//     useCallback(
//       (reel) => {
//         console.log(
//           "COMMENT REEL =>",
//           reel?.id
//         );
//       },
//       []
//     );

//   // ====================================================
//   // REEL SHARE
//   // ====================================================

//   const handleReelShare =
//     useCallback(
//       (reel) => {
//         console.log(
//           "SHARE REEL =>",
//           reel?.id
//         );
//       },
//       []
//     );

//   // ====================================================
//   // REEL MENU
//   // ====================================================

//   const handleReelMenu =
//     useCallback(
//       (reel) => {
//         console.log(
//           "MENU REEL =>",
//           reel?.id
//         );
//       },
//       []
//     );

//   // ====================================================
//   // COMBINE FEED
//   // ====================================================

//   const combinedFeed =
//     useMemo(() => {
//       const posts =
//         homeFeed.map(
//           (post) => ({
//             ...post,

//             feedType:
//               "post",

//             feedId:
//               `post-${post.id}`,

//             feedDate:
//               post.created_at
//                 ? new Date(
//                     post.created_at
//                   ).getTime()
//                 : 0,
//           })
//         );

//       const reels =
//         homeReels.map(
//           (reel) => ({
//             ...reel,

//             feedType:
//               "reel",

//             feedId:
//               `reel-${reel.id}`,

//             feedDate:
//               reel.created_at
//                 ? new Date(
//                     reel.created_at
//                   ).getTime()
//                 : 0,
//           })
//         );

//       return [
//         ...posts,
//         ...reels,
//       ].sort(
//         (a, b) =>
//           b.feedDate -
//           a.feedDate
//       );
//     }, [
//       homeFeed,
//       homeReels,
//     ]);

//   // ====================================================
//   // RENDER ITEM
//   // ====================================================

//   const renderItem =
//     useCallback(
//       ({ item }) => {

//         // ==============================================
//         // REEL
//         // ==============================================

//         if (
//           item.feedType ===
//           "reel"
//         ) {
//           return (
//             <HomeReel
//               item={item}

//               isActive={false}

//               currentUserId={
//                 currentUserId
//               }

//               currentUsername={
//                 currentUsername
//               }

//               onReelPress={
//                 handleReelPress
//               }

//               onCommentPress={
//                 handleReelComment
//               }

//               onSharePress={
//                 handleReelShare
//               }

//               onMenuPress={
//                 handleReelMenu
//               }
//             />
//           );
//         }

//         // ==============================================
//         // POST
//         // ==============================================

//         return (
//           <PostCard
//             item={item}

//             onMenuPress={
//               handlePostMenu
//             }

//             onSavePress={
//               handleDirectSave
//             }
//           />
//         );
//       },
//       [
//         currentUserId,
//         currentUsername,
//         handleReelPress,
//         handleReelComment,
//         handleReelShare,
//         handleReelMenu,
//         handlePostMenu,
//         handleDirectSave,
//       ]
//     );

//   // ====================================================
//   // LOADING
//   // ====================================================

//   const isInitialLoading =
//     (
//       homeFeedLoading ||
//       homeReelsLoading
//     ) &&
//     combinedFeed.length ===
//       0;

//   if (
//     isInitialLoading
//   ) {
//     return (
//       <View
//         style={
//           styles.container
//         }
//       >
//         <Header />

//         <View
//           style={styles.loader}
//         >
//           <ActivityIndicator
//             size="large"
//             color="#A855F7"
//           />
//         </View>
//       </View>
//     );
//   }

//   // ====================================================
//   // EMPTY
//   // ====================================================

//   const isEmpty =
//     combinedFeed.length ===
//     0;

//   // ====================================================
//   // MAIN
//   // ====================================================

//   return (
//     <View
//       style={
//         styles.container
//       }
//     >

//       <Header />

//       <FlatList
//         data={
//           combinedFeed
//         }

//         keyExtractor={(
//           item
//         ) =>
//           item.feedId
//         }

//         renderItem={
//           renderItem
//         }

//         ListHeaderComponent={
//           <Stories />
//         }

//         ListEmptyComponent={
//           isEmpty ? (
//             <View
//               style={
//                 styles.empty
//               }
//             >
//               <Text
//                 style={
//                   homeFeedError
//                     ? styles.errorText
//                     : styles.emptyText
//                 }
//               >
//                 {homeFeedError
//                   ? "Failed to load feed"
//                   : "No posts or reels yet"}
//               </Text>
//             </View>
//           ) : null
//         }

//         showsVerticalScrollIndicator={
//           false
//         }

//         contentContainerStyle={
//           styles.listContent
//         }
//       />

//       {/* ==================================================
//           POST MENU
//       ================================================== */}

//       <Modal
//         visible={
//           menuVisible
//         }

//         transparent={true}

//         animationType="slide"

//         onRequestClose={
//           closeMenu
//         }
//       >

//         {/* OVERLAY */}

//         <Pressable
//           style={
//             styles.modalOverlay
//           }

//           onPress={
//             closeMenu
//           }
//         >

//           {/* BOTTOM SHEET */}

//           <Pressable
//             style={
//               styles.bottomSheet
//             }

//             onPress={() => {}}
//           >

//             {/* HANDLE */}

//             <View
//               style={
//                 styles.handle
//               }
//             />

//             {/* ========================================
//                 SAVE / UNSAVE
//             ======================================== */}

//             <TouchableOpacity
//               style={
//                 styles.menuItem
//               }

//               onPress={
//                 handleSaveToggle
//               }

//               activeOpacity={
//                 0.7
//               }
//             >
//               <Ionicons
//                 name={
//                   selectedPost?.is_saved
//                     ? "bookmark"
//                     : "bookmark-outline"
//                 }

//                 size={25}

//                 color="#fff"
//               />

//               <Text
//                 style={
//                   styles.menuText
//                 }
//               >
//                 {selectedPost?.is_saved
//                   ? "Unsave"
//                   : "Save"}
//               </Text>
//             </TouchableOpacity>

//             {/* ========================================
//                 DELETE
//             ======================================== */}

//             {isMyPost && (
//               <TouchableOpacity
//                 style={
//                   styles.menuItem
//                 }

//                 onPress={
//                   handleDelete
//                 }

//                 activeOpacity={
//                   0.7
//                 }
//               >
//                 <Ionicons
//                   name="trash-outline"
//                   size={25}
//                   color="#ff3040"
//                 />

//                 <Text
//                   style={[
//                     styles.menuText,
//                     styles.deleteText,
//                   ]}
//                 >
//                   Delete
//                 </Text>
//               </TouchableOpacity>
//             )}

//           </Pressable>
//         </Pressable>
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
//       backgroundColor:
//         "#080913",
//     },

//     listContent: {
//       paddingBottom: 90,
//     },

//     loader: {
//       flex: 1,

//       justifyContent:
//         "center",

//       alignItems:
//         "center",
//     },

//     empty: {
//       minHeight: 250,

//       justifyContent:
//         "center",

//       alignItems:
//         "center",
//     },

//     emptyText: {
//       color: "#777",
//       fontSize: 15,
//     },

//     errorText: {
//       color: "#ff5555",
//       fontSize: 15,
//     },

//     // ================================================
//     // MODAL
//     // ================================================

//     modalOverlay: {
//       flex: 1,

//       backgroundColor:
//         "rgba(0,0,0,0.55)",

//       justifyContent:
//         "flex-end",
//     },

//     // ================================================
//     // BOTTOM SHEET
//     // ================================================

//     bottomSheet: {
//       backgroundColor:
//         "#1B1E23",

//       borderTopLeftRadius:
//         22,

//       borderTopRightRadius:
//         22,

//       paddingTop: 10,

//       paddingBottom: 30,

//       paddingHorizontal: 16,
//     },

//     handle: {
//       width: 38,
//       height: 4,

//       borderRadius: 10,

//       backgroundColor:
//         "#85878C",

//       alignSelf:
//         "center",

//       marginBottom: 12,
//     },

//     menuItem: {
//       height: 58,

//       flexDirection:
//         "row",

//       alignItems:
//         "center",

//       paddingHorizontal: 8,
//     },

//     menuText: {
//       color: "#fff",

//       fontSize: 16,

//       marginLeft: 18,

//       fontWeight:
//         "500",
//     },

//     deleteText: {
//       color: "#ff3040",
//     },
//   });

import React, {
  useCallback,
  useMemo,
  useRef,
} from "react";

import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useFocusEffect,
} from "@react-navigation/native";

import { useRouter } from "expo-router";

import Header from "../../src/components/Header";
import Stories from "../../src/components/stories/Stories";
import PostCard from "../../src/components/PostCard";
import HomeReel from "../../src/components/reels/HReel/HomeReel";
import HomePostMenu from "../../src/components/HomePostMenu";

import {
  getHomeFeed,
} from "../../src/redux/postSlice";

import {
  getHomeReelsFeed,
} from "../../src/redux/reelsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  // =====================================================
  // POST MENU REF
  // =====================================================

  const postMenuRef = useRef(null);

  // =====================================================
  // POST STATE
  // =====================================================

  const {
    homeFeed = [],
    homeFeedLoading,
    homeFeedError,
  } = useSelector(
    (state) => state.posts || {}
  );

  // =====================================================
  // REEL STATE
  // =====================================================

  const {
    homeReels = [],
    homeReelsLoading,
  } = useSelector(
    (state) => state.reels || {}
  );

  // =====================================================
  // LOAD HOME
  // =====================================================

  useFocusEffect(
    useCallback(() => {
      console.log("🔥 HOME LOAD");

      dispatch(
        getHomeFeed({
          limit: 20,
          offset: 0,
        })
      );

      dispatch(
        getHomeReelsFeed({
          limit: 10,
          offset: 0,
        })
      );
    }, [dispatch])
  );

  // =====================================================
  // COMBINE POSTS + REELS
  // =====================================================

  const combinedFeed = useMemo(() => {
    const posts = homeFeed.map((post) => ({
      ...post,

      feedType: "post",

      feedId: `post-${post.id}`,

      feedDate: post.created_at
        ? new Date(
            post.created_at
          ).getTime()
        : 0,
    }));

    const reels = homeReels.map((reel) => ({
      ...reel,

      feedType: "reel",

      feedId: `reel-${reel.id}`,

      feedDate: reel.created_at
        ? new Date(
            reel.created_at
          ).getTime()
        : 0,
    }));

    return [
      ...posts,
      ...reels,
    ].sort(
      (a, b) =>
        b.feedDate - a.feedDate
    );
  }, [
    homeFeed,
    homeReels,
  ]);

  // =====================================================
  // POST MENU
  // =====================================================

  const handlePostMenu = useCallback(
    (post) => {
      console.log(
        "📂 OPEN POST MENU =>",
        post?.id
      );

      postMenuRef.current?.open(
        post
      );
    },
    []
  );

  // =====================================================
  // REEL VIEWER
  // =====================================================

  const handleReelPress = useCallback(
    (reel) => {
      if (!reel?.id) {
        return;
      }

      console.log(
        "🎬 OPEN REEL VIEWER =>",
        reel.id
      );

      router.push({
        pathname:
          "/profile-screens/reels-viewer",

        params: {
          source: "home",

          reelId: String(
            reel.id
          ),
        },
      });
    },
    [router]
  );

  // =====================================================
  // REEL COMMENT
  // =====================================================

  const handleReelComment = useCallback(
    (reel) => {
      console.log(
        "💬 COMMENT REEL =>",
        reel?.id
      );
    },
    []
  );

  // =====================================================
  // REEL SHARE
  // =====================================================

  const handleReelShare = useCallback(
    (reel) => {
      console.log(
        "📤 SHARE REEL =>",
        reel?.id
      );
    },
    []
  );

  // =====================================================
  // REEL MENU
  // =====================================================

  const handleReelMenu = useCallback(
    (reel) => {
      console.log(
        "⋯ REEL MENU =>",
        reel?.id
      );
    },
    []
  );

  // =====================================================
  // RENDER ITEM
  // =====================================================

  const renderItem = useCallback(
    ({ item }) => {
      // =================================================
      // REEL
      // =================================================

      if (
        item.feedType === "reel"
      ) {
        return (
          <HomeReel
            item={item}

            onReelPress={
              handleReelPress
            }

            onCommentPress={
              handleReelComment
            }

            onSharePress={
              handleReelShare
            }

            onMenuPress={
              handleReelMenu
            }
          />
        );
      }

      // =================================================
      // POST
      // =================================================

      return (
        <PostCard
          item={item}

          onMenuPress={
            handlePostMenu
          }
        />
      );
    },
    [
      handlePostMenu,
      handleReelPress,
      handleReelComment,
      handleReelShare,
      handleReelMenu,
    ]
  );

  // =====================================================
  // INITIAL LOADING
  // =====================================================

  const isInitialLoading =
    (
      homeFeedLoading ||
      homeReelsLoading
    ) &&
    combinedFeed.length === 0;

  if (isInitialLoading) {
    return (
      <View
        style={styles.container}
      >
        <Header />

        <View
          style={styles.loader}
        >
          <ActivityIndicator
            size="large"
            color="#A855F7"
          />
        </View>
      </View>
    );
  }

  // =====================================================
  // EMPTY
  // =====================================================

  const isEmpty =
    combinedFeed.length === 0;

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <View
      style={styles.container}
    >
      <Header />

      <FlatList
        data={combinedFeed}

        keyExtractor={(item) =>
          item.feedId
        }

        renderItem={renderItem}

        ListHeaderComponent={
          <Stories />
        }

        ListEmptyComponent={
          isEmpty ? (
            <View
              style={styles.empty}
            >
              <Text
                style={
                  homeFeedError
                    ? styles.errorText
                    : styles.emptyText
                }
              >
                {homeFeedError
                  ? "Failed to load feed"
                  : "No posts or reels yet"}
              </Text>
            </View>
          ) : null
        }

        showsVerticalScrollIndicator={
          false
        }

        contentContainerStyle={
          styles.listContent
        }

        removeClippedSubviews={
          false
        }
      />

      {/* ================================================
          POST MENU
      ================================================= */}

      <HomePostMenu
        ref={postMenuRef}
      />
    </View>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080913",
  },

  listContent: {
    paddingBottom: 90,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  empty: {
    minHeight: 250,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: "#777",
    fontSize: 15,
  },

  errorText: {
    color: "#ff5555",
    fontSize: 15,
  },
});