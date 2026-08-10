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
import { Colors } from "../../src/theme/colors";

export default function VerifyResetOtp() {
  const router = useRouter();

  const { identifier } = useLocalSearchParams();

  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp.length !== 6) return;

    router.push({
      pathname: "/(auth)/create-new-password",
      params: {
        identifier,
        otp,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>
          Enter Verification Code
        </Text>

        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to
        </Text>

        <Text style={styles.email}>
          {identifier}
        </Text>

        <TextInput
          style={styles.otpInput}
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6}
          placeholder="------"
          placeholderTextColor="#666"
        />

        <TouchableOpacity
          style={[
            styles.button,
            otp.length < 6 && {
              opacity: 0.5,
            },
          ]}
          disabled={otp.length < 6}
          onPress={handleVerify}
        >
          <Text style={styles.buttonText}>
            Verify
          </Text>
        </TouchableOpacity>

<TouchableOpacity>
  <Text style={styles.resend}>
    Didn't receive code? Resend
  </Text>
</TouchableOpacity>

<View style={styles.dividerContainer}>
  <View style={styles.divider} />
  <Text style={styles.dividerText}>OR</Text>
  <View style={styles.divider} />
</View>

<TouchableOpacity
  onPress={() =>
    router.replace("/(auth)/login")
  }
>
  <Text style={styles.back}>
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
    backgroundColor: Colors.bgDefault,
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
    fontSize: 14,
    textAlign: "center",
  },

  email: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
    marginTop: 5,
    marginBottom: 35,
  },

  otpInput: {
    height: 60,
    borderWidth: 1,
    borderColor: "#262626",
    backgroundColor: "#121212",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 28,
    letterSpacing: 12,
    color: "#FFFFFF",
    marginBottom: 25,
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

  resend: {
    color: "#2348FF",
    textAlign: "center",
    marginTop: 25,
    fontWeight: "600",
  },

  back: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 25,
    fontWeight: "600",
  },
  dividerContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 25,
},

divider: {
  flex: 1,
  height: 1,
  backgroundColor: "#262626",
},

dividerText: {
  color: "#8E8E93",
  marginHorizontal: 12,
  fontSize: 12,
  fontWeight: "600",
},
});