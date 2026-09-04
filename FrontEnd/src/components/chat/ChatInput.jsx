
// import React, {
//   useCallback,
//   useState,
// } from "react";

// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";

// import {
//   Ionicons,
// } from "@expo/vector-icons";

// export default function ChatInput({
//   onSend,
//   sending = false,
// }) {
//   const [text, setText] = useState("");

//   const handleSend = useCallback(() => {
//     const trimmed = text.trim();

//     if (!trimmed || sending) {
//       return;
//     }

//     onSend?.(trimmed);
//     setText("");
//   }, [text, sending, onSend]);

//   const hasText = text.trim().length > 0;

//   return (
//     <View style={styles.wrapper}>
//       <View style={styles.container}>

//         {/* PLUS */}
//         <TouchableOpacity
//           style={styles.iconButton}
//           activeOpacity={0.7}
//         >
//           <Ionicons
//             name="add-circle"
//             size={30}
//             color="#fff"
//           />
//         </TouchableOpacity>

//         {/* INPUT */}
//         <View style={styles.inputContainer}>
//           <TextInput
//             value={text}
//             onChangeText={setText}
//             placeholder="Message..."
//             placeholderTextColor="#8e8e8e"
//             style={styles.input}
//             multiline
//             maxLength={2000}
//             editable={!sending}
//             returnKeyType="default"
//           />

//           {!hasText ? (
//             <TouchableOpacity
//               style={styles.emojiButton}
//               activeOpacity={0.7}
//             >
//               <Ionicons
//                 name="happy-outline"
//                 size={24}
//                 color="#fff"
//               />
//             </TouchableOpacity>
//           ) : null}
//         </View>

//         {/* CAMERA */}
//         {!hasText ? (
//           <TouchableOpacity
//             style={styles.iconButton}
//             activeOpacity={0.7}
//           >
//             <Ionicons
//               name="camera-outline"
//               size={26}
//               color="#fff"
//             />
//           </TouchableOpacity>
//         ) : null}

//         {/* MIC */}
//         {!hasText ? (
//           <TouchableOpacity
//             style={styles.iconButton}
//             activeOpacity={0.7}
//           >
//             <Ionicons
//               name="mic-outline"
//               size={25}
//               color="#fff"
//             />
//           </TouchableOpacity>
//         ) : null}

//         {/* SEND */}
//         {hasText ? (
//           <TouchableOpacity
//             style={styles.sendButton}
//             onPress={handleSend}
//             disabled={sending}
//             activeOpacity={0.7}
//           >
//             {sending ? (
//               <ActivityIndicator
//                 size="small"
//                 color="#3797f0"
//               />
//             ) : (
//               <Ionicons
//                 name="send"
//                 size={22}
//                 color="#3797f0"
//               />
//             )}
//           </TouchableOpacity>
//         ) : null}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     width: "100%",
//     backgroundColor: "#000",
//     paddingHorizontal: 8,
//     paddingTop: 8,
//     paddingBottom: 8,
//     borderTopWidth: StyleSheet.hairlineWidth,
//     borderTopColor: "#1f1f1f",
//   },

//   container: {
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "flex-end",
//   },

//   iconButton: {
//     width: 38,
//     minHeight: 42,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   inputContainer: {
//     flex: 1,
//     minHeight: 42,
//     maxHeight: 110,
//     borderWidth: 1,
//     borderColor: "#363636",
//     borderRadius: 22,
//     backgroundColor: "#121212",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingLeft: 15,
//     paddingRight: 5,
//   },

//   input: {
//     flex: 1,
//     color: "#fff",
//     fontSize: 15,
//     paddingTop: 9,
//     paddingBottom: 9,
//     maxHeight: 100,
//   },

//   emojiButton: {
//     width: 38,
//     height: 38,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   sendButton: {
//     width: 42,
//     height: 42,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });


import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

