// import React, { useState } from "react";
// import { View, FlatList, StyleSheet } from "react-native";

// import ChatHeader from "../../src/components/chat/ChatHeader";
// import ChatSearchBar from "../../src/components/chat/ChatSearchBar";
// import ChatItem from "../../src/components/chat/ChatItem";
// import { useRouter } from "expo-router";

// const router = useRouter();

// const initialChats = [
//   {
//     id: "1",
//     name: "Ananya ✨",
//     message: "Hey! How are you?",
//     time: "2m",
//     unread: 1,
//     verified: false,
//     typing: false,
//     online: true,
//     lastSeen: "",
//     status: "read", // sent | delivered | read
//     image: "https://i.pravatar.cc/150?img=5",
//   },
//   {
//     id: "2",
//     name: "Rohit Kumar",
//     message: "Sent a photo",
//     time: "10m",
//     unread: 2,
//     verified: true,
//     typing: false,
//     online: false,
//     lastSeen: "Last seen 5 min ago",
//     status: "delivered",
//     image: "https://i.pravatar.cc/150?img=12",
//   },
//   {
//     id: "3",
//     name: "Megha Official",
//     message: "",
//     time: "11m",
//     unread: 0,
//     verified: true,
//     typing: true,
//     online: true,
//     lastSeen: "",
//     status: "sent",
//     image: "https://i.pravatar.cc/150?img=32",
//   },
//   {
//     id: "4",
//     name: "Arjun",
//     message: "Let's meet tomorrow",
//     time: "45m",
//     unread: 0,
//     verified: false,
//     typing: false,
//     online: false,
//     lastSeen: "Yesterday",
//     status: "read",
//     image: "https://i.pravatar.cc/150?img=18",
//   },
// ];

// export default function Chat() {
//   const [chats, setChats] = useState(initialChats);

//   const deleteChat = (id) => {
//     setChats((prev) => prev.filter((chat) => chat.id !== id));
//   };

//   return (
//     <View style={styles.container}>
//       <ChatHeader />

//       <ChatSearchBar />

//       <FlatList
//         data={chats}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <ChatItem
//             item={item}
//             onDelete={deleteChat}
//           />
//         )}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#080913",
//   },
// });

import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import ChatHeader from "../../src/components/chat/ChatHeader";
import ChatSearchBar from "../../src/components/chat/ChatSearchBar";
import ChatItem from "../../src/components/chat/ChatItem";


const initialChats = [
  {
    id: "1",
    name: "Ananya ✨",
    message: "Hey! How are you?",
    time: "2m",
    unread: 1,
    verified: false,
    typing: false,
    online: true,
    lastSeen: "",
    status: "read",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "2",
    name: "Rohit Kumar",
    message: "Sent a photo",
    time: "10m",
    unread: 2,
    verified: true,
    typing: false,
    online: false,
    lastSeen: "Last seen 5 min ago",
    status: "delivered",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "3",
    name: "Megha Official",
    message: "",
    time: "11m",
    unread: 0,
    verified: true,
    typing: true,
    online: true,
    lastSeen: "",
    status: "sent",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: "4",
    name: "Arjun",
    message: "Let's meet tomorrow",
    time: "45m",
    unread: 0,
    verified: false,
    typing: false,
    online: false,
    lastSeen: "Yesterday",
    status: "read",
    image: "https://i.pravatar.cc/150?img=18",
  },
];

export default function Chat() {
  const router = useRouter();

  const [chats, setChats] = useState(initialChats);

  const deleteChat = (id) => {
    setChats((prev) => prev.filter((chat) => chat.id !== id));
  };

  const openChat = (item) => {
    router.push({
      pathname: "/chat/[id]",
      params: {
        id: item.id,
        name: item.name,
        image: item.image,
        online: item.online ? "true" : "false",
        verified: item.verified ? "true" : "false",
        lastSeen: item.lastSeen,
      },
    });
  };

  return (
  
    <View style={styles.container}>
      <ChatHeader />

      <ChatSearchBar />

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatItem
            item={item}
            onDelete={deleteChat}
            onPress={() => openChat(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080913",
  },
});