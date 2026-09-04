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
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function TagPeopleModal({
  visible,
  onClose,
  selectedTags,
  setSelectedTags,
}) {
  const [search, setSearch] =
    useState("");

  /*
   * Replace this later with your
   * users search API.
   */
  const users = [
    {
      id: 1,
      username: "srinivas",
      full_name: "Srinivas",
      avatar_url: "",
    },
    {
      id: 2,
      username: "anjali",
      full_name: "Anjali",
      avatar_url: "",
    },
    {
      id: 3,
      username: "manasa",
      full_name: "Manasa",
      avatar_url: "",
    },
  ];

  const filteredUsers =
    users.filter((user) =>
      user.username
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const toggleUser = (user) => {
    const exists =
      selectedTags.some(
        (item) =>
          String(item.id) ===
          String(user.id)
      );

    if (exists) {
      setSelectedTags(
        selectedTags.filter(
          (item) =>
            String(item.id) !==
            String(user.id)
        )
      );
    } else {
      setSelectedTags([
        ...selectedTags,
        user,
      ]);
    }
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
                size={26}
                color="#fff"
              />
            </TouchableOpacity>

            <Text style={styles.title}>
              Tag people
            </Text>

            <TouchableOpacity
              onPress={onClose}
            >
              <Text style={styles.done}>
                Done
              </Text>
            </TouchableOpacity>

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
              placeholder="Search"
              placeholderTextColor="#777"
              style={styles.input}
            />

          </View>

          <FlatList
            data={filteredUsers}
            keyExtractor={(item) =>
              String(item.id)
            }
            renderItem={({ item }) => {

              const selected =
                selectedTags.some(
                  (tag) =>
                    String(tag.id) ===
                    String(item.id)
                );

              return (
                <TouchableOpacity
                  style={styles.user}
                  onPress={() =>
                    toggleUser(item)
                  }
                >

                  {item.avatar_url ? (
                    <Image
                      source={{
                        uri:
                          item.avatar_url,
                      }}
                      style={styles.avatar}
                    />
                  ) : (
                    <View
                      style={
                        styles.avatarPlaceholder
                      }
                    >
                      <Ionicons
                        name="person"
                        size={20}
                        color="#aaa"
                      />
                    </View>
                  )}

                  <View style={styles.userInfo}>
                    <Text
                      style={styles.username}
                    >
                      {item.username}
                    </Text>

                    <Text
                      style={styles.fullName}
                    >
                      {item.full_name}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.check,
                      selected &&
                        styles.checked,
                    ]}
                  >
                    {selected && (
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color="#fff"
                      />
                    )}
                  </View>

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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#252525",
  },

  title: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  done: {
    color: "#0095F6",
    fontWeight: "600",
  },

  searchBox: {
    margin: 15,
    height: 42,
    backgroundColor: "#222",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
    color: "#fff",
    marginLeft: 8,
  },

  user: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
  },

  avatarPlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },

  userInfo: {
    flex: 1,
    marginLeft: 12,
  },

  username: {
    color: "#fff",
    fontWeight: "600",
  },

  fullName: {
    color: "#888",
    marginTop: 2,
  },

  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#777",
    alignItems: "center",
    justifyContent: "center",
  },

  checked: {
    backgroundColor: "#0095F6",
    borderColor: "#0095F6",
  },
});