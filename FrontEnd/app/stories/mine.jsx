import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import {
  deleteStory,
  getMyStories,
} from "../../src/redux/storySlice";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function Mine() {
  const dispatch = useDispatch();

  const { myStories = [] } = useSelector(
    (state) => state.stories
  );

  const [currentIndex, setCurrentIndex] =
    useState(0);

  useEffect(() => {
    dispatch(getMyStories());
  }, []);

  const currentStory =
    myStories?.[currentIndex];

  const goHome = () => {
    router.replace("/(tabs)");
  };

  useEffect(() => {
    if (!myStories.length) {
      goHome();
      return;
    }

    const timer = setTimeout(() => {
      if (
        currentIndex <
        myStories.length - 1
      ) {
        setCurrentIndex(
          (prev) => prev + 1
        );
      } else {
        goHome();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, myStories]);

  const handleDelete = () => {
    Alert.alert(
      "Delete Story",
      "Are you sure you want to delete this story?",
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
                deleteStory(
                  currentStory.id
                )
              ).unwrap();

              const result =
                await dispatch(
                  getMyStories()
                ).unwrap();

              const stories =
                result?.items || [];

              if (!stories.length) {
                goHome();
                return;
              }

              if (
                currentIndex >=
                stories.length
              ) {
                setCurrentIndex(
                  stories.length - 1
                );
              }
            } catch (error) {
              console.log(
                "DELETE STORY ERROR",
                error
              );
            }
          },
        },
      ]
    );
  };

  if (!currentStory) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
        }}
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
      style={{
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      {/* Progress Bars */}
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          top: 50,
          left: 10,
          right: 10,
          zIndex: 10,
        }}
      >
        {myStories.map(
          (_, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                height: 3,
                marginHorizontal: 2,
                backgroundColor:
                  index <=
                  currentIndex
                    ? "#fff"
                    : "rgba(255,255,255,0.3)",
              }}
            />
          )
        )}
      </View>

      <Image
        source={{
          uri: currentStory.media_url,
        }}
        resizeMode="cover"
        style={{
          width,
          height,
        }}
      />

      {/* Top Header */}
      <View
        style={{
          position: "absolute",
          top: 70,
          left: 15,
          right: 15,
          flexDirection: "row",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={goHome}
        >
          <Ionicons
            name="close"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDelete}
        >
          <Ionicons
            name="trash-outline"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Caption + Views */}
      <View
        style={{
          position: "absolute",
          bottom: 40,
          left: 20,
          right: 20,
        }}
      >
        {!!currentStory.caption && (
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
            }}
          >
            {currentStory.caption}
          </Text>
        )}

        <Text
          style={{
            color: "#ccc",
            marginTop: 8,
          }}
        >
          👁️ {currentStory.views_count || 0} views
        </Text>
      </View>
    </View>
  );
}