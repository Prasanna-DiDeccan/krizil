import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import {
  useVideoPlayer,
  VideoView,
} from "expo-video";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  saveReel,
  unsaveReel,
} from "../../../redux/reelsSlice";

import {
  likeTarget,
  unlikeTarget,
} from "../../../redux/likeSlice";

import LikesSheet from "../../likes/LikesSheet";

import CommentsSheet from "../../comments/CommentsSheet";

import { BASE_URL } from "../../../utils/api";

const {
  width: SCREEN_WIDTH,
} = Dimensions.get("window");

// ======================================================
// MEDIA URL
// ======================================================

const getMediaUrl = (url) => {
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
};

// ======================================================
// COMPONENT
// ======================================================

export default function HomeReel({
  item,
  isActive = false,

  onCommentPress,
  onSharePress,
  onMenuPress,
  onReelPress,
}) {
  const dispatch = useDispatch();

  // ====================================================
  // LIKES SHEET
  // ====================================================

  const [
    likesVisible,
    setLikesVisible,
  ] = useState(false);

  // ====================================================
  // COMMENTS SHEET
  // ====================================================

  const [
    commentsVisible,
    setCommentsVisible,
  ] = useState(false);

  // ====================================================
  // REEL ID
  // ====================================================

  const reelId = item?.id;

  // ====================================================
  // COMMON LIKE REDUX STATE
  // ====================================================

  const likeKey = reelId
    ? `reel_${reelId}`
    : null;

  const likeState = useSelector(
    (state) =>
      likeKey
        ? state.likes?.likes?.[likeKey]
        : null
  );

  // ====================================================
  // SAVE STATE
  // ====================================================

  const saving = useSelector(
    (state) =>
      state.reels?.savingReelIds?.includes(
        reelId
      )
  );

  const unsaving = useSelector(
    (state) =>
      state.reels?.unsavingReelIds?.includes(
        reelId
      )
  );

  // ====================================================
  // LIKE DISPLAY
  // ====================================================

  const isLiked =
    likeState?.isLiked ??
    item?.is_liked ??
    false;

  const likesCount =
    likeState?.count ??
    item?.likes_count ??
    0;

  // ====================================================
  // VIDEO STATE
  // ====================================================

  const [
    videoLoading,
    setVideoLoading,
  ] = useState(true);

  const [
    videoError,
    setVideoError,
  ] = useState(false);

  const [
    paused,
    setPaused,
  ] = useState(false);

  // ====================================================
  // VIDEO URL
  // ====================================================

  const videoUrl = useMemo(
    () =>
      getMediaUrl(
        item?.video_url
      ),
    [item?.video_url]
  );

  // ====================================================
  // PLAYER
  // ====================================================

  const player = useVideoPlayer(
    videoUrl,
    (player) => {
      player.loop = true;
      player.muted = false;
    }
  );

  // ====================================================
  // VIDEO STATUS
  // ====================================================

  useEffect(() => {
    if (!player) {
      return;
    }

    const subscription =
      player.addListener(
        "statusChange",
        (event) => {
          console.log(
            "🎥 HOME REEL STATUS =>",
            reelId,
            event?.status,
            event?.error
          );

          if (
            event?.status ===
            "readyToPlay"
          ) {
            setVideoLoading(false);
            setVideoError(false);
          }

          if (
            event?.status ===
            "error"
          ) {
            setVideoLoading(false);
            setVideoError(true);

            console.log(
              "❌ HOME REEL VIDEO ERROR =>",
              event?.error
            );
          }

          if (
            event?.status ===
            "loading"
          ) {
            setVideoLoading(true);
          }
        }
      );

    return () => {
      subscription?.remove();
    };
  }, [
    player,
    reelId,
  ]);

  // ====================================================
  // PLAY / PAUSE
  // ====================================================

  useEffect(() => {
    if (!player) {
      return;
    }

    try {
      if (
        isActive &&
        !paused &&
        !videoError
      ) {
        player.play();
      } else {
        player.pause();
      }
    } catch (error) {
      console.log(
        "❌ HOME REEL PLAY ERROR =>",
        error?.message
      );
    }
  }, [
    player,
    isActive,
    paused,
    videoError,
  ]);

  // ====================================================
  // RESET VIDEO
  // ====================================================

  useEffect(() => {
    setVideoLoading(true);
    setVideoError(false);
    setPaused(false);
  }, [videoUrl]);

  // ====================================================
  // VIDEO PRESS
  // ====================================================

  const handleVideoPress =
    useCallback(() => {
      if (onReelPress) {
        onReelPress(item);
        return;
      }

      setPaused(
        (previous) => !previous
      );
    }, [
      item,
      onReelPress,
    ]);

  // ====================================================
  // LIKE
  // ====================================================

  const handleLike =
    useCallback(() => {
      if (!reelId) {
        console.log(
          "❌ REEL ID MISSING FOR LIKE"
        );

        return;
      }

      console.log(
        "❤️ REEL LIKE CLICK =>",
        reelId,
        "currently liked:",
        isLiked
      );

      if (isLiked) {
        console.log(
          "💔 UNLIKE REEL =>",
          reelId
        );

        dispatch(
          unlikeTarget({
            targetType: "reel",
            targetId: reelId,
          })
        );

        return;
      }

      console.log(
        "❤️ LIKE REEL =>",
        reelId
      );

      dispatch(
        likeTarget({
          targetType: "reel",
          targetId: reelId,
        })
      );
    }, [
      dispatch,
      reelId,
      isLiked,
    ]);

  // ====================================================
  // SAVE
  // ====================================================

  const handleSave =
    useCallback(() => {
      if (!reelId) {
        return;
      }

      if (item?.is_saved) {
        dispatch(
          unsaveReel(reelId)
        );

        return;
      }

      dispatch(
        saveReel(reelId)
      );
    }, [
      dispatch,
      reelId,
      item?.is_saved,
    ]);

  // ====================================================
  // OPEN COMMENTS
  // ====================================================

  const handleOpenComments =
    useCallback(() => {
      console.log(
        "💬 HOME REEL COMMENT CLICKED =>",
        reelId
      );

      if (!reelId) {
        return;
      }

      setCommentsVisible(true);

      if (onCommentPress) {
        onCommentPress(item);
      }
    }, [
      reelId,
      item,
      onCommentPress,
    ]);

  // ====================================================
  // CLOSE COMMENTS
  // ====================================================

  const handleCloseComments =
    useCallback(() => {
      setCommentsVisible(false);
    }, []);

  // ====================================================
  // USER
  // ====================================================

  const username =
    item?.user?.username ||
    item?.username ||
    "User";

  const avatarUrl =
    getMediaUrl(
      item?.user?.avatar_url ||
        item?.author?.avatar ||
        item?.avatar_url
    );

  // ====================================================
  // CAPTION
  // ====================================================

  const caption =
    typeof item?.caption ===
    "string"
      ? item.caption.trim()
      : "";

  // ====================================================
  // NO VIDEO
  // ====================================================

  if (!videoUrl) {
    return null;
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <View
      style={styles.container}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <View
        style={styles.header}
      >
        <View
          style={
            styles.userContainer
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
                size={18}
                color="#aaa"
              />
            </View>
          )}

          <Text
            style={
              styles.username
            }
            numberOfLines={1}
          >
            {username}
          </Text>
        </View>

        {/* =================================================
            REEL ELLIPSIS MENU
        ================================================= */}

        <Pressable
          onPress={() => {
            console.log(
              "⋯ REEL ELLIPSIS PRESSED =>",
              reelId
            );

            if (!reelId) {
              console.log(
                "❌ CANNOT OPEN REEL MENU - ID MISSING"
              );

              return;
            }

            onMenuPress?.(item);
          }}
          hitSlop={{
            top: 15,
            bottom: 15,
            left: 15,
            right: 15,
          }}
          style={
            styles.menuButton
          }
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color="#fff"
          />
        </Pressable>
      </View>

      {/* =================================================
          VIDEO
      ================================================= */}

      <Pressable
        style={
          styles.videoContainer
        }
        onPress={
          handleVideoPress
        }
      >
        <VideoView
          player={player}
          style={styles.video}
          contentFit="cover"
          nativeControls={false}
          allowsFullscreen={false}
          allowsPictureInPicture={false}
        />

        {/* LOADING */}

        {videoLoading &&
          !videoError && (
            <View
              style={
                styles.videoLoader
              }
            >
              <ActivityIndicator
                size="large"
                color="#fff"
              />
            </View>
          )}

        {/* ERROR */}

        {videoError && (
          <View
            style={
              styles.videoError
            }
          >
            <Ionicons
              name="alert-circle-outline"
              size={42}
              color="#fff"
            />

            <Text
              style={
                styles.videoErrorText
              }
            >
              Unable to play video
            </Text>
          </View>
        )}

        {/* PAUSED */}

        {paused &&
          !videoLoading &&
          !videoError && (
            <View
              style={
                styles.pauseIndicator
              }
            >
              <Ionicons
                name="play"
                size={34}
                color="#fff"
              />
            </View>
          )}
      </Pressable>

      {/* =================================================
          ACTIONS
      ================================================= */}

      <View
        style={styles.actionRow}
      >
        <View
          style={
            styles.leftActions
          }
        >
          {/* LIKE */}

          <Pressable
            onPress={
              handleLike
            }
            style={
              styles.actionButton
            }
            hitSlop={8}
          >
            <Ionicons
              name={
                isLiked
                  ? "heart"
                  : "heart-outline"
              }
              size={27}
              color={
                isLiked
                  ? "#FF3158"
                  : "#fff"
              }
            />
          </Pressable>

          {/* LIKE COUNT */}

          <Pressable
            onPress={() =>
              setLikesVisible(true)
            }
            hitSlop={8}
          >
            <Text
              style={
                styles.countText
              }
            >
              {likesCount}
            </Text>
          </Pressable>

          {/* COMMENTS */}

          <Pressable
            onPress={
              handleOpenComments
            }
            style={
              styles.actionButton
            }
            hitSlop={12}
          >
            <Ionicons
              name="chatbubble-outline"
              size={25}
              color="#fff"
            />
          </Pressable>

          {/* COMMENT COUNT */}

          <Text
            style={
              styles.countText
            }
          >
            {item?.comments_count ??
              0}
          </Text>

          {/* SHARE */}

          <Pressable
            onPress={() =>
              onSharePress?.(
                item
              )
            }
            style={
              styles.actionButton
            }
            hitSlop={8}
          >
            <MaterialCommunityIcons
              name="send-outline"
              size={26}
              color="#fff"
            />
          </Pressable>
        </View>

        {/* SAVE */}

        <Pressable
          onPress={
            handleSave
          }
          disabled={
            saving || unsaving
          }
          hitSlop={8}
        >
          <Ionicons
            name={
              item?.is_saved
                ? "bookmark"
                : "bookmark-outline"
            }
            size={27}
            color="#fff"
          />
        </Pressable>
      </View>

      {/* =================================================
          CAPTION
      ================================================= */}

      {caption.length > 0 && (
        <View
          style={
            styles.captionContainer
          }
        >
          <Text
            style={styles.caption}
            numberOfLines={3}
          >
            <Text
              style={styles.bold}
            >
              {username}
            </Text>

            {"  "}

            {caption}
          </Text>
        </View>
      )}

      {/* =================================================
          DATE
      ================================================= */}

      {item?.created_at && (
        <View
          style={
            styles.dateContainer
          }
        >
          <Text
            style={
              styles.dateText
            }
          >
            {new Date(
              item.created_at
            ).toLocaleDateString()}
          </Text>
        </View>
      )}

      {/* =================================================
          COMMENTS SHEET
      ================================================= */}

      <CommentsSheet
        visible={
          commentsVisible
        }
        reelId={reelId}
        onClose={
          handleCloseComments
        }
      />

      {/* =================================================
          LIKES SHEET
      ================================================= */}

      <LikesSheet
        visible={
          likesVisible
        }
        reelId={reelId}
        onClose={() =>
          setLikesVisible(false)
        }
      />
    </View>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#080913",
    paddingBottom: 18,
    marginBottom: 8,
  },

  header: {
    minHeight: 58,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",
  },

  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
  },

  avatarPlaceholder: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
    backgroundColor: "#24242D",
    justifyContent: "center",
    alignItems: "center",
  },

  username: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
  },

  menuButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },

  videoContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#000",
    position: "relative",
    overflow: "hidden",
  },

  video: {
    width: "100%",
    height: "100%",
  },

  videoLoader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      "rgba(0,0,0,0.15)",
  },

  videoError: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },

  videoErrorText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 14,
  },

  pauseIndicator: {
    position: "absolute",

    left:
      SCREEN_WIDTH / 2 - 30,

    top:
      SCREEN_WIDTH / 2 - 30,

    width: 60,
    height: 60,

    borderRadius: 30,

    backgroundColor:
      "rgba(0,0,0,0.55)",

    justifyContent: "center",
    alignItems: "center",
  },

  actionRow: {
    minHeight: 52,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",
  },

  leftActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  actionButton: {
    marginRight: 14,
  },

  countText: {
    color: "#fff",
    fontSize: 14,
    marginRight: 16,
    marginLeft: -8,
  },

  captionContainer: {
    paddingHorizontal: 14,
    paddingTop: 2,
  },

  caption: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
  },

  bold: {
    fontWeight: "700",
  },

  dateContainer: {
    paddingHorizontal: 14,
    paddingTop: 7,
  },

  dateText: {
    color: "#777",
    fontSize: 11,
  },
});