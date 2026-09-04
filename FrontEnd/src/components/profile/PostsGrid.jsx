// import React, {
//   useCallback,
//   useEffect,
//   useState,
// } from "react";

// import {
//   View,
//   Image,
//   StyleSheet,
//   Dimensions,
//   ActivityIndicator,
//   Text,
//   TouchableOpacity,
// } from "react-native";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import {
//   useRouter,
//   useFocusEffect,
// } from "expo-router";

// import { BASE_URL } from "../../utils/api";
// import { getUser } from "../../utils/storage";

// import {
//   getUserPosts,
// } from "../../redux/postSlice";

// const { width } = Dimensions.get("window");

// const IMAGE_SIZE = width / 3;

// const getImageUrl = (mediaUrl) => {
//   if (!mediaUrl) {
//     return null;
//   }

//   // Already a complete URL
//   if (
//     mediaUrl.startsWith("http://") ||
//     mediaUrl.startsWith("https://")
//   ) {
//     return mediaUrl;
//   }

//   // Relative URL
//   if (mediaUrl.startsWith("/")) {
//     return `${BASE_URL}${mediaUrl}`;
//   }

//   // Fallback
//   return `${BASE_URL}/${mediaUrl}`;
// };

// export default function PostsGrid() {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const [userId, setUserId] = useState(null);

//   const {
//     userPosts,
//     postsLoading,
//     postsError,
//   } = useSelector(
//     (state) => state.posts
//   );

//   // ==========================================
//   // GET CURRENT USER
//   // ==========================================

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const user = await getUser();

//         console.log(
//           "👤 PROFILE GRID USER =>",
//           user
//         );

//         if (user?.id) {
//           setUserId(user.id);
//         } else {
//           console.log(
//             "❌ USER ID NOT FOUND"
//           );
//         }
//       } catch (error) {
//         console.log(
//           "❌ GET USER ERROR =>",
//           error
//         );
//       }
//     };

//     loadUser();
//   }, []);

//   // ==========================================
//   // GET POSTS WHEN PROFILE OPENS
//   // ==========================================

//   useFocusEffect(
//     useCallback(() => {
//       if (!userId) {
//         console.log(
//           "⏳ WAITING FOR USER ID..."
//         );

//         return;
//       }

//       console.log(
//         "🔄 PROFILE FOCUSED - GET USER POSTS =>",
//         userId
//       );

//       dispatch(
//         getUserPosts(userId)
//       );
//     }, [userId, dispatch])
//   );

//   // ==========================================
//   // LOADING
//   // ==========================================

//   if (postsLoading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator
//           size="small"
//           color="#A855F7"
//         />
//       </View>
//     );
//   }

//   // ==========================================
//   // ERROR
//   // ==========================================

//   if (postsError) {
//     console.log(
//       "❌ POSTS GRID ERROR =>",
//       postsError
//     );

//     return (
//       <View style={styles.empty}>
//         <Text style={styles.emptyText}>
//           Failed to load posts
//         </Text>
//       </View>
//     );
//   }

//   // ==========================================
//   // EMPTY
//   // ==========================================

//   if (
//     !userPosts ||
//     userPosts.length === 0
//   ) {
//     return (
//       <View style={styles.empty}>
//         <Text style={styles.emptyText}>
//           No posts yet
//         </Text>
//       </View>
//     );
//   }

//   // ==========================================
//   // POSTS GRID
//   // ==========================================

//   return (
//     <View style={styles.container}>
//       {userPosts.map((post) => {
//         const imageUrl =
//           getImageUrl(post.media_url);

//         console.log(
//           "🖼️ POST IMAGE =>",
//           post.id,
//           imageUrl
//         );

//         return (
//           <TouchableOpacity
//             key={`post-${post.id}`}
//             activeOpacity={0.9}
//             style={styles.postContainer}
//             onPress={() => {
//               router.push({
//                 pathname:
//                   "/profile-screens/posts-viewer",
//                 params: {
//                   postId: String(post.id),
//                 },
//               });
//             }}
//           >
//             {imageUrl ? (
//               <Image
//                 source={{
//                   uri: imageUrl,
//                 }}
//                 style={styles.image}
//                 resizeMode="cover"
//                 onLoad={() => {
//                   console.log(
//                     "✅ IMAGE LOADED =>",
//                     post.id
//                   );
//                 }}
//                 onError={(error) => {
//                   console.log(
//                     "❌ IMAGE LOAD ERROR =>",
//                     post.id,
//                     imageUrl,
//                     error.nativeEvent
//                   );
//                 }}
//               />
//             ) : (
//               <View style={styles.imageError}>
//                 <Text
//                   style={styles.imageErrorText}
//                 >
//                   No Image
//                 </Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     flexDirection: "row",
//     flexWrap: "wrap",
//     backgroundColor: "#080913",
//   },

//   postContainer: {
//     width: IMAGE_SIZE,
//     height: IMAGE_SIZE,
//     backgroundColor: "#151620",
//   },

//   image: {
//     width: "100%",
//     height: "100%",
//     borderWidth: 0.5,
//     borderColor: "#080913",
//   },

//   imageError: {
//     width: "100%",
//     height: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#151620",
//   },

