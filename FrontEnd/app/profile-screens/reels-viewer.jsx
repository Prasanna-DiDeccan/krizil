import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
  ActivityIndicator,
  StatusBar,
  Image,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useVideoPlayer,
  VideoView,
} from "expo-video";

import Ionicons from "@expo/vector-icons/Ionicons";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  getSavedReels,
} from "../../src/redux/savedSlice";

import {
  getHomeReelsFeed,
  getUserReels,
} from "../../src/redux/reelsSlice";

import {
  getUser,
} from "../../src/utils/storage";

const {
  width,
  height,
} = Dimensions.get("window");

// ======================================================
// MEDIA URL
// ======================================================

const getMediaUrl = (url) => {
  if (!url) {
    return null;
  }

  return String(url);
};

// ======================================================
// USERNAME
// ======================================================

const getUsername = (item) => {
  if (!item) {
    return "User";
  }

  return (
    item?.username ||
    item?.user?.username ||
    item?.author?.username ||
    item?.owner?.username ||
    item?.profile?.username ||
    item?.creator?.username ||
    item?.user_data?.username ||
    item?.profile_data?.username ||
    item?.full_name ||
    item?.user?.full_name ||
    item?.author?.full_name ||
    item?.owner?.full_name ||
    item?.creator?.full_name ||
    "User"
  );
};

// ======================================================
// AVATAR
// ======================================================

const getAvatar = (item) => {
  if (!item) {
    return null;
  }

  return (
    item?.avatar_url ||
    item?.avatar ||
    item?.profile_image ||
    item?.profile_picture ||
    item?.profile_pic ||
    item?.user?.avatar_url ||
    item?.user?.avatar ||
    item?.user?.profile_image ||
    item?.user?.profile_picture ||
    item?.author?.avatar_url ||
    item?.author?.avatar ||
    item?.author?.profile_image ||
    item?.author?.profile_picture ||
    item?.owner?.avatar_url ||
    item?.owner?.avatar ||
    item?.owner?.profile_image ||
    item?.owner?.profile_picture ||
    item?.profile?.avatar_url ||
    item?.profile?.avatar ||
    item?.profile?.profile_image ||
    item?.profile?.profile_picture ||
    item?.creator?.avatar_url ||
    item?.creator?.avatar ||
    item?.creator?.profile_image ||
    item?.creator?.profile_picture ||
    item?.user_data?.avatar_url ||
    item?.profile_data?.avatar_url ||
    null
  );
};

// ======================================================
// REEL ITEM
// ======================================================

