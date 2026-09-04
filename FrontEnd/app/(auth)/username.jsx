// // import React, { useState } from "react";
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// // } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import { Ionicons } from "@expo/vector-icons";
// // import { useRouter } from "expo-router";
// // import { LinearGradient } from "expo-linear-gradient";
// // import { Colors } from "../../src/theme/colors";

// // export default function UsernameScreen() {
// //   const router = useRouter();
// //   const [username, setUsername] = useState("");

// //   const handleNext = () => {
// //     if (!username.trim()) return;

// //     router.push("/email-phone");
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <View style={styles.content}>
// //         {/* Back */}
// //         <TouchableOpacity
// //           style={styles.backBtn}
// //           onPress={() => router.back()}
// //         >
// //           <Ionicons
// //             name="arrow-back"
// //             size={26}
// //             color={Colors.textPrimary}
// //           />
// //         </TouchableOpacity>

// //         {/* Title */}
// //         <Text style={styles.title}>
// //           Create a username
// //         </Text>

// //         <Text style={styles.subtitle}>
// //           Choose a unique username for your
// //           Krizil account. You can change it later.
// //         </Text>

// //         {/* Input */}
// //         <View style={styles.inputContainer}>
// //           {/* <Text style={styles.label}>
// //             Username
// //           </Text> */}

// //           <View style={styles.inputRow}>
// //             <TextInput
// //               style={styles.input}
// //               placeholder="Enter username"
// //               placeholderTextColor={
// //                 Colors.textMuted
// //               }
// //               value={username}
// //               onChangeText={setUsername}
// //               autoCapitalize="none"
// //             />

// //             {username.length > 2 && (
// //               <Ionicons
// //                 name="checkmark-circle"
// //                 size={28}
// //                 color={Colors.success}
// //               />
// //             )}
// //           </View>
// //         </View>

// //         {/* Next */}
// //         <TouchableOpacity
// //           activeOpacity={0.8}
// //           onPress={handleNext}
// //           disabled={!username}
// //         >
// //           <LinearGradient
// //             colors={Colors.gradients.primary}
// //             style={styles.button}
// //           >
// //             <Text style={styles.buttonText}>
// //               Next
// //             </Text>
// //           </LinearGradient>
// //         </TouchableOpacity>

// //         <View style={{ flex: 1 }} />

// //        <TouchableOpacity
// //   onPress={() => router.replace("/login")}
// // >
// //   <Text style={styles.bottomText}>
// //     I already have an account? Login
// //   </Text>
// // </TouchableOpacity>
// //       </View>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: Colors.bgDefault,
// //   },

// //   content: {
// //     flex: 1,
// //     paddingHorizontal: 24,
// //     paddingTop: 20,
// //     paddingBottom: 10,
// //   },

// //   backBtn: {
// //     width: 45,
// //     height: 45,
// //     justifyContent: "center",
// //   },

// //   title: {
// //     color: Colors.textPrimary,
// //     fontSize: 34,
// //     fontWeight: "700",
// //     marginTop: 20,
// //   },

// //   subtitle: {
// //     color: Colors.textSecondary,
// //     fontSize: 16,
// //     lineHeight: 24,
// //     marginTop: 15,
// //     marginBottom: 35,
// //   },

// //   inputContainer: {
// //     backgroundColor: Colors.bgInput,
// //     borderWidth: 1,
// //     borderColor: Colors.borderDefault,
// //     borderRadius: 16,
// //     paddingHorizontal: 18,
// //     paddingVertical: 14,
// //   },

// //   label: {
// //     color: Colors.textMuted,
// //     fontSize: 14,
// //     marginBottom: 8,
// //   },

// //   inputRow: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },

// //   input: {
// //     flex: 1,
// //     color: Colors.textPrimary,
// //     fontSize: 20,
// //     fontWeight: "600",
// //     paddingVertical: 4,
// //   },

