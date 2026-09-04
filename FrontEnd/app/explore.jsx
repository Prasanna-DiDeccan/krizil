import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { useRouter } from "expo-router";

import { getExploreFeed } from "../src/redux/postSlice";
import { BASE_URL } from "../src/utils/api";
import ScreenLayout from "../src/components/ScreenLayout";

const screenWidth =
  Dimensions.get("window").width;

const ITEM_WIDTH =
  screenWidth / 3;

const categories = [
  "For You",
  "Travel",
  "Photography",
  "Nature",
  "Food",
  "Fashion",
  "Art",
];

export default function Explore() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    exploreFeed,
    exploreFeedLoading,
    exploreFeedError,
  } = useSelector(
    (state) => state.posts
  );

  const [activeCategory, setActiveCategory] =
    useState("For You");

  // ======================================================
  // LOAD EXPLORE FEED
  // ======================================================

  useEffect(() => {
    dispatch(
      getExploreFeed({
        limit: 20,
        offset: 0,
      })
    );
  }, [dispatch]);

  // ======================================================
  // MEDIA URL
  // ======================================================

  const getMediaUrl = (mediaUrl) => {
    if (!mediaUrl) {
      return null;
    }

    const value = String(mediaUrl);

    if (
      value.startsWith("http://") ||
      value.startsWith("https://")
    ) {
      return value;
    }

    return `${BASE_URL}${value}`;
  };

  // ======================================================
  // BACK
  // ======================================================

  const handleBack = () => {
    router.back();
  };

  // ======================================================
  // REFRESH
  // ======================================================

  const handleRefresh = () => {
    dispatch(
      getExploreFeed({
        limit: 20,
        offset: 0,
      })
    );
  };

  // ======================================================
  // GRID ITEM
  // ======================================================

  const renderExploreItem = ({
    item,
  }) => {
    const mediaUrl =
      getMediaUrl(item?.media_url);

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.gridItem}
       onPress={() => {
    router.push({
      pathname: "/profile-screens/posts-viewer",
      params: {
        postId: String(item.id),
        userId: String(item.user_id),
      },
    });
  }}
      >
        {/* IMAGE */}

        {item?.media_type === "image" &&
        mediaUrl ? (
          <Image
            source={{
              uri: mediaUrl,
            }}
            style={styles.postImage}
            resizeMode="cover"
            onError={(error) => {
              console.log(
                "IMAGE ERROR =>",
                mediaUrl,
                error?.nativeEvent
              );
            }}
          />
        ) : item?.media_type === "video" &&
          mediaUrl ? (
          <View style={styles.noImage}>
            <Ionicons
              name="play-circle-outline"
              size={38}
              color="#777"
            />
          </View>
        ) : (
          <View style={styles.noImage}>
            <Ionicons
              name="image-outline"
              size={35}
              color="#777"
            />
          </View>
        )}

        {/* LIKE COUNT */}

        <View
          style={styles.countOverlay}
        >
          <Ionicons
            name="heart"
            size={14}
            color="#fff"
          />

          <Text
            style={styles.countText}
          >
            {item?.likes_count ?? 0}
          </Text>
        </View>

        {/* VIDEO INDICATOR */}

        {item?.media_type === "video" && (
          <View
            style={styles.videoIcon}
          >
            <Ionicons
              name="play"
              size={12}
              color="#fff"
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // ======================================================
  // ERROR
  // ======================================================

  if (
    exploreFeedError &&
    !exploreFeedLoading &&
    exploreFeed.length === 0
  ) {
    return (
      <ScreenLayout
        backgroundColor="#080913"
        keyboardAvoid={false}
        header={
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
              activeOpacity={0.7}
              hitSlop={10}
            >
              <Ionicons
                name="arrow-back"
                size={25}
                color="#fff"
              />
            </TouchableOpacity>

            <Text
              style={styles.headerTitle}
            >
              Explore
            </Text>

            <View
              style={styles.headerRight}
            />
          </View>
        }
      >
        <View
          style={styles.errorContainer}
        >
          <Ionicons
            name="alert-circle-outline"
            size={50}
            color="#A855F7"
          />

          <Text
            style={styles.errorTitle}
          >
            Unable to load explore
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={handleRefresh}
            activeOpacity={0.8}
          >
            <Text
              style={styles.retryText}
            >
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      </ScreenLayout>
    );
  }

  // ======================================================
  // MAIN
  // ======================================================

  return (
    <ScreenLayout
      backgroundColor="#080913"
      keyboardAvoid={false}
      header={
        <View style={styles.header}>
          {/* BACK */}

          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
            hitSlop={10}
          >
            <Ionicons
              name="arrow-back"
              size={25}
              color="#fff"
            />
          </TouchableOpacity>

          {/* TITLE */}

          <Text
            style={styles.headerTitle}
          >
            Explore
          </Text>

          {/* RIGHT SPACER */}

          <View
            style={styles.headerRight}
          />
        </View>
      }
    >
      {/* ==================================================
          CATEGORY BAR
      ================================================== */}

      <View
        style={styles.categoryWrapper}
      >
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
          keyExtractor={(item) =>
            item
          }
          contentContainerStyle={
            styles.categoryContainer
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                setActiveCategory(
                  item
                )
              }
              style={[
                styles.category,
                activeCategory ===
                  item &&
                  styles.activeCategory,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory ===
                    item &&
                    styles.activeCategoryText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* ==================================================
          LOADING
      ================================================== */}

      {exploreFeedLoading &&
      exploreFeed.length === 0 ? (
        <View
          style={styles.loader}
        >
          <ActivityIndicator
            size="large"
            color="#A855F7"
          />

          <Text
            style={styles.loadingText}
          >
            Loading explore...
          </Text>
        </View>
      ) : (
        /* ==================================================
           GRID
        ================================================== */

        <FlatList
          data={exploreFeed}
          renderItem={
            renderExploreItem
          }
          keyExtractor={(item) =>
            String(item.id)
          }
          numColumns={3}
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.grid
          }
          onRefresh={handleRefresh}
          refreshing={
            exploreFeedLoading
          }
          removeClippedSubviews={
            false
          }
          initialNumToRender={12}
          maxToRenderPerBatch={12}
          windowSize={10}
          bounces
        />
      )}
    </ScreenLayout>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({
  // ====================================================
  // HEADER
  // ====================================================

  header: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "#080913",
    borderBottomWidth: 0.5,
    borderBottomColor: "#23242F",
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },

  headerRight: {
    width: 40,
  },

  // ====================================================
  // CATEGORY
  // ====================================================

  categoryWrapper: {
    width: "100%",
    backgroundColor: "#080913",
  },

  categoryContainer: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
  },

  category: {
    height: 36,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    backgroundColor: "#1B1D25",
    marginRight: 8,
  },

  activeCategory: {
    backgroundColor: "#A855F7",
  },

  categoryText: {
    color: "#E5E5EA",
    fontSize: 13,
    fontWeight: "500",
  },

  activeCategoryText: {
    color: "#fff",
    fontWeight: "700",
  },

  // ====================================================
  // GRID
  // ====================================================

  grid: {
    paddingBottom: 100,
  },

  gridItem: {
    width: ITEM_WIDTH - 4,
    height: ITEM_WIDTH - 4,
    margin: 2,
    backgroundColor: "#161720",
    position: "relative",
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "#080913",
  },

  postImage: {
    width: "100%",
    height: "100%",
  },

  // ====================================================
  // LIKE COUNT
  // ====================================================

  countOverlay: {
    position: "absolute",
    left: 7,
    bottom: 7,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:
      "rgba(0,0,0,0.55)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },

  countText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 3,
  },

  // ====================================================
  // VIDEO
  // ====================================================

  videoIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor:
      "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  // ====================================================
  // NO IMAGE
  // ====================================================

  noImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161720",
  },

  // ====================================================
  // LOADING
  // ====================================================

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#888",
    marginTop: 10,
    fontSize: 14,
  },

  // ====================================================
  // ERROR
  // ====================================================

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  errorTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginTop: 12,
  },

  retryButton: {
    marginTop: 18,
    backgroundColor: "#A855F7",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },

  retryText: {
    color: "#fff",
    fontWeight: "700",
  },
});