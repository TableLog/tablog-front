'use client';

import React, { useRef, useState } from 'react';

import { cn } from '@/utils/cn';

import { BoxIcon } from '../icon/BoxIcon';

interface IAutoCompleteProps {
  list: Array<{ id: number; title: string }>;
}

const AutoComplete = ({ list }: IAutoCompleteProps) => {
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
          placeholder="요리명 혹은 작성자명을 입력해주세요."
          className="flex-1 border-none bg-transparent text-sm focus:outline-none"
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)}
          onChange={(e) => setValue(e.target.value)}
        />

        <BoxIcon name="search" size={20} />
      </label>

      <ul
        tabIndex={0}
        className={cn(
          'dropdown-content menu border-b-grey07 border-l-grey07 border-r-grey07 absolute top-[32px] w-full rounded-br-2xl rounded-bl-2xl border border-t-transparent bg-white px-4',
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
                className="py-1"
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
