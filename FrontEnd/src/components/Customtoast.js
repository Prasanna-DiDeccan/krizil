import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, Easing } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Module-level ref so showToast() can be called from any screen
// without needing hooks or context boilerplate at every call site.
let toastRef = null;

export function showToast(type, title, message) {
  if (toastRef) {
    toastRef.show(type, title, message);
  } else {
    console.log("Toast host not mounted yet:", type, title, message);
  }
}

const DURATION = 3000; // how long the toast stays visible, ms
const SLIDE_DISTANCE = 320; // starting offset to the right (off-screen), px

export default function CustomToastHost() {
  const insets = useSafeAreaInsets();
  const translateX = useRef(new Animated.Value(SLIDE_DISTANCE)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState({
    type: "success",
    title: "",
    message: "",
  });

  const hideTimer = useRef(null);

  useEffect(() => {
    toastRef = {
      show: (type, title, message) => {
        if (hideTimer.current) clearTimeout(hideTimer.current);

        setContent({ type, title, message });
        setVisible(true);

        translateX.stopAnimation();
        opacity.stopAnimation();
        translateX.setValue(SLIDE_DISTANCE);
        opacity.setValue(0);

        Animated.parallel([
          Animated.timing(translateX, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();

        hideTimer.current = setTimeout(() => {
          Animated.parallel([
            Animated.timing(translateX, {
              toValue: SLIDE_DISTANCE,
              duration: 250,
              easing: Easing.in(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start(() => setVisible(false));
        }, DURATION);
      },
    };

    return () => {
      toastRef = null;
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  if (!visible) return null;

  const isError = content.type === "error";

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        {
          top: insets.top + 12,
          backgroundColor: isError ? "#D4537E" : "#3FBF7F",
          opacity,
          transform: [{ translateX }],
        },
      ]}
    >
      <Text style={styles.title} numberOfLines={1}>
        {content.title}
      </Text>
      {!!content.message && (
        <Text style={styles.message} numberOfLines={2}>
          {content.message}
        </Text>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 16,
    maxWidth: 300,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    zIndex: 9999,
    elevation: 9999,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  title: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  message: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    marginTop: 2,
  },
});