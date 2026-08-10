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
// import { Colors } from "../../src/theme/colors";

// export default function UsernameScreen() {
//   const router = useRouter();
//   const [username, setUsername] = useState("");

//   const handleNext = () => {
//     if (!username.trim()) return;

//     router.push("/email-phone");
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         {/* Back */}
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

//         {/* Title */}
//         <Text style={styles.title}>
//           Create a username
//         </Text>

//         <Text style={styles.subtitle}>
//           Choose a unique username for your
//           Krizil account. You can change it later.
//         </Text>

//         {/* Input */}
//         <View style={styles.inputContainer}>
//           {/* <Text style={styles.label}>
//             Username
//           </Text> */}

//           <View style={styles.inputRow}>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter username"
//               placeholderTextColor={
//                 Colors.textMuted
//               }
//               value={username}
//               onChangeText={setUsername}
//               autoCapitalize="none"
//             />

//             {username.length > 2 && (
//               <Ionicons
//                 name="checkmark-circle"
//                 size={28}
//                 color={Colors.success}
//               />
//             )}
//           </View>
//         </View>

//         {/* Next */}
//         <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={handleNext}
//           disabled={!username}
//         >
//           <LinearGradient
//             colors={Colors.gradients.primary}
//             style={styles.button}
//           >
//             <Text style={styles.buttonText}>
//               Next
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>

//         <View style={{ flex: 1 }} />

//        <TouchableOpacity
//   onPress={() => router.replace("/login")}
// >
//   <Text style={styles.bottomText}>
//     I already have an account? Login
//   </Text>
// </TouchableOpacity>
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

//   label: {
//     color: Colors.textMuted,
//     fontSize: 14,
//     marginBottom: 8,
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import { Colors } from "../../src/theme/colors";
import { checkUsername, setSignupData } from "../../src/redux/authSlice";

export default function UsernameScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
const [suggestions, setSuggestions] = useState([]);
const [isAvailable, setIsAvailable] = useState(false);

 const { loading, signupData } = useSelector(
  (state) => state.auth
);

const handleNext = async () => {
  const trimmedUsername = username.trim();

  if (!trimmedUsername) {
    Toast.show({
      type: "error",
      text1: "Username Required",
      text2: "Please enter a username",
    });
    return;
  }

  const usernameRegex =
    /^[a-zA-Z0-9_]{3,20}$/;

  if (
    !usernameRegex.test(trimmedUsername)
  ) {
    Toast.show({
      type: "error",
      text1: "Invalid Username",
      text2:
        "Use 3-20 letters, numbers, or underscores only",
    });
    return;
  }

  try {
    const result = await dispatch(
      checkUsername(trimmedUsername)
    ).unwrap();

    if (result.available) {
      setIsAvailable(true);
      setSuggestions([]);

      dispatch(
        setSignupData({
          username: trimmedUsername,
        })
      );

      Toast.show({
        type: "success",
        text1: "Username Available",
        text2: result.message,
      });

      setTimeout(() => {
        router.push("/email-phone");
      }, 500);
    } else {
      setIsAvailable(false);
      setSuggestions(
        result.suggestions || []
      );

      Toast.show({
        type: "error",
        text1: "Username Taken",
        text2:
          result.message ||
          "Please choose another username",
      });
    }
  } catch (error) {
    const errorMessage =
      Array.isArray(error?.detail)
        ? error.detail[0]?.msg
        : error?.message ||
          "Failed to check username";

    setIsAvailable(false);

    Toast.show({
      type: "error",
      text1: "Invalid Username",
      text2: errorMessage,
    });
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={26}
            color={Colors.textPrimary}
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          Create a username
        </Text>

        <Text style={styles.subtitle}>
          Choose a unique username for your
          Krizil account. You can change it later.
        </Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <TextInput
  style={styles.input}
  placeholder="Enter username"
  placeholderTextColor={
    Colors.textMuted
  }
  value={username}
  onChangeText={(text) => {
    setUsername(text);
    setIsAvailable(false);
    setSuggestions([]);
  }}
  autoCapitalize="none"
/>

            {isAvailable && (
              <Ionicons
                name="checkmark-circle"
                size={28}
                color={Colors.success}
              />
            )}
          </View>
        </View>

{suggestions.length > 0 && (
  <View
    style={{
      marginTop: 20,
    }}
  >
    <Text
      style={{
        color: Colors.textSecondary,
        marginBottom: 10,
        fontSize: 14,
      }}
    >
      Suggested usernames
    </Text>

    {suggestions.map((item) => (
      <TouchableOpacity
        key={item}
        onPress={() =>
          setUsername(item)
        }
        style={{
          paddingVertical: 8,
        }}
      >
        <Text
          style={{
            color:
              Colors.primaryLight,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
)}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleNext}
          disabled={loading}
        >
          <LinearGradient
            colors={Colors.gradients.primary}
            style={[
              styles.button,
              loading && {
                opacity: 0.7,
              },
            ]}
          >
            <Text style={styles.buttonText}>
              {loading
                ? "Checking..."
                : "Next"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          onPress={() =>
            router.replace("/login")
          }
        >
          <Text style={styles.bottomText}>
            I already have an account?
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDefault,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },

  backBtn: {
    width: 45,
    height: 45,
    justifyContent: "center",
  },

  title: {
    color: Colors.textPrimary,
    fontSize: 34,
    fontWeight: "700",
    marginTop: 20,
  },

  subtitle: {
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 15,
    marginBottom: 35,
  },

  inputContainer: {
    backgroundColor: Colors.bgInput,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: "600",
    paddingVertical: 4,
  },

  button: {
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  bottomText: {
    color: Colors.primaryLight,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },
});