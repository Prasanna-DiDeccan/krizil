// // import React, { useState } from "react";
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Image,
// //   Alert,
// // } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import { useRouter } from "expo-router";
// // import { LinearGradient } from "expo-linear-gradient";
// // import { Colors } from "../../src/theme/colors";
// // import Toast from "react-native-toast-message";
// // import { useDispatch } from "react-redux";
// // import { loginUser } from "../../src/redux/authSlice";
// // import { saveTokens, saveUser } from "../../src/utils/storage";

// // export default function LoginScreen() {
// //   const router = useRouter();
// // const dispatch = useDispatch();
// // const [identifier, setIdentifier] = useState("");
// // const [password, setPassword] = useState("");

// // const handleLogin = async () => {
// //   try {
// //     const response = await dispatch(
// //       loginUser({
// //         identifier,
// //         password,
// //       })
// //     ).unwrap();

// //     console.log("Login Response:", response);

// //     await saveTokens(
// //       response.access_token,
// //       response.refresh_token
// //     );

// //     await saveUser(response.user);

// //     Toast.show({
// //       type: "success",
// //       text1: "Login Successful",
// //     });

// //     router.replace("/(tabs)");
// //   } catch (error) {
// //     console.log("Login Error:", error);

// //     const errorMessage =
// //       typeof error?.detail === "string"
// //         ? error.detail
// //         : Array.isArray(error?.detail)
// //         ? error.detail[0]?.msg
// //         : "Incorrect email/phone or password";

// //     Toast.show({
// //       type: "error",
// //       text1: "Login Failed",
// //       text2: errorMessage,
// //     });
// //   }
// // };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <View style={styles.content}>
// //         {/* Logo */}
// //         <Image
// //           source={require("../../assets/images/logo.png")}
// //           style={styles.logo}
// //           resizeMode="contain"
// //         />

// //         {/* Username / Email */}
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Username, mobile number or email"
// //           placeholderTextColor={Colors.textMuted}
// //           value={identifier}
// //           onChangeText={setIdentifier}
// //         />

// //         {/* Password */}
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Password"
// //           placeholderTextColor={Colors.textMuted}
// //           secureTextEntry
// //           value={password}
// //           onChangeText={setPassword}
// //         />

// //         {/* Login */}
// //         <TouchableOpacity
// //   activeOpacity={0.8}
// //   onPress={handleLogin}
// // >
// //   <LinearGradient
// //     colors={Colors.gradients.primary}
// //     start={{ x: 0, y: 0 }}
// //     end={{ x: 1, y: 0 }}
// //     style={styles.gradientBtn}
// //   >
// //     <Text style={styles.loginText}>Log in</Text>
// //   </LinearGradient>
// // </TouchableOpacity>

// // {/* Skip For Now */}
// // <TouchableOpacity
// //   onPress={() => router.replace("/(tabs)")}
// // >
// //   <Text style={styles.skipText}>
// //     Skip for now
// //   </Text>
// // </TouchableOpacity>

// //         {/* Forgot */}
// //         <TouchableOpacity   onPress={() =>
// //     router.push("/forgot-password")
// //   }>
// //           <Text style={styles.forgotText}>
// //             Forgot password?
// //           </Text>
// //         </TouchableOpacity>

// //         <View style={{ flex: 1 }} />

// //         {/* Create Account */}
// //         <TouchableOpacity
// //           style={styles.createBtn}
// //           onPress={() => router.push("/username")}
// //         >
// //           <Text style={styles.createText}>
// //             Create new account
// //           </Text>
// //         </TouchableOpacity>

// //         <Text style={styles.footer}>
// //           Krizil
// //         </Text>
// //       </View>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: Colors.bgDefault,
// //     // backgroundColor: "#FFFFFF",
// //   },

// //   content: {
// //     flex: 1,
// //     paddingTop: 100,
// //     paddingHorizontal: 30,
// //     justifyContent: "center",
// //   },

// //   logo: {
// //     width: 90,
// //     height: 90,
// //     alignSelf: "center",
// //     marginBottom: 80,
// //     // marginTop: 100,
// //   },

// //   input: {
// //     height: 52,
// //     borderWidth: 1,
// //     borderColor: Colors.borderDefault,
// //     borderRadius: 12,
// //     paddingHorizontal: 20,
// //     marginBottom: 12,
// //     backgroundColor: Colors.bgInput,
// //     fontSize: 15,
// //     color: Colors.textPrimary,
    
// //   },

// //   gradientBtn: {
// //   width: "100%",
// //   height: 48,
// //   borderRadius: 10,
// //   justifyContent: "center",
// //   alignItems: "center",
// //   marginTop: 8,
// // },

