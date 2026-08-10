import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

import { Colors } from "../../src/theme/colors";
import { setSignupData } from "../../src/redux/authSlice";

export default function PasswordScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [password, setPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const handleNext = () => {
    if (!password.trim()) {
      Toast.show({
        type: "error",
        text1: "Password Required",
        text2: "Please enter a password",
      });
      return;
    }

    if (password.length < 8) {
      Toast.show({
        type: "error",
        text1: "Invalid Password",
        text2:
          "Password must be at least 8 characters",
      });
      return;
    }

    dispatch(
      setSignupData({
        password,
      })
    );

    router.push("/birthday");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={26}
            color={Colors.textPrimary}
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          Create a password
        </Text>

        <Text style={styles.subtitle}>
          Your password must be at least
          8 characters long.
        </Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={
                Colors.textMuted
              }
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity
              onPress={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              <Ionicons
                name={
                  showPassword
                    ? "eye-off"
                    : "eye"
                }
                size={24}
                color={
                  Colors.textSecondary
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleNext}
        >
          <LinearGradient
            colors={
              Colors.gradients.primary
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Next
            </Text>
          </LinearGradient>
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
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  backBtn: {
    width: 45,
    height: 45,
    justifyContent: "center",
  },

  title: {
    color: Colors.textPrimary,
    fontSize: 32,
    fontWeight: "700",
    marginTop: 20,
  },

  subtitle: {
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
    marginBottom: 35,
  },

  inputContainer: {
    backgroundColor: Colors.bgInput,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 18,
    height: 50,
  },

  button: {
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});