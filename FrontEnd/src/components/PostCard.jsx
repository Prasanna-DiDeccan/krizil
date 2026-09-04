import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { useRouter } from "expo-router";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  savePost,
  unsavePost,
} from "../redux/postSlice";

import {
  likeTarget,
  unlikeTarget,
} from "../redux/likeSlice";

import {
  getUser,
} from "../utils/storage";

import {
  BASE_URL,
} from "../utils/api";

// ======================================================
// COMPONENTS
// ======================================================

import CommentsSheet from "./comments/CommentsSheet";
import LikesSheet from "./likes/LikesSheet";
import HomePostMenu from "./HomePostMenu";

// ======================================================
// POST CARD
// ======================================================

export default function PostCard({
  item,
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  // ======================================================
  // POST MENU REF
  // ======================================================

  const postMenuRef = useRef(null);

  // ======================================================
  // CURRENT USER
  // ======================================================

  const [
    currentUserId,
    setCurrentUserId,
  ] = useState(null);

  // ======================================================
  // LOAD CURRENT USER
  // ======================================================

  useEffect(() => {
    let mounted = true;

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

        const userId =
          user?.id ??
          user?.user_id ??
          user?.user?.id ??
          null;

        console.log(
          "CURRENT USER ID =>",
          userId
        );

        console.log(
          "================================"
        );

        if (mounted) {
          setCurrentUserId(userId);
        }
      } catch (error) {
        console.log(
          "❌ GET STORED USER ERROR =>",
          error
        );

        if (mounted) {
          setCurrentUserId(null);
        }
      }
    };

    loadUser();

    return () => {
      mounted = false;
    };
  }, []);

  // ======================================================
  // POST OWNER ID
  //
  // Supports different possible backend structures.
  // Prefer item.user.id if your API returns:
  //
  // user: {
  //   id: 23,
  //   username: "testuser123"
  // }
  // ======================================================

  const postOwnerId =
    item?.user?.id ??
    item?.user_id ??
    item?.owner_id ??
    item?.author?.id ??
    item?.owner?.id ??
    item?.creator?.id ??
    null;

  // ======================================================
  // OWNER CHECK
  // ======================================================

  const isPostOwner =
    currentUserId != null &&
    postOwnerId != null &&
    Number(currentUserId) ===
      Number(postOwnerId);

  // ======================================================
  // OWNERSHIP DEBUG
  // ======================================================

  useEffect(() => {
    console.log(
      "================================"
    );

    console.log(
      "POST OWNERSHIP CHECK"
    );

    console.log(
      "POST ID =>",
      item?.id
    );

    console.log(
      "CURRENT USER ID =>",
      currentUserId
    );

    console.log(
      "POST OWNER ID =>",
      postOwnerId
    );

    console.log(
      "IS POST OWNER =>",
      isPostOwner
    );

    console.log(
      "================================"
    );
  }, [
    item?.id,
    currentUserId,
    postOwnerId,
    isPostOwner,
  ]);

  // ======================================================
  // LIKE KEY
  // ======================================================

  const likeKey = item?.id
    ? `post_${item.id}`
    : null;

  // ======================================================
  // LIKE DATA FROM REDUX
  // ======================================================

  const reduxLike = useSelector(
    (state) =>
      likeKey
        ? state.likes?.likes?.[likeKey]
        : null
  );

  // ======================================================
  // LIKE STATE
  // ======================================================

  const [
    liked,
    setLiked,
  ] = useState(
    Boolean(item?.is_liked)
  );

  const [
    likeCount,
    setLikeCount,
  ] = useState(
    item?.likes_count ?? 0
  );

  const [
    liking,
    setLiking,
  ] = useState(false);

  // ======================================================
  // SYNC LIKE FROM REDUX / ITEM
  // ======================================================

  useEffect(() => {
    if (!reduxLike) {
      setLiked(
        Boolean(item?.is_liked)
      );

      setLikeCount(
        item?.likes_count ?? 0
      );

      return;
    }

    setLiked(
      Boolean(reduxLike.isLiked)
    );

    setLikeCount(
      reduxLike.count ?? 0
    );
  }, [
    item?.is_liked,
    item?.likes_count,
    reduxLike,
  ]);

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
  // COMMENTS
  // ======================================================

  const [
    commentsVisible,
    setCommentsVisible,
  ] = useState(false);

  // ======================================================
  // LIKES
  // ======================================================

  const [
    likesVisible,
    setLikesVisible,
  ] = useState(false);

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

  const getMediaUrl =
    useCallback(
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
    item?.user?.username ||
    item?.user?.full_name ||
    item?.username ||
    "";

  const avatarUrl =
    getMediaUrl(
      item?.user?.avatar_url
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
  // OPEN THREE DOT MENU
  // ======================================================

  const handleMenuPress =
    useCallback(() => {
      if (!item?.id) {
        console.log(
          "❌ POST ID NOT FOUND"
        );

        return;
      }

      // ================================================
      // EXTRA FRONTEND OWNER CHECK
      // ================================================

      if (!isPostOwner) {
        console.log(
          "🚫 NOT POST OWNER - MENU NOT OPENED"
        );

        console.log(
          "CURRENT USER ID =>",
          currentUserId
        );

        console.log(
          "POST OWNER ID =>",
          postOwnerId
        );

        return;
      }

      console.log(
        "================================"
      );

      console.log(
        "📂 OPEN HOME POST MENU"
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
        "POST OWNER ID =>",
        postOwnerId
      );

      console.log(
        "IS OWNER =>",
        isPostOwner
      );

      console.log(
        "================================"
      );

      postMenuRef.current?.open(
        item
      );
    }, [
      item,
      isPostOwner,
      currentUserId,
      postOwnerId,
    ]);

  // ======================================================
  // LIKE POST
  // ======================================================

  const handleLike =
    useCallback(
      async () => {
        if (
          !item?.id ||
          liking
        ) {
          return;
        }

        const postId =
          Number(item.id);

        if (
          !Number.isInteger(postId)
        ) {
          console.log(
            "❌ INVALID POST ID =>",
            item?.id
          );

          return;
        }

        try {
          setLiking(true);

          console.log(
            "================================"
          );

          console.log(
            liked
              ? "💔 UNLIKE POST"
              : "❤️ LIKE POST"
          );

          console.log(
            "TARGET TYPE => post"
          );

          console.log(
            "TARGET ID =>",
            postId
          );

          console.log(
            "================================"
          );

          // ==================================================
          // UNLIKE
          // ==================================================

          if (liked) {
            const result =
              await dispatch(
                unlikeTarget({
                  targetType: "post",
                  targetId: postId,
                })
              ).unwrap();

            console.log(
              "✅ POST UNLIKED =>",
              result
            );

            setLiked(false);

            setLikeCount(
              (previous) =>
                Math.max(
                  0,
                  previous - 1
                )
            );

            return;
          }

          // ==================================================
          // LIKE
          // ==================================================

          const result =
            await dispatch(
              likeTarget({
                targetType: "post",
                targetId: postId,
              })
            ).unwrap();

          console.log(
            "✅ POST LIKED =>",
            result
          );

          setLiked(true);

          if (
            typeof result?.likes_count ===
            "number"
          ) {
            setLikeCount(
              result.likes_count
            );
          } else {
            setLikeCount(
              (previous) =>
                previous + 1
            );
          }
        } catch (error) {
          console.log(
            "❌ POST LIKE ERROR =>",
            error
          );
        } finally {
          setLiking(false);
        }
      },
      [
        dispatch,
        item?.id,
        liked,
        liking,
      ]
    );

  // ======================================================
  // OPEN COMMENTS
  // ======================================================

  const handleOpenComments =
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
        "💬 OPEN POST COMMENTS"
      );

      console.log(
        "POST ID =>",
        item.id
      );

      console.log(
        "================================"
      );

      setCommentsVisible(true);
    }, [
      item?.id,
    ]);

  // ======================================================
  // CLOSE COMMENTS
  // ======================================================

  const handleCloseComments =
    useCallback(() => {
      console.log(
        "💬 CLOSE POST COMMENTS"
      );

      setCommentsVisible(false);
    }, []);

  // ======================================================
  // SAVE / UNSAVE
  // ======================================================

  const handleSave =
    useCallback(
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
      <TouchableOpacity
  activeOpacity={0.7}
  onPress={() => {
    if (!postOwnerId) {
      console.log("❌ POST OWNER ID NOT FOUND");
      return;
    }

    console.log("================================");
    console.log("👤 OPEN PROFILE");
    console.log("POST OWNER ID =>", postOwnerId);
    console.log("IS OWN POST =>", isPostOwner);
    console.log("================================");

    if (isPostOwner) {
      // Own profile
      router.push("/profile");
    } else {
      // Other user's profile
      router.push({
        pathname: "/profile-screens/user-profile",
        params: {
          userId: String(postOwnerId),
        },
      });
    }
  }}
>
  <Text
    style={styles.name}
    numberOfLines={1}
  >
    {username}
  </Text>
</TouchableOpacity>

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
            ONLY POST OWNER CAN SEE IT
        ================================================== */}

        {isPostOwner && (
          <TouchableOpacity
            onPress={
              handleMenuPress
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
        )}
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

        {/* MEDIA COUNT */}

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

        {/* VIDEO ICON */}

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

          <View
            style={
              styles.actionGroup
            }
          >
            <TouchableOpacity
              onPress={
                handleLike
              }
              disabled={liking}
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

            <TouchableOpacity
              onPress={() =>
                setLikesVisible(true)
              }
              hitSlop={{
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
              }}
            >
              <Text
                style={
                  styles.count
                }
              >
                {likeCount}
              </Text>
            </TouchableOpacity>
          </View>

          {/* ==================================================
              COMMENT
          ================================================== */}

          <View
            style={
              styles.actionGroup
            }
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={
                styles.actionButton
              }
              onPress={
                handleOpenComments
              }
              hitSlop={{
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
              }}
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
              {item?.comments_count ||
                0}
            </Text>
          </View>

          {/* ==================================================
              SHARE
          ================================================== */}

          <View
            style={
              styles.actionGroup
            }
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={
                styles.actionButton
              }
              onPress={() =>
                console.log(
                  "SHARE POST =>",
                  item?.id
                )
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
              {item?.share_count ||
                0}
            </Text>
          </View>
        </View>

        {/* ==================================================
            SAVE
        ================================================== */}

        <TouchableOpacity
          onPress={
            handleSave
          }
          disabled={saving}
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

          {/* HASHTAGS */}

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

      {/* ==================================================
          COMMENTS SHEET
      ================================================== */}

      <CommentsSheet
        visible={
          commentsVisible
        }
        postId={
          item?.id
        }
        onClose={
          handleCloseComments
        }
      />

      {/* ==================================================
          LIKES SHEET
      ================================================== */}

      <LikesSheet
        visible={
          likesVisible
        }
        postId={
          item?.id
        }
        onClose={() =>
          setLikesVisible(false)
        }
      />

      {/* ==================================================
          HOME POST MENU
      ================================================== */}

      <HomePostMenu
        ref={postMenuRef}
      />
    </View>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({

    card: {
      backgroundColor:
        "#080913",

      marginBottom: 18,

      borderBottomWidth:
        0.6,

      borderBottomColor:
        "#23242F",

      paddingBottom: 15,
    },

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

    userRow: {
      flexDirection:
        "row",

      alignItems:
        "center",

      flex: 1,
    },

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
      color: "#9B9CA7",

      fontSize: 12,

      marginTop: 2,
    },

    menuButton: {
      width: 40,
      height: 40,

      justifyContent:
        "center",

      alignItems:
        "center",
    },

    imageContainer: {
      width: "100%",

      aspectRatio: 1,

      backgroundColor:
        "#11121B",

      position: "relative",

      overflow: "hidden",
    },

    postImage: {
      width: "100%",
      height: "100%",
    },

    noImage: {
      flex: 1,

      justifyContent:
        "center",

      alignItems:
        "center",

      backgroundColor:
        "#12131D",
    },

    noImageText: {
      color: "#777",

      fontSize: 13,

      marginTop: 8,
    },

    counter: {
      position: "absolute",

      top: 12,
      right: 12,

      paddingHorizontal: 9,
      paddingVertical: 5,

      borderRadius: 15,

      backgroundColor:
        "rgba(0,0,0,0.65)",
    },

    counterText: {
      color: "#fff",

      fontSize: 11,

      fontWeight:
        "700",
    },

    videoIcon: {
      position: "absolute",

      right: 12,
      bottom: 12,

      width: 30,
      height: 30,

      borderRadius: 15,

      backgroundColor:
        "rgba(0,0,0,0.65)",

      alignItems:
        "center",

      justifyContent:
        "center",
    },

    actionRow: {
      flexDirection:
        "row",

      alignItems:
        "center",

      justifyContent:
        "space-between",

      paddingHorizontal: 14,

      paddingTop: 10,

      paddingBottom: 2,
    },

    leftIcons: {
      flexDirection:
        "row",

      alignItems:
        "center",
    },

    actionGroup: {
      flexDirection:
        "row",

      alignItems:
        "center",

      marginRight: 13,
    },

    actionButton: {
      width: 32,
      height: 34,

      alignItems:
        "center",

      justifyContent:
        "center",
    },

    count: {
      color: "#fff",

      fontSize: 12,

      fontWeight:
        "600",

      marginLeft: 2,
    },

    captionContainer: {
      paddingHorizontal: 14,

      paddingTop: 7,
    },

    caption: {
      color: "#F5F5F5",

      fontSize: 13,

      lineHeight: 19,
    },

    bold: {
      color: "#fff",

      fontWeight:
        "700",
    },

    hashTags: {
      color: "#4FA3FF",

      fontSize: 13,

      lineHeight: 19,

      marginTop: 3,
    },
  });