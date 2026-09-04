// // import React, { useEffect, useState } from "react";

// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   Switch,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Alert,
// //   Image,
// //   ScrollView,
// //   ActivityIndicator,
// // } from "react-native";

// // import { useDispatch, useSelector } from "react-redux";

// // import * as ImagePicker from "expo-image-picker";

// // import { router } from "expo-router";

// // import { getMediaUrl } from "../../src/utils/media";

// // import {
// //   getProfile,
// //   updateProfile,
// //   uploadAvatar,
// //   deleteAvatar,
// // } from "../../src/redux/profileSlice";

// // import { getUser } from "../../src/utils/storage";

// // export default function EditProfile() {
// //   const dispatch = useDispatch();

// //   const { profileData, loading } = useSelector(
// //     (state) => state.profile
// //   );

// //   const [userId, setUserId] = useState(null);

// //   const [fullName, setFullName] = useState("");
// //   const [bio, setBio] = useState("");
// //   const [gender, setGender] = useState("male");
// //   const [showGender, setShowGender] = useState(false);
// //   const [isPrivate, setIsPrivate] = useState(false);

// //   // =====================================================
// //   // LOAD USER
// //   // =====================================================

// //   useEffect(() => {
// //     const loadUser = async () => {
// //       try {
// //         const user = await getUser();

// //         if (user?.id) {
// //           setUserId(user.id);

// //           dispatch(getProfile(user.id));
// //         }
// //       } catch (error) {
// //         console.log("LOAD USER ERROR =>", error);
// //       }
// //     };

// //     loadUser();
// //   }, [dispatch]);

// //   // =====================================================
// //   // LOAD PROFILE DATA
// //   // =====================================================

// //   useEffect(() => {
// //     if (!profileData) {
// //       return;
// //     }

// //     setFullName(profileData.full_name || "");
// //     setBio(profileData.bio || "");
// //     setGender(profileData.gender || "male");
// //     setIsPrivate(profileData.is_private || false);
// //   }, [profileData]);

// //   // =====================================================
// //   // OPEN GALLERY
// //   // SAME FLOW AS PROFILE HEADER
// //   // =====================================================

// //   const handleUploadAvatar = async () => {
// //     try {
// //       if (!userId) {
// //         Alert.alert("Error", "User information not available");
// //         return;
// //       }

// //       const permission =
// //         await ImagePicker.requestMediaLibraryPermissionsAsync();

// //       if (!permission.granted) {
// //         Alert.alert(
// //           "Permission Required",
// //           "Please allow gallery access"
// //         );
// //         return;
// //       }

// //       const result =
// //         await ImagePicker.launchImageLibraryAsync({
// //           mediaTypes:
// //             ImagePicker.MediaTypeOptions.Images,

// //           // IMPORTANT:
// //           // Native Android crop disabled.
// //           // We use our own AvatarCrop screen.
// //           allowsEditing: false,

// //           quality: 1,
// //         });

// //       if (result.canceled) {
// //         return;
// //       }

// //       const image = result.assets?.[0];

// //       if (!image?.uri) {
// //         return;
// //       }

// //       // =================================================
// //       // OPEN SAME CUSTOM CROP SCREEN
// //       // =================================================

// //       router.push({
// //         pathname: "/profile-screens/avatar-crop",
// //         params: {
// //           imageUri: image.uri,
// //           userId: String(userId),
// //         },
// //       });
// //     } catch (error) {
// //       console.log(
// //         "SELECT AVATAR ERROR =>",
// //         error
// //       );

// //       Alert.alert(
// //         "Error",
// //         "Unable to select image"
// //       );
// //     }
// //   };

// //   // =====================================================
// //   // SAVE PROFILE
// //   // =====================================================

// //   const handleSave = async () => {
// //     try {
// //       if (!userId) {
// //         Alert.alert(
// //           "Error",
// //           "User information not available"
// //         );
// //         return;
// //       }

// //       await dispatch(
// //         updateProfile({
// //           userId,

// //           profileData: {
// //             full_name: fullName,
// //             bio,
// //             gender,
// //             is_private: isPrivate,
// //           },
// //         })
// //       ).unwrap();

// //       // Refresh profile after update
// //       await dispatch(
// //         getProfile(userId)
// //       );

// //       Alert.alert(
// //         "Success",
// //         "Profile updated successfully"
// //       );

// //       router.back();
// //     } catch (error) {
// //       console.log(
// //         "UPDATE PROFILE ERROR =>",
// //         error
// //       );

// //       Alert.alert(
// //         "Error",
// //         typeof error === "string"
// //           ? error
// //           : "Failed to update profile"
// //       );
// //     }
// //   };

// //   // =====================================================
// //   // AVATAR URL
// //   // =====================================================

// //   const avatarUrl = getMediaUrl(
// //     profileData?.avatar_url
// //   );

// //   return (
// //     <ScrollView
// //       style={styles.container}
// //       showsVerticalScrollIndicator={false}
// //     >
// //       {/* ================================================= */}
// //       {/* HEADER */}
// //       {/* ================================================= */}

// //       <View style={styles.headerRow}>
// //         <TouchableOpacity
// //           onPress={() => router.back()}
// //         >
// //           <Text style={styles.backBtn}>
// //             ←
// //           </Text>
// //         </TouchableOpacity>

// //         <Text style={styles.header}>
// //           Edit profile
// //         </Text>

// //         <View style={{ width: 30 }} />
// //       </View>

// //       {/* ================================================= */}
// //       {/* AVATAR */}
// //       {/* ================================================= */}

// //       <View style={styles.avatarSection}>
// //         <TouchableOpacity
// //           onPress={handleUploadAvatar}
// //           activeOpacity={0.8}
// //         >
// //           {avatarUrl ? (
// //             <Image
// //               source={{
// //                 uri: avatarUrl,
// //               }}
// //               style={styles.avatar}
// //             />
// //           ) : (
// //             <View style={styles.avatarPlaceholder}>
// //               <Text style={styles.avatarPlaceholderText}>
// //                 +
// //               </Text>
// //             </View>
// //           )}
// //         </TouchableOpacity>

// //         <TouchableOpacity
// //           onPress={handleUploadAvatar}
// //         >
// //           <Text style={styles.changePhoto}>
// //             Edit picture or avatar
// //           </Text>
// //         </TouchableOpacity>
// //       </View>

// //       {/* ================================================= */}
// //       {/* NAME */}
// //       {/* ================================================= */}

// //       <View style={styles.card}>
// //         <Text style={styles.cardLabel}>
// //           Name
// //         </Text>

// //         <TextInput
// //           value={fullName}
// //           onChangeText={setFullName}
// //           style={styles.cardInput}
// //           placeholder="Name"
// //           placeholderTextColor="#666"
// //         />
// //       </View>

// //       {/* ================================================= */}
// //       {/* USERNAME */}
// //       {/* ================================================= */}

// //       <View style={styles.card}>
// //         <Text style={styles.cardLabel}>
// //           Username
// //         </Text>

// //         <Text style={styles.readOnlyText}>
// //           {profileData?.username || ""}
// //         </Text>
// //       </View>

// //       {/* ================================================= */}
// //       {/* BIO */}
// //       {/* ================================================= */}

// //       <View style={styles.card}>
// //         <Text style={styles.cardLabel}>
// //           Bio
// //         </Text>

