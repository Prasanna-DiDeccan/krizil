import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
} from "react-native";

import {
  useVideoPlayer,
  VideoView,
} from "expo-video";

import Ionicons from "@expo/vector-icons/Ionicons";

import ReelSaveButton from "./ReelSaveButton";

import {
  useDispatch,
} from "react-redux";

import {
  likeReel,
  unlikeReel,
} from "../../redux/reelsSlice";

import {
  getMediaUrl,
} from "../../utils/media";

import CommentsSheet from "./CommentsSheet";

const { width: SCREEN_WIDTH } =
  Dimensions.get("window");

// ======================================================
// ACTIVE VIDEO
// ======================================================

const ActiveReelVideo = forwardRef(
  (
    {
      videoUrl,
      reelHeight,
      onProgress,
      onPlayingChange,
    },
    ref
  ) => {
    const player = useVideoPlayer(
      videoUrl,
      (player) => {
        player.loop = true;
        player.muted = false;
      }
    );

    // ==================================================
    // EXPOSE PLAYER CONTROLS TO PARENT
    // ==================================================

    useImperativeHandle(
      ref,
      () => ({
        play: () => {
          if (!player) return;

          try {
            player.play();
          } catch (error) {
            console.log(
              "❌ PLAY ERROR =>",
              error?.message
            );
          }
        },

        pause: () => {
          if (!player) return;

          try {
            player.pause();
          } catch (error) {
            console.log(
              "❌ PAUSE ERROR =>",
              error?.message
            );
          }
        },

        toggle: () => {
          if (!player) return;

          try {
            if (player.playing) {
              player.pause();
            } else {
              player.play();
            }
          } catch (error) {
            console.log(
              "❌ TOGGLE ERROR =>",
              error?.message
            );
          }
        },

        isPlaying: () => {
          return !!player?.playing;
        },
      }),
      [player]
    );

    // ==================================================
    // AUTO PLAY ACTIVE REEL
    // ==================================================

    useEffect(() => {
      if (!player) {
        return;
      }

      try {
        player.play();
      } catch (error) {
        console.log(
          "❌ AUTO PLAY ERROR =>",
          error?.message
        );
      }
    }, [player]);

    // ==================================================
    // TIME UPDATE
    // ==================================================

    useEffect(() => {
      if (!player) {
        return;
      }

      const subscription =
        player.addListener(
          "timeUpdate",
          (event) => {
            const currentTime =
              event?.currentTime ?? 0;

            const duration =
              event?.duration ??
              player.duration ??
              0;

            if (
              duration > 0 &&
              typeof onProgress === "function"
            ) {
              const percentage =
                currentTime / duration;

              onProgress(
                Math.min(
                  Math.max(
                    percentage,
                    0
                  ),
                  1
                )
              );
            }
          }
        );

      return () => {
        subscription?.remove();
      };
    }, [
      player,
      onProgress,
    ]);

    // ==================================================
    // PLAYING CHANGE
    // ==================================================

    useEffect(() => {
      if (!player) {
        return;
      }

      const subscription =
        player.addListener(
          "playingChange",
          (event) => {
            const playing =
              !!event?.isPlaying;

            console.log(
              "🎥 PLAYER PLAYING =>",
              playing
            );

            if (
              typeof onPlayingChange ===
              "function"
            ) {
              onPlayingChange(
                playing
              );
            }
          }
        );

      return () => {
        subscription?.remove();
      };
    }, [
      player,
      onPlayingChange,
    ]);

    return (
      <VideoView
        player={player}
        style={[
          styles.video,
          {
            height: reelHeight,
          },
        ]}
        contentFit="cover"
        nativeControls={false}
        fullscreenOptions={{
          enable: false,
        }}
        allowsPictureInPicture={false}
      />
    );
  }
);

// ======================================================
// REEL ITEM
// ======================================================

