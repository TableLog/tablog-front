'use client';
import { ComponentProps, JSX, useRef, useState } from 'react';

import { Text } from '@/components/atoms/text/Text';
import { cn } from '@/utils/cn';

interface TabInfo {
  id: string;
  label: string;
}

interface TabsProps extends ComponentProps<'div'> {
  tabs: TabInfo[];
  children: JSX.Element[];
  onTabChange?: ({
    prevTabId,
    newTabId,
  }: {
    prevTabId: TabInfo['id'];
    newTabId: TabInfo['id'];
  }) => void;
}

const Tabs = ({ tabs, children, className, onTabChange, ...props }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<TabInfo['id']>(children[0].props.id);
  const activeRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<HTMLButtonElement[]>([]);

  function handleTabButtonClick(id: TabInfo['id'], idx: number) {
    setActiveTab(id);
    onTabChange?.({ prevTabId: activeTab, newTabId: id });

    const selectedButton = buttonsRef.current[idx];
    if (activeRef.current) activeRef.current.style.left = `${selectedButton.offsetLeft}px`;
  }

  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      {/* 탭 버튼 */}
      <div className="bg-primary05 relative flex h-10 w-full gap-2.5 rounded-full p-1">
        <div
          ref={activeRef}
          style={{
            // 버튼 너비 = (100% - paddingX - gap) / 버튼 개수
            width: `calc((100% - 0.5rem - ${0.625 * (tabs.length - 1)}rem) / ${tabs.length})`,
          }}
          className="bg-white01 absolute top-1/2 left-1 h-[calc(100%-0.5rem)] w-full -translate-y-1/2 rounded-full duration-200"
        ></div>
        {tabs.map(({ id, label }, idx) => (
          <button
            key={`tab-button-${id}`}
            type="button"
            ref={(ref) => {
              buttonsRef.current[idx] = ref!;
            }}
            id={id}
            className={'relative z-10 w-full'}
            onClick={() => handleTabButtonClick(id, idx)}
          >
            <Text
              fontSize={14}
              fontWeight="medium"
              color={id === activeTab ? 'primary01' : 'black01'}
              className="duration-200"
            >
              {label}
            </Text>
          </button>
        ))}
      </div>

      {/* 탭 내용 */}
      {children.map((child, idx) => (
        <div key={`${idx}`} className={cn(child.props.id === activeTab ? '' : 'hidden')}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
