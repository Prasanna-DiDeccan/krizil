// import React, {
//   useCallback,
//   useMemo,
//   useRef,
// } from "react";

// import {
//   View,
//   FlatList,
//   ActivityIndicator,
//   Text,
//   StyleSheet,
// } from "react-native";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import {
//   useFocusEffect,
// } from "@react-navigation/native";

// import { useRouter } from "expo-router";

// import Header from "../../src/components/Header";
// import Stories from "../../src/components/stories/Stories";
// import PostCard from "../../src/components/PostCard";
// import HomeReel from "../../src/components/reels/HReel/HomeReel";
// import HomePostMenu from "../../src/components/HomePostMenu";
// import HomeReelMenu from "../../src/components/HomeReelMenu";

// import {
//   getHomeFeed,
// } from "../../src/redux/postSlice";

// import {
//   getHomeReelsFeed,
// } from "../../src/redux/reelsSlice";

// export default function Home() {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   // =====================================================
//   // POST MENU REF
//   // =====================================================

//   const postMenuRef = useRef(null);

//   // =====================================================
//   // REEL MENU REF
//   // =====================================================

//   const reelMenuRef = useRef(null);

//   // =====================================================
//   // POST STATE
//   // =====================================================

//   const {
//     homeFeed = [],
//     homeFeedLoading,
//     homeFeedError,
//   } = useSelector(
//     (state) => state.posts || {}
//   );

//   // =====================================================
//   // REEL STATE
//   // =====================================================

//   const {
//     homeReels = [],
//     homeReelsLoading,
//   } = useSelector(
//     (state) => state.reels || {}
//   );

//   // =====================================================
//   // LOAD HOME
//   // =====================================================

//   useFocusEffect(
//     useCallback(() => {
//       console.log("🔥 HOME LOAD");

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
//     }, [dispatch])
//   );

//   // =====================================================
//   // COMBINE POSTS + REELS
//   // =====================================================

//   const combinedFeed = useMemo(() => {
//     const posts = homeFeed.map((post) => ({
//       ...post,

//       feedType: "post",

//       feedId: `post-${post.id}`,

//       feedDate: post.created_at
//         ? new Date(
//             post.created_at
//           ).getTime()
//         : 0,
//     }));

//     const reels = homeReels.map((reel) => ({
//       ...reel,

//       feedType: "reel",

//       feedId: `reel-${reel.id}`,

//       feedDate: reel.created_at
//         ? new Date(
//             reel.created_at
//           ).getTime()
//         : 0,
//     }));

//     return [
//       ...posts,
//       ...reels,
//     ].sort(
//       (a, b) =>
//         b.feedDate - a.feedDate
//     );
//   }, [
//     homeFeed,
//     homeReels,
//   ]);

//   // =====================================================
//   // POST MENU
//   // =====================================================

//   const handlePostMenu = useCallback(
//     (post) => {
//       console.log(
//         "📂 OPEN POST MENU =>",
//         post?.id
//       );

//       postMenuRef.current?.open(
//         post
//       );
//     },
//     []
//   );

//   // =====================================================
//   // REEL MENU
//   // =====================================================

//   const handleReelMenu = useCallback(
//     (reel) => {
//       console.log(
//         "⋯ OPEN REEL MENU =>",
//         reel?.id
//       );

//       if (!reel?.id) {
//         console.log(
//           "❌ REEL ID MISSING"
//         );

//         return;
//       }

//       reelMenuRef.current?.open(
//         reel
//       );
//     },
//     []
//   );

//   // =====================================================
//   // REEL DELETED
//   // =====================================================

//   const handleReelDeleted = useCallback(
//     (deletedReelId) => {
//       console.log(
//         "🗑️ HOME REEL DELETED =>",
//         deletedReelId
//       );

//       // Redux deleteReel should already
//       // update homeReels.

//       // We intentionally do not manually
//       // modify combinedFeed because it is
//       // generated from Redux state.
//     },
//     []
//   );

//   // =====================================================
//   // REEL VIEWER
//   // =====================================================

//   const handleReelPress = useCallback(
//     (reel) => {
//       if (!reel?.id) {
//         return;
//       }

//       console.log(
//         "🎬 OPEN REEL VIEWER =>",
//         reel.id
//       );

//       router.push({
//         pathname:
//           "/profile-screens/reels-viewer",

//         params: {
//           source: "home",

//           reelId: String(
//             reel.id
//           ),
//         },
//       });
//     },
//     [router]
//   );

//   // =====================================================
//   // REEL COMMENT
//   // =====================================================

//   const handleReelComment = useCallback(
//     (reel) => {
//       console.log(
//         "💬 COMMENT REEL =>",
//         reel?.id
//       );
//     },
//     []
//   );

//   // =====================================================
//   // REEL SHARE
//   // =====================================================

//   const handleReelShare = useCallback(
//     (reel) => {
//       console.log(
//         "📤 SHARE REEL =>",
//         reel?.id
//       );
//     },
//     []
//   );

//   // =====================================================
//   // RENDER ITEM
//   // =====================================================

//   const renderItem = useCallback(
//     ({ item }) => {
//       // =================================================
//       // REEL
//       // =================================================

//       if (
//         item.feedType === "reel"
//       ) {
//         return (
//           <HomeReel
//             item={item}

