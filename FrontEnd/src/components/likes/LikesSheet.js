import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getPostLikes,
  getReelLikes,
} from "../../redux/likeSlice";

import {
  getMediaUrl,
} from "../../utils/media";

// ======================================================
// LIKES SHEET
// ======================================================

const LikesSheet = ({
  visible,
  postId = null,
  reelId = null,
  onClose,
}) => {
  const dispatch = useDispatch();

  const [loadingMore, setLoadingMore] =
    useState(false);

  // ======================================================
  // NORMALIZE IDS
  // ======================================================

  const normalizedPostId =
    postId !== null &&
    postId !== undefined
      ? String(postId)
      : null;

  const normalizedReelId =
    reelId !== null &&
    reelId !== undefined
      ? String(reelId)
      : null;

  const isPost =
    normalizedPostId !== null;

  const isReel =
    !isPost &&
    normalizedReelId !== null;

  // ======================================================
  // REDUX DATA
  // ======================================================
  //
  // IMPORTANT:
  //
  // store.js:
  //
  // like: likeReducer
  //
  // therefore:
  //
  // state.like
  //
  // NOT:
  //
  // state.likes
  //
  // ======================================================

  const likesData = useSelector(
    (state) => {
      if (isPost) {
        return (
          state.like?.postLikes?.[
            normalizedPostId
          ] || null
        );
      }

      if (isReel) {
        return (
          state.like?.reelLikes?.[
            normalizedReelId
          ] || null
        );
      }

      return null;
    }
  );

  // ======================================================
  // GLOBAL LIKE LOADING
  // ======================================================

  const loading = useSelector(
    (state) =>
      state.like?.loading || false
  );

  // ======================================================
  // DEBUG
  // ======================================================

  console.log(
    "❤️ LIKES SHEET RENDER =>",
    {
      visible,

      postId,

      reelId,

      normalizedPostId,

      normalizedReelId,

      isPost,

      isReel,

      likesData,

      items:
        likesData?.items,

      total:
        likesData?.total,
    }
  );

  // ======================================================
  // ITEMS
  // ======================================================

  const items = useMemo(() => {
    if (
      !likesData?.items ||
      !Array.isArray(
        likesData.items
      )
    ) {
      return [];
    }

    return likesData.items;
  }, [likesData]);

  // ======================================================
  // TOTAL
  // ======================================================

  const total = Number(
    likesData?.total || 0
  );

  // ======================================================
  // LIMIT
  // ======================================================

  const limit = Number(
    likesData?.limit || 20
  );

  // ======================================================
  // OFFSET
  // ======================================================

  const offset = Number(
    likesData?.offset || 0
  );

  // ======================================================
  // FETCH LIKES
  // ======================================================

  useEffect(() => {
    if (!visible) {
      return;
    }

    // ==================================================
    // POST
    // ==================================================

    if (isPost) {
      console.log(
        "❤️ LIKES SHEET FETCH POST =>",
        normalizedPostId
      );

      dispatch(
        getPostLikes({
          postId:
            Number(
              normalizedPostId
            ),

          limit: 20,

          offset: 0,
        })
      );

      return;
    }

    // ==================================================
    // REEL
    // ==================================================

    if (isReel) {
      console.log(
        "❤️ LIKES SHEET FETCH REEL =>",
        normalizedReelId
      );

      dispatch(
        getReelLikes({
          reelId:
            Number(
              normalizedReelId
            ),

          limit: 20,

          offset: 0,
        })
      );
    }
  }, [
    visible,

    isPost,

    isReel,

    normalizedPostId,

    normalizedReelId,

    dispatch,
  ]);

  // ======================================================
  // LOAD MORE
  // ======================================================

  const handleLoadMore =
    useCallback(
      async () => {
        if (
          loadingMore ||
          loading
        ) {
          return;
        }

        if (!likesData) {
          return;
        }

        if (
          items.length >= total
        ) {
          return;
        }

        const nextOffset =
          offset + limit;

        console.log(
          "❤️ LOAD MORE LIKES =>",
          {
            postId:
              normalizedPostId,

            reelId:
              normalizedReelId,

            nextOffset,
          }
        );

        setLoadingMore(true);

        try {
          // ==========================================
          // POST
          // ==========================================

          if (isPost) {
            await dispatch(
              getPostLikes({
                postId:
                  Number(
                    normalizedPostId
                  ),

                limit: 20,

                offset:
                  nextOffset,
              })
            ).unwrap();
          }

          // ==========================================
          // REEL
          // ==========================================

          else if (isReel) {
            await dispatch(
              getReelLikes({
                reelId:
                  Number(
                    normalizedReelId
                  ),

                limit: 20,

                offset:
                  nextOffset,
              })
            ).unwrap();
          }
        } catch (error) {
          console.log(
            "❌ LOAD MORE LIKES ERROR =>",
            error
          );
        } finally {
          setLoadingMore(false);
        }
      },
      [
        loadingMore,

        loading,

        likesData,

        items.length,

        total,

        offset,

        limit,

        isPost,

        isReel,

        normalizedPostId,

        normalizedReelId,

        dispatch,
      ]
    );

  // ======================================================
  // USER ROW
  // ======================================================

  const renderUser =
    useCallback(
      ({ item }) => {
        console.log(
          "👤 RENDER LIKE USER =>",
          item
        );

        const avatarUrl =
          getMediaUrl(
            item?.avatar_url
          );

        return (
          <View
            style={
              styles.userRow
            }
          >
            {/* =========================================
                AVATAR
            ========================================== */}

            {avatarUrl ? (
              <Image
                source={{
                  uri: avatarUrl,
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
                  size={22}
                  color="#aaa"
                />
              </View>
            )}

            {/* =========================================
                USER INFO
            ========================================== */}

            <View
              style={
                styles.userInfo
              }
            >
              <Text
                style={
                  styles.username
                }
                numberOfLines={1}
              >
                {item?.username ||
                  "User"}
              </Text>

              {item?.full_name ? (
                <Text
                  style={
                    styles.fullName
                  }
                  numberOfLines={1}
                >
                  {item.full_name}
                </Text>
              ) : null}
            </View>

            {/* =========================================
                FOLLOW BUTTON
            ========================================== */}

            <Pressable
              style={[
                styles.followButton,

                item?.is_following &&
                  styles.followingButton,
              ]}
            >
              <Text
                style={[
                  styles.followText,

                  item?.is_following &&
                    styles.followingText,
                ]}
              >
                {item?.is_following
                  ? "Following"
                  : "Follow"}
              </Text>
            </Pressable>
          </View>
        );
      },
      []
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
          style={
            styles.footer
          }
        >
          <ActivityIndicator
            size="small"
            color="#fff"
          />
        </View>
      );
    }, [loadingMore]);

  // ======================================================
  // EMPTY
  // ======================================================

  const renderEmpty =
    useCallback(() => {
      if (loading) {
        return (
          <View
            style={
              styles.emptyContainer
            }
          >
            <ActivityIndicator
              size="large"
              color="#fff"
            />
          </View>
        );
      }

      return (
        <View
          style={
            styles.emptyContainer
          }
        >
          <Ionicons
            name="heart-outline"
            size={45}
            color="#777"
          />

          <Text
            style={
              styles.emptyText
            }
          >
            No likes yet
          </Text>
        </View>
      );
    }, [loading]);

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={
        onClose
      }
    >
      <View
        style={
          styles.overlay
        }
      >
        {/* =============================================
            BACKDROP
        ============================================== */}

        <Pressable
          style={
            styles.backdrop
          }
          onPress={
            onClose
          }
        />

        {/* =============================================
            SHEET
        ============================================== */}

        <View
          style={
            styles.sheet
          }
        >
          {/* ===========================================
              HANDLE
          ============================================ */}

          <View
            style={
              styles.handle
            }
          />

          {/* ===========================================
              HEADER
          ============================================ */}

          <View
            style={
              styles.header
            }
          >
            <Text
              style={
                styles.title
              }
            >
              Likes
            </Text>

            <Pressable
              onPress={
                onClose
              }
              hitSlop={12}
            >
              <Ionicons
                name="close"
                size={26}
                color="#fff"
              />
            </Pressable>
          </View>

          {/* ===========================================
              LIST
          ============================================ */}

          <FlatList
            data={items}

            extraData={items}

            keyExtractor={(
              item,
              index
            ) =>
              String(
                item?.id ??
                  item?.user_id ??
                  index
              )
            }

            renderItem={
              renderUser
            }

            ListEmptyComponent={
              renderEmpty
            }

            ListFooterComponent={
              renderFooter
            }

            onEndReached={
              handleLoadMore
            }

            onEndReachedThreshold={
              0.5
            }

            showsVerticalScrollIndicator={
              false
            }

            contentContainerStyle={
              items.length === 0
                ? styles.emptyList
                : styles.list
            }
          />
        </View>
      </View>
    </Modal>
  );
};

