// import React from "react";
// import {
//   View,
//   StyleSheet,
//   StatusBar,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import { Colors } from "../theme/colors";

// export default function ScreenLayout({
//   children,
//   header = null,
//   footer = null,
//   backgroundColor = Colors.bgDefault,
//   scroll = false,
//   keyboardAvoid = true,
//   edges = ["top", "bottom"],
// }) {
//   const content = scroll ? (
//     <ScrollView
//       style={styles.scroll}
//       contentContainerStyle={styles.scrollContent}
//       showsVerticalScrollIndicator={false}
//       keyboardShouldPersistTaps="handled"
//       bounces={false}
//     >
//       {children}
//     </ScrollView>
//   ) : (
//     <View style={styles.content}>{children}</View>
//   );

//   const wrappedContent = keyboardAvoid ? (
//     <KeyboardAvoidingView
//       style={styles.keyboard}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       {content}
//     </KeyboardAvoidingView>
//   ) : (
//     content
//   );

//   return (
//     <View
//       style={[
//         styles.root,
//         { backgroundColor },
//       ]}
//     >
//       <StatusBar
//         barStyle="light-content"
//         backgroundColor={backgroundColor}
//         translucent={false}
//       />

//       <SafeAreaView
//         style={[
//           styles.safeArea,
//           { backgroundColor },
//         ]}
//         edges={edges}
//       >
//         {/* HEADER */}
//         {header ? (
//           <View style={styles.header}>
//             {header}
//           </View>
//         ) : null}

//         {/* CONTENT */}
//         {wrappedContent}

//         {/* FOOTER */}
//         {footer ? (
//           <View style={styles.footer}>
//             {footer}
//           </View>
//         ) : null}
//       </SafeAreaView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//   },

//   safeArea: {
//     flex: 1,
//   },

//   keyboard: {
//     flex: 1,
//   },

//   content: {
//     flex: 1,
//     width: "100%",
//   },

//   scroll: {
//     flex: 1,
//     width: "100%",
//   },

//   scrollContent: {
//     flexGrow: 1,
//     width: "100%",
//   },

//   header: {
//     width: "100%",
//   },

//   footer: {
//     width: "100%",
//   },
// });

import React from "react";

import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { StatusBar } from "expo-status-bar";

import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "../theme/colors";

export default function ScreenLayout({
  children,
  header = null,
  footer = null,
  backgroundColor = Colors.bgDefault,
  scroll = false,
  keyboardAvoid = true,
  edges = ["top", "bottom"],
}) {
  const content = scroll ? (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      bounces={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={styles.content}>
      {children}
    </View>
  );

  const layout = (
    <>
      {header ? (
        <View style={styles.header}>
          {header}
        </View>
      ) : null}

      {content}

      {footer ? (
        <View style={styles.footer}>
          {footer}
        </View>
      ) : null}
    </>
  );

  return (
    <View
      style={[
        styles.root,
        { backgroundColor },
      ]}
    >
      <StatusBar
        style="light"
        backgroundColor={backgroundColor}
      />

      <SafeAreaView
        style={[
          styles.safeArea,
          { backgroundColor },
        ]}
        edges={edges}
      >
        {keyboardAvoid ? (
          <KeyboardAvoidingView
            style={styles.keyboard}
            behavior={
              Platform.OS === "ios"
                ? "padding"
                : "height"
            }
          >
            {layout}
          </KeyboardAvoidingView>
        ) : (
          layout
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  keyboard: {
    flex: 1,
  },

  content: {
    flex: 1,
    width: "100%",
  },

  scroll: {
    flex: 1,
    width: "100%",
  },

  scrollContent: {
    flexGrow: 1,
    width: "100%",
  },

  header: {
    width: "100%",
  },

  footer: {
    width: "100%",
  },
});