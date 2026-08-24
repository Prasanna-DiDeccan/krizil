import React, {
  useCallback,
  useMemo,
} from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useFocusEffect,
  useRouter,
} from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

import {
  getUserPosts,
} from "../../redux/postSlice";

import {
  getUserReels,
} from "../../redux/reelsSlice";

import {
  getUser,
} from "../../utils/storage";

import {
  BASE_URL,
} from "../../utils/api";

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
// MEDIA URL
// ======================================================

const getMediaUrl = (url) => {
  if (!url) {
    return null;
  }

  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  if (
    url.startsWith("/")
  ) {
    return `${BASE_URL}${url}`;
  }

  return `${BASE_URL}/${url}`;
};


// ======================================================
// COMPONENT
// ======================================================

export default function AllContentGrid() {
  const dispatch = useDispatch();

  const router = useRouter();


  // ====================================================
  // POSTS
  // ====================================================

  const postsState =
    useSelector(
      (state) =>
        state.posts || {}
    );

  const userPosts =
    Array.isArray(
      postsState.userPosts
    )
      ? postsState.userPosts
      : [];

  const postsLoading =
    postsState.postsLoading ??
    false;

  const postsError =
    postsState.postsError ??
    null;


  // ====================================================
  // REELS
  // ====================================================

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

  const reelsLoading =
    reelsState.userReelsLoading ??
    false;

  const reelsError =
    reelsState.userReelsError ??
    null;


  // ====================================================
  // LOAD CONTENT
  // ====================================================

  const loadContent =
    useCallback(
      async () => {
        try {
          const user =
            await getUser();

          console.log(
            "================================"
          );

          console.log(
            "ALL CONTENT USER =>",
            user
          );

          const userId =
            user?.id;

          console.log(
            "ALL CONTENT USER ID =>",
            userId
          );

          console.log(
            "================================"
          );

          if (!userId) {
            console.log(
              "❌ ALL CONTENT USER ID NOT FOUND"
            );

            return;
          }


          // POSTS

          console.log(
            "📸 GET USER POSTS =>",
            userId
          );

          dispatch(
            getUserPosts(
              userId
            )
          );


          // REELS

          console.log(
            "🎬 GET USER REELS =>",
            userId
          );

          dispatch(
            getUserReels({
              userId,
              limit: 50,
              offset: 0,
            })
          );

        } catch (error) {
          console.log(
            "❌ ALL CONTENT LOAD ERROR =>",
            error
          );
        }
      },
      [dispatch]
    );


  // ====================================================
  // FOCUS
  // ====================================================

  useFocusEffect(
    useCallback(() => {
      loadContent();
    }, [
      loadContent,
    ])
  );


  // ====================================================
  // COMBINE
  // ====================================================

  const combinedContent =
    useMemo(() => {

      const posts =
        userPosts.map(
          (post) => ({
            ...post,

            contentType:
              "post",

            contentId:
              `post-${post.id}`,
          })
        );


      const reels =
        userReels.map(
          (reel) => ({
            ...reel,

            contentType:
              "reel",

            contentId:
              `reel-${reel.id}`,
          })
        );


      const combined = [
        ...posts,
        ...reels,
      ];


      // NEWEST FIRST

      combined.sort(
        (a, b) => {

          const dateA =
            new Date(
              a?.created_at || 0
            ).getTime();

          const dateB =
            new Date(
              b?.created_at || 0
            ).getTime();

          return (
            dateB - dateA
          );
        }
      );


      console.log(
        "================================"
      );

      console.log(
        "📦 ALL PROFILE CONTENT"
      );

      console.log(
        combined.map(
          (item) => ({
            id: item.id,

            type:
              item.contentType,

            user_id:
              item.user_id,

            created_at:
              item.created_at,
          })
        )
      );

      console.log(
        "================================"
      );


      return combined;

    }, [
      userPosts,
      userReels,
    ]);


  // ====================================================
  // OPEN CONTENT
  // ====================================================

  const handleItemPress =
    useCallback(
      async (index) => {

        const selected =
          combinedContent[index];

        if (!selected) {
          return;
        }


        console.log(
          "================================"
        );

        console.log(
          "OPEN PROFILE CONTENT"
        );

        console.log(
          "COMBINED INDEX =>",
          index
        );

        console.log(
          "TYPE =>",
          selected.contentType
        );

        console.log(
          "ID =>",
          selected.id
        );

        console.log(
          "================================"
        );


        // =================================================
        // POST
        // =================================================

        if (
          selected.contentType ===
          "post"
        ) {
          router.push({
            pathname:
              "/profile-screens/posts-viewer",

            params: {
              index:
                String(index),

              contentId:
                String(
                  selected.id
                ),

              contentType:
                "post",

              source:
                "profile",
            },
          });

          return;
        }


        // =================================================
        // REEL
        // =================================================

        if (
          selected.contentType ===
          "reel"
        ) {

          try {

            const user =
              await getUser();


            // IMPORTANT:
            // combinedContent index is NOT
            // the same as userReels index.

            const reelIndex =
              userReels.findIndex(
                (reel) =>
                  String(
                    reel?.id
                  ) ===
                  String(
                    selected?.id
                  )
              );


            console.log(
              "================================"
            );

            console.log(
              "🎬 OPEN PROFILE REEL FROM ALL"
            );

            console.log(
              "COMBINED INDEX =>",
              index
            );

            console.log(
              "REEL INDEX =>",
              reelIndex
            );

            console.log(
              "REEL ID =>",
              selected?.id
            );

            console.log(
              "USER ID =>",
              user?.id
            );

            console.log(
              "================================"
            );


            if (
              reelIndex === -1
            ) {
              console.log(
                "❌ REEL NOT FOUND IN userReels"
              );

              return;
            }


            const userId =
              user?.id ||
              selected?.user_id ||
              selected?.user?.id ||
              selected?.author?.id;


            if (!userId) {
              console.log(
                "❌ PROFILE REEL USER ID NOT FOUND"
              );

              return;
            }


            router.push({
              pathname:
                "/profile-screens/reels-viewer",

              params: {

                // CORRECT REEL INDEX
                index:
                  String(
                    reelIndex
                  ),

                // EXACT REEL
                reelId:
                  String(
                    selected.id
                  ),

                // REEL OWNER
                userId:
                  String(
                    userId
                  ),

                contentId:
                  String(
                    selected.id
                  ),

                contentType:
                  "reel",

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

          return;
        }

      },
      [
        combinedContent,
        userReels,
        router,
      ]
    );


  // ====================================================
  // THUMBNAIL
  // ====================================================

  const getThumbnail =
    useCallback(
      (item) => {

        let imageUrl =
          null;


        // REEL

        if (
          item?.contentType ===
          "reel"
        ) {
          imageUrl =
            item?.thumbnail_url ||
            item?.thumbnail ||
            item?.image_url;
        }


        // POST

        else {
          imageUrl =
            item?.media_url ||
            item?.image_url ||
            item?.image ||
            item?.thumbnail_url ||
            item?.media?.[0]?.url ||
            item?.images?.[0]?.url ||
            item?.media?.[0];
        }


        return getMediaUrl(
          imageUrl
        );
      },
      []
    );


  // ====================================================
  // LOADING
  // ====================================================

  const isLoading =
    (
      postsLoading ||
      reelsLoading
    ) &&
    combinedContent.length === 0;


  if (isLoading) {
    return (
      <View
        style={
          styles.loader
        }
      >
        <ActivityIndicator
          size="small"
          color="#A855F7"
        />

        <Text
          style={
            styles.loadingText
          }
        >
          Loading...
        </Text>
      </View>
    );
  }


  // ====================================================
  // ERROR
  // ====================================================

  if (
    postsError &&
    reelsError &&
    combinedContent.length === 0
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
          color="#666"
        />

        <Text
          style={
            styles.emptyText
          }
        >
          Failed to load content
        </Text>

        <TouchableOpacity
          onPress={
            loadContent
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


  // ====================================================
  // EMPTY
  // ====================================================

  if (
    combinedContent.length === 0
  ) {
    return (
      <View
        style={
          styles.empty
        }
      >
        <Ionicons
          name="grid-outline"
          size={42}
          color="#555"
        />

        <Text
          style={
            styles.emptyText
          }
        >
          No posts yet
        </Text>
      </View>
    );
  }


  // ====================================================
  // GRID
  // ====================================================

  return (
    <View
      style={
        styles.container
      }
    >

      <View
        style={
          styles.grid
        }
      >

        {combinedContent.map(
          (
            item,
            index
          ) => {

            const isReel =
              item.contentType ===
              "reel";

            const imageUrl =
              getThumbnail(
                item
              );


            return (
              <TouchableOpacity
                key={
                  item.contentId
                }
                activeOpacity={
                  0.9
                }
                style={
                  styles.item
                }
                onPress={() =>
                  handleItemPress(
                    index
                  )
                }
              >

                {imageUrl ? (
                  <Image
                    source={{
                      uri:
                        imageUrl,
                    }}
                    style={
                      styles.image
                    }
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    style={
                      styles.placeholder
                    }
                  >
                    <Ionicons
                      name={
                        isReel
                          ? "play-circle-outline"
                          : "image-outline"
                      }
                      size={32}
                      color="#555"
                    />
                  </View>
                )}


                {isReel && (
                  <View
                    style={
                      styles.reelIcon
                    }
                    pointerEvents="none"
                  >
                    <Ionicons
                      name="play"
                      size={15}
                      color="#fff"
                    />
                  </View>
                )}

              </TouchableOpacity>
            );
          }
        )}

      </View>
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
      backgroundColor:
        "#080913",
    },

    grid: {
      width: "100%",

      flexDirection:
        "row",

      flexWrap:
        "wrap",

      gap: GAP,
    },

    item: {
      width:
        ITEM_WIDTH,

      height:
        ITEM_HEIGHT,

      backgroundColor:
        "#181818",

      position:
        "relative",

      overflow:
        "hidden",
    },

    image: {
      width: "100%",
      height: "100%",
    },

    placeholder: {
      width: "100%",
      height: "100%",

      justifyContent:
        "center",

      alignItems:
        "center",

      backgroundColor:
        "#181818",
    },

    reelIcon: {
      position:
        "absolute",

      top: 7,
      right: 7,

      width: 30,
      height: 30,

      borderRadius: 15,

      backgroundColor:
        "rgba(0,0,0,0.6)",

      justifyContent:
        "center",

      alignItems:
        "center",
    },

    loader: {
      height: 180,

      justifyContent:
        "center",

      alignItems:
        "center",

      backgroundColor:
        "#080913",
    },

    loadingText: {
      color: "#777",
      fontSize: 13,
      marginTop: 8,
    },

    empty: {
      minHeight: 250,

      justifyContent:
        "center",

      alignItems:
        "center",

      backgroundColor:
        "#080913",
    },

    emptyText: {
      color: "#777",
      fontSize: 14,
      marginTop: 10,
    },

    retryButton: {
      marginTop: 12,

      paddingHorizontal: 20,
      paddingVertical: 9,

      borderRadius: 20,

      backgroundColor:
        "#fff",
    },

    retryText: {
      color: "#000",
      fontSize: 13,
      fontWeight: "600",
    },
  });