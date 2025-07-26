import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';

import { useFilterStore } from '@/lib/zutstand/recipeStore';
import { cn } from '@/utils/cn';

import { Text } from '../text/Text';

const CategoryTab = ({
  list,
  type,
}: {
  list: { id: number; title: string; name: string }[];
  type: 'cookingTime' | 'recipePrice' | 'cal';
}) => {
  const { setFilterCondition } = useFilterStore();

  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const activeBorderRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<number | null>(null);

  const handleClick = useCallback(
    (index: number, name: string) => {
      setSelected(index);
      setFilterCondition({ [type]: name });
    },
    [type, setFilterCondition],
  );

  useLayoutEffect(() => {
    if (activeBorderRef.current && tabsContainerRef.current) {
      if (selected === null) return;

      const selectedTab = tabsContainerRef.current.children[selected] as HTMLDivElement;

      if (selectedTab) {
        activeBorderRef.current.style.width = `${selectedTab.offsetWidth}px`;
        activeBorderRef.current.style.left = `${selectedTab.offsetLeft}px`;
      }
    }
  }, [selected, list]);

  const widthClass = type === 'recipePrice' ? 'w-[110%]' : 'w-full';

  return (
    <div className="no-scrollbar max-w-screen relative overflow-x-auto border-b border-grey07">
      <div className={cn(widthClass, 'flex')} ref={tabsContainerRef}>
        {list.map((item, index) => (
          <div
            key={item.id}
            className="flex-1 cursor-pointer py-2 text-center"
            onClick={() => handleClick(index, item.name)}
          >
            <Text fontSize={14} color="black01">
              {item.title}
              {type === 'recipePrice' && '원'}
            </Text>
          </div>
        ))}
      </div>

      <div
        ref={activeBorderRef}
        className="absolute bottom-0 h-0.5 bg-primary02 transition-all duration-300"
      ></div>
    </div>
  );
};

export default CategoryTab;
