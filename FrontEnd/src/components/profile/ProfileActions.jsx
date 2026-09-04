// import React from "react";
// import { useRouter } from "expo-router";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";

// export default function ProfileActions() {
//     const router = useRouter();
//   return (
//     <>
//       <TouchableOpacity
//         style={styles.bannerButton}
//       >
//         <Text style={styles.bannerPlus}>
//           +
//         </Text>

//         <Text style={styles.bannerText}>
//           Add banners
//         </Text>
//       </TouchableOpacity>

//       <View style={styles.buttonRow}>
//         <TouchableOpacity
//           style={styles.actionBtn}
//         >
//           <Text style={styles.actionText}           onPress={() =>
//     router.push("../profile-screens/edit-profile")
//   }>
//             Edit profile
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.actionBtn}
//         >
//           <Text style={styles.actionText}>
//             Share profile
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.addFriendBtn}
//         >
//           <Text style={styles.actionText}>
//             +
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   bannerButton: {
//     marginTop: 15,
//     borderWidth: 1,
//     borderColor: "#333",
//     borderRadius: 20,
//     alignSelf: "flex-start",
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   bannerPlus: {
//     color: "#fff",
//     marginRight: 5,
//     fontSize: 16,
//   },

//   bannerText: {
//     color: "#fff",
//     fontSize: 14,
//   },

//   buttonRow: {
//     flexDirection: "row",
//     marginTop: 15,
//   },

//   actionBtn: {
//     flex: 1,
//     backgroundColor: "#262626",
//     borderRadius: 8,
//     paddingVertical: 10,
//     alignItems: "center",
//     marginRight: 8,
//   },

//   addFriendBtn: {
//     width: 50,
//     backgroundColor: "#262626",
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   actionText: {
//     color: "#fff",
//     fontWeight: "600",
//   },
// });


import React from "react";

import {
  useRouter,
} from "expo-router";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";


export default function ProfileActions() {

  const router =
    useRouter();


  return (

    <>

      <TouchableOpacity
        style={styles.bannerButton}
      >

        <Text
          style={styles.bannerPlus}
        >
          +
        </Text>

        <Text
          style={styles.bannerText}
        >
          Add banners
        </Text>

      </TouchableOpacity>


      <View
        style={styles.buttonRow}
      >

        {/* EDIT PROFILE */}

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() =>
            router.push(
              "../profile-screens/edit-profile"
            )
          }
          activeOpacity={0.7}
        >

          <Text
            style={styles.actionText}
          >
            Edit profile
          </Text>

        </TouchableOpacity>


        {/* SHARE PROFILE */}

        <TouchableOpacity
          style={styles.actionBtn}
          activeOpacity={0.7}
        >

          <Text
            style={styles.actionText}
          >
            Share profile
          </Text>

        </TouchableOpacity>


        {/* ADD FRIEND */}

        <TouchableOpacity
          style={styles.addFriendBtn}
          activeOpacity={0.7}
        >

          <Text
            style={styles.actionText}
          >
            +
          </Text>

        </TouchableOpacity>

      </View>

    </>

  );

}


const styles =
  StyleSheet.create({

    bannerButton: {
      marginTop: 15,
      borderWidth: 1,
      borderColor: "#333",
      borderRadius: 20,
      alignSelf: "flex-start",
      paddingHorizontal: 15,
      paddingVertical: 8,
      flexDirection: "row",
      alignItems: "center",
    },

    bannerPlus: {
      color: "#fff",
      marginRight: 5,
      fontSize: 16,
    },

    bannerText: {
      color: "#fff",
      fontSize: 14,
    },

    buttonRow: {
      flexDirection: "row",
      marginTop: 15,
    },

    actionBtn: {
      flex: 1,
      backgroundColor: "#262626",
      borderRadius: 8,
      paddingVertical: 10,
      alignItems: "center",
      marginRight: 8,
    },

    addFriendBtn: {
      width: 50,
      backgroundColor: "#262626",
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },

    actionText: {
      color: "#fff",
      fontWeight: "600",
    },

  });
