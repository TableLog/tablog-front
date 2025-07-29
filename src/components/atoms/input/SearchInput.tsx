import { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

import { BoxIcon } from '../icon/BoxIcon';

const SearchInput = ({ className, ...props }: ComponentProps<'input'>) => {
  return (
    <div
      className={cn(
        'relative flex h-[34px] w-full items-center rounded-full border border-grey07 bg-transparent px-4 text-sm placeholder-grey02 focus:outline-none',
        className,
      )}
    >
      <input id="search" className="flex-1" type="text" {...props} />

      <label htmlFor="search" className="flex items-center">
        <BoxIcon color="grey02" name="search" size={20} />
      </label>
    </div>
  );
};

export default SearchInput;