// //   loginText: {
// //     color: Colors.textPrimary,
// //     fontWeight: "700",
// //     fontSize: 16,
// //   },

// //   forgotText: {
// //     textAlign: "center",
// //     marginTop: 20,
// //     color: Colors.textSecondary,
// //     fontWeight: "500",
// //   },

// //   createBtn: {
// //     borderWidth: 1,
// //     borderColor: Colors.primary,
// //     borderRadius: 25,
// //     height: 50,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     marginBottom: 20,
// //     backgroundColor: "transparent",
// //   },

// //   createText: {
// //     color: Colors.primaryLight,
// //     fontWeight: "700",
// //     fontSize: 16,
// //   },

// //   footer: {
// //     textAlign: "center",
// //     marginBottom: 30,
// //     color: Colors.textSecondary,
// //     fontSize: 14,
// //     fontWeight: "600",
// //   },
// //   skipText: {
// //   textAlign: "center",
// //   marginTop: 15,
// //   color: Colors.primaryLight,
// //   fontSize: 15,
// //   fontWeight: "600",
// // },
// // });


// // import React, { useState } from "react";
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Image,
// //   Modal,
// //   FlatList,
// //   useWindowDimensions,
// //   KeyboardAvoidingView,
// //   Platform,
// //   ScrollView,
// // } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import { useRouter } from "expo-router";
// // import { LinearGradient } from "expo-linear-gradient";
// // import { Ionicons } from "@expo/vector-icons";
// // import { Colors } from "../../src/theme/colors";
// // import Toast from "react-native-toast-message";
// // import { useDispatch } from "react-redux";
// // import { loginUser } from "../../src/redux/authSlice";
// // import { saveTokens, saveUser } from "../../src/utils/storage";

// // // Edit / extend this list as needed
// // const COUNTRY_CODES = [
// //   { code: "+91", flag: "🇮🇳", name: "India" },
// //   { code: "+1", flag: "🇺🇸", name: "United States" },
// //   { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
// //   { code: "+971", flag: "🇦🇪", name: "UAE" },
// //   { code: "+61", flag: "🇦🇺", name: "Australia" },
// //   { code: "+65", flag: "🇸🇬", name: "Singapore" },
// // ];

// // export default function LoginScreen() {
// //   const router = useRouter();
// //   const dispatch = useDispatch();
// //   const { width, height } = useWindowDimensions();

// //   const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);
// //   const [pickerVisible, setPickerVisible] = useState(false);
// //   const [phone, setPhone] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);

// //   const logoSize = Math.min(width * 0.24, 100);

// //   const handleLogin = async () => {
// //     try {
// //       const identifier = `${countryCode.code}${phone}`;

// //       const response = await dispatch(
// //         loginUser({
// //           identifier,
// //           password,
// //         })
// //       ).unwrap();

// //       console.log("Login Response:", response);

// //       await saveTokens(response.access_token, response.refresh_token);

// //       await saveUser(response.user);

// //       Toast.show({
// //         type: "success",
// //         text1: "Login Successful",
// //       });

// //       router.replace("/(tabs)");
// //     } catch (error) {
// //       console.log("Login Error:", error);

// //       const errorMessage =
// //         typeof error?.detail === "string"
// //           ? error.detail
// //           : Array.isArray(error?.detail)
// //           ? error.detail[0]?.msg
// //           : "Incorrect email/phone or password";

// //       Toast.show({
// //         type: "error",
// //         text1: "Login Failed",
// //         text2: errorMessage,
// //       });
// //     }
// //   };

// //   return (
// //     <View style={styles.root}>
// //       {/* Background */}
// //       <LinearGradient
// //         colors={["#2b2440", "#1a1530", "#0f0c1e"]}
// //         start={{ x: 0, y: 0 }}
// //         end={{ x: 1, y: 1 }}
// //         style={StyleSheet.absoluteFillObject}
// //       />
// //       <View style={[styles.glowTop, { width: width * 0.6, height: width * 0.6 }]} />
// //       <View style={[styles.glowBottom, { width: width * 0.7, height: width * 0.7 }]} />

// //       <SafeAreaView style={styles.safe}>
// //         <KeyboardAvoidingView
// //           behavior={Platform.OS === "ios" ? "padding" : undefined}
// //           style={{ flex: 1 }}
// //         >
// //           <ScrollView
// //             contentContainerStyle={[
// //               styles.content,
// //               { minHeight: height - 40, paddingHorizontal: width * 0.08 },
// //             ]}
// //             keyboardShouldPersistTaps="handled"
// //             showsVerticalScrollIndicator={false}
// //           >
// //             {/* Logo */}
// //             <Image
// //               source={require("../../assets/images/logo.png")}
// //               style={{ width: logoSize, height: logoSize, alignSelf: "center", marginBottom: 32 }}
// //               resizeMode="contain"
// //             />