// //         <TextInput
// //           value={bio}
// //           onChangeText={setBio}
// //           multiline
// //           style={[
// //             styles.cardInput,
// //             styles.bioInput,
// //           ]}
// //           placeholder="Bio"
// //           placeholderTextColor="#666"
// //         />
// //       </View>

// //       {/* ================================================= */}
// //       {/* ADD LINK */}
// //       {/* ================================================= */}

// //       <TouchableOpacity
// //         style={styles.linkSection}
// //       >
// //         <Text style={styles.linkText}>
// //           Add link
// //         </Text>
// //       </TouchableOpacity>

// //       {/* ================================================= */}
// //       {/* ADD BANNER */}
// //       {/* ================================================= */}

// //       <TouchableOpacity
// //         style={styles.linkSection}
// //       >
// //         <Text style={styles.linkText}>
// //           Add banners
// //         </Text>

// //         <Text style={styles.subText}>
// //           Add music, profiles and more.
// //         </Text>
// //       </TouchableOpacity>

// //       {/* ================================================= */}
// //       {/* GENDER */}
// //       {/* ================================================= */}

// //       <TouchableOpacity
// //         style={styles.genderCard}
// //         onPress={() =>
// //           setShowGender(!showGender)
// //         }
// //       >
// //         <View>
// //           <Text style={styles.cardLabel}>
// //             Gender
// //           </Text>

// //           <Text style={styles.genderValue}>
// //             {gender}
// //           </Text>
// //         </View>

// //         <Text style={styles.arrow}>
// //           {showGender ? "▲" : "▼"}
// //         </Text>
// //       </TouchableOpacity>

// //       {showGender && (
// //         <View style={styles.dropdown}>
// //           {[
// //             "male",
// //             "female",
// //             "other",
// //           ].map((item) => (
// //             <TouchableOpacity
// //               key={item}
// //               style={styles.option}
// //               onPress={() => {
// //                 setGender(item);
// //                 setShowGender(false);
// //               }}
// //             >
// //               <Text style={styles.optionText}>
// //                 {item}
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>
// //       )}

// //       {/* ================================================= */}
// //       {/* PRIVATE ACCOUNT */}
// //       {/* ================================================= */}

// //       <View style={styles.switchCard}>
// //         <View style={styles.switchContent}>
// //           <Text style={styles.switchTitle}>
// //             Private Account
// //           </Text>

// //           <Text style={styles.subText}>
// //             Only approved followers can see your
// //             content
// //           </Text>
// //         </View>

// //         <Switch
// //           value={isPrivate}
// //           onValueChange={setIsPrivate}
// //         />
// //       </View>

// //       {/* ================================================= */}
// //       {/* SAVE */}
// //       {/* ================================================= */}

// //       <TouchableOpacity
// //         style={[
// //           styles.saveBtn,
// //           loading && styles.saveBtnDisabled,
// //         ]}
// //         onPress={handleSave}
// //         disabled={loading}
// //       >
// //         <Text style={styles.saveText}>
// //           {loading ? "Saving..." : "Save"}
// //         </Text>
// //       </TouchableOpacity>
// //     </ScrollView>
// //   );
// // }

// // // =======================================================
// // // STYLES
// // // =======================================================

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#000",
// //     paddingHorizontal: 16,
// //   },

// //   headerRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginTop: 50,
// //     marginBottom: 25,
// //   },

// //   backBtn: {
// //     color: "#fff",
// //     fontSize: 30,
// //   },

// //   header: {
// //     color: "#fff",
// //     fontSize: 28,
// //     fontWeight: "700",
// //   },

// //   avatarSection: {
// //     alignItems: "center",
// //     marginBottom: 25,
// //   },

// //   avatar: {
// //     width: 90,
// //     height: 90,
// //     borderRadius: 45,
// //     backgroundColor: "#222",
// //   },

// //   avatarPlaceholder: {
// //     width: 90,
// //     height: 90,
// //     borderRadius: 45,
// //     backgroundColor: "#222",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },

// //   avatarPlaceholderText: {
// //     color: "#aaa",
// //     fontSize: 32,
// //   },

// //   changePhoto: {
// //     color: "#8E8EFF",
// //     fontSize: 15,
// //     marginTop: 10,
// //     fontWeight: "500",
// //   },

// //   card: {
// //     backgroundColor: "#0D1117",
// //     borderWidth: 1,
// //     borderColor: "#222",
// //     borderRadius: 18,
// //     paddingHorizontal: 16,
// //     paddingVertical: 14,
// //     marginBottom: 12,
// //   },

// //   cardLabel: {
// //     color: "#8e8e8e",
// //     fontSize: 13,
// //     marginBottom: 4,
// //   },

// //   cardInput: {
// //     color: "#fff",
// //     fontSize: 17,
// //     padding: 0,
// //   },

// //   bioInput: {
// //     minHeight: 60,
// //     textAlignVertical: "top",
// //   },

// //   readOnlyText: {
// //     color: "#fff",
// //     fontSize: 17,
// //   },

// //   linkSection: {
// //     marginTop: 10,
// //     marginBottom: 20,
// //   },

// //   linkText: {
// //     color: "#fff",
// //     fontSize: 16,
// //     fontWeight: "500",
// //   },

// //   subText: {
// //     color: "#8e8e8e",
// //     marginTop: 2,
// //     fontSize: 13,
// //   },

// //   genderCard: {
// //     backgroundColor: "#0D1117",
// //     borderWidth: 1,
// //     borderColor: "#222",
// //     borderRadius: 18,
// //     paddingHorizontal: 16,
// //     paddingVertical: 16,
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //   },

// //   genderValue: {
// //     color: "#fff",
// //     fontSize: 17,
// //     fontWeight: "500",
// //   },

// //   arrow: {
// //     color: "#fff",
// //     fontSize: 14,
// //   },

// //   dropdown: {
// //     backgroundColor: "#0A0F1A",
// //     borderRadius: 16,
// //     marginTop: 6,
// //     overflow: "hidden",
// //     borderWidth: 1,
// //     borderColor: "#1F2937",
// //   },

// //   option: {
// //     paddingVertical: 14,
// //     paddingHorizontal: 16,
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#222",
// //   },

// //   optionText: {
// //     color: "#fff",
// //     fontSize: 15,
// //   },

// //   switchCard: {
// //     marginTop: 25,
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //   },

// //   switchContent: {
// //     flex: 1,
// //     paddingRight: 15,
// //   },

// //   switchTitle: {
// //     color: "#fff",
// //     fontSize: 16,
// //     fontWeight: "600",
// //   },

// //   saveBtn: {
// //     backgroundColor: "#2563EB",
// //     height: 48,
// //     borderRadius: 12,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     marginTop: 30,
// //     marginBottom: 40,
// //   },

// //   saveBtnDisabled: {
// //     opacity: 0.6,
// //   },

// //   saveText: {
// //     color: "#fff",
// //     fontSize: 16,
// //     fontWeight: "600",
// //   },
// // });

// import React, { useEffect, useState } from "react";

// import {
//   View,
//   Text,
//   TextInput,
//   Switch,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Image,
//   ScrollView,
//   ActivityIndicator,
//   Modal,
// } from "react-native";

// import { useDispatch, useSelector } from "react-redux";

// import * as ImagePicker from "expo-image-picker";

// import { router } from "expo-router";

// import { Ionicons } from "@expo/vector-icons";

// import { getMediaUrl } from "../../src/utils/media";

// import {
//   getProfile,
//   updateProfile,
// } from "../../src/redux/profileSlice";

