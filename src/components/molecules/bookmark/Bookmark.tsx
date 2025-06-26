import { ComponentProps } from 'react';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { cn } from '@/utils/cn';

interface BookmarkProps extends ComponentProps<'div'> {
  isMarked: boolean;
  size?: number;
}
const Bookmark = ({ className, isMarked, size = 24, ...props }: BookmarkProps) => {
  return (
    <div className={cn('flex items-center', className)} {...props}>
      <BoxIcon color="white01" type={isMarked ? 'solid' : 'regular'} name="bookmark" size={size} />
    </div>
  );
};
export default Bookmark;