// //             {/* Phone: country code + number */}
// //             <Text style={styles.label}>Phone number</Text>
// //             <View style={styles.phoneRow}>
// //               <TouchableOpacity
// //                 style={styles.countryPicker}
// //                 onPress={() => setPickerVisible(true)}
// //                 activeOpacity={0.8}
// //               >
// //                 <Text style={styles.flag}>{countryCode.flag}</Text>
// //                 <Text style={styles.codeText}>{countryCode.code}</Text>
// //                 <Ionicons name="chevron-down" size={14} color="rgba(255,255,255,0.6)" />
// //               </TouchableOpacity>

// //               <TextInput
// //                 style={styles.phoneInput}
// //                 placeholder="Username, mobile number or email"
// //                 placeholderTextColor={Colors.textMuted}
// //                 keyboardType="phone-pad"
// //                 value={phone}
// //                 onChangeText={setPhone}
// //                 maxLength={12}
// //               />
// //             </View>

// //             {/* Password */}
// //             <View style={styles.passwordRow}>
// //               <TextInput
// //                 style={styles.passwordInput}
// //                 placeholder="Password"
// //                 placeholderTextColor={Colors.textMuted}
// //                 secureTextEntry={!showPassword}
// //                 value={password}
// //                 onChangeText={setPassword}
// //               />
// //               <TouchableOpacity
// //                 onPress={() => setShowPassword((v) => !v)}
// //                 hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
// //               >
// //                 <Ionicons
// //                   name={showPassword ? "eye-off-outline" : "eye-outline"}
// //                   size={20}
// //                   color="rgba(255,255,255,0.6)"
// //                 />
// //               </TouchableOpacity>
// //             </View>

// //             {/* Login */}
// //             <TouchableOpacity activeOpacity={0.8} onPress={handleLogin}>
// //               <LinearGradient
// //                 colors={Colors.gradients.primary}
// //                 start={{ x: 0, y: 0 }}
// //                 end={{ x: 1, y: 0 }}
// //                 style={styles.gradientBtn}
// //               >
// //                 <Text style={styles.loginText}>Log in</Text>
// //               </LinearGradient>
// //             </TouchableOpacity>

// //             {/* Skip For Now */}
// //             {/* <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
// //               <Text style={styles.skipText}>Skip for now</Text>
// //             </TouchableOpacity> */}

// //             {/* Forgot */}
// //             <TouchableOpacity onPress={() => router.push("/forgot-password")}>
// //               <Text style={styles.forgotText}>Forgot password?</Text>
// //             </TouchableOpacity>

// //             <View style={{ flex: 1, minHeight: 24 }} />

// //             {/* New account? Register */}
// //             <View style={styles.registerRow}>
// //               <Text style={styles.registerMuted}>New account? </Text>
// //               <TouchableOpacity onPress={() => router.push("/username")}>
// //                 <Text style={styles.registerLink}>Register</Text>
// //               </TouchableOpacity>
// //             </View>

// //             <Text style={styles.footer}>Krizil</Text>
// //           </ScrollView>
// //         </KeyboardAvoidingView>
// //       </SafeAreaView>

// //       {/* Country code picker modal */}
// //       <Modal
// //         visible={pickerVisible}
// //         transparent
// //         animationType="slide"
// //         onRequestClose={() => setPickerVisible(false)}
// //       >
// //         <TouchableOpacity
// //           style={styles.modalBackdrop}
// //           activeOpacity={1}
// //           onPress={() => setPickerVisible(false)}
// //         >
// //           <View style={styles.modalSheet}>
// //             <Text style={styles.modalTitle}>Select country code</Text>
// //             <FlatList
// //               data={COUNTRY_CODES}
// //               keyExtractor={(item) => item.code + item.name}
// //               renderItem={({ item }) => (
// //                 <TouchableOpacity
// //                   style={styles.modalRow}
// //                   onPress={() => {
// //                     setCountryCode(item);
// //                     setPickerVisible(false);
// //                   }}
// //                 >
// //                   <Text style={styles.flag}>{item.flag}</Text>
// //                   <Text style={styles.modalRowText}>{item.name}</Text>
// //                   <Text style={styles.modalRowCode}>{item.code}</Text>
// //                 </TouchableOpacity>
// //               )}
// //             />
// //           </View>
// //         </TouchableOpacity>
// //       </Modal>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   root: {
// //     flex: 1,
// //     backgroundColor: "#0f0c1e",
// //   },
// //   safe: {
// //     flex: 1,
// //   },
// //   glowTop: {
// //     position: "absolute",
// //     top: -60,
// //     right: -60,
// //     borderRadius: 999,
// //     backgroundColor: "rgba(127,119,221,0.22)",
// //   },
// //   glowBottom: {
// //     position: "absolute",
// //     bottom: -80,
// //     left: -80,
// //     borderRadius: 999,
// //     backgroundColor: "rgba(212,83,126,0.16)",
// //   },
// //   content: {
// //     justifyContent: "center",
// //     paddingTop: 98,
// //     paddingBottom: 24,
// //   },

