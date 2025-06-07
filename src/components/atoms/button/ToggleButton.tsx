import React, { ComponentProps, ReactNode } from 'react';

import { Text } from '../text/Text';

interface IToggleButtonProps extends Omit<ComponentProps<'input'>, 'title'> {
  title: string | ReactNode;
}

const ToggleButton = ({ title, ...props }: IToggleButtonProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <legend>
        <Text fontSize={14} fontWeight="semiBold">
          {title}
        </Text>
      </legend>

      <input
        type="checkbox"
        className="toggle toggle-primary border-grey04 before:bg-grey04 checked:border-primary"
        {...props}
      />
    </div>
  );
};

export default ToggleButton;
