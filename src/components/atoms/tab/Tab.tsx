'use client';
import { PropsWithChildren } from 'react';

import { TabsProvider } from './Tab.context';
import TabButtons from './TabButtons';
import TabPanel from './TabPanel';

interface TabsProps extends PropsWithChildren {
  defaultIndex?: number;
}

const Tab = ({ defaultIndex, children }: TabsProps) => {
  return <TabsProvider defaultIndex={defaultIndex}>{children}</TabsProvider>;
};

export default Tab;

Tab.Buttons = TabButtons;
Tab.Panel = TabPanel;
