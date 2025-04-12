import type { Meta, StoryObj } from '@storybook/react';

import AutoComplete from './AutoComplete';

const meta = {
  title: 'Atoms/AutoComplete',
  component: AutoComplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="w-[420px]">
      <AutoComplete {...args} />
    </div>
  ),
} satisfies Meta<typeof AutoComplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmailInput: Story = {
  args: {
    list: [
      { id: 1, title: '재료 1' },
      { id: 2, title: '재료 2' },
      { id: 3, title: '재료 3' },
    ],
    category: 'search',
  },
};
