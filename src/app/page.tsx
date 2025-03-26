'use client';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';

export default function Page() {
  return (
    <div>
      <p>test</p>

      <BoxIcon
        onClick={() => console.log('testing icon click event')}
        name="home-smile"
        color="blue"
        size="50px"
      />
    </div>
  );
}
