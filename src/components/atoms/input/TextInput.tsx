'use client';

import React, { useState } from 'react';

import { LABEL_MAP, PLACEHOLDER_MAP } from '@/constants/map/input.map';
import { cn } from '@/utils/cn';

import Button from '../button/Button';
import { BoxIcon } from '../icon/BoxIcon';
import { Text } from '../text/Text';

interface ITextProps {
  category: keyof typeof LABEL_MAP;
  errorMessage?: string;
  isError?: boolean;
  type?: 'text' | 'password' | 'email';
  required?: boolean;
  buttonText?: string;
  disabled?: boolean;
  buttonEvent?: () => void;
  value?: string | '';
}
const TextInput = ({
  type = 'text',
  isError,
  category,
  errorMessage,
  buttonText,
  buttonEvent,
  ...rest
}: ITextProps) => {
  const borderClass = isError ? 'border-red01' : 'border-grey07';

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <fieldset className="fieldset min-h-[76px] gap-1 p-0">
      <legend className="fieldset-legend mb-1 p-0">
        <Text fontWeight="medium" fontSize={12} color="black03">
          {LABEL_MAP[category]}
        </Text>
      </legend>

      <div className="flex gap-1">
        <label
          className={cn(
            borderClass,
            'input',
            'w-full',
            'bg-white01',
            'h-[32px]',
            'font-regular',
            'placeholder-grey02',
            'focus-within:placeholder-opacity-0',
            'focus-within:border-b-black01',
            'transition-all-3',
            'rounded-none',
            'border-t-0',
            'border-r-0',
            'border-b-1',
            'border-l-0',
            '!border-grey07',
            'p-0',
            'shadow-none',
            'focus-within:outline-none',
            'focus-within:ring-0',
            'focus-within:ring-offset-0',
          )}
        >
          <input
            autoComplete="new-password"
            type={showPassword ? 'text' : type}
            className={cn(rest.disabled ? 'bg-grey08' : 'bg-transparent')}
            placeholder={PLACEHOLDER_MAP[category]}
            {...rest}
          />

          {type === 'password' && (
            <BoxIcon
              name={showPassword ? 'hide' : 'show'}
              size={20}
              color="grey04"
              onClick={handleClickShowPassword}
            />
          )}
        </label>

        {buttonText && (
          <Button size="small" onClick={buttonEvent}>
            <Text>{buttonText}</Text>
          </Button>
        )}
      </div>

      {isError && (
        <div className="validator-hint mt-0">
          <Text color="red01">{errorMessage}</Text>
        </div>
      )}
    </fieldset>
  );
};

export default TextInput;
