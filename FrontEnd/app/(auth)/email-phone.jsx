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
// import { useDispatch, useSelector } from "react-redux";
// // import Toast from "react-native-toast-message";

// import Toast from "react-native-root-toast";

// import { Colors } from "../../src/theme/colors";
// import { setSignupData } from "../../src/redux/authSlice";

// export default function EmailPhoneScreen() {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const [identifier, setIdentifier] =
//     useState("");
// const { signupData } = useSelector(
//   (state) => state.auth
// );

// console.log("Redux Data:", signupData);

//   const handleNext = () => {
//     const formattedPhone = `+91${identifier}`;
//     if (!identifier.trim()) {
//       Toast.show({
//         type: "error",
//         text1: "Required",
//         text2:
//           "Enter email or phone number",
//       });
//       return;
//     }

//     dispatch(
//       setSignupData({
//         identifier: identifier.trim(),
//       })
//     );

//     router.push("/password");
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
//           What's your email or phone?
//         </Text>

//         <Text style={styles.subtitle}>
//           Enter your email address or
//           mobile number.
//         </Text>

//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Email or phone"
//             placeholderTextColor={
//               Colors.textMuted
//             }
//             value={identifier}
//             onChangeText={setIdentifier}
//             autoCapitalize="none"
//             keyboardType="email-address"
//           />
//         </View>

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

//   inputContainer: {
//     backgroundColor: Colors.bgInput,
//     borderWidth: 1,
//     borderColor: Colors.borderDefault,
//     borderRadius: 16,
//     paddingHorizontal: 18,
//     paddingVertical: 8,
//   },

//   input: {
//     color: Colors.textPrimary,
//     fontSize: 18,
//     height: 50,
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
  Image,
  Dimensions,
  Modal,
  FlatList,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import { useRouter } from "expo-router";

import { useDispatch, useSelector } from "react-redux";

import ScreenLayout from "../../src/components/ScreenLayout";

import { COUNTRY_CODES } from "../../src/constants/countryCodes";

import { Colors } from "../../src/theme/colors";

import { setSignupData } from "../../src/redux/authSlice";

import { showToast } from "../../src/components/Customtoast";

const { width } = Dimensions.get("window");

