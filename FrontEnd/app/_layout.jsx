import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import Toast from "react-native-toast-message";

export default function Layout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar
            style="light"
            backgroundColor="#080913"
          />
         <Toast/>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "#080913",
              },
            }}
          >
            <Stack.Screen name="index" />
            {/* <Stack.Screen name="(auth)" /> */}
            <Stack.Screen name="(tabs)" />
          </Stack>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}