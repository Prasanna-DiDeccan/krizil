import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../src/theme/colors";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { loginUser } from "../../src/redux/authSlice";
import { saveTokens, saveUser } from "../../src/utils/storage";

export default function LoginScreen() {
  const router = useRouter();
const dispatch = useDispatch();
const [identifier, setIdentifier] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async () => {
  try {
    const response = await dispatch(
      loginUser({
        identifier,
        password,
      })
    ).unwrap();

    console.log("Login Response:", response);

    await saveTokens(
      response.access_token,
      response.refresh_token
    );

    await saveUser(response.user);

    Toast.show({
      type: "success",
      text1: "Login Successful",
    });

    router.replace("/(tabs)");
  } catch (error) {
    console.log("Login Error:", error);

    const errorMessage =
      typeof error?.detail === "string"
        ? error.detail
        : Array.isArray(error?.detail)
        ? error.detail[0]?.msg
        : "Incorrect email/phone or password";

    Toast.show({
      type: "error",
      text1: "Login Failed",
      text2: errorMessage,
    });
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Username / Email */}
        <TextInput
          style={styles.input}
          placeholder="Username, mobile number or email"
          placeholderTextColor={Colors.textMuted}
          value={identifier}
          onChangeText={setIdentifier}
        />

        {/* Password */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={Colors.textMuted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Login */}
        <TouchableOpacity
  activeOpacity={0.8}
  onPress={handleLogin}
>
  <LinearGradient
    colors={Colors.gradients.primary}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.gradientBtn}
  >
    <Text style={styles.loginText}>Log in</Text>
  </LinearGradient>
</TouchableOpacity>
        {/* Forgot */}
        <TouchableOpacity   onPress={() =>
    router.push("/forgot-password")
  }>
          <Text style={styles.forgotText}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        {/* Create Account */}
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => router.push("/username")}
        >
          <Text style={styles.createText}>
            Create new account
          </Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Krizil
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDefault,
    // backgroundColor: "#FFFFFF",
  },

  content: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 30,
    justifyContent: "center",
  },

  logo: {
    width: 90,
    height: 90,
    alignSelf: "center",
    marginBottom: 80,
    // marginTop: 100,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
    backgroundColor: Colors.bgInput,
    fontSize: 15,
    color: Colors.textPrimary,
    
  },

  gradientBtn: {
  width: "100%",
  height: 48,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 8,
},

  loginText: {
    color: Colors.textPrimary,
    fontWeight: "700",
    fontSize: 16,
  },

  forgotText: {
    textAlign: "center",
    marginTop: 20,
    color: Colors.textSecondary,
    fontWeight: "500",
  },

  createBtn: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "transparent",
  },

  createText: {
    color: Colors.primaryLight,
    fontWeight: "700",
    fontSize: 16,
  },

  footer: {
    textAlign: "center",
    marginBottom: 30,
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },
});