'use client';

import AutoComplete from '@/components/atoms/input/AutoComplete';
import TextArea from '@/components/atoms/input/TextArea';
import TextInput from '@/components/atoms/input/TextInput';

export default function Page() {
  const dummyArr = [
    { id: 1, title: '재료 1' },
    { id: 2, title: '재료 2' },
    { id: 3, title: '재료 3' },
  ];

  return (
    <>
      <TextInput type="text" category="name" />

      <AutoComplete list={dummyArr} />

      <TextArea category="reportContent" errorMessage="ddd" />
    </>
  );
}
