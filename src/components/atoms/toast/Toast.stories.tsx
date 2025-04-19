import type { Meta, StoryObj } from '@storybook/react';

import Toast from './Toast';

const meta = {
  title: 'Atoms/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="w-[420px]">
      <Toast {...args} />
    </div>
  ),
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ErrorToast: Story = {
  args: {
    type: 'error',
    message: 'error 토스트 메세지입니다. 3초 뒤에 사라집니다.',
    clearErrorMessage: () => {},
  },
};

export const SuccessToast: Story = {
  args: {
    type: 'success',
    message: 'success 토스트 메세지입니다. 3초 뒤에 사라집니다.',
    clearErrorMessage: () => {},
  },
};

export const InfoToast: Story = {
  args: {
    type: 'info',
    message: 'info 토스트 메세지입니다. 3초 뒤에 사라집니다.',
    clearErrorMessage: () => {},
  },
};

export const WarningToast: Story = {
  args: {
    type: 'warning',
    message: 'warning 토스트 메세지입니다. 3초 뒤에 사라집니다.',
    clearErrorMessage: () => {},
  },
};
