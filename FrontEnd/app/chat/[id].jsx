import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

const initialMessages = [
  {
    id: "1",
    type: "received",
    text: "Hey! How are you?",
    time: "10:30 AM",
  },
  {
    id: "2",
    type: "sent",
    text: "I'm good! What about you?",
    time: "10:31 AM",
  },
  {
    id: "3",
    type: "received",
    text: "I'm great! Just working on some new ideas 😊",
    time: "10:32 AM",
  },
  {
    id: "4",
    type: "sent",
    text: "That's awesome! Can't wait to see it 🔥",
    time: "10:33 AM",
  },
  {
    id: "5",
    type: "received",
    text: "Sure! Will share soon 💜",
    time: "10:34 AM",
  },
];

export default function ChatScreen() {
  const router = useRouter();

  const { name, image, online } = useLocalSearchParams();

  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      type: "sent",
      time: "Now",
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageRow,
        item.type === "sent"
          ? styles.right
          : styles.left,
      ]}
    >
      <View
        style={[
          styles.bubble,
          item.type === "sent"
            ? styles.sentBubble
            : styles.receivedBubble,
        ]}
      >
        <Text style={styles.messageText}>
          {item.text}
        </Text>

        <Text style={styles.time}>
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>

        <Image
          source={{ uri: image }}
          style={styles.avatar}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>
            {name}
          </Text>

          <Text style={styles.status}>
            {online === "true"
              ? "Online"
              : "Offline"}
          </Text>
        </View>

        <Ionicons
          name="call"
          size={24}
          color="#fff"
          style={styles.icon}
        />

        <Ionicons
          name="videocam"
          size={26}
          color="#fff"
        />
      </View>

      {/* Messages */}

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 18,
        }}
      />

      {/* Input */}

      <View style={styles.bottom}>
        <TextInput
          placeholder="Type a message..."
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />

        <TouchableOpacity>
          <Ionicons
            name="camera-outline"
            color="#fff"
            size={24}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons
            name="mic-outline"
            color="#fff"
            size={24}
            style={{ marginHorizontal: 12 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={sendMessage}
        >
          <Ionicons
            name="send"
            size={24}
            color="#8B5CF6"
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080913",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 55,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#222",
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginHorizontal: 12,
  },

  name: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
  },

  status: {
    color: "#9C9CA5",
    marginTop: 2,
  },

  icon: {
    marginRight: 18,
  },

  messageRow: {
    marginVertical: 6,
    flexDirection: "row",
  },

  left: {
    justifyContent: "flex-start",
  },

  right: {
    justifyContent: "flex-end",
  },

  bubble: {
    maxWidth: "75%",
    borderRadius: 18,
    padding: 14,
  },

  sentBubble: {
    backgroundColor: "#8B5CF6",
    alignSelf: "flex-end",
  },

  receivedBubble: {
    backgroundColor: "#1A1B28",
  },

  messageText: {
    color: "#fff",
    fontSize: 15,
  },

  time: {
    color: "#BBBBBB",
    fontSize: 11,
    marginTop: 6,
    alignSelf: "flex-end",
  },

  bottom: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#222",
    backgroundColor: "#11121C",
  },

  input: {
    flex: 1,
    backgroundColor: "#1A1B28",
    color: "#fff",
    borderRadius: 30,
    paddingHorizontal: 18,
    height: 48,
    marginRight: 10,
  },
});