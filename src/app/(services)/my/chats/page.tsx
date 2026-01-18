import PageHeader from '@/components/atoms/page-header/PageHeader';

import ChatRoomList from './chat-room-list';

function MyChatRoomsPage() {
  return (
    <div className="relative px-5 pb-4">
      <PageHeader title="채팅 목록" back />
      <ChatRoomList />
    </div>
  );
}

export default MyChatRoomsPage;
