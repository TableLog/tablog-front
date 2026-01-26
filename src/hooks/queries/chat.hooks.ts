import { queryOptions, useQuery } from '@tanstack/react-query';

import { getChatRoomMessages, getMyChatRooms } from '@/apis/chat.api';
import { CHATS_QUERY_KEY, MY_CHAT_ROOMS_QUERY_KEY } from '@/constants/query-key.constants';

export const getMyChatRoomsQueryOptions = () =>
  queryOptions({
    queryKey: [MY_CHAT_ROOMS_QUERY_KEY],
    queryFn: () => getMyChatRooms(),
    select: (response) => response.data,
  });

export const getChatsQueryOptions = (roomId: string) =>
  queryOptions({
    queryKey: [CHATS_QUERY_KEY, roomId],
    queryFn: () => getChatRoomMessages(roomId),
    select: (response) => response.data,
  });

export const useGetChats = (roomId: string) => {
  return useQuery(getChatsQueryOptions(roomId));
};
