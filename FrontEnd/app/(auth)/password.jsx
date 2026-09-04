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
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import { useDispatch } from "react-redux";
// // import Toast from "react-native-toast-message";
// import Toast from "react-native-root-toast";

// import { Colors } from "../../src/theme/colors";
// import { setSignupData } from "../../src/redux/authSlice";

// export default function PasswordScreen() {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const [password, setPassword] =
//     useState("");
//   const [showPassword, setShowPassword] =
//     useState(false);

//   const handleNext = () => {
//     if (!password.trim()) {
//       Toast.show({
//         type: "error",
//         text1: "Password Required",
//         text2: "Please enter a password",
//       });
//       return;
//     }

//     if (password.length < 8) {
//       Toast.show({
//         type: "error",
//         text1: "Invalid Password",
//         text2:
//           "Password must be at least 8 characters",
//       });
//       return;
//     }

//     dispatch(
//       setSignupData({
//         password,
//       })
//     );

//     router.push("/birthday");
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         <TouchableOpacity
//           style={styles.backBtn}
//           onPress={() => router.back()}
//         >
//           <Ionicons
//             name="arrow-back"
//             size={26}
//             color={Colors.textPrimary}
//           />
//         </TouchableOpacity>

//         <Text style={styles.title}>
//           Create a password
//         </Text>

//         <Text style={styles.subtitle}>
//           Your password must be at least
//           8 characters long.
//         </Text>

//         <View style={styles.inputContainer}>
//           <View style={styles.inputRow}>
//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               placeholderTextColor={
//                 Colors.textMuted
//               }
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry={!showPassword}
//             />

//             <TouchableOpacity
//               onPress={() =>
//                 setShowPassword(
//                   !showPassword
//                 )
//               }
//             >
//               <Ionicons
//                 name={
//                   showPassword
//                     ? "eye-off"
//                     : "eye"
//                 }
//                 size={24}
//                 color={
//                   Colors.textSecondary
//                 }
//               />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={handleNext}
//         >
//           <LinearGradient
//             colors={
//               Colors.gradients.primary
//             }
//             style={styles.button}
//           >
//             <Text style={styles.buttonText}>
//               Next
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.bgDefault,
//   },

//   content: {
//     flex: 1,
//     paddingHorizontal: 24,
//     paddingTop: 20,
//   },

//   backBtn: {
//     width: 45,
//     height: 45,
//     justifyContent: "center",
//   },

//   title: {
//     color: Colors.textPrimary,
//     fontSize: 32,
//     fontWeight: "700",
//     marginTop: 20,
//   },

//   subtitle: {
//     color: Colors.textSecondary,
//     fontSize: 16,
//     lineHeight: 24,
//     marginTop: 12,
//     marginBottom: 35,
//   },

//   inputContainer: {
//     backgroundColor: Colors.bgInput,
//     borderWidth: 1,
//     borderColor: Colors.borderDefault,
//     borderRadius: 16,
//     paddingHorizontal: 18,
//     paddingVertical: 8,
//   },

//   inputRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   input: {
//     flex: 1,
//     color: Colors.textPrimary,
//     fontSize: 18,
//     height: 50,
//   },

//   button: {
//     height: 55,
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 35,
//   },

//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
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

import { useRouter } from "expo-router";

import { useDispatch } from "react-redux";

import Toast from "react-native-root-toast";

import ScreenLayout from "../../src/components/ScreenLayout";

import { Colors } from "../../src/theme/colors";

import { setSignupData } from "../../src/redux/authSlice";

const { width } = Dimensions.get("window");