// //   label: {
// //     fontSize: 12,
// //     color: "rgba(255,255,255,0.55)",
// //     marginBottom: 6,
// //   },

// //   phoneRow: {
// //     flexDirection: "row",
// //     gap: 8,
// //     marginBottom: 12,
// //   },
// //   countryPicker: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     height: 52,
// //     paddingHorizontal: 10,
// //     borderRadius: 12,
// //     borderWidth: 1,
// //     borderColor: Colors.borderDefault,
// //     backgroundColor: Colors.bgInput,
// //     gap: 4,
// //   },
// //   flag: {
// //     fontSize: 16,
// //   },
// //   codeText: {
// //     color: Colors.textPrimary,
// //     fontSize: 14,
// //     marginRight: 2,
// //   },
// //   phoneInput: {
// //     flex: 1,
// //     height: 52,
// //     borderWidth: 1,
// //     borderColor: Colors.borderDefault,
// //     borderRadius: 12,
// //     paddingHorizontal: 16,
// //     backgroundColor: Colors.bgInput,
// //     fontSize: 15,
// //     color: Colors.textPrimary,
// //   },

// //   passwordRow: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     height: 52,
// //     borderWidth: 1,
// //     borderColor: Colors.borderDefault,
// //     borderRadius: 12,
// //     paddingHorizontal: 16,
// //     marginBottom: 12,
// //     backgroundColor: Colors.bgInput,
// //   },
// //   passwordInput: {
// //     flex: 1,
// //     fontSize: 15,
// //     color: Colors.textPrimary,
// //   },

// //   gradientBtn: {
// //     width: "100%",
// //     height: 48,
// //     borderRadius: 10,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     marginTop: 8,
// //   },
// //   loginText: {
// //     color: Colors.textPrimary,
// //     fontWeight: "700",
// //     fontSize: 16,
// //   },

// //   skipText: {
// //     textAlign: "center",
// //     marginTop: 15,
// //     color: Colors.primaryLight,
// //     fontSize: 15,
// //     fontWeight: "600",
// //   },

// //   forgotText: {
// //     textAlign: "center",
// //     marginTop: 20,
// //     color: Colors.textSecondary,
// //     fontWeight: "500",
// //   },

// //   registerRow: {
// //     flexDirection: "row",
// //     justifyContent: "center",
// //     marginBottom: 12,
// //   },
// //   registerMuted: {
// //     color: Colors.textSecondary,
// //     fontSize: 14,
// //   },
// //   registerLink: {
// //     color: Colors.primaryLight,
// //     fontSize: 14,
// //     fontWeight: "700",
// //   },

// //   footer: {
// //     textAlign: "center",
// //     marginBottom: 30,
// //     color: Colors.textSecondary,
// //     fontSize: 14,
// //     fontWeight: "600",
// //   },

// //   modalBackdrop: {
// //     flex: 1,
// //     backgroundColor: "rgba(0,0,0,0.5)",
// //     justifyContent: "flex-end",
// //   },
// //   modalSheet: {
// //     backgroundColor: "#1a1530",
// //     borderTopLeftRadius: 20,
// //     borderTopRightRadius: 20,
// //     paddingHorizontal: 20,
// //     paddingTop: 16,
// //     paddingBottom: 32,
// //     maxHeight: "60%",
// //   },
// //   modalTitle: {
// //     color: "#fff",
// //     fontSize: 16,
// //     fontWeight: "600",
// //     marginBottom: 12,
// //   },
// //   modalRow: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     paddingVertical: 12,
// //     borderBottomWidth: 0.5,
// //     borderBottomColor: "rgba(255,255,255,0.1)",
// //     gap: 10,
// //   },
// //   modalRowText: {
// //     flex: 1,
// //     color: "#fff",
// //     fontSize: 14,
// //   },
// //   modalRowCode: {
// //     color: "rgba(255,255,255,0.6)",
// //     fontSize: 13,
// //   },
// // });

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   FlatList,
//   useWindowDimensions,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useRouter } from "expo-router";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { Colors } from "../../src/theme/colors";
// import { showToast } from "../../src/components/Customtoast";

