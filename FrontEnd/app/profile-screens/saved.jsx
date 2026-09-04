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

import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getSavedItems,
} from "../../src/redux/savedSlice";

import {
  BASE_URL,
} from "../../src/utils/api";

import ScreenLayout from "../../src/components/ScreenLayout";

const { width } = Dimensions.get("window");

const GRID_GAP = 2;

const ITEM_WIDTH =
  (width - GRID_GAP * 2) / 3;

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

export default function Saved() {
  const dispatch = useDispatch();

  const [activeFilter, setActiveFilter] =
    useState("all");

  const {
    savedItems = [],
    savedPosts = [],
    savedReels = [],
    loading = false,
    error = null,
  } = useSelector(
    (state) => state.saved || {}
  );

  useEffect(() => {
    console.log(
      "======================================"
    );

    console.log(
      "LOADING SAVED ITEMS"
    );

    console.log(
      "GET => /api/saved"
    );

    console.log(
      "======================================"
    );

    dispatch(
      getSavedItems({
        limit: 100,
        offset: 0,
      })
    );
  }, [dispatch]);

  const getMediaUrl = (mediaUrl) => {
    if (!mediaUrl) return null;

    if (mediaUrl.startsWith("http")) {
      return mediaUrl;
    }

    return `${BASE_URL}${mediaUrl}`;
  };

  const normalizedPosts = useMemo(() => {
    return savedPosts.map((post) => ({
      ...post,

      id: post.id,

      originalId: post.id,

      media_type:
        post.media_type || "image",

      media_url:
        post.media_url || null,

      is_saved: true,
    }));
  }, [savedPosts]);

  const normalizedReels = useMemo(() => {
    return savedReels.map((reel) => ({
      ...reel,

      id: reel.id,

      originalId: reel.id,

      media_type: "video",

      thumbnail_url:
        reel.thumbnail_url || null,

      video_url:
        reel.video_url || null,

      is_saved: true,
    }));
  }, [savedReels]);

  const allSaved = useMemo(() => {
    return [
      ...normalizedPosts,
      ...normalizedReels,
    ];
  }, [
    normalizedPosts,
    normalizedReels,
  ]);

  const filteredItems = useMemo(() => {
    switch (activeFilter) {
      case "reels":
        return normalizedReels;

      case "posts":
        return normalizedPosts.filter(
          (post) =>
            post.media_type !== "video"
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
    normalizedPosts,
    normalizedReels,
    allSaved,
  ]);

  const renderFilter = ({ item }) => {
    const active =
      activeFilter === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.filterButton,
          active &&
            styles.activeFilterButton,
        ]}
        onPress={() =>
          setActiveFilter(item.id)
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

  const handleItemPress = (item) => {
    if (!item) return;

    // =========================
    // OPEN SAVED REEL
    // =========================
    if (item.media_type === "video") {
      const reelId =
        item.originalId ?? item.id;

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
        item.video_url
      );

      console.log(
        "=========================================="
      );

      if (!reelId) return;

      router.push({
        pathname:
          "/profile-screens/reels-viewer",

        params: {
          source: "saved",

          reelId: String(reelId),
        },
      });

      return;
    }

    // =========================
    // OPEN SAVED POST
    // =========================

    const postId =
      item.originalId ?? item.id;

    console.log(
      "=========================================="
    );

    console.log(
      "OPEN SAVED POST"
    );

    console.log(
      "POST ID =>",
      postId
    );

    console.log(
      "USER ID =>",
      item?.user_id
    );

    console.log(
      "=========================================="
    );

    if (!postId) return;

    const params = {
      postId: String(postId),
    };

    // Pass the post owner's userId so
    // PostsViewer loads the correct user's posts.
    if (item?.user_id) {
      params.userId = String(
        item.user_id
      );
    }

    router.push({
      pathname:
        "/profile-screens/posts-viewer",

      params,
    });
  };

  const renderReelThumbnail = (item) => {
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
          style={styles.gridImage}
          resizeMode="cover"
        />
      );
    }

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
          style={styles.reelText}
        >
          Reel
        </Text>
      </View>
    );
  };

  const renderSavedItem = ({
    item,
    index,
  }) => {
    const isReel =
      item.media_type === "video";

    const imageUrl = !isReel
      ? getMediaUrl(
          item.media_url
        )
      : null;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          handleItemPress(item)
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
        {isReel ? (
          renderReelThumbnail(item)
        ) : imageUrl ? (
          <Image
            source={{
              uri: imageUrl,
            }}
            style={styles.gridImage}
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

        {isReel && (
          <View
            style={styles.videoIcon}
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

  const ListHeader = () => {
    return (
      <View>
        <FlatList
          data={FILTERS}
          renderItem={renderFilter}
          keyExtractor={(item) =>
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

        {activeFilter === "all" && (
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
            {activeFilter === "reels"
              ? "Saved reels"
              : activeFilter === "posts"
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

        {error && (
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
              Unable to load saved
              content.
            </Text>
          </View>
        )}
      </View>
    );
  };

  // =========================
  // LOADING
  // =========================

  if (
    loading &&
    allSaved.length === 0
  ) {
    return (
      <ScreenLayout
        backgroundColor="#080913"
        keyboardAvoid={false}
        header={
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.headerButton}
            hitSlop={10}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={30}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Saved
          </Text>

          <TouchableOpacity
            style={styles.headerButton}
            activeOpacity={0.7}
          >
            <Ionicons
              name="add"
              size={34}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      }
    >
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#fff"
        />
      </View>
        {/* <View
          style={styles.container}
        >
          <View
            style={styles.header}
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
        </View> */}
      </ScreenLayout>
    );
  }

  // =========================
  // MAIN SCREEN
  // =========================

  return (
    <ScreenLayout
      backgroundColor="#080913"
      keyboardAvoid={false}
      header={
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerButton}
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          }}
          activeOpacity={0.7}
        >
          <Ionicons
            name="arrow-back"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Saved
        </Text>

        <TouchableOpacity
          style={styles.headerButton}
          activeOpacity={0.7}
        >
          <Ionicons
            name="add"
            size={34}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    }
    >
      {/* <View
        style={styles.container}
      > */}
        {/* <View
          style={styles.header}
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
        </View> */}

       <FlatList
      data={filteredItems}
      renderItem={renderSavedItem}
      keyExtractor={(item, index) =>
        `${item.media_type}-${item.id}-${index}`
      }
      numColumns={3}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<ListHeader />}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.listContent}
      removeClippedSubviews={true}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Ionicons
            name="bookmark-outline"
            size={60}
            color="#555"
          />

          <Text style={styles.emptyTitle}>
            No saved content
          </Text>

          <Text style={styles.emptySubtitle}>
            Posts and reels you save will appear here.
          </Text>
        </View>
      }
    />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#080913",
  // },

  header: {
    height: 60,
    // paddingTop: 42,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor:
      "#22242C",
  },

  headerButton: {
    width: 45,
    height: 45,
    justifyContent:
      "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "700",
  },

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
    borderColor: "#30323A",
    justifyContent:
      "center",
    alignItems: "center",
  },

  activeFilterButton: {
    backgroundColor: "#292C33",
    borderColor: "#292C33",
  },

  filterText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  activeFilterText: {
    color: "#fff",
  },

  collectionsSection: {
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 15,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
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
    backgroundColor: "#111319",
    borderWidth: 1,
    borderColor: "#22242C",
    justifyContent:
      "center",
    alignItems: "center",
  },

  emptyCollectionText: {
    color: "#777",
    fontSize: 14,
    marginTop: 7,
  },

  postsSectionHeader: {
    paddingHorizontal: 15,
    paddingTop: 8,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  listContent: {
    paddingBottom: 100,
  },

  row: {
    gap: GRID_GAP,
  },

  gridItem: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    backgroundColor: "#15171D",
    marginBottom: GRID_GAP,
    position: "relative",
    overflow: "hidden",
  },

  gridImage: {
    width: "100%",
    height: "100%",
  },

  reelPlaceholder: {
    flex: 1,
    backgroundColor: "#15171D",
    justifyContent:
      "center",
    alignItems: "center",
  },

  reelText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
  },

  imagePlaceholder: {
    flex: 1,
    justifyContent:
      "center",
    alignItems: "center",
    backgroundColor: "#15171D",
  },

  videoIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor:
      "rgba(0,0,0,0.65)",
    justifyContent:
      "center",
    alignItems: "center",
  },

  loadingContainer: {
    flex: 1,
    justifyContent:
      "center",
    alignItems: "center",
  },

  emptyContainer: {
    minHeight: 250,
    justifyContent:
      "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyTitle: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "600",
    marginTop: 15,
  },

  emptySubtitle: {
    color: "#777",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },

  errorContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },

  errorText: {
    color: "#ff5964",
    fontSize: 14,
  },
});