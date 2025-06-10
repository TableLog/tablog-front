import React from 'react';
import type { Meta } from '@storybook/react';

import Tab from './Tab';

const meta: Meta<typeof Tab> = {
  title: 'Atoms/Tabs',
  component: Tab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <div className="w-100">
      <TabsExample />
    </div>
  ),
};

export default meta;

export const TabsExample = () => {
  return (
    <Tab>
      <Tab.Buttons className="mb-4" tabs={['전체 레시피', '내 레시피']} />

      <Tab.Panel index={0}>전체 레시피 목록</Tab.Panel>
      <Tab.Panel index={1}>내 레시피 목록</Tab.Panel>
    </Tab>
  );
};
