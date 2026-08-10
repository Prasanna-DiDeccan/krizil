import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getProfile, uploadAvatar } from "../../redux/profileSlice";
import { getUserStats } from "../../redux/statsSlice";
import { getUser } from "../../utils/storage";

import ProfileActions from "./ProfileActions";
import { useRouter } from "expo-router";
import { BASE_URL } from "../../utils/api";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileHeader() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [storedUser, setStoredUser] =
    useState(null);

  const { loginData, verifyOtpData } =
    useSelector((state) => state.auth);

  const { profileData } = useSelector(
    (state) => state.profile
  );

  const { statsData } = useSelector(
    (state) => state.stats
  );

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      setStoredUser(user);
    };

    loadUser();
  }, []);

  const userId =
    loginData?.user?.id ||
    verifyOtpData?.user?.id ||
    storedUser?.id ||
    profileData?.id;

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId));
      dispatch(getUserStats(userId));
    }
  }, [userId]);

 const avatarUrl = profileData?.avatar_url
   ? `${BASE_URL}${profileData.avatar_url}`
   : null;
 console.log("BASE_URL", BASE_URL);

 const handleUploadAvatar = async () => {
  try {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
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

    dispatch(getProfile(userId));
  } catch (error) {
    console.log(
      "UPLOAD AVATAR ERROR =>",
      error
    );
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topIcon}>＋</Text>

       <View style={styles.usernameRow}>
  <Text style={styles.username}>
    {profileData?.username ||
      storedUser?.username ||
      "username"}
  </Text>

  <Ionicons
    name="chevron-down"
    size={18}
    color="#fff"
  />
</View>

        <View style={styles.rightIcons}>
          <TouchableOpacity>
            <Text style={styles.icon}>◎</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("../profile-screens/settings-activity")}>
            <Text style={styles.icon}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileRow}>
        <View style={styles.imageWrapper}>
          <TouchableOpacity
  onPress={handleUploadAvatar}
>
  <Image
    source={{ uri: avatarUrl }}
    style={styles.profileImage}
  />
</TouchableOpacity>

         <TouchableOpacity
  style={styles.plusButton}
  onPress={handleUploadAvatar}
>
            <Text style={styles.plusText}>
              +
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {statsData?.posts_count || 0}
            </Text>

            <Text style={styles.statLabel}>
              posts
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {statsData?.followers_count || 0}
            </Text>

            <Text style={styles.statLabel}>
              followers
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {statsData?.following_count || 0}
            </Text>

            <Text style={styles.statLabel}>
              following
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bioSection}>
        <Text style={styles.name}>
          {profileData?.full_name ||
            profileData?.username ||
            storedUser?.username ||
            ""}
        </Text>

        {!!profileData?.bio && (
          <Text style={styles.bio}>
            {profileData.bio}
          </Text>
        )}
      </View>

      <ProfileActions />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingHorizontal: 15,
    paddingTop: 55,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  topIcon: {
    color: "#fff",
    fontSize: 30,
  },

  // usernameWrapper: {
  //   flex: 1,
  //   alignItems: "center",
  // },
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
  },

  icon: {
    color: "#fff",
    fontSize: 28,
    marginLeft: 20,
  },

  profileRow: {
    flexDirection: "row",
    marginTop: 25,
    alignItems: "center",
  },

  imageWrapper: {
    position: "relative",
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  plusButton: {
    position: "absolute",
    right: -4,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  plusText: {
    fontSize: 20,
    fontWeight: "700",
  },

  statsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
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