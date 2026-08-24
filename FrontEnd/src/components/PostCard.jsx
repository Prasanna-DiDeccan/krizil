// import React, { useState } from "react";

// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";

// import {
//   Ionicons,
//   MaterialCommunityIcons,
// } from "@expo/vector-icons";

// import { BASE_URL } from "../utils/api";

// export default function PostCard({
//   item,
//   onMenuPress,
// }) {
//   const [liked, setLiked] = useState(
//     item?.is_liked || false
//   );

//   const getMediaUrl = (url) => {
//     if (!url) {
//       return null;
//     }

//     if (
//       url.startsWith("http://") ||
//       url.startsWith("https://")
//     ) {
//       return url;
//     }

//     if (url.startsWith("/")) {
//       return `${BASE_URL}${url}`;
//     }

//     return `${BASE_URL}/${url}`;
//   };

//   // ==========================================
//   // API DATA
//   // ==========================================

//   const username =
//     item?.author?.username ||
//     item?.author?.full_name ||
//     "";

//   const avatarUrl = getMediaUrl(
//     item?.author?.avatar_url
//   );

//   const mediaUrl = getMediaUrl(
//     item?.media_url
//   );

//   const locationName =
//     typeof item?.location === "object"
//       ? item?.location?.name
//       : item?.location;

//   // ==========================================
//   // RENDER
//   // ==========================================

//   return (
//     <View style={styles.card}>

//       {/* ======================================
//           POST HEADER
//       ====================================== */}

//       <View style={styles.header}>

//         <View style={styles.userRow}>

//           {avatarUrl ? (
//             <Image
//               source={{
//                 uri: avatarUrl,
//               }}
//               style={styles.avatar}
//             />
//           ) : (
//             <View
//               style={
//                 styles.avatarPlaceholder
//               }
//             >
//               <Ionicons
//                 name="person"
//                 size={22}
//                 color="#aaa"
//               />
//             </View>
//           )}

//           <View>
//             <Text style={styles.name}>
//               {username}
//             </Text>

//             {locationName ? (
//               <Text
//                 style={styles.location}
//               >
//                 {locationName}
//               </Text>
//             ) : null}
//           </View>

//         </View>

//         {/* THREE DOT */}

//         <TouchableOpacity
//           onPress={() =>
//             onMenuPress?.(item)
//           }
//           hitSlop={{
//             top: 15,
//             bottom: 15,
//             left: 15,
//             right: 15,
//           }}
//           activeOpacity={0.7}
//         >
//           <Ionicons
//             name="ellipsis-horizontal"
//             size={24}
//             color="#fff"
//           />
//         </TouchableOpacity>

//       </View>

//       {/* ======================================
//           POST IMAGE
//       ====================================== */}

//       <View style={styles.imageContainer}>

//         {mediaUrl ? (
//           <Image
//             source={{
//               uri: mediaUrl,
//             }}
//             style={styles.postImage}
//             resizeMode="cover"
//           />
//         ) : (
//           <View style={styles.noImage}>
//             <Ionicons
//               name="image-outline"
//               size={45}
//               color="#777"
//             />

//             <Text
//               style={styles.noImageText}
//             >
//               No image
//             </Text>
//           </View>
//         )}

//         {item?.media_count > 1 && (
//           <View style={styles.counter}>
//             <Text
//               style={styles.counterText}
//             >
//               1/{item.media_count}
//             </Text>
//           </View>
//         )}

//         {item?.media_type === "video" && (
//           <View style={styles.videoIcon}>
//             <Ionicons
//               name="play"
//               size={15}
//               color="#fff"
//             />
//           </View>
//         )}

//       </View>

//       {/* ======================================
//           ACTIONS
//       ====================================== */}

//       <View style={styles.actionRow}>

//         <View style={styles.leftIcons}>

//           {/* LIKE */}

