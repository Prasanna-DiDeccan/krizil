import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { useRouter } from "expo-router";

import { logout } from "../../src/redux/authSlice";

import { Ionicons } from "@expo/vector-icons";

import ScreenLayout from "../../src/components/ScreenLayout";

export default function SettingsActivity() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.auth
  );

  // ==========================================
  // BACK
  // ==========================================

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/profile");
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

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
              await dispatch(
                logout()
              ).unwrap();

              router.replace("/login");
            } catch (error) {
              console.log(
                "LOGOUT ERROR =>",
                error
              );

              // Storage is already cleared
              // in the logout thunk.
              router.replace("/login");
            }
          },
        },
      ]
    );
  };

  // ==========================================
  // OPTION COMPONENT
  // ==========================================

  const SettingsOption = ({
    icon,
    label,
    onPress,
    danger = false,
  }) => {
    return (
      <TouchableOpacity
        style={styles.option}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name={icon}
            size={25}
            color={
              danger
                ? "#ff3040"
                : "#fff"
            }
          />
        </View>

        <Text
          style={[
            styles.optionText,
            danger && styles.dangerText,
          ]}
        >
          {label}
        </Text>

        {onPress && !danger ? (
          <Ionicons
            name="chevron-forward"
            size={22}
            color="#8e8e93"
            style={styles.chevron}
          />
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <ScreenLayout
      backgroundColor="#000"
      keyboardAvoid={false}
      header={
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          }}
          activeOpacity={0.7}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Settings and activity
        </Text>

        <View style={styles.headerSpacer} />
      </View>
    }
  
    >
      {/* ======================================
          HEADER
      ====================================== */}

      {/* <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Settings and activity
        </Text>

        <View style={styles.headerSpacer} />
      </View> */}

      {/* ======================================
          CONTENT
      ====================================== */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >

        {/* ====================================
            SETTINGS
        ==================================== */}
{/* 
        <Text style={styles.sectionTitle}>
          Settings
        </Text> */}

        <SettingsOption
          icon="settings-outline"
          label="Settings"
        />

        <SettingsOption
          icon="time-outline"
          label="Your activity"
        />

        <SettingsOption
          icon="lock-closed-outline"
          label="Privacy"
        />

        <SettingsOption
          icon="notifications-outline"
          label="Notifications"
        />

        {/* ====================================
            HOW YOU USE KRIZIL
        ==================================== */}

        <Text
          style={[
            styles.sectionTitle,
            styles.sectionSpacing,
          ]}
        >
          How you use Krizil
        </Text>

        {/* SAVED */}

        <SettingsOption
          icon="bookmark-outline"
          label="Saved"
          onPress={() => {
            router.push(
              "/profile-screens/saved"
            );
          }}
        />

        <SettingsOption
  icon="time-outline"
  label="Watch history"
  onPress={() => {
    router.push(
      "/profile-screens/watch-history"
    );
  }}
/>

        {/* ARCHIVE */}

        <SettingsOption
          icon="archive-outline"
          label="Archive"
        />

        {/* ACTIVITY */}

        <SettingsOption
          icon="pulse-outline"
          label="Your activity"
        />

        {/* ====================================
            ACCOUNT
        ==================================== */}

        <Text
          style={[
            styles.sectionTitle,
            styles.sectionSpacing,
          ]}
        >
          Account
        </Text>

        <SettingsOption
          icon="person-outline"
          label="Edit profile"
          onPress={() => {
            router.push(
              "/profile-screens/edit-profile"
            );
          }}
        />

        <SettingsOption
          icon="key-outline"
          label="Password and security"
        />

        {/* ====================================
            LOGOUT
        ==================================== */}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={loading}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#ff3040"
            />
          ) : (
            <Text style={styles.logoutText}>
              Log out
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.bottomSpace} />

      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  // ==========================================
  // CONTAINER
  // ==========================================

  // container: {
  //   flex: 1,
  //   backgroundColor: "#000",
  // },

  // ==========================================
  // HEADER
  // ==========================================

  header: {
    height: 60,
    // paddingTop: 45,
    paddingHorizontal: 15,

    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 0.5,
    borderBottomColor: "#252525",
  },

  backButton: {
    width: 45,
    alignItems: "flex-start",
    justifyContent: "center",
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

  // ==========================================
  // SCROLL
  // ==========================================

  scrollContent: {
    paddingTop: 10,
    paddingBottom: 100,
  },

  // ==========================================
  // SECTION TITLE
  // ==========================================

  sectionTitle: {
    color: "#8e8e93",

    fontSize: 15,
    fontWeight: "600",

    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5,
  },

  sectionSpacing: {
    marginTop: 15,
  },

  // ==========================================
  // OPTION
  // ==========================================

  option: {
    minHeight: 60,

    paddingHorizontal: 20,

    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 45,

    alignItems: "flex-start",
    justifyContent: "center",
  },

  optionText: {
    flex: 1,

    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
  },

  chevron: {
    marginLeft: 10,
  },

  dangerText: {
    color: "#ff3040",
  },

  // ==========================================
  // LOGOUT
  // ==========================================

  logoutButton: {
    marginTop: 30,
    marginHorizontal: 20,

    height: 50,

    borderRadius: 8,

    borderWidth: 1,
    borderColor: "#333",

    alignItems: "center",
    justifyContent: "center",
  },

  logoutText: {
    color: "#ff3040",

    fontSize: 16,
    fontWeight: "600",
  },

  // ==========================================
  // BOTTOM SPACE
  // ==========================================

  bottomSpace: {
    height: 40,
  },
});
