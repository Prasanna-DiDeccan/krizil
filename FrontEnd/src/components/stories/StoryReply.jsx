// // import React, {
// //   useState,
// // } from "react";

// // import {
// //   View,
// //   TextInput,
// //   TouchableOpacity,
// //   ActivityIndicator,
// //   StyleSheet,
// //   KeyboardAvoidingView,
// //   Platform,
// // } from "react-native";

// // import {
// //   Ionicons,
// // } from "@expo/vector-icons";

// // import {
// //   useDispatch,
// // } from "react-redux";

// // import {
// //   replyToStory,
// // } from "../../redux/storySlice";


// // export default function StoriesReply({
// //   storyId,
// //   disabled = false,
// //   onSent,
// // }) {
// //   const dispatch =
// //     useDispatch();

// //   const [reply, setReply] =
// //     useState("");

// //   const [sending, setSending] =
// //     useState(false);

// //   // =====================================================
// //   // SEND REPLY
// //   // =====================================================

// //   const handleSend = async () => {
// //     const text =
// //       reply.trim();

// //     if (
// //       !text ||
// //       !storyId ||
// //       sending ||
// //       disabled
// //     ) {
// //       return;
// //     }

// //     try {
// //       setSending(true);

// //       const result =
// //         await dispatch(
// //           replyToStory({
// //             storyId,
// //             content: text,
// //           })
// //         );

// //       if (
// //         replyToStory.fulfilled.match(
// //           result
// //         )
// //       ) {
// //         setReply("");

// //         if (onSent) {
// //           onSent(
// //             result.payload
// //           );
// //         }
// //       } else {
// //         console.log(
// //           "STORY REPLY FAILED =>",
// //           result.payload
// //         );
// //       }
// //     } catch (error) {
// //       console.log(
// //         "STORY REPLY ERROR =>",
// //         error
// //       );
// //     } finally {
// //       setSending(false);
// //     }
// //   };

// //   // =====================================================
// //   // UI
// //   // =====================================================

// //   return (
// //     <KeyboardAvoidingView
// //       behavior={
// //         Platform.OS === "ios"
// //           ? "padding"
// //           : undefined
// //       }
// //       style={
// //         styles.container
// //       }
// //     >
// //       <View
// //         style={
// //           styles.replyRow
// //         }
// //       >
// //         <TextInput
// //           value={reply}
// //           onChangeText={
// //             setReply
// //           }
// //           placeholder="Reply..."
// //           placeholderTextColor="#aaa"
// //           style={
// //             styles.input
// //           }
// //           editable={
// //             !disabled &&
// //             !sending
// //           }
// //           multiline
// //           maxLength={500}
// //           returnKeyType="send"
// //           onSubmitEditing={
// //             handleSend
// //           }
// //         />

// //         <TouchableOpacity
// //           activeOpacity={0.7}
// //           onPress={
// //             handleSend
// //           }
// //           disabled={
// //             disabled ||
// //             sending ||
// //             !reply.trim()
// //           }
// //           style={[
// //             styles.sendButton,
// //             (
// //               disabled ||
// //               sending ||
// //               !reply.trim()
// //             ) &&
// //               styles.disabledButton,
// //           ]}
// //         >
// //           {sending ? (
// //             <ActivityIndicator
// //               size="small"
// //               color="#fff"
// //             />
// //           ) : (
// //             <Ionicons
// //               name="send"
// //               size={19}
// //               color="#fff"
// //             />
// //           )}
// //         </TouchableOpacity>
// //       </View>
// //     </KeyboardAvoidingView>
// //   );
// // }


// // // =====================================================
// // // STYLES
// // // =====================================================

// // const styles =
// //   StyleSheet.create({

// //     container: {
// //       width: "100%",
// //     },

// //     replyRow: {
// //       flexDirection:
// //         "row",
// //       alignItems:
// //         "center",
// //       width: "100%",
// //     },

// //     input: {
// //       flex: 1,
// //       minHeight: 46,
// //       maxHeight: 90,
// //       borderWidth: 1,
// //       borderColor:
// //         "rgba(255,255,255,0.55)",
// //       borderRadius: 24,
// //       paddingHorizontal: 18,
// //       paddingVertical: 10,
// //       color: "#fff",
// //       fontSize: 15,
// //       backgroundColor:
// //         "rgba(0,0,0,0.45)",
// //     },

