import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from "react-native";

import { router } from "expo-router";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  Ionicons,
  Feather,
} from "@expo/vector-icons";

import {
  deleteStory,
} from "../../src/redux/storySlice";

export default function MyStoryViewer() {
  const dispatch = useDispatch();

  const { myStories } =
    useSelector(
      (state) => state.stories
    );

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const story =
    myStories[currentIndex];

  useEffect(() => {
    if (!myStories.length) return;

    const timer = setTimeout(() => {
      if (
        currentIndex <
        myStories.length - 1
      ) {
        setCurrentIndex(
          (prev) => prev + 1
        );
      } else {
        router.back();
      }
    }, 5000);

    return () =>
      clearTimeout(timer);
  }, [currentIndex, myStories]);

  if (
    !myStories ||
    !myStories.length
  ) {
    return (
      <View style={styles.center}>
        <Text
          style={{
            color: "#fff",
          }}
        >
          No Stories
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Progress */}
      <View
        style={
          styles.progressContainer
        }
      >
        {myStories.map(
          (_, index) => (
            <View
              key={index}
              style={
                styles.progressTrack
              }
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    width:
                      index <=
                      currentIndex
                        ? "100%"
                        : "0%",
                  },
                ]}
              />
            </View>
          )
        )}
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text
          style={
            styles.headerTitle
          }
        >
          Your Story
        </Text>

        <TouchableOpacity
          onPress={() =>
            router.back()
          }
        >
          <Ionicons
            name="close"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Navigation */}
      <Pressable
        style={styles.leftArea}
        onPress={() => {
          if (
            currentIndex > 0
          ) {
            setCurrentIndex(
              currentIndex - 1
            );
          }
        }}
      />

      <Pressable
        style={styles.rightArea}
        onPress={() => {
          if (
            currentIndex <
            myStories.length - 1
          ) {
            setCurrentIndex(
              currentIndex + 1
            );
          }
        }}
      />

      {/* Story Image */}
      <Image
        source={{
          uri: story.media_url,
        }}
        style={
          styles.storyImage
        }
        resizeMode="contain"
      />

      {/* Bottom */}
      <View style={styles.bottom}>
        <View
          style={{
            flexDirection:
              "row",
            alignItems:
              "center",
          }}
        >
          <Feather
            name="eye"
            size={22}
            color="#fff"
          />

          <Text
            style={{
              color: "#fff",
              marginLeft: 8,
              fontSize: 16,
            }}
          >
            {
              story.views_count
            }
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            dispatch(
              deleteStory(
                story.id
              )
            );

            router.back();
          }}
        >
          <Ionicons
            name="trash-outline"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#000",
    },

    center: {
      flex: 1,
      justifyContent:
        "center",
      alignItems:
        "center",
      backgroundColor:
        "#000",
    },

    progressContainer: {
      flexDirection: "row",
      marginTop: 55,
      paddingHorizontal: 8,
      zIndex: 10,
    },

    progressTrack: {
      flex: 1,
      height: 3,
      marginHorizontal: 2,
      backgroundColor:
        "rgba(255,255,255,0.3)",
      borderRadius: 10,
    },

    progressFill: {
      height: 3,
      backgroundColor:
        "#fff",
      borderRadius: 10,
    },

    header: {
      position:
        "absolute",
      top: 70,
      left: 15,
      right: 15,
      zIndex: 20,

      flexDirection:
        "row",

      justifyContent:
        "space-between",

      alignItems:
        "center",
    },

    headerTitle: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600",
    },

    storyImage: {
      flex: 1,
      width: "100%",
    },

    leftArea: {
      position:
        "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: "50%",
      zIndex: 15,
    },

    rightArea: {
      position:
        "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: "50%",
      zIndex: 15,
    },

    bottom: {
      position:
        "absolute",
      bottom: 40,
      left: 20,
      right: 20,

      flexDirection:
        "row",

      justifyContent:
        "space-between",

      alignItems:
        "center",
    },
  });