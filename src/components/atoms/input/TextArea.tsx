import React from 'react';

import { LABEL_MAP, PLACEHOLDER_MAP } from '@/constants/map/input.map';
import { cn } from '@/utils/cn';

import { Text } from '../text/Text';

interface ITextAreaProps {
  isError?: boolean;
  errorMessage?: string;
  category: keyof typeof LABEL_MAP;
}
const TextArea = ({ category, isError, errorMessage }: ITextAreaProps) => {
  const borderClass = isError ? 'border-red01' : 'border-grey07';

  return (
    <div>
      <fieldset className="fieldset gap-1 p-0">
        <legend className="fieldset-legend mb-1 p-0">
          <Text fontWeight="medium" fontSize={12} color="black03">
            {LABEL_MAP[category]}
          </Text>
        </legend>

        <textarea
          className={cn(
            borderClass,
            'placeholder-grey02 transition-all-3 textarea focus-outline-none focus:border-black01 h-40 w-full resize-none rounded-[10px]',
          )}
          placeholder={PLACEHOLDER_MAP[category]}
        ></textarea>

        {isError && (
          <div className="validator-hint mt-0">
            <Text color="red01">{errorMessage}</Text>
          </div>
        )}
      </fieldset>
    </div>
  );
};

export default TextArea;
