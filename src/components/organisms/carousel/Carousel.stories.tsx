import type { Meta, StoryObj } from '@storybook/react';

import Carousel from './Carousel';

const meta = {
  title: 'organisms/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => <Carousel {...args} />,
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockImageUrl = [
  'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp',
  'https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp',
  'https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp',
];

export const Default: Story = {
  args: {
    images: mockImageUrl,
  },
};
