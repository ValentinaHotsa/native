import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Chat: {
    chatName: string;
  };
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export type ChatScreenRouteProp = RouteProp<RootStackParamList, "Chat">;

export type ChatScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Chat"
>;
