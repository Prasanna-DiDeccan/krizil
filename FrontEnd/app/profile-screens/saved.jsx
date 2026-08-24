import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  router,
} from "expo-router";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getSavedPosts,
  getSavedReels,
} from "../../src/redux/savedSlice";

import {
  getUser,
} from "../../src/utils/storage";

import {
  BASE_URL,
} from "../../src/utils/api";

// ======================================================
// SCREEN
// ======================================================

const {
  width,
} = Dimensions.get("window");

const GRID_GAP = 2;

const ITEM_WIDTH =
  (width - GRID_GAP * 2) / 3;

// ======================================================
// FILTERS
// ======================================================

const FILTERS = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "collections",
    label: "Collections",
  },
  {
    id: "series",
    label: "Series",
  },
  {
    id: "reels",
    label: "Reels",
  },
  {
    id: "posts",
    label: "Posts",
  },
  {
    id: "audio",
    label: "Audio",
  },
];

// ======================================================
// SCREEN
// ======================================================

export default function Saved() {
  const dispatch = useDispatch();

  const [
    userId,
    setUserId,
  ] = useState(null);

  const [
    activeFilter,
    setActiveFilter,
  ] = useState("all");

  // ====================================================
  // REDUX
  // ====================================================

  const {
    savedPosts = [],
    savedReels = [],

    loading,
    loadingSavedReels,

    error,
    savedReelsError,
  } = useSelector(
    (state) => state.saved
  );

  // ====================================================
  // LOAD USER
  // ====================================================

  useEffect(() => {
    const loadUser =
      async () => {
        try {
          const user =
            await getUser();

          console.log(
            "SAVED SCREEN USER =>",
            user
          );

          if (user?.id) {
            setUserId(user.id);
          }
        } catch (error) {
          console.log(
            "GET USER ERROR =>",
            error
          );
        }
      };

    loadUser();
  }, []);

  // ====================================================
  // LOAD SAVED POSTS + REELS
  // ====================================================

  useEffect(() => {
    if (!userId) {
      return;
    }

    console.log(
      "======================================"
    );

    console.log(
      "LOADING SAVED CONTENT"
    );

    console.log(
      "USER ID =>",
      userId
    );

    console.log(
      "======================================"
    );

    // POSTS

    dispatch(
      getSavedPosts({
        userId,
        limit: 100,
        offset: 0,
      })
    );

    // REELS

    dispatch(
      getSavedReels({
        userId,
        limit: 100,
        offset: 0,
      })
    );
  }, [
    userId,
    dispatch,
  ]);

  // ====================================================
  // MEDIA URL
  // ====================================================

  const getMediaUrl = (
    mediaUrl
  ) => {
    if (!mediaUrl) {
      return null;
    }

    if (
      mediaUrl.startsWith("http")
    ) {
      return mediaUrl;
    }

    return `${BASE_URL}${mediaUrl}`;
  };

  // ====================================================
  // NORMALIZE SAVED REELS
  // ====================================================

 const normalizedReels = useMemo(() => {
  return savedReels.map((reel) => ({
    ...reel,

    id: reel.id,

    originalId: reel.id,

    media_type: "video",

    media_url:
      reel.thumbnail_url || null,

    video_url: reel.video_url,

    is_saved: true,
  }));
}, [savedReels]);

  // ====================================================
  // NORMALIZE SAVED POSTS
  // ====================================================

  const normalizedPosts =
    useMemo(() => {
      return savedPosts.map(
        (post) => ({
          ...post,

          originalId:
            post.id,

          media_type:
            post.media_type ||
            "image",
        })
      );
    }, [
      savedPosts,
    ]);

  // ====================================================
  // ALL SAVED CONTENT
  // ====================================================

  const allSaved =
    useMemo(() => {
      return [
        ...normalizedPosts,
        ...normalizedReels,
      ];
    }, [
      normalizedPosts,
      normalizedReels,
    ]);

  // ====================================================
  // FILTER
  // ====================================================

  const filteredPosts =
    useMemo(() => {
      switch (
        activeFilter
      ) {
        case "reels":
          return normalizedReels;

        case "posts":
          return normalizedPosts.filter(
            (post) =>
              post.media_type ===
              "image"
          );

        case "audio":
          return [];

        case "series":
          return [];

        case "collections":
          return [];

        case "all":
        default:
          return allSaved;
      }
    }, [
      activeFilter,
      normalizedReels,
      normalizedPosts,
      allSaved,
    ]);

  // ====================================================
  // FILTER BUTTON
  // ====================================================

  const renderFilter = ({
    item,
  }) => {
    const active =
      activeFilter ===
      item.id;

    return (
      <TouchableOpacity
        style={[
          styles.filterButton,
          active &&
            styles.activeFilterButton,
        ]}
        onPress={() =>
          setActiveFilter(
            item.id
          )
        }
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.filterText,
            active &&
              styles.activeFilterText,
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  // ====================================================
  // OPEN SAVED ITEM
  // ====================================================

const handlePostPress = (post) => {
  if (post?.media_type !== "video") {
    return;
  }

  const reelId =
    post?.originalId ??
    post?.reel_id ??
    post?.id;

  console.log(
    "=========================================="
  );

  console.log(
    "OPEN SAVED REEL"
  );

  console.log(
    "REEL ID =>",
    reelId
  );

  console.log(
    "VIDEO URL =>",
    post?.video_url
  );

  console.log(
    "=========================================="
  );

  router.push({
    pathname: "/profile-screens/reels-viewer",
    params: {
      source: "saved",
      reelId: String(reelId),
    },
  });
};

  // ====================================================
  // REEL THUMBNAIL
  // ====================================================

  const renderReelThumbnail = (
    item
  ) => {
    const thumbnail =
      getMediaUrl(
        item.thumbnail_url
      );

    if (thumbnail) {
      return (
        <Image
          source={{
            uri: thumbnail,
          }}
          style={
            styles.gridImage
          }
          resizeMode="cover"
        />
      );
    }

    // No thumbnail from API
    return (
      <View
        style={
          styles.reelPlaceholder
        }
      >
        <Ionicons
          name="play"
          size={38}
          color="#fff"
        />

        <Text
          style={
            styles.reelText
          }
        >
          Reel
        </Text>
      </View>
    );
  };

  // ====================================================
  // RENDER GRID ITEM
  // ====================================================

  const renderSavedPost = ({
    item,
    index,
  }) => {
    const isReel =
      item.media_type ===
      "video";

    const imageUrl =
      !isReel
        ? getMediaUrl(
            item.media_url
          )
        : null;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          handlePostPress(
            item
          )
        }
        style={[
          styles.gridItem,
          {
            marginRight:
              (index + 1) % 3 === 0
                ? 0
                : GRID_GAP,
          },
        ]}
      >
        {/* =====================================
            REEL
        ===================================== */}

        {isReel ? (
          renderReelThumbnail(
            item
          )
        ) : imageUrl ? (
          <Image
            source={{
              uri: imageUrl,
            }}
            style={
              styles.gridImage
            }
            resizeMode="cover"
          />
        ) : (
          <View
            style={
              styles.imagePlaceholder
            }
          >
            <Ionicons
              name="image-outline"
              size={35}
              color="#777"
            />
          </View>
        )}

        {/* =====================================
            REEL ICON
        ===================================== */}

        {isReel && (
          <View
            style={
              styles.videoIcon
            }
          >
            <Ionicons
              name="play"
              size={14}
              color="#fff"
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // ====================================================
  // HEADER
  // ====================================================

  const ListHeader = () => {
    return (
      <View>

        {/* ==================================
            FILTERS
        ================================== */}

        <FlatList
          data={FILTERS}
          renderItem={
            renderFilter
          }
          keyExtractor={(
            item
          ) =>
            item.id
          }
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.filtersContainer
          }
        />

        {/* ==================================
            COLLECTIONS
        ================================== */}

        {activeFilter ===
          "all" && (
          <View
            style={
              styles.collectionsSection
            }
          >
            <View
              style={
                styles.sectionHeader
              }
            >
              <Text
                style={
                  styles.sectionTitle
                }
              >
                Collections
              </Text>

              <TouchableOpacity>
                <Text
                  style={
                    styles.seeAll
                  }
                >
                  See all
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={
                styles.emptyCollection
              }
            >
              <Ionicons
                name="bookmark-outline"
                size={25}
                color="#777"
              />

              <Text
                style={
                  styles.emptyCollectionText
                }
              >
                No collections yet
              </Text>
            </View>
          </View>
        )}

        {/* ==================================
            CONTENT HEADER
        ================================== */}

        <View
          style={
            styles.postsSectionHeader
          }
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            {activeFilter ===
            "reels"
              ? "Saved reels"
              : activeFilter ===
                "posts"
              ? "Saved posts"
              : "Reels and posts"}
          </Text>

          <TouchableOpacity>
            <Text
              style={
                styles.seeAll
              }
            >
              Manage
            </Text>
          </TouchableOpacity>
        </View>

        {/* ==================================
            ERROR
        ================================== */}

        {(error ||
          savedReelsError) && (
          <View
            style={
              styles.errorContainer
            }
          >
            <Text
              style={
                styles.errorText
              }
            >
              Unable to load some
              saved content.
            </Text>
          </View>
        )}
      </View>
    );
  };

  // ====================================================
  // LOADING
  // ====================================================

  const isInitialLoading =
    (loading ||
      loadingSavedReels) &&
    allSaved.length === 0;

  if (
    isInitialLoading
  ) {
    return (
      <View
        style={
          styles.container
        }
      >
        <View
          style={
            styles.header
          }
        >
          <TouchableOpacity
            onPress={() =>
              router.back()
            }
            style={
              styles.headerButton
            }
          >
            <Ionicons
              name="arrow-back"
              size={30}
              color="#fff"
            />
          </TouchableOpacity>

          <Text
            style={
              styles.headerTitle
            }
          >
            Saved
          </Text>

          <TouchableOpacity
            style={
              styles.headerButton
            }
          >
            <Ionicons
              name="add"
              size={34}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

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
      </View>
    );
  }

  // ====================================================
  // MAIN
  // ====================================================

  return (
    <View
      style={
        styles.container
      }
    >
      {/* ======================================
          HEADER
      ====================================== */}

      <View
        style={
          styles.header
        }
      >
        <TouchableOpacity
          onPress={() =>
            router.back()
          }
          style={
            styles.headerButton
          }
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          }}
        >
          <Ionicons
            name="arrow-back"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>

        <Text
          style={
            styles.headerTitle
          }
        >
          Saved
        </Text>

        <TouchableOpacity
          style={
            styles.headerButton
          }
        >
          <Ionicons
            name="add"
            size={34}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* ======================================
          GRID
      ====================================== */}

      <FlatList
        data={
          filteredPosts
        }
        renderItem={
          renderSavedPost
        }
        keyExtractor={(
          item
        ) =>
          String(item.id)
        }
        numColumns={3}
        showsVerticalScrollIndicator={
          false
        }
        ListHeaderComponent={
          <ListHeader />
        }
        columnWrapperStyle={
          styles.row
        }
        contentContainerStyle={
          styles.listContent
        }
        removeClippedSubviews={
          true
        }
        ListEmptyComponent={
          <View
            style={
              styles.emptyContainer
            }
          >
            <Ionicons
              name="bookmark-outline"
              size={60}
              color="#555"
            />

            <Text
              style={
                styles.emptyTitle
              }
            >
              No saved content
            </Text>

            <Text
              style={
                styles.emptySubtitle
              }
            >
              Posts and reels you
              save will appear
              here.
            </Text>
          </View>
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
      flex: 1,
      backgroundColor:
        "#080913",
    },

    // ==============================================
    // HEADER
    // ==============================================

    header: {
      height: 100,
      paddingTop: 42,
      paddingHorizontal: 15,

      flexDirection:
        "row",

      alignItems:
        "center",

      justifyContent:
        "space-between",

      borderBottomWidth:
        0.5,

      borderBottomColor:
        "#22242C",
    },

    headerButton: {
      width: 45,
      height: 45,

      justifyContent:
        "center",

      alignItems:
        "center",
    },

    headerTitle: {
      color: "#fff",
      fontSize: 23,
      fontWeight: "700",
    },

    // ==============================================
    // FILTERS
    // ==============================================

    filtersContainer: {
      paddingHorizontal: 15,
      paddingTop: 15,
      paddingBottom: 12,

      gap: 10,
    },

    filterButton: {
      height: 42,

      paddingHorizontal: 20,

      borderRadius: 22,

      borderWidth: 1,

      borderColor:
        "#30323A",

      justifyContent:
        "center",

      alignItems:
        "center",
    },

    activeFilterButton: {
      backgroundColor:
        "#292C33",

      borderColor:
        "#292C33",
    },

    filterText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
    },

    activeFilterText: {
      color: "#fff",
    },

    // ==============================================
    // COLLECTIONS
    // ==============================================

    collectionsSection: {
      paddingHorizontal: 15,
      paddingTop: 12,
      paddingBottom: 15,
    },

    sectionHeader: {
      flexDirection:
        "row",

      alignItems:
        "center",

      justifyContent:
        "space-between",

      marginBottom: 15,
    },

    sectionTitle: {
      color: "#fff",
      fontSize: 21,
      fontWeight: "600",
    },

    seeAll: {
      color: "#8FA8FF",
      fontSize: 15,
      fontWeight: "600",
    },

    emptyCollection: {
      height: 100,

      borderRadius: 12,

      backgroundColor:
        "#111319",

      borderWidth: 1,

      borderColor:
        "#22242C",

      justifyContent:
        "center",

      alignItems:
        "center",
    },

    emptyCollectionText: {
      color: "#777",
      fontSize: 14,
      marginTop: 7,
    },

    // ==============================================
    // CONTENT HEADER
    // ==============================================

    postsSectionHeader: {
      paddingHorizontal: 15,
      paddingTop: 8,
      paddingBottom: 15,

      flexDirection:
        "row",

      justifyContent:
        "space-between",

      alignItems:
        "center",
    },

    // ==============================================
    // GRID
    // ==============================================

    listContent: {
      paddingBottom: 30,
    },

    row: {
      gap: GRID_GAP,
    },

    gridItem: {
      width:
        ITEM_WIDTH,

      height:
        ITEM_WIDTH,

      backgroundColor:
        "#15171D",

      marginBottom:
        GRID_GAP,

      position:
        "relative",

      overflow:
        "hidden",
    },

    gridImage: {
      width: "100%",
      height: "100%",
    },

    // ==============================================
    // REEL PLACEHOLDER
    // ==============================================

    reelPlaceholder: {
      flex: 1,

      backgroundColor:
        "#15171D",

      justifyContent:
        "center",

      alignItems:
        "center",
    },

    reelText: {
      color: "#fff",

      fontSize: 12,

      fontWeight:
        "600",

      marginTop: 5,
    },

    // ==============================================
    // IMAGE PLACEHOLDER
    // ==============================================

    imagePlaceholder: {
      flex: 1,

      justifyContent:
        "center",

      alignItems:
        "center",

      backgroundColor:
        "#15171D",
    },

    // ==============================================
    // REEL ICON
    // ==============================================

    videoIcon: {
      position:
        "absolute",

      top: 8,
      right: 8,

      width: 27,
      height: 27,

      borderRadius: 14,

      backgroundColor:
        "rgba(0,0,0,0.65)",

      justifyContent:
        "center",

      alignItems:
        "center",
    },

    // ==============================================
    // LOADING
    // ==============================================

    loadingContainer: {
      flex: 1,

      justifyContent:
        "center",

      alignItems:
        "center",
    },

    // ==============================================
    // EMPTY
    // ==============================================

    emptyContainer: {
      minHeight: 250,

      justifyContent:
        "center",

      alignItems:
        "center",

      paddingHorizontal: 30,
    },

    emptyTitle: {
      color: "#fff",

      fontSize: 19,

      fontWeight:
        "600",

      marginTop: 15,
    },

    emptySubtitle: {
      color: "#777",

      fontSize: 14,

      textAlign:
        "center",

      marginTop: 8,

      lineHeight: 20,
    },

    // ==============================================
    // ERROR
    // ==============================================

    errorContainer: {
      paddingHorizontal: 15,
      paddingBottom: 10,
    },

    errorText: {
      color: "#ff5964",
      fontSize: 14,
    },
  });