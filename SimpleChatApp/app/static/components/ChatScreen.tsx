// import MessageItem from "../../shared/components/MessageItem";
// import {
//   ChatScreenNavigationProp,
//   ChatScreenRouteProp,
// } from "../../types/navigation";
// import io from "socket.io-client";
// import { Socket } from "socket.io-client";
// import React, { useEffect, useState } from "react";
// import { View, Text, TextInput, Button, FlatList } from "react-native";

// interface Props {
//   route: ChatScreenRouteProp;
//   navigation: ChatScreenNavigationProp;
// }
// const SOCKET_SERVER_URL = "http://192.168.1.92:8080";

// const ChatScreen: React.FC<Props> = ({ route }) => {
//   const { chatName } = route.params;
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([
//     "Hello! This is a hardcoded message.",
//   ]);
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     const socketInstance = io(SOCKET_SERVER_URL);
//     setSocket(socketInstance);

//     socketInstance.on("chatMessage", (msg: string) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, []);

//   const handleSendMessage = () => {
//     if (message && socket) {
//       socket.emit("chatMessage", message);
//       setMessage("");
//     }
//   };

//   return (
//     <View>
//       <Text>Chat Screen - {chatName}</Text>
//       <FlatList
//         data={messages}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => <MessageItem message={item} />}
//       />
//       <TextInput
//         placeholder="Type a message"
//         value={message}
//         onChangeText={setMessage}
//       />
//       <Button title="Send" onPress={handleSendMessage} />
//     </View>
//   );
// };

// export default ChatScreen;

import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  ChatScreenNavigationProp,
  ChatScreenRouteProp,
} from "../../types/navigation";

interface Props {
  route: ChatScreenRouteProp;
  navigation: ChatScreenNavigationProp;
}

const ChatScreen: React.FC<Props> = ({ route, navigation }) => {
  const { chatName } = route.params;
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([
    "Hello! This is a hardcoded message.",
  ]);
  const websocketUrl =
    "wss://c0767b0b-5bf9-430d-9f2e-381196d7288a.mock.pstmn.io/send-message";

  useEffect(() => {
    const ws = new WebSocket(websocketUrl);

    ws.onopen = () => {
      console.log("WebSocket connection opened");
      ws.send(JSON.stringify({ type: "JOIN_CHAT", chatName: chatName }));
    };

    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type === "NEW_MESSAGE") {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      }
    };

    ws.onerror = (event: Event) => {
      const errorEvent = event as WebSocketErrorEvent;
      console.error("WebSocket error", errorEvent.message);
    };

    ws.onclose = (event: CloseEvent) => {
      console.log("WebSocket connection closed", event.code, event.reason);
    };

    return () => {
      ws.close();
    };
  }, [chatName, websocketUrl]);

  const handleSendMessage = () => {
    if (newMessage) {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <View>
      <Text>Chat: {chatName}</Text>
      <View>
        {messages.map((message, index) => (
          <Text key={index}>{message}</Text>
        ))}
      </View>
      <TextInput
        placeholder="Type your message..."
        value={newMessage}
        onChangeText={setNewMessage}
      />
      <Button title="Send" onPress={handleSendMessage} />
    </View>
  );
};

export default ChatScreen;
