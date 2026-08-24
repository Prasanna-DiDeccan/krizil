// import React from "react";
// import {
//   TouchableOpacity,
//   Image,
//   Text,
//   StyleSheet,
// } from "react-native";
// import { getMediaUrl } from "../../utils/media";

// export default function StoryItem({
//   item,
//   onPress,
// }) {

//   const avatarUrl = getMediaUrl(
//   item.user.avatar_url
// );

//   return (
//     <TouchableOpacity
//       style={styles.container}
//       onPress={onPress}
//     >
//      <Image
//   source={{ uri: avatarUrl }}
//   style={[
//     styles.avatar,
//     {
//       borderColor: item.has_unseen
//         ? "#ff2d55"
//         : "#666",
//     },
//   ]}
// />

//       <Text
//         numberOfLines={1}
//         style={styles.username}
//       >
//         {item.user.username}
//       </Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     marginHorizontal: 6,
//   },

//   avatar: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     borderWidth: 3,
//   },

//   username: {
//     width: 75,
//     textAlign: "center",
//     color: "#fff",
//     fontSize: 12,
//     marginTop: 4,
//   },
// });

import React from "react";

import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";

import { getMediaUrl } from "../../utils/media";

export default function StoryItem({
  item,
  onPress,
  currentUserId,
  currentUserAvatar,
}) {
  const isCurrentUser =
    String(item?.user?.id) ===
    String(currentUserId);

  const avatarUrl = getMediaUrl(
    isCurrentUser
      ? currentUserAvatar
      : item?.user?.avatar_url
  );

  console.log(
    "STORY USER =>",
    item?.user?.username
  );

  console.log(
    "STORY AVATAR =>",
    avatarUrl
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      {avatarUrl ? (
        <Image
          source={{
            uri: avatarUrl,
          }}
          style={[
            styles.avatar,
            {
              borderColor:
                item?.has_unseen
                  ? "#ff2d55"
                  : "#666",
            },
          ]}
        />
      ) : (
        <Image
          source={require("../../assets/default-avatar.png")}
          style={[
            styles.avatar,
            {
              borderColor:
                item?.has_unseen
                  ? "#ff2d55"
                  : "#666",
            },
          ]}
        />
      )}

      <Text
        numberOfLines={1}
        style={styles.username}
      >
        {item?.user?.username}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 6,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
  },

  username: {
    width: 75,
    textAlign: "center",
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
});