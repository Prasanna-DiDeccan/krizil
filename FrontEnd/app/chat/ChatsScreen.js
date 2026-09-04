
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Image,
  Alert,
  Pressable,
  TextInput,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useRouter,
} from "expo-router";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import ScreenLayout from "../../src/components/ScreenLayout";

import {
  getConversations,
  deleteConversation,
  selectConversations,
  selectConversationsLoading,
  selectConversationsError,
} from "../../src/redux/chatSlice";

import { Colors } from "../../src/theme/colors";

// ======================================================
// HELPERS
// ======================================================

const getUserId = (state) => {
  return (
    state?.auth?.user?.id ??
    state?.auth?.user?.user_id ??
    state?.auth?.profile?.id ??
    state?.auth?.profile?.user_id ??
    state?.auth?.userData?.id ??
    state?.auth?.userData?.user_id ??
    null
  );
};

const getCurrentUsername = (state) => {
  return (
    state?.auth?.user?.username ||
    state?.auth?.profile?.username ||
    state?.auth?.userData?.username ||
    state?.auth?.user?.full_name ||
    state?.auth?.profile?.full_name ||
    "Messages"
  );
};

const getParticipantName = (participant) => {
  if (!participant) {
    return "User";
  }

  return (
    participant?.full_name ||
    participant?.username ||
    "User"
  );
};

const getParticipantUsername = (participant) => {
  if (!participant) {
    return "";
  }

  return participant?.username || "";
};

const getInitial = (participant) => {
  const name = getParticipantName(participant);

  return (
    name
      ?.trim()
      ?.charAt(0)
      ?.toUpperCase() || "U"
  );
};

const getAvatar = (participant) => {
  return participant?.avatar_url || null;
};

const getLastMessageText = (conversation) => {
  const message = conversation?.last_message;

  if (!message) {
    return "No messages yet";
  }

  if (message?.is_deleted) {
    return "Message deleted";
  }

  if (
    message?.content !== undefined &&
    message?.content !== null
  ) {
    return String(message.content);
  }

  return "Message";
};

const formatMessageTime = (dateString) => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();

  const sameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (sameDay) {
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const yesterday = new Date(now);

  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isYesterday) {
    return "Yesterday";
  }

  return date.toLocaleDateString([], {
    day: "numeric",
    month: "short",
  });
};

// ======================================================
// AVATAR
// ======================================================

