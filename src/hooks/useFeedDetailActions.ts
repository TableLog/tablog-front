import { useCallback, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { usePopupContext } from '@/components/molecules/popup/PopupProvider';
import { FEED_QUERY_KEY } from '@/constants/query-key.constants';
import { useDeleteLog } from '@/hooks/queries/feed.hooks';
import { showToast } from '@/utils/functions';

export const useFeedDetailActions = () => {
  const [logId, setLogId] = useState(-1);
  const [commentId, setCommentId] = useState(-1);
  const [expandedItems, setExpandedItems] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const queryClient = useQueryClient();
  const router = useRouter();
  const { closeModal } = usePopupContext();

  const { mutate: deleteLog } = useDeleteLog({
    onSuccess: (res) => {
      if (res.status === 200) {
        closeModal();
        showToast({ message: '일기를 삭제했습니다.', type: 'success' });
        queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY.LIST() });
        router.push('/feed');
      }
    },
  });

  const toggleExpand = useCallback(() => {
    setExpandedItems((prev) => !prev);
  }, []);

  const handleDelete = useCallback(() => {
    if (logId) {
      deleteLog(logId);
    }
  }, [logId, deleteLog]);

  return {
    logId,
    setLogId,
    commentId,
    setCommentId,
    expandedItems,
    showMoreButton,
    setShowMoreButton,
    contentRefs,
    toggleExpand,
    handleDelete,
  };
};
