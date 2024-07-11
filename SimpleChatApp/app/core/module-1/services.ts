// core/module-1/services.ts

import { Chat } from "./actions";

const apiUrl = "https://b27c234b-e058-43da-9359-cec55caf97ad.mock.pstmn.io";

export const fetchChats = async (): Promise<Chat[]> => {
  try {
    const response = await fetch(`${apiUrl}/chats`);
    if (!response.ok) {
      throw new Error("Failed to fetch chats");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
};

export const createChatApi = async (chat: Chat): Promise<Chat | undefined> => {
  try {
    const response = await fetch(`${apiUrl}/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chat),
    });
    if (!response.ok) {
      throw new Error("Failed to create chat");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating chat:", error);
    return undefined;
  }
};

export const deleteChatApi = async (chatId: number): Promise<boolean> => {
  try {
    const response = await fetch(`${apiUrl}/chats/${chatId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete chat");
    }
    return true;
  } catch (error) {
    console.error("Error deleting chat:", error);
    return false;
  }
};
