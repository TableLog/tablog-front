'use client';

import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { Text } from '@/components/atoms/text/Text';
import { FEED_QUERY_KEY } from '@/constants/query-key.constants';
import { useAddComment, useAddCommentReply } from '@/hooks/queries/feed.hooks';
import { cn } from '@/utils/cn';

interface IChatInputProps {
  className?: string;
  logId: number;
  isReply?: boolean;
  onCancelReply?: () => void;
  onAddReplySuccess?: () => void;
  commentId: number;
}

const ChatInput = ({
  className = '',
  logId,
  isReply = false,
  onCancelReply,
  onAddReplySuccess,
  commentId,
}: IChatInputProps) => {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);

  const [chatValue, setChatValue] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const { mutate: addComment } = useAddComment({
    onSuccess: (res) => {
      if (res.status === 201) {
        queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY.DETAIL(logId) });
        queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY.COMMENT_LIST(logId) });

        setChatValue('');
      }
    },
  });

  const { mutate: addCommentReply } = useAddCommentReply({
    onSuccess: (res) => {
      if (res.status === 201) {
        queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY.DETAIL(logId) });
        queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY.COMMENT_LIST(logId) });
        queryClient.invalidateQueries({
          queryKey: FEED_QUERY_KEY.COMMENT_REPLY_LIST(logId, commentId),
        });

        setChatValue('');
        onCancelReply?.();
        onAddReplySuccess?.();
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
      className={cn(
        positionClass,
        paddingClass,
        'left-0 z-50 w-full bg-white01 transition-all',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-1 justify-between rounded-full border border-grey07 px-4 py-2">
          <input
            ref={inputRef}
            type="text"
            className="w-full text-sm"
            placeholder={isReply ? '답글 입력...' : '댓글 입력...'}
            value={chatValue}
            onChange={(e) => {
              setChatValue(e.target.value);
            }}
          />

          {isReply && (
            <button type="button" className="flex items-center gap-1" onClick={onCancelReply}>
              <Text fontSize={12} color="grey04" fontWeight="medium">
                취소
              </Text>
            </button>
          )}
        </div>

        <BoxIcon
          name="navigation"
          size={24}
          color="grey03"
          onClick={() => {
            if (chatValue.trim() === '') return;

            if (isReply) {
              addCommentReply({ logId, commentId: commentId, content: chatValue });
            } else {
              addComment({ logId, content: chatValue });
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChatInput;