//           <TouchableOpacity
//             onPress={() =>
//               setLiked(!liked)
//             }
//             activeOpacity={0.7}
//           >
//             <Ionicons
//               name={
//                 liked
//                   ? "heart"
//                   : "heart-outline"
//               }
//               size={27}
//               color={
//                 liked
//                   ? "#FF3158"
//                   : "#fff"
//               }
//             />
//           </TouchableOpacity>

//           <Text style={styles.count}>
//             {item?.likes_count || 0}
//           </Text>

//           {/* COMMENT */}

//           <TouchableOpacity
//             activeOpacity={0.7}
//           >
//             <Ionicons
//               name="chatbubble-outline"
//               size={25}
//               color="#fff"
//             />
//           </TouchableOpacity>

//           <Text style={styles.count}>
//             {item?.comments_count || 0}
//           </Text>

//           {/* SHARE */}

//           <TouchableOpacity
//             activeOpacity={0.7}
//           >
//             <MaterialCommunityIcons
//               name="send-outline"
//               size={25}
//               color="#fff"
//             />
//           </TouchableOpacity>

//           <Text style={styles.count}>
//             {item?.share_count || 0}
//           </Text>

//         </View>

//         {/* SAVE */}

//         <Ionicons
//           name={
//             item?.is_saved
//               ? "bookmark"
//               : "bookmark-outline"
//           }
//           size={26}
//           color="#fff"
//         />

//       </View>

//       {/* ======================================
//           CAPTION
//       ====================================== */}

//       {item?.caption ? (
//         <View
//           style={
//             styles.captionContainer
//           }
//         >
//           <Text style={styles.caption}>
//             <Text style={styles.bold}>
//               {username}
//             </Text>

//             {" "}

//             {item.caption}
//           </Text>

//           {item?.hashtags?.length > 0 && (
//             <Text
//               style={styles.hashTags}
//             >
//               {item.hashtags
//                 .map(
//                   (tag) =>
//                     `#${tag}`
//                 )
//                 .join(" ")}
//             </Text>
//           )}
//         </View>
//       ) : null}

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#080913",
//     marginBottom: 18,
//     borderBottomWidth: 0.6,
//     borderBottomColor: "#23242F",
//     paddingBottom: 15,
//   },

//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 14,
//     marginBottom: 12,
//   },

//   userRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   avatar: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     marginRight: 10,
//   },

//   avatarPlaceholder: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     marginRight: 10,
//     backgroundColor: "#24242D",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   name: {
//     color: "#fff",
//     fontWeight: "700",
//     fontSize: 15,
//   },

//   location: {
//     color: "#9B9BA6",
//     marginTop: 2,
//     fontSize: 12,
//   },

//   imageContainer: {
//     width: "100%",
//     position: "relative",
//   },

//   postImage: {
//     width: "100%",
//     height: 500,
//     backgroundColor: "#161720",
//   },

//   noImage: {
//     width: "100%",
//     height: 500,
//     backgroundColor: "#161720",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   noImageText: {
//     color: "#777",
//     marginTop: 8,
//   },

//   counter: {
//     position: "absolute",
//     right: 15,
//     top: 15,
//     backgroundColor:
//       "rgba(0,0,0,0.65)",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 20,
//   },

//   counterText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "700",
//   },

//   videoIcon: {
//     position: "absolute",
//     right: 15,
//     top: 15,
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor:
//       "rgba(0,0,0,0.65)",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   actionRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 15,
//     paddingHorizontal: 14,
//   },

//   leftIcons: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   count: {
//     color: "#fff",
//     marginHorizontal: 7,
//     fontSize: 15,
//   },

//   captionContainer: {
//     paddingHorizontal: 14,
//     marginTop: 12,
//   },

//   caption: {
//     color: "#fff",
//     fontSize: 15,
//     lineHeight: 22,
//   },

//   bold: {
//     fontWeight: "700",
//   },

//   hashTags: {
//     color: "#7D5CFF",
//     marginTop: 6,
//     fontSize: 14,
//   },
// });

import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import {
  useDispatch,
} from "react-redux";

import {
  deletePost,
  savePost,
  unsavePost,
} from "../redux/postSlice";

