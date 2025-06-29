import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';

import { IRecipeFilterParams } from '@/types/api';
import { cn } from '@/utils/cn';

import { Text } from '../text/Text';

const CategoryTab = ({
  list,
  setCondition,
  type,
}: {
  list: { id: number; title: string; name: string }[];
  setCondition: (condition: Partial<IRecipeFilterParams> | null) => void;
  type: 'cookingTime' | 'recipePrice' | 'cal';
}) => {
  const [selected, setSelected] = useState<number>(0);

  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const activeBorderRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (index: number, name: string) => {
      console.log('selected');

      setSelected(index);
      setCondition({ [type]: name });
    },
    [type, setCondition],
  );

  useLayoutEffect(() => {
    if (activeBorderRef.current && tabsContainerRef.current) {
      const selectedTab = tabsContainerRef.current.children[selected] as HTMLDivElement;

      if (selectedTab) {
        activeBorderRef.current.style.width = `${selectedTab.offsetWidth}px`;
        activeBorderRef.current.style.left = `${selectedTab.offsetLeft}px`;
      }
    }
  }, [selected, list]);

  const widthClass = type === 'recipePrice' ? 'w-[110%]' : 'w-full';

  return (
    <div className="border-grey07 no-scrollbar relative max-w-screen overflow-x-auto border-b">
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
        className="bg-primary02 absolute bottom-0 h-0.5 transition-all duration-300"
      ></div>
    </div>
  );
};

export default CategoryTab;
