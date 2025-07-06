'use client';

import React, { useState } from 'react';

import { cn } from '@/utils/cn';

import { BoxIcon } from '../icon/BoxIcon';
import { Text } from '../text/Text';

interface ICheckboxPros {
  label: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Checkbox = ({ label, value, onChange }: ICheckboxPros) => {
  return (
    <div className="flex">
      <label className="fieldset-label inline-flex gap-1">
        <input
          checked={value}
          onChange={onChange}
          type="checkbox"
          className="checkbox-primary checkbox checkbox-sm rounded-[4px]"
        />

        <Text fontSize={14} color="black01">
          {label}
        </Text>
      </label>
    </div>
  );
};

interface ICheckboxesPros {
  label: string;
  name: string;
  content: string;
  value?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}
const Checkboxes = ({ label, name, content, value, onChange }: ICheckboxesPros) => {
  const [isContentOpen, setIsContentOpen] = useState(false);

  const handleToggleContent = () => {
    setIsContentOpen((prev) => !prev);
  };

  const contentHeightClass = isContentOpen ? 'h-[100px]' : 'h-0';
  const contentHiddenClass = isContentOpen ? 'visible' : 'hidden';

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="fieldset-label flex items-center gap-1" htmlFor={name}>
          <input
            type="checkbox"
            id={name}
            name={name}
            className="hidden"
            onChange={(e) => onChange(e, name)}
          />

          <BoxIcon
            name="check"
            size={24}
            color={value ? 'primary01' : 'black01'}
            class="transition-all-3"
          />

          <Text fontSize={14} color={value ? 'primary01' : 'black01'} className="transition-all-3">
            {label}
          </Text>
        </label>

        <div
          className="flex flex-1 items-center justify-end text-right"
          onClick={handleToggleContent}
        >
          <BoxIcon
            name="chevron-right"
            color="grey03"
            size={20}
            rotate={isContentOpen ? '90' : undefined}
          />
        </div>
      </div>

      <div
        className={cn(
          contentHeightClass,
          'transition-all-3 mt-1.5 overflow-y-auto overflow-x-hidden bg-grey08',
        )}
      >
        <div className={cn(contentHiddenClass, 'pb-3 pl-5 pr-5 pt-3')}>
          <Text fontSize={12}>{content}</Text>
        </div>
      </div>
    </div>
  );
};

export { Checkbox, Checkboxes };
