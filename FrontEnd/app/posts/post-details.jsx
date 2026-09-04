// import React, { useState } from "react";

// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   ScrollView,
//   Switch,
//   Alert,
//   ActivityIndicator,
//   Platform,
// } from "react-native";

// import { Ionicons } from "@expo/vector-icons";

// import { useLocalSearchParams, router } from "expo-router";

// import { useDispatch, useSelector } from "react-redux";

// import { useSafeAreaInsets } from "react-native-safe-area-context";

// import { createPost } from "../../src/redux/postSlice";

// export default function PostDetails() {
//   const params = useLocalSearchParams();

//   const dispatch = useDispatch();

//   const insets = useSafeAreaInsets();

//   const { loading, error } = useSelector(
//     (state) => state.posts
//   );

//   // =====================================================
//   // STATE
//   // =====================================================

//   const [caption, setCaption] = useState("");

//   const [facebook, setFacebook] = useState(false);
//   const [twitter, setTwitter] = useState(false);
//   const [tumblr, setTumblr] = useState(false);

//   const [audience, setAudience] = useState("Everyone");

//   // Backend-related selections
//   const [taggedPeople, setTaggedPeople] = useState([]);
//   const [location, setLocation] = useState(null);
//   const [music, setMusic] = useState(null);

//   const [aiLabel, setAiLabel] = useState(false);

//   // =====================================================
//   // IMAGE PARAM
//   // =====================================================

//   const imageUri = Array.isArray(params.image)
//     ? params.image[0]
//     : params.image;

//   // =====================================================
//   // CREATE POST
//   // =====================================================

//   const handlePost = async () => {
//     if (!imageUri) {
//       Alert.alert(
//         "Error",
//         "No image selected."
//       );

//       return;
//     }

//     try {
//       const formData = new FormData();

//       // -----------------------------------------------
//       // IMAGE
//       // -----------------------------------------------

//       formData.append("file", {
//         uri: imageUri,
//         name: `post-${Date.now()}.jpg`,
//         type: "image/jpeg",
//       });

//       // -----------------------------------------------
//       // CAPTION
//       // -----------------------------------------------

//       if (caption.trim()) {
//         formData.append(
//           "caption",
//           caption.trim()
//         );
//       }

//       // -----------------------------------------------
//       // IMPORTANT
//       // -----------------------------------------------
//       //
//       // Do NOT send these fields until backend
//       // provides the exact field names/API contract.
//       //
//       // Example later:
//       //
//       // formData.append(
//       //   "tagged_user_ids",
//       //   JSON.stringify(taggedPeople)
//       // );
//       //
//       // formData.append(
//       //   "location_id",
//       //   String(location.id)
//       // );
//       //
//       // formData.append(
//       //   "music_id",
//       //   String(music.id)
//       // );
//       //
//       // -----------------------------------------------

//       console.log(
//         "========== CREATE POST =========="
//       );

//       console.log(
//         "IMAGE =>",
//         imageUri
//       );

//       console.log(
//         "CAPTION =>",
//         caption
//       );

//       console.log(
//         "TAGGED PEOPLE =>",
//         taggedPeople
//       );

//       console.log(
//         "LOCATION =>",
//         location
//       );

//       console.log(
//         "MUSIC =>",
//         music
//       );

//       console.log(
//         "AUDIENCE =>",
//         audience
//       );

//       const result = await dispatch(
//         createPost(formData)
//       ).unwrap();

//       console.log(
//         "CREATE POST SUCCESS =>",
//         result
//       );

//       // IMPORTANT:
//       // result.id is your POST ID.
//       //
//       // Example:
//       //
//       // {
//       //   id: 7,
//       //   user_id: 12,
//       //   ...
//       // }

//       console.log(
//         "CREATED POST ID =>",
//         result?.id
//       );