// import { useDispatch } from "react-redux";
// import { loginUser } from "../../src/redux/authSlice";
// import { saveTokens, saveUser } from "../../src/utils/storage";

// // Edit / extend this list as needed
// const COUNTRY_CODES = [
//   { code: "+91", flag: "🇮🇳", name: "India" },
//   { code: "+1", flag: "🇺🇸", name: "United States" },
//   { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
//   { code: "+971", flag: "🇦🇪", name: "UAE" },
//   { code: "+61", flag: "🇦🇺", name: "Australia" },
//   { code: "+65", flag: "🇸🇬", name: "Singapore" },
// ];

// export default function LoginScreen() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { width, height } = useWindowDimensions();

//   const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);
//   const [pickerVisible, setPickerVisible] = useState(false);
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const logoSize = Math.min(width * 0.24, 100);

//   const handleLogin = async () => {
//     console.log(
//       "handleLogin fired. phone:", phone,
//       "password:", password,
//       "countryCode:", countryCode
//     );

//     // ---- Frontend validation (no network call) ----
//     if (!phone.trim()) {
//       showToast("error", "Enter your mobile number, username or email");
//       return;
//     }
//     if (!password) {
//       showToast("error", "Enter your password");
//       return;
//     }
//     if (!countryCode?.code) {
//       showToast("error", "Select a country code");
//       return;
//     }

//     // ---- Backend call ----
//     try {
//       setLoading(true);

//       const identifier = `${countryCode.code}${phone.trim()}`;

//       const response = await dispatch(
//         loginUser({
//           identifier,
//           password,
//         })
//       ).unwrap();

//       console.log("Login Response:", response);

//       await saveTokens(response.access_token, response.refresh_token);
//       await saveUser(response.user);

//       showToast("success", "Login Successful");

//       router.replace("/(tabs)");
//     } catch (error) {
//       console.log("Login Error (raw):", JSON.stringify(error, null, 2));

//       // Backend sends { "message": "..." } via rejectWithValue(error.response.data)
//       const errorMessage =
//         typeof error?.message === "string"
//           ? error.message
//           : typeof error?.detail === "string"
//           ? error.detail
//           : Array.isArray(error?.detail)
//           ? error.detail[0]?.msg
//           : "Something went wrong. Please try again.";

//       console.log("Extracted error message:", errorMessage);

//       showToast("error", "Login Failed", errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.root}>
//       {/* Background */}
//       <LinearGradient
//         colors={["#2b2440", "#1a1530", "#0f0c1e"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={StyleSheet.absoluteFillObject}
//       />
//       <View style={[styles.glowTop, { width: width * 0.6, height: width * 0.6 }]} />
//       <View style={[styles.glowBottom, { width: width * 0.7, height: width * 0.7 }]} />

//       <SafeAreaView style={styles.safe}>
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : undefined}
//           style={{ flex: 1 }}
//         >
//           <ScrollView
//             contentContainerStyle={[
//               styles.content,
//               { minHeight: height - 40, paddingHorizontal: width * 0.08 },
//             ]}
//             keyboardShouldPersistTaps="handled"
//             showsVerticalScrollIndicator={false}
//           >
//             {/* Everything in here is centered as one block, vertically and horizontally */}
//             <View style={styles.formSection}>
//               {/* Logo */}
//               <Image
//                 source={require("../../assets/images/logo.png")}
//                 style={{ width: logoSize, height: logoSize, alignSelf: "center", marginBottom: 32 }}
//                 resizeMode="contain"
//               />

//               {/* Phone: country code + number */}
//               <Text style={styles.label}>Phone number</Text>
//               <View style={styles.phoneRow}>
//                 <TouchableOpacity
//                   style={styles.countryPicker}
//                   onPress={() => setPickerVisible(true)}
//                   activeOpacity={0.8}
//                 >
//                   <Text style={styles.flag}>{countryCode.flag}</Text>
//                   <Text style={styles.codeText}>{countryCode.code}</Text>
//                   <Ionicons name="chevron-down" size={14} color="rgba(255,255,255,0.6)" />
//                 </TouchableOpacity>

//                 <TextInput
//                   style={styles.phoneInput}
//                   placeholder="Enter phone number"
//                   placeholderTextColor={Colors.textMuted}
//                   keyboardType="phone-pad"
//                   value={phone}
//                   onChangeText={setPhone}
//                   maxLength={12}
//                 />
//               </View>

