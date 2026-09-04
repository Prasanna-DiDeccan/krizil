// import React, {
//   forwardRef,
//   useCallback,
//   useImperativeHandle,
//   useEffect,
//   useState,
// } from "react";

// import {
//   Modal,
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from "react-native";

// import { useDispatch } from "react-redux";

// import { deletePost } from "../redux/postSlice";

// // ======================================================
// // HOME POST MENU
// // Same UI/behavior as HomeReelMenu
// // ======================================================

// const HomePostMenu = forwardRef(
//   function HomePostMenu(
//     {
//       onDeleted,
//     },
//     ref
//   ) {
//     const dispatch = useDispatch();

//     // ==================================================
//     // STATE
//     // ==================================================

//     const [
//       visible,
//       setVisible,
//     ] = useState(false);

//     const [
//       selectedPost,
//       setSelectedPost,
//     ] = useState(null);

//     const [
//       deleting,
//       setDeleting,
//     ] = useState(false);

//     // ==================================================
//     // OPEN
//     // ==================================================

//     const open = useCallback(
//       (post) => {
//         if (!post?.id) {
//           console.log(
//             "❌ POST MENU OPEN - ID MISSING"
//           );

//           return;
//         }

//         console.log(
//           "📂 POST MENU OPEN =>",
//           post.id
//         );

//         setSelectedPost(post);
//         setDeleting(false);
//         setVisible(true);
//       },
//       []
//     );

//     // ==================================================
//     // EXPOSE OPEN
//     // ==================================================

//     useImperativeHandle(
//       ref,
//       () => ({
//         open,
//       }),
//       [open]
//     );

//     // ==================================================
//     // RESET WHEN CLOSED
//     // ==================================================

//     useEffect(() => {
//       if (!visible) {
//         setDeleting(false);
//       }
//     }, [visible]);

//     // ==================================================
//     // CLOSE
//     // ==================================================

//     const close = useCallback(() => {
//       if (deleting) {
//         return;
//       }

//       setVisible(false);
//       setSelectedPost(null);
//     }, [deleting]);

//     // ==================================================
//     // DELETE
//     // ==================================================

//     const handleDelete = useCallback(
//       () => {
//         if (deleting) {
//           return;
//         }

//         if (!selectedPost?.id) {
//           Alert.alert(
//             "Error",
//             "Invalid post ID."
//           );

//           return;
//         }

//         const numericPostId =
//           Number(
//             selectedPost.id
//           );

//         if (
//           !Number.isInteger(
//             numericPostId
//           ) ||
//           numericPostId <= 0
//         ) {
//           Alert.alert(
//             "Error",
//             "Invalid post ID."
//           );

//           return;
//         }

//         console.log(
//           "🗑️ DELETE BUTTON PRESSED =>",
//           numericPostId
//         );

//         Alert.alert(
//           "Delete Post",
//           "Are you sure you want to delete this post?",
//           [
//             {
//               text: "Cancel",
//               style: "cancel",
//             },

//             {
//               text: "Delete",
//               style: "destructive",

//               onPress: async () => {
//                 try {
//                   setDeleting(true);

//                   console.log(
//                     "===================================="
//                   );

//                   console.log(
//                     "🗑️ HOME POST DELETE START"
//                   );

//                   console.log(
//                     "POST ID =>",
//                     numericPostId
//                   );

//                   console.log(
//                     "DISPATCH deletePost()"
//                   );

//                   // =================================
//                   // DELETE API
//                   // =================================

//                   const result =
//                     await dispatch(
//                       deletePost({
//                         postId:
//                           numericPostId,
//                       })
//                     ).unwrap();

//                   console.log(
//                     "DELETE RESULT =>",
//                     result
//                   );

//                   console.log(
//                     "✅ HOME POST DELETE SUCCESS"
//                   );

//                   console.log(
//                     "DELETED POST ID =>",
//                     numericPostId
//                   );

//                   console.log(
//                     "===================================="
//                   );

//                   // =================================
//                   // CLOSE MENU
//                   // =================================

//                   setVisible(false);

//                   setSelectedPost(null);

//                   setDeleting(false);

//                   // =================================
//                   // NOTIFY HOME
//                   // =================================

//                   onDeleted?.(
//                     result?.postId ??
//                       result?.id ??
//                       numericPostId
//                   );
//                 } catch (error) {
//                   console.log(
//                     "===================================="
//                   );

//                   console.log(
//                     "❌ HOME POST DELETE FAILED"
//                   );

