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
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import { useDispatch } from "react-redux";
// // import Toast from "react-native-toast-message";
// // see notes in app/_layout.js for why.
// import Toast from "react-native-root-toast";

// import { Colors } from "../../src/theme/colors";
// import { setSignupData } from "../../src/redux/authSlice";

// export default function BirthdayScreen() {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const [dob, setDob] = useState("");

//   const handleNext = () => {
//     if (!dob.trim()) {
//       Toast.show({
//         type: "error",
//         text1: "Required",
//         text2: "Enter your date of birth",
//       });
//       return;
//     }

//     dispatch(
//       setSignupData({
//         date_of_birth: dob,
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
//           Enter DOB in YYYY-MM-DD format
//         </Text>

//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="2000-01-01"
//             placeholderTextColor={Colors.textMuted}
//             value={dob}
//             onChangeText={setDob}
//           />
//         </View>

//         <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={handleNext}
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
//     marginTop: 12,
//     marginBottom: 35,
//   },

//   inputContainer: {
//     backgroundColor: Colors.bgInput,
//     borderWidth: 1,
//     borderColor: Colors.borderDefault,
//     borderRadius: 16,
//     paddingHorizontal: 18,
//   },

//   input: {
//     color: Colors.textPrimary,
//     fontSize: 18,
//     height: 55,
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
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";

import { Colors } from "../../src/theme/colors";
import { setSignupData } from "../../src/redux/authSlice";

import ScreenLayout from "../../src/components/ScreenLayout";
import { showToast } from "../../src/components/Customtoast";


// ======================================================
// BIRTHDAY SCREEN
// ======================================================