export default function EmailPhoneScreen() {
  const router = useRouter();

  const dispatch = useDispatch();

  const { signupData } = useSelector(
    (state) => state.auth
  );

  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");

  console.log("Redux Data:", signupData);

  const [selectedCountry, setSelectedCountry] = useState(
  COUNTRY_CODES[0]
);

const [countryModalVisible, setCountryModalVisible] =
  useState(false);

  /* =====================================================
     CONTINUE
  ===================================================== */

  const handleNext = () => {
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    /* -----------------------------------------------
       NOTHING ENTERED
    ----------------------------------------------- */

    if (!trimmedPhone && !trimmedEmail) {
      showToast(
        "error",
        "Required",
        "Enter your email or phone number"
      );

      return;
    }

    /* -----------------------------------------------
       BOTH ENTERED
       Phone takes priority
    ----------------------------------------------- */

   const identifier = trimmedPhone
  ? `${selectedCountry.code}${trimmedPhone}`
  : trimmedEmail;

    /* -----------------------------------------------
       PHONE VALIDATION
    ----------------------------------------------- */

    if (trimmedPhone) {
      const phoneRegex = /^[0-9]{10}$/;

      if (!phoneRegex.test(trimmedPhone)) {
        showToast(
          "error",
          "Invalid Phone Number",
          "Enter a valid 10-digit phone number"
        );

        return;
      }
    }

    /* -----------------------------------------------
       EMAIL VALIDATION
    ----------------------------------------------- */

    if (!trimmedPhone && trimmedEmail) {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(trimmedEmail)) {
        showToast(
          "error",
          "Invalid Email",
          "Enter a valid email address"
        );

        return;
      }
    }

    /* -----------------------------------------------
       SAVE TO REDUX
    ----------------------------------------------- */

    dispatch(
      setSignupData({
        identifier,
      })
    );

    console.log(
      "✅ Identifier saved:",
      identifier
    );

    /* -----------------------------------------------
       NEXT SCREEN
    ----------------------------------------------- */

    router.push("/password");
  };

  /* =====================================================
     PHONE CHANGE
  ===================================================== */

  const handlePhoneChange = (text) => {
    const numericText = text.replace(
      /[^0-9]/g,
      ""
    );

    setPhone(numericText);

    /* Keep email empty when phone is being used */
    if (numericText.length > 0) {
      setEmail("");
    }
  };

  /* =====================================================
     EMAIL CHANGE
  ===================================================== */

  const handleEmailChange = (text) => {
    setEmail(text);

    /* Keep phone empty when email is being used */
    if (text.length > 0) {
      setPhone("");
    }
  };

  return (
    <ScreenLayout
      backgroundColor={Colors.bgDefault}
      scroll={false}
    >
      <View style={styles.screen}>

        {/* =================================================
            BACKGROUND
        ================================================= */}

        <View
          pointerEvents="none"
          style={styles.background}
        >
          <View style={styles.waveOne} />

          <View style={styles.waveTwo} />

          <View style={styles.waveThree} />

          <View style={styles.waveFour} />

          <View style={styles.waveFive} />
        </View>

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Ionicons
              name="chevron-back"
              size={27}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>
        </View>

        {/* =================================================
            LOGO
        ================================================= */}

        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* <Text style={styles.logoText}>
            Krizil
          </Text> */}
        </View>

        {/* =================================================
            TITLE
        ================================================= */}

        <Text style={styles.title}>
          Enter your contact
        </Text>

        <Text style={styles.title}>
          information
        </Text>

        {/* =================================================
            SUBTITLE
        ================================================= */}

        <Text style={styles.subtitle}>
          Enter your email address or
        </Text>

        <Text style={styles.subtitleSecond}>
          phone number.
        </Text>

        {/* =================================================
            PHONE INPUT
        ================================================= */}

        <View style={styles.phoneContainer}>

        <TouchableOpacity
  activeOpacity={0.7}
  style={styles.countryContainer}
  onPress={() => setCountryModalVisible(true)}
>
  <Text style={styles.flag}>
    {selectedCountry.flag}
  </Text>

  <Ionicons
    name="chevron-down"
    size={13}
    color={Colors.textSecondary}
    style={styles.countryArrow}
  />

  <Text style={styles.countryCode}>
    {selectedCountry.code}
  </Text>
</TouchableOpacity>

          {/* DIVIDER */}
          <View style={styles.verticalDivider} />

          {/* PHONE */}
          <TextInput
            style={styles.phoneInput}
            placeholder="Phone number"
            placeholderTextColor={
              Colors.textMuted
            }
            value={phone}
            onChangeText={
              handlePhoneChange
            }
            keyboardType="phone-pad"
            maxLength={10}
            autoCorrect={false}
          />
        </View>

        {/* =================================================
            OR DIVIDER
        ================================================= */}

        <View style={styles.orContainer}>

          <View style={styles.orLine} />

          <Text style={styles.orText}>
            OR
          </Text>

          <View style={styles.orLine} />

        </View>

        {/* =================================================
            EMAIL INPUT
        ================================================= */}

        <View style={styles.emailContainer}>

          <Ionicons
            name="mail-outline"
            size={23}
            color={Colors.textSecondary}
            style={styles.emailIcon}
          />

          <TextInput
            style={styles.emailInput}
            placeholder="Email address"
            placeholderTextColor={
              Colors.textMuted
            }
            value={email}
            onChangeText={
              handleEmailChange
            }
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

        </View>

        {/* =================================================
            SECURITY MESSAGE
        ================================================= */}

        <Text style={styles.helperText}>
          We'll use this information to help you
        </Text>

        <Text style={styles.helperText}>
          log in and keep your account secure.
        </Text>

        {/* =================================================
            CONTINUE BUTTON
        ================================================= */}

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleNext}
          style={styles.buttonWrapper}
        >
          <LinearGradient
            colors={Colors.gradients.secondary}
            start={{
              x: 0,
              y: 0,
            }}
            end={{
              x: 1,
              y: 0,
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Continue
            </Text>
          </LinearGradient>
        </TouchableOpacity>

      </View>
      <Modal
  visible={countryModalVisible}
  transparent
  animationType="fade"
  onRequestClose={() =>
    setCountryModalVisible(false)
  }
>
  <TouchableOpacity
    activeOpacity={1}
    style={styles.modalOverlay}
    onPress={() => setCountryModalVisible(false)}
  >
    <TouchableOpacity
      activeOpacity={1}
      style={styles.countryModal}
    >
      <Text style={styles.modalTitle}>
        Select country
      </Text>

      <FlatList
        data={COUNTRY_CODES}
        keyExtractor={(item) =>
          item.code + item.name
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.countryRow}
            activeOpacity={0.7}
            onPress={() => {
              setSelectedCountry(item);
              setCountryModalVisible(false);
            }}
          >
            <Text style={styles.modalFlag}>
              {item.flag}
            </Text>

            <Text style={styles.countryName}>
              {item.name}
            </Text>

            <Text style={styles.modalCode}>
              {item.code}
            </Text>
          </TouchableOpacity>
        )}
      />
    </TouchableOpacity>
  </TouchableOpacity>
