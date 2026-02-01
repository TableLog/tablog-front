'use client';
import { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { messageCallbackType } from '@stomp/stompjs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import PageHeader from '@/components/atoms/page-header/PageHeader';
import { Text } from '@/components/atoms/text/Text';
import { useGetUserInfo } from '@/hooks/queries/auth.hooks';
import { getChatsQueryOptions } from '@/hooks/queries/chat.hooks';
import { useGetProfileInfo } from '@/hooks/queries/users.hooks';
import useStomp from '@/hooks/useStomp';
import { zodChatForm } from '@/lib/zod/zodValidation';

import ChatBubble from './chat-bubble';

type TFormValues = z.infer<typeof zodChatForm>;

function ChatPage() {
  const queryClient = useQueryClient();
  const { roomId } = useParams<{ roomId: string }>();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { data: userInfo, isPending: isGetUserPending, isError: isGetUserError } = useGetUserInfo();
  const {
    data: profileInfo,
    isPending: isGetProfileInfoPending,
    isError: isGetProfileInfoError,
  } = useGetProfileInfo(Number(roomId.split('--').find((id) => id !== userInfo?.id.toString()))); // ! 하드 코딩

  const {
    data: messages,
    isPending: isGetChatsPending,
    isError: isGetChatsError,
  } = useQuery(getChatsQueryOptions(roomId));

  const onConnect = useCallback(
    (subscribe: (destination: string, onMessageReceived: messageCallbackType) => void) => {
      subscribe(`/sub/chat/room/${roomId}`, (message) => {
        queryClient.setQueryData(getChatsQueryOptions(roomId).queryKey, (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: [
              ...oldData.data,
              {
                ...JSON.parse(message.body),
                profileImgUrl: profileInfo.profileImgUrl,
                id: uuidv4(),
              },
            ],
          };
        });
      });
    },
    [roomId, queryClient, profileInfo],
  );

  const { isConnected, publish } = useStomp({
    brokerURL: process.env.NEXT_PUBLIC_WS_URL!,
    onConnect,
    enabled: !!roomId && !isGetProfileInfoPending && !isGetProfileInfoError,
  });

  const { register, handleSubmit, reset } = useForm<TFormValues>({
    resolver: zodResolver(zodChatForm),
    mode: 'onChange',
  });

  useEffect(() => {
    wrapperRef.current?.scrollIntoView({ block: 'end' });
  }, [messages]);

  if (isGetUserPending || isGetChatsPending || isGetProfileInfoPending)
    return <div>Loading...</div>;
  if (isGetUserError || isGetChatsError || isGetProfileInfoError) return <div>Error...</div>;

  const handleSubmitForm = (data: TFormValues) => {
    const message = {
      roomId,
      message: data.message,
      sender: userInfo.nickname,
    };
    publish('/pub/chat/send', message);
    reset();
  };

  return (
    <div ref={wrapperRef} className="relative px-5 pb-4">
      <PageHeader title={`${profileInfo?.nickname}님과의 대화`} back />
      <div className="flex min-h-[calc(100dvh-132px)] flex-col items-center justify-center gap-5">
        <div className="flex w-full flex-grow flex-col gap-3 pb-[66px] pt-2">
          {messages.length === 0 ? (
            <div>
              <Text fontSize={14}>대화가 없습니다. 먼저 메시지를 보내보세요</Text>
            </div>
          ) : (
            messages.map(({ id, message, sender, createdAt, profileImgUrl }) => (
              <ChatBubble
                key={`chat-${id}`}
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
              className="w-full rounded-full border border-grey07 px-5 py-3 text-base"
              placeholder="메시지 입력"
              autoFocus
              disabled={!isConnected}
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 -rotate-45">
              <BoxIcon color="grey04" name="send b" size={24} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
