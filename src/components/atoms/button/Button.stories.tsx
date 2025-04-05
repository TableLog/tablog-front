import type { Meta, StoryObj } from '@storybook/react';

import { BoxIcon } from '../icon/BoxIcon';
import { Text } from '../text/Text';

import Button from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => <Button {...args} />,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: <Text>Primary</Text>,
    size: 'large',
    buttonColor: 'primary',
  },
};

export const Grey04Button: Story = {
  args: {
    children: <Text>Grey 04</Text>,
    size: 'large',
    buttonColor: 'grey04',
  },
};

export const Grey06Button: Story = {
  args: {
    children: <Text>Grey 06</Text>,
    size: 'large',
    buttonColor: 'grey06',
  },
};

export const WhiteButton: Story = {
  args: {
    children: <Text>White</Text>,
    size: 'large',
    buttonColor: 'white',
  },
};

export const MiniButton: Story = {
  args: {
    children: <Text>Mini</Text>,
    size: 'mini',
    buttonColor: 'primary',
  },
};

export const SmallButton: Story = {
  args: {
    children: <Text>Small</Text>,
    size: 'small',
    buttonColor: 'primary',
  },
};

export const MediumButton: Story = {
  args: {
    children: <Text>Medium</Text>,
    size: 'medium',
    buttonColor: 'primary',
  },
};

export const LargeButton: Story = {
  args: {
    children: <Text>Large</Text>,
    size: 'large',
    buttonColor: 'primary',
  },
};

export const FullButton: Story = {
  args: {
    children: <Text>Full Width Button</Text>,
    size: 'large',
    buttonColor: 'primary',
    full: true,
  },
};

export const ButtonWithClickEvent: Story = {
  args: {
    children: <Text>Button with Click Event</Text>,
    size: 'large',
    buttonColor: 'primary',
    full: true,
    onClick: () => alert('버튼 클릭 이벤트'),
  },
};

export const IconButton: Story = {
  args: {
    children: (
      <>
        <Text>Button with Icon</Text>

        <BoxIcon name="bell" size={24} />
      </>
    ),
    size: 'large',
    buttonColor: 'primary',
  },
};
