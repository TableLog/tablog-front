import type { Meta, StoryObj } from '@storybook/react';

import Tooltip from './Tooltip';

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="h-[200px] w-[420px]">
      <Tooltip {...args} />
    </div>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicTooltip: Story = {
  args: {
    children: (
      <>
        <p>
          등록된 레시피가 50개 이상이거나 사업장 등록증 또는 레시피 특허증을 등록하면 레시피를
          유로로 등록하실 수 있습니다.
        </p>

        <p>유료로 등록한 레시피의 재료 및 요리 과정은 유료 결제한 회원들에게만 노출됩니다.</p>
      </>
    ),
  },
};
