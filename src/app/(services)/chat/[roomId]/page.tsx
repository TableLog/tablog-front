'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { z } from 'zod';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { useGetUserInfo } from '@/hooks/auth.hooks';
import useStomp from '@/hooks/useStomp';
import { zodChatForm } from '@/lib/zod/zodValidation';
import { cn } from '@/utils/cn';

type TFormValues = z.infer<typeof zodChatForm>;

interface MessageType {
  roomId: string;
  message: string;
  sender: string;
}

function ChatPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<MessageType[]>([
    // TODO: 임시 데이터
    { roomId, message: '안녕하세요!', sender: 'test@test.com' },
  ]);

  const { data: userInfo, isPending, isError } = useGetUserInfo();
  const { isConnected, publishMessage } = useStomp({
    brokerURL: 'ws://localhost:8080/ws/websocket',
    publishDestination: '/pub/chat/send',
    subsribeDestination: `/sub/chat/room/${roomId}`,
    onMessageReceived: (message: string) => setMessages((prev) => [...prev, JSON.parse(message)]),
  });

  const { register, handleSubmit, reset } = useForm<TFormValues>({
    resolver: zodResolver(zodChatForm),
    mode: 'onChange',
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const handleSubmitForm = (data: TFormValues) => {
    publishMessage<MessageType>({
      roomId,
      message: data.message,
      sender: userInfo.email,
    });
    reset();
  };

  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center px-6 py-6">
      <div className="flex w-full flex-grow flex-col gap-2">
        {messages.map(({ message, sender }, idx) => (
          <div
            key={`message-${idx}`}
            className={cn(sender === userInfo.email ? 'self-end' : 'self-start')}
          >
            <span
              className={cn(
                'mb-1 ml-2 text-sm text-grey03',
                sender === userInfo.email ? 'hidden' : 'block',
              )}
            >
              {sender}
            </span>
            <div
              className={cn(
                'rounded-full border border-grey07 px-4 py-3 text-lg leading-none',
                sender === userInfo.email ? 'bg-primary04' : 'bg-grey08',
              )}
            >
              {message}
            </div>
          </div>
        ))}
        {!isConnected && <div className="text-center text-sm text-grey03">연결 중...</div>}
      </div>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="w-full">
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
  );
}

export default ChatPage;