//       Alert.alert(
//         "Success",
//         "Your post has been published!",
//         [
//           {
//             text: "OK",
//             onPress: () => {
//               router.replace("/(tabs)");
//             },
//           },
//         ]
//       );
//     } catch (error) {
//       console.log(
//         "CREATE POST ERROR =>",
//         error
//       );

//       Alert.alert(
//         "Post Failed",
//         error?.message ||
//           "Unable to create post."
//       );
//     }
//   };

//   // =====================================================
//   // TAG PEOPLE
//   // =====================================================

//   const handleTagPeople = () => {
//     /*
//       Later navigate to something like:

//       /posts/tag-people

//       That screen should call backend API
//       to search users.

//       Example backend:

//       GET /api/users/search?q=prasanna

//       Then return selected user IDs.
//     */

//     router.push({
//       pathname: "/posts/tag-people",

//       params: {
//         image: imageUri,
//       },
//     });
//   };

//   // =====================================================
//   // ADD LOCATION
//   // =====================================================

//   const handleAddLocation = () => {
//     /*
//       Later:

//       /posts/add-location

//       Backend can provide:

//       GET /api/locations/search?q=tirupati

//       User selects location.
//     */

//     router.push({
//       pathname: "/posts/add-location",
//     });
//   };

//   // =====================================================
//   // ADD MUSIC
//   // =====================================================

//   const handleAddMusic = () => {
//     /*
//       Later:

//       /posts/add-music

//       Backend can provide music list/search.
//     */

//     router.push({
//       pathname: "/posts/add-music",
//     });
//   };

//   // =====================================================
//   // OPTION ROW
//   // =====================================================

//   const OptionRow = ({
//     icon,
//     title,
//     value,
//     onPress,
//   }) => {
//     return (
//       <TouchableOpacity
//         style={styles.optionRow}
//         activeOpacity={0.7}
//         onPress={onPress}
//       >
//         {/* LEFT */}

//         <View style={styles.optionLeft}>
//           <Ionicons
//             name={icon}
//             size={24}
//             color="#fff"
//           />

//           <Text style={styles.optionTitle}>
//             {title}
//           </Text>
//         </View>

//         {/* RIGHT */}

//         <View style={styles.optionRight}>
//           {value ? (
//             <Text
//               style={styles.optionValue}
//               numberOfLines={1}
//             >
//               {value}
//             </Text>
//           ) : null}

//           <Ionicons
//             name="chevron-forward"
//             size={20}
//             color="#777"
//           />
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   // =====================================================
//   // SELECT AUDIENCE
//   // =====================================================

//   const selectAudience = () => {
//     Alert.alert(
//       "Audience",
//       "Choose audience",
//       [
//         {
//           text: "Everyone",
//           onPress: () =>
//             setAudience("Everyone"),
//         },
//         {
//           text: "Close Friends",
//           onPress: () =>
//             setAudience("Close Friends"),
//         },
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//       ]
//     );
//   };

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <View style={styles.container}>

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <View
//         style={[
//           styles.header,
//           {
//             paddingTop: insets.top,
//             height: insets.top + 56,
//           },
//         ]}
//       >
//         <TouchableOpacity
//           style={styles.headerButton}
//           onPress={() => router.back()}
//           activeOpacity={0.7}
//         >
//           <Ionicons
//             name="chevron-back"
//             size={28}
//             color="#fff"
//           />
//         </TouchableOpacity>

//         <Text style={styles.title}>
//           New post
//         </Text>

//         <View
//           style={styles.headerRightSpace}
//         />
//       </View>

