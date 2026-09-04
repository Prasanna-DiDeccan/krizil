// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { useDispatch } from "react-redux";
// // import Toast from "react-native-toast-message";
// import Toast from "react-native-root-toast";
// import { verifyOtp, resendOtp } from "../../src/redux/authSlice";
// import {
//   saveUser,
//   saveTokens,
// } from "../../src/utils/storage";

// export default function OtpScreen() {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const { identifier } = useLocalSearchParams();
//   const [otp, setOtp] = useState("");

//  const handleVerify = async () => {
//   if (otp.length !== 6) {
//     Toast.show({
//       type: "error",
//       text1: "Enter valid OTP",
//     });
//     return;
//   }

//   try {
//     console.log("========== OTP VERIFY START ==========");
//     console.log("IDENTIFIER =>", identifier);
//     console.log("OTP =>", otp);

//     const response = await dispatch(
//       verifyOtp({
//         identifier,
//         otp,
//         purpose: "signup",
//       })
//     ).unwrap();

//     console.log("========== OTP VERIFY SUCCESS ==========");
//     console.log("VERIFY RESPONSE =>", response);
//     console.log("USER =>", response?.user);
//     console.log("ACCESS TOKEN EXISTS =>", !!response?.access_token);
//     console.log("REFRESH TOKEN EXISTS =>", !!response?.refresh_token);

//     if (!response?.access_token || !response?.refresh_token) {
//       throw new Error("Tokens are missing from verify OTP response");
//     }

//     await saveTokens(
//       response.access_token,
//       response.refresh_token
//     );

//     if (response.user) {
//       await saveUser(response.user);
//     }

//     Toast.show({
//       type: "success",
//       text1: "Account Created",
//     });

//     console.log("NAVIGATING TO TABS...");

//     router.replace("/(tabs)");

//   } catch (error) {
//     console.log("========== OTP VERIFY FAILED ==========");
//     console.log("ERROR =>", error);
//     console.log("ERROR MESSAGE =>", error?.message);
//     console.log("ERROR RESPONSE =>", error?.response?.data);

//     Toast.show({
//       type: "error",
//       text1: "OTP verification failed",
//       text2:
//         error?.message ||
//         "Please check the OTP and try again",
//     });
//   }
// };

//   const handleResendOtp = async () => {
//   try {
//     const response = await dispatch(
//       resendOtp({
//         identifier,
//         purpose: "signup",
//       })
//     ).unwrap();

//     console.log(
//       "Resend OTP Response",
//       response
//     );

//     Toast.show({
//       type: "success",
//       text1: "OTP Resent",
//       text2: response.message,
//     });

//   } catch (error) {
//     Toast.show({
//       type: "error",
//       text1: "Failed to resend OTP",
//     });
//   }
// };

//   return (
//     <SafeAreaView style={styles.container}>
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => router.back()}
//       >
//         <Ionicons
//           name="arrow-back"
//           size={26}
//           color="#fff"
//         />
//       </TouchableOpacity>

//       <View style={styles.content}>
//         <Text style={styles.title}>
//           Enter confirmation code
//         </Text>

//         <Text style={styles.subtitle}>
//           Enter the confirmation code we sent to
//         </Text>

//         <Text style={styles.email}>
//           {identifier}
//         </Text>

//         <TextInput
//           value={otp}
//           onChangeText={setOtp}
//           keyboardType="number-pad"
//           maxLength={6}
//           placeholder="------"
//           placeholderTextColor="#666"
//           style={styles.input}
//         />

//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleVerify}
//         >
//           <Text style={styles.buttonText}>
//             Next
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={handleResendOtp}>
//           <Text style={styles.resend}>
//             Resend code
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity>
//           <Text style={styles.change}>
//             Change email address
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//   },

//   backButton: {
//     marginLeft: 20,
//     marginTop: 10,
//   },