function ReelViewerItem({
  item,
  isActive,
}) {
  const [liked, setLiked] = useState(
    Boolean(item?.is_liked)
  );

  const [saved, setSaved] = useState(
    Boolean(item?.is_saved)
  );

  const [paused, setPaused] = useState(false);

  const [
    videoLoading,
    setVideoLoading,
  ] = useState(true);

  const videoUrl = getMediaUrl(
    item?.video_url ||
    item?.video ||
    item?.media_url
  );

  const username = getUsername(item);

  const avatar = getAvatar(item);

  // ====================================================
  // DEBUG
  // ====================================================

  console.log(
    "======================================"
  );

  console.log(
    "🎬 VIEWER REEL ITEM =>",
    item
  );

  console.log(
    "🎬 VIEWER USERNAME =>",
    username
  );

  console.log(
    "🎬 VIEWER AVATAR =>",
    avatar
  );

  console.log(
    "🎬 VIEWER USER ID =>",
    item?.user_id ||
    item?.user?.id ||
    item?.author?.id
  );

  console.log(
    "======================================"
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
  // PLAY / PAUSE
  // ====================================================

  useEffect(() => {
    if (!player) {
      return;
    }

    if (
      isActive &&
      !paused
    ) {
      player.play();
    } else {
      player.pause();
    }
  }, [
    player,
    isActive,
    paused,
  ]);

  // ====================================================
  // RESET PAUSE
  // ====================================================

  useEffect(() => {
    if (isActive) {
      setPaused(false);
    }
  }, [isActive]);

  // ====================================================
  // VIDEO PRESS
  // ====================================================

  const handleVideoPress =
    useCallback(() => {
      setPaused(
        (previous) => !previous
      );
    }, []);

  // ====================================================
  // LIKE
  // ====================================================

  const handleLike =
    useCallback(() => {
      setLiked(
        (previous) => !previous
      );
    }, []);

  // ====================================================
  // SAVE
  // ====================================================

  const handleSave =
    useCallback(() => {
      setSaved(
        (previous) => !previous
      );
    }, []);

  // ====================================================
  // COUNTS
  // ====================================================

  const likes =
    item?.likes_count ?? 0;

  const comments =
    item?.comments_count ?? 0;

  // ====================================================
  // NO VIDEO
  // ====================================================

  if (!videoUrl) {
    return (
      <View style={styles.videoContainer}>
        <View style={styles.videoError}>
          <Ionicons
            name="videocam-off-outline"
            size={42}
            color="#888"
          />

          <Text style={styles.videoErrorText}>
            Video unavailable
          </Text>
        </View>
      </View>
    );
  }

  // ====================================================
  // MAIN
  // ====================================================

  return (
    <View style={styles.videoContainer}>

      {/* VIDEO */}

      <Pressable
        style={styles.videoPressable}
        onPress={handleVideoPress}
      >
        <VideoView
          player={player}
          style={styles.video}
          contentFit="cover"
          nativeControls={false}
          onFirstFrameRender={() => {
            setVideoLoading(false);
          }}
        />

        {videoLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator
              size="large"
              color="#fff"
            />
          </View>
        )}

        {paused && (
          <View style={styles.pauseOverlay}>
            <View style={styles.pauseCircle}>
              <Ionicons
                name="play"
                size={30}
                color="#fff"
              />
            </View>
          </View>
        )}
      </Pressable>

      {/* RIGHT ACTIONS */}

      <View style={styles.rightActions}>

        <Pressable
          style={styles.actionButton}
          onPress={handleLike}
        >
          <Ionicons
            name={
              liked
                ? "heart"
                : "heart-outline"
            }
            size={32}
            color={
              liked
                ? "#ff3040"
                : "#fff"
            }
          />

          <Text style={styles.actionCount}>
            {likes}
          </Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
        >
          <Ionicons
            name="chatbubble-outline"
            size={30}
            color="#fff"
          />

          <Text style={styles.actionCount}>
            {comments}
          </Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
        >
          <Ionicons
            name="paper-plane-outline"
            size={30}
            color="#fff"
          />
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={handleSave}
        >
          <Ionicons
            name={
              saved
                ? "bookmark"
                : "bookmark-outline"
            }
            size={30}
            color="#fff"
          />
        </Pressable>

        <Pressable
          style={styles.actionButton}
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={30}
            color="#fff"
          />
        </Pressable>

      </View>

      {/* BOTTOM */}

      <View style={styles.bottomContent}>

        <View style={styles.userRow}>

          {/* AVATAR */}

          {avatar ? (
            <Image
              source={{
                uri: avatar,
              }}
              style={styles.avatarImage}
              onError={(error) => {
                console.log(
                  "❌ AVATAR LOAD ERROR =>",
                  error.nativeEvent
                );
              }}
            />
          ) : (
            <View style={styles.avatar}>
              <Ionicons
                name="person"
                size={18}
                color="#aaa"
              />
            </View>
          )}

          {/* USERNAME */}

          <Text
            style={styles.username}
            numberOfLines={1}
          >
            {username}
          </Text>

          <Pressable
            style={styles.followButton}
          >
            <Text style={styles.followText}>
              Follow
            </Text>
          </Pressable>

        </View>

        {/* CAPTION */}

        {item?.caption ? (
          <Text
            style={styles.caption}
            numberOfLines={3}
          >
            {item.caption}
          </Text>
        ) : null}

        {/* AUDIO */}

        <View style={styles.audioRow}>
          <Ionicons
            name="musical-notes"
            size={14}
            color="#fff"
          />

          <Text
            style={styles.audioText}
            numberOfLines={1}
          >
            Original audio
          </Text>
        </View>

      </View>
    </View>
  );
}

// ======================================================
// MAIN
// ======================================================

