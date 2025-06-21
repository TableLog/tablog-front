'use client';
import React, { useState } from 'react';

import { cn } from '@/utils/cn';

import { BoxIcon } from '../icon/BoxIcon';
import { Text } from '../text/Text';

interface Option {
  id: number;
  title: string;
  name: string;
}

interface IMiniSelectProps {
  list: Array<Option>;
  value: Option;
  onChange: (newOption: Option) => void;
}

const MiniSelectBox: React.FC<IMiniSelectProps> = ({ list, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => setIsOpen((prev) => !prev);

  const handleSelect = (item: Option) => {
    onChange(item);
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
          {value.title}
        </Text>

        <BoxIcon name="chevron-up" class={cn(rotateClass, 'transition-transform duration-300')} />
      </div>

      <div className="flex flex-col">
        {list
          .filter((option) => option.id !== value.id)
          .map((option) => (
            <div
              key={option.id}
              className="flex h-8 cursor-pointer items-center px-2 hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              <Text fontSize={14} color="grey01" className="leading-none">
                {option.title}
              </Text>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MiniSelectBox;
