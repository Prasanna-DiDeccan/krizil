import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from "react-native";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getReelsFeed,
  startReelsRefresh,
} from "../../src/redux/reelsSlice";

import {
  startWatch,
  endWatch,
} from "../../src/redux/watchSlice";

import ReelItem from "../../src/components/reels/ReelItem";

import { useIsFocused } from "@react-navigation/native";

const { height: SCREEN_HEIGHT } =
  Dimensions.get("window");

// ======================================================
// REELS SCREEN
// ======================================================

const ReelsScreen = () => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  // ======================================================
  // REDUX
  // ======================================================

  const {
    reels,
    loading,
    loadingMore,
    refreshing,
    hasMore,
    error,
  } = useSelector(
    (state) => state.reels
  );

  // ======================================================
  // REEL HEIGHT
  // ======================================================

  const [reelHeight, setReelHeight] =
    useState(SCREEN_HEIGHT);

  // ======================================================
  // ACTIVE REEL
  // ======================================================

  const [activeReelId, setActiveReelId] =
    useState(null);

  // ======================================================
  // FLATLIST REF
  // ======================================================

  const flatListRef = useRef(null);

  // ======================================================
  // WATCH SESSION
  // ======================================================

  const watchSessionRef =
    useRef(null);

  const watchReelIdRef =
    useRef(null);

  // ======================================================
  // WATCH REQUEST VERSION
  //
  // Every new active reel increments this.
  //
  // If an old API request returns later,
  // we know it is no longer valid.
  // ======================================================

  const watchRequestRef =
    useRef(0);

  // ======================================================
  // END REQUEST LOCK
  // ======================================================

  const endingSessionRef =
    useRef(false);

  // ======================================================
  // ACTIVE REEL REF
  //
  // Avoid stale state inside async functions.
  // ======================================================

  const activeReelIdRef =
    useRef(null);

  useEffect(() => {
    activeReelIdRef.current =
      activeReelId;
  }, [activeReelId]);

  // ======================================================
  // FOCUSED REF
  // ======================================================

  const focusedRef =
    useRef(isFocused);

  useEffect(() => {
    focusedRef.current =
      isFocused;
  }, [isFocused]);

  // ======================================================
  // END CURRENT WATCH SESSION
  // ======================================================

  const finishCurrentWatch =
    useCallback(async () => {
      const sessionId =
        watchSessionRef.current;

      const reelId =
        watchReelIdRef.current;

      if (!sessionId) {
        return;
      }

      if (endingSessionRef.current) {
        return;
      }

      // Clear immediately.
      //
      // This prevents duplicate END requests.
      watchSessionRef.current = null;
      watchReelIdRef.current = null;

      endingSessionRef.current = true;

      console.log(
        "===================================="
      );

      console.log(
        "⏹️ FINISH CURRENT WATCH"
      );

      console.log(
        "SESSION ID =>",
        sessionId
      );

      console.log(
        "REEL ID =>",
        reelId
      );

      try {
        const result =
          await dispatch(
            endWatch({
              sessionId,
            })
          ).unwrap();

        console.log(
          "✅ WATCH END SUCCESS"
        );

        console.log(
          "END RESPONSE =>",
          result
        );
      } catch (error) {
        const status =
          error?.status ??
          error?.response?.status;

        const serverError =
          error?.data ??
          error?.response?.data;

        console.log(
          "❌ WATCH END ERROR"
        );

        console.log(
          "MESSAGE =>",
          error?.message
        );

        console.log(
          "STATUS =>",
          status
        );

        console.log(
          "SERVER ERROR =>",
          serverError
        );

        // 409 means backend already ended it.
        //
        // Since our local refs are already cleared,
        // we don't retry.
        if (status === 409) {
          console.log(
            "⚠️ SESSION ALREADY ENDED ON SERVER"
          );
        }
      } finally {
        endingSessionRef.current =
          false;
      }
    }, [dispatch]);

  // ======================================================
  // START WATCH SESSION
  // ======================================================

  const startWatchForReel =
    useCallback(
      async (reelId) => {
        if (!reelId) {
          return;
        }

        if (!focusedRef.current) {
          return;
        }

        const requestId =
          ++watchRequestRef.current;

        console.log(
          "===================================="
        );

        console.log(
          "▶️ BEGIN WATCH"
        );

        console.log(
          "REEL ID =>",
          reelId
        );

        try {
          const result =
            await dispatch(
              startWatch({
                reelId,
              })
            ).unwrap();

          const sessionId =
            result?.session_id;

          console.log(
            "✅ WATCH START SUCCESS"
          );

          console.log(
            "SESSION ID =>",
            sessionId
          );

          console.log(
            "REEL ID =>",
            result?.reel_id
          );

          // ==================================================
          // CHECK IF REQUEST IS STILL VALID
          // ==================================================

          const stillValid =
            requestId ===
              watchRequestRef.current &&
            focusedRef.current &&
            activeReelIdRef.current ===
              reelId;

          if (!stillValid) {
            console.log(
              "⚠️ OLD WATCH START RESPONSE"
            );

            console.log(
              "ENDING UNUSED SESSION =>",
              sessionId
            );

            if (sessionId) {
              try {
                await dispatch(
                  endWatch({
                    sessionId,
                  })
                ).unwrap();

                console.log(
                  "✅ UNUSED SESSION CLOSED"
                );
              } catch (error) {
                const status =
                  error?.status ??
                  error?.response?.status;

                console.log(
                  "⚠️ UNUSED SESSION END FAILED"
                );

                console.log(
                  "STATUS =>",
                  status
                );

                // 409 is harmless here.
                if (status === 409) {
                  console.log(
                    "⚠️ UNUSED SESSION ALREADY ENDED"
                  );
                }
              }
            }

            return;
          }

          // ==================================================
          // STORE CURRENT SESSION
          // ==================================================

          watchSessionRef.current =
            sessionId;

          watchReelIdRef.current =
            reelId;

          console.log(
            "💾 WATCH SESSION STORED"
          );

          console.log(
            "SESSION =>",
            sessionId
          );

          console.log(
            "REEL =>",
            reelId
          );
        } catch (error) {
          console.log(
            "❌ START WATCH FAILED"
          );

          console.log(
            "START ERROR =>",
            error
          );
        }
      },
      [dispatch]
    );

  // ======================================================
  // LOAD REELS
  // ======================================================

  useEffect(() => {
    dispatch(
      getReelsFeed({
        limit: 10,
        offset: 0,
      })
    );
  }, [dispatch]);

  // ======================================================
  // SET FIRST REEL
  // ======================================================

  useEffect(() => {
    if (
      isFocused &&
      reels.length > 0 &&
      activeReelId === null
    ) {
      const firstReel =
        reels[0];

      console.log(
        "▶️ SET FIRST ACTIVE REEL =>",
        firstReel.id
      );

      setActiveReelId(
        firstReel.id
      );
    }
  }, [
    reels,
    isFocused,
    activeReelId,
  ]);

  // ======================================================
  // WATCH SESSION LIFECYCLE
  //
  // When reel changes:
  //
  // END old session
  // ↓
  // START new session
  //
  // When screen leaves:
  //
  // END current session
  // ======================================================

  useEffect(() => {
    if (!isFocused) {
      console.log(
        "🛑 REELS SCREEN NOT FOCUSED"
      );

      // Invalidate pending start request.
      watchRequestRef.current += 1;

      finishCurrentWatch();

      return;
    }

    if (!activeReelId) {
      return;
    }

    let cancelled = false;

    const switchWatch =
      async () => {
        console.log(
          "🔄 SWITCHING WATCH SESSION"
        );

        // End old session first.
        await finishCurrentWatch();

        if (cancelled) {
          return;
        }

        if (!focusedRef.current) {
          return;
        }

        if (
          activeReelIdRef.current !==
          activeReelId
        ) {
          return;
        }

        await startWatchForReel(
          activeReelId
        );
      };

    switchWatch();

    return () => {
      cancelled = true;
    };
  }, [
    activeReelId,
    isFocused,
    finishCurrentWatch,
    startWatchForReel,
  ]);

  // ======================================================
  // SCREEN FOCUS
  // ======================================================

  useEffect(() => {
    console.log(
      "📱 REELS SCREEN FOCUS =>",
      isFocused
    );

    focusedRef.current =
      isFocused;

    if (!isFocused) {
      console.log(
        "🛑 LEFT REELS SCREEN"
      );

      // Invalidate pending START.
      watchRequestRef.current += 1;

      // End current watch.
      finishCurrentWatch();

      // Remove active reel.
      setActiveReelId(null);
    }
  }, [
    isFocused,
    finishCurrentWatch,
  ]);

  // ======================================================
  // CONTAINER LAYOUT
  // ======================================================

  const handleContainerLayout =
    useCallback((event) => {
      const height =
        event.nativeEvent.layout.height;

      if (height > 0) {
        console.log(
          "📱 REELS HEIGHT =>",
          height
        );

        setReelHeight(height);
      }
    }, []);

  // ======================================================
  // VIEWABILITY
  // ======================================================

  const onViewableItemsChanged =
    useRef(
      ({ viewableItems }) => {
        if (!focusedRef.current) {
          return;
        }

        if (
          !viewableItems ||
          viewableItems.length === 0
        ) {
          return;
        }

        // Find the reel that is most visible.
        const currentItem =
          viewableItems.find(
            (item) =>
              item.isViewable
          )?.item;

        if (!currentItem) {
          return;
        }

        const newId =
          currentItem.id;

        // Don't update state if same reel.
        if (
          activeReelIdRef.current ===
          newId
        ) {
          return;
        }

        console.log(
          "🎬 ACTIVE REEL =>",
          newId
        );

        activeReelIdRef.current =
          newId;

        setActiveReelId(
          newId
        );
      }
    ).current;

  // ======================================================
  // VIEWABILITY CONFIG
  // ======================================================

  const viewabilityConfig =
    useRef({
      itemVisiblePercentThreshold: 80,
      minimumViewTime: 80,
    }).current;

  // ======================================================
  // LOAD MORE
  // ======================================================

  const handleLoadMore =
    useCallback(() => {
      if (!focusedRef.current) {
        return;
      }

      if (loading) {
        return;
      }

      if (loadingMore) {
        return;
      }

      if (!hasMore) {
        return;
      }

      console.log(
        "🎬 LOAD MORE REELS"
      );

      dispatch(
        getReelsFeed({
          limit: 10,
          offset: reels.length,
        })
      );
    }, [
      dispatch,
      reels.length,
      loading,
      loadingMore,
      hasMore,
    ]);

  // ======================================================
  // REFRESH
  // ======================================================

  const handleRefresh =
    useCallback(() => {
      if (!focusedRef.current) {
        return;
      }

      console.log(
        "🔄 REFRESHING REELS"
      );

      // Invalidate old watch starts.
      watchRequestRef.current += 1;

      // End current session.
      finishCurrentWatch();

      // Reset active reel.
      activeReelIdRef.current =
        null;

      setActiveReelId(null);

      dispatch(
        startReelsRefresh()
      );

      dispatch(
        getReelsFeed({
          limit: 10,
          offset: 0,
        })
      );
    }, [
      dispatch,
      finishCurrentWatch,
    ]);

  // ======================================================
  // RENDER REEL
  // ======================================================

  const renderReel =
    useCallback(
      ({ item }) => {
        return (
          <ReelItem
            reel={item}
            isActive={
              isFocused &&
              item.id ===
                activeReelId
            }
            reelHeight={
              reelHeight
            }
          />
        );
      },
      [
        isFocused,
        activeReelId,
        reelHeight,
      ]
    );

  // ======================================================
  // FOOTER
  // ======================================================

  const renderFooter =
    useCallback(() => {
      if (!loadingMore) {
        return null;
      }

      return (
        <View
          style={[
            styles.footer,
            {
              height:
                reelHeight,
            },
          ]}
        >
          <ActivityIndicator
            size="small"
            color="#fff"
          />

          <Text
            style={
              styles.loadingText
            }
          >
            Loading more reels...
          </Text>
        </View>
      );
    }, [
      loadingMore,
      reelHeight,
    ]);

  // ======================================================
  // INITIAL LOADING
  // ======================================================

  if (
    loading &&
    reels.length === 0
  ) {
    return (
      <View
        style={styles.center}
      >
        <ActivityIndicator
          size="large"
          color="#fff"
        />

        <Text
          style={
            styles.loadingText
          }
        >
          Loading reels...
        </Text>
      </View>
    );
  }

  // ======================================================
  // ERROR
  // ======================================================

  if (
    error &&
    reels.length === 0
  ) {
    return (
      <View
        style={styles.center}
      >
        <Text
          style={styles.error}
        >
          Failed to load reels
        </Text>

        <Text
          style={
            styles.errorDetails
          }
        >
          {JSON.stringify(error)}
        </Text>
      </View>
    );
  }

  // ======================================================
  // EMPTY
  // ======================================================

  if (
    !loading &&
    reels.length === 0
  ) {
    return (
      <View
        style={styles.center}
      >
        <Text
          style={styles.empty}
        >
          No reels available
        </Text>
      </View>
    );
  }

  // ======================================================
  // MAIN
  // ======================================================

  return (
    <View
      style={styles.container}
      onLayout={
        handleContainerLayout
      }
    >
      {reelHeight > 0 && (
        <FlatList
          ref={flatListRef}

          data={reels}

          keyExtractor={(item) =>
            String(item.id)
          }

          renderItem={
            renderReel
          }

          // ==================================================
          // IMPORTANT
          // ==================================================

          pagingEnabled={true}

          showsVerticalScrollIndicator={
            false
          }

          // Smooth iOS / Android scrolling
          decelerationRate="fast"

          // Prevent multiple reels
          // from being skipped too easily.
          disableIntervalMomentum={
            true
          }

          // No bounce like normal feed.
          bounces={false}

          overScrollMode="never"

          // ==================================================
          // VIEWABILITY
          // ==================================================

          onViewableItemsChanged={
            onViewableItemsChanged
          }

          viewabilityConfig={
            viewabilityConfig
          }

          // ==================================================
          // PERFORMANCE
          // ==================================================

          removeClippedSubviews={
            false
          }

          windowSize={3}

          initialNumToRender={2}

          maxToRenderPerBatch={2}

          updateCellsBatchingPeriod={
            50
          }

          // ==================================================
          // LOAD MORE
          // ==================================================

          onEndReached={
            handleLoadMore
          }

          onEndReachedThreshold={
            0.7
          }

          ListFooterComponent={
            renderFooter
          }

          // ==================================================
          // REFRESH
          // ==================================================

          refreshControl={
            <RefreshControl
              refreshing={
                refreshing
              }
              onRefresh={
                handleRefresh
              }
              tintColor="#fff"
              colors={["#fff"]}
            />
          }

          // ==================================================
          // FIXED HEIGHT
          // ==================================================

          getItemLayout={(
            data,
            index
          ) => ({
            length:
              reelHeight,
            offset:
              reelHeight *
              index,
            index,
          })}

          // ==================================================
          // EXTRA DATA
          // ==================================================

          extraData={{
            activeReelId,
            isFocused,
          }}

          // ==================================================
          // CONTENT
          // ==================================================

          contentContainerStyle={{
            paddingBottom: 0,
          }}

          // ==================================================
          // KEY SCROLL SETTINGS
          // ==================================================

          scrollEventThrottle={16}

          directionalLockEnabled={
            true
          }

          alwaysBounceVertical={
            false
          }
        />
      )}
    </View>
  );
};

export default ReelsScreen;

// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
    },

    center: {
      flex: 1,
      backgroundColor: "#000",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },

    loadingText: {
      color: "#fff",
      marginTop: 10,
      fontSize: 14,
    },

    error: {
      color: "#ff4444",
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 10,
      textAlign: "center",
    },

    errorDetails: {
      color: "#fff",
      textAlign: "center",
      fontSize: 12,
    },

    empty: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600",
    },

    footer: {
      backgroundColor: "#000",
      justifyContent: "center",
      alignItems: "center",
    },
  });