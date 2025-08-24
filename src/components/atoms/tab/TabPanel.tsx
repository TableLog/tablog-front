'use client';
import { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

import { useTabsContext } from './Tab.context';

interface TabPanelProps extends ComponentProps<'div'> {
  index: number;
}
const TabPanel = ({ className, index, children }: TabPanelProps) => {
  const { activeIndex } = useTabsContext();

  return <div className={cn(className, activeIndex !== index && 'hidden')}>{children}</div>;
};

export default TabPanel;
