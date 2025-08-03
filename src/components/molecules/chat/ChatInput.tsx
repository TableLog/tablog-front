'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { Text } from '@/components/atoms/text/Text';
import { FEED_COMMENT_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import { useAddComment, useAddCommentReply } from '@/hooks/feed.hooks';
import { cn } from '@/utils/cn';

interface IChatInputProps {
  logId: number;
  isReply: boolean;
  setIsReply: (isReply: boolean) => void;
}

const ChatInput = ({ logId, isReply, setIsReply }: IChatInputProps) => {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);

  const [chatValue, setChatValue] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const { mutate: addComment } = useAddComment({
    onSuccess: (res) => {
      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: [FEED_COMMENT_LIST_QUERY_KEY, logId] });
        queryClient.refetchQueries({ queryKey: [FEED_COMMENT_LIST_QUERY_KEY, logId] });

        setChatValue('');
      }
    },
  });

  const { mutate: addCommentReply } = useAddCommentReply({
    onSuccess: (res) => {
      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: [FEED_COMMENT_LIST_QUERY_KEY, logId] });
        queryClient.refetchQueries({ queryKey: [FEED_COMMENT_LIST_QUERY_KEY, logId] });
      }
    },
  });

  const initialHeight = useRef<number>(typeof window !== 'undefined' ? window.innerHeight : 0);

  useEffect(() => {
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const heightDiff = initialHeight.current - currentHeight;

      if (heightDiff > 100) {
        setIsKeyboardOpen(true);
        document.body.style.overflow = 'hidden';
      } else {
        setIsKeyboardOpen(false);
        document.body.style.overflow = '';
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
    };
  }, []);

  const positionClass = isKeyboardOpen ? 'fixed bottom-0' : 'sticky bottom-0';
  const paddingClass = isKeyboardOpen ? 'env(safe-area-inset-bottom)' : '0px';

  return (
    <div
      className={cn(positionClass, paddingClass, 'left-0 z-50 w-full bg-white01 transition-all')}
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-1 justify-between rounded-full border border-grey07 px-4 py-2">
          <input
            ref={inputRef}
            type="text"
            className="w-full"
            placeholder={isReply ? '답글 입력...' : '댓글 입력...'}
            value={chatValue}
            onChange={(e) => {
              setChatValue(e.target.value);
            }}
          />

          {isReply && (
            <div className="flex items-center gap-1">
              <Text fontSize={14} color="grey04" onClick={() => setIsReply(false)}>
                취소
              </Text>
            </div>
          )}
        </div>

        <BoxIcon
          name="navigation"
          size={24}
          onClick={() => {
            if (chatValue.trim() === '') return;

            if (isReply) {
              addCommentReply({ boardId: logId, commentId: 0, content: chatValue });
            } else {
              addComment({ id: logId, content: chatValue });
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChatInput;
