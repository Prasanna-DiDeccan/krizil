// // import React from "react";
// // import { View, Text, StyleSheet } from "react-native";

// // export default function ChatMessageBubble({
// //   message,
// //   isMine,
// // }) {
// //   if (!message) {
// //     return null;
// //   }

// //   const isDeleted = message?.is_deleted === true;
// //   const isAutoMessage = message?.is_auto_message === true;

// //   const content = isDeleted
// //     ? "Message deleted"
// //     : message?.content || "";

// //   const edited =
// //     !!message?.edited_at && !isDeleted;

// //   return (
// //     <View
// //       style={[
// //         styles.row,
// //         isMine ? styles.myRow : styles.theirRow,
// //       ]}
// //     >
// //       <View
// //         style={[
// //           styles.bubble,
// //           isMine
// //             ? styles.myBubble
// //             : styles.theirBubble,

// //           isDeleted && styles.deletedBubble,

// //           isAutoMessage &&
// //             !isMine &&
// //             styles.autoBubble,
// //         ]}
// //       >
// //         <Text
// //           style={[
// //             styles.messageText,
// //             isDeleted && styles.deletedText,
// //           ]}
// //         >
// //           {content}
// //         </Text>

// //         {edited ? (
// //           <Text style={styles.editedText}>
// //             edited
// //           </Text>
// //         ) : null}
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   row: {
// //     width: "100%",
// //     paddingHorizontal: 12,
// //     marginVertical: 2,
// //   },

// //   // MY MESSAGE → RIGHT
// //   myRow: {
// //     alignItems: "flex-end",
// //   },

// //   // OTHER PERSON → LEFT
// //   theirRow: {
// //     alignItems: "flex-start",
// //   },

// //   bubble: {
// //     maxWidth: "78%",
// //     paddingHorizontal: 14,
// //     paddingVertical: 9,
// //     borderRadius: 20,
// //   },

// //   // MY MESSAGE
// //   myBubble: {
// //     backgroundColor: "#3797F0",
// //     borderBottomRightRadius: 5,
// //   },

// //   // OTHER PERSON MESSAGE
// //   theirBubble: {
// //     backgroundColor: "#262626",
// //     borderBottomLeftRadius: 5,
// //   },

// //   autoBubble: {
// //     backgroundColor: "#262626",
// //   },

// //   deletedBubble: {
// //     backgroundColor: "#181818",
// //     borderWidth: 1,
// //     borderColor: "#333",
// //   },

// //   messageText: {
// //     color: "#fff",
// //     fontSize: 15,
// //     lineHeight: 20,
// //   },

// //   deletedText: {
// //     color: "#777",
// //     fontStyle: "italic",
// //   },

// //   editedText: {
// //     color: "#aaa",
// //     fontSize: 10,
// //     marginTop: 3,
// //     textAlign: "right",
// //   },
// // });

// import React, { useState } from "react";

// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   Alert,
// } from "react-native";

// import {
//   Ionicons,
// } from "@expo/vector-icons";

// export default function ChatMessageBubble({
//   message,
//   isMine,
//   onLongPress,
//   onReact, 
//   onRemoveReaction,
// }) {
//   if (!message) {
//     return null;
//   }

//   const isDeleted =
//     message?.is_deleted === true;

//   const isAutoMessage =
//     message?.is_auto_message === true;

//   const content = isDeleted
//     ? "Message deleted"
//     : message?.content || "";

//   const edited =
//     !!message?.edited_at &&
//     !isDeleted;

//     const [showReactions, setShowReactions] =
//   useState(false);

// const reactionOptions = [
//   "❤️",
//   "😂",
//   "👍",
//   "😮",
//   "😢",
//   "🙏",
// ];

//   const reactions =
//     Array.isArray(
//       message?.reactions
//     )
//       ? message.reactions
//       : [];

//   const status =
//     message?.status;

//   return (
//     <View
//       style={[
//         styles.row,
//         isMine
//           ? styles.myRow
//           : styles.theirRow,
//       ]}
//     >
//       {/* <View
//         style={[
//           styles.bubble,

//           isMine
//             ? styles.myBubble
//             : styles.theirBubble,

//           isDeleted &&
//             styles.deletedBubble,

//           isAutoMessage &&
//             !isMine &&
//             styles.autoBubble,
//         ]}
//       > */}
//       <Pressable
//   onLongPress={() => {
//     if (isMine && !isDeleted && onLongPress) {
//       onLongPress(message);
//     } else if (!isDeleted) {
//       setShowReactions((previous) => !previous);
//     }
//   }}
//   delayLongPress={500}
//   style={[
//     styles.bubble,
//     isMine
//       ? styles.myBubble
//       : styles.theirBubble,
//     isDeleted &&
//       styles.deletedBubble,
//     isAutoMessage &&
//       !isMine &&
//       styles.autoBubble,
//   ]}
// >
//   {showReactions ? (
//   <View
//     style={styles.reactionPicker}
//   >
//     {reactionOptions.map(
//       (emoji) => (
//         <Pressable
//           key={emoji}
//           style={
//             styles.reactionOption
//           }
//           onPress={() => {
//             setShowReactions(false);

//             onReact?.(
//               message,
//               emoji
//             );
//           }}
//         >
//           <Text
//             style={
//               styles.reactionOptionText
//             }
//           >
//             {emoji}
//           </Text>
//         </Pressable>
//       )
//     )}
//   </View>
// ) : null}

//         <Text
//           style={[
//             styles.messageText,
//             isDeleted &&
//               styles.deletedText,
//           ]}
//         >
//           {content}
//         </Text>

//         <View
//           style={
//             styles.metaRow
//           }
//         >
//           {edited ? (
//             <Text
//               style={
//                 styles.editedText
//               }
//             >
//               edited
//             </Text>
//           ) : null}

//           {/* {isMine &&
//           !isDeleted ? (
//             <Text
//               style={
//                 styles.statusText
//               }
//             >
//               {status ===
//               "read"
//                 ? "Seen"
//                 : status ===
//                   "delivered"
//                 ? "Delivered"
//                 : "Sent"}
//             </Text>
//           ) : null} */}
//           {isMine && !isDeleted ? (
//   <Ionicons
//     name={
//       status === "read"
//         ? "checkmark-done"
//         : status === "delivered"
//         ? "checkmark-done"
//         : "checkmark"
//     }
//     size={14}
//     color={
//       status === "read"
//         ? "#3797F0"
//         : "#aaa"
//     }
//   />
// ) : null}
//         </View>

//         {reactions.length >
//         0 ? (
//           <View
//             style={
//               styles.reactionsContainer
//             }
//           >
//             {reactions.map(
//               (
//                 reaction,
//                 index
//               ) => {
//                 const emoji =
//                   typeof reaction ===
//                   "string"
//                     ? reaction
//                     : reaction?.emoji;

//                 if (!emoji) {
//                   return null;
//                 }

//                 return (
//                   <View
//                     key={`${emoji}-${index}`}
//                     style={
//                       styles.reaction
//                     }
//                   >
//                     <Text
//                       style={
//                         styles.reactionText
//                       }
//                     >
//                       {emoji}
//                     </Text>
//                   </View>
//                 );
//               }
//             )}
//           </View>
//         ) : null}
//       </Pressable>
//     </View>
//   );
// }

// const styles =
//   StyleSheet.create({
//     row: {
//       width: "100%",
//       paddingHorizontal: 12,
//       marginVertical: 2,
//     },

//     myRow: {
//       alignItems:
//         "flex-end",
//     },

//     theirRow: {
//       alignItems:
//         "flex-start",
//     },

//     bubble: {
//       maxWidth: "78%",
//       paddingHorizontal: 14,
//       paddingVertical: 9,
//       borderRadius: 20,
//     },

//     myBubble: {
//       backgroundColor:
//         "#3797F0",
//       borderBottomRightRadius: 5,
//     },

//     theirBubble: {
//       backgroundColor:
//         "#262626",
//       borderBottomLeftRadius: 5,
//     },

//     autoBubble: {
//       backgroundColor:
//         "#262626",
//     },

//     deletedBubble: {
//       backgroundColor:
//         "#181818",
//       borderWidth: 1,
//       borderColor:
//         "#333",
//     },

//     messageText: {
//       color: "#fff",
//       fontSize: 15,
//       lineHeight: 20,
//     },

//     deletedText: {
//       color: "#777",
//       fontStyle: "italic",
//     },

//     metaRow: {
//       flexDirection:
//         "row",
//       justifyContent:
//         "flex-end",
//       alignItems:
//         "center",
//       gap: 6,
//       marginTop: 3,
//     },

//     editedText: {
//       color: "#aaa",
//       fontSize: 10,
//     },

//     statusText: {
//       color: "#d7eaff",
//       fontSize: 10,
//     },

//     reactionsContainer: {
//       flexDirection:
//         "row",
//       marginTop: 5,
//       gap: 3,
//     },

//     reaction: {
//       backgroundColor:
//         "#181818",
//       borderRadius: 12,
//       paddingHorizontal: 6,
//       paddingVertical: 2,
//     },

//     reactionText: {
//       fontSize: 14,
//     },
//   });

import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function ChatMessageBubble({
  message,
  isMine,
  onLongPress,
  onReact,
  onRemoveReaction,
}) {
  const [showReactions, setShowReactions] = useState(false);

  if (!message) {
    return null;
  }

  const isDeleted = message?.is_deleted === true;

  const isAutoMessage = message?.is_auto_message === true;

  const content = isDeleted
    ? "Message deleted"
    : message?.content || "";

  const edited = !!message?.edited_at && !isDeleted;

  const reactionOptions = [
    "❤️",
    "😂",
    "👍",
    "😮",
    "😢",
    "🙏",
  ];

  const reactions = Array.isArray(message?.reactions)
    ? message.reactions
    : [];

  const status = message?.status;

  const handleLongPress = () => {
    if (isDeleted) {
      return;
    }

    // Own message → existing Edit/Delete menu
    if (isMine && onLongPress) {
      onLongPress(message);
      return;
    }

    // Other user's message → reaction modal
    setShowReactions(true);
  };

  const handleReaction = (emoji) => {
    setShowReactions(false);

    if (onReact) {
      onReact(message, emoji);
    }
  };

  return (
    <>
      <View
        style={[
          styles.row,
          isMine ? styles.myRow : styles.theirRow,
        ]}
      >
        <Pressable
          onLongPress={handleLongPress}
          delayLongPress={500}
          style={[
            styles.bubble,
            isMine
              ? styles.myBubble
              : styles.theirBubble,
            isDeleted && styles.deletedBubble,
            isAutoMessage &&
              !isMine &&
              styles.autoBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isDeleted && styles.deletedText,
            ]}
          >
            {content}
          </Text>

          <View style={styles.metaRow}>
            {edited ? (
              <Text style={styles.editedText}>
                edited
              </Text>
            ) : null}

            {isMine && !isDeleted ? (
              <Ionicons
                name={
                  status === "read"
                    ? "checkmark-done"
                    : status === "delivered"
                    ? "checkmark-done"
                    : "checkmark"
                }
                size={14}
                color={
                  status === "read"
                    ? "#3797F0"
                    : "#aaa"
                }
              />
            ) : null}
          </View>

          {reactions.length > 0 ? (
            <View style={styles.reactionsContainer}>
              {reactions.map((reaction, index) => {
                const emoji =
                  typeof reaction === "string"
                    ? reaction
                    : reaction?.emoji;

                if (!emoji) {
                  return null;
                }

                return (
                  <View
                    key={`${emoji}-${index}`}
                    style={styles.reaction}
                  >
                    <Text style={styles.reactionText}>
                      {emoji}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : null}
        </Pressable>
      </View>

      {/* REACTION MODAL */}
      <Modal
        visible={showReactions}
        transparent
        animationType="fade"
        onRequestClose={() => setShowReactions(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowReactions(false)}
        >
          <Pressable
            style={styles.reactionModal}
            onPress={(event) => event.stopPropagation()}
          >
            <Text style={styles.reactionTitle}>
              React to message
            </Text>

            <View style={styles.reactionOptions}>
              {reactionOptions.map((emoji) => (
                <Pressable
                  key={emoji}
                  style={styles.reactionOption}
                  onPress={() => handleReaction(emoji)}
                >
                  <Text style={styles.reactionOptionText}>
                    {emoji}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Pressable
              style={styles.cancelButton}
              onPress={() => setShowReactions(false)}
            >
              <Text style={styles.cancelButtonText}>
                Cancel
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    paddingHorizontal: 12,
    marginVertical: 2,
  },

  myRow: {
    alignItems: "flex-end",
  },

  theirRow: {
    alignItems: "flex-start",
  },

  bubble: {
    maxWidth: "78%",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
  },

  myBubble: {
    backgroundColor: "#3797F0",
    borderBottomRightRadius: 5,
  },

  theirBubble: {
    backgroundColor: "#262626",
    borderBottomLeftRadius: 5,
  },

  autoBubble: {
    backgroundColor: "#262626",
  },

  deletedBubble: {
    backgroundColor: "#181818",
    borderWidth: 1,
    borderColor: "#333",
  },

  messageText: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 20,
  },

  deletedText: {
    color: "#777",
    fontStyle: "italic",
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 6,
    marginTop: 3,
  },

  editedText: {
    color: "#aaa",
    fontSize: 10,
  },

  reactionsContainer: {
    flexDirection: "row",
    marginTop: 5,
    gap: 3,
  },

  reaction: {
    backgroundColor: "#181818",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  reactionText: {
    fontSize: 14,
  },

  /* MODAL */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
  },

  reactionModal: {
    width: "88%",
    maxWidth: 380,
    backgroundColor: "#1c1c1c",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 20,
  },

  reactionTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 18,
  },

  reactionOptions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  reactionOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#292929",
    justifyContent: "center",
    alignItems: "center",
  },

  reactionOptionText: {
    fontSize: 23,
  },

  cancelButton: {
    marginTop: 18,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#292929",
    justifyContent: "center",
    alignItems: "center",
  },

  cancelButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});