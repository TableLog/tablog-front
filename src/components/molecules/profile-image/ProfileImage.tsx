import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { cn } from '@/utils/cn';

interface IProfileImage {
  url?: string;
}

export default function ProfileImage({ url }: IProfileImage) {
  const bgImg = url ? `url(${url})` : 'bg-grey04';

  return (
    <div
      className={cn('h-[100px] w-[100px] rounded-full bg-cover hover:brightness-50', url || bgImg)}
      style={{ backgroundImage: url && bgImg }}
    >
      <div
        className={`h-full w-full content-center text-center ${url ? 'opacity-0' : 'opacity-100'} hover:opacity-100`}
      >
        <BoxIcon name="image" color="white01" size={30} />
      </div>
    </div>
  );
}