export default function BirthdayScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  // ====================================================
  // STATE
  // ====================================================

  const [dob, setDob] = useState("");
  const [selectedDate, setSelectedDate] =
    useState(null);

  const [showPicker, setShowPicker] =
    useState(false);


  // ====================================================
  // FORMAT DATE
  // Backend requires:
  //
  // YYYY-MM-DD
  //
  // Example:
  // 2001-01-12
  // ====================================================

  const formatDate = (date) => {
    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        date.getDate()
      ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };


  // ====================================================
  // DATE PICKER CHANGE
  // ====================================================

  const handleDateChange = (
    event,
    date
  ) => {

    // Android closes automatically
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    // User cancelled picker
    if (
      event?.type === "dismissed" ||
      !date
    ) {
      return;
    }

    const formattedDate =
      formatDate(date);

    console.log(
      "📅 SELECTED DATE =>",
      formattedDate
    );

    setSelectedDate(date);
    setDob(formattedDate);
  };


  // ====================================================
  // OPEN CALENDAR
  // ====================================================

  const openCalendar = () => {
    setShowPicker(true);
  };


  // ====================================================
  // NEXT
  // ====================================================

  const handleNext = () => {

    console.log(
      "📅 DOB =>",
      dob
    );

    // -----------------------------------------------
    // Validation
    // -----------------------------------------------

    if (!dob.trim()) {

      showToast(
        "error",
        "Date of birth required",
        "Please select your date of birth"
      );

      return;
    }


    // -----------------------------------------------
    // Save DOB in Redux
    // -----------------------------------------------

    dispatch(
      setSignupData({
        date_of_birth: dob,
      })
    );


    console.log(
      "✅ DOB SAVED TO REDUX =>",
      dob
    );


    // -----------------------------------------------
    // Navigate
    // -----------------------------------------------

    router.push("/gender");
  };


  // ====================================================
  // UI
  // ====================================================

  return (
    <ScreenLayout
      backgroundColor={
        Colors.bgDefault
      }
      keyboardAvoid={false}
      scroll={false}
    >

      <View style={styles.content}>

        {/* ==========================================
            BACK BUTTON
        ========================================== */}

        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() =>
            router.back()
          }
        >

          <Ionicons
            name="arrow-back"
            size={24}
            color={
              Colors.textPrimary
            }
          />

        </TouchableOpacity>


        {/* ==========================================
            HEADER
        ========================================== */}

        <View style={styles.header}>

          <Text style={styles.title}>
            What's your birthday?
          </Text>

          <Text style={styles.subtitle}>
            This helps us personalize
            your experience.
          </Text>

        </View>


        {/* ==========================================
            DATE INPUT
        ========================================== */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={openCalendar}
          style={[
            styles.dateInput,

            dob
              ? styles.dateInputSelected
              : null,
          ]}
        >

          {/* LEFT SIDE */}

          <View style={styles.dateLeft}>

            <View
              style={[
                styles.calendarIcon,

                dob
                  ? styles.calendarIconSelected
                  : null,
              ]}
            >

              <Ionicons
                name="calendar-outline"
                size={22}
                color={
                  dob
                    ? Colors.primaryLight
                    : Colors.textSecondary
                }
              />

            </View>


            <View>

              <Text
                style={[
                  styles.dateLabel,
                  dob
                    ? styles.dateLabelSelected
                    : null,
                ]}
              >
                Date of birth
              </Text>

              <Text
                style={[
                  styles.dateText,

                  !dob
                    ? styles.placeholderText
                    : null,
                ]}
              >
                {dob ||
                  "Select your birthday"}
              </Text>

            </View>

          </View>


          {/* RIGHT ICON */}

          <Ionicons
            name="chevron-down"
            size={20}
            color={
              Colors.textSecondary
            }
          />

        </TouchableOpacity>


        {/* ==========================================
            HELPER TEXT
        ========================================== */}

        <View style={styles.helperRow}>

          <Ionicons
            name="information-circle-outline"
            size={17}
            color={
              Colors.textMuted
            }
          />

          <Text style={styles.helperText}>
            You must be at least 13 years
            old to create an account.
          </Text>

        </View>


        {/* ==========================================
            DATE PICKER
        ========================================== */}

        {showPicker && (
          <View
            style={
              styles.calendarContainer
            }
          >

            <DateTimePicker
              value={
                selectedDate ||
                new Date(
                  2000,
                  0,
                  1
                )
              }

              mode="date"

              display={
                Platform.OS === "ios"
                  ? "spinner"
                  : "calendar"
              }

              maximumDate={
                new Date()
              }

              minimumDate={
                new Date(
                  1900,
                  0,
                  1
                )
              }

              onChange={
                handleDateChange
              }

              themeVariant="dark"
            />


            {/* ====================================
                IOS DONE BUTTON
            ==================================== */}

            {Platform.OS === "ios" && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={
                  styles.doneButton
                }
                onPress={() =>
                  setShowPicker(false)
                }
              >

                <Text
                  style={
                    styles.doneText
                  }
                >
                  Done
                </Text>

              </TouchableOpacity>
            )}

          </View>
        )}


        {/* ==========================================
            NEXT BUTTON
        ========================================== */}

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleNext}
          style={
            styles.buttonWrapper
          }
        >

          <LinearGradient
            colors={
              Colors.gradients.secondary
            }

            start={{
              x: 0,
              y: 0,
            }}

            end={{
              x: 1,
              y: 1,
            }}

            style={styles.button}
          >

            <Text
              style={
                styles.buttonText
              }
            >
              Next
            </Text>

            <Ionicons
              name="arrow-forward"
              size={20}
              color="#FFFFFF"
            />

          </LinearGradient>

        </TouchableOpacity>


        {/* ==========================================
            FLEX SPACE
        ========================================== */}

        <View
          style={
            styles.bottomSpace
          }
        />

      </View>

    </ScreenLayout>
  );
}


// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({

  // ====================================================
  // MAIN CONTENT
  // ====================================================

  content: {
    flex: 1,

    paddingHorizontal: 24,

    paddingTop: 8,
  },


  // ====================================================
  // BACK BUTTON
  // ====================================================

  backButton: {
    width: 44,
    height: 44,

    borderRadius: 22,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 20,
  },


  // ====================================================
  // HEADER
  // ====================================================

  header: {
    marginBottom: 30,
  },

  title: {
    color:
      Colors.textPrimary,

    fontSize: 32,

    lineHeight: 39,

    fontWeight: "700",

    letterSpacing: -0.6,
  },

  subtitle: {
    color:
      Colors.textSecondary,

    fontSize: 15.5,

    lineHeight: 23,

    marginTop: 12,

    maxWidth: 340,
  },


  // ====================================================
  // DATE INPUT
  // ====================================================

  dateInput: {
    minHeight: 68,

    borderRadius: 16,

    borderWidth: 1,

    borderColor:
      Colors.borderDefault,

    backgroundColor:
      Colors.bgInput,

    paddingHorizontal: 16,

    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",
  },

  dateInputSelected: {
    borderColor:
      Colors.primary,
  },


  // ====================================================
  // DATE LEFT
  // ====================================================

  dateLeft: {
    flexDirection: "row",

    alignItems: "center",

    gap: 13,
  },


  // ====================================================
  // CALENDAR ICON
  // ====================================================

  calendarIcon: {
    width: 42,
    height: 42,

    borderRadius: 12,

    backgroundColor:
      Colors.bgSurface,

    alignItems: "center",
    justifyContent: "center",
  },

  calendarIconSelected: {
    backgroundColor:
      "rgba(124, 58, 237, 0.15)",
  },


  // ====================================================
  // LABEL
  // ====================================================

  dateLabel: {
    color:
      Colors.textMuted,

    fontSize: 12,

    fontWeight: "500",

    marginBottom: 2,
  },

  dateLabelSelected: {
    color:
      Colors.primaryLight,
  },


  // ====================================================
  // DATE TEXT
  // ====================================================

  dateText: {
    color:
      Colors.textPrimary,

    fontSize: 16,

    fontWeight: "600",

    letterSpacing: 0.2,
  },

  placeholderText: {
    color:
      Colors.textMuted,

    fontWeight: "500",
  },


  // ====================================================
  // HELPER
  // ====================================================

  helperRow: {
    flexDirection: "row",

    alignItems: "flex-start",

    marginTop: 11,

    paddingHorizontal: 3,
  },

  helperText: {
    color:
      Colors.textMuted,

    fontSize: 13,

    lineHeight: 19,

    marginLeft: 6,

    flex: 1,
  },


  // ====================================================
  // CALENDAR CONTAINER
  // ====================================================

  calendarContainer: {
    marginTop: 18,

    borderRadius: 18,

    overflow: "hidden",

    backgroundColor:
      Colors.bgCard,

    borderWidth: 1,

    borderColor:
      Colors.borderDefault,

    alignItems: "center",

    paddingVertical: 8,
  },


  // ====================================================
  // IOS DONE
  // ====================================================

  doneButton: {
    alignSelf: "stretch",

    marginHorizontal: 16,

    marginTop: 4,

    marginBottom: 8,

    height: 44,

    borderRadius: 12,

    backgroundColor:
      Colors.primary,

    alignItems: "center",

    justifyContent: "center",
  },

  doneText: {
    color: "#FFFFFF",

    fontSize: 15,

    fontWeight: "700",
  },


  // ====================================================
  // NEXT BUTTON
  // ====================================================

  buttonWrapper: {
    marginTop: 30,
  },

  button: {
    height: 56,

    borderRadius: 28,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 9,

    shadowColor:
      Colors.primary,

    shadowOpacity: 0.25,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,
  },

  buttonText: {
    color: "#FFFFFF",

    fontSize: 17,

    fontWeight: "700",
  },


  // ====================================================
  // BOTTOM
  // ====================================================

  bottomSpace: {
    flex: 1,
  },
});