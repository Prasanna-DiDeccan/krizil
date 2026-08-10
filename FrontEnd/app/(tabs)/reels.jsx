// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import ReelVideo from "../../src/components/reels/ReelVideo";
// import ReelActions from "../../src/components/reels/ReelActions";
// import ReelInfo from "../../src/components/reels/ReelInfo";

// export default function Reels() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <ReelVideo />

//       <Text style={styles.title}>
//         Reels
//       </Text>
//       <ReelActions/>
//       <ReelInfo/>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//   },

//   title: {
//     position: "absolute",
//     top: 60,
//     left: 20,
//     color: "#fff",
//     fontSize: 34,
//     fontWeight: "700",
//   },
// });

import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import ReelsList from "../../src/components/reels/ReelsList";



export default function Reels() {
  return (
   
    <SafeAreaView style={styles.container}>
      <ReelsList/>

      <Text style={styles.title}>
        Reels
      </Text>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  title: {
    position: "absolute",
    top: 60,
    left: 20,
    color: "#fff",
    fontSize: 34,
    fontWeight: "700",
    zIndex: 100,
  },
});