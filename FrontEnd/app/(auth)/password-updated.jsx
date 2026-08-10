import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Colors } from "../../src/theme/colors";

export default function PasswordUpdated() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}

        <View style={styles.iconContainer}>
          <Ionicons
            name="checkmark"
            size={70}
            color="#22C55E"
          />
        </View>

        {/* Title */}

        <Text style={styles.title}>
          Password Updated!
        </Text>

        {/* Subtitle */}

        <Text style={styles.subtitle}>
          Your password has been changed
          successfully.
        </Text>

        {/* Continue Button */}

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.replace("/(auth)/login")
          }
        >
          <Text style={styles.buttonText}>
            Continue to Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDefault,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: "#A8A8A8",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },

  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#2348FF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});