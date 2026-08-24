import React, {
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import AllContentGrid from "./AllContentGrid";
import ReelsGrid from "./ReelsGrid";

export default function ProfileTabs() {
  const [
    activeTab,
    setActiveTab,
  ] = useState("all");

  return (
    <View style={styles.wrapper}>

      {/* ==================================================
          TABS
      ================================================== */}

      <View style={styles.container}>

        {/* ==================================================
            ALL
        ================================================== */}

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "all" &&
              styles.activeTab,
          ]}
          onPress={() =>
            setActiveTab("all")
          }
          activeOpacity={0.8}
        >
          <Ionicons
            name="grid-outline"
            size={24}
            color={
              activeTab === "all"
                ? "#A855F7"
                : "#7E7E89"
            }
          />
        </TouchableOpacity>

        {/* ==================================================
            REELS
        ================================================== */}

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "reels" &&
              styles.activeTab,
          ]}
          onPress={() =>
            setActiveTab("reels")
          }
          activeOpacity={0.8}
        >
          <Ionicons
            name="play-circle-outline"
            size={25}
            color={
              activeTab === "reels"
                ? "#A855F7"
                : "#7E7E89"
            }
          />
        </TouchableOpacity>

        {/* ==================================================
            TAGGED
        ================================================== */}

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "tagged" &&
              styles.activeTab,
          ]}
          onPress={() =>
            setActiveTab("tagged")
          }
          activeOpacity={0.8}
        >
          <Ionicons
            name="person-outline"
            size={24}
            color={
              activeTab === "tagged"
                ? "#A855F7"
                : "#7E7E89"
            }
          />
        </TouchableOpacity>

      </View>

      {/* ==================================================
          ALL = POSTS + REELS
      ================================================== */}

      {activeTab === "all" && (
        <AllContentGrid />
      )}

      {/* ==================================================
          REELS ONLY
      ================================================== */}

      {activeTab === "reels" && (
        <ReelsGrid />
      )}

      {/* ==================================================
          TAGGED
      ================================================== */}

      {activeTab === "tagged" && (
        <View style={styles.empty}>

          <Ionicons
            name="person-outline"
            size={42}
            color="#555"
          />

          <Text
            style={styles.emptyText}
          >
            No tagged posts yet
          </Text>

        </View>
      )}

    </View>
  );
}

const styles =
  StyleSheet.create({

    wrapper: {
      width: "100%",
      backgroundColor: "#080913",
    },

    container: {
      flexDirection: "row",

      marginTop: 18,

      borderTopWidth: 1,
      borderBottomWidth: 1,

      borderColor: "#24242D",

      backgroundColor: "#080913",
    },

    tab: {
      flex: 1,

      height: 55,

      justifyContent: "center",
      alignItems: "center",
    },

    activeTab: {
      borderBottomWidth: 3,
      borderBottomColor: "#A855F7",
    },

    empty: {
      minHeight: 220,

      justifyContent: "center",
      alignItems: "center",

      backgroundColor: "#080913",
    },

    emptyText: {
      color: "#777",

      fontSize: 14,

      marginTop: 10,
    },

  });