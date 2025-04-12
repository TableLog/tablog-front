import { useState } from 'react';
import type { Meta } from '@storybook/react';

import ToggleButton from './ToggleButton';

const meta = {
  title: 'Atoms/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => <ToggleButtonWithState {...args} />,
} satisfies Meta<typeof ToggleButton>;

export default meta;

interface IToggleButtonProps {
  title: string;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ToggleButtonWithState = (props: IToggleButtonProps) => {
  const [toggleValue, setToggleValue] = useState(false);

  return (
    <ToggleButton
      {...props}
      title="유료 레시피로 등록"
      value={toggleValue}
      setValue={setToggleValue}
    />
  );
};
