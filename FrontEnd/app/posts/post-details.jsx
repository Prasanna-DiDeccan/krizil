import React, {
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Switch,
  Alert,
  ActivityIndicator,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import { useDispatch, useSelector } from "react-redux";

import {
  createPost,
} from "../../redux/postSlice";

export default function PostDetails() {
  const params =
    useLocalSearchParams();

  const dispatch = useDispatch();

  const {
    loading,
    error,
  } = useSelector(
    (state) => state.posts
  );

  const [caption, setCaption] =
    useState("");

  const [facebook, setFacebook] =
    useState(false);

  const [twitter, setTwitter] =
    useState(false);

  const [tumblr, setTumblr] =
    useState(false);

  const [audience, setAudience] =
    useState("Everyone");

  // ==========================================
  // CREATE POST
  // ==========================================

  const handlePost = async () => {
    if (!params.image) {
      Alert.alert(
        "Error",
        "No image selected."
      );

      return;
    }

    try {
      const formData =
        new FormData();

      // VERY IMPORTANT:
      // Backend expects "file"
      // NOT "File"

      formData.append("file", {
        uri: params.image,
        name: `post-${Date.now()}.jpg`,
        type: "image/jpeg",
      });

      if (caption.trim()) {
        formData.append(
          "caption",
          caption.trim()
        );
      }

      console.log(
        "========== CREATE POST =========="
      );

      console.log(
        "IMAGE =>",
        params.image
      );

      console.log(
        "CAPTION =>",
        caption
      );

      const result =
        await dispatch(
          createPost(formData)
        ).unwrap();

      console.log(
        "CREATE POST SUCCESS =>",
        result
      );

      Alert.alert(
        "Success",
        "Your post has been published!",
        [
          {
            text: "OK",
            onPress: () => {
              router.replace(
                "/"
              );
            },
          },
        ]
      );
    } catch (error) {
      console.log(
        "CREATE POST ERROR =>",
        error
      );

      Alert.alert(
        "Post Failed",
        error?.message ||
          "Unable to create post."
      );
    }
  };

  // ==========================================
  // OPTION ROW
  // ==========================================

  const OptionRow = ({
    icon,
    title,
    value,
    onPress,
  }) => {
    return (
      <TouchableOpacity
        style={styles.optionRow}
        onPress={onPress}
      >
        <View
          style={styles.optionLeft}
        >
          <Ionicons
            name={icon}
            size={24}
            color="#fff"
          />

          <Text
            style={styles.optionTitle}
          >
            {title}
          </Text>
        </View>

        <View
          style={styles.optionRight}
        >
          {value && (
            <Text
              style={styles.optionValue}
            >
              {value}
            </Text>
          )}

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#777"
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Ionicons
            name="chevron-back"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          New post
        </Text>

        <View style={{ width: 30 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >

        {/* IMAGE + CAPTION */}

        <View style={styles.topSection}>

          <Image
            source={{
              uri: params.image,
            }}
            style={styles.thumbnail}
          />

          <TextInput
            value={caption}
            onChangeText={setCaption}
            placeholder="Write a caption..."
            placeholderTextColor="#777"
            multiline
            style={styles.caption}
          />

        </View>

        <View
          style={styles.separator}
        />

        {/* OPTIONS */}

        <OptionRow
          icon="person-add-outline"
          title="Tag people"
          onPress={() =>
            Alert.alert(
              "Tag people",
              "Tag people screen coming next."
            )
          }
        />

        <OptionRow
          icon="location-outline"
          title="Add location"
          onPress={() =>
            Alert.alert(
              "Add location",
              "Location screen coming next."
            )
          }
        />

        <OptionRow
          icon="musical-notes-outline"
          title="Add music"
          onPress={() =>
            Alert.alert(
              "Add music",
              "Music selection coming next."
            )
          }
        />

        <View
          style={styles.separator}
        />

        {/* AI LABEL */}

        <View style={styles.labelRow}>

          <View>
            <Text
              style={styles.labelTitle}
            >
              Add AI label
            </Text>

            <Text
              style={styles.labelDescription}
            >
              We require you to label
              certain realistic content
              that's made with AI.
            </Text>
          </View>

          <Switch
            value={false}
            onValueChange={() => {}}
          />

        </View>

        <View
          style={styles.separator}
        />

        {/* AUDIENCE */}

        <OptionRow
          icon="people-outline"
          title="Audience"
          value={audience}
          onPress={() => {
            Alert.alert(
              "Audience",
              "Choose audience",
              [
                {
                  text: "Everyone",
                  onPress: () =>
                    setAudience(
                      "Everyone"
                    ),
                },
                {
                  text: "Close Friends",
                  onPress: () =>
                    setAudience(
                      "Close Friends"
                    ),
                },
                {
                  text: "Cancel",
                  style: "cancel",
                },
              ]
            );
          }}
        />

        <View
          style={styles.separator}
        />

        {/* SHARE */}

        <Text
          style={styles.shareTitle}
        >
          Also share to
        </Text>

        <View style={styles.shareRow}>

          <View
            style={styles.shareLeft}
          >
            <Ionicons
              name="logo-facebook"
              size={24}
              color="#fff"
            />

            <Text
              style={styles.shareText}
            >
              Facebook
            </Text>
          </View>

          <Switch
            value={facebook}
            onValueChange={setFacebook}
          />

        </View>

        <View style={styles.shareRow}>

          <View
            style={styles.shareLeft}
          >
            <Ionicons
              name="logo-twitter"
              size={24}
              color="#fff"
            />

            <Text
              style={styles.shareText}
            >
              Twitter
            </Text>
          </View>

          <Switch
            value={twitter}
            onValueChange={setTwitter}
          />

        </View>

        <View style={styles.shareRow}>

          <View
            style={styles.shareLeft}
          >
            <Ionicons
              name="logo-tumblr"
              size={24}
              color="#fff"
            />

            <Text
              style={styles.shareText}
            >
              Tumblr
            </Text>
          </View>

          <Switch
            value={tumblr}
            onValueChange={setTumblr}
          />

        </View>

        <View
          style={styles.bottomSpace}
        />

      </ScrollView>

      {/* POST BUTTON */}

      <View style={styles.postButtonContainer}>

        <TouchableOpacity
          style={[
            styles.postButton,
            loading &&
              styles.postButtonDisabled,
          ]}
          disabled={loading}
          onPress={handlePost}
        >
          {loading ? (
            <ActivityIndicator
              color="#fff"
            />
          ) : (
            <Text
              style={styles.postButtonText}
            >
              Share
            </Text>
          )}
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#222",
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  content: {
    paddingBottom: 120,
  },

  topSection: {
    flexDirection: "row",
    padding: 16,
  },

  thumbnail: {
    width: 85,
    height: 85,
    borderRadius: 5,
  },

  caption: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    marginLeft: 15,
    minHeight: 85,
    textAlignVertical: "top",
  },

  separator: {
    height: 1,
    backgroundColor: "#222",
  },

  optionRow: {
    minHeight: 58,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  optionTitle: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 15,
  },

  optionRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  optionValue: {
    color: "#999",
    marginRight: 5,
  },

  labelRow: {
    minHeight: 85,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  labelTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },

  labelDescription: {
    color: "#777",
    fontSize: 12,
    maxWidth: 280,
    marginTop: 5,
    lineHeight: 17,
  },

  shareTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 5,
  },

  shareRow: {
    minHeight: 55,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  shareLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  shareText: {
    color: "#fff",
    marginLeft: 15,
    fontSize: 15,
  },

  bottomSpace: {
    height: 40,
  },

  postButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#000",
    borderTopWidth: 0.5,
    borderTopColor: "#222",
  },

  postButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#0095F6",
    alignItems: "center",
    justifyContent: "center",
  },

  postButtonDisabled: {
    opacity: 0.6,
  },

  postButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});