//   imageErrorText: {
//     color: "#777",
//     fontSize: 12,
//   },

//   loader: {
//     width: "100%",
//     height: 120,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#080913",
//   },

//   empty: {
//     width: "100%",
//     height: 150,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#080913",
//   },

//   emptyText: {
//     color: "#777",
//     fontSize: 15,
//   },
// });

import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useRouter,
  useFocusEffect,
} from "expo-router";

import { BASE_URL } from "../../utils/api";
import { getUser } from "../../utils/storage";

import {
  getUserPosts,
} from "../../redux/postSlice";

const { width } = Dimensions.get("window");

const IMAGE_SIZE = width / 3;

const getImageUrl = (mediaUrl) => {
  if (!mediaUrl) {
    return null;
  }

  // Already a complete URL
  if (
    mediaUrl.startsWith("http://") ||
    mediaUrl.startsWith("https://")
  ) {
    return mediaUrl;
  }

  // Relative URL
  if (mediaUrl.startsWith("/")) {
    return `${BASE_URL}${mediaUrl}`;
  }

  // Fallback
  return `${BASE_URL}/${mediaUrl}`;
};

/**
 * @param {number} [userId] - Optional. Whose posts to show.
 *   Pass this when rendering someone else's profile (e.g. user-profile.jsx).
 *   Omit it when rendering the logged-in user's own profile — it will
 *   fall back to getUser() from storage, exactly like before.
 */
export default function PostsGrid({ userId: userIdProp } = {}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [resolvedUserId, setResolvedUserId] = useState(
    userIdProp ?? null
  );

  const {
    userPosts,
    postsLoading,
    postsError,
  } = useSelector(
    (state) => state.posts
  );

  // ==========================================
  // RESOLVE WHICH USER'S POSTS TO SHOW
  // ==========================================

  useEffect(() => {
    // If a userId was explicitly passed in (viewing someone else's
    // profile), use it directly — no need to touch storage at all.
    if (userIdProp) {
      setResolvedUserId(userIdProp);
      return;
    }

    // Otherwise fall back to the logged-in user (own profile),
    // same behavior as before this change.
    const loadUser = async () => {
      try {
        const user = await getUser();

        console.log(
          "👤 PROFILE GRID USER =>",
          user
        );

        if (user?.id) {
          setResolvedUserId(user.id);
        } else {
          console.log(
            "❌ USER ID NOT FOUND"
          );
        }
      } catch (error) {
        console.log(
          "❌ GET USER ERROR =>",
          error
        );
      }
    };

    loadUser();
  }, [userIdProp]);

  // ==========================================
  // GET POSTS WHEN PROFILE OPENS / FOCUSES
  // ==========================================

  useFocusEffect(
    useCallback(() => {
      if (!resolvedUserId) {
        console.log(
          "⏳ WAITING FOR USER ID..."
        );

        return;
      }

      console.log(
        "🔄 PROFILE FOCUSED - GET USER POSTS =>",
        resolvedUserId
      );

      dispatch(
        getUserPosts(resolvedUserId)
      );
    }, [resolvedUserId, dispatch])
  );

  // ==========================================
  // LOADING
  // ==========================================

  if (postsLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="small"
          color="#A855F7"
        />
      </View>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (postsError) {
    console.log(
      "❌ POSTS GRID ERROR =>",
      postsError
    );

    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          Failed to load posts
        </Text>
      </View>
    );
  }

  // ==========================================
  // EMPTY
  // ==========================================

  if (
    !userPosts ||
    userPosts.length === 0
  ) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          No posts yet
        </Text>
      </View>
    );
  }

  // ==========================================
  // POSTS GRID
  // ==========================================

  return (
    <View style={styles.container}>
      {userPosts.map((post) => {
        const imageUrl =
          getImageUrl(post.media_url);

        console.log(
          "🖼️ POST IMAGE =>",
          post.id,
          imageUrl
        );

        return (
          <TouchableOpacity
            key={`post-${post.id}`}
            activeOpacity={0.9}
            style={styles.postContainer}
            onPress={() => {
              router.push({
                pathname:
                  "/profile-screens/posts-viewer",
                params: {
                  postId: String(post.id),
                },
              });
            }}
          >
            {imageUrl ? (
              <Image
                source={{
                  uri: imageUrl,
                }}
                style={styles.image}
                resizeMode="cover"
                onLoad={() => {
                  console.log(
                    "✅ IMAGE LOADED =>",
                    post.id
                  );
                }}
                onError={(error) => {
                  console.log(
                    "❌ IMAGE LOAD ERROR =>",
                    post.id,
                    imageUrl,
                    error.nativeEvent
                  );
                }}
              />
            ) : (
              <View style={styles.imageError}>
                <Text
                  style={styles.imageErrorText}
                >
                  No Image
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#080913",
  },

  postContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    backgroundColor: "#151620",
  },

  image: {
    width: "100%",
    height: "100%",
    borderWidth: 0.5,
    borderColor: "#080913",
  },

  imageError: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#151620",
  },

  imageErrorText: {
    color: "#777",
    fontSize: 12,
  },

  loader: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#080913",
  },

  empty: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#080913",
  },

  emptyText: {
    color: "#777",
    fontSize: 15,
  },
});