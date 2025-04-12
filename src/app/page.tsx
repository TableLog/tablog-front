'use client';

import AutoComplete from '@/components/atoms/input/AutoComplete';

export default function Page() {
  const dummyArr = [
    { id: 1, title: '재료 1' },
    { id: 2, title: '재료 2' },
    { id: 3, title: '재료 3' },
  ];

  return (
    <>
      <AutoComplete list={dummyArr} />
    </>
  );
}
