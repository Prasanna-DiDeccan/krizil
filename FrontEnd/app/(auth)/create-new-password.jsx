import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch } from "react-redux";
// import Toast from "react-native-toast-message";
// see notes in app/_layout.js for why.
import Toast from "react-native-root-toast";
import { Ionicons } from "@expo/vector-icons";

import { resetPassword } from "../../src/redux/authSlice";
import { Colors } from "../../src/theme/colors";

export default function CreateNewPassword() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { identifier, otp } =
    useLocalSearchParams();

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword,
    setShowConfirmPassword] = useState(false);

  const hasMinLength =
    password.length >= 8;

  const hasUpperCase =
    /[A-Z]/.test(password);

  const hasNumber =
    /\d/.test(password);

  const handleResetPassword =
    async () => {
      if (!password || !confirmPassword) {
        Toast.show({
          type: "error",
          text1: "Fill all fields",
        });
        return;
      }

      if (password !== confirmPassword) {
        Toast.show({
          type: "error",
          text1: "Passwords do not match",
        });
        return;
      }

      try {
        const response = await dispatch(
          resetPassword({
            identifier,
            otp,
            new_password: password,
          })
        ).unwrap();

        Toast.show({
          type: "success",
          text1: "Password Updated",
        });

        router.replace(
          "/(auth)/password-updated"
        );
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Reset Failed",
          text2:
            error?.detail ||
            "Try again",
        });
      }
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>
          Create New Password
        </Text>

        <Text style={styles.subtitle}>
          Create a strong password for your
          account
        </Text>

        {/* Password */}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#8E8E93"
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
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={20}
              color="#8E8E93"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#8E8E93"
            value={confirmPassword}
            onChangeText={
              setConfirmPassword
            }
            secureTextEntry={
              !showConfirmPassword
            }
          />

          <TouchableOpacity
            onPress={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            <Ionicons
              name={
                showConfirmPassword
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={20}
              color="#8E8E93"
            />
          </TouchableOpacity>
        </View>

        {/* Password Rules */}

        <View style={styles.rules}>
          <Text
            style={[
              styles.rule,
              hasMinLength &&
                styles.validRule,
            ]}
          >
            ✓ At least 8 characters
          </Text>

          <Text
            style={[
              styles.rule,
              hasUpperCase &&
                styles.validRule,
            ]}
          >
            ✓ One uppercase letter
          </Text>

          <Text
            style={[
              styles.rule,
              hasNumber &&
                styles.validRule,
            ]}
          >
            ✓ One number
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={
            handleResetPassword
          }
        >
          <Text style={styles.buttonText}>
            Reset Password
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.replace(
              "/(auth)/login"
            )
          }
        >
          <Text style={styles.backText}>
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Colors.bgDefault,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  logo: {
    width: 90,
    height: 90,
    alignSelf: "center",
    marginBottom: 25,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    color: "#A8A8A8",
    textAlign: "center",
    marginBottom: 30,
    fontSize: 14,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#262626",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
    height: 52,
  },

  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
  },

  rules: {
    marginTop: 10,
    marginBottom: 25,
  },

  rule: {
    color: "#8E8E93",
    marginBottom: 8,
    fontSize: 13,
  },

  validRule: {
    color: "#4CAF50",
  },

  button: {
    backgroundColor: "#2348FF",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  backText: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 25,
    fontWeight: "600",
  },
});