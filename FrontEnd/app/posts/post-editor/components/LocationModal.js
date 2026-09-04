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

export default function LocationModal({
  visible,
  onClose,
  location,
  setLocation,
}) {
  const [search, setSearch] =
    useState("");

  const locations = [
    {
      id: 1,
      name: "Tirupati",
      latitude: 13.6288,
      longitude: 79.4192,
    },
    {
      id: 2,
      name: "Hyderabad",
      latitude: 17.385,
      longitude: 78.4867,
    },
    {
      id: 3,
      name: "Bangalore",
      latitude: 12.9716,
      longitude: 77.5946,
    },
  ];

  const filtered =
    locations.filter((item) =>
      item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

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
              Add location
            </Text>

            <View style={{ width: 27 }} />

          </View>

          <View style={styles.search}>

            <Ionicons
              name="search"
              size={18}
              color="#777"
            />

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search location"
              placeholderTextColor="#777"
              style={styles.input}
            />

          </View>

          <FlatList
            data={filtered}
            keyExtractor={(item) =>
              String(item.id)
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  setLocation(item);
                  onClose();
                }}
              >

                <Ionicons
                  name="location-outline"
                  size={25}
                  color="#fff"
                />

                <Text style={styles.name}>
                  {item.name}
                </Text>

                {location?.id === item.id && (
                  <Ionicons
                    name="checkmark"
                    size={22}
                    color="#0095F6"
                  />
                )}

              </TouchableOpacity>
            )}
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
    height: "70%",
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
  },

  title: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  search: {
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

  item: {
    height: 62,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  name: {
    flex: 1,
    color: "#fff",
    marginLeft: 14,
    fontSize: 15,
  },
});