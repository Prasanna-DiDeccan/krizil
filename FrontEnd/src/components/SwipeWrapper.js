import React from "react";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

export default function SwipeWrapper({
  children,
  leftRoute,
  rightRoute,
}) {
  const router = useRouter();

  const onGesture = ({ nativeEvent }) => {
    if (nativeEvent.state !== State.END) return;

    if (nativeEvent.translationX < -80 && leftRoute) {
      router.replace(leftRoute);
    }

    if (nativeEvent.translationX > 80 && rightRoute) {
      router.replace(rightRoute);
    }
  };

  return (
    <PanGestureHandler onHandlerStateChange={onGesture}>
      {children}
    </PanGestureHandler>
  );
}