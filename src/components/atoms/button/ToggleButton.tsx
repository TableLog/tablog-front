import React from 'react';

import { Text } from '../text/Text';

interface IToggleButtonProps {
  title: string;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}
const ToggleButton = ({ title, value, setValue }: IToggleButtonProps) => {
  const handleChangeToggle = () => {
    setValue((prev: boolean) => !prev);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <legend>
        <Text fontSize={14} fontWeight="semiBold">
          {title}
        </Text>
      </legend>

      <input
        type="checkbox"
        checked={value}
        onChange={handleChangeToggle}
        className="toggle toggle-primary border-grey04 before:bg-grey04 checked:border-primary"
      />
    </div>
  );
};

export default ToggleButton;
