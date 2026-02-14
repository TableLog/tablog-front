import { queryOptions, useQuery } from '@tanstack/react-query';

import { getChatRoomMessages, getMyChatRooms } from '@/apis/chat.api';
import { CHAT_QUERY_KEY } from '@/constants/query-key.constants';

export const getMyChatRoomsQueryOptions = () =>
  queryOptions({
    queryKey: CHAT_QUERY_KEY.MY_CHAT_ROOM_LIST(),
    queryFn: () => getMyChatRooms(),
    select: (response) => response.data,
    staleTime: 0,
  });

export const getChatsQueryOptions = (roomId: string) =>
  queryOptions({
    queryKey: CHAT_QUERY_KEY.MESSAGE_LIST(roomId),
    queryFn: () => getChatRoomMessages(roomId),
    select: (response) => response.data,
    staleTime: 0,
  });

export const useGetChats = (roomId: string) => {
  return useQuery(getChatsQueryOptions(roomId));
};