const ReelItem = ({
  reel,
  isActive,
  reelHeight,
}) => {
  const dispatch = useDispatch();

  // ==================================================
  // PLAYER REF
  // ==================================================

  const playerRef = useRef(null);

  // ==================================================
  // COMMENTS
  // ==================================================

  const [
    commentsVisible,
    setCommentsVisible,
  ] = useState(false);

  // ==================================================
  // PLAYING
  // ==================================================

  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);

  // ==================================================
  // PROGRESS
  // ==================================================

  const [
    progress,
    setProgress,
  ] = useState(0);

  // ==================================================
  // URL
  // ==================================================

  const videoUrl =
    getMediaUrl(
      reel?.video_url
    );

  const thumbnailUrl =
    getMediaUrl(
      reel?.thumbnail_url
    );

  // ==================================================
  // ACTIVE CHANGE
  // ==================================================

  useEffect(() => {
    if (isActive) {
      console.log(
        "▶️ ACTIVE REEL =>",
        reel?.id
      );

      setProgress(0);

      // Player will auto-play
      // when ActiveReelVideo mounts.
    } else {
      console.log(
        "🛑 INACTIVE REEL =>",
        reel?.id
      );

      setIsPlaying(false);
      setProgress(0);
    }
  }, [
    isActive,
    reel?.id,
  ]);

  // ==================================================
  // UNMOUNT
  // ==================================================

  useEffect(() => {
    return () => {
      console.log(
        "🧹 REEL COMPONENT UNMOUNT =>",
        reel?.id
      );
    };
  }, [
    reel?.id,
  ]);

  // ==================================================
  // VIDEO PRESS
  // ==================================================

  const handleVideoPress = () => {
    if (!isActive) {
      return;
    }

    console.log(
      "🎬 VIDEO PRESSED =>",
      reel?.id
    );

    if (!playerRef.current) {
      console.log(
        "❌ PLAYER REF NOT READY"
      );

      return;
    }

    playerRef.current.toggle();
  };

  // ==================================================
  // LIKE
  // ==================================================

  const handleLike = () => {
    if (reel?.is_liked) {
      if (!reel?.like_id) {
        console.log(
          "❌ like_id is missing"
        );

        return;
      }

      dispatch(
        unlikeReel({
          reelId: reel.id,
          likeId: reel.like_id,
        })
      );

      return;
    }

    dispatch(
      likeReel(reel.id)
    );
  };

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <View
      style={[
        styles.container,
        {
          height: reelHeight,
        },
      ]}
    >
      {/* ==================================================
          VIDEO
      ================================================== */}

      <View
        style={[
          styles.videoContainer,
          {
            height: reelHeight,
          },
        ]}
      >
        {/* THUMBNAIL */}

        {thumbnailUrl && (
          <Image
            source={{
              uri: thumbnailUrl,
            }}
            style={[
              styles.video,
              {
                height: reelHeight,
              },
            ]}
            resizeMode="cover"
          />
        )}

        {/* ACTIVE VIDEO */}

        {isActive &&
          videoUrl && (
            <Pressable
              style={
                styles.videoPressable
              }
              onPress={
                handleVideoPress
              }
            >
              <ActiveReelVideo
                ref={playerRef}
                videoUrl={
                  videoUrl
                }
                reelHeight={
                  reelHeight
                }
                onProgress={
                  setProgress
                }
                onPlayingChange={
                  setIsPlaying
                }
              />

              {/* PAUSE / PLAY OVERLAY */}

              {!isPlaying && (
                <View
                  style={
                    styles.playOverlay
                  }
                >
                  <View
                    style={
                      styles.playCircle
                    }
                  >
                    <Ionicons
                      name="play"
                      size={34}
                      color="#fff"
                    />
                  </View>
                </View>
              )}
            </Pressable>
          )}
      </View>

      {/* ==================================================
          RIGHT ACTIONS
      ================================================== */}

      <View
        style={[
          styles.actions,
          {
            bottom:
              reelHeight * 0.18,
          },
        ]}
      >
        <Pressable
          style={styles.action}
          onPress={
            handleLike
          }
        >
          <Ionicons
            name={
              reel?.is_liked
                ? "heart"
                : "heart-outline"
            }
            size={34}
            color={
              reel?.is_liked
                ? "#ff3040"
                : "#fff"
            }
          />

          <Text
            style={styles.count}
          >
            {reel?.likes_count || 0}
          </Text>
        </Pressable>

        <Pressable
          style={styles.action}
          onPress={() =>
            setCommentsVisible(true)
          }
        >
          <Ionicons
            name="chatbubble-outline"
            size={32}
            color="#fff"
          />

          <Text
            style={styles.count}
          >
            Comment
          </Text>
        </Pressable>

        <Pressable
          style={styles.action}
          onPress={() =>
            console.log(
              "SHARE =>",
              reel?.id
            )
          }
        >
          <Ionicons
            name="paper-plane-outline"
            size={32}
            color="#fff"
          />

          <Text
            style={styles.count}
          >
            Share
          </Text>
        </Pressable>

        <View
          style={styles.action}
        >
          <ReelSaveButton
            reelId={reel?.id}
            isSaved={
              reel?.is_saved
            }
          />

          <Text
            style={styles.count}
          >
            Save
          </Text>
        </View>

        <Pressable
          style={styles.more}
          onPress={() =>
            console.log(
              "MORE =>",
              reel?.id
            )
          }
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={30}
            color="#fff"
          />
        </Pressable>
      </View>

      {/* ==================================================
          USER INFO
      ================================================== */}

      <View
        style={[
          styles.bottomInfo,
          {
            bottom:
              reelHeight * 0.055,
          },
        ]}
      >
        <View
          style={styles.userRow}
        >
          <View
            style={styles.avatar}
          >
            <Ionicons
              name="person"
              size={22}
              color="#fff"
            />
          </View>

          <Text
            style={styles.username}
          >
            User {reel?.user_id}
          </Text>

          <Pressable
            style={styles.follow}
            onPress={() =>
              console.log(
                "FOLLOW =>",
                reel?.user_id
              )
            }
          >
            <Text
              style={
                styles.followText
              }
            >
              Follow
            </Text>
          </Pressable>
        </View>

        {reel?.caption ? (
          <Text
            style={styles.caption}
            numberOfLines={2}
          >
            {reel.caption}
          </Text>
        ) : null}

        <View
          style={styles.audio}
        >
          <Ionicons
            name="musical-notes"
            size={14}
            color="#fff"
          />

          <Text
            style={styles.audioText}
          >
            Original audio
          </Text>
        </View>
      </View>

      {/* ==================================================
          PROGRESS
      ================================================== */}

      {isActive && (
        <View
          style={[
            styles.progressTrack,
            {
              bottom: 0,
            },
          ]}
        >
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress * 100}%`,
              },
            ]}
          />
        </View>
      )}

      {/* ==================================================
          COMMENTS
      ================================================== */}

      <CommentsSheet
        visible={
          commentsVisible
        }
        postId={reel?.id}
        onClose={() =>
          setCommentsVisible(
            false
          )
        }
      />
    </View>
  );
};

export default ReelItem;

// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({
    container: {
      width: SCREEN_WIDTH,
      backgroundColor: "#000",
      position: "relative",
      overflow: "hidden",
    },

    videoContainer: {
      width: SCREEN_WIDTH,
      backgroundColor: "#000",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },

    video: {
      position: "absolute",
      width: SCREEN_WIDTH,
    },

    videoPressable: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },

    playOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:
        "rgba(0,0,0,0.12)",
    },

    playCircle: {
      width: 68,
      height: 68,
      borderRadius: 34,
      backgroundColor:
        "rgba(0,0,0,0.55)",
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: 4,
    },

    actions: {
      position: "absolute",
      right: 12,
      alignItems: "center",
      zIndex: 20,
    },

    action: {
      alignItems: "center",
      marginBottom: 22,
    },

    count: {
      color: "#fff",
      fontSize: 11,
      fontWeight: "600",
      marginTop: 4,
      textShadowColor: "#000",
      textShadowOffset: {
        width: 0,
        height: 1,
      },
      textShadowRadius: 3,
    },

    more: {
      marginTop: 2,
    },

    bottomInfo: {
      position: "absolute",
      left: 14,
      right: 75,
      zIndex: 20,
    },

    userRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },

    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#333",
      borderWidth: 1,
      borderColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 9,
    },

    username: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "700",
      marginRight: 10,
    },

    follow: {
      borderWidth: 1,
      borderColor: "#fff",
      borderRadius: 6,
      paddingHorizontal: 11,
      paddingVertical: 5,
    },

    followText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "600",
    },

    caption: {
      color: "#fff",
      fontSize: 14,
      lineHeight: 19,
      marginBottom: 6,
    },

    audio: {
      flexDirection: "row",
      alignItems: "center",
    },

    audioText: {
      color: "#fff",
      fontSize: 12,
      marginLeft: 5,
    },

    progressTrack: {
      position: "absolute",
      left: 0,
      right: 0,
      height: 3,
      backgroundColor:
        "rgba(255,255,255,0.35)",
      zIndex: 100,
    },

    progressFill: {
      height: 3,
      backgroundColor: "#fff",
      borderRadius: 2,
    },
  });