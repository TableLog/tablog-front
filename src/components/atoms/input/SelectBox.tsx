'use client';

import React, { Dispatch, SetStateAction, useRef, useState } from 'react';

import { LABEL_MAP, PLACEHOLDER_MAP } from '@/constants/map/input.map';
import { cn } from '@/utils/cn';

import { Text } from '../text/Text';

interface ISelectBoxProps {
  category: keyof typeof LABEL_MAP;
  isError?: boolean;
  list: Array<{ id: number; title: string }>;
  errorMessage?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}
const SelectBox = ({ category, list, isError, errorMessage, value, setValue }: ISelectBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null); // Ref 추가

  const borderClass = isError ? 'border-red01' : 'border-grey07';

  const [isOpen, setIsOpen] = useState(false);

  const handleClickSetValue = (value: string) => {
    setValue(value);
    // 선택 후 blur 처리
    inputRef.current?.blur();
  };

  return (
    <div className="dropdown w-full">
      <legend className="fieldset-legend mb-1 p-0">
        <Text fontWeight="medium" fontSize={12} color="black03">
          {LABEL_MAP[category]}
        </Text>
      </legend>

      <label
        tabIndex={0}
        className={cn(borderClass, 'transition-all-3 flex h-[34px] w-full items-center border-b-1')}
      >
        <input
          ref={inputRef}
          type="text"
          readOnly
          value={value}
          placeholder={PLACEHOLDER_MAP[category]}
          className="placeholder-grey02 flex-1 border-none bg-transparent text-sm focus:outline-none"
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>

      <ul
        tabIndex={0}
        className={cn(
          !isOpen && 'hidden',
          'dropdown-content bg-white01 border-grey07 w-full rounded-br-[10px] rounded-bl-[10px] border border-t-transparent px-2.5 py-1',
        )}
      >
        {list.map((option) => {
          return (
            <li
              key={option.id}
              className="cursor-pointer p-1"
              onClick={() => handleClickSetValue(option.title)}
            >
              <Text fontSize={14} color={value === option.title ? 'primary01' : 'grey02'}>
                {option.title}
              </Text>
            </li>
          );
        })}
      </ul>

      {isError && (
        <div className="validator-hint mt-0">
          <Text color="red01">{errorMessage}</Text>
        </div>
      )}
    </div>
  );
};

export default SelectBox;
