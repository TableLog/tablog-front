import type { Meta, StoryObj } from '@storybook/react';

import LoadingScreen from './LoadingScreen';

const meta: Meta<typeof LoadingScreen> = {
  title: 'Atoms/LoadingScreen',
  component: LoadingScreen,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <div className="h-[200px] w-[100px]">
      <LoadingScreen />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
