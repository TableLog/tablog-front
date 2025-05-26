import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Tabs from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="w-100">
      <Tabs className="gap-6" {...args} />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof Tabs>;

const sampleTabs = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' },
];

export const ExampleTabs: Story = {
  args: {
    tabs: sampleTabs,
    children: [
      <div key="tab1" id="tab1">
        <p>첫번째 탭입니다</p>
      </div>,
      <div key="tab2" id="tab2">
        <p>두번째 탭입니다</p>
      </div>,
      <div key="tab3" id="tab3">
        <p>세번째 탭입니다</p>
      </div>,
    ],
  },
};