//   content: {
//     flex: 1,
//     paddingHorizontal: 24,
//     paddingTop: 50,
//   },

//   title: {
//     color: "#fff",
//     fontSize: 28,
//     fontWeight: "700",
//     marginBottom: 12,
//   },

//   subtitle: {
//     color: "#A8A8A8",
//     fontSize: 15,
//     lineHeight: 22,
//   },

//   email: {
//     color: "#fff",
//     fontSize: 15,
//     fontWeight: "600",
//     marginTop: 4,
//     marginBottom: 35,
//   },

//   input: {
//     height: 56,
//     borderWidth: 1,
//     borderColor: "#262626",
//     borderRadius: 12,
//     backgroundColor: "#121212",
//     color: "#fff",
//     fontSize: 24,
//     textAlign: "center",
//     letterSpacing: 10,
//   },

//   button: {
//     height: 48,
//     backgroundColor: "#0095F6",
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 24,
//   },

//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//   },

//   resend: {
//     color: "#0095F6",
//     textAlign: "center",
//     marginTop: 24,
//     fontSize: 15,
//     fontWeight: "600",
//   },

//   change: {
//     color: "#A8A8A8",
//     textAlign: "center",
//     marginTop: 16,
//     fontSize: 14,
//   },
// });


import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import { useDispatch } from "react-redux";

import Toast from "react-native-root-toast";

import {
  verifyOtp,
  resendOtp,
} from "../../src/redux/authSlice";

import {
  saveUser,
  saveTokens,
} from "../../src/utils/storage";

import ScreenLayout from "../../src/components/ScreenLayout";

import { Colors } from "../../src/theme/colors";

const { width } = Dimensions.get("window");

