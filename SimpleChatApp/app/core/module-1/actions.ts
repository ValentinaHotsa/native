// core/module-1/actions.ts

export const CREATE_CHAT = "CREATE_CHAT";
export const DELETE_CHAT = "DELETE_CHAT";
export const SET_CHATS = "SET_CHATS";

export interface Chat {
  id: number;
  title: string;
  createdBy: string;
}

export interface CreateChatAction {
  type: typeof CREATE_CHAT;
  payload: Chat;
}

export interface DeleteChatAction {
  type: typeof DELETE_CHAT;
  payload: number;
}

export interface SetChatsAction {
  type: typeof SET_CHATS;
  payload: Chat[];
}

export type ChatActionTypes =
  | CreateChatAction
  | DeleteChatAction
  | SetChatsAction;