//               {/* Password */}
//               <View style={styles.passwordRow}>
//                 <TextInput
//                   style={styles.passwordInput}
//                   placeholder="Password"
//                   placeholderTextColor={Colors.textMuted}
//                   secureTextEntry={!showPassword}
//                   value={password}
//                   onChangeText={setPassword}
//                 />
//                 <TouchableOpacity
//                   onPress={() => setShowPassword((v) => !v)}
//                   hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//                 >
//                   <Ionicons
//                     name={showPassword ? "eye-off-outline" : "eye-outline"}
//                     size={20}
//                     color="rgba(255,255,255,0.6)"
//                   />
//                 </TouchableOpacity>
//               </View>

//               {/* Login */}
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 onPress={handleLogin}
//                 disabled={loading}
//               >
//                 <LinearGradient
//                   colors={Colors.gradients.primary}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.gradientBtn}
//                 >
//                   <Text style={styles.loginText}>
//                     {loading ? "Logging in..." : "Log in"}
//                   </Text>
//                 </LinearGradient>
//               </TouchableOpacity>

//               {/* Skip For Now */}
//               {/* <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
//                 <Text style={styles.skipText}>Skip for now</Text>
//               </TouchableOpacity> */}

//               {/* Forgot */}
//               <TouchableOpacity onPress={() => router.push("/forgot-password")}>
//                 <Text style={styles.forgotText}>Forgot password?</Text>
//               </TouchableOpacity>
//             </View>

//             {/* New account? Register — pinned below the centered form */}
//             <View style={styles.registerRow}>
//               <Text style={styles.registerMuted}>New account? </Text>
//               <TouchableOpacity onPress={() => router.push("/username")}>
//                 <Text style={styles.registerLink}>Register</Text>
//               </TouchableOpacity>
//             </View>

//             <Text style={styles.footer}>Krizil</Text>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </SafeAreaView>

//       {/* Country code picker — plain overlay View, not native Modal */}
//       {pickerVisible && (
//         <View style={styles.pickerOverlay}>
//           <TouchableOpacity
//             style={StyleSheet.absoluteFillObject}
//             activeOpacity={1}
//             onPress={() => setPickerVisible(false)}
//           />
//           <View style={styles.modalSheet}>
//             <Text style={styles.modalTitle}>Select country code</Text>
//             <FlatList
//               data={COUNTRY_CODES}
//               keyExtractor={(item) => item.code + item.name}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.modalRow}
//                   onPress={() => {
//                     setCountryCode(item);
//                     setPickerVisible(false);
//                   }}
//                 >
//                   <Text style={styles.flag}>{item.flag}</Text>
//                   <Text style={styles.modalRowText}>{item.name}</Text>
//                   <Text style={styles.modalRowCode}>{item.code}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </View>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: "#0f0c1e",
//   },
//   safe: {
//     flex: 1,
//   },
//   glowTop: {
//     position: "absolute",
//     top: -60,
//     right: -60,
//     borderRadius: 999,
//     backgroundColor: "rgba(127,119,221,0.22)",
//   },
//   glowBottom: {
//     position: "absolute",
//     bottom: -80,
//     left: -80,
//     borderRadius: 999,
//     backgroundColor: "rgba(212,83,126,0.16)",
//   },

//   content: {
//     flexGrow: 1,
//     paddingTop: 24,
//     paddingBottom: 24,
//   },

//   formSection: {
//     flex: 1,
//     justifyContent: "center",
//     width: "100%",
//   },

//   label: {
//     fontSize: 12,
//     color: "rgba(255,255,255,0.55)",
//     marginBottom: 6,
//   },

//   phoneRow: {
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 12,
//   },
//   countryPicker: {
//     flexDirection: "row",
//     alignItems: "center",
//     height: 52,
//     paddingHorizontal: 10,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: Colors.borderDefault,
//     backgroundColor: Colors.bgInput,
//     gap: 4,
//   },
//   flag: {
//     fontSize: 16,
//   },
//   codeText: {
//     color: Colors.textPrimary,
//     fontSize: 14,
//     marginRight: 2,
//   },
//   phoneInput: {
//     flex: 1,
//     height: 52,
//     borderWidth: 1,
//     borderColor: Colors.borderDefault,
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     backgroundColor: Colors.bgInput,
//     fontSize: 15,
//     color: Colors.textPrimary,
//   },

