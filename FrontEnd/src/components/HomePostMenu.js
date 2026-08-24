import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  deletePost,
  savePost,
  unsavePost,
} from "../redux/postSlice";

const HomePostMenu = forwardRef(
  function HomePostMenu(_, ref) {
    const dispatch = useDispatch();

    // =================================================
    // PROFILE
    // =================================================

    const profile = useSelector(
      (state) =>
        state.profile?.profile ||
        state.profile?.user ||
        state.auth?.profile ||
        state.auth?.user ||
        state.user?.profile ||
        state.user?.user ||
        null
    );

    // =================================================
    // CURRENT USER
    // =================================================

    const currentUserId =
      profile?.id ??
      profile?.user_id ??
      profile?.user?.id ??
      null;

    // =================================================
    // STATE
    // =================================================

    const [
      visible,
      setVisible,
    ] = useState(false);

    const [
      selectedPost,
      setSelectedPost,
    ] = useState(null);

    // =================================================
    // OPEN
    // =================================================

    const open = useCallback(
      (post) => {
        if (!post?.id) {
          return;
        }

        console.log(
          "📂 POST MENU OPEN =>",
          post.id
        );

        setSelectedPost(post);
        setVisible(true);
      },
      []
    );

    // =================================================
    // EXPOSE OPEN TO HOME
    // =================================================

    useImperativeHandle(
      ref,
      () => ({
        open,
      }),
      [open]
    );

    // =================================================
    // CLOSE
    // =================================================

    const close = useCallback(() => {
      setVisible(false);
      setSelectedPost(null);
    }, []);

    // =================================================
    // CHECK OWNERSHIP
    // =================================================

    const isMyPost = useMemo(() => {
      if (
        !selectedPost ||
        !currentUserId
      ) {
        return false;
      }

      const authorId =
        selectedPost?.author?.id ??
        selectedPost?.author?.user_id ??
        selectedPost?.user_id ??
        selectedPost?.owner_id;

      console.log(
        "POST OWNER =>",
        authorId,
        "CURRENT USER =>",
        currentUserId
      );

      return (
        String(authorId) ===
        String(currentUserId)
      );
    }, [
      selectedPost,
      currentUserId,
    ]);

    // =================================================
    // SAVE / UNSAVE
    // =================================================

    const handleSaveToggle =
      useCallback(async () => {
        if (!selectedPost?.id) {
          return;
        }

        const isSaved =
          !!selectedPost.is_saved;

        try {
          console.log(
            isSaved
              ? "🔖 UNSAVE POST =>"
              : "🔖 SAVE POST =>",
            selectedPost.id
          );

          if (isSaved) {
            await dispatch(
              unsavePost(
                selectedPost.id
              )
            ).unwrap();
          } else {
            await dispatch(
              savePost(
                selectedPost.id
              )
            ).unwrap();
          }

          close();
        } catch (error) {
          console.log(
            "❌ SAVE / UNSAVE ERROR =>",
            error
          );

          Alert.alert(
            "Error",
            isSaved
              ? "Unable to unsave the post."
              : "Unable to save the post."
          );
        }
      }, [
        dispatch,
        selectedPost,
        close,
      ]);

    // =================================================
    // DELETE
    // =================================================

    const handleDelete =
      useCallback(() => {
        if (!selectedPost?.id) {
          return;
        }

        const postId =
          Number(selectedPost.id);

        if (
          !Number.isInteger(postId)
        ) {
          Alert.alert(
            "Error",
            "Invalid post ID."
          );

          return;
        }

        close();

        Alert.alert(
          "Delete post?",
          "Are you sure you want to delete this post?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },

            {
              text: "Delete",
              style: "destructive",

              onPress: async () => {
                try {
                  if (!currentUserId) {
                    Alert.alert(
                      "Error",
                      "Unable to identify the current user."
                    );

                    return;
                  }

                  console.log(
                    "🗑️ DELETE POST =>",
                    postId
                  );

                  await dispatch(
                    deletePost({
                      postId,
                      userId:
                        currentUserId,
                    })
                  ).unwrap();

                  console.log(
                    "✅ POST DELETED =>",
                    postId
                  );
                } catch (error) {
                  console.log(
                    "❌ DELETE POST ERROR =>",
                    error
                  );

                  Alert.alert(
                    "Error",
                    "Unable to delete the post."
                  );
                }
              },
            },
          ]
        );
      }, [
        selectedPost,
        currentUserId,
        dispatch,
        close,
      ]);

    // =================================================
    // RENDER
    // =================================================

    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={close}
      >
        <Pressable
          style={
            styles.modalOverlay
          }
          onPress={close}
        >
          <Pressable
            style={
              styles.bottomSheet
            }
            onPress={() => {}}
          >
            {/* HANDLE */}

            <View
              style={styles.handle}
            />

            {/* SAVE / UNSAVE */}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={
                handleSaveToggle
              }
              activeOpacity={0.7}
            >
              <Ionicons
                name={
                  selectedPost?.is_saved
                    ? "bookmark"
                    : "bookmark-outline"
                }
                size={25}
                color="#fff"
              />

              <Text
                style={
                  styles.menuText
                }
              >
                {selectedPost?.is_saved
                  ? "Unsave"
                  : "Save"}
              </Text>
            </TouchableOpacity>

            {/* DELETE */}

            {isMyPost && (
              <TouchableOpacity
                style={
                  styles.menuItem
                }
                onPress={
                  handleDelete
                }
                activeOpacity={0.7}
              >
                <Ionicons
                  name="trash-outline"
                  size={25}
                  color="#ff3040"
                />

                <Text
                  style={[
                    styles.menuText,
                    styles.deleteText,
                  ]}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            )}
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

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor:
      "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
  },

  bottomSheet: {
    backgroundColor: "#1B1E23",

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

    backgroundColor: "#85878C",

    alignSelf: "center",

    marginBottom: 12,
  },

  menuItem: {
    height: 58,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 8,
  },

  menuText: {
    color: "#fff",

    fontSize: 16,

    marginLeft: 18,

    fontWeight: "500",
  },

  deleteText: {
    color: "#ff3040",
  },
});