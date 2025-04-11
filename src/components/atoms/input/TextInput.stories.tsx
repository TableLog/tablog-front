import type { Meta, StoryObj } from '@storybook/react';

import TextInput from './TextInput';

const meta = {
  title: 'Atoms/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="w-[420px]">
      <TextInput {...args} />
    </div>
  ),
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmailInput: Story = {
  args: {
    category: 'email',
  },
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    category: 'password',
  },
};

export const ButtonInput: Story = {
  args: {
    type: 'email',
    category: 'email',
    buttonText: '중복 확인',
    buttonEvent: () => console.log('ddd'),
  },
};

export const DisabledInput: Story = {
  args: {
    type: 'email',
    category: 'email',
    value: 'email@email.com',
    disabled: true,
  },
};
