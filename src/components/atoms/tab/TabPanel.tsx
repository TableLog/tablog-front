'use client';
import { ComponentProps } from 'react';

import { useTabsContext } from './Tab.context';

interface TabPanelProps extends ComponentProps<'div'> {
  index: number;
}
const TabPanel = ({ className, index, children }: TabPanelProps) => {
  const { activeIndex } = useTabsContext();

  return (
    <div className={`${className || ''} ${activeIndex !== index ? 'hidden' : ''}`}>{children}</div>
  );
};

export default TabPanel;
