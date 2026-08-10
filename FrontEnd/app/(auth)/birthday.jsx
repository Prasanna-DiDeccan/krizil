// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { useRouter } from "expo-router";
// import { useDispatch } from "react-redux";
// import Toast from "react-native-toast-message";

// import { Colors } from "../../src/theme/colors";
// import { setSignupData } from "../../src/redux/authSlice";

// export default function BirthdayScreen() {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const [date, setDate] = useState(
//     new Date(2000, 0, 1)
//   );

//   const [show, setShow] = useState(false);

//   const calculateAge = (dob) => {
//     const today = new Date();

//     let age =
//       today.getFullYear() -
//       dob.getFullYear();

//     const monthDiff =
//       today.getMonth() -
//       dob.getMonth();

//     if (
//       monthDiff < 0 ||
//       (monthDiff === 0 &&
//         today.getDate() <
//           dob.getDate())
//     ) {
//       age--;
//     }

//     return age;
//   };

//   const handleNext = () => {
//     const age = calculateAge(date);

//     if (age < 13) {
//       Toast.show({
//         type: "error",
//         text1: "Age Restriction",
//         text2:
//           "You must be at least 13 years old",
//       });
//       return;
//     }

//     const formattedDate = date
//       .toISOString()
//       .split("T")[0];

//     dispatch(
//       setSignupData({
//         date_of_birth:
//           formattedDate,
//       })
//     );

//     router.push("/gender");
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
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

//         <Text style={styles.title}>
//           What's your birthday?
//         </Text>

//         <Text style={styles.subtitle}>
//           This won't be part of your public
//           profile.
//         </Text>

//         <TouchableOpacity
//           style={styles.dateBox}
//           onPress={() => setShow(true)}
//         >
//           <Text style={styles.dateText}>
//             {date.toDateString()}
//           </Text>

//           <Ionicons
//             name="calendar-outline"
//             size={24}
//             color={Colors.textPrimary}
//           />
//         </TouchableOpacity>

//         {show && (
//           <DateTimePicker
//             value={date}
//             mode="date"
//             display={
//               Platform.OS === "ios"
//                 ? "spinner"
//                 : "default"
//             }
//             maximumDate={new Date()}
//             onChange={(
//               event,
//               selectedDate
//             ) => {
//               setShow(false);

//               if (selectedDate) {
//                 setDate(selectedDate);
//               }
//             }}
//           />
//         )}

//         <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={handleNext}
//         >
//           <LinearGradient
//             colors={
//               Colors.gradients.primary
//             }
//             style={styles.button}
//           >
//             <Text style={styles.buttonText}>
//               Next
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>
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
//   },

//   backBtn: {
//     width: 45,
//     height: 45,
//     justifyContent: "center",
//   },

//   title: {
//     color: Colors.textPrimary,
//     fontSize: 32,
//     fontWeight: "700",
//     marginTop: 20,
//   },

//   subtitle: {
//     color: Colors.textSecondary,
//     fontSize: 16,
//     lineHeight: 24,
//     marginTop: 12,
//     marginBottom: 35,
//   },

//   dateBox: {
//     backgroundColor: Colors.bgInput,
//     borderWidth: 1,
//     borderColor: Colors.borderDefault,
//     borderRadius: 16,
//     height: 60,
//     paddingHorizontal: 18,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   dateText: {
//     color: Colors.textPrimary,
//     fontSize: 18,
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
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

import { Colors } from "../../src/theme/colors";
import { setSignupData } from "../../src/redux/authSlice";

export default function BirthdayScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [dob, setDob] = useState("");

  const handleNext = () => {
    if (!dob.trim()) {
      Toast.show({
        type: "error",
        text1: "Required",
        text2: "Enter your date of birth",
      });
      return;
    }

    dispatch(
      setSignupData({
        date_of_birth: dob,
      })
    );

    router.push("/gender");
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
          What's your birthday?
        </Text>

        <Text style={styles.subtitle}>
          Enter DOB in YYYY-MM-DD format
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="2000-01-01"
            placeholderTextColor={Colors.textMuted}
            value={dob}
            onChangeText={setDob}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleNext}
        >
          <LinearGradient
            colors={Colors.gradients.primary}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Next
            </Text>
          </LinearGradient>
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
  },

  backBtn: {
    width: 45,
    height: 45,
    justifyContent: "center",
  },

  title: {
    color: Colors.textPrimary,
    fontSize: 32,
    fontWeight: "700",
    marginTop: 20,
  },

  subtitle: {
    color: Colors.textSecondary,
    fontSize: 16,
    marginTop: 12,
    marginBottom: 35,
  },

  inputContainer: {
    backgroundColor: Colors.bgInput,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    borderRadius: 16,
    paddingHorizontal: 18,
  },

  input: {
    color: Colors.textPrimary,
    fontSize: 18,
    height: 55,
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
});