import { QueryClient } from '@tanstack/react-query';

import { FEED_LIST_QUERY_KEY, FEED_QUERY_KEY } from '@/constants/query-key.constants';
import { ILogResponse } from '@/types/api';

interface IFeedListResponse {
  pages: Array<{
    data: {
      boards: ILogResponse[];
    };
  }>;
}
export const ToggleLikeSuccess = (log: ILogResponse, queryClient: QueryClient) => {
  if (!queryClient) return;

  // 현재 좋아요 상태를 반전
  const newIsLike = !log.isLike;
  const likeCountChange = newIsLike ? 1 : -1;

  // 피드 리스트 캐시 업데이트
  queryClient.setQueryData<IFeedListResponse>([FEED_LIST_QUERY_KEY], (oldData) => {
    if (!oldData) return oldData;

    return {
      ...oldData,
      pages: oldData.pages.map((page) => ({
        ...page,
        data: {
          ...page.data,
          boards: page.data.boards.map((board) =>
            board.id === log.id
              ? {
                  ...board,
                  like_count: (board.like_count || 0) + likeCountChange,
                  isLike: newIsLike,
                }
              : board,
          ),
        },
      })),
    };
  });

  // 개별 게시글 캐시 업데이트
  queryClient.setQueryData(
    [FEED_QUERY_KEY, Number(log.id)],
    (oldData: ILogResponse | { data: ILogResponse } | undefined) => {
      console.log('oldData', oldData, log.id);

      if (!oldData) return oldData;

      // oldData가 API 응답 전체 객체인 경우 data 속성에서 실제 데이터 추출
      const actualData = 'data' in oldData ? oldData.data : oldData;

      const newData = {
        ...actualData,
        like_count: (actualData.like_count || 0) + likeCountChange,
        isLike: newIsLike,
      };

      console.log('newData', newData);

      return newData;
    },
  );
};
