import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '@/components/atoms/text/Text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="bg-primary01">
      <Text {...args} />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Body01: Story = {
  args: {
    children: 'Body 1',
    fontSize: 14,
    fontWeight: 'regular',
    color: 'black01',
  },
};

export const Body02: Story = {
  args: {
    children: 'Body 2',
    fontSize: 12,
    fontWeight: 'regular',
    color: 'black01',
  },
};
