'use client';
import React, { SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '@/components/atoms/button/Button';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';
import MoreOptions from '@/components/atoms/more-options/MoreOptions';
import ProfileImage from '@/components/atoms/profile-image/ProfileImage';
import FeedSlider from '@/components/atoms/slider/FeedSlider';
import { Text } from '@/components/atoms/text/Text';
import Popup from '@/components/molecules/popup/Popup';
import { DELETE_FEED_MODAL } from '@/constants/modal.constants';
import { FEED_MY_OPTIONS, FEED_OPTIONS } from '@/constants/options.constants';
import { FEED_LIST_QUERY_KEY } from '@/constants/query-key.constants';
import { useGetUserInfo } from '@/hooks/auth.hooks';
import { useAddLike, useDeleteLog, useGetLogList } from '@/hooks/feed.hooks';
import { useScrollPosition } from '@/hooks/function.hooks';
import { ILogResponse } from '@/types/api';
import { cn } from '@/utils/cn';
import { convertDateFormat, HandleOpenModal, showToast } from '@/utils/functions';

interface IFeedItemProps {
  log: ILogResponse;
  showMore: boolean;
  isMyPost: boolean;
  isExpanded: boolean;
  toggleExpand: (id: number) => void;
  setLogId: React.Dispatch<SetStateAction<number>>;
  contentRefs: React.RefObject<Record<number, HTMLDivElement | null>>;
}
export const FeedItem = ({
  log,
  showMore,
  isMyPost,
  isExpanded,
  toggleExpand,
  contentRefs,
  setLogId,
}: IFeedItemProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: addLike } = useAddLike({
    onSuccess: (res) => {
      if (res.status === 200) {
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
                    ? { ...board, like_count: (board.like_count || 0) + 1 }
                    : board,
                ),
              },
            })),
          };
        });
      }
    },
  });

  const deleteMyFeed = useCallback(
    (type: string) => {
      if (type === '삭제하기') {
        HandleOpenModal(DELETE_FEED_MODAL);
        setLogId(Number(log.id));
      }

      if (type === '수정하기') {
        router.push(`/feed/edit-log/${log.id}`);
      }
    },
    [log.id, router, setLogId],
  );

  const clampClass = isExpanded ? '' : 'line-clamp-2';

  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <div className="mb-1.5 flex gap-1.5">
          <ProfileImage src={log?.profileImgUrl} size={42} />

          <div className="flex flex-col justify-center">
            <Text fontSize={14}>{log.user}</Text>

            <Text fontSize={14} color="grey04">
              {convertDateFormat(log.createdAt)}
            </Text>
          </div>
        </div>

        <MoreOptions
          options={isMyPost ? FEED_MY_OPTIONS : FEED_OPTIONS}
          buttonEvent={deleteMyFeed}
        />
      </div>

      <FeedSlider imageList={log.image_urls} />

      <ul className="mb-2 flex items-center gap-4">
        <li className="flex items-center gap-0.5">
          <BoxIcon
            name="heart"
            size={24}
            onClick={() => {
              addLike(log.id);
            }}
          />

          <Text fontSize={14}>{log.like_count || 0}</Text>
        </li>

        <li>
          <Link href={`/feed/comment/${log.id}`} className="flex items-center gap-0.5">
            <BoxIcon name="chat" size={24} />

            <Text fontSize={14}>{log.comment_count || 0}</Text>
          </Link>
        </li>

        <li>
          <BoxIcon name="share" size={24} flip="horizontal" />
        </li>
      </ul>

      <div className="max-h-[360px] overflow-y-auto">
        <div
          ref={(el) => {
            contentRefs.current[log.id] = el;
          }}
          className={cn(clampClass, 'text-sm whitespace-pre-line text-black transition-all')}
        >
          {log.content}
        </div>

        {showMore && (
          <button
            onClick={() => toggleExpand(log.id)}
            className="text-grey02 mt-1 text-sm font-medium"
          >
            {isExpanded ? '접기' : '더보기'}
          </button>
        )}
      </div>
    </div>
  );
};

interface IFeedListResponse {
  pages: Array<{
    data: {
      boards: ILogResponse[];
    };
  }>;
}

const FeedList = () => {
  const { ref, inView } = useInView();
  const [logId, setLogId] = useState(-1);

  const queryClient = useQueryClient();

  const { mutate: deleteLog } = useDeleteLog({
    onSuccess: (res) => {
      if (res.status === 200) {
        const modal = document.getElementById(DELETE_FEED_MODAL) as HTMLDialogElement;
        modal.close();
        showToast({ message: '일기를 삭제했습니다.', type: 'success' });
        queryClient.invalidateQueries({ queryKey: [FEED_LIST_QUERY_KEY] });
      }
    },
  });

  const { data: logList, hasNextPage, fetchNextPage, isFetching } = useGetLogList();
  const { data: userData } = useGetUserInfo();

  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [showMoreButton, setShowMoreButton] = useState<Record<number, boolean>>({});

  const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const newState: Record<number, boolean> = {};

    for (const key in contentRefs.current) {
      const el = contentRefs.current[key];
      if (el) {
        newState[+key] = el.scrollHeight > 40;
      }
    }
    setShowMoreButton(newState);
  }, [logList]);

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    // 무한 스크롤
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // 스크롤 위치 저장 (뒤로가기시 해당 위치로 이동)
  useScrollPosition({
    storageKey: `${FEED_LIST_QUERY_KEY}-scroll`,
    shouldRestore: !isFetching,
  });

  return (
    <div>
      <Popup
        id={DELETE_FEED_MODAL}
        title="일기 삭제"
        activeButtonComponent={
          <Button
            buttonColor="primary"
            size="medium"
            onClick={() => {
              if (logId) {
                deleteLog(logId);
              }
            }}
          >
            삭제
          </Button>
        }
      >
        <>
          <p>일기를 삭제하시겠습니까?</p>

          <p>삭제하신 후 되돌리실 수 없습니다.</p>
        </>
      </Popup>

      <div>
        {logList?.pages?.map((page) =>
          page.data.boards.map((log: ILogResponse) => {
            const isExpanded = expandedItems[log.id];
            const showMore = showMoreButton[log.id];

            const isMyPost = userData && userData.nickname === log.user;

            return (
              <FeedItem
                key={log.id}
                log={log}
                setLogId={setLogId}
                showMore={showMore}
                isMyPost={isMyPost}
                isExpanded={isExpanded}
                toggleExpand={toggleExpand}
                contentRefs={contentRefs}
              />
            );
          }),
        )}
      </div>

      {isFetching && (
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      <div ref={ref as React.RefCallback<HTMLDivElement>} />
    </div>
  );
};

export default FeedList;
