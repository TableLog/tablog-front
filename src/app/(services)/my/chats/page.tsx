import { Suspense } from 'react';

import PageHeader from '@/components/atoms/page-header/PageHeader';

import ChatRoomList from './chat-room-list';

function MyChatRoomsPage() {
  return (
    <div className="relative px-5 pb-4">
      <PageHeader title="채팅 목록" back />
      <Suspense
        fallback={
          <div className="mt-4 text-center text-grey02">채팅 목록을 불러오는 중입니다...</div>
        }
      >
        <ChatRoomList />
      </Suspense>
    </div>
  );
}

export default MyChatRoomsPage;