// import { getUser } from "../../src/utils/storage";

// export default function EditProfile() {
//   const dispatch = useDispatch();

//   const {
//     profileData,
//     loading,
//   } = useSelector(
//     (state) => state.profile
//   );

//   // =====================================================
//   // STATE
//   // =====================================================

//   const [userId, setUserId] =
//     useState(null);

//   const [username, setUsername] =
//     useState("");

//   const [fullName, setFullName] =
//     useState("");

//   const [bio, setBio] =
//     useState("");

//   const [gender, setGender] =
//     useState("male");

//   const [accountType, setAccountType] =
//     useState("personal");

//   const [businessName, setBusinessName] =
//     useState("");

//   const [businessCategory, setBusinessCategory] =
//     useState("");

//   const [businessDescription, setBusinessDescription] =
//     useState("");

//   const [isPrivate, setIsPrivate] =
//     useState(false);

//   const [showGender, setShowGender] =
//     useState(false);

//   const [showAccountType, setShowAccountType] =
//     useState(false);

//   const [showBusinessFields, setShowBusinessFields] =
//     useState(false);

//   const [saving, setSaving] =
//     useState(false);

//   // =====================================================
//   // LOAD USER
//   // =====================================================

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const user = await getUser();

//         console.log(
//           "EDIT PROFILE STORAGE USER =>",
//           user
//         );

//         if (user?.id) {
//           setUserId(user.id);

//           await dispatch(
//             getProfile(user.id)
//           );
//         }
//       } catch (error) {
//         console.log(
//           "LOAD USER ERROR =>",
//           error
//         );
//       }
//     };

//     loadUser();
//   }, [dispatch]);

//   // =====================================================
//   // LOAD PROFILE INTO FORM
//   // =====================================================

//   useEffect(() => {
//     if (!profileData) {
//       return;
//     }

//     console.log(
//       "EDIT PROFILE DATA =>",
//       profileData
//     );

//     setUsername(
//       profileData.username || ""
//     );

//     setFullName(
//       profileData.full_name || ""
//     );

//     setBio(
//       profileData.bio || ""
//     );

//     setGender(
//       profileData.gender || "male"
//     );

//     setAccountType(
//       profileData.account_type ||
//         "personal"
//     );

//     setBusinessName(
//       profileData.business_name || ""
//     );

//     setBusinessCategory(
//       profileData.business_category ||
//         ""
//     );

//     setBusinessDescription(
//       profileData.business_description ||
//         ""
//     );

//     setIsPrivate(
//       Boolean(profileData.is_private)
//     );
//   }, [profileData]);

//   // =====================================================
//   // AVATAR
//   // =====================================================

//   const handleUploadAvatar = async () => {
//     try {
//       if (!userId) {
//         Alert.alert(
//           "Error",
//           "User information not available"
//         );
//         return;
//       }

//       const permission =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (!permission.granted) {
//         Alert.alert(
//           "Permission Required",
//           "Please allow gallery access"
//         );
//         return;
//       }

//       const result =
//         await ImagePicker.launchImageLibraryAsync({
//           mediaTypes:
//             ImagePicker.MediaTypeOptions.Images,

//           allowsEditing: false,

//           quality: 1,
//         });

//       if (result.canceled) {
//         return;
//       }

//       const image =
//         result.assets?.[0];

//       if (!image?.uri) {
//         return;
//       }

//       router.push({
//         pathname:
//           "/profile-screens/avatar-crop",

//         params: {
//           imageUri: image.uri,
//           userId: String(userId),
//         },
//       });
//     } catch (error) {
//       console.log(
//         "SELECT AVATAR ERROR =>",
//         error
//       );

//       Alert.alert(
//         "Error",
//         "Unable to select image"
//       );
//     }
//   };

//   // =====================================================
//   // SAVE PROFILE
//   // =====================================================

//   const handleSave = async () => {
//     try {
//       if (!userId) {
//         Alert.alert(
//           "Error",
//           "User information not available"
//         );
//         return;
//       }

//       // -----------------------------------------------
//       // VALIDATION
//       // -----------------------------------------------

//       const cleanUsername =
//         username.trim();

//       if (!cleanUsername) {
//         Alert.alert(
//           "Username required",
//           "Please enter a username"
//         );
//         return;
//       }

//       if (
//         !/^[a-zA-Z0-9._]+$/.test(
//           cleanUsername
//         )
//       ) {
//         Alert.alert(
//           "Invalid username",
//           "Username can contain letters, numbers, dots and underscores"
//         );
//         return;
//       }

//       if (
//         accountType === "business" &&
//         !businessName.trim()
//       ) {
//         Alert.alert(
//           "Business name required",
//           "Please enter your business name"
//         );
//         return;
//       }

//       setSaving(true);

//       // -----------------------------------------------
//       // UPDATE PROFILE
//       // -----------------------------------------------

//       const updateData = {
//         username: cleanUsername,

//         full_name:
//           fullName.trim(),

//         bio:
//           bio.trim(),

//         gender,

//         is_private:
//           isPrivate,

//         account_type:
//           accountType,

//         business_name:
//           accountType === "business"
//             ? businessName.trim()
//             : null,

//         business_category:
//           accountType === "business"
//             ? businessCategory.trim()
//             : null,

//         business_description:
//           accountType === "business"
//             ? businessDescription.trim()
//             : null,
//       };

//       console.log(
//         "UPDATE PROFILE PAYLOAD =>",
//         updateData
//       );

//       const updatedProfile =
//         await dispatch(
//           updateProfile({
//             userId,
//             profileData:
//               updateData,
//           })
//         ).unwrap();

//       console.log(
//         "UPDATED PROFILE =>",
//         updatedProfile
//       );

//       // -----------------------------------------------
//       // GET LATEST PROFILE
//       // -----------------------------------------------

//       await dispatch(
//         getProfile(userId)
//       ).unwrap();

//       Alert.alert(
//         "Success",
//         "Profile updated successfully",
//         [
//           {
//             text: "OK",
//             onPress: () => {
//               router.back();
//             },
//           },
//         ]
//       );
//     } catch (error) {
//       console.log(
//         "UPDATE PROFILE ERROR =>",
//         error
//       );

//       let message =
//         "Failed to update profile";

//       if (typeof error === "string") {
//         message = error;
//       } else if (
//         error?.detail
//       ) {
//         if (Array.isArray(error.detail)) {
//           message =
//             error.detail
//               .map(
//                 (item) =>
//                   item?.msg ||
//                   "Validation error"
//               )
//               .join("\n");
//         } else {
//           message =
//             String(error.detail);
//         }
//       }

//       Alert.alert(
//         "Update Failed",
//         message
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   // =====================================================
//   // AVATAR URL
//   // =====================================================

//   const avatarUrl =
//     profileData?.avatar_url
//       ? getMediaUrl(
//           profileData.avatar_url
//         )
//       : null;

//   // =====================================================
//   // ACCOUNT TYPE CHANGE
//   // =====================================================

//   const handleAccountTypeChange = (
//     type
//   ) => {
//     setAccountType(type);
//     setShowAccountType(false);

//     if (type === "business") {
//       setShowBusinessFields(true);
//     } else {
//       setShowBusinessFields(false);
//     }
//   };

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <View style={styles.screen}>
//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={
//           styles.contentContainer
//         }
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >

//         {/* ================================================= */}
//         {/* HEADER */}
//         {/* ================================================= */}