//                   console.log(
//                     "ERROR =>",
//                     error
//                   );

//                   console.log(
//                     "===================================="
//                   );

//                   setDeleting(false);

//                   const message =
//                     typeof error ===
//                     "string"
//                       ? error
//                       : error?.message ||
//                         error?.detail ||
//                         "Failed to delete post.";

//                   Alert.alert(
//                     "Delete Failed",
//                     message
//                   );
//                 }
//               },
//             },
//           ]
//         );
//       },
//       [
//         deleting,
//         selectedPost,
//         dispatch,
//         onDeleted,
//       ]
//     );

//     // ==================================================
//     // RENDER
//     // ==================================================

//     return (
//       <Modal
//         visible={visible}
//         transparent
//         animationType="slide"
//         statusBarTranslucent
//         onRequestClose={close}
//       >
//         <Pressable
//           style={
//             styles.modalOverlay
//           }
//           onPress={close}
//         >
//           <Pressable
//             style={
//               styles.bottomSheet
//             }
//             onPress={(event) =>
//               event.stopPropagation()
//             }
//           >
//             {/* ==========================================
//                 HANDLE
//             ========================================== */}

//             <View
//               style={styles.handle}
//             />

//             {/* ==========================================
//                 TITLE
//             ========================================== */}

//             <View
//               style={
//                 styles.header
//               }
//             >
//               <Text
//                 style={
//                   styles.title
//                 }
//               >
//                 Post options
//               </Text>
//             </View>

//             {/* ==========================================
//                 DELETE
//             ========================================== */}

//             <Pressable
//               disabled={
//                 deleting
//               }
//               onPress={
//                 handleDelete
//               }
//               style={({
//                 pressed,
//               }) => [
//                 styles.menuItem,

//                 pressed &&
//                   !deleting &&
//                   styles.pressed,
//               ]}
//             >
//               {deleting ? (
//                 <ActivityIndicator
//                   size="small"
//                   color="#ff3040"
//                 />
//               ) : (
//                 <Text
//                   style={
//                     styles.deleteText
//                   }
//                 >
//                   Delete
//                 </Text>
//               )}
//             </Pressable>

//             {/* ==========================================
//                 CANCEL
//             ========================================== */}

//             <Pressable
//               disabled={
//                 deleting
//               }
//               onPress={close}
//               style={({
//                 pressed,
//               }) => [
//                 styles.cancelButton,

//                 pressed &&
//                   !deleting &&
//                   styles.pressed,
//               ]}
//             >
//               <Text
//                 style={
//                   styles.cancelText
//                 }
//               >
//                 Cancel
//               </Text>
//             </Pressable>
//           </Pressable>
//         </Pressable>
//       </Modal>
//     );
//   }
// );

// export default HomePostMenu;

// // ======================================================
// // STYLES
// // Exactly same as HomeReelMenu
// // ======================================================

// const styles =
//   StyleSheet.create({

//     modalOverlay: {
//       flex: 1,

//       backgroundColor:
//         "rgba(0,0,0,0.55)",

//       justifyContent:
//         "flex-end",
//     },

//     bottomSheet: {
//       backgroundColor:
//         "#1B1E23",

//       borderTopLeftRadius: 22,
//       borderTopRightRadius: 22,

//       paddingTop: 10,
//       paddingBottom: 30,
//       paddingHorizontal: 16,
//     },

//     handle: {
//       width: 38,
//       height: 4,

//       borderRadius: 10,

//       backgroundColor:
//         "#85878C",

//       alignSelf: "center",

//       marginBottom: 12,
//     },

//     header: {
//       paddingHorizontal: 8,

//       paddingBottom: 8,
//     },

//     title: {
//       color: "#fff",

//       fontSize: 17,

//       fontWeight: "700",
//     },

//     menuItem: {
//       height: 58,

//       flexDirection: "row",

//       alignItems: "center",

//       paddingHorizontal: 8,
//     },

//     deleteText: {
//       color: "#ff3040",

//       fontSize: 16,

//       fontWeight: "600",
//     },

//     cancelButton: {
//       height: 55,

//       marginHorizontal: 0,

//       borderRadius: 12,

//       backgroundColor:
//         "#292D33",

//       alignItems: "center",

//       justifyContent: "center",
//     },

//     cancelText: {
//       color: "#fff",

//       fontSize: 16,

//       fontWeight: "600",
//     },

//     pressed: {
//       opacity: 0.6,
//     },
//   });


import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import {
  useDispatch,
} from "react-redux";

