import React, { useEffect, useState } from "react";
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
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { BASE_URL } from "../../src/utils/api";

import {
  updateProfile,
  uploadAvatar,
} from "../../src/redux/profileSlice";

import { getUser } from "../../src/utils/storage";

export default function EditProfile() {
  const dispatch = useDispatch();

  const { profileData, loading } = useSelector(
    (state) => state.profile
  );

  const [userId, setUserId] = useState(null);

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("male");
  const [showGender, setShowGender] =
    useState(false);

  const [isPrivate, setIsPrivate] =
    useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();

      if (user?.id) {
        setUserId(user.id);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (profileData) {
      setFullName(
        profileData.full_name || ""
      );

      setBio(profileData.bio || "");

      setGender(
        profileData.gender || "male"
      );

      setIsPrivate(
        profileData.is_private || false
      );
    }
  }, [profileData]);

  const handleUploadAvatar = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow gallery access"
        );
        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });

      if (result.canceled) return;

      const image = result.assets[0];

      const formData = new FormData();

      formData.append("file", {
        uri: image.uri,
        name: "avatar.jpg",
        type: "image/jpeg",
      });

      await dispatch(
        uploadAvatar({
          userId,
          formData,
        })
      ).unwrap();

      Alert.alert(
        "Success",
        "Avatar updated successfully"
      );
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Failed to upload avatar"
      );
    }
  };

  const handleSave = async () => {
    try {
      await dispatch(
        updateProfile({
          userId,
          profileData: {
            full_name: fullName,
            bio,
            gender,
            is_private: isPrivate,
          },
        })
      ).unwrap();

      Alert.alert(
        "Success",
        "Profile updated successfully"
      );

      router.back();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        JSON.stringify(error)
      );
    }
  };

const avatarUrl = profileData?.avatar_url
  ? `${BASE_URL}${profileData.avatar_url}`
  : null;
console.log("BASE_URL", BASE_URL);
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Text style={styles.backBtn}>
            ←
          </Text>
        </TouchableOpacity>

        <Text style={styles.header}>
          Edit profile
        </Text>

        <View style={{ width: 30 }} />
      </View>

      {/* Avatar */}
      <View style={styles.avatarSection}>
        <Image
          source={{ uri: avatarUrl }}
          style={styles.avatar}
        />

        <TouchableOpacity
          onPress={handleUploadAvatar}
        >
          <Text style={styles.changePhoto}>
            Edit picture or avatar
          </Text>
        </TouchableOpacity>
      </View>

      {/* Name */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>
          Name
        </Text>

        <TextInput
          value={fullName}
          onChangeText={setFullName}
          style={styles.cardInput}
          placeholder="Name"
          placeholderTextColor="#666"
        />
      </View>

      {/* Username */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>
          Username
        </Text>

        <Text
          style={styles.readOnlyText}
        >
          {profileData?.username || ""}
        </Text>
      </View>

      {/* Bio */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>
          Bio
        </Text>

        <TextInput
          value={bio}
          onChangeText={setBio}
          multiline
          style={styles.cardInput}
          placeholder="Bio"
          placeholderTextColor="#666"
        />
      </View>

      {/* Add Link */}
      <TouchableOpacity
        style={styles.linkSection}
      >
        <Text style={styles.linkText}>
          Add link
        </Text>
      </TouchableOpacity>

      {/* Add Banner */}
      <TouchableOpacity
        style={styles.linkSection}
      >
        <Text style={styles.linkText}>
          Add banners
        </Text>

        <Text style={styles.subText}>
          Add music, profiles and more.
        </Text>
      </TouchableOpacity>

      {/* Gender */}
      <TouchableOpacity
        style={styles.genderCard}
        onPress={() =>
          setShowGender(!showGender)
        }
      >
        <View>
          <Text style={styles.cardLabel}>
            Gender
          </Text>

          <Text
            style={styles.genderValue}
          >
            {gender}
          </Text>
        </View>

        <Text style={styles.arrow}>
          ▼
        </Text>
      </TouchableOpacity>

      {showGender && (
        <View style={styles.dropdown}>
          {[
            "male",
            "female",
            "other",
          ].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.option}
              onPress={() => {
                setGender(item);
                setShowGender(false);
              }}
            >
              <Text
                style={styles.optionText}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Private Account */}
      <View style={styles.switchCard}>
        <View>
          <Text
            style={styles.switchTitle}
          >
            Private Account
          </Text>

          <Text style={styles.subText}>
            Only approved followers can
            see your content
          </Text>
        </View>

        <Switch
          value={isPrivate}
          onValueChange={setIsPrivate}
        />
      </View>

      {/* Save */}
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={handleSave}
        disabled={loading}
      >
        <Text style={styles.saveText}>
          {loading
            ? "Saving..."
            : "Save"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 16,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 25,
  },

  avatarSection: {
  alignItems: "center",
  marginBottom: 25,
},

  backBtn: {
    color: "#fff",
    fontSize: 30,
  },

  header: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },

  avatarSection: {
    alignItems: "center",
    marginBottom: 25,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
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
    marginBottom: 4,
  },

  cardInput: {
    color: "#fff",
    fontSize: 17,
    padding: 0,
  },

  readOnlyText: {
    color: "#fff",
    fontSize: 17,
  },

  linkSection: {
    marginTop: 10,
    marginBottom: 20,
  },

  linkText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },

  subText: {
    color: "#8e8e8e",
    marginTop: 2,
    fontSize: 13,
  },

  genderCard: {
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
  },

  genderValue: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "500",
  },

  arrow: {
    color: "#fff",
    fontSize: 14,
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
     paddingVertical: 14,
  paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },

  optionText: {
    color: "#fff",
    fontSize: 15,
  },

  switchCard: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  switchTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  saveBtn: {
    backgroundColor: "#2563EB",
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },

  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});