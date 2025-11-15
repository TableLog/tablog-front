import { CHAT_URL } from '@/constants/endpoint.constants';
import { IChatMessage, IChatRoom } from '@/types/api/chat';
import instance from '@/utils/axios';

// TODO 전체 채팅 메시지 조회 ?? 뭔지 모르겠음
export const getChats = async () => {
  return await instance.get(`${CHAT_URL}`);
};

// 내가 참가자인 채팅방을 최근 대화 순으로 조회하고, 각 방의 마지막 메시지와 미읽음 카운트를 반환합니다.
export const getMyChatRooms = async () => {
  return await instance.get<IChatRoom[]>(`${CHAT_URL}/rooms`);
};

// 채팅방 메시지를 정렬 옵션과 함께 조회합니다
export const getChatRoomMessages = async (roomId: string) => {
  return await instance.get<IChatMessage[]>(`${CHAT_URL}/rooms/${roomId}`);
};

// 현재 로그인 사용자가 수신자 기준으로 해당 방의 미읽음 메시지 개수를 반환합니다.
export const getUnreadCount = async (roomId: string) => {
  return await instance.get(`${CHAT_URL}/rooms/${roomId}/unread/count`);
};
