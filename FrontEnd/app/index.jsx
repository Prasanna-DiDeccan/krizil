import React, { useEffect, useRef } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import {
  getUser,
  getAccessToken,
} from "../src/utils/storage";

export default function SplashScreen() {
  const router = useRouter();

  const opacity = useRef(
    new Animated.Value(0.3)
  ).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const checkLogin = async () => {
      try {
        const token =
          await getAccessToken();
        const user = await getUser();

        setTimeout(() => {
          if (token && user) {
            router.replace("/(tabs)");
          } else {
            router.replace(
              "/(auth)/login"
            );
          }
        }, 3000);
      } catch (error) {
        console.log(
          "Auto Login Error:",
          error
        );

        router.replace("/(auth)/login");
      }
    };

    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>
        KRIZIL
      </Text>

      <Text style={styles.subtitle}>
        Connect <Text style={styles.dot}>•</Text>{" "}
        Share <Text style={styles.dot}>•</Text>{" "}
        Explore
      </Text>

      <View style={styles.dots}>
        <View style={styles.grayDot} />

        <Animated.View
          style={[
            styles.blueDot,
            { opacity },
          ]}
        />

        <View style={styles.grayDot} />
      </View>

      <Text style={styles.loading}>
        Loading...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },

  title: {
    color: "#fff",
    fontSize: 52,
    fontWeight: "700",
    letterSpacing: 10,
    marginTop: 10,
  },

  subtitle: {
    marginTop: 10,
    color: "#D0D0D0",
    fontSize: 18,
    letterSpacing: 1,
  },

  dot: {
    color: "#2348FF",
  },

  dots: {
    flexDirection: "row",
    marginTop: 55,
    alignItems: "center",
  },

  grayDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#303030",
    marginHorizontal: 7,
  },

  blueDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#2348FF",
    marginHorizontal: 7,
  },

  loading: {
    color: "#E4E4E4",
    marginTop: 28,
    fontSize: 18,
    letterSpacing: 1,
  },
});