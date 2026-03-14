'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Button from '@/components/atoms/button/Button';
import LoginRequiredLink from '@/components/atoms/button/LoginRequiredLink';
import { Checkbox } from '@/components/atoms/input/Checkbox';
import MiniSelectBox from '@/components/atoms/input/MiniSelectBox';
import Tab from '@/components/atoms/tab/Tab';
import Popup from '@/components/molecules/popup/Popup';
import { NO_RECIPE_MODAL } from '@/constants/modal.constants';
import { RECIPE_FILTER_OPTIONS } from '@/constants/options.constants';
import { handleOpenModal } from '@/utils/functions';

import RecipeList from './recipe-list';

const RecipePage = () => {
  const searchParams = useSearchParams();
  const sortOption = searchParams.get('sortOption');

  const [isOnlyPaid, setOnlyPaid] = useState<boolean>(false); // 유료 레시피만 보기
  const [selectedSortOption, setSelectedSortOption] = useState(
    RECIPE_FILTER_OPTIONS.find((option) => option.name === sortOption) ?? RECIPE_FILTER_OPTIONS[0],
  );
  const [activeIndex, setActiveIndex] = useState<number>(0);

  function togglePaidCheckbox() {
    setOnlyPaid((prev) => !prev);
  }

  function onMyRecipeEmpty() {
    if (activeIndex === 1) handleOpenModal(NO_RECIPE_MODAL);
  }

  return (
    <>
      <div className="pb-18 relative min-h-[calc(100dvh-60px)] px-5 pt-4">
        <Tab
          handleTabChange={(index) => {
            setActiveIndex(index);
          }}
        >
          <div className="mb-4 grid grid-cols-[1fr_106px] items-center gap-4">
            <Tab.Buttons tabs={['전체 레시피', '내 레시피']} />
            <LoginRequiredLink size="medium" href="/recipe/write">
              레시피 등록
            </LoginRequiredLink>
          </div>

          <div className="mb-5 flex items-center justify-between">
            <MiniSelectBox
              list={RECIPE_FILTER_OPTIONS}
              value={selectedSortOption}
              onChange={(newOption) => setSelectedSortOption(newOption)}
            />
            <Checkbox label="유료 레시피만 보기" value={isOnlyPaid} onChange={togglePaidCheckbox} />
          </div>

          <Tab.Panel index={0} className="mb-[72px]">
            <RecipeList isOnlyPaid={isOnlyPaid} selectedSortOption={selectedSortOption} />
          </Tab.Panel>

          <Tab.Panel index={1} className="mb-[72px]">
            <RecipeList
              isOnlyPaid={isOnlyPaid}
              selectedSortOption={selectedSortOption}
              isMine
              onRecipeNotExist={onMyRecipeEmpty}
            />
          </Tab.Panel>
        </Tab>
      </div>

      <Popup
        id={NO_RECIPE_MODAL}
        title="등록하신 레시피가 없습니다."
        activeButtonComponent={
          <Button href="/recipe/write" buttonColor="primary" size="medium">
            레시피 등록
          </Button>
        }
      >
        <>
          <p>나만의 레시피를 다른 사람들과 공유해볼까요?</p>
        </>
      </Popup>
    </>
  );
};

export default RecipePage;
