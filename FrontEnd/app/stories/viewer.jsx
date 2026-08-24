import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
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
  router,
  useLocalSearchParams,
} from "expo-router";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  viewStory,
  deleteStory,
  reactToStory,
  removeStoryReaction,
  replyToStory,
  getStoryViewers,
} from "../../src/redux/storySlice";

import {
  selectGlobalUser,
} from "../../src/store/profileSelectors";

const {
  width,
  height,
} = Dimensions.get("window");

const IMAGE_DURATION = 5000;

export default function StoryViewer() {
  const params =
    useLocalSearchParams();

  const dispatch =
    useDispatch();

  const currentUser =
    useSelector(
      selectGlobalUser
    );

  const {
    stories: storiesParam,
    index: indexParam,
  } = params;

  // =====================================================
  // STORIES
  // =====================================================

  const stories = useMemo(() => {
    try {
      if (!storiesParam) {
        return [];
      }

      const parsed =
        JSON.parse(storiesParam);

      return Array.isArray(parsed)
        ? parsed
        : [];
    } catch (error) {
      console.log(
        "STORY PARAM PARSE ERROR =>",
        error
      );

      return [];
    }
  }, [storiesParam]);

  const initialIndex =
    Number(indexParam || 0);

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(
    initialIndex
  );

  const [
    progress,
    setProgress,
  ] = useState(0);

  const [
    paused,
    setPaused,
  ] = useState(false);

  const [
    reply,
    setReply,
  ] = useState("");

  const [
    sendingReply,
    setSendingReply,
  ] = useState(false);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  const timerRef =
    useRef(null);

  const pressTimerRef =
    useRef(null);

  // =====================================================
  // CURRENT STORY
  // =====================================================

  const story =
    stories[currentIndex];

  // =====================================================
  // OWNER
  // =====================================================

  const isOwner =
    Number(story?.user_id) ===
      Number(currentUser?.id) ||
    Number(story?.user?.id) ===
      Number(currentUser?.id);

  // =====================================================
  // STORY USER
  // =====================================================

  const storyUser =
    story?.user || {};

  const username =
    storyUser?.username ||
    story?.username ||
    "User";

  const avatar =
    storyUser?.avatar_url ||
    story?.avatar_url ||
    null;

  // =====================================================
  // VIDEO PLAYER
  // =====================================================

  const player =
    useVideoPlayer(
      story?.media_type === "video"
        ? story?.media_url
        : null,
      (player) => {
        if (
          story?.media_type ===
          "video"
        ) {
          player.loop = false;
          player.play();
        }
      }
    );

  // =====================================================
  // MARK STORY AS VIEWED
  // =====================================================

  useEffect(() => {
    if (!story?.id) {
      return;
    }

    dispatch(
      viewStory(story.id)
    );
  }, [
    story?.id,
    dispatch,
  ]);

  // =====================================================
  // VIDEO PLAY / PAUSE
  // =====================================================

  useEffect(() => {
    if (!player) {
      return;
    }

    if (
      story?.media_type !==
      "video"
    ) {
      return;
    }

    if (paused) {
      player.pause();
    } else {
      player.play();
    }
  }, [
    paused,
    player,
    story?.media_type,
  ]);

  // =====================================================
  // IMAGE TIMER
  // =====================================================

  useEffect(() => {
    if (
      !story ||
      paused ||
      story.media_type === "video"
    ) {
      return;
    }

    setProgress(0);

    const startedAt =
      Date.now();

    timerRef.current =
      setInterval(() => {
        const elapsed =
          Date.now() -
          startedAt;

        const value =
          Math.min(
            elapsed /
              IMAGE_DURATION,
            1
          );

        setProgress(value);

        if (value >= 1) {
          clearInterval(
            timerRef.current
          );

          goNext();
        }
      }, 50);

    return () => {
      clearInterval(
        timerRef.current
      );
    };
  }, [
    currentIndex,
    paused,
    story?.id,
    story?.media_type,
  ]);

  // =====================================================
  // VIDEO PROGRESS
  // =====================================================

  useEffect(() => {
    if (
      !player ||
      !story ||
      story.media_type !==
        "video"
    ) {
      return;
    }

    if (paused) {
      return;
    }

    const interval =
      setInterval(() => {
        const duration =
          player.duration || 0;

        const currentTime =
          player.currentTime || 0;

        if (duration > 0) {
          const value =
            Math.min(
              currentTime /
                duration,
              1
            );

          setProgress(value);

          if (value >= 1) {
            goNext();
          }
        }
      }, 100);

    return () => {
      clearInterval(
        interval
      );
    };
  }, [
    player,
    paused,
    story?.id,
    story?.media_type,
  ]);

  // =====================================================
  // NEXT
  // =====================================================

  const goNext =
    useCallback(() => {
      if (
        currentIndex <
        stories.length - 1
      ) {
        setCurrentIndex(
          (prev) => prev + 1
        );

        setProgress(0);
        setPaused(false);
      } else {
        router.back();
      }
    }, [
      currentIndex,
      stories.length,
    ]);

  // =====================================================
  // PREVIOUS
  // =====================================================

  const goPrevious =
    useCallback(() => {
      if (
        currentIndex > 0
      ) {
        setCurrentIndex(
          (prev) => prev - 1
        );

        setProgress(0);
        setPaused(false);
      } else {
        router.back();
      }
    }, [
      currentIndex,
    ]);

  // =====================================================
  // HOLD START
  // =====================================================

  const handlePressIn =
    () => {
      pressTimerRef.current =
        setTimeout(() => {
          setPaused(true);
        }, 180);
    };

  // =====================================================
  // HOLD END
  // =====================================================

  const handlePressOut =
    () => {
      clearTimeout(
        pressTimerRef.current
      );

      if (paused) {
        setPaused(false);
      }
    };

  // =====================================================
  // TAP
  // =====================================================

  const handleTap =
    (event) => {
      const x =
        event.nativeEvent
          .locationX;

      if (x < width / 2) {
        goPrevious();
      } else {
        goNext();
      }
    };

  // =====================================================
  // DELETE STORY
  // =====================================================

  const handleDelete =
    () => {
      if (!story?.id) {
        return;
      }

      Alert.alert(
        "Delete story?",
        "This story will be permanently deleted.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress:
              async () => {
                try {
                  setDeleting(
                    true
                  );

                  const result =
                    await dispatch(
                      deleteStory(
                        story.id
                      )
                    );

                  if (
                    deleteStory.fulfilled.match(
                      result
                    )
                  ) {
                    if (
                      stories.length ===
                      1
                    ) {
                      router.back();
                      return;
                    }

                    if (
                      currentIndex >=
                      stories.length - 1
                    ) {
                      setCurrentIndex(
                        (prev) =>
                          Math.max(
                            prev - 1,
                            0
                          )
                      );
                    }

                    setProgress(0);
                  } else {
                    Alert.alert(
                      "Error",
                      "Unable to delete story."
                    );
                  }
                } catch (error) {
                  console.log(
                    "DELETE STORY ERROR =>",
                    error
                  );

                  Alert.alert(
                    "Error",
                    "Unable to delete story."
                  );
                } finally {
                  setDeleting(
                    false
                  );
                }
              },
          },
        ]
      );
    };

  // =====================================================
  // VIEWERS
  // =====================================================

  const handleViewers =
    async () => {
      if (!story?.id) {
        return;
      }

      const result =
        await dispatch(
          getStoryViewers(
            story.id
          )
        );

      if (
        getStoryViewers.fulfilled.match(
          result
        )
      ) {
        const data =
          result.payload;

        const count =
          Array.isArray(data)
            ? data.length
            : Array.isArray(
                data?.viewers
              )
            ? data.viewers.length
            : story.views_count ||
              0;

        Alert.alert(
          "Views",
          `${count} ${
            count === 1
              ? "person"
              : "people"
          } viewed your story.`
        );
      }
    };

  // =====================================================
  // REACTION
  // =====================================================

  const sendReaction =
    async (emoji) => {
      if (!story?.id) {
        return;
      }

      try {
        await dispatch(
          reactToStory({
            storyId: story.id,
            emoji,
          })
        );
      } catch (error) {
        console.log(
          "REACTION ERROR =>",
          error
        );
      }
    };

  // =====================================================
  // REPLY
  // =====================================================

  const sendReply =
    async () => {
      const text =
        reply.trim();

      if (
        !text ||
        !story?.id
      ) {
        return;
      }

      try {
        setSendingReply(
          true
        );

        const result =
          await dispatch(
            replyToStory({
              storyId:
                story.id,
              content: text,
            })
          );

        if (
          replyToStory.fulfilled.match(
            result
          )
        ) {
          setReply("");

          Alert.alert(
            "Sent",
            "Your reply was sent."
          );
        } else {
          Alert.alert(
            "Error",
            "Unable to send reply."
          );
        }
      } catch (error) {
        console.log(
          "REPLY ERROR =>",
          error
        );
      } finally {
        setSendingReply(
          false
        );
      }
    };

  // =====================================================
  // EMPTY
  // =====================================================

  if (!story) {
    return (
      <View
        style={
          styles.emptyContainer
        }
      >
        <Text
          style={styles.emptyText}
        >
          Story unavailable
        </Text>

        <TouchableOpacity
          onPress={() =>
            router.back()
          }
        >
          <Text
            style={
              styles.closeText
            }
          >
            Close
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // =====================================================
  // RENDER MEDIA
  // =====================================================

  const renderMedia =
    () => {
      if (
        story.media_type ===
        "video"
      ) {
        return (
          <VideoView
            player={player}
            style={
              styles.media
            }
            contentFit="contain"
            nativeControls={false}
          />
        );
      }

      return (
        <Image
          source={{
            uri: story.media_url,
          }}
          style={
            styles.media
          }
          resizeMode="contain"
        />
      );
    };

  // =====================================================
  // SCREEN
  // =====================================================

  return (
    <View
      style={
        styles.container
      }
    >
      {/* MEDIA */}

      {renderMedia()}

      {/* DARK OVERLAY */}

      <View
        pointerEvents="none"
        style={
          styles.backgroundOverlay
        }
      />

      {/* =================================================
          TOP
      ================================================= */}

      <SafeAreaView
        edges={["top"]}
        style={styles.topSafe}
      >
        {/* PROGRESS */}

        <View
          style={
            styles.progressContainer
          }
        >
          {stories.map(
            (item, index) => (
              <View
                key={
                  item.id ||
                  index
                }
                style={
                  styles.progressTrack
                }
              >
                <View
                  style={[
                    styles.progressFill,
                    {
                      width:
                        index <
                        currentIndex
                          ? "100%"
                          : index ===
                            currentIndex
                          ? `${
                              progress *
                              100
                            }%`
                          : "0%",
                    },
                  ]}
                />
              </View>
            )
          )}
        </View>

        {/* HEADER */}

        <View
          style={styles.header}
        >
          <View
            style={
              styles.userInfo
            }
          >
            {avatar ? (
              <Image
                source={{
                  uri: avatar,
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
                  color="#fff"
                />
              </View>
            )}

            <Text
              style={
                styles.username
              }
            >
              {username}
            </Text>

            {story.created_at && (
              <Text
                style={
                  styles.timeText
                }
              >
                • Story
              </Text>
            )}
          </View>

          <View
            style={
              styles.headerRight
            }
          >
            {isOwner && (
              <TouchableOpacity
                onPress={
                  handleDelete
                }
                style={
                  styles.headerButton
                }
              >
                <Ionicons
                  name="trash-outline"
                  size={23}
                  color="#fff"
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() =>
                router.back()
              }
              style={
                styles.headerButton
              }
            >
              <Ionicons
                name="close"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* =================================================
          TAP AREA
      ================================================= */}

      <Pressable
        style={
          styles.tapArea
        }
        onPress={
          handleTap
        }
        onPressIn={
          handlePressIn
        }
        onPressOut={
          handlePressOut
        }
      />

      {/* =================================================
          CAPTION
      ================================================= */}

      {!!story.caption && (
        <View
          pointerEvents="none"
          style={
            styles.captionWrapper
          }
        >
          <Text
            style={
              styles.captionText
            }
          >
            {story.caption}
          </Text>
        </View>
      )}

      {/* =================================================
          OWNER VIEWERS
      ================================================= */}

      {isOwner && (
        <TouchableOpacity
          style={
            styles.viewersButton
          }
          onPress={
            handleViewers
          }
        >
          <Ionicons
            name="eye-outline"
            size={20}
            color="#fff"
          />

          <Text
            style={
              styles.viewersText
            }
          >
            {story.views_count ||
              0}
          </Text>
        </TouchableOpacity>
      )}

      {/* =================================================
          BOTTOM
      ================================================= */}

      <KeyboardAvoidingView
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
        style={
          styles.bottomWrapper
        }
      >
        {/* REACTIONS */}

        <View
          style={
            styles.reactions
          }
        >
          {[
            "❤️",
            "😂",
            "😍",
            "😮",
            "😢",
            "🔥",
          ].map(
            (emoji) => (
              <TouchableOpacity
                key={emoji}
                onPress={() =>
                  sendReaction(
                    emoji
                  )
                }
                style={
                  styles.emojiButton
                }
              >
                <Text
                  style={
                    styles.emoji
                  }
                >
                  {emoji}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* REPLY */}

        {!isOwner && (
          <View
            style={
              styles.replyRow
            }
          >
            <TextInput
              value={reply}
              onChangeText={
                setReply
              }
              placeholder="Reply..."
              placeholderTextColor="#aaa"
              style={
                styles.replyInput
              }
              returnKeyType="send"
              onSubmitEditing={
                sendReply
              }
            />

            <TouchableOpacity
              onPress={
                sendReply
              }
              disabled={
                sendingReply ||
                !reply.trim()
              }
              style={
                styles.sendButton
              }
            >
              {sendingReply ? (
                <ActivityIndicator
                  size="small"
                  color="#fff"
                />
              ) : (
                <Ionicons
                  name="send"
                  size={20}
                  color="#fff"
                />
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* OWNER INFO */}

        {isOwner && (
          <View
            style={
              styles.ownerBottom
            }
          >
            <TouchableOpacity
              onPress={
                handleViewers
              }
              style={
                styles.ownerViewers
              }
            >
              <Ionicons
                name="eye-outline"
                size={22}
                color="#fff"
              />

              <Text
                style={
                  styles.ownerViewersText
                }
              >
                {story.views_count ||
                  0}{" "}
                views
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>

      {/* DELETE LOADING */}

      {deleting && (
        <View
          style={
            styles.loadingOverlay
          }
        >
          <ActivityIndicator
            size="large"
            color="#fff"
          />
        </View>
      )}
    </View>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#000",
    },

    emptyContainer: {
      flex: 1,
      backgroundColor:
        "#000",
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    emptyText: {
      color: "#fff",
      fontSize: 18,
      marginBottom: 20,
    },

    closeText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
    },

    media: {
      position:
        "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width,
      height,
      backgroundColor:
        "#000",
    },

    backgroundOverlay: {
      position:
        "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor:
        "rgba(0,0,0,0.10)",
    },

    topSafe: {
      position:
        "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 20,
    },

    progressContainer: {
      flexDirection:
        "row",
      paddingHorizontal:
        8,
      paddingTop: 4,
      gap: 4,
    },

    progressTrack: {
      flex: 1,
      height: 3,
      borderRadius: 3,
      overflow:
        "hidden",
      backgroundColor:
        "rgba(255,255,255,0.35)",
    },

    progressFill: {
      height: "100%",
      backgroundColor:
        "#fff",
      borderRadius: 3,
    },

    header: {
      height: 58,
      paddingHorizontal:
        10,
      flexDirection:
        "row",
      alignItems:
        "center",
      justifyContent:
        "space-between",
    },

    userInfo: {
      flexDirection:
        "row",
      alignItems:
        "center",
    },

    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 1,
      borderColor:
        "#fff",
    },

    avatarPlaceholder: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor:
        "#444",
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    username: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "700",
      marginLeft: 9,
    },

    timeText: {
      color: "#ddd",
      fontSize: 13,
      marginLeft: 6,
    },

    headerRight: {
      flexDirection:
        "row",
      alignItems:
        "center",
    },

    headerButton: {
      width: 42,
      height: 42,
      justifyContent:
        "center",
      alignItems:
        "center",
      marginLeft: 3,
    },

    tapArea: {
      position:
        "absolute",
      top: 65,
      bottom: 100,
      left: 0,
      right: 0,
      zIndex: 5,
    },

    captionWrapper: {
      position:
        "absolute",
      left: 20,
      right: 20,
      bottom: 145,
      alignItems:
        "center",
      zIndex: 10,
    },

    captionText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600",
      textAlign:
        "center",
      textShadowColor:
        "rgba(0,0,0,0.8)",
      textShadowOffset: {
        width: 1,
        height: 1,
      },
      textShadowRadius: 4,
    },

    viewersButton: {
      position:
        "absolute",
      left: 15,
      bottom: 115,
      flexDirection:
        "row",
      alignItems:
        "center",
      zIndex: 30,
    },

    viewersText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
      marginLeft: 5,
    },

    bottomWrapper: {
      position:
        "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal:
        12,
      paddingBottom: 18,
      zIndex: 30,
    },

    reactions: {
      flexDirection:
        "row",
      justifyContent:
        "center",
      alignItems:
        "center",
      marginBottom: 10,
    },

    emojiButton: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor:
        "rgba(0,0,0,0.45)",
      justifyContent:
        "center",
      alignItems:
        "center",
      marginHorizontal: 3,
    },

    emoji: {
      fontSize: 23,
    },

    replyRow: {
      height: 48,
      flexDirection:
        "row",
      alignItems:
        "center",
    },

    replyInput: {
      flex: 1,
      height: 46,
      borderWidth: 1,
      borderColor:
        "rgba(255,255,255,0.6)",
      borderRadius: 24,
      paddingHorizontal:
        18,
      color: "#fff",
      fontSize: 15,
      backgroundColor:
        "rgba(0,0,0,0.35)",
    },

    sendButton: {
      width: 44,
      height: 44,
      marginLeft: 7,
      borderRadius: 22,
      justifyContent:
        "center",
      alignItems:
        "center",
      backgroundColor:
        "rgba(0,0,0,0.5)",
    },

    ownerBottom: {
      alignItems:
        "center",
    },

    ownerViewers: {
      flexDirection:
        "row",
      alignItems:
        "center",
      paddingHorizontal:
        18,
      paddingVertical:
        8,
      borderRadius: 20,
      backgroundColor:
        "rgba(0,0,0,0.45)",
    },

    ownerViewersText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
      marginLeft: 7,
    },

    loadingOverlay: {
      position:
        "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor:
        "rgba(0,0,0,0.5)",
      justifyContent:
        "center",
      alignItems:
        "center",
      zIndex: 100,
    },
  });