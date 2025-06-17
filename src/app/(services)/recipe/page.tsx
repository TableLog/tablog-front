'use client';
import { useState } from 'react';

import Button from '@/components/atoms/button/Button';
import { Checkbox } from '@/components/atoms/input/Checkbox';
import MiniSelectBox from '@/components/atoms/input/MiniSelectBox';
import Tab from '@/components/atoms/tab/Tab';
import { RECIPE_FILTER_OPTIONS } from '@/constants/options.constants';

import AllRecipe from './all-recipe';
import MyRecipe from './my-recipe';

const RecipePage = () => {
  const [isOnlyPaid, setOnlyPaid] = useState<boolean>(false); // 유료 레시피만 보기
  const [selectedSortOption, setSelectedSortOption] = useState(RECIPE_FILTER_OPTIONS[0]);

  function togglePaidCheckbox() {
    setOnlyPaid((prev) => !prev);
  }

  return (
    <div className="relative px-5 py-4">
      <Tab>
        <div className="mb-4 grid grid-cols-[1fr_106px] gap-4">
          <Tab.Buttons tabs={['전체 레시피', '내 레시피']} />
          <Button href="/recipe/write">레시피 등록</Button>
        </div>

        <div className="mb-5 flex justify-between">
          <MiniSelectBox
            list={RECIPE_FILTER_OPTIONS}
            value={selectedSortOption}
            onChange={(newOption) => setSelectedSortOption(newOption)}
          />
          <Checkbox label="유료 레시피만 보기" value={isOnlyPaid} onChange={togglePaidCheckbox} />
        </div>

        <Tab.Panel index={0} className="flex flex-col gap-4">
          <AllRecipe isOnlyPaid={isOnlyPaid} selectedSortOption={selectedSortOption} />
        </Tab.Panel>
        <Tab.Panel index={1}>
          <MyRecipe isOnlyPaid={isOnlyPaid} selectedSortOption={selectedSortOption} />
        </Tab.Panel>
      </Tab>
    </div>
  );
};

export default RecipePage;
