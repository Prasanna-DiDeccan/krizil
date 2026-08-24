import React, {
  useCallback,
  useEffect,
} from "react";

import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useRouter,
} from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

import {
  getUserReels,
  deleteReel,
} from "../../redux/reelsSlice";

import {
  getUser,
} from "../../utils/storage";

const {
  width,
} = Dimensions.get("window");

const COLUMN_COUNT = 3;

const GAP = 1;

const ITEM_WIDTH =
  (
    width -
    GAP * (COLUMN_COUNT - 1)
  ) / COLUMN_COUNT;

const ITEM_HEIGHT =
  ITEM_WIDTH * 1.25;


// ======================================================
// URL HELPER
// ======================================================

const getMediaUrl = (url) => {
  if (!url) {
    return null;
  }

  return url;
};


// ======================================================
// COMPONENT
// ======================================================

export default function ReelsGrid() {
  const dispatch = useDispatch();

  const router = useRouter();

  // ==================================================
  // REDUX
  // ==================================================

  const reelsState =
    useSelector(
      (state) =>
        state.reels || {}
    );

  const userReels =
    Array.isArray(
      reelsState.userReels
    )
      ? reelsState.userReels
      : [];

  const userReelsLoading =
    reelsState.userReelsLoading ??
    false;

  const userReelsError =
    reelsState.userReelsError ??
    null;

  const userReelsLoadingMore =
    reelsState.userReelsLoadingMore ??
    false;

  const userReelsHasMore =
    reelsState.userReelsHasMore ??
    false;


  // ==================================================
  // LOAD USER REELS
  // ==================================================

  const loadUserReels =
    useCallback(
      async () => {
        try {
          const user =
            await getUser();

          console.log(
            "👤 PROFILE REELS USER =>",
            user
          );

          const userId =
            user?.id;

          if (!userId) {
            console.log(
              "❌ PROFILE REELS USER ID NOT FOUND"
            );

            return;
          }

          dispatch(
            getUserReels({
              userId,
              limit: 20,
              offset: 0,
            })
          );
        } catch (error) {
          console.log(
            "❌ PROFILE REELS USER ERROR =>",
            error
          );
        }
      },
      [dispatch]
    );


  // ==================================================
  // INITIAL LOAD
  // ==================================================

  useEffect(() => {
    loadUserReels();
  }, [
    loadUserReels,
  ]);


  // ==================================================
  // LOAD MORE
  // ==================================================

  const handleLoadMore =
    useCallback(
      async () => {
        if (
          userReelsLoading ||
          userReelsLoadingMore ||
          !userReelsHasMore
        ) {
          return;
        }

        const currentOffset =
          userReels.length;

        try {
          const user =
            await getUser();

          const userId =
            user?.id;

          if (!userId) {
            return;
          }

          dispatch(
            getUserReels({
              userId,
              limit: 20,
              offset: currentOffset,
            })
          );
        } catch (error) {
          console.log(
            "LOAD MORE REELS ERROR =>",
            error
          );
        }
      },
      [
        dispatch,
        userReels.length,
        userReelsLoading,
        userReelsLoadingMore,
        userReelsHasMore,
      ]
    );


  // ==================================================
  // DELETE REEL
  // ==================================================

  const handleDeleteReel =
    useCallback(
      (reelId) => {
        if (!reelId) {
          return;
        }

        Alert.alert(
          "Delete Reel",
          "Are you sure you want to delete this reel?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },

            {
              text: "Delete",
              style: "destructive",

              onPress: async () => {
                try {
                  await dispatch(
                    deleteReel(reelId)
                  ).unwrap();

                  console.log(
                    "✅ PROFILE REEL DELETED =>",
                    reelId
                  );
                } catch (error) {
                  console.log(
                    "❌ DELETE REEL ERROR =>",
                    error
                  );

                  Alert.alert(
                    "Delete Failed",
                    typeof error === "string"
                      ? error
                      : error?.message ||
                        "Unable to delete reel"
                  );
                }
              },
            },
          ]
        );
      },
      [dispatch]
    );


  // ==================================================
  // OPEN REEL VIEWER
  // ==================================================

  const handleReelPress =
    useCallback(
      async (index) => {
        try {
          const user =
            await getUser();

          const reel =
            userReels[index];

          if (!reel) {
            console.log(
              "❌ REEL NOT FOUND AT INDEX =>",
              index
            );

            return;
          }

          const userId =
            user?.id ||
            reel?.user_id ||
            reel?.user?.id ||
            reel?.author?.id;

          console.log(
            "================================"
          );

          console.log(
            "🎬 OPEN PROFILE REEL"
          );

          console.log(
            "GRID INDEX =>",
            index
          );

          console.log(
            "REEL ID =>",
            reel?.id
          );

          console.log(
            "USER ID =>",
            userId
          );

          console.log(
            "================================"
          );

          if (!userId) {
            console.log(
              "❌ USER ID NOT FOUND"
            );

            return;
          }

          router.push({
            pathname:
              "/profile-screens/reels-viewer",

            params: {
              index: String(index),

              reelId:
                String(reel.id),

              userId:
                String(userId),

              source:
                "profile",
            },
          });
        } catch (error) {
          console.log(
            "❌ OPEN PROFILE REEL ERROR =>",
            error
          );
        }
      },
      [
        router,
        userReels,
      ]
    );


  // ==================================================
  // LOADING
  // ==================================================

  if (
    userReelsLoading &&
    userReels.length === 0
  ) {
    return (
      <View
        style={
          styles.loader
        }
      >
        <ActivityIndicator
          size="small"
          color="#fff"
        />
      </View>
    );
  }


  // ==================================================
  // ERROR
  // ==================================================

  if (
    userReelsError &&
    userReels.length === 0
  ) {
    return (
      <View
        style={
          styles.empty
        }
      >
        <Ionicons
          name="alert-circle-outline"
          size={42}
          color="#888"
        />

        <Text
          style={
            styles.errorText
          }
        >
          Failed to load reels
        </Text>

        <TouchableOpacity
          onPress={
            loadUserReels
          }
          style={
            styles.retryButton
          }
        >
          <Text
            style={
              styles.retryText
            }
          >
            Try Again
          </Text>
        </TouchableOpacity>
      </View>
    );
  }


  // ==================================================
  // EMPTY
  // ==================================================

  if (
    userReels.length === 0
  ) {
    return (
      <View
        style={
          styles.empty
        }
      >
        <Text
          style={
            styles.emptyTitle
          }
        >
          No Reels Yet
        </Text>

        <Text
          style={
            styles.emptySubtitle
          }
        >
          Reels shared by this
          user will appear here.
        </Text>
      </View>
    );
  }


  // ==================================================
  // RENDER REEL
  // ==================================================

  const renderItem = ({
    item,
    index,
  }) => {
    const thumbnail =
      getMediaUrl(
        item?.thumbnail_url
      );

    const views =
      item?.views_count ??
      item?.view_count ??
      item?.views ??
      null;

    return (
      <TouchableOpacity
        activeOpacity={0.95}
        style={
          styles.reelItem
        }
        onPress={() =>
          handleReelPress(
            index
          )
        }
      >

        {/* THUMBNAIL */}

        {thumbnail ? (
          <Image
            source={{
              uri: thumbnail,
            }}
            style={
              styles.thumbnail
            }
            resizeMode="cover"
          />
        ) : (
          <View
            style={
              styles.thumbnailPlaceholder
            }
          />
        )}


        {/* VIEW COUNT */}

        {views !== null ? (
          <View
            style={
              styles.viewsContainer
            }
            pointerEvents="none"
          >
            <Text
              style={
                styles.viewsText
              }
            >
              {views}
            </Text>
          </View>
        ) : null}


        {/* THREE DOT */}

        <TouchableOpacity
          style={
            styles.deleteButton
          }
          activeOpacity={0.7}
          onPress={(event) => {
            event?.stopPropagation?.();

            handleDeleteReel(
              item?.id
            );
          }}
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={20}
            color="#fff"
          />
        </TouchableOpacity>

      </TouchableOpacity>
    );
  };


  // ==================================================
  // FOOTER
  // ==================================================

  const renderFooter = () => {
    if (
      !userReelsLoadingMore
    ) {
      return null;
    }

    return (
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
    );
  };


  // ==================================================
  // GRID
  // ==================================================

  return (
    <View
      style={
        styles.container
      }
    >
      <FlatList
        data={
          userReels
        }

        keyExtractor={(
          item,
          index
        ) =>
          `profile-reel-${
            item?.id ?? index
          }`
        }

        renderItem={
          renderItem
        }

        numColumns={
          COLUMN_COUNT
        }

        scrollEnabled={false}

        onEndReached={
          handleLoadMore
        }

        onEndReachedThreshold={
          0.5
        }

        ListFooterComponent={
          renderFooter
        }

        showsVerticalScrollIndicator={
          false
        }

        columnWrapperStyle={
          styles.columnWrapper
        }

        contentContainerStyle={
          styles.gridContent
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
      backgroundColor: "#000",
    },

    gridContent: {
      width: "100%",
      padding: 0,
    },

    columnWrapper: {
      gap: GAP,
    },

    reelItem: {
      width:
        ITEM_WIDTH,

      height:
        ITEM_HEIGHT,

      backgroundColor:
        "#151515",

      position:
        "relative",

      overflow:
        "hidden",
    },

    thumbnail: {
      width: "100%",
      height: "100%",
    },

    thumbnailPlaceholder: {
      width: "100%",
      height: "100%",
      backgroundColor:
        "#181818",
    },

    viewsContainer: {
      position: "absolute",
      left: 8,
      bottom: 7,

      paddingHorizontal: 4,

      flexDirection:
        "row",

      alignItems:
        "center",
    },

    viewsText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "600",

      textShadowColor:
        "rgba(0,0,0,0.7)",

      textShadowOffset: {
        width: 0,
        height: 1,
      },

      textShadowRadius: 2,
    },

    deleteButton: {
      position: "absolute",

      top: 6,
      right: 6,

      width: 32,
      height: 32,

      borderRadius: 16,

      backgroundColor:
        "rgba(0,0,0,0.55)",

      justifyContent:
        "center",

      alignItems:
        "center",

      zIndex: 20,

      elevation: 5,
    },

    loader: {
      height: 180,

      justifyContent:
        "center",

      alignItems:
        "center",

      backgroundColor:
        "#000",
    },

    empty: {
      minHeight: 250,

      justifyContent:
        "center",

      alignItems:
        "center",

      paddingHorizontal: 30,

      backgroundColor:
        "#000",
    },

    emptyTitle: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "700",
    },

    emptySubtitle: {
      color: "#777",
      fontSize: 13,
      textAlign: "center",
      marginTop: 6,
    },

    errorText: {
      color: "#ff5c5c",
      fontSize: 14,
      marginTop: 10,
    },

    retryButton: {
      marginTop: 12,

      paddingHorizontal: 20,
      paddingVertical: 9,

      borderRadius: 20,

      backgroundColor: "#fff",
    },

    retryText: {
      color: "#000",
      fontSize: 13,
      fontWeight: "600",
    },

    footerLoader: {
      width: "100%",
      paddingVertical: 20,

      justifyContent:
        "center",

      alignItems:
        "center",
    },
  });