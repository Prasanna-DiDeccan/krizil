import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  VideoView,
  useVideoPlayer,
} from "expo-video";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  viewStory,
  reactToStory,
} from "../../src/redux/storySlice";

import {
  getMediaUrl,
} from "../../src/utils/media";

import StoriesReply from "../../src/components/stories/StoryReply";


const { width, height } = Dimensions.get("window");

const STORY_DURATION = 5000;


export default function StoryViewer() {
  const params = useLocalSearchParams();

  const router = useRouter();
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state) =>
      state.auth?.user ||
      state.auth?.currentUser
  );

  // =========================================================
  // STORIES PARAM
  // =========================================================

  const stories = (() => {
    try {
      if (Array.isArray(params?.stories)) {
        return params.stories;
      }

      if (typeof params?.stories === "string") {
        return JSON.parse(params.stories);
      }

      return [];
    } catch (error) {
      console.log(
        "STORY PARAM ERROR =>",
        error
      );

      return [];
    }
  })();


  const initialIndex = Number(
    params?.index || 0
  );


  const [currentIndex, setCurrentIndex] =
    useState(
      Math.max(
        0,
        Math.min(
          initialIndex,
          Math.max(
            stories.length - 1,
            0
          )
        )
      )
    );


  const currentStory =
    stories?.[currentIndex];


  // =========================================================
  // STATE
  // =========================================================

  const [paused, setPaused] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [selectedReaction, setSelectedReaction] =
    useState(
      currentStory?.my_reaction || null
    );

  const progressTimer =
    useRef(null);


  // =========================================================
  // STORY USER
  // =========================================================

  const user =
    currentStory?.user || {};

  const username =
    user?.username ||
    currentStory?.username ||
    user?.full_name ||
    currentStory?.full_name ||
    "User";

  const avatar =
    user?.avatar_url ||
    currentStory?.avatar_url ||
    null;

  const avatarUrl =
    avatar
      ? getMediaUrl(avatar)
      : null;


  // =========================================================
  // MEDIA
  // =========================================================

  const mediaUrl =
    currentStory?.media_url
      ? getMediaUrl(
          currentStory.media_url
        )
      : null;

  const mediaType =
    currentStory?.media_type;


  // =========================================================
  // VIDEO PLAYER
  // =========================================================

  const videoPlayer =
    useVideoPlayer(
      mediaType === "video"
        ? mediaUrl
        : null,
      (player) => {
        if (!player) return;

        player.loop = false;
      }
    );


  // =========================================================
  // STORY CHANGE LOG
  // =========================================================

  useEffect(() => {
    console.log(
      "===================================="
    );

    console.log(
      "📖 STORY VIEWER"
    );

    console.log(
      "CURRENT INDEX =>",
      currentIndex
    );

    console.log(
      "CURRENT STORY ID =>",
      currentStory?.id
    );

    console.log(
      "CURRENT STORY MEDIA =>",
      currentStory?.media_url
    );

    console.log(
      "CURRENT STORY TYPE =>",
      currentStory?.media_type
    );

    console.log(
      "CURRENT REACTION =>",
      currentStory?.my_reaction
    );

    console.log(
      "===================================="
    );
  }, [
    currentIndex,
    currentStory?.id,
  ]);


  // =========================================================
  // UPDATE SELECTED REACTION
  // =========================================================

  useEffect(() => {
    setSelectedReaction(
      currentStory?.my_reaction || null
    );
  }, [
    currentStory?.id,
    currentStory?.my_reaction,
  ]);


  // =========================================================
  // VIEW STORY
  // =========================================================

  useEffect(() => {
    if (!currentStory?.id) {
      return;
    }

    const storyUserId =
      currentStory?.user_id ??
      currentStory?.user?.id;

    // Don't count own story as viewed
    if (
      currentUser?.id &&
      String(storyUserId) ===
        String(currentUser.id)
    ) {
      return;
    }

    dispatch(
      viewStory(
        currentStory.id
      )
    );
  }, [
    currentStory?.id,
    currentUser?.id,
    dispatch,
  ]);


  // =========================================================
  // RESET PROGRESS WHEN STORY CHANGES
  // =========================================================

  useEffect(() => {
    setProgress(0);
  }, [currentStory?.id]);


  // =========================================================
  // PAUSE / PLAY VIDEO
  // =========================================================

  useEffect(() => {
    if (
      mediaType !== "video" ||
      !videoPlayer
    ) {
      return;
    }

    try {
      if (paused) {
        videoPlayer.pause();
      } else {
        videoPlayer.play();
      }
    } catch (error) {
      console.log(
        "VIDEO PLAY ERROR =>",
        error
      );
    }
  }, [
    paused,
    mediaType,
    videoPlayer,
    currentStory?.id,
  ]);


  // =========================================================
  // STORY PROGRESS
  // =========================================================

  useEffect(() => {
    if (!currentStory?.id) {
      return;
    }

    if (paused) {
      return;
    }

    if (
      mediaType === "video"
    ) {
      return;
    }

    if (progressTimer.current) {
      clearInterval(
        progressTimer.current
      );
    }

    const startTime =
      Date.now();

    progressTimer.current =
      setInterval(() => {
        const elapsed =
          Date.now() -
          startTime;

        const value =
          Math.min(
            elapsed /
              STORY_DURATION,
            1
          );

        setProgress(value);

        if (value >= 1) {
          clearInterval(
            progressTimer.current
          );

          goNext();
        }
      }, 50);

    return () => {
      if (
        progressTimer.current
      ) {
        clearInterval(
          progressTimer.current
        );
      }
    };
  }, [
    currentStory?.id,
    paused,
    mediaType,
  ]);


  // =========================================================
  // NEXT STORY
  // =========================================================

  const goNext = () => {
    if (
      currentIndex <
      stories.length - 1
    ) {
      setCurrentIndex(
        (prev) => prev + 1
      );

      setProgress(0);

      return;
    }

    router.back();
  };


  // =========================================================
  // PREVIOUS STORY
  // =========================================================

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(
        (prev) => prev - 1
      );

      setProgress(0);

      return;
    }

    router.back();
  };


  // =========================================================
  // REACTION
  // =========================================================

  const sendReaction = async (
    emoji
  ) => {
    if (!currentStory?.id) {
      return;
    }

    try {
      console.log(
        "===================================="
      );

      console.log(
        "❤️ STORY REACTION"
      );

      console.log(
        "STORY ID =>",
        currentStory.id
      );

      console.log(
        "EMOJI =>",
        emoji
      );

      console.log(
        "===================================="
      );

      await dispatch(
        reactToStory({
          storyId:
            currentStory.id,
          emoji,
        })
      ).unwrap();

      setSelectedReaction(
        emoji
      );
    } catch (error) {
      console.log(
        "REACTION ERROR =>",
        error
      );
    }
  };


  // =========================================================
  // HOLD TO PAUSE
  // =========================================================

  const handlePressIn = () => {
    setPaused(true);
  };


  const handlePressOut = () => {
    setPaused(false);
  };


  // =========================================================
  // INVALID STORY
  // =========================================================

  if (!currentStory) {
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={styles.safeArea}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() =>
              router.back()
            }
          >
            <Ionicons
              name="close"
              size={30}
              color="#fff"
            />
          </TouchableOpacity>

          <View
            style={styles.loadingContainer}
          >
            <ActivityIndicator
              size="large"
              color="#fff"
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }


  // =========================================================
  // RENDER
  // =========================================================

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={styles.safeArea}
        edges={[
          "top",
          "bottom",
        ]}
      >

        {/* ================================================= */}
        {/* TOP PROGRESS */}
        {/* ================================================= */}

        <View
          style={styles.progressContainer}
        >
          {stories.map(
            (story, index) => {
              let widthValue = 0;

              if (
                index <
                currentIndex
              ) {
                widthValue = 1;
              } else if (
                index ===
                currentIndex
              ) {
                widthValue =
                  progress;
              }

              return (
                <View
                  key={story?.id || index}
                  style={
                    styles.progressTrack
                  }
                >
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.max(
                          0,
                          Math.min(
                            widthValue *
                              100,
                            100
                          )
                        )}%`,
                      },
                    ]}
                  />
                </View>
              );
            }
          )}
        </View>


        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

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
                style={styles.avatar}
              />
            ) : (
              <View
                style={[
                  styles.avatar,
                  styles.avatarPlaceholder,
                ]}
              >
                <Ionicons
                  name="person"
                  size={20}
                  color="#aaa"
                />
              </View>
            )}

            <Text
              style={styles.username}
              numberOfLines={1}
            >
              {username}
            </Text>

          </View>


          <TouchableOpacity
            style={styles.closeButton}
            onPress={() =>
              router.back()
            }
          >
            <Ionicons
              name="close"
              size={30}
              color="#fff"
            />
          </TouchableOpacity>

        </View>


        {/* ================================================= */}
        {/* STORY MEDIA */}
        {/* ================================================= */}

        <View
          style={styles.mediaContainer}
        >

          {mediaType === "video" &&
          mediaUrl ? (
            <VideoView
              player={videoPlayer}
              style={styles.media}
              contentFit="contain"
              nativeControls={false}
            />
          ) : mediaUrl ? (
            <Image
              source={{
                uri: mediaUrl,
              }}
              style={styles.media}
              resizeMode="contain"
            />
          ) : (
            <View
              style={
                styles.loadingContainer
              }
            >
              <ActivityIndicator
                size="large"
                color="#fff"
              />
            </View>
          )}


          {/* ================================================= */}
          {/* LEFT TOUCH AREA */}
          {/* ================================================= */}

          <Pressable
            style={styles.leftPressArea}
            onPress={goPrevious}
            onLongPress={() =>
              setPaused(true)
            }
            delayLongPress={150}
            onPressOut={() =>
              setPaused(false)
            }
          />


          {/* ================================================= */}
          {/* RIGHT TOUCH AREA */}
          {/* ================================================= */}

          <Pressable
            style={styles.rightPressArea}
            onPress={goNext}
            onLongPress={() =>
              setPaused(true)
            }
            delayLongPress={150}
            onPressOut={() =>
              setPaused(false)
            }
          />

        </View>


        {/* ================================================= */}
        {/* CAPTION */}
        {/* ================================================= */}

        {!!currentStory?.caption && (
          <View
            style={styles.captionContainer}
          >
            <Text
              style={styles.caption}
            >
              {currentStory.caption}
            </Text>
          </View>
        )}


        {/* ================================================= */}
        {/* BOTTOM AREA */}
        {/* ================================================= */}

        <View
          style={styles.bottomArea}
        >

          {/* ================================================= */}
          {/* REACTIONS */}
          {/* ================================================= */}

          <View
            style={styles.reactionRow}
          >
            {[
              "❤️",
              "😂",
              "😍",
              "😮",
              "😢",
              "👏",
            ].map((emoji) => {

              const selected =
                selectedReaction ===
                emoji;

              return (
                <TouchableOpacity
                  key={emoji}
                  activeOpacity={0.7}
                  onPress={() =>
                    sendReaction(
                      emoji
                    )
                  }
                  style={[
                    styles.emojiButton,
                    selected &&
                      styles.selectedEmojiButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.emoji,
                      selected &&
                        styles.selectedEmoji,
                    ]}
                  >
                    {emoji}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>


          {/* ================================================= */}
          {/* REPLY */}
          {/* ================================================= */}

          <StoriesReply
            storyId={
              currentStory?.id
            }
            onReplyFocus={() => {
              setPaused(true);
            }}
            onReplyBlur={() => {
              setPaused(false);
            }}
          />

        </View>

      </SafeAreaView>
    </View>
  );
}


// =============================================================
// STYLES
// =============================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },


  // ===========================================================
  // PROGRESS
  // ===========================================================

  progressContainer: {
    position: "absolute",
    top: 8,
    left: 8,
    right: 8,
    zIndex: 20,
    flexDirection: "row",
    gap: 4,
  },

  progressTrack: {
    flex: 1,
    height: 3,
    backgroundColor:
      "rgba(255,255,255,0.35)",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },


  // ===========================================================
  // HEADER
  // ===========================================================

  header: {
    position: "absolute",
    top: 18,
    left: 12,
    right: 10,
    zIndex: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },

  avatarPlaceholder: {
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },

  username: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    maxWidth: width * 0.65,
  },

  closeButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },


  // ===========================================================
  // MEDIA
  // ===========================================================

  mediaContainer: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  media: {
    width: width,
    height: height,
  },


  // ===========================================================
  // TOUCH AREAS
  // ===========================================================

  leftPressArea: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.35,
  },

  rightPressArea: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: width * 0.35,
  },


  // ===========================================================
  // CAPTION
  // ===========================================================

  captionContainer: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 145,
    zIndex: 15,
  },

  caption: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 21,
    textAlign: "center",
  },


  // ===========================================================
  // BOTTOM
  // ===========================================================

  bottomArea: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 30,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },


  // ===========================================================
  // REACTIONS
  // ===========================================================

  reactionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    gap: 6,
  },

  emojiButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      "rgba(0,0,0,0.45)",
  },

  selectedEmojiButton: {
    backgroundColor:
      "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.7)",
  },

  emoji: {
    fontSize: 25,
  },

  selectedEmoji: {
    transform: [
      {
        scale: 1.15,
      },
    ],
  },

});
