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
  likeReel,
  unlikeReel,
  saveReel,
  unsaveReel,
} from "../../../redux/reelsSlice";

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
  // REDUX
  // ====================================================

  const saving = useSelector(
    (state) =>
      state.reels?.savingReelIds?.includes(
        item?.id
      )
  );

  const unsaving = useSelector(
    (state) =>
      state.reels?.unsavingReelIds?.includes(
        item?.id
      )
  );

  // ====================================================
  // STATE
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
            item?.id,
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
    item?.id,
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
  // RESET
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
      if (!item?.id) {
        return;
      }

      if (item?.is_liked) {
        if (!item?.like_id) {
          return;
        }

        dispatch(
          unlikeReel({
            reelId: item.id,
            likeId: item.like_id,
          })
        );

        return;
      }

      dispatch(
        likeReel(item.id)
      );
    }, [
      dispatch,
      item?.id,
      item?.is_liked,
      item?.like_id,
    ]);

  // ====================================================
  // SAVE
  // ====================================================

  const handleSave =
    useCallback(() => {
      if (!item?.id) {
        return;
      }

      if (item?.is_saved) {
        dispatch(
          unsaveReel(item.id)
        );

        return;
      }

      dispatch(
        saveReel(item.id)
      );
    }, [
      dispatch,
      item?.id,
      item?.is_saved,
    ]);

  // ====================================================
  // API RESPONSE USER DATA
  // ====================================================
  //
  // DO NOT use:
  //
  // item.user
  // item.username
  // currentUsername
  // Redux profile
  // currentUser fallback
  //
  // API response already gives:
  //
  // item.author.username
  // item.author.full_name
  // item.author.avatar_url
  //
  // ====================================================

  const username =
    item?.author?.username ||
    "User";

  const avatarUrl =
    getMediaUrl(
      item?.author?.avatar_url
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

      {/* ================================================
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

        {/* ==============================================
            MENU
        =============================================== */}

        <Pressable
          onPress={() =>
            onMenuPress?.(
              item
            )
          }
          hitSlop={12}
          style={
            styles.menuButton
          }
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={22}
            color="#fff"
          />
        </Pressable>

      </View>

      {/* ================================================
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

      {/* ================================================
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
                item?.is_liked
                  ? "heart"
                  : "heart-outline"
              }
              size={27}
              color={
                item?.is_liked
                  ? "#FF3158"
                  : "#fff"
              }
            />
          </Pressable>

          <Text
            style={
              styles.countText
            }
          >
            {item?.likes_count ?? 0}
          </Text>

          {/* COMMENT */}

          <Pressable
            onPress={() =>
              onCommentPress?.(
                item
              )
            }
            style={
              styles.actionButton
            }
            hitSlop={8}
          >
            <Ionicons
              name="chatbubble-outline"
              size={25}
              color="#fff"
            />
          </Pressable>

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

      {/* ================================================
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

      {/* ================================================
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
    width: 40,
    height: 40,

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