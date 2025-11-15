'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { getMyChatRoomsQueryOptions } from '@/hooks/queries/chat.hooks';

import ChatRoom from './chat-room';

function ChatRoomList() {
  const { data: chatRooms } = useSuspenseQuery(getMyChatRoomsQueryOptions());

  if (chatRooms.length === 0) {
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
    <div className="flex flex-col">
      {chatRooms.map((chatRoom) => (
        <ChatRoom key={chatRoom.roomId} chatRoom={chatRoom} />
      ))}
    </div>
  );
}

export default ChatRoomList;
