import ProfileImage from '@/components/atoms/profile-image/ProfileImage';
import { cn } from '@/utils/cn';
import { convertTimeFormat } from '@/utils/functions';

interface ChatBubbleProps {
  sender: string;
  message: string;
  isMine: boolean;
  createdAt: string;
  profileImgUrl?: string;
}

function ChatBubble({ sender, message, isMine, createdAt, profileImgUrl }: ChatBubbleProps) {
  return (
    <div
      className={cn(
        'flex items-end gap-1',
        isMine ? 'flex-row-reverse self-end' : 'flex-row self-start',
      )}
    >
      <div className="flex gap-2">
        {!isMine && <ProfileImage size={40} src={profileImgUrl} />}
        <div>
          <span className={cn('mb-1 ml-2 text-sm text-grey03', isMine ? 'hidden' : 'block')}>
            {sender}
          </span>
          <div
            className={cn(
              'rounded-full border border-grey07 px-4 py-3 text-base leading-none',
              isMine ? 'bg-primary04' : 'bg-grey08',
            )}
          >
            {message}
          </div>
        </div>
      </div>
      <div className="mb-1 text-xs text-grey04">{convertTimeFormat(createdAt)}</div>
    </div>
  );
}

export default ChatBubble;
