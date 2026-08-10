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
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import { Colors } from "../../src/theme/colors";
import { setSignupData } from "../../src/redux/authSlice";

export default function EmailPhoneScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [identifier, setIdentifier] =
    useState("");
const { signupData } = useSelector(
  (state) => state.auth
);

console.log("Redux Data:", signupData);

  const handleNext = () => {
    const formattedPhone = `+91${identifier}`;
    if (!identifier.trim()) {
      Toast.show({
        type: "error",
        text1: "Required",
        text2:
          "Enter email or phone number",
      });
      return;
    }

    dispatch(
      setSignupData({
        identifier: identifier.trim(),
      })
    );

    router.push("/password");
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
          What's your email or phone?
        </Text>

        <Text style={styles.subtitle}>
          Enter your email address or
          mobile number.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email or phone"
            placeholderTextColor={
              Colors.textMuted
            }
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
            keyboardType="email-address"
          />
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

  input: {
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