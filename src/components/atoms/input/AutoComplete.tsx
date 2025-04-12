'use client';

import React, { useRef, useState } from 'react';

import { LABEL_MAP, PLACEHOLDER_MAP } from '@/constants/map/input.map';
import { cn } from '@/utils/cn';

import { BoxIcon } from '../icon/BoxIcon';

interface IAutoCompleteProps {
  list: Array<{ id: number; title: string }>;
  category: keyof typeof LABEL_MAP;
}

const AutoComplete = ({ list, category }: IAutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (title: string) => {
    setValue(title);
    setIsOpen(false);
    inputRef.current?.blur(); // 선택 후 드롭다운 닫히게
  };

  return (
    <div className="dropdown w-full">
      <label
        tabIndex={0}
        className={cn(
          'border-grey07 transition-all-3 flex h-[34px] w-full items-center border px-4',
          'rounded-2xl',
          isOpen && 'rounded-br-none rounded-bl-none',
        )}
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          placeholder={PLACEHOLDER_MAP[category]}
          className="placeholder-grey02 flex-1 border-none bg-transparent text-sm focus:outline-none"
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)}
          onChange={(e) => setValue(e.target.value)}
        />

        <BoxIcon name="search" size={20} />
      </label>

      <ul
        tabIndex={0}
        className={cn(
          'dropdown-content menu border-grey07 bg-white01 absolute top-[32px] w-full rounded-br-2xl rounded-bl-2xl border px-4',
          !isOpen && 'hidden',
        )}
      >
        {list.filter((item) => item.title.includes(value)).length === 0 ? (
          <li className="text-grey01 pointer-events-none cursor-default py-1">
            검색 결과가 없습니다
          </li>
        ) : (
          list
            .filter((item) => item.title.includes(value))
            .map((item) => (
              <li
                key={item.id}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(item.title)}
                className="cursor-pointer py-1"
              >
                {item.title}
              </li>
            ))
        )}
      </ul>
    </div>
  );
};

export default AutoComplete;
