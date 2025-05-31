'use client';

import React, { useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { LABEL_MAP, PLACEHOLDER_MAP } from '@/constants/map/input.map';
import { cn } from '@/utils/cn';
import { changeInputBirthFormat } from '@/utils/functions';

import Button from '../button/Button';
import { BoxIcon } from '../icon/BoxIcon';
import { Text } from '../text/Text';

interface ITextInputProps<T extends FieldValues> {
  category: keyof typeof LABEL_MAP;
  errorMessage?: string;
  isError?: boolean;
  type?: 'text' | 'password' | 'email' | 'number';
  required?: boolean;
  buttonText?: string;
  disabled?: boolean;
  buttonEvent?: () => void;
  value?: string | '';
  maxLength?: number;
  errors: FieldErrors<typeof LABEL_MAP>;
  inputMode?: 'text' | 'tel' | 'url' | 'email' | 'search' | 'numeric' | 'decimal';
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  setValue?: UseFormSetValue<T>;
  register: UseFormRegister<T>;
  successMessage?: string;
}
const TextInput = <T extends FieldValues>({
  type = 'text',
  category,
  buttonText,
  buttonEvent,
  register,
  errors,
  onChange,
  setValue,
  successMessage,
  ...rest
}: ITextInputProps<T>) => {
  const borderClass = errors?.[category] ? 'border-red01' : 'border-grey07';
  const disabledClass = rest.disabled ? 'bg-grey08 pointer-events-none' : 'bg-white01';

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (category === 'birthday') {
      const value = changeInputBirthFormat(e);
      setValue?.('birthday' as Path<T>, value as PathValue<T, Path<T>>);
    }

    if (onChange) {
      onChange(e);
    }
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
            disabledClass,
            'input',
            'w-full',
            'h-[32px]',
            'font-regular',
            'placeholder-grey02',
            'focus-within:placeholder-opacity-0',
            'focus:border-b-black01',
            'focus-within:border-b-black01',
            'focus-outline-none',
            'transition-all-3',
            'rounded-none',
            'border-t-0',
            'border-r-0',
            'border-b-1',
            'border-l-0',
            'p-0',
            'shadow-none',
          )}
        >
          <input
            {...rest}
            {...register(category as Path<T>)}
            onChange={onChangeInput}
            autoComplete="new-password"
            type={showPassword ? 'text' : type}
            placeholder={PLACEHOLDER_MAP[category]}
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
          <Button size="small" onClick={buttonEvent} type="button" disabled={rest.disabled}>
            <Text color="white01">{buttonText}</Text>
          </Button>
        )}
      </div>

      {errors?.[category]?.message && (
        <div className="validator-hint mt-0 whitespace-pre-line">
          <Text color="red01">{errors[category]?.message}</Text>
        </div>
      )}

      {successMessage && (
        <div className="validator-hint mt-0 whitespace-pre-line">
          <Text color="grey03">{successMessage}</Text>
        </div>
      )}
    </fieldset>
  );
};

export default TextInput;
