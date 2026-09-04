// import { Stack } from "expo-router";

// export default function PostsLayout() {
//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false,
//         animation: "slide_from_right",
//       }}
//     />
//   );
// }

import React from "react";
import { Stack } from "expo-router";

export default function PostsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: {
          backgroundColor: "#000",
        },
      }}
    />
  );
}