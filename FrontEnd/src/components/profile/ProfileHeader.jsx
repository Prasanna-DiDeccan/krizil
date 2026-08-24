// import React, { useEffect, useState } from "react";

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
// } from "react-native";

// import { useDispatch, useSelector } from "react-redux";

// import { useRouter } from "expo-router";

// import * as ImagePicker from "expo-image-picker";

// import {
//   getProfile,
// } from "../../redux/profileSlice";

// import { getUserStats } from "../../redux/statsSlice";

// import { getUser } from "../../utils/storage";

// import ProfileActions from "./ProfileActions";

// import { getMediaUrl } from "../../utils/media";

// import { Ionicons } from "@expo/vector-icons";

// export default function ProfileHeader() {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const [storedUser, setStoredUser] =
//     useState(null);

//   const { loginData, verifyOtpData } =
//     useSelector(
//       (state) => state.auth
//     );

//   const { profileData } =
//     useSelector(
//       (state) => state.profile
//     );

//   const { statsData } =
//     useSelector(
//       (state) => state.stats
//     );

//   // =====================================================
//   // LOAD STORED USER
//   // =====================================================

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const user = await getUser();

//         setStoredUser(user);
//       } catch (error) {
//         console.log(
//           "GET STORED USER ERROR =>",
//           error
//         );
//       }
//     };

//     loadUser();
//   }, []);

//   // =====================================================
//   // USER ID
//   // =====================================================

//   const userId =
//     loginData?.user?.id ||
//     verifyOtpData?.user?.id ||
//     storedUser?.id ||
//     profileData?.id;

//   // =====================================================
//   // LOAD PROFILE + STATS
//   // =====================================================

//   useEffect(() => {
//     if (!userId) {
//       return;
//     }

//     dispatch(
//       getProfile(userId)
//     );

//     dispatch(
//       getUserStats(userId)
//     );
//   }, [userId, dispatch]);

//   // =====================================================
//   // AVATAR URL
//   // =====================================================

//   const avatarUrl = getMediaUrl(
//     profileData?.avatar_url
//   );

//   // =====================================================
//   // COMMON AVATAR HANDLER
//   // =====================================================

//   const handleUploadAvatar = async () => {
//     try {
//       if (!userId) {
//         console.log(
//           "USER ID NOT AVAILABLE"
//         );
//         return;
//       }

//       const permission =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (!permission.granted) {
//         return;
//       }

//       const result =
//         await ImagePicker.launchImageLibraryAsync({
//           mediaTypes:
//             ImagePicker.MediaTypeOptions.Images,

//           // VERY IMPORTANT
//           // Disable native Android crop.
//           // We use our AvatarCrop screen.
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

//       // =================================================
//       // OPEN SAME CUSTOM CROP SCREEN
//       // =================================================

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
//     }
//   };

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <View style={styles.container}>

//       {/* ================================================= */}
//       {/* TOP BAR */}
//       {/* ================================================= */}

//       <View style={styles.topBar}>

//         {/* ADD AVATAR */}

//         <TouchableOpacity
//           onPress={handleUploadAvatar}
//           hitSlop={10}
//         >
//           <Text style={styles.topIcon}>
//             ＋
//           </Text>
//         </TouchableOpacity>

//         {/* USERNAME */}

//         <View style={styles.usernameRow}>

//           <Text style={styles.username}>
//             {profileData?.username ||
//               storedUser?.username ||
//               ""}
//           </Text>

//           <Ionicons
//             name="chevron-down"
//             size={18}
//             color="#fff"
//           />

//         </View>

//         {/* RIGHT ICONS */}

//         <View style={styles.rightIcons}>

//           <TouchableOpacity
//             hitSlop={10}
//           >
//             <Text style={styles.icon}>
//               ◎
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() =>
//               router.push(
//                 "../profile-screens/settings-activity"
//               )
//             }
//             hitSlop={10}
//           >
//             <Text style={styles.icon}>
//               ☰
//             </Text>
//           </TouchableOpacity>

//         </View>

//       </View>

//       {/* ================================================= */}
//       {/* PROFILE IMAGE + STATS */}
//       {/* ================================================= */}

//       <View style={styles.profileRow}>

//         {/* AVATAR */}

//         <View style={styles.imageWrapper}>

