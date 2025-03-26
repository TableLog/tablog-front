import type { Meta } from '@storybook/react';

import { BoxIcon, IBoxIconProps } from '@/components/atoms/icon/BoxIcon';

import Button from '../button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atoms/Icon',
  component: BoxIcon,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onClick: () => {
      console.log('testing icon click event');
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: { args: IBoxIconProps } = {
  args: {
    onClick: () => {
      console.log('testing icon click event');
    },
    name: 'home-smile',
    color: 'blue',
    size: '50px',
  },
};