</Modal>
    </ScreenLayout>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({

  /* =====================================================
     SCREEN
  ===================================================== */

  screen: {
    flex: 1,

    paddingHorizontal: 24,

    paddingTop: 5,

    paddingBottom: 12,

    position: "relative",

    overflow: "hidden",
  },

  /* =====================================================
     BACKGROUND
  ===================================================== */

  background: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: Colors.bgDefault,

    overflow: "hidden",
  },

  /* =====================================================
     WAVES
  ===================================================== */

  waveOne: {
    position: "absolute",

    width: width * 1.75,

    height: width * 0.68,

    borderRadius: 999,

    borderWidth: 1,

    borderColor:
      "rgba(124,58,237,0.15)",

    left: -width * 0.60,

    bottom: -width * 0.10,

    transform: [
      {
        rotate: "-8deg",
      },
    ],
  },

  waveTwo: {
    position: "absolute",

    width: width * 1.62,

    height: width * 0.61,

    borderRadius: 999,

    borderWidth: 1,

    borderColor:
      "rgba(159,103,255,0.13)",

    left: -width * 0.50,

    bottom: -width * 0.03,

    transform: [
      {
        rotate: "-8deg",
      },
    ],
  },

  waveThree: {
    position: "absolute",

    width: width * 1.49,

    height: width * 0.55,

    borderRadius: 999,

    borderWidth: 1,

    borderColor:
      "rgba(124,58,237,0.14)",

    left: -width * 0.40,

    bottom: width * 0.05,

    transform: [
      {
        rotate: "-8deg",
      },
    ],
  },

  waveFour: {
    position: "absolute",

    width: width * 1.36,

    height: width * 0.49,

    borderRadius: 999,

    borderWidth: 1,

    borderColor:
      "rgba(159,103,255,0.10)",

    left: -width * 0.30,

    bottom: width * 0.13,

    transform: [
      {
        rotate: "-8deg",
      },
    ],
  },

  waveFive: {
    position: "absolute",

    width: width * 1.23,

    height: width * 0.43,

    borderRadius: 999,

    borderWidth: 1,

    borderColor:
      "rgba(124,58,237,0.08)",

    left: -width * 0.20,

    bottom: width * 0.21,

    transform: [
      {
        rotate: "-8deg",
      },
    ],
  },

  /* =====================================================
     HEADER
  ===================================================== */

  header: {
    height: 40,

    justifyContent: "center",
  },

  backButton: {
    width: 40,

    height: 40,

    justifyContent: "center",

    alignItems: "flex-start",
  },

  /* =====================================================
     LOGO
  ===================================================== */

  logoContainer: {
    alignItems: "center",

    justifyContent: "center",

    flexDirection: "row",

    marginTop: 18,

    marginBottom: 31,
  },

  logo: {
    width: 42,

    height: 42,

    marginRight: 8,
  },

  logoText: {
    color: Colors.textPrimary,

    fontSize: 25,

    fontWeight: "700",

    letterSpacing: -0.4,
  },

  /* =====================================================
     TITLE
  ===================================================== */

  title: {
    color: Colors.textPrimary,

    fontSize: 24,

    lineHeight: 29,

    fontWeight: "700",

    textAlign: "center",

    letterSpacing: -0.3,
  },

  /* =====================================================
     SUBTITLE
  ===================================================== */

  subtitle: {
    color: Colors.textSecondary,

    fontSize: 14,

    lineHeight: 20,

    textAlign: "center",

    marginTop: 8,
  },

  subtitleSecond: {
    color: Colors.textSecondary,

    fontSize: 14,

    lineHeight: 20,

    textAlign: "center",

    marginBottom: 27,
  },

  /* =====================================================
     PHONE
  ===================================================== */

  phoneContainer: {
    width: "100%",

    height: 57,

    flexDirection: "row",

    alignItems: "center",

    backgroundColor:
      "rgba(30,30,46,0.72)",

    borderWidth: 1,

    borderColor: "#5B536B",

    borderRadius: 8,

    overflow: "hidden",
  },

  countryContainer: {
    height: "100%",

    flexDirection: "row",

    alignItems: "center",

    paddingLeft: 12,

    paddingRight: 9,
  },

  flag: {
    fontSize: 19,
  },

  countryArrow: {
    marginLeft: 4,
  },

  countryCode: {
    color: Colors.textPrimary,

    fontSize: 14,

    marginLeft: 9,

    fontWeight: "500",
  },

  verticalDivider: {
    width: 1,

    height: 31,

    backgroundColor:
      "rgba(160,160,176,0.35)",
  },

  phoneInput: {
    flex: 1,

    height: 55,

    color: Colors.textPrimary,

    fontSize: 15,

    paddingHorizontal: 13,

    paddingVertical: 0,
  },

  /* =====================================================
     OR
  ===================================================== */

  orContainer: {
    flexDirection: "row",

    alignItems: "center",

    width: "100%",

    marginVertical: 18,
  },

  orLine: {
    flex: 1,

    height: 1,

    backgroundColor:
      "rgba(160,160,176,0.40)",
  },

  orText: {
    color: Colors.textSecondary,

    fontSize: 12,

    fontWeight: "500",

    marginHorizontal: 20,
  },

  /* =====================================================
     EMAIL
  ===================================================== */

  emailContainer: {
    width: "100%",

    height: 57,

    flexDirection: "row",

    alignItems: "center",

    backgroundColor:
      "rgba(30,30,46,0.72)",

    borderWidth: 1,

    borderColor: "#5B536B",

    borderRadius: 8,

    paddingHorizontal: 13,
  },

  emailIcon: {
    marginRight: 11,
  },

  emailInput: {
    flex: 1,

    height: 55,

    color: Colors.textPrimary,

    fontSize: 15,

    paddingVertical: 0,
  },

  /* =====================================================
     HELPER TEXT
  ===================================================== */

  helperText: {
    color: Colors.textSecondary,

    fontSize: 12.5,

    lineHeight: 19,

    textAlign: "center",

    marginTop: 12,
  },

  /* =====================================================
     BUTTON
  ===================================================== */

  buttonWrapper: {
    marginTop: 25,
  },

  button: {
    width: "100%",

    height: 53,

    borderRadius: 8,

    alignItems: "center",

    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",

    fontSize: 16,

    fontWeight: "700",

    letterSpacing: 0.1,
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.65)",
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 24,
},

countryModal: {
  width: "100%",
  maxHeight: "70%",
  backgroundColor: "#1E1E2E",
  borderRadius: 14,
  paddingVertical: 18,
  overflow: "hidden",
},

modalTitle: {
  color: Colors.textPrimary,
  fontSize: 18,
  fontWeight: "700",
  paddingHorizontal: 20,
  marginBottom: 10,
},

countryRow: {
  height: 52,
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 20,
},

modalFlag: {
  fontSize: 21,
  width: 38,
},

countryName: {
  flex: 1,
  color: Colors.textPrimary,
  fontSize: 15,
},

modalCode: {
  color: Colors.textSecondary,
  fontSize: 14,
},
});