//           <TouchableOpacity
//             onPress={handleUploadAvatar}
//             activeOpacity={0.8}
//           >
//             {avatarUrl ? (
//               <Image
//                 source={{
//                   uri: avatarUrl,
//                 }}
//                 style={styles.profileImage}
//               />
//             ) : (
//               <View
//                 style={
//                   styles.profileImagePlaceholder
//                 }
//               >
//                 <Ionicons
//                   name="person"
//                   size={38}
//                   color="#777"
//                 />
//               </View>
//             )}
//           </TouchableOpacity>

//           {/* PLUS */}

//           <TouchableOpacity
//             style={styles.plusButton}
//             onPress={handleUploadAvatar}
//           >
//             <Text style={styles.plusText}>
//               +
//             </Text>
//           </TouchableOpacity>

//         </View>

//         {/* ================================================= */}
//         {/* STATS */}
//         {/* ================================================= */}

//         <View style={styles.statsContainer}>

//           <View style={styles.statItem}>

//             <Text style={styles.statNumber}>
//               {statsData?.posts_count ?? 0}
//             </Text>

//             <Text style={styles.statLabel}>
//               posts
//             </Text>

//           </View>

//           <View style={styles.statItem}>

//             <Text style={styles.statNumber}>
//               {statsData?.followers_count ?? 0}
//             </Text>

//             <Text style={styles.statLabel}>
//               followers
//             </Text>

//           </View>

//           <View style={styles.statItem}>

//             <Text style={styles.statNumber}>
//               {statsData?.following_count ?? 0}
//             </Text>

//             <Text style={styles.statLabel}>
//               following
//             </Text>

//           </View>

//         </View>

//       </View>

//       {/* ================================================= */}
//       {/* BIO */}
//       {/* ================================================= */}

//       <View style={styles.bioSection}>

//         <Text style={styles.name}>
//           {profileData?.full_name ||
//             profileData?.username ||
//             storedUser?.username ||
//             ""}
//         </Text>

//         {profileData?.bio ? (
//           <Text style={styles.bio}>
//             {profileData.bio}
//           </Text>
//         ) : null}

//       </View>

//       <ProfileActions />

//     </View>
//   );
// }

// // =======================================================
// // STYLES
// // =======================================================

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#000",
//     paddingHorizontal: 15,
//     paddingTop: 55,
//   },

//   topBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   topIcon: {
//     color: "#fff",
//     fontSize: 30,
//   },

//   usernameRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },

//   username: {
//     color: "#fff",
//     fontSize: 24,
//     fontWeight: "600",
//   },

//   rightIcons: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   icon: {
//     color: "#fff",
//     fontSize: 28,
//     marginLeft: 20,
//   },

//   profileRow: {
//     flexDirection: "row",
//     marginTop: 25,
//     alignItems: "center",
//   },

//   imageWrapper: {
//     position: "relative",
//   },

//   profileImage: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: "#222",
//   },

//   profileImagePlaceholder: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: "#222",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   plusButton: {
//     position: "absolute",
//     right: -4,
//     bottom: 0,
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: "#0095F6",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 2,
//     borderColor: "#000",
//   },

//   plusText: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#fff",
//   },

//   statsContainer: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginLeft: 20,
//   },

//   statItem: {
//     alignItems: "center",
//   },

//   statNumber: {
//     color: "#fff",
//     fontSize: 24,
//     fontWeight: "700",
//   },

//   statLabel: {
//     color: "#fff",
//     fontSize: 16,
//   },

//   bioSection: {
//     marginTop: 15,
//   },

//   name: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },

//   bio: {
//     color: "#fff",
//     marginTop: 5,
//   },
// });

import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { useRouter } from "expo-router";

import * as ImagePicker from "expo-image-picker";

import {
  getProfile,
} from "../../redux/profileSlice";

import {
  getUserStats,
} from "../../redux/statsSlice";

import {
  getUser,
} from "../../utils/storage";

import ProfileActions from "./ProfileActions";

import {
  getMediaUrl,
} from "../../utils/media";

import {
  Ionicons,
} from "@expo/vector-icons";