// //     sendButton: {
// //       width: 46,
// //       height: 46,
// //       marginLeft: 7,
// //       borderRadius: 23,
// //       backgroundColor:
// //         "#0095F6",
// //       justifyContent:
// //         "center",
// //       alignItems:
// //         "center",
// //     },

// //     disabledButton: {
// //       opacity: 0.45,
// //     },
// //   });

// import React, {
//   useState,
// } from "react";

// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";

// import {
//   Ionicons,
// } from "@expo/vector-icons";

// import {
//   useDispatch,
// } from "react-redux";

// import {
//   replyToStory,
// } from "../../redux/storySlice";


// export default function StoriesReply({
//   storyId,
//   disabled = false,
//   onSent,
//   onReplyFocus,
//   onReplyBlur,
// }) {
//   const dispatch = useDispatch();

//   const [reply, setReply] = useState("");
//   const [sending, setSending] = useState(false);

//   // =====================================================
//   // SEND REPLY
//   // =====================================================

//  const handleSend = async () => {
//   console.log("====================================");
//   console.log("🚀 HANDLE SEND CALLED");
//   console.log("STORY ID =>", storyId);
//   console.log("REPLY VALUE =>", reply);
//   console.log("TRIMMED REPLY =>", reply.trim());
//   console.log("DISABLED =>", disabled);
//   console.log("SENDING =>", sending);
//   console.log("====================================");

//   const text = reply.trim();

//   if (
//     !text ||
//     !storyId ||
//     sending ||
//     disabled
//   ) {
//     console.log("❌ SEND BLOCKED");
//     console.log("text =>", !!text);
//     console.log("storyId =>", storyId);
//     console.log("sending =>", sending);
//     console.log("disabled =>", disabled);
//     return;
//   }

//   try {
//     setSending(true);

//     console.log("📤 DISPATCHING STORY REPLY");
//     console.log("STORY ID =>", storyId);
//     console.log("CONTENT =>", text);

//     const result = await dispatch(
//       replyToStory({
//         storyId,
//         content: text,
//       })
//     );

//     console.log("📥 REPLY RESULT =>", result);

//     if (replyToStory.fulfilled.match(result)) {
//       console.log("✅ STORY REPLY SUCCESS");
//       console.log("RESPONSE =>", result.payload);

//       setReply("");

//       if (onSent) {
//         onSent(result.payload);
//       }
//     } else {
//       console.log("❌ STORY REPLY FAILED");
//       console.log("ERROR =>", result.payload);
//     }
//   } catch (error) {
//     console.log("❌ STORY REPLY ERROR =>", error);
//   } finally {
//     setSending(false);
//   }
// };

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <KeyboardAvoidingView
//       behavior={
//         Platform.OS === "ios"
//           ? "padding"
//           : undefined
//       }
//       style={styles.container}
//     >
//       <View style={styles.replyRow}>

//         <TextInput
//           value={reply}
//           onChangeText={setReply}
//           placeholder="Reply..."
//           placeholderTextColor="#aaa"
//           style={styles.input}
//           editable={
//             !disabled &&
//             !sending
//           }
//           multiline
//           maxLength={500}
//           returnKeyType="send"

//           // IMPORTANT:
//           // Pause story when user starts replying
//           onFocus={() => {
//             if (onReplyFocus) {
//               onReplyFocus();
//             }
//           }}

//           // Resume story when input loses focus
//           onBlur={() => {
//             if (onReplyBlur) {
//               onReplyBlur();
//             }
//           }}

//           onSubmitEditing={handleSend}
//         />

//         <TouchableOpacity
//           activeOpacity={0.7}
//           onPress={handleSend}
//           disabled={
//             disabled ||
//             sending ||
//             !reply.trim()
//           }
//           style={[
//             styles.sendButton,
//             (
//               disabled ||
//               sending ||
//               !reply.trim()
//             ) &&
//               styles.disabledButton,
//           ]}
//         >
//           {sending ? (
//             <ActivityIndicator
//               size="small"
//               color="#fff"
//             />
//           ) : (
//             <Ionicons
//               name="send"
//               size={19}
//               color="#fff"
//             />
//           )}
//         </TouchableOpacity>