//             onReelPress={
//               handleReelPress
//             }

//             onCommentPress={
//               handleReelComment
//             }

//             onSharePress={
//               handleReelShare
//             }

//             onMenuPress={
//               handleReelMenu
//             }
//           />
//         );
//       }

//       // =================================================
//       // POST
//       // =================================================

//       return (
//         <PostCard
//           item={item}

//           onMenuPress={
//             handlePostMenu
//           }
//         />
//       );
//     },
//     [
//       handlePostMenu,
//       handleReelPress,
//       handleReelComment,
//       handleReelShare,
//       handleReelMenu,
//     ]
//   );

//   // =====================================================
//   // INITIAL LOADING
//   // =====================================================

//   const isInitialLoading =
//     (
//       homeFeedLoading ||
//       homeReelsLoading
//     ) &&
//     combinedFeed.length === 0;

//   if (isInitialLoading) {
//     return (
//       <View
//         style={styles.container}
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

//   // =====================================================
//   // EMPTY
//   // =====================================================

//   const isEmpty =
//     combinedFeed.length === 0;

//   // =====================================================
//   // MAIN
//   // =====================================================

//   return (
//     <View
//       style={styles.container}
//     >
//       <Header />

//       <FlatList
//         data={combinedFeed}

//         keyExtractor={(item) =>
//           item.feedId
//         }

//         renderItem={renderItem}

//         ListHeaderComponent={
//           <Stories />
//         }

//         ListEmptyComponent={
//           isEmpty ? (
//             <View
//               style={styles.empty}
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

//         removeClippedSubviews={
//           false
//         }
//       />

//       {/* =================================================
//           POST MENU
//       ================================================= */}

//       <HomePostMenu
//         ref={postMenuRef}
//       />

//       {/* =================================================
//           REEL MENU
//       ================================================= */}

//       <HomeReelMenu
//         ref={reelMenuRef}
//         onDeleted={
//           handleReelDeleted
//         }
//       />
//     </View>
//   );
// }

// // ======================================================
// // STYLES
// // ======================================================

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#080913",
//   },

//   listContent: {
//     paddingBottom: 90,
//   },

//   loader: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   empty: {
//     minHeight: 250,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   emptyText: {
//     color: "#777",
//     fontSize: 15,
//   },

//   errorText: {
//     color: "#ff5555",
//     fontSize: 15,
//   },
// });


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

import {
  useRouter,
} from "expo-router";

import Header from "../../src/components/Header";
import Stories from "../../src/components/stories/Stories";
import PostCard from "../../src/components/PostCard";
import HomeReel from "../../src/components/reels/HReel/HomeReel";
import HomePostMenu from "../../src/components/HomePostMenu";
import HomeReelMenu from "../../src/components/HomeReelMenu";

import {
  getHomeFeed,
} from "../../src/redux/postSlice";

import {
  getHomeReelsFeed,
} from "../../src/redux/reelsSlice";

import ScreenLayout from "../../src/components/ScreenLayout";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  // =====================================================
  // MENU REFS
  // =====================================================

  const postMenuRef = useRef(null);
  const reelMenuRef = useRef(null);

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
  // REEL MENU
  // =====================================================

  const handleReelMenu = useCallback(
    (reel) => {
      console.log(
        "⋯ OPEN REEL MENU =>",
        reel?.id
      );

      if (!reel?.id) {
        console.log(
          "❌ REEL ID MISSING"
        );

        return;
      }

      reelMenuRef.current?.open(
        reel
      );
    },
    []
  );

  // =====================================================
  // REEL DELETED
  // =====================================================

  const handleReelDeleted =
    useCallback(
      (deletedReelId) => {
        console.log(
          "🗑️ HOME REEL DELETED =>",
          deletedReelId
        );
      },
      []
    );

  // =====================================================
  // REEL VIEWER
  // =====================================================

  const handleReelPress =
    useCallback(
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

  const handleReelComment =
    useCallback(
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

  const handleReelShare =
    useCallback(
      (reel) => {
        console.log(
          "📤 SHARE REEL =>",
          reel?.id
        );
      },
      []
    );

  // =====================================================
  // RENDER ITEM
  // =====================================================

  const renderItem =
    useCallback(
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

  // =====================================================
  // EMPTY
  // =====================================================

  const isEmpty =
    combinedFeed.length === 0;

  // =====================================================
  // SCREEN
  // =====================================================

  return (
    <ScreenLayout
      header={<Header />}
      keyboardAvoid={false}
    >
      {isInitialLoading ? (
        <View
          style={styles.loader}
        >
          <ActivityIndicator
            size="large"
            color="#A855F7"
          />
        </View>
      ) : (
        <FlatList
          data={combinedFeed}

          keyExtractor={(item) =>
            item.feedId
          }

          renderItem={
            renderItem
          }

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
      )}

      {/* =================================================
          POST MENU
      ================================================= */}

      <HomePostMenu
        ref={postMenuRef}
      />

      {/* =================================================
          REEL MENU
      ================================================= */}

      <HomeReelMenu
        ref={reelMenuRef}
        onDeleted={
          handleReelDeleted
        }
      />
    </ScreenLayout>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  listContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },

  empty: {
    flex: 1,
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