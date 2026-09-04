// // import { Stack } from "expo-router";
// // import { StatusBar } from "expo-status-bar";
// // import { GestureHandlerRootView } from "react-native-gesture-handler";
// // import { SafeAreaProvider } from "react-native-safe-area-context";

// // import { Provider } from "react-redux";
// // import { store } from "../src/redux/store";
// // import Toast from "react-native-toast-message";

// // export default function Layout() {
// //   return (
// //     <Provider store={store}>
// //       <SafeAreaProvider>
// //         <GestureHandlerRootView style={{ flex: 1 }}>
// //           <StatusBar
// //             style="light"
// //             backgroundColor="#080913"
// //           />
// //          <Toast/>
// //           <Stack
// //             screenOptions={{
// //               headerShown: false,
// //               contentStyle: {
// //                 backgroundColor: "#080913",
// //               },
// //             }}
// //           >
// //             <Stack.Screen name="index" />
// //             {/* <Stack.Screen name="(auth)" /> */}
// //             <Stack.Screen name="(tabs)" />
// //           </Stack>
// //         </GestureHandlerRootView>
// //       </SafeAreaProvider>
// //     </Provider>
// //   );
// // }

// import React, {
//   useEffect,
//   useState,
// } from "react";

// import {
//   Stack,
//   useRouter,
//   useSegments,
// } from "expo-router";

// import { StatusBar } from "expo-status-bar";

// import {
//   GestureHandlerRootView,
// } from "react-native-gesture-handler";

// import {
//   SafeAreaProvider,
// } from "react-native-safe-area-context";

// import { Provider } from "react-redux";

// import {
//   store,
// } from "../src/redux/store";

// import CustomToastHost from "../src/components/Customtoast";
 

// import {
//   getAccessToken,
// } from "../src/utils/storage";

// import {
//   onAuthLogout,
// } from "../src/utils/authEvents";

// export default function Layout() {
//   const router = useRouter();

//   const segments = useSegments();

//   const [
//     checkingAuth,
//     setCheckingAuth,
//   ] = useState(true);

//   // ==========================================
//   // INITIAL AUTH CHECK
//   // ==========================================

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   // ==========================================
//   // LISTEN FOR AUTH LOGOUT
//   // ==========================================

//   useEffect(() => {
//     console.log(
//       "👂 ROOT LAYOUT AUTH LISTENER REGISTERED"
//     );

//     const unsubscribe = onAuthLogout(() => {
//       console.log(
//         "🚨 ROOT LAYOUT RECEIVED AUTH LOGOUT"
//       );

//       router.replace(
//         "/(auth)/login"
//       );
//     });

//     return () => {
//       console.log(
//         "🧹 ROOT LAYOUT AUTH LISTENER REMOVED"
//       );

//       unsubscribe();
//     };
//   }, []);

//   // ==========================================
//   // CHECK AUTH
//   // ==========================================

//   const checkAuth = async () => {
//     try {
//       const token =
//         await getAccessToken();

//       console.log(
//         "🔐 ROOT LAYOUT ACCESS TOKEN =>",
//         token
//       );

//       const inAuthGroup =
//         segments[0] === "(auth)";

//       const inTabsGroup =
//         segments[0] === "(tabs)";

//       console.log(
//         "📍 CURRENT SEGMENTS =>",
//         segments
//       );

//       console.log(
//         "📍 IN AUTH =>",
//         inAuthGroup
//       );

//       console.log(
//         "📍 IN TABS =>",
//         inTabsGroup
//       );

//       // ==========================================
//       // NO ACCESS TOKEN
//       // ==========================================

//       if (!token) {
//         console.log(
//           "❌ NO ACCESS TOKEN"
//         );

//         if (!inAuthGroup) {
//           console.log(
//             "➡️ REDIRECTING TO LOGIN"
//           );

//           router.replace(
//             "/(auth)/login"
//           );
//         }

//         return;
//       }

//       // ==========================================
//       // ACCESS TOKEN EXISTS
//       // ==========================================

//       console.log(
//         "✅ ACCESS TOKEN EXISTS"
//       );

//       if (inAuthGroup) {
//         console.log(
//           "➡️ USER ALREADY LOGGED IN"
//         );

//         router.replace(
//           "/(tabs)"
//         );
//       }
//     } catch (error) {
//       console.log(
//         "❌ AUTH CHECK ERROR =>",
//         error
//       );

//       router.replace(
//         "/(auth)/login"
//       );
//     } finally {
//       setCheckingAuth(false);
//     }
//   };

//   // ==========================================
//   // WAIT FOR AUTH CHECK
//   // ==========================================

//   if (checkingAuth) {
//     return null;
//   }

//   // ==========================================
//   // APP
//   // ==========================================

//   return (
    
//     <Provider store={store}>
//       <SafeAreaProvider>
//         <GestureHandlerRootView
//           style={{
//             flex: 1,
//           }}
//         >
//           <StatusBar
//             style="light"
//             backgroundColor="#080913"
//           />