export default function ProfileHeader() {

  const dispatch = useDispatch();

  const router = useRouter();

  const [
    storedUser,
    setStoredUser,
  ] = useState(null);


  // ======================================================
  // REDUX
  // ======================================================

  const {
    loginData,
    verifyOtpData,
  } = useSelector(
    (state) => state.auth
  );


  const {
    profileData,
  } = useSelector(
    (state) => state.profile
  );


  const {
    statsData,
  } = useSelector(
    (state) => state.stats
  );

  useEffect(() => {
  console.log(
    "🔥 CURRENT PROFILE STATS =>",
    statsData
  );
}, [statsData]);


  // ======================================================
  // LOAD STORAGE USER
  // ======================================================

  useEffect(() => {

    const loadUser = async () => {

      try {

        const user =
          await getUser();

        console.log(
          "PROFILE STORAGE USER =>",
          user
        );

        setStoredUser(user);

      } catch (error) {

        console.log(
          "GET STORED USER ERROR =>",
          error
        );

      }

    };

    loadUser();

  }, []);


  // ======================================================
  // GET USER ID
  // ======================================================

  const userId =
    loginData?.user?.id ||
    verifyOtpData?.user?.id ||
    storedUser?.id ||
    profileData?.id;


  // ======================================================
  // GET PROFILE + STATS
  // ======================================================

  useEffect(() => {

    if (!userId) {
      return;
    }

    console.log(
      "PROFILE HEADER USER ID =>",
      userId
    );


    dispatch(
      getProfile(userId)
    );


    dispatch(
      getUserStats(userId)
    );

  }, [
    userId,
    dispatch,
  ]);


  // ======================================================
  // AVATAR URL
  // ======================================================

  const avatarUrl =
    profileData?.avatar_url
      ? getMediaUrl(
          profileData.avatar_url
        )
      : null;


  // ======================================================
  // SELECT AVATAR
  //
  // Gallery
  //    ↓
  // Avatar Crop Screen
  //    ↓
  // Upload
  //
  // SAME FLOW AS EDIT PROFILE
  // ======================================================

  const handleUploadAvatar =
    async () => {

      try {

        // ----------------------------------------------
        // CHECK USER
        // ----------------------------------------------

        if (!userId) {

          Alert.alert(
            "Error",
            "User information not available"
          );

          return;
        }


        // ----------------------------------------------
        // REQUEST GALLERY PERMISSION
        // ----------------------------------------------

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


        // ----------------------------------------------
        // OPEN GALLERY
        // ----------------------------------------------

        const result =
          await ImagePicker
            .launchImageLibraryAsync({

              mediaTypes:
                ImagePicker
                  .MediaTypeOptions
                  .Images,

              // IMPORTANT:
              // Native crop is disabled.
              //
              // We use our own
              // /profile-screens/avatar-crop
              // screen.

              allowsEditing: false,

              quality: 1,

            });


        // ----------------------------------------------
        // USER CANCELLED
        // ----------------------------------------------

        if (result.canceled) {
          return;
        }


        // ----------------------------------------------
        // GET SELECTED IMAGE
        // ----------------------------------------------

        const image =
          result.assets?.[0];


        if (!image?.uri) {
          return;
        }


        console.log(
          "SELECTED AVATAR =>",
          image.uri
        );


        // ----------------------------------------------
        // OPEN CUSTOM AVATAR CROP SCREEN
        // ----------------------------------------------

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


  // ======================================================
  // UI
  // ======================================================

  return (

    <View
      style={styles.container}
    >

      {/* ================================================= */}
      {/* TOP BAR */}
      {/* ================================================= */}

      <View
        style={styles.topBar}
      >

        {/* TOP LEFT PLUS */}

        <TouchableOpacity
          onPress={
            handleUploadAvatar
          }
          hitSlop={10}
          activeOpacity={0.7}
        >

          <Text
            style={styles.topIcon}
          >
            ＋
          </Text>

        </TouchableOpacity>


        {/* USERNAME */}

        <View
          style={
            styles.usernameRow
          }
        >

          <Text
            style={styles.username}
          >

            {
              profileData?.username ||
              storedUser?.username ||
              ""
            }

          </Text>


          <Ionicons
            name="chevron-down"
            size={18}
            color="#fff"
          />

        </View>


        {/* RIGHT ICONS */}

        <View
          style={
            styles.rightIcons
          }
        >

          <TouchableOpacity
            hitSlop={10}
            activeOpacity={0.7}
          >

            <Text
              style={styles.icon}
            >
              ◎
            </Text>

          </TouchableOpacity>


          <TouchableOpacity
            onPress={() =>
              router.push(
                "../profile-screens/settings-activity"
              )
            }
            hitSlop={10}
            activeOpacity={0.7}
          >

            <Text
              style={styles.icon}
            >
              ☰
            </Text>

          </TouchableOpacity>

        </View>

      </View>


      {/* ================================================= */}
      {/* PROFILE ROW */}
      {/* ================================================= */}

      <View
        style={styles.profileRow}
      >

        {/* ================================================= */}
        {/* AVATAR */}
        {/* ================================================= */}

        <View
          style={styles.imageWrapper}
        >

          {/* PROFILE IMAGE */}

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
                style={
                  styles.profileImage
                }
              />

            ) : (

              <View
                style={
                  styles.profileImagePlaceholder
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


          {/* ================================================= */}
          {/* PLUS BUTTON */}
          {/* ================================================= */}

          <TouchableOpacity
            style={
              styles.plusButton
            }
            onPress={
              handleUploadAvatar
            }
            activeOpacity={0.8}
          >

            <Text
              style={styles.plusText}
            >
              +
            </Text>

          </TouchableOpacity>

        </View>


        {/* ================================================= */}
        {/* STATS */}
        {/* ================================================= */}

        <View
          style={
            styles.statsContainer
          }
        >

          {/* POSTS */}

          <View
            style={styles.statItem}
          >

            <Text
              style={
                styles.statNumber
              }
            >

              {
                statsData?.posts_count ??
                0
              }

            </Text>


            <Text
              style={
                styles.statLabel
              }
            >
              posts
            </Text>

          </View>


          {/* FOLLOWERS */}

          <View
            style={styles.statItem}
          >

            <Text
              style={
                styles.statNumber
              }
            >

              {
                statsData?.followers_count ??
                0
              }

            </Text>


            <Text
              style={
                styles.statLabel
              }
            >
              followers
            </Text>

          </View>


          {/* FOLLOWING */}

          <View
            style={styles.statItem}
          >

            <Text
              style={
                styles.statNumber
              }
            >

              {
                statsData?.following_count ??
                0
              }

            </Text>


            <Text
              style={
                styles.statLabel
              }
            >
              following
            </Text>

          </View>

        </View>

      </View>


      {/* ================================================= */}
      {/* BIO */}
      {/* ================================================= */}

      <View
        style={styles.bioSection}
      >

        <Text
          style={styles.name}
        >

          {
            profileData?.full_name ||
            profileData?.username ||
            storedUser?.username ||
            ""
          }

        </Text>


        {
          profileData?.bio ? (

            <Text
              style={styles.bio}
            >
              {profileData.bio}
            </Text>

          ) : null
        }

      </View>


      {/* ================================================= */}
      {/* PROFILE ACTIONS */}
      {/* ================================================= */}

      <ProfileActions />

    </View>

  );

}


// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({

    container: {
      backgroundColor: "#000",
      paddingHorizontal: 15,
      paddingTop: 55,
    },


    // ==================================================
    // TOP BAR
    // ==================================================

    topBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "space-between",
    },


    topIcon: {
      color: "#fff",
      fontSize: 30,
    },


    usernameRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },


    username: {
      color: "#fff",
      fontSize: 24,
      fontWeight: "600",
    },


    rightIcons: {
      flexDirection: "row",
      alignItems: "center",
    },


    icon: {
      color: "#fff",
      fontSize: 28,
      marginLeft: 20,
    },


    // ==================================================
    // PROFILE ROW
    // ==================================================

    profileRow: {
      flexDirection: "row",
      marginTop: 25,
      alignItems: "center",
    },


    // ==================================================
    // IMAGE WRAPPER
    // ==================================================

    imageWrapper: {
      position: "relative",
    },


    // ==================================================
    // PROFILE IMAGE
    // ==================================================

    profileImage: {
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: "#222",
    },


    profileImagePlaceholder: {
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: "#222",
      justifyContent: "center",
      alignItems: "center",
    },


    // ==================================================
    // PLUS BUTTON
    // ==================================================

    plusButton: {
      position: "absolute",
      right: -4,
      bottom: 0,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: "#0095F6",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "#000",
    },


    plusText: {
      fontSize: 20,
      fontWeight: "700",
      color: "#fff",
    },


    // ==================================================
    // STATS
    // ==================================================

    statsContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent:
        "space-around",
      marginLeft: 20,
    },


    statItem: {
      alignItems: "center",
    },


    statNumber: {
      color: "#fff",
      fontSize: 24,
      fontWeight: "700",
    },


    statLabel: {
      color: "#fff",
      fontSize: 16,
    },


    // ==================================================
    // BIO
    // ==================================================

    bioSection: {
      marginTop: 15,
    },


    name: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "700",
    },


    bio: {
      color: "#fff",
      marginTop: 5,
    },

  });