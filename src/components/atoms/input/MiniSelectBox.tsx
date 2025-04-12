import React, { useState } from 'react';

import { cn } from '@/utils/cn';

import { BoxIcon } from '../icon/BoxIcon';
import { Text } from '../text/Text';

interface Option {
  id: number;
  title: string;
}

interface IMiniSelectProps {
  list: Array<Option>;
}

const MiniSelectBox: React.FC<IMiniSelectProps> = ({ list }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(list[0]);

  const toggleIsOpen = () => setIsOpen((prev) => !prev);

  const handleSelect = (item: Option) => {
    setSelected(item);
    setIsOpen(false);
  };

  const rotateClass = isOpen ? 'rotate-180' : '';

  return (
    <div
      className={cn(
        'border-grey05 transition-all-3 w-fit overflow-hidden rounded-[10px] border bg-white text-sm leading-none',
        isOpen ? 'max-h-[160px]' : 'max-h-[34px]',
      )}
    >
      <div
        onClick={toggleIsOpen}
        className="flex h-8 cursor-pointer items-center justify-between gap-2 px-2"
      >
        <Text fontSize={14} color="black01" className="leading-none">
          {selected.title}
        </Text>

        <BoxIcon name="chevron-up" class={cn(rotateClass, 'transition-transform duration-300')} />
      </div>

      <div className="flex flex-col">
        {list
          .filter((item) => item.id !== selected.id)
          .map((item) => (
            <div
              key={item.id}
              className="flex h-8 cursor-pointer items-center px-2 hover:bg-gray-100"
              onClick={() => handleSelect(item)}
            >
              <Text fontSize={14} color="grey01" className="leading-none">
                {item.title}
              </Text>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MiniSelectBox;
