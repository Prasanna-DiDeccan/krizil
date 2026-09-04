import React, {
  useState,
} from "react";

import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function MusicModal({
  visible,
  onClose,
  music,
  setMusic,
}) {
  const [search, setSearch] =
    useState("");

  /*
   * Replace with GET music API later.
   */
  const musicList = [
    {
      id: 1,
      title: "Original audio",
      artist: "Krizil",
      audio_url: "",
      start_seconds: 0,
    },
    {
      id: 2,
      title: "Trending sound",
      artist: "Popular artist",
      audio_url: "",
      start_seconds: 0,
    },
    {
      id: 3,
      title: "Summer vibes",
      artist: "Krizil Music",
      audio_url: "",
      start_seconds: 0,
    },
    {
      id: 4,
      title: "Night drive",
      artist: "Music Library",
      audio_url: "",
      start_seconds: 0,
    },
  ];

  const filtered =
    musicList.filter((item) =>
      `${item.title} ${item.artist}`
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const selectMusic = (item) => {
    setMusic(item);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>

        <View style={styles.modal}>

          <View style={styles.header}>

            <TouchableOpacity
              onPress={onClose}
            >
              <Ionicons
                name="close"
                size={27}
                color="#fff"
              />
            </TouchableOpacity>

            <Text style={styles.title}>
              Add music
            </Text>

            <View style={{ width: 27 }} />

          </View>

          <View style={styles.searchBox}>

            <Ionicons
              name="search"
              size={18}
              color="#777"
            />

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search music"
              placeholderTextColor="#777"
              style={styles.input}
            />

          </View>

          <FlatList
            data={filtered}
            keyExtractor={(item) =>
              String(item.id)
            }
            renderItem={({ item }) => {

              const selected =
                music?.id === item.id;

              return (
                <TouchableOpacity
                  style={styles.musicItem}
                  onPress={() =>
                    selectMusic(item)
                  }
                >

                  <View style={styles.musicIcon}>
                    <Ionicons
                      name="musical-notes"
                      size={22}
                      color="#fff"
                    />
                  </View>

                  <View
                    style={styles.musicInfo}
                  >
                    <Text
                      style={styles.musicTitle}
                    >
                      {item.title}
                    </Text>

                    <Text
                      style={styles.artist}
                    >
                      {item.artist}
                    </Text>
                  </View>

                  {selected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="#0095F6"
                    />
                  )}

                </TouchableOpacity>
              );
            }}
          />

        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor:
      "rgba(0,0,0,0.65)",
    justifyContent: "flex-end",
  },

  modal: {
    height: "75%",
    backgroundColor: "#111",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },

  header: {
    height: 58,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#252525",
  },

  title: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  searchBox: {
    margin: 15,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#222",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
    color: "#fff",
    marginLeft: 8,
  },

  musicItem: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  musicIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },

  musicInfo: {
    flex: 1,
    marginLeft: 12,
  },

  musicTitle: {
    color: "#fff",
    fontWeight: "600",
  },

  artist: {
    color: "#888",
    marginTop: 4,
  },
});