//         <View style={styles.headerRow}>
//           <TouchableOpacity
//             onPress={() =>
//               router.back()
//             }
//             hitSlop={10}
//           >
//            <Ionicons
//   name="chevron-back"
//   size={28}
//   color="#fff"
// />
//           </TouchableOpacity>

//           <Text
//             style={styles.header}
//           >
//             Edit profile
//           </Text>

//           <View
//             style={{
//               width: 30,
//             }}
//           />
//         </View>

//         {/* ================================================= */}
//         {/* AVATAR */}
//         {/* ================================================= */}

//         <View
//           style={styles.avatarSection}
//         >
//           <TouchableOpacity
//             onPress={
//               handleUploadAvatar
//             }
//             activeOpacity={0.8}
//           >
//             {avatarUrl ? (
//               <Image
//                 source={{
//                   uri: avatarUrl,
//                 }}
//                 style={styles.avatar}
//               />
//             ) : (
//               <View
//                 style={
//                   styles.avatarPlaceholder
//                 }
//               >
//                 <Text
//                   style={
//                     styles.avatarPlaceholderText
//                   }
//                 >
//                   +
//                 </Text>
//               </View>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={
//               handleUploadAvatar
//           }
//           >
//             <Text
//               style={
//                 styles.changePhoto
//               }
//             >
//               Edit picture or avatar
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* ================================================= */}
//         {/* USERNAME */}
//         {/* ================================================= */}

//         <View style={styles.card}>
//           <Text
//             style={styles.cardLabel}
//           >
//             Username
//           </Text>

//           <TextInput
//             value={username}
//             onChangeText={
//               setUsername
//             }
//             style={
//               styles.cardInput
//             }
//             placeholder="Username"
//             placeholderTextColor="#666"
//             autoCapitalize="none"
//             autoCorrect={false}
//           />
//         </View>

//         {/* ================================================= */}
//         {/* FULL NAME */}
//         {/* ================================================= */}

//         <View style={styles.card}>
//           <Text
//             style={styles.cardLabel}
//           >
//             Name
//           </Text>

//           <TextInput
//             value={fullName}
//             onChangeText={
//               setFullName
//             }
//             style={
//               styles.cardInput
//             }
//             placeholder="Name"
//             placeholderTextColor="#666"
//           />
//         </View>

//         {/* ================================================= */}
//         {/* BIO */}
//         {/* ================================================= */}

//         <View style={styles.card}>
//           <Text
//             style={styles.cardLabel}
//           >
//             Bio
//           </Text>

//           <TextInput
//             value={bio}
//             onChangeText={setBio}
//             multiline
//             maxLength={150}
//             style={[
//               styles.cardInput,
//               styles.bioInput,
//             ]}
//             placeholder="Bio"
//             placeholderTextColor="#666"
//           />

//           <Text
//             style={styles.characterCount}
//           >
//             {bio.length}/150
//           </Text>
//         </View>

//         {/* ================================================= */}
//         {/* ADD LINK */}
//         {/* ================================================= */}

//         <TouchableOpacity
//           style={styles.actionSection}
//           activeOpacity={0.7}
//           onPress={() =>
//             Alert.alert(
//               "Add Link",
//               "Link saving needs a backend field or API endpoint. Your current profile PUT API does not expose a link field."
//             )
//           }
//         >
//           <View>
//             <Text
//               style={styles.actionTitle}
//             >
//               Add link
//             </Text>

//             <Text
//               style={styles.actionSubText}
//             >
//               Add a website or social link
//             </Text>
//           </View>

//          <Ionicons
//   name="chevron-forward"
//   size={22}
//   color="#888"
// />
//         </TouchableOpacity>

//         {/* ================================================= */}
//         {/* ADD BANNERS */}
//         {/* ================================================= */}

//         <TouchableOpacity
//           style={styles.actionSection}
//           activeOpacity={0.7}
//           onPress={() =>
//             Alert.alert(
//               "Add banners",
//               "Banner saving needs a backend field or API endpoint. Your current profile PUT API does not expose banner fields."
//             )
//           }
//         >
//           <View>
//             <Text
//               style={styles.actionTitle}
//             >
//               Add banners
//             </Text>

//             <Text
//               style={styles.actionSubText}
//             >
//               Add music, profiles and more
//             </Text>
//           </View>

//          <Ionicons
//   name="chevron-forward"
//   size={22}
//   color="#888"
// />
//         </TouchableOpacity>

//         {/* ================================================= */}
//         {/* GENDER */}
//         {/* ================================================= */}

//         <TouchableOpacity
//           style={styles.selectCard}
//           onPress={() =>
//             setShowGender(
//               !showGender
//             )
//           }
//         >
//           <View>
//             <Text
//               style={styles.cardLabel}
//             >
//               Gender
//             </Text>

//             <Text
//               style={styles.selectValue}
//             >
//               {gender}
//             </Text>
//           </View>

//           <Ionicons
//   name={
//     showGender
//       ? "chevron-up"
//       : "chevron-down"
//   }
//   size={20}
//   color="#fff"
// />
//         </TouchableOpacity>

//         {showGender && (
//           <View
//             style={styles.dropdown}
//           >
//             {[
//               "male",
//               "female",
//               "other",
//             ].map((item) => (
//               <TouchableOpacity
//                 key={item}
//                 style={
//                   styles.option
//                 }
//                 onPress={() => {
//                   setGender(item);
//                   setShowGender(false);
//                 }}
//               >
//                 <Text
//                   style={
//                     styles.optionText
//                   }
//                 >
//                   {item}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}

//         {/* ================================================= */}
//         {/* ACCOUNT TYPE */}
//         {/* ================================================= */}

//         <TouchableOpacity
//           style={[
//             styles.selectCard,
//             styles.accountCard,
//           ]}
//           onPress={() =>
//             setShowAccountType(
//               !showAccountType
//             )
//           }
//         >
//           <View>
//             <Text
//               style={styles.cardLabel}
//             >
//               Account type
//             </Text>

//             <Text
//               style={styles.selectValue}
//             >
//               {accountType}
//             </Text>
//           </View>

//         <Ionicons
//   name={
//     showAccountType
//       ? "chevron-up"
//       : "chevron-down"
//   }
//   size={20}
//   color="#fff"
// />
//         </TouchableOpacity>

//         {showAccountType && (
//           <View
//             style={styles.dropdown}
//           >
//             <TouchableOpacity
//               style={styles.option}
//               onPress={() =>
//                 handleAccountTypeChange(
//                   "personal"
//                 )
//               }
//             >
//               <Text
//                 style={
//                   styles.optionText
//                 }
//               >
//                 Personal
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.option}
//               onPress={() =>
//                 handleAccountTypeChange(
//                   "business"
//                 )
//               }
//             >
//               <Text
//                 style={
//                   styles.optionText
//                 }
//               >
//                 Business
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* ================================================= */}
//         {/* BUSINESS DETAILS */}
//         {/* ================================================= */}

//         {accountType ===
//           "business" && (
//           <View
//             style={
//               styles.businessContainer
//             }
//           >
//             <Text
//               style={
//                 styles.businessHeading
//               }
//             >
//               Business details
//             </Text>

//             {/* BUSINESS NAME */}

//             <View
//               style={styles.card}
//             >
//               <Text
//                 style={
//                   styles.cardLabel
//                 }
//               >
//                 Business name
//               </Text>