export default function OtpScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { identifier } =
    useLocalSearchParams();

  const [otp, setOtp] = useState("");

  // =====================================================
  // VERIFY OTP — FUNCTIONALITY UNCHANGED
  // =====================================================

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Toast.show({
        type: "error",
        text1: "Enter valid OTP",
      });
      return;
    }

    try {
      console.log(
        "========== OTP VERIFY START =========="
      );

      console.log(
        "IDENTIFIER =>",
        identifier
      );

      console.log(
        "OTP =>",
        otp
      );

      const response = await dispatch(
        verifyOtp({
          identifier,
          otp,
          purpose: "signup",
        })
      ).unwrap();

      console.log(
        "========== OTP VERIFY SUCCESS =========="
      );

      console.log(
        "VERIFY RESPONSE =>",
        response
      );

      console.log(
        "USER =>",
        response?.user
      );

      console.log(
        "ACCESS TOKEN EXISTS =>",
        !!response?.access_token
      );

      console.log(
        "REFRESH TOKEN EXISTS =>",
        !!response?.refresh_token
      );

      if (
        !response?.access_token ||
        !response?.refresh_token
      ) {
        throw new Error(
          "Tokens are missing from verify OTP response"
        );
      }

      await saveTokens(
        response.access_token,
        response.refresh_token
      );

      if (response.user) {
        await saveUser(
          response.user
        );
      }

      Toast.show({
        type: "success",
        text1: "Account Created",
      });

      console.log(
        "NAVIGATING TO TABS..."
      );

      router.replace("/(tabs)");

    } catch (error) {
      console.log(
        "========== OTP VERIFY FAILED =========="
      );

      console.log(
        "ERROR =>",
        error
      );

      console.log(
        "ERROR MESSAGE =>",
        error?.message
      );

      console.log(
        "ERROR RESPONSE =>",
        error?.response?.data
      );

      Toast.show({
        type: "error",
        text1:
          "OTP verification failed",
        text2:
          error?.message ||
          "Please check the OTP and try again",
      });
    }
  };

  // =====================================================
  // RESEND OTP — FUNCTIONALITY UNCHANGED
  // =====================================================

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
        text1:
          "Failed to resend OTP",
      });
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <ScreenLayout
      backgroundColor={
        Colors.bgDefault
      }
      scroll={false}
    >
      <View style={styles.screen}>

        {/* =================================================
            BACKGROUND WAVES
        ================================================= */}

        <View
          pointerEvents="none"
          style={styles.background}
        >
          <View style={styles.waveOne} />
          <View style={styles.waveTwo} />
          <View style={styles.waveThree} />
          <View style={styles.waveFour} />
          <View style={styles.waveFive} />
        </View>

        {/* =================================================
            HEADER
        ================================================= */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() =>
              router.back()
            }
          >
            <Ionicons
              name="chevron-back"
              size={27}
              color={
                Colors.textPrimary
              }
            />
          </TouchableOpacity>
        </View>

        {/* =================================================
            LOGO
        ================================================= */}

        <View
          style={styles.logoContainer}
        >
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.logoText}>
            Krizil
          </Text>
        </View>

        {/* =================================================
            TITLE
        ================================================= */}

        <Text style={styles.title}>
          Enter confirmation code
        </Text>

        {/* =================================================
            SUBTITLE
        ================================================= */}

        <Text style={styles.subtitle}>
          Enter the confirmation code
          {"\n"}
          we sent to
        </Text>

        {/* =================================================
            IDENTIFIER
        ================================================= */}

        <Text
          style={styles.identifier}
          numberOfLines={1}
        >
          {identifier}
        </Text>

        {/* =================================================
            OTP INPUT
        ================================================= */}

        <View style={styles.otpContainer}>

          <TextInput
            value={otp}
            onChangeText={(text) =>
              setOtp(
                text.replace(
                  /[^0-9]/g,
                  ""
                )
              )
            }
            keyboardType="number-pad"
            maxLength={6}
            placeholder="------"
            placeholderTextColor={
              Colors.textMuted
            }
            style={styles.otpInput}
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
          />

        </View>

        {/* =================================================
            VERIFY BUTTON
        ================================================= */}

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleVerify}
        >
          <LinearGradient
            colors={[
              "#D62CC9",
              "#B62BD8",
              "#9F2BEF",
            ]}
            start={{
              x: 0,
              y: 0,
            }}
            end={{
              x: 1,
              y: 0,
            }}
            style={styles.button}
          >
            <Text
              style={
                styles.buttonText
              }
            >
              Continue
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* =================================================
            RESEND
        ================================================= */}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={
            handleResendOtp
          }
        >
          <Text
            style={styles.resend}
          >
            Resend code
          </Text>
        </TouchableOpacity>

        {/* =================================================
            CHANGE IDENTIFIER
        ================================================= */}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            router.back()
          }
        >
          <Text
            style={styles.change}
          >
            Change email or phone
          </Text>
        </TouchableOpacity>

      </View>
    </ScreenLayout>
  );
}

// =========================================================
// STYLES
// =========================================================

