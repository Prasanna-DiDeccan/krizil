import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  View,
  FlatList,
  Image,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { router } from "expo-router";

import {
  getStoryFeed,
  getMyStories,
} from "../../redux/storySlice";

import {
  getProfile,
} from "../../redux/profileSlice";

import {
  getMediaUrl,
} from "../../utils/media";

import {
  getUser,
} from "../../utils/storage";

export default function Stories() {
  const dispatch = useDispatch();

  const [
    currentUser,
    setCurrentUser,
  ] = useState(null);

  // ======================================================
  // STORY STATE
  // ======================================================

  const {
    feed = [],
    myStories = [],
    loading,
    error,
  } = useSelector(
    (state) => state.stories
  );

  // ======================================================
  // PROFILE STATE
  // ======================================================

  const {
    profileData,
  } = useSelector(
    (state) => state.profile
  );

  // ======================================================
  // LOAD USER + PROFILE + STORIES
  // ======================================================

  useEffect(() => {
    const loadData =
      async () => {
        try {
          const user =
            await getUser();

          console.log(
            "STORIES STORAGE USER =>",
            user
          );

          setCurrentUser(user);

          if (user?.id) {
            dispatch(
              getProfile(user.id)
            );
          }

          dispatch(
            getStoryFeed()
          );

          dispatch(
            getMyStories()
          );
        } catch (error) {
          console.log(
            "LOAD STORIES ERROR =>",
            error
          );
        }
      };

    loadData();
  }, [dispatch]);

  // ======================================================
  // CURRENT USER ID
  // ======================================================

  const currentUserId =
    profileData?.id ||
    currentUser?.id;

  // ======================================================
  // MY AVATAR
  //
  // PROFILE API FIRST
  // ======================================================

  const myAvatar =
    profileData?.avatar_url
      ? getMediaUrl(
          profileData.avatar_url
        )
      : null;

  // ======================================================
  // OTHER USERS ONLY
  // ======================================================

  const filteredFeed =
    useMemo(() => {
      return feed.filter(
        (item) =>
          String(
            item?.user?.id
          ) !==
          String(
            currentUserId
          )
      );
    }, [
      feed,
      currentUserId,
    ]);

  console.log(
    "CURRENT USER ID =>",
    currentUserId
  );

  console.log(
    "PROFILE AVATAR =>",
    profileData?.avatar_url
  );

  console.log(
    "STORY MY AVATAR =>",
    myAvatar
  );

  console.log(
    "FILTERED STORY FEED =>",
    filteredFeed
  );

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <View
        style={{
          height: 110,
          justifyContent:
            "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator
          size="small"
          color="#fff"
        />
      </View>
    );
  }

  // ======================================================
  // ERROR
  // ======================================================

  if (error) {
    return (
      <View
        style={{
          height: 110,
          justifyContent:
            "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "red",
          }}
        >
          Failed to load stories
        </Text>
      </View>
    );
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <View
      style={{
        height: 110,
      }}
    >
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
        data={filteredFeed}
        keyExtractor={(
          item,
          index
        ) =>
          item?.user?.id
            ? `story-${item.user.id}`
            : `story-${index}`
        }
        contentContainerStyle={{
          paddingHorizontal: 2,
        }}
        renderItem={({
          item,
        }) => {
          const avatarUrl =
            item?.user?.avatar_url
              ? getMediaUrl(
                  item.user
                    .avatar_url
                )
              : null;

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (
                  item?.user?.id
                ) {
                  router.push({
                    pathname:
                      "/stories/viewer",

                    params: {
                      userId:
                        String(
                          item.user.id
                        ),
                    },
                  });
                }
              }}
              style={{
                alignItems:
                  "center",
                marginHorizontal: 6,
              }}
            >
              <View
                style={{
                  width: 74,
                  height: 74,
                  borderRadius: 37,
                  borderWidth: 3,
                  borderColor:
                    item?.has_unseen
                      ? "#ff2d55"
                      : "#666",
                  justifyContent:
                    "center",
                  alignItems:
                    "center",
                }}
              >
                {avatarUrl ? (
                  <Image
                    source={{
                      uri: avatarUrl,
                    }}
                    style={{
                      width: 66,
                      height: 66,
                      borderRadius: 33,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: 66,
                      height: 66,
                      borderRadius: 33,
                      backgroundColor:
                        "#222",
                      justifyContent:
                        "center",
                      alignItems:
                        "center",
                    }}
                  >
                    <Text
                      style={{
                        color:
                          "#aaa",
                        fontSize: 24,
                        fontWeight:
                          "600",
                      }}
                    >
                      {(
                        item?.user
                          ?.username ||
                        "U"
                      )
                        .charAt(0)
                        .toUpperCase()}
                    </Text>
                  </View>
                )}
              </View>

              <Text
                numberOfLines={1}
                style={{
                  width: 75,
                  textAlign:
                    "center",
                  color: "#fff",
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                {item?.user
                  ?.username ||
                  ""}
              </Text>
            </TouchableOpacity>
          );
        }}
        ListHeaderComponent={
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (
                myStories.length >
                0
              ) {
                router.push(
                  "/stories/mine"
                );
              } else {
                router.push(
                  "/stories/create"
                );
              }
            }}
            style={{
              alignItems:
                "center",
              marginHorizontal: 6,
            }}
          >
            <View
              style={{
                width: 74,
                height: 74,
                borderRadius: 37,
                borderWidth: 3,
                borderColor:
                  myStories.length >
                  0
                    ? "#ff2d55"
                    : "#666",
                justifyContent:
                  "center",
                alignItems:
                  "center",
              }}
            >
              {myAvatar ? (
                <Image
                  source={{
                    uri: myAvatar,
                  }}
                  style={{
                    width: 66,
                    height: 66,
                    borderRadius: 33,
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 66,
                    height: 66,
                    borderRadius: 33,
                    backgroundColor:
                      "#222",
                    justifyContent:
                      "center",
                    alignItems:
                      "center",
                  }}
                >
                  <Text
                    style={{
                      color:
                        "#aaa",
                      fontSize: 26,
                      fontWeight:
                        "600",
                    }}
                  >
                    {(
                      profileData?.username ||
                      currentUser?.username ||
                      "U"
                    )
                      .charAt(0)
                      .toUpperCase()}
                  </Text>
                </View>
              )}

              {/* PLUS */}

              {myStories.length ===
                0 && (
                <View
                  style={{
                    position:
                      "absolute",
                    right: 0,
                    bottom: 0,
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor:
                      "#0095F6",
                    justifyContent:
                      "center",
                    alignItems:
                      "center",
                    borderWidth: 2,
                    borderColor:
                      "#000",
                  }}
                >
                  <Text
                    style={{
                      color:
                        "#fff",
                      fontSize: 16,
                      fontWeight:
                        "bold",
                      lineHeight: 18,
                    }}
                  >
                    +
                  </Text>
                </View>
              )}
            </View>

            <Text
              numberOfLines={1}
              style={{
                width: 75,
                textAlign:
                  "center",
                color: "#fff",
                fontSize: 12,
                marginTop: 4,
              }}
            >
              Your Story
            </Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}