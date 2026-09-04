import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
// import Toast from "react-native-toast-message";
import Toast from "react-native-root-toast";

import { Colors } from "../../src/theme/colors";
import { setSignupData, registerUser } from "../../src/redux/authSlice";

export default function GenderScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [gender, setGender] = useState("");

  const genders = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Non Binary",
      value: "non_binary",
    },
    {
      label: "Prefer Not To Say",
      value: "prefer_not_to_say",
    },
  ];

//   const handleNext = () => {
//     if (!gender) {
//       Toast.show({
//         type: "error",
//         text1: "Select Gender",
//         text2:
//           "Please choose a gender",
//       });
//       return;
//     }

//     dispatch(
//       setSignupData({
//         gender,
//       })
//     );

//     router.push("/otp");
//   };

const handleContinue = async () => {
  if (!gender) {
    Toast.show({
      type: "error",
      text1: "Select Gender",
    });
    return;
  }

  dispatch(
    setSignupData({
      gender,
    })
  );

  try {
    const response = await dispatch(
      registerUser({
        gender,
      })
    ).unwrap();

    console.log("Register Response", response);

    Toast.show({
      type: "success",
      text1: "OTP Sent",
      text2: response.message,
    });

    router.push({
  pathname: "/otp",
  params: {
    identifier: response.identifier,
  },
});

  } catch (error) {
  console.log(
    "Register Error",
    JSON.stringify(error, null, 2)
  );

  Toast.show({
    type: "error",
    text1: "Registration Failed",
    text2: "Check console logs",
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
          What's your gender?
        </Text>

        <Text style={styles.subtitle}>
          This helps personalize your
          experience.
        </Text>

        {genders.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.genderCard,
              gender === item.value &&
                styles.selectedCard,
            ]}
            onPress={() =>
              setGender(item.value)
            }
          >
            <Text
              style={[
                styles.genderText,
                gender === item.value &&
                  styles.selectedText,
              ]}
            >
              {item.label}
            </Text>

            {gender === item.value && (
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={Colors.success}
              />
            )}
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleContinue}
        >
          <LinearGradient
            colors={
              Colors.gradients.secondary
            }
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
    marginBottom: 30,
  },

  genderCard: {
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    backgroundColor: Colors.bgInput,
    paddingHorizontal: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectedCard: {
    borderColor: Colors.primary,
  },

  genderText: {
    color: Colors.textPrimary,
    fontSize: 17,
    fontWeight: "600",
  },

  selectedText: {
    color: Colors.primaryLight,
  },

  button: {
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});