import { useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { usePopupContext } from '@/components/molecules/popup/PopupProvider';
import { FEED_QUERY_KEY } from '@/constants/query-key.constants';
import { useDeleteLog } from '@/hooks/queries/feed.hooks';
import { showToast } from '@/utils/functions';

interface UseFeedItemActionsOptions {
  onDeleteSuccess?: () => void;
}

export const useFeedItemActions = (options?: UseFeedItemActionsOptions) => {
  const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const queryClient = useQueryClient();
  const { closeModal } = usePopupContext();

  const { mutate: deleteLog } = useDeleteLog({
    onSuccess: (res) => {
      if (res.status === 200) {
        closeModal();
        showToast({ message: '일기를 삭제했습니다.', type: 'success' });
        queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY.LIST() });
        options?.onDeleteSuccess?.();
      }
    },
  });

  const handleDelete = useCallback(
    (logId: number) => {
      if (logId) {
        deleteLog(logId);
      }
    },
    [deleteLog],
  );

  return {
    contentRefs,
    handleDelete,
  };
};
