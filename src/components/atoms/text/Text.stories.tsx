import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '@/components/atoms/text/Text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fontSize: {
      control: { type: 'select' },
      options: [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96, 128],
    },
    fontWeight: {
      control: { type: 'select' },
      options: [
        'thin',
        'extraLight',
        'light',
        'regular',
        'medium',
        'semiBold',
        'bold',
        'extraBold',
        'black',
      ],
    },
    color: {
      control: { type: 'select' },
      options: [
        'primary01',
        'primary02',
        'primary03',
        'primary04',
        'primary05',
        'white01',
        'black01',
        'black02',
        'black03',
        'grey01',
        'grey02',
        'grey03',
        'grey04',
        'grey05',
        'grey06',
        'grey07',
        'grey08',
        'red01',
        'yellow01',
      ],
    },
  },
  args: {
    onClick: () => {
      console.log('Text clicked');
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Body01: Story = {
  args: {
    children: 'Body 1',
    fontSize: 14,
    fontWeight: 'regular',
    color: 'primary01',
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
