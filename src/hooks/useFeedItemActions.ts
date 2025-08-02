import { useCallback, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { DELETE_FEED_MODAL } from '@/constants/modal.constants';
import { FEED_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import { useDeleteLog } from '@/hooks/feed.hooks';
import { showToast } from '@/utils/functions';

interface UseFeedItemActionsOptions {
  onDeleteSuccess?: () => void;
}

export const useFeedItemActions = (options?: UseFeedItemActionsOptions) => {
  const [logId, setLogId] = useState(-1);

  const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const queryClient = useQueryClient();

  const { mutate: deleteLog } = useDeleteLog({
    onSuccess: (res) => {
      if (res.status === 200) {
        const modal = document.getElementById(DELETE_FEED_MODAL) as HTMLDialogElement;
        modal.close();
        showToast({ message: '일기를 삭제했습니다.', type: 'success' });
        queryClient.invalidateQueries({ queryKey: [FEED_LIST_QUERY_KEY] });
        options?.onDeleteSuccess?.();
      }
    },
  });

  const handleDelete = useCallback(() => {
    if (logId) {
      deleteLog(logId);
    }
  }, [logId, deleteLog]);

  return {
    logId,
    setLogId,
    contentRefs,
    handleDelete,
  };
};