export default function PasswordScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  /* =====================================================
     PASSWORD VALIDATION
     FUNCTIONALITY UNCHANGED
  ===================================================== */

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

  /* =====================================================
     PASSWORD STRENGTH
  ===================================================== */

  const getPasswordStrength = () => {
    if (!password) {
      return {
        label: "",
        level: 0,
      };
    }

    let score = 0;

    if (password.length >= 8) {
      score++;
    }

    if (/[A-Z]/.test(password)) {
      score++;
    }

    if (/[0-9]/.test(password)) {
      score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score++;
    }

    if (score >= 3) {
      return {
        label: "Strong",
        level: 3,
      };
    }

    if (score >= 2) {
      return {
        label: "Medium",
        level: 2,
      };
    }

    return {
      label: "Weak",
      level: 1,
    };
  };

  const strength = getPasswordStrength();

  return (
    <ScreenLayout
      backgroundColor={Colors.bgDefault}
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
            BACK BUTTON
        ================================================= */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Ionicons
              name="chevron-back"
              size={27}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>
        </View>

        {/* =================================================
            LOGO
        ================================================= */}

        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* <Text style={styles.logoText}>
            Krizil
          </Text> */}
        </View>

        {/* =================================================
            TITLE
        ================================================= */}

        <Text style={styles.title}>
          Create a password
        </Text>

        {/* =================================================
            SUBTITLE
        ================================================= */}

        <Text style={styles.subtitle}>
          Your password should be at least
        </Text>

        <Text style={styles.subtitleSecond}>
          8 characters.
        </Text>

        {/* =================================================
            PASSWORD INPUT
        ================================================= */}

        <View style={styles.passwordContainer}>

          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor={
              Colors.textMuted
            }
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={styles.eyeButton}
            activeOpacity={0.7}
            onPress={() =>
              setShowPassword(!showPassword)
            }
          >
            <Ionicons
              name={
                showPassword
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={22}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>

        </View>

        {/* =================================================
            PASSWORD STRENGTH
        ================================================= */}

        {password.length > 0 && (
          <View style={styles.strengthContainer}>

            <View style={styles.strengthTextRow}>

              <Text style={styles.strengthLabel}>
                Password strength:
              </Text>

              <Text
                style={[
                  styles.strengthValue,
                  strength.level === 1 &&
                    styles.weakText,
                  strength.level === 2 &&
                    styles.mediumText,
                  strength.level === 3 &&
                    styles.strongText,
                ]}
              >
                {strength.label}
              </Text>

            </View>

            <View style={styles.strengthBars}>

              <View
                style={[
                  styles.strengthBar,
                  strength.level >= 1 &&
                    styles.activeBar,
                ]}
              />

              <View
                style={[
                  styles.strengthBar,
                  strength.level >= 2 &&
                    styles.activeBar,
                ]}
              />

              <View
                style={[
                  styles.strengthBar,
                  strength.level >= 3 &&
                    styles.activeBar,
                ]}
              />

            </View>

          </View>
        )}

        {/* =================================================
            SHOW PASSWORD
        ================================================= */}

        <TouchableOpacity
          style={styles.showPasswordRow}
          activeOpacity={0.7}
          onPress={() =>
            setShowPassword(!showPassword)
          }
        >
          <View
            style={[
              styles.checkbox,
              showPassword &&
                styles.checkboxActive,
            ]}
          >
            {showPassword && (
              <Ionicons
                name="checkmark"
                size={14}
                color="#FFFFFF"
              />
            )}
          </View>

          <Text style={styles.showPasswordText}>
            Show password
          </Text>
        </TouchableOpacity>

        {/* =================================================
            CONTINUE BUTTON
        ================================================= */}

        <View style={styles.bottomArea}>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleNext}
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
              <Text style={styles.buttonText}>
                Continue
              </Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>

      </View>
    </ScreenLayout>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({

  /* =====================================================
     SCREEN
  ===================================================== */

  screen: {
    flex: 1,

    paddingHorizontal: 24,

    paddingTop: 5,

    paddingBottom: 12,

    position: "relative",

    overflow: "hidden",
  },

  /* =====================================================
     BACKGROUND
  ===================================================== */

  background: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: Colors.bgDefault,

    overflow: "hidden",
  },

  /* =====================================================
     WAVES
  ===================================================== */

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

  /* =====================================================
     HEADER
  ===================================================== */

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

  /* =====================================================
     LOGO
  ===================================================== */

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
    color: Colors.textPrimary,

    fontSize: 25,

    fontWeight: "700",

    letterSpacing: -0.4,
  },

  /* =====================================================
     TITLE
  ===================================================== */

  title: {
    color: Colors.textPrimary,

    fontSize: 24,

    lineHeight: 29,

    fontWeight: "700",

    textAlign: "center",

    letterSpacing: -0.3,

    marginBottom: 8,
  },

  /* =====================================================
     SUBTITLE
  ===================================================== */

  subtitle: {
    color: Colors.textSecondary,

    fontSize: 14,

    lineHeight: 20,

    textAlign: "center",
  },

  subtitleSecond: {
    color: Colors.textSecondary,

    fontSize: 14,

    lineHeight: 20,

    textAlign: "center",

    marginBottom: 27,
  },

  /* =====================================================
     PASSWORD
  ===================================================== */

  passwordContainer: {
    width: "100%",

    height: 57,

    flexDirection: "row",

    alignItems: "center",

    backgroundColor:
      "rgba(30,30,46,0.72)",

    borderWidth: 1,

    borderColor: "#5B536B",

    borderRadius: 8,

    paddingLeft: 13,

    paddingRight: 8,
  },

  passwordInput: {
    flex: 1,

    height: 55,

    color: Colors.textPrimary,

    fontSize: 15,

    paddingVertical: 0,
  },

  eyeButton: {
    width: 40,

    height: 50,

    alignItems: "center",

    justifyContent: "center",
  },

  /* =====================================================
     STRENGTH
  ===================================================== */

  strengthContainer: {
    marginTop: 15,

    width: "100%",
  },

  strengthTextRow: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 8,
  },

  strengthLabel: {
    color: Colors.textSecondary,

    fontSize: 12,

    marginRight: 4,
  },

  strengthValue: {
    fontSize: 12,

    fontWeight: "600",
  },

  weakText: {
    color: Colors.error,
  },

  mediumText: {
    color: Colors.warning,
  },

  strongText: {
    color: Colors.success,
  },

  strengthBars: {
    flexDirection: "row",

    gap: 5,

    width: "100%",
  },

  strengthBar: {
    flex: 1,

    height: 4,

    borderRadius: 5,

    backgroundColor:
      "rgba(160,160,176,0.25)",
  },

  activeBar: {
    backgroundColor:
      Colors.success,
  },

  /* =====================================================
     SHOW PASSWORD
  ===================================================== */

  showPasswordRow: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 16,
  },

  checkbox: {
    width: 18,

    height: 18,

    borderRadius: 4,

    borderWidth: 1,

    borderColor: Colors.textSecondary,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 9,
  },

  checkboxActive: {
    backgroundColor: Colors.primaryLight,

    borderColor: Colors.primaryLight,
  },

  showPasswordText: {
    color: Colors.textPrimary,

    fontSize: 13,
  },

  /* =====================================================
     BOTTOM
  ===================================================== */

  bottomArea: {
    flex: 1,

    justifyContent: "flex-end",
  },

  /* =====================================================
     BUTTON
  ===================================================== */

  button: {
    width: "100%",

    height: 53,

    borderRadius: 8,

    alignItems: "center",

    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",

    fontSize: 16,

    fontWeight: "700",

    letterSpacing: 0.1,
  },
});