//               <TextInput
//                 value={
//                   businessName
//                 }
//                 onChangeText={
//                   setBusinessName
//                 }
//                 style={
//                   styles.cardInput
//                 }
//                 placeholder="Business name"
//                 placeholderTextColor="#666"
//               />
//             </View>

//             {/* BUSINESS CATEGORY */}

//             <View
//               style={styles.card}
//             >
//               <Text
//                 style={
//                   styles.cardLabel
//                 }
//               >
//                 Business category
//               </Text>

//               <TextInput
//                 value={
//                   businessCategory
//                 }
//                 onChangeText={
//                   setBusinessCategory
//                 }
//                 style={
//                   styles.cardInput
//                 }
//                 placeholder="Business category"
//                 placeholderTextColor="#666"
//               />
//             </View>

//             {/* BUSINESS DESCRIPTION */}

//             <View
//               style={styles.card}
//             >
//               <Text
//                 style={
//                   styles.cardLabel
//                 }
//               >
//                 Business description
//               </Text>

//               <TextInput
//                 value={
//                   businessDescription
//                 }
//                 onChangeText={
//                   setBusinessDescription
//                 }
//                 multiline
//                 maxLength={300}
//                 style={[
//                   styles.cardInput,
//                   styles.businessDescription,
//                 ]}
//                 placeholder="Describe your business"
//                 placeholderTextColor="#666"
//               />
//             </View>
//           </View>
//         )}

//         {/* ================================================= */}
//         {/* PRIVATE ACCOUNT */}
//         {/* ================================================= */}

//         <View
//           style={styles.switchCard}
//         >
//           <View
//             style={styles.switchContent}
//           >
//             <Text
//               style={
//                 styles.switchTitle
//               }
//             >
//               Private Account
//             </Text>

//             <Text
//               style={styles.subText}
//             >
//               Only approved followers
//               can see your content
//             </Text>
//           </View>

//           <Switch
//             value={isPrivate}
//             onValueChange={
//               setIsPrivate
//             }
//             trackColor={{
//               false: "#333",
//               true: "#2563EB",
//             }}
//             thumbColor="#fff"
//           />
//         </View>

//         {/* ================================================= */}
//         {/* SAVE */}
//         {/* ================================================= */}

//         <TouchableOpacity
//           style={[
//             styles.saveBtn,
//             (loading || saving) &&
//               styles.saveBtnDisabled,
//           ]}
//           onPress={
//             handleSave
//           }
//           disabled={
//             loading || saving
//           }
//           activeOpacity={0.8}
//         >
//           {loading || saving ? (
//             <ActivityIndicator
//               color="#fff"
//             />
//           ) : (
//             <Text
//               style={styles.saveText}
//             >
//               Save
//             </Text>
//           )}
//         </TouchableOpacity>

//       </ScrollView>
//     </View>
//   );
// }

// // =======================================================
// // STYLES
// // =======================================================

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: "#000",
//   },

//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//     paddingHorizontal: 16,
//   },

//   contentContainer: {
//     paddingBottom: 50,
//   },

//   // =====================================================
//   // HEADER
//   // =====================================================

//   headerRow: {
//     flexDirection: "row",
//     justifyContent:
//       "space-between",
//     alignItems: "center",
//     marginTop: 50,
//     marginBottom: 25,
//   },

//   backBtn: {
//     color: "#fff",
//     fontSize: 30,
//   },

//   header: {
//     color: "#fff",
//     fontSize: 25,
//     fontWeight: "700",
//   },

//   // =====================================================
//   // AVATAR
//   // =====================================================

//   avatarSection: {
//     alignItems: "center",
//     marginBottom: 28,
//   },

//   avatar: {
//     width: 95,
//     height: 95,
//     borderRadius: 47.5,
//     backgroundColor: "#222",
//   },

//   avatarPlaceholder: {
//     width: 95,
//     height: 95,
//     borderRadius: 47.5,
//     backgroundColor: "#222",
//     justifyContent:
//       "center",
//     alignItems: "center",
//   },

//   avatarPlaceholderText: {
//     color: "#aaa",
//     fontSize: 32,
//   },

//   changePhoto: {
//     color: "#8E8EFF",
//     fontSize: 15,
//     marginTop: 10,
//     fontWeight: "500",
//   },

//   // =====================================================
//   // INPUT CARD
//   // =====================================================

//   card: {
//     backgroundColor: "#0D1117",
//     borderWidth: 1,
//     borderColor: "#222",
//     borderRadius: 18,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     marginBottom: 12,
//   },

//   cardLabel: {
//     color: "#8e8e8e",
//     fontSize: 13,
//     marginBottom: 5,
//   },

//   cardInput: {
//     color: "#fff",
//     fontSize: 17,
//     padding: 0,
//   },

//   bioInput: {
//     minHeight: 65,
//     textAlignVertical: "top",
//   },

//   businessDescription: {
//     minHeight: 80,
//     textAlignVertical: "top",
//   },

//   characterCount: {
//     color: "#666",
//     fontSize: 11,
//     textAlign: "right",
//     marginTop: 5,
//   },

//   // =====================================================
//   // ACTIONS
//   // =====================================================

//   actionSection: {
//     minHeight: 65,
//     flexDirection: "row",
//     justifyContent:
//       "space-between",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "#222",
//     paddingVertical: 12,
//   },

//   actionTitle: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "500",
//   },

//   actionSubText: {
//     color: "#777",
//     fontSize: 12,
//     marginTop: 4,
//   },

//   actionArrow: {
//     color: "#aaa",
//     fontSize: 28,
//   },

//   // =====================================================
//   // SELECT
//   // =====================================================

//   selectCard: {
//     backgroundColor: "#0D1117",
//     borderWidth: 1,
//     borderColor: "#222",
//     borderRadius: 18,
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     flexDirection: "row",
//     justifyContent:
//       "space-between",
//     alignItems: "center",
//     marginTop: 12,
//   },

//   accountCard: {
//     marginTop: 12,
//   },

//   selectValue: {
//     color: "#fff",
//     fontSize: 17,
//     fontWeight: "500",
//   },

//   arrow: {
//     color: "#fff",
//     fontSize: 14,
//   },

//   // =====================================================
//   // DROPDOWN
//   // =====================================================

//   dropdown: {
//     backgroundColor: "#0A0F1A",
//     borderRadius: 16,
//     marginTop: 6,
//     overflow: "hidden",
//     borderWidth: 1,
//     borderColor: "#1F2937",
//   },

//   option: {
//     paddingVertical: 15,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#222",
//   },

//   optionText: {
//     color: "#fff",
//     fontSize: 15,
//     textTransform: "capitalize",
//   },

//   // =====================================================
//   // BUSINESS
//   // =====================================================

//   businessContainer: {
//     marginTop: 15,
//   },

//   businessHeading: {
//     color: "#fff",
//     fontSize: 17,
//     fontWeight: "700",
//     marginBottom: 10,
//   },

//   // =====================================================
//   // PRIVATE
//   // =====================================================

//   switchCard: {
//     marginTop: 25,
//     flexDirection: "row",
//     justifyContent:
//       "space-between",
//     alignItems: "center",
//   },

//   switchContent: {
//     flex: 1,
//     paddingRight: 15,
//   },

//   switchTitle: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },

//   subText: {
//     color: "#8e8e8e",
//     marginTop: 3,
//     fontSize: 13,
//     lineHeight: 18,
//   },

