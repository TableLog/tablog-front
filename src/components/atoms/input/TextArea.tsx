import React, { useState } from 'react';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { LABEL_MAP, PLACEHOLDER_MAP } from '@/constants/map/input.map';
import { cn } from '@/utils/cn';

import { Text } from '../text/Text';

interface ITextAreaProps<T extends FieldValues> {
  errors: FieldErrors<typeof LABEL_MAP>;
  category: keyof typeof LABEL_MAP;
  register: UseFormRegister<T>;
  maxLength: number;
  name?: Path<T>;
  defaultValue?: string;
}
const TextArea = <T extends FieldValues>({
  category,
  errors,
  maxLength,
  register,
  name,
  defaultValue,
}: ITextAreaProps<T>) => {
  const [currentLength, setCurrentLength] = useState(0);

  const borderClass = errors[category] ? 'border-red01' : 'border-grey07';

  return (
    <div>
      <fieldset className="fieldset gap-1 p-0">
        <legend className="fieldset-legend mb-1 flex w-full justify-between p-0">
          <Text fontWeight="medium" fontSize={12} color="black03">
            {LABEL_MAP[category]}
          </Text>

          <Text fontWeight="regular" fontSize={12}>
            {currentLength} / {maxLength}
          </Text>
        </legend>

        <textarea
          {...register(name ?? (category as Path<T>))}
          maxLength={maxLength}
          onChange={(e) => setCurrentLength(e.target.value.length)}
          className={cn(
            borderClass,
            'transition-all-3 focus-outline-none textarea h-40 w-full resize-none whitespace-pre-wrap rounded-[10px] leading-snug placeholder-grey02 focus:border-black01',
          )}
          placeholder={PLACEHOLDER_MAP[category]}
          defaultValue={defaultValue}
        />

        {errors?.[category]?.message && (
          <div className="validator-hint mt-0 whitespace-pre-line">
            <Text color="red01">{errors[category]?.message}</Text>
          </div>
        )}
      </fieldset>
    </div>
  );
};

export default TextArea;
