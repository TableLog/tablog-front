'use client';

import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import Button from '@/components/atoms/button/Button';
import LoginClickGuard from '@/components/atoms/button/LoginRequiredLink';
import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import TextArea from '@/components/atoms/input/TextArea';
import MoreOptions from '@/components/atoms/more-options/MoreOptions';
import ProfileImage from '@/components/atoms/profile-image/ProfileImage';
import ClampedTexts from '@/components/atoms/text/ClampedTexts';
import { Text } from '@/components/atoms/text/Text';
import { usePopupContext } from '@/components/molecules/popup/PopupProvider';
import BottomSheet from '@/components/organisms/bottom-sheet/BottomSheet';
import Carousel from '@/components/organisms/carousel/Carousel';
import { CHAT_ROOM_URL } from '@/constants/endpoint.constants';
import { FEED_MY_OPTIONS, FEED_OPTIONS } from '@/constants/options.constants';
import { FEED_QUERY_KEY } from '@/constants/query-key.constants';
import { useGetUserInfo } from '@/hooks/queries/auth.hooks';
import { useAddLike, useRemoveLike } from '@/hooks/queries/feed.hooks';
import { useReport } from '@/hooks/queries/report.hooks';
import { useFeedItemActions } from '@/hooks/useFeedItemActions';
import { zodReportForm } from '@/lib/zod/zodValidation';
import { toggleLikeSuccess } from '@/services/feed.services';
import { ILogResponse } from '@/types/api';
import { EReportType } from '@/types/enum';
import { cn } from '@/utils/cn';
import { convertDateFormat, handleShare, showToast } from '@/utils/functions';

interface IFeedItemProps {
  log: ILogResponse;
  isMyPost: boolean;
  contentRefs: React.RefObject<Record<number, HTMLDivElement | null>>;
  isDetail?: boolean;
}

type TReportFormValues = z.infer<typeof zodReportForm>;

const FeedItem = ({ log, isMyPost, contentRefs, isDetail }: IFeedItemProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openModal } = usePopupContext();

  const [isBottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TReportFormValues>({
    resolver: zodResolver(zodReportForm),
    mode: 'onChange',
  });

  const { data: userInfo } = useGetUserInfo();

  const { mutate: addLike } = useAddLike({
    onSuccess: (res) => {
      if (res.status === 201) {
        try {
          toggleLikeSuccess(log, queryClient);
          queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY.DETAIL(log.id) });
        } catch (error) {
          console.error('ToggleLikeSuccess error:', error);
        }
      }
    },
  });

  const { mutate: removeLike } = useRemoveLike({
    onSuccess: (res) => {
      if (res.status === 200) {
        try {
          toggleLikeSuccess(log, queryClient);
          queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEY.DETAIL(log.id) });
        } catch (error) {
          console.error('ToggleLikeSuccess error:', error);
        }
      }
    },
  });

  const { mutate: reportFeed } = useReport({
    onSuccess: () => {
      showToast({ message: '피드 신고 완료!', type: 'success' });
      setBottomSheetOpen(false);
    },
  });

  function onSubmit(data: TReportFormValues) {
    if (!log.user_id) return;

    reportFeed({
      reportedUserId: log.user_id,
      reportTargetType: EReportType.BOARD,
      targetId: log.id,
      ...data,
    });
  }

  const { handleDelete } = useFeedItemActions();

  const handleOptionClick = useCallback(
    (type: string) => {
      switch (type) {
        case '삭제하기':
          openModal({
            title: '일기 삭제',
            activeButtonComponent: ({ closeModal }) => (
              <Button
                buttonColor="primary"
                size="medium"
                onClick={() => {
                  handleDelete(log.id);
                  closeModal();
                }}
              >
                삭제
              </Button>
            ),
            children: (
              <>
                <p>일기를 삭제하시겠습니까?</p>
                <p>삭제하신 후 되돌리실 수 없습니다.</p>
              </>
            ),
          });
          break;
        case '수정하기':
          router.push(`/feed/edit-log/${log.id}`);
          break;
        case '채팅하기':
          if (!userInfo) return;
          router.push(CHAT_ROOM_URL({ senderId: userInfo?.id, receiverId: log.user_id }));
          break;
        case '신고하기':
          setBottomSheetOpen(true);
          break;
      }
    },
    [handleDelete, log.id, log.user_id, openModal, router, userInfo],
  );

  const handleShareFeed = useCallback(async () => {
    const shareUrl = `${window.location.origin}/feed/comment/${log.id}`;
    const shareTitle = log.title || '피드 공유';
    const shareText =
      log.content.length > 100 ? `${log.content.substring(0, 100)}...` : log.content;

    handleShare({ url: shareUrl, shareTitle, shareText });
  }, [log.id, log.title, log.content]);

  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex gap-2" onClick={() => router.push(`/profile/${log.user_id}`)}>
          <ProfileImage src={log?.profileImgUrl || ''} size={40} />

          <div className="flex flex-col justify-center">
            <Text fontSize={14}>{log.user}</Text>

            <Text fontSize={12} color="grey04">
              {convertDateFormat(log.createdAt)}
            </Text>
          </div>
        </div>

        <MoreOptions
          options={isMyPost ? FEED_MY_OPTIONS : FEED_OPTIONS}
          buttonEvent={handleOptionClick}
        />

        <BottomSheet
          isOpen={isBottomSheetOpen}
          onClose={() => setBottomSheetOpen(false)}
          title="신고하기"
          buttons={
            <div className="grid grid-cols-2 gap-1.5">
              <Button buttonColor="grey06" onClick={() => setBottomSheetOpen(false)}>
                닫기
              </Button>
              <Button full type="submit" form="report-form">
                제출
              </Button>
            </div>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)} className="px-5" id="report-form">
            <TextArea
              register={register}
              category="reportContent"
              errors={errors}
              maxLength={300}
            />
          </form>
        </BottomSheet>
      </div>

      {log.image_urls && (
        <Carousel
          imageList={log.image_urls.map((image, idx) => ({
            src: image,
            alt: `${log.title}-이미지-${idx}`,
          }))}
          half
        />
      )}

      <ul className="mb-3.5 mt-1 flex items-center gap-4">
        <li className="flex items-center gap-0.5">
          <LoginClickGuard>
            {log.isLike ? (
              <BoxIcon
                name="heart"
                type="solid"
                color="primary01"
                size={24}
                onClick={() => {
                  removeLike(log.id);
                }}
              />
            ) : (
              <BoxIcon
                name="heart"
                size={24}
                onClick={() => {
                  addLike(log.id);
                }}
              />
            )}
          </LoginClickGuard>

          <Text fontSize={14} className="min-w-[10px]">
            {log.like_count || 0}
          </Text>
        </li>

        {!isDetail && (
          <li>
            <Link href={`/feed/comment/${log.id}`} className="flex items-center gap-0.5">
              <BoxIcon name="chat" size={24} />

              <Text fontSize={14}>{log.comment_count || 0}</Text>
            </Link>
          </li>
        )}

        <li className="h-[25px]" onClick={handleShareFeed}>
          <BoxIcon name="share" size={24} flip="horizontal" />
        </li>
      </ul>

      <div className="max-h-[360px] overflow-y-auto">
        <div
          ref={(el) => {
            contentRefs.current[log.id] = el;
          }}
          className={cn('whitespace-pre-line text-sm text-black transition-all')}
        >
          <ClampedTexts>{log.content}</ClampedTexts>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
