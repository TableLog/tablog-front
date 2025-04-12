'use client';

import AutoComplete from '@/components/atoms/input/AutoComplete';
import MiniSelectBox from '@/components/atoms/input/MiniSelectBox';
import Range from '@/components/atoms/input/Range';
import SelectBox from '@/components/atoms/input/SelectBox';
import TextArea from '@/components/atoms/input/TextArea';
import TextInput from '@/components/atoms/input/TextInput';
import { RECIPE_FILTER_OPTIONS, UNIT_OPTIONS } from '@/constants/options.constants';
import { REPORT_CONTENT_VALIDATION } from '@/constants/validation.constants';

export default function Page() {
  const dummyArr = [
    { id: 1, title: '재료 1' },
    { id: 2, title: '재료 2' },
    { id: 3, title: '재료 3' },
  ];

  // 사용
  return (
    <div className="flex flex-col gap-8">
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
