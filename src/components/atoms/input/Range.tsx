import React, { useState } from 'react';

import { COOK_TIME_OPTIONS, PRICE_OPTIONS } from '@/constants/options.constants';
import { cn } from '@/utils/cn';

import { Text } from '../text/Text';

interface IRange {
  type: 'price' | 'time';
}

const Range = ({ type }: IRange) => {
  const isPrice = type === 'price';

  const [value, setValue] = useState('0');

  const handleClickSetValue = (value: string) => {
    setValue(value);
  };

  return (
    <div>
      <div className="w-full">
        <input
          type="range"
          min={0}
          max={isPrice ? PRICE_OPTIONS.length - 1 : COOK_TIME_OPTIONS.length - 1}
          value={value}
          className="range range-primary range-xs w-full"
          step="1"
          onChange={(e) => setValue(e.target.value)}
        />

        <ul className="mt-2 ml-[-20px] flex w-[calc(100%+40px)] text-xs">
          {(isPrice ? PRICE_OPTIONS : COOK_TIME_OPTIONS).map((option) => {
            return (
              <li
                key={option.id}
                className={cn(isPrice ? 'w-1/5' : 'w-1/4', 'flex cursor-pointer justify-center')}
              >
                <Text
                  fontSize={14}
                  color={option.value === value ? 'black01' : 'grey04'}
                  className="text-nowrap break-keep"
                  onClick={() => handleClickSetValue(option.value)}
                >
                  {option.title}
                </Text>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Range;
