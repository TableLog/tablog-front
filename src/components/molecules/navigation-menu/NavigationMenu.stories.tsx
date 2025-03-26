import type { Meta, StoryObj } from '@storybook/react';

import NavigationMenu from '@/components/molecules/navigation-menu/NavigationMenu';

const meta: Meta<typeof NavigationMenu> = {
  title: 'Molecules/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => <NavigationMenu {...args} />,
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

export const Active: Story = {
  args: {
    isActive: true,
    menuName: '홈',
    iconName: 'home-smile',
  },
};

export const Inactive: Story = {
  args: {
    isActive: false,
    menuName: '홈',
    iconName: 'home-smile',
  },
};