import {
  deletePost,
} from "../redux/postSlice";

import {
  getUser,
} from "../utils/storage";

// ======================================================
// HOME POST MENU
// ======================================================

const HomePostMenu = forwardRef(
  function HomePostMenu(
    {
      onDeleted,
    },
    ref
  ) {
    const dispatch =
      useDispatch();

    // ==================================================
    // STATE
    // ==================================================

    const [
      visible,
      setVisible,
    ] = useState(false);

    const [
      selectedPost,
      setSelectedPost,
    ] = useState(null);

    const [
      deleting,
      setDeleting,
    ] = useState(false);

    // ==================================================
    // OPEN
    // ==================================================

    const open =
      useCallback(
        async (post) => {
          if (!post?.id) {
            console.log(
              "❌ POST MENU OPEN - ID MISSING"
            );

            return;
          }

          try {
            // ==========================================
            // GET CURRENT USER
            // ==========================================

            const user =
              await getUser();

            const currentUserId =
              user?.id ??
              user?.user_id ??
              user?.user?.id ??
              null;

            // ==========================================
            // GET POST OWNER
            // ==========================================

            const postOwnerId =
              post?.user?.id ??
              post?.user_id ??
              post?.owner_id ??
              post?.author?.id ??
              post?.owner?.id ??
              post?.creator?.id ??
              null;

            console.log(
              "================================"
            );

            console.log(
              "POST MENU OWNERSHIP CHECK"
            );

            console.log(
              "POST ID =>",
              post?.id
            );

            console.log(
              "CURRENT USER ID =>",
              currentUserId
            );

            console.log(
              "POST OWNER ID =>",
              postOwnerId
            );

            console.log(
              "================================"
            );

            // ==========================================
            // CANNOT VERIFY
            // ==========================================

            if (
              currentUserId == null ||
              postOwnerId == null
            ) {
              console.log(
                "❌ CANNOT VERIFY POST OWNER"
              );

              return;
            }

            // ==========================================
            // NOT OWNER
            // ==========================================

            if (
              Number(currentUserId) !==
              Number(postOwnerId)
            ) {
              console.log(
                "🚫 NOT POST OWNER"
              );

              console.log(
                "🚫 MENU BLOCKED"
              );

              return;
            }

            // ==========================================
            // OWNER
            // ==========================================

            console.log(
              "✅ POST OWNER"
            );

            console.log(
              "✅ MENU OPEN"
            );

            setSelectedPost(
              post
            );

            setDeleting(
              false
            );

            setVisible(
              true
            );

          } catch (error) {
            console.log(
              "❌ POST OWNER CHECK ERROR =>",
              error
            );
          }
        },
        []
      );

    // ==================================================
    // EXPOSE OPEN
    // ==================================================

    useImperativeHandle(
      ref,
      () => ({
        open,
      }),
      [open]
    );

    // ==================================================
    // RESET WHEN CLOSED
    // ==================================================

    useEffect(() => {
      if (!visible) {
        setDeleting(false);
      }
    }, [
      visible,
    ]);

    // ==================================================
    // CLOSE
    // ==================================================

    const close =
      useCallback(
        () => {
          if (deleting) {
            return;
          }

          setVisible(
            false
          );

          setSelectedPost(
            null
          );
        },
        [
          deleting,
        ]
      );

    // ==================================================
    // DELETE
    // ==================================================

    const handleDelete =
      useCallback(
        () => {
          if (deleting) {
            return;
          }

          if (!selectedPost?.id) {
            Alert.alert(
              "Error",
              "Invalid post ID."
            );

            return;
          }

          const numericPostId =
            Number(
              selectedPost.id
            );

          if (
            !Number.isInteger(
              numericPostId
            ) ||
            numericPostId <= 0
          ) {
            Alert.alert(
              "Error",
              "Invalid post ID."
            );

            return;
          }

          console.log(
            "🗑️ DELETE BUTTON PRESSED =>",
            numericPostId
          );

          Alert.alert(
            "Delete Post",
            "Are you sure you want to delete this post?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },

              {
                text: "Delete",
                style: "destructive",

                onPress:
                  async () => {
                    try {
                      setDeleting(
                        true
                      );

                      console.log(
                        "===================================="
                      );

                      console.log(
                        "🗑️ HOME POST DELETE START"
                      );

                      console.log(
                        "POST ID =>",
                        numericPostId
                      );

                      console.log(
                        "DISPATCH deletePost()"
                      );

                      // =================================
                      // DELETE API
                      // =================================

                      const result =
                        await dispatch(
                          deletePost({
                            postId:
                              numericPostId,
                          })
                        ).unwrap();

                      console.log(
                        "DELETE RESULT =>",
                        result
                      );

                      console.log(
                        "✅ HOME POST DELETE SUCCESS"
                      );

                      console.log(
                        "DELETED POST ID =>",
                        numericPostId
                      );

                      console.log(
                        "===================================="
                      );

                      // =================================
                      // CLOSE MENU
                      // =================================

                      setVisible(
                        false
                      );

                      setSelectedPost(
                        null
                      );

                      setDeleting(
                        false
                      );

                      // =================================
                      // NOTIFY HOME
                      // =================================

                      onDeleted?.(
                        result?.postId ??
                          result?.id ??
                          numericPostId
                      );

                    } catch (error) {
                      console.log(
                        "===================================="
                      );

                      console.log(
                        "❌ HOME POST DELETE FAILED"
                      );

                      console.log(
                        "ERROR =>",
                        error
                      );

                      console.log(
                        "===================================="
                      );

                      setDeleting(
                        false
                      );

                      const message =
                        typeof error ===
                        "string"
                          ? error
                          : error?.message ||
                            error?.detail ||
                            "Failed to delete post.";

                      Alert.alert(
                        "Delete Failed",
                        message
                      );
                    }
                  },
              },
            ]
          );
        },
        [
          deleting,
          selectedPost,
          dispatch,
          onDeleted,
        ]
      );

    // ==================================================
    // RENDER
    // ==================================================

    return (
      <Modal
        visible={
          visible
        }
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={
          close
        }
      >
        <Pressable
          style={
            styles.modalOverlay
          }
          onPress={
            close
          }
        >
          <Pressable
            style={
              styles.bottomSheet
            }
            onPress={(event) =>
              event.stopPropagation()
            }
          >
            {/* ==========================================
                HANDLE
            ========================================== */}

            <View
              style={
                styles.handle
              }
            />

            {/* ==========================================
                TITLE
            ========================================== */}

            <View
              style={
                styles.header
              }
            >
              <Text
                style={
                  styles.title
                }
              >
                Post options
              </Text>
            </View>

            {/* ==========================================
                DELETE
            ========================================== */}

            <Pressable
              disabled={
                deleting
              }
              onPress={
                handleDelete
              }
              style={({
                pressed,
              }) => [
                styles.menuItem,

                pressed &&
                  !deleting &&
                  styles.pressed,
              ]}
            >
              {deleting ? (
                <ActivityIndicator
                  size="small"
                  color="#ff3040"
                />
              ) : (
                <Text
                  style={
                    styles.deleteText
                  }
                >
                  Delete
                </Text>
              )}
            </Pressable>

            {/* ==========================================
                CANCEL
            ========================================== */}

            <Pressable
              disabled={
                deleting
              }
              onPress={
                close
              }
              style={({
                pressed,
              }) => [
                styles.cancelButton,

                pressed &&
                  !deleting &&
                  styles.pressed,
              ]}
            >
              <Text
                style={
                  styles.cancelText
                }
              >
                Cancel
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    );
  }
);

