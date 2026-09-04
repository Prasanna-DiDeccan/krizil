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
} from "react-native";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import HomeReel from "./HomeReel";

import {
  getHomeReelsFeed,
} from "../../../redux/reelsSlice";

export default function HomeReels({
  onCommentPress,
  onSharePress,
  onMenuPress,
  onReelPress,
}) {

  const dispatch = useDispatch();

  // ====================================================
  // REEL STATE
  // ====================================================

  const {
    homeReels = [],
    homeReelsLoading,
    homeReelsLoadingMore,
    homeReelsHasMore,
    homeReelsError,
  } = useSelector(
    (state) =>
      state.reels || {}
  );

  // ====================================================
  // ACTIVE REEL
  // ====================================================

  const [
    activeReelId,
    setActiveReelId,
  ] = useState(null);

  // ====================================================
  // INITIAL ACTIVE REEL
  // ====================================================

  useEffect(() => {

    if (
      homeReels?.length > 0 &&
      !activeReelId
    ) {
      setActiveReelId(
        homeReels[0].id
      );
    }

  }, [
    homeReels,
    activeReelId,
  ]);

  // ====================================================
  // VIEWABILITY
  // ====================================================

  const viewabilityConfig =
    useRef({
      itemVisiblePercentThreshold: 65,
    }).current;

  const onViewableItemsChanged =
    useRef(
      ({
        viewableItems,
      }) => {

        const visibleItem =
          viewableItems?.find(
            (viewable) =>
              viewable?.isViewable
          );

        if (
          visibleItem?.item?.id
        ) {

          console.log(
            "👀 ACTIVE HOME REEL =>",
            visibleItem.item.id
          );

          setActiveReelId(
            visibleItem.item.id
          );
        }

      }
    ).current;

  // ====================================================
  // LOAD MORE
  // ====================================================

  const handleLoadMore =
    useCallback(() => {

      if (
        homeReelsLoading ||
        homeReelsLoadingMore ||
        !homeReelsHasMore
      ) {
        return;
      }

      console.log(
        "📥 LOAD MORE HOME REELS =>",
        homeReels.length
      );

      dispatch(
        getHomeReelsFeed({
          limit: 10,
          offset:
            homeReels.length,
        })
      );

    }, [
      dispatch,
      homeReels.length,
      homeReelsLoading,
      homeReelsLoadingMore,
      homeReelsHasMore,
    ]);

  // ====================================================
  // LOADING
  // ====================================================

  if (
    homeReelsLoading &&
    homeReels.length === 0
  ) {

    return (
      <View
        style={
          styles.loadingContainer
        }
      >
        <ActivityIndicator
          size="small"
          color="#fff"
        />
      </View>
    );
  }

  // ====================================================
  // ERROR
  // ====================================================

  if (
    !homeReelsLoading &&
    homeReels.length === 0 &&
    homeReelsError
  ) {

    return (
      <View
        style={
          styles.errorContainer
        }
      >
        <Text
          style={styles.errorText}
        >
          {
            typeof homeReelsError ===
            "string"
              ? homeReelsError
              : "Unable to load reels"
          }
        </Text>
      </View>
    );
  }

  // ====================================================
  // EMPTY
  // ====================================================

  if (
    !homeReels ||
    homeReels.length === 0
  ) {
    return null;
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <View
      style={styles.container}
    >

      <FlatList
        data={homeReels}

        keyExtractor={(item) =>
          `home-reel-${item.id}`
        }

        renderItem={({
          item,
        }) => {

          console.log(
            "🎬 HOME REEL API ITEM =>",
            JSON.stringify(
              item,
              null,
              2
            )
          );

          console.log(
            "👤 REEL AUTHOR =>",
            item?.user
          );

          console.log(
            "👤 REEL USERNAME =>",
            item?.user?.username
          );

          console.log(
            "🖼️ REEL AVATAR =>",
            item?.user?.avatar_url
          );

          return (
            <HomeReel
              item={item}

              isActive={
                activeReelId ===
                item.id
              }

              onCommentPress={
                onCommentPress
              }

              onSharePress={
                onSharePress
              }

              onMenuPress={
                onMenuPress
              }

              onReelPress={
                onReelPress
              }
            />
          );
        }}

        viewabilityConfig={
          viewabilityConfig
        }

        onViewableItemsChanged={
          onViewableItemsChanged
        }

        onEndReached={
          handleLoadMore
        }

        onEndReachedThreshold={0.6}

        scrollEnabled={false}

        showsVerticalScrollIndicator={
          false
        }

        removeClippedSubviews={
          false
        }

        ListFooterComponent={
          homeReelsLoadingMore ? (
            <View
              style={
                styles.footerLoader
              }
            >
              <ActivityIndicator
                size="small"
                color="#fff"
              />
            </View>
          ) : null
        }
      />

    </View>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({

    container: {
      width: "100%",
    },

    loadingContainer: {
      minHeight: 80,
      justifyContent: "center",
      alignItems: "center",
    },

    errorContainer: {
      paddingHorizontal: 16,
      paddingVertical: 20,
      alignItems: "center",
    },

    errorText: {
      color: "#888",
      fontSize: 13,
      textAlign: "center",
    },

    footerLoader: {
      paddingVertical: 18,
      alignItems: "center",
    },

  });