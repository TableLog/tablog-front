import Link from 'next/link';

import ProfileImage from '@/components/atoms/profile-image/ProfileImage';
import { Text } from '@/components/atoms/text/Text';
import { IChatRoom } from '@/types/api/chat';
import { convertDateFormat } from '@/utils/functions';

function ChatRoom({ chatRoom }: { chatRoom: IChatRoom }) {
  return (
    <Link href={`/chat/${chatRoom.roomId}`} className="flex items-center gap-3 py-2">
      <ProfileImage size={40} src={chatRoom.profileImgUrl} />

      <div className="flex-grow space-y-1">
        <div className="flex w-full items-center justify-between">
          <Text fontSize={14}>{chatRoom.nickname}</Text>
          <Text fontSize={14} color="grey04">
            {convertDateFormat(chatRoom.lastCreatedAt)}
          </Text>
        </div>

        <div className="flex w-full items-center justify-between">
          <Text fontSize={14}>{chatRoom.lastMessage}</Text>
          {chatRoom.unreadCount > 0 && (
            <div className="flex size-5 items-center justify-center rounded-full bg-primary01 text-xs font-medium text-white">
              {chatRoom.unreadCount}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ChatRoom;
