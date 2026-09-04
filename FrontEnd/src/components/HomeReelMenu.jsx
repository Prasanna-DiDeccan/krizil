import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useEffect,
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

import { useDispatch } from "react-redux";

import {
  deleteReel,
} from "../redux/reelsSlice";

// ======================================================
// HOME REEL MENU
// ======================================================

const HomeReelMenu = forwardRef(
  function HomeReelMenu(
    {
      onDeleted,
    },
    ref
  ) {
    const dispatch = useDispatch();

    // ==================================================
    // STATE
    // ==================================================

    const [
      visible,
      setVisible,
    ] = useState(false);

    const [
      selectedReel,
      setSelectedReel,
    ] = useState(null);

    const [
      deleting,
      setDeleting,
    ] = useState(false);

    // ==================================================
    // OPEN
    // ==================================================

    const open = useCallback(
      (reel) => {
        if (!reel?.id) {
          console.log(
            "❌ REEL MENU OPEN - ID MISSING"
          );

          return;
        }

        console.log(
          "📂 REEL MENU OPEN =>",
          reel.id
        );

        setSelectedReel(reel);
        setDeleting(false);
        setVisible(true);
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
    }, [visible]);

    // ==================================================
    // CLOSE
    // ==================================================

    const close = useCallback(() => {
      if (deleting) {
        return;
      }

      setVisible(false);
      setSelectedReel(null);
    }, [deleting]);

    // ==================================================
    // DELETE
    // ==================================================

    const handleDelete =
      useCallback(() => {
        if (deleting) {
          return;
        }

        if (!selectedReel?.id) {
          Alert.alert(
            "Error",
            "Invalid reel ID."
          );

          return;
        }

        const numericReelId =
          Number(
            selectedReel.id
          );

        if (
          !Number.isInteger(
            numericReelId
          ) ||
          numericReelId <= 0
        ) {
          Alert.alert(
            "Error",
            "Invalid reel ID."
          );

          return;
        }

        console.log(
          "🗑️ DELETE BUTTON PRESSED =>",
          numericReelId
        );

        Alert.alert(
          "Delete Reel",
          "Are you sure you want to delete this reel?",
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
                  setDeleting(
                    true
                  );

                  console.log(
                    "===================================="
                  );

                  console.log(
                    "🗑️ HOME REEL DELETE START"
                  );

                  console.log(
                    "REEL ID =>",
                    numericReelId
                  );

                  console.log(
                    "DISPATCH deleteReel()"
                  );

                  // =================================
                  // DELETE API
                  // =================================

                  const result =
                    await dispatch(
                      deleteReel(
                        numericReelId
                      )
                    ).unwrap();

                  console.log(
                    "DELETE RESULT =>",
                    result
                  );

                  console.log(
                    "✅ HOME REEL DELETE SUCCESS"
                  );

                  console.log(
                    "DELETED REEL ID =>",
                    numericReelId
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

                  setSelectedReel(
                    null
                  );

                  setDeleting(
                    false
                  );

                  // =================================
                  // NOTIFY HOME
                  // =================================

                  onDeleted?.(
                    result?.reelId ??
                      result?.id ??
                      numericReelId
                  );
                } catch (error) {
                  console.log(
                    "===================================="
                  );

                  console.log(
                    "❌ HOME REEL DELETE FAILED"
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
                        "Failed to delete reel.";

                  Alert.alert(
                    "Delete Failed",
                    message
                  );
                }
              },
            },
          ]
        );
      }, [
        deleting,
        selectedReel,
        dispatch,
        onDeleted,
      ]);

    // ==================================================
    // RENDER
    // ==================================================

    return (
      <Modal
        visible={visible}
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
          onPress={close}
        >
          <Pressable
            style={
              styles.bottomSheet
            }
            onPress={(event) =>
              event.stopPropagation()
            }
          >
            {/* HANDLE */}

            <View
              style={styles.handle}
            />

            {/* TITLE */}

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
                Reel options
              </Text>
            </View>

            {/* DELETE */}

            <Pressable
              disabled={
                deleting
              }
              onPress={
                handleDelete
              }
              style={({ pressed }) => [
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

            {/* CANCEL */}

            <Pressable
              disabled={
                deleting
              }
              onPress={close}
              style={({ pressed }) => [
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

export default HomeReelMenu;

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

    flexDirection: "row",

    alignItems: "center",

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

    backgroundColor: "#292D33",

    alignItems: "center",
    justifyContent: "center",
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