// //   button: {
// //     height: 55,
// //     borderRadius: 30,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     marginTop: 35,
// //   },

// //   buttonText: {
// //     color: "#fff",
// //     fontSize: 18,
// //     fontWeight: "700",
// //   },

// //   bottomText: {
// //     color: Colors.primaryLight,
// //     textAlign: "center",
// //     fontSize: 16,
// //     fontWeight: "600",
// //     marginBottom: 20,
// //   },
// // });

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
// import { useRouter } from "expo-router";
// import { LinearGradient } from "expo-linear-gradient";
// import { useDispatch, useSelector } from "react-redux";
// // import Toast from "react-native-toast-message";
// import Toast from "react-native-root-toast";

// import { Colors } from "../../src/theme/colors";
// import { checkUsername, setSignupData } from "../../src/redux/authSlice";

// export default function UsernameScreen() {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const [username, setUsername] = useState("");
// const [suggestions, setSuggestions] = useState([]);
// const [isAvailable, setIsAvailable] = useState(false);

//  const { loading, signupData } = useSelector(
//   (state) => state.auth
// );

// // const handleNext = async () => {
// //   const trimmedUsername = username.trim();

// //   if (!trimmedUsername) {
// //     Toast.show({
// //       type: "error",
// //       text1: "Username Required",
// //       text2: "Please enter a username",
// //     });
// //     return;
// //   }

// //   const usernameRegex =
// //     /^[a-zA-Z0-9_]{3,20}$/;

// //   if (
// //     !usernameRegex.test(trimmedUsername)
// //   ) {
// //     Toast.show({
// //       type: "error",
// //       text1: "Invalid Username",
// //       text2:
// //         "Use 3-20 letters, numbers, or underscores only",
// //     });
// //     return;
// //   }

// //   try {
// //     const result = await dispatch(
// //       checkUsername(trimmedUsername)
// //     ).unwrap();

// //     if (result.available) {
// //       setIsAvailable(true);
// //       setSuggestions([]);

// //       dispatch(
// //         setSignupData({
// //           username: trimmedUsername,
// //         })
// //       );

// //       Toast.show({
// //         type: "success",
// //         text1: "Username Available",
// //         text2: result.message,
// //       });

// //       setTimeout(() => {
// //         router.push("/email-phone");
// //       }, 500);
// //     } else {
// //       setIsAvailable(false);
// //       setSuggestions(
// //         result.suggestions || []
// //       );

// //       Toast.show({
// //         type: "error",
// //         text1: "Username Taken",
// //         text2:
// //           result.message ||
// //           "Please choose another username",
// //       });
// //     }
// //   } catch (error) {
// //     const errorMessage =
// //       Array.isArray(error?.detail)
// //         ? error.detail[0]?.msg
// //         : error?.message ||
// //           "Failed to check username";

// //     setIsAvailable(false);

// //     Toast.show({
// //       type: "error",
// //       text1: "Invalid Username",
// //       text2: errorMessage,
// //     });
// //   }
// // };
// const handleNext = async () => {
//   console.log("🔥 NEXT BUTTON CLICKED");

//   const trimmedUsername = username.trim();

//   console.log("👤 Username:", trimmedUsername);

//   if (!trimmedUsername) {
//     console.log("❌ Username empty");

//     Toast.show({
//       type: "error",
//       text1: "Username Required",
//       text2: "Please enter a username",
//     });
//     return;
//   }

//   const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

//   console.log(
//     "🔍 Regex result:",
//     usernameRegex.test(trimmedUsername)
//   );

//   if (!usernameRegex.test(trimmedUsername)) {
//     console.log("❌ Invalid username");

//     Toast.show({
//       type: "error",
//       text1: "Invalid Username",
//       text2: "Use 3-20 letters, numbers, or underscores only",
//     });
//     return;
//   }

//   console.log("🚀 Calling checkUsername API...");

//   try {
//     const result = await dispatch(
//       checkUsername(trimmedUsername)
//     ).unwrap();

