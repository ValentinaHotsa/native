// core/module-1/reducers.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "./actions";

export interface ChatState {
  chats: Chat[];
}

const initialState: ChatState = {
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    createChat(state, action: PayloadAction<Chat>) {
      state.chats.push(action.payload);
    },
    deleteChat(state, action: PayloadAction<number>) {
      state.chats = state.chats.filter((chat) => chat.id !== action.payload);
    },
    setChats(state, action: PayloadAction<Chat[]>) {
      state.chats = action.payload;
    },
  },
});

export const { createChat, deleteChat, setChats } = chatSlice.actions;
export default chatSlice.reducer;
