'use client';
import { useCallback } from 'react';
import { messageCallbackType } from '@stomp/stompjs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import LoadingScreen from '@/components/atoms/loading/LoadingScreen';
import { useGetUserInfo } from '@/hooks/queries/auth.hooks';
import { getMyChatRoomsQueryOptions } from '@/hooks/queries/chat.hooks';
import useStomp from '@/hooks/useStomp';

import ChatRoom from './chat-room';

function ChatRoomList() {
  const { data: user } = useGetUserInfo();
  const { data: chatRooms, isPending, isError } = useQuery(getMyChatRoomsQueryOptions());
  const queryClient = useQueryClient();

  const onConnect = useCallback(
    (subscribe: (destination: string, onMessageReceived: messageCallbackType) => void) => {
      subscribe(`/sub/chat/rooms/${user?.id}`, (message) => {
        queryClient.setQueryData(getMyChatRoomsQueryOptions().queryKey, (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: JSON.parse(message.body),
          };
        });
      });
    },
    [user?.id, queryClient],
  );

  const { isConnected } = useStomp({
    brokerURL: process.env.NEXT_PUBLIC_WS_URL!,
    onConnect,
    enabled: !!user,
  });

  if (isPending) return <LoadingScreen />;
  if (isError) return <div>채팅방 목록을 불러오는 중에 오류가 발생했습니다</div>;

  if (chatRooms?.length === 0) {
    return (
      <div className="mt-4 flex flex-col gap-1 text-center">
        <div>채팅방이 존재하지 않습니다</div>
        <Link href={'/recipe'} className="text-primary underline">
          레시피 보러가기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100dvh-132px)] flex-col">
      {!isConnected && <div className="text-center text-sm text-grey03">연결 중...</div>}
      {chatRooms.map((chatRoom) => (
        <ChatRoom key={chatRoom.roomId} chatRoom={chatRoom} />
      ))}
    </div>
  );
}

export default ChatRoomList;
