'use client';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { COOK_TIME_OPTIONS, PRICE_OPTIONS } from '@/constants/options.constants';
import { cn } from '@/utils/cn';

import { Text } from '../text/Text';

interface IRangeProps<T extends FieldValues> {
  type: 'price' | 'time';
  control: Control<T>;
  name: Path<T>;
}

const OPTIONS = {
  price: PRICE_OPTIONS,
  time: COOK_TIME_OPTIONS,
};

const LEGEND = {
  price: '요리 가격(원)',
  time: '요리 시간',
};

const Range = <T extends FieldValues>({ type, name, control }: IRangeProps<T>) => {
  const isPrice = type === 'price';
  const options = OPTIONS[type];

  const {
    field: { value: optionName, onChange },
  } = useController({
    name,
    control,
  });

  const value = OPTIONS[type].find((option) => option.name === optionName)?.value;

  const handleClickSetValue = (value: string) => {
    // setValue(value);
    onChange(options.find((option) => option.value === value)?.name);
  };

  return (
    <fieldset>
      <div className="w-full">
        <legend className="fieldset-legend">
          <Text fontSize={14} fontWeight="semiBold">
            {LEGEND[type]}
          </Text>
        </legend>

        <input
          type="range"
          min={0}
          max={isPrice ? PRICE_OPTIONS.length - 1 : COOK_TIME_OPTIONS.length - 1}
          value={value}
          className="range range-primary range-xs w-full"
          step="1"
          onChange={(e) => handleClickSetValue(e.target.value)}
        />

        <ul className="ml-[-20px] mt-2 flex w-[calc(100%+40px)] text-xs">
          {options.map((option) => {
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
    </fieldset>
  );
};

export default Range;
