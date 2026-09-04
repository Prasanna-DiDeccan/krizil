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
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
// import Toast from "react-native-toast-message";
import Toast from "react-native-root-toast";
import { forgotPassword } from "../../src/redux/authSlice";
import { Colors } from "../../src/theme/colors";

export default function ForgotPassword() {
  const [identifier, setIdentifier] =
    useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSendOtp = async () => {
    try {
        console.log("Sending OTP for:", identifier);
     const response = await dispatch(
        forgotPassword(identifier)
      ).unwrap();

      console.log("Forgot Password Response:", response);
      Toast.show({
        type: "success",
        text1: "OTP Sent",
      });

      router.push({
        pathname: "/verify-reset-otp",
        params: { identifier },
      });
    } catch (error) {
        console.log("Forgot Password Error:", error);
      Toast.show({
        type: "error",
        text1: "Failed",
        text2:
          error?.detail ||
          "Unable to send OTP",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          Trouble logging in?
        </Text>

        <Text style={styles.subtitle}>
          Enter your email, phone number or
          username and we'll send you a code
          to reset your password.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email, phone or username"
          placeholderTextColor="#8E8E93"
          value={identifier}
          onChangeText={setIdentifier}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSendOtp}
        >
          <Text style={styles.buttonText}>
            Send Code
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.replace("/(auth)/login")
          }
        >
          <Text style={styles.backText}>
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() =>
            router.push("/username")
          }
        >
          <Text style={styles.createText}>
            Create New Account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
  },

  logo: {
    width: 90,
    height: 90,
    alignSelf: "center",
    marginBottom: 30,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },

  subtitle: {
    color: "#A8A8A8",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 30,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#262626",
    backgroundColor: "#121212",
    borderRadius: 12,
    paddingHorizontal: 16,
    color: "#fff",
    marginBottom: 18,
  },

  button: {
    backgroundColor: "#0095F6",
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  backText: {
    color: "#0095F6",
    textAlign: "center",
    marginTop: 25,
    fontWeight: "600",
  },

  footer: {
    paddingBottom: 40,
    alignItems: "center",
  },

  createText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});