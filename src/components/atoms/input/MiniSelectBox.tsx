'use client';
import React, { useCallback, useState } from 'react';

import { cn } from '@/utils/cn';

import { BoxIcon } from '../icon/BoxIcon';
import { Text } from '../text/Text';

interface Option {
  id: number;
  title: string;
  name: string;
}

interface IMiniSelectProps {
  className?: string;
  list: Array<Option>;
  value: Option;
  onChange: (newOption: Option) => void;
}

const MiniSelectBox: React.FC<IMiniSelectProps> = ({ className, list, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(0);

  const measuredRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const toggleIsOpen = () => setIsOpen((prev) => !prev);

  const handleSelect = (item: Option) => {
    onChange(item);
    setIsOpen(false);
  };

  const rotateClass = isOpen ? '' : 'rotate-180';

  return (
    <div style={{ width }} className={cn('relative h-[34px]', className)}>
      <div
        ref={measuredRef}
        className={cn(
          'transition-all-3 absolute left-0 top-0 z-10 w-fit overflow-hidden rounded-[10px] border border-grey07 bg-white01 text-sm leading-none',
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
          <BoxIcon
            name="chevron-up"
            class={cn(rotateClass, 'transition-transform duration-300')}
            color="grey05"
          />
        </div>
        <div className="flex flex-col">
          {list
            .filter((option) => option.id !== value.id)
            .map((option) => (
              <div
                key={option.id}
                className="flex h-8 cursor-pointer items-center px-2 hover:bg-grey08"
                onClick={() => handleSelect(option)}
              >
                <Text fontSize={14} color="grey01" className="leading-none">
                  {option.title}
                </Text>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MiniSelectBox;
