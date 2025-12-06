export interface IChatRoom {
  roomId: string;
  lastMessage: string;
  lastCreatedAt: string;
  unreadCount: number;
  nickname: string;
  profileImgUrl: string;
}

export interface IChatMessage {
  id: 0;
  roomId: string;
  sender: string;
  message: string;
  messageType: string;
  createdAt: string;
  nickname: string;
  profileImgUrl?: string;
}
