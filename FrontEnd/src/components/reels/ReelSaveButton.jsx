import React from "react";

import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  saveReel,
  unsaveReel,
  selectIsSavingReel,
  selectIsUnsavingReel,
} from "../../redux/reelsSlice";

// ======================================================
// COMPONENT
// ======================================================

const ReelSaveButton = ({
  reelId,
  isSaved = false,
  onSavedChange,
}) => {
  const dispatch = useDispatch();

  // ======================================================
  // LOADING
  // ======================================================

  const isSaving = useSelector(
    (state) =>
      selectIsSavingReel(
        state,
        reelId
      )
  );

  const isUnsaving = useSelector(
    (state) =>
      selectIsUnsavingReel(
        state,
        reelId
      )
  );

  const loading =
    isSaving || isUnsaving;

  // ======================================================
  // HANDLE SAVE
  // ======================================================

  const handleSave = async () => {
    if (!reelId) {
      console.log(
        "❌ SAVE: REEL ID MISSING"
      );

      return;
    }

    if (loading) {
      return;
    }

    console.log(
      "=========================================="
    );

    console.log(
      "🔖 SAVE BUTTON PRESSED"
    );

    console.log(
      "REEL ID =>",
      reelId
    );

    console.log(
      "CURRENT SAVED =>",
      isSaved
    );

    console.log(
      "=========================================="
    );

    // ==================================================
    // UNSAVE
    // ==================================================

    if (isSaved) {
      const result =
        await dispatch(
          unsaveReel(reelId)
        );

      if (
        unsaveReel.fulfilled.match(
          result
        )
      ) {
        console.log(
          "✅ UI UNSAVED =>",
          reelId
        );

        if (onSavedChange) {
          onSavedChange(
            false
          );
        }
      } else {
        console.log(
          "❌ UNSAVE FAILED"
        );
      }

      return;
    }

    // ==================================================
    // SAVE
    // ==================================================

    const result =
      await dispatch(
        saveReel(reelId)
      );

    if (
      saveReel.fulfilled.match(
        result
      )
    ) {
      console.log(
        "✅ UI SAVED =>",
        reelId
      );

      if (onSavedChange) {
        onSavedChange(
          true
        );
      }
    } else {
      console.log(
        "❌ SAVE FAILED"
      );
    }
  };

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <Pressable
      style={styles.button}
      onPress={handleSave}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color="#fff"
        />
      ) : (
        <Ionicons
          name={
            isSaved
              ? "bookmark"
              : "bookmark-outline"
          }
          size={33}
          color="#fff"
        />
      )}
    </Pressable>
  );
};

export default ReelSaveButton;

// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({
    button: {
      alignItems:
        "center",

      justifyContent:
        "center",

      width: 45,

      height: 45,
    },
  });