//   // =====================================================
//   // SAVE
//   // =====================================================

//   saveBtn: {
//     backgroundColor: "#2563EB",
//     height: 50,
//     borderRadius: 12,
//     justifyContent:
//       "center",
//     alignItems: "center",
//     marginTop: 30,
//   },

//   saveBtnDisabled: {
//     opacity: 0.6,
//   },

//   saveText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });





import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import * as ImagePicker from "expo-image-picker";

import {
  router,
} from "expo-router";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  getMediaUrl,
} from "../../src/utils/media";

import {
  getProfile,
  updateProfile,
} from "../../src/redux/profileSlice";

import {
  getUser,
} from "../../src/utils/storage";

import ScreenLayout from "../../src/components/ScreenLayout";

export default function EditProfile() {

  const dispatch = useDispatch();


  // =====================================================
  // STORED USER
  // =====================================================

  const [
    storedUser,
    setStoredUser,
  ] = useState(null);


  // =====================================================
  // USER ID
  // =====================================================

  const [
    userId,
    setUserId,
  ] = useState(null);


  // =====================================================
  // PROFILE FROM REDUX
  // IMPORTANT:
  // profileSlice uses profiles[userId]
  // =====================================================

  const profileData = useSelector(
    (state) =>
      userId
        ? state.profile.profiles?.[userId]
        : null
  );


  const {
    loading,
  } = useSelector(
    (state) => state.profile
  );


  // =====================================================
  // FORM STATE
  // =====================================================

  const [
    username,
    setUsername,
  ] = useState("");

  const [
    fullName,
    setFullName,
  ] = useState("");

  const [
    bio,
    setBio,
  ] = useState("");

  const [
    gender,
    setGender,
  ] = useState("");

  const [
    accountType,
    setAccountType,
  ] = useState("");

  const [
    businessName,
    setBusinessName,
  ] = useState("");

  const [
    businessCategory,
    setBusinessCategory,
  ] = useState("");

  const [
    businessDescription,
    setBusinessDescription,
  ] = useState("");

  const [
    isPrivate,
    setIsPrivate,
  ] = useState(false);


  // =====================================================
  // UI STATE
  // =====================================================

  const [
    showGender,
    setShowGender,
  ] = useState(false);

  const [
    showAccountType,
    setShowAccountType,
  ] = useState(false);

  const [
    saving,
    setSaving,
  ] = useState(false);


  // =====================================================
  // LOAD USER
  // =====================================================

  useEffect(() => {

    const loadUser = async () => {

      try {

        const user =
          await getUser();

        console.log(
          "EDIT PROFILE STORED USER =>",
          user
        );

        if (!user?.id) {

          Alert.alert(
            "Error",
            "User information not available"
          );

          return;
        }

        setStoredUser(user);
        setUserId(user.id);

        console.log(
          "EDIT PROFILE USER ID =>",
          user.id
        );

        await dispatch(
          getProfile(user.id)
        ).unwrap();

      } catch (error) {

        console.log(
          "EDIT PROFILE LOAD USER ERROR =>",
          error
        );

      }

    };


    loadUser();

  }, [dispatch]);


  // =====================================================
  // LOAD SAVED PROFILE INTO FORM
  // =====================================================

  useEffect(() => {

    if (!profileData) {
      return;
    }


    console.log(
      "EDIT PROFILE SAVED PROFILE =>",
      profileData
    );


    // ---------------------------------------------------
    // USERNAME
    // ---------------------------------------------------

    setUsername(
      profileData.username ??
      storedUser?.username ??
      ""
    );


    // ---------------------------------------------------
    // FULL NAME
    // ---------------------------------------------------

    setFullName(
      profileData.full_name ??
      ""
    );


    // ---------------------------------------------------
    // BIO
    // ---------------------------------------------------

    setBio(
      profileData.bio ??
      ""
    );


    // ---------------------------------------------------
    // GENDER
    // ---------------------------------------------------

    setGender(
      profileData.gender ??
      ""
    );


    // ---------------------------------------------------
    // ACCOUNT TYPE
    // ---------------------------------------------------

    setAccountType(
      profileData.account_type ??
      "personal"
    );


    // ---------------------------------------------------
    // BUSINESS NAME
    // ---------------------------------------------------

    setBusinessName(
      profileData.business_name ??
      ""
    );


    // ---------------------------------------------------
    // BUSINESS CATEGORY
    // ---------------------------------------------------

    setBusinessCategory(
      profileData.business_category ??
      ""
    );


    // ---------------------------------------------------
    // BUSINESS DESCRIPTION
    // ---------------------------------------------------

    setBusinessDescription(
      profileData.business_description ??
      ""
    );


    // ---------------------------------------------------
    // PRIVATE ACCOUNT
    // ---------------------------------------------------

    setIsPrivate(
      Boolean(profileData.is_private)
    );

  }, [
    profileData,
    storedUser,
  ]);


  // =====================================================
  // AVATAR URL
  // =====================================================

  const avatarUrl =
    profileData?.avatar_url
      ? getMediaUrl(
          profileData.avatar_url
        )
      : null;


  // =====================================================
  // UPLOAD AVATAR
  // =====================================================

  const handleUploadAvatar =
    async () => {

      try {

        if (!userId) {

          Alert.alert(
            "Error",
            "User information not available"
          );

          return;
        }


        const permission =
          await ImagePicker
            .requestMediaLibraryPermissionsAsync();


        if (!permission.granted) {

          Alert.alert(
            "Permission Required",
            "Please allow gallery access"
          );

          return;
        }


        const result =
          await ImagePicker
            .launchImageLibraryAsync({

              mediaTypes:
                ImagePicker
                  .MediaTypeOptions
                  .Images,

              allowsEditing: false,

              quality: 1,

            });


        if (result.canceled) {
          return;
        }


        const image =
          result.assets?.[0];


        if (!image?.uri) {
          return;
        }


        console.log(
          "SELECTED AVATAR =>",
          image.uri
        );


        router.push({

          pathname:
            "/profile-screens/avatar-crop",

          params: {

            imageUri:
              image.uri,

            userId:
              String(userId),

          },

        });

      } catch (error) {

        console.log(
          "SELECT AVATAR ERROR =>",
          error
        );

        Alert.alert(
          "Error",
          "Unable to select image"
        );

      }

    };


  // =====================================================
  // ACCOUNT TYPE
  // =====================================================

  const handleAccountTypeChange =
    (type) => {

      setAccountType(type);

      setShowAccountType(false);


      // If changing to personal,
      // clear business fields locally.

      if (type === "personal") {

        setBusinessName("");
        setBusinessCategory("");
        setBusinessDescription("");

      }

    };


  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSave =
    async () => {

      try {

        if (!userId) {

          Alert.alert(
            "Error",
            "User information not available"
          );

          return;
        }


        // =================================================
        // USERNAME VALIDATION
        // =================================================

        const cleanUsername =
          username.trim();


        if (!cleanUsername) {

          Alert.alert(
            "Username required",
            "Please enter a username"
          );

          return;
        }


        if (
          !/^[a-zA-Z0-9._]+$/.test(
            cleanUsername
          )
        ) {

          Alert.alert(
            "Invalid username",
            "Username can contain letters, numbers, dots and underscores"
          );

          return;
        }


        // =================================================
        // BUSINESS VALIDATION
        // =================================================

        if (
          accountType === "business" &&
          !businessName.trim()
        ) {

          Alert.alert(
            "Business name required",
            "Please enter your business name"
          );

          return;
        }


        setSaving(true);


        // =================================================
        // UPDATE DATA
        // =================================================

        const updateData = {

          username:
            cleanUsername,

          full_name:
            fullName.trim(),

          bio:
            bio.trim(),

          gender:
            gender || null,

          is_private:
            isPrivate,

          account_type:
            accountType || "personal",

          business_name:
            accountType === "business"
              ? businessName.trim()
              : null,

          business_category:
            accountType === "business"
              ? businessCategory.trim()
              : null,

          business_description:
            accountType === "business"
              ? businessDescription.trim()
              : null,

        };


        console.log(
          "UPDATE PROFILE PAYLOAD =>",
          updateData
        );


        // =================================================
        // UPDATE PROFILE API
        // =================================================

        const updatedProfile =
          await dispatch(
            updateProfile({

              userId,

              profileData:
                updateData,

            })
          ).unwrap();


        console.log(
          "UPDATED PROFILE RESPONSE =>",
          updatedProfile
        );


        // =================================================
        // GET LATEST PROFILE
        // This updates:
        // state.profile.profiles[userId]
        // =================================================

        const latestProfile =
          await dispatch(
            getProfile(userId)
          ).unwrap();


        console.log(
          "LATEST PROFILE AFTER SAVE =>",
          latestProfile
        );


        Alert.alert(
          "Success",
          "Profile updated successfully",
          [
            {
              text: "OK",

              onPress: () => {

                router.back();

              },

            },
          ]
        );

      } catch (error) {

        console.log(
          "UPDATE PROFILE ERROR =>",
          error
        );


        let message =
          "Failed to update profile";


        if (
          typeof error === "string"
        ) {

          message = error;

        } else if (
          error?.detail
        ) {

          if (
            Array.isArray(
              error.detail
            )
          ) {

            message =
              error.detail
                .map(
                  (item) =>
                    item?.msg ||
                    item?.message ||
                    "Validation error"
                )
                .join("\n");

          } else {

            message =
              String(error.detail);

          }

        } else if (
          error?.message
        ) {

          message =
            error.message;

        }


        Alert.alert(
          "Update Failed",
          message
        );

      } finally {

        setSaving(false);

      }

    };


  // =====================================================
  // UI
  // =====================================================

  return (

      <ScreenLayout
    backgroundColor="#000"
    keyboardAvoid={true}
  >

      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.contentContainer
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <View
          style={styles.headerRow}
        >

          <TouchableOpacity
            onPress={() =>
              router.back()
            }
            hitSlop={10}
          >

            <Ionicons
              name="chevron-back"
              size={28}
              color="#fff"
            />

          </TouchableOpacity>


          <Text
            style={styles.header}
          >
            Edit profile
          </Text>


          <View
            style={{
              width: 30,
            }}
          />

        </View>


        {/* ================================================= */}
        {/* AVATAR */}
        {/* ================================================= */}

        <View
          style={styles.avatarSection}
        >

          <TouchableOpacity
            onPress={
              handleUploadAvatar
            }
            activeOpacity={0.8}
          >

            {avatarUrl ? (

              <Image
                source={{
                  uri: avatarUrl,
                }}
                style={styles.avatar}
              />

            ) : (

              <View
                style={
                  styles.avatarPlaceholder
                }
              >

                <Ionicons
                  name="person"
                  size={38}
                  color="#777"
                />

              </View>

            )}

          </TouchableOpacity>


          <TouchableOpacity
            onPress={
              handleUploadAvatar
            }
          >

            <Text
              style={
                styles.changePhoto
              }
            >
              Edit picture or avatar
            </Text>

          </TouchableOpacity>

        </View>


        {/* ================================================= */}
        {/* USERNAME */}
        {/* ================================================= */}

        <View style={styles.card}>

          <Text
            style={styles.cardLabel}
          >
            Username
          </Text>


          <TextInput
            value={username}
            onChangeText={
              setUsername
            }
            style={
              styles.cardInput
            }
            placeholder="Username"
            placeholderTextColor="#666"
            autoCapitalize="none"
            autoCorrect={false}
          />

        </View>


        {/* ================================================= */}
        {/* NAME */}
        {/* ================================================= */}

        <View style={styles.card}>

          <Text
            style={styles.cardLabel}
          >
            Name
          </Text>


          <TextInput
            value={fullName}
            onChangeText={
              setFullName
            }
            style={
              styles.cardInput
            }
            placeholder="Name"
            placeholderTextColor="#666"
          />

        </View>


        {/* ================================================= */}
        {/* BIO */}
        {/* ================================================= */}

        <View style={styles.card}>

          <Text
            style={styles.cardLabel}
          >
            Bio
          </Text>


          <TextInput
            value={bio}
            onChangeText={
              setBio
            }
            multiline
            maxLength={150}
            style={[
              styles.cardInput,
              styles.bioInput,
            ]}
            placeholder="Bio"
            placeholderTextColor="#666"
          />


          <Text
            style={
              styles.characterCount
            }
          >
            {bio.length}/150
          </Text>

        </View>


        {/* ================================================= */}
        {/* ADD LINK */}
        {/* ================================================= */}

        <TouchableOpacity
          style={styles.actionSection}
          activeOpacity={0.7}
          onPress={() =>
            Alert.alert(
              "Add Link",
              "Link saving needs a backend field or API endpoint."
            )
          }
        >

          <View>

            <Text
              style={
                styles.actionTitle
              }
            >
              Add link
            </Text>


            <Text
              style={
                styles.actionSubText
              }
            >
              Add a website or social link
            </Text>

          </View>


          <Ionicons
            name="chevron-forward"
            size={22}
            color="#888"
          />

        </TouchableOpacity>


        {/* ================================================= */}
        {/* ADD BANNERS */}
        {/* ================================================= */}

        <TouchableOpacity
          style={styles.actionSection}
          activeOpacity={0.7}
          onPress={() =>
            Alert.alert(
              "Add banners",
              "Banner saving needs a backend field or API endpoint."
            )
          }
        >

          <View>

            <Text
              style={
                styles.actionTitle
              }
            >
              Add banners
            </Text>


            <Text
              style={
                styles.actionSubText
              }
            >
              Add music, profiles and more
            </Text>

          </View>


          <Ionicons
            name="chevron-forward"
            size={22}
            color="#888"
          />

        </TouchableOpacity>


        {/* ================================================= */}
        {/* GENDER */}
        {/* ================================================= */}

        <TouchableOpacity
          style={styles.selectCard}
          onPress={() =>
            setShowGender(
              !showGender
            )
          }
        >

          <View>

            <Text
              style={styles.cardLabel}
            >
              Gender
            </Text>


            <Text
              style={
                styles.selectValue
              }
            >
              {gender || "Select gender"}
            </Text>

          </View>


          <Ionicons
            name={
              showGender
                ? "chevron-up"
                : "chevron-down"
            }
            size={20}
            color="#fff"
          />

        </TouchableOpacity>


        {showGender && (

          <View
            style={styles.dropdown}
          >

            {[
              "male",
              "female",
              "other",
            ].map((item) => (

              <TouchableOpacity
                key={item}
                style={
                  styles.option
                }
                onPress={() => {

                  setGender(item);

                  setShowGender(false);

                }}
              >

                <Text
                  style={
                    styles.optionText
                  }
                >
                  {item}
                </Text>

              </TouchableOpacity>

            ))}

          </View>

        )}


        {/* ================================================= */}
        {/* ACCOUNT TYPE */}
        {/* ================================================= */}

        <TouchableOpacity
          style={styles.selectCard}
          onPress={() =>
            setShowAccountType(
              !showAccountType
            )
          }
        >

          <View>

            <Text
              style={styles.cardLabel}
            >
              Account type
            </Text>


            <Text
              style={
                styles.selectValue
              }
            >
              {accountType || "Personal"}
            </Text>

          </View>


          <Ionicons
            name={
              showAccountType
                ? "chevron-up"
                : "chevron-down"
            }
            size={20}
            color="#fff"
          />

        </TouchableOpacity>


        {showAccountType && (

          <View
            style={styles.dropdown}
          >

            <TouchableOpacity
              style={styles.option}
              onPress={() =>
                handleAccountTypeChange(
                  "personal"
                )
              }
            >

              <Text
                style={
                  styles.optionText
                }
              >
                Personal
              </Text>

            </TouchableOpacity>


            <TouchableOpacity
              style={styles.option}
              onPress={() =>
                handleAccountTypeChange(
                  "business"
                )
              }
            >

              <Text
                style={
                  styles.optionText
                }
              >
                Business
              </Text>

            </TouchableOpacity>

          </View>

        )}


        {/* ================================================= */}
        {/* BUSINESS DETAILS */}
        {/* ================================================= */}

        {accountType ===
          "business" && (

          <View
            style={
              styles.businessContainer
            }
          >

            <Text
              style={
                styles.businessHeading
              }
            >
              Business details
            </Text>


            {/* BUSINESS NAME */}

            <View
              style={styles.card}
            >

              <Text
                style={
                  styles.cardLabel
                }
              >
                Business name
              </Text>


              <TextInput
                value={
                  businessName
                }
                onChangeText={
                  setBusinessName
                }
                style={
                  styles.cardInput
                }
                placeholder="Business name"
                placeholderTextColor="#666"
              />

            </View>


            {/* BUSINESS CATEGORY */}

            <View
              style={styles.card}
            >

              <Text
                style={
                  styles.cardLabel
                }
              >
                Business category
              </Text>


              <TextInput
                value={
                  businessCategory
                }
                onChangeText={
                  setBusinessCategory
                }
                style={
                  styles.cardInput
                }
                placeholder="Business category"
                placeholderTextColor="#666"
              />

            </View>


            {/* BUSINESS DESCRIPTION */}

            <View
              style={styles.card}
            >

              <Text
                style={
                  styles.cardLabel
                }
              >
                Business description
              </Text>


              <TextInput
                value={
                  businessDescription
                }
                onChangeText={
                  setBusinessDescription
                }
                multiline
                maxLength={300}
                style={[
                  styles.cardInput,
                  styles.businessDescription,
                ]}
                placeholder="Describe your business"
                placeholderTextColor="#666"
              />

            </View>

          </View>

        )}


        {/* ================================================= */}
        {/* PRIVATE ACCOUNT */}
        {/* ================================================= */}

        <View
          style={styles.switchCard}
        >

          <View
            style={
              styles.switchContent
            }
          >

            <Text
              style={
                styles.switchTitle
              }
            >
              Private Account
            </Text>


            <Text
              style={styles.subText}
            >
              Only approved followers
              can see your content
            </Text>

          </View>


          <Switch
            value={isPrivate}
            onValueChange={
              setIsPrivate
            }
            trackColor={{
              false: "#333",
              true: "#2563EB",
            }}
            thumbColor="#fff"
          />

        </View>


        {/* ================================================= */}
        {/* SAVE */}
        {/* ================================================= */}

        <TouchableOpacity
          style={[
            styles.saveBtn,
            (loading || saving) &&
              styles.saveBtnDisabled,
          ]}
          onPress={
            handleSave
          }
          disabled={
            loading || saving
          }
          activeOpacity={0.8}
        >

          {loading || saving ? (

            <ActivityIndicator
              color="#fff"
            />

          ) : (

            <Text
              style={styles.saveText}
            >
              Save
            </Text>

          )}

        </TouchableOpacity>

      </ScrollView>

    </ScreenLayout>

  );

}