//           {/* <Toast /> */}

//           <Stack
//             screenOptions={{
//               headerShown: false,

//               contentStyle: {
//                 backgroundColor:
//                   "#080913",
//               },
//             }}
//           />
//            <CustomToastHost />
//         </GestureHandlerRootView>
//       </SafeAreaProvider>
//     </Provider>
   
//   );
// }

import React, {
  useEffect,
  useState,
} from "react";

import {
  Stack,
  useRouter,
  useSegments,
} from "expo-router";

import { StatusBar } from "expo-status-bar";

import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import {
  SafeAreaProvider,
} from "react-native-safe-area-context";

import { Provider } from "react-redux";

import {
  store,
} from "../src/redux/store";

import {
  setUser,
} from "../src/redux/authSlice";

import CustomToastHost from "../src/components/Customtoast";

import {
  getAccessToken,
  getUser,
} from "../src/utils/storage";

import {
  onAuthLogout,
} from "../src/utils/authEvents";

export default function Layout() {
  const router = useRouter();

  const segments = useSegments();

  const [
    checkingAuth,
    setCheckingAuth,
  ] = useState(true);

  // ==========================================
  // INITIAL AUTH CHECK
  // ==========================================

  useEffect(() => {
    checkAuth();
  }, []);

  // ==========================================
  // LISTEN FOR AUTH LOGOUT
  // ==========================================

  useEffect(() => {
    console.log(
      "👂 ROOT LAYOUT AUTH LISTENER REGISTERED"
    );

    const unsubscribe =
      onAuthLogout(() => {
        console.log(
          "🚨 ROOT LAYOUT RECEIVED AUTH LOGOUT"
        );

        router.replace(
          "/(auth)/login"
        );
      });

    return () => {
      console.log(
        "🧹 ROOT LAYOUT AUTH LISTENER REMOVED"
      );

      unsubscribe();
    };
  }, []);

  // ==========================================
  // CHECK AUTH
  // ==========================================

  const checkAuth = async () => {
    try {
      // ========================================
      // GET SAVED SESSION
      // ========================================

      const token =
        await getAccessToken();

      const savedUser =
        await getUser();

      console.log(
        "🔐 ROOT LAYOUT ACCESS TOKEN EXISTS =>",
        !!token
      );

      console.log(
        "👤 ROOT LAYOUT SAVED USER =>",
        savedUser
      );

      // ========================================
      // RESTORE USER INTO REDUX
      // ========================================

      if (savedUser) {
        store.dispatch(
          setUser(savedUser)
        );

        console.log(
          "✅ USER RESTORED TO REDUX"
        );

        console.log(
          "👤 RESTORED USER ID =>",
          savedUser?.id
        );

        console.log(
          "👤 RESTORED USERNAME =>",
          savedUser?.username
        );
      } else {
        console.log(
          "⚠️ NO SAVED USER FOUND"
        );
      }

      // ========================================
      // ROUTE INFORMATION
      // ========================================

      const inAuthGroup =
        segments[0] === "(auth)";

      const inTabsGroup =
        segments[0] === "(tabs)";

      console.log(
        "📍 CURRENT SEGMENTS =>",
        segments
      );

      console.log(
        "📍 IN AUTH =>",
        inAuthGroup
      );

      console.log(
        "📍 IN TABS =>",
        inTabsGroup
      );

      // ========================================
      // NO ACCESS TOKEN
      // ========================================

      if (!token) {
        console.log(
          "❌ NO ACCESS TOKEN"
        );

        if (!inAuthGroup) {
          console.log(
            "➡️ REDIRECTING TO LOGIN"
          );

          router.replace(
            "/(auth)/login"
          );
        }

        return;
      }

      // ========================================
      // ACCESS TOKEN EXISTS
      // ========================================

      console.log(
        "✅ ACCESS TOKEN EXISTS"
      );

      // ========================================
      // USER IS ALREADY LOGGED IN
      // ========================================

      if (inAuthGroup) {
        console.log(
          "➡️ USER ALREADY LOGGED IN"
        );

        router.replace(
          "/(tabs)"
        );
      }

    } catch (error) {
      console.log(
        "❌ AUTH CHECK ERROR =>",
        error
      );

      router.replace(
        "/(auth)/login"
      );
    } finally {
      setCheckingAuth(false);
    }
  };

  // ==========================================
  // WAIT FOR AUTH CHECK
  // ==========================================

  if (checkingAuth) {
    return null;
  }

  // ==========================================
  // APP
  // ==========================================

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView
          style={{
            flex: 1,
          }}
        >
          <StatusBar
            style="light"
            backgroundColor="#080913"
          />

          <Stack
            screenOptions={{
              headerShown: false,

              contentStyle: {
                backgroundColor:
                  "#080913",
              },
            }}
          />

          <CustomToastHost />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}