const UserAvatar = ({
  participant,
  size = 60,
}) => {
  const avatarUrl = getAvatar(participant);

  const initial = getInitial(participant);

  if (avatarUrl) {
    return (
      <Image
        source={{
          uri: avatarUrl,
        }}
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.avatarFallback,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <Text
        style={[
          styles.avatarInitial,
          {
            fontSize: size * 0.36,
          },
        ]}
      >
        {initial}
      </Text>
    </View>
  );
};

// ======================================================
// CONVERSATION ITEM
// ======================================================

const ConversationItem = ({
  conversation,
  currentUserId,
  onPress,
  onDelete,
  onLongPress,
}) => {
  const participants = Array.isArray(
    conversation?.participants
  )
    ? conversation.participants
    : [];

  const otherParticipant =
    participants.find(
      (participant) =>
        String(participant?.id) !==
        String(currentUserId)
    ) ||
    participants[0] ||
    null;

  const name = conversation?.is_group
    ? conversation?.title || "Group"
    : getParticipantName(otherParticipant);

  const username = conversation?.is_group
    ? ""
    : getParticipantUsername(
        otherParticipant
      );

  const lastMessage = getLastMessageText(
    conversation
  );

  const lastMessageTime =
    formatMessageTime(
      conversation?.last_message?.created_at
    );

  const unreadCount =
    Number(conversation?.unread_count) || 0;

  const isOnline =
    otherParticipant?.is_online === true;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={500}
      style={({ pressed }) => [
        styles.conversationItem,
        pressed &&
          styles.conversationItemPressed,
      ]}
    >
      {/* AVATAR */}
      <View style={styles.avatarContainer}>
        <UserAvatar
          participant={otherParticipant}
          size={60}
        />

        {!conversation?.is_group &&
          isOnline && (
            <View style={styles.onlineDot} />
          )}
      </View>

      {/* DETAILS */}
      <View style={styles.conversationDetails}>
        <View style={styles.nameTimeRow}>
          <Text
            style={[
              styles.name,
              unreadCount > 0 &&
                styles.unreadName,
            ]}
            numberOfLines={1}
          >
            {name}
          </Text>

          {lastMessageTime ? (
            <Text
              style={[
                styles.time,
                unreadCount > 0 &&
                  styles.unreadTime,
              ]}
            >
              {lastMessageTime}
            </Text>
          ) : null}
        </View>

        <View style={styles.messageRow}>
          <View
            style={styles.messageTextContainer}
          >
            <Text
              style={[
                styles.lastMessage,
                unreadCount > 0 &&
                  styles.unreadMessage,
              ]}
              numberOfLines={1}
            >
              {username
                ? `${username} · ${lastMessage}`
                : lastMessage}
            </Text>
          </View>

          {unreadCount > 0 ? (
            <View style={styles.unreadBadge}>
              <Text
                style={styles.unreadBadgeText}
              >
                {unreadCount > 99
                  ? "99+"
                  : unreadCount}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

// ======================================================
// MAIN SCREEN
// ======================================================

const ChatsScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // ====================================================
  // REDUX
  // ====================================================

  const conversations = useSelector(
    selectConversations
  );

  const conversationsLoading =
    useSelector(
      selectConversationsLoading
    );

  const conversationsError =
    useSelector(
      selectConversationsError
    );

  const currentUserId =
    useSelector(getUserId);

  const currentUsername =
    useSelector(getCurrentUsername);

  // ====================================================
  // LOCAL STATE
  // ====================================================

  const [refreshing, setRefreshing] =
    useState(false);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [hasMore, setHasMore] =
    useState(true);

  const [searchText, setSearchText] =
    useState("");

  const PAGE_SIZE = 30;

  // ====================================================
  // FILTERED CONVERSATIONS
  // ====================================================

  const filteredConversations =
    useMemo(() => {
      if (!Array.isArray(conversations)) {
        return [];
      }

      const search =
        searchText.trim().toLowerCase();

      if (!search) {
        return conversations;
      }

      return conversations.filter(
        (conversation) => {
          const participants =
            Array.isArray(
              conversation?.participants
            )
              ? conversation.participants
              : [];

          const otherParticipant =
            participants.find(
              (participant) =>
                String(
                  participant?.id
                ) !==
                String(currentUserId)
            ) ||
            participants[0] ||
            null;

          const name =
            conversation?.is_group
              ? conversation?.title || ""
              : getParticipantName(
                  otherParticipant
                );

          const username =
            getParticipantUsername(
              otherParticipant
            );

          const lastMessage =
            getLastMessageText(
              conversation
            );

          return (
            name
              .toLowerCase()
              .includes(search) ||
            username
              .toLowerCase()
              .includes(search) ||
            lastMessage
              .toLowerCase()
              .includes(search)
          );
        }
      );
    }, [
      conversations,
      currentUserId,
      searchText,
    ]);

  // ====================================================
  // FETCH CONVERSATIONS
  // ====================================================

  const fetchConversations =
    useCallback(
      async ({
        refresh = false,
      } = {}) => {
        try {
          if (refresh) {
            setRefreshing(true);
          }

          const result =
            await dispatch(
              getConversations({
                limit: PAGE_SIZE,
                offset: 0,
                append: false,
              })
            ).unwrap();

          console.log(
            "GET CONVERSATIONS SCREEN RESPONSE =>",
            result
          );

          /*
           * Depending on your thunk, the response
           * may be returned directly or inside data.
           */

          const data =
            result?.data || result || {};

          const items =
            Array.isArray(data?.items)
              ? data.items
              : [];

          const total =
            Number(data?.total) ||
            items.length;

          setHasMore(
            items.length < total
          );
        } catch (error) {
          console.log(
            "FETCH CONVERSATIONS ERROR =>",
            error
          );
        } finally {
          setRefreshing(false);
        }
      },
      [dispatch]
    );

  // ====================================================
  // INITIAL LOAD
  // ====================================================

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // ====================================================
  // REFRESH
  // ====================================================

  const handleRefresh =
    useCallback(async () => {
      await fetchConversations({
        refresh: true,
      });
    }, [fetchConversations]);

  // ====================================================
  // LOAD MORE
  // ====================================================

  const handleLoadMore =
    useCallback(async () => {
      if (
        loadingMore ||
        conversationsLoading ||
        !hasMore ||
        conversations.length === 0
      ) {
        return;
      }

      try {
        setLoadingMore(true);

        const offset =
          conversations.length;

        const result =
          await dispatch(
            getConversations({
              limit: PAGE_SIZE,
              offset,
              append: true,
            })
          ).unwrap();

        const data =
          result?.data || result || {};

        const items =
          Array.isArray(data?.items)
            ? data.items
            : [];

        const total =
          Number(data?.total) || 0;

        if (
          items.length < PAGE_SIZE ||
          (total > 0 &&
            offset + items.length >=
              total)
        ) {
          setHasMore(false);
        }
      } catch (error) {
        console.log(
          "LOAD MORE CONVERSATIONS ERROR =>",
          error
        );
      } finally {
        setLoadingMore(false);
      }
    }, [
      conversations,
      conversationsLoading,
      dispatch,
      hasMore,
      loadingMore,
    ]);

  // ====================================================
  // OPEN CONVERSATION
  // ====================================================

  const handleOpenConversation =
    useCallback(
      (conversation) => {
        if (!conversation?.id) {
          return;
        }

        router.push({
          pathname:
            "/chat/[conversationId]",
          params: {
            conversationId:
              String(conversation.id),
          },
        });
      },
      [router]
    );

  // ====================================================
  // DELETE CONVERSATION
  // ====================================================

  const handleDeleteConversation =
    useCallback(
      (conversation) => {
        if (!conversation?.id) {
          return;
        }

        const participants =
          Array.isArray(
            conversation?.participants
          )
            ? conversation.participants
            : [];

        const otherParticipant =
          participants.find(
            (participant) =>
              String(
                participant?.id
              ) !==
              String(currentUserId)
          ) ||
          participants[0] ||
          null;

        const name =
          conversation?.is_group
            ? conversation?.title ||
              "this group"
            : getParticipantName(
                otherParticipant
              );

        Alert.alert(
          "Delete conversation",
          `Are you sure you want to delete your conversation with ${name}?`,
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
                  await dispatch(
                    deleteConversation(
                      conversation.id
                    )
                  ).unwrap();
                } catch (error) {
                  console.log(
                    "DELETE CONVERSATION ERROR =>",
                    error
                  );

                  Alert.alert(
                    "Error",
                    typeof error ===
                      "string"
                      ? error
                      : "Failed to delete conversation"
                  );
                }
              },
            },
          ]
        );
      },
      [
        currentUserId,
        dispatch,
      ]
    );

  // ====================================================
  // SCREEN HEADER
  // ====================================================

  const header = useMemo(() => {
    return (
      <View style={styles.header}>
        <Text
          style={styles.headerUsername}
          numberOfLines={1}
        >
          {currentUsername}
        </Text>

        <TouchableOpacity
          style={styles.newChatButton}
          activeOpacity={0.7}
          onPress={() => {
            console.log(
              "NEW CHAT PRESSED"
            );

            /*
             * Connect your user-search/new-chat
             * screen here when it is ready.
             */
          }}
        >
          <Ionicons
            name="create-outline"
            size={27}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    );
  }, [currentUsername]);

  // ====================================================
  // SEARCH BAR
  // ====================================================

  const searchBar = useMemo(() => {
    return (
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={19}
            color="#8e8e8e"
          />

          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search"
            placeholderTextColor="#8e8e8e"
            style={styles.searchInput}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />

          {searchText.length > 0 ? (
            <TouchableOpacity
              onPress={() =>
                setSearchText("")
              }
              style={
                styles.clearSearchButton
              }
              activeOpacity={0.7}
            >
              <Ionicons
                name="close-circle"
                size={18}
                color="#777"
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }, [searchText]);

  // ====================================================
  // EMPTY STATE
  // ====================================================

  const emptyComponent = useMemo(() => {
    if (
      conversationsLoading &&
      conversations.length === 0
    ) {
      return (
        <View
          style={styles.emptyContainer}
        >
          <ActivityIndicator
            size="large"
            color="#fff"
          />

          <Text
            style={styles.loadingText}
          >
            Loading messages...
          </Text>
        </View>
      );
    }

    if (conversationsError) {
      return (
        <View
          style={styles.emptyContainer}
        >
          <Ionicons
            name="alert-circle-outline"
            size={46}
            color="#777"
          />

          <Text
            style={styles.emptyTitle}
          >
            Couldn't load messages
          </Text>

          <Text
            style={styles.emptyDescription}
          >
            {String(conversationsError)}
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={() =>
              fetchConversations()
            }
            activeOpacity={0.8}
          >
            <Text
              style={styles.retryText}
            >
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (
      searchText.trim() &&
      filteredConversations.length === 0
    ) {
      return (
        <View
          style={styles.emptyContainer}
        >
          <Ionicons
            name="search-outline"
            size={44}
            color="#666"
          />

          <Text
            style={styles.emptyTitle}
          >
            No results
          </Text>

          <Text
            style={styles.emptyDescription}
          >
            No conversations found for "
            {searchText.trim()}"
          </Text>
        </View>
      );
    }

    return (
      <View
        style={styles.emptyContainer}
      >
        <View style={styles.emptyIcon}>
          <Ionicons
            name="chatbubble-outline"
            size={38}
            color="#fff"
          />
        </View>

        <Text
          style={styles.emptyTitle}
        >
          Your messages
        </Text>

        <Text
          style={styles.emptyDescription}
        >
          When you start a conversation,
          you'll see your messages here.
        </Text>
      </View>
    );
  }, [
    conversations.length,
    conversationsError,
    conversationsLoading,
    fetchConversations,
    filteredConversations.length,
    searchText,
  ]);

  // ====================================================
  // RENDER ITEM
  // ====================================================

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <ConversationItem
          conversation={item}
          currentUserId={
            currentUserId
          }
          onPress={() =>
            handleOpenConversation(
              item
            )
          }
          onLongPress={() =>
            handleDeleteConversation(
              item
            )
          }
        />
      );
    },
    [
      currentUserId,
      handleDeleteConversation,
      handleOpenConversation,
    ]
  );

  // ====================================================
  // KEY
  // ====================================================

  const keyExtractor =
    useCallback(
      (item, index) => {
        return item?.id != null
          ? String(item.id)
          : `conversation-${index}`;
      },
      []
    );

  // ====================================================
  // FOOTER
  // ====================================================

  const renderFooter =
    useCallback(() => {
      if (!loadingMore) {
        return null;
      }

      return (
        <View
          style={styles.footerLoader}
        >
          <ActivityIndicator
            size="small"
            color="#777"
          />
        </View>
      );
    }, [loadingMore]);

  // ====================================================
  // MAIN
  // ====================================================

  return (
    <ScreenLayout
      backgroundColor={
        Colors.bgDefault || "#000"
      }
      header={header}
      scroll={false}
      keyboardAvoid={false}
      edges={["top", "bottom"]}
    >
      <View style={styles.content}>
        {/* SEARCH */}
        {searchBar}

        {/* MESSAGES TITLE */}
        <View style={styles.messagesHeader}>
          <Text style={styles.messagesTitle}>
            Messages
          </Text>
        </View>

        {/* CONVERSATIONS */}
        <FlatList
          data={filteredConversations}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={
            emptyComponent
          }
          ListFooterComponent={
            renderFooter
          }
          showsVerticalScrollIndicator={
            false
          }
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#fff"
              colors={["#fff"]}
            />
          }
          onEndReached={
            handleLoadMore
          }
          onEndReachedThreshold={0.5}
          contentContainerStyle={[
            styles.listContent,
            filteredConversations.length ===
              0 &&
              styles.emptyListContent,
          ]}
        />
      </View>
    </ScreenLayout>
  );
};

// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#000",
  },

  // ====================================================
  // HEADER
  // ====================================================

  header: {
    width: "100%",
    minHeight: 58,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000",
  },

  headerUsername: {
    flex: 1,
    color: "#fff",
    fontSize: 23,
    fontWeight: "700",
    marginRight: 12,
  },

  newChatButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  // ====================================================
  // SEARCH
  // ====================================================

  searchWrapper: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },

  searchContainer: {
    width: "100%",
    minHeight: 38,
    borderRadius: 10,
    backgroundColor: "#1f1f1f",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
  },

  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    marginLeft: 8,
    paddingVertical: 8,
  },

  clearSearchButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  // ====================================================
  // MESSAGES TITLE
  // ====================================================

  messagesHeader: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },

  messagesTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  // ====================================================
  // LIST
  // ====================================================

  listContent: {
    paddingBottom: 25,
  },

  emptyListContent: {
    flexGrow: 1,
  },

  // ====================================================
  // CONVERSATION ITEM
  // ====================================================

  conversationItem: {
    width: "100%",
    minHeight: 78,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
  },

  conversationItemPressed: {
    backgroundColor: "#111",
  },

  avatarContainer: {
    width: 62,
    height: 62,
    marginRight: 12,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    backgroundColor: "#1c1c1c",
  },

  avatarFallback: {
    backgroundColor: "#252525",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarInitial: {
    color: "#fff",
    fontWeight: "600",
  },

  onlineDot: {
    position: "absolute",
    right: 0,
    bottom: 1,
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: "#00c853",
    borderWidth: 2,
    borderColor: "#000",
  },

  conversationDetails: {
    flex: 1,
    minWidth: 0,
  },

  nameTimeRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  name: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    marginRight: 8,
  },

  unreadName: {
    fontWeight: "700",
  },

  time: {
    color: "#777",
    fontSize: 12,
  },

  unreadTime: {
    color: "#fff",
    fontWeight: "600",
  },

  messageRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },

  messageTextContainer: {
    flex: 1,
    minWidth: 0,
  },

  lastMessage: {
    color: "#8e8e8e",
    fontSize: 13,
  },

  unreadMessage: {
    color: "#fff",
    fontWeight: "600",
  },

  unreadBadge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  unreadBadgeText: {
    color: "#000",
    fontSize: 10,
    fontWeight: "700",
  },

  // ====================================================
  // EMPTY
  // ====================================================

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    minHeight: 350,
  },

  emptyIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  emptyTitle: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },

  emptyDescription: {
    color: "#777",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },

  loadingText: {
    color: "#777",
    fontSize: 14,
    marginTop: 12,
  },

  retryButton: {
    marginTop: 18,
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },

  retryText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },

  footerLoader: {
    paddingVertical: 18,
    alignItems: "center",
  },
});

export default ChatsScreen;