// =======================================================
// STYLES
// =======================================================

const styles =
  StyleSheet.create({

    // screen: {
    //   flex: 1,
    //   backgroundColor: "#000",
    // },

    container: {
      flex: 1,
      // backgroundColor: "#000",
      paddingHorizontal: 16,
    },

    contentContainer: {
      paddingBottom: 100,
    },

    headerRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      // marginTop: 50,
      marginBottom: 25,
    },

    header: {
      color: "#fff",
      fontSize: 25,
      fontWeight: "700",
    },

    avatarSection: {
      alignItems: "center",
      marginBottom: 28,
    },

    avatar: {
      width: 95,
      height: 95,
      borderRadius: 47.5,
      backgroundColor: "#222",
    },

    avatarPlaceholder: {
      width: 95,
      height: 95,
      borderRadius: 47.5,
      backgroundColor: "#222",
      justifyContent: "center",
      alignItems: "center",
    },

    changePhoto: {
      color: "#8E8EFF",
      fontSize: 15,
      marginTop: 10,
      fontWeight: "500",
    },

    card: {
      backgroundColor: "#0D1117",
      borderWidth: 1,
      borderColor: "#222",
      borderRadius: 18,
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginBottom: 12,
    },

    cardLabel: {
      color: "#8e8e8e",
      fontSize: 13,
      marginBottom: 5,
    },

    cardInput: {
      color: "#fff",
      fontSize: 17,
      padding: 0,
    },

    bioInput: {
      minHeight: 65,
      textAlignVertical: "top",
    },

    businessDescription: {
      minHeight: 80,
      textAlignVertical: "top",
    },

    characterCount: {
      color: "#666",
      fontSize: 11,
      textAlign: "right",
      marginTop: 5,
    },

    actionSection: {
      minHeight: 65,
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#222",
      paddingVertical: 12,
    },

    actionTitle: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "500",
    },

    actionSubText: {
      color: "#777",
      fontSize: 12,
      marginTop: 4,
    },

    selectCard: {
      backgroundColor: "#0D1117",
      borderWidth: 1,
      borderColor: "#222",
      borderRadius: 18,
      paddingHorizontal: 16,
      paddingVertical: 16,
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      marginTop: 12,
    },

    selectValue: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "500",
    },

    dropdown: {
      backgroundColor: "#0A0F1A",
      borderRadius: 16,
      marginTop: 6,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: "#1F2937",
    },

    option: {
      paddingVertical: 15,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#222",
    },

    optionText: {
      color: "#fff",
      fontSize: 15,
      textTransform: "capitalize",
    },

    businessContainer: {
      marginTop: 15,
    },

    businessHeading: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "700",
      marginBottom: 10,
    },

    switchCard: {
      marginTop: 25,
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
    },

    switchContent: {
      flex: 1,
      paddingRight: 15,
    },

    switchTitle: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },

    subText: {
      color: "#8e8e8e",
      marginTop: 3,
      fontSize: 13,
      lineHeight: 18,
    },

    saveBtn: {
      backgroundColor: "#2563EB",
      height: 50,
      borderRadius: 12,
      justifyContent:
        "center",
      alignItems: "center",
      marginTop: 30,
    },

    saveBtnDisabled: {
      opacity: 0.6,
    },

    saveText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },

  });