export default HomePostMenu;

// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({

    modalOverlay: {
      flex: 1,

      backgroundColor:
        "rgba(0,0,0,0.55)",

      justifyContent:
        "flex-end",
    },

    bottomSheet: {
      backgroundColor:
        "#1B1E23",

      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,

      paddingTop: 10,
      paddingBottom: 30,
      paddingHorizontal: 16,
    },

    handle: {
      width: 38,
      height: 4,

      borderRadius: 10,

      backgroundColor:
        "#85878C",

      alignSelf:
        "center",

      marginBottom: 12,
    },

    header: {
      paddingHorizontal: 8,

      paddingBottom: 8,
    },

    title: {
      color: "#fff",

      fontSize: 17,

      fontWeight: "700",
    },

    menuItem: {
      height: 58,

      flexDirection:
        "row",

      alignItems:
        "center",

      paddingHorizontal: 8,
    },

    deleteText: {
      color: "#ff3040",

      fontSize: 16,

      fontWeight: "600",
    },

    cancelButton: {
      height: 55,

      marginHorizontal: 0,

      borderRadius: 12,

      backgroundColor:
        "#292D33",

      alignItems:
        "center",

      justifyContent:
        "center",
    },

    cancelText: {
      color: "#fff",

      fontSize: 16,

      fontWeight: "600",
    },

    pressed: {
      opacity: 0.6,
    },
  });