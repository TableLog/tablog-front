import type { Meta, StoryObj } from '@storybook/react';

import { REPORT_CONTENT_VALIDATION } from '@/constants/validation.constants';

import TextArea from './TextArea';

const meta = {
  title: 'Atoms/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="w-[420px]">
      <TextArea {...args} />
    </div>
  ),
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicTextArea: Story = {
  args: {
    category: 'reportContent',
  },
};

export const TextAreaWithError: Story = {
  args: {
    category: 'reportContent',
    errorMessage: REPORT_CONTENT_VALIDATION,
    isError: true,
  },
};
