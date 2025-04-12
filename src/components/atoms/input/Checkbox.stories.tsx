import { useState } from 'react';
import type { Meta } from '@storybook/react';

import { Checkbox } from './Checkbox';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => <CheckboxWithState {...args} />,
} satisfies Meta<typeof Checkbox>;

export default meta;

interface ICheckboxPros {
  label: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const CheckboxWithState = (props: ICheckboxPros) => {
  const [checkValue, setCheckValue] = useState(false);

  return (
    <Checkbox
      {...props}
      label="유료"
      value={checkValue}
      onChange={(e) => setCheckValue(e.target.checked)}
    />
  );
};