//   passwordRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     height: 52,
//     borderWidth: 1,
//     borderColor: Colors.borderDefault,
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     marginBottom: 12,
//     backgroundColor: Colors.bgInput,
//   },
//   passwordInput: {
//     flex: 1,
//     fontSize: 15,
//     color: Colors.textPrimary,
//   },

//   gradientBtn: {
//     width: "100%",
//     height: 48,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 8,
//   },
//   loginText: {
//     color: Colors.textPrimary,
//     fontWeight: "700",
//     fontSize: 16,
//   },

//   skipText: {
//     textAlign: "center",
//     marginTop: 15,
//     color: Colors.primaryLight,
//     fontSize: 15,
//     fontWeight: "600",
//   },

//   forgotText: {
//     textAlign: "center",
//     marginTop: 20,
//     color: Colors.textSecondary,
//     fontWeight: "500",
//   },

//   registerRow: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 12,
//   },
//   registerMuted: {
//     color: Colors.textSecondary,
//     fontSize: 14,
//   },
//   registerLink: {
//     color: Colors.primaryLight,
//     fontSize: 14,
//     fontWeight: "700",
//   },

//   footer: {
//     textAlign: "center",
//     marginBottom: 8,
//     color: Colors.textSecondary,
//     fontSize: 14,
//     fontWeight: "600",
//   },

//   pickerOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "flex-end",
//     zIndex: 999,
//     elevation: 999,
//   },
//   modalSheet: {
//     backgroundColor: "#1a1530",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 20,
//     paddingTop: 16,
//     paddingBottom: 32,
//     maxHeight: "60%",
//   },
//   modalTitle: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 12,
//   },
//   modalRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//     borderBottomWidth: 0.5,
//     borderBottomColor: "rgba(255,255,255,0.1)",
//     gap: 10,
//   },
//   modalRowText: {
//     flex: 1,
//     color: "#fff",
//     fontSize: 14,
//   },
//   modalRowCode: {
//     color: "rgba(255,255,255,0.6)",
//     fontSize: 13,
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
  FlatList,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../src/theme/colors";
import { showToast } from "../../src/components/Customtoast";