//     console.log("✅ checkUsername response:", result);

//     if (result.available) {
//       console.log("✅ Username available");

//       setIsAvailable(true);
//       setSuggestions([]);

//       dispatch(
//         setSignupData({
//           username: trimmedUsername,
//         })
//       );

//       console.log("➡️ Going to email-phone screen");

//       Toast.show({
//         type: "success",
//         text1: "Username Available",
//         text2: result.message,
//       });

//       setTimeout(() => {
//         console.log("➡️ router.push('/email-phone')");
//         router.push("/email-phone");
//       }, 500);
//     } else {
//       console.log("❌ Username already taken");

//       setIsAvailable(false);
//       setSuggestions(result.suggestions || []);

//       Toast.show({
//         type: "error",
//         text1: "Username Taken",
//         text2:
//           result.message ||
//           "Please choose another username",
//       });
//     }
//   } catch (error) {
//     console.log("🔥 checkUsername ERROR:", error);

//     const errorMessage =
//       Array.isArray(error?.detail)
//         ? error.detail[0]?.msg
//         : error?.message ||
//           "Failed to check username";

//     setIsAvailable(false);

//     Toast.show({
//       type: "error",
//       text1: "Invalid Username",
//       text2: errorMessage,
//     });
//   }
// };
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
//           Create a username
//         </Text>

//         <Text style={styles.subtitle}>
//           Choose a unique username for your
//           Krizil account. You can change it later.
//         </Text>

//         <View style={styles.inputContainer}>
//           <View style={styles.inputRow}>
//             <TextInput
//   style={styles.input}
//   placeholder="Enter username"
//   placeholderTextColor={
//     Colors.textMuted
//   }
//   value={username}
//   onChangeText={(text) => {
//     setUsername(text);
//     setIsAvailable(false);
//     setSuggestions([]);
//   }}
//   autoCapitalize="none"
// />

//             {isAvailable && (
//               <Ionicons
//                 name="checkmark-circle"
//                 size={28}
//                 color={Colors.success}
//               />
//             )}
//           </View>
//         </View>

// {suggestions.length > 0 && (
//   <View
//     style={{
//       marginTop: 20,
//     }}
//   >
//     <Text
//       style={{
//         color: Colors.textSecondary,
//         marginBottom: 10,
//         fontSize: 14,
//       }}
//     >
//       Suggested usernames
//     </Text>

//     {suggestions.map((item) => (
//       <TouchableOpacity
//         key={item}
//         onPress={() =>
//           setUsername(item)
//         }
//         style={{
//           paddingVertical: 8,
//         }}
//       >
//         <Text
//           style={{
//             color:
//               Colors.primaryLight,
//             fontSize: 16,
//             fontWeight: "600",
//           }}
//         >
//           {item}
//         </Text>
//       </TouchableOpacity>
//     ))}
//   </View>
// )}

//         <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={handleNext}
//           disabled={loading}
//         >
//           <LinearGradient
//             colors={Colors.gradients.primary}
//             style={[
//               styles.button,
//               loading && {
//                 opacity: 0.7,
//               },
//             ]}
//           >
//             <Text style={styles.buttonText}>
//               {loading
//                 ? "Checking..."
//                 : "Next"}
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>

//         <View style={{ flex: 1 }} />

//         <TouchableOpacity
//           onPress={() =>
//             router.replace("/login")
//           }
//         >
//           <Text style={styles.bottomText}>
//             I already have an account?
//             Login
//           </Text>
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
//     paddingBottom: 10,
//   },

//   backBtn: {
//     width: 45,
//     height: 45,
//     justifyContent: "center",
//   },

//   title: {
//     color: Colors.textPrimary,
//     fontSize: 34,
//     fontWeight: "700",
//     marginTop: 20,
//   },

//   subtitle: {
//     color: Colors.textSecondary,
//     fontSize: 16,
//     lineHeight: 24,
//     marginTop: 15,
//     marginBottom: 35,
//   },

