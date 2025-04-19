'use client';

import { useState } from 'react';

import ToggleButton from '@/components/atoms/button/ToggleButton';
import AutoComplete from '@/components/atoms/input/AutoComplete';
import { Checkbox } from '@/components/atoms/input/Checkbox';
import MiniSelectBox from '@/components/atoms/input/MiniSelectBox';
import Range from '@/components/atoms/input/Range';
import RecipeImageInput from '@/components/atoms/input/RecipeImageInput';
import SelectBox from '@/components/atoms/input/SelectBox';
import TextArea from '@/components/atoms/input/TextArea';
import TextInput from '@/components/atoms/input/TextInput';
import CheckAll from '@/components/molecules/input/CheckAll';
import StarRate from '@/components/molecules/star-rate/StarRate';
import { RECIPE_FILTER_OPTIONS, TERMS_OPTIONS, UNIT_OPTIONS } from '@/constants/options.constants';
import { REPORT_CONTENT_VALIDATION } from '@/constants/validation.constants';

export default function Page() {
  const [checkValue, setCheckValue] = useState(false);

  const [toggleValue, setToggleValue] = useState(false);

  const dummyArr = [
    { id: 1, title: '재료 1' },
    { id: 2, title: '재료 2' },
    { id: 3, title: '재료 3' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <StarRate />

      <RecipeImageInput />

      <ToggleButton title="유료 레시피로 등록" value={toggleValue} setValue={setToggleValue} />

      <Checkbox label="유료" value={checkValue} onChange={(e) => setCheckValue(e.target.checked)} />

      <CheckAll options={TERMS_OPTIONS} />

      <TextInput type="text" category="name" />

      <AutoComplete list={dummyArr} category="search" />

      <TextArea category="reportContent" errorMessage={REPORT_CONTENT_VALIDATION} />

      <SelectBox category="unit" list={UNIT_OPTIONS} />

      <MiniSelectBox list={RECIPE_FILTER_OPTIONS} />

      <Range type="price" />

      <Range type="time" />
    </div>
  );
}
