import React from "react";

import {
  ScrollView,
  StyleSheet,
} from "react-native";

import ProfileHeader from "../../src/components/profile/ProfileHeader";
import StoryHighlights from "../../src/components/profile/StoryHighlights";
import ProfileTabs from "../../src/components/profile/ProfileTabs";
import ScreenLayout from "../../src/components/ScreenLayout";

export default function Profile() {
  return (
    <ScreenLayout keyboardAvoid={false}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={
        styles.contentContainer
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      <ProfileHeader />

      <StoryHighlights />

      <ProfileTabs />
    </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor:
  //     "#080913",
  // },

  contentContainer: {
    paddingBottom: 100,
  },
});