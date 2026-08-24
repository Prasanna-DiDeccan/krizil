import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import {
  useLocalSearchParams,
  router,
  useFocusEffect,
} from "expo-router";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import PostCard from "../../src/components/PostCard";

import HomeReel from "../../src/components/reels/HReel/HomeReel";

import {
  getUserPosts,
  deletePost,
  savePost,
  unsavePost,
} from "../../src/redux/postSlice";

import {
  getUserReels,
  deleteReel,
  saveReel,
  unsaveReel,
} from "../../src/redux/reelsSlice";

import { getUser } from "../../src/utils/storage";

const { width } = Dimensions.get("window");

// ======================================================
// MAIN
// ======================================================

export default function PostsViewer() {
  const dispatch = useDispatch();

  const flatListRef = useRef(null);

  const params = useLocalSearchParams();

  // ======================================================
  // PARAMS
  // ======================================================

  const {
    postId,
    reelId,
    userId,
    index,
  } = params;

  // ======================================================
  // PROFILE
  // ======================================================

  const profile = useSelector((state) => {
    return (
      state.profile?.profile ||
      state.profile?.user ||
      state.auth?.profile ||
      state.auth?.user ||
      state.user?.profile ||
      state.user?.user ||
      null
    );
  });

  // ======================================================
  // POSTS REDUX
  // ======================================================

  const postsState = useSelector(
    (state) => state.posts || {}
  );

  const userPosts = Array.isArray(
    postsState.userPosts
  )
    ? postsState.userPosts
    : [];

  // ======================================================
  // REELS REDUX
  // ======================================================

  const reelsState = useSelector(
    (state) => state.reels || {}
  );

  const userReels = Array.isArray(
    reelsState.userReels
  )
    ? reelsState.userReels
    : [];

  // ======================================================
  // CURRENT / PROFILE USER ID
  // ======================================================

  const [currentUserId, setCurrentUserId] =
    useState(null);

  // ======================================================
  // LOAD USER
  // ======================================================

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getUser();

        const fallbackId =
          user?.id ??
          profile?.id ??
          profile?.user_id ??
          null;

        setCurrentUserId(fallbackId);

        console.log(
          "======================================"
        );

        console.log(
          "POSTS VIEWER STORAGE USER =>",
          user
        );

        console.log(
          "POSTS VIEWER FALLBACK USER ID =>",
          fallbackId
        );

        console.log(
          "======================================"
        );
      } catch (error) {
        console.log(
          "POSTS VIEWER GET USER ERROR =>",
          error
        );
      }
    };

    loadUser();
  }, [profile]);

  // ======================================================
  // TARGET USER
  //
  // If profile/grid sends userId,
  // use that user.
  //
  // Otherwise use current logged-in user.
  // ======================================================

  const targetUserId =
    userId ||
    currentUserId ||
    profile?.id ||
    profile?.user_id ||
    null;

  // ======================================================
  // LOAD POSTS + REELS
  //
  // IMPORTANT:
  // PostsViewer intentionally loads BOTH.
  //
  // This is the mixed Instagram-style viewer.
  // ======================================================

  useFocusEffect(
    useCallback(() => {
      if (!targetUserId) {
        return;
      }

      console.log(
        "======================================"
      );

      console.log(
        "POSTS VIEWER LOADING MIXED CONTENT"
      );

      console.log(
        "TARGET USER ID =>",
        targetUserId
      );

      console.log(
        "======================================"
      );

      // POSTS
      dispatch(
        getUserPosts(targetUserId)
      );

      // REELS
      dispatch(
        getUserReels({
          userId: targetUserId,
          limit: 50,
          offset: 0,
        })
      );
    }, [
      targetUserId,
      dispatch,
    ])
  );

  // ======================================================
  // NORMALIZE REELS
  // ======================================================

  const normalizedReels = useMemo(() => {
    return userReels.map((reel) => {
      const reelUserId =
        reel?.user_id ??
        targetUserId;

      const isCurrentUser =
        String(reelUserId) ===
        String(currentUserId);

      return {
        ...reel,

        author: {
          ...(reel?.author || {}),

          username:
            reel?.author?.username ||
            reel?.user?.username ||
            reel?.username ||
            (isCurrentUser
              ? profile?.username
              : null),

          full_name:
            reel?.author?.full_name ||
            reel?.user?.full_name ||
            reel?.full_name ||
            null,

          avatar_url:
            reel?.author?.avatar_url ||
            reel?.user?.avatar_url ||
            reel?.avatar_url ||
            (isCurrentUser
              ? profile?.avatar_url
              : null),
        },
      };
    });
  }, [
    userReels,
    targetUserId,
    currentUserId,
    profile,
  ]);

  // ======================================================
  // MIX POSTS + REELS
  //
  // THIS IS THE IMPORTANT PART.
  //
  // All tab = posts + reels.
  // ======================================================

  const combinedContent = useMemo(() => {
    const posts = userPosts.map((post) => ({
      ...post,

      contentType: "post",

      contentId:
        `post-${post.id}`,
    }));

    const reels = normalizedReels.map(
      (reel) => ({
        ...reel,

        contentType: "reel",

        contentId:
          `reel-${reel.id}`,
      })
    );

    const combined = [
      ...posts,
      ...reels,
    ];

    // NEWEST FIRST
    combined.sort((a, b) => {
      const dateA = new Date(
        a?.created_at ||
        a?.createdAt ||
        0
      ).getTime();

      const dateB = new Date(
        b?.created_at ||
        b?.createdAt ||
        0
      ).getTime();

      return dateB - dateA;
    });

    console.log(
      "======================================"
    );

    console.log(
      "MIXED POSTS + REELS =>",
      combined.map((item) => ({
        id: item.id,
        type: item.contentType,
        contentId: item.contentId,
      }))
    );

    console.log(
      "======================================"
    );

    return combined;
  }, [
    userPosts,
    normalizedReels,
  ]);

  // ======================================================
  // FIND INITIAL INDEX
  //
  // If tapped post -> open that post.
  //
  // If tapped reel -> open that reel.
  // ======================================================

  const selectedInitialIndex = useMemo(() => {
    // ----------------------------------------------
    // POST
    // ----------------------------------------------

    if (postId) {
      const found =
        combinedContent.findIndex(
          (item) =>
            item.contentType === "post" &&
            String(item.id) ===
              String(postId)
        );

      if (found >= 0) {
        return found;
      }
    }

    // ----------------------------------------------
    // REEL
    // ----------------------------------------------

    if (reelId) {
      const found =
        combinedContent.findIndex(
          (item) =>
            item.contentType === "reel" &&
            String(item.id) ===
              String(reelId)
        );

      if (found >= 0) {
        return found;
      }
    }

    // ----------------------------------------------
    // INDEX FALLBACK
    // ----------------------------------------------

    const numericIndex =
      Number(index);

    if (
      Number.isInteger(
        numericIndex
      ) &&
      numericIndex >= 0 &&
      numericIndex <
        combinedContent.length
    ) {
      return numericIndex;
    }

    return 0;
  }, [
    combinedContent,
    postId,
    reelId,
    index,
  ]);

  // ======================================================
  // ACTIVE INDEX
  // ======================================================

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  // ======================================================
  // INITIAL SCROLL
  // ======================================================

  const hasScrolledInitially =
    useRef(false);

  useEffect(() => {
    if (
      combinedContent.length === 0
    ) {
      return;
    }

    if (
      hasScrolledInitially.current
    ) {
      return;
    }

    hasScrolledInitially.current =
      true;

    const targetIndex =
      Math.min(
        selectedInitialIndex,
        combinedContent.length - 1
      );

    setActiveIndex(
      targetIndex
    );

    setTimeout(() => {
      flatListRef.current?.scrollToIndex(
        {
          index: targetIndex,
          animated: false,
        }
      );
    }, 250);
  }, [
    combinedContent.length,
    selectedInitialIndex,
  ]);

  // ======================================================
  // MENU
  // ======================================================

  const [
    menuVisible,
    setMenuVisible,
  ] = useState(false);

  const [
    selectedItem,
    setSelectedItem,
  ] = useState(null);

  // ======================================================
  // MENU
  // ======================================================

  const handleMenuPress =
    useCallback((item) => {
      setSelectedItem(item);
      setMenuVisible(true);
    }, []);

  const closeMenu =
    useCallback(() => {
      setMenuVisible(false);
    }, []);

  // ======================================================
  // SAVE / UNSAVE
  // ======================================================

  const handleSaveToggle =
    async () => {
      if (!selectedItem) {
        return;
      }

      try {
        const id =
          selectedItem.id;

        const saved =
          Boolean(
            selectedItem.is_saved
          );

        if (
          selectedItem.contentType ===
          "post"
        ) {
          if (saved) {
            await dispatch(
              unsavePost(id)
            ).unwrap();
          } else {
            await dispatch(
              savePost(id)
            ).unwrap();
          }
        } else {
          if (saved) {
            await dispatch(
              unsaveReel(id)
            ).unwrap();
          } else {
            await dispatch(
              saveReel(id)
            ).unwrap();
          }
        }

        setSelectedItem(
          (previous) => {
            if (!previous) {
              return previous;
            }

            return {
              ...previous,
              is_saved: !saved,
            };
          }
        );

        closeMenu();
      } catch (error) {
        console.log(
          "SAVE / UNSAVE ERROR =>",
          error
        );

        Alert.alert(
          "Error",
          "Unable to update saved status."
        );
      }
    };

  // ======================================================
  // EDIT
  // ======================================================

  const handleEdit = () => {
    if (!selectedItem) {
      return;
    }

    if (
      selectedItem.contentType !==
      "post"
    ) {
      closeMenu();
      return;
    }

    const id =
      selectedItem.id;

    closeMenu();

    router.push({
      pathname:
        "/profile-screens/edit-post",

      params: {
        postId: String(id),
      },
    });
  };

  // ======================================================
  // DELETE
  // ======================================================

  const handleDelete = () => {
    if (!selectedItem) {
      return;
    }

    const id =
      selectedItem.id;

    const type =
      selectedItem.contentType;

    closeMenu();

    Alert.alert(
      type === "post"
        ? "Delete post?"
        : "Delete reel?",

      type === "post"
        ? "Are you sure you want to delete this post?"
        : "Are you sure you want to delete this reel?",

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
                if (!currentUserId) {
                  Alert.alert(
                    "Error",
                    "Unable to identify current user."
                  );
                  return;
                }

                if (
                  type === "post"
                ) {
                  const numericPostId =
                    Number(id);

                  await dispatch(
                    deletePost({
                      postId:
                        numericPostId,

                      userId:
                        currentUserId,
                    })
                  ).unwrap();
                } else {
                  await dispatch(
                    deleteReel(id)
                  ).unwrap();
                }

                console.log(
                  "CONTENT DELETED =>",
                  type,
                  id
                );
              } catch (error) {
                console.log(
                  "DELETE ERROR =>",
                  error
                );

                Alert.alert(
                  "Error",
                  "Unable to delete content."
                );
              }
            },
        },
      ]
    );
  };

  // ======================================================
  // OPEN REEL VIEWER
  //
  // IMPORTANT:
  //
  // This is ONLY called when the user taps
  // a reel INSIDE PostsViewer.
  //
  // Grid does NOT call this directly.
  // ======================================================

  const openReelViewer =
    useCallback(
      (item) => {
        if (!item?.id) {
          return;
        }

        const reelUserId =
          item?.user_id ??
          targetUserId;

        console.log(
          "======================================"
        );

        console.log(
          "OPENING REELS VIEWER"
        );

        console.log(
          "REEL ID =>",
          item.id
        );

        console.log(
          "REEL USER ID =>",
          reelUserId
        );

        console.log(
          "======================================"
        );

        router.push({
          pathname:
            "/profile-screens/reels-viewer",

          params: {
            reelId:
              String(item.id),

            userId:
              String(reelUserId),

            source:
              "profile",
          },
        });
      },
      [
        targetUserId,
      ]
    );

  // ======================================================
  // VIEWABILITY
  // ======================================================

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
                item.index !== null
            )
            .sort(
              (a, b) =>
                (b.percentVisible || 0) -
                (a.percentVisible || 0)
            );

        const first =
          visible[0];

        if (
          first?.index !==
            null &&
          first?.index !==
            undefined
        ) {
          setActiveIndex(
            first.index
          );
        }
      }
    ).current;

  const viewabilityConfig =
    useRef({
      itemVisiblePercentThreshold: 55,
    }).current;

  // ======================================================
  // RENDER
  // ======================================================

  const renderItem =
    useCallback(
      ({
        item,
        index,
      }) => {
        // --------------------------------------------
        // REEL
        // --------------------------------------------

        if (
          item.contentType ===
          "reel"
        ) {
          return (
            <View
              style={
                styles.reelItem
              }
            >
              <HomeReel
                item={item}

                isActive={
                  activeIndex ===
                  index
                }

                currentUserId={
                  currentUserId
                }

                onCommentPress={() => {}}

                onSharePress={() => {}}

                onMenuPress={() =>
                  handleMenuPress(
                    item
                  )
                }

                onReelPress={() =>
                  openReelViewer(
                    item
                  )
                }
              />
            </View>
          );
        }

        // --------------------------------------------
        // POST
        // --------------------------------------------

        return (
          <View
            style={
              styles.postViewerItem
            }
          >
            <PostCard
              item={item}
              onMenuPress={
                handleMenuPress
              }
            />
          </View>
        );
      },
      [
        activeIndex,
        currentUserId,
        handleMenuPress,
        openReelViewer,
      ]
    );

  // ======================================================
  // KEY
  // ======================================================

  const keyExtractor =
    useCallback(
      (item) =>
        String(
          item.contentId
        ),
      []
    );

  // ======================================================
  // SCROLL FAILED
  // ======================================================

  const onScrollToIndexFailed =
    useCallback(
      (info) => {
        setTimeout(() => {
          flatListRef.current?.scrollToIndex(
            {
              index:
                info.index,

              animated:
                false,
            }
          );
        }, 500);
      },
      []
    );

  // ======================================================
  // LOADING
  // ======================================================

  if (
    combinedContent.length === 0
  ) {
    return (
      <SafeAreaView
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
          >
            <Ionicons
              name="arrow-back"
              size={27}
              color="#fff"
            />
          </TouchableOpacity>

          <Text
            style={
              styles.title
            }
          >
            Posts
          </Text>
        </View>

        <View
          style={
            styles.empty
          }
        >
          <ActivityIndicator
            size="small"
            color="#fff"
          />

          <Text
            style={
              styles.emptyText
            }
          >
            Loading posts and reels...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ======================================================
  // MAIN
  // ======================================================

  return (
    <SafeAreaView
      style={
        styles.container
      }
      edges={[
        "top",
        "left",
        "right",
      ]}
    >
      {/* HEADER */}

      <View
        style={
          styles.header
        }
      >
        <TouchableOpacity
          onPress={() =>
            router.back()
          }
        >
          <Ionicons
            name="arrow-back"
            size={27}
            color="#fff"
          />
        </TouchableOpacity>

        <Text
          style={
            styles.title
          }
        >
          Posts
        </Text>

        <Text
          style={
            styles.counter
          }
        >
          {activeIndex + 1}/
          {combinedContent.length}
        </Text>
      </View>

      {/* MIXED POSTS + REELS */}

      <FlatList
        ref={
          flatListRef
        }

        data={
          combinedContent
        }

        renderItem={
          renderItem
        }

        keyExtractor={
          keyExtractor
        }

        showsVerticalScrollIndicator={
          false
        }

        bounces
        decelerationRate="normal"

        initialNumToRender={4}

        maxToRenderPerBatch={5}

        windowSize={7}

        removeClippedSubviews={false}

        onViewableItemsChanged={
          onViewableItemsChanged
        }

        viewabilityConfig={
          viewabilityConfig
        }

        onScrollToIndexFailed={
          onScrollToIndexFailed
        }

        pagingEnabled={false}

        contentContainerStyle={
          styles.listContent
        }
      />

      {/* MENU */}

      <Modal
        visible={
          menuVisible
        }
        transparent
        animationType="slide"
        onRequestClose={
          closeMenu
        }
      >
        <Pressable
          style={
            styles.modalOverlay
          }
          onPress={
            closeMenu
          }
        >
          <Pressable
            style={
              styles.bottomSheet
            }
            onPress={() => {}}
          >
            <View
              style={
                styles.handle
              }
            />

            {/* SAVE */}

            <TouchableOpacity
              style={
                styles.menuItem
              }
              onPress={
                handleSaveToggle
              }
            >
              <Ionicons
                name={
                  selectedItem?.is_saved
                    ? "bookmark"
                    : "bookmark-outline"
                }
                size={25}
                color="#fff"
              />

              <Text
                style={
                  styles.menuText
                }
              >
                {selectedItem?.is_saved
                  ? "Unsave"
                  : "Save"}
              </Text>
            </TouchableOpacity>

            {/* EDIT */}

            {selectedItem?.contentType ===
              "post" && (
              <TouchableOpacity
                style={
                  styles.menuItem
                }
                onPress={
                  handleEdit
                }
              >
                <Ionicons
                  name="create-outline"
                  size={25}
                  color="#fff"
                />

                <Text
                  style={
                    styles.menuText
                  }
                >
                  Edit
                </Text>
              </TouchableOpacity>
            )}

            {/* DELETE */}

            <TouchableOpacity
              style={
                styles.menuItem
              }
              onPress={
                handleDelete
              }
            >
              <Ionicons
                name="trash-outline"
                size={25}
                color="#ff3040"
              />

              <Text
                style={[
                  styles.menuText,
                  styles.deleteText,
                ]}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
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

    header: {
      height: 56,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      backgroundColor:
        "#080913",
      borderBottomWidth: 0.5,
      borderBottomColor:
        "#23242F",
      zIndex: 20,
    },

    title: {
      color: "#fff",
      fontSize: 22,
      fontWeight: "700",
      marginLeft: 20,
    },

    counter: {
      marginLeft: "auto",
      color: "#777",
      fontSize: 13,
    },

    listContent: {
      paddingBottom: 30,
      backgroundColor:
        "#080913",
    },

    postViewerItem: {
      width,
      backgroundColor:
        "#080913",
    },

    reelItem: {
      width,
      backgroundColor:
        "#000",
    },

    empty: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    emptyText: {
      color: "#777",
      fontSize: 14,
      marginTop: 10,
    },

    modalOverlay: {
      flex: 1,
      backgroundColor:
        "rgba(0,0,0,0.55)",
      justifyContent:
        "flex-end",
    },

    bottomSheet: {
      backgroundColor:
        "#1B1E23",
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      paddingTop: 10,
      paddingBottom: 30,
      paddingHorizontal: 16,
    },

    handle: {
      width: 38,
      height: 4,
      borderRadius: 10,
      backgroundColor:
        "#85878C",
      alignSelf: "center",
      marginBottom: 12,
    },

    menuItem: {
      height: 58,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 8,
    },

    menuText: {
      color: "#fff",
      fontSize: 16,
      marginLeft: 18,
      fontWeight: "500",
    },

    deleteText: {
      color: "#ff3040",
    },
  });