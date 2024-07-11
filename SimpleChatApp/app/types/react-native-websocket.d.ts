declare module "react-native-websocket" {
  import { Component } from "react";
  import { WebSocketProps } from "react-native";

  export default class WebSocket extends Component<WebSocketProps> {}

  export interface WebSocketProps {
    url: string;
    onOpen?: () => void;
    onClose?: () => void;
    onMessage?: (event: WebSocketMessageEvent) => void;
    onError?: (event: WebSocketErrorEvent) => void;
  }

  export interface WebSocketMessageEvent {
    data: string | ArrayBuffer | Blob | ArrayBufferView;
  }

  export interface WebSocketErrorEvent {
    message: string;
  }
}