const styles = StyleSheet.create({

  screen: {
    flex: 1,

    paddingHorizontal: 24,

    paddingTop: 5,

    paddingBottom: 12,

    position: "relative",

    overflow: "hidden",
  },

  // =======================================================
  // BACKGROUND
  // =======================================================

  background: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor:
      Colors.bgDefault,

    overflow: "hidden",
  },

  waveOne: {
    position: "absolute",

    width: width * 1.75,

    height: width * 0.68,

    borderRadius: 999,

    borderWidth: 1,

    borderColor:
      "rgba(124,58,237,0.15)",

    left: -width * 0.60,

    bottom: -width * 0.10,

    transform: [
      {
        rotate: "-8deg",
      },
    ],
  },

  waveTwo: {
    position: "absolute",

    width: width * 1.62,

    height: width * 0.61,

    borderRadius: 999,

    borderWidth: 1,

    borderColor:
      "rgba(159,103,255,0.13)",

    left: -width * 0.50,

    bottom: -width * 0.03,

    transform: [
      {
        rotate: "-8deg",
      },
    ],
  },

  waveThree: {
    position: "absolute",

    width: width * 1.49,

    height: width * 0.55,

    borderRadius: 999,

    borderWidth: 1,

    borderColor:
      "rgba(124,58,237,0.14)",

    left: -width * 0.40,

    bottom: width * 0.05,

    transform: [
      {
        rotate: "-8deg",
      },
    ],
  },

  waveFour: {
    position: "absolute",

    width: width * 1.36,

    height: width * 0.49,

    borderRadius: 999,

    borderWidth: 1,

    borderColor:
      "rgba(159,103,255,0.10)",

    left: -width * 0.30,

    bottom: width * 0.13,

    transform: [
      {
        rotate: "-8deg",
      },
    ],
  },

  waveFive: {
    position: "absolute",

    width: width * 1.23,

    height: width * 0.43,

    borderRadius: 999,

    borderWidth: 1,

    borderColor:
      "rgba(124,58,237,0.08)",

    left: -width * 0.20,

    bottom: width * 0.21,

    transform: [
      {
        rotate: "-8deg",
      },
    ],
  },

  // =======================================================
  // HEADER
  // =======================================================

  header: {
    height: 40,

    justifyContent: "center",
  },

  backButton: {
    width: 40,

    height: 40,

    justifyContent: "center",

    alignItems: "flex-start",
  },

  // =======================================================
  // LOGO
  // =======================================================

  logoContainer: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    marginTop: 18,

    marginBottom: 31,
  },

  logo: {
    width: 42,

    height: 42,

    marginRight: 8,
  },

  logoText: {
    color:
      Colors.textPrimary,

    fontSize: 25,

    fontWeight: "700",

    letterSpacing: -0.4,
  },

  // =======================================================
  // TITLE
  // =======================================================

  title: {
    color:
      Colors.textPrimary,

    fontSize: 24,

    lineHeight: 29,

    fontWeight: "700",

    textAlign: "center",

    letterSpacing: -0.3,

    marginBottom: 9,
  },

  // =======================================================
  // SUBTITLE
  // =======================================================

  subtitle: {
    color:
      Colors.textSecondary,

    fontSize: 14,

    lineHeight: 20,

    textAlign: "center",

    marginBottom: 3,
  },

  // =======================================================
  // IDENTIFIER
  // =======================================================

  identifier: {
    color:
      Colors.textPrimary,

    fontSize: 14,

    lineHeight: 20,

    fontWeight: "600",

    textAlign: "center",

    marginBottom: 22,

    paddingHorizontal: 20,
  },

  // =======================================================
  // OTP
  // =======================================================

  otpContainer: {
    width: "100%",

    height: 52,

    backgroundColor:
      "rgba(30,30,46,0.55)",

    borderWidth: 1,

    borderColor:
      Colors.borderDefault,

    borderRadius: 8,

    justifyContent: "center",

    marginBottom: 17,
  },

  otpInput: {
    width: "100%",

    height: 52,

    color:
      Colors.textPrimary,

    fontSize: 22,

    fontWeight: "600",

    textAlign: "center",

    letterSpacing: 8,

    paddingHorizontal: 12,
  },

  // =======================================================
  // BUTTON
  // =======================================================

  button: {
    width: "100%",

    height: 53,

    borderRadius: 8,

    justifyContent: "center",

    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",

    fontSize: 16,

    fontWeight: "700",

    letterSpacing: 0.1,
  },

  // =======================================================
  // RESEND
  // =======================================================

  resend: {
    color:
      Colors.primaryLight,

    textAlign: "center",

    fontSize: 14,

    fontWeight: "600",

    marginTop: 20,
  },

  // =======================================================
  // CHANGE
  // =======================================================

  change: {
    color:
      Colors.textSecondary,

    textAlign: "center",

    fontSize: 13,

    marginTop: 13,
  },
});