//   inputContainer: {
//     backgroundColor: Colors.bgInput,
//     borderWidth: 1,
//     borderColor: Colors.borderDefault,
//     borderRadius: 16,
//     paddingHorizontal: 18,
//     paddingVertical: 14,
//   },

//   inputRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   input: {
//     flex: 1,
//     color: Colors.textPrimary,
//     fontSize: 20,
//     fontWeight: "600",
//     paddingVertical: 4,
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

//   bottomText: {
//     color: Colors.primaryLight,
//     textAlign: "center",
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 20,
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

import { useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import { useDispatch, useSelector } from "react-redux";

import ScreenLayout from "../../src/components/ScreenLayout";

import { Colors } from "../../src/theme/colors";

import {
  checkUsername,
  setSignupData,
} from "../../src/redux/authSlice";

import { showToast } from "../../src/components/Customtoast";

const { width } = Dimensions.get("window");

export default function UsernameScreen() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [username, setUsername] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const [isAvailable, setIsAvailable] = useState(false);

  const { loading } = useSelector(
    (state) => state.auth
  );

  /* =====================================================
     USERNAME CHECK
  ===================================================== */

  const handleNext = async () => {
    const trimmedUsername = username.trim();

    console.log(
      "🔥 Username:",
      trimmedUsername
    );

    /* EMPTY */
    if (!trimmedUsername) {
      showToast(
        "error",
        "Username Required",
        "Please enter a username"
      );

      return;
    }

    /* VALIDATION */
    const usernameRegex =
      /^[a-zA-Z0-9_]{3,20}$/;

    if (!usernameRegex.test(trimmedUsername)) {
      showToast(
        "error",
        "Invalid Username",
        "Use 3-20 letters, numbers, or underscores only"
      );

      return;
    }

    try {
      /* API */
      const result = await dispatch(
        checkUsername(trimmedUsername)
      ).unwrap();

      console.log(
        "✅ Username response:",
        result
      );

      /* AVAILABLE */
      if (result.available) {
        setIsAvailable(true);

        setSuggestions([]);

        dispatch(
          setSignupData({
            username: trimmedUsername,
          })
        );

        showToast(
          "success",
          "Username Available",
          result.message ||
            "Username is available"
        );

        setTimeout(() => {
          router.push("/email-phone");
        }, 500);

        return;
      }

      /* TAKEN */
      setIsAvailable(false);

      setSuggestions(
        result.suggestions || []
      );

      showToast(
        "error",
        "Username Taken",
        result.message ||
          "Please choose another username"
      );
    } catch (error) {
      console.log(
        "🔥 Username error:",
        error
      );

      const errorMessage =
        Array.isArray(error?.detail)
          ? error.detail[0]?.msg
          : error?.message ||
            "Failed to check username";

      setIsAvailable(false);

      showToast(
        "error",
        "Unable to Continue",
        errorMessage
      );
    }
  };

  /* =====================================================
     USERNAME CHANGE
  ===================================================== */

  const handleUsernameChange = (text) => {
    setUsername(text);

    setIsAvailable(false);

    setSuggestions([]);
  };

  /* =====================================================
     SELECT SUGGESTION
  ===================================================== */

  const handleSuggestionPress = (item) => {
    setUsername(item);

    setIsAvailable(false);

    setSuggestions([]);
  };

  return (
    <ScreenLayout
      backgroundColor={Colors.bgDefault}
      scroll={false}
    >
      <View style={styles.screen}>
        {/* =================================================
            BACKGROUND
        ================================================= */}

        <View
          pointerEvents="none"
          style={styles.background}
        >
          <View style={styles.waveOne} />

          <View style={styles.waveTwo} />

          <View style={styles.waveThree} />

          <View style={styles.waveFour} />
        </View>

        {/* =================================================
            HEADER
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
        </View>

        {/* =================================================
            TITLE
        ================================================= */}

        <Text style={styles.title}>
          Create a username
        </Text>

        {/* =================================================
            SUBTITLE
        ================================================= */}

        <Text style={styles.subtitle}>
          Choose a unique username for your Krizil
          account. You can change it later.
        </Text>

        {/* =================================================
            USERNAME INPUT
        ================================================= */}

        <View
          style={[
            styles.inputContainer,

            isAvailable &&
              styles.inputContainerSuccess,
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={
              Colors.textMuted
            }
            value={username}
            onChangeText={
              handleUsernameChange
            }
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            maxLength={20}
            returnKeyType="done"
            onSubmitEditing={handleNext}
          />

          {isAvailable ? (
            <Ionicons
              name="checkmark-circle"
              size={23}
              color={Colors.success}
            />
          ) : null}
        </View>

        {/* =================================================
            AVAILABLE MESSAGE
        ================================================= */}

        {isAvailable ? (
          <View
            style={styles.availableContainer}
          >
            <Ionicons
              name="checkmark"
              size={15}
              color={Colors.success}
            />

            <Text
              style={styles.availableText}
            >
              Username is available
            </Text>
          </View>
        ) : null}

        {/* =================================================
            SUGGESTIONS
        ================================================= */}

        {suggestions.length > 0 ? (
          <View
            style={
              styles.suggestionsContainer
            }
          >
            <Text
              style={styles.suggestionsTitle}
            >
              Suggested usernames
            </Text>

            {suggestions.map((item) => (
              <TouchableOpacity
                key={item}
                activeOpacity={0.7}
                style={
                  styles.suggestionItem
                }
                onPress={() =>
                  handleSuggestionPress(
                    item
                  )
                }
              >
                <Text
                  style={
                    styles.suggestionText
                  }
                >
                  {item}
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={17}
                  color={
                    Colors.primaryLight
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
        ) : null}

        {/* =================================================
            CONTINUE BUTTON
        ================================================= */}

        <TouchableOpacity
          activeOpacity={0.85}
          disabled={loading}
          onPress={handleNext}
          style={styles.buttonWrapper}
        >
          <LinearGradient
            colors={Colors.gradients.secondary}
            start={{
              x: 0,
              y: 0,
            }}
            end={{
              x: 1,
              y: 0,
            }}
            style={[
              styles.button,
              loading &&
                styles.buttonDisabled,
            ]}
          >
            <Text
              style={styles.buttonText}
            >
              {loading
                ? "Checking..."
                : "Continue"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* =================================================
            BOTTOM LOGIN
        ================================================= */}

        <View
          style={styles.bottomContainer}
        >
          <Text
            style={styles.bottomText}
          >
            Already have an account?
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              router.replace("/login")
            }
          >
            <Text
              style={styles.loginText}
            >
              Log in
            </Text>
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
  screen: {
    flex: 1,

    paddingHorizontal: 24,

    paddingTop: 5,

    paddingBottom: 10,

    position: "relative",

    overflow: "hidden",
  },

  /* =====================================================
     BACKGROUND
  ===================================================== */

  background: {
    ...StyleSheet.absoluteFillObject,

    overflow: "hidden",

    backgroundColor: Colors.bgDefault,
  },

  waveOne: {
    position: "absolute",

    width: width * 1.7,

    height: width * 0.65,

    borderRadius: 999,

    borderWidth: 1,

    borderColor:
      "rgba(124,58,237,0.14)",

    left: -width * 0.55,

    bottom: -width * 0.08,

    transform: [
      {
        rotate: "-8deg",
      },
    ],
  },

  waveTwo: {
    position: "absolute",

    width: width * 1.55,

    height: width * 0.58,

    borderRadius: 999,

    borderWidth: 1,

    borderColor:
      "rgba(159,103,255,0.12)",

    left: -width * 0.45,

    bottom: -width * 0.01,

    transform: [
      {
        rotate: "-8deg",
      },
    ],
  },

  waveThree: {
    position: "absolute",

    width: width * 1.4,

    height: width * 0.5,

    borderRadius: 999,

    borderWidth: 1,

    borderColor:
      "rgba(124,58,237,0.13)",

    left: -width * 0.35,

    bottom: width * 0.07,

    transform: [
      {
        rotate: "-8deg",
      },
    ],
  },

  waveFour: {
    position: "absolute",

    width: width * 1.25,

    height: width * 0.45,

    borderRadius: 999,

    borderWidth: 1,

    borderColor:
      "rgba(159,103,255,0.09)",

    left: -width * 0.25,

    bottom: width * 0.15,

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
    height: 42,

    justifyContent: "center",
  },

  backButton: {
    width: 40,

    height: 40,

    alignItems: "flex-start",

    justifyContent: "center",
  },

  /* =====================================================
     LOGO
  ===================================================== */

  logoContainer: {
    alignItems: "center",

    justifyContent: "center",

    marginTop: 13,

    marginBottom: 30,
  },

  logo: {
    width: 58,

    height: 58,
  },

  /* =====================================================
     TITLE
  ===================================================== */

  title: {
    color: Colors.textPrimary,

    fontSize: 25,

    lineHeight: 31,

    fontWeight: "700",

    textAlign: "center",

    letterSpacing: -0.3,
  },

  /* =====================================================
     SUBTITLE
  ===================================================== */

  subtitle: {
    color: Colors.textSecondary,

    fontSize: 14,

    lineHeight: 21,

    textAlign: "center",

    marginTop: 9,

    marginBottom: 30,

    paddingHorizontal: 3,
  },

  /* =====================================================
     INPUT
  ===================================================== */

  inputContainer: {
    height: 57,

    width: "100%",

    flexDirection: "row",

    alignItems: "center",

    backgroundColor:
      "rgba(30,30,46,0.72)",

    borderWidth: 1,

    borderColor: "#5B536B",

    borderRadius: 9,

    paddingHorizontal: 15,
  },

  inputContainerSuccess: {
    borderColor:
      "rgba(34,197,94,0.65)",
  },

  input: {
    flex: 1,

    height: 55,

    color: Colors.textPrimary,

    fontSize: 15,

    fontWeight: "500",

    paddingVertical: 0,
  },

  /* =====================================================
     AVAILABLE
  ===================================================== */

  availableContainer: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 9,

    marginLeft: 3,
  },

  availableText: {
    color: Colors.success,

    fontSize: 13,

    fontWeight: "500",

    marginLeft: 4,
  },

  /* =====================================================
     SUGGESTIONS
  ===================================================== */

  suggestionsContainer: {
    marginTop: 18,
  },

  suggestionsTitle: {
    color: Colors.textSecondary,

    fontSize: 13,

    fontWeight: "500",

    marginBottom: 7,
  },

  suggestionItem: {
    height: 42,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    paddingHorizontal: 4,
  },

  suggestionText: {
    color: Colors.primaryLight,

    fontSize: 15,

    fontWeight: "600",
  },

  /* =====================================================
     BUTTON
  ===================================================== */

  buttonWrapper: {
    marginTop: 30,
  },

  button: {
    height: 53,

    width: "100%",

    borderRadius: 8,

    alignItems: "center",

    justifyContent: "center",
  },

  buttonDisabled: {
    opacity: 0.55,
  },

  buttonText: {
    color: "#FFFFFF",

    fontSize: 16,

    fontWeight: "700",

    letterSpacing: 0.1,
  },

  /* =====================================================
     BOTTOM LOGIN
  ===================================================== */

  bottomContainer: {
    marginTop: "auto",

    paddingBottom: 8,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",
  },

  bottomText: {
    color: "#A7A7B5",

    fontSize: 14,
  },

  loginText: {
    color: "#D32CCF",

    fontSize: 14,

    fontWeight: "600",

    marginLeft: 5,
  },
});