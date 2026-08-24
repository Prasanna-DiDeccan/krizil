import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import * as MediaLibrary from "expo-media-library";

import { useEffect, useState } from "react";

import { router } from "expo-router";

export default function Gallery() {
  const [assets, setAssets] =
    useState([]);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery =
    async () => {
      const permission =
        await MediaLibrary.requestPermissionsAsync();

      if (
        !permission.granted
      )
        return;

      const result =
        await MediaLibrary.getAssetsAsync(
          {
            mediaType: "photo",
            first: 100,
          }
        );

      setAssets(result.assets);
    };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      <FlatList
        numColumns={3}
        data={assets}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({
          item,
        }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname:
                  "/stories/editor",
                params: {
                  uri: item.uri,
                },
              })
            }
          >
            <Image
              source={{
                uri: item.uri,
              }}
              style={{
                width: 130,
                height: 130,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}