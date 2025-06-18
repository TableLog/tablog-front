'use client';

import { ReactNode, useRef, useState } from 'react';
import { Control, FieldValues, Path, PathValue, useController } from 'react-hook-form';

import { LABEL_MAP, PLACEHOLDER_MAP } from '@/constants/map/input.map';
import { cn } from '@/utils/cn';

import { BoxIcon } from '../icon/BoxIcon';

interface ItemType {
  id: number;
  title: string;
}

interface IAutoCompleteProps<T extends FieldValues> {
  list: Array<ItemType>;
  category: keyof typeof LABEL_MAP;
  name?: Path<T>;
  control: Control<T>;
  lastListElement?: ReactNode;
  isFilteredBySearch?: boolean;
  onSearch?: (newKeyword: string) => void;
}

const AutoComplete = <T extends FieldValues>({
  list,
  category,
  name,
  control,
  lastListElement,
  isFilteredBySearch = true,
  onSearch,
}: IAutoCompleteProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    field: { onChange },
  } = useController({
    name: name ?? (category as Path<T>),
    control,
    defaultValue: list?.[0]?.id as PathValue<T, Path<T>>,
  });

  const handleSelect = (item: ItemType) => {
    if (inputRef.current) inputRef.current.value = item.title;
    onChange(item.id);
    setIsOpen(false);
    inputRef.current?.blur(); // 선택 후 드롭다운 닫히게
  };

  const renderedList = isFilteredBySearch
    ? list.filter((item) => item.title.includes(value))
    : list;

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
          placeholder={PLACEHOLDER_MAP[category]}
          className="placeholder-grey02 flex-1 border-none bg-transparent text-sm focus:outline-none"
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)}
          onChange={(e) => {
            setValue(e.target.value);
            onSearch?.(e.target.value);
          }}
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
        {renderedList.length === 0 ? (
          <li className="text-grey01 pointer-events-none cursor-default py-1">
            검색 결과가 없습니다
          </li>
        ) : (
          <>
            {renderedList.map((item) => (
              <li
                key={item.id}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(item)}
                className="cursor-pointer py-1"
              >
                {item.title}
              </li>
            ))}
            {lastListElement}
          </>
        )}
      </ul>
    </div>
  );
};

export default AutoComplete;