export default LikesSheet;

// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({
    overlay: {
      flex: 1,

      justifyContent:
        "flex-end",
    },

    backdrop: {
      ...StyleSheet.absoluteFillObject,

      backgroundColor:
        "rgba(0,0,0,0.55)",
    },

    sheet: {
      height: "72%",

      backgroundColor:
        "#111218",

      borderTopLeftRadius: 22,

      borderTopRightRadius: 22,

      overflow: "hidden",
    },

    handle: {
      width: 42,

      height: 5,

      borderRadius: 3,

      backgroundColor:
        "#555",

      alignSelf:
        "center",

      marginTop: 9,

      marginBottom: 8,
    },

    header: {
      height: 52,

      paddingHorizontal: 18,

      flexDirection:
        "row",

      alignItems:
        "center",

      justifyContent:
        "space-between",

      borderBottomWidth: 1,

      borderBottomColor:
        "#25262E",
    },

    title: {
      color: "#fff",

      fontSize: 18,

      fontWeight: "700",
    },

    list: {
      paddingHorizontal: 16,

      paddingBottom: 30,
    },

    userRow: {
      minHeight: 68,

      flexDirection:
        "row",

      alignItems:
        "center",
    },

    avatar: {
      width: 48,

      height: 48,

      borderRadius: 24,

      marginRight: 12,
    },

    avatarPlaceholder: {
      width: 48,

      height: 48,

      borderRadius: 24,

      backgroundColor:
        "#292A32",

      justifyContent:
        "center",

      alignItems:
        "center",

      marginRight: 12,
    },

    userInfo: {
      flex: 1,

      marginRight: 10,
    },

    username: {
      color: "#fff",

      fontSize: 14,

      fontWeight: "700",
    },

    fullName: {
      color: "#999",

      fontSize: 13,

      marginTop: 3,
    },

    followButton: {
      minWidth: 82,

      height: 34,

      paddingHorizontal: 12,

      borderRadius: 7,

      backgroundColor:
        "#fff",

      justifyContent:
        "center",

      alignItems:
        "center",
    },

    followingButton: {
      backgroundColor:
        "#25262D",
    },

    followText: {
      color: "#000",

      fontSize: 12,

      fontWeight: "700",
    },

    followingText: {
      color: "#fff",
    },

    footer: {
      paddingVertical: 15,

      alignItems:
        "center",
    },

    emptyList: {
      flexGrow: 1,
    },

    emptyContainer: {
      flex: 1,

      justifyContent:
        "center",

      alignItems:
        "center",
    },

    emptyText: {
      color: "#888",

      marginTop: 10,

      fontSize: 14,
    },
  });