//       {/* =================================================
//           CONTENT
//       ================================================= */}

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={[
//           styles.content,
//           {
//             paddingBottom:
//               110 + insets.bottom,
//           },
//         ]}
//       >

//         {/* =================================================
//             IMAGE + CAPTION
//         ================================================= */}

//         <View style={styles.topSection}>

//           <Image
//             source={{
//               uri: imageUri,
//             }}
//             style={styles.thumbnail}
//           />

//           <TextInput
//             value={caption}
//             onChangeText={setCaption}
//             placeholder="Write a caption..."
//             placeholderTextColor="#777"
//             multiline
//             maxLength={2200}
//             style={styles.caption}
//           />

//         </View>

//         <View
//           style={styles.separator}
//         />

//         {/* =================================================
//             TAG PEOPLE
//         ================================================= */}

//         <OptionRow
//           icon="person-add-outline"
//           title="Tag people"
//           value={
//             taggedPeople.length > 0
//               ? `${taggedPeople.length} tagged`
//               : null
//           }
//           onPress={handleTagPeople}
//         />

//         {/* =================================================
//             LOCATION
//         ================================================= */}

//         <OptionRow
//           icon="location-outline"
//           title="Add location"
//           value={
//             location?.name || null
//           }
//           onPress={handleAddLocation}
//         />

//         {/* =================================================
//             MUSIC
//         ================================================= */}

//         <OptionRow
//           icon="musical-notes-outline"
//           title="Add music"
//           value={
//             music?.title || null
//           }
//           onPress={handleAddMusic}
//         />

//         <View
//           style={styles.separator}
//         />

//         {/* =================================================
//             AI LABEL
//         ================================================= */}

//         <View style={styles.labelRow}>

//           <View style={styles.labelTextContainer}>

//             <Text
//               style={styles.labelTitle}
//             >
//               Add AI label
//             </Text>

//             <Text
//               style={styles.labelDescription}
//             >
//               We require you to label
//               certain realistic content
//               that's made with AI.
//             </Text>

//           </View>

//           <Switch
//             value={aiLabel}
//             onValueChange={setAiLabel}
//             trackColor={{
//               false: "#333",
//               true: "#0095F6",
//             }}
//             thumbColor="#fff"
//           />

//         </View>

//         <View
//           style={styles.separator}
//         />

//         {/* =================================================
//             AUDIENCE
//         ================================================= */}

//         <OptionRow
//           icon="people-outline"
//           title="Audience"
//           value={audience}
//           onPress={selectAudience}
//         />

//         <View
//           style={styles.separator}
//         />

//         {/* =================================================
//             SHARE
//         ================================================= */}

//         <Text
//           style={styles.shareTitle}
//         >
//           Also share to
//         </Text>

//         {/* FACEBOOK */}

//         <View style={styles.shareRow}>

//           <View style={styles.shareLeft}>

//             <Ionicons
//               name="logo-facebook"
//               size={24}
//               color="#fff"
//             />

//             <Text
//               style={styles.shareText}
//             >
//               Facebook
//             </Text>

//           </View>

//           <Switch
//             value={facebook}
//             onValueChange={setFacebook}
//             trackColor={{
//               false: "#333",
//               true: "#0095F6",
//             }}
//             thumbColor="#fff"
//           />

//         </View>

//         {/* TWITTER */}

//         <View style={styles.shareRow}>

//           <View style={styles.shareLeft}>

//             <Ionicons
//               name="logo-twitter"
//               size={24}
//               color="#fff"
//             />

//             <Text
//               style={styles.shareText}
//             >
//               Twitter
//             </Text>

//           </View>

//           <Switch
//             value={twitter}
//             onValueChange={setTwitter}
//             trackColor={{
//               false: "#333",
//               true: "#0095F6",
//             }}
//             thumbColor="#fff"
//           />

//         </View>

//         {/* TUMBLR */}

//         <View style={styles.shareRow}>

//           <View style={styles.shareLeft}>

//             <Ionicons
//               name="logo-tumblr"
//               size={24}
//               color="#fff"
//             />

//             <Text
//               style={styles.shareText}
//             >
//               Tumblr
//             </Text>

//           </View>

//           <Switch
//             value={tumblr}
//             onValueChange={setTumblr}
//             trackColor={{
//               false: "#333",
//               true: "#0095F6",
//             }}
//             thumbColor="#fff"
//           />

//         </View>

//       </ScrollView>

//       {/* =================================================
//           SHARE BUTTON
//       ================================================= */}

//       <View
//         style={[
//           styles.postButtonContainer,
//           {
//             paddingBottom:
//               Math.max(
//                 insets.bottom,
//                 12
//               ),
//           },
//         ]}
//       >

//         <TouchableOpacity
//           style={[
//             styles.postButton,
//             loading &&
//               styles.postButtonDisabled,
//           ]}
//           disabled={loading}
//           onPress={handlePost}
//           activeOpacity={0.8}
//         >

//           {loading ? (
//             <ActivityIndicator
//               color="#fff"
//             />
//           ) : (
//             <Text
//               style={styles.postButtonText}
//             >
//               Share
//             </Text>
//           )}

//         </TouchableOpacity>

//       </View>

//     </View>
//   );
// }

// // =====================================================
// // STYLES
// // =====================================================

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//   },

//   // ===================================================
//   // HEADER
//   // ===================================================

//   header: {
//     width: "100%",
//     paddingHorizontal: 10,

//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",

//     backgroundColor: "#000",

//     borderBottomWidth: 0.5,
//     borderBottomColor: "#222",
//   },

//   headerButton: {
//     width: 45,
//     height: 45,

//     justifyContent: "center",
//     alignItems: "flex-start",
//   },

//   headerRightSpace: {
//     width: 45,
//     height: 45,
//   },

//   title: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//   },

//   // ===================================================
//   // CONTENT
//   // ===================================================

//   content: {
//     flexGrow: 1,
//   },

//   // ===================================================
//   // IMAGE + CAPTION
//   // ===================================================

//   topSection: {
//     flexDirection: "row",
//     padding: 16,
//   },

//   thumbnail: {
//     width: 85,
//     height: 85,
//     borderRadius: 6,
//     backgroundColor: "#111",
//   },

//   caption: {
//     flex: 1,

//     color: "#fff",

//     fontSize: 15,

//     marginLeft: 15,

//     minHeight: 85,

//     textAlignVertical: "top",

//     paddingTop: 4,
//     paddingHorizontal: 0,
//   },

//   // ===================================================
//   // SEPARATOR
//   // ===================================================

//   separator: {
//     height: 1,
//     backgroundColor: "#222",
//   },

//   // ===================================================
//   // OPTION
//   // ===================================================

//   optionRow: {
//     minHeight: 60,

//     paddingHorizontal: 18,

//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   optionLeft: {
//     flexDirection: "row",
//     alignItems: "center",

//     flex: 1,
//   },

//   optionTitle: {
//     color: "#fff",

//     fontSize: 16,

//     marginLeft: 15,
//   },

//   optionRight: {
//     flexDirection: "row",
//     alignItems: "center",

//     maxWidth: 170,
//   },

//   optionValue: {
//     color: "#999",

//     fontSize: 14,

//     marginRight: 5,

//     maxWidth: 130,
//   },

//   // ===================================================
//   // AI LABEL
//   // ===================================================

//   labelRow: {
//     minHeight: 90,

//     paddingHorizontal: 18,

//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   labelTextContainer: {
//     flex: 1,
//     paddingRight: 20,
//   },

//   labelTitle: {
//     color: "#fff",

//     fontSize: 16,

//     fontWeight: "500",
//   },

//   labelDescription: {
//     color: "#777",

//     fontSize: 12,

//     marginTop: 5,

//     lineHeight: 17,

//     maxWidth: 300,
//   },

//   // ===================================================
//   // SHARE
//   // ===================================================

//   shareTitle: {
//     color: "#fff",

//     fontSize: 16,

//     fontWeight: "600",

//     paddingHorizontal: 18,

//     paddingTop: 20,

//     paddingBottom: 8,
//   },

//   shareRow: {
//     minHeight: 55,

//     paddingHorizontal: 18,

//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   shareLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   shareText: {
//     color: "#fff",

//     marginLeft: 15,

//     fontSize: 15,
//   },

//   // ===================================================
//   // BOTTOM SHARE BUTTON
//   // ===================================================

//   postButtonContainer: {
//     position: "absolute",

//     bottom: 0,
//     left: 0,
//     right: 0,

//     paddingHorizontal: 16,
//     paddingTop: 12,

//     backgroundColor: "#000",

//     borderTopWidth: 0.5,
//     borderTopColor: "#222",
//   },

//   postButton: {
//     height: 50,

//     borderRadius: 10,

//     backgroundColor: "#0095F6",

//     alignItems: "center",
//     justifyContent: "center",
//   },

//   postButtonDisabled: {
//     opacity: 0.6,
//   },

//   postButtonText: {
//     color: "#fff",

//     fontSize: 16,

//     fontWeight: "700",
//   },

// });

import React, {
  useMemo,
  useState,
} from "react";

import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  useDispatch,
} from "react-redux";

import {
  createPost,
} from "../../src/redux/postSlice";

export default function PostDetails() {
  const dispatch =
    useDispatch();

  const insets =
    useSafeAreaInsets();

  const params =
    useLocalSearchParams();

  // =====================================================
  // IMAGE
  // =====================================================

  const imageUri =
    useMemo(() => {
      if (
        Array.isArray(
          params.imageUri
        )
      ) {
        return params.imageUri[0];
      }

      return params.imageUri;
    }, [params.imageUri]);

  // =====================================================
  // STATE
  // =====================================================

  const [
    caption,
    setCaption,
  ] = useState("");

  const [
    altText,
    setAltText,
  ] = useState("");

  const [
    aiGenerated,
    setAiGenerated,
  ] = useState(false);

  const [
    sharing,
    setSharing,
  ] = useState(false);

  const [
    taggedPeople,
    setTaggedPeople,
  ] = useState([]);

  const [
    location,
    setLocation,
  ] = useState(null);

  const [
    music,
    setMusic,
  ] = useState(null);

  // =====================================================
  // TAG PEOPLE
  // =====================================================

  const handleTagPeople =
    () => {
      Alert.alert(
        "Tag people",
        "User selection screen will open here."
      );
    };

  // =====================================================
  // LOCATION
  // =====================================================

  const handleLocation =
    () => {
      setLocation({
        name: "Tirupati",
        latitude: 13.6288,
        longitude: 79.4192,
      });
    };

  // =====================================================
  // MUSIC
  // =====================================================

  const handleMusic =
    () => {
      setMusic({
        title: "Selected Song",
        artist: "Artist",
        audio_url:
          "https://example.com/audio.mp3",
        start_seconds: 0,
      });
    };

  // =====================================================
  // SHARE POST
  // =====================================================

  const sharePost =
    async () => {
      if (!imageUri) {
        Alert.alert(
          "Error",
          "Image not found."
        );

        return;
      }

      try {
        setSharing(true);

        const formData =
          new FormData();

        // =================================================
        // FILE
        // =================================================

        const filename =
          imageUri
            .split("/")
            .pop() ||
          "post.jpg";

        const extension =
          filename
            .split(".")
            .pop()
            ?.toLowerCase();

        let type =
          "image/jpeg";

        if (
          extension === "png"
        ) {
          type =
            "image/png";
        } else if (
          extension === "webp"
        ) {
          type =
            "image/webp";
        }

        formData.append(
          "file",
          {
            uri: imageUri,
            name: filename,
            type,
          }
        );

        // =================================================
        // CAPTION
        // =================================================

        if (
          caption.trim()
        ) {
          formData.append(
            "caption",
            caption.trim()
          );
        }

        // =================================================
        // ALT TEXT
        // =================================================

        if (
          altText.trim()
        ) {
          formData.append(
            "alt_text",
            altText.trim()
          );
        }

        // =================================================
        // AI GENERATED
        // =================================================

        formData.append(
          "ai_generated",
          String(
            aiGenerated
          )
        );

        // =================================================
        // MUSIC
        // =================================================

        if (music) {
          formData.append(
            "music_title",
            music.title
          );

          formData.append(
            "music_artist",
            music.artist
          );

          formData.append(
            "music_url",
            music.audio_url
          );

          formData.append(
            "music_start_seconds",
            String(
              music.start_seconds ||
                0
            )
          );
        }

        // =================================================
        // LOCATION
        // =================================================

        if (location) {
          formData.append(
            "location_name",
            location.name
          );

          formData.append(
            "location_latitude",
            String(
              location.latitude
            )
          );

          formData.append(
            "location_longitude",
            String(
              location.longitude
            )
          );
        }

        // =================================================
        // TAGS
        // =================================================

        if (
          taggedPeople.length >
          0
        ) {
          formData.append(
            "tag_user_ids",
            taggedPeople
              .map(
                (person) =>
                  person.id
              )
              .join(",")
          );
        }

        // =================================================
        // LOGS
        // =================================================

        console.log(
          "========== CREATE POST =========="
        );

        console.log(
          "IMAGE =>",
          imageUri
        );

        console.log(
          "CAPTION =>",
          caption
        );

        console.log(
          "TAGS =>",
          taggedPeople
        );

        console.log(
          "LOCATION =>",
          location
        );

        console.log(
          "MUSIC =>",
          music
        );

        // =================================================
        // API
        // =================================================

        const result =
          await dispatch(
            createPost(
              formData
            )
          ).unwrap();

        console.log(
          "POST CREATED =>",
          result
        );

        // =================================================
        // GO HOME
        // =================================================

        router.replace(
          "/(tabs)"
        );
      } catch (error) {
        console.log(
          "SHARE ERROR =>",
          error
        );

        Alert.alert(
          "Couldn't share",
          typeof error ===
            "string"
            ? error
            : error?.message ||
              "Failed to create post."
        );
      } finally {
        setSharing(false);
      }
    };

  // =====================================================
  // IMAGE ERROR
  // =====================================================

  if (!imageUri) {
    return (
      <View
        style={styles.error}
      >
        <Text
          style={
            styles.errorText
          }
        >
          Image not found
        </Text>
      </View>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <View
      style={styles.container}
    >

      {/* =================================================
          SAFE AREA TOP
      ================================================= */}

      <View
        style={[
          styles.safeAreaTop,
          {
            height:
              insets.top,
          },
        ]}
      />

      {/* =================================================
          KEYBOARD AVOIDING
      ================================================= */}

      <KeyboardAvoidingView
        style={
          styles.keyboardContainer
        }
        behavior={
          Platform.OS ===
          "ios"
            ? "padding"
            : undefined
        }
      >

        {/* ===============================================
            HEADER
        =============================================== */}

        <View
          style={styles.header}
        >

          {/* BACK */}

          <Pressable
            onPress={() =>
              router.back()
            }
            hitSlop={12}
            style={
              styles.headerSideButton
            }
          >
            <Ionicons
              name="arrow-back"
              size={27}
              color="#fff"
            />
          </Pressable>

          {/* CENTER */}

          <View
            style={
              styles.headerCenter
            }
            pointerEvents="none"
          >
            <Text
              style={styles.title}
            >
              New post
            </Text>
          </View>

          {/* SHARE */}

          <Pressable
            onPress={sharePost}
            disabled={sharing}
            hitSlop={10}
            style={
              styles.shareButton
            }
          >
            {sharing ? (
              <ActivityIndicator
                size="small"
                color="#3797f0"
              />
            ) : (
              <Text
                style={styles.share}
              >
                Share
              </Text>
            )}
          </Pressable>

        </View>

        {/* ===============================================
            CONTENT
        =============================================== */}

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            styles.scrollContent
          }
        >

          {/* =============================================
              IMAGE + CAPTION
          ============================================= */}

          <View
            style={
              styles.captionSection
            }
          >

            <Image
              source={{
                uri: imageUri,
              }}
              style={
                styles.thumbnail
              }
            />

            <TextInput
              value={caption}
              onChangeText={
                setCaption
              }
              placeholder="Write a caption..."
              placeholderTextColor="#777"
              multiline
              style={
                styles.captionInput
              }
              maxLength={2200}
            />

          </View>

          {/* =============================================
              TAG PEOPLE
          ============================================= */}

          <Pressable
            style={styles.row}
            onPress={
              handleTagPeople
            }
          >

            <View
              style={
                styles.rowContent
              }
            >

              <Ionicons
                name="person-add-outline"
                size={24}
                color="#fff"
              />

              <View
                style={
                  styles.rowTextContainer
                }
              >

                <Text
                  style={
                    styles.rowTitle
                  }
                >
                  Tag people
                </Text>

                {taggedPeople.length >
                  0 && (
                  <Text
                    style={
                      styles.subText
                    }
                  >
                    {taggedPeople
                      .map(
                        (
                          person
                        ) =>
                          `@${person.username}`
                      )
                      .join(
                        ", "
                      )}
                  </Text>
                )}

              </View>

            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#777"
            />

          </Pressable>

          {/* =============================================
              LOCATION
          ============================================= */}

          <Pressable
            style={styles.row}
            onPress={
              handleLocation
            }
          >

            <View
              style={
                styles.rowContent
              }
            >

              <Ionicons
                name="location-outline"
                size={24}
                color="#fff"
              />

              <View
                style={
                  styles.rowTextContainer
                }
              >

                <Text
                  style={
                    styles.rowTitle
                  }
                >
                  Add location
                </Text>

                {location && (
                  <Text
                    style={
                      styles.subText
                    }
                  >
                    {
                      location.name
                    }
                  </Text>
                )}

              </View>

            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#777"
            />

          </Pressable>

          {/* =============================================
              MUSIC
          ============================================= */}

          <Pressable
            style={styles.row}
            onPress={
              handleMusic
            }
          >

            <View
              style={
                styles.rowContent
              }
            >

              <Ionicons
                name="musical-notes-outline"
                size={24}
                color="#fff"
              />

              <View
                style={
                  styles.rowTextContainer
                }
              >

                <Text
                  style={
                    styles.rowTitle
                  }
                >
                  Add music
                </Text>

                {music && (
                  <Text
                    style={
                      styles.subText
                    }
                  >
                    {music.title}
                    {" · "}
                    {music.artist}
                  </Text>
                )}

              </View>

            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#777"
            />

          </Pressable>

          {/* =============================================
              ACCESSIBILITY
          ============================================= */}

          <View
            style={
              styles.accessibility
            }
          >

            <Text
              style={
                styles.sectionTitle
              }
            >
              Accessibility
            </Text>

            <Text
              style={styles.label}
            >
              Alt text
            </Text>

            <TextInput
              value={altText}
              onChangeText={
                setAltText
              }
              placeholder="Describe your photo for people with visual impairments"
              placeholderTextColor="#666"
              multiline
              style={
                styles.altText
              }
            />

          </View>

          {/* =============================================
              AI GENERATED
          ============================================= */}

          <View
            style={styles.row}
          >

            <View
              style={
                styles.rowContent
              }
            >

              <Ionicons
                name="sparkles-outline"
                size={24}
                color="#fff"
              />

              <View
                style={
                  styles.rowTextContainer
                }
              >

                <Text
                  style={
                    styles.rowTitle
                  }
                >
                  AI-generated
                </Text>

                <Text
                  style={
                    styles.subText
                  }
                >
                  Mark this post as AI-generated
                </Text>

              </View>

            </View>

            <Switch
              value={
                aiGenerated
              }
              onValueChange={
                setAiGenerated
              }
            />

          </View>

          <View
            style={{
              height: 100,
            }}
          />

        </ScrollView>

      </KeyboardAvoidingView>
    </View>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({

    // ==================================================
    // CONTAINER
    // ==================================================

    container: {
      flex: 1,
      backgroundColor: "#000",
    },

    keyboardContainer: {
      flex: 1,
    },

    safeAreaTop: {
      width: "100%",
      backgroundColor: "#000",
    },

    // ==================================================
    // HEADER
    // ==================================================

    header: {
      width: "100%",
      height: 56,

      paddingHorizontal: 14,

      flexDirection: "row",
      alignItems: "center",

      position: "relative",

      backgroundColor: "#000",

      borderBottomWidth:
        StyleSheet.hairlineWidth,

      borderBottomColor: "#222",
    },

    // ==================================================
    // BACK
    // ==================================================

    headerSideButton: {
      width: 50,
      height: 56,

      justifyContent: "center",
      alignItems: "flex-start",

      zIndex: 2,
    },

    // ==================================================
    // CENTER TITLE
    // ==================================================

    headerCenter: {
      position: "absolute",

      left: 0,
      right: 0,

      top: 0,
      bottom: 0,

      justifyContent: "center",
      alignItems: "center",

      zIndex: 1,
    },

    title: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600",
    },

    // ==================================================
    // SHARE
    // ==================================================

    shareButton: {
      height: 56,

      minWidth: 55,

      marginLeft: "auto",

      justifyContent: "center",
      alignItems: "flex-end",

      zIndex: 2,
    },

    share: {
      color: "#3797F0",
      fontSize: 16,
      fontWeight: "600",
    },

    // ==================================================
    // SCROLL
    // ==================================================

    scrollContent: {
      paddingBottom: 30,
    },

    // ==================================================
    // CAPTION
    // ==================================================

    captionSection: {
      flexDirection: "row",
      alignItems: "flex-start",

      padding: 16,

      gap: 12,
    },

    thumbnail: {
      width: 75,
      height: 75,

      borderRadius: 5,
    },

    captionInput: {
      flex: 1,

      color: "#fff",
      fontSize: 15,

      minHeight: 75,

      textAlignVertical: "top",
    },

    // ==================================================
    // ROW
    // ==================================================

    row: {
      minHeight: 66,

      paddingHorizontal: 16,

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

      borderTopWidth:
        StyleSheet.hairlineWidth,

      borderTopColor: "#222",
    },

    rowContent: {
      flex: 1,

      flexDirection: "row",
      alignItems: "center",

      gap: 15,
    },

    rowTextContainer: {
      flex: 1,
    },

    rowTitle: {
      color: "#fff",
      fontSize: 15,
    },

    subText: {
      color: "#777",
      fontSize: 13,
      marginTop: 3,
    },

    // ==================================================
    // ACCESSIBILITY
    // ==================================================

    accessibility: {
      padding: 16,

      borderTopWidth:
        StyleSheet.hairlineWidth,

      borderTopColor: "#222",
    },

    sectionTitle: {
      color: "#fff",

      fontSize: 16,
      fontWeight: "600",

      marginBottom: 16,
    },

    label: {
      color: "#aaa",

      fontSize: 13,

      marginBottom: 8,
    },

    altText: {
      minHeight: 80,

      borderWidth: 1,
      borderColor: "#333",

      borderRadius: 8,

      padding: 12,

      color: "#fff",

      textAlignVertical: "top",
    },

    // ==================================================
    // ERROR
    // ==================================================

    error: {
      flex: 1,

      backgroundColor: "#000",

      alignItems: "center",
      justifyContent: "center",
    },

    errorText: {
      color: "#fff",
    },
  });