//       </View>
//     </KeyboardAvoidingView>
//   );
// }


// // =====================================================
// // STYLES
// // =====================================================

// const styles = StyleSheet.create({

//   container: {
//     width: "100%",
//   },

//   replyRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//   },

//   input: {
//     flex: 1,
//     minHeight: 46,
//     maxHeight: 90,
//     borderWidth: 1,
//     borderColor:
//       "rgba(255,255,255,0.55)",
//     borderRadius: 24,
//     paddingHorizontal: 18,
//     paddingVertical: 10,
//     color: "#fff",
//     fontSize: 15,
//     backgroundColor:
//       "rgba(0,0,0,0.45)",
//   },

//   sendButton: {
//     width: 46,
//     height: 46,
//     marginLeft: 7,
//     borderRadius: 23,
//     backgroundColor: "#0095F6",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   disabledButton: {
//     opacity: 0.45,
//   },

// });

import React, { useState } from "react";

import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useDispatch } from "react-redux";

import { useRouter } from "expo-router";

import { replyToStory } from "../../redux/storySlice";

export default function StoriesReply({
  storyId,
  disabled = false,
  onSent,
  onReplyFocus,
  onReplyBlur,
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    console.log("====================================");
    console.log("🚀 HANDLE SEND CALLED");
    console.log("STORY ID =>", storyId);
    console.log("REPLY VALUE =>", reply);
    console.log("====================================");

    const text = reply.trim();

    if (!text || !storyId || sending || disabled) {
      console.log("❌ SEND BLOCKED");
      return;
    }

    try {
      setSending(true);

      console.log("📤 DISPATCHING STORY REPLY");
      console.log("STORY ID =>", storyId);
      console.log("CONTENT =>", text);

      const result = await dispatch(
        replyToStory({
          storyId,
          content: text,
        })
      );

      console.log("📥 REPLY RESULT =>", result);

      if (replyToStory.fulfilled.match(result)) {
        console.log("✅ STORY REPLY SUCCESS");

        const response = result.payload;

        console.log("STORY REPLY RESPONSE =>", response);
        console.log(
          "MESSAGE ID =>",
          response?.id
        );
        console.log(
          "CONVERSATION ID =>",
          response?.conversation_id
        );
        console.log(
          "REPLY TO STORY ID =>",
          response?.reply_to_story_id
        );

        setReply("");

        if (onSent) {
          onSent(response);
        }

        // ------------------------------------
        // OPEN THE CHAT
        // ------------------------------------

        if (response?.conversation_id) {
          console.log(
            "💬 OPENING STORY OWNER CHAT =>",
            response.conversation_id
          );

          router.push({
            pathname: "/chat/[conversationId]",
            params: {
              conversationId: String(
                response.conversation_id
              ),
            },
          });
        } else {
          console.log(
            "❌ CONVERSATION ID NOT FOUND IN RESPONSE"
          );
        }
      } else {
        console.log("❌ STORY REPLY FAILED");
        console.log("ERROR =>", result.payload);
      }
    } catch (error) {
      console.log(
        "❌ STORY REPLY ERROR =>",
        error
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.replyRow}>
        <TextInput
          value={reply}
          onChangeText={setReply}
          placeholder="Reply..."
          placeholderTextColor="#aaa"
          style={styles.input}
          editable={!disabled && !sending}
          multiline
          maxLength={500}
          returnKeyType="send"
          onFocus={() => {
            if (onReplyFocus) {
              onReplyFocus();
            }
          }}
          onBlur={() => {
            if (onReplyBlur) {
              onReplyBlur();
            }
          }}
          onSubmitEditing={handleSend}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleSend}
          disabled={
            disabled ||
            sending ||
            !reply.trim()
          }
          style={[
            styles.sendButton,
            (
              disabled ||
              sending ||
              !reply.trim()
            ) && styles.disabledButton,
          ]}
        >
          {sending ? (
            <ActivityIndicator
              size="small"
              color="#fff"
            />
          ) : (
            <Ionicons
              name="send"
              size={19}
              color="#fff"
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  replyRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0095f6",
  },

  disabledButton: {
    opacity: 0.4,
  },
});