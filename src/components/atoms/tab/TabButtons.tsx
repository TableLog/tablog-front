'use client';
import { ComponentProps, useRef } from 'react';

import { Text } from '../text/Text';

import { useTabsContext } from './Tab.context';

interface TabButtons extends ComponentProps<'div'> {
  tabs: string[];
}
const TabButtons = ({ className, tabs }: TabButtons) => {
  const { activeIndex, setActiveIndex } = useTabsContext();

  const activeRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<HTMLButtonElement[]>([]);

  function handleButtonClick(idx: number) {
    setActiveIndex(idx);

    const selectedButton = buttonsRef.current[idx];

    if (activeRef.current) {
      activeRef.current.style.left = `${selectedButton.offsetLeft}px`;
    }
  }

  return (
    <div
      className={`relative flex h-10 w-full gap-2.5 rounded-full bg-primary05 p-1 ${className || ''}`}
    >
      <div
        ref={activeRef}
        style={{
          // 버튼 너비 = (100% - paddingX - gap) / 버튼 개수
          width: `calc((100% - 0.5rem - ${0.625 * (tabs.length - 1)}rem) / ${tabs.length})`,
        }}
        className="absolute left-1 top-1/2 h-[calc(100%-0.5rem)] w-full -translate-y-1/2 rounded-full bg-white01 duration-200"
      ></div>

      {tabs.map((tabName, idx) => (
        <button
          key={`tab-button-${tabName}`}
          type="button"
          ref={(ref) => {
            buttonsRef.current[idx] = ref!;
          }}
          className={'relative z-10 w-full'}
          onClick={() => handleButtonClick(idx)}
        >
          <Text
            fontSize={14}
            fontWeight="medium"
            color={idx === activeIndex ? 'primary01' : 'black01'}
            className="duration-200"
          >
            {tabName}
          </Text>
        </button>
      ))}
    </div>
  );
};

export default TabButtons;
