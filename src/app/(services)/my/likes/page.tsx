'use client';

import React, { useState } from 'react';

import { Checkbox } from '@/components/atoms/input/Checkbox';
import MiniSelectBox from '@/components/atoms/input/MiniSelectBox';
import PageHeader from '@/components/atoms/page-header/PageHeader';
import { RECIPE_FILTER_OPTIONS } from '@/constants/options.constants';

import LikesList from './likes-list';

const LikesPage = () => {
  const [isOnlyPaid, setOnlyPaid] = useState<boolean>(false); // 유료 레시피만 보기

  const [selectedSortOption, setSelectedSortOption] = useState(RECIPE_FILTER_OPTIONS[0]);

  function togglePaidCheckbox() {
    setOnlyPaid((prev) => !prev);
  }

  return (
    <div>
      <PageHeader title="좋아요 목록" back />

      <div className="mb-5 flex items-center justify-between">
        <MiniSelectBox
          list={RECIPE_FILTER_OPTIONS}
          value={selectedSortOption}
          onChange={(newOption) => setSelectedSortOption(newOption)}
        />

        <Checkbox label="유료 레시피만 보기" value={isOnlyPaid} onChange={togglePaidCheckbox} />
      </div>

      <LikesList isOnlyPaid={isOnlyPaid} selectedSortOption={selectedSortOption} />
    </div>
  );
};

export default LikesPage;