import {
  getUser,
} from "../utils/storage";

import {
  BASE_URL,
} from "../utils/api";

export default function PostCard({
  item,
}) {
  const dispatch = useDispatch();

  // ======================================================
  // CURRENT USER
  // ======================================================

  const [
    currentUserId,
    setCurrentUserId,
  ] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getUser();

        console.log(
          "================================"
        );

        console.log(
          "POST CARD CURRENT USER"
        );

        console.log(
          "USER =>",
          user
        );

        console.log(
          "USER ID =>",
          user?.id
        );

        console.log(
          "================================"
        );

        setCurrentUserId(
          user?.id ??
          user?.user_id ??
          user?.user?.id ??
          null
        );

      } catch (error) {
        console.log(
          "❌ GET STORED USER ERROR =>",
          error
        );
      }
    };

    loadUser();
  }, []);

  // ======================================================
  // LIKE
  // ======================================================

  const [
    liked,
    setLiked,
  ] = useState(
    Boolean(item?.is_liked)
  );

  // ======================================================
  // SAVE
  // ======================================================

  const [
    saved,
    setSaved,
  ] = useState(
    Boolean(item?.is_saved)
  );

  const [
    saving,
    setSaving,
  ] = useState(false);

  // ======================================================
  // DELETE
  // ======================================================

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  // ======================================================
  // SYNC LIKE
  // ======================================================

  useEffect(() => {
    setLiked(
      Boolean(item?.is_liked)
    );
  }, [
    item?.is_liked,
  ]);

  // ======================================================
  // SYNC SAVE
  // ======================================================

  useEffect(() => {
    setSaved(
      Boolean(item?.is_saved)
    );
  }, [
    item?.is_saved,
  ]);

  // ======================================================
  // MEDIA URL
  // ======================================================

  const getMediaUrl = useCallback(
    (url) => {
      if (!url) {
        return null;
      }

      if (
        url.startsWith("http://") ||
        url.startsWith("https://")
      ) {
        return url;
      }

      if (url.startsWith("/")) {
        return `${BASE_URL}${url}`;
      }

      return `${BASE_URL}/${url}`;
    },
    []
  );

  // ======================================================
  // API DATA
  // ======================================================

  const username =
    item?.author?.username ||
    item?.author?.full_name ||
    item?.username ||
    "";

  const avatarUrl =
    getMediaUrl(
      item?.author?.avatar_url
    );

  const mediaUrl =
    getMediaUrl(
      item?.media_url
    );

  const locationName =
    typeof item?.location === "object"
      ? item?.location?.name
      : item?.location;

  // ======================================================
  // SAVE / UNSAVE
  // ======================================================

  const handleSave = useCallback(
    async () => {
      if (
        !item?.id ||
        saving
      ) {
        return;
      }

      try {
        setSaving(true);

        console.log(
          "================================"
        );

        console.log(
          saved
            ? "🔖 UNSAVING POST"
            : "🔖 SAVING POST"
        );

        console.log(
          "POST ID =>",
          item.id
        );

        console.log(
          "================================"
        );

        if (saved) {
          await dispatch(
            unsavePost(item.id)
          ).unwrap();

          setSaved(false);

          console.log(
            "✅ POST UNSAVED =>",
            item.id
          );
        } else {
          await dispatch(
            savePost(item.id)
          ).unwrap();

          setSaved(true);

          console.log(
            "✅ POST SAVED =>",
            item.id
          );
        }

      } catch (error) {
        console.log(
          "❌ SAVE / UNSAVE POST ERROR =>",
          error
        );

        Alert.alert(
          "Error",
          typeof error === "string"
            ? error
            : error?.message ||
              "Unable to update saved status."
        );

      } finally {
        setSaving(false);
      }
    },
    [
      dispatch,
      item?.id,
      saved,
      saving,
    ]
  );

  // ======================================================
  // DELETE POST API
  // ======================================================

  const executeDeletePost =
    useCallback(
      async () => {
        if (!item?.id) {
          console.log(
            "❌ POST ID NOT FOUND"
          );

          return;
        }

        if (deleting) {
          return;
        }

        try {
          console.log(
            "================================"
          );

          console.log(
            "🗑️ DELETE HOME POST"
          );

          console.log(
            "POST ID =>",
            item.id
          );

          console.log(
            "CURRENT USER ID =>",
            currentUserId
          );

          console.log(
            "================================"
          );

          // ----------------------------------------------
          // CHECK USER
          // ----------------------------------------------

          if (!currentUserId) {
            Alert.alert(
              "Error",
              "Unable to identify the current user."
            );

            return;
          }

          // ----------------------------------------------
          // POST ID
          // ----------------------------------------------

          const numericPostId =
            Number(item.id);

          if (
            !Number.isInteger(
              numericPostId
            )
          ) {
            Alert.alert(
              "Error",
              "Invalid post ID."
            );

            return;
          }

          setDeleting(true);

          console.log(
            "🚀 DELETE POST API START"
          );

          console.log(
            "POST ID =>",
            numericPostId
          );

          console.log(
            "USER ID =>",
            currentUserId
          );

          // ----------------------------------------------
          // DELETE API
          // ----------------------------------------------

          await dispatch(
            deletePost({
              postId:
                numericPostId,

              userId:
                currentUserId,
            })
          ).unwrap();

          console.log(
            "================================"
          );

          console.log(
            "✅ POST DELETED SUCCESSFULLY"
          );

          console.log(
            "DELETED POST ID =>",
            numericPostId
          );

          console.log(
            "================================"
          );

        } catch (error) {
          console.log(
            "================================"
          );

          console.log(
            "❌ DELETE POST ERROR"
          );

          console.log(
            "ERROR =>",
            error
          );

          console.log(
            "================================"
          );

          Alert.alert(
            "Delete Failed",
            typeof error === "string"
              ? error
              : error?.message ||
                "Unable to delete post."
          );

        } finally {
          setDeleting(false);
        }
      },
      [
        dispatch,
        item?.id,
        currentUserId,
        deleting,
      ]
    );

  // ======================================================
  // THREE DOT MENU
  // ======================================================

  const handleMenuPress =
    useCallback(() => {
      if (!item?.id) {
        console.log(
          "❌ POST ID NOT FOUND"
        );

        return;
      }

      console.log(
        "================================"
      );

      console.log(
        "⋮ POST THREE DOT PRESSED"
      );

      console.log(
        "POST ID =>",
        item.id
      );

      console.log(
        "================================"
      );

      Alert.alert(
        "Delete Post",
        "Are you sure you want to delete this post?",
        [
          // ----------------------------------------------
          // CANCEL
          // ----------------------------------------------

          {
            text: "Cancel",
            style: "cancel",
          },

          // ----------------------------------------------
          // DELETE
          // ----------------------------------------------

          {
            text: "Delete",
            style: "destructive",

            onPress:
              executeDeletePost,
          },
        ]
      );
    }, [
      item?.id,
      executeDeletePost,
    ]);

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <View
      style={styles.card}
    >

      {/* ==================================================
          HEADER
      ================================================== */}

      <View
        style={styles.header}
      >

        {/* USER */}

        <View
          style={styles.userRow}
        >

          {avatarUrl ? (
            <Image
              source={{
                uri: avatarUrl,
              }}
              style={styles.avatar}
            />
          ) : (
            <View
              style={
                styles.avatarPlaceholder
              }
            >
              <Ionicons
                name="person"
                size={22}
                color="#aaa"
              />
            </View>
          )}

          <View
            style={
              styles.userInfo
            }
          >

            <Text
              style={styles.name}
              numberOfLines={1}
            >
              {username}
            </Text>

            {locationName ? (
              <Text
                style={
                  styles.location
                }
                numberOfLines={1}
              >
                {locationName}
              </Text>
            ) : null}

          </View>

        </View>

        {/* ==================================================
            THREE DOT
        ================================================== */}

        <TouchableOpacity
          onPress={
            handleMenuPress
          }
          disabled={
            deleting
          }
          hitSlop={{
            top: 15,
            bottom: 15,
            left: 15,
            right: 15,
          }}
          activeOpacity={0.7}
          style={
            styles.menuButton
          }
        >

          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color="#fff"
          />

        </TouchableOpacity>

      </View>

      {/* ==================================================
          POST IMAGE
      ================================================== */}

      <View
        style={
          styles.imageContainer
        }
      >

        {mediaUrl ? (
          <Image
            source={{
              uri: mediaUrl,
            }}
            style={
              styles.postImage
            }
            resizeMode="cover"
          />
        ) : (
          <View
            style={styles.noImage}
          >

            <Ionicons
              name="image-outline"
              size={45}
              color="#777"
            />

            <Text
              style={
                styles.noImageText
              }
            >
              No image
            </Text>

          </View>
        )}

        {/* ==================================================
            MEDIA COUNT
        ================================================== */}

        {item?.media_count > 1 && (
          <View
            style={styles.counter}
          >
            <Text
              style={
                styles.counterText
              }
            >
              1/{item.media_count}
            </Text>
          </View>
        )}

        {/* ==================================================
            VIDEO ICON
        ================================================== */}

        {item?.media_type ===
          "video" && (
          <View
            style={
              styles.videoIcon
            }
          >
            <Ionicons
              name="play"
              size={15}
              color="#fff"
            />
          </View>
        )}

      </View>

      {/* ==================================================
          ACTIONS
      ================================================== */}

      <View
        style={
          styles.actionRow
        }
      >

        <View
          style={
            styles.leftIcons
          }
        >

          {/* ==================================================
              LIKE
          ================================================== */}

          <TouchableOpacity
            onPress={() =>
              setLiked(
                (previous) =>
                  !previous
              )
            }
            activeOpacity={0.7}
            style={
              styles.actionButton
            }
          >

            <Ionicons
              name={
                liked
                  ? "heart"
                  : "heart-outline"
              }
              size={27}
              color={
                liked
                  ? "#FF3158"
                  : "#fff"
              }
            />

          </TouchableOpacity>

          <Text
            style={styles.count}
          >
            {item?.likes_count || 0}
          </Text>

          {/* ==================================================
              COMMENT
          ================================================== */}

          <TouchableOpacity
            activeOpacity={0.7}
            style={
              styles.actionButton
            }
          >

            <Ionicons
              name="chatbubble-outline"
              size={25}
              color="#fff"
            />

          </TouchableOpacity>

          <Text
            style={styles.count}
          >
            {item?.comments_count || 0}
          </Text>

          {/* ==================================================
              SHARE
          ================================================== */}

          <TouchableOpacity
            activeOpacity={0.7}
            style={
              styles.actionButton
            }
          >

            <MaterialCommunityIcons
              name="send-outline"
              size={25}
              color="#fff"
            />

          </TouchableOpacity>

          <Text
            style={styles.count}
          >
            {item?.share_count || 0}
          </Text>

        </View>

        {/* ==================================================
            SAVE
        ================================================== */}

        <TouchableOpacity
          onPress={
            handleSave
          }
          disabled={
            saving
          }
          activeOpacity={0.7}
          hitSlop={8}
        >

          <Ionicons
            name={
              saved
                ? "bookmark"
                : "bookmark-outline"
            }
            size={26}
            color="#fff"
          />

        </TouchableOpacity>

      </View>

      {/* ==================================================
          CAPTION
      ================================================== */}

      {item?.caption ? (
        <View
          style={
            styles.captionContainer
          }
        >

          <Text
            style={styles.caption}
          >

            <Text
              style={styles.bold}
            >
              {username}
            </Text>

            {" "}

            {item.caption}

          </Text>

          {/* ==================================================
              HASHTAGS
          ================================================== */}

          {item?.hashtags?.length >
            0 && (
            <Text
              style={
                styles.hashTags
              }
            >
              {item.hashtags
                .map(
                  (tag) =>
                    `#${tag}`
                )
                .join(" ")}
            </Text>
          )}

        </View>
      ) : null}

    </View>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({

    // ==================================================
    // CARD
    // ==================================================

    card: {
      backgroundColor:
        "#080913",

      marginBottom: 18,

      borderBottomWidth: 0.6,

      borderBottomColor:
        "#23242F",

      paddingBottom: 15,
    },

    // ==================================================
    // HEADER
    // ==================================================

    header: {
      flexDirection:
        "row",

      justifyContent:
        "space-between",

      alignItems:
        "center",

      paddingHorizontal: 14,

      marginBottom: 12,
    },

    // ==================================================
    // USER ROW
    // ==================================================

    userRow: {
      flexDirection:
        "row",

      alignItems:
        "center",

      flex: 1,
    },

    // ==================================================
    // AVATAR
    // ==================================================

    avatar: {
      width: 42,
      height: 42,

      borderRadius: 21,

      marginRight: 10,
    },

    avatarPlaceholder: {
      width: 42,
      height: 42,

      borderRadius: 21,

      marginRight: 10,

      backgroundColor:
        "#24242D",

      justifyContent:
        "center",

      alignItems:
        "center",
    },

    // ==================================================
    // USER INFO
    // ==================================================

    userInfo: {
      flex: 1,
    },

    name: {
      color: "#fff",

      fontWeight:
        "700",

      fontSize: 15,
    },

    location: {
      color:
        "#9B9BA6",

      marginTop: 2,

      fontSize: 12,
    },

    // ==================================================
    // MENU
    // ==================================================

    menuButton: {
      width: 40,
      height: 40,

      justifyContent:
        "center",

      alignItems:
        "center",
    },

    // ==================================================
    // IMAGE
    // ==================================================

    imageContainer: {
      width: "100%",

      position:
        "relative",
    },

    postImage: {
      width: "100%",

      height: 500,

      backgroundColor:
        "#161720",
    },

    noImage: {
      width: "100%",

      height: 500,

      backgroundColor:
        "#161720",

      justifyContent:
        "center",

      alignItems:
        "center",
    },

    noImageText: {
      color: "#777",

      marginTop: 8,
    },

    // ==================================================
    // MEDIA COUNT
    // ==================================================

    counter: {
      position:
        "absolute",

      right: 15,

      top: 15,

      backgroundColor:
        "rgba(0,0,0,0.65)",

      paddingHorizontal: 10,

      paddingVertical: 5,

      borderRadius: 20,
    },

    counterText: {
      color: "#fff",

      fontSize: 12,

      fontWeight:
        "700",
    },

    // ==================================================
    // VIDEO ICON
    // ==================================================

    videoIcon: {
      position:
        "absolute",

      right: 15,

      top: 15,

      width: 28,

      height: 28,

      borderRadius: 14,

      backgroundColor:
        "rgba(0,0,0,0.65)",

      justifyContent:
        "center",

      alignItems:
        "center",
    },

    // ==================================================
    // ACTION ROW
    // ==================================================

    actionRow: {
      flexDirection:
        "row",

      justifyContent:
        "space-between",

      alignItems:
        "center",

      marginTop: 15,

      paddingHorizontal: 14,
    },

    leftIcons: {
      flexDirection:
        "row",

      alignItems:
        "center",
    },

    actionButton: {
      marginRight: 2,
    },

    count: {
      color: "#fff",

      marginHorizontal: 7,

      fontSize: 15,
    },

    // ==================================================
    // CAPTION
    // ==================================================

    captionContainer: {
      paddingHorizontal: 14,

      marginTop: 12,
    },

    caption: {
      color: "#fff",

      fontSize: 15,

      lineHeight: 22,
    },

    bold: {
      fontWeight:
        "700",
    },

    hashTags: {
      color:
        "#7D5CFF",

      marginTop: 6,

      fontSize: 14,
    },

  });