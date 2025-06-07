import { useQueryClient } from '@tanstack/react-query';

import { FEED_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import { ILogResponse } from '@/types/api';

interface IFeedListResponse {
  pages: Array<{
    data: {
      boards: ILogResponse[];
    };
  }>;
}
export const AddLikeSuccess = (log: ILogResponse) => {
  const queryClient = useQueryClient();

  queryClient.setQueryData<IFeedListResponse>([FEED_LIST_QUERY_KEY], (oldData) => {
    if (!oldData) return oldData;
    return {
      ...oldData,
      pages: oldData.pages.map((page) => ({
        ...page,
        data: {
          ...page.data,
          boards: page.data.boards.map((board) =>
            board.id === log.id ? { ...board, like_count: (board.like_count || 0) + 1 } : board,
          ),
        },
      })),
    };
  });
};

export const RemoveLikeSuccess = (log: ILogResponse) => {
  const queryClient = useQueryClient();

  queryClient.setQueryData<IFeedListResponse>([FEED_LIST_QUERY_KEY], (oldData) => {
    if (!oldData) return oldData;
    return {
      ...oldData,
      pages: oldData.pages.map((page) => ({
        ...page,
        data: {
          ...page.data,
          boards: page.data.boards.map((board) =>
            board.id === log.id ? { ...board, like_count: (board.like_count || 0) - 1 } : board,
          ),
        },
      })),
    };
  });
};