export default function ChatInput({
  onSend,
  onTyping,
  sending = false,
  editingMessage = null,
  onCancelEdit,
}) {
  const [text, setText] =
    useState("");

  useEffect(() => {
  if (editingMessage) {
    setText(
      editingMessage?.content || ""
    );
  }
}, [editingMessage]);

  const handleTextChange =
    useCallback(
      (value) => {
        setText(value);

        if (
          value.trim().length > 0
        ) {
          onTyping?.();
        }
      },
      [onTyping]
    );

  const handleSend =
    useCallback(() => {
      const trimmed =
        text.trim();

      if (
        !trimmed ||
        sending
      ) {
        return;
      }

      onSend?.(trimmed);

      setText("");
    }, [
      text,
      sending,
      onSend,
    ]);

  const hasText =
    text.trim().length > 0;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {editingMessage ? (
  <TouchableOpacity
    style={styles.iconButton}
    onPress={() => {
      setText("");
      onCancelEdit?.();
    }}
    activeOpacity={0.7}
  >
    <Ionicons
      name="close-circle"
      size={26}
      color="#fff"
    />
  </TouchableOpacity>
) : null}

        {/* PLUS */}
        <TouchableOpacity
          style={
            styles.iconButton
          }
          activeOpacity={0.7}
        >
          <Ionicons
            name="add-circle"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>

        {/* INPUT */}
        <View
          style={
            styles.inputContainer
          }
        >
          <TextInput
            value={text}
            onChangeText={
              handleTextChange
            }
            placeholder={
  editingMessage
    ? "Edit message..."
    : "Message..."
}
            placeholderTextColor="#8e8e8e"
            style={styles.input}
            multiline
            maxLength={2000}
            editable={!sending}
            returnKeyType="default"
          />

          {!hasText ? (
            <TouchableOpacity
              style={
                styles.emojiButton
              }
              activeOpacity={0.7}
            >
              <Ionicons
                name="happy-outline"
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* CAMERA */}
        {!hasText ? (
          <TouchableOpacity
            style={
              styles.iconButton
            }
            activeOpacity={0.7}
          >
            <Ionicons
              name="camera-outline"
              size={26}
              color="#fff"
            />
          </TouchableOpacity>
        ) : null}

        {/* MIC */}
        {!hasText ? (
          <TouchableOpacity
            style={
              styles.iconButton
            }
            activeOpacity={0.7}
          >
            <Ionicons
              name="mic-outline"
              size={25}
              color="#fff"
            />
          </TouchableOpacity>
        ) : null}

        {/* SEND */}
        {hasText ? (
          <TouchableOpacity
            style={
              styles.sendButton
            }
            onPress={
              handleSend
            }
            disabled={sending}
            activeOpacity={0.7}
          >
            {sending ? (
              <ActivityIndicator
                size="small"
                color="#3797f0"
              />
            ) : (
              <Ionicons
                name="send"
                size={22}
                color="#3797f0"
              />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    wrapper: {
      width: "100%",
      backgroundColor: "#000",
      paddingHorizontal: 8,
      paddingTop: 8,
      paddingBottom: 8,
      borderTopWidth:
        StyleSheet.hairlineWidth,
      borderTopColor:
        "#1f1f1f",
    },

    container: {
      width: "100%",
      flexDirection: "row",
      alignItems: "flex-end",
    },

    iconButton: {
      width: 38,
      minHeight: 42,
      alignItems: "center",
      justifyContent: "center",
    },

    inputContainer: {
      flex: 1,
      minHeight: 42,
      maxHeight: 110,
      borderWidth: 1,
      borderColor: "#363636",
      borderRadius: 22,
      backgroundColor: "#121212",
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 15,
      paddingRight: 5,
    },

    input: {
      flex: 1,
      color: "#fff",
      fontSize: 15,
      paddingTop: 9,
      paddingBottom: 9,
      maxHeight: 100,
    },

    emojiButton: {
      width: 38,
      height: 38,
      alignItems: "center",
      justifyContent: "center",
    },

    sendButton: {
      width: 42,
      height: 42,
      alignItems: "center",
      justifyContent: "center",
    },
  });