export default function ReelsViewer() {

  const router = useRouter();

  const params = useLocalSearchParams();

  const dispatch = useDispatch();

  const insets = useSafeAreaInsets();

  // ====================================================
  // SOURCE
  // ====================================================

  const source =
    params?.source === "saved"
      ? "saved"
      : params?.source === "home"
        ? "home"
        : "profile";

  // ====================================================
  // REQUESTED REEL
  // ====================================================

  const requestedReelId =
    params?.reelId
      ? String(params.reelId)
      : null;

  // ====================================================
  // REQUESTED USER
  // ====================================================

  const requestedUserId =
    params?.userId
      ? String(params.userId)
      : null;

  // ====================================================
  // INITIAL INDEX
  // ====================================================

  const initialIndex =
    Number(params?.index ?? 0);

  // ====================================================
  // REDUX
  // ====================================================

  const reelsState =
    useSelector(
      (state) =>
        state.reels || {}
    );

  const savedState =
    useSelector(
      (state) =>
        state.saved || {}
    );

  const userReels =
    Array.isArray(
      reelsState.userReels
    )
      ? reelsState.userReels
      : [];

  const homeReels =
    Array.isArray(
      reelsState.homeReels
    )
      ? reelsState.homeReels
      : [];

  const savedReels =
    Array.isArray(
      savedState.savedReels
    )
      ? savedState.savedReels
      : [];

  // ====================================================
  // CURRENT USER
  // ====================================================

  const [
    currentUser,
    setCurrentUser,
  ] = useState(null);

  // ====================================================
  // LOAD CURRENT USER
  // ====================================================

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const user =
          await getUser();

        console.log(
          "======================================"
        );

        console.log(
          "👤 STORAGE USER =>",
          user
        );

        console.log(
          "======================================"
        );

        if (mounted) {
          setCurrentUser(user || null);
        }
      } catch (error) {
        console.log(
          "❌ GET USER ERROR =>",
          error
        );
      }
    };

    loadUser();

    return () => {
      mounted = false;
    };
  }, []);

  // ====================================================
  // LOAD PROFILE REELS
  // ====================================================

  useEffect(() => {

    if (source !== "profile") {
      return;
    }

    if (!requestedUserId) {
      return;
    }

    console.log(
      "🎬 LOADING PROFILE REELS"
    );

    console.log(
      "🎬 USER =>",
      requestedUserId
    );

    dispatch(
      getUserReels({
        userId: requestedUserId,
        limit: 50,
        offset: 0,
      })
    );

  }, [
    source,
    requestedUserId,
    dispatch,
  ]);

  // ====================================================
  // LOAD HOME
  // ====================================================

  useEffect(() => {

    if (source !== "home") {
      return;
    }

    if (homeReels.length > 0) {
      return;
    }

    dispatch(
      getHomeReelsFeed({
        limit: 50,
        offset: 0,
      })
    );

  }, [
    source,
    homeReels.length,
    dispatch,
  ]);

  // ====================================================
  // LOAD SAVED
  // ====================================================

  useEffect(() => {

    if (source !== "saved") {
      return;
    }

    const loadSaved =
      async () => {

        try {

          const user =
            await getUser();

          if (!user?.id) {
            return;
          }

          dispatch(
            getSavedReels({
              userId: user.id,
              limit: 100,
              offset: 0,
            })
          );

        } catch (error) {

          console.log(
            "SAVED REELS ERROR =>",
            error
          );

        }
      };

    loadSaved();

  }, [
    source,
    dispatch,
  ]);

  // ====================================================
  // SELECT ARRAY
  // ====================================================

  const originalViewerReels =
    source === "saved"
      ? savedReels
      : source === "home"
        ? homeReels
        : userReels;

  // ====================================================
  // ENRICH REELS WITH CURRENT USER
  //
  // THIS IS THE IMPORTANT FIX
  // ====================================================

  const viewerReels =
    React.useMemo(() => {

      if (
        !Array.isArray(
          originalViewerReels
        )
      ) {
        return [];
      }

      return originalViewerReels.map(
        (reel) => {

          const reelUserId =
            reel?.user_id ??
            reel?.user?.id ??
            reel?.author?.id ??
            reel?.owner?.id ??
            reel?.creator?.id;

          const currentUserId =
            currentUser?.id;

          const isCurrentUser =
            reelUserId != null &&
            currentUserId != null &&
            String(reelUserId) ===
              String(currentUserId);

          // ------------------------------------------------
          // Already has username/avatar
          // ------------------------------------------------

          const existingUsername =
            getUsername(reel);

          const existingAvatar =
            getAvatar(reel);

          const hasRealUsername =
            existingUsername &&
            existingUsername !== "User";

          // ------------------------------------------------
          // If reel belongs to current user,
          // take profile information from storage.
          // ------------------------------------------------

          if (
            isCurrentUser &&
            (
              !hasRealUsername ||
              !existingAvatar
            )
          ) {

            return {
              ...reel,

              username:
                reel?.username ||
                currentUser?.username ||
                currentUser?.user?.username ||
                currentUser?.full_name ||
                currentUser?.user?.full_name,

              avatar_url:
                reel?.avatar_url ||
                currentUser?.avatar_url ||
                currentUser?.avatar ||
                currentUser?.profile_image ||
                currentUser?.profile_picture,
            };
          }

          return reel;
        }
      );

    }, [
      originalViewerReels,
      currentUser,
    ]);

  // ====================================================
  // DEBUG ENRICHED DATA
  // ====================================================

  useEffect(() => {

    if (
      viewerReels.length === 0
    ) {
      return;
    }

    console.log(
      "======================================"
    );

    console.log(
      "🎬 FINAL VIEWER REELS"
    );

    viewerReels.forEach(
      (reel, index) => {

        console.log(
          `REEL ${index} =>`,
          {
            id:
              reel?.id,

            user_id:
              reel?.user_id,

            username:
              getUsername(reel),

            avatar:
              getAvatar(reel),
          }
        );

      }
    );

    console.log(
      "======================================"
    );

  }, [
    viewerReels,
  ]);

  // ====================================================
  // ACTIVE INDEX
  // ====================================================

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [
    screenHeight,
    setScreenHeight,
  ] = useState(height);

  const flatListRef =
    useRef(null);

  // ====================================================
  // FIND REQUESTED REEL
  // ====================================================

  const findRequestedIndex =
    useCallback(
      (reels) => {

        if (
          requestedReelId
        ) {

          const found =
            reels.findIndex(
              (reel) => {

                const id =
                  reel?.originalId ??
                  reel?.id;

                return (
                  String(id) ===
                  String(
                    requestedReelId
                  )
                );
              }
            );

          if (found >= 0) {
            return found;
          }
        }

        return Math.min(
          Math.max(
            initialIndex,
            0
          ),
          Math.max(
            reels.length - 1,
            0
          )
        );
      },
      [
        requestedReelId,
        initialIndex,
      ]
    );

  // ====================================================
  // POSITION
  // ====================================================

  useEffect(() => {

    if (
      viewerReels.length === 0
    ) {
      return;
    }

    const targetIndex =
      findRequestedIndex(
        viewerReels
      );

    console.log(
      "🎬 TARGET INDEX =>",
      targetIndex
    );

    setActiveIndex(
      targetIndex
    );

    const timer =
      setTimeout(() => {

        try {

          flatListRef.current?.scrollToIndex(
            {
              index:
                targetIndex,

              animated:
                false,
            }
          );

        } catch (error) {

          console.log(
            "SCROLL ERROR =>",
            error
          );

        }

      }, 250);

    return () => {
      clearTimeout(timer);
    };

  }, [
    viewerReels.length,
    requestedReelId,
    findRequestedIndex,
  ]);

  // ====================================================
  // LAYOUT
  // ====================================================

  const handleLayout =
    useCallback(
      (event) => {

        const measuredHeight =
          event.nativeEvent
            .layout.height;

        if (
          measuredHeight > 0
        ) {

          setScreenHeight(
            measuredHeight
          );

        }

      },
      []
    );

  // ====================================================
  // VIEWABILITY
  // ====================================================

  const viewabilityConfig =
    useRef({
      itemVisiblePercentThreshold: 90,
      minimumViewTime: 100,
    }).current;

  const onViewableItemsChanged =
    useRef(
      ({
        viewableItems,
      }) => {

        if (
          !viewableItems ||
          viewableItems.length === 0
        ) {
          return;
        }

        const visible =
          viewableItems
            .filter(
              (item) =>
                item.isViewable &&
                item.index != null
            )
            .sort(
              (a, b) =>
                a.index -
                b.index
            )[0];

        if (visible) {

          setActiveIndex(
            visible.index
          );

        }

      }
    ).current;

  // ====================================================
  // CLOSE
  // ====================================================

  const handleClose =
    useCallback(() => {
      router.back();
    }, [router]);

  // ====================================================
  // LOADING
  // ====================================================

  const isLoading =
    source === "saved"
      ? savedState.reelsLoading
      : source === "home"
        ? reelsState.homeReelsLoading
        : reelsState.userReelsLoading;

  // ====================================================
  // LOADING
  // ====================================================

  if (
    isLoading &&
    viewerReels.length === 0
  ) {

    return (
      <View style={styles.emptyViewer}>

        <StatusBar
          barStyle="light-content"
          backgroundColor="#000"
        />

        <Pressable
          onPress={handleClose}
          style={[
            styles.emptyBack,
            {
              top:
                insets.top + 4,
            },
          ]}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#fff"
          />
        </Pressable>

        <ActivityIndicator
          size="large"
          color="#fff"
        />

        <Text style={styles.emptyViewerText}>
          Loading reels...
        </Text>

      </View>
    );
  }

  // ====================================================
  // EMPTY
  // ====================================================

  if (
    viewerReels.length === 0
  ) {

    return (
      <View style={styles.emptyViewer}>

        <StatusBar
          barStyle="light-content"
          backgroundColor="#000"
        />

        <Pressable
          onPress={handleClose}
          style={[
            styles.emptyBack,
            {
              top:
                insets.top + 4,
            },
          ]}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#fff"
          />
        </Pressable>

        <Ionicons
          name="videocam-outline"
          size={45}
          color="#666"
        />

        <Text style={styles.emptyViewerText}>
          No reels available
        </Text>

      </View>
    );
  }

  // ====================================================
  // RENDER ITEM
  // ====================================================

  const renderItem =
    ({
      item,
      index,
    }) => {

      return (
        <View
          style={{
            width,
            height:
              screenHeight,
            backgroundColor:
              "#000",
          }}
        >

          <ReelViewerItem
            item={item}
            isActive={
              index ===
              activeIndex
            }
          />

        </View>
      );
    };

  // ====================================================
  // ITEM LAYOUT
  // ====================================================

  const getItemLayout =
    (_data, index) => ({
      length:
        screenHeight,

      offset:
        screenHeight *
        index,

      index,
    });

  // ====================================================
  // MAIN
  // ====================================================

  return (
    <View
      style={styles.container}
      onLayout={handleLayout}
    >

      <StatusBar
        barStyle="light-content"
        backgroundColor="#000"
      />

      <FlatList
        ref={flatListRef}
        data={viewerReels}
        renderItem={renderItem}
        keyExtractor={(
          item,
          index
        ) =>
          `viewer-${
            item?.originalId ??
            item?.id ??
            index
          }`
        }
        pagingEnabled
        snapToInterval={
          screenHeight
        }
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews={false}
        getItemLayout={getItemLayout}
        viewabilityConfig={
          viewabilityConfig
        }
        onViewableItemsChanged={
          onViewableItemsChanged
        }
      />

      {/* BACK */}

      <Pressable
        onPress={handleClose}
        style={[
          styles.backButton,
          {
            top:
              insets.top + 4,
          },
        ]}
        hitSlop={10}
      >
        <Ionicons
          name="arrow-back"
          size={28}
          color="#fff"
        />
      </Pressable>

      {/* TITLE */}

      <Text
        style={[
          styles.topTitle,
          {
            top:
              insets.top + 9,
          },
        ]}
        pointerEvents="none"
      >
        Reels
      </Text>

    </View>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: "#000",
    },

    videoContainer: {
      width: "100%",
      height: "100%",
      backgroundColor: "#000",
      position: "relative",
    },

    videoPressable: {
      width: "100%",
      height: "100%",
    },

    video: {
      width: "100%",
      height: "100%",
    },

    loadingOverlay: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },

    pauseOverlay: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },

    pauseCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor:
        "rgba(0,0,0,0.55)",
      justifyContent: "center",
      alignItems: "center",
    },

    rightActions: {
      position: "absolute",
      right: 12,
      bottom: 125,
      alignItems: "center",
      gap: 18,
      zIndex: 10,
    },

    actionButton: {
      alignItems: "center",
      justifyContent: "center",
      minWidth: 45,
      minHeight: 45,
    },

    actionCount: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "600",
      marginTop: 3,
    },

    bottomContent: {
      position: "absolute",
      left: 14,
      right: 70,
      bottom: 18,
      zIndex: 10,
    },

    userRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },

    avatar: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: "#333",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 9,
    },

    avatarImage: {
      width: 38,
      height: 38,
      borderRadius: 19,
      marginRight: 9,
      backgroundColor: "#333",
    },

    username: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "700",
      maxWidth: 150,
    },

    followButton: {
      marginLeft: 12,
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderWidth: 1,
      borderColor: "#fff",
      borderRadius: 5,
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
      marginBottom: 8,
    },

    audioRow: {
      flexDirection: "row",
      alignItems: "center",
      maxWidth: 230,
    },

    audioText: {
      color: "#fff",
      fontSize: 12,
      marginLeft: 5,
    },

    backButton: {
      position: "absolute",
      left: 8,
      width: 44,
      height: 44,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100,
    },

    topTitle: {
      position: "absolute",
      left: 0,
      right: 0,
      textAlign: "center",
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
      zIndex: 90,
    },

    emptyViewer: {
      flex: 1,
      backgroundColor: "#000",
      justifyContent: "center",
      alignItems: "center",
    },

    emptyBack: {
      position: "absolute",
      left: 8,
      width: 44,
      height: 44,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100,
    },

    emptyViewerText: {
      color: "#aaa",
      marginTop: 15,
      fontSize: 14,
    },

    videoError: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    videoErrorText: {
      color: "#aaa",
      marginTop: 10,
      fontSize: 14,
    },

  });