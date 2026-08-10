import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";

import { logout } from "../../src/redux/authSlice";

export default function SettingsActivity() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    Alert.alert(
      "Log out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log out",
          style: "destructive",
          onPress: async () => {
            try {
              await dispatch(logout()).unwrap();

              router.replace("/login");
            } catch (error) {
              // Storage is already cleared in the thunk.
              // Navigate to login even if API logout fails.
              router.replace("/login");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Settings and activity
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      {/* Settings */}

      <View style={styles.content}>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionIcon}>⚙</Text>

          <Text style={styles.optionText}>
            Settings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionIcon}>◷</Text>

          <Text style={styles.optionText}>
            Your activity
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionIcon}>🔒</Text>

          <Text style={styles.optionText}>
            Privacy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionIcon}>🔔</Text>

          <Text style={styles.optionText}>
            Notifications
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionIcon}>❤️</Text>

          <Text style={styles.optionText}>
            Favorites
          </Text>
        </TouchableOpacity>

        {/* Logout */}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" />
          ) : (
            <Text style={styles.logoutText}>
              Log out
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    height: 100,
    paddingTop: 45,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },

  backButton: {
    width: 45,
  },

  backIcon: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "300",
  },

  headerTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },

  headerSpacer: {
    width: 45,
  },

  content: {
    paddingTop: 15,
  },

  option: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  optionIcon: {
    color: "#fff",
    fontSize: 22,
    width: 45,
  },

  optionText: {
    color: "#fff",
    fontSize: 16,
  },

  logoutButton: {
    marginTop: 30,
    marginHorizontal: 20,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    alignItems: "center",
    justifyContent: "center",
  },

  logoutText: {
    color: "#ff3040",
    fontSize: 16,
    fontWeight: "600",
  },
});