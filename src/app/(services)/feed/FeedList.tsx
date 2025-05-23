'use client';
import React from 'react';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import ProfileImage from '@/components/atoms/profile-image/ProfileImage';
import { Text } from '@/components/atoms/text/Text';
import { useGetLog } from '@/hooks/feed.hooks';
import { ILogResponse } from '@/types/api';

const FeedList = () => {
  const { data: logList } = useGetLog();

  return (
    <div>
      {logList?.pages?.map((page) => {
        return page.data.boards.map((log: ILogResponse) => {
          return (
            <div key={log.id} className="mb-6">
              <div className="mb-1.5 flex gap-1.5">
                <ProfileImage src={log?.profileImgUrl} size={42} />

                <div className="flex flex-col gap-1.5">
                  <Text fontSize={14}>{log.user}</Text>

                  <div>{log.created_at}</div>
                </div>
              </div>

              <div className="bg-grey07 mb-4 h-[200px] w-full rounded-[20px]"></div>

              <ul className="mb-2 flex items-center gap-4">
                <li className="flex items-center gap-0.5">
                  <BoxIcon name="heart" size={24} />

                  <Text fontSize={14}>{log.like_count || 0}</Text>
                </li>

                <li className="flex items-center gap-0.5">
                  <BoxIcon name="chat" size={24} />

                  <Text fontSize={14}>{log.comment_count || 0}</Text>
                </li>

                <li>
                  <BoxIcon name="share" size={24} />
                </li>
              </ul>

              <div>
                <div className="ellipsis-2 whitespace-break-spaces">{log.content}</div>

                <Text color="grey02">더보기</Text>
              </div>
            </div>
          );
        });
      })}
    </div>
  );
};

export default FeedList;
