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
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { verifyOtp, resendOtp } from "../../src/redux/authSlice";
import {
  saveUser,
  saveTokens,
} from "../../src/utils/storage";

export default function OtpScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { identifier } = useLocalSearchParams();
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Toast.show({
        type: "error",
        text1: "Enter valid OTP",
      });
      return;
    }

    try {
      const response = await dispatch(
        verifyOtp({
          identifier,
          otp,
          purpose: "signup",
        })
      ).unwrap();
console.log(
  "AFTER VERIFY REDUX SHOULD HAVE USER",
  response.user
);
      console.log("Verify OTP Response", response);
     await saveTokens(
  response.access_token,
  response.refresh_token
);
setTimeout(() => {
  router.replace("/(tabs)");
}, 1500);

await saveUser(response.user);

      Toast.show({
        type: "success",
        text1: "Account Created",
      });

      router.replace("/(tabs)");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Invalid OTP",
      });
    }
  };

  const handleResendOtp = async () => {
  try {
    const response = await dispatch(
      resendOtp({
        identifier,
        purpose: "signup",
      })
    ).unwrap();

    console.log(
      "Resend OTP Response",
      response
    );

    Toast.show({
      type: "success",
      text1: "OTP Resent",
      text2: response.message,
    });

  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Failed to resend OTP",
    });
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back"
          size={26}
          color="#fff"
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>
          Enter confirmation code
        </Text>

        <Text style={styles.subtitle}>
          Enter the confirmation code we sent to
        </Text>

        <Text style={styles.email}>
          {identifier}
        </Text>

        <TextInput
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6}
          placeholder="------"
          placeholderTextColor="#666"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleVerify}
        >
          <Text style={styles.buttonText}>
            Next
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleResendOtp}>
          <Text style={styles.resend}>
            Resend code
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.change}>
            Change email address
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

  backButton: {
    marginLeft: 20,
    marginTop: 10,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
  },

  subtitle: {
    color: "#A8A8A8",
    fontSize: 15,
    lineHeight: 22,
  },

  email: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 35,
  },

  input: {
    height: 56,
    borderWidth: 1,
    borderColor: "#262626",
    borderRadius: 12,
    backgroundColor: "#121212",
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    letterSpacing: 10,
  },

  button: {
    height: 48,
    backgroundColor: "#0095F6",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  resend: {
    color: "#0095F6",
    textAlign: "center",
    marginTop: 24,
    fontSize: 15,
    fontWeight: "600",
  },

  change: {
    color: "#A8A8A8",
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
  },
});