import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface MessageItemProps {
  message: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  messageText: {
    fontSize: 16,
  },
});

export default MessageItem;
