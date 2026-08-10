import { ScrollView, StyleSheet } from "react-native";
import ProfileHeader from "../../src/components/profile/ProfileHeader";
import ProfileTabs from "../../src/components/profile/ProfileTabs";
import PostsGrid from "../../src/components/profile/PostsGrid";
import StoryHighlights from "../../src/components/profile/StoryHighlights";

export default function Profile() {
   console.log("PROFILE SCREEN RENDERED");
  return (
    
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader />
      <StoryHighlights/>
      <ProfileTabs />
      <PostsGrid />
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080913",
  },
});