import { useDispatch } from "react-redux";
import { loginUser } from "../../src/redux/authSlice";
import { saveTokens, saveUser } from "../../src/utils/storage";
import { COUNTRY_CODES } from "../../src/constants/countryCodes";

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();

  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const logoSize = Math.min(width * 0.24, 100);

  // Detect whether the current input looks like a plain phone number
  // (digits only, no letters/@/. — i.e. NOT an email or username)
  const isPhoneNumber = /^\d+$/.test(phone.trim());

  const handleLogin = async () => {
    const value = phone.trim();

    console.log(
      "handleLogin fired. value:", value,
      "password:", password,
      "countryCode:", countryCode
    );

    // ---- Frontend validation (no network call) ----
    if (!value) {
      showToast("error", "Enter your mobile number, username or email");
      return;
    }
    if (!password) {
      showToast("error", "Enter your password");
      return;
    }

    // ---- Detect identifier type ----
    const isEmail = /\S+@\S+\.\S+/.test(value);
    const isPhone = /^\d{6,}$/.test(value); // digits only, reasonable phone length

    let identifier = value;

    if (isPhone) {
      if (!countryCode?.code) {
        showToast("error", "Select a country code");
        return;
      }
      identifier = `${countryCode.code}${value}`;
    }
    // else: email or username -> send as-is, no country code prefix

    // ---- Backend call ----
    try {
      setLoading(true);

      const response = await dispatch(
        loginUser({
          identifier,
          password,
        })
      ).unwrap();

      console.log("Login Response:", response);

      await saveTokens(response.access_token, response.refresh_token);
      await saveUser(response.user);

      showToast("success", "Login Successful");

      router.replace("/(tabs)");
    } catch (error) {
      console.log("Login Error (raw):", JSON.stringify(error, null, 2));

      // Backend sends { "message": "..." } via rejectWithValue(error.response.data)
      const errorMessage =
        typeof error?.message === "string"
          ? error.message
          : typeof error?.detail === "string"
          ? error.detail
          : Array.isArray(error?.detail)
          ? error.detail[0]?.msg
          : "Something went wrong. Please try again.";

      console.log("Extracted error message:", errorMessage);

      showToast("error", "Login Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      {/* Background */}
      <LinearGradient
        colors={["#2b2440", "#1a1530", "#0f0c1e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={[styles.glowTop, { width: width * 0.6, height: width * 0.6 }]} />
      <View style={[styles.glowBottom, { width: width * 0.7, height: width * 0.7 }]} />

      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={[
              styles.content,
              { minHeight: height - 40, paddingHorizontal: width * 0.08 },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Everything in here is centered as one block, vertically and horizontally */}
            <View style={styles.formSection}>
              {/* Logo */}
              <Image
                source={require("../../assets/images/logo.png")}
                style={{ width: logoSize, height: logoSize, alignSelf: "center", marginBottom: 32 }}
                resizeMode="contain"
              />

              {/* Identifier: username, phone number, or email */}
              <Text style={styles.label}>Username, mobile number or email</Text>
              <View style={styles.phoneRow}>
                {/* Country code picker only shown while the input looks like a phone number */}
                {isPhoneNumber && (
                  <TouchableOpacity
                    style={styles.countryPicker}
                    onPress={() => setPickerVisible(true)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.flag}>{countryCode.flag}</Text>
                    <Text style={styles.codeText}>{countryCode.code}</Text>
                    <Ionicons name="chevron-down" size={14} color="rgba(255,255,255,0.6)" />
                  </TouchableOpacity>
                )}

                <TextInput
                  style={styles.phoneInput}
                  placeholder="Username, mobile number or email"
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>

              {/* Password */}
              <View style={styles.passwordRow}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  placeholderTextColor={Colors.textMuted}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((v) => !v)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="rgba(255,255,255,0.6)"
                  />
                </TouchableOpacity>
              </View>

              {/* Login */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleLogin}
                disabled={loading}
              >
                <LinearGradient
                  colors={Colors.gradients.secondary}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientBtn}
                >
                  <Text style={styles.loginText}>
                    {loading ? "Logging in..." : "Log in"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Skip For Now */}
              {/* <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
                <Text style={styles.skipText}>Skip for now</Text>
              </TouchableOpacity> */}

              {/* Forgot */}
              <TouchableOpacity onPress={() => router.push("/forgot-password")}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* New account? Register — pinned below the centered form */}
            <View style={styles.registerRow}>
              <Text style={styles.registerMuted}>New account? </Text>
              <TouchableOpacity onPress={() => router.push("/username")}>
                <Text style={styles.registerLink} >Register</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.footer}>Krizil</Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Country code picker — plain overlay View, not native Modal */}
      {pickerVisible && (
        <View style={styles.pickerOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            activeOpacity={1}
            onPress={() => setPickerVisible(false)}
          />
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Select country code</Text>
            <FlatList
              data={COUNTRY_CODES}
              keyExtractor={(item) => item.code + item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalRow}
                  onPress={() => {
                    setCountryCode(item);
                    setPickerVisible(false);
                  }}
                >
                  <Text style={styles.flag}>{item.flag}</Text>
                  <Text style={styles.modalRowText}>{item.name}</Text>
                  <Text style={styles.modalRowCode}>{item.code}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0f0c1e",
  },
  safe: {
    flex: 1,
  },
  glowTop: {
    position: "absolute",
    top: -60,
    right: -60,
    borderRadius: 999,
    backgroundColor: "rgba(127,119,221,0.22)",
  },
  glowBottom: {
    position: "absolute",
    bottom: -80,
    left: -80,
    borderRadius: 999,
    backgroundColor: "rgba(212,83,126,0.16)",
  },

  content: {
    flexGrow: 1,
    paddingTop: 24,
    paddingBottom: 24,
  },

  formSection: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },

  label: {
    fontSize: 12,
    color: "rgba(255,255,255,0.55)",
    marginBottom: 8,
  },

  phoneRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  countryPicker: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    backgroundColor: Colors.bgInput,
    gap: 4,
  },
  flag: {
    fontSize: 16,
  },
  codeText: {
    color: Colors.textPrimary,
    fontSize: 14,
    marginRight: 2,
  },
  phoneInput: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.bgInput,
    fontSize: 15,
    color: Colors.textPrimary,
  },

  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: Colors.bgInput,
  },
  passwordInput: {
    flex: 1,
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

  skipText: {
    textAlign: "center",
    marginTop: 15,
    color: Colors.primaryLight,
    fontSize: 15,
    fontWeight: "600",
  },

  forgotText: {
    textAlign: "center",
    marginTop: 20,
    color: Colors.textSecondary,
    fontWeight: "500",
  },

  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  registerMuted: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  registerLink: {
    color: Colors.primaryLight,
    fontSize: 14,
    fontWeight: "700",
  },

  footer: {
    textAlign: "center",
    marginBottom: 8,
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },

  pickerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    zIndex: 999,
    elevation: 999,
  },
  modalSheet: {
    backgroundColor: "#1a1530",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    maxHeight: "60%",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  modalRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,0.1)",
    gap: 10,
  },
  modalRowText: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
  },
  modalRowCode: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
  },
});