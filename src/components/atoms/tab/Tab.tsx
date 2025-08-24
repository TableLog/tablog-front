'use client';
import { PropsWithChildren } from 'react';

import { TabsProvider } from './Tab.context';
import TabButtons from './TabButtons';
import TabPanel from './TabPanel';

interface TabsProps extends PropsWithChildren {
  defaultIndex: number;
  handleTabChange?: (index: number) => void;
}

const Tab = ({ defaultIndex, children, handleTabChange }: TabsProps) => {
  return (
    <TabsProvider defaultIndex={defaultIndex} handleTabChange={handleTabChange}>
      {children}
    </TabsProvider>
  );
};

export default Tab;

Tab.Buttons = TabButtons;
Tab.Panel = TabPanel;
