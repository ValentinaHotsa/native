import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { View, Text, Button, FlatList, TextInput } from "react-native";
import { HomeScreenNavigationProp } from "../../types/navigation";
import { RootState, AppDispatch } from "../../core/store";
import { Chat } from "../../core/module-1/actions";
import { fetchChats, deleteChatApi } from "../../core/module-1/services";
import { setChats, deleteChat } from "../../core/module-1/reducers";

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch: AppDispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chat.chats);

  useEffect(() => {
    const loadChats = async () => {
      const fetchedChats = await fetchChats();
      dispatch(setChats(fetchedChats));
    };
    loadChats();
  }, [dispatch]);

  const handleDeleteChat = async (chatId: number) => {
    const success = await deleteChatApi(chatId);
    if (success) {
      dispatch(deleteChat(chatId));
    } else {
      alert("Failed to delete chat");
    }
  };

  const renderItem = ({ item }: { item: Chat }) => (
    <View>
      <Text>{item.title}</Text>
      <Button
        title="Delete Chat"
        onPress={() => handleDeleteChat(item.id)}
        disabled={item.createdBy !== "currentUser"} // Replace with actual logic
      />
    </View>
  );

  return (
    <FlatList
      data={chats}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default HomeScreen;
