import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function EditorTools({
  activeTool,
  setActiveTool,
}) {
  const tools = [
    {
      name: "Filter",
      icon: "color-filter-outline",
    },
    {
      name: "Adjust",
      icon: "options-outline",
    },
    {
      name: "Crop",
      icon: "crop-outline",
    },
  ];

  return (
    <View style={styles.container}>

      {tools.map((tool) => (
        <TouchableOpacity
          key={tool.name}
          style={styles.tool}
          onPress={() =>
            setActiveTool(tool.name)
          }
        >

          <View
            style={[
              styles.icon,
              activeTool === tool.name &&
                styles.activeIcon,
            ]}
          >
            <Ionicons
              name={tool.icon}
              size={24}
              color="#fff"
            />
          </View>

          <Text
            style={[
              styles.text,
              activeTool === tool.name &&
                styles.activeText,
            ]}
          >
            {tool.name}
          </Text>

        </TouchableOpacity>
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: "#0E0F17",

    borderTopWidth: 1,
    borderTopColor: "#20202A",

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    paddingBottom: 5,
  },

  tool: {
    alignItems: "center",
  },

  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",
  },

  activeIcon: {
    backgroundColor: "#8B5CF6",
  },

  text: {
    color: "#777",
    fontSize: 11,
    marginTop: 3,
  },

  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
});