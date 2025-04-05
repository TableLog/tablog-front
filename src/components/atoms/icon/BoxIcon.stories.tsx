import type { Meta } from '@storybook/react';

import { BoxIcon, IBoxIconProps } from '@/components/atoms/icon/BoxIcon';

const meta = {
  title: 'atoms/Icon',
  component: BoxIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="bg-primary01">
      <BoxIcon {...args} />
    </div>
  ),
} satisfies Meta<typeof BoxIcon>;

export default meta;

export const Basic: { args: IBoxIconProps } = {
  args: {
    onClick: () => {
      console.log('testing icon click event');
    },
    name: 'home-smile',
    color: 'primary01',
    size: 50,
  },
};
