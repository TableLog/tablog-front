'use client';

import { useRef, useState } from 'react';
import { Control, FieldValues, Path, PathValue, useController } from 'react-hook-form';

import { LABEL_MAP, PLACEHOLDER_MAP } from '@/constants/map/input.map';
import { cn } from '@/utils/cn';

import { Text } from '../text/Text';

interface ISelectBoxProps<T extends FieldValues> {
  category: keyof typeof LABEL_MAP;
  name?: Path<T>;
  list: ListType[];
  control: Control<T>;
}

interface ListType {
  id: number;
  title: string;
  name: string;
}

const SelectBox = <T extends FieldValues>({
  category,
  name,
  list,
  control,
}: ISelectBoxProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null); // Ref 추가
  const [selectedOption, setSelectedOption] = useState(list[0]);

  const [isOpen, setIsOpen] = useState(false);
  const {
    field: { onChange },
    fieldState: { error },
  } = useController({
    name: name ?? (category as Path<T>),
    control,
    defaultValue: list[0].name as PathValue<T, Path<T>>,
  });

  const borderClass = error ? 'border-red01' : 'border-grey07';

  const handleClickSetValue = (option: ListType) => {
    setSelectedOption(option);
    onChange(option.name);
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
        className={cn(borderClass, 'transition-all-3 border-b-1 flex h-[34px] w-full items-center')}
      >
        <input
          ref={inputRef}
          type="text"
          readOnly
          value={selectedOption.title}
          placeholder={PLACEHOLDER_MAP[category]}
          className="flex-1 border-none bg-transparent text-sm placeholder-grey02 focus:outline-none"
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)}
        />
      </label>

      <ul
        tabIndex={0}
        className={cn(
          !isOpen && 'hidden',
          'dropdown-content w-full rounded-bl-[10px] rounded-br-[10px] border border-grey07 border-t-transparent bg-white01 px-2.5 py-1',
        )}
      >
        {list.map((option) => {
          return (
            <li
              key={option.id}
              className="cursor-pointer p-1"
              onClick={() => handleClickSetValue(option)}
            >
              <Text fontSize={14} color={selectedOption.id === option.id ? 'primary01' : 'grey02'}>
                {option.title}
              </Text>
            </li>
          );
        })}
      </ul>

      {error && (
        <div className="validator-hint mt-0">
          <Text color="red01">{error.message}</Text>
        </div>
      )}
    </div>
  );
};

export default SelectBox;
