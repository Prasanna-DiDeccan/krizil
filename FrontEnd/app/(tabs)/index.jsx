import { View, FlatList } from "react-native";
import Header from "../../src/components/Header";
import Stories from "../../src/components/Stories";
import PostCard from "../../src/components/PostCard";
import { posts } from "../../src/data/posts";

export default function Home() {
  return (
      
    <View
      style={{
        flex: 1,
        backgroundColor: "#090913",
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      {/* <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        Welcome to Krizil ❤️
      </Text> */}
      <Header/>
      <Stories/>
      <FlatList
    data={posts}
    renderItem={({item}) => <PostCard item={item} />}
/>
    </View>
    
  );
}