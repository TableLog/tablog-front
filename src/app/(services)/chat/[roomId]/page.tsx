'use client';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { z } from 'zod';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import PageHeader from '@/components/atoms/page-header/PageHeader';
import { Text } from '@/components/atoms/text/Text';
import { CHATS_QUERY_KEY, MY_CHAT_ROOMS_QUERY_KEY } from '@/constants/query-key.constants';
import { useGetUserInfo } from '@/hooks/queries/auth.hooks';
import { useGetChats } from '@/hooks/queries/chat.hooks';
import useStomp from '@/hooks/useStomp';
import { zodChatForm } from '@/lib/zod/zodValidation';

import ChatBubble from './chat-bubble';

type TFormValues = z.infer<typeof zodChatForm>;

interface MessageType {
  id: string;
  roomId: string;
  message: string;
  sender: string;
  createdAt: string;
  profileImgUrl?: string;
}

function ChatPage() {
  const queryClient = useQueryClient();
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { data: userInfo, isPending, isError } = useGetUserInfo();
  const {
    data: savedMessages,
    isPending: isGetChatsPending,
    isError: isGetChatsError,
  } = useGetChats(roomId);

  const { isConnected, publishMessage } = useStomp({
    brokerURL: 'ws://localhost:8080/ws/websocket',
    publishDestination: '/pub/chat/send',
    subsribeDestination: `/sub/chat/room/${roomId}`,
    onMessageReceived: () => {
      queryClient.invalidateQueries({ queryKey: [CHATS_QUERY_KEY, roomId] });
      queryClient.invalidateQueries({ queryKey: [MY_CHAT_ROOMS_QUERY_KEY] });
      setMessages([]);
    },
  });

  const { register, handleSubmit, reset } = useForm<TFormValues>({
    resolver: zodResolver(zodChatForm),
    mode: 'onChange',
  });

  useEffect(() => {
    wrapperRef.current?.scrollIntoView({ block: 'end' });
  }, [savedMessages, messages]);

  if (isPending || isGetChatsPending) return <div>Loading...</div>;
  if (isError || isGetChatsError) return <div>Error...</div>;

  const totalMessages = [...savedMessages, ...messages];

  const handleSubmitForm = (data: TFormValues) => {
    const message = {
      roomId,
      message: data.message,
      sender: userInfo.nickname,
    };
    publishMessage(message);
    setMessages((prev) => [
      ...prev,
      { ...message, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
    ]);
    reset();
  };

  return (
    <div ref={wrapperRef} className="relative px-5 pb-4">
      {/* // ! TODO 상대방과 대화한 적이 없을 경우 닉네임을 어떻게 가져올지 */}
      <PageHeader title={`${savedMessages[0].nickname}님과의 대화`} back />
      <div className="flex min-h-[calc(100dvh-132px)] flex-col items-center justify-center gap-5">
        <div className="flex w-full flex-grow flex-col gap-2 pb-[66px]">
          {totalMessages.length === 0 ? (
            <div>
              <Text fontSize={14}>대화가 없습니다. 먼저 메시지를 보내보세요</Text>
            </div>
          ) : (
            totalMessages.map(({ id, message, sender, createdAt, profileImgUrl }) => (
              <ChatBubble
                key={id}
                sender={sender}
                message={message}
                createdAt={createdAt}
                isMine={sender === userInfo.nickname}
                profileImgUrl={profileImgUrl}
              />
            ))
          )}
          {!isConnected && <div className="text-center text-sm text-grey03">연결 중...</div>}
        </div>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="fixed bottom-0 left-0 w-full bg-white px-3 py-3"
        >
          <div className="relative">
            <input
              type="text"
              {...register('message')}
              className="w-full rounded-full border border-grey07 px-5 py-3 text-lg"
              placeholder="메시지 입력"
              autoFocus
              disabled={!isConnected}
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 -rotate-45">
              <BoxIcon color="grey04